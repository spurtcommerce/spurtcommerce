"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageGroupTranslationController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const PageGroupTranslationRequest_1 = require("./requests/PageGroupTranslationRequest");
const PageGroupService_1 = require("../../core/services/PageGroupService");
const PageGroupTranslationService_1 = require("../../core/services/PageGroupTranslationService");
const PageGroupTranslation_1 = require("../../core/models/PageGroupTranslation");
const typeorm_1 = require("typeorm");
let PageGroupTranslationController = class PageGroupTranslationController {
    constructor(pageGroupService, pageGroupTranslationService) {
        this.pageGroupService = pageGroupService;
        this.pageGroupTranslationService = pageGroupTranslationService;
    }
    // Create Page Group Translation
    /**
     * @api {post} /api/page-group-translation/page-group/:id Add Page Group Translation API
     * @apiGroup Page-Group-Translation
     * @apiParam (Request body) {Number} languageId language id
     * @apiParam (Request body) {String{..255}} groupName group name
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "pageGroupTranslation": [
     *          {
     *              "languageId" : "",
     *              "groupName" : ""
     *          }
     *       ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New page group translation is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-group-translation/page-group/:id
     * @apiErrorExample {json} Add Page Group Translation Error
     * HTTP/1.1 500 Internal Server Error
     */
    createPageGroupTranslation(payload, GroupId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const getPageGroup = yield this.pageGroupService.findOne(GroupId);
            if (!getPageGroup) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid page group id',
                };
                return response.status(400).send(errorResponse);
            }
            for (const data of payload.pageGroupTranslation) {
                const getPageGroupTranslation = yield this.pageGroupTranslationService.findOne({
                    where: {
                        pageGroupId: GroupId,
                        languageId: data.languageId,
                    },
                });
                const newPageGroupTranslation = new PageGroupTranslation_1.PageGroupTranslation();
                if (getPageGroupTranslation) {
                    newPageGroupTranslation.id = getPageGroupTranslation.id;
                }
                newPageGroupTranslation.pageGroupId = GroupId;
                newPageGroupTranslation.languageId = data.languageId;
                newPageGroupTranslation.groupName = data.groupName;
                yield this.pageGroupTranslationService.create(newPageGroupTranslation);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully created new page group translation',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Page Group Translation List
    /**
     * @api {get} /api/page-group-translation/page-group Page Group Translation List API
     * @apiGroup Page-Group-Translation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got page group translation list",
     *      "data": " [{
     *                  "groupId": 26,
     *                  "groupName": "New page Group",
     *                  "isActive": 0
     *                  }]"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-group-translation/page-group
     * @apiErrorExample {json} Page Group List Error
     * HTTP/1.1 500 Internal Server Error
     */
    PageGroupTranslationList(response, limit, offset, keyword, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const condition = {};
            condition.relations = ['pageGroupTranslation'];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                condition.where = {
                    groupName: (0, typeorm_1.Like)(`%${keyword}%`),
                };
            }
            if (limit) {
                condition.take = limit;
                if (offset) {
                    condition.skip = offset;
                }
            }
            condition.order = { createdDate: 'DESC' };
            const getPageGroupTranslation = yield this.pageGroupService.findAll(condition);
            const successResponse = {
                status: 1,
                message: 'Successfully got page group translation list',
                data: count ? getPageGroupTranslation.length : getPageGroupTranslation.map((pageGroup) => {
                    pageGroup.lastModifieDate = new Date(Math.max(...pageGroup.pageGroupTranslation.map(e => new Date(e.modifiedDate))));
                    return pageGroup;
                }),
            };
            return response.status(200).send(successResponse);
        });
    }
    // Page Group Translation Detail
    /**
     * @api {get} /api/page-group-translation/page-group/:id Page Group Translation Detail API
     * @apiGroup Page-Group-Translation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got page group translation detail",
     *      "data": "{
     *               "createdBy": null,
     *               "createdDate": "2023-11-23T13:36:31.000Z",
     *               "modifiedBy": null,
     *               "modifiedDate": "2024-05-22T05:59:54.000Z",
     *               "groupId": 1,
     *               "groupName": "Policy",
     *               "isActive": 0,
     *               "pageGroupTranslation": [
     *                 {
     *                   "createdBy": null,
     *                   "createdDate": "2024-05-17T12:49:08.000Z",
     *                   "modifiedBy": null,
     *                   "modifiedDate": "2024-05-17T12:49:08.000Z",
     *                   "id": 1,
     *                   "groupName": "Policy",
     *                   "pageGroupId": 1,
     *                   "languageId": 57
     *                 }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-group-translation/page-group/:id
     * @apiErrorExample {json} Page Group Translation Detail Rrror
     * HTTP/1.1 500 Internal Server Error
     */
    PageGroupTranslationDetail(groupId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const getPageGroupTranslation = yield this.pageGroupService.findOne({
                where: {
                    groupId: `${groupId}`,
                },
                relations: ['pageGroupTranslation'],
            });
            if (!getPageGroupTranslation) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid page group id',
                };
                return response.status(400).send(errorResponse);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got page Group translation detail',
                data: getPageGroupTranslation,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/page-group/:id'),
    (0, routing_controllers_1.Authorized)(['admin']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [PageGroupTranslationRequest_1.CreatePageGroupTranslationDTO, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PageGroupTranslationController.prototype, "createPageGroupTranslation", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/page-group'),
    (0, routing_controllers_1.Authorized)(['admin']),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, Number, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], PageGroupTranslationController.prototype, "PageGroupTranslationList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/page-group/:id'),
    (0, routing_controllers_1.Authorized)(['admin']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PageGroupTranslationController.prototype, "PageGroupTranslationDetail", null);
PageGroupTranslationController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/page-group-translation'),
    tslib_1.__metadata("design:paramtypes", [PageGroupService_1.PageGroupService,
        PageGroupTranslationService_1.PageGroupTranslationService])
], PageGroupTranslationController);
exports.PageGroupTranslationController = PageGroupTranslationController;
//# sourceMappingURL=PageGroupTranslationController.js.map