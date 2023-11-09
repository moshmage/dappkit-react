import React from "react";
import {useConnectorHooks} from "../../../custom-hooks/use-connector-hooks";
import {CustomConnectorButtonProps} from "../../../types/custom-connector-button";
import {useDappkitConnection} from "../../../custom-hooks/use-dappkit";
import {gnosisSafe, hooks} from "../../../connectors/wallets/gnosis-safe";
import {ConnectorButton} from "../index";
import SafeLogo from "./logo";

export function GnosisSafeButton({onConnectorConnect, onConnectorDisconnect}: CustomConnectorButtonProps) {
  const {isActive, error, setError} = useConnectorHooks(hooks);
  const {chainId, connected} = useDappkitConnection();

  return <ConnectorButton connector={gnosisSafe}
                          logo={<SafeLogo />}
                          activeChainId={chainId || 0}
                          onConnectorConnect={onConnectorConnect}
                          onConnectorDisconnect={onConnectorDisconnect}
                          isActive={connected && isActive}
                          setError={setError}
                          error={error}/>
}