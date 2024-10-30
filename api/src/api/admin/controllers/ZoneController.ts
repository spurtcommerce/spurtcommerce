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
    QueryParam,
    Param
} from 'routing-controllers';
import { ZoneService } from '../../core/services/zoneService';
import { CountryService } from '../../core/services/CountryService';
import { Zone } from '../../core/models/Zone';
import { CreateZone } from './requests/CreateZoneRequest';
import { instanceToPlain } from 'class-transformer';
import { Not } from 'typeorm';

@JsonController('/zone')
export class ZoneController {
    constructor(
        private zoneService: ZoneService,
        private countryService: CountryService) {
    }

    // create zone API
    /**
     * @api {post} /api/zone Add Zone API
     * @apiGroup Zone
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} countryId Zone countryId
     * @apiParam (Request body) {String{..30}} code Zone code
     * @apiParam (Request body) {String{..128}} name Zone name
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
     *      "data": {
     *          "countryId": "",
     *          "code": "",
     *          "name": "",
     *          "isActive": "",
     *          "createdDate": "",
     *          "zoneId": ""
     *      },
     * }
     * @apiSampleRequest /api/zone
     * @apiErrorExample {json} Zone error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized(['admin', 'create-zone'])
    public async addZone(@Body({ validate: true }) zoneParam: CreateZone, @Res() response: any): Promise<any> {
        const country = await this.countryService.findOne({
            where: {
                countryId: zoneParam.countryId,
            },
        });
        if (!country) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid country Id',
            };
            return response.status(400).send(errorResponse);
        }
        const existZone = await this.zoneService.findOne({
            where: {
                name: zoneParam.name,
                code: zoneParam.code,
            },
        });
        if (existZone) {
            const errorResponse: any = {
                status: 0,
                message: 'Zone with same name already exists',
            };
            return response.status(400).send(errorResponse);
        }
        const zoneCode = await this.zoneService.findOne({
            where: {
                code: zoneParam.code,
            },
        });
        if (zoneCode) {
            return response.status(400).send({
                status: 0,
                message: 'Zone with same name already exists',
            });
        }
        const zoneName = await this.zoneService.find({ select: ['name'] });
        for (const zone of zoneName) {
            if (zoneParam.name.toLowerCase() === zone.name.toLowerCase()) {
                const errorResponse = {
                    status: 0,
                    message: 'Zone with same name already exists',
                };
                return response.status(400).send(errorResponse);
            }
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
                message: 'Successfully created a new zone',
                data: zoneSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create a zone',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // update Zone API
    /**
     * @api {put} /api/zone/:id Update Zone API
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
     *      "data": {
     *          "countryId": "",
     *          "code": "",
     *          "name": "",
     *          "isActive": "",
     *          "createdDate": "",
     *          "zoneId": ""
     *      },
     * }
     * @apiSampleRequest /api/zone/:id
     * @apiErrorExample {json} Zone error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    @Authorized(['admin', 'edit-zone'])
    public async updateZone(@Param('id') id: number, @Body({ validate: true }) zoneParam: CreateZone, @Res() response: any): Promise<any> {
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
                    message: 'Invalid country Id',
                };
                return response.status(400).send(errorResponse);
            }
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid zone Id',
            };
            return response.status(400).send(errorResponse);
        }
        const existZone = await this.zoneService.findOne({
            where: {
                name: zoneParam.name,
                code: zoneParam.code,
                zoneId: Not(zone.zoneId),
            },
        });
        if (existZone) {
            const errorResponse: any = {
                status: 0,
                message: 'Zone with same name already exists',
            };
            return response.status(400).send(errorResponse);
        }
        const zoneCode = await this.zoneService.findOne({
            where: {
                code: zoneParam.code,
                zoneId: Not(zone.zoneId),
            },
        });
        if (zoneCode) {
            return response.status(400).send({
                status: 0,
                message: 'Zone with same name already exists',
            });
        }
        const zoneName = await this.zoneService.find({ select: ['name'], where: { zoneId: Not(id) } });
        for (const state of zoneName) {
            if (zoneParam.name.toLowerCase() === state.name.toLowerCase()) {
                const errorResponse = {
                    status: 0,
                    message: 'Zone with same name already exists',
                };
                return response.status(400).send(errorResponse);
            }
        }
        zone.countryId = zoneParam.countryId;
        zone.code = zoneParam.code;
        zone.name = zoneParam.name;
        zone.isActive = zoneParam.status;
        const zoneSave = await this.zoneService.create(zone);
        if (zoneSave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the zone',
                data: zoneSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the zone',
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
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get zone list",
     *      "data":[{
     *                "createdDate": "2019-02-17T16:47:49.000Z",
     *                "zoneId": 59,
     *                "code": "MUM",
     *                "name": "Mumbai",
     *                "isActive": 1,
     *                "country": {
     *                  "countryId": 99,
     *                  "name": "India",
     *                  "isoCode2": "IN",
     *                  "isoCode3": "IND",
     *                  "addressFormat": "",
     *                  "postcodeRequired": 1,
     *                  "isActive": 1
     *                }
     *              },
     *      "status": "1"
     * }
     * @apiSampleRequest /api/zone
     * @apiErrorExample {json} Zone error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized()
    public async zonelist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('status') status: string, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = [];
        const relation = [];
        relation.push({
            op: 'inner-select',
            tableName: 'Zone.country',
            aliasName: 'Country',
        });
        const searchConditions = [];
        if (keyword?.trim()) {
            searchConditions.push({
                name: ['Zone.name', 'Zone.code', 'Country.name'],
                value: keyword,
            });
        }

        const WhereConditions = [];
        if (status) {
            WhereConditions.push({
                op: 'where',
                name: 'Zone.isActive',
                value: status,
            });
        }
        // if (count) {
        //     const zoneCount = await this.zoneService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relation, [], [], true, false);
        //     return response.status(200).send({
        //         status: 1,
        //         message: 'Successfully got Zone list count',
        //         data: zoneCount,
        //     });
        // }
        if (count) {
            const zoneCount = await this.zoneService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relation, [], [], true, false);
            const successResponse: any = {
                status: 1,
                message: 'Successfully got all language count',
                data: zoneCount,
            };
            return response.status(200).send(successResponse);
        }
        const zoneList = await this.zoneService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relation, [], [], false, false);
        if (zoneList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get all zone list',
                data: instanceToPlain(zoneList),
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'Unable to get zone list',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // delete Zone API
    /**
     * @api {delete} /api/zone/:id Delete Zone API
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
     * @apiSampleRequest /api/zone/:id
     * @apiErrorExample {json} Zone error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized(['admin', 'delete-zone'])
    public async deleteZone(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const zone = await this.zoneService.findOne({
            where: {
                zoneId: id,
            },
        });
        if (!zone) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid zone Id',
            };
            return response.status(400).send(errorResponse);
        }

        const deleteZone = await this.zoneService.delete(zone);
        if (deleteZone) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the Zone',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the zone',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
