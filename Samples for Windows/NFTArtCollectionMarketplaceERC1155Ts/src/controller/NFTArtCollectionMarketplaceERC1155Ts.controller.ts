/**
 *
 * Copyright (c) 2022, Oracle and/or its affiliates. All rights reserved.
 *
 */
import * as yup from "yup";
import { Validator } from "../../lib/decorators";
import { OchainController } from "../../lib/ochain-controller";
import { ArtCollection } from "../model/NFTArtCollectionMarketplaceERC1155Ts.model";
import { Loyalty } from "../model/NFTArtCollectionMarketplaceERC1155Ts.model";
import { Context } from "../../lib/ochain-transaction-context";
import { ERC1155TokenAdminAsset } from "../../lib/erc1155-token-admin";
import { ACCOUNT_TYPE } from "../../lib/erc1155-token-account";
import { TokenDetail } from "../../lib/erc1155-token-role";
import { ERC1155UserAccount, TokenType } from "../../lib/erc1155-token-model";

export class NFTArtCollectionMarketplaceERC1155TsController extends OchainController {
  private Ctx: Context;

  constructor(ctx: Context) {
    super(ctx.Stub);
    this.Ctx = ctx;
  }


  /**
   * Function 'init' can be extended to include other parameters as shown in below examples:
   * Example 1:
   *   @Validator(yup.array().of(yup.object()))
   *   public async init(adminList: TokenAdminAsset[]) {
   *
   * Example 2:
   *   @Validator(yup.array().of(yup.object()), yup.string(), yup.string())
   *   public async init(adminList: TokenAdminAsset[], initStr: string, org_id: string) {
   *
   * Note - On adding/deleting a parameter in Function, please update the @Validator decorator accordingly.
   */
  @Validator(yup.array().of(yup.object()).nullable())
  public async init(adminList: ERC1155TokenAdminAsset[]) {
    await this.Ctx.ERC1155Admin.initAdmin(adminList);
    await this.Ctx.ERC1155Token.saveClassInfo(ArtCollection);
    // await this.Ctx.ERC1155Token.saveDeleteTransactionInfo();
    return;
  }

  //-----------------------------------------------------------------------------
  // Admin setup
  //-----------------------------------------------------------------------------

  @Validator(yup.string(), yup.string())
  public async isTokenAdmin(orgId: string, userId: string) {
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ADMIN.isUserTokenAdmin", "TOKEN");
    return await this.Ctx.ERC1155Auth.isUserTokenAdmin(orgId, userId);
  }

  @Validator(yup.string(), yup.string())
  public async addTokenAdmin(orgId: string, userId: string) {
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ADMIN.addAdmin", "TOKEN");
    return await this.Ctx.ERC1155Admin.addAdmin(orgId, userId);
  }

  @Validator(yup.string(), yup.string())
  public async removeTokenAdmin(orgId: string, userId: string) {
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ADMIN.removeAdmin", "TOKEN");
    return await this.Ctx.ERC1155Admin.removeAdmin(orgId, userId);
  }

  @Validator()
  public async getAllTokenAdmins() {
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ADMIN.getAllAdmins", "TOKEN");
    return await this.Ctx.ERC1155Admin.getAllAdmins();
  }

  //-----------------------------------------------------------------------------
  // Account setup
  //-----------------------------------------------------------------------------

  @Validator(yup.string(), yup.string(), yup.boolean(), yup.boolean())
  public async createAccount(orgId: string, userId: string, ftAccount: boolean, nftAccount: boolean) {
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.createAccount", "TOKEN");
    return await this.Ctx.ERC1155Account.createAccount(orgId, userId, ftAccount, nftAccount);
  }

  @Validator(yup.string(), yup.string())
  public async createUserAccount(orgId: string, userId: string) {
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.createUserAccount", "TOKEN");
    return await this.Ctx.ERC1155Account.createUserAccount(orgId, userId);
  }

  @Validator(yup.string(), yup.string(), yup.string())
  public async createTokenAccount(orgId: string, userId: string, tokenType: TokenType) {
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.createTokenAccount", "TOKEN");
    return await this.Ctx.ERC1155Account.createTokenAccount(orgId, userId, tokenType);
  }

