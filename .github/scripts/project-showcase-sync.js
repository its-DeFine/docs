#!/usr/bin/env node
/*
 * Project Showcase sync job for GitHub Actions.
 *
 * Modes:
 * - poll: scans review responses sheet for unprocessed decisions
 * - dispatch: processes one decision from repository_dispatch client_payload
 */

const crypto = require('crypto');
const fs = require('fs');

const REQUIRED_ENVS = [
  'GOOGLE_SERVICE_ACCOUNT_JSON',
  'GOOGLE_SHEET_ID',
  'DISCORD_BOT_TOKEN',
  'DISCORD_REVIEWER_USER_ID'
];

const cfg = {
  mode: process.env.SHOWCASE_SYNC_MODE || 'poll',
  googleSheetId: process.env.GOOGLE_SHEET_ID,
  reviewSheetName: process.env.REVIEW_SHEET_NAME || 'Review Responses',
  transformedSheetName: process.env.TRANSFORMED_SHEET_NAME || 'Transformed Responses',
  processedColumnName: process.env.REVIEW_PROCESSED_COLUMN || 'Processed',
  githubOwner: process.env.GITHUB_OWNER || process.env.GITHUB_REPOSITORY?.split('/')[0],
  githubRepo: process.env.GITHUB_REPO || process.env.GITHUB_REPOSITORY?.split('/')[1],
  githubDataBranch: process.env.GITHUB_DATA_BRANCH || 'docs-v2-preview',
  showcaseDataPath:
    process.env.SHOWCASE_DATA_FILE_PATH || 'snippets/automations/showcase/showcaseData.jsx',
  discordApiBaseUrl: process.env.DISCORD_API_BASE_URL || 'https://discord.com/api/v10',
  discordReviewerUserId: process.env.DISCORD_REVIEWER_USER_ID,
  githubToken: process.env.GITHUB_TOKEN,
  maxRowsPerRun: Number(process.env.MAX_ROWS_PER_RUN || 10)
};

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}');

function log(msg, obj) {
  if (obj !== undefined) {
    console.log(msg, JSON.stringify(obj));
    return;
  }
  console.log(msg);
}

function assertEnv() {
  const missing = REQUIRED_ENVS.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }
}

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getGoogleAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const unsignedToken = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsignedToken);
  signer.end();
  const signature = signer.sign(serviceAccount.private_key, 'base64url');
  const assertion = `${unsignedToken}.${signature}`;

  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion
  });

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });

  if (!res.ok) {
    throw new Error(`Failed to get Google access token: ${res.status} ${await res.text()}`);
  }

  const json = await res.json();
  return json.access_token;
}

async function sheetsGetValues(accessToken, range) {
  const encoded = encodeURIComponent(range);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${cfg.googleSheetId}/values/${encoded}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    throw new Error(`Sheets read failed for ${range}: ${res.status} ${await res.text()}`);
  }

  const json = await res.json();
  return json.values || [];
}

async function sheetsUpdateValue(accessToken, range, value) {
  const encoded = encodeURIComponent(range);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${cfg.googleSheetId}/values/${encoded}?valueInputOption=RAW`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ values: [[value]] })
  });

  if (!res.ok) {
    throw new Error(`Sheets update failed for ${range}: ${res.status} ${await res.text()}`);
  }
}

function toObjects(values) {
  if (!values.length) return { headers: [], rows: [] };
  const headers = values[0];
  const rows = values.slice(1).map((row, idx) => {
    const obj = {};
    headers.forEach((h, col) => {
      obj[h] = row[col] || '';
    });
    obj.__rowIndex = idx + 2;
    return obj;
  });
  return { headers, rows };
}

function findHeader(headers, candidates) {
  const map = new Map(headers.map((h) => [h.toLowerCase().trim(), h]));
  for (const c of candidates) {
    const hit = map.get(c.toLowerCase().trim());
    if (hit) return hit;
  }
  return null;
}

function colToA1(colIndexZeroBased) {
  let n = colIndexZeroBased + 1;
  let result = '';
  while (n > 0) {
    const rem = (n - 1) % 26;
    result = String.fromCharCode(65 + rem) + result;
    n = Math.floor((n - 1) / 26);
  }
  return result;
}

function parseDecision(raw) {
  const value = String(raw || '').trim().toLowerCase();
  if (value === 'yes' || value === 'approve' || value === 'approved') return 'yes';
  if (value === 'no' || value === 'deny' || value === 'denied') return 'no';
  return null;
}

async function githubReadFile() {
  const url = `https://api.github.com/repos/${cfg.githubOwner}/${cfg.githubRepo}/contents/${cfg.showcaseDataPath}?ref=${encodeURIComponent(cfg.githubDataBranch)}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${cfg.githubToken}`,
      Accept: 'application/vnd.github+json'
    }
  });
  if (!res.ok) {
    throw new Error(`GitHub read failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

async function githubWriteFile(content, sha, message) {
  const url = `https://api.github.com/repos/${cfg.githubOwner}/${cfg.githubRepo}/contents/${cfg.showcaseDataPath}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${cfg.githubToken}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString('base64'),
      sha,
      branch: cfg.githubDataBranch
    })
  });
  if (!res.ok) {
    throw new Error(`GitHub write failed: ${res.status} ${await res.text()}`);
  }
}

