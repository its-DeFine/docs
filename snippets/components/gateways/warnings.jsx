const GatewayOffChainWarning = () => {
  return (
    <Warning>
      <span style={{ fontSize: "1.0rem" }}>
        You will need to{" "}
        <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
          run your own Orchestrator node
        </span>{" "}
        to test an off-chain Gateway:{" "}
        <a href="/v2/pages/05_orchestrators/setting-up-an-orchestrator/setting-up-an-orchestrator/quickstart-add-your-gpu-to-livepeer">
          <Icon icon="arrow-up-right" color="#2d9a67" /> Orchestrator Quickstart{" "}
        </a>
      </span>

      <p>
        Note: You can use{" "}
        <a href="/v2/pages/03_developers/ai-inference-on-livepeer/byoc">
          <Icon icon="arrow-up-right" color="#2d9a67" /> BYOC pipelines
        </a>{" "}
        for local testing without needing a GPU.{" "}
      </p>
    </Warning>
  );
};

const GatewayOnChainWarning = () => {
  return (
    <Warning>
      <span style={{ fontSize: "1.0rem" }}>
        You will need to{" "}
        <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
          fund an Ethereum wallet
        </span>{" "}
        account on Arbitrum One to run an on-chain Gateway.
        <br /> <br /> See{" "}
        <a href="/v2/pages/04_gateways/run-a-gateway/requirements/on-chain setup/fund-gateway">
          <Icon icon="arrow-up-right" color="#2d9a67" /> Fund Your Gateway{" "}
        </a>
      </span>
    </Warning>
  );
};

export { GatewayOffChainWarning, GatewayOnChainWarning };
