"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chaincode_1 = require("./lib/chaincode");
const FabCar_controller_1 = require("./src/controller/FabCar.controller");
(0, chaincode_1.default)({
    chainCodeName: 'FabCar',
    chainCode: FabCar_controller_1.FabCarController,
});
//# sourceMappingURL=main.js.map