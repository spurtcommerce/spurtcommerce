"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaypalNoAuthRoute = exports.PaypalRoute = void 0;
const tslib_1 = require("tslib");
const express = tslib_1.__importStar(require("express"));
const PaypalController_1 = require("../controller/PaypalController");
const paypalController = new PaypalController_1.PaypalController();
exports.PaypalRoute = express.Router()
    .get('/', paypalController.index)
    .post('/', paypalController.updateSettings);
exports.PaypalNoAuthRoute = express.Router()
    .get('/process/:orderPrefixId', paypalController.process)
    .get('/proceed/:orderId', paypalController.proceed)
    .get('/success', paypalController.success)
    .get('/cancel', paypalController.cancel);
//# sourceMappingURL=PaypalRouter.js.map