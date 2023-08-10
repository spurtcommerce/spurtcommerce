"use strict";
/*
 * spurtcommerce API
 * version 4.8.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginController = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const PluginService_1 = require("../../core/services/PluginService");
const SettingService_1 = require("../../core/services/SettingService");
const UpdatePluginStatus_1 = require("./requests/UpdatePluginStatus");
let PluginController = class PluginController {
    constructor(pluginService, settingService) {
        this.pluginService = pluginService;
        this.settingService = settingService;
    }
    // Plugin List API
    /**
     * @api {get} /api/plugins/list Plugin List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} module Module
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/plugins/list
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    pluginList(module, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const whereConditions = [];
            if (module && module !== '') {
                whereConditions.push({
                    name: 'pluginType',
                    value: module,
                });
            }
            const pluginList = yield this.pluginService.list(0, 0, [], [], whereConditions, false);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete product list.',
                data: (0, class_transformer_1.instanceToPlain)(pluginList),
            };
            return response.status(200).send(successResponse);
        });
    }
    // Plugin Detail API
    /**
     * @api {get} /api/plugins/detail/:id Plugin Detail API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} id Plugin Id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/plugins/detail/:id
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    pluginDetail(pluginId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginDetail = yield this.pluginService.findOne({
                id: pluginId,
            });
            if (!pluginDetail) {
                return response.status(200).send({
                    status: 1,
                    message: 'Invalid Plugin Id',
                });
            }
            const pluginFormData = pluginDetail.pluginFormInfo ? JSON.parse(pluginDetail.pluginFormInfo) : [];
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            pluginFormData.controls = pluginFormData.controls.map((element) => {
                if (paypalAdditionalInfo[element.name]) {
                    element.value = paypalAdditionalInfo[element.name];
                }
                return element;
            });
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete product list.',
                data: pluginFormData,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Update Plugin Status API
    /**
     * @api {put} /api/plugins/update/plugin-status/:id Update Plugin Status API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} pluginStatus
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully updated plugin status",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/plugins/update/plugin-status/:id
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    updatePluginStatus(pluginId, updateParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const plugin = yield this.pluginService.findOne({
                where: {
                    id: pluginId,
                },
            });
            if (!plugin) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Plugin Id',
                });
            }
            plugin.pluginStatus = updateParam.pluginStatus;
            yield this.pluginService.create(plugin);
            const setting = yield this.settingService.findOne();
            const addonPermissions = setting.addons ? JSON.parse(setting.addons) : {};
            if (+updateParam.pluginStatus === 1) {
                addonPermissions[plugin.slugName] = true;
            }
            else {
                console.log('false');
                addonPermissions[plugin.slugName] = false;
            }
            setting.addons = JSON.stringify(addonPermissions);
            yield this.settingService.create(setting);
            return response.status(200).send({
                status: 1,
                message: 'Successfully updated the plugin status',
                data: plugin,
            });
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/list')
    // @Authorized()
    ,
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('module')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PluginController.prototype, "pluginList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/detail/:id')
    //  @Authorized()
    ,
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PluginController.prototype, "pluginDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update/plugin-status/:id')
    //  @Authorized()
    ,
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, UpdatePluginStatus_1.UpdatePluginStatus, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PluginController.prototype, "updatePluginStatus", null);
PluginController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/plugins'),
    tslib_1.__metadata("design:paramtypes", [PluginService_1.PluginService,
        SettingService_1.SettingService])
], PluginController);
exports.PluginController = PluginController;
//# sourceMappingURL=PluginController.js.map