  @Validator(yup.string(), yup.string(), yup.string())
  public async associateFungibleTokenToAccount(orgId: string, userId: string, tokenId: string) {
    const accountId = this.Ctx.ERC1155Account.generateAccountId(orgId, userId, ACCOUNT_TYPE.USER_ACCOUNT);
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.associateFungibleTokenToAccount", "TOKEN", accountId);
    return await this.Ctx.ERC1155Account.associateTokenToToken(accountId, tokenId);
  }

  @Validator(yup.string(), yup.string(), yup.string())
  public async getAccountHistory(orgId: string, userId: string, tokenId?: string) {
    const userAccountId = await this.Ctx.ERC1155Account.generateAccountId(orgId, userId, ACCOUNT_TYPE.USER_ACCOUNT);
    const userAccount = await this.Ctx.ERC1155Account.getAccount(userAccountId, tokenId);
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.history", "TOKEN", userAccountId);
    return await this.Ctx.ERC1155Account.getAccountHistory(userAccount.accountId);
  }

  @Validator(yup.string(), yup.string(), yup.string())
  public async getAccountTransactionHistory(orgId: string, userId: string, tokenId?: string) {
    const userAccountId = await this.Ctx.ERC1155Account.generateAccountId(orgId, userId, ACCOUNT_TYPE.USER_ACCOUNT);
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.getAccountTransactionHistory", "TOKEN", userAccountId);
    const account = await this.Ctx.ERC1155Account.getAccount(userAccountId, tokenId);
    return await this.Ctx.ERC1155Account.getAccountTransactionHistory(account.accountId);
  }

  @Validator(yup.string(), yup.string(), yup.string())
  public async getAccount(orgId: string, userId: string, tokenId?: string) {
    const userAccountId = this.Ctx.ERC1155Account.generateAccountId(orgId, userId, ACCOUNT_TYPE.USER_ACCOUNT);
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.getAccount", "TOKEN", userAccountId);
    return await this.Ctx.ERC1155Account.getAccount(userAccountId, tokenId);
  }
  
  @Validator()
  public async getAllAccounts() {
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.getAllAccounts", "TOKEN");
    return await this.Ctx.ERC1155Account.getAllAccounts();
  }

  @Validator(yup.string(), yup.string())
  public async getAccountDetailsByUser(orgId: string, userId: string) {
    const userAccountId = this.Ctx.ERC1155Account.generateAccountId(orgId, userId, ACCOUNT_TYPE.USER_ACCOUNT);
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.getAccountDetailsByUser", "TOKEN", userAccountId);
    return await this.Ctx.ERC1155Account.getAccountDetailsByUser(orgId, userId);
  }

  @Validator(yup.string())
  public async getUserByAccountId(accountId: string) {
    return await this.Ctx.ERC1155Account.getUserByAccountId(accountId);
  }

  //-----------------------------------------------------------------------------
  //Loyalty
  //-----------------------------------------------------------------------------

  @Validator(Loyalty)
  public async createLoyaltyToken(tokenAsset: Loyalty) {
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.save", "TOKEN");
    return await this.Ctx.ERC1155Token.save(tokenAsset);
  }

  @Validator(Loyalty)
  public async updateLoyaltyToken(tokenAsset: Loyalty) {
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.update", "TOKEN");
    return await this.Ctx.ERC1155Token.update(tokenAsset);
  }
  

  //-----------------------------------------------------------------------------
  //ArtCollection
  //-----------------------------------------------------------------------------

  @Validator(ArtCollection, yup.number())
  public async createArtCollectionToken(tokenAsset: ArtCollection, quantity: number) {
    return await this.Ctx.ERC1155Token.save(tokenAsset, quantity);
  }

  @Validator(ArtCollection)
  public async updateArtCollectionToken(tokenAsset: ArtCollection) {
    return await this.Ctx.ERC1155Token.update(tokenAsset);
  }
  

  //-----------------------------------------------------------------------------
  // Roles Setup
  //-----------------------------------------------------------------------------

  @Validator(yup.string(), yup.string(), yup.string(), yup.object())
  public async addRole(orgId: string, userId: string, role: string, tokenDetail: TokenDetail) {
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.addRoleMember", "TOKEN");
    const userAccountId = this.Ctx.ERC1155Account.generateAccountId(orgId, userId, ACCOUNT_TYPE.USER_ACCOUNT);
    const token = await this.Ctx.ERC1155Token.getTokenByIdOrName(tokenDetail);
    return await this.Ctx.ERC1155Token.addRoleMember(role, userAccountId, token);
  }

