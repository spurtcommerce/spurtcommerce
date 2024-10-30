/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Get,
    Put,
    Delete,
    Post,
    Body,
    JsonController,
    Authorized,
    Res,
    Req,
    Param,
    QueryParam
} from 'routing-controllers';
import { CreateCountry } from './requests/CreateCountryRequest';
import { Country } from '../../core/models/Country';
import { CountryService } from '../../core/services/CountryService';
import { UpdateCountry } from './requests/UpdateCountryRequest';
import { Not, Raw } from 'typeorm';

@JsonController('/country')
export class CountryController {
    constructor(private countryService: CountryService) {
    }

    // Create Country API
    /**
     * @api {post} /api/country Add Country API
     * @apiGroup Country
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..30}} name Country name
     * @apiParam (Request body) {String{..2}} isoCode2 Country isoCode2
     * @apiParam (Request body) {String{..3}} isoCode3 Country isoCode3
     * @apiParam (Request body) {Number} postcodeRequired Country postcodeRequired
     * @apiParam (Request body) {Number} status Country status field required
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "isoCode2" : "",
     *      "isoCode3" : "",
     *      "addressFormat" : "",
     *      "postcodeRequired" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully added new Country",
     *      "status": "1",
     *      "data":"{
     *              "name": "India",
     *              "isoCode2": "IN",
     *              "isoCode3": "IND",
     *              "postcodeRequired": "600041",
     *              "isActive": 1,
     *              "countryId": 99
     *              }"
     * }
     * @apiSampleRequest /api/country
     * @apiErrorExample {json} Country error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized(['admin', 'create-country'])
    public async addCountry(@Body({ validate: true }) countryParam: CreateCountry, @Res() response: any): Promise<any> {
        const existCountry = await this.countryService.findOne({
            where: {
                name: countryParam.name,
                isoCode2: countryParam.isoCode2,
                isoCode3: countryParam.isoCode3,
            },
        });
        if (existCountry) {
            const errorResponse: any = {
                status: 0,
                message: 'Country name already exists',
            };
            return response.status(400).send(errorResponse);
        }
        const checkCountry = await this.countryService.findOne({
            where: {
                name: Raw(alias => `LOWER(${alias}) = '${countryParam.name.toLowerCase()}'`),
            },
        });
        if (checkCountry) {
            const errorResponse: any = {
                status: 0,
                message: 'Country name already exists',
            };
            return response.status(400).send(errorResponse);
        }
        const newCountry = new Country();
        newCountry.name = countryParam.name;
        newCountry.isoCode2 = countryParam.isoCode2;
        newCountry.isoCode3 = countryParam.isoCode3;
        newCountry.postcodeRequired = countryParam.postcodeRequired;
        newCountry.isActive = countryParam.status;
        const countrySave = await this.countryService.create(newCountry);
        if (countrySave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully added new country',
                data: countrySave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to add the country',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Update Country API
    /**
     * @api {put} /api/country/update-country/:id Update Country API
     * @apiGroup Country
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} countryId Country countryId
     * @apiParam (Request body) {String{..30}} name Country name
     * @apiParam (Request body) {String{..2}} isoCode2 Country isoCode2
     * @apiParam (Request body) {String{..3}} isoCode3 Country isoCode3
     * @apiParam (Request body) {Number} postcodeRequired Country postcodeRequired
     * @apiParam (Request body) {Number} [status] status
     * @apiParamExample {json} Input
     * {
     *      "countryId" : "",
     *      "name" : "",
     *      "isoCode2" : "",
     *      "isoCode3" : "",
     *      "addressFormat" : "",
     *      "postcodeRequired" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Country",
     *      "status": "1",
     *      "data":"{
     *              "name": "INDIA",
     *              "isoCode2": "I",
     *              "isoCode3": "IND",
     *              "postcodeRequired": "600041",
     *              "isActive": 1,
     *              "countryId": 99
     *              }"
     * }
     * @apiSampleRequest /api/country/:id
     * @apiErrorExample {json} Country error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    @Authorized(['admin', 'edit-country'])
    public async updateCountry(@Body({ validate: true }) countryParam: UpdateCountry, @Res() response: any): Promise<any> {
        const country = await this.countryService.findOne({
            where: {
                countryId: countryParam.countryId,
            },
        });
        if (!country) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid country Id',
            };
            return response.status(400).send(errorResponse);
        }
        const existCountry = await this.countryService.findOne({
            where: {
                name: countryParam.name,
                isoCode2: countryParam.isoCode2,
                isoCode3: countryParam.isoCode3,
                countryId: Not(countryParam.countryId),
            },
        });
        if (existCountry) {
            const errorResponse: any = {
                status: 0,
                message: 'Country name already exists',
            };
            return response.status(400).send(errorResponse);
        }
        const checkCountry = await this.countryService.findOne({
            where: {
                name: Raw(alias => `LOWER(${alias}) = '${countryParam.name.toLowerCase()}'`),
                countryId: Not(countryParam.countryId),
            },
        });
        if (checkCountry) {
            const errorResponse: any = {
                status: 0,
                message: 'Country name already exists',
            };
            return response.status(400).send(errorResponse);
        }
        country.name = countryParam.name;
        country.isoCode2 = countryParam.isoCode2;
        country.isoCode3 = countryParam.isoCode3;
        country.postcodeRequired = countryParam.postcodeRequired;
        country.isActive = countryParam.status;
        const countrySave = await this.countryService.create(country);
        if (countrySave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated country',
                data: countrySave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the country',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Country List API
    /**
     * @api {get} /api/country Country List API
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
     * @apiSampleRequest /api/country
     * @apiErrorExample {json} Country error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized()
    public async countryList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = [];
        const search = [];
        const sort = [{
            name: 'Country.createdDate',
            order: 'DESC',
        }];
        if (keyword?.trim()) {
            search.push({
                name: ['Country.name', 'Country.isoCode2', 'Country.isoCode3'],
                value: keyword,
            });
        }
        const WhereConditions = [];
        if (status) {
            WhereConditions.push({
                name: 'Country.isActive',
                op: 'and',
                value: status,
            });
        }
        if (count) {
            const countryCount = await this.countryService.listByQueryBuilder(limit, offset, select, WhereConditions, search, [], [], sort, true, false);
            const successResponse: any = {
                status: 1,
                message: 'Successfully got all Country Count',
                data: countryCount,
            };
            return response.status(200).send(successResponse);
        }
        const countryList = await this.countryService.listByQueryBuilder(limit, offset, select, WhereConditions, search, [], [], [], false, false);
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

    // Get Country Id API
    /**
     * @api {get} /api/country/get-country-id/ Get Country Id API
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
     * @apiSampleRequest /api/country/:countryName
     * @apiErrorExample {json} Country error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/:countryName')
    @Authorized(['admin'])
    public async getCountryId(@Param('countryName') countryName: string, @Req() request: any, @Res() response: any): Promise<any> {
        const country = await this.countryService.findOne({ where: { name: countryName }, select: ['countryId'] });
        if (!country) {
            const successResponses: any = {
                status: 0,
                message: 'Enter Valid Country Name',
            };
            return response.status(200).send(successResponses);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got country Id',
            data: country,
        };
        return response.status(200).send(successResponse);
    }
    // Delete Country API
    /**
     * @api {delete} /api/country/:id Delete Country API
     * @apiGroup Country
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "countryId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Country",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/country/:id
     * @apiErrorExample {json} Country error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized(['admin', 'delete-country'])
    public async deleteCountry(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const country = await this.countryService.findOne({
            where: {
                countryId: id,
            },
        });
        if (!country) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Country Id',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteCountry = await this.countryService.delete(country);
        if (deleteCountry) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the country',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the country',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
