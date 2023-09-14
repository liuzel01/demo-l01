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

import { ref } from 'vue'
const isSign = ref(false);
const walletAddress = async () => {
    if (!wallet || !base58) return;
    const publicAddress = base58;
    //1.调用接口获取nonce
    const { nonce } = await ucApi.getMetamaskNonce({
        publicAddress,
        operateEnum: MetamaskOperate.login,
    });
    // // `publicKey` will be null if the wallet isn't connected
    // if (!publicKey) throw new Error(t('solana.notConnect'));
    // if (!signMessage)
    //     throw new Error(t('solana.signError'));
    const now = moment().utc()
    const timeString = now.format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
    //2.自定义message,自定文案+publicAddress+nonce
    const message = `Welcome to the Seeds!\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n${publicAddress}\n\nURL:https://www.theseeds.io/\nVersion:1\nChain ID:mainnet\nNonce:${nonce}\nIssued At:${timeString}`;
    //3.调用钱包api拉起签名,对message做了UTF-8字节流转换(new TextEncoder().encode()),此处API限制必须要转换
    //4.接口返回signature,返回的数据是一个Uint8Array,例[65, 194, 32, 13, 134, 189, 107, 70, 220, 51, 226, 42, 18, 244, 7, 75, 139, 157, 58, 181, 139, 174, 119, 199, 217, 67, 8, 166, 139, 78, 56, 254, 35, 213, 247, 25, 164, 80, 63, 10, 188, 61, 175, 226, 43, 110, 114, 149, 70, 230, 140, 128, 84, 200, 244, 216, 214, 173, 102, 57, 181, 119, 250, 2, buffer: ArrayBuffer(64), byteLength: 64, byteOffset: 0, length: 64, Symbol(Symbol.toStringTag): 'Uint8Array']
    let address1 = JSON.parse(JSON.stringify(walletNum.current))
    const signature = await signMessage(new TextEncoder().encode(message));
    let address2 = JSON.parse(JSON.stringify(walletNum.current))
    if (address1 !== address2) return
    //5.此处针对后端接口要求对返回的signature进行转换
    const newArray = Uint8Array.from(signature);
    const newSignature = bs58.encode(newArray);
    const params = {
        message,
        publicAddress,
        signature: newSignature,
        // inviteCode,
    };
    //8.非首次注册,调用后端接口验证签名
    const result = await ucApi.metamaskLogin(params);
    if (result) {
        await writeToken(result.ucToken);
        Notification.success({
            title: t('login.success'),
        });
        isSign.current = false
        setTimeout(() => {
            localStorage.setItem('loginMethod', 'wallet')
            login$.next()
        }, 500)
        // loginSuccess();
    }
};