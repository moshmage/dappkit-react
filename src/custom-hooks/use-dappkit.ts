import {create} from "zustand";
import type {provider as Provider} from "web3-core";
import {Web3Connection} from "@taikai/dappkit";
import {Web3ReactHooks} from "@web3-react/core";
import {useShallow} from "zustand/react/shallow";
import {useCallback, useEffect, useMemo, useState} from "react";

type UseDappkit = {
  setProvider(p: Provider): Promise<void>,
  disconnect(): void,
  setHooks(hook: Web3ReactHooks): void,
  provider: Provider|null,
  connection: Web3Connection|null,
  chainId?: number,
  address?: string,
  hooks: Web3ReactHooks|null,

}

export const useDappkit = create<UseDappkit>()((set, get) => ({
  setProvider: async (provider: Provider) => {

    const connection = new Web3Connection({web3CustomProvider: provider, autoStart: false});
    connection.start();
    await connection.connect();

    const address = await connection.getAddress();
    const chainId = await connection.getETHNetworkId();

    if ((provider as any).on) {
      (provider as any).on("chainChanged", (_chain: number) => {
        set(() => ({chainId: _chain}))
      });

      (provider as any).on("accountsChanged", (_address: string) => {
        set(() => ({address: _address[0]}))
      });
    }

    set(() => ({provider, connection, address, chainId, hooks: null}));
  },
  disconnect: () => {
    if (!get().provider)
      return;
    if (get().provider?.hasOwnProperty("disconnect"))
      (get().provider as any)?.disconnect();

    set(() => ({connection: null, provider: null}))
  },
  setHooks: (hooks: Web3ReactHooks) => {
    set(() => ({hooks}));
  },
  provider: null,
  connection: null,
  hooks: null,
}));

export const useConnection = () => {
  const {hooks} = useDappkit();
  const stableHook = useCallback(hooks ?? {} as any, [hooks]);

  return {
    hooks: stableHook,
  }
}