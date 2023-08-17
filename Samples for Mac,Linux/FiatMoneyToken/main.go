/**
 * 
 * Copyright (c) 2022, Oracle and/or its affiliates. All rights reserved.
 * 
 */
package main

import (
	"fmt"
	"sample.com/FiatMoneyToken/lib/chaincode"
	"sample.com/FiatMoneyToken/lib/util"
	"github.com/hyperledger/fabric-chaincode-go/shim"
)

func main() {
	util.ChaincodeName = "FiatMoneyToken"
	err := shim.Start(new(chaincode.ChainCode))
	if err != nil {
		fmt.Printf("Error starting chaincode: %s", err)
	}
}
