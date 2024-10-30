"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorCategoryController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const VendorCategoryService_1 = require("../../core/services/VendorCategoryService");
const VendorCategory_1 = require("../../core/models/VendorCategory");
const CreateVendorCategoryRequest_1 = require("./requests/CreateVendorCategoryRequest");
const CategoryPathService_1 = require("../../core/services/CategoryPathService");
const VendorService_1 = require("../../core/services/VendorService");
let VendorCategoryController = class VendorCategoryController {
    constructor(vendorCategoryService, vendorService, categoryPathService) {
        this.vendorCategoryService = vendorCategoryService;
        this.vendorService = vendorService;
        this.categoryPathService = categoryPathService;
    }
    // Create vendor category API
    /**
     * @api {post} /api/vendor-categorCreate Vendor Category API
     * @apiGroup Admin Vendor Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number}  vendorId vendorId
     * @apiParam (Request body) {String}  categoryId CategoryId
     * @apiParam (Request body) {Number}  [commission] commission
     * @apiParamExample {json} Input
     * {
     *      "vendorId" : "",
     *      "categoryId" : "",
     *      "commission" : "",
     * }
     * @apiSuccessExample {json} Successs
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully added category",
     *      "status": "1",
     *      "data": {
     *      "vendorId": "",
     *      "categoryId": "",
     *      "vendorCommission": "",
     *      "vendorCategoryId": ""
     * }
     * }
     * @apiSampleRequest /api/vendor-categor     * @apiErrorExample {json} vendor category  error
     * HTTP/1.1 500 Internal Server Error
     */
    createVendorCategory(vendorCategories, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const arr = [];
            const category = vendorCategories.categoryId;
            const splitId = category.split(',');
            for (const data of splitId) {
                const newVendorCategory = new VendorCategory_1.VendorCategory();
                newVendorCategory.vendorId = vendorCategories.vendorId;
                newVendorCategory.categoryId = data;
                newVendorCategory.vendorCategoryCommission = 0;
                arr.push(newVendorCategory);
            }
            const categoryVendor = yield this.vendorCategoryService.create(arr);
            if (categoryVendor !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully added seller category',
                    data: categoryVendor,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to add seller category',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Update vendor category API
    /**
     * @api {put} /api/vendor-categorUpdate Vendor Category API
     * @apiGroup Admin Vendor Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiParam (Request body) {String} categoryId categoryId
     * @apiParam (Request body) {Number}  [commission] commission
     * @apiParamExample {json} Input
     * {
     *      "vendorId" : "",
     *      "categoryId" : "",
     *      "commission" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully update",
     *      "status": "1",
     *      "data": {
     *      "vendorId": "",
     *      "vendorCategoryId": "",
     *      "categoryId": "",
     *      "vendorCategoryCommission": ""
     * }
     * }
     * @apiSampleRequest /api/vendor-category
     * @apiErrorExample {json} vendor category  error
     * HTTP/1.1 500 Internal Server Error
     */
    updateVendorCategory(updateParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const VendorsCategory = yield this.vendorCategoryService.findAll({
                where: {
                    vendorId: updateParam.vendorId,
                },
            });
            if (VendorsCategory.length > 0) {
                yield this.vendorCategoryService.delete(VendorsCategory);
            }
            const arr = [];
            const category = updateParam.categoryId;
            const splitId = category.split(',');
            for (const data of splitId) {
                const newVendorCategory = new VendorCategory_1.VendorCategory();
                newVendorCategory.vendorId = updateParam.vendorId;
                newVendorCategory.categoryId = data;
                newVendorCategory.vendorCategoryCommission = 0;
                arr.push(newVendorCategory);
            }
            const categoryVendor = yield this.vendorCategoryService.create(arr);
            if (categoryVendor !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated seller category',
                    data: categoryVendor,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to update the seller category',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Vendor Category List API
    /**
     * @api {get} /api/vendor-category/category/:id Vendor Category List API
     * @apiGroup Admin Vendor Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Boolean} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor category list",
     *      "data":[{
     *               "categoryId": "",
     *               "sortOrder": "",
     *               "parentInt": "",
     *               "name": "",
     *               "levels": ""
     *             }],
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-category/category/:id
     * @apiErrorExample {json} Vendor category error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorCategoryList(id, limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'CategoryPath.categoryId as categoryId',
                'category.sortOrder as sortOrder',
                'category.parentInt as parentInt',
                'category.name as name',
                'GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'CategoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels',
            ];
            const relations = [
                {
                    tableName: 'CategoryPath.category',
                    aliasName: 'category',
                },
                {
                    tableName: 'CategoryPath.path',
                    aliasName: 'path',
                },
                {
                    tableName: 'category.vendorCategory',
                    aliasName: 'vendorCategory',
                },
            ];
            const groupBy = [
                {
                    name: 'CategoryPath.category_id',
                },
            ];
            const whereConditions = [];
            const searchConditions = [];
            whereConditions.push({
                name: 'vendorCategory.vendorId',
                op: 'and',
                value: id,
            });
            const sort = [];
            sort.push({
                name: 'vendorCategory.category_id',
                order: 'ASC',
            });
            const vendorCategoryList = yield this.categoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const findProduct = vendorCategoryList.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = val;
                return temp;
            }));
            const results = yield Promise.all(findProduct);
            const successResponse = {
                status: 1,
                message: 'Successfully got the seller category list',
                data: results,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Vendor Category List by Group API
    /**
     * @api {get} /api/vendor-category/vendor-category-list/:id Vendor Category List API
     * @apiGroup Admin Vendor Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Boolean} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor category list",
     *       "data": {
     *       "categoryId": "",
     *       "sortOrder": "",
     *       "parentInt": "",
     *       "name": "",
     *       "levels": ""
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-category/vendor-category-list/:id
     * @apiErrorExample {json} Vendor category error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorCategoryListbyGroup(id, limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findvendor = yield this.vendorService.findOne({ where: { customerId: id } });
            const select = [
                'CategoryPath.categoryId as categoryId',
                'category.sortOrder as sortOrder',
                'category.parentInt as parentInt',
                'category.name as name',
                'GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'CategoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels',
            ];
            const relations = [
                {
                    tableName: 'CategoryPath.category',
                    aliasName: 'category',
                },
                {
                    tableName: 'CategoryPath.path',
                    aliasName: 'path',
                },
                {
                    tableName: 'category.vendorGroupCategory',
                    aliasName: 'vendorGroupCategory',
                },
            ];
            const groupBy = [
                {
                    name: 'CategoryPath.category_id',
                },
            ];
            const whereConditions = [];
            const searchConditions = [];
            whereConditions.push({
                name: 'vendorGroupCategory.vendor_group_id',
                op: 'and',
                value: findvendor.vendorGroupId,
            });
            const sort = [];
            sort.push({
                name: 'vendorGroupCategory.category_id',
                order: 'ASC',
            });
            const vendorCategoryList = yield this.categoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const successResponse = {
                status: 1,
                message: 'Successfully got the seller category list',
                data: vendorCategoryList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Delete Vendor Category API
    /**
     * @api {delete} /api/vendor-category/delete-vendor-category/:id Delete Vendor Category API
     * @apiGroup Admin Vendor Category
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted vendor category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-category/delete-vendor-category/:id
     * @apiErrorExample {json} Vendor category error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteVendorCategory(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorCategoryService.findOne({
                where: {
                    vendoryCategoryId: id,
                },
            });
            if (!vendor) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid seller Category Id',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteVendor = yield this.vendorCategoryService.delete(id);
            if (deleteVendor) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the seller category',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to delete the seller category',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(['admin', 'assign-category']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateVendorCategoryRequest_1.CreateVendorCategoryRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCategoryController.prototype, "createVendorCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateVendorCategoryRequest_1.CreateVendorCategoryRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCategoryController.prototype, "updateVendorCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/category/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCategoryController.prototype, "vendorCategoryList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-category-list/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, String, Boolean, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCategoryController.prototype, "vendorCategoryListbyGroup", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete-vendor-category/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCategoryController.prototype, "deleteVendorCategory", null);
VendorCategoryController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/vendor-category'),
    tslib_1.__metadata("design:paramtypes", [VendorCategoryService_1.VendorCategoryService,
        VendorService_1.VendorService,
        CategoryPathService_1.CategoryPathService])
], VendorCategoryController);
exports.VendorCategoryController = VendorCategoryController;
//# sourceMappingURL=VendorCategoryController.js.map