"use client";
import React, { createContext, useContext } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { connectorsForWallets, darkTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { phantomWallet, metaMaskWallet, coinbaseWallet } from '@rainbow-me/rainbowkit/wallets';
import { mainnet, goerli, polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const WalletIdContext = createContext();

const { chains, publicClient } = configureChains(
  [polygon],
  [publicProvider()]
);

// const { connectors } = getDefaultWallets({
//   appName: "My RainbowKit App",
//   projectId: "5d10af3027c340310f3a3da64cbcedac",
//   chains,
// });
const connectors = connectorsForWallets([
  {
    groupName: 'Phantom',
    wallets: [phantomWallet({ chains })],
  },
  {
    groupName: 'Metamask',
    wallets: [metaMaskWallet({ chains })],
  },
  {
    groupName: 'Coinbase',
    wallets: [coinbaseWallet({ chains })],
  },
]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
const Rainbow = ({children}) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      {/* Provide the wallet ID through context */}
      
        <RainbowKitProvider chains={chains}>
          {children}
        </RainbowKitProvider>
     
    </WagmiConfig>
  );
};

export const useWalletId = () => useContext(WalletIdContext);

export default Rainbow;