  @Validator(yup.string(), yup.string(), yup.string(), yup.object())
  public async isInRole(orgId: string, userId: string, role: string, tokenDetail: TokenDetail) {
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.removeRoleMember", "TOKEN");
    const userAccountId = this.Ctx.ERC1155Account.generateAccountId(orgId, userId, ACCOUNT_TYPE.USER_ACCOUNT);
    const token = await this.Ctx.ERC1155Token.getTokenByIdOrName(tokenDetail);
    return await this.Ctx.ERC1155Token.isInRole(role, userAccountId, token);
  }

  @Validator(yup.string(), yup.string(), yup.string(), yup.object())
  public async removeRole(orgId: string, userId: string, role: string, tokenDetail: TokenDetail) {
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.removeRoleMember", "TOKEN");
    const userAccountId = this.Ctx.ERC1155Account.generateAccountId(orgId, userId, ACCOUNT_TYPE.USER_ACCOUNT);
    const token = await this.Ctx.ERC1155Token.getTokenByIdOrName(tokenDetail);
    return await this.Ctx.ERC1155Token.removeRoleMember(role, userAccountId, token);
  }

  @Validator(yup.string(), yup.object())
  public async getAccountsByRole(role: string, tokenDetail: TokenDetail) {
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ROLE.getAccountsByRole", "TOKEN");
    const token = await this.Ctx.ERC1155Token.getTokenByIdOrName(tokenDetail);
    return await this.Ctx.ERC1155Token.getAccountsByRole(role, token);
  }

  @Validator(yup.string(), yup.object())
  public async getUsersByRole(role: string, tokenDetail: TokenDetail) {
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ROLE.getUsersByRole", "TOKEN");
    const token = await this.Ctx.ERC1155Token.getTokenByIdOrName(tokenDetail);
    return await this.Ctx.ERC1155Token.getUsersByRole(role, token);
  }

  //-----------------------------------------------------------------------------
  // Mintable Behaviour
  //-----------------------------------------------------------------------------
  
  @Validator(yup.string(), yup.string(), yup.array().of(yup.string()), yup.array().of(yup.number()))
  public async mintBatch(orgId: string, userId: string, tokenIds: string[], quantity: number[]) {
    const accountId = this.Ctx.ERC1155Account.generateAccountId(orgId, userId, ACCOUNT_TYPE.USER_ACCOUNT);
    return await this.Ctx.ERC1155Token.mintBatch(accountId, tokenIds, quantity);
  }
  
  //-----------------------------------------------------------------------------
  // Transferable Behaviour
  //-----------------------------------------------------------------------------

  @Validator(yup.string(), yup.string(), yup.string(), yup.string(), yup.array().of(yup.string()), yup.array().of(yup.number()))
  public async batchTransferFrom(
    fromOrgId: string,
    fromUserId: string,
    toOrgId: string,
    toUserId: string,
    tokenIds: string[],
    quantity: number[]
  ) {
    const fromAccountId = this.Ctx.ERC1155Account.generateAccountId(fromOrgId, fromUserId, ACCOUNT_TYPE.USER_ACCOUNT);
    const toAccountId = this.Ctx.ERC1155Account.generateAccountId(toOrgId, toUserId, ACCOUNT_TYPE.USER_ACCOUNT);
    return await this.Ctx.ERC1155Token.batchTransferFrom(fromAccountId, toAccountId, tokenIds, quantity);
  }

  @Validator(yup.string(), yup.string(), yup.string(), yup.string(), yup.array().of(yup.string()), yup.array().of(yup.number()))
  public async safeBatchTransferFrom(
    fromOrgId: string,
    fromUserId: string,
    toOrgId: string,
    toUserId: string,
    tokenIds: string[],
    quantity: number[]
  ) {
    const fromAccountId = this.Ctx.ERC1155Account.generateAccountId(fromOrgId, fromUserId, ACCOUNT_TYPE.USER_ACCOUNT);
    const toAccountId = this.Ctx.ERC1155Account.generateAccountId(toOrgId, toUserId, ACCOUNT_TYPE.USER_ACCOUNT);
    return await this.Ctx.ERC1155Token.safeBatchTransferFrom(fromAccountId, toAccountId, tokenIds, quantity);
  }

