/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, JsonController, Authorized, Res, Req, Param, QueryParam, Post, Body } from 'routing-controllers';
import { VendorCountryService } from '../../core/services/VendorCountryService';
import { CountryService } from '../../core/services/CountryService';
import { Service } from 'typedi';
import { In } from 'typeorm';
import { VendorCountry } from '../../core/models/VendorCountry';
import { VendorSettingsService } from '../../core/services/VendorSettingsService';

@Service()
@JsonController('/vendor-country')
export class VendorCountryController {
    constructor(
        private vendorCountryService: VendorCountryService,
        private countryService: CountryService,
        private vendorSettingsService: VendorSettingsService
    ) {
        // --
    }

    // Country List API
    /**
     * @api {get} /api/vendor-country Country List API
     * @apiGroup Country
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully got country list",
     *      "data":{
     *              "countryId" : 99
     *              "name" : "INDIA"
     *              "isoCode2" : "IN"
     *              "isoCode3" : "INDIA"
     *              "addressFormat" : ""
     *              "postcodeRequired" : ""
     *              "status" : ""
     *      }
     * }
     * @apiSampleRequest /api/vendor-country
     * @apiErrorExample {json} Country error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized(['vendor', 'list-setting-localization'])
    public async countryList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {
        const select = [
            'VendorCountry.id',
            'VendorCountry.isActive',
            'VendorCountry.isDelete',
            'VendorCountry.createdDate',
            'country.countryId',
            'country.name',
            'country.isoCode2',
            'country.isoCode3',
            'country.addressFormat',
            'country.postcodeRequired',
        ];
        const sort = [
            {
                name: 'VendorCountry.createdDate',
                order: 'DESC',
            },
        ];
        const relations = [
            {
                tableName: 'VendorCountry.country',
                aliasName: 'country',
                op: 'left',
            },
        ];
        const search = [];
        if (keyword?.trim()) {
            search.push({
                name: ['country.name', 'country.isoCode2', 'country.isoCode3'],
                value: keyword,
            });
        }
        const whereConditions = [
            {
                name: 'VendorCountry.tenantId',
                op: 'and',
                value: request.user.tenantId,
            }, {
                name: 'VendorCountry.isDelete',
                op: 'and',
                value: 0,
            },
        ];
        if (status) {
            whereConditions.push({
                name: 'VendorCountry.isActive',
                op: 'and',
                value: status,
            });
        }

        if (count) {
            const countryCount = await this.vendorCountryService.listByQueryBuilder(limit, offset, select, whereConditions, search, relations, [], sort, true, false);
            const successResponse: any = {
                status: 1,
                message: 'Successfully got all vendor country count.',
                data: countryCount,
            };
            return response.status(200).send(successResponse);
        }
        const vendorCountryList = await this.vendorCountryService.listByQueryBuilder(limit, offset, select, whereConditions, search, relations, [], [], false, false);
        if (vendorCountryList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get all vendor country list.',
                data: vendorCountryList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'Unable to get vendor country list.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Update Vendor Countries API
    /**
     * @api {post} /api/vendor-country Update Vendor Countries API
     * @apiGroup Country
     * @apiHeader {String} Authorization
     *
     * @apiParam (Request body) {String} countryIds Comma-separated list of country IDs
     * @apiParam (Request body) {String} deleteVendorCountryIds Comma-separated list of deleteVendorCountry IDs
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully updated vendor countries."
     * }
     *
     * @apiSampleRequest /api/vendor-country
     *
     * @apiErrorExample {json} Vendor Country error
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Unable to update vendor countries."
     * }
     */
    @Post()
    @Authorized(['vendor', 'list-setting-localization'])
    public async mapVendorCountry(@Body({ validate: true }) countryParam: { countryIds: string, deleteVendorCountryIds: string }, @Req() request: any, @Res() response: any): Promise<any> {
        const countryIds: string[] = countryParam.countryIds.split(',');

        if (countryParam.countryIds !== '') {
            const existingMappings = await this.vendorCountryService.find({
                where: {
                    tenantId: request.user.tenantId,
                    countryId: In(countryIds),
                },
            });
            const existingIds = existingMappings.map(county => county.countryId);

            const newIds = countryIds.map(Number).filter(id => !existingIds.includes(id));
            if (newIds.length) {
                const vendorCountryies = newIds.map(countryId => {
                    const vendorCountry = new VendorCountry();
                    vendorCountry.countryId = +countryId;
                    vendorCountry.tenantId = request.user.tenantId;
                    return vendorCountry;
                });
                await this.vendorCountryService.create(vendorCountryies);
            }
        }
        const vendorCountryIds: any = countryParam.deleteVendorCountryIds.split(',');
        if (countryParam.deleteVendorCountryIds !== '') {
            const checkCountryExist = await this.vendorCountryService.find({ where: { id: In(vendorCountryIds), tenantId: request.user.tenantId } });

            if (checkCountryExist.length !== vendorCountryIds.length) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid vendor countries.',
                });
            }
            const vendorSettings = await this.vendorSettingsService.findOne({ where: { vendorId: request.user.tenantId } });
            if (vendorSettings && vendorCountryIds.includes(vendorSettings.storeCountryId)) {
                return response.status(400).send({
                    status: 0,
                    message: 'You cannot remove the country, as they are mapped with the settings.',
                });
            }
            await this.vendorCountryService.delete(vendorCountryIds);
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully updated vendor countries.',
        };
        return response.status(200).send(successResponse);
    }

    // Get Country Id API
    /**
     * @api {get} /api/vendor-country/get-country-id/ Get Country Id API
     * @apiGroup Country
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "countryName" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully  got country Id.",
     *      "data": {
     *                  "countryId" : 99
     *             }
     * }
     * @apiSampleRequest /api/vendor-country/:countryName
     * @apiErrorExample {json} Country error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/:countryName')
    @Authorized(['vendor', 'list-setting-localization'])
    public async getCountryId(@Param('countryName') countryName: string, @Req() request: any, @Res() response: any): Promise<any> {
        const country = await this.countryService.findOne({ where: { name: countryName }, select: ['countryId'] });

        if (!country) {
            const successResponses: any = {
                status: 0,
                message: 'Enter valid vendor country name.',
            };
            return response.status(200).send(successResponses);
        }

        const vendorCountry = await this.vendorCountryService.findOne({ select: ['id'], where: { countryId: country.countryId, tenantId: request.user.tenantId, isDelete: 0 } });

        const successResponse: any = {
            status: 1,
            message: 'Successfully got vendor country id.',
            data: vendorCountry,
        };
        return response.status(200).send(successResponse);
    }
}
