/**
 *
 * Copyright (c) 2022, Oracle and/or its affiliates. All rights reserved.
 *
 */
package controller

import (
	"fmt"
	"reflect"

	"example.com/FiatMoneyToken/lib/account"
	"example.com/FiatMoneyToken/lib/admin"

	"example.com/FiatMoneyToken/lib/trxcontext"
	. "example.com/FiatMoneyToken/src/model"
)

type Controller struct {
	Ctx trxcontext.TrxContext
}

/**
 * Function 'Init' can be extended to include other parameters as shown in below examples:
 * Example 1:
 *   func (t *Controller) Init(init_str string, adminList []admin.TokenAdminAsset) (interface{}, error) {
 *
 * Example 2:
 *   func (t *Controller) Init(adminList []admin.TokenAdminAsset, init_str string, reset int) (interface{}, error) {
 *
 */
func (t *Controller) Init(adminList []admin.TokenAdminAsset) (interface{}, error) {
	list, err := t.Ctx.Admin.InitAdmin(adminList)
	if err != nil {
		return nil, fmt.Errorf("initialising admin list failed %s", err.Error())
	}
	_, err = t.Ctx.Token.SaveDeleteTransactionInfo()
	if err != nil {
		fmt.Println("error: ", err)
	}
	return list, nil
}

//-----------------------------------------------------------------------------
//FiatMoneyTOK
//-----------------------------------------------------------------------------

func (t *Controller) InitializeFiatMoneyTOKToken(asset FiatMoneyTOK) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("Token.Save", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Token.Save(&asset)
}
func (t *Controller) UpdateFiatMoneyTOKToken(asset FiatMoneyTOK) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("Token.Update", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Token.Update(&asset)
}

//-----------------------------------------------------------------------------
//Token Setup
//-----------------------------------------------------------------------------

func (t *Controller) IsTokenAdmin(org_id string, user_id string) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("Auth.IsTokenAdmin", "TOKEN", org_id, user_id)
	if err != nil || !auth {
		return false, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Auth.IsUserTokenAdmin(org_id, user_id)
}

func (t *Controller) AddTokenAdmin(org_id string, user_id string) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("Admin.AddAdmin", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Admin.AddAdmin(org_id, user_id)
}

func (t *Controller) GetAllTokenAdmins() (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("Admin.GetAllAdmins", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Admin.GetAllAdminUsers()
}

func (t *Controller) RemoveTokenAdmin(org_id string, user_id string) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("Admin.RemoveAdmin", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Admin.RemoveAdmin(org_id, user_id)
}

func (t *Controller) getTokenObject(token_id string) (reflect.Value, error) {
	if token_id == "" {
		return reflect.Value{}, fmt.Errorf("error in retrieving token, token_id cannot be empty")
	}
	tokenAsset, err := t.Ctx.Token.Get(token_id)
	if err != nil {
		return reflect.Value{}, fmt.Errorf("no token exists with id %s %s", token_id, err.Error())
	}
	token_name := tokenAsset.(map[string]interface{})["Token_name"].(string)
	switch token_name {
	case "fiatmoneytok":
		var asset FiatMoneyTOK
		_, err := t.Ctx.Token.Get(token_id, &asset)
		if err != nil {
			return reflect.Value{}, err
		}
		return reflect.ValueOf(&asset), nil
	default:
		return reflect.Value{}, fmt.Errorf("no token exists with token name %s", token_name)
	}
}

func (t *Controller) GetTokenById(token_id string) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("Token.Get", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	tokenAsset, err := t.getTokenObject(token_id)
	if err != nil {
		return nil, err
	}
	return tokenAsset.Interface(), err
}

func (t *Controller) GetTokenHistory(token_id string) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("Token.GetTokenHistory", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Token.History(token_id)
}

func (t *Controller) GetTokenDecimals(token_id string) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("Token.GetTokenDecimals", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller %s", err.Error())
	}
	tokenDecimal, err := t.Ctx.Token.GetDecimals(token_id)
	if err != nil {
		return nil, fmt.Errorf("error in GetTokenDecimals  %s", err.Error())
	}
	response := make(map[string]interface{})
	response["msg"] = fmt.Sprintf("Token Id: %s has %d decimal places.", token_id, tokenDecimal)
	return response, nil
}

/**
 * This method can be invoked only when connected to remote OBP CS/EE network.
 */
