"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorAdminSettingController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const VendorSettingService_1 = require("../../core/services/VendorSettingService");
const VendorGlobalSettings_1 = require("../../core/models/VendorGlobalSettings");
const CreateVendorSettingRequest_1 = require("./requests/CreateVendorSettingRequest");
let VendorAdminSettingController = class VendorAdminSettingController {
    constructor(vendorGlobalSettingService) {
        this.vendorGlobalSettingService = vendorGlobalSettingService;
    }
    // create and update Vendor settings API
    /**
     * @api {post} /api/vendor-setting/create-vendor-settings Create Vendor Settings API
     * @apiGroup Admin-Vendor-Setting
     * @apiParam (Request body) {Number} defaultCommission  default commission
     * @apiParamExample {json} Input
     * {
     *      "defaultCommission" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Created Vendor Setting.",
     *      "status": "1",
     *      "data": {
     *      "vendorGlobalSettingId": "",
     *      "defaultCommission": "",
     *      "createdBy": "",
     *      "createDate": "",
     *  }
     * }
     * @apiSampleRequest /api/vendor-setting/create-vendor-settings
     * @apiErrorExample {json} addSettings error
     * HTTP/1.1 500 Internal Server Error
     */
    createSettings(settings, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const settingValue = yield this.vendorGlobalSettingService.findOne();
            if (settingValue === undefined) {
                const newSettings = new VendorGlobalSettings_1.VendorGlobalSetting();
                newSettings.defaultCommission = settings.defaultCommission;
                const createdData = yield this.vendorGlobalSettingService.create(newSettings);
                const successResponse = {
                    status: 1,
                    message: 'Settings created Successfully',
                    data: createdData,
                };
                return response.status(200).send(successResponse);
            }
            else {
                settingValue.defaultCommission = settings.defaultCommission;
                const updatedData = yield this.vendorGlobalSettingService.create(settingValue);
                const successResponse = {
                    status: 1,
                    message: 'Settings Updated Successfully',
                    data: updatedData,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Get Vendor Settings list API
    /**
     * @api {get} /api/vendor-setting/get-vendor-settings Get Vendor Setting API
     * @apiGroup Admin-Vendor-Setting
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get vendor settings",
     *      "data": {
     *      "defaultCommission":""
     *     }
     * }
     * @apiSampleRequest /api/vendor-setting/get-vendor-settings
     * @apiErrorExample {json} getSettings error
     * HTTP/1.1 500 Internal Server Error
     */
    settingsList(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const settingValue = yield this.vendorGlobalSettingService.findOne();
            if (settingValue === undefined) {
                const successresponse = {
                    status: 1,
                    message: 'data is empty',
                };
                return response.status(200).send(successresponse);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got seller settings',
                data: {
                    defaultCommission: settingValue.defaultCommission,
                },
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/create-vendor-settings'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateVendorSettingRequest_1.CreateVendorSettingRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorAdminSettingController.prototype, "createSettings", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/get-vendor-settings'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorAdminSettingController.prototype, "settingsList", null);
VendorAdminSettingController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/vendor-setting'),
    tslib_1.__metadata("design:paramtypes", [VendorSettingService_1.VendorGlobalSettingService])
], VendorAdminSettingController);
exports.VendorAdminSettingController = VendorAdminSettingController;
//# sourceMappingURL=VendorSettingController.js.map