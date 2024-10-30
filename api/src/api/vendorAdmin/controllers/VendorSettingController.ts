/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Post,
    Body,
    JsonController,
    Res,
    Get,
} from 'routing-controllers';
import { VendorGlobalSettingService } from '../../core/services/VendorSettingService';
import { VendorGlobalSetting } from '../../core/models/VendorGlobalSettings';
import { CreateVendorSettingRequest } from './requests/CreateVendorSettingRequest';

@JsonController('/vendor-setting')
export class VendorAdminSettingController {
    constructor(private vendorGlobalSettingService: VendorGlobalSettingService
    ) {
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
    @Post('/create-vendor-settings')
    public async createSettings(@Body({ validate: true }) settings: CreateVendorSettingRequest, @Res() response: any): Promise<any> {
        const settingValue: any = await this.vendorGlobalSettingService.findOne();
        if (settingValue === undefined) {
            const newSettings = new VendorGlobalSetting();
            newSettings.defaultCommission = settings.defaultCommission;
            const createdData: any = await this.vendorGlobalSettingService.create(newSettings);
            const successResponse: any = {
                status: 1,
                message: 'Settings created Successfully',
                data: createdData,

            };
            return response.status(200).send(successResponse);
        } else {
            settingValue.defaultCommission = settings.defaultCommission;
            const updatedData: any = await this.vendorGlobalSettingService.create(settingValue);
            const successResponse: any = {
                status: 1,
                message: 'Settings Updated Successfully',
                data: updatedData,

            };
            return response.status(200).send(successResponse);
        }
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
    @Get('/get-vendor-settings')
    public async settingsList(@Res() response: any): Promise<any> {
        const settingValue: any = await this.vendorGlobalSettingService.findOne();
        if (settingValue === undefined) {
            const successresponse: any = {
                status: 1,
                message: 'data is empty',
            };
            return response.status(200).send(successresponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got seller settings',
            data: {
                defaultCommission: settingValue.defaultCommission,
            },
        };
        return response.status(200).send(successResponse);
    }

}