func (t *Controller) GetAllTokens() (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("Token.GetAllTokens", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Token.GetAllTokens()
}

/**
 * This method can be invoked only when connected to remote OBP CS/EE network.
 */
func (t *Controller) GetTokensByName(token_name string) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("Token.GetTokensByName", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Token.GetTokensByName(token_name)
}

//-----------------------------------------------------------------------------
//Account Setup
//-----------------------------------------------------------------------------

func (t *Controller) CreateAccount(org_id string, user_id string, token_type string) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("Account.CreateAccount", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Account.CreateAccount(org_id, user_id, token_type)
}

func (t *Controller) AssociateTokenToAccount(account_id string, token_id string) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("Account.AssociateToken", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Account.AssociateToken(account_id, token_id)
}

func (t *Controller) GetAccountHistory(token_id string, org_id string, user_id string) (interface{}, error) {
	account_id, err := t.Ctx.Account.GenerateAccountId(token_id, org_id, user_id)
	if err != nil {
		return nil, err
	}
	auth, err := t.Ctx.Auth.CheckAuthorization("Account.History", "TOKEN", account_id)
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Account.History(account_id)
}

func (t *Controller) GetAccountTransactionHistoryWithFilters(token_id string, org_id string, user_id string, filters ...account.AccountHistoryFilters) (interface{}, error) {
	account_id, err := t.Ctx.Account.GenerateAccountId(token_id, org_id, user_id)
	if err != nil {
		return nil, err
	}
	auth, err := t.Ctx.Auth.CheckAuthorization("Account.GetAccountTransactionHistoryWithFilters", "TOKEN", account_id)
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}

	// sample format of filter: []string{"3", "", "2022-01-16T15:16:36+00:00", "2022-01-17T15:16:36+00:00"}
	transactionArray, err := t.Ctx.Account.GetAccountTransactionHistoryWithFilters(account_id, org_id, user_id, filters...)
	return transactionArray, err
}

func (t *Controller) GetAccountTransactionHistory(token_id string, org_id string, user_id string) (interface{}, error) {
	account_id, err := t.Ctx.Account.GenerateAccountId(token_id, org_id, user_id)
	if err != nil {
		return nil, err
	}
	auth, err := t.Ctx.Auth.CheckAuthorization("Account.GetAccountTransactionHistory", "TOKEN", account_id)
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}

	transactionArray, err := t.Ctx.Account.GetAccountTransactionHistory(account_id, org_id, user_id)
	return transactionArray, err
}

func (t *Controller) GetSubTransactionsById(transaction_id string) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("Account.GetSubTransactionsById", "TOKEN", transaction_id)
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Account.GetSubTransactionsById(transaction_id)
}

func (t *Controller) GetSubTransactionsByIdWithFilters(transaction_id string, filters ...account.SubTransactionFilters) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("Account.GetSubTransactionsByIdWithFilters", "TOKEN", transaction_id)
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Account.GetSubTransactionsByIdWithFilters(transaction_id, filters...)
}

func (t *Controller) GetAccount(token_id string, org_id string, user_id string) (interface{}, error) {
	account_id, err := t.Ctx.Account.GenerateAccountId(token_id, org_id, user_id)
	if err != nil {
		return nil, err
	}
	auth, err := t.Ctx.Auth.CheckAuthorization("Account.GetAccount", "TOKEN", account_id)
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	accountAsset, err := t.Ctx.Account.GetAccount(account_id)
	return accountAsset, err
}

func (t *Controller) GetAllAccounts() (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("Account.GetAllAccounts", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Account.GetAllAccounts()
}

func (t *Controller) GetUserByAccountId(account_id string) (interface{}, error) {
	return t.Ctx.Account.GetUserByAccountById(account_id)
}

func (t *Controller) GetAccountBalance(token_id string, org_id string, user_id string) (interface{}, error) {
	account_id, err := t.Ctx.Account.GenerateAccountId(token_id, org_id, user_id)
	if err != nil {
		return nil, err
	}
	auth, err := t.Ctx.Auth.CheckAuthorization("Account.GetAccountBalance", "TOKEN", account_id)
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	response, err := t.Ctx.Account.GetAccountBalance(account_id)
	return response, err
}

func (t *Controller) GetAccountsByUser(org_id string, user_id string) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("Account.GetAccountsByUser", "TOKEN", org_id, user_id)
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Account.GetAccountsByUser(org_id, user_id)
}

