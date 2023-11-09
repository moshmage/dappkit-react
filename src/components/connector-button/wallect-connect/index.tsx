import React from "react";
import {CustomConnectorButtonProps} from "../../../types/custom-connector-button";
import {useConnectorHooks} from "../../../custom-hooks/use-connector-hooks";
import {useDappkitConnection} from "../../../custom-hooks/use-dappkit";
import {ConnectorButton} from "../index";
import {hooks, walletConnect} from "../../../connectors/wallets/wallet-connect";
import WalletConnectLogo from "./logo";

export function WalletConnectButton({onConnectorConnect, onConnectorDisconnect}: CustomConnectorButtonProps) {
  const {isActive, error, setError} = useConnectorHooks(hooks);
  const {chainId, connected} = useDappkitConnection();

  return <ConnectorButton connector={walletConnect}
                          logo={<WalletConnectLogo />}
                          activeChainId={chainId || 0}
                          onConnectorConnect={onConnectorConnect}
                          onConnectorDisconnect={onConnectorDisconnect}
                          isActive={connected && isActive}
                          setError={setError}
                          error={error}/>
}