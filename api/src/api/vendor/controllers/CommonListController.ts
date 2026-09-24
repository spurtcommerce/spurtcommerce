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
import { CurrencyService } from '../../core/services/CurrencyService';
import { LanguageService } from '../../core/services/LanguageService';
@Service()
@JsonController('/vendor-list')
export class VendorCommonListController {
    constructor(
        private vendorLanguageService: VendorLanguageService,
        private zoneService: ZoneService,
        private industryService: IndustryService,
        private vendorPluginService: VendorPluginService,
        private countryService: CountryService,
        private currencyService: CurrencyService,
        private languageService: LanguageService
    ) {
        // --
    }

    // Zone List API
    /**
     * @api {get} /api/list/zone Zone List API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} countryId countryId
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get zone list",
     *      "data":{
     *              "zoneId": 1
     *              "countryId": 99
     *              "code": ""
     *              "name": "",
     *              "isActive": 1
     *             }
     * }
     * @apiSampleRequest /api/list/zone
     * @apiErrorExample {json} Zone error
     * HTTP/1.1 500 Internal Server Error
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

    // Language List API
    /**
     * @api {get} /api/list/language Language List API
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully got language list",
     *      "data":{
     *              "languageId": 1
     *              "name": ""
     *              "status": 1
     *              "code": ""
     *              "sortOrder": 1,
     *              "image": "",
     *              "imagePath": ""
     *      }
     * }
     * @apiSampleRequest /api/list/language
     * @apiErrorExample {json} Language error
     * HTTP/1.1 500 Internal Server Error
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

    // Industry list
    /**
     * @api /api/vendor-list/industry Industry List
     * @apiGroup Store
     * @apiSuccessExample {json} success
     * HTTP/1.1 200 Ok
     * {
     *      "status": "1",
     *      "message": "Successfully Got Industry List..!",
     *      "data": {
     *              "id": "",
     *              "name": "",
     *              "slug": """,
     *              "isActive": "",
     *              "isDelete": ""
     *              }
     * }
     * @apiSampleRequest /api/list/industry
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal server error
     */
    @Get('/industry')
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

