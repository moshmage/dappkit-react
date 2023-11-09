import type {ConnectorButtonProps} from "../../types/connector-button";
import React, {useCallback, useState} from "react";
import {provider as Provider} from "web3-core";
import {getConnectorName} from "../../connectors/wallets/get-connector-name";

export function ConnectorButton({activeChainId, setError, connector, isActive, error, onConnectorConnect, logo, onConnectorDisconnect}: ConnectorButtonProps) {
  const [desiredChainId, setDesiredChainId] = useState<number|undefined>(undefined);

  const switchChain = useCallback(
    async (_desiredChainId?: number) => {

      try {
        if ((_desiredChainId === activeChainId) || (_desiredChainId === -1 && activeChainId !== undefined)) {
          setError(undefined);
          return;
        }

        await connector.activate(_desiredChainId);
        if (connector.provider)
          onConnectorConnect?.(connector.provider as unknown as Provider);
        else throw new Error(`Failed to get a provider, make sure your connector has one!`)

      } catch (e: any) {
        connector?.resetState?.();
        setError(e);
      }
    }, [connector, activeChainId, setError, onConnectorConnect]
  )

  async function retry() {
    await switchChain(desiredChainId!)
  }

  async function onDisconnectClick() {
    if (connector?.deactivate)
      void connector.deactivate();
    else void connector?.resetState();

    setDesiredChainId(undefined);
    onConnectorDisconnect?.()
  }

  async function onSelectChain(selected?: number) {
      await switchChain(selected)
  }

  return <div style={{margin: "1rem 0 0", display: "inline-flex", alignItems: "center"}}>
    {isActive
      ? error
        ? (<button onClick={() => retry()} children="try again?"/>)
        : (<button onClick={() => onDisconnectClick()} children="Disconnect"/>)
      : (<button onClick={() => onSelectChain(1)} children={error ? "try again?" : <>{logo} {getConnectorName(connector) || "Unnamed Implementation"}</>}/>)
    }
  </div>
}