func (t *Controller) GetAccountStatus(token_id string, org_id string, user_id string) (interface{}, error) {
	account_id, err := t.Ctx.Account.GenerateAccountId(token_id, org_id, user_id)
	if err != nil {
		return nil, fmt.Errorf("error in getting the generating account_id of (Org-Id: %s, User-Id: %s)", org_id, user_id)
	}
	auth, err := t.Ctx.Auth.CheckAuthorization("AccountStatus.Get", "TOKEN", account_id)
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	accountStatus, err := t.Ctx.AccountStatus.GetAccountStatus(account_id)
	if err != nil {
		return t.Ctx.AccountStatus.SaveAccountStatus(account_id, "active")
	}
	return accountStatus, nil
}

func (t *Controller) GetAccountStatusHistory(token_id string, org_id string, user_id string) (interface{}, error) {
	account_id, err := t.Ctx.Account.GenerateAccountId(token_id, org_id, user_id)
	if err != nil {
		return nil, fmt.Errorf("error in getting the generating account_id of (Org-Id: %s, User-Id: %s)", org_id, user_id)
	}
	auth, err := t.Ctx.Auth.CheckAuthorization("AccountStatus.Get", "TOKEN", account_id)
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	status_id, err := t.Ctx.AccountStatus.GenerateAccountStatusId(account_id)
	if err != nil {
		return nil, err
	}
	return t.Ctx.AccountStatus.History(status_id)
}

