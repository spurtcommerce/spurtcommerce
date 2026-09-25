/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import sharp from 'sharp';
import { Response } from 'express';
import { Get, JsonController, Res, Body, Post, Authorized, Put, BodyParam, Param, Req } from 'routing-controllers';
import { Settings } from '../../core/models/Setting';
import { CreateSettingRequest } from '../../vendor/controllers/requests/CreateSettingRequest';
import { env } from '../../../env';
import { S3Service } from '../../core/services/S3Service';
import { ImageService } from '../../core/services/ImageService';
import { VendorSettingsService } from '../../core/services/VendorSettingsService';
// import { ThemeService } from '../../../../add-ons/Theme/services/ThemeService';
import { VendorSettings } from '../../core/models/VendorSettings';
import { VendorService } from '../../core/services/VendorService';
import { Service } from 'typedi';
import { CurrencyService } from '../../core/services/CurrencyService';
// import { VendorSettingsDomainService } from '../../core/services/VendorSettingsDomainService';
interface VendorSettingsView extends Omit<Settings, 'createDetails' | 'updateDetails'> {
    currencyCode: string;
    symbolLeft: string;
    symbolRight: string;
    countryIds: string[];
}

export interface VendorSettingsApiResponse<T> {
    status: number;
    message: string;
    data?: T;
}

