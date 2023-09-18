<template>
  <button v-on:click="connect">
    Connect to Solana Wallet
  </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

@Component
export default class WalletConnectButton extends Vue {
  async connect() {
    const connection = new Connection(clusterApiUrl('mainnet-beta'));
    
    const walletPublicKey = await PublicKey.default;

    const balance = await connection.getBalance(walletPublicKey);

    console.log(`Connected to wallet with public key ${walletPublicKey.toString()} and balance ${balance}`);
  }
}
</script>
