/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, JsonController, Authorized, Res, QueryParam } from 'routing-controllers';
import { Service } from 'typedi';
import { ZoneService } from '../../core/services/zoneService';

@Service()
@JsonController('/vendor-zone')
export class VendorZoneController {
    constructor(
        private zoneService: ZoneService
    ) {
        // --
    }

    /**
     * @api {get} /api/zone/zone-list Zone List API
     * @apiGroup Zone
     * @apiHeader {String} Authorization Bearer token
     * @apiParam (Query Parameters) {Number} [limit] Number of records to return
     * @apiParam (Query Parameters) {Number} [offset] Number of records to skip
     * @apiParam (Query Parameters) {String} [keyword] Keyword to search
     * @apiParam (Query Parameters) {String} [status] Filter by status (e.g. 'active' or 'inactive')
     * @apiParam (Query Parameters) {Number|Boolean} [count] Return count only (if true or 1)
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "message": "Successfully get zone list",
     *   "data": [
     *     {
     *       "createdDate": "2019-02-17T16:47:49.000Z",
     *       "zoneId": 59,
     *       "code": "MUM",
     *       "name": "Mumbai",
     *       "isActive": 1,
     *       "country": {
     *         "countryId": 99,
     *         "name": "India",
     *         "isoCode2": "IN",
     *         "isoCode3": "IND",
     *         "addressFormat": "",
     *         "postcodeRequired": 1,
     *         "isActive": 1
     *       }
     *     }
     *   ],
     *   "status": "1"
     * }
     * @apiSampleRequest /api/zone/zone-list
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "message": "Internal Server Error"
     * }
     */
    @Get()
    @Authorized(['vendor', 'list-setting-localization'])
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
}
