import type {provider as Provider} from "web3-core";

export type CustomConnectorButtonProps = {
  onConnectorConnect(p: Provider): void;
  onConnectorDisconnect(): void;
}