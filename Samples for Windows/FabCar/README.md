# FabCar

# Chaincode package for FabCar

This application constitutes a custom chaincode service for use within
[Oracle Blockchain Platform] (https://www.oracle.com/cloud/blockchain/index.html)

**NOTE: ** Do not modify the `start:ochain` script in the package.json scripts, except to specify a node supervisor other than `nodemon`.

# Steps to install
- To execute the ready-to-use sample chaincodes (which are placed under the FabCar folder), complete the following steps: 
1. Run 'npm install' to install the chaincode.
2. Update the value of the "configFileLocation" key in the .ochain.json file in the FabCar folder to any valid specification file on your system.

**Note**:
The custom code for the custom methods - buyCar and addCar - is placed under the FabCar.controller.ts file (which is under the FabCar folder).
