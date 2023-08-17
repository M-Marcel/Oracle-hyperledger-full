/**
 *
 * Copyright (c) 2022, Oracle and/or its affiliates. All rights reserved.
 *
 */
import ChaincodeSDK from './lib/chaincode';

import { FabCarController } from './src/controller/FabCar.controller';


ChaincodeSDK({
    chainCodeName: 'FabCar',
    chainCode: FabCarController,
});
