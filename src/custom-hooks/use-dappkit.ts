import {create} from "zustand";
import type {provider as Provider} from "web3-core";
import {Web3Connection} from "@taikai/dappkit";
import {IUseDappkit} from "../types/use-dappkit";



export const useDappkit = create<IUseDappkit>()((set, get) => ({
  setProvider: async (provider: Provider) => {

    if (!provider) {
      set(() => ({connection: null, provider: null}));
      return null;
    }

    const connection = new Web3Connection({web3CustomProvider: provider, autoStart: false});
    connection.start();
    await connection.connect();

    const address = await connection.getAddress();
    const chainId = await connection.getETHNetworkId();

    if ((provider as any)?.on) {
      (provider as any).on("chainChanged", (_chain: number) => {
        set(() => ({chainId: _chain}))
      });

      (provider as any).on("accountsChanged", (_address: string) => {
        set(() => ({address: _address[0]}))
      });
    }

    set(() => ({provider, connection, address, chainId}));

    return connection;
  },
  disconnect: () => {
    if (!get().provider)
      return;
    if (get().provider?.hasOwnProperty("disconnect"))
      (get().provider as any)?.disconnect();

    set(() => ({connection: null, provider: null, address: "", chainId: 0}));
  },
  provider: null,
  connection: null,
}));

