"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorpayNoAuthRoute = exports.RazorpayRoute = void 0;
const tslib_1 = require("tslib");
const express = tslib_1.__importStar(require("express"));
const RazorpayController_1 = require("../controller/RazorpayController");
const razorPayController = new RazorpayController_1.RazorPayController();
exports.RazorpayRoute = express.Router()
    .get('/', razorPayController.index)
    .post('/', razorPayController.updateSettings);
exports.RazorpayNoAuthRoute = express.Router()
    .get('/process/:orderPrefixId', razorPayController.process)
    .get('/proceed/:orderId', razorPayController.proceed)
    .get('/success', razorPayController.success)
    .get('/cancel/:orderId', razorPayController.cancel)
    .get('/process-api/:orderPrefixId', razorPayController.processAPI)
    .get('/success-api', razorPayController.successAPI);
//# sourceMappingURL=RazorpayRouter.js.map