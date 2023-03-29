/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, JsonController, Res, Body, Post, Authorized, Put, BodyParam } from 'routing-controllers';
import { SettingService } from '../../core/services/SettingService';
import { Settings } from '../../core/models/Setting';
import { CreateSettingRequest } from './requests/CreateSettingRequest';
import { env } from '../../../env';
import { S3Service } from '../../core/services/S3Service';
import { ImageService } from '../../core/services/ImageService';
import { CurrencyService } from '../../core/services/CurrencyService';

@JsonController('/settings')
export class SettingController {
    constructor(private settingService: SettingService, private s3Service: S3Service, private imageService: ImageService, private currencyService: CurrencyService) {
    }

    // Get Settings list API
    /**
     * @api {get} /api/settings/get-settings Get Setting API
     * @apiGroup Settings
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get settings",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/settings/get-settings
     * @apiErrorExample {json} getSettings error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/get-settings')
    public async settingsList(@Res() response: any): Promise<any> {

        const select = '';
        const relation = [];
        const WhereConditions = [];
        const limit = 1;

        const settings: any = await this.settingService.list(limit, select, relation, WhereConditions);
        const promise = settings.map(async (result: any) => {
            const currencyData: any = await this.currencyService.findOne({ where: { currencyId: result.storeCurrencyId } });
            const temp: any = result;
            if (currencyData) {
                temp.currencyCode = currencyData.code;
                temp.symbolLeft = currencyData.symbolLeft;
                temp.symbolRight = currencyData.symbolRight;
            } else {
                temp.currencyCode = '';
                temp.symbolLeft = '';
                temp.symbolRight = '';
            }
            return temp;
        });
        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get settings',
            data: value,
        };
        return response.status(200).send(successResponse);
    }

    // create and update settings API
    /**
     * @api {post} /api/settings/create-settings Create Settings API
     * @apiGroup Settings
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} url  store url
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription metaTagDescription
     * @apiParam (Request body) {String} metaTagKeywords metaTagKeywords
     * @apiParam (Request body) {String} storeName storeName
     * @apiParam (Request body) {String} storeOwner storeOwner
     * @apiParam (Request body) {String} storeAddress storeAddress
     * @apiParam (Request body) {Number} countryId countryId
     * @apiParam (Request body) {String} zoneId zoneId
     * @apiParam (Request body) {String} storeEmail storeEmail
     * @apiParam (Request body) {String} storeTelephone storeTelephone
     * @apiParam (Request body) {String} storeFax storeFax
     * @apiParam (Request body) {String} storeLogo storeLogo
     * @apiParam (Request body) {String} emailLogo emailLogo
     * @apiParam (Request body) {String} invoiceLogo invoiceLogo
     * @apiParam (Request body) {Number} maintenanceMode maintenanceMode
     * @apiParam (Request body) {String} storeLanguageName storeLanguageName
     * @apiParam (Request body) {Number} storeCurrencyId storeCurrencyId
     * @apiParam (Request body) {String} storeImage storeImage
     * @apiParam (Request body) {String} invoicePrefix invoicePrefix
     * @apiParam (Request body) {Number} orderStatus orderStatus
     * @apiParam (Request body) {Number} categoryProductCount productCount should be 0 or 1
     * @apiParam (Request body) {Number} itemsPerPage ItemsPerPage
     * @apiParam (Request body) {String} facebook facebook
     * @apiParam (Request body) {String} twitter twitter
     * @apiParam (Request body) {String} instagram instagram
     * @apiParam (Request body) {String} google google
     * @apiParam (Request body) {Number} status status
     * @apiParamExample {json} Input
     * {
     *      "url" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagKeywords" : "",
     *      "storeName" : "",
     *      "storeOwner" : "",
     *      "storeAddress" : "",
     *      "countryId" : "",
     *      "zoneId" : "",
     *      "storeEmail" : "",
     *      "storeTelephone" : "",
     *      "storeFax" : "",
     *      "storeLogo" : "",
     *      "invoiceLogo" : "",
     *      "emailLogo" : "",
     *      "maintenanceMode" : "",
     *      "storeLanguageName" : "",
     *      "storeCurrencyId" : "",
     *      "storeImage" : "",
     *      "invoicePrefix" : "",
     *      "orderStatus" : "",
     *      "categoryProductCount" : "",
     *      "itemsPerPage" : "",
     *      "google" : "",
     *      "instagram" : "",
     *      "facebook" : "",
     *      "twitter" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created setting.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/settings/create-settings
     * @apiErrorExample {json} addSettings error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/create-settings')
    @Authorized(['admin', 'edit-general-settings'])
    public async createSettings(@Body({ validate: true }) settings: CreateSettingRequest, @Res() response: any): Promise<any> {
        const settingValue: any = await this.settingService.findOne();
        if (settingValue === undefined) {
            const newSettings: any = new Settings();
            newSettings.url = settings.url;
            newSettings.metaTagTitle = settings.metaTagTitle;
            newSettings.metaTagDescription = settings.metaTagDescription;
            newSettings.metaTagKeyword = settings.metaTagKeywords;
            newSettings.storeName = settings.storeName;
            newSettings.storeOwner = settings.storeOwner;
            newSettings.storeAddress = settings.storeAddress;
            newSettings.countryId = settings.countryId;
            newSettings.zoneId = settings.zoneId;
            newSettings.storeEmail = settings.storeEmail;
            newSettings.storeTelephone = settings.storeTelephone;
            newSettings.storeFax = settings.storeFax;
            if (settings.storeLogo) {
                const logo = settings.storeLogo;
                const type = logo.split(';')[0].split('/')[1];
                const availableTypes = env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse: any = {
                        status: 0,
                        message: 'Only ' + env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const name = 'Img_' + Date.now() + '.' + type;
                const path = 'storeLogo/';
                const base64Data = new Buffer(logo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const stringLength = logo.replace(/^data:image\/\w+;base64,/, '').length;
                const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
                const sizeInKb = sizeInBytes / 1024;
                console.log(sizeInKb + 'kbbbb');
                if (+sizeInKb <= 2048) {
                    if (env.imageserver === 's3') {
                        await this.s3Service.imageUpload((path + name), base64Data, type);
                    } else {
                        await this.imageService.imageUpload((path + name), base64Data);
                    }
                } else {
                    const errorResponse: any = {
                        status: 0,
                        message: 'File size is too large, give less than 2 mb. ',
                    };
                    return response.status(400).send(errorResponse);
                }
                newSettings.storeLogo = name;
                newSettings.storeLogoPath = path;
            }
            if (settings.emailLogo) {
                const emaillogo = settings.emailLogo;
                const type = emaillogo.split(';')[0].split('/')[1];
                const availableTypes = env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse: any = {
                        status: 0,
                        message: 'Only ' + env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const emailLogoName = 'EmailLogo_' + Date.now() + '.' + type;
                const emailLogoPath = 'storeLogo/';
                const base64Data = new Buffer(emaillogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const stringLength = emailLogoPath.replace(/^data:image\/\w+;base64,/, '').length;
                const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
                const sizeInKb = sizeInBytes / 1024;
                console.log(sizeInKb + 'kbbbb');
                if (+sizeInKb <= 2048) {
                    if (env.imageserver === 's3') {
                        await this.s3Service.imageUpload((emailLogoPath + emailLogoName), base64Data, type);
                    } else {
                        await this.imageService.imageUpload((emailLogoPath + emailLogoName), base64Data);
                    }
                } else {
                    const errorResponse: any = {
                        status: 0,
                        message: 'File size is too large, give less than 2 mb. ',
                    };
                    return response.status(400).send(errorResponse);
                }
                newSettings.emailLogo = emailLogoName;
                newSettings.emailLogoPath = emailLogoPath;
            }
            if (settings.invoiceLogo) {
                const invoiceLogo = settings.invoiceLogo;
                const type = invoiceLogo.split(';')[0].split('/')[1];
                const availableTypes = env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse: any = {
                        status: 0,
                        message: 'Only ' + env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const InvoiceLogoName = 'InvoiceLogo_' + Date.now() + '.' + type;
                const InvoiceLogoPath = 'storeLogo/';
                const base64Data = new Buffer(invoiceLogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const stringLength = invoiceLogo.replace(/^data:image\/\w+;base64,/, '').length;
                const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
                const sizeInKb = sizeInBytes / 1024;
                console.log(sizeInKb + 'kbbbb');
                if (+sizeInKb <= 2048) {
                    if (env.imageserver === 's3') {
                        await this.s3Service.imageUpload((InvoiceLogoPath + InvoiceLogoName), base64Data, type);
                    } else {
                        await this.imageService.imageUpload((InvoiceLogoPath + InvoiceLogoName), base64Data);
                    }
                } else {
                    const errorResponse: any = {
                        status: 0,
                        message: 'File size is too large, give less than 2 mb. ',
                    };
                    return response.status(400).send(errorResponse);
                }
                newSettings.invoiceLogo = InvoiceLogoName;
                newSettings.invoiceLogoPath = InvoiceLogoPath;
            }
            newSettings.maintenanceMode = settings.maintenanceMode;
            newSettings.storeLanguageName = settings.storeLanguageName;
            newSettings.storeCurrencyId = settings.storeCurrencyId;
            newSettings.storeImage = settings.storeImage;
            settingValue.invoicePrefix = settings.invoicePrefix;
            settingValue.orderStatus = settings.orderStatus;
            settingValue.categoryProductCount = settings.categoryProductCount;
            settingValue.itemsPerPage = settings.itemsPerPage;
            newSettings.google = settings.google;
            newSettings.facebook = settings.facebook;
            newSettings.twitter = settings.twitter;
            newSettings.instagram = settings.instagram;
            newSettings.isActive = settings.status;
            const createdData: any = await this.settingService.create(newSettings);
            const successResponse: any = {
                status: 1,
                message: 'Settings created Successfully.',
                data: createdData,

            };
            return response.status(200).send(successResponse);
        } else {
            settingValue.url = settings.url;
            settingValue.metaTagTitle = settings.metaTagTitle;
            settingValue.metaTagDescription = settings.metaTagDescription;
            settingValue.metaTagKeyword = settings.metaTagKeywords;
            settingValue.storeName = settings.storeName;
            settingValue.storeOwner = settings.storeOwner;
            settingValue.storeAddress = settings.storeAddress;
            settingValue.countryId = settings.countryId;
            settingValue.zoneId = settings.zoneId;
            settingValue.storeEmail = settings.storeEmail;
            settingValue.storeTelephone = settings.storeTelephone;
            settingValue.storeFax = settings.storeFax;
            settingValue.storeLogo = settings.storeLogo;
            if (settings.storeLogo) {
                const logo = settings.storeLogo;
                const type = logo.split(';')[0].split('/')[1];
                const availableTypes = env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse: any = {
                        status: 0,
                        message: 'Only ' + env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const name = 'Img_' + Date.now() + '.' + type;
                const path = 'storeLogo/';
                const base64Data = new Buffer(logo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const stringLength = logo.replace(/^data:image\/\w+;base64,/, '').length;
                const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
                const sizeInKb = sizeInBytes / 1024;
                console.log(sizeInKb + 'kbbbb');
                if (+sizeInKb <= 2048) {
                    if (env.imageserver === 's3') {
                        await this.s3Service.imageUpload((path + name), base64Data, type);
                    } else {
                        await this.imageService.imageUpload((path + name), base64Data);
                    }
                } else {
                    const errorResponse: any = {
                        status: 0,
                        message: 'File size is too large, give less than 2 mb. ',
                    };
                    return response.status(400).send(errorResponse);
                }
                settingValue.storeLogo = name;
                settingValue.storeLogoPath = path;
            }
            if (settings.emailLogo) {
                const emaillogo = settings.emailLogo;
                const type = emaillogo.split(';')[0].split('/')[1];
                const availableTypes = env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse: any = {
                        status: 0,
                        message: 'Only ' + env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const emailLogoName = 'EmailLogo_' + Date.now() + '.' + type;
                const emailLogoPath = 'storeLogo/';
                const base64Data = new Buffer(emaillogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const stringLength = emaillogo.replace(/^data:image\/\w+;base64,/, '').length;
                const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
                const sizeInKb = sizeInBytes / 1024;
                console.log(sizeInKb + 'kbbbb');
                if (+sizeInKb <= 2048) {
                    if (env.imageserver === 's3') {
                        await this.s3Service.imageUpload((emailLogoPath + emailLogoName), base64Data, type);
                    } else {
                        await this.imageService.imageUpload((emailLogoPath + emailLogoName), base64Data);
                    }
                } else {
                    const errorResponse: any = {
                        status: 0,
                        message: 'File size is too large, give less than 2 mb. ',
                    };
                    return response.status(400).send(errorResponse);
                }
                settingValue.emailLogo = emailLogoName;
                settingValue.emailLogoPath = emailLogoPath;
            }
            if (settings.invoiceLogo) {
                const invoiceLogo = settings.invoiceLogo;
                const extType = invoiceLogo.split(';')[0].split('/')[1];
                const InvoiceLogoName = 'InvoiceLogo_' + Date.now() + '.' + extType;
                const InvoiceLogoPath = 'storeLogo/';
                const base64Data = new Buffer(invoiceLogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const stringLength = invoiceLogo.replace(/^data:image\/\w+;base64,/, '').length;
                const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
                const sizeInKb = sizeInBytes / 1024;
                console.log(sizeInKb + 'kbbbb');
                if (+sizeInKb <= 2048) {
                    if (env.imageserver === 's3') {
                        await this.s3Service.imageUpload((InvoiceLogoPath + InvoiceLogoName), base64Data, extType);
                    } else {
                        await this.imageService.imageUpload((InvoiceLogoPath + InvoiceLogoName), base64Data);
                    }
                } else {
                    const errorResponse: any = {
                        status: 0,
                        message: 'File size is too large, give less than 2 mb. ',
                    };
                    return response.status(400).send(errorResponse);
                }
                settingValue.invoiceLogo = InvoiceLogoName;
                settingValue.invoiceLogoPath = InvoiceLogoPath;
            }
            settingValue.maintenanceMode = settings.maintenanceMode;
            settingValue.storeLanguageName = settings.storeLanguageName;
            settingValue.storeCurrencyId = settings.storeCurrencyId;
            settingValue.storeImage = settings.storeImage;
            settingValue.invoicePrefix = settings.invoicePrefix;
            settingValue.orderStatus = settings.orderStatus;
            settingValue.categoryProductCount = settings.categoryProductCount;
            settingValue.itemsPerPage = settings.itemsPerPage;
            settingValue.google = settings.google;
            settingValue.facebook = settings.facebook;
            settingValue.twitter = settings.twitter;
            settingValue.instagram = settings.instagram;
            settingValue.isActive = settings.status;
            const updatedData: any = await this.settingService.create(settingValue);
            const successResponse: any = {
                status: 1,
                message: 'Settings Updated Successfully.',
                data: updatedData,

            };
            return response.status(200).send(successResponse);
        }
    }

    // update main API
    /**
     * @api {put} /api/settings/update-maintainancemode Update maintainance mode API
     * @apiGroup Settings
     * @apiParam (Request body) {number} mode mode should be 0 or 1
     * @apiParamExample {json} Input
     * {
     *      "mode" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated maintainance mode.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/settings/update-maintainancemode
     * @apiErrorExample {json} isFeature error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-maintainancemode')
    @Authorized()
    public async updateFeatureProduct(@BodyParam('mode') mode: number, @Res() response: any): Promise<any> {

        const setting = await this.settingService.findOne();
        if (!setting) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        setting.maintenanceMode = mode ? mode : 0;
        const settingSave = await this.settingService.create(setting);
        if (settingSave) {
            const successResponse: any = {
                status: 1,
                message: 'maintainance mode updated successfully.',
                data: settingSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to updated product',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
