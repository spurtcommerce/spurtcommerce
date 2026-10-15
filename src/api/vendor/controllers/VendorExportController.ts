/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { JsonController, Get, Req, Res, QueryParam, Authorized } from 'routing-controllers';
import { ExportLogService } from '../../core/services/ExportLogService';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-export-log')
export class VendorExportLogController {
    constructor(
        private exportLogService: ExportLogService
    ) { }

    /**
     * @api {get} /api/vendor-export-log List Vendor Export Logs
     * @apiGroup Vendor Export Log
     * @apiName VendorExportLogList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {Number} [limit] Number of records to return
     * @apiQuery {Number} [offset] Pagination offset
     * @apiQuery {String} [moduleName] Filter by exported module name
     * @apiQuery {String} [createdDate] Filter by export date
     * @apiQuery {Number} [count] Return count only if 1
     * @apiQuery {String} [keyword] Keyword search
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got the export log list !!",
     *         "data": [
     *             {
     *                 "id": 1,
     *                 "module": "Product",
     *                 "recordAvailable": 10,
     *                 "createdDate": "2024-01-01T00:00:00.000Z",
     *                 "vendorUserName": "Vendor User"
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
     * @apiSampleRequest /api/vendor-export-log
     */
    @Authorized(['vendor', 'list-export-data'])
    @Get()
    public async listExportLog(
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('moduleName') moduleName: string,
        @QueryParam('createdDate') createdDate: string,
        @QueryParam('count') count: number | boolean,
        @QueryParam('keyword') keyword: string,
        @Req() request: any,
        @Res() response: any
    ): Promise<any> {
        const select = [
            'exportLog.id as id',
            'exportLog.module as module',
            'exportLog.exportId as exportId',
            'exportLog.title as title',
            'exportLog.productType as productType',
            'exportLog.recordAvailable as recordAvailable',
            'exportLog.createdDate as createdDate',
            'exportLog.createdBy as createdBy',
            `(SELECT v.first_name From vendor_users v WHERE v.id = ${request.user.id} ) as vendorUserName`,
        ];

        const searchConditions = [];
        const whereconditions = [
            {
                name: 'exportLog.tenantId',
                op: 'where',
                value: request.user.tenantId,
            },
        ];

        if (moduleName && moduleName !== '') {
            searchConditions.push(
                {
                    name: ['exportLog.module'],
                    value: moduleName,
                });
        }

        if (createdDate && createdDate !== '') {
            searchConditions.push(
                {
                    name: ['exportLog.createdDate'],
                    value: createdDate,
                });
        }
        if (keyword && keyword !== '') {
            searchConditions.push(
                {
                    name: [
                        'exportLog.title',
                    ],
                    value: keyword,
                });
        }
        const sort = [
            {
                name: 'exportLog.createdDate',
                order: 'DESC',
            },
        ];

        const siteMapList = await this.exportLogService.listByQueryBuilder(limit, offset, select, whereconditions, searchConditions, [], [], sort, count, true);
        const message = count ? 'Successfully got the export log count' : 'Successfully got the export log list';

        return response.status(200).send({ status: 1, message, data: siteMapList });
    }

}
