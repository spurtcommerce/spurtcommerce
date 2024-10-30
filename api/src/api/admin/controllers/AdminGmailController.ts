/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import {
    // Get,
    Controller,
    Res,
    Body,
    Req,
    Post,
} from 'routing-controllers';
import { getManager } from 'typeorm';
import { Plugins } from '../../../../src/api/core/models/Plugin';

@Controller('/admin-gmail')
export class AdminGmailController {
    constructor(
    ) {
        // ---
    }

    /**
     * @api {post} /api/admin-gmail/update-setting Update Gmail Credential API
     * @apiGroup Oauth
     * @apiParam (Request body) {String{..255}} clientId clientId
     * @apiParam (Request body) {String{..255}} clientSecret clientSecret
     * @apiParam (Request body) {boolean} isTest isTest
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/admin-gmail/update-setting
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal Server Error
     */

    @Post('/update-setting')
    public async updateSetting(@Body({ validate: true }) postParams: any, @Req() request: any, @Res() response: any): Promise<any> {
        const pluginRepository = getManager().getRepository(Plugins);
        const pluginDetail = await pluginRepository.findOne({
            where: {
                pluginName: 'Gmail',
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
        const saveResponse = await pluginRepository.save(pluginDetail);
        if (saveResponse) {
            return response.status(200).send({
                status: 1,
                message: 'Gmail settings updated successfully',
            });
        }
        const errorResponse: any = {
            status: 1,
            message: 'Unable to update the gmail settings',
        };
        return response.status(400).send(errorResponse);
    }
}
