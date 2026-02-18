"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.iocLoader = void 0;
require("reflect-metadata");
const class_validator_1 = require("class-validator");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const iocLoader = (settings) => {
    /**
     * Setup routing-controllers to use typedi container.
     */
    (0, routing_controllers_1.useContainer)(typedi_1.Container);
    (0, class_validator_1.useContainer)(typedi_1.Container, {
        fallback: true,
        fallbackOnErrors: true,
    });
};
exports.iocLoader = iocLoader;
//# sourceMappingURL=iocLoader.js.map