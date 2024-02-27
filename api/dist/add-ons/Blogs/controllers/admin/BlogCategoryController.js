"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCategoryController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const BlogCategory_1 = require("../../models/BlogCategory");
const BlogCategoryService_1 = require("../../services/BlogCategoryService");
const AddBlogCategoryRequest_1 = require("./requests/AddBlogCategoryRequest");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
let BlogCategoryController = class BlogCategoryController {
    constructor(blogCategoryService) {
        this.blogCategoryService = blogCategoryService;
    }
    // create Blog Category API
    /**
     * @api {post} /api/blog-category Add Blog Category API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..255}} name Category name
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/blog-category
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    addCategory(category, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newCategory = new BlogCategory_1.BlogCategory();
            console.log('category:', category);
            newCategory.name = category.name;
            const categorySave = yield this.blogCategoryService.create(newCategory);
            if (categorySave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully created new category.',
                    data: categorySave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create the category. ',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Update Blog Category API
    /**
     * @api {put} /api/blog-category/:id Update Blog Category API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} name BlogCategory name
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/blog-category/:id
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    updateCategory(id, name, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const categoryId = yield this.blogCategoryService.findOne({
                where: {
                    blogCategoryId: id,
                },
            });
            if (!categoryId) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid category Id.',
                };
                return response.status(400).send(errorResponse);
            }
            categoryId.name = name;
            const categorySave = yield this.blogCategoryService.create(categoryId);
            if (categorySave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated category.',
                    data: categorySave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the category. ',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // delete Blog Category API
    /**
     * @api {delete} /api/blog-category/:id Delete Blog Category API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} blogCategoryId blogCategory blogCategoryId
     * @apiParamExample {json} Input
     * {
     *      "blogCategoryId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/blog-category/:id
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteCategory(blogCategoryId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const categoryId = yield this.blogCategoryService.findOne({
                where: {
                    blogCategoryId,
                },
            });
            if (!categoryId) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid category Id.',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteCategory = yield this.blogCategoryService.delete(categoryId);
            if (deleteCategory) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted category.',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the category. ',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Blog Category List API
    /**
     * @api {get} /api/blog-category Blog Category List API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the complete category list.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/blog-category
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    categorylist(limit, offset, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['blogCategoryId', 'name', 'isActive', 'createdDate'];
            const whereConditions = [];
            if (status || status === '0') {
                whereConditions.push({
                    name: 'isActive',
                    op: 'where',
                    value: +status,
                });
            }
            const blogCategoryList = yield this.blogCategoryService.list(limit, offset, select, [], whereConditions, false);
            if (count) {
                const blogCategoryCount = yield this.blogCategoryService.list(limit, offset, select, [], whereConditions, true);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got the blog category count',
                    data: blogCategoryCount,
                });
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got the blog category list.',
                data: blogCategoryList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Blog category Detail
    /**
     * @api {get} /api/blog-category/blog-category-detail Blog Category Detail API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} blogCategoryId blogCategoryId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Blog Category detail",
     *      "data": "{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/blog-category/blog-category-detail
     * @apiErrorExample {json} category error
     * HTTP/1.1 500 Internal Server Error
     */
    CategoryDetail(blogCategoryId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = yield this.blogCategoryService.findOne({
                where: {
                    blogCategoryId,
                },
            });
            if (!category) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Blog Category Id',
                };
                return response.status(400).send(errorResponse);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got blog category detail',
                data: category,
            };
            return response.status(200).send(successResponse);
        });
    }
    validate_slug($slug, $id = 0, $count = 0) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const slugCount = yield this.blogCategoryService.checkSlug($slug, $id, $count);
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
    /**
     * @api {get} /api/blog-category/category-count blog Category Count API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {String} status status
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the complete blog category count.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/blog-category/category-count
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    categorycount(limit, offset, keyword, sortOrder, status, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const blogCategoryCount = yield this.blogCategoryService.categoryCount(limit, offset, keyword, sortOrder, status);
            const successResponse = {
                status: 1,
                message: 'Successfully got blog category Count',
                data: {
                    categoryCount: blogCategoryCount.categoryCount,
                },
            };
            return response.status(200).send(successResponse);
        });
    }
    // Update Blog Category status API
    /**
     * @api {put} /api/blog-category/update-blog-category-status/:id Update Blog Category status API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} status
     * @apiParamExample {json} Input
     * {
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/blog-category/update-blog-category-status/:id
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    updateBlogCategoryStatus(id, status, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const blogCategory = yield this.blogCategoryService.findOne({
                where: {
                    blogCategoryId: id,
                },
            });
            if (!blogCategory) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid blog category Id',
                });
            }
            blogCategory.isActive = status;
            const categorySave = yield this.blogCategoryService.create(blogCategory);
            if (categorySave !== undefined) {
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully updated blog category status',
                    data: categorySave,
                });
            }
            else {
                return response.status(400).send({
                    status: 1,
                    message: 'Unable to update blog category status',
                });
            }
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [AddBlogCategoryRequest_1.AddBlogCategory, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BlogCategoryController.prototype, "addCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('name')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BlogCategoryController.prototype, "updateCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BlogCategoryController.prototype, "deleteCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BlogCategoryController.prototype, "categorylist", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/blog-category-detail'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('blogCategoryId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BlogCategoryController.prototype, "CategoryDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/category-count'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('sortOrder')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BlogCategoryController.prototype, "categorycount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-blog-category-status/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('status')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BlogCategoryController.prototype, "updateBlogCategoryStatus", null);
BlogCategoryController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/blog-category'),
    tslib_1.__metadata("design:paramtypes", [BlogCategoryService_1.BlogCategoryService])
], BlogCategoryController);
exports.BlogCategoryController = BlogCategoryController;
//# sourceMappingURL=BlogCategoryController.js.map