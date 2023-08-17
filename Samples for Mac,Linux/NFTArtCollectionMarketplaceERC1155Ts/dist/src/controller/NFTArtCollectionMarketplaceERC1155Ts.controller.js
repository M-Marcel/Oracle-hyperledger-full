"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTArtCollectionMarketplaceERC1155TsController = void 0;
const tslib_1 = require("tslib");
const yup = require("yup");
const decorators_1 = require("../../lib/decorators");
const ochain_controller_1 = require("../../lib/ochain-controller");
const NFTArtCollectionMarketplaceERC1155Ts_model_1 = require("../model/NFTArtCollectionMarketplaceERC1155Ts.model");
const NFTArtCollectionMarketplaceERC1155Ts_model_2 = require("../model/NFTArtCollectionMarketplaceERC1155Ts.model");
const erc1155_token_account_1 = require("../../lib/erc1155-token-account");
const erc1155_token_model_1 = require("../../lib/erc1155-token-model");
class NFTArtCollectionMarketplaceERC1155TsController extends ochain_controller_1.OchainController {
    constructor(ctx) {
        super(ctx.Stub);
        this.Ctx = ctx;
    }
    init(adminList) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Admin.initAdmin(adminList);
            yield this.Ctx.ERC1155Token.saveClassInfo(NFTArtCollectionMarketplaceERC1155Ts_model_1.ArtCollection);
            return;
        });
    }
    isTokenAdmin(orgId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ADMIN.isUserTokenAdmin", "TOKEN");
            return yield this.Ctx.ERC1155Auth.isUserTokenAdmin(orgId, userId);
        });
    }
    addTokenAdmin(orgId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ADMIN.addAdmin", "TOKEN");
            return yield this.Ctx.ERC1155Admin.addAdmin(orgId, userId);
        });
    }
    removeTokenAdmin(orgId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ADMIN.removeAdmin", "TOKEN");
            return yield this.Ctx.ERC1155Admin.removeAdmin(orgId, userId);
        });
    }
    getAllTokenAdmins() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ADMIN.getAllAdmins", "TOKEN");
            return yield this.Ctx.ERC1155Admin.getAllAdmins();
        });
    }
    createAccount(orgId, userId, ftAccount, nftAccount) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.createAccount", "TOKEN");
            return yield this.Ctx.ERC1155Account.createAccount(orgId, userId, ftAccount, nftAccount);
        });
    }
    createUserAccount(orgId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.createUserAccount", "TOKEN");
            return yield this.Ctx.ERC1155Account.createUserAccount(orgId, userId);
        });
    }
    createTokenAccount(orgId, userId, tokenType) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.createTokenAccount", "TOKEN");
            return yield this.Ctx.ERC1155Account.createTokenAccount(orgId, userId, tokenType);
        });
    }
    associateFungibleTokenToAccount(orgId, userId, tokenId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const accountId = this.Ctx.ERC1155Account.generateAccountId(orgId, userId, erc1155_token_account_1.ACCOUNT_TYPE.USER_ACCOUNT);
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.associateFungibleTokenToAccount", "TOKEN", accountId);
            return yield this.Ctx.ERC1155Account.associateTokenToToken(accountId, tokenId);
        });
    }
    getAccountHistory(orgId, userId, tokenId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userAccountId = yield this.Ctx.ERC1155Account.generateAccountId(orgId, userId, erc1155_token_account_1.ACCOUNT_TYPE.USER_ACCOUNT);
            const userAccount = yield this.Ctx.ERC1155Account.getAccount(userAccountId, tokenId);
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.history", "TOKEN", userAccountId);
            return yield this.Ctx.ERC1155Account.getAccountHistory(userAccount.accountId);
        });
    }
    getAccountTransactionHistory(orgId, userId, tokenId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userAccountId = yield this.Ctx.ERC1155Account.generateAccountId(orgId, userId, erc1155_token_account_1.ACCOUNT_TYPE.USER_ACCOUNT);
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.getAccountTransactionHistory", "TOKEN", userAccountId);
            const account = yield this.Ctx.ERC1155Account.getAccount(userAccountId, tokenId);
            return yield this.Ctx.ERC1155Account.getAccountTransactionHistory(account.accountId);
        });
    }
    getAccount(orgId, userId, tokenId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userAccountId = this.Ctx.ERC1155Account.generateAccountId(orgId, userId, erc1155_token_account_1.ACCOUNT_TYPE.USER_ACCOUNT);
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.getAccount", "TOKEN", userAccountId);
            return yield this.Ctx.ERC1155Account.getAccount(userAccountId, tokenId);
        });
    }
    getAllAccounts() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.getAllAccounts", "TOKEN");
            return yield this.Ctx.ERC1155Account.getAllAccounts();
        });
    }
    getAccountDetailsByUser(orgId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userAccountId = this.Ctx.ERC1155Account.generateAccountId(orgId, userId, erc1155_token_account_1.ACCOUNT_TYPE.USER_ACCOUNT);
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.getAccountDetailsByUser", "TOKEN", userAccountId);
            return yield this.Ctx.ERC1155Account.getAccountDetailsByUser(orgId, userId);
        });
    }
    getUserByAccountId(accountId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.ERC1155Account.getUserByAccountId(accountId);
        });
    }
    createLoyaltyToken(tokenAsset) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.save", "TOKEN");
            return yield this.Ctx.ERC1155Token.save(tokenAsset);
        });
    }
    updateLoyaltyToken(tokenAsset) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.update", "TOKEN");
            return yield this.Ctx.ERC1155Token.update(tokenAsset);
        });
    }
    createArtCollectionToken(tokenAsset, quantity) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.ERC1155Token.save(tokenAsset, quantity);
        });
    }
    updateArtCollectionToken(tokenAsset) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.ERC1155Token.update(tokenAsset);
        });
    }
    addRole(orgId, userId, role, tokenDetail) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.addRoleMember", "TOKEN");
            const userAccountId = this.Ctx.ERC1155Account.generateAccountId(orgId, userId, erc1155_token_account_1.ACCOUNT_TYPE.USER_ACCOUNT);
            const token = yield this.Ctx.ERC1155Token.getTokenByIdOrName(tokenDetail);
            return yield this.Ctx.ERC1155Token.addRoleMember(role, userAccountId, token);
        });
    }
    isInRole(orgId, userId, role, tokenDetail) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.removeRoleMember", "TOKEN");
            const userAccountId = this.Ctx.ERC1155Account.generateAccountId(orgId, userId, erc1155_token_account_1.ACCOUNT_TYPE.USER_ACCOUNT);
            const token = yield this.Ctx.ERC1155Token.getTokenByIdOrName(tokenDetail);
            return yield this.Ctx.ERC1155Token.isInRole(role, userAccountId, token);
        });
    }
    removeRole(orgId, userId, role, tokenDetail) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.removeRoleMember", "TOKEN");
            const userAccountId = this.Ctx.ERC1155Account.generateAccountId(orgId, userId, erc1155_token_account_1.ACCOUNT_TYPE.USER_ACCOUNT);
            const token = yield this.Ctx.ERC1155Token.getTokenByIdOrName(tokenDetail);
            return yield this.Ctx.ERC1155Token.removeRoleMember(role, userAccountId, token);
        });
    }
    getAccountsByRole(role, tokenDetail) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ROLE.getAccountsByRole", "TOKEN");
            const token = yield this.Ctx.ERC1155Token.getTokenByIdOrName(tokenDetail);
            return yield this.Ctx.ERC1155Token.getAccountsByRole(role, token);
        });
    }
    getUsersByRole(role, tokenDetail) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ROLE.getUsersByRole", "TOKEN");
            const token = yield this.Ctx.ERC1155Token.getTokenByIdOrName(tokenDetail);
            return yield this.Ctx.ERC1155Token.getUsersByRole(role, token);
        });
    }
    mintBatch(orgId, userId, tokenIds, quantity) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const accountId = this.Ctx.ERC1155Account.generateAccountId(orgId, userId, erc1155_token_account_1.ACCOUNT_TYPE.USER_ACCOUNT);
            return yield this.Ctx.ERC1155Token.mintBatch(accountId, tokenIds, quantity);
        });
    }
    batchTransferFrom(fromOrgId, fromUserId, toOrgId, toUserId, tokenIds, quantity) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fromAccountId = this.Ctx.ERC1155Account.generateAccountId(fromOrgId, fromUserId, erc1155_token_account_1.ACCOUNT_TYPE.USER_ACCOUNT);
            const toAccountId = this.Ctx.ERC1155Account.generateAccountId(toOrgId, toUserId, erc1155_token_account_1.ACCOUNT_TYPE.USER_ACCOUNT);
            return yield this.Ctx.ERC1155Token.batchTransferFrom(fromAccountId, toAccountId, tokenIds, quantity);
        });
    }
    safeBatchTransferFrom(fromOrgId, fromUserId, toOrgId, toUserId, tokenIds, quantity) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fromAccountId = this.Ctx.ERC1155Account.generateAccountId(fromOrgId, fromUserId, erc1155_token_account_1.ACCOUNT_TYPE.USER_ACCOUNT);
            const toAccountId = this.Ctx.ERC1155Account.generateAccountId(toOrgId, toUserId, erc1155_token_account_1.ACCOUNT_TYPE.USER_ACCOUNT);
            return yield this.Ctx.ERC1155Token.safeBatchTransferFrom(fromAccountId, toAccountId, tokenIds, quantity);
        });
    }
    balanceOfBatch(orgIds, userIds, tokenIds) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let callerAccountCheck = false;
            try {
                yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.balanceOfBatch", "TOKEN");
            }
            catch (err) {
                callerAccountCheck = true;
            }
            const accountIds = yield this.Ctx.ERC1155Account.generateAccountIds(orgIds, userIds, callerAccountCheck);
            return yield this.Ctx.ERC1155Account.balanceOfBatch(accountIds, tokenIds);
        });
    }
    exchangeToken(fromTokenId, fromOrgId, fromUserId, fromTokenQuantity, toTokenId, toOrgId, toUserId, toTokenQuantity) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fromUserAccountId = this.Ctx.ERC1155Account.generateAccountId(fromOrgId, fromUserId, erc1155_token_account_1.ACCOUNT_TYPE.USER_ACCOUNT);
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.exchangeToken", "TOKEN", fromUserAccountId);
            const toUserAccountId = this.Ctx.ERC1155Account.generateAccountId(toOrgId, toUserId, erc1155_token_account_1.ACCOUNT_TYPE.USER_ACCOUNT);
            return yield this.Ctx.ERC1155Token.exchangeToken(fromTokenId, fromUserAccountId, fromTokenQuantity, toTokenId, toUserAccountId, toTokenQuantity);
        });
    }
    burnBatch(orgId, userId, tokenIds, quantity) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const accountId = this.Ctx.ERC1155Account.generateAccountId(orgId, userId, erc1155_token_account_1.ACCOUNT_TYPE.USER_ACCOUNT);
            return yield this.Ctx.ERC1155Token.burn(accountId, tokenIds, quantity);
        });
    }
    getTokenHistory(tokenId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.ERC1155Token.history(tokenId);
        });
    }
    getTransactionById(transactionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.ERC1155Transaction.getTransactionById(transactionId);
        });
    }
    deleteHistoricalTransactions(time_to_expiration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("TRANSACTION.deleteTransactions", "TOKEN");
            return yield this.Ctx.ERC1155Transaction.deleteTransactions(time_to_expiration);
        });
    }
    getAllTokens() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.getAllTokens", "TOKEN");
            return yield this.Ctx.ERC1155Token.getAllTokens();
        });
    }
    getTokenById(tokenId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.get", "TOKEN", tokenId);
            return yield this.Ctx.ERC1155Token.get(tokenId);
        });
    }
    getAllTokensByUser(orgId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const accountId = this.Ctx.ERC1155Account.generateAccountId(orgId, userId, erc1155_token_account_1.ACCOUNT_TYPE.USER_ACCOUNT);
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.getAllTokensByUser", "TOKEN", accountId);
            return yield this.Ctx.ERC1155Token.getAllTokensByUser(accountId);
        });
    }
    ownerOf(tokenId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.ERC1155Token.ownerOf(tokenId);
        });
    }
    URI(tokenId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.ERC1155Token.tokenURI(tokenId);
        });
    }
    name(tokenId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.ERC1155Token.name(tokenId);
        });
    }
    totalSupply(tokenDetail) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.totalSupply", "TOKEN");
            const token = yield this.Ctx.ERC1155Token.getTokenByIdOrName(tokenDetail);
            return yield this.Ctx.ERC1155Token.totalSupply(token);
        });
    }
    totalNetSupply(tokenDetail) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.totalNetSupply", "TOKEN");
            const token = yield this.Ctx.ERC1155Token.getTokenByIdOrName(tokenDetail);
            return yield this.Ctx.ERC1155Token.totalNetSupply(token);
        });
    }
    getTokensByName(tokenName) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.getTokensByName", "TOKEN");
            return yield this.Ctx.ERC1155Token.getTokensByName(tokenName);
        });
    }
    getTokenDecimal(tokenId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = yield this.getTokenById(tokenId);
            yield this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.getDecimals", "TOKEN");
            return {
                msg: `Token Id: ${tokenId} has ${this.Ctx.ERC1155Token.getDecimals(token)} decimal places.`,
            };
        });
    }
    executeQuery(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(query);
            return result;
        });
    }
    sell(token_id, selling_price) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
        });
    }
    buyWithEthCoin(from_org_id, from_user_id, to_org_id, to_user_id, nft_id, loyalty_id, eth_qty, loyalty_reward_quantity) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
        });
    }
}
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.array().of(yup.object()).nullable()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "init", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "isTokenAdmin", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "addTokenAdmin", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "removeTokenAdmin", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "getAllTokenAdmins", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.boolean(), yup.boolean()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "createAccount", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "createUserAccount", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "createTokenAccount", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "associateFungibleTokenToAccount", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "getAccountHistory", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "getAccountTransactionHistory", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "getAccount", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "getAllAccounts", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "getAccountDetailsByUser", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "getUserByAccountId", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(NFTArtCollectionMarketplaceERC1155Ts_model_2.Loyalty),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [NFTArtCollectionMarketplaceERC1155Ts_model_2.Loyalty]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "createLoyaltyToken", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(NFTArtCollectionMarketplaceERC1155Ts_model_2.Loyalty),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [NFTArtCollectionMarketplaceERC1155Ts_model_2.Loyalty]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "updateLoyaltyToken", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(NFTArtCollectionMarketplaceERC1155Ts_model_1.ArtCollection, yup.number()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [NFTArtCollectionMarketplaceERC1155Ts_model_1.ArtCollection, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "createArtCollectionToken", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(NFTArtCollectionMarketplaceERC1155Ts_model_1.ArtCollection),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [NFTArtCollectionMarketplaceERC1155Ts_model_1.ArtCollection]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "updateArtCollectionToken", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string(), yup.object()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "addRole", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string(), yup.object()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "isInRole", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string(), yup.object()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "removeRole", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.object()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "getAccountsByRole", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.object()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "getUsersByRole", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.array().of(yup.string()), yup.array().of(yup.number())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Array, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "mintBatch", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string(), yup.string(), yup.array().of(yup.string()), yup.array().of(yup.number())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, Array, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "batchTransferFrom", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string(), yup.string(), yup.array().of(yup.string()), yup.array().of(yup.number())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, Array, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "safeBatchTransferFrom", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.array().of(yup.string()), yup.array().of(yup.string()), yup.array().of(yup.string())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Array, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "balanceOfBatch", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string(), yup.number(), yup.string(), yup.string(), yup.string(), yup.number()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, Number, String, String, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "exchangeToken", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.array().of(yup.string()), yup.array().of(yup.number())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Array, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "burnBatch", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "getTokenHistory", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "getTransactionById", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.date()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Date]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "deleteHistoricalTransactions", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "getAllTokens", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "getTokenById", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "getAllTokensByUser", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "ownerOf", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "URI", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "name", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.object()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "totalSupply", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.object()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "totalNetSupply", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "getTokensByName", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "getTokenDecimal", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "executeQuery", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.number()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "sell", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string(), yup.string(), yup.array().of(yup.string()), yup.array().of(yup.string()), yup.array().of(yup.number()), yup.array().of(yup.number())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, Array, Array, Array, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTArtCollectionMarketplaceERC1155TsController.prototype, "buyWithEthCoin", null);
exports.NFTArtCollectionMarketplaceERC1155TsController = NFTArtCollectionMarketplaceERC1155TsController;
//# sourceMappingURL=NFTArtCollectionMarketplaceERC1155Ts.controller.js.map