/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    JsonController,
    Res,
    Body,
    Req,
    Post,
} from 'routing-controllers';
import { PluginService } from '../../core/services/PluginService';

@JsonController('/admin-gmap')
export class AdminGmapController {
    constructor(
        private pluginService: PluginService
    ) {}

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
    @Post('/update-setting')
    public async updateSetting(@Body({ validate: true }) postParams: any, @Req() request: any, @Res() response: any): Promise<any> {
        const pluginDetail = await this.pluginService.findOne({
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
        const saveResponse = await this.pluginService.create(pluginDetail);
        if (saveResponse) {
            return response.status(200).send({
                status: 1,
                message: 'Gmap settings updated successfully',
            });
        }
        const errorResponse: any = {
            status: 1,
            message: 'Unable to update the Gmap settings',
        };
        return response.status(400).send(errorResponse);
    }
}
