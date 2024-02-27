"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoBlogController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const MSeoMetaService_1 = require("../../services/MSeoMetaService");
const MSeoMetaModel_1 = require("../../models/MSeoMetaModel");
const CreateSeoRequest_1 = require("./requests/CreateSeoRequest");
const BlogService_1 = require("../../../Blogs/services/BlogService");
const BlogCategoryService_1 = require("../../../Blogs/services/BlogCategoryService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
let SeoBlogController = class SeoBlogController {
    constructor(blogService, mSeoMetaService, blogCategoryService) {
        this.blogService = blogService;
        this.mSeoMetaService = mSeoMetaService;
        this.blogCategoryService = blogCategoryService;
    }
    // Seo Blog List
    /**
     * @api {get} /api/blog-seo Seo Blog List API
     * @apiGroup Seo
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} categoryId categoryId
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Blog list",
     *      "data": "{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/blog-seo
     * @apiErrorExample {json} blog List error
     * HTTP/1.1 500 Internal Server Error
     */
    blogList(limit, offset, keyword, categoryId, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['id', 'title', 'categoryId', 'description', 'image', 'imagePath', 'isActive', 'blogSlug', 'createdDate'];
            const search = [
                {
                    name: 'title',
                    op: 'like',
                    value: keyword,
                }, {
                    name: 'categoryId',
                    op: 'like',
                    value: categoryId,
                }, {
                    name: 'isActive',
                    op: 'where',
                    value: status,
                },
            ];
            const WhereConditions = [];
            if (categoryId) {
                WhereConditions.push({
                    name: 'categoryId',
                    value: categoryId,
                });
            }
            const blogLists = yield this.blogService.list(limit, offset, select, search, WhereConditions, count);
            if (count) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got blog count',
                    data: blogLists,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const blogList = blogLists.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const datas = val;
                    const getCategoryName = yield this.blogCategoryService.findOne({
                        where: { blogCategoryId: val.categoryId },
                        select: ['name'],
                    });
                    if (getCategoryName) {
                        datas.categoryName = getCategoryName.name;
                    }
                    return datas;
                }));
                const results = yield Promise.all(blogList);
                const successResponse = {
                    status: 1,
                    message: 'Successfully got blog list',
                    data: results,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Create/Update Seo  API
    /**
     * @api {Post} /api/blog-seo/:blogId Create/Update Seo API
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
     * @apiSampleRequest /api/blog-seo/:blogId
     * @apiErrorExample {json} Seo  error
     * HTTP/1.1 500 Internal Server Error
     */
    updateSeo(blogId, seo, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const Blog = yield this.blogService.findOne(blogId);
            if (!Blog) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Blog. ',
                };
                return response.status(400).send(errorResponse);
            }
            const updateSeo = yield this.mSeoMetaService.findOne({
                where: {
                    refId: blogId,
                    seoType: 'blogs',
                },
            });
            if (updateSeo) {
                updateSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : Blog.title;
                updateSeo.metaTagDescription = seo.metaTagDescription ? yield this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
                updateSeo.metaTagKeyword = seo.metaTagKeyword;
                updateSeo.refId = blogId;
                updateSeo.seoType = 'blogs';
                yield this.mSeoMetaService.update(updateSeo.seoId, updateSeo);
                const successResponse = {
                    status: 1,
                    message: 'Seo Updated successfully',
                };
                return response.status(200).send(successResponse);
            }
            const NewSeo = new MSeoMetaModel_1.MSeoMeta();
            NewSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : Blog.title;
            NewSeo.metaTagDescription = seo.metaTagDescription ? yield this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
            NewSeo.metaTagKeyword = seo.metaTagKeyword;
            NewSeo.refId = blogId;
            NewSeo.seoType = 'blogs';
            const createSeo = yield this.mSeoMetaService.create(NewSeo);
            if (createSeo) {
                const successResponse = {
                    status: 1,
                    message: 'Seo created Successfully. ',
                    data: createSeo,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create Seo. ',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Seo Detail API
    /**
     * @api {get} /api/blog-seo/:blogId Seo Detail API
     * @apiGroup seo
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get Seo detail. ",
     *    "data":"{}"
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/blog-seo/:blogId
     * @apiErrorExample {json} Seo error
     * HTTP/1.1 500 Internal Server Error
     */
    seoDetail(blogId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogService.findOne(blogId);
            if (!blog) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Blog. ',
                };
                return response.status(400).send(errorResponse);
            }
            blog.seo = yield this.mSeoMetaService.findOne({ where: { refId: blogId, seoType: 'blogs' } });
            const successResponse = {
                status: 1,
                message: 'Successfully got Seo detail. ',
                data: blog,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(['admin', 'list-blogs']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('categoryId')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SeoBlogController.prototype, "blogList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/:blogId'),
    (0, routing_controllers_1.Authorized)(['admin', 'seo-update']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('blogId')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateSeoRequest_1.AddSeoRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SeoBlogController.prototype, "updateSeo", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:blogId'),
    (0, routing_controllers_1.Authorized)(['admin', 'blog-seo-detail']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('blogId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SeoBlogController.prototype, "seoDetail", null);
SeoBlogController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/blog-seo'),
    tslib_1.__metadata("design:paramtypes", [BlogService_1.BlogService,
        MSeoMetaService_1.MSeoMetaService,
        BlogCategoryService_1.BlogCategoryService])
], SeoBlogController);
exports.SeoBlogController = SeoBlogController;
//# sourceMappingURL=BlogSeoController.js.map