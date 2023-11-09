import React from "react";
import {coinbaseWallet, hooks} from "../../../connectors/wallets/coinbase-wallet";
import {useConnectorHooks} from "../../../custom-hooks/use-connector-hooks";
import {CustomConnectorButtonProps} from "../../../types/custom-connector-button";
import {useDappkitConnection} from "../../../custom-hooks/use-dappkit";
import {ConnectorButton} from "../index";
import CoinbaseLogo from "./logo";

export function CoinbaseButton({onConnectorConnect, onConnectorDisconnect}: CustomConnectorButtonProps) {
  const {isActive, error, setError} = useConnectorHooks(hooks);
  const {chainId, connected} = useDappkitConnection();

  return <ConnectorButton activeChainId={chainId || 0}
                          logo={<CoinbaseLogo />}
                          setError={setError}
                          onConnectorConnect={onConnectorConnect}
                          onConnectorDisconnect={onConnectorDisconnect}
                          connector={coinbaseWallet}
                          isActive={connected && isActive}
                          error={error}/>
}