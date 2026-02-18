"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRazorPayController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const Plugin_1 = require("../../../../../src/api/core/models/Plugin");
const typeormLoader_1 = require("../../../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let AdminRazorPayController = class AdminRazorPayController {
    constructor() {
        // ---
    }
    // Update Setting API
    /**
     * @api {post} /api/admin-razor-pay-payment Update Setting API
     * @apiGroup Setting
     * @apiParam (Request body) {String} postParams postParams
     * @apiParamExample {json} Input
     * {
     *      "clientId" : 1,
     *      "clientSecret": "",
     *      "isTest": 1,
     *      "paypalAdditionalInfo": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Razorpay settings updated successfully.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-razor-pay-payment
     * @apiErrorExample {json} Update Setting API error
     * HTTP/1.1 500 Internal Server Error
     */
    updateSetting(postParams, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginRepository = (0, typeormLoader_1.getDataSource)().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'Razorpay',
                },
            });
            if (!pluginDetail) {
                return response.status(400).send({
                    status: 1,
                    message: 'You not install this plugin. or problem in installation',
                });
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            paypalAdditionalInfo.clientId = postParams.clientId;
            paypalAdditionalInfo.clientSecret = postParams.clientSecret;
            paypalAdditionalInfo.isTest = postParams.isTest;
            pluginDetail.pluginAdditionalInfo = JSON.stringify(paypalAdditionalInfo);
            const saveResponse = yield pluginRepository.save(pluginDetail);
            if (saveResponse) {
                return response.status(200).send({
                    status: 1,
                    message: 'Razorpay settings updated successfully',
                });
            }
            const errorResponse = {
                status: 1,
                message: 'Unable to update the Razorpay settings',
            };
            return response.status(400).send(errorResponse);
        });
    }
};
exports.AdminRazorPayController = AdminRazorPayController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/update-setting'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminRazorPayController.prototype, "updateSetting", null);
exports.AdminRazorPayController = AdminRazorPayController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.Controller)('/admin-razor-pay-payment'),
    tslib_1.__metadata("design:paramtypes", [])
], AdminRazorPayController);
//# sourceMappingURL=AdminRazorPayController.js.map