func (t *Controller) ActivateAccount(token_id string, org_id string, user_id string) (interface{}, error) {
	account_id, err := t.Ctx.Account.GenerateAccountId(token_id, org_id, user_id)
	if err != nil {
		return nil, fmt.Errorf("error in getting the generating account_id of (Org-Id: %s, User-Id: %s)", org_id, user_id)
	}
	auth, err := t.Ctx.Auth.CheckAuthorization("AccountStatus.ActivateAccount", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Account.ActivateAccount(account_id)
}

func (t *Controller) SuspendAccount(token_id string, org_id string, user_id string) (interface{}, error) {
	account_id, err := t.Ctx.Account.GenerateAccountId(token_id, org_id, user_id)
	if err != nil {
		return nil, fmt.Errorf("error in getting the generating account_id of (Org-Id: %s, User-Id: %s)", org_id, user_id)
	}
	auth, err := t.Ctx.Auth.CheckAuthorization("AccountStatus.SuspendAccount", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Account.SuspendAccount(account_id)
}

func (t *Controller) DeleteAccount(token_id string, org_id string, user_id string) (interface{}, error) {
	account_id, err := t.Ctx.Account.GenerateAccountId(token_id, org_id, user_id)
	if err != nil {
		return nil, fmt.Errorf("error in getting the generating account_id of (Org-Id: %s, User-Id: %s)", org_id, user_id)
	}
	auth, err := t.Ctx.Auth.CheckAuthorization("AccountStatus.DeleteAccount", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Account.DeleteAccount(account_id)
}

//-----------------------------------------------------------------------------
//Roles Setup
//-----------------------------------------------------------------------------

func (t *Controller) AddRole(token_id string, user_role string, org_id string, user_id string) (interface{}, error) {
	account_id, err := t.Ctx.Account.GenerateAccountId(token_id, org_id, user_id)
	if err != nil {
		return nil, err
	}
	tokenAssetValue, err := t.getTokenObject(token_id)
	if err != nil {
		return nil, err
	}
	auth, err := t.Ctx.Auth.CheckAuthorization("Token.AddRoleMember", "TOKEN", account_id)
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Token.AddRoleMember(user_role, account_id, tokenAssetValue.Interface())
}

func (t *Controller) RemoveRole(token_id string, user_role string, org_id string, user_id string) (interface{}, error) {
	account_id, err := t.Ctx.Account.GenerateAccountId(token_id, org_id, user_id)
	if err != nil {
		return nil, err
	}
	tokenAssetValue, err := t.getTokenObject(token_id)
	if err != nil {
		return nil, err
	}
	auth, err := t.Ctx.Auth.CheckAuthorization("Token.RemoveRoleMember", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Token.RemoveRoleMember(user_role, account_id, tokenAssetValue.Interface())
}

func (t *Controller) GetAccountsByRole(token_id string, user_role string) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("Role.GetAccountsByRole", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Role.GetAccountsByRole(token_id, user_role)
}

func (t *Controller) GetUsersByRole(token_id string, user_role string) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("Role.GetUsersByRole", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Role.GetUsersByRole(token_id, user_role)
}

func (t *Controller) IsInRole(token_id string, org_id string, user_id string, user_role string) (interface{}, error) {
	tokenAssetValue, err := t.getTokenObject(token_id)
	if err != nil {
		return nil, err
	}
	account_id, err := t.Ctx.Account.GenerateAccountId(token_id, org_id, user_id)
	if err != nil {
		return nil, err
	}
	auth, err := t.Ctx.Auth.CheckAuthorization("Token.IsInRole", "TOKEN", account_id)
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	result, err := t.Ctx.Token.IsInRole(user_role, account_id, tokenAssetValue.Interface())
	if err != nil {
		return nil, fmt.Errorf("error in IsInRole  %s", err.Error())
	}
	response := make(map[string]interface{})
	response["result"] = result
	return response, nil
}

//-----------------------------------------------------------------------------
//Mintable Behavior
//-----------------------------------------------------------------------------

func (t *Controller) IssueTokens(token_id string, quantity float64) (interface{}, error) {
	tokenAssetValue, err := t.getTokenObject(token_id)
	if err != nil {
		return nil, err
	}
	return t.Ctx.Token.Mint(quantity, tokenAssetValue.Interface())
}

func (t *Controller) GetTotalMintedTokens(token_id string) (interface{}, error) {
	tokenAssetValue, err := t.getTokenObject(token_id)
	if err != nil {
		return nil, err
	}
	auth, err := t.Ctx.Auth.CheckAuthorization("Token.GetTotalMintedTokens", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Token.GetTotalMintedTokens(tokenAssetValue.Interface())
}

func (t *Controller) GetNetTokens(token_id string) (interface{}, error) {
	tokenAssetValue, err := t.getTokenObject(token_id)
	if err != nil {
		return nil, err
	}
	auth, err := t.Ctx.Auth.CheckAuthorization("Token.GetNetTokens", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Token.GetNetTokens(tokenAssetValue.Interface())
}

//-----------------------------------------------------------------------------
//Transferable Behavior
//-----------------------------------------------------------------------------

func (t *Controller) TransferTokens(token_id string, to_org_id string, to_user_id string, quantity float64) (interface{}, error) {
	tokenAssetValue, err := t.getTokenObject(token_id)
	if err != nil {
		return nil, err
	}
	to_account_id, err := t.Ctx.Account.GenerateAccountId(token_id, to_org_id, to_user_id)
	if err != nil {
		return nil, err
	}
	return t.Ctx.Token.Transfer(to_account_id, quantity, tokenAssetValue.Interface())
}

func (t *Controller) BulkTransferTokens(token_id string, flow []map[string]interface{}) (interface{}, error) {
	tokenAssetValue, err := t.getTokenObject(token_id)
	if err != nil {
		return nil, err
	}
	return t.Ctx.Token.BulkTransfer(flow, tokenAssetValue.Interface())
}

//-----------------------------------------------------------------------------
//Transactions
//-----------------------------------------------------------------------------

func (t *Controller) GetTransactionById(transaction_id string) (interface{}, error) {
	return t.Ctx.Transaction.GetTransactionById(transaction_id)
}

func (t *Controller) DeleteHistoricalTransactions(timestamp string) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("Transaction.DeleteHistoricalTransactions", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.Transaction.DeleteHistoricalTransactions(timestamp)
}

//-----------------------------------------------------------------------------
//Burnable Behavior
//-----------------------------------------------------------------------------

func (t *Controller) BurnTokens(token_id string, quantity float64) (interface{}, error) {
	tokenAssetValue, err := t.getTokenObject(token_id)
	if err != nil {
		return nil, err
	}
	return t.Ctx.Token.Burn(quantity, tokenAssetValue.Interface())
}

//-----------------------------------------------------------------------------
//Token Conversion
//----------------------------------------------------------------------------

func (t *Controller) InitializeExchangePoolUser(org_id string, user_id string) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("TokenConversion.InitializeExchangePoolUser", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.TokenConvertor.InitializeExchangePoolUser(org_id, user_id)
}

func (t *Controller) CreateExchangePoolAccounts(token_ids []string) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("TokenConversion.InitializeExchangePoolUser", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	var tokens []interface{}
	for _, tokenId := range token_ids {
		token, err := t.getTokenObject(tokenId)
		if err != nil {
			return nil, fmt.Errorf("error in getting from_token asset details. Error: %s", err)
		}
		tokens = append(tokens, token.Interface())
	}
	return t.Ctx.TokenConvertor.CreateExchangePoolAccounts(tokens)
}

func (t *Controller) GetConversionRate(from_token_id string, to_token_id string) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("TokenConversion.GetConversionRate", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	conversionRateId, err := t.Ctx.TokenConversionRate.GetConversionRateId(from_token_id, to_token_id)
	if err != nil {
		return nil, fmt.Errorf("error in getting conversationRateId. Error: %s", err)
	}
	return t.Ctx.TokenConversionRate.Get(conversionRateId)
}

func (t *Controller) AddConversionRate(from_token_id string, to_token_id string, token_conversion_rate float64) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("TokenConversion.AddConversionRate", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.TokenConvertor.AddConversionToken(from_token_id, to_token_id, token_conversion_rate)
}

func (t *Controller) UpdateConversionRate(from_token_id string, to_token_id string, token_conversion_rate float64) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("TokenConversion.UpdateConversionRate", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.TokenConvertor.UpdateTokenConversionRate(from_token_id, to_token_id, token_conversion_rate)
}

func (t *Controller) MintWithFundingExchangePool(token_id string, token_quantity float64, percentage_token_to_exchangePool float64) (interface{}, error) {
	token, err := t.getTokenObject(token_id)
	if err != nil {
		return nil, fmt.Errorf("error in getting from_token asset details. Error: %s", err)
	}
	return t.Ctx.TokenConvertor.MintWithFundingExchangePool(token.Interface(), token_quantity, percentage_token_to_exchangePool)
}

func (t *Controller) TokenConversion(from_token_id string, to_token_id string, to_org_id string, to_user_id string, token_quantity float64) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("TokenConversion.TokenConversion", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	from_token, err := t.getTokenObject(from_token_id)
	if err != nil {
		return nil, fmt.Errorf("error in getting from_token asset details. Error: %s", err)
	}
	to_token, err := t.getTokenObject(to_token_id)
	if err != nil {
		return nil, fmt.Errorf("error in getting to_token asset details. error: %s", err)
	}
	return t.Ctx.TokenConvertor.TokenConversion(from_token.Interface(), to_token.Interface(), to_org_id, to_user_id, token_quantity)
}

func (t *Controller) GetConversionHistory(token_id string, org_id string, user_id string) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("TokenConversion.GetConversionHistory", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	account_id, err := t.Ctx.Account.GenerateAccountId(token_id, org_id, user_id)
	if err != nil {
		return nil, fmt.Errorf("error in generating the accoint_id. Error: %s", err)
	}
	return t.Ctx.Account.GetTokenConversionHistory(account_id, org_id, user_id)
}

func (t *Controller) GetConversionRateHistory(from_token_id string, to_token_id string) (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("TokenConversion.GetConversionRateHistory", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	conversion_rate_id, err := t.Ctx.TokenConversionRate.GetConversionRateId(from_token_id, to_token_id)
	if err != nil {
		return nil, fmt.Errorf("error in getting conversionRateId. Error: %s", err)
	}
	return t.Ctx.TokenConversionRate.History(conversion_rate_id)
}

func (t *Controller) GetExchangePoolUser() (interface{}, error) {
	auth, err := t.Ctx.Auth.CheckAuthorization("TokenConversion.GetExchangePoolUser", "TOKEN")
	if err != nil && !auth {
		return nil, fmt.Errorf("error in authorizing the caller  %s", err.Error())
	}
	return t.Ctx.TokenConvertor.GetExchangePoolUser()
}

//-----------------------------------------------------------------------------
//Custom Methods
//-----------------------------------------------------------------------------

/**
*
* BDB sql rich queries can be executed in OBP CS/EE.
* This method can be invoked only when connected to remote OBP CS/EE network.
*
 */
func (t *Controller) ExecuteQuery(inputQuery string) (interface{}, error) {
	resultArray, err := t.Ctx.Model.Query(inputQuery)
	return resultArray, err
}
