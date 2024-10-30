"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const Page_1 = require("../../core/models/Page");
const CreatePageRequest_1 = require("./requests/CreatePageRequest");
const PageService_1 = require("../../core/services/PageService");
const UpdatePageRequest_1 = require("./requests/UpdatePageRequest");
const DeletePageRequest_1 = require("./requests/DeletePageRequest");
const PageGroupService_1 = require("../../core/services/PageGroupService");
let PageController = class PageController {
    constructor(pageService, pageGroupService) {
        this.pageService = pageService;
        this.pageGroupService = pageGroupService;
    }
    // Create Page API
    /**
     * @api {post} /api/page Add Page API
     * @apiGroup Page
     * @apiParam (Request body) {String{..255}} title title
     * @apiParam (Request body) {String} content content
     * @apiParam (Request body) {String} pageGroupId pageGroupId
     * @apiParam (Request body) {String} [pageSlug] pageSlug
     * @apiParam (Request body) {Number} active active
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "content" : "",
     *      "pageGroupId" : "",
     *      "pageSlug" : "",
     *      "active" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New page is created successfully",
     *      "status": "1"
     *      "data": {
     *                  "title": "",
     *                  "content": "",
     *                  "isActive": 1,
     *                  "pageGroupId": 1,
     *                  "slugName": "",
     *                  "createdDate": "",
     *                  "pageId": 1
     *               }
     * }
     * @apiSampleRequest /api/page
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    createPage(pageParam, response) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const page = new Page_1.Page();
            page.title = pageParam.title;
            page.content = (_a = pageParam.content) !== null && _a !== void 0 ? _a : '';
            page.isActive = pageParam.active;
            page.pageGroupId = pageParam.pageGroupId;
            const metaTagTitle = pageParam.pageSlug ? pageParam.pageSlug : pageParam.title;
            const slug = metaTagTitle.trim();
            const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            page.slugName = yield this.validate_slug(data);
            const pageSave = yield this.pageService.create(page);
            if (pageSave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully created a new page',
                    data: pageSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create page',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Page List API
    /**
     * @api {get} /api/page Page List API
     * @apiGroup Page
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get page list",
     *      "data": [
     *                  {
     *                     "pageId": 57,
     *                     "title": "About us",
     *                     "content": "",
     *                     "pageGroupId": 4,
     *                     "slugName": "about-us1",
     *                     "isActive": 1,
     *                     "pageGroupName": "Policy"
     *                   }
     *              ]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    pageList(limit, offset, keyword, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const search = [
                {
                    name: 'title',
                    op: 'like',
                    value: keyword,
                }, {
                    name: 'isActive',
                    op: 'like',
                    value: status,
                },
            ];
            const WhereConditions = [];
            const relations = [];
            const pageList = yield this.pageService.list(limit, offset, select, relations, search, WhereConditions, count);
            if (count) {
                const successRes = {
                    status: 1,
                    message: 'Successfully got pages count',
                    data: pageList,
                };
                return response.status(200).send(successRes);
            }
            const promise = pageList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const data = yield this.pageGroupService.findOne({ where: { groupId: result.pageGroupId } });
                const temp = result;
                // temp.content = await this.imageService.escapeChars(temp.content);
                if (data) {
                    temp.pageGroupName = data.groupName;
                }
                else {
                    temp.pageGroupName = '';
                }
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete list of pages',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Update Page API
    /**
     * @api {put} /api/page/:id Update Page API
     * @apiGroup Page
     * @apiParam (Request body) {Number} pageId pageId
     * @apiParam (Request body) {String{..255}} title title
     * @apiParam (Request body) {String} content content
     * @apiParam (Request body) {Number} pageGroupId pageGroupId
     * @apiParam (Request body) {Number} active active
     * @apiParam (Request body) {String} pageSlug pageSlug
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "pageId" : "",
     *      "title" : "",
     *      "content" : "",
     *      "pageGroupId" : "",
     *      "active" : "",
     *      "pageSlug" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " Page is updated successfully",
     *      "status": "1"
     *      "data": {
     *                 "createdBy": 1,
     *                 "createdDate": "",
     *                 "modifiedBy": 1,
     *                 "modifiedDate": "",
     *                 "pageId": 57,
     *                 "title": "",
     *                 "intro": "",
     *                 "content": "",
     *                 "pageGroupId": 2,
     *                 "sortOrder": 1,
     *                 "slugName": "",
     *                 "viewPageCount": 1,
     *                 "isActive": 1
     *              }
     * }
     * @apiSampleRequest /api/page/:id
     * @apiErrorExample {json} updatePage error
     * HTTP/1.1 500 Internal Server Error
     */
    updatePage(pageParam, response) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const page = yield this.pageService.findOne({
                where: {
                    pageId: pageParam.pageId,
                },
            });
            if (!page) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid page id',
                };
                return response.status(400).send(errorResponse);
            }
            page.title = pageParam.title;
            page.content = (_a = pageParam.content) !== null && _a !== void 0 ? _a : '';
            page.isActive = pageParam.active;
            page.pageGroupId = pageParam.pageGroupId;
            const metaTagTitle = pageParam.pageSlug ? pageParam.pageSlug : pageParam.title;
            const slug = metaTagTitle.trim();
            const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            page.slugName = yield this.validate_slug(data, pageParam.pageId);
            const pageSave = yield this.pageService.create(page);
            if (pageSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated the page',
                    data: pageSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the page',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Delete Page API
    /**
     * @api {delete} /api/page/:id Delete Page API
     * @apiGroup Page
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "pageId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted page.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page/:id
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    deletePage(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const page = yield this.pageService.findOne({
                where: {
                    pageId: id,
                },
            });
            if (!page) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid pageId',
                };
                return response.status(400).send(errorResponse);
            }
            const deletePage = yield this.pageService.delete(page);
            if (deletePage) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the page',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the page',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Delete Multiple Page API
    /**
     * @api {post} /api/page/delete-page Delete Multiple Page API
     * @apiGroup Page
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} pageId  pageId
     * @apiParamExample {json} Input
     * {
     * "pageId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Page.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/page/delete-page
     * @apiErrorExample {json} pageDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteMultiplePage(pageDelete, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pageIdNo = pageDelete.pageId.toString();
            const pageid = pageIdNo.split(',');
            for (const id of pageid) {
                const dataId = yield this.pageService.findOne(id);
                if (dataId === undefined) {
                    const errorResponse = {
                        status: 0,
                        message: 'Please choose a page that you want to delete',
                    };
                    return response.status(400).send(errorResponse);
                }
                else {
                    const deletePageId = parseInt(id, 10);
                    yield this.pageService.delete(deletePageId);
                }
            }
            const successResponse = {
                status: 1,
                message: 'Successfully deleted the page',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Page Count API
    /**
     * @api {get} /api/page/page-count Page Count API
     * @apiGroup Page
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get page count",
     *      "data": {
     *                   "totalPage": 14,
     *                   "activePage": 13,
     *                   "inActivePage": 1
     *               }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page/page-count
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    pageCount(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const page = {};
            const select = [];
            const search = [];
            const WhereConditions = [];
            const relations = [];
            const allPageCount = yield this.pageService.list(0, 0, select, relations, search, WhereConditions, 1);
            const whereConditionsActive = [
                {
                    name: 'isActive',
                    op: 'like',
                    value: 1,
                },
            ];
            const activePageCount = yield this.pageService.list(0, 0, select, relations, search, whereConditionsActive, 1);
            const whereConditionsInActive = [
                {
                    name: 'isActive',
                    op: 'like',
                    value: 0,
                },
            ];
            const inActivePageCount = yield this.pageService.list(0, 0, select, relations, search, whereConditionsInActive, 1);
            page.totalPage = allPageCount;
            page.activePage = activePageCount;
            page.inActivePage = inActivePageCount;
            const successResponse = {
                status: 1,
                message: 'Successfully got the page count',
                data: page,
            };
            return response.status(200).send(successResponse);
        });
    }
    // page Detail
    /**
     * @api {get} /api/page/page-detail Page Detail API
     * @apiGroup Page
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} pageId pageId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Page detail",
     *      "data": {
     *                 "createdBy": 1,
     *                 "createdDate": "",
     *                 "modifiedBy": 1,
     *                 "modifiedDate": "",
     *                 "pageId": 1,
     *                 "title": "1",
     *                 "intro": "",
     *                 "content": "1",
     *                 "pageGroupId": 1,
     *                 "sortOrder": 1,
     *                 "slugName": "1",
     *                 "viewPageCount": 1,
     *                 "isActive": 1
     *               }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page/:pageId
     * @apiErrorExample {json} page Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    PageDetail(pageId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const page = yield this.pageService.findOne({
                where: {
                    pageId,
                },
            });
            if (!page) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Page Id',
                };
                return response.status(400).send(errorResponse);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got page detail',
                data: page,
            };
            return response.status(200).send(successResponse);
        });
    }
    validate_slug($slug, $id = 0, $count = 0) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const slugCount = yield this.pageService.checkSlug($slug, $id, $count);
            if (slugCount) {
                if (!$count) {
                    $count = 1;
                }
                else {
                    $count++;
                }
                return yield this.validate_slug($slug, $id, $count);
            }
            else {
                if ($count > 0) {
                    $slug = $slug + $count;
                }
                return $slug;
            }
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(['admin', 'create-pages']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreatePageRequest_1.CreatePage, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PageController.prototype, "createPage", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(['admin', 'list-pages']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PageController.prototype, "pageList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-pages']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdatePageRequest_1.UpdatePage, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PageController.prototype, "updatePage", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-pages']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PageController.prototype, "deletePage", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/delete-page'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DeletePageRequest_1.DeletePageRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PageController.prototype, "deleteMultiplePage", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/page-count'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PageController.prototype, "pageCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:pageId'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('pageId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PageController.prototype, "PageDetail", null);
PageController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/page'),
    tslib_1.__metadata("design:paramtypes", [PageService_1.PageService, PageGroupService_1.PageGroupService])
], PageController);
exports.PageController = PageController;
//# sourceMappingURL=PageController.js.map