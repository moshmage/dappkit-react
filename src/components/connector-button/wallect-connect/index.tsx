import React from "react";
import {CustomConnectorButtonProps} from "../../../types/custom-connector-button";
import {useConnectorHooks} from "../../../custom-hooks/use-connector-hooks";
import {ConnectorButton} from "../index";
import {hooks, walletConnect} from "../../../connectors/wallets/wallet-connect";
import WalletConnectLogo from "./logo";
import {useDappkit} from "../../../custom-hooks/use-dappkit";

export function WalletConnectButton({onConnectorConnect, onConnectorDisconnect, defaultChain}: CustomConnectorButtonProps) {
  const {isActive, error, chainId, setError} = useConnectorHooks(hooks);

  return <ConnectorButton connector={walletConnect}
                          logo={<WalletConnectLogo />}
                          activeChainId={chainId || 0}
                          onConnectorConnect={onConnectorConnect}
                          onConnectorDisconnect={onConnectorDisconnect}
                          isActive={isActive}
                          setError={setError}
                          error={error}
                          defaultChain={defaultChain}/>
}