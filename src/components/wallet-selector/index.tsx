import {WalletSelectorProps} from "../../types/wallet-selector";
import {useDappkit} from "../../custom-hooks/use-dappkit";
import {CoinbaseButton} from "../connector-button/coinbase";
import {MetamaskButton} from "../connector-button/metamask";
import {GnosisSafeButton} from "../connector-button/gnosis-safe";
import React from "react";
import {WalletConnectButton} from "../connector-button/wallect-connect";

export function WalletSelector({availableWallets = [], showAddress = true, onConnectorConnect, onConnectorDisconnect, defaultChain, onError, labels}: WalletSelectorProps) {
  return <>
    <div className="wallet-selector-container">
      {(!availableWallets.length)
        ? <div>
          <div className="wallet-selector-no-options">No allowed list provided</div>
        </div>
        : null
      }
      <div className="wallet-selector-buttons">
        {availableWallets.includes("Coinbase") ?
          <CoinbaseButton defaultChain={defaultChain}
                          onConnectorConnect={onConnectorConnect}
                          onConnectorDisconnect={onConnectorDisconnect}
                          onError={onError}
                          labels={labels}/> : null}

        {availableWallets.includes("Metamask") ?
          <MetamaskButton defaultChain={defaultChain}
                          onConnectorConnect={onConnectorConnect}
                          onConnectorDisconnect={onConnectorDisconnect}
                          onError={onError}
                          labels={labels}/> : null}

        {availableWallets.includes("GnosisSafe") ?
          <GnosisSafeButton defaultChain={defaultChain}
                            onConnectorConnect={onConnectorConnect}
                            onConnectorDisconnect={onConnectorDisconnect}
                            onError={onError}
                            labels={labels}/> : null}

        {availableWallets.includes("WalletConnect") ?
          <WalletConnectButton defaultChain={defaultChain}
                               onConnectorConnect={onConnectorConnect}
                               onConnectorDisconnect={onConnectorDisconnect}
                               onError={onError}
                               labels={labels}/> : null}
      </div>
    </div>
  </>
}