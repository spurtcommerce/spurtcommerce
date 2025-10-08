/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { JsonController, Get, Req, Res, QueryParam, Post, Body, Authorized } from 'routing-controllers';
import { ExportLogService } from '../../core/services/ExportLogService';
import { ExportLog } from '../../core/models/ExportLog';
import { Service } from 'typedi';
@Service()
@JsonController('/vendor-export-log')
export class VendorExportLogController {
    constructor(
        private exportLogService: ExportLogService
    ) { }

    // Create export log
    public async createExportLog(params: any): Promise<any> {
        const newExportLog = new ExportLog();
        newExportLog.module = params.module;
        newExportLog.recordAvailable = params.recordAvailable;
        newExportLog.referenceId = params.referenceId;
        newExportLog.referenceType = 2;
        const createNewExport = await this.exportLogService.create(newExportLog);
        return createNewExport;
    }

    /**
     * @api {Post} /api/vendor-export-log Export log list
     * @apiGroup Export Log
     * @apiHeader {string} Authorization
     * @apiParam (Request body) {String} module module
     * @apiParam (Request body) {Number} recordAvailable recordAvailable
     * @apiParam (Request body) {Number} createdBy createdBy
     * @apiSuccessExample {json} Success
     * {
     *      "status": "1",
     *      "message": "Export log created successfully",
     *      "data": {
     *                  "id": 1,
     *                  "module": "",
     *                  "recordAvailable": 1,
     *                  "createdDate": "",
     *                  "createdBy": 1
     *              }
     * },
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/vendor-export-log
     * @apiErrorExample {json} addExportLog Error
     * HTTP/1.1 500 Internal server error
     */
    // Create Export Log
    @Post()
    public async addExportLog(@Body({ validate: true }) params: any, @Res() response: any): Promise<any> {
        try {
            const createLog = await this.createExportLog(params);
            return response.status(200).send({
                status: 1,
                message: 'Export log created successfully',
                data: createLog,
            });
        } catch (error) {
            return response.status(400).send({
                status: 0,
                message: 'Failed to create export log',
            });
        }
    }
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
     *                       "referenceId":"",
     *                       "vendorName":""
     *                      }
     *                   }
     * }]
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/vendor-export-log
     * @apiErrorExample {json} listExportLog Error
     * HTTP/1.1 500 Internal server errorlistExportLog
     */
    @Authorized('vendor')
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
            'exportLog.recordAvailable as recordAvailable',
            'exportLog.createdDate as createdDate',
            `(SELECT c.first_name From vendor v LEFT JOIN customer c ON v.customer_id = c.id WHERE exportLog.reference_type = 2 AND v.vendor_id = ${request.user.vendorId} ) as vendorName`,
        ];

        const searchConditions = [];
        const whereconditions = [{
            name: 'exportLog.referenceId',
            op: 'where',
            value: request.user.vendorId,
        }];

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
                        'exportLog.module',
                    ],
                    value: keyword,
                });
        }
        const sort = [];
        sort.push({
            name: 'exportLog.createdDate',
            order: 'DESC',
        });
        const siteMapList = await this.exportLogService.listByQueryBuilder(limit, offset, select, whereconditions, searchConditions, [], [], sort, count, true);
        const message = count ? 'Successfully got the export log count' : 'Successfully got the export log list';

        return response.status(200).send({ status: 1, message, data: siteMapList });
    }

}
