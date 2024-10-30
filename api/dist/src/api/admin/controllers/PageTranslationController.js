"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPageTranslationController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const CreatePageTranslationRequest_1 = require("./requests/CreatePageTranslationRequest");
const PageService_1 = require("../../core/services/PageService");
const PageTranslationService_1 = require("../../core/services/PageTranslationService");
const PageTranslation_1 = require("../../core/models/PageTranslation");
const typeorm_1 = require("typeorm");
let AdminPageTranslationController = class AdminPageTranslationController {
    constructor(pageService, pageTranslationService) {
        this.pageService = pageService;
        this.pageTranslationService = pageTranslationService;
    }
    // Create Page Translation
    /**
     * @api {post} /api/page-translation/page/:id Add Page Translation API
     * @apiGroup Page-Translation
     * @apiParam (Request body) {Number} languageId language id
     * @apiParam (Request body) {String{..255}} title title
     * @apiParam (Request body) {String} content content
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "pageTranslation": [
     *         {
     *               "languageId" : "",
     *               "title" : "",
     *               "content" : ""
     *         }
     *      ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New page translation is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-translation/page/:id
     * @apiErrorExample {json} Add Page Translation Error
     * HTTP/1.1 500 Internal Server Error
     */
    createPageTranslation(payload, pageId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const getPage = yield this.pageService.findOne(pageId);
            if (!getPage) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid page id',
                };
                return response.status(400).send(errorResponse);
            }
            for (const data of payload.pageTranslation) {
                const getPageTranslation = yield this.pageTranslationService.findOne({
                    where: {
                        pageId: `${pageId}`,
                        languageId: data.languageId,
                    },
                });
                const newPageTranslation = new PageTranslation_1.PageTranslation();
                if (getPageTranslation) {
                    newPageTranslation.id = getPageTranslation.id;
                }
                newPageTranslation.pageId = pageId;
                newPageTranslation.languageId = data.languageId;
                newPageTranslation.title = data.title;
                newPageTranslation.content = data.content;
                yield this.pageTranslationService.create(newPageTranslation);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully created new page translation',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Page Translation List
    /**
     * @api {get} /api/page-translation/page Page Translation List API
     * @apiGroup Page-Translation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got page translation list",
     *      "data": " [{
     *                 "createdBy": null,
     *                 "createdDate": "2024-05-22T06:12:12.000Z",
     *                 "modifiedBy": null,
     *                 "modifiedDate": "2024-05-24T06:04:59.000Z",
     *                 "pageId": 67,
     *                 "title": "Subscribe Sell Trade ",
     *                 "intro": null,
     *                 "content": "&lt;p&gt;Subscribe Sell Trade&amp;nbsp;&lt;/p&gt;\n",
     *                 "pageGroupId": 11,
     *                 "sortOrder": null,
     *                 "slugName": "subscribe-sell-trade",
     *                 "viewPageCount": null,
     *                 "isActive": 1,
     *                 "pageTranslation": [],
     *                 "lastModifieDate": null
     *                }]"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-translation/page
     * @apiErrorExample {json} Page List Error
     * HTTP/1.1 500 Internal Server Error
     */
    PageTranslationList(response, limit, offset, keyword, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const condition = {};
            condition.relations = ['pageTranslation'];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                condition.where = {
                    title: (0, typeorm_1.Like)(`%${keyword}%`),
                };
            }
            if (limit) {
                condition.take = limit;
                if (offset) {
                    condition.skip = offset;
                }
            }
            condition.order = { createdDate: 'DESC' };
            const getPageTranslation = yield this.pageService.findAll(condition);
            const successResponse = {
                status: 1,
                message: 'Successfully got page translation list',
                data: count ? getPageTranslation.length : getPageTranslation.map((page) => {
                    page.lastModifieDate = new Date(Math.max(...page.pageTranslation.map(e => new Date(e.modifiedDate))));
                    return page;
                }),
            };
            return response.status(200).send(successResponse);
        });
    }
    // Page Translation Detail
    /**
     * @api {get} /api/page-translation/page/:id Page Translation Detail API
     * @apiGroup Page-Translation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got page translation detail",
     *      "data": "{
     *               "createdBy": "",
     *               "createdDate": "",
     *               "modifiedBy": "",
     *               "modifiedDate": "",
     *               "pageId": "",
     *               "title": "",
     *               "intro": "",
     *               "content": "",
     *               "pageGroupId": "",
     *               "sortOrder": "",
     *               "slugName": "",
     *               "viewPageCount": "",
     *               "isActive": "",
     *               "pageTranslation": []
     *              }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page
     * @apiErrorExample {json} page Translation Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    PageDetail(PageId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const getPageTranslation = yield this.pageService.findOne({
                where: {
                    pageId: PageId,
                },
                relations: ['pageTranslation'],
            });
            if (!getPageTranslation) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid page id',
                };
                return response.status(400).send(errorResponse);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got page translation detail',
                data: getPageTranslation,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/page/:id'),
    (0, routing_controllers_1.Authorized)(['admin']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreatePageTranslationRequest_1.CreatePageTranslationDTO, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminPageTranslationController.prototype, "createPageTranslation", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/page'),
    (0, routing_controllers_1.Authorized)(['admin']),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, Number, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminPageTranslationController.prototype, "PageTranslationList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/page/:id'),
    (0, routing_controllers_1.Authorized)(['admin']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminPageTranslationController.prototype, "PageDetail", null);
AdminPageTranslationController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/page-translation'),
    tslib_1.__metadata("design:paramtypes", [PageService_1.PageService,
        PageTranslationService_1.PageTranslationService])
], AdminPageTranslationController);
exports.AdminPageTranslationController = AdminPageTranslationController;
//# sourceMappingURL=PageTranslationController.js.map