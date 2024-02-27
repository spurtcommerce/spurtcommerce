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
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
let StoreBlogListController = class StoreBlogListController {
    constructor(userService, blogService, blogRelatedService, blogCategoryService) {
        this.userService = userService;
        this.blogService = blogService;
        this.blogRelatedService = blogRelatedService;
        this.blogCategoryService = blogCategoryService;
    }
    // Related Blog Showing API
    /**
     * @api {get} /api/list/related-blog-list Related Blog List
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
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
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/related-blog-list
     * @apiErrorExample {json} Related Blog List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Blog List Function
    relatedBlogList(limit, offset, blogSlug, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('blogSlug:', blogSlug);
            const blogDetail = yield this.blogService.findOne({
                where: {
                    blogSlug,
                },
            });
            console.log('blog:', blogDetail);
            if (!blogDetail) {
                return response.status(200).send({
                    status: 1,
                    message: 'Related blog list is successfully being shown. ',
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
                const Response = {
                    status: 1,
                    message: 'Related blog list is successfully being shown. ',
                    data: relatedData,
                };
                return response.status(200).send(Response);
            }
            const promises = relatedData.map((results) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = results;
                const blog = yield this.blogService.findOne({
                    select: ['id', 'title', 'categoryId', 'description', 'image', 'imagePath', 'isActive', 'blogSlug', 'createdDate'],
                    where: { id: temp.relatedBlogId, isActive: 1 },
                });
                if (blog) {
                    const category = yield this.blogCategoryService.findOne({ select: ['name'], where: { blogCategoryId: blog.categoryId } });
                    temp.categoryName = category !== undefined ? category.name : '';
                }
                temp.relatedBlog = blog;
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
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get blog Detail",
     *      "data":{
     *      "id" : "",
     *      "title" : "",
     *      "categoryId" : "",
     *      "description" : "",
     *      "image" : "",
     *      "imagePath" : "",
     *      "isActive" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/blog/blog-detail/:blogSlug
     * @apiErrorExample {json} Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    BlogDetail(blogSlug, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogService.findOne({
                where: {
                    blogSlug,
                    isActive: 1,
                },
            });
            if (!blog) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid blog',
                };
                return response.status(404).send(errorResponse);
            }
            const blogDetails = yield this.blogService.findOne(blog);
            const getCategoryName = yield this.blogCategoryService.findOne({
                where: { blogCategoryId: blogDetails.categoryId },
                select: ['name'],
            });
            if (getCategoryName !== undefined) {
                blogDetails.categoryName = getCategoryName.name;
            }
            if (blogDetails) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully get blog Details',
                    data: blogDetails,
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
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get blog list",
     *      "data":{},
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/blog/blog-list
     * @apiErrorExample {json} Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    BlogList(limit, offset, keyword, isActive, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['id', 'title', 'description', 'categoryId', 'image', 'imagePath', 'isActive', 'createdDate', 'createdBy', 'blogSlug'];
            const search = [
                {
                    name: 'title',
                    op: 'like',
                    value: keyword,
                },
                {
                    name: 'isActive',
                    op: 'like',
                    value: 1,
                },
            ];
            const WhereConditions = [];
            const getBlogList = yield this.blogService.list(limit, offset, select, search, WhereConditions, count);
            if (count) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully get All Blog List',
                    data: getBlogList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const blogList = getBlogList.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const data = val;
                    const getCategoryName = yield this.blogCategoryService.findOne({
                        where: { blogCategoryId: val.categoryId },
                        select: ['name'],
                    });
                    const getUser = yield this.userService.findOne({
                        where: { userId: val.createdBy },
                        select: ['firstName', 'avatar', 'avatarPath'],
                    });
                    if (getCategoryName !== undefined) {
                        data.categoryName = getCategoryName.name;
                    }
                    if (getUser !== undefined) {
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
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/related-blog-list'),
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
    tslib_1.__param(0, (0, routing_controllers_1.Param)('blogSlug')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreBlogListController.prototype, "BlogDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/blog/blog-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('isActive')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreBlogListController.prototype, "BlogList", null);
StoreBlogListController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/list'),
    tslib_1.__metadata("design:paramtypes", [UserService_1.UserService,
        BlogService_1.BlogService, BlogRelatedService_1.BlogRelatedService,
        BlogCategoryService_1.BlogCategoryService])
], StoreBlogListController);
exports.StoreBlogListController = StoreBlogListController;
//# sourceMappingURL=StoreBlogController.js.map