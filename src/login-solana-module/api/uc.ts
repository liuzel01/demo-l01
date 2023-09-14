import http from '@/utils/http';
import { handleResult } from '@/utils';

export const ucApi = {
    // metamask 获取 nonce
    async getMetamaskNonce(params = {}) {
        return handleResult(
            await http.post('/uc/auth/phantom/generate-nonce', { params }),
        );
    },
    // metamask 登录注册
    async metamaskLogin(params = {}) {
        return handleResult(await http.post('/uc/auth/phantom/login', { params }));
    },
    // metamask 钱包验证
    async metamaskVerify(params = {}) {
        return handleResult(await http.post('/uc/code/phantom/verify', { params }));
    },
    // metamask 邮箱绑定
    async BindEmail(params = {}) {
        return handleResult(
            await http.post('/uc/security/item/email/bind', { params }),
        );
    },
    // 邮箱注册
    async register(params = {}) {
        return handleResult(await http.post('/uc/auth/register/email', { params }));
    },
    // 登录
    async login(params = {}) {
        return handleResult(await http.post('/uc/auth/login', { params }), {
            handleErrorCode: code => code === 10070,
        });
    },
    // 发送邮箱验证码
    async sendEmailCode(params = {}) {
        return handleResult(await http.post('/uc/auth/email/send', { params }));
    },
    // GA 验证
    async gaVerify(params = {}) {
        return handleResult(await http.post('/uc/code/ga/verify', { params }));
    },
    // Email 验证
    async emailVerify(params = {}) {
        return handleResult(await http.post('/uc/code/email/verify', { params }));
    },
    // 2fa 登录
    async login2fa(params = {}) {
        return handleResult(await http.post('/uc/auth/2fa/login', { params }));
    },
    // 退出
    async logout(params = {}) {
        return handleResult(await http.post('/uc/logout', { params }));
    },
    // 忘记密码 -- 密码重置
    async forgotPasswordReset(params = {}) {
        return handleResult(
            await http.post('/uc/auth/forgot-password/reset', { params }),
        );
    },
    // 修改密码
    async passwordChange(params = {}) {
        return handleResult(await http.put('/uc/change/password', { params }));
    },
    // 忘记密码 账号验证
    async forgotPasswordVerifyLink(params = {}) {
        return handleResult(
            await http.post('/uc/auth/forgot-password/verify-link', { params }),
        );
    },
    // 获取用户信息
    async getInfo() {
        return handleResult(
            await http.get('/uc/getInfo', {
                headers: { 'Cache-Control': 'no-cache' },
            }),
        );
    },
    // 修改昵称
    async changeNickname(params = {}) {
        return handleResult(await http.put('/uc/change/nickname', { params }));
    },
    // 修改密码
    async changePassword(params = {}) {
        return handleResult(await http.put('/uc/change/password', { params }));
    },
    // 绑定metamask-验证
    async bindMetamask(params = {}) {
        return handleResult(
            await http.post('/uc/security/item/bind/phantom', { params }),
        );
    },
    // 修改邮箱
    async changeEmail(params = {}) {
        return handleResult(
            await http.put('/uc/security/item/change/email', { params }),
        );
    },
    // 解除绑定ga
    async unbindGa(params = {}) {
        return handleResult(
            await http.post('/uc/security/item/ga/unbind', { params }),
        );
    },
    // 绑定ga
    async bindGa(params = {}) {
        return handleResult(
            await http.post('/uc/security/item/ga/bind', { params }),
        );
    },
    // 重置ga
    async resetGa(params = {}) {
        return handleResult(await http.post('/uc/auth/reset/ga', { params }));
    },
    // 生成ga QRBarcode
    async getGaSecretKey(query = {}) {
        return handleResult(
            await http.get('/uc/security/item/ga/generate', { query }),
        );
    },
    // 验证安全项
    async verifyStrategy(params = {}) {
        return handleResult(
            await http.post('/uc/security/strategy/verify', { params }),
        );
    },
    // 生成账户
    async getAccountAddress(query = {}) {
        return handleResult(
            await http.get('/account/account-web/deposit-address', { query }),
        );
    },
    // 获取钱包账户
    async getWalletAccount(query = {}) {
        return handleResult(
            await http.get('/account/account-web/wallet-accounts', { query }),
        );
    },
    // 获取用户充提币规则
    async getWithdrawRules(query = {}) {
        return handleResult(
            await http.get('/account/account-web/withdraw-rules', { query }),
        );
    },

    // 账户交易记录
    async getAccountHistory(params = {}) {
        return handleResult(
            await http.post('/account/account-web/deposit-withdraw-history', {
                params,
            }),
        );
    },
    // 充提币
    async postWithdrawAction(params = {}) {
        return handleResult(
            await http.post('/account/account-web/withdraw', { params }),
        );
    },
    //获取market place 列表
    async getMarketPlaceList(params = {}) {
        return handleResult(await http.post('/uc/public/nft/uc-page', { params }));
    },
    // /account/public/account-trade/nft-price-his
    async getTradeNftPriceHis(params = {}) {
        return handleResult(
            await http.post('/account/public/account-trade/nft-price-his', {
                params,
            }),
        );
    },
    //获取owner market place 列表
    async getOwnerMarketPlaceList(params = {}) {
        return handleResult(await http.post('/uc/nft/owner-page', { params }));
    },
    //获取market place详情
    async getMarketPlaceDetail(id = '', query = {}) {
        return handleResult(
            await http.get(`/uc/public/nft/uc-detail/${id}`, { query }),
        );
    },
    //NFT 类别 public/nft/type/uc-dropdown
    async getNftTypeList(id = '', query = {}) {
        return handleResult(
            await http.get(`/uc/public/nft/type/uc-dropdown`, { query }),
        );
    },
    // game types
    async getGameTypeList(id = '', query = {}) {
        return handleResult(
            await http.get(`/uc/public/game/type/uc-dropdown`, { query }),
        );
    },

    //game type
    async getGameTypes(id = '', params = {}) {
        return handleResult(
            await http.post(`/uc/public/game/dropdown-list`, { params }),
        );
    },

    //buy nft item
    async buyNft(params = {}) {
        return handleResult(
            await http.post('/account/account-trade/buy-nft', { params }),
        );
    },

    // game list
    //获取game列表
    async getGameList(params = {}) {
        return handleResult(await http.post('/uc/public/game/page', { params }));
    },
    //获取game详情
    async getGameDetail(id = '', query = {}) {
        return handleResult(
            await http.get(`/uc/public/game/detail/${id}`, { query }),
        );
    },
    //view
    async setUCView(id = '', params = {}) {
        return handleResult(
            await http.post(`/uc/public/nft/uc-view/${id}`, { params }),
        );
    },
    //collect
    async setUCCollection(id = '', params = {}) {
        return handleResult(
            await http.post(`/uc/public/nft/uc-collection/${id}`, { params }),
        );
    },
    //up and down nft action
    async upAndDownAction(params = {}) {
        return handleResult(await http.post(`/uc/nft/uc-switch`, { params }));
    },
    //获取评论列表
    async getGcList(params = {}) {
        return handleResult(
            await http.post(`/uc/public/game-comments/page`, { params }),
        );
    },
    //赞
    async likeApi(id) {
        return handleResult(await http.post(`/uc/game-comments/like/${id}`));
    },
    //踩
    async dislikeApi(id) {
        return handleResult(await http.post(`/uc/game-comments/bury/${id}`));
    },
    //回复评论
    async replyComment(params) {
        return handleResult(await http.post(`/uc/game-comments/reply`, { params }));
    },
    //获取回复
    async getComment(id) {
        return handleResult(await http.get(`/uc/game-comments/get-replies/${id}`));
    },
    // offer list
    async getOfferlist(id, query = {}) {
        return handleResult(
            await http.get(`/uc/public/nft/offer-list/${id}`, { query }),
        );
    },
    //make an offer
    async makeAnOffer(params = {}) {
        return handleResult(await http.post(`/uc/nft/make-offer`, { params }));
    },
    // accept an offer /uc/nft/offer-accept/{id}
    async acceptAnOffer(id, params = {}) {
        return handleResult(
            await http.post(`/uc/nft/offer-accept/${id}`, { params }),
        );
    },
    //校验邮箱是否可用 /uc/auth/register/check-email
    async checkEmail(email) {
        return handleResult(
            await http.get(`/uc/auth/register/check-email?email=${email}`),
        );
    },
    //获取用户未读信息
    async getUnreadMessage(id) {
        return handleResult(
            await http.get(
                `/notification/notice/getUnReadNoticeFlag?ucUserId=${id}&userSource=UC`,
            ),
        );
    },
    //获取用户未处理事件
    async getUnreadMatter() {
        return handleResult(await http.get(`/game/web/nft-event/handle-flag`));
    },
    //获取nft未处理列表
    async getUnNFTList(params) {
        return handleResult(
            await http.post(`/game/web/nft-event/page`, { params }),
        );
    },
    //取消mint,合成
    async abortMint(id) {
        return handleResult(await http.put(`/game/web/nft-event/cancel/${id}`));
    },
    //删除other事件
    async delOther(id) {
        return handleResult(await http.del(`/game/web/nft-event/delete/${id}`));
    },
    //获取未处理事件数量
    async getUnreadMatterNum() {
        return handleResult(await http.get(`/game/web/nft-event/type-num`));
    },
    //获取信息
    async getMessage(params) {
        return handleResult(
            await http.post(`/notification/notice/getNoticeList`, { params }),
        );
    },
    //阅读消息
    async readMessageApi(id) {
        return handleResult(
            await http.put(`/notification/notice/updateReadStatus/${id}`),
        );
    },
    //删除消息
    async deleteMessage(id) {
        return handleResult(await http.del(`/notification/notice/delete/${id}`));
    },
    //invite-flag /uc/auth/invite-flag
    async inviteFlag(query) {
        return handleResult(await http.get(`/uc/auth/invite-flag`, { query }));
    },
    // /uc/profile-info/{gameId}
    async getProfileInfo(id, query) {
        return handleResult(await http.get(`/uc/profile-info/${id}`, { query }));
    },
    // /uc/public/game-resource/get-link
    async getGameResourceLink(query) {
        return handleResult(
            await http.get(`/uc/public/game-resource/get-link`, { query }),
        );
    },
    // /uc/auth/register/validate-invite-code
    async validateInviteCode(params) {
        return handleResult(
            await http.post(`/uc/auth/register/validate-invite-code`, { params }),
        );
    },
    // /game/public/web/game-rank/win-info
    async getGameRankWinInfo(params) {
        return handleResult(
            await http.post(`/game/public/web/game-rank/win-info`, { params }),
        );
    },
    //全部已读
    async readAll(id) {
        return handleResult(
            await http.put(
                `/notification/notice/read-all?userId=${id}&userSource=UC`,
            ),
        );
    },
    //清空全部消息
    async clearAll(id) {
        return handleResult(
            await http.del(
                `/notification/notice/delete-all?userId=${id}&userSource=UC`,
            ),
        );
    },
    //更改头像
    async changeAvatar(params) {
        return handleResult(await http.put(`/uc/change/avatar`, { params }));
    },
    //获取NFT列表（临时）
    async getNftList(name = 'y00ts', query: any = { offset: 0, limit: 20 }) {
        return await http.get(`/collections/${name}/listings`, {
            query,
            headers: {
                'ME-Pub-API-Metadata': `{ paging: true }`,
            },
            baseUrl: '/magiceden/v2',
        });
    },
    async getNftActivites(
        token = 'An6TDQoPxeqpBxZsMJhXBNhNXgxpP7hhsk9DitbeXZTa',
        query: any = { offset: 0, limit: 100 },
    ) {
        return await http.get(`/tokens/${token}/activities`, {
            query,
            baseUrl: '/magiceden/v2',
        });
    },
    async getNftDetail(
        token = 'An6TDQoPxeqpBxZsMJhXBNhNXgxpP7hhsk9DitbeXZTa',
        query: any = { offset: 0, limit: 100 },
    ) {
        return await http.get(`/tokens/${token}`, {
            query,
            baseUrl: '/magiceden/v2',
        });
    },
    //获取到区域服务器
    async getRegionServers(params: any = { offset: 0, limit: 100 }) {
        return handleResult(
            await http.post(`/game/web/server-region/list`, { params }),
        );
    },
    //
    async getPublicRegionServers(params: any = { offset: 0, limit: 100 }) {
        return handleResult(
            await http.post(`/game/public/web/server-region/list`, { params }),
        );
    },
    //获取角色数据统计
    async getRoleDataInfo(
        region = 1,
        server = 1,
        query: any = { offset: 0, limit: 100 },
    ) {
        return handleResult(
            await await http.get(
                `/game/web/server-statistics/role-data/${region}/${server}`,
                {
                    query,
                },
            ),
        );
    },
    //获取英雄角色相关数据统计
    async getRoleHeroDataInfo(
        region = 1,
        server = 1,
        query: any = { offset: 0, limit: 100 },
    ) {
        return handleResult(
            await http.get(
                `/game/web/server-statistics/role-hero-data/${region}/${server}`,
                {
                    query,
                },
            ),
        );
    },
    //更新社交信息
    async updateSocial(params) {
        return handleResult(await http.put(`/uc/change/shareLink`, { params }));
    },
    //更新简介
    async updateBrief(params) {
        return handleResult(await http.put(`/uc/change/introduction`, { params }));
    },
    //装备分页接口
    async nftMarketPlaceEquips(params) {
        //临时用用mock接口
        return handleResult(
            await http.post(`/game/public/web/nft-marketplace/page-equip`, {
                params,
            }),
        );
    },
    //皮肤分页接口 /game/public/web/nft-marketplace/page-skin
    async nftMarketPlaceSkins(params) {
        return handleResult(
            await http.post(`/game/public/web/nft-marketplace/page-skin`, { params }),
        );
    },
    //道具接口 /game/public/web/nft-marketplace/page-skin
    async nftMarketPlaceProps(params) {
        return handleResult(
            await http.post(`/game/public/web/nft-marketplace/page-props`, {
                params,
            }),
        );
    },
    //获取market place详情
    async nftMarketPlaceDetail(id = '', query = {}) {
        return handleResult(
            await http.get(`/game/public/web/nft-marketplace/detail/${id}`, {
                query,
            }),
            // await http.get(`/mocks/detail?id=${id}`, {
            //   query,
            //   baseUrl: '/api',
            // }),
        );
    },
    //活动分页
    async nftMarketPlaceActivity(params) {
        return handleResult(
            await http.post(`/game/public/web/nft-marketplace/activity-page`, {
                params,
            }),
        );
    },
    //offer list
    async nftMarketPlaceOffers(params) {
        return handleResult(
            await http.post(`/game/public/web/nft-marketplace/offer-page`, {
                params,
            }),
        );
    },
    //获取背包分类列表
    async getBackpackTypeList(type) {
        return handleResult(
            await http.get(`/game/web/nft-backpack/type-list?type=${type}`),
        );
    },
    //获取背包列表
    async getBackpackPage(params) {
        return handleResult(
            await http.post(`/game/web/nft-backpack/page`, { params }),
        );
    },
    //统计nft数量
    async getNftTotal() {
        return handleResult(await http.get(`/game/web/nft-backpack/type-num`));
    },
    //获取当前用户所有区服
    async getSelfService() {
        return handleResult(await http.post(`/game/web/server-region/self`));
    },
    //mint成功
    async postMint(params) {
        return handleResult(
            await http.post(`/game/web/nft-event/mint-success`, { params }),
        );
    },
    //用户固定出价成功
    async userSubmitSale(params) {
        return handleResult(
            await http.post(`/game/web/nft-marketplace/fixed-price-shelf`, {
                params,
            }),
        );
    },
    //英式拍卖上架 game/web/nft-marketplace/british-auction-shelf
    async userEnglishSale(params) {
        return handleResult(
            await http.post(`/game/web/nft-marketplace/british-auction-shelf`, {
                params,
            }),
        );
    },
    //浏览量 /game/public/web/nft-marketplace/view
    async NftMarketPlaceView(params) {
        return handleResult(
            await http.post(`/game/public/web/nft-marketplace/view`, {
                params,
            }),
        );
    },
    //获取美元汇率 /game/public/web/nft-marketplace/usd-rate/{currency}
    async nftMarketPlaceUsdRate(currency = '', params) {
        return handleResult(
            await http.get(`/game/public/web/nft-marketplace/usd-rate/${currency}`, {
                params,
            }),
        );
    },
    //获取随机码 /game/public/web/nft-marketplace/chain-nonce
    async serverGetNonce(params) {
        return handleResult(
            await http.get(`/game/public/web/nft-marketplace/chain-nonce`, {
                params,
            }),
        );
    },
    //取消拍卖 /game/web/nft-marketplace/cancel-auction
    async userCancelAuction(params) {
        return handleResult(
            await http.post(`/game/web/nft-marketplace/cancel-auction `, {
                params,
            }),
        );
    },
    //取消固定价格下架
    async userShelve(params) {
        return handleResult(
            await http.post(`/game/web/nft-marketplace/shelved`, {
                params,
            }),
        );
    },
    //Make Offer userAuctionBid  /game/web/nft-marketplace/make-offer
    async userAuctionBid(params) {
        return handleResult(
            await http.post(`/game/web/nft-marketplace/make-offer`, {
                params,
            }),
        );
    },
    //用户购买成功
    async userPurchase(params) {
        return handleResult(
            await http.post(`/game/web/nft-marketplace/buy-success`, {
                params,
            }),
        );
    },
    //用户取消拍卖出价 userAuctionCancelBid
    async userAuctionCancelBid(params) {
        return handleResult(
            await http.post(`/game/web/nft-marketplace/cancel-offer`, {
                params,
            }),
        );
    },
    //出价成功 saleSuccess
    async saleSuccess(params) {
        return handleResult(
            await http.post(`/game/web/nft-marketplace/auction-success`, {
                params,
            }),
        );
    },
    /**
     * 接受出价
     */
    async acceptOffer(params) {
        return handleResult(
            await http.post(`/game/web/nft-marketplace/accept-offer`, {
                params,
            }),
        );
    },
    /**
     * 结束拍卖
     */
    async closeAutcion(params) {
        return handleResult(
            await http.post(`/game/web/nft-marketplace/auction-success`, {
                params,
            }),
        );
    },
    //用户取消托管 userWithdrawNft
    async userWithdrawNft(params) {
        return handleResult(
            await http.post(`/game/web/nft-backpack/un-deposited`, {
                params,
            }),
        );
    },
    //用户取消托管 Skin
    async userWithdrawSkinNft(params) {
        return handleResult(
            await http.post(`/game/web/nft-backpack/skin-un-deposited`, {
                params,
            }),
        );
    },
    //托管
    async userDepositNft(params) {
        return handleResult(
            await http.post(`/game/web/nft-backpack/deposited`, { params }),
        );
    },
    //批量转移
    async allTransfer(params) {
        return handleResult(
            await http.post(`/game/web/nft-backpack/transfer`, { params }),
        );
    },
    //批量收回
    async allBackpack(params) {
        return handleResult(
            await http.post(`/game/web/nft-backpack/take-back`, { params }),
        );
    },
    //批量分配
    async allDistribute(params) {
        return handleResult(
            await http.post(`/game/web/nft-backpack/distribute`, { params }),
        );
    },
    //合成nft
    async userCompose(params) {
        return handleResult(
            await http.post(`/game/web/nft-event/compose`, { params }),
        );
    },
    // 托管校验 /game/web/nft-backpack/deposit-check
    async depositCheck(params) {
        return handleResult(
            await http.post(`/game/web/nft-backpack/deposit-check`, { params }),
        );
    },
    // 获取合成时的gasFee
    async getComFee(type) {
        return handleResult(
            await http.get(`/game/web/gasFee/get-price?type=${type}`),
        );
    },
    // 获取托管费 /game/web/nft-marketplace/custodian-fee
    async custondianFee(query) {
        return handleResult(
            await http.get(`/game/web/nft-marketplace/custodian-fee`, { query }),
        );
    },
    //获取订单收据 /game/web/nft-marketplace/list-receipt/{orderId}
    async nftMarketPlaceListReceipt(orderId, query) {
        return handleResult(
            await http.get(`/game/web/nft-marketplace/list-receipt/${orderId}`, {
                query,
            }),
        );
    },
    // /uc/public/game/invite-code/{inviteNo}
    async kolInviteCode(inviteNo, query) {
        return handleResult(
            await http.get(`/uc/public/game/invite-code/${inviteNo}`, {
                query,
            }),
        );
    },
    //托管费退还 /game/web/nft-marketplace/refund-all-fee
    async nftMarketPlaceRefundAllFee(params) {
        return handleResult(
            await http.post(`/game/web/nft-marketplace/refund-all-fee`, {
                params,
            }),
        );
    },
    //Mint
    async MintNFT(params) {
        return handleResult(
            await http.post(`/game/web/nft-event/mint-equip`, {
                params,
            }),
        );
    },
    //获取英雄职业皮肤分类列表
    async getHeroTypeList(id) {
        return handleResult(
            await http.get(`/game/web/nft-backpack/hero-list?heroType=${id}`),
        );
    },
    //获取英雄皮肤列表
    async getHeroNftList(params) {
        return handleResult(
            await http.post(`/game/web/nft-backpack/hero-page`, { params }),
        );
    },
    // Ranking List /game/public/web/game-rank/statistic-page
    async GetRankingList(params) {
        return handleResult(
            await http.post(`/game/public/web/game-rank/statistic-page`, {
                params,
            }),
        );
    },
    //装备分页
    async gameRankEquipPage(params) {
        return handleResult(
            await http.post(`/game/public/web/game-rank/equip-page`, {
                params,
            }),
        );
    },
    //英雄分页
    async gameRankHeroPage(params) {
        return handleResult(
            await http.post(`/game/public/web/game-rank/hero-page`, {
                params,
            }),
        );
    },
    //道具分页
    async gameRankItemPage(params) {
        return handleResult(
            await http.post(`/game/public/web/game-rank/item-page`, {
                params,
            }),
        );
    },
    //NFT皮肤总榜
    async gameRankNftSkin(params) {
        return handleResult(
            await http.post(`/game/public/web/game-rank/nft-skin`, {
                params,
            }),
        );
    },
    // Nft 分类列表
    async gameRankNftCats(query) {
        return handleResult(
            await http.get(`/game/public/web/game-item-image/list`, {
                query,
            }),
        );
    },
    // 获取ata
    async getAta(query) {
        return handleResult(
            await http.get(`/ata`, {
                query,
                baseUrl: '/api',
            }),
        );
    },
    // 获取token address
    async getTokenAddress(query) {
        return handleResult(
            await http.get(`/game/web/nft-backpack/get-token-address`, {
                query,
            }),
        );
    },
    // 拍卖出价验证 /game/web/nft-marketplace/make-offer-validate/{auctionId}/{price}
    async validateMakeOffer(mintAddress, query) {
        return handleResult(
            await http.get(
                `/game/web/nft-marketplace/make-offer-validate/${mintAddress}`,
                {
                    query,
                },
            ),
        );
    },
    /**
     * 获取交易信息
     * @param auctionId
     * @param price
     * @param query
     */
    async getPollingHashTransaction(query) {
        return handleResult(
            await http.get(`/game/public/web/nft-marketplace/getTransaction`, {
                query,
            }),
        );
    },
    //offers分页
    async getOffersPage(params) {
        return handleResult(
            await http.post(`/game/web/nft-marketplace/my-offer-page`, {
                params,
            }),
        );
    },
    /**
     * 轮询链上信息
     * @param query
     */
    async getPollingListReceiptTransaction(query) {
        return handleResult(
            await http.get(`/polling`, {
                query,
                baseUrl: '/api',
            }),
        );
    },
    //videos分页
    async getVideosList(params) {
        return handleResult(
            await http.post(`/uc/public/game/videos-page`, {
                params,
            }),
        );
    },
    // top videos 
    async getTopVideosList(params) {
        return handleResult(
            await http.post(`/uc/public/game/top-videos`, {
                params,
            }),
        );
    },

};
