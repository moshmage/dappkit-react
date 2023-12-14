import React from "react";
import {CustomConnectorButtonProps} from "../../../types/custom-connector-button";
import {useConnectorHooks} from "../../../custom-hooks/use-connector-hooks";
import {hooks, metamaskWallet} from "../../../connectors/wallets/metamask-wallet";
import {ConnectorButton} from "../index";
import MetamaskLogo from "./logo";
import {useDappkit} from "../../../custom-hooks/use-dappkit";

export function MetamaskButton({onConnectorConnect, onConnectorDisconnect, defaultChain}: CustomConnectorButtonProps) {
  const {isActive, error, chainId, setError} = useConnectorHooks(hooks);

  return <ConnectorButton connector={metamaskWallet}
                          logo={<MetamaskLogo />}
                          activeChainId={+chainId! || 0}
                          onConnectorConnect={onConnectorConnect}
                          onConnectorDisconnect={onConnectorDisconnect}
                          isActive={isActive}
                          setError={setError}
                          error={error}
                          defaultChain={defaultChain}/>
}