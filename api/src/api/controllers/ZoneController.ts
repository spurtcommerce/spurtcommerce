/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
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
    QueryParam,
    Param
} from 'routing-controllers';
import {ZoneService} from '../services/zoneService';
import {CountryService} from '../services/CountryService';
import {Zone} from '../models/Zone';
import {CreateZone} from './requests/CreateZoneRequest';
import {classToPlain} from 'class-transformer';

@JsonController('/zone')
export class ZoneController {
    constructor(private zoneService: ZoneService,
                private countryService: CountryService) {
    }

    // create zone API
    /**
     * @api {post} /api/zone/add-zone Add Zone API
     * @apiGroup Zone
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} countryId Zone countryId
     * @apiParam (Request body) {String} code Zone code
     * @apiParam (Request body) {String} name Zone name
     * @apiParam (Request body) {Number} status Zone status
     * @apiParamExample {json} Input
     * {
     *      "countryId" : "",
     *      "code" : "",
     *      "name" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new zone.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/zone/add-zone
     * @apiErrorExample {json} Zone error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-zone')
    @Authorized()
    public async addZone(@Body({validate: true}) zoneParam: CreateZone, @Res() response: any): Promise<any> {
        const country = await this.countryService.findOne({
            where: {
                countryId: zoneParam.countryId,
            },
        });
        if (!country) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid countryId',
            };
            return response.status(400).send(errorResponse);
        }
        const newZone = new Zone();
        newZone.countryId = zoneParam.countryId;
        newZone.code = zoneParam.code;
        newZone.name = zoneParam.name;
        newZone.isActive = zoneParam.status;
        const zoneSave = await this.zoneService.create(newZone);
        if (zoneSave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created new zone',
                data: zoneSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to create zone',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // update Zone API
    /**
     * @api {put} /api/zone/update-zone/:id Update Zone API
     * @apiGroup Zone
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} countryId Zone countryId
     * @apiParam (Request body) {string} code Zone code
     * @apiParam (Request body) {String} name Zone name
     * @apiParam (Request body) {Number} status Zone status
     * @apiParamExample {json} Input
     * {
     *      "zoneId" : "",
     *      "countryId" : "",
     *      "code" : "",
     *      "name" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Zone.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/zone/update-zone/:id
     * @apiErrorExample {json} Zone error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-zone/:id')
    @Authorized()
    public async updateZone(@Param('id') id: number, @Body({validate: true}) zoneParam: CreateZone, @Res() response: any): Promise<any> {

        const zone = await this.zoneService.findOne({
            where: {
                zoneId: id,
            },
        });
        if (zone) {
            const country = await this.countryService.findOne({
                where: {
                    countryId: zoneParam.countryId,
                },
            });
            if (!country) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid countryId',
                };
                return response.status(400).send(errorResponse);
            }
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid zoneId',
            };
            return response.status(400).send(errorResponse);
        }
        zone.countryId = zoneParam.countryId;
        zone.code = zoneParam.code;
        zone.name = zoneParam.name;
        zone.isActive = zoneParam.status;
        const zoneSave = await this.zoneService.create(zone);
        if (zoneSave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated zone',
                data: zoneSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update zone',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Zone List API
    /**
     * @api {get} /api/zone/zone-list Zone List API
     * @apiGroup Zone
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get zone list",
     *      "data":{
     *      "countryId"
     *      "code"
     *      "name"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/zone/zone-list
     * @apiErrorExample {json} Zone error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/zone-list')
    @Authorized()
    public async zonelist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count')count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['zoneId', 'countryId', 'code', 'name', 'isActive'];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            },
        ];

        const WhereConditions = [];
        const relation = ['country'];

        const zoneList = await this.zoneService.list(limit, offset, select, search, WhereConditions, relation, count);
        if (zoneList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get all zone List',
                data: classToPlain(zoneList),
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'unable to get zone List',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // delete Zone API
    /**
     * @api {delete} /api/zone/delete-zone/:id Delete Zone API
     * @apiGroup Zone
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "zoneId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Zone.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/zone/delete-zone/:id
     * @apiErrorExample {json} Zone error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-zone/:id')
    @Authorized()
    public async deleteZone(@Param('id')id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const zone = await this.zoneService.findOne({
            where: {
                zoneId: id,
            },
        });
        if (!zone) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid zoneId',
            };
            return response.status(400).send(errorResponse);
        }

        const deleteZone = await this.zoneService.delete(zone);
        console.log('zone' + deleteZone);
        if (deleteZone) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted Zone',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete zone',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
