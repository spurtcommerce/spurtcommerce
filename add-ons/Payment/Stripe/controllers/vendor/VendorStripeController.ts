/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Controller, Res, Body, Req, Post, Authorized } from 'routing-controllers';
import { VendorPlugin } from '../../../../../src/api/core/models/VendorPlugin';
import { getDataSource } from '../../../../../src/loaders/typeormLoader';
@Controller('/vendor-stripe-payment')
export class VendorStripeController {
    constructor(
    ) {
        // ---
    }

    // Update Setting API
    /**
     * @api {post} /api/admin-stripe-payment Update Setting API
     * @apiGroup Setting
     * @apiParam (Request body) {String} postParams postParams
     * @apiParamExample {json} Input
     * {
     *      "clientId" : "",
     *      "clientSecret": "",
     *      "isTest": "",
     *      "paypalAdditionalInfo": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Stripe settings updated successfully.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-stripe-payment
     * @apiErrorExample {json} Update Setting API error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/update-setting')
    @Authorized(['vendor'])
    public async updateSetting(@Body({ validate: true }) postParams: any, @Req() request: any, @Res() response: any): Promise<any> {
        const vendorPluginRepository = getDataSource().getRepository(VendorPlugin);

        const vendorPluginData = await vendorPluginRepository.findOne({
            where: {
                vendorId: request.user.tenantId,
                plugins: {
                    pluginName: 'Stripe',
                },
            },
            relations: ['plugins'],
        });
        if (!vendorPluginData) {
            return response.status(400).send({
                status: 1,
                message: 'You not install this plugin. or problem in installation',
            });
        }

        const paypalAdditionalInfo = vendorPluginData.pluginAdditionalInfo ? JSON.parse(vendorPluginData.pluginAdditionalInfo) : {};
        paypalAdditionalInfo.clientId = postParams.clientId;
        paypalAdditionalInfo.clientSecret = postParams.clientSecret;
        paypalAdditionalInfo.isTest = postParams.isTest;
        vendorPluginData.pluginAdditionalInfo = JSON.stringify(paypalAdditionalInfo);
        const saveResponse = await vendorPluginRepository.save(vendorPluginData);
        if (saveResponse) {
            return response.status(200).send({
                status: 1,
                message: 'Vendor stripe settings updated successfully.',
            });
        }
        const errorResponse: any = {
            status: 1,
            message: 'Unable to update the vendor paypal settings.',
        };
        return response.status(400).send(errorResponse);
    }
}
