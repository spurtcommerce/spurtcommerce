"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashondeliveryController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
class CashondeliveryController {
    constructor() {
        // ---
    }
    cashondelivery(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            res.render('pages/cashOnDelivery', {
                title: 'Cashondelivery',
                path: '../cashOnDelivery',
            });
        });
    }
}
exports.CashondeliveryController = CashondeliveryController;
//# sourceMappingURL=CashondeliveryController.js.map