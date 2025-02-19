"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportLogController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const ExportLogService_1 = require("../../core/services/ExportLogService");
const ExportLog_1 = require("../../core/models/ExportLog");
let ExportLogController = class ExportLogController {
    constructor(exportLogService) {
        this.exportLogService = exportLogService;
    }
    // Create export log
    createExportLog(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newExportLog = new ExportLog_1.ExportLog();
            newExportLog.module = params.module;
            newExportLog.recordAvailable = params.recordAvailable;
            newExportLog.referenceType = 1;
            newExportLog.referenceId = params.referenceId;
            const createNewExport = yield this.exportLogService.create(newExportLog);
            return createNewExport;
        });
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
    addExportLog(params, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const createLog = yield this.createExportLog(params);
                return response.status(200).send({
                    status: 1,
                    message: 'Export log created successfully',
                    data: createLog,
                });
            }
            catch (error) {
                return response.status(400).send({
                    status: 0,
                    message: 'Failed to create export log',
                });
            }
        });
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
    listExportLog(limit, offset, moduleName, user, createdDate, count, keyword, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                searchConditions.push({
                    name: ['exportLog.module'],
                    value: moduleName,
                });
            }
            if (createdDate && createdDate !== '') {
                searchConditions.push({
                    name: ['exportLog.createdDate'],
                    value: createdDate,
                });
            }
            if (user && user !== '') {
                searchConditions.push({
                    name: [
                        '(SELECT first_name FROM users WHERE exportLog.reference_type = 1 AND user_id = exportLog.referenceId)',
                        '(SELECT c.first_name From vendor v LEFT JOIN customer c ON v.customer_id = c.id WHERE exportLog.reference_type = 2 AND v.vendor_id =  exportLog.referenceId)',
                    ],
                    value: user,
                });
            }
            if (keyword && keyword !== '') {
                searchConditions.push({
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
            const siteMapList = yield this.exportLogService.listByQueryBuilder(limit, offset, select, [], searchConditions, [], [], sort, count, true);
            const message = count ? 'Successfully got the export log count' : 'Successfully got the export log list';
            return response.status(200).send({ status: 1, message, data: siteMapList });
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExportLogController.prototype, "addExportLog", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('moduleName')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('user')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('createdDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(7, (0, routing_controllers_1.Req)()),
    tslib_1.__param(8, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExportLogController.prototype, "listExportLog", null);
ExportLogController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/export-log'),
    tslib_1.__metadata("design:paramtypes", [ExportLogService_1.ExportLogService])
], ExportLogController);
exports.ExportLogController = ExportLogController;
//# sourceMappingURL=ExportLogController.js.map