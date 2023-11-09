import React from "react";
import {CustomConnectorButtonProps} from "../../../types/custom-connector-button";
import {useConnectorHooks} from "../../../custom-hooks/use-connector-hooks";
import {hooks, metamaskWallet} from "../../../connectors/wallets/metamask-wallet";
import {useDappkitConnection} from "../../../custom-hooks/use-dappkit";
import {ConnectorButton} from "../index";
import MetamaskLogo from "./logo";

export function MetamaskButton({onConnectorConnect, onConnectorDisconnect}: CustomConnectorButtonProps) {
  const {isActive, error, setError} = useConnectorHooks(hooks);
  const {chainId, connected} = useDappkitConnection();

  return <ConnectorButton connector={metamaskWallet}
                          logo={<MetamaskLogo />}
                          activeChainId={chainId || 0}
                          onConnectorConnect={onConnectorConnect}
                          onConnectorDisconnect={onConnectorDisconnect}
                          isActive={connected && isActive}
                          setError={setError}
                          error={error}/>
}