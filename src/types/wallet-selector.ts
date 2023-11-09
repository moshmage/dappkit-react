import {ConnectorsNames} from "./connectors";

export type WalletSelectorProps = {
  availableWallets: ConnectorsNames[];

  showAddress?: boolean;

  /** some providers do not have a "disconnect" event and thus might need reload */
  reloadOnProviderDisconnect?: boolean;
}