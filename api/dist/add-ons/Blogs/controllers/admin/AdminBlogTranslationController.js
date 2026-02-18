"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBlogTranslationController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const BlogTranslationService_1 = require("../../services/BlogTranslationService");
const BlogService_1 = require("../../services/BlogService");
const CreateBlogTranslationRequest_1 = require("./requests/CreateBlogTranslationRequest");
const BlogTranslation_1 = require("../../models/BlogTranslation");
const typedi_1 = require("typedi");
// import { CheckAddonMiddleware } from '../../../../src/api/core/middlewares/AddonValidationMiddleware';
// @UseBefore(CheckAddonMiddleware)
let AdminBlogTranslationController = class AdminBlogTranslationController {
    constructor(blogTranslationService, blogService) {
        this.blogTranslationService = blogTranslationService;
        this.blogService = blogService;
        // --
    }
    // Create Blog Translation
    /**
     * @api {post} /api/blog-translation/blog/:id Add Blog Translation API
     * @apiGroup Blog-Translation
     * @apiParam (Request body) {Number} languageId language id
     * @apiParam (Request body) {String{..255}} title title
     * @apiParam (Request body) {String} description description
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "blogTranslation": [
     *         {
     *              "languageId" : "1",
     *              "title" : "",
     *              "description" : ""
     *         }
     *      ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new blog translation",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/blog-translation/blog/:id
     * @apiErrorExample {json} Add Blog Translation Error
     * HTTP/1.1 500 Internal Server Error
     */
    createBlogTranslation(payload, blogId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const getBlog = yield this.blogService.findOne({ where: { id: blogId } });
            if (!getBlog) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid blog id',
                };
                return response.status(400).send(errorResponse);
            }
            for (const blogs of payload.blogTranslation) {
                const getBlogTranslation = yield this.blogTranslationService.findOne({
                    where: {
                        blogId,
                        languageId: blogs.languageId,
                    },
                });
                const newBlogTranslation = new BlogTranslation_1.BlogTranslation();
                if (getBlogTranslation) {
                    newBlogTranslation.id = getBlogTranslation.id;
                }
                newBlogTranslation.blogId = blogId;
                newBlogTranslation.languageId = blogs.languageId;
                newBlogTranslation.title = blogs.title;
                newBlogTranslation.description = blogs.description;
                yield this.blogTranslationService.create(newBlogTranslation);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully created new blog translation.',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Blog Translation List
    /**
     * @api {get} /api/blog-translation/blog Blog Translation List API
     * @apiGroup Blog-Translation
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} count count
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *       "message": "Successfully got Blog translation list",
     *       "data":  {
     *       "createdBy": "",
     *       "createdDate": "",
     *       "modifiedBy": "",
     *       "modifiedDate": "",
     *       "id": 1,
     *       "title": "",
     *       "categoryId": 1,
     *       "description": "",
     *       "image": "",
     *       "imagePath": "",
     *       "isActive": 1,
     *       "blogSlug": "",
     *       "blogTranslation": [
     *           {
     *               "createdBy": "",
     *               "createdDate": "",
     *               "modifiedBy": "",
     *               "modifiedDate": "",
     *               "id": 1,
     *               "blogId": "",
     *               "languageId": "1",
     *               "title": "",
     *               "description": ""
     *           },
     *     ]
     *   }
     *      "status": 1
     * }
     * @apiSampleRequest /api/blog-translation/blog
     * @apiErrorExample {json} Blog List error
     * HTTP/1.1 500 Internal Server Error
     */
    BlogTranslationList(limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const relation = ['blogTranslation'];
            const search = [];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                search.push({
                    name: 'title',
                    op: 'like',
                    value: keyword,
                });
            }
            const getBlogTranslation = yield this.blogService.list(limit, offset, select, search, [], relation, count);
            const successResponse = {
                status: 1,
                message: `Successfully got blog translation ${count ? 'count' : 'list'}`,
                data: count ? getBlogTranslation : getBlogTranslation.map((blog) => {
                    blog.lastModifieDate = new Date(Math.max(...blog.blogTranslation.map(e => new Date(e.modifiedDate))));
                    return blog;
                }),
            };
            return response.status(200).send(successResponse);
        });
    }
    // Blog Translation Detail
    /**
     * @api {get} /api/blog-translation/blog/:id Blog Translation Detail API
     * @apiGroup Blog-Translation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      'message': 'Successfully got blog translation detail',
     *      "data": {
     *      "createdBy": "",
     *      "createdDate": "",
     *      "modifiedBy": "",
     *      "modifiedDate": "",
     *      "id": 1,
     *      "title": "",
     *      "categoryId": 1,
     *      "description": "",
     *      "image": "",
     *      "imagePath": "",
     *      "isActive": "",
     *      "blogSlug": "",
     *      "blogTranslation": [
     *          {
     *              "createdBy": "",
     *              "createdDate": "",
     *              "modifiedBy": "",
     *              "modifiedDate": "",
     *              "id": 1,
     *              "blogId": "1",
     *              "languageId": "1",
     *              "title": "",
     *              "description": ""
     *          }
     *          ]
     *     }
     *      'status': '1'
     * }
     * @apiSampleRequest /api/blog-translation/blog/:id
     * @apiErrorExample {json} Blog Translation Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    BlogDetail(blogId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const getBlogTranslation = yield this.blogService.findOne({
                where: {
                    id: blogId,
                },
                relations: ['blogTranslation'],
            });
            if (!getBlogTranslation) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Blog Translation Id',
                };
                return response.status(400).send(errorResponse);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got blog translation detail',
                data: getBlogTranslation,
            };
            return response.status(200).send(successResponse);
        });
    }
};
exports.AdminBlogTranslationController = AdminBlogTranslationController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/blog/:id'),
    (0, routing_controllers_1.Authorized)(['admin']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateBlogTranslationRequest_1.CreateBlogTranslationRequest, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminBlogTranslationController.prototype, "createBlogTranslation", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/blog'),
    (0, routing_controllers_1.Authorized)(['admin']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminBlogTranslationController.prototype, "BlogTranslationList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/blog/:id'),
    (0, routing_controllers_1.Authorized)(['admin']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminBlogTranslationController.prototype, "BlogDetail", null);
exports.AdminBlogTranslationController = AdminBlogTranslationController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/blog-translation'),
    tslib_1.__metadata("design:paramtypes", [BlogTranslationService_1.BlogTranslationService,
        BlogService_1.BlogService])
], AdminBlogTranslationController);
//# sourceMappingURL=AdminBlogTranslationController.js.map