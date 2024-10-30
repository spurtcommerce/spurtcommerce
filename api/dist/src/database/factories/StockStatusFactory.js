"use strict";
/*
 * spurtcommerce API
 * version 2.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2020 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const stockStatus_1 = require("../../api/core/models/stockStatus");
(0, typeorm_seeding_1.define)(stockStatus_1.StockStatus, (faker, settings) => {
    const stockStatus = new stockStatus_1.StockStatus();
    return stockStatus;
});
//# sourceMappingURL=StockStatusFactory.js.map