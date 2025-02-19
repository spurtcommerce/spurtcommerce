"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorExportLogController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const ExportLogService_1 = require("../../core/services/ExportLogService");
const ExportLog_1 = require("../../core/models/ExportLog");
let VendorExportLogController = class VendorExportLogController {
    constructor(exportLogService) {
        this.exportLogService = exportLogService;
    }
    // Create export log
    createExportLog(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newExportLog = new ExportLog_1.ExportLog();
            newExportLog.module = params.module;
            newExportLog.recordAvailable = params.recordAvailable;
            newExportLog.referenceId = params.referenceId;
            newExportLog.referenceType = 2;
            const createNewExport = yield this.exportLogService.create(newExportLog);
            return createNewExport;
        });
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
    listExportLog(limit, offset, moduleName, createdDate, count, keyword, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            if (keyword && keyword !== '') {
                searchConditions.push({
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
            const siteMapList = yield this.exportLogService.listByQueryBuilder(limit, offset, select, whereconditions, searchConditions, [], [], sort, count, true);
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
], VendorExportLogController.prototype, "addExportLog", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Authorized)('vendor'),
    (0, routing_controllers_1.Get)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('moduleName')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('createdDate')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(6, (0, routing_controllers_1.Req)()),
    tslib_1.__param(7, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Object, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorExportLogController.prototype, "listExportLog", null);
VendorExportLogController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/vendor-export-log'),
    tslib_1.__metadata("design:paramtypes", [ExportLogService_1.ExportLogService])
], VendorExportLogController);
exports.VendorExportLogController = VendorExportLogController;
//# sourceMappingURL=VendorExportController.js.map