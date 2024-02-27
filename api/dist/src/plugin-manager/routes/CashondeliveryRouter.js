"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashOnDeliveryRoute = void 0;
const tslib_1 = require("tslib");
const express = tslib_1.__importStar(require("express"));
const CashondeliveryController_1 = require("../controller/CashondeliveryController");
const cashondeliveryController = new CashondeliveryController_1.CashondeliveryController();
exports.cashOnDeliveryRoute = express.Router()
    .get('/', cashondeliveryController.cashondelivery);
//# sourceMappingURL=CashondeliveryRouter.js.map