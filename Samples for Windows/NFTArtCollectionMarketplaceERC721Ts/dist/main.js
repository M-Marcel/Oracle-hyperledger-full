"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chaincode_1 = require("./lib/chaincode");
const NFTArtCollectionMarketplaceERC721Ts_controller_1 = require("./src/controller/NFTArtCollectionMarketplaceERC721Ts.controller");
(0, chaincode_1.default)({
    chainCodeName: 'NFTArtCollectionMarketplaceERC721Ts',
    chainCode: NFTArtCollectionMarketplaceERC721Ts_controller_1.NFTArtCollectionMarketplaceERC721TsController,
});
//# sourceMappingURL=main.js.map