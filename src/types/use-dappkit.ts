import type {provider as Provider} from "web3-core";
import {Web3Connection} from "@taikai/dappkit";

export type IUseDappkit = {
  setProvider(p: Provider): Promise<Web3Connection|null>,
  disconnect(): void,
  provider: Provider|null,
  connection: Web3Connection|null,
  chainId?: number,
  address?: string
}