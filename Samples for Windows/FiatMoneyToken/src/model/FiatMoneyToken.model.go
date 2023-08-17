/**
 *
 * Copyright (c) 2022, Oracle and/or its affiliates. All rights reserved.
 *
 */
package model

type FiatMoneyTOK struct {
	AssetType  string `json:"AssetType" final:"otoken"`
	Token_id   string `json:"Token_id" id:"true" mandatory:"true" validate:"regexp=^[A-Za-z0-9][A-Za-z0-9_-]*$,max=16"`
	Token_name string `json:"Token_name" final:"fiatmoneytok"`
	Token_desc string `json:"Token_desc" validate:"max=256"`
	Token_type string `json:"Token_type" final:"fungible" validate:"regexp=^fungible$"`
	Token_unit string `json:"Token_unit" final:"fractional" validate:"regexp=^fractional$"`

	Mintable map[string]interface{} `json:"Mintable" final:"{\"Max_mint_quantity\":1000}"`

	Divisible map[string]interface{} `json:"Divisible" final:"{\"Decimal\":2}"`

	Behavior []string `json:"Behavior" final:"[\"divisible\",\"mintable\",\"transferable\",\"burnable\",\"roles\"]"`

	Roles map[string]interface{} `json:"Roles" final:"{\"minter_role_name\":\"minter\"}"`

	Currency_name           string      `json:"Currency_name" validate:"string"`
	Token_to_currency_ratio int         `json:"Token_to_currency_ratio" validate:"int"`
	Metadata                interface{} `json:"Metadata,omitempty"`
}
