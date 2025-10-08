/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Response } from 'express';
import { Get, JsonController, Res, Body, Post, Authorized, Put, BodyParam, Param, Req, QueryParam, Delete } from 'routing-controllers';
import { SettingService } from '../../core/services/SettingService';
import { Settings } from '../../core/models/Setting';
import { CreateSettingRequest } from './requests/CreateSettingRequest';
import { env } from '../../../env';
import { S3Service } from '../../core/services/S3Service';
import { ImageService } from '../../core/services/ImageService';
import { CurrencyService } from '../../core/services/CurrencyService';
import { Currency } from 'src/common/entities-index';
import { v4 as uuidv4 } from 'uuid';
import { Not } from 'typeorm';
import { OrderCancelReasonService } from '../../core/services/OrderCancelReasonService';
import { OrderCancelReason } from '../../core/models/OrderCancelReason';
import { OrderCancelReasonRequest } from './requests/OrderCancelReasonRequest';
import { Service } from 'typedi';
interface SettingsView extends Omit<Settings, 'createDetails' | 'updateDetails'> {
    currencyCode: string;
    symbolLeft: string;
    symbolRight: string;
    countryIds: string[];
}

interface MainSettingsView {
    id: number;
    storeName: string;
    storeUrl: string;
    isActive: number;
    maintenance: number;
}

export interface ApiResponse<T> {
    status: number;
    message: string;
    data?: T;
}
@Service()
@JsonController('/settings')
export class SettingController {
    constructor(
        private settingService: SettingService,
        private s3Service: S3Service,
        private imageService: ImageService,
        private currencyService: CurrencyService,
        private orderCancelReasonService: OrderCancelReasonService
        // private categoryService: CategoryService
    ) {
        // --
    }

