"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorePageController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const PageService_1 = require("../../core/services/PageService");
const PageGroupService_1 = require("../../core/services/PageGroupService");
const PageGroupTranslationService_1 = require("../../core/services/PageGroupTranslationService");
const TranslationMiddleware_1 = require("../../core/middlewares/TranslationMiddleware");
const typedi_1 = require("typedi");
let StorePageController = class StorePageController {
    constructor(pageService, pageGroupService, pageGroupTranslationService) {
        this.pageService = pageService;
        this.pageGroupService = pageGroupService;
        this.pageGroupTranslationService = pageGroupTranslationService;
    }
    // Page List API
    /**
     * @api {get} /api/pages Page List API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiHeader {number} languageId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get page list",
     *      "status": "1",
     *      "data": [
     *                {
     *                  "createdBy": "",
     *                  "createdDate": "",
     *                  "modifiedBy": "",
     *                  "modifiedDate": "",
     *                  "groupId": "",
     *                  "groupName": "",
     *                  "isActive": "",
     *                  "page": [
     *                             {
     *                                "createdBy": ,
     *                                "createdDate": "",
     *                                "modifiedBy": "",
     *                                "modifiedDate": "",
     *                                "pageId": "",
     *                                "title": "",
     *                                "intro": "",
     *                                "content": "",
     *                                "pageGroupId": "",
     *                                "sortOrder": "",
     *                                "slugName": "",
     *                                "viewPageCount": "",
     *                                "isActive": "",
     *                                "pageTranslation": {}
     *                                 }
     *                              ],
     *                   "groupNameTrans": ""
     *              }
     *          ]
     * }
     * @apiSampleRequest /api/pages
     * @apiErrorExample {json} pageFront error
     * HTTP/1.1 500 Internal Server Error
     */
    pageList(limit, offset, keyword, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const search = [
                {
                    name: ['pageGroup.isActive'],
                    value: '1',
                },
                {
                    name: ['page.isActive'],
                    value: '1',
                },
            ];
            if (keyword) {
                search.push({
                    name: ['page.title'],
                    value: '1',
                });
            }
            const WhereConditions = [];
            const relations = [];
            relations.push({
                tableName: 'pageGroup.page',
                aliasName: 'page',
                op: 'left',
            });
            relations.push({
                tableName: 'page.pageTranslation',
                aliasName: 'pageTranslation',
                op: 'left',
            });
            const pageGroupList = yield this.pageGroupService.listByQueryBuilder(limit, offset, select, WhereConditions, search, relations, [], [], false, false);
            const promise = pageGroupList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const temp = result;
                const pagegroup = yield this.pageGroupTranslationService.findOne({
                    select: ['groupName'],
                    where: { pageGroupId: result.groupId, languageId: (_a = request.languageId) !== null && _a !== void 0 ? _a : 0 },
                });
                temp.page.map((item) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    var _a;
                    item.pageTranslation = (_a = item.pageTranslation.find(data => { var _a; return data.languageId === ((_a = request.languageId) !== null && _a !== void 0 ? _a : 0); })) !== null && _a !== void 0 ? _a : {};
                    item.content = undefined;
                    return item.pageTranslation;
                }));
                temp.groupNameTrans = (_b = pagegroup === null || pagegroup === void 0 ? void 0 : pagegroup.groupName) !== null && _b !== void 0 ? _b : '';
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully got the group list',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Get Page Detail API
    /**
     * @api {get} /api/:slugName Page Details API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiHeader {number} languageId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get page Details",
     *      "data": {
     *                "createdBy": "",
     *                "createdDate": "",
     *                "modifiedBy": "",
     *                "modifiedDate": "",
     *                "pageId": "",
     *                "title": "",
     *                "intro": "",
     *                "content": "",
     *                "pageGroupId": "",
     *                "sortOrder": "",
     *                "slugName": "",
     *                "viewPageCount": "",
     *                "isActive": "",
     *                "pageTranslation": {}
     *             }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/pages/:slugName
     * @apiErrorExample {json} page error
     * HTTP/1.1 500 Internal Server Error
     */
    pageDetails(slugName, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const page = yield this.pageService.findOne({
                where: {
                    slugName,
                    isActive: 1,
                },
            });
            if (!page) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid page',
                };
                return response.status(200).send(errorResponse);
            }
            const select = [];
            const search = [];
            const WhereConditions = [
                {
                    name: 'page.pageId',
                    op: 'where',
                    value: page.pageId,
                },
            ];
            const relations = [];
            relations.push({
                tableName: 'page.pageTranslation',
                aliasName: 'pageTranslation',
                op: 'left',
            });
            const getPageDetail = yield this.pageService.listByQueryBuilder(0, 0, select, WhereConditions, search, relations, [], [], false, false);
            const pageDetail = yield Promise.all(getPageDetail.map((item) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _a;
                const temp = item;
                temp.pageTranslation = (_a = item.pageTranslation.find((data) => { var _a; return data.languageId === ((_a = request.languageId) !== null && _a !== void 0 ? _a : 0); })) !== null && _a !== void 0 ? _a : {};
                return temp;
            })));
            if (pageDetail) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully get page details',
                    data: pageDetail,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to get page details',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
};
exports.StorePageController = StorePageController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.UseBefore)(TranslationMiddleware_1.TranslationMiddleware),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StorePageController.prototype, "pageList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:slugName'),
    (0, routing_controllers_1.UseBefore)(TranslationMiddleware_1.TranslationMiddleware),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('slugName')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StorePageController.prototype, "pageDetails", null);
exports.StorePageController = StorePageController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/pages'),
    tslib_1.__metadata("design:paramtypes", [PageService_1.PageService,
        PageGroupService_1.PageGroupService,
        PageGroupTranslationService_1.PageGroupTranslationService])
], StorePageController);
//# sourceMappingURL=PageController.js.map