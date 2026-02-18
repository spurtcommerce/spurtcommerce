"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPayPalController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const Plugin_1 = require("../../../../../src/api/core/models/Plugin");
const typeormLoader_1 = require("../../../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let AdminPayPalController = class AdminPayPalController {
    constructor() {
        // ---
    }
    // Update Setting API
    /**
     * @api {post} /api/paypal-payment Update Setting API
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
     *      "message": "Paypal settings updated successfully.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/paypal-payment
     * @apiErrorExample {json} Update Setting API error
     * HTTP/1.1 500 Internal Server Error
     */
    updateSetting(postParams, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginRepository = (0, typeormLoader_1.getDataSource)().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'paypal',
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
                    message: 'Paypal settings updated successfully',
                });
            }
            const errorResponse = {
                status: 1,
                message: 'Unable to update the paypal settings',
            };
            return response.status(400).send(errorResponse);
        });
    }
};
exports.AdminPayPalController = AdminPayPalController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminPayPalController.prototype, "updateSetting", null);
exports.AdminPayPalController = AdminPayPalController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.Controller)('/paypal-payment'),
    tslib_1.__metadata("design:paramtypes", [])
], AdminPayPalController);
//# sourceMappingURL=AdminPaypalController.js.map