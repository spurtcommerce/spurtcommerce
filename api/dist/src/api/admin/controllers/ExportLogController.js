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
            newExportLog.createdBy = params.createdBy;
            const createNewExport = yield this.exportLogService.create(newExportLog);
            return createNewExport;
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
     *      "message": "Successfully got the list !!"
     * },
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/export-log
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal server error
     */
    listExportLog(limit, offset, moduleName, userId, createdDate, count, keyword, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const whereConditions = [];
            const search = [];
            if (userId !== '') {
                search.push({ name: 'createdBy', value: +userId, op: 'where' });
            }
            if (createdDate !== '') {
                search.push({ name: 'createdDate', value: createdDate, op: 'like' });
            }
            if (moduleName !== '') {
                search.push({ name: 'module', value: moduleName, op: 'where' });
            }
            const siteMapList = yield this.exportLogService.list(limit, offset, [], ['user'], whereConditions, search, keyword, count);
            const message = count ? 'Successfully got the export log count !!' : 'Successfully got the export log list !!';
            return response.status(200).send({ status: 1, message, data: siteMapList });
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Get)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('moduleName')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('userId')),
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