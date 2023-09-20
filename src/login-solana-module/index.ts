// import React, { FC, useMemo } from 'react';
// import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
// import {
//     WalletModalProvider,
//     WalletDisconnectButton,
//     WalletMultiButton
// } from '@solana/wallet-adapter-react-ui';
// import { clusterApiUrl } from '@solana/web3.js';

// // Default styles that can be overridden by your app
// require('@solana/wallet-adapter-react-ui/styles.css');

// export const Wallet: FC = () => {
//     // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
//     const network = WalletAdapterNetwork.Devnet;
//     const endpoint = useMemo(() => clusterApiUrl(network), [network]);
//     const wallets = useMemo(
//         () => [
//             /**
//              * Wallets that implement either of these standards will be available automatically.
//              *
//              *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
//              *     (https://github.com/solana-mobile/mobile-wallet-adapter)
//              *   - Solana Wallet Standard
//              *     (https://github.com/solana-labs/wallet-standard)
//              *
//              * If you wish to support a wallet that supports neither of those standards,
//              * instantiate its legacy wallet adapter here. Common legacy adapters can be found
//              * in the npm package `@solana/wallet-adapter-wallets`.
//              */
//             new UnsafeBurnerWalletAdapter(),
//         ],
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//         [network]
//     );

//     return (
//         <ConnectionProvider endpoint= { endpoint } >
//         <WalletProvider wallets={ wallets } autoConnect >
//             <WalletModalProvider>
//             <WalletMultiButton />
//             < WalletDisconnectButton />
//             { /* Your app's components go here, nested within the context providers. */ }
//             < /WalletModalProvider>
//             < /WalletProvider>
//             < /ConnectionProvider>
//     );
// };

// import { useWallet } from '@solana/wallet-adapter-react';
// const Login: React.FC<any> = props => {
//     const {
//         publicKey,
//         wallet,
//         disconnect,
//         signMessage,
//         select,
//         wallets,
//         connect,
//     } = useWallet();
// };
// export default Login

