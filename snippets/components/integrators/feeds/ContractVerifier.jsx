/**
 * @component        ContractVerifier
 * @category         integrators
 * @subcategory      feeds
 * @status           experimental
 * @description      Interactive widget to verify Livepeer contract addresses on-chain via Controller lookup and Blockscout address inspection. Two modes: look up by name, verify by address.
 * @dataSource       Arbitrum One RPC (eth_call via arb1.arbitrum.io) + Blockscout API v2 (/api/v2/addresses/)
 * @aiDiscoverability none
 *
 * @param {string} [className=''] - Optional CSS class override.
 * @param {object} [style={}]     - Optional inline style override.
 */
export const ContractVerifier = ({ className = "", style = {}, ...rest }) => {

  // ── API CONSTANTS ─────────────────────────────────────────────────────
  const CONTROLLER = '0xD8E8328501E9645d16Cf49539efC04f734606ee4'
  const RPC_URL    = 'https://arb1.arbitrum.io/rpc'
  const BLOCKSCOUT = 'https://arbitrum.blockscout.com'
  const ZERO_ADDR  = '0x0000000000000000000000000000000000000000'
  const SELECTOR   = '0xe16c7d98' // keccak256("getContract(bytes32)")[:4]

  // ── CANONICAL ADDRESSES (source of truth for MATCH checks) ────────────
  const CANONICAL = {
    AIServiceRegistry: '0x04C0b249740175999E5BF5c9ac1dA92431EF34C5',
    BondingManager:    '0x35Bcf3c30594191d53231E4FF333E8A770453e40',
    BondingVotes:      '0x0B9C254837E72Ebe9Fe04960C43B69782E68169A',
    Controller:        '0xD8E8328501E9645d16Cf49539efC04f734606ee4',
    L2LPTGateway:      '0x6D2457a4ad276000A615295f7A80F79E48CcD318',
    L2Migrator:        '0x148D5b6B4df9530c7C76A810bd1Cdf69EC4c2085',
    LivepeerGovernor:  '0xcFE4E2879B786C3aa075813F0E364bb5acCb6aa0',
    LivepeerToken:     '0x289ba1701C2F088cf0faf8B3705246331cB8A839',
    Minter:            '0xc20DE37170B45774e6CD3d2304017fc962f27252',
    RoundsManager:     '0xdd6f56DcC28D3F5f27084381fE8Df634985cc39f',
    ServiceRegistry:   '0xC92d3A360b8f9e083bA64DE15d95Cf8180897431',
    TicketBroker:      '0xa8bB618B1520E284046F3dFc448851A1Ff26e41B',
    Treasury:          '0xf82C1FF415F1fCf582554fDba790E27019c8E8C4',
  }

  // ── KECCAK256 HASHES (pre-computed, stable forever) ───────────────────
  // Used as bytes32 argument to Controller.getContract()
  const KECCAK256 = {
    AIServiceRegistry: '0x708d071449926f2d3af17f15cb9f54ed8b3886a1ef57c3059438aa0ca4d710d0',
    BondingManager:    '0x2517d59a36a86548e38734e8ab416f42afff4bca78706a66ad65750dae7f9e37',
    BondingVotes:      '0x2a1b465fbcae519904f0fb11f93e73dfbeb47ec54530ec444279610af8cf06b2',
    Controller:        '0x7c20e2bbcd91c5aaa7898ba022ab8867ac32d84e959c236484db066900aa363a',
    L2LPTGateway:      '0x07148fd8bd26d2f980f876cc40cea159d0cca6e6456a379f06f34fb338d35be5',
    L2Migrator:        '0x74b6d21e0d4650f622c903126d418c1a52bcc99ea7acb0db0809fc0eeae6c7c3',
    LivepeerGovernor:  '0xaea11c65571dd8b6188d3a5cf5e5d3d4695845e6f217cad0b453b4e276c6cdcd',
    LivepeerToken:     '0x3443e257065fe41dd0e4d1f5a1b73a22a62e300962b57f30cddf41d0f8273ba7',
    Minter:            '0x6e58ad548d72b425ea94c15f453bf26caddb061d82b2551db7fdd3cefe0e9940',
    RoundsManager:     '0xe8438ea868df48e3fc21f2f087b993c9b1837dc0f6135064161ce7d7a1701fe8',
    ServiceRegistry:   '0x79c5d2a4a07754f4bacb0ffba18ac516030ee589ebc89db8627680c4d4cdb230',
    TicketBroker:      '0xbd1aa3e8d2464256d7fd3dcf645c16418d5d8c51d971f1ad7d57e7b1b5eee239',
    Treasury:          '0x6efca2866b731ee4984990bacad4cde10f1ef764fb54a5206bdfd291695b1a9b',
  }

  const CONTRACT_NAMES = Object.keys(CANONICAL).sort()

  // ── STATE ─────────────────────────────────────────────────────────────
  const [tab, setTab] = useState('lookup')
  const [selectedName, setSelectedName] = useState('BondingManager')
  const [address, setAddress] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // ── HANDLERS ──────────────────────────────────────────────────────────

  const lookupByName = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const hash = KECCAK256[selectedName]
      const calldata = SELECTOR + hash.slice(2)
      const res = await fetch(RPC_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_call',
          params: [{ to: CONTROLLER, data: calldata }, 'latest'],
          id: 1,
        }),
      })
      const json = await res.json()
      if (json.error) throw new Error(json.error.message)
      const resolved = '0x' + json.result.slice(-40)
      const isZero = resolved.toLowerCase() === ZERO_ADDR
      const matches = !isZero
        && resolved.toLowerCase() === CANONICAL[selectedName].toLowerCase()
      setResult({
        mode: 'lookup',
        resolved,
        isZero,
        matches,
        name: selectedName,
      })
    } catch (e) {
      setError(e.message || 'RPC call failed')
    } finally {
      setLoading(false)
    }
  }

  const verifyAddress = async () => {
    const trimmed = address.trim()
    if (!/^0x[0-9a-fA-F]{40}$/.test(trimmed)) {
      setError('Invalid address format. Expected 0x followed by 40 hex characters.')
      return
    }
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch(`${BLOCKSCOUT}/api/v2/addresses/${trimmed}`)
      if (!res.ok) throw new Error(`Blockscout returned ${res.status}`)
      const data = await res.json()
      const nameStr = (data.name || '').toLowerCase()
      const isLivepeerNamed = nameStr.includes('livepeer') || nameStr.includes('proxy')
      setResult({
        mode: 'verify',
        is_contract: data.is_contract,
        is_verified: data.is_verified,
        name: data.name || null,
        isLivepeerNamed,
        has_logs: data.has_logs || false,
        queriedAddress: trimmed,
      })
    } catch (e) {
      setError(e.message || 'Blockscout query failed')
    } finally {
      setLoading(false)
    }
  }

  const castFallback = (name) =>
    `cast call ${CONTROLLER} \\\n  "getContract(bytes32)(address)" \\\n  $(cast keccak "${name}") \\\n  --rpc-url ${RPC_URL}`

  // ── STYLES ────────────────────────────────────────────────────────────

  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      color: 'var(--foreground)',
      ...style,
    },
    tabRow: {
      display: 'flex',
      gap: '0.5rem',
    },
    tabBase: {
      padding: '0.5rem 1rem',
      border: '1px solid var(--border)',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: 600,
      transition: 'background 0.15s, color 0.15s',
    },
    tabActive: {
      background: 'var(--accent)',
      color: 'white',
      borderColor: 'var(--accent)',
    },
    tabInactive: {
      background: 'transparent',
      color: 'var(--foreground)',
    },
    formRow: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    select: {
      padding: '0.5rem 0.75rem',
      border: '1px solid var(--border)',
      borderRadius: '4px',
      background: 'var(--background)',
      color: 'var(--foreground)',
      fontSize: '0.9rem',
      minWidth: '200px',
    },
    input: {
      padding: '0.5rem 0.75rem',
      border: '1px solid var(--border)',
      borderRadius: '4px',
      background: 'var(--background)',
      color: 'var(--foreground)',
      fontSize: '0.9rem',
      fontFamily: 'monospace',
      flex: '1 1 280px',
      minWidth: '280px',
    },
    button: {
      padding: '0.5rem 1.25rem',
      border: 'none',
      borderRadius: '4px',
      background: 'var(--accent)',
      color: 'white',
      fontSize: '0.9rem',
      fontWeight: 600,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    card: {
      border: '1px solid var(--border)',
      borderRadius: '4px',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    addressText: {
      fontFamily: 'monospace',
      fontSize: '0.9rem',
      wordBreak: 'break-all',
    },
    badgeMatch: {
      display: 'inline-block',
      padding: '0.15rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.8rem',
      fontWeight: 700,
      background: 'var(--lp-color-status-good)',
      color: 'white',
    },
    badgeMismatch: {
      display: 'inline-block',
      padding: '0.15rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.8rem',
      fontWeight: 700,
      background: 'var(--lp-color-status-bad)',
      color: 'white',
    },
    badgeWarn: {
      display: 'inline-block',
      padding: '0.15rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.8rem',
      fontWeight: 700,
      background: 'var(--lp-color-status-warn)',
      color: 'var(--foreground)',
    },
    badgeGood: {
      display: 'inline-block',
      padding: '0.15rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.8rem',
      fontWeight: 700,
      background: 'var(--lp-color-status-good)',
      color: 'white',
    },
    links: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      fontSize: '0.85rem',
      marginTop: '0.25rem',
    },
    link: {
      color: 'var(--accent)',
      textDecoration: 'none',
    },
    pre: {
      background: 'var(--background)',
      color: 'var(--foreground)',
      border: '1px solid var(--border)',
      borderRadius: '4px',
      padding: '0.75rem 1rem',
      fontSize: '0.85rem',
      fontFamily: 'monospace',
      overflowX: 'auto',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
    },
    errorText: {
      color: 'var(--lp-color-status-bad)',
      fontSize: '0.9rem',
    },
    signalRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
    },
    mismatchNote: {
      fontSize: '0.85rem',
      color: 'var(--lp-color-status-warn)',
      marginTop: '0.25rem',
    },
  }

  // ── RENDER HELPERS ────────────────────────────────────────────────────

  const renderLookupResult = () => {
    if (!result || result.mode !== 'lookup') return null
    if (result.isZero) {
      return (
        <div style={styles.card}>
          <span style={styles.badgeMismatch}>NOT REGISTERED</span>
          <span style={{ fontSize: '0.9rem' }}>
            The Controller returned the zero address for "{result.name}".
            This contract name is not registered on Arbitrum One.
          </span>
        </div>
      )
    }
    return (
      <div style={styles.card}>
        <div style={styles.signalRow}>
          <span style={result.matches ? styles.badgeMatch : styles.badgeMismatch}>
            {result.matches ? 'MATCH' : 'MISMATCH'}
          </span>
          <span style={{ fontWeight: 600 }}>{result.name}</span>
        </div>
        <div style={styles.addressText}>{result.resolved}</div>
        {!result.matches && (
          <div style={styles.mismatchNote}>
            MISMATCH may indicate a governance upgrade. Cross-check{' '}
            <a
              href="https://github.com/livepeer/governor-scripts/blob/master/updates/addresses.js"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >governor-scripts</a>.
          </div>
        )}
        <div style={styles.links}>
          <a
            href={`https://arbiscan.io/address/${result.resolved}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >View on Arbiscan</a>
          <a
            href={`${BLOCKSCOUT}/address/${result.resolved}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >View on Blockscout</a>
        </div>
      </div>
    )
  }

  const renderVerifyResult = () => {
    if (!result || result.mode !== 'verify') return null
    if (!result.is_contract) {
      return (
        <div style={styles.card}>
          <span style={styles.badgeMismatch}>NOT A CONTRACT</span>
          <span style={{ fontSize: '0.9rem' }}>
            This address is not a contract on Arbitrum One. It may be an
            externally owned account (EOA) or does not exist on this chain.
          </span>
        </div>
      )
    }
    return (
      <div style={styles.card}>
        {result.name && (
          <div style={styles.signalRow}>
            <span style={{ fontWeight: 600 }}>Name:</span>
            <span>{result.name}</span>
            {result.isLivepeerNamed && (
              <span style={styles.badgeGood}>Livepeer identified</span>
            )}
          </div>
        )}
        <div style={styles.signalRow}>
          <span style={{ fontWeight: 600 }}>Contract:</span>
          <span style={styles.badgeGood}>Yes</span>
        </div>
        <div style={styles.signalRow}>
          <span style={{ fontWeight: 600 }}>Source verified:</span>
          {result.is_verified
            ? <span style={styles.badgeGood}>Verified</span>
            : <span style={styles.badgeWarn}>Not verified</span>
          }
        </div>
        <div style={styles.signalRow}>
          <span style={{ fontWeight: 600 }}>Transaction logs:</span>
          {result.has_logs
            ? <span style={styles.badgeGood}>Present</span>
            : <span style={styles.badgeWarn}>None found</span>
          }
        </div>
        <div style={styles.links}>
          <a
            href={`https://arbiscan.io/address/${result.queriedAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >View on Arbiscan</a>
          <a
            href={`${BLOCKSCOUT}/address/${result.queriedAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >View on Blockscout</a>
        </div>
      </div>
    )
  }

  // ── RETURN ────────────────────────────────────────────────────────────

  return (
    <div style={styles.wrapper} className={className} {...rest}>
      {/* Tab buttons */}
      <div style={styles.tabRow}>
        <button
          style={{ ...styles.tabBase, ...(tab === 'lookup' ? styles.tabActive : styles.tabInactive) }}
          onClick={() => { setTab('lookup'); setResult(null); setError(null) }}
          aria-pressed={tab === 'lookup'}
        >
          Look up contract
        </button>
        <button
          style={{ ...styles.tabBase, ...(tab === 'verify' ? styles.tabActive : styles.tabInactive) }}
          onClick={() => { setTab('verify'); setResult(null); setError(null) }}
          aria-pressed={tab === 'verify'}
        >
          Verify address
        </button>
      </div>

      {/* Look up tab */}
      {tab === 'lookup' && (
        <div style={styles.formRow}>
          <select
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            style={styles.select}
            aria-label="Contract name"
          >
            {CONTRACT_NAMES.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          <button
            onClick={lookupByName}
            disabled={loading}
            style={{ ...styles.button, ...(loading ? styles.buttonDisabled : {}) }}
          >
            {loading ? 'Querying on-chain...' : 'Look up'}
          </button>
        </div>
      )}

      {/* Verify tab */}
      {tab === 'verify' && (
        <div style={styles.formRow}>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
            style={styles.input}
            aria-label="Contract address"
            spellCheck={false}
            autoComplete="off"
          />
          <button
            onClick={verifyAddress}
            disabled={loading}
            style={{ ...styles.button, ...(loading ? styles.buttonDisabled : {}) }}
          >
            {loading ? 'Querying Blockscout...' : 'Verify'}
          </button>
        </div>
      )}

      {/* Results */}
      <div role="status" aria-live="polite">
        {renderLookupResult()}
        {renderVerifyResult()}

        {/* Error with fallback */}
        {error && (
          <div>
            <div style={styles.errorText}>{error}</div>
            {tab === 'lookup' && (
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  Verify manually with the Foundry CLI:
                </div>
                <pre style={styles.pre}>{castFallback(selectedName)}</pre>
              </div>
            )}
            {tab === 'verify' && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                Try inspecting this address directly on{' '}
                <a
                  href="https://arbiscan.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >Arbiscan</a>.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
