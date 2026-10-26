/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Controller, Res, Body, Req, Post } from 'routing-controllers';
import { getDataSource } from '../../../../../src/loaders/typeormLoader';
import { Plugins } from '../../../../../src/api/core/models/Plugin';
import { Service } from 'typedi';

@Service()
@Controller('/paypal-payment')
export class AdminPayPalController {
    constructor(
    ) {
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
    @Post()
    public async updateSetting(@Body({ validate: true }) postParams: any, @Req() request: any, @Res() response: any): Promise<any> {
        const pluginRepository = getDataSource().getRepository(Plugins);
        const pluginDetail = await pluginRepository.findOne({
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
        const saveResponse = await pluginRepository.save(pluginDetail);
        if (saveResponse) {
            return response.status(200).send({
                status: 1,
                message: 'Paypal settings updated successfully',
            });
        }
        const errorResponse: any = {
            status: 1,
            message: 'Unable to update the paypal settings',
        };
        return response.status(400).send(errorResponse);
    }
}
