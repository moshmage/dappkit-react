import {WalletSelectorProps} from "../../types/wallet-selector";
import {useDappkit, useDappkitConnection} from "../../custom-hooks/use-dappkit";
import {provider as Provider} from "web3-core";
import {CoinbaseButton} from "../connector-button/coinbase";
import {MetamaskButton} from "../connector-button/metamask";
import {GnosisSafeButton} from "../connector-button/gnosis-safe";
import React from "react";
import {WalletConnectButton} from "../connector-button/wallect-connect";

export function WalletSelector({availableWallets = [], showAddress = true, reloadOnProviderDisconnect = true}: WalletSelectorProps) {
  const {setProvider, initializeConnection} =
    useDappkit(({setProvider, initializeConnection}) =>
      ({setProvider, initializeConnection}));

  const {address} = useDappkitConnection();

  async function onConnectorConnect(provider: Provider) {
    setProvider(null);
    setProvider(provider);
    initializeConnection();
  }

  async function onConnectorDisconnect() {
    setProvider(null);
    if (reloadOnProviderDisconnect)
      window.location.reload();
  }

  return <>
    <div className="wallet-selector-container">
      {showAddress
        ? <div><span className="wallet-connected-address">{address}</span></div>
        : null
      }
      {(!availableWallets.length)
        ? <div>
          <div className="wallet-selector-no-options">No allowed list provided</div>
        </div>
        : null
      }
      <div className="wallet-selector-buttons">
        {availableWallets.includes("Coinbase") ?
          <CoinbaseButton onConnectorConnect={onConnectorConnect}
                          onConnectorDisconnect={onConnectorDisconnect}/> : null}

        {availableWallets.includes("Metamask") ?
          <MetamaskButton onConnectorConnect={onConnectorConnect}
                          onConnectorDisconnect={onConnectorDisconnect}/> : null}

        {availableWallets.includes("GnosisSafe") ?
          <GnosisSafeButton onConnectorConnect={onConnectorConnect}
                            onConnectorDisconnect={onConnectorDisconnect}/> : null}

        {availableWallets.includes("WalletConnect") ?
          <WalletConnectButton onConnectorConnect={onConnectorConnect}
                               onConnectorDisconnect={onConnectorDisconnect}/> : null}
      </div>
    </div>
  </>
}