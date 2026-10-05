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

    // List the site map
    /**
     * @api {Get} /api/vendor-export-log Export log list
     * @apiGroup Vendr Export Log
     * @apiHeader {string} Authorization
     * @apiParam (Request body) {String} moduleName moduleName
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} userId userId
     * @apiParam (Request body) {Number} count count
     * @apiParam (Request body) {String} createdDate createdDate
     * @apiParam (Request body) {String} keyword keyword
     * @apiSuccessExample {json} Success
     * {
     *      "status": "1",
     *      "message": "Successfully got the export log list !!",
     *      "data": [{
     *                  {
     *                       id: 1,
     *                       module: "User Management",
     *                       recordAvailable: 5,
     *                       createdDate: "",
     *                       "referenceType":"",
     *                       "tenantId":"",
     *                       "vendorName":""
     *                      }
     *                   }
     * }]
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/vendor-export-log
     * @apiErrorExample {json} listExportLog Error
     * HTTP/1.1 500 Internal server errorlistExportLog
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
