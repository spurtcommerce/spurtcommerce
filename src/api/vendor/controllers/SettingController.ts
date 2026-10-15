/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Response } from 'express';
import { Get, JsonController, Res, Body, Post, Authorized, Param, Req } from 'routing-controllers';
import { Settings } from '../../core/models/Setting';
import { CreateSettingRequest } from '../../vendor/controllers/requests/CreateSettingRequest';
import { env } from '../../../env';
import { S3Service } from '../../core/services/S3Service';
import { ImageService } from '../../core/services/ImageService';
import { VendorSettingsService } from '../../core/services/VendorSettingsService';
import { VendorSettings } from '../../core/models/VendorSettings';
import { VendorService } from '../../core/services/VendorService';
import { Service } from 'typedi';
import { CurrencyService } from '../../core/services/CurrencyService';
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
    ) {
        // --
    }

    /**
     * @api {get} /api/vendor-settings List Vendor Settings
     * @apiGroup Vendor Settings
     * @apiName GetVendorSettingsList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got vendor settings",
     *         "data": [
     *             {
     *                 "id": 1,
     *                 "vendorId": 1,
     *                 "storeCurrencyId": 1,
     *                 "currencyCode": "USD",
     *                 "symbolLeft": "$",
     *                 "symbolRight": ""
     *             }
     *         ],
     *         "id": 1
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Internal Server Error"
     *     }
     *
     * @apiSampleRequest /api/vendor-settings
     */
    @Get()
    @Authorized('vendor')
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

    /**
     * @api {get} /api/vendor-settings/:id Get Vendor Settings Detail
     * @apiGroup Vendor Settings
     * @apiName GetVendorSettingsDetail
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id Settings ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully get vendor settings",
     *         "data": {
     *             "id": 1,
     *             "siteName": "My Store",
     *             "storeEmail": "vendor@example.com",
     *             "currencyCode": "USD",
     *             "symbolLeft": "$",
     *             "vendor": {}
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Id:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid Setting Id"
     *     }
     *
     * @apiSampleRequest /api/vendor-settings/:id
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

    /**
     * @api {post} /api/vendor-settings Create or Update Vendor Settings
     * @apiGroup Vendor Settings
     * @apiName CreateOrUpdateVendorSettings
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiBody {String} [settingSection] Settings section name to update
     * @apiBody {String} [siteUrl] Store site URL
     * @apiBody {String} [siteName] Store site name
     * @apiBody {String} [businessName] Business name
     * @apiBody {String} [storeOwner] Store owner name
     * @apiBody {String} [storeEmail] Store contact email
     * @apiBody {String} [storeTelephone] Store contact phone
     * @apiBody {String} [storeAddress1] Store address line 1
     * @apiBody {String} [storeAddress2] Store address line 2
     * @apiBody {String} [storeCity] Store city
     * @apiBody {String} [storePostalCode] Store zip code
     * @apiBody {Number} [countryId] Store country ID
     * @apiBody {Number} [zoneId] Store zone ID
     * @apiBody {Number} [storeCurrencyId] Store currency ID
     * @apiBody {Number} [storeLanguageId] Store language ID
     * @apiBody {String} [storeLogo] Store logo base64 image
     * @apiBody {String} [emailLogo] Email logo base64 image
     * @apiBody {String} [invoiceLogo] Invoice logo base64 image
     * @apiBody {Number} [maintenanceMode] Maintenance mode flag (0: Off, 1: On)
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Website details updated successfully."
     *     }
     *
     * @apiErrorExample {json} Validation-Error:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid setting ID."
     *     }
     *
     * @apiSampleRequest /api/vendor-settings
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
}