    // Plugin list
    /**
     * @api /api/list/addons Plugin List
     * @apiGroup Store
     * @apiParam (Request Body) {number} limit limit
     * @apiParam (Request Body) {number} offset offset
     * @apiParam (Request Body) {number} count count
     * @apiSuccessExample {json} success
     * HTTP/1.1 200 Ok
     * {
     *      "status": "1",
     *      "message": "Successfully get the plugin list. ",
     *      "data": {
     *      "status": ,
     *      "additionalInfo": {
     *           "clientId": "",
     *           "clientSecret": "",
     *           "defaultRoute": "",
     *           "isTest": ""
     *       }
     *   }
     *  }
     * }
     * @apiSampleRequest /api/list/addons
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal server error
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
     * @api {get} /api/vendor-list/master-country Master Country List
     * @apiGroup Country
     * @apiDescription
     * Retrieves a list of all active countries with optional search, pagination, and count functionality.
     *
     * @apiQuery {Number} [limit] Number of records to retrieve.
     * @apiQuery {Number} [offset] Number of records to skip.
     * @apiQuery {String} [keyword] Keyword to search by country name or ISO codes.
     * @apiQuery {Boolean|Number} [count=false] If true or 1, returns only the total count instead of the list.
     *
     * @apiSuccessExample {json} Success-Response (List):
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully get all country List",
     *   "data": [
     *     {
     *       "countryId": 1,
     *       "name": "United States",
     *       "isoCode2": "US",
     *       "isoCode3": "USA",
     *       "isActive": 1
     *     },
     *     {
     *       "countryId": 2,
     *       "name": "United Kingdom",
     *       "isoCode2": "GB",
     *       "isoCode3": "GBR",
     *       "isActive": 1
     *     }
     *   ]
     * }
     *
     * @apiSuccessExample {json} Success-Response (Count):
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully got all Country Count",
     *   "data": 250
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *   "status": 0,
     *   "message": "Unable to get country List"
     * }
     *
     * @apiSampleRequest /api/vendor-list/master-country
     */
    @Get('/master-country')
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
     * @api {get} /api/vendor-list/master-currency Master Currency List
     * @apiGroup Currency
     * @apiDescription
     * Retrieves a list of all active currencies with optional search, pagination, and count functionality.
     *
     * @apiQuery {Number} [limit] Number of records to retrieve.
     * @apiQuery {Number} [offset] Number of records to skip.
     * @apiQuery {String} [keyword] Keyword to search by currency title or code.
     * @apiQuery {String} [status] Filter by status (currently only active currencies are fetched).
     * @apiQuery {Boolean|Number} [count=false] If true or 1, returns only the total count instead of the list.
     *
     * @apiSuccessExample {json} Success-Response (List):
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully got the currency list.",
     *   "data": [
     *     {
     *       "currencyId": 1,
     *       "title": "US Dollar",
     *       "code": "USD",
     *       "symbolLeft": "$",
     *       "symbolRight": null,
     *       "isActive": 1,
     *       "createdDate": "2023-10-01T08:15:00.000Z",
     *       "modifiedDate": "2024-01-05T10:30:00.000Z"
     *     },
     *     {
     *       "currencyId": 2,
     *       "title": "Euro",
     *       "code": "EUR",
     *       "symbolLeft": "€",
     *       "symbolRight": null,
     *       "isActive": 1,
     *       "createdDate": "2023-10-05T09:45:00.000Z",
     *       "modifiedDate": "2024-01-06T14:20:00.000Z"
     *     }
     *   ]
     * }
     *
     * @apiSuccessExample {json} Success-Response (Count):
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully got the currency count.",
     *   "data": 170
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *   "status": 0,
     *   "message": "Unable to get currency list."
     * }
     *
     * @apiSampleRequest /api/vendor-list/master-currency
     */
    @Get('/master-currency')
    public async masterCurrencyList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['Currency.currencyId', 'Currency.title', 'Currency.code', 'Currency.symbolLeft', 'Currency.symbolRight', 'Currency.modifiedDate', 'Currency.createdDate', 'Currency.isActive'];
        const search = [];
        if (keyword?.trim()) {
            search.push({
                name: ['Currency.title', 'Currency.code'],
                value: keyword,
            });
        }
        const whereConditions = [
            {
                name: 'Currency.isActive',
                op: 'and',
                value: 1,
            },
        ];
        const sort = [
            {
                name: 'Currency.createdDate',
                order: 'DESC',
            },
        ];
        if (count) {
            const currencyCount = await this.currencyService.listByQueryBuilder(limit, offset, select, whereConditions, search, [], [], sort, true, false);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the currency count.',
                data: currencyCount,
            });
        }
        const currencyList = await this.currencyService.listByQueryBuilder(limit, offset, select, whereConditions, search, [], [], sort, false, false);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the currency list.',
            data: currencyList,
        };
        return response.status(200).send(successResponse);
    }

    /**
     * @api {get} /api/vendor-list/master-language Master Language List
     * @apiGroup Language
     * @apiDescription
     * Retrieves a list of all active languages with optional search, pagination, and count functionality.
     *
     * @apiQuery {Number} [limit] Number of records to retrieve.
     * @apiQuery {Number} [offset] Number of records to skip.
     * @apiQuery {String} [keyword] Keyword to search by language name or code.
     * @apiQuery {Boolean|Number} [count=false] If true or 1, returns only the total count instead of the list.
     *
     * @apiSuccessExample {json} Success-Response (List):
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully got all vendor language list.",
     *   "data": [
     *     {
     *       "languageId": 1,
     *       "name": "English",
     *       "code": "en",
     *       "isActive": 1,
     *       "image": "en.png",
     *       "imagePath": "/uploads/language/"
     *     },
     *     {
     *       "languageId": 2,
     *       "name": "French",
     *       "code": "fr",
     *       "isActive": 1,
     *       "image": "fr.png",
     *       "imagePath": "/uploads/language/"
     *     }
     *   ]
     * }
     *
     * @apiSuccessExample {json} Success-Response (Count):
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully got all vendor language count.",
     *   "data": 12
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *   "status": 0,
     *   "message": "Unable to get language list."
     * }
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
