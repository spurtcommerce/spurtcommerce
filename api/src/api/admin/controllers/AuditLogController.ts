/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import moment from 'moment';
import 'reflect-metadata';
import {
    Authorized,
    BodyParam,
    Get,
    JsonController,
    Post,
    QueryParam,
    Req,
    Res,
} from 'routing-controllers';
import { AuditLogService } from '../../core/services/AuditLogService';

@JsonController('/auditlog')
export class AdminAuditLogController {
    constructor(private auditLogService: AuditLogService) {
    }
    /**
     * @api {get} /api/auditlog/auditLog-list Audit Log list API
     * @apiGroup Audit Log
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} module module
     * @apiParam (Request body) {String} actionBy actionBy
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Successfully get Attribute Group list API",
     *      "data": [{
     *              "createdBy": "",
     *              "createdDate": "",
     *              "modifiedBy": "",
     *              "modifiedDate": "",
     *              "auditLogId": 1,
     *              "userId": 1,
     *              "userName": "'""
     *              "method": "",
     *              "requestUrl": "",
     *              "object": "",
     *              "logType": "",
     *              "description": "",
     *              "params": "{}",
     *              "browserInfo": {
     *                 "ip": 127.0.0.1,
     *                 "browser": ""
     *                },
     *              "module": ""
     *              }]
     * }
     * @apiSampleRequest /api/auditlog/auditLog-list
     * @apiErrorExample {json} Attribute Group error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/auditLog-list')
    // @Authorized(['admin', 'audit-log'])
    public async auditLogList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('module') module: string, @QueryParam('actionBy') actionBy: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = [];
        const search = [];
        const whereCondition = [];
        const sort = [{
            name: 'created_date',
            order: 'DESC',
        }];
        if (keyword) {
            const data: any = keyword.split(' ');
            const today = new Date();
            if (data[1] === 'days') {
                today.setDate(today.getDate() - data[0]);
                const date = moment(today).format('YYYY-MM-DD');
                whereCondition.push({
                    name: 'created_date',
                    op: 'moreThan',
                    value: date,
                });
            }
            if (data[1] === 'month') {
                today.setMonth(today.getMonth() - data[0]);
                const month =  moment(today).format('YYYY-MM-DD');
                whereCondition.push({
                    name: 'created_date',
                    op: 'moreThan',
                    value: month,
                });
            }
        }
        if (module) {
            whereCondition.push({
                name: 'AuditLog.module',
                op: 'LIKE',
                value: module,
            });
        }
        if (actionBy && actionBy !== '') {
            whereCondition.push ({
                name: 'AuditLog.userId',
                op: 'where',
                value: actionBy,
            });
        }
        const auditLog: any = await this.auditLogService.listByQueryBuilder(limit, offset, select, whereCondition, search, [], 0, sort, count);
        if (count) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got a audit log count',
                data: auditLog,
            };
            return response.status(200).send(successResponse);
        } else {
            const log = await auditLog.map(async (value: any) => {
                value.browserInfo = JSON.parse(value.browserInfo);
                const temp = value;
                return temp;
            });
            const result = await Promise.all(log);
            const successResponse: any = {
                status: 1,
                message: 'Successfully got a audit log list',
                data: result,
            };
            return response.status(200).send(successResponse);
        }
    }
    /**
     * @api {get} /api/auditlog/module-list Module Log list API
     * @apiGroup Audit Log
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Successfully get Attribute Group list API",
     *      "data": [{
     *                "module": ""
     *              }]
     * }
     * @apiSampleRequest /api/auditlog/module-list
     * @apiErrorExample {json} Attribute Group error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/module-list')
    @Authorized()
    public async moduleList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['MAX(AuditLog.module) as module'];
        const search = [];
        const whereCondition = [];
        const sort = [{
            name: 'MAX(created_date)',
            order: 'DESC',
        }];
        const groupBy = [
            {
                name: 'AuditLog.module',
            },
        ];
        const moduleLog = await this.auditLogService.listByQueryBuilder(limit, offset, select, whereCondition, search, [], groupBy, sort, count);
        if (count) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got a module log count',
                data: moduleLog,
            };
            return response.status(200).send(successResponse);
        } else {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got a module log list',
                data: moduleLog,
            };
            return response.status(200).send(successResponse);
        }
    }

    /**
     * @api {post} /api/auditlog/delete-auditlog Delete Audit Log API
     * @apiGroup Audit Log
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} fromDate createdDate
     * @apiParam (Request body) {String} toDate createddate
     * @apiParamExample {json} Input
     * {
     *  "fromDate" : "",
     *  "toDate" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Audit logs",
     * "status": "1"
     * }
     * @apiSampleRequest /api/auditlog/delete-auditlog
     * @apiErrorExample {json} AuditLog error
     * HTTP/1.1 500 Internal Server Error
     */
     @Post('/delete-auditlog')
     @Authorized()
     public async deleteAuditLog(@BodyParam('fromDate') fromDate: string, @BodyParam('toDate') toDate: string, @Req() request: any, @Res() response: any): Promise<any> {
        if (fromDate === '' || toDate === '') {
            const errorResponse: any = {
                status: 0,
                message: 'Dates should not be empty',
            };
            return response.status(400).send(errorResponse);
        }
        const startDate = fromDate + ' 00:00:00';
        const endDate = toDate + ' 23:59:59';
        const deleteLog: any = await this.auditLogService.findAuditLogData(startDate, endDate);
        if (deleteLog.length === 0) {
            const errorResponse: any = {
                status: 0,
                message: 'Data not found.',
            };
            return response.status(400).send(errorResponse);
        }
        await this.auditLogService.delete(deleteLog);
        return response.status(200).send({
            status: 1,
            message: 'Successfully deleted Audit logs',
        });
    }
}
