/**
 * 
 * Copyright (c) 2022, Oracle and/or its affiliates. All rights reserved.
 * 
 */
package main

import (
	"fmt"
	"example.com/Marbles/lib/chaincode"
	"example.com/Marbles/lib/util"
	"github.com/hyperledger/fabric-chaincode-go/shim"
)

func main() {
	util.ChaincodeName = "Marbles"
	err := shim.Start(new(chaincode.ChainCode))
	if err != nil {
		fmt.Printf("Error starting chaincode: %s", err)
	}
}
