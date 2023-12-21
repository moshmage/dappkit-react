import React from "react";
import {coinbaseWallet, hooks} from "../../../connectors/wallets/coinbase-wallet";
import {useConnectorHooks} from "../../../custom-hooks/use-connector-hooks";
import {CustomConnectorButtonProps} from "../../../types/custom-connector-button";
import {ConnectorButton} from "../index";
import CoinbaseLogo from "./logo";
import {useDappkit} from "../../../custom-hooks/use-dappkit";

export function CoinbaseButton({onConnectorConnect, onConnectorDisconnect, defaultChain, onError}: CustomConnectorButtonProps) {
  const {isActive, chainId, error, setError} = useConnectorHooks(hooks);

  return <ConnectorButton activeChainId={chainId || 0}
                          logo={<CoinbaseLogo />}
                          setError={setError}
                          onConnectorConnect={onConnectorConnect}
                          onConnectorDisconnect={onConnectorDisconnect}
                          connector={coinbaseWallet}
                          isActive={isActive}
                          error={error}
                          onError={onError}
                          defaultChain={defaultChain}/>
}