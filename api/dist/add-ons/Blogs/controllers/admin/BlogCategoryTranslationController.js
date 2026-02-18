"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBlogCategoryTranslationController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const BlogCategoryTranslationService_1 = require("../../services/BlogCategoryTranslationService");
const BlogCategoryService_1 = require("../../services/BlogCategoryService");
const AddBlogCategoryTranslationRequest_1 = require("./requests/AddBlogCategoryTranslationRequest");
const BlogCategoryTranslation_1 = require("../../models/BlogCategoryTranslation");
const typedi_1 = require("typedi");
// import { CheckAddonMiddleware } from '../../../../src/api/core/middlewares/AddonValidationMiddleware';
// @UseBefore(CheckAddonMiddleware)
let AdminBlogCategoryTranslationController = class AdminBlogCategoryTranslationController {
    constructor(blogCategoryTranslationService, blogCategoryService) {
        this.blogCategoryTranslationService = blogCategoryTranslationService;
        this.blogCategoryService = blogCategoryService;
        // --
    }
    // Create Blog Category Translation
    /**
     * @api {post} /api/blog-category-translation/blog-category/:id Add Blog Category Translation API
     * @apiGroup Blog-Category-Translation
     * @apiParam (Request body) {Number} languageId language id
     * @apiParam (Request body) {String{..255}} name name
     * @apiParam (Request body) {String} description description
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "blogCategoryTranslation": [
     *          {
     *              "languageId" : 1,
     *              "name" : "",
     *          }
     *      ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New blog category translation is created successfully",
     *      "status": 1
     * }
     * @apiSampleRequest /api/blog-category-translation/blog-category/:id
     * @apiErrorExample {json} Add Blog Category Translation Error
     * HTTP/1.1 500 Internal Server Error
     */
    createBlogCategoryTranslation(payload, blogCategoryId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const getBlogCategory = yield this.blogCategoryService.findOne({ where: { blogCategoryId } });
            if (!getBlogCategory) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid blog category id',
                };
                return response.status(400).send(errorResponse);
            }
            for (const data of payload.blogCategoryTranslation) {
                const getBlogCategoryTranslation = yield this.blogCategoryTranslationService.findOne({
                    where: {
                        blogCategoryId,
                        languageId: data.languageId,
                    },
                });
                const newBlogCategoryTranslation = new BlogCategoryTranslation_1.BlogCategoryTranslation();
                if (getBlogCategoryTranslation) {
                    newBlogCategoryTranslation.id = getBlogCategoryTranslation.id;
                }
                newBlogCategoryTranslation.blogCategoryId = blogCategoryId;
                newBlogCategoryTranslation.languageId = data.languageId;
                newBlogCategoryTranslation.name = data.name;
                yield this.blogCategoryTranslationService.create(newBlogCategoryTranslation);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully created new blog category translation.',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Blog Category Translation List
    /**
     * @api {get} /api/blog-category-translation/blog-category Blog Category Translation List API
     * @apiGroup Blog-Category-Translation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got blog category translation list",
     *      "data": {
     *      "vendorCategoryId": "",
     *      "vendorId": "1",
     *      "categoryId": "1",
     *      "vendorCategoryCommission": ""
     *      }
     *      "status": 1
     * }
     * @apiSampleRequest /api/blog-category-translation/blog-category
     * @apiErrorExample {json} Blog Category List Error
     * HTTP/1.1 500 Internal Server Error
     */
    BlogCategoryTranslationList(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const getBlogCategoryTranslation = yield this.blogCategoryService.findAll({
                relations: ['blogCategoryTranslation'],
            });
            const successResponse = {
                status: 1,
                message: 'Successfully got blog category translation list',
                data: getBlogCategoryTranslation,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Blog Category Translation Detail
    /**
     * @api {get} /api/blog-category-translation/blog-category/:id Blog Category Translation Detail API
     * @apiGroup Blog-Category-Translation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Blog category translation detail",
     *      "data": {
     *      "vendorCategoryId": "1",
     *      "vendorId": "1",
     *      "categoryId": "1",
     *      "vendorCategoryCommission": ""
     *      }
     *      "status": 1
     * }
     * @apiSampleRequest /api/blog-category-translation/blog-category/:id
     * @apiErrorExample {json} Blog Category Translation Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    BlogDetail(blogCategoryId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const getBlogCategoryTranslation = yield this.blogCategoryService.findOne({
                where: {
                    blogCategoryId,
                },
                relations: ['blogCategoryTranslation'],
            });
            if (!getBlogCategoryTranslation) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid blog category translation id',
                };
                return response.status(400).send(errorResponse);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got blog category translation detail',
                data: getBlogCategoryTranslation,
            };
            return response.status(200).send(successResponse);
        });
    }
};
exports.AdminBlogCategoryTranslationController = AdminBlogCategoryTranslationController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/blog-category/:id')
    // @Authorized(['admin', 'create-blogs-translation'])
    ,
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [AddBlogCategoryTranslationRequest_1.BlogCategoryTranslationRequest, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminBlogCategoryTranslationController.prototype, "createBlogCategoryTranslation", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/blog-category')
    // @Authorized(['admin', 'create-blogs'])
    ,
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminBlogCategoryTranslationController.prototype, "BlogCategoryTranslationList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/blog-category/:id')
    // @Authorized()
    ,
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminBlogCategoryTranslationController.prototype, "BlogDetail", null);
exports.AdminBlogCategoryTranslationController = AdminBlogCategoryTranslationController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/blog-category-translation'),
    tslib_1.__metadata("design:paramtypes", [BlogCategoryTranslationService_1.BlogCategoryTranslationService,
        BlogCategoryService_1.BlogCategoryService])
], AdminBlogCategoryTranslationController);
//# sourceMappingURL=BlogCategoryTranslationController.js.map