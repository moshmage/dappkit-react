import type {ConnectorButtonProps} from "../../types/connector-button";
import React, {useCallback, useState} from "react";
import {provider as Provider} from "web3-core";
import {getConnectorName} from "../../connectors/wallets/get-connector-name";
import {useDappkit} from "../../custom-hooks/use-dappkit";

export function ConnectorButton({
                                  activeChainId,
                                  setError,
                                  connector,
                                  isActive,
                                  error,
                                  onConnectorConnect,
                                  logo,
                                  onConnectorDisconnect,
                                  defaultChain = 1}: ConnectorButtonProps) {
  const {setProvider,} = useDappkit()


  const switchChain = useCallback(
    async (_desiredChainId?: number) => {

      try {
        setError(undefined);

        await connector.activate(_desiredChainId);
        if (connector.provider) {
          await setProvider(connector.provider as unknown as Provider);
          onConnectorConnect?.(connector.provider as unknown as Provider);
        } else throw new Error(`Failed to get a provider, make sure your connector has one!`)

      } catch (e: any) {
        connector?.resetState?.();
        setError(e);
        //console.error(e);
      }
    }, [connector, activeChainId, setError, onConnectorConnect]
  )

  async function retry() {
    await switchChain(1)
  }

  async function onDisconnectClick() {
    if (connector?.deactivate)
      void connector.deactivate();
    else void connector?.resetState();

    setProvider(null);
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