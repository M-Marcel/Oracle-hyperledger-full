/**
 *
 * Copyright (c) 2022, Oracle and/or its affiliates. All rights reserved.
 *
 */
import ChaincodeSDK from './lib/chaincode';

import { NFTArtCollectionMarketplaceERC1155TsController } from './src/controller/NFTArtCollectionMarketplaceERC1155Ts.controller';


ChaincodeSDK({
    chainCodeName: 'NFTArtCollectionMarketplaceERC1155Ts',
    chainCode: NFTArtCollectionMarketplaceERC1155TsController,
});
