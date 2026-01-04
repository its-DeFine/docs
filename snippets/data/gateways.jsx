export const GatewaySteps = [
  {
    title: "Install Gateway Software",
    icon: "terminal",
    content: "Install the Livepeer Gateway software.",
  },
  {
    title: "Configure Gateway",
    icon: "wrench",
    content: "Configure transcoding options, models, pipelines & pricing",
  },
  {
    title: "Run Gateway",
    icon: "rocket",
    content: "Start the Gateway service.",
  },
  {
    title: "Connect Gateway",
    icon: "link",
    content: "Connect the Gateway to the Livepeer network.",
  },
  {
    title: "Test Gateway",
    icon: "check-circle",
    content: "Verify the Gateway is working correctly.",
  },
];

export const dockerOffChainQuickstart = {
  installStep: (
    <CustomCodeBlock
      codeString="docker pull livepeer/go-livepeer:master"
      language="bash"
      icon="terminal"
    />
  ),
  configureStep: (
    <CustomCodeBlock
      codeString="nano -p /var/lib/docker/volumes/gateway-lpData/_data/aiModels.json"
      language="bash"
      icon="terminal"
    />
  ),
  runStep: (
    <CustomCodeBlock
      codeString="docker run -p 8935:8935 -p 1935:1935 livepeer/go-livepeer:master -gateway -httpAddr=0.0.0.0:8935 -rtmpAddr=0.0.0.0:1935"
      language="bash"
      icon="terminal"
    />
  ),
  connectStep: (
    <CustomCodeBlock
      codeString="docker run -p 8935:8935 -p 1935:1935 livepeer/go-livepeer:master -gateway -httpAddr=0.0.0.0:8935 -rtmpAddr=0.0.0.0:1935"
      language="bash"
      icon="terminal"
    />
  ),
  testStep: (
    <CustomCodeBlock
      codeString="docker run -p 8935:8935 -p 1935:1935 livepeer/go-livepeer:master -gateway -httpAddr=0.0.0.0:8935 -rtmpAddr=0.0.0.0:1935"
      language="bash"
      icon="terminal"
    />
  ),
};

export const dockerOnChainQuickstart = {
  installStep: (
    <CustomCodeBlock
      codeString="docker pull livepeer/go-livepeer:master"
      language="bash"
      icon="terminal"
    />
  ),
  configureStep: (
    <CustomCodeBlock
      codeString="nano -p /var/lib/docker/volumes/gateway-lpData/_data/aiModels.json"
      language="bash    "
      icon="terminal"
    />
  ),
  runStep: (
    <CustomCodeBlock
      codeString="docker run -p 8935:8935 -p 1935:1935 livepeer/go-livepeer:master -gateway -httpAddr=0.0.0.0:8935 -rtmpAddr=0.0.0.0:1935"
      language="bash"
      icon="terminal"
    />
  ),
  connectStep: (
    <CustomCodeBlock
      codeString="docker run -p 8935:8935 -p 1935:1935 livepeer/go-livepeer:master -gateway -httpAddr=0.0.0.0:8935 -rtmpAddr=0.0.0.0:1935"
      language="bash"
      icon="terminal"
    />
  ),
  testStep: (
    <CustomCodeBlock
      codeString="docker run -p 8935:8935 -p 1935:1935 livepeer/go-livepeer:master -gateway -httpAddr=0.0.0.0:8935 -rtmpAddr=0.0.0.0:1935"
      language="bash"
      icon="terminal"
    />
  ),
};

export const linuxOffChainQuickstart = {
  installStep: (
    <CustomCodeBlock
      codeString="sudo wget https://github.com/livepeer/go-livepeer/releases/download/{PLACEHOLDER}/livepeer-linux-amd64.tar.gz"
      placeholderValue={LatestRelease}
      language="bash"
      icon="terminal"
    />
  ),
  configureStep: (
    <CustomCodeBlock
      codeString="nano -p /var/lib/docker/volumes/gateway-lpData/_data/aiModels.json"
      language="bash"
      icon="terminal"
    />
  ),
  runStep: (
    <CustomCodeBlock
      codeString="docker run -p 8935:8935 -p 1935:1935 livepeer/go-livepeer:master -gateway -httpAddr=0.0.0.0:8935 -rtmpAddr=0.0.0.0:1935"
      language="bash"
      icon="terminal"
    />
  ),
  connectStep: (
    <CustomCodeBlock
      codeString="docker run -p 8935:8935 -p 1935:1935 livepeer/go-livepeer:master -gateway -httpAddr=0.0.0.0:8935 -rtmpAddr=0.0.0.0:1935"
      language="bash"
      icon="terminal"
    />
  ),
  testStep: (
    <CustomCodeBlock
      codeString="docker run -p 8935:8935 -p 1935:1935 livepeer/go-livepeer:master -gateway -httpAddr=0.0.0.0:8935 -rtmpAddr=0.0.0.0:1935"
      language="bash"
      icon="terminal"
    />
  ),
};

