"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeNoAuthRoute = exports.StripeRoute = void 0;
const tslib_1 = require("tslib");
const express = tslib_1.__importStar(require("express"));
const StripeController_1 = require("../controller/StripeController");
const stripeController = new StripeController_1.StripeController();
exports.StripeRoute = express.Router()
    .get('/', stripeController.index)
    .post('/', stripeController.updateSettings);
exports.StripeNoAuthRoute = express.Router()
    .get('/process/:orderPrefixId', stripeController.process)
    .get('/success', stripeController.success)
    .get('/cancel', stripeController.cancel);
//# sourceMappingURL=StripeRouter.js.map