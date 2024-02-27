"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSeoController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const MSeoMetaService_1 = require("../../services/MSeoMetaService");
const CategoryService_1 = require("../../../../src/api/core/services/CategoryService");
const PageService_1 = require("../../../../src/api/core/services/PageService");
const BlogService_1 = require("../../../Blogs/services/BlogService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
let StoreSeoController = class StoreSeoController {
    constructor(productService, mSeoMetaService, categoryService, pageService, blogService) {
        this.productService = productService;
        this.mSeoMetaService = mSeoMetaService;
        this.categoryService = categoryService;
        this.pageService = pageService;
        this.blogService = blogService;
    }
    // product Seo Detail API
    /**
     * @api {get} /api/seo/product/:productSlug Product Seo Detail API
     * @apiGroup seo store
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get Seo detail. ",
     *    "data":"{}"
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/seo/product/:productSlug
     * @apiErrorExample {json} Seo error
     * HTTP/1.1 500 Internal Server Error
     */
    productSeo(slugName, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findOne({
                where: {
                    productSlug: slugName,
                    isActive: 1,
                },
            });
            if (!product) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Product. ',
                });
            }
            const seoDetail = yield this.mSeoMetaService.findOne({
                where: {
                    refId: product.productId,
                    seoType: 'product',
                },
            });
            const successResponse = {
                status: 1,
                message: 'Successfully got Seo details. ',
                data: seoDetail,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Category Seo Detail API
    /**
     * @api {get} /api/seo/category/:categorySlug Category Seo Detail API
     * @apiGroup seo store
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get Seo detail. ",
     *    "data":"{}"
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/seo/category/:categorySlug
     * @apiErrorExample {json} Seo error
     * HTTP/1.1 500 Internal Server Error
     */
    categorySeo(slugName, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryService.findOne({
                where: {
                    categorySlug: slugName,
                    isActive: 1,
                },
            });
            if (!category) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Category. ',
                });
            }
            const seoDetail = yield this.mSeoMetaService.findOne({
                where: {
                    refId: category.categoryId,
                    seoType: 'category',
                },
            });
            const successResponse = {
                status: 1,
                message: 'Successfully got Seo details. ',
                data: seoDetail,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Page Seo Detail API
    /**
     * @api {get} /api/seo/page/:pageSlug  Page Seo Detail API
     * @apiGroup seo store
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get Seo detail. ",
     *    "data":"{}"
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/seo/page/:pageSlug
     * @apiErrorExample {json} Seo error
     * HTTP/1.1 500 Internal Server Error
     */
    pageSeo(pageSlug, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const page = yield this.pageService.findOne({
                where: {
                    slugName: pageSlug,
                    isActive: 1,
                },
            });
            if (!page) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Page. ',
                });
            }
            const seoDetail = yield this.mSeoMetaService.findOne({
                where: {
                    refId: page.pageId,
                    seoType: 'pages',
                },
            });
            const successResponse = {
                status: 1,
                message: 'Successfully got Seo details. ',
                data: seoDetail,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Blog Seo Detail API
    /**
     * @api {get} /api/seo/blog/:blogSlug  Blog Seo Detail API
     * @apiGroup seo store
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get Seo detail. ",
     *    "data":"{}"
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/seo/blog/:blogSlug
     * @apiErrorExample {json} Seo error
     * HTTP/1.1 500 Internal Server Error
     */
    blogeodetail(slugName, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogService.findOne({
                where: {
                    blogSlug: slugName,
                    isActive: 1,
                },
            });
            if (!blog) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Blog. ',
                });
            }
            const seoDetail = yield this.mSeoMetaService.findOne({
                where: {
                    refId: blog.id,
                    seoType: 'blogs',
                },
            });
            const successResponse = {
                status: 1,
                message: 'Successfully got Seo details. ',
                data: seoDetail,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product/:productSlug'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productSlug')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreSeoController.prototype, "productSeo", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/category/:categorySlug'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('categorySlug')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreSeoController.prototype, "categorySeo", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/page/:pageSlug'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('pageSlug')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreSeoController.prototype, "pageSeo", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/blog/:blogSlug'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('blogSlug')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreSeoController.prototype, "blogeodetail", null);
StoreSeoController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/seo'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        MSeoMetaService_1.MSeoMetaService,
        CategoryService_1.CategoryService,
        PageService_1.PageService,
        BlogService_1.BlogService])
], StoreSeoController);
exports.StoreSeoController = StoreSeoController;
//# sourceMappingURL=StoreSeoController.js.map