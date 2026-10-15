/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, JsonController, Authorized, QueryParam, Res, Param, Put, Body, Req } from 'routing-controllers';
import { instanceToPlain } from 'class-transformer';
import { UpdatePluginStatus } from './requests/UpdatePluginStatus';
import { VendorPluginService } from '../../core/services/VendorPluginService';
import { env } from '../../../../src/env';
import { S3Service } from '../../core/services/S3Service';
import { ImageService } from '../../core/services/ImageService';
import { VendorPlugin } from '../../core/models/VendorPlugin';
import { Service } from 'typedi';
import { In, Not } from 'typeorm';

@Service()
@JsonController('/vendor-plugins')
export class VendorPluginController {
    constructor(
        private vendorPluginService: VendorPluginService,
        private s3Service: S3Service,
        private imageService: ImageService

    ) {
        // --
    }

    /**
     * @api {get} /api/vendor-plugins List Vendor Plugins
     * @apiGroup Vendor Plugin
     * @apiName VendorPluginList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {String} [module] Filter plugins by module
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got the plugin list",
     *         "data": [
     *             {
     *                 "id": 1,
     *                 "pluginName": "PayPal",
     *                 "pluginType": "Payment",
     *                 "slugName": "paypal",
     *                 "isActive": 1
     *             }
     *         ]
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Internal Server Error"
     *     }
     *
     * @apiSampleRequest /api/vendor-plugins
     */
    @Get()
    @Authorized(['vendor', 'add-on'])
    public async pluginList(@QueryParam('module') module: string, @Res() response: any, @Req() request: any): Promise<any> {
        // const plugins = await this.pluginService.findAll({ where: { pluginStatus: 1 } });
        const pluginList = await this.vendorPluginService.find({
            where: {
                vendorId: request.user.tenantId,
                // pluginId: In(plugins.map((plugin => plugin.id))),
                plugins: {
                    slugName: Not(In(['shopping-cart', 'rfq-quotes'])),
                    pluginStatus: 1,
                },
            },
            relations: ['plugins'],
        });

        const result = pluginList.map(data => {
            if (data.plugins.pluginName === 'ProductAttribute') {
                data.plugins.pluginName = 'ProductAttributes';
                data.plugins.slugName = 'product-attributes';
            }
            return {
                createdDate: data.createdDate,
                id: data.id,
                isActive: data.isActive,
                vendorId: data.vendorId,
                pluginAdditionalInfo: data.pluginAdditionalInfo,
                pluginName: data.plugins.pluginName,
                pluginAvatar: data.plugins.pluginAvatar,
                pluginAvatarPath: data.plugins.pluginAvatarPath,
                pluginType: data.plugins.pluginType,
                pluginFormInfo: data.plugins.pluginFormInfo,
                pluginTimestamp: data.plugins.pluginTimestamp,
                slugName: data.plugins.slugName,
                isEditable: data.plugins.isEditable,
                displayName: data.plugins.displayName,
                description: data.plugins.description,
                imageUrl: env.baseUrl + '/media/plugin?path=' + data.plugins.pluginAvatarPath + '&name=' + data.plugins.pluginAvatar + '&width=100&height=100',
            };
        });

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the plugin list',
            data: instanceToPlain(result),
        };
        return response.status(200).send(successResponse);
    }

    /**
     * @api {put} /api/vendor-plugins/additional-info/:id Update Plugin Additional Info
     * @apiGroup Vendor Plugin
     * @apiName UpdateVendorPluginAdditionalInfo
     *
     * @apiParam (Path) {Number} id Vendor Plugin ID
     *
     * @apiBody {Object} payload Plugin additional info configuration object
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully updated plugin.",
     *         "data": {
     *             "id": 1,
     *             "pluginAdditionalInfo": "{}"
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Plugin:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid plugin ID"
     *     }
     *
     * @apiSampleRequest /api/vendor-plugins/additional-info/:id
     */
    @Put('/additional-info/:id')
    public async updatePlugin(@Param('id') id: number, @Body({ validate: true }) payload: any, @Res() response: any): Promise<any> {

        const vendorPlugin: VendorPlugin = await this.vendorPluginService.findOne({
            where: {
                id,
            },
        });

        if (!vendorPlugin) {
            return response.status(400).send({
                status: 0,
                message: `Invalid plugin ID`,
            });
        }

        vendorPlugin.pluginAdditionalInfo = payload.pluginAdditionalInfo ? JSON.stringify(payload.pluginAdditionalInfo) : vendorPlugin.pluginAdditionalInfo;

        const vendorPluginSave = await this.vendorPluginService.save(vendorPlugin);

        return response.status(200).send({
            status: 1,
            message: 'Successfully updated plugin.',
            data: vendorPluginSave,
        });

    }

    /**
     * @api {get} /api/vendor-plugins/:id Get Vendor Plugin Detail
     * @apiGroup Vendor Plugin
     * @apiName GetVendorPluginDetail
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id Vendor Plugin ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got the plugin detail.",
     *         "data": {
     *             "id": 1,
     *             "pluginAdditionalInfo": "{}",
     *             "plugins": {}
     *         }
     *     }
     *
     * @apiErrorExample {json} Plugin-Not-Found:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Invalid Plugin ID"
     *     }
     *
     * @apiSampleRequest /api/vendor-plugins/:id
     */
    @Get('/:id')
    @Authorized(['vendor', 'add-on'])
    public async pluginDetail(@Param('id') vendorPluginId: number, @Res() response: any): Promise<any> {

        const vendorPluginDetail = await this.vendorPluginService.findOne({
            where: {
                id: vendorPluginId,
            },
            relations: ['plugins'],
        });

        if (!vendorPluginDetail) {
            return response.status(200).send({
                status: 1,
                message: 'Invalid Plugin ID',
            });
        }

        const pluginFormData = vendorPluginDetail.pluginFormInfo ? JSON.parse(vendorPluginDetail.pluginFormInfo) : undefined;
        const paypalAdditionalInfo = vendorPluginDetail.pluginAdditionalInfo ? JSON.parse(vendorPluginDetail.pluginAdditionalInfo) : {};

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
            message: 'Successfully got the plugin detail.',
            data: pluginFormData ? pluginFormData : vendorPluginDetail,
        };
        return response.status(200).send(successResponse);
    }

    /**
     * @api {put} /api/vendor-plugins/logo/:id Update Vendor Plugin Logo
     * @apiGroup Vendor Plugin
     * @apiName UpdateVendorPluginLogo
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id Vendor Plugin ID
     *
     * @apiBody {String} image Base64 encoded plugin logo image
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully updated the plugin image",
     *         "data": {
     *             "id": 1,
     *             "pluginAvatar": "Img_1680000000.png",
     *             "pluginAvatarPath": "logo/"
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Plugin:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid Plugin ID"
     *     }
     *
     * @apiSampleRequest /api/vendor-plugins/logo/:id
     */
    @Put('/logo/:id')
    @Authorized(['vendor'])
    public async updatePluginLogo(@Param('id') pluginId: number, @Body({ validate: true }) updateParam: { image: string }, @Req() request: any, @Res() response: any): Promise<any> {

        const vendorPluginData = await this.vendorPluginService.findOne({
            where: {
                id: pluginId,
                vendorId: request.user.tenantId,
            },
        });
        if (!vendorPluginData) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid Plugin ID',
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

        vendorPluginData.pluginAvatar = name;
        vendorPluginData.pluginAvatarPath = path;

        const pluginSave = await this.vendorPluginService.save(vendorPluginData);

        return response.status(200).send({
            status: 1,
            message: 'Successfully updated the plugin image',
            data: pluginSave,
        });
    }

    /**
     * @api {put} /api/vendor-plugins/:id Update Vendor Plugin Status
     * @apiGroup Vendor Plugin
     * @apiName UpdateVendorPluginStatus
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id Vendor Plugin ID
     *
     * @apiBody {Number} isActive Plugin active status (1: Active, 0: Inactive)
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Plugin updated successfully.",
     *         "data": {
     *             "id": 1,
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Plugin:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid Plugin ID"
     *     }
     *
     * @apiSampleRequest /api/vendor-plugins/:id
     */
    @Put('/:id')
    @Authorized(['vendor'])
    public async updatePluginStatus(@Param('id') vendorPluginId: number, @Body({ validate: false }) updateParam: UpdatePluginStatus, @Res() response: any): Promise<any> {
        const vendorPlugin: VendorPlugin = await this.vendorPluginService.findOne({
            where: {
                id: vendorPluginId,
            },
        });

        if (!vendorPlugin) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid Plugin ID',
            });
        }

        // vendorPlugin.pluginAdditionalInfo = updateParam.pluginAdditionalInfo ? JSON.stringify(updateParam.pluginAdditionalInfo) : vendorPlugin.pluginAdditionalInfo;
        vendorPlugin.isActive = updateParam.isActive;
        const pluginSave = await this.vendorPluginService.save(vendorPlugin);

        return response.status(200).send({
            status: 1,
            message: 'Plugin updated successfully.',
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