    // Get Settings list API
    /**
     * @api {get} /api/settings Get Setting API
     * @apiGroup Settings
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get settings",
     *      "data":"[{
     *                "id": "",
     *                "storeName": "",
     *                "storeUrl": "",
     *                "isActive": "",
     *                "maintenance": "",
     *                "storeDescription": "",
     *                "pendingStatus": ""
     *              }]"
     * }
     * @apiSampleRequest /api/settings
     * @apiErrorExample {json} getSettings error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/')
    // @Authorized('admin')
    public async settingsList(@Res() response: Response, @QueryParam('defaultWebsite') defaultWebsite: number): Promise<Response> {
        if (defaultWebsite) {
            const select = '';
            const relation = [];
            const WhereConditions = [{ name: 'defaultWebsite', value: defaultWebsite, op: 'where' }];
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
                temp.kycMandate = env.kycMandate;
                return temp;
            });
            const value = await Promise.all(promise);
            return response.status(200).send({ status: 1, message: 'Successfully got settings', data: value });
        }
        const settingsList: Settings[] = await this.settingService.findAll();
        const successResponse: ApiResponse<MainSettingsView[]> = {
            status: 1,
            message: 'Successfully got settings',
            data: settingsList.map((settings) => ({
                id: settings.settingsId,
                storeName: settings.siteName,
                storeUrl: settings.siteUrl,
                isActive: settings.isActive,
                maintenance: settings.maintenanceMode,
                storeDescription: settings.storeDescription,
                pendingStatus: settings.pendingStatus,
            })),
        };
        return response.status(200).send(successResponse);
    }

    // Get Store Setting API
    /**
     * @api {get} /api/settings/store-setting Get Setting API
     * @apiGroup Settings
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get settings",
     *      "data":"{
     *       "id": "",
     *       "currencyCode": "",
     *       "symbolLeft": "",
     *       "symbolRight": "",
     *       }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/settings/store-setting
     * @apiErrorExample {json} getSettings error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/store-setting')
    // @Authorized('admin')
    public async settingsListSpecific(@Res() response: Response, @Req() request: any): Promise<Response> {
        const settings = await this.settingService.findOne({
            where: {
                accessKey: request.get('key'),
            },
        });
        const currencyData: any = await this.currencyService.findOne({ where: { currencyId: settings.storeCurrencyId } });
        const temp: any = {};
        if (currencyData) {
            temp.currencyCode = currencyData.code;
            temp.symbolLeft = currencyData.symbolLeft;
            temp.symbolRight = currencyData.symbolRight;
        } else {
            temp.currencyCode = '';
            temp.symbolLeft = '';
            temp.symbolRight = '';
        }

        return response.status(200).send({ status: 1, message: 'Successfully got settings', data: [{ ...settings, ...temp }] });

    }
    //  Settings API
    /**
     * @api {get} /api/settings/:id Get Setting API
     * @apiGroup Settings
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *    "settingsId": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get settings",
     *     "data": {
     *        "currencyCode": "",
     *        "symbolLeft": "",
     *        "symbolRight": "",
     *        "createdBy": "",
     *        "createdDate": "",
     *        "modifiedBy": "",
     *        "modifiedDate": "",
     *        "settingsId": "",
     *        "siteUrl": "",
     *        "metaTagTitle": "",
     *        "metaTagDescription": "",
     *        "metaTagKeyword": "",
     *        "siteName": "",
     *        "businessName": "",
     *        "storeOwner": "",
     *        "storeDescription": "",
     *        "accessKey": "",
     *        "siteCategory": "",
     *        "storeAddress1": "",
     *        "storeAddress2": "",
     *        "storeCity": "",
     *        "storePostalCode": "",
     *        "countryId": "",
     *        "zoneId": "",
     *        "orderStatus": "",
     *        "storeEmail": "",
     *        "storeTelephone": "",
     *        "storeFax": "",
     *        "storeLogo": "",
     *        "storeLogoPath": "",
     *        "emailLogo": "",
     *        "emailLogoPath": "",
     *        "invoiceLogo": "",
     *        "invoiceLogoPath": "",
     *        "maintenanceMode": "",
     *        "storeLanguageName": "",
     *        "storeSecondaryLanguageName": "",
     *        "storeCurrencyId": "",
     *        "currencySymbol": "",
     *        "currencyFormat": "",
     *        "storeImage": "",
     *        "storeImagePath": "",
     *        "dateFormat": "",
     *        "timeFormat": "",
     *        "defaultCountry": "",
     *        "country": "",
     *        "facebook": "",
     *        "google": "",
     *        "instagram": "",
     *        "invoicePrefix": "",
     *        "categoryProductCount": "",
     *        "itemsPerPage": "",
     *        "isActive": "",
     *        "addons": "{ }",
     *        "pendingStatus": "",
     *        "defaultWebsite": "",
     *        "countryIds": [""]
     *       }
     * }
     * @apiSampleRequest /api/settings/:id
     * @apiErrorExample {json} getSettings error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/:id')
    @Authorized('admin')
    public async settingsDetail(@Param('id') settingsId: number, @Res() response: Response): Promise<Response> {

        const settings: Settings = await this.settingService.findOne({
            where: {
                settingsId,
            },
        });

        if (!settings) {
            return response.status(400).send({
                status: 0,
                message: `Invalid Setting Id`,
            });
        }
        const currencyData: Currency = await this.currencyService.findOne({ where: { currencyId: settings.storeCurrencyId } });
        const settingsDetail: SettingsView = {
            currencyCode: currencyData.code,
            symbolLeft: currencyData.symbolLeft,
            symbolRight: currencyData.symbolRight,
            ...settings,
            countryIds: settings.country.split(','),
        };
        const successResponse: ApiResponse<SettingsView> = {
            status: 1,
            message: 'Successfully get settings',
            data: settingsDetail,
        };
        return response.status(200).send(successResponse);
    }

    // create and update settings API
    /**
     * @api {post} /api/settings Create Settings API
     * @apiGroup Settings
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} siteUrl  store siteurl
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
     * @apiParam (Request body) {String} timeZone time zone
     * @apiParamExample {json} Input
     * {
     *      "siteUrl" : "",
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
     *      "timeZone": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created setting.",
     *      "status": "1",
     *      "data": {
     *        "currencyCode": "",
     *        "symbolLeft": "",
     *        "symbolRight": "",
     *        "createdBy": "",
     *        "createdDate": "",
     *        "modifiedBy": "",
     *        "modifiedDate": "",
     *        "settingsId": "",
     *        "siteUrl": "",
     *        "metaTagTitle": "",
     *        "metaTagDescription": "",
     *        "metaTagKeyword": "",
     *        "siteName": "",
     *        "businessName": "",
     *        "storeOwner": "",
     *        "storeDescription": "",
     *        "accessKey": "",
     *        "siteCategory": "",
     *        "storeAddress1": "",
     *        "storeAddress2": "",
     *        "storeCity": "",
     *        "storePostalCode": "",
     *        "countryId": "",
     *        "zoneId": "",
     *        "orderStatus": "",
     *        "storeEmail": "",
     *        "storeTelephone": "",
     *        "storeFax": "",
     *        "storeLogo": "",
     *        "storeLogoPath": "",
     *        "emailLogo": "",
     *        "emailLogoPath": "",
     *        "invoiceLogo": "",
     *        "invoiceLogoPath": "",
     *        "maintenanceMode": "",
     *        "storeLanguageName": "",
     *        "storeSecondaryLanguageName": "",
     *        "storeCurrencyId": "",
     *        "currencySymbol": "",
     *        "currencyFormat": "",
     *        "storeImage": "",
     *        "storeImagePath": "",
     *        "dateFormat": "",
     *        "timeFormat": "",
     *        "defaultCountry": "",
     *        "country": "",
     *        "facebook": "",
     *        "google": "",
     *        "instagram": "",
     *        "invoicePrefix": "",
     *        "categoryProductCount": "",
     *        "itemsPerPage": "",
     *        "isActive": "",
     *        "addons": "{ }",
     *        "pendingStatus": "",
     *        "defaultWebsite": "",
     *        "countryIds": [
     *                   ""
     *           ]
     *        "timeZone": "",
     *       }
     * }
     * @apiSampleRequest /api/settings
     * @apiErrorExample {json} addSettings error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/')
    @Authorized(['admin', 'edit-general-settings'])
    public async createSettings(@Body({ validate: true }) settings: CreateSettingRequest, @Res() response: Response, @Req() request: any): Promise<Response> {

        const settingValue: Settings = await this.settingService.findOne({
            where: {
                settingsId: settings.settingId,
            },
        });

        if (!settingValue) {

            const duplicateSiteExist = await this.settingService.findOne({
                where: {
                    siteUrl: settings.siteUrl.trim(),
                },
            });
            if (duplicateSiteExist) {
                return response.status(400).send({
                    status: 0,
                    message: `Url already exists`,
                });
            }

            const newSettings: Settings = new Settings();
            newSettings.siteUrl = settings.siteUrl;
            newSettings.businessName = settings.businessName;
            newSettings.metaTagTitle = settings.metaTagTitle;
            newSettings.metaTagDescription = settings.metaTagDescription;
            newSettings.metaTagKeyword = settings.metaTagKeywords;
            newSettings.siteName = settings.siteName;
            newSettings.storeOwner = settings.storeOwner;
            newSettings.storeAddress1 = settings.storeAddress1;
            newSettings.storeAddress2 = settings.storeAddress2;
            newSettings.storeDescription = settings.storeDescription;
            newSettings.countryId = settings.countryId;
            newSettings.zoneId = settings.zoneId;
            newSettings.storeEmail = settings.storeEmail;
            newSettings.storeTelephone = settings.storeTelephone;
            newSettings.storeFax = settings.storeFax;
            newSettings.storeCity = settings.storeCity;
            newSettings.storePostalCode = settings.storePostalCode;
            newSettings.storeSecondaryLanguageName = settings.storeSecondaryLanguageName;
            newSettings.currencySymbol = settings.currencySymbol;
            newSettings.currencyFormat = settings.currencyFormat;
            newSettings.dateFormat = settings.dateFormat;
            newSettings.timeFormat = settings.timeFormat;
            newSettings.defaultCountry = settings.defaultCountry;
            newSettings.timeZone = settings.timeZone;
            newSettings.orderCancelStatusId = settings.orderCancelStatusId;
            newSettings.cancellationType = settings.cancellationType;
            newSettings.isAutoApproveCancellation = settings.isAutoApproveCancellation;
            newSettings.sellerApprovalTimeframeUnit = settings.sellerApprovalTimeframeUnit;
            newSettings.sellerApprovalTimeframeValue = settings.sellerApprovalTimeframeValue;
            newSettings.isProductCancellable = settings.isProductCancellable;
            newSettings.copyrights = settings.copyrights;
            if (settings.defaultWebsite) {
                const settingsUpdate = new Settings();
                settingsUpdate.defaultWebsite = 0;
                await this.settingService.update({}, settingsUpdate);
            }
            newSettings.defaultWebsite = settings.defaultWebsite;
            newSettings.pendingStatus = settings.pendingStatus;
            newSettings.country = settings.country?.toString();
            if (settings.siteCategory) {
                newSettings.siteCategory = settings.siteCategory;
            }
            if (settings.storeLogo) {
                const logo = settings.storeLogo;
                const type = logo.split(';')[0].split('/')[1];
                const availableTypes = env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse: ApiResponse<any> = {
                        status: 0,
                        message: 'Only ' + env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const name = 'Img_' + Date.now() + '.' + type;
                const path = 'storeLogo/';
                const base64Data = new Buffer(logo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((path + name), base64Data, type);
                } else {
                    await this.imageService.imageUpload((path + name), base64Data);
                }
                newSettings.storeLogo = name;
                newSettings.storeLogoPath = path;
            }
            if (settings.mailImage) {
                const emaillogo = settings.mailImage;
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
                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((emailLogoPath + emailLogoName), base64Data, type);
                } else {
                    await this.imageService.imageUpload((emailLogoPath + emailLogoName), base64Data);
                }
                newSettings.emailLogo = emailLogoName;
                newSettings.emailLogoPath = emailLogoPath;
            }
            if (settings.adminLogo) {
                const adminLogo = settings.adminLogo;
                const type = adminLogo.split(';')[0].split('/')[1];
                const availableTypes = env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse: any = {
                        status: 0,
                        message: 'Only ' + env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const adminLogoName = 'AdminLogo' + Date.now() + '.' + type;
                const adminLogoPath = 'storeLogo/';
                const base64Data = new Buffer(adminLogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');

                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((adminLogoPath + adminLogoName), base64Data, type);
                } else {
                    await this.imageService.imageUpload((adminLogoPath + adminLogoName), base64Data);
                }

                newSettings.adminLogo = adminLogoName;
                newSettings.adminLogoPath = adminLogoPath;
            }
            if (settings.sellerLogo) {
                const sellerLogo = settings.sellerLogo;
                const type = sellerLogo.split(';')[0].split('/')[1];
                const availableTypes = env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse: any = {
                        status: 0,
                        message: 'Only ' + env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const sellerLogoName = 'sellerLogo' + Date.now() + '.' + type;
                const sellerLogoPath = 'storeLogo/';
                const base64Data = new Buffer(sellerLogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');

                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((sellerLogoPath + sellerLogoName), base64Data, type);
                } else {
                    await this.imageService.imageUpload((sellerLogoPath + sellerLogoName), base64Data);
                }

                newSettings.sellerLogo = sellerLogoName;
                newSettings.sellerLogoPath = sellerLogoPath;
            }
            if (settings.sellerLogo2) {
                const sellerLogo2 = settings.sellerLogo2;
                const type = sellerLogo2.split(';')[0].split('/')[1];
                const availableTypes = env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse: any = {
                        status: 0,
                        message: 'Only ' + env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const sellerLogoName2 = 'sellerLogo' + Date.now() + '.' + type;
                const sellerLogoPath2 = 'storeLogo/';
                const base64Data = new Buffer(sellerLogo2.replace(/^data:image\/\w+;base64,/, ''), 'base64');

                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((sellerLogoPath2 + sellerLogoName2), base64Data, type);
                } else {
                    await this.imageService.imageUpload((sellerLogoPath2 + sellerLogoName2), base64Data);
                }

                newSettings.sellerLogo2 = sellerLogoName2;
                newSettings.sellerLogo2Path = sellerLogoPath2;
            }
            if (settings.invoiceLogo) {
                const invoiceLogo = settings.invoiceLogo;
                const type = invoiceLogo.split(';')[0].split('/')[1];
                const availableTypes = env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse: ApiResponse<void> = {
                        status: 0,
                        message: 'Only ' + env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const InvoiceLogoName = 'InvoiceLogo_' + Date.now() + '.' + type;
                const InvoiceLogoPath = 'storeLogo/';
                const base64Data = new Buffer(invoiceLogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');

                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((InvoiceLogoPath + InvoiceLogoName), base64Data, type);
                } else {
                    await this.imageService.imageUpload((InvoiceLogoPath + InvoiceLogoName), base64Data);
                }

                newSettings.invoiceLogo = InvoiceLogoName;
                newSettings.invoiceLogoPath = InvoiceLogoPath;
            }
            if (true) {
                newSettings.maintenanceMode = settings.maintenanceMode;
                newSettings.storeLanguageName = settings.storeLanguageName;
                newSettings.storeCurrencyId = settings.storeCurrencyId;
                newSettings.storeImage = settings.storeImage;
                newSettings.invoicePrefix = settings.invoicePrefix;
                newSettings.orderStatus = settings.orderStatus;
                newSettings.categoryProductCount = settings.categoryProductCount;
                newSettings.itemsPerPage = settings.itemsPerPage;
                newSettings.google = settings.google;
                newSettings.facebook = settings.facebook;
                newSettings.twitter = settings.twitter;
                newSettings.instagram = settings.instagram;
                newSettings.youtube = settings.youtube;
                newSettings.linkedin = settings.linkedIn;
                newSettings.isActive = +settings.status;
                newSettings.accessKey = settings.accessKey?.trim();
            }
            const createdData: Settings = await this.settingService.create(newSettings);
            if (createdData.defaultWebsite) {
                const settingsUpdate = new Settings();
                settingsUpdate.defaultWebsite = 0;
                await this.settingService.update({ settingsId: Not(createdData.settingsId) }, settingsUpdate);
            }
            const successResponse: ApiResponse<Settings> = {
                status: 1,
                message: 'Settings created Successfulll',
                data: createdData,

            };
            return response.status(200).send(successResponse);
        } else {
            if (settings.siteUrl) {
                const duplicateSiteExist = await this.settingService.findOne({
                    where: {
                        siteUrl: settings.siteUrl.trim(),
                    },
                });
                if (duplicateSiteExist && duplicateSiteExist.settingsId !== settings.settingId) {
                    return response.status(400).send({
                        status: 0,
                        message: `Url already exists`,
                    });
                }
            }
            settingValue.siteUrl = settings.siteUrl;
            settingValue.businessName = settings.businessName;
            settingValue.metaTagTitle = settings.metaTagTitle;
            settingValue.metaTagDescription = settings.metaTagDescription;
            settingValue.metaTagKeyword = settings.metaTagKeywords;
            settingValue.siteName = settings.siteName;
            settingValue.storeOwner = settings.storeOwner;
            settingValue.storeAddress1 = settings.storeAddress1;
            settingValue.storeAddress2 = settings.storeAddress2;
            settingValue.storeDescription = settings.storeDescription;
            settingValue.siteCategory = settings.siteCategory;
            settingValue.countryId = settings.countryId;
            settingValue.zoneId = settings.zoneId;
            settingValue.storeEmail = settings.storeEmail;
            settingValue.storeTelephone = settings.storeTelephone;
            settingValue.storeFax = settings.storeFax;
            settingValue.storeLogo = settings.storeLogo;
            settingValue.storeCity = settings.storeCity;
            settingValue.storePostalCode = settings.storePostalCode;
            settingValue.storeSecondaryLanguageName = settings.storeSecondaryLanguageName;
            settingValue.currencySymbol = settings.currencySymbol;
            settingValue.currencyFormat = settings.currencyFormat;
            settingValue.dateFormat = settings.dateFormat;
            settingValue.timeFormat = settings.timeFormat;
            settingValue.defaultCountry = settings.defaultCountry;
            settingValue.country = settings?.country ? settings.country.toString() : settingValue.country;
            settingValue.defaultWebsite = settings.defaultWebsite;
            settingValue.pendingStatus = settings.pendingStatus;
            settingValue.accessKey = settings.accessKey?.trim();
            settingValue.timeZone = settings.timeZone;
            settingValue.orderCancelStatusId = settings.orderCancelStatusId;
            settingValue.cancellationType = settings.cancellationType;
            settingValue.isAutoApproveCancellation = settings.isAutoApproveCancellation;
            settingValue.sellerApprovalTimeframeUnit = settings.sellerApprovalTimeframeUnit;
            settingValue.sellerApprovalTimeframeValue = settings.sellerApprovalTimeframeValue;
            settingValue.isProductCancellable = settings.isProductCancellable;
            settingValue.copyrights = settings.copyrights;
            if (settings.siteCategory?.trim()) {
                const newCategory: string[] = settings.siteCategory.split(',');
                settingValue.siteCategory = newCategory.toString();
            }
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

                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((path + name), base64Data, type);
                } else {
                    await this.imageService.imageUpload((path + name), base64Data);
                }

                settingValue.storeLogo = name;
                settingValue.storeLogoPath = path;
            }
            if (settings.mailImage) {
                const emaillogo = settings.mailImage;
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

                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((emailLogoPath + emailLogoName), base64Data, type);
                } else {
                    await this.imageService.imageUpload((emailLogoPath + emailLogoName), base64Data);
                }

                settingValue.emailLogo = emailLogoName;
                settingValue.emailLogoPath = emailLogoPath;
            }
            if (settings.adminLogo) {
                const adminLogo = settings.adminLogo;
                const type = adminLogo.split(';')[0].split('/')[1];
                const availableTypes = env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse: any = {
                        status: 0,
                        message: 'Only ' + env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const adminLogoName = 'AdminLogo' + Date.now() + '.' + type;
                const adminLogoPath = 'storeLogo/';
                const base64Data = new Buffer(adminLogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');

                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((adminLogoPath + adminLogoName), base64Data, type);
                } else {
                    await this.imageService.imageUpload((adminLogoPath + adminLogoName), base64Data);
                }

                settingValue.adminLogo = adminLogoName;
                settingValue.adminLogoPath = adminLogoPath;
            }
            if (settings.sellerLogo) {
                const sellerLogo = settings.sellerLogo;
                const type = sellerLogo.split(';')[0].split('/')[1];
                const availableTypes = env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse: any = {
                        status: 0,
                        message: 'Only ' + env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const sellerLogoName = 'sellerLogo' + Date.now() + '.' + type;
                const sellerLogoPath = 'storeLogo/';
                const base64Data = new Buffer(sellerLogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');

                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((sellerLogoPath + sellerLogoName), base64Data, type);
                } else {
                    await this.imageService.imageUpload((sellerLogoPath + sellerLogoName), base64Data);
                }

                settingValue.sellerLogo = sellerLogoName;
                settingValue.sellerLogoPath = sellerLogoPath;
            }
            if (settings.sellerLogo2) {
                const sellerLogo2 = settings.sellerLogo2;
                const type = sellerLogo2.split(';')[0].split('/')[1];
                const availableTypes = env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse: any = {
                        status: 0,
                        message: 'Only ' + env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const sellerLogoName2 = 'sellerLogo' + Date.now() + '.' + type;
                const sellerLogoPath2 = 'storeLogo/';
                const base64Data = new Buffer(sellerLogo2.replace(/^data:image\/\w+;base64,/, ''), 'base64');

                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((sellerLogoPath2 + sellerLogoName2), base64Data, type);
                } else {
                    await this.imageService.imageUpload((sellerLogoPath2 + sellerLogoName2), base64Data);
                }

                settingValue.sellerLogo2 = sellerLogoName2;
                settingValue.sellerLogo2Path = sellerLogoPath2;
            }
            if (settings.invoiceLogo) {
                const invoiceLogo = settings.invoiceLogo;
                const extType = invoiceLogo.split(';')[0].split('/')[1];
                const InvoiceLogoName = 'InvoiceLogo_' + Date.now() + '.' + extType;
                const InvoiceLogoPath = 'storeLogo/';
                const base64Data = new Buffer(invoiceLogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');

                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((InvoiceLogoPath + InvoiceLogoName), base64Data, extType);
                } else {
                    await this.imageService.imageUpload((InvoiceLogoPath + InvoiceLogoName), base64Data);
                }

                settingValue.invoiceLogo = InvoiceLogoName;
                settingValue.invoiceLogoPath = InvoiceLogoPath;
            }
            if (true) {
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
                settingValue.youtube = settings.youtube;
                settingValue.linkedin = settings.linkedIn;
                settingValue.isActive = settings.status;
            }
            const updatedData: Settings = await this.settingService.create(settingValue);
            if (updatedData.defaultWebsite) {
                const settingsUpdate = new Settings();
                settingsUpdate.defaultWebsite = 0;
                await this.settingService.update({ settingsId: Not(updatedData.settingsId) }, settingsUpdate);
            }
            const successResponse: ApiResponse<Settings> = {
                status: 1,
                message: 'Settings Updated Successfully',
                data: updatedData,

            };
            return response.status(200).send(successResponse);
        }
    }

    // update main API
    /**
     * @api {put} /api/settings/maintainance Update maintainance mode API
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
     * @apiSampleRequest /api/settings/maintainance
     * @apiErrorExample {json} isFeature error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/maintainance')
    @Authorized('admin')
    public async updateFeatureProduct(@BodyParam('mode') mode: number, @BodyParam('id') siteId: number, @Res() response: Response): Promise<Response> {

        const setting: Settings = await this.settingService.findOne({
            where: {
                settingsId: siteId,
            },
        });
        if (!setting) {
            const errorResponse: ApiResponse<void> = {
                status: 0,
                message: 'Invalid Site Id',
            };
            return response.status(400).send(errorResponse);
        }
        setting.maintenanceMode = mode ? mode : 0;
        const settingSave: Settings = await this.settingService.create(setting);
        if (settingSave) {
            const successResponse: ApiResponse<Settings> = {
                status: 1,
                message: 'Maintainance mode updated successfully',
                data: settingSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: ApiResponse<void> = {
                status: 0,
                message: 'Unable to update maintainance',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Generate Access Key
    /**
     * @api {put} /api/settings/keygen Update maintainance mode API
     * @apiGroup Settings
     * @apiParam (Request body) {Number} siteId siteId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "AccessKey Generation Successful",
     *      "status": "1",
     *      "data": "{ accessKey: '' }"
     * }
     * @apiSampleRequest /api/settings/keygen
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/keygen')
    @Authorized('admin')
    public async generateKeySite(@Res() response: Response, @BodyParam('id') siteId: number): Promise<Response> {
        let settingsSave: Settings;
        if (siteId) {
            const settings: Settings = await this.settingService.findOne({
                where: {
                    settingsId: siteId,
                },
            });
            if (!settings) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid Site Id`,
                });
            }
            settings.accessKey = uuidv4();
            settingsSave = await this.settingService.create(settings);
        }
        return response.status(200).send({
            status: 1,
            message: `AccessKey ${siteId ? 'Updated' : 'Generated'}`,
            data: {
                accessKey: siteId ? settingsSave.accessKey : uuidv4(),
            },
        });
    }

    // create order cancelletion reason
    /**
     * @api {post} /api/settings/order-cancel/reason Submit or Update Order Cancel Reason
     * @apiGroup Settings
     * @apiName SubmitOrUpdateOrderCancelReason
     * @apiDescription Creates or updates an order cancellation reason.
     *
     * @apiParam (Request body) {String} reason The reason for canceling the order
     * @apiParam (Request body) {Number} status The status of the reason
     * @apiParam (Request body) {Number} reasonId The ID of the reason
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully updated reason.",
     *         "data": {
     *             "createdBy": "",
     *             "createdDate": "",
     *             "modifiedBy": "",
     *             "modifiedDate": "",
     *             "id": "",
     *             "reason": "",
     *             "isActive": ""
     *         }
     *     }
     *
     * @apiSampleRequest /api/settings/order-cancel/reason
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Failed to save reason."
     *     }
     */

