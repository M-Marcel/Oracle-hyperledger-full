/**
 *
 * Copyright (c) 2022, Oracle and/or its affiliates. All rights reserved.
 *
 */
import ChaincodeSDK from './lib/chaincode';

import { NFTArtCollectionMarketplaceERC721TsController } from './src/controller/NFTArtCollectionMarketplaceERC721Ts.controller';


ChaincodeSDK({
    chainCodeName: 'NFTArtCollectionMarketplaceERC721Ts',
    chainCode: NFTArtCollectionMarketplaceERC721TsController,
});
