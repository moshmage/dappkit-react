# @layerx-labs/dappkit-react
```bash
$ npm install -s @layerx-labs/dappkit-react
```

## Usage

### Available hooks

```tsx
import {useDappkit,} from "./use-dappkit";
// ... your component

// share this connection with your other dappkit classes
const {connection} = useDappkit();
```

### Wallet selector

```tsx
import {WalletSelector, ConnectorsNames} from "@layerx-labs/dappkit-react";

const [showModal, setShowModal] = useState(false);
// .. your component
<WalletSelector availableWallets={[ConnectorsNames.Metamask, ConnectorsNames.Coinbase]} />
```

> Get notified of chain-id and address changes,

```ts
import {useDappkit} from "@layerx-labs/dappkit-react";

const {address, chainId} = useDappkit();

useEffect(() => {
  console.log(`Info`, address, chainId);
}, [address, chainId])
```

**Supported Wallets**

| wallet            | `ConnectorsNames`  |
|:------------------|:-------------------|
| Coinbase          | Coinbase           |
| Metamask          | Metamask           |
| Safe              | GnosisSafe         |
| Wallet Connect v2 | WalletConnect      |

### Sharing your connection with other dappkit classes

```ts
import {ERC20} from "@taikai/dappkit";
import {useDappkit} from "@layerx-labs/dappkit-react";
import {useEffect, useState} from "react";

function useERC20(tokenAddress: string) {
  const [token, setToken] = useState<ERC20 | null>(null);

  const {connection} = useDappkit();

  useEffect(() => {
    if (!connection) {
      setToken(null);
      return;
    }

    setToken(new ERC20(connection, tokenAddress));
  }, [connection]);

  function transferTokenAmount(amount: number, address: string) {
    if (!token)
      return;

    return token.transferTokenAmount(address, amount);
  }
  
  return {token, transferTokenAmount};
}
```