import {Connector} from "@web3-react/types";
import {ReactNode} from "react";
import {CustomConnectorButtonProps} from "./custom-connector-button";
import {Web3ReactHooks} from "@web3-react/core";

export type Props = {
  connector: Connector;
  setError: (e?: Error) => void;
  error: Error|undefined;
  isActive: boolean;
  activeChainId: number;
  logo?: ReactNode;
  defaultChain?: number;
};

export type ConnectorButtonProps = Props & CustomConnectorButtonProps;