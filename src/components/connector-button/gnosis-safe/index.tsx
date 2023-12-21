import React from "react";
import {useConnectorHooks} from "../../../custom-hooks/use-connector-hooks";
import {CustomConnectorButtonProps} from "../../../types/custom-connector-button";
import {gnosisSafe, hooks} from "../../../connectors/wallets/gnosis-safe";
import {ConnectorButton} from "../index";
import SafeLogo from "./logo";
import {useDappkit} from "../../../custom-hooks/use-dappkit";

export function GnosisSafeButton({onConnectorConnect, onConnectorDisconnect, defaultChain, onError}: CustomConnectorButtonProps) {
  const {isActive, error, chainId, setError} = useConnectorHooks(hooks);

  return <ConnectorButton connector={gnosisSafe}
                          logo={<SafeLogo />}
                          activeChainId={chainId || 0}
                          onConnectorConnect={onConnectorConnect}
                          onConnectorDisconnect={onConnectorDisconnect}
                          isActive={isActive}
                          setError={setError}
                          error={error}
                          defaultChain={defaultChain}
                          onError={onError}/>
}