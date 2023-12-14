import {WalletSelectorProps} from "../../types/wallet-selector";
import {useDappkit} from "../../custom-hooks/use-dappkit";
import {CoinbaseButton} from "../connector-button/coinbase";
import {MetamaskButton} from "../connector-button/metamask";
import {GnosisSafeButton} from "../connector-button/gnosis-safe";
import React from "react";
import {WalletConnectButton} from "../connector-button/wallect-connect";

export function WalletSelector({availableWallets = [], showAddress = true, onConnectorConnect, onConnectorDisconnect, defaultChain}: WalletSelectorProps) {
  const {address} = useDappkit();

  return <>
    <div className="wallet-selector-container">
      <div><span className="wallet-connected-address">{address}</span></div>
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
                          onConnectorDisconnect={onConnectorDisconnect}/> : null}

        {availableWallets.includes("Metamask") ?
          <MetamaskButton defaultChain={defaultChain}
                          onConnectorConnect={onConnectorConnect}
                          onConnectorDisconnect={onConnectorDisconnect}/> : null}

        {availableWallets.includes("GnosisSafe") ?
          <GnosisSafeButton defaultChain={defaultChain}
                            onConnectorConnect={onConnectorConnect}
                            onConnectorDisconnect={onConnectorDisconnect}/> : null}

        {availableWallets.includes("WalletConnect") ?
          <WalletConnectButton defaultChain={defaultChain}
                               onConnectorConnect={onConnectorConnect}
                               onConnectorDisconnect={onConnectorDisconnect}/> : null}
      </div>
    </div>
  </>
}