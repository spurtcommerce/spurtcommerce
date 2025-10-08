/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { JsonController, Get, Req, Res, QueryParam, Body, Post } from 'routing-controllers';
import { ExportLogService } from '../../core/services/ExportLogService';
import { ExportLog } from '../../core/models/ExportLog';
import { Service } from 'typedi';

@Service()
@JsonController('/export-log')
export class ExportLogController {
    constructor(
        private exportLogService: ExportLogService
    ) { }

    // Create export log
    public async createExportLog(params: any): Promise<any> {
        const newExportLog = new ExportLog();
        newExportLog.module = params.module;
        newExportLog.recordAvailable = params.recordAvailable;
        newExportLog.referenceType = 1;
        newExportLog.referenceId = params.referenceId;
        const createNewExport = await this.exportLogService.create(newExportLog);
        return createNewExport;
    }

    /**
     * @api {Post} /api/export-log Export log list
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
     * @apiSampleRequest /api/export-log
     * @apiErrorExample {json} Error
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
     * @api {Get} /api/export-log Export log list
     * @apiGroup Export Log
     * @apiHeader {string} Authorization
     * @apiSuccessExample {json} Success
     * {
     *      "status": "1",
     *      "message": "Successfully got the list !!",
     *      "data": {
     *       "id": 1,
     *       "module": "",
     *       "recordAvailable": 1,
     *       "createdDate": "",
     *       "referenceType":"",
     *       "referenceId":"",
     *       "userName":"",
     *       "vendorName":""
     *   }
     * },
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/export-log
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal server error
     */
    // @Authorized()
    @Get()
    public async listExportLog(
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('moduleName') moduleName: string,
        @QueryParam('user') user: string,
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
            'exportLog.referenceType as referenceType',
            'exportLog.referenceId as referenceId',
            '(SELECT first_name as userName FROM users WHERE exportLog.reference_type = 1 AND user_id = referenceId) as userName',
            '(SELECT c.first_name From vendor v LEFT JOIN customer c ON v.customer_id = c.id WHERE exportLog.reference_type = 2 AND v.vendor_id = referenceId) as vendorName',
        ];

        const searchConditions = [];

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
        if (user && user !== '') {
            searchConditions.push(
                {
                    name: [
                        '(SELECT first_name FROM users WHERE exportLog.reference_type = 1 AND user_id = exportLog.referenceId)',
                        '(SELECT c.first_name From vendor v LEFT JOIN customer c ON v.customer_id = c.id WHERE exportLog.reference_type = 2 AND v.vendor_id =  exportLog.referenceId)',
                    ],
                    value: user,
                });
        }
        if (keyword && keyword !== '') {
            searchConditions.push(
                {
                    name: [
                        'exportLog.module',
                        '(SELECT first_name FROM users WHERE exportLog.reference_type = 1 AND user_id = exportLog.referenceId)',
                        '(SELECT c.first_name From vendor v LEFT JOIN customer c ON v.customer_id = c.id WHERE exportLog.reference_type = 2 AND v.vendor_id =  exportLog.referenceId)',
                    ],
                    value: keyword,
                });
        }
        const sort = [];
        sort.push({
            name: 'exportLog.createdDate',
            order: 'DESC',
        });

        const siteMapList = await this.exportLogService.listByQueryBuilder(limit, offset, select, [], searchConditions, [], [], sort, count, true);
        const message = count ? 'Successfully got the export log count' : 'Successfully got the export log list';

        return response.status(200).send({ status: 1, message, data: siteMapList });
    }

}
