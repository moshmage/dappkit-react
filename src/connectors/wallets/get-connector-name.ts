import {Connector} from "@web3-react/types";
import {CoinbaseWallet} from "@web3-react/coinbase-wallet";
import {ConnectorsNames} from "../../types/connectors";
import {GnosisSafe} from "@web3-react/gnosis-safe";
import {WalletConnect} from "@web3-react/walletconnect-v2";

export function getConnectorName(connector: Connector): ConnectorsNames {
  if (connector instanceof CoinbaseWallet)
    return "Coinbase";
  if (connector instanceof WalletConnect)
    return "WalletConnect";
  if (connector instanceof GnosisSafe)
    return "GnosisSafe";

  return "Metamask";
}