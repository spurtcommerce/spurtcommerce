/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { instanceToPlain } from 'class-transformer';
import 'reflect-metadata';
import {
    Get,
    JsonController,
    Authorized,
    QueryParam,
    Res,
    Param,
    Put,
    Body
} from 'routing-controllers';
import { PluginService } from '../../core/services/PluginService';
import { SettingService } from '../../core/services/SettingService';
import { UpdatePluginStatus } from './requests/UpdatePluginStatus';
import { S3Service } from '../../core/services/S3Service';
import { ImageService } from '../../core/services/ImageService';
import { env } from '../../../../src/env';
import { Plugins } from '../../core/models/Plugin';
@JsonController('/plugins')
export class PluginController {
    constructor(
        private pluginService: PluginService,
        private settingService: SettingService,
        private s3Service: S3Service,
        private imageService: ImageService
    ) {
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
    @Get()
    @Authorized()
    public async pluginList(@QueryParam('module') module: string, @Res() response: any): Promise<any> {

        const whereConditions = [];

        if (module && module !== '') {
            whereConditions.push({
                name: 'pluginType',
                value: module,
            });
        }

        const pluginList = await this.pluginService.list(0, 0, [], [], whereConditions, false);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the plugin list',
            data: instanceToPlain(pluginList),
        };
        return response.status(200).send(successResponse);
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
    @Get('/:id')
    // @Authorized()
    public async pluginDetail(@Param('id') pluginId: number, @Res() response: any): Promise<any> {
        const pluginDetail = await this.pluginService.findOne({
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
            pluginFormData.controls = pluginFormData.controls.map((element: any) => {
                if (paypalAdditionalInfo[element.name]) {
                    element.value = paypalAdditionalInfo[element.name];
                }
                return element;
            });
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the plugin detail',
            data: pluginFormData ? pluginFormData : pluginDetail,
        };
        return response.status(200).send(successResponse);
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
    @Put('/:id')
    @Authorized()
    public async updatePluginStatus(@Param('id') pluginId: number, @Body({ validate: true }) updateParam: UpdatePluginStatus, @Res() response: any): Promise<any> {
        const plugin = await this.pluginService.findOne({
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
        await this.pluginService.create(plugin);
        const setting = await this.settingService.findOne();
        const addonPermissions: any = setting.addons ? JSON.parse(setting.addons) : {};
        if (+updateParam.pluginStatus === 1) {
            addonPermissions[plugin.slugName] = true;
        } else {
            console.log('false');
            addonPermissions[plugin.slugName] = false;
        }
        setting.addons = JSON.stringify(addonPermissions);
        await this.settingService.create(setting);
        return response.status(200).send({
            status: 1,
            message: 'Successfully updated the plugin status',
            data: plugin,
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
    @Put('/logo/:id')
    public async updatePlugin(@Param('id') id: number, @Body({ validate: true }) payload: any, @Res() response: any): Promise<any> {

        const plugin: Plugins = await this.pluginService.findOne({
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

        const pluginSave = await this.pluginService.create(plugin);

        return response.status(200).send({
            status: 1,
            message: `Successfully updated plugin`,
            data: pluginSave,
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
    @Put('/logo/:id')
    public async updatePluginLogo(@Param('id') pluginId: number, @Body({ validate: true }) updateParam: { image: string }, @Res() response: any): Promise<any> {
        const plugin = await this.pluginService.findOne({
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

        const availableTypes = env.availImageTypes.split(',');
        if (!availableTypes.includes(fileType)) {
            const errorTypeResponse: any = {
                status: 0,
                message: 'Only ' + env.availImageTypes + ' types are allowed',
            };
            return response.status(400).send(errorTypeResponse);
        }
        const name = 'Img_' + Date.now() + '.' + fileType;
        const path = 'logo/';

        const base64Only = updateParam.image.split(',')[1];

        const base64Data = Buffer.from(base64Only, 'base64');

        if (env.imageserver === 's3') {
            await this.s3Service.imageUpload((path + name), base64Data, mimeType);
        } else {
            await this.imageService.imageUpload((path + name), base64Data);
        }

        plugin.pluginAvatar = name;
        plugin.pluginAvatarPath = path;

        const pluginSave = await this.pluginService.create(plugin);

        return response.status(200).send({
            status: 1,
            message: 'Successfully updated the plugin image',
            data: pluginSave,
        });
    }

    public base64MimeType(encoded: string): string {
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
}
