"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoPageController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const MSeoMetaService_1 = require("../../services/MSeoMetaService");
const MSeoMetaModel_1 = require("../../models/MSeoMetaModel");
const CreateSeoRequest_1 = require("./requests/CreateSeoRequest");
const PageService_1 = require("../../../../src/api/core/services/PageService");
const PageGroupService_1 = require("../../../../src/api/core/services/PageGroupService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
let SeoPageController = class SeoPageController {
    constructor(pageService, mSeoMetaService, pageGroupService) {
        this.pageService = pageService;
        this.mSeoMetaService = mSeoMetaService;
        this.pageGroupService = pageGroupService;
    }
    // Seo Page List
    /**
     * @api {get} /api/page-seo Seo Page List API
     * @apiGroup Seo
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got the complete list of pages.",
     *      "data": "[]"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-seo
     * @apiErrorExample {json} page List error
     * HTTP/1.1 500 Internal Server Error
     */
    pageList(limit, offset, keyword, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['pageId', 'title', 'pageGroupId', 'content', 'isActive', 'slugName'];
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
                message: 'Successfully got the complete list of pages.',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Create/Update Seo  API
    /**
     * @api {Post} /api/page-seo/:pageId Create/Update Seo API
     * @apiGroup Seo
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword metaTagKeyword
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "metaTagTitle" : "",
     *      "metaTagDescription": "",
     *      "metaTagKeyword": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "SEO Updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-seo/:pageId
     * @apiErrorExample {json} Seo  error
     * HTTP/1.1 500 Internal Server Error
     */
    updateSeo(pageId, seo, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const page = yield this.pageService.findOne(pageId);
            if (!page) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Page. ',
                };
                return response.status(400).send(errorResponse);
            }
            const updateSeo = yield this.mSeoMetaService.findOne({
                where: {
                    refId: pageId,
                    seoType: 'pages',
                },
            });
            if (updateSeo) {
                updateSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : page.title;
                updateSeo.metaTagDescription = seo.metaTagDescription ? yield this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
                updateSeo.metaTagKeyword = seo.metaTagKeyword;
                updateSeo.refId = pageId;
                updateSeo.seoType = 'pages';
                yield this.mSeoMetaService.update(updateSeo.seoId, updateSeo);
                const successResponse = {
                    status: 1,
                    message: 'Seo Updated successfully',
                };
                return response.status(200).send(successResponse);
            }
            const NewSeo = new MSeoMetaModel_1.MSeoMeta();
            NewSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : page.title;
            NewSeo.metaTagDescription = seo.metaTagDescription ? yield this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
            NewSeo.metaTagKeyword = seo.metaTagKeyword;
            NewSeo.refId = pageId;
            NewSeo.seoType = 'pages';
            const createSeo = yield this.mSeoMetaService.create(NewSeo);
            if (createSeo) {
                const successResponse = {
                    status: 1,
                    message: 'SEO created Successfully. ',
                    data: createSeo,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create SEO. ',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Seo Detail API
    /**
     * @api {get} /api/page-seo/:pageId Seo Detail API
     * @apiGroup seo
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get Page Seo Detail. ",
     *    "data":"{}"
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/page-seo/:pageId
     * @apiErrorExample {json} Seo error
     * HTTP/1.1 500 Internal Server Error
     */
    seoDetail(pageId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const page = yield this.pageService.findOne(pageId);
            if (!page) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid page. ',
                };
                return response.status(400).send(errorResponse);
            }
            page.seo = yield this.mSeoMetaService.findOne({ where: { refId: pageId, seoType: 'pages' } });
            const successResponse = {
                status: 1,
                message: 'Successfully got Seo details. ',
                data: page,
            };
            return response.status(200).send(successResponse);
        });
    }
};
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
], SeoPageController.prototype, "pageList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/:pageId'),
    (0, routing_controllers_1.Authorized)(['admin', 'seo-update']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('pageId')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateSeoRequest_1.AddSeoRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SeoPageController.prototype, "updateSeo", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:pageId'),
    (0, routing_controllers_1.Authorized)(['admin', 'page-seo-detail']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('pageId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SeoPageController.prototype, "seoDetail", null);
SeoPageController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/page-seo'),
    tslib_1.__metadata("design:paramtypes", [PageService_1.PageService,
        MSeoMetaService_1.MSeoMetaService,
        PageGroupService_1.PageGroupService])
], SeoPageController);
exports.SeoPageController = SeoPageController;
//# sourceMappingURL=PageSeoController.js.map