    @Post('/order-cancel/reason')
    @Authorized()
    public async addReason(@Body({ validate: true }) reason: OrderCancelReasonRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const orderCancel = await this.orderCancelReasonService.findOne({ where: { id: reason.reasonId } });
        if (orderCancel) {
            orderCancel.reason = reason.reason;
            orderCancel.isActive = reason.status;
            await this.orderCancelReasonService.update(orderCancel.id, orderCancel);

            return response.status(200).send({
                status: 1,
                message: 'Successfully updated reason.',
                data: orderCancel,
            });
        }

        const newReason = new OrderCancelReason();
        newReason.reason = reason.reason;
        newReason.isActive = reason.status;
        const cancelReason = await this.orderCancelReasonService.create(newReason);

        const successResponse: any = {
            status: 1,
            message: 'Successfully created reason.',
            data: cancelReason,
        };
        return response.status(200).send(successResponse);
    }

    // get order cancel reason
    /**
     * @api {get} /api/settings/order-cancel/reason Get Order Cancel Reasons
     * @apiGroup Settings
     * @apiName GetOrderCancelReasons
     * @apiDescription Retrieves a list of order cancellation reasons with optional pagination and search.
     *
     * @apiParam (Query Params) {Number} limit Number of records to return
     * @apiParam (Query Params) {Number} offset Number of records to skip
     * @apiParam (Query Params) {String} keyword Keyword to search in reasons
     * @apiParam (Query Params) {Number} count If 1, returns only the count of results
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully reason list.",
     *         "data": [
     *             {
     *                 "createdBy": "",
     *                 "createdDate": "",
     *                 "modifiedBy": "",
     *                 "modifiedDate": "",
     *                 "id": "",
     *                 "reason": "",
     *                 "isActive": ""
     *             }
     *         ]
     *     }
     *
     * @apiSampleRequest /api/settings/order-cancel/reason
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Failed to retrieve reason list."
     *     }
     */

