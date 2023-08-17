/**
 *
 * Copyright (c) 2022, Oracle and/or its affiliates. All rights reserved.
 *
 */
package model

import (
	"sample.com/LoyaltyToken/lib/util/date"
)

type LoyalTOK struct {
	AssetType  string `json:"AssetType" final:"otoken"`
	Token_id   string `json:"Token_id" id:"true" mandatory:"true" validate:"regexp=^[A-Za-z0-9][A-Za-z0-9_-]*$,max=16"`
	Token_name string `json:"Token_name" final:"loyaltok"`
	Token_desc string `json:"Token_desc" validate:"max=256"`
	Token_type string `json:"Token_type" final:"fungible" validate:"regexp=^fungible$"`
	Token_unit string `json:"Token_unit" final:"fractional" validate:"regexp=^fractional$"`

	Mintable map[string]interface{} `json:"Mintable" final:"{\"Max_mint_quantity\":10000}"`

	Divisible map[string]interface{} `json:"Divisible" final:"{\"Decimal\":2}"`

	Behavior []string `json:"Behavior" final:"[\"divisible\",\"mintable\",\"transferable\",\"burnable\",\"roles\"]"`

	Roles map[string]interface{} `json:"Roles" final:"{\"minter_role_name\":\"minter\"}"`

	Currency_Name           string      `json:"Currency_Name" validate:"string" mandatory:"true"`
	Token_To_Currency_Ratio float64     `json:"Token_To_Currency_Ratio" validate:"float64" mandatory:"true"`
	Effective_From_Date     date.Date   `json:"Effective_From_Date" validate:"date" mandatory:"true"`
	Metadata                interface{} `json:"Metadata,omitempty"`
}

type ConsumerLoyalty struct {
	AssetType string `json:"AssetType" final:"ConsumerLoyalty"`

	Consumer_Id             string      `json:"Consumer_Id" validate:"string" id:"true" mandatory:"true"`
	Consumer_Name           string      `json:"Consumer_Name" validate:"string" mandatory:"true"`
	Consumer_Org_Id         string      `json:"Consumer_Org_Id" validate:"string" mandatory:"true"`
	Consumer_User_Id        string      `json:"Consumer_User_Id" validate:"string" mandatory:"true"`
	Consumer_Account_Id     string      `json:"Consumer_Account_Id" validate:"string" mandatory:"true"`
	Accrued_Token_Quantity  float64     `json:"Accrued_Token_Quantity" validate:"float64"`
	Redeemed_Token_Quantity float64     `json:"Redeemed_Token_Quantity" validate:"float64"`
	Consumer_Status         string      `json:"Consumer_Status" validate:"string,regexp=^\\s*(active|in-active)\\s*$" mandatory:"true"`
	Metadata                interface{} `json:"Metadata,omitempty"`
}

type MerchantDetails struct {
	AssetType string `json:"AssetType" final:"MerchantDetails"`

	Merchant_Id         string      `json:"Merchant_Id" validate:"string" id:"true" mandatory:"true"`
	Merchant_Name       string      `json:"Merchant_Name" validate:"string" mandatory:"true"`
	Merchant_Org_Id     string      `json:"Merchant_Org_Id" validate:"string" mandatory:"true"`
	Merchant_User_Id    string      `json:"Merchant_User_Id" validate:"string" mandatory:"true"`
	Merchant_Account_Id string      `json:"Merchant_Account_Id" validate:"string" mandatory:"true"`
	Merchant_Type       string      `json:"Merchant_Type" validate:"string,regexp=^\\s*(issuer|redeemer|both)\\s*$"`
	Merchant_Status     string      `json:"Merchant_Status" validate:"string,regexp=^\\s*(active|in-active)\\s*$"`
	Metadata            interface{} `json:"Metadata,omitempty"`
}
