# Working with “NFTArtCollectionMarketplaceWithERC1155-Typescript” Specification File
 
The steps starting with the sample NFT Art Collection with ERC1155 specification file, is shown in the following steps.
 
1.      Scaffold the token chaincode project in the Typescript language from the NFTArtCollectionMarketplaceWithERC1155-Typescript specification file.
2.      Copy the custom code of the following methods from the downloaded sample file " NFTArtCollectionMarketPlaceERC1155Ts.controller.ts" (which is placed under NFTArtCollectionMarketPlaceERC1155Ts/src/controller/ NFTArtCollectionMarketPlaceERC1155Ts.controller.ts) and paste it in the scaffolded chaincode file <scaffolded_chaincode_name>.controller.ts –
a.    buyWithEthCoin
b.    sell
Save the file.

**NOTE: ** Do not modify the `start:ochain` script in the package.json scripts, except to specify a node supervisor other than `nodemon`.

# Steps to install
- To execute the ready-to-use sample chaincodes (which are placed under the NFTArtCollectionMarketPlaceERC1155Ts folder), complete the following steps: 
1. Run 'npm install' to install the chaincode.
2. Update the value of the "configFileLocation" key in the .ochain.json file in the NFTArtCollectionMarketPlaceERC1155Ts folder to any valid specification file on your system.

**Deploy the scaffolded chaincode using Blockchain App Builder**:
 
When you instantiate the token chaincode, pass the orgId and userId of the token admin user. The orgId value is the organization ID or the membership service provider (MSP) ID of the token user. The userId value is the username of the token user; for example, the Oracle Identity Cloud Service user ID.
 
Please create enrollment IDs for each token user and map the token users to their respective enrollment IDs. You need to specify one and only one user for each enrollment.
For more information about adding enrollments, please refer the link below -
https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/manage-rest-proxy-nodes.html#GUID-133EA460-DE56-4003-85D5-B77FE7A91BD7
 
Token admin users can create accounts, and add minter/burner roles to users. Any token admin user can also add or remove other users as token admin users.

**Instructions to import the Postman collection file and execute requests**:
- Import the collection file “NFT Art Collection Marketplace with Eth-ERC20 Coins and Loyalty Tokens - ERC1155.postman_collection" in Postman (version-8.5.1 or later).
- Click the “NFT Art Collection Marketplace with Eth/ERC20 Coins and Loyalty Tokens - ERC1155” collection name.
- Go to the variables tab under the “NFT Art Collection Marketplace with Eth/ERC20 Coins and Loyalty Tokens - ERC1155" collection.
- Update and save the variable values.
- Execute the requests according to the sequence mentioned in the collection file.