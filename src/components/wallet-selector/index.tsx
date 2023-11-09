import {ModalModes, WalletSelectorProps} from "../../types/wallet-selector";
import {useDappkit, useDappkitConnectionInfo} from "../../custom-hooks/use-dappkit";
import {provider as Provider} from "web3-core";
import {CoinbaseButton} from "../connector-button/coinbase";
import {MetamaskButton} from "../connector-button/metamask";
import {GnosisSafeButton} from "../connector-button/gnosis-safe";
import React from "react";
import {ConnectorsNames} from "../../types/connectors";
import {WalletConnectButton} from "../connector-button/wallect-connect";

export function WalletSelector({
                                 showWallets = [],
                                 mode = ModalModes.Sidebar
                               }: WalletSelectorProps) {
  const {setProvider, initializeConnection} =
    useDappkit(({setProvider, initializeConnection}) =>
      ({setProvider, initializeConnection}));

  const {address} = useDappkitConnectionInfo();

  async function onConnectorConnect(provider: Provider) {
    setProvider(null);
    setProvider(provider);
    initializeConnection();
  }

  async function onConnectorDisconnect() {
    setProvider(null);
    window.location.reload();
  }

  return <>
    <div className="wallet-selector-container">
      <div>
        <span className="wallet-connected-address">{address}</span>
      </div>
      {!showWallets.length ? <div><div>No allowed list provided</div></div> : null}
      <div>
        {showWallets.includes(ConnectorsNames.Coinbase) ?
          <CoinbaseButton variant={mode}
                          onConnectorConnect={onConnectorConnect}
                          onConnectorDisconnect={onConnectorDisconnect}/> : null}

        {showWallets.includes(ConnectorsNames.Metamask) ?
          <MetamaskButton variant={mode}
                          onConnectorConnect={onConnectorConnect}
                          onConnectorDisconnect={onConnectorDisconnect}/> : null}
        {showWallets.includes(ConnectorsNames.GnosisSafe) ?
          <GnosisSafeButton variant={mode}
                            onConnectorConnect={onConnectorConnect}
                            onConnectorDisconnect={onConnectorDisconnect}/> : null}
        {showWallets.includes(ConnectorsNames.WalletConnect) ?
          <WalletConnectButton variant={mode}
                               onConnectorConnect={onConnectorConnect}
                               onConnectorDisconnect={onConnectorDisconnect}/> : null}
      </div>
    </div>
  </>
}