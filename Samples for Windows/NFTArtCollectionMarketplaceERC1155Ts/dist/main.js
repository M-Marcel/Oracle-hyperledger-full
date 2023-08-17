"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chaincode_1 = require("./lib/chaincode");
const NFTArtCollectionMarketplaceERC1155Ts_controller_1 = require("./src/controller/NFTArtCollectionMarketplaceERC1155Ts.controller");
(0, chaincode_1.default)({
    chainCodeName: 'NFTArtCollectionMarketplaceERC1155Ts',
    chainCode: NFTArtCollectionMarketplaceERC1155Ts_controller_1.NFTArtCollectionMarketplaceERC1155TsController,
});
//# sourceMappingURL=main.js.map