  @Validator(yup.array().of(yup.string()), yup.array().of(yup.string()), yup.array().of(yup.string()))
  public async balanceOfBatch(orgIds: string[], userIds: string[], tokenIds: string[]) {
    let callerAccountCheck = false;
    try {
      await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.balanceOfBatch", "TOKEN");
    } catch (err) {
      callerAccountCheck = true;
    }
    const accountIds = await this.Ctx.ERC1155Account.generateAccountIds(orgIds, userIds, callerAccountCheck);
    return await this.Ctx.ERC1155Account.balanceOfBatch(accountIds, tokenIds);
  }

  @Validator(yup.string(), yup.string(), yup.string(), yup.number(), yup.string(), yup.string(), yup.string(), yup.number())
  public async exchangeToken(
    fromTokenId: string,
    fromOrgId: string,
    fromUserId: string,
    fromTokenQuantity: number,
    toTokenId: string,
    toOrgId: string,
    toUserId: string,
    toTokenQuantity: number
  ) {
    const fromUserAccountId = this.Ctx.ERC1155Account.generateAccountId(fromOrgId, fromUserId, ACCOUNT_TYPE.USER_ACCOUNT);
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155ACCOUNT.exchangeToken", "TOKEN", fromUserAccountId);
    const toUserAccountId = this.Ctx.ERC1155Account.generateAccountId(toOrgId, toUserId, ACCOUNT_TYPE.USER_ACCOUNT);
    return await this.Ctx.ERC1155Token.exchangeToken(
      fromTokenId,
      fromUserAccountId,
      fromTokenQuantity,
      toTokenId,
      toUserAccountId,
      toTokenQuantity
    );
  }

  //-----------------------------------------------------------------------------
  // Burnable Behaviour
  //-----------------------------------------------------------------------------

  @Validator(yup.string(), yup.string(), yup.array().of(yup.string()), yup.array().of(yup.number()))
  public async burnBatch(orgId: string, userId: string, tokenIds: string[], quantity: number[]) {
    const accountId = this.Ctx.ERC1155Account.generateAccountId(orgId, userId, ACCOUNT_TYPE.USER_ACCOUNT);
    return await this.Ctx.ERC1155Token.burn(accountId, tokenIds, quantity);
  }

  //-----------------------------------------------------------------------------
  // Token
  //-----------------------------------------------------------------------------

  @Validator(yup.string())
  public async getTokenHistory(tokenId: string) {
    return await this.Ctx.ERC1155Token.history(tokenId);
  }

  @Validator(yup.string())
  public async getTransactionById(transactionId: string) {
    return await this.Ctx.ERC1155Transaction.getTransactionById(transactionId);
  }

  @Validator(yup.date())
  public async deleteHistoricalTransactions(time_to_expiration: Date) {
    await this.Ctx.ERC1155Auth.checkAuthorization("TRANSACTION.deleteTransactions", "TOKEN");
    return await this.Ctx.ERC1155Transaction.deleteTransactions(time_to_expiration);
  }

  @Validator()
  public async getAllTokens() {
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.getAllTokens", "TOKEN");
    return await this.Ctx.ERC1155Token.getAllTokens();
  }

  @Validator(yup.string())
  public async getTokenById(tokenId: string) {
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.get", "TOKEN", tokenId);
    return await this.Ctx.ERC1155Token.get(tokenId);
  }

  @Validator(yup.string(), yup.string())
  public async getAllTokensByUser(orgId: string, userId: string) {
    const accountId = this.Ctx.ERC1155Account.generateAccountId(orgId, userId, ACCOUNT_TYPE.USER_ACCOUNT);
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.getAllTokensByUser", "TOKEN", accountId);
    return await this.Ctx.ERC1155Token.getAllTokensByUser(accountId);
  }

  @Validator(yup.string())
  public async ownerOf(tokenId: string) {
    return await this.Ctx.ERC1155Token.ownerOf(tokenId);
  }

  @Validator(yup.string())
  public async URI(tokenId: string) {
    return await this.Ctx.ERC1155Token.tokenURI(tokenId);
  }