export const linuxOnChainQuickstart = {
  installStep: (
    <CustomCodeBlock
      codeString="sudo wget https://github.com/livepeer/go-livepeer/releases/download/{PLACEHOLDER}/livepeer-linux-amd64.tar.gz"
      placeholderValue={LatestRelease}
      language="bash"
      icon="terminal"
    />
  ),
  configureStep: (
    <CustomCodeBlock
      codeString="nano -p /var/lib/docker/volumes/gateway-lpData/_data/aiModels.json"
      language="bash"
      icon="terminal"
    />
  ),
  runStep: (
    <CustomCodeBlock
      codeString="docker run -p 8935:8935 -p 1935:1935 livepeer/go-livepeer:master -gateway -httpAddr=0.0.0.0:8935 -rtmpAddr=0.0.0.0:1935"
      language="bash"
      icon="terminal"
    />
  ),
  connectStep: (
    <CustomCodeBlock
      codeString="docker run -p 8935:8935 -p 1935:1935 livepeer/go-livepeer:master -gateway -httpAddr=0.0.0.0:8935 -rtmpAddr=0.0.0.0:1935"
      language="bash"
      icon="terminal"
    />
  ),
  testStep: (
    <CustomCodeBlock
      codeString="docker run -p 8935:8935 -p 1935:1935 livepeer/go-livepeer:master -gateway -httpAddr=0.0.0.0:8935 -rtmpAddr=0.0.0.0:1935"
      language="bash"
      icon="terminal"
    />
  ),
};

export const windowsOffChainQuickstart = {
  installStep: (
    <CustomCodeBlock
      codeString="https://github.com/livepeer/go-livepeer/releases/download/{PLACEHOLDER}/livepeer-windows-amd64.zip"
      placeholderValue={LatestRelease}
      language="bash"
      icon="terminal"
    />
  ),
  configureStep: (
    <CustomCodeBlock
      codeString="nano -p /var/lib/docker/volumes/gateway-lpData/_data/aiModels.json"
      language="bash"
      icon="terminal"
    />
  ),
  runStep: (
    <CustomCodeBlock
      codeString="docker run -p 8935:8935 -p 1935:1935 livepeer/go-livepeer:master -gateway -httpAddr=0.0.0.0:8935 -rtmpAddr=0.0.0.0:1935"
      language="bash"
      icon="terminal"
    />
  ),
  connectStep: (
    <CustomCodeBlock
      codeString="docker run -p 8935:8935 -p 1935:1935 livepeer/go-livepeer:master -gateway -httpAddr=0.0.0.0:8935 -rtmpAddr=0.0.0.0:1935"
      language="bash"
      icon="terminal"
    />
  ),
  testStep: (
    <CustomCodeBlock
      codeString="docker run -p 8935:8935 -p 1935:1935 livepeer/go-livepeer:master -gateway -httpAddr=0.0.0.0:8935 -rtmpAddr=0.0.0.0:1935"
      language="bash"
      icon="terminal"
    />
  ),
};

export const windowsOnChainQuickstart = {
  installStep: (
    <CustomCodeBlock
      codeString="https://github.com/livepeer/go-livepeer/releases/download/{PLACEHOLDER}/livepeer-windows-amd64.zip"
      placeholderValue={LatestRelease}
      language="bash"
      icon="terminal"
    />
  ),
  configureStep: (
    <CustomCodeBlock
      codeString="nano -p /var/lib/docker/volumes/gateway-lpData/_data/aiModels.json"
      language="bash"
      icon="terminal"
    />
  ),
  runStep: (
    <CustomCodeBlock
      codeString="docker run -p 8935:8935 -p 1935:1935 livepeer/go-livepeer:master -gateway -httpAddr=0.0.0.0:8935 -rtmpAddr=0.0.0.0:1935"
      language="bash"
      icon="terminal"
    />
  ),
  connectStep: (
    <CustomCodeBlock
      codeString="docker run -p 8935:8935 -p 1935:1935 livepeer/go-livepeer:master -gateway -httpAddr=0.0.0.0:8935 -rtmpAddr=0.0.0.0:1935"
      language="bash"
      icon="terminal"
    />
  ),
  testStep: (
    <CustomCodeBlock
      codeString="docker run -p 8935:8935 -p 1935:1935 livepeer/go-livepeer:master -gateway -httpAddr=0.0.0.0:8935 -rtmpAddr=0.0.0.0:1935"
      language="bash"
      icon="terminal"
    />
  ),
};
