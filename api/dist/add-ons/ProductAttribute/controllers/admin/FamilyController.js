"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const Family_1 = require("../../models/Family");
const FamilyService_1 = require("../../../ProductAttribute/services/FamilyService");
const CategoryService_1 = require("../../../../src/api/core/services/CategoryService");
const CreateFamilyRequest_1 = require("./requests/CreateFamilyRequest");
const UpdateFamilyRequest_1 = require("./requests/UpdateFamilyRequest");
const CategoryPathService_1 = require("../../../../src/api/core/services/CategoryPathService");
const ProductToCategoryService_1 = require("../../../../src/api/core/services/ProductToCategoryService");
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
let FamilyController = class FamilyController {
    constructor(familyService, categoryService, categoryPathService, productToCategoryService) {
        this.familyService = familyService;
        this.categoryService = categoryService;
        this.categoryPathService = categoryPathService;
        this.productToCategoryService = productToCategoryService;
        // --
    }
    // create family
    /**
     * @api {post} /api/family Add Family API
     * @apiGroup Family
     * @apiDescription This API allows users to add a new family.
     *
     * @apiParam (Request body) {String} familyName "".
     * @apiParam (Request body) {Number[]} categoryIds "".
     *
     * @apiHeader {String} Authorization Bearer token is required.
     *
     * @apiParamExample {json} Request Example
     * {
     *   "familyName": "",
     *   "categoryIds": []
     * }
     *
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Family created successfully."
     * }
     *
     * @apiSampleRequest /api/family
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Failed to create family"
     * }
     */
    createFamily(createFamily, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newFamily = new Family_1.Family();
            newFamily.familyName = createFamily.familyName;
            const savedFamily = yield this.familyService.create(newFamily);
            yield this.categoryService.bulkFamilyUpdate(createFamily.categoryIds, savedFamily.id);
            const successResponse = {
                status: 1,
                message: `Family created successfully.`,
            };
            return response.status(200).send(successResponse);
        });
    }
    // update family
    /**
     * @api {put} /api/family/:id Update Family API
     * @apiGroup Family
     * @apiDescription This API allows users to update an existing family by ID.
     *
     * @apiParam (Request body) {String} familyName "".
     * @apiParam (Request body) {Number[]} categoryIds "".
     * @apiParam (Request body) {Number[]} deleteCategoryIds "".
     *
     * @apiParam (URL parameter) {Number} id Family ID to update.
     *
     * @apiHeader {String} Authorization Bearer token is required.
     *
     * @apiParamExample {json} Request Example
     * {
     *   "familyName": "",
     *   "categoryIds": [""],
     *   "deleteCategoryIds": [""]
     * }
     *
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Family updated successfully."
     * }
     *
     * @apiSampleRequest /api/family/:id
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Failed to update family"
     * }
     */
    updateFamily(id, updateFamily, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const family = yield this.familyService.findOne({
                where: {
                    id,
                },
            });
            if (!family) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid family id.',
                };
                return response.status(400).send(errorResponse);
            }
            family.familyName = updateFamily.familyName;
            if (updateFamily.categoryIds.length !== 0) {
                yield this.categoryService.bulkFamilyUpdate(updateFamily.categoryIds, family.id);
            }
            if (updateFamily.deleteCategoryIds.length !== 0) {
                yield this.categoryService.bulkFamilyUpdate(updateFamily.deleteCategoryIds, 0);
            }
            yield this.familyService.update(family);
            const successResponse = {
                status: 1,
                message: `Successfully updated family.`,
            };
            return response.status(200).send(successResponse);
        });
    }
    // get family list
    /**
     * @api {get} /api/family Get Family List API
     * @apiGroup Family
     * @apiDescription This API retrieves a list of families with optional filtering and pagination.
     *
     * @apiParam (Query Parameters) {Number} limit Number of records to return.
     * @apiParam (Query Parameters) {Number} offset Number of records to skip.
     * @apiParam (Query Parameters) {String} keyword Keyword to filter families by name.
     * @apiParam (Query Parameters) {Number} count If set to 1, returns only the count.
     *
     * @apiHeader {String} Authorization Bearer token is required.
     *
     * @apiParamExample {url} Request Example
     * /api/family?limit=10&offset=0&keyword=furniture&count=0
     *
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully got family.",
     *   "data": [
     *     {
     *       "createdBy": "",
     *       "createdDate": "",
     *       "modifiedBy": "",
     *       "modifiedDate": "",
     *       "id": "",
     *       "familyName": "",
     *       "isActive": "",
     *       "isDelete": ""
     *     }
     *   ]
     * }
     *
     * @apiSampleRequest /api/family
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Failed to fetch family list"
     * }
     */
    getFamilyList(limit, offset, keyword, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const whereConditions = [];
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['Family.familyName'],
                    value: keyword,
                });
            }
            const sort = [{
                    name: 'Family.createdDate',
                    order: 'DESC',
                }];
            const family = yield this.familyService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, [], [], sort, count, false);
            if (count) {
                return response.status(200).send({
                    status: 1,
                    message: `Successfully got family count.`,
                    data: family,
                });
            }
            const category = yield this.categoryService.find({ where: {} });
            const result = family.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _a;
                value.categoryCount = (_a = category.filter((item) => item.familyId === value.id).length) !== null && _a !== void 0 ? _a : 0;
                return value;
            }));
            const successResponse = {
                status: 1,
                message: `Successfully got family.`,
                data: yield Promise.all(result),
            };
            return response.status(200).send(successResponse);
        });
    }
    // delete family
    /**
     * @api {delete} /api/family/:id Delete Family API
     * @apiGroup Family
     * @apiDescription This API allows users to delete a family by ID.
     *
     * @apiParam (URL parameter) {Number} id Family ID to delete.
     *
     * @apiHeader {String} Authorization Bearer token is required.
     *
     * @apiParamExample {url} Request Example
     * /api/family/1
     *
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully deleted family."
     * }
     *
     * @apiSampleRequest /api/family/:id
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Failed to delete family"
     * }
     */
    deleteFamily(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const family = yield this.familyService.findOne({
                where: {
                    id,
                },
            });
            if (!family) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid family id.',
                };
                return response.status(400).send(errorResponse);
            }
            const categories = yield this.categoryService.find({ where: { familyId: family.id } });
            const categoryIds = categories.map((category) => category.categoryId);
            const productCategory = yield this.productToCategoryService.findAll({ where: { categoryId: (0, typeorm_1.In)(categoryIds) } });
            if (productCategory.length) {
                const errorResponse = {
                    status: 0,
                    message: 'Family mapped with product, you cannot delete.',
                };
                return response.status(400).send(errorResponse);
            }
            yield this.categoryService.bulkFamilyUpdate(categoryIds, 0);
            yield this.familyService.delete({ id: family.id });
            const successResponse = {
                status: 1,
                message: `Successfully deleted family.`,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Get Category List Family API
    /**
     * @api {get} /api/family/category Get category list family API
     * @apiGroup Admin Family
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} count count
     * @apiParam (Request body) {Number} keyword keyword
     * @apiParam (Request body) {Number} familyName familyName
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Got family Category List.",
     *    "data": [
     *        {
     *            "categoryId": 1,
     *            "sortOrder": 1,
     *            "parentInt": 1,
     *            "name": "",
     *            "image": "",
     *            "imagePath": "",
     *            "isActive": 1,
     *            "createdDate": "",
     *            "levels": "",
     *            "familyName":"",
     *            "specifications": [
     *                {
     *                    "createdBy": 1,
     *                    "createdDate": "",
     *                    "modifiedBy": 1,
     *                    "modifiedDate": "",
     *                    "id": 1,
     *                    "name": "",
     *                    "slug": "",
     *                    "isActive": 1,
     *                    "isDelete": 0
     *                }
     *            ]
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/family/category
     * @apiErrorExample {json} family category error
     * HTTP/1.1 500 Internal Server Error
     */
    getCategoryListFamily(response, limit, offset, status, keyword, familyId, sortOrder, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'CategoryPath.categoryId as categoryId',
                'category.sortOrder as sortOrder',
                'category.parentInt as parentInt',
                'category.name as categoryName',
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
            ];
            const groupBy = [
                {
                    name: 'CategoryPath.category_id',
                },
            ];
            const whereConditions = [];
            if (status || status === 0) {
                whereConditions.push({
                    name: 'category.isActive',
                    op: 'where',
                    value: status,
                });
            }
            if (familyId || familyId === 0) {
                whereConditions.push({
                    name: 'category.familyId',
                    op: 'where',
                    value: familyId,
                });
            }
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['category.name'],
                    value: keyword,
                });
            }
            const sort = [];
            if (sortOrder) {
                sort.push({
                    name: 'category.sortOrder',
                    order: sortOrder === 2 ? 'DESC' : 'ASC',
                });
            }
            else {
                sort.push({
                    name: 'category.createdDate',
                    order: 'DESC',
                });
            }
            const categoryLists = yield this.categoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            if (count) {
                return response.status(200).send({
                    status: 1,
                    message: `Successfully got category count.`,
                    data: categoryLists.length,
                });
            }
            return response.status(200).send({
                status: 1,
                message: `Successfully got category list.`,
                data: categoryLists,
            });
        });
    }
    // Get family list
    /**
     * @api {get} /api/family/:id Get family detail API
     * @apiGroup Family
     * @apiHeader {String} Authorization Bearer token is required.
     * @apiParam (Query Parameters) {Number} id id.
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully got family detail.",
     *   "data": [
     *     {
     *       "createdBy": "",
     *       "createdDate": "",
     *       "modifiedBy": "",
     *       "modifiedDate": "",
     *       "id": "",
     *       "familyName": "",
     *       "isActive": "",
     *       "isDelete": ""
     *     }
     *   ]
     * }
     * @apiSampleRequest /api/family/:id
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     */
    getFamilyDetail(familyId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const familyData = yield this.familyService.findOne({
                where: {
                    id: familyId,
                    isDelete: 0,
                },
            });
            if (!familyData) {
                const errorResponse = {
                    status: 1,
                    message: 'Family not founded.',
                };
                return response.status(400).send(errorResponse);
            }
            const category = yield this.categoryService.find({ where: { familyId: familyData.id } });
            const categoryValue = category.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const categoryLevel = yield this.categoryPathService.findCategoryLevel(value.categorySlug);
                value.levels = categoryLevel.levels;
                return value;
            }));
            const results = yield Promise.all(categoryValue);
            familyData.categories = results;
            const successResponse = {
                status: 1,
                message: 'Successfully got family detail.',
                data: familyData,
            };
            return response.status(200).send(successResponse);
        });
    }
};
exports.FamilyController = FamilyController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateFamilyRequest_1.CreateFamily, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FamilyController.prototype, "createFamily", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, UpdateFamilyRequest_1.UpdateFamily, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FamilyController.prototype, "updateFamily", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FamilyController.prototype, "getFamilyList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FamilyController.prototype, "deleteFamily", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/category'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('familyId')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('sortOrder')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, Number, Number, String, Number, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], FamilyController.prototype, "getCategoryListFamily", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FamilyController.prototype, "getFamilyDetail", null);
exports.FamilyController = FamilyController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/family'),
    tslib_1.__metadata("design:paramtypes", [FamilyService_1.FamilyService,
        CategoryService_1.CategoryService,
        CategoryPathService_1.CategoryPathService,
        ProductToCategoryService_1.ProductToCategoryService])
], FamilyController);
//# sourceMappingURL=FamilyController.js.map