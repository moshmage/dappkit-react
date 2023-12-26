import type {provider as Provider} from "web3-core";

export type CustomConnectorButtonProps = {
  onConnectorConnect?(p: Provider, address: string, chainId: number): void;
  onConnectorDisconnect?(): void;
  defaultChain?: number;
  onError?(e: Error): void;
  labels?: {
    disconnect: string;
    tryAgain: string;
  }
}