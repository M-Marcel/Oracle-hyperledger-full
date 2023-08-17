"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FabCarController = void 0;
const tslib_1 = require("tslib");
const yup = require("yup");
const decorators_1 = require("../../lib/decorators");
const ochain_controller_1 = require("../../lib/ochain-controller");
const FabCar_model_1 = require("../model/FabCar.model");
const FabCar_model_2 = require("../model/FabCar.model");
const FabCar_model_3 = require("../model/FabCar.model");
class FabCarController extends ochain_controller_1.OchainController {
    constructor(ctx) {
        super(ctx.Stub);
        this.Ctx = ctx;
    }
    init() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    createCar(asset) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.Model.save(asset);
        });
    }
    getCarById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const asset = yield this.Ctx.Model.get(id, FabCar_model_1.Car);
            return asset;
        });
    }
    updateCar(asset) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.Model.update(asset);
        });
    }
    deleteCar(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.Ctx.Model.delete(id);
            return result;
        });
    }
    getCarHistoryById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.Ctx.Model.history(id);
            return result;
        });
    }
    getCarByRange(startId, endId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.Ctx.Model.getByRange(startId, endId, FabCar_model_1.Car);
            return result;
        });
    }
    createDealer(asset) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.Model.save(asset);
        });
    }
    getDealerById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const asset = yield this.Ctx.Model.get(id, FabCar_model_2.Dealer);
            return asset;
        });
    }
    updateDealer(asset) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.Model.update(asset);
        });
    }
    deleteDealer(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.Ctx.Model.delete(id);
            return result;
        });
    }
    getDealerHistoryById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.Ctx.Model.history(id);
            return result;
        });
    }
    getDealerByRange(startId, endId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.Ctx.Model.getByRange(startId, endId, FabCar_model_2.Dealer);
            return result;
        });
    }
    createOwner(asset) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.Model.save(asset);
        });
    }
    getOwnerById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const asset = yield this.Ctx.Model.get(id, FabCar_model_3.Owner);
            return asset;
        });
    }
    updateOwner(asset) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.Model.update(asset);
        });
    }
    deleteOwner(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.Ctx.Model.delete(id);
            return result;
        });
    }
    getOwnerHistoryById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.Ctx.Model.history(id);
            return result;
        });
    }
    getOwnerByRange(startId, endId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.Ctx.Model.getByRange(startId, endId, FabCar_model_3.Owner);
            return result;
        });
    }
    executeQuery(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(query);
            return result;
        });
    }
    buyCar(vin, buyerId, sellerId, price, date) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
        });
    }
    addCar(vin, dealerId, price, date) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
        });
    }
}
tslib_1.__decorate([
    (0, decorators_1.Validator)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "init", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(FabCar_model_1.Car),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [FabCar_model_1.Car]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "createCar", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "getCarById", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(FabCar_model_1.Car),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [FabCar_model_1.Car]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "updateCar", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "deleteCar", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "getCarHistoryById", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "getCarByRange", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(FabCar_model_2.Dealer),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [FabCar_model_2.Dealer]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "createDealer", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "getDealerById", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(FabCar_model_2.Dealer),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [FabCar_model_2.Dealer]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "updateDealer", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "deleteDealer", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "getDealerHistoryById", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "getDealerByRange", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(FabCar_model_3.Owner),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [FabCar_model_3.Owner]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "createOwner", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "getOwnerById", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(FabCar_model_3.Owner),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [FabCar_model_3.Owner]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "updateOwner", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "deleteOwner", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "getOwnerHistoryById", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "getOwnerByRange", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "executeQuery", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string(), yup.number(), yup.date()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, Number, Date]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "buyCar", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.number(), yup.date()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Number, Date]),
    tslib_1.__metadata("design:returntype", Promise)
], FabCarController.prototype, "addCar", null);
exports.FabCarController = FabCarController;
//# sourceMappingURL=FabCar.controller.js.map