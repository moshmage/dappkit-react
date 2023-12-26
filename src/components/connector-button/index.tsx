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
                                  defaultChain = 1,
                                  onError = (() => {}),
                                  labels}: ConnectorButtonProps) {
  const {setProvider, address, chainId} = useDappkit()


  const switchChain = useCallback(
    async (_desiredChainId?: number) => {

      try {
        setError(undefined);

        await connector.activate(_desiredChainId);
        if (connector.provider) {
          await setProvider(connector.provider as unknown as Provider);
          onConnectorConnect?.(connector.provider as unknown as Provider, address!, chainId!);
        } else throw new Error(`Failed to get a provider, make sure your connector has one!`)

      } catch (e: any) {
        connector?.resetState?.();
        setError(e);
        onError?.(e);
      }
    }, [connector, activeChainId, setError, onConnectorConnect]
  )


  async function onDisconnectClick() {
    if (connector?.deactivate)
      void connector.deactivate();
    else void connector?.resetState();

    await setProvider(null);
    onConnectorDisconnect?.()
  }


  return <div style={{margin: "1rem 0 0", display: "inline-flex", alignItems: "center"}}>
    {isActive
      ? error
        ? (<button onClick={() => switchChain(defaultChain)} children={labels?.tryAgain || "try again?"}/>)
        : (<button onClick={() => onDisconnectClick()} children={<>{logo} {labels?.disconnect || "Disconnect"}</>}/>)
      : (<button onClick={() => switchChain(defaultChain)} children={error ? labels?.tryAgain || "try again?" : <>{logo} {getConnectorName(connector) || "Unnamed Implementation"}</>}/>)
    }
  </div>
}