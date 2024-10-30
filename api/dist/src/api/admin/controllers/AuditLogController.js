"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuditLogController = void 0;
const tslib_1 = require("tslib");
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
const moment_1 = tslib_1.__importDefault(require("moment"));
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const AuditLogService_1 = require("../../core/services/AuditLogService");
let AdminAuditLogController = class AdminAuditLogController {
    constructor(auditLogService) {
        this.auditLogService = auditLogService;
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
    auditLogList(limit, offset, keyword, module, actionBy, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const search = [];
            const whereCondition = [];
            const sort = [{
                    name: 'created_date',
                    order: 'DESC',
                }];
            if (keyword) {
                const data = keyword.split(' ');
                const today = new Date();
                if (data[1] === 'days') {
                    today.setDate(today.getDate() - data[0]);
                    const date = (0, moment_1.default)(today).format('YYYY-MM-DD');
                    whereCondition.push({
                        name: 'created_date',
                        op: 'moreThan',
                        value: date,
                    });
                }
                if (data[1] === 'month') {
                    today.setMonth(today.getMonth() - data[0]);
                    const month = (0, moment_1.default)(today).format('YYYY-MM-DD');
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
                whereCondition.push({
                    name: 'AuditLog.userId',
                    op: 'where',
                    value: actionBy,
                });
            }
            const auditLog = yield this.auditLogService.listByQueryBuilder(limit, offset, select, whereCondition, search, [], 0, sort, count);
            if (count) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got a audit log count',
                    data: auditLog,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const log = yield auditLog.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    value.browserInfo = JSON.parse(value.browserInfo);
                    const temp = value;
                    return temp;
                }));
                const result = yield Promise.all(log);
                const successResponse = {
                    status: 1,
                    message: 'Successfully got a audit log list',
                    data: result,
                };
                return response.status(200).send(successResponse);
            }
        });
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
    moduleList(limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            const moduleLog = yield this.auditLogService.listByQueryBuilder(limit, offset, select, whereCondition, search, [], groupBy, sort, count);
            if (count) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got a module log count',
                    data: moduleLog,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got a module log list',
                    data: moduleLog,
                };
                return response.status(200).send(successResponse);
            }
        });
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
    deleteAuditLog(fromDate, toDate, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (fromDate === '' || toDate === '') {
                const errorResponse = {
                    status: 0,
                    message: 'Dates should not be empty',
                };
                return response.status(400).send(errorResponse);
            }
            const startDate = fromDate + ' 00:00:00';
            const endDate = toDate + ' 23:59:59';
            const deleteLog = yield this.auditLogService.findAuditLogData(startDate, endDate);
            if (deleteLog.length === 0) {
                const errorResponse = {
                    status: 0,
                    message: 'Data not found.',
                };
                return response.status(400).send(errorResponse);
            }
            yield this.auditLogService.delete(deleteLog);
            return response.status(200).send({
                status: 1,
                message: 'Successfully deleted Audit logs',
            });
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/auditLog-list')
    // @Authorized(['admin', 'audit-log'])
    ,
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('module')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('actionBy')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminAuditLogController.prototype, "auditLogList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/module-list'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminAuditLogController.prototype, "moduleList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/delete-auditlog'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('fromDate')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('toDate')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminAuditLogController.prototype, "deleteAuditLog", null);
AdminAuditLogController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/auditlog'),
    tslib_1.__metadata("design:paramtypes", [AuditLogService_1.AuditLogService])
], AdminAuditLogController);
exports.AdminAuditLogController = AdminAuditLogController;
//# sourceMappingURL=AuditLogController.js.map