    @Get('/order-cancel/reason')
    @Authorized()
    public async reasonList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number, @Req() request: any, @Res() response: any): Promise<any> {

        const search = [];
        const whereConditions = [];
        if (keyword && keyword !== '') {
            search.push({
                name: ['reason'],
                op: 'like',
                value: keyword,
            });
        }
        const cancelReason = await this.orderCancelReasonService.list(limit, offset, [], search, whereConditions, count);
        const successResponse: any = {
            status: 1,
            message: count ? 'Successfully got reason count.' : 'Successfully reason list.',
            data: cancelReason,
        };
        return response.status(200).send(successResponse);
    }

    // delete order cancel reason
    /**
     * @api {delete} /api/settings/order-cancel/reason/:id Delete Order Cancel Reason
     * @apiGroup Settings
     * @apiName DeleteOrderCancelReason
     * @apiDescription Deletes an order cancellation reason by its ID.
     *
     * @apiParam (Path Params) {Number} id The ID of the reason to delete
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully reason deleted."
     *     }
     *
     * @apiSampleRequest /api/settings/order-cancel/reason/:id
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Failed to delete reason."
     *     }
     */

    @Delete('/order-cancel/reason/:id')
    @Authorized()
    public async deleteReason(@Param('id') id: number, @Res() response: any): Promise<any> {
        const orderCancelReason = await this.orderCancelReasonService.findOne({ where: { id } });
        if (!orderCancelReason) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid reason.',
            };
            return response.status(400).send(errorResponse);
        }

        await this.orderCancelReasonService.delete(orderCancelReason);
        const successResponse: any = {
            status: 1,
            message: 'Successfully reason deleted.',
            data: orderCancelReason,
        };
        return response.status(200).send(successResponse);
    }

    // get reason details
    /**
     * @api {get} /order-cancel/reason/:id Get Order Cancel Reason by ID
     * @apiGroup Settings
     * @apiName GetOrderCancelReasonById
     * @apiDescription Retrieves the details of a specific order cancellation reason by its ID.
     *
     * @apiParam (Path Params) {Number} id The ID of the cancellation reason
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully reason details.",
     *         "data": {
     *             "createdBy": "",
     *             "createdDate": "",
     *             "modifiedBy": "",
     *             "modifiedDate": "",
     *             "id": "",
     *             "reason": "",
     *             "isActive": ""
     *         }
     *     }
     *
     * @apiSampleRequest /order-cancel/reason/:id
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *         "status": 0,
     *         "message": "Reason not found."
     *     }
     */

    @Get('/order-cancel/reason/:id')
    @Authorized()
    public async reasonDetails(@Param('id') id: number, @Res() response: any): Promise<any> {
        const reason = await this.orderCancelReasonService.findOne({ where: { id } });
        if (!reason) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid reason id.',
            };
            return response.status(400).send(errorResponse);
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully reason details.',
            data: reason,
        };
        return response.status(200).send(successResponse);

    }
}
