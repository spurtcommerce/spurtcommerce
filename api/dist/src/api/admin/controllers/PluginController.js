"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
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
const S3Service_1 = require("../../core/services/S3Service");
const ImageService_1 = require("../../core/services/ImageService");
const env_1 = require("../../../../src/env");
let PluginController = class PluginController {
    constructor(pluginService, settingService, s3Service, imageService) {
        this.pluginService = pluginService;
        this.settingService = settingService;
        this.s3Service = s3Service;
        this.imageService = imageService;
    }
    // Plugin List API
    /**
     * @api {get} /api/plugins Plugin List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} module Module
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{
     *      "pluginName": "",
     *      "pluginAvatar": "",
     *      "pluginAvatarPath": "",
     *      "pluginType": "",
     *      "pluginAdditionalInfo": "",
     *      "pluginFormInfo": "",
     *      "pluginStatus": "",
     *      "pluginTimestamp": "",
     *      "routes": ""
     *      }"
     * }
     * @apiSampleRequest /api/plugins
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
                message: 'Successfully got the plugin list',
                data: (0, class_transformer_1.instanceToPlain)(pluginList),
            };
            return response.status(200).send(successResponse);
        });
    }
    // Plugin Detail API
    /**
     * @api {get} /api/plugins/:id Plugin Detail API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} id Plugin Id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{
     *      "pluginName": "",
     *      "pluginAvatar": "",
     *      "pluginAvatarPath": "",
     *      "pluginType": "",
     *      "pluginAdditionalInfo": "",
     *      "pluginFormInfo": "",
     *      "pluginStatus": "",
     *      "pluginTimestamp": "",
     *      "routes": ""
     *      }"
     * }
     * @apiSampleRequest /api/plugins/:id
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
            const pluginFormData = pluginDetail.pluginFormInfo ? JSON.parse(pluginDetail.pluginFormInfo) : undefined;
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            if (pluginFormData) {
                pluginFormData.controls = pluginFormData.controls.map((element) => {
                    if (paypalAdditionalInfo[element.name]) {
                        element.value = paypalAdditionalInfo[element.name];
                    }
                    return element;
                });
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got the plugin detail',
                data: pluginFormData ? pluginFormData : pluginDetail,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Update Plugin Status API
    /**
     * @api {put} /api/plugins/:id Update Plugin Status API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} pluginStatus
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully updated plugin status",
     *      "data": {
     *      "isActive": ""
     *      }
     * }
     * @apiSampleRequest /api/plugins/:id
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
    // Update Plugin
    /**
     * @api {put} /api/plugins/logo/:id Update Plugin API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} pluginAdditionalInfo
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully updated plugin",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/plugins/logo/:id
     * @apiErrorExample {json} plugin update error
     * HTTP/1.1 500 Internal Server Error
     */
    updatePlugin(id, payload, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const plugin = yield this.pluginService.findOne({
                where: {
                    id,
                },
            });
            if (!plugin) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid Plugin Id`,
                });
            }
            plugin.pluginAdditionalInfo = payload.pluginAdditionalInfo ? JSON.stringify(payload.pluginAdditionalInfo) : plugin.pluginAdditionalInfo;
            const pluginSave = yield this.pluginService.create(plugin);
            return response.status(200).send({
                status: 1,
                message: `Successfully updated plugin`,
                data: pluginSave,
            });
        });
    }
    // Update Plugin
    /**
     * @api {put} /api/plugins/logo/:id Update Plugin API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} image image
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully updated the plugin image",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/plugins/logo/:id
     * @apiErrorExample {json} plugin update error
     * HTTP/1.1 500 Internal Server Error
     */
    updatePluginLogo(pluginId, updateParam, response) {
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
            const mime = require('mime');
            const mimeType = this.base64MimeType(updateParam.image);
            const fileType = mime.getExtension(mimeType);
            const availableTypes = env_1.env.availImageTypes.split(',');
            if (!availableTypes.includes(fileType)) {
                const errorTypeResponse = {
                    status: 0,
                    message: 'Only ' + env_1.env.availImageTypes + ' types are allowed',
                };
                return response.status(400).send(errorTypeResponse);
            }
            const name = 'Img_' + Date.now() + '.' + fileType;
            const path = 'logo/';
            const base64Only = updateParam.image.split(',')[1];
            const base64Data = Buffer.from(base64Only, 'base64');
            if (env_1.env.imageserver === 's3') {
                yield this.s3Service.imageUpload((path + name), base64Data, mimeType);
            }
            else {
                yield this.imageService.imageUpload((path + name), base64Data);
            }
            plugin.pluginAvatar = name;
            plugin.pluginAvatarPath = path;
            const pluginSave = yield this.pluginService.create(plugin);
            return response.status(200).send({
                status: 1,
                message: 'Successfully updated the plugin image',
                data: pluginSave,
            });
        });
    }
    base64MimeType(encoded) {
        let result = undefined;
        if (typeof encoded !== 'string') {
            return result;
        }
        const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
        if (mime && mime.length) {
            result = mime[1];
        }
        return result;
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('module')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PluginController.prototype, "pluginList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:id')
    // @Authorized()
    ,
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PluginController.prototype, "pluginDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, UpdatePluginStatus_1.UpdatePluginStatus, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PluginController.prototype, "updatePluginStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/logo/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PluginController.prototype, "updatePlugin", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/logo/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PluginController.prototype, "updatePluginLogo", null);
PluginController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/plugins'),
    tslib_1.__metadata("design:paramtypes", [PluginService_1.PluginService,
        SettingService_1.SettingService,
        S3Service_1.S3Service,
        ImageService_1.ImageService])
], PluginController);
exports.PluginController = PluginController;
//# sourceMappingURL=PluginController.js.map