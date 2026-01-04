import {
  dockerOffChainQuickstart,
  dockerOnChainQuickstart,
  linuxOffChainQuickstart,
  linuxOnChainQuickstart,
  windowsOffChainQuickstart,
  windowsOnChainQuickstart,
} from "/snippets/data/gateways.jsx";

export const QuickStartTabs = (offchainSteps, onchainSteps) => {
  return (
    <Tabs>
      <Tab title="Off-Chain Gateway" icon="floppy-disk">
        <GatewayOffChainWarning />
        {offchainSteps}
      </Tab>
      <Tab title="On-Chain Gateway" icon="link">
        {onchainSteps}
      </Tab>
    </Tabs>
  );
};

export const QuickStartSteps = ({ dataSource }) => {
  const stepsMap = {
    dockerOffChainQuickstart,
    dockerOnChainQuickstart,
    linuxOffChainQuickstart,
    linuxOnChainQuickstart,
    windowsOffChainQuickstart,
    windowsOnChainQuickstart,
  };
  const { installStep, configureStep, runStep, connectStep, testStep } =
    stepsMap[dataSource]; //dataSource;
  //   console.log("docker", dockerOffChainQuickstart);
  console.log("dataSource", dataSource, installStep);
  return (
    <Steps titleSize="h3">
      <Step title="Install Gateway Software">{installStep}</Step>
      <Step title="Configure Gateway">{configureStep}</Step>
      <Step title="Run Gateway">{runStep}</Step>
      <Step title="Connect Gateway">{connectStep}</Step>
      <Step title="Test Gateway">{testStep}</Step>
    </Steps>
  );
};

/*
    export const QuickstartSteps = (
        installStep,
        configureStep,
        runStep,
        connectStep,
        testStep
        ) => {
        return (
            <Steps titleSize="h3">
            <Step title="Install Gateway Software">{installStep}</Step>
            <Step title="Configure Gateway">{configureStep}</Step>
            <Step title="Run Gateway">{runStep}</Step>
            <Step title="Connect Gateway">{connectStep}</Step>
            <Step title="Test Gateway">{testStep}</Step>
            </Steps>
        );
        };
*/