const sectionMessages: Record<string, string> = {
    'websites-details': 'Website details updated successfully.',
    'company-details': 'Company details updated successfully.',
    'address-details': 'Address details updated successfully.',
    'site-logo-update': 'Logos updated successfully.',
    'order-id': 'Order ID settings updated successfully.',
    'account': 'Account settings updated successfully.',
    'smtp': 'SMTP settings updated successfully.',
    'language-region': 'Language and region settings updated successfully.',
    'countries': 'Country settings updated successfully.',
    'seo-details': 'SEO details updated successfully.',
    'social-media': 'Social media links updated successfully.',
    'website-status': 'Website status updated successfully.',
    'order': 'Order settings updated successfully.',
    'website-badge': 'Website badge settings updated successfully.',
};
@Service()
@JsonController('/vendor-settings')
export class VendorSettingController {
    constructor(
        private vendorService: VendorService,
        private s3Service: S3Service,
        private imageService: ImageService,
        private vendorSettingsService: VendorSettingsService,
        private currencyService: CurrencyService
        // private themeService: ThemeService
        // private vendorSettingsDomainService: VendorSettingsDomainService
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
    @Get()
    @Authorized(['vendor'])
    public async settingsList(@Res() response: Response, @Req() request: any): Promise<Response> {
        const vendorSettings: any = await this.vendorSettingsService.find({
            where: { vendorId: request.user.tenantId },
            relations: ['vendor'],
            take: 1,
        });

        const promise = vendorSettings.map(async (result: any) => {
            const vendorCurrencyData = await this.currencyService.findOne({ where: { currencyId: result.storeCurrencyId } });
            const temp: any = result;
            if (vendorCurrencyData) {
                temp.currencyCode = vendorCurrencyData?.code;
                temp.symbolLeft = vendorCurrencyData?.symbolLeft;
                temp.symbolRight = vendorCurrencyData?.symbolRight;
            } else {
                temp.currencyCode =
                    temp.symbolLeft = '';
                temp.symbolRight = '';
            }
            return temp;
        });
        const value = await Promise.all(promise);
        return response.status(200).send({ status: 1, message: 'Successfully got vendor settings', data: value, id: request.user.tenantId });
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
    @Authorized(['vendor', 'view-website-settings'])
    public async settingsListSpecific(@Res() response: any, @Req() request: any): Promise<Response> {

        const vendorSettings = await this.vendorSettingsService.findOne({
            where: {
                vendorId: request.user.tenantId,
            },
        });

        const vendorCurrencyData = await this.currencyService.findOne({ where: { currencyId: vendorSettings.storeCurrencyId } });

        const temp: any = {};
        if (vendorCurrencyData) {
            temp.currencyCode = vendorCurrencyData?.code;
            temp.symbolLeft = vendorCurrencyData?.symbolLeft;
            temp.symbolRight = vendorCurrencyData?.symbolRight;
        } else {
            temp.currencyCode = '';
            temp.symbolLeft = '';
            temp.symbolRight = '';
        }

        return response.status(200).send({ status: 1, message: 'Successfully got vendor settings', data: [{ ...vendorSettings, ...temp }] });
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
    @Authorized(['vendor'])
    public async settingsDetail(@Param('id') id: number, @Res() response: Response, @Req() request: any): Promise<Response> {

        // const vendorSettings: Settings = await this.vendorSettingsService.findOne({
        //     where: {
        //         id,
        //     },
        //     relations: ['vendor'],
        // });
        const vendorSettings: any = await this.vendorSettingsService.findOne({
            select: ['id', 'invoicePrefix', 'invoiceLogoName', 'invoiceLogoPath', 'isMaintenance', 'storeLogoName', 'storeLogoPath', 'storeEmail', 'storeMobileNo', 'storeUrl', 'storeAddressLine1', 'storeAddressLine2', 'storeCountryId', 'storeCity', 'storeZipcode', 'storeCurrencyId', 'storeLanguageId', 'sellerLogoName', 'sellerLogoPath', 'sellerLogo2', 'sellerLogo2Path', 'mailDriver', 'mailHost', 'mailUsername', 'mailPassword', 'mailPort', 'mailSecure', 'mailEncryption', 'mailFrom', 'siteName', 'businessName', 'storeOwner', 'defaultCountry', 'isActive', 'zoneId', 'createdDate', 'modifiedDate', 'orderStatus', 'copyrights', 'customerServiceHours'],
            where: {
                id,
                vendorId: request.user.tenantId,
            },
        });
        const vendorData = await this.vendorService.findOne({
            select: ['vendorPrefixId', 'industryId', 'vendorSlugName', 'companyName', 'companyDescription', 'isActive', 'isDelete', 'displayNameUrl', 'instagram', 'twitter', 'youtube', 'facebook', 'whatsapp', 'linkedin', 'personalizedSettings', 'emailLogoName', 'emailLogoPath', 'metaTitle', 'metaTagDescription', 'metaTagKeyword', 'appId'],
            where: { vendorId: request.user.tenantId },
        });
        vendorSettings.vendor = vendorData;
        if (!vendorSettings) {
            return response.status(400).send({
                status: 0,
                message: `Invalid Setting Id`,
            });
        }
        const vendorCurrencyData = await this.currencyService.findOne({ where: { currencyId: vendorSettings.storeCurrencyId } });

        const settingsDetail: VendorSettingsView = {
            currencyCode: vendorCurrencyData?.code,
            symbolLeft: vendorCurrencyData?.symbolLeft,
            symbolRight: vendorCurrencyData?.symbolRight,
            ...vendorSettings,
            countryIds: vendorSettings.country?.split(','),
        };
        const successResponse: VendorSettingsApiResponse<VendorSettingsView> = {
            status: 1,
            message: 'Successfully get vendor settings',
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
     * @apiParam (Request body) {String} settingSection settingSection
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
    @Post()
    @Authorized(['vendor', 'edit-website-settings'])
    public async createSettings(@Body({ validate: true }) settings: CreateSettingRequest, @Res() response: Response, @Req() request: any): Promise<Response> {

        const settingValue: VendorSettings = await this.vendorSettingsService.findOne({
            where: {
                id: settings.settingId,
                vendorId: request.user.tenantId,
            },
        });
        if (!settingValue) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid setting ID.',
            });
        }
        const vendorData = await this.vendorService.findOne({ where: { vendorId: request.user.tenantId } });

        if (settings.siteUrl) {
            const duplicateSiteExist = await this.vendorSettingsService.findOne({
                where: {
                    storeUrl: settings.siteUrl.trim(),
                },
            });
            if (duplicateSiteExist && duplicateSiteExist.id !== settings.settingId) {
                return response.status(400).send({
                    status: 0,
                    message: 'Url already exists.',
                });
            }
        }

        const checkVendorSettings = ['websites-details', 'company-details', 'address-details', 'site-logo-update', 'order-id', 'account', 'smtp', 'language-region', 'countries', 'seo-details', 'social-media', 'website-status', 'order', 'website-badge', 'theme-settings', 'layout-features', 'hero-section'];

        if (!checkVendorSettings.includes(settings.settingSection)) {
            return response.status(400).send({
                status: 0,
                message: 'invalid setting section',
            });

        }
        if (settings.settingSection === 'websites-details') {
            settingValue.siteName = settings.siteName;
            settingValue.storeUrl = settings.siteUrl;
            settingValue.storeTitle = settings.storeTitle;
            // const checkIsPrimary = await this.vendorSettingsDomainService.findOne({ where: { vendorId: request.user.tenantId, isActive: 1, isDelete: 0, isPrimary: 1 } });
            // if (checkIsPrimary) {
            //     checkIsPrimary.isPrimary = 0;
            //     await this.vendorSettingsDomainService.update(checkIsPrimary.id, checkIsPrimary);
            // }
            // const getVendorSettingsDomain = await this.vendorSettingsDomainService.findOne({ where: { vendorId: request.user.tenantId, isActive: 1, isDelete: 0, domainName: settings.siteUrl?.trim() } });

            // const newVendorSettingsDomain: any = {};
            // if (getVendorSettingsDomain) {
            //     newVendorSettingsDomain.id = getVendorSettingsDomain.id;
            // }
            // newVendorSettingsDomain.domainName = settings.siteUrl?.trim();
            // newVendorSettingsDomain.vendorSettingsId = settings.settingId;
            // newVendorSettingsDomain.vendorId = request.user.tenantId;
            // newVendorSettingsDomain.createdBy = request.user.id;
            // newVendorSettingsDomain.isActive = 1;
            // newVendorSettingsDomain.isDelete = 0;
            // newVendorSettingsDomain.isPrimary = 1;
            // await this.vendorSettingsDomainService.create(newVendorSettingsDomain);
            vendorData.companyDescription = settings.storeDescription;
        }
        if (settings.settingSection === 'company-details') {
            settingValue.businessName = settings.businessName;
            settingValue.storeOwner = settings.storeOwner;
            settingValue.storeEmail = settings.storeEmail;
            settingValue.storeMobileNo = settings.storeTelephone;
            settingValue.copyrights = settings.copyrights;
            settingValue.customerServiceHours = settings.customerServiceHours;
        }
        if (settings.settingSection === 'address-details') {
            settingValue.storeAddressLine1 = settings.storeAddress1;
            settingValue.storeAddressLine2 = settings.storeAddress2;
            settingValue.storeCity = settings.storeCity;
            settingValue.storeCountryId = settings.countryId;
            settingValue.zoneId = settings.zoneId;
            settingValue.storeZipcode = settings.storePostalCode;
        }

        if (settings.settingSection === 'website-badge') {
            if (env.app.type === 'cloud') {
                const getVendorSettings = await this.vendorSettingsService.findOne({ where: { vendorId: request.user.tenantId } });
                if (!getVendorSettings?.featureAccess?.badges_removal) {
                    return response.status(400).send({
                        status: 0,
                        message: `You don't have access for it please upgrade your plan.`,
                    });
                }
            }
            settingValue.showBadge = settings.showBadge;
        }
        if (settings.settingSection === 'site-logo-update') {
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

                settingValue.invoiceLogoName = InvoiceLogoName;
                settingValue.invoiceLogoPath = InvoiceLogoPath;
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

                settingValue.storeLogoName = name;
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

                vendorData.emailLogoName = emailLogoName;
                vendorData.emailLogoPath = emailLogoPath;
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

                settingValue.sellerLogoName = sellerLogoName;
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
        }
        if (settings.settingSection === 'order-id') {
            settingValue.invoicePrefix = settings.invoicePrefix;
            settingValue.orderStatus = settings.orderStatus;
        }
        if (settings.settingSection === 'language-region') {
            settingValue.storeCurrencyId = settings.storeCurrencyId;
            // settingValue.storeLanguageName = settings.storeLanguageName;
            // settingValue.storeSecondaryLanguageName = settings.storeSecondaryLanguageName;
            settingValue.currencySymbol = settings.currencySymbol;
            vendorData.personalizedSettings.timeZone = settings.timeZone;
            vendorData.personalizedSettings.dateFormat = settings.dateFormat;
            vendorData.personalizedSettings.timeFormat = settings.timeFormat;
            settingValue.storeLanguageId = settings.storeLanguageId;
            settingValue.defaultCountry = settings.defaultCountry;
        }
        // if (settings.settingSection === 'countries') {
        //     settingValue.defaultCountry = settings.defaultCountry;
        // }
        if (settings.settingSection === 'seo-details') {
            vendorData.metaTitle = settings.metaTagTitle;
            vendorData.metaTagDescription = settings.metaTagDescription;
            vendorData.metaTagKeyword = settings.metaTagKeywords;
        }
        if (settings.settingSection === 'social-media') {
            vendorData.facebook = settings.facebook;
            vendorData.twitter = settings.twitter;
            vendorData.instagram = settings.instagram;
            vendorData.youtube = settings.youtube;
            vendorData.linkedin = settings.linkedIn;
        }
        if (settings.settingSection === 'website-status') {
            settingValue.isActive = +settings.status;
            settingValue.isMaintenance = settings.maintenanceMode;
        }
        if (settings.settingSection === 'account') {
            settingValue.storeEmail = settings.storeEmail;
        }
        if (settings.settingSection === 'smtp') {
            if (env.app.type === 'cloud') {
                const getVendorSettings = await this.vendorSettingsService.findOne({ where: { vendorId: request.user.tenantId } });
                if (!getVendorSettings?.featureAccess?.custom_email_name) {
                    return response.status(400).send({
                        status: 0,
                        message: `You don't have access for it please upgrade your plan.`,
                    });
                }
            }
            settingValue.mailDriver = settings.mailDriver;
            settingValue.mailHost = settings.mailHost;
            settingValue.mailUsername = settings.mailUsername;
            settingValue.mailPassword = settings.mailPassword;
            settingValue.mailPort = settings.mailPort;
            settingValue.mailSecure = settings.mailSecure;
            settingValue.mailEncryption = settings.mailEncryption;
            settingValue.mailFrom = settings.mailFrom;
        }

        if (settings.settingSection === 'layout-features') {

            settingValue.enableAdvancedSkuSearch = settings.enableAdvancedSkuSearch;
            settingValue.allowBulkCsvOrdering = settings.allowBulkCsvOrdering;
            settingValue.showRequestForQuote = settings.showRequestForQuote;

        }

        if (settings.settingSection === 'hero-section') {

            const heroImage = settings.heroImage;
            const type = heroImage.split(';')[0].split('/')[1];

            const availableTypes = env.availImageTypes.split(',');
            if (!availableTypes.includes(type)) {
                return response.status(400).send({
                    status: 0,
                    message: 'Only ' + env.availImageTypes + ' types are allowed',
                });
            }

            const heroImageName = 'Hero_' + Date.now() + '.png';
            const heroImagePath = 'hero' + request.user.tenantId + '/';

            const base64Data = Buffer.from(
                heroImage.replace(/^data:image\/\w+;base64,/, ''),
                'base64'
            );

            let ctaText = (settings.heroCtaText || '').slice(0, 25);
            if (settings.heroCtaText?.length > 25) {
                ctaText += '...';
            }

            const heroHeadline = (settings.heroHeadline || '').trim().split(/\s+/).slice(0, 5).join(' ');

            const subWords = (settings.heroSubHeadline || '').trim().split(/\s+/);
            const subLine1 = subWords.slice(0, 10).join(' ');
            const subLine2 = subWords.length > 10 ? subWords.slice(10).join(' ') : '';

            const minBtnWidth = 220;
            const maxBtnWidth = 420;
            const approxCharWidth = 18;
            const heroWidth = 1440;
            const heroHeight = 480;
            const btnWidth = Math.min(Math.max(ctaText.length * approxCharWidth, minBtnWidth), maxBtnWidth);

            const btnX = 80;
            const btnY = 310;
            const btnHeight = 50;
            const textX = btnX + btnWidth / 2;
            const textY = btnY + btnHeight / 2 + 5;

            const finalImageBuffer = await sharp(base64Data).resize(heroWidth, heroHeight).composite([{
                input: Buffer.from(`
            <svg width="${heroWidth}" height="${heroHeight}">
            <defs>
            <style>
            @font-face{font-family:'Poppins';src:url(data:font/ttf;base64,PASTE_BASE64_FONT_HERE)}.title{fill:#fff;font-size:48px;font-weight:600;font-family:'Poppins'}.sub{fill:#fff;font-size:28px;font-family:'Poppins'}.ctaText{fill:#fff;font-size:32px;font-weight:700;font-family:'Poppins'}
            </style>
            </defs>

            <text x="80" y="120" class="title">${heroHeadline}</text><text x="80" y="180" class="sub">${subLine1}</text>${subLine2 ? `<text x="80" y="220" class="sub">${subLine2}</text>` : ''}
            <rect x="${btnX}" y="${btnY}" rx="18" ry="18" width="${btnWidth}" height="${btnHeight}" fill="#4b6cb7"/>
            <text x="${textX}" y="${textY}" text-anchor="middle" dominant-baseline="middle" class="ctaText">${ctaText}</text>
            </svg>
            `),
              }])
              .png()
              .toBuffer();
            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload(
                    heroImagePath + heroImageName,
                    finalImageBuffer,
                    'png'
                );
            } else {
                await this.imageService.imageUpload(
                    heroImagePath + heroImageName,
                    finalImageBuffer
                );
            }

            settingValue.heroImageName = heroImageName;
            settingValue.heroImagePath = heroImagePath;
            settingValue.heroHeadline = settings.heroHeadline;
            settingValue.heroSubHeadline = settings.heroSubHeadline;
            settingValue.heroCtaText = settings.heroCtaText;
            settingValue.heroCtaLink = settings.heroCtaLink;
        }

        settingValue.itemsPerPage = settings.itemsPerPage;
        settingValue.country = settings.country?.toString();
        vendorData.zoneId = settings.zoneId;

        await this.vendorService.update(vendorData.vendorId, vendorData);
        const updatedData: VendorSettings = await this.vendorSettingsService.create(settingValue);

        const successResponse = {
            status: 1,
            message: sectionMessages[settings.settingSection] || 'Vendor settings updated successfully.',
            data: updatedData,

        };
        return response.status(200).send(successResponse);
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
    @Authorized(['vendor', 'maintenance'])
    public async updateFeatureProduct(@BodyParam('mode') mode: number, @BodyParam('id') siteId: number, @Res() response: Response): Promise<Response> {

        const setting: VendorSettings = await this.vendorSettingsService.findOne({
            where: {
                id: siteId,
            },
        });
        if (!setting) {
            const errorResponse: VendorSettingsApiResponse<void> = {
                status: 0,
                message: 'Invalid Site Id',
            };
            return response.status(400).send(errorResponse);
        }
        setting.isMaintenance = mode ? mode : 0;
        const settingSave: Partial<VendorSettings> = await this.vendorSettingsService.save(setting);
        if (settingSave) {
            const successResponse = {
                status: 1,
                message: 'Maintainance mode updated successfully',
                data: settingSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse = {
                status: 0,
                message: 'Unable to update maintainance',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
