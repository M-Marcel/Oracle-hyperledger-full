"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Owner = exports.Dealer = exports.Car = void 0;
const tslib_1 = require("tslib");
const yup = require("yup");
const decorators_1 = require("../../lib/decorators");
const ochain_model_1 = require("../../lib/ochain-model");
let Car = class Car extends ochain_model_1.OchainModel {
    constructor() {
        super(...arguments);
        this.assetType = "car";
    }
};
tslib_1.__decorate([
    (0, decorators_1.Mandatory)(),
    (0, decorators_1.Validate)(yup.string().min(17).max(17)),
    tslib_1.__metadata("design:type", String)
], Car.prototype, "vin", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string().matches(/^\s*(cheverolet|ford|general\smotors|toyota|hyundai|tesla|tata|fiat|volkswagen|peugeot)\s*$/i)),
    tslib_1.__metadata("design:type", String)
], Car.prototype, "make", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], Car.prototype, "model", void 0);
tslib_1.__decorate([
    (0, decorators_1.Mandatory)(),
    (0, decorators_1.Validate)(yup.number().min(1910).max(2020)),
    tslib_1.__metadata("design:type", Number)
], Car.prototype, "year", void 0);
tslib_1.__decorate([
    (0, decorators_1.Mandatory)(),
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], Car.prototype, "color", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], Car.prototype, "ownerId", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.number().positive()),
    tslib_1.__metadata("design:type", Number)
], Car.prototype, "price", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.date()),
    tslib_1.__metadata("design:type", Date)
], Car.prototype, "lastSold", void 0);
Car = tslib_1.__decorate([
    (0, decorators_1.Id)("vin")
], Car);
exports.Car = Car;
let Dealer = class Dealer extends ochain_model_1.OchainModel {
    constructor() {
        super(...arguments);
        this.assetType = "dealer";
    }
};
tslib_1.__decorate([
    (0, decorators_1.Mandatory)(),
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], Dealer.prototype, "dealerId", void 0);
tslib_1.__decorate([
    (0, decorators_1.Mandatory)(),
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], Dealer.prototype, "name", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string().url()),
    tslib_1.__metadata("design:type", String)
], Dealer.prototype, "website", void 0);
tslib_1.__decorate([
    (0, decorators_1.Mandatory)(),
    (0, decorators_1.Validate)(yup.string().matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)),
    tslib_1.__metadata("design:type", String)
], Dealer.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string().email()),
    tslib_1.__metadata("design:type", String)
], Dealer.prototype, "email", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.array().of(yup.string())),
    tslib_1.__metadata("design:type", Array)
], Dealer.prototype, "inventory", void 0);
Dealer = tslib_1.__decorate([
    (0, decorators_1.Id)("dealerId")
], Dealer);
exports.Dealer = Dealer;
let Owner = class Owner extends ochain_model_1.OchainModel {
    constructor() {
        super(...arguments);
        this.assetType = "owner";
    }
};
tslib_1.__decorate([
    (0, decorators_1.Mandatory)(),
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], Owner.prototype, "ownerId", void 0);
tslib_1.__decorate([
    (0, decorators_1.Mandatory)(),
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], Owner.prototype, "name", void 0);
tslib_1.__decorate([
    (0, decorators_1.Mandatory)(),
    (0, decorators_1.Validate)(yup.string().matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)),
    tslib_1.__metadata("design:type", String)
], Owner.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string().email()),
    tslib_1.__metadata("design:type", String)
], Owner.prototype, "email", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.array().of(yup.string())),
    tslib_1.__metadata("design:type", Array)
], Owner.prototype, "cars", void 0);
Owner = tslib_1.__decorate([
    (0, decorators_1.Id)("ownerId")
], Owner);
exports.Owner = Owner;
//# sourceMappingURL=FabCar.model.js.map