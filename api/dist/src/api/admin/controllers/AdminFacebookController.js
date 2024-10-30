"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminFacebookController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../../../../src/api/core/models/Plugin");
let AdminFacebookController = class AdminFacebookController {
    constructor() {
        // ---
    }
    // update Facebook Credential API
    /**
     * @api {post} /api/admin-facebook/update-setting Update Facebook Credential API
     * @apiGroup Oauth
     * @apiParam (Request body) {String{..255}} clientId clientId
     * @apiParam (Request body) {String{..255}} clientSecret clientSecret
     * @apiParam (Request body) {boolean} isTest isTest
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/admin-facebook/update-setting
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    updateSetting(postParams, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'Facebook',
                },
            });
            if (!pluginDetail) {
                return response.status(400).send({
                    status: 1,
                    message: 'You not install this plugin. or problem in installation',
                });
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            paypalAdditionalInfo.AppId = postParams.clientId;
            paypalAdditionalInfo.AppSecretKey = postParams.clientSecret;
            paypalAdditionalInfo.isTest = postParams.isTest;
            pluginDetail.pluginAdditionalInfo = JSON.stringify(paypalAdditionalInfo);
            const saveResponse = yield pluginRepository.save(pluginDetail);
            if (saveResponse) {
                return response.status(200).send({
                    status: 1,
                    message: 'Facebook settings updated successfully',
                });
            }
            const errorResponse = {
                status: 1,
                message: 'Unable to update the facebook settings',
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
], AdminFacebookController.prototype, "updateSetting", null);
AdminFacebookController = tslib_1.__decorate([
    (0, routing_controllers_1.Controller)('/admin-facebook'),
    tslib_1.__metadata("design:paramtypes", [])
], AdminFacebookController);
exports.AdminFacebookController = AdminFacebookController;
//# sourceMappingURL=AdminFacebookController.js.map