  @Validator(yup.string())
  public async name(tokenId: string) {
    return await this.Ctx.ERC1155Token.name(tokenId);
  }

  @Validator(yup.object())
  public async totalSupply(tokenDetail: TokenDetail) {
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.totalSupply", "TOKEN");
    const token = await this.Ctx.ERC1155Token.getTokenByIdOrName(tokenDetail);
    return await this.Ctx.ERC1155Token.totalSupply(token);
  }

  @Validator(yup.object())
  public async totalNetSupply(tokenDetail: TokenDetail) {
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.totalNetSupply", "TOKEN");
    const token = await this.Ctx.ERC1155Token.getTokenByIdOrName(tokenDetail);
    return await this.Ctx.ERC1155Token.totalNetSupply(token);
  }

  @Validator(yup.string())
  public async getTokensByName(tokenName: string) {
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.getTokensByName", "TOKEN");
    return await this.Ctx.ERC1155Token.getTokensByName(tokenName);
  }

  @Validator(yup.string())
  public async getTokenDecimal(tokenId: string) {
    const token = await this.getTokenById(tokenId);
    await this.Ctx.ERC1155Auth.checkAuthorization("ERC1155TOKEN.getDecimals", "TOKEN");
    return {
      msg: `Token Id: ${tokenId} has ${this.Ctx.ERC1155Token.getDecimals(token)} decimal places.`,
    };
  }

  //-----------------------------------------------------------------------------
    
  /**
   *
   * BDB sql rich queries can be executed in OBP CS/EE.
   * This method can be invoked only when connected to remote OBP CS/EE network.
   *
   */
  @Validator(yup.string())
  public async executeQuery(query: string) {
    const result = await this.query(query);
    return result;
  }
 
  @Validator(yup.string(), yup.number())
  public async sell(token_id: string, selling_price: number) {
    try { 
      const token = await this.Ctx.ERC1155Token.get(token_id);
      const t = new ArtCollection(token)
      t.price =  selling_price;
      t.on_sale_flag = true;
      await this.Ctx.ERC1155Token.update(t);
      let msg = `Token ID : '${token_id}' has been posted for selling in the marketplace'`;
      return {msg}
      } catch(error) {
          throw new Error(error.message);
    }
  }
  
  @Validator(yup.string(), yup.string(), yup.string(), yup.string(), yup.array().of(yup.string()), yup.array().of(yup.string()), yup.array().of(yup.number()), yup.array().of(yup.number()))
  public async buyWithEthCoin(from_org_id: string, from_user_id: string, to_org_id: string, to_user_id: string, nft_id: string[], loyalty_id: string[], eth_qty: number[], loyalty_reward_quantity: number[]) {
    try { 
      const token = await this.Ctx.ERC1155Token.get(nft_id[0]);
      const t = new ArtCollection(token);
      let msg = `Token ID : '${nft_id}' has not been transferred'`;
      if (t.on_sale_flag==true) {
          if(t.price <= eth_qty[0]) {
              const from_account_id = await this.Ctx.ERC1155Account.generateAccountId(from_org_id, from_user_id, ACCOUNT_TYPE.USER_ACCOUNT);
              const to_account_id = await this.Ctx.ERC1155Account.generateAccountId(to_org_id, to_user_id, ACCOUNT_TYPE.USER_ACCOUNT);
              t.on_sale_flag = false;
              await this.Ctx.ERC1155Token.batchTransferFrom(from_account_id, to_account_id, nft_id, [1]);
              await this.Ctx.ERC1155Token.batchTransferFrom(from_account_id, to_account_id, loyalty_id, loyalty_reward_quantity);
              const to_account = await this.Ctx.ERC1155Account.get(to_account_id);
              if(to_account instanceof ERC1155UserAccount) {
                t.owner = to_account.associatedNftAccount;
              }

              await this.Ctx.Model.update(t);
              msg = `Token ID : '${nft_id}' has been successfully transferred to UserID : '${to_user_id}'`;
          } else {
              throw new Error(`Token ID : '${nft_id}' has not been transferred to UserID : '${from_user_id}' as the amount was not fully paid'`);
          }
      }
      else {
          throw new Error(`Token ID : '${nft_id}' is not posted for sell`)
      }
      return {msg};
    } catch(error) {
        throw new Error(error.message);
    }
  }
  
}

