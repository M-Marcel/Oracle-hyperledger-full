/**
 *
 * Copyright (c) 2022, Oracle and/or its affiliates. All rights reserved.
 *
 */
package controller

import (
	"sample.com/Marbles/lib/trxcontext"
	. "sample.com/Marbles/src/model"
)

type Controller struct {
	Ctx trxcontext.TrxContext
}

func (t *Controller) Init() (interface{}, error) {
	return nil, nil
}

//-----------------------------------------------------------------------------
//Marble
//-----------------------------------------------------------------------------

func (t *Controller) CreateMarble(asset Marble) (interface{}, error) {
	return t.Ctx.Model.Save(&asset)
}

func (t *Controller) GetMarbleById(id string) (Marble, error) {
	var asset Marble
	_, err := t.Ctx.Model.Get(id, &asset)
	return asset, err
}
func (t *Controller) UpdateMarble(asset Marble) (interface{}, error) {
	return t.Ctx.Model.Update(&asset)
}
func (t *Controller) GetMarbleHistoryById(id string) (interface{}, error) {
	historyArray, err := t.Ctx.Model.GetHistoryById(id)
	return historyArray, err
}
func (t *Controller) GetMarbleByRange(startkey string, endKey string) ([]Marble, error) {
	var assets []Marble
	_, err := t.Ctx.Model.GetByRange(startkey, endKey, &assets)
	return assets, err
}

//-----------------------------------------------------------------------------
//Player
//-----------------------------------------------------------------------------

func (t *Controller) CreatePlayer(asset Player) (interface{}, error) {
	return t.Ctx.Model.Save(&asset)
}

func (t *Controller) GetPlayerById(id string) (Player, error) {
	var asset Player
	_, err := t.Ctx.Model.Get(id, &asset)
	return asset, err
}
func (t *Controller) UpdatePlayer(asset Player) (interface{}, error) {
	return t.Ctx.Model.Update(&asset)
}
func (t *Controller) GetPlayerHistoryById(id string) (interface{}, error) {
	historyArray, err := t.Ctx.Model.GetHistoryById(id)
	return historyArray, err
}
func (t *Controller) GetPlayerByRange(startkey string, endKey string) ([]Player, error) {
	var assets []Player
	_, err := t.Ctx.Model.GetByRange(startkey, endKey, &assets)
	return assets, err
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

func (t *Controller) SendMarbleToPlayer(MarbleID string, PlayerID string) (interface{}, error) {
	marble, err := t.GetMarbleById(MarbleID)
	if err != nil {
		return nil, err
	}

	if marble.OwnerID == PlayerID {
		return `Marble already exists with the Player ID to be transferred to`, nil
	} else {
		marble.OwnerID = PlayerID
		t.UpdateMarble(marble)
		return `Marble has been transferred to the new Owner`, nil
	}
}
