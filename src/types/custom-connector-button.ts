import {Web3Connection} from "@taikai/dappkit";

export type CustomConnectorButtonProps = {
  onConnectorConnect?(c: Web3Connection, address: string, chainId: number): void;
  onConnectorDisconnect?(): void;
  defaultChain?: number;
  onError?(e: Error): void;
  labels?: {
    disconnect: string;
    tryAgain: string;
  }
}