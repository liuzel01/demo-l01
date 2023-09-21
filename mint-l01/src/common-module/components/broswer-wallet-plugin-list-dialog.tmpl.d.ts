interface iBroswerWalletPluginListDialogTmplSubmitTransferParams {

    // [mk] for mint or compound
    eventType?: eventTypeEnum | undefined,
    eventItem?: tDbEventItem | undefined,

    // [mk] for nft state change
    oldNftState?: nftStateEnum | undefined,
    newNftState?: nftStateEnum | undefined,
    nftItem?: tDbNftItem | undefined,

    // [mk] for nft auction bidding
    biddingItem?: tDbNftAuctionBiddingItem | undefined,
    biddingList?: tDbNftAuctionBiddingItem[] | undefined,

    // [mk] for market place mode
    marketPlaceMode?: marketPlaceModeEnum | undefined,
    blindBoxHeroItem?: tDbBlindBoxHeroItem | undefined,

    broswerWalletPluginProvider: tSolanaWalletsAdapterAnchorWallet | undefined,
}