async function discordCreateDm(userId) {
  const res = await fetch(`${cfg.discordApiBaseUrl}/users/@me/channels`, {
    method: 'POST',
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ recipient_id: userId })
  });
  if (!res.ok) {
    throw new Error(`Discord create DM failed: ${res.status} ${await res.text()}`);
  }
  const json = await res.json();
  return json.id;
}

async function discordSendMessage(channelId, content) {
  const res = await fetch(`${cfg.discordApiBaseUrl}/channels/${channelId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content })
  });
  if (!res.ok) {
    throw new Error(`Discord send failed: ${res.status} ${await res.text()}`);
  }
}

async function notifyReviewer(message) {
  const dmId = await discordCreateDm(cfg.discordReviewerUserId);
  await discordSendMessage(dmId, message);
}

async function notifySubmitter(discordId, message) {
  if (!discordId) return;
  const dmId = await discordCreateDm(discordId);
  await discordSendMessage(dmId, message);
}

function buildShowcaseDataFile(rows, approvedHeader) {
  const approved = rows.filter((r) => String(r[approvedHeader]).trim().toLowerCase() === 'yes');
  const data = approved
    .map((r) => {
      try {
        return JSON.parse(r.showcaseJSX || '{}');
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  return {
    count: data.length,
    content: `export const showcaseData = ${JSON.stringify(data, null, 2)};\n`
  };
}

function parseDispatchPayload() {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath || !fs.existsSync(eventPath)) {
    throw new Error('GITHUB_EVENT_PATH missing for dispatch mode');
  }

  const event = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
  const payload = event.client_payload || {};
  return {
    submissionId: String(payload.submissionId || '').trim(),
    decision: parseDecision(payload.approved),
    reason: payload.reason || ''
  };
}

async function processDecision(accessToken, transformedInfo, reviewInfo, decisionCtx) {
  const { transformedHeaders, transformedRows, reviewHeaders } = transformedInfo;
  const { reviewRows } = reviewInfo;
  const { submissionId, decision, reason, reviewRow } = decisionCtx;

  const submissionIdHeaderTransformed = findHeader(transformedHeaders, ['submissionId', 'submissionid']);
  const approvedHeader = findHeader(transformedHeaders, ['approved']);
  const discordIdHeader = findHeader(transformedHeaders, ['discordId', 'discord id']);
  const titleHeader = findHeader(transformedHeaders, ['title', 'project name']);
  const editLinkHeader = findHeader(transformedHeaders, ['editLink', 'edit url', 'editurl']);
  const showcaseJsxHeader = findHeader(transformedHeaders, ['showcaseJSX', 'showcasejsx']);

  if (!submissionIdHeaderTransformed || !approvedHeader || !showcaseJsxHeader) {
    throw new Error('Missing required columns in transformed sheet: submissionId, approved, showcaseJSX');
  }

  const transformedRow = transformedRows.find(
    (r) => String(r[submissionIdHeaderTransformed]).trim() === submissionId
  );

  if (!transformedRow) {
    throw new Error(`No transformed row found for submissionId=${submissionId}`);
  }

  const approvedCol = transformedHeaders.indexOf(approvedHeader);
  const approvedRange = `${cfg.transformedSheetName}!${colToA1(approvedCol)}${transformedRow.__rowIndex}`;
  await sheetsUpdateValue(accessToken, approvedRange, decision === 'yes' ? 'yes' : 'no');

  if (decision === 'yes') {
    const refreshedValues = await sheetsGetValues(accessToken, `${cfg.transformedSheetName}!A:ZZ`);
    const refreshed = toObjects(refreshedValues);
    const built = buildShowcaseDataFile(refreshed.rows, approvedHeader);

    const current = await githubReadFile();
    await githubWriteFile(
      built.content,
      current.sha,
      `chore(showcase): sync approved projects (${built.count})`
    );

    const projectTitle = transformedRow[titleHeader] || submissionId;
    const submitterDiscordId = transformedRow[discordIdHeader];
    await notifyReviewer(`✅ Showcase synced for **${projectTitle}** (${submissionId}).`);
    await notifySubmitter(
      submitterDiscordId,
      `✅ Your project **${projectTitle}** is approved and synced to the showcase.`
    );
  } else {
    const projectTitle = transformedRow[titleHeader] || submissionId;
    const submitterDiscordId = transformedRow[discordIdHeader];
    const editLink = transformedRow[editLinkHeader] || '';

    await notifyReviewer(`❌ Submission denied for **${projectTitle}** (${submissionId}).`);
    await notifySubmitter(
      submitterDiscordId,
      `❌ Your project **${projectTitle}** was not approved.\nReason: ${reason || 'No reason provided.'}\n${
        editLink ? `Update and resubmit: ${editLink}` : ''
      }`
    );
  }

  if (reviewRow) {
    const processedHeader = findHeader(reviewHeaders, [cfg.processedColumnName]);
    if (processedHeader) {
      const processedCol = reviewHeaders.indexOf(processedHeader);
      const processedRange = `${cfg.reviewSheetName}!${colToA1(processedCol)}${reviewRow.__rowIndex}`;
      await sheetsUpdateValue(accessToken, processedRange, 'yes');
    }
  }
}

async function runPollMode(accessToken) {
  const reviewValues = await sheetsGetValues(accessToken, `${cfg.reviewSheetName}!A:ZZ`);
  const transformedValues = await sheetsGetValues(accessToken, `${cfg.transformedSheetName}!A:ZZ`);

  const review = toObjects(reviewValues);
  const transformed = toObjects(transformedValues);

  const reviewSubmissionIdHeader = findHeader(review.headers, [
    'submissionId',
    'submissionid',
    'submissionId_2',
    'entry.1590946104'
  ]);
  const reviewDecisionHeader = findHeader(review.headers, ['Approved?', 'approved', 'decision']);
  const reviewReasonHeader = findHeader(review.headers, [
    'Reason For Denial',
    'Information Required',
    'reason'
  ]);
  const processedHeader = findHeader(review.headers, [cfg.processedColumnName]);

  if (!reviewSubmissionIdHeader || !reviewDecisionHeader) {
    throw new Error('Missing required review columns: submissionId and Approved?');
  }

  const pending = review.rows
    .filter((r) => {
      const processed = processedHeader ? String(r[processedHeader]).trim().toLowerCase() : '';
      return !processed || processed === 'no' || processed === 'false';
    })
    .filter((r) => parseDecision(r[reviewDecisionHeader]))
    .slice(0, cfg.maxRowsPerRun);

  log(`Pending review decisions: ${pending.length}`);

  for (const row of pending) {
    const submissionId = String(row[reviewSubmissionIdHeader]).trim();
    const decision = parseDecision(row[reviewDecisionHeader]);
    const reason = reviewReasonHeader ? row[reviewReasonHeader] : '';
    if (!submissionId || !decision) continue;

    await processDecision(
      accessToken,
      {
        transformedHeaders: transformed.headers,
        transformedRows: transformed.rows,
        reviewHeaders: review.headers
      },
      { reviewRows: review.rows },
      { submissionId, decision, reason, reviewRow: row }
    );
  }
}

async function runDispatchMode(accessToken) {
  const payload = parseDispatchPayload();
  if (!payload.submissionId || !payload.decision) {
    throw new Error('Dispatch payload must include submissionId and approved');
  }

  const reviewValues = await sheetsGetValues(accessToken, `${cfg.reviewSheetName}!A:ZZ`);
  const transformedValues = await sheetsGetValues(accessToken, `${cfg.transformedSheetName}!A:ZZ`);
  const review = toObjects(reviewValues);
  const transformed = toObjects(transformedValues);

  await processDecision(
    accessToken,
    {
      transformedHeaders: transformed.headers,
      transformedRows: transformed.rows,
      reviewHeaders: review.headers
    },
    { reviewRows: review.rows },
    {
      submissionId: payload.submissionId,
      decision: payload.decision,
      reason: payload.reason,
      reviewRow: null
    }
  );
}

async function main() {
  assertEnv();
  if (!serviceAccount.client_email || !serviceAccount.private_key) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON must include client_email and private_key');
  }
  if (!cfg.githubOwner || !cfg.githubRepo || !cfg.githubToken) {
    throw new Error('Missing GitHub config: GITHUB_OWNER/GITHUB_REPO/GITHUB_TOKEN');
  }

  const accessToken = await getGoogleAccessToken();

  if (cfg.mode === 'dispatch') {
    await runDispatchMode(accessToken);
  } else {
    await runPollMode(accessToken);
  }

  log('Project showcase sync completed');
}

main().catch(async (err) => {
  console.error(err);
  try {
    await notifyReviewer(`⚠️ Project showcase sync failed: ${err.message}`);
  } catch (notifyErr) {
    console.error('Failed to notify reviewer about error:', notifyErr.message);
  }
  process.exit(1);
});
