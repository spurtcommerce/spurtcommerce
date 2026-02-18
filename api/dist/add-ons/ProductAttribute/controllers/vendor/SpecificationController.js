"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorSpecificationController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const SpecificationService_1 = require("../../../ProductAttribute/services/SpecificationService");
const SpecificationToCategoryService_1 = require("../../../ProductAttribute/services/SpecificationToCategoryService");
const typeorm_1 = require("typeorm");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const SpecificationToAttributeGroupService_1 = require("../../../ProductAttribute/services/SpecificationToAttributeGroupService");
const FamilyService_1 = require("../../../ProductAttribute/services/FamilyService");
const CategoryPathService_1 = require("../../../../src/api/core/services/CategoryPathService");
const VendorService_1 = require("../../../../src/api/core/services/VendorService");
const typedi_1 = require("typedi");
let VendorSpecificationController = class VendorSpecificationController {
    constructor(specificationService, specificationToCategoryService, specificationToAttributeGroupService, familyService, categoryPathService, vendorService) {
        this.specificationService = specificationService;
        this.specificationToCategoryService = specificationToCategoryService;
        this.specificationToAttributeGroupService = specificationToAttributeGroupService;
        this.familyService = familyService;
        this.categoryPathService = categoryPathService;
        this.vendorService = vendorService;
        // --
    }
    // Specification List API
    /**
     * @api {get} /api/vendor-specification Specification list API
     * @apiGroup Vendor Specification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count
     * @apiParam (Request body) {Number} keyword keyword
     * @apiParam (Request body) {Number} categoryIds categoryIds
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "messge": "Successfully got Specification List.",
     *    "data": [
     *        {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedBy": 1,
     *            "modifiedDate": "",
     *            "id": 1,
     *            "name": "",
     *            "slug": "",
     *            "isActive": 1,
     *            "isDelete": 0,
     *            "attributeGroups": [
     *                {
     *                    "createdBy": 1,
     *                    "createdDate": "",
     *                    "modifiedBy": 1,
     *                    "modifiedDate": "",
     *                    "id": 1,
     *                    "name": "",
     *                    "sortOrder": 1,
     *                    "isActive": 1,
     *                    "isDelete": 1,
     *                    "attributes": [
     *                        {
     *                            "createdBy": 1,
     *                            "createdDate": "",
     *                            "modifiedDate": "",
     *                            "modifiedBy": 1,
     *                            "type": "",
     *                            "sortOrder": 1,
     *                            "isMandatory": 1,
     *                            "description": "",
     *                            "label": "",
     *                            "useAsFilter": "",
     *                            "sectionName": "",
     *                            "defaultValue": 1,
     *                            "isActive": 1,
     *                            "isDelete": 0,
     *                            "attributeValues": [
     *                                {
     *                                    "createdBy": 1,
     *                                    "createdDate": "",
     *                                    "modifiedBy": 1,
     *                                    "modifiedDate": "",
     *                                    "id": 1,
     *                                    "attributeId": 1,
     *                                    "value": "",
     *                                    "isActive": 1,
     *                                    "isDelete": 0
     *                                }
     *                            ]
     *                        }
     *                    ]
     *                }
     *            ],
     *            "attributeCount": 1,
     *            "attributeGroupCount": 1
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/specification
     * @apiErrorExample {json} Specification error
     * HTTP/1.1 500 Internal Server Error
     */
    Specificationlist(limit, offset, count, keyword, categoryIds, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const condition = {};
            if (limit) {
                condition.take = limit;
                if (offset) {
                    condition.skip = offset;
                }
            }
            const whereCondition = {};
            whereCondition.isActive = 1;
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                whereCondition.name = (0, typeorm_1.Like)(`%${keyword}%`);
            }
            if (categoryIds === null || categoryIds === void 0 ? void 0 : categoryIds.trim()) {
                const categoryidsNum = categoryIds.split(',').map((categoryId) => Number(categoryId));
                const specificationDetails = yield this.specificationToCategoryService.find({
                    where: {
                        categoryId: (0, typeorm_1.In)(categoryidsNum),
                    },
                });
                const specIds = specificationDetails.map((spec) => spec.specificationId);
                whereCondition.id = (0, typeorm_1.In)(specIds);
            }
            whereCondition.isDelete = 0;
            condition.where = whereCondition;
            condition.relations = ['attributeGroups', 'attributeGroups.attributes', 'attributeGroups.attributes.attributeValues'];
            condition.order = {
                createdDate: 'DESC',
            };
            const specificationList = yield this.specificationService.find(condition);
            return response.status(200).send({
                status: 1,
                messge: 'Successfully got Specification List.',
                data: count ? specificationList.length : specificationList
                    .map((specification) => {
                    const attributeGroupCount = specification.attributeGroups.length;
                    const attributeCount = (specification.attributeGroups
                        .map((attributeGroup) => attributeGroup.attributes.length))
                        .reduce((acc, curr) => acc + curr, 0);
                    return Object.assign(Object.assign({}, specification), { attributeCount, attributeGroupCount });
                }),
            });
        });
    }
    // get vendor family list
    /**
     * @api {get} /api/vendor-specification/vendor-family Get Vendor Specification Family List API
     * @apiGroup Vendor Specification
     * @apiDescription This API retrieves a list of vendor specification families with optional pagination.
     *
     * @apiParam (Query Parameters) {Number} limit limit
     * @apiParam (Query Parameters) {Number} offset offset
     * @apiParam (Query Parameters) {Number} count count
     *
     * @apiHeader {String} Authorization Bearer token is required.
     *
     * @apiParamExample {url} Request Example
     * /api/vendor-specification/family?limit=10&offset=0&count=0
     *
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully created family.",
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
     * @apiSampleRequest /api/vendor-specification/vendor-family
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Failed to fetch vendor specification family list"
     * }
     */
    getFamily(limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const whereConditions = [];
            const searchConditions = [];
            const sort = [{
                    name: 'Family.createdDate',
                    order: 'DESC',
                }];
            const family = yield this.familyService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, [], [], sort, count);
            return response.status(200).send({
                status: 1,
                message: `Successfully created family.`,
                data: family,
            });
        });
    }
    // get vendor category list
    /**
     * @api {get} /api/vendor-specification/vendor-category-list Get Vendor Category List API
     * @apiGroup Vendor Specification
     * @apiDescription This API retrieves a list of vendor categories with optional filters and pagination.
     *
     * @apiParam (Query Parameters) {Number} limit limit.
     * @apiParam (Query Parameters) {Number} offset offset.
     * @apiParam (Query Parameters) {String} keyword Keyword.
     * @apiParam (Query Parameters) {Number} familyId familyId.
     * @apiParam (Query Parameters) {Boolean} count count.
     *
     * @apiHeader {String} Authorization Bearer token is required.
     *
     * @apiParamExample {url} Request Example
     * /api/vendor-specification/vendor-category-list?limit=10&offset=0&keyword=mens&familyId=2&count=false
     *
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully got the vendor category list",
     *   "data": [
     *     {
     *       "categoryId": "",
     *       "sortOrder": "",
     *       "parentInt": "",
     *       "categoryName": "",
     *       "levels": ""
     *     }
     *   ]
     * }
     *
     * @apiSampleRequest /api/vendor-specification/vendor-category-list
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Failed to fetch vendor category list"
     * }
     */
    vendorCategoryListbyGroup(limit, offset, keyword, familyId, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorId = request.user.vendorId;
            const findvendor = yield this.vendorService.findOne({ where: { vendorId } });
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
            if (familyId || familyId === 0) {
                whereConditions.push({
                    name: 'category.familyId',
                    op: 'and',
                    value: familyId,
                });
            }
            const sort = [];
            sort.push({
                name: 'vendorGroupCategory.category_id',
                order: 'ASC',
            });
            const vendorCategoryList = yield this.categoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const successResponse = {
                status: 1,
                message: 'Successfully got the vendor category list',
                data: vendorCategoryList,
            };
            return response.status(200).send(successResponse);
        });
    }
    //   Get attribute API
    /**
     * @api {get} /api/vendor-specification/:id Get Attribute API
     * @apiGroup Vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id (Required)
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Got attribute",
     *    "data": {
     *    "createdBy": 1,
     *    "createdDate": "",
     *    "modifiedBy": 1,
     *    "modifiedDate": "",
     *    "id": 1,
     *    "name": "",
     *    "slug": "",
     *    "isActive": 1,
     *    "isDelete": 0,
     *    "attributeGroups": [
     *        {
     *            "id": 1,
     *            "specificationId": 1,
     *            "attributeGroupId": 1,
     *            "attributes": [
     *                {
     *                    "createdBy": 1,
     *                    "createdDate": "",
     *                    "modifiedBy": 1,
     *                    "modifiedDate": "",
     *                    "id": 1,
     *                    "name": "",
     *                    "type": "",
     *                    "sortOrder": 1,
     *                    "isMandatory": 1,
     *                    "description": "",
     *                    "label": "",
     *                    "useAsFilter": "",
     *                    "sectionName": "",
     *                    "defaultValue": "",
     *                    "isActive": 1,
     *                    "isDelete": 0,
     *                    "attributeValues": [
     *                        {
     *                            "createdBy": 1,
     *                            "createdDate": "",
     *                            "modifiedBy": 0,
     *                            "modifiedDate": "",
     *                            "id": 1,
     *                            "attributeId": 1,
     *                            "value": "",
     *                            "isActive": 1,
     *                            "isDelete": 0
     *                     }
     *                 ]
     *              }
     *            ]
     *         }
     *       ]
     *    }
     * }
     * @apiSampleRequest api/vendor-specification/:id
     * @apiErrorExample {json} Attribute error
     * HTTP/1.1 500 Internal Server Error
     */
    getAttribute(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const specification = yield this.specificationService.findOne({
                where: {
                    id,
                },
            });
            if (!specification) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Specification Id',
                };
                return response.status(400).send(errorResponse);
            }
            const specificationDetails = yield this.specificationToAttributeGroupService.find({
                where: {
                    specificationId: specification.id,
                },
                relations: ['attributes', 'attributes.attributeValues'],
            });
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Specification.`,
                data: Object.assign(Object.assign({}, specification), { attributeGroups: specificationDetails }),
            });
        });
    }
};
exports.VendorSpecificationController = VendorSpecificationController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('categoryIds')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorSpecificationController.prototype, "Specificationlist", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-family'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorSpecificationController.prototype, "getFamily", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-category-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('familyId')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Req)()),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Boolean, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorSpecificationController.prototype, "vendorCategoryListbyGroup", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorSpecificationController.prototype, "getAttribute", null);
exports.VendorSpecificationController = VendorSpecificationController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/vendor-specification'),
    tslib_1.__metadata("design:paramtypes", [SpecificationService_1.SpecificationService,
        SpecificationToCategoryService_1.SpecificationToCategoryService,
        SpecificationToAttributeGroupService_1.SpecificationToAttributeGroupService,
        FamilyService_1.FamilyService,
        CategoryPathService_1.CategoryPathService,
        VendorService_1.VendorService])
], VendorSpecificationController);
//# sourceMappingURL=SpecificationController.js.map