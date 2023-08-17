"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtCollection = exports.ArtCollectionMetadata = void 0;
const tslib_1 = require("tslib");
const yup = require("yup");
const decorators_1 = require("../../lib/decorators");
const ochain_model_1 = require("../../lib/ochain-model");
const ochain_embedded_model_1 = require("../../lib/ochain-embedded-model");
class ArtCollectionMetadata extends ochain_embedded_model_1.EmbeddedModel {
}
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], ArtCollectionMetadata.prototype, "painting_name", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], ArtCollectionMetadata.prototype, "description", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], ArtCollectionMetadata.prototype, "image", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], ArtCollectionMetadata.prototype, "painter_name", void 0);
exports.ArtCollectionMetadata = ArtCollectionMetadata;
let ArtCollection = class ArtCollection extends ochain_model_1.OchainModel {
    constructor() {
        super(...arguments);
        this.assetType = "otoken";
    }
};
tslib_1.__decorate([
    (0, decorators_1.Mandatory)(),
    (0, decorators_1.Validate)(yup
        .string()
        .required()
        .matches(/^[A-Za-z0-9][A-Za-z0-9_-]*$/)
        .max(16)),
    tslib_1.__metadata("design:type", String)
], ArtCollection.prototype, "tokenId", void 0);
tslib_1.__decorate([
    (0, decorators_1.ReadOnly)("artcollection"),
    tslib_1.__metadata("design:type", String)
], ArtCollection.prototype, "tokenName", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string().trim().max(256)),
    tslib_1.__metadata("design:type", String)
], ArtCollection.prototype, "tokenDesc", void 0);
tslib_1.__decorate([
    (0, decorators_1.ReadOnly)("ART"),
    tslib_1.__metadata("design:type", String)
], ArtCollection.prototype, "symbol", void 0);
tslib_1.__decorate([
    (0, decorators_1.ReadOnly)("erc721+"),
    tslib_1.__metadata("design:type", String)
], ArtCollection.prototype, "tokenStandard", void 0);
tslib_1.__decorate([
    (0, decorators_1.ReadOnly)("nonfungible"),
    tslib_1.__metadata("design:type", String)
], ArtCollection.prototype, "tokenType", void 0);
tslib_1.__decorate([
    (0, decorators_1.ReadOnly)("whole"),
    tslib_1.__metadata("design:type", String)
], ArtCollection.prototype, "tokenUnit", void 0);
tslib_1.__decorate([
    (0, decorators_1.ReadOnly)(["indivisible", "singleton", "mintable", "transferable", "burnable", "roles"]),
    tslib_1.__metadata("design:type", Array)
], ArtCollection.prototype, "behaviors", void 0);
tslib_1.__decorate([
    (0, decorators_1.ReadOnly)({ minter_role_name: "minter" }),
    tslib_1.__metadata("design:type", Object)
], ArtCollection.prototype, "roles", void 0);
tslib_1.__decorate([
    (0, decorators_1.ReadOnly)({ max_mint_quantity: 20000 }),
    tslib_1.__metadata("design:type", Object)
], ArtCollection.prototype, "mintable", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], ArtCollection.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], ArtCollection.prototype, "createdBy", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], ArtCollection.prototype, "transferredBy", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], ArtCollection.prototype, "creationDate", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], ArtCollection.prototype, "transferredDate", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.bool()),
    tslib_1.__metadata("design:type", Boolean)
], ArtCollection.prototype, "isBurned", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], ArtCollection.prototype, "burnedBy", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], ArtCollection.prototype, "burnedDate", void 0);
tslib_1.__decorate([
    (0, decorators_1.Mandatory)(),
    (0, decorators_1.Validate)(yup.string().required().max(2000)),
    tslib_1.__metadata("design:type", String)
], ArtCollection.prototype, "tokenUri", void 0);
tslib_1.__decorate([
    (0, decorators_1.Embedded)(ArtCollectionMetadata),
    tslib_1.__metadata("design:type", ArtCollectionMetadata)
], ArtCollection.prototype, "metadata", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.number()),
    tslib_1.__metadata("design:type", Number)
], ArtCollection.prototype, "price", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.boolean()),
    tslib_1.__metadata("design:type", Boolean)
], ArtCollection.prototype, "on_sale_flag", void 0);
ArtCollection = tslib_1.__decorate([
    (0, decorators_1.Id)("tokenId")
], ArtCollection);
exports.ArtCollection = ArtCollection;
//# sourceMappingURL=NFTArtCollectionMarketplaceERC721Ts.model.js.map