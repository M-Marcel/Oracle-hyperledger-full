/**
 *
 * Copyright (c) 2022, Oracle and/or its affiliates. All rights reserved.
 *
 */
package model

type Marble struct {
	AssetType string `json:"AssetType" final:"Marble"`

	MarbleID string      `json:"MarbleID" validate:"string" id:"true" mandatory:"true"`
	Color    string      `json:"Color" validate:"string,regexp=^\\s*(red|blue|green)\\s*$" mandatory:"true"`
	Size     string      `json:"Size" validate:"string,regexp=^\\s*(10|20|30)\\s*$"`
	OwnerID  string      `json:"OwnerID" validate:"string" mandatory:"true"`
	Metadata interface{} `json:"Metadata,omitempty"`
}

type Player struct {
	AssetType string `json:"AssetType" final:"Player"`

	PlayerID     string      `json:"PlayerID" validate:"string" id:"true" mandatory:"true"`
	Name         string      `json:"Name" validate:"string"`
	Location     string      `json:"Location" validate:"string"`
	Phone_Number string      `json:"Phone_Number" validate:"string,regexp=^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$"`
	Metadata     interface{} `json:"Metadata,omitempty"`
}
