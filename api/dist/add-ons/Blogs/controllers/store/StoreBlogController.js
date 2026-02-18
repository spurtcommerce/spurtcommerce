"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreBlogListController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const UserService_1 = require("../../../../src/api/core/services/UserService");
const BlogService_1 = require("../../services/BlogService");
const BlogRelatedService_1 = require("../../services/BlogRelatedService");
const BlogCategoryService_1 = require("../../services/BlogCategoryService");
const BlogCategoryTranslationService_1 = require("../../services/BlogCategoryTranslationService");
const BlogTranslationService_1 = require("../../services/BlogTranslationService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const TranslationMiddleware_1 = require("../../../../src/api/core/middlewares/TranslationMiddleware");
const typedi_1 = require("typedi");
let StoreBlogListController = class StoreBlogListController {
    constructor(userService, blogService, blogRelatedService, blogCategoryService, blogCategoryTranslationService, blogTranslationService
    // private imageService: ImageService
    ) {
        this.userService = userService;
        this.blogService = blogService;
        this.blogRelatedService = blogRelatedService;
        this.blogCategoryService = blogCategoryService;
        this.blogCategoryTranslationService = blogCategoryTranslationService;
        this.blogTranslationService = blogTranslationService;
    }
    // Related Blog Showing API
    /**
     * @api {get} /api/list/related-blog-list Related Blog List
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiHeader {number} languageId
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} blogSlug Blog Slug
     * @apiParam (Request body) {Number} count
     * @apiParamExample {json} Input
     * {
     *      "blogSlug" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Related Blog List Showing Successfully..!",
     *      "status": "1",
     *      "data":   {
     *       "createdBy":1 ,
     *       "createdDate": "",
     *       "modifiedBy": 1,
     *       "modifiedDate": "",
     *       "relatedId": 1,
     *       "blogId": 1,
     *       "relatedBlogId": 1,
     *       "isActive": 1,
     *       "categoryName": "",
     *       "categoryTranslationName": "",
     *       "relatedBlog": {
     *           "createdDate": "",
     *           "id": 1,
     *           "title": "",
     *           "categoryId": 1,
     *           "description": "",
     *           "image": "",
     *           "imagePath": "",
     *           "isActive": ,
     *           "blogSlug": "",
     *           "relatedBlogTranslation": {}
     *       }
     *   }
     * }
     * @apiSampleRequest /api/list/related-blog-list
     * @apiErrorExample {json} Related Blog List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Blog List Function
    relatedBlogList(limit, offset, blogSlug, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const blogDetail = yield this.blogService.findOne({
                where: {
                    blogSlug,
                },
            });
            // have to check
            if (!blogDetail) {
                return response.status(200).send({
                    status: 1,
                    message: 'Related blog list is successfully being shown.',
                    data: [],
                });
            }
            const whereConditions = [
                {
                    name: 'blogId',
                    value: blogDetail.id,
                },
                {
                    name: 'isActive',
                    value: 1,
                },
            ];
            const relatedData = yield this.blogRelatedService.list(limit, offset, [], [], whereConditions, count);
            if (count) {
                // have to check
                const Response = {
                    status: 1,
                    message: 'Related blog list is successfully being shown. ',
                    data: relatedData,
                };
                return response.status(200).send(Response);
            }
            const promises = relatedData.map((results) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const temp = results;
                const blog = yield this.blogService.findOne({
                    select: ['id', 'title', 'categoryId', 'description', 'image', 'imagePath', 'isActive', 'blogSlug', 'createdDate'],
                    where: { id: temp.relatedBlogId, isActive: 1 },
                });
                if (blog) {
                    const category = yield this.blogCategoryService.findOne({ select: ['blogCategoryId', 'name'], where: { blogCategoryId: blog.categoryId } });
                    temp.categoryName = category ? category.name : '';
                    const categoryTranslation = yield this.blogCategoryTranslationService.findOne({ select: ['name'], where: { blogCategoryId: category.blogCategoryId, languageId: request.languageId } });
                    temp.categoryTranslationName = (_a = categoryTranslation === null || categoryTranslation === void 0 ? void 0 : categoryTranslation.name) !== null && _a !== void 0 ? _a : '';
                }
                const blogTranslation = yield this.blogTranslationService.findOne({
                    where: {
                        blogId: blog.id,
                        languageId: (_b = request.languageId) !== null && _b !== void 0 ? _b : 0,
                    },
                });
                temp.relatedBlog = blog;
                temp.relatedBlog.relatedBlogTranslation = blogTranslation !== null && blogTranslation !== void 0 ? blogTranslation : {};
                return temp;
            }));
            const result = yield Promise.all(promises);
            const successResponse = {
                status: 1,
                message: 'Related blog list is successfully being shown. ',
                data: result,
            };
            return response.status(200).send(successResponse);
        });
    }
    // get Blog Detail API
    /**
     * @api {get} /api/list/blog/blog-detail/:blogSlug Blog Detail API
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get blog Detail",
     *      "data" : {
     *      "createdBy": 1,
     *      "createdDate": "",
     *      "modifiedBy": 1,
     *      "modifiedDate": "",
     *      "id": 1,
     *      "title": "",
     *      "categoryId": 1,
     *      "description": "",
     *      "imagePath": "",
     *      "isActive": 1,
     *      "blogSlug": "",
     *      "categoryName": "",
     *      "categoryTranslationName": "",
     *      "createdByName": "",
     *      "createdByImage": "",
     *      "createdByImagePath": ""
     *   }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/blog/blog-detail/:blogSlug
     * @apiErrorExample {json} Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    BlogDetail(blogSlug, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const WhereConditions = [
                {
                    name: 'blog.isActive',
                    op: 'where',
                    value: '1',
                },
            ];
            const search = [];
            const relations = [];
            if (request.languageId) {
                relations.push({
                    tableName: 'blog.blogTranslation',
                    aliasName: 'blogTranslation',
                    op: 'left',
                });
            }
            if (blogSlug && blogSlug !== '') {
                WhereConditions.push({
                    name: 'blog.blogSlug',
                    op: 'and',
                    value: `"${blogSlug}"`,
                });
            }
            const getBlogDetail = yield this.blogService.listByQueryBuilder(0, 0, select, WhereConditions, search, relations, [], [], false, false);
            if (!getBlogDetail) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid blog',
                };
                return response.status(200).send(errorResponse);
            }
            const blogDetail = getBlogDetail.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                const data = val;
                if (request.languageId) {
                    data.blogTranslation = (_a = val.blogTranslation.find((item) => item.languageId === request.languageId)) !== null && _a !== void 0 ? _a : {};
                }
                const getCategoryName = yield this.blogCategoryService.findOne({
                    where: { blogCategoryId: val.categoryId },
                    select: ['blogCategoryId', 'name'],
                });
                if (getCategoryName) {
                    data.categoryName = getCategoryName.name;
                }
                const getCategoryTranslation = yield this.blogCategoryTranslationService.findOne({
                    where: {
                        blogCategoryId: getCategoryName.blogCategoryId,
                        languageId: (_b = request.languageId) !== null && _b !== void 0 ? _b : 0,
                    },
                    select: ['name'],
                });
                data.categoryTranslationName = (_c = getCategoryTranslation === null || getCategoryTranslation === void 0 ? void 0 : getCategoryTranslation.name) !== null && _c !== void 0 ? _c : '';
                const getUser = yield this.userService.findOne({
                    where: { userId: val.createdBy },
                    select: ['firstName', 'avatar', 'avatarPath'],
                });
                if (getUser) {
                    data.createdByName = getUser.firstName;
                    data.createdByImage = getUser.avatar;
                    data.createdByImagePath = getUser.avatarPath;
                }
                data.description = (_d = data.description) !== null && _d !== void 0 ? _d : '';
                return data;
            }));
            const results = yield Promise.all(blogDetail);
            if (blogDetail) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully get blog Details',
                    data: results,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to get blog Details',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Blog List API
    /**
     * @api {get} /api/list/blog/blog-list Blog List API
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get blog list",
     *      "data" : {
     *      "createdBy": 1,
     *      "createdDate": "",
     *      "modifiedBy": 1,
     *      "modifiedDate": "",
     *      "id": 1,
     *      "title": "",
     *      "categoryId": 1,
     *      "description": "",
     *      "imagePath": "",
     *      "isActive": 1,
     *      "blogSlug": "",
     *      "categoryName": "",
     *      "categoryTranslationName": "",
     *      "createdByName": "",
     *      "createdByImage": "",
     *      "createdByImagePath": ""
     *   },
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/blog/blog-list
     * @apiErrorExample {json} Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    BlogList(limit, offset, keyword, isActive, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const search = [
                {
                    name: ['blog.isActive'],
                    value: '1',
                },
            ];
            if (keyword && keyword !== '') {
                if (request.languageId) {
                    search.push({
                        name: ['blog.title', 'blogTranslation.title'],
                        value: keyword,
                    });
                }
                else {
                    search.push({
                        name: ['blog.title'],
                        value: keyword,
                    });
                }
            }
            const WhereConditions = [];
            const relations = [];
            if (request.languageId) {
                relations.push({
                    tableName: 'blog.blogTranslation',
                    aliasName: 'blogTranslation',
                    op: 'left',
                });
            }
            const getBlogList = yield this.blogService.listByQueryBuilder(limit, offset, select, WhereConditions, search, relations, [], [], false, false);
            if (count) {
                const getBlogCount = yield this.blogService.listByQueryBuilder(limit, offset, select, WhereConditions, search, relations, [], [], true, false);
                const successResponse = {
                    status: 1,
                    message: 'Successfully get all blog count',
                    data: getBlogCount,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const blogList = getBlogList.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    var _a, _b, _c;
                    const data = val;
                    if (request.languageId) {
                        data.blogTranslation = (_a = val.blogTranslation.find((item) => item.languageId === request.languageId)) !== null && _a !== void 0 ? _a : {};
                    }
                    const getCategoryName = yield this.blogCategoryService.findOne({
                        where: { blogCategoryId: val.categoryId },
                        select: ['blogCategoryId', 'name'],
                    });
                    if (getCategoryName) {
                        data.categoryName = getCategoryName.name;
                    }
                    const getCategoryTranslation = yield this.blogCategoryTranslationService.findOne({
                        where: {
                            blogCategoryId: getCategoryName.blogCategoryId,
                            languageId: (_b = request.languageId) !== null && _b !== void 0 ? _b : 0,
                        },
                        select: ['name'],
                    });
                    data.categoryNameTranslation = (_c = getCategoryTranslation === null || getCategoryTranslation === void 0 ? void 0 : getCategoryTranslation.name) !== null && _c !== void 0 ? _c : '';
                    const getUser = yield this.userService.findOne({
                        where: { userId: val.createdBy },
                        select: ['firstName', 'avatar', 'avatarPath'],
                    });
                    if (getUser) {
                        data.createdByName = getUser.firstName;
                        data.createdByImage = getUser.avatar;
                        data.createdByImagePath = getUser.avatarPath;
                    }
                    return data;
                }));
                const results = yield Promise.all(blogList);
                const featuredPost = results[0];
                results.shift();
                if (blogList) {
                    const successResponse = {
                        status: 1,
                        message: 'Successfully get blog list',
                        data: { results, featuredPost },
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'unable to list blog',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
        });
    }
};
exports.StoreBlogListController = StoreBlogListController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/related-blog-list'),
    (0, routing_controllers_1.UseBefore)(TranslationMiddleware_1.TranslationMiddleware),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('blogSlug')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreBlogListController.prototype, "relatedBlogList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/blog/blog-detail/:blogSlug'),
    (0, routing_controllers_1.UseBefore)(TranslationMiddleware_1.TranslationMiddleware),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('blogSlug')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreBlogListController.prototype, "BlogDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/blog/blog-list'),
    (0, routing_controllers_1.UseBefore)(TranslationMiddleware_1.TranslationMiddleware),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('isActive')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Req)()),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreBlogListController.prototype, "BlogList", null);
exports.StoreBlogListController = StoreBlogListController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/list'),
    tslib_1.__metadata("design:paramtypes", [UserService_1.UserService,
        BlogService_1.BlogService, BlogRelatedService_1.BlogRelatedService,
        BlogCategoryService_1.BlogCategoryService,
        BlogCategoryTranslationService_1.BlogCategoryTranslationService,
        BlogTranslationService_1.BlogTranslationService
        // private imageService: ImageService
    ])
], StoreBlogListController);
//# sourceMappingURL=StoreBlogController.js.map