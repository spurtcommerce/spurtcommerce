"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGmapController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const PluginService_1 = require("../../core/services/PluginService");
let AdminGmapController = class AdminGmapController {
    constructor(pluginService) {
        this.pluginService = pluginService;
    }
    // Gmap settings Updated API
    /**
     * @api {post} /api/admin-gmap/update-setting Gmap Setting Updated API
     * @apiGroup Admin Gmap
     * @apiHeader {string} Authorized
     * @apiParam (requestBody) {string} clientId clientId
     * @apiParam (requestBody) {string} clientSecret clientSecret
     * @apiParam (requestBody) {string} isTest isTest
     * @apiParamExample {json} Input
     * {
     *         "clientId": "",
     *         "clientSecret": "",
     *         "isTest": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 Ok
     * {
     *     "status": "1",
     *     "message": "Gmap settings updated successfully"
     * }
     * @apiSampleRequest /api/admin-gmap/update-setting
     * @apiErrorExample {json} Setting Update error
     * HTTP/1.1 500 Internal Server Error
     */
    updateSetting(postParams, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginDetail = yield this.pluginService.findOne({
                where: {
                    pluginName: 'gmap',
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
            const saveResponse = yield this.pluginService.create(pluginDetail);
            if (saveResponse) {
                return response.status(200).send({
                    status: 1,
                    message: 'Gmap settings updated successfully',
                });
            }
            const errorResponse = {
                status: 1,
                message: 'Unable to update the Gmap settings',
            };
            return response.status(400).send(errorResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/update-setting'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminGmapController.prototype, "updateSetting", null);
AdminGmapController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/admin-gmap'),
    tslib_1.__metadata("design:paramtypes", [PluginService_1.PluginService])
], AdminGmapController);
exports.AdminGmapController = AdminGmapController;
//# sourceMappingURL=GmapController.js.map