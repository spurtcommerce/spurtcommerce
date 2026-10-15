/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, JsonController, Res, Req, QueryParam, Authorized } from 'routing-controllers';
import { VendorLanguageService } from '../../core/services/VendorLanguageService';
import { IndustryService } from '../../core/services/IndustryService';
import { VendorPluginService } from '../../core/services/VendorPluginService';
import { Service } from 'typedi';
import { ZoneService } from '../../core/services/zoneService';
import { CountryService } from '../../core/services/CountryService';
import { LanguageService } from '../../core/services/LanguageService';
@Service()
@JsonController('/vendor-list')
export class VendorCommonListController {
    constructor(
        private vendorLanguageService: VendorLanguageService,
        private zoneService: ZoneService,
        private industryService: IndustryService,
        private vendorPluginService: VendorPluginService,
        private languageService: LanguageService,
        private countryService: CountryService
    ) {
        // --
    }

    /**
     * @api {get} /api/vendor-list/zone List Available Zones
     * @apiGroup Vendor Common List
     * @apiName VendorCommonZoneList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {Number} [limit] Number of records to return
     * @apiQuery {Number} [offset] Pagination offset
     * @apiQuery {Number} [countryId] Filter by country ID
     * @apiQuery {String} [keyword] Keyword search for zone name
     * @apiQuery {Number} [count] Return count only if 1
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully get all zone list",
     *         "data": [
     *             {
     *                 "zoneId": 1,
     *                 "countryId": 99,
     *                 "code": "CA",
     *                 "name": "California",
     *                 "isActive": 1
     *             }
     *         ]
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "unable to get zone list"
     *     }
     *
     * @apiSampleRequest /api/vendor-list/zone
     */
    @Get('/zone')
    @Authorized('vendor')
    public async zonelist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('countryId') countryId: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['zoneId', 'countryId', 'code', 'name', 'isActive', 'createdDate', 'modifiedDate'];
        const search: any = [];
        if (keyword?.trim()) {
            search.push(
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                }
            );
        }
        if (countryId) {
            search.push({
                name: 'countryId',
                op: 'where',
                value: countryId,
            });
        }
        const WhereConditions = [
            {
                name: 'isActive',
                op: 'where',
                value: 1,
            },
        ];
        const relation = ['country'];

        const zoneList = await this.zoneService.list(limit, offset, select, search, WhereConditions, relation, count);

        if (zoneList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get all zone list',
                data: zoneList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'unable to get zone list',
            };
            return response.status(400).send(errorResponse);
        }
    }

    /**
     * @api {get} /api/vendor-list/language List Vendor Languages
     * @apiGroup Vendor Common List
     * @apiName VendorCommonLanguageList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {Number} [limit] Number of records to return
     * @apiQuery {Number} [offset] Pagination offset
     * @apiQuery {String} [keyword] Keyword search for language name
     * @apiQuery {String} [status] Filter by active status
     * @apiQuery {String} [defaultLanguage] Exclude default language ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "successfully got the complete language list",
     *         "data": [
     *             {
     *                 "id": 1,
     *                 "isActive": 1,
     *                 "language": {
     *                     "languageId": 1,
     *                     "name": "French",
     *                     "code": "fr"
     *                 }
     *             }
     *         ]
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "unable to show language list"
     *     }
     *
     * @apiSampleRequest /api/vendor-list/language
     */
    @Get('/language')
    @Authorized('vendor')
    public async languageList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('defaultLanguage') defaultLanguage: string, @Req() request: any, @Res() response: any): Promise<any> {
        const select = ['VendorLanguage.id', 'language.name', 'language.languageId', 'language.code', 'language.image', 'language.imagePath', 'VendorLanguage.isActive', 'language.sortOrder', 'VendorLanguage.createdDate', 'VendorLanguage.modifiedDate'];
        const searchConditions = [];
        if (keyword) {
            searchConditions.push({
                name: ['language.name'],
                value: keyword,
            });
        }
        const whereConditions = [];
        whereConditions.push(
            {
                name: 'VendorLanguage.tenantId',
                op: 'where',
                value: request.user.tenantId,
            }, {
            name: 'VendorLanguage.isDelete',
            op: 'and',
            value: 0,
        }
        );
        if (status) {
            whereConditions.push({
                name: 'VendorLanguage.isActive',
                op: 'and',
                value: status,
            });
        }

        if (defaultLanguage) {
            whereConditions.push(
                {
                    name: 'VendorLanguage.id',
                    op: 'not',
                    value: defaultLanguage,
                }
            );
        }

        const relations = [
            {
                tableName: 'VendorLanguage.language',
                op: 'left',
                aliasName: 'language',
            },
        ];
        const languageList = await this.vendorLanguageService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], [], false, false);
        const filteredList = languageList.filter(
            (item) => item.language?.code !== 'en'
        );
        if (languageList) {
            const successResponse: any = {
                status: 1,
                message: 'successfully got the complete language list',
                data: filteredList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to show language list',
            };
            return response.status(400).send(errorResponse);
        }
    }

    /**
     * @api {get} /api/vendor-list/industry List Industries
     * @apiGroup Vendor Common List
     * @apiName VendorCommonIndustryList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got industry list",
     *         "data": [
     *             {
     *                 "id": 1,
     *                 "name": "Retail",
     *                 "slug": "retail",
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
     * @apiSampleRequest /api/vendor-list/industry
     */
    @Get('/industry')
    @Authorized('vendor')
    public async industryList(@Res() response: any): Promise<any> {
        const industryList = await this.industryService.findAll({
            order: {
                createdDate: 'DESC',
            },
        });
        return response.status(200).send({
            status: 1,
            message: `Successfully got industry list`,
            data: industryList,
        });
    }

    /**
     * @api {get} /api/vendor-list/addons List Active Vendor Addons
     * @apiGroup Vendor Common List
     * @apiName VendorCommonAddonList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {Number} [limit] Number of records to return
     * @apiQuery {Number} [offset] Pagination offset
     * @apiQuery {Number} [count] Return count only if 1
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully get the plugin list",
     *         "data": {
     *             "paypal": {
     *                 "status": 1,
     *                 "additionalInfo": {}
     *             }
     *         }
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Unable to get the plugin list"
     *     }
     *
     * @apiSampleRequest /api/vendor-list/addons
     */
    @Get('/addons')
    @Authorized('vendor')
    public async PluginList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {
        const pluginList = await this.vendorPluginService.pluginList(limit, offset, count, request.user.tenantId);
        if (!pluginList) {
            const errorMessage = {
                status: 0,
                message: 'Unable to get the plugin list',
            };
            return response.status(400).send(errorMessage);
        }

        const values = {};
        for (const value of pluginList) {
            values[value.slugName] = {
                status: value.isActive,
                additionalInfo: value.pluginAdditionalInfo ? JSON.parse(value.pluginAdditionalInfo) : {},
            };
        }
        return response.status(200).send({ status: 1, message: 'Successfully get the plugin list', data: values });
    }
    /**
     * @api {get} /api/vendor-list/master-country List Master Countries
     * @apiGroup Vendor Common List
     * @apiName VendorCommonMasterCountryList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {Number} [limit] Number of records to return
     * @apiQuery {Number} [offset] Pagination offset
     * @apiQuery {String} [keyword] Keyword search for country name or ISO codes
     * @apiQuery {Number} [count] Return count only if 1
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully get all country List",
     *         "data": [
     *             {
     *                 "countryId": 1,
     *                 "name": "United States",
     *                 "isoCode2": "US",
     *                 "isoCode3": "USA",
     *                 "isActive": 1
     *             }
     *         ]
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Unable to get country List"
     *     }
     *
     * @apiSampleRequest /api/vendor-list/master-country
     */
    @Get('/master-country')
    @Authorized('vendor')
    public async masterCountryList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const sort = [{
            name: 'Country.createdDate',
            order: 'DESC',
        }];
        const search = [];
        if (keyword?.trim()) {
            search.push({
                name: ['Country.name', 'Country.isoCode2', 'Country.isoCode3'],
                value: keyword,
            });
        }
        const whereConditions = [
            {
                name: 'Country.isActive',
                op: 'and',
                value: 1,
            },
        ];
        if (count) {
            const countryCount = await this.countryService.listByQueryBuilder(limit, offset, [], whereConditions, search, [], [], sort, true, false);
            const successResponse: any = {
                status: 1,
                message: 'Successfully got all Country Count',
                data: countryCount,
            };
            return response.status(200).send(successResponse);
        }
        const countryList = await this.countryService.listByQueryBuilder(limit, offset, [], whereConditions, search, [], [], [], false, false);
        if (countryList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get all country List',
                data: countryList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'Unable to get country List',
            };
            return response.status(400).send(errorResponse);
        }
    }

    /**
     * @api {get} /api/vendor-list/master-language List Master Languages
     * @apiGroup Vendor Common List
     * @apiName VendorCommonMasterLanguageList
     *
     * @apiQuery {Number} [limit] Number of records to return
     * @apiQuery {Number} [offset] Pagination offset
     * @apiQuery {String} [keyword] Keyword search for language name or code
     * @apiQuery {Number} [count] Return count only if 1
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got all vendor language list.",
     *         "data": [
     *             {
     *                 "languageId": 1,
     *                 "name": "English",
     *                 "code": "en",
     *                 "isActive": 1
     *             }
     *         ]
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Unable to get language list."
     *     }
     *
     * @apiSampleRequest /api/vendor-list/master-language
     */
    @Get('/master-language')
    public async masterLanguageList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {
        const select = ['Language.languageId', 'Language.isActive', 'Language.name', 'Language.code', 'Language.image', 'Language.imagePath'];

        const searchConditions = [];
        if (keyword?.trim()) {
            searchConditions.push({
                name: ['Language.name', 'Language.code'],
                value: keyword,
            });
        }

        const whereConditions: any = [
            {
                op: 'and',
                name: 'Language.isActive',
                value: 1,
            },
        ];

        if (count) {
            const languageCount = await this.languageService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, [], [], [], true, false);
            const countResponse: any = {
                status: 1,
                message: 'Successfully got all vendor language count.',
                data: languageCount,
            };
            return response.status(200).send(countResponse);
        }
        const languageList = await this.languageService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, [], [], [], false, false);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got all vendor language list.',
            data: languageList,
        };
        return response.status(200).send(successResponse);
    }
}
