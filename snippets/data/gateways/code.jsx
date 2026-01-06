// Segmented Code Blocks

import { ValueResponseField } from "/snippets/components/response-field";

// DOCKER

export const DOCKER_CODE = {
  install: `docker pull livepeer/go-livepeer:master`,
  create: `docker volume create dual-gateway-lpData`,
  run: `docker-compose up -d`,
  verify: `docker logs dual-gateway`,
  flags: `docker run --rm livepeer/go-livepeer:master -help`,
};

export const BASH_CODE = {
  sendVideo: `ffmpeg -re -i test-video.mp4 -c copy -f flv rtmp://localhost:1935/stream/test-key`,
};
// The FFmpeg command:
// Reads test-video.mp4 from your local filesystem
// Streams it to the gateway's RTMP endpoint at localhost:1935
// Uses the stream key test-key ingest.md:21-33

export const createCodeBlock = (codeString, language, icon, ...props) => {
  const code = `docker pull livepeer/go-livepeer:master`;
  return (
    <CustomCodeBlock
      codeString={code}
      language="bash"
      icon="terminal"
      {...props}
    />
  );
};

export const expandableCode = () => {
  return (
    <Expandable title="Required Flags">
      <ResponseField name="flag" type="type" default="hi">
        Description
      </ResponseField>
    </Expandable>
  );
};

export const CustomResponseField = ({ description, ...props }) => {
  const uniqueId = `custom-rf-${Math.random().toString(36).substring(2, 11)}`;

  return (
    <div className={uniqueId}>
      <style>{`
        .${uniqueId} > .field {
          border-bottom: none !important;
          margin-bottom: -20px !important;
        }
      `}</style>
      <ResponseField {...props}>{description}</ResponseField>
    </div>
  );
};

export const ResponseFieldExpandable = ({ fields = {}, ...props }) => {
  const fieldsArray = Array.isArray(fields) ? fields : Object.values(fields);
  return (
    <Expandable {...props}>
      {fieldsArray.map((field, index) => (
        <ValueResponseField key={index} {...field} />
      ))}
    </Expandable>
  );
};

// old stuff
// ```bash icon="terminal" docker-compose.yml
//           version: '3.9'

//           services:
//             dual-gateway:
//               image: livepeer/go-livepeer:master
//               container_name: 'dual-gateway'
//               hostname: 'dual-gateway'
//               ports:
//                 - 1935:1935  # RTMP for video ingest
//                 - 8935:8935  # HTTP API for both video and AI
//                 - 5935:5935  # CLI port
//               volumes:
//                 - dual-gateway-lpData:/root/.lpData
//                 - ./aiModels.json:/root/.lpData/aiModels.json
//                 - ./models:/root/.lpData/models
//               command: '-network offchain
//                         -gateway
//                         -httpIngest
//                         -aiServiceRegistry
//                         -monitor=true
//                         -v=6
//                         -rtmpAddr=0.0.0.0:1935
//                         -httpAddr=0.0.0.0:8935
//                         -cliAddr=0.0.0.0:5935
//                         -orchAddr=<ORCHESTRATOR_ADDRESSES>
//                         -transcodingOptions=P240p30fps16x9,P360p30fps16x9,P720p30fps16x9
//                         -aiModels=/root/.lpData/aiModels.json
//                         -aiModelsDir=/root/.lpData/models
//                         -livePaymentInterval=5s'

//             volumes:
//               dual-gateway-lpData:
//                 external: true
//         ```;
