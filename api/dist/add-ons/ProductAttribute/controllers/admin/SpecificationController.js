"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const Specification_1 = require("../../models/Specification");
const CreateSpecificationRequest_1 = require("./requests/CreateSpecificationRequest");
const SpecificationService_1 = require("../../../ProductAttribute/services/SpecificationService");
const SpecificationToAttributeGroupService_1 = require("../../../ProductAttribute/services/SpecificationToAttributeGroupService");
const SpecificationToAttributeGroup_1 = require("../../../ProductAttribute/models/SpecificationToAttributeGroup");
const typeorm_1 = require("typeorm");
const ProductToSpecificationService_1 = require("../../services/ProductToSpecificationService");
const CategoryPathService_1 = require("../../../../src/api/core/services/CategoryPathService");
const SpecificationToCategoryService_1 = require("../../services/SpecificationToCategoryService");
const SpecificationToCategory_1 = require("../../models/SpecificationToCategory");
const SpecificationAttributeGrpToAttribute_1 = require("../../models/SpecificationAttributeGrpToAttribute");
const SpecificationAttrGrpToAttributeService_1 = require("../../services/SpecificationAttrGrpToAttributeService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const typedi_1 = require("typedi");
let SpecificationController = class SpecificationController {
    constructor(specificationService, specificationToAttributeGroupService, productToSpecificationService, categoryPathService, specificationToCategoryService, specificationAttrGrpToAttribute) {
        this.specificationService = specificationService;
        this.specificationToAttributeGroupService = specificationToAttributeGroupService;
        this.productToSpecificationService = productToSpecificationService;
        this.categoryPathService = categoryPathService;
        this.specificationToCategoryService = specificationToCategoryService;
        this.specificationAttrGrpToAttribute = specificationAttrGrpToAttribute;
        // --
    }
    // Specification List API
    /**
     * @api {get} /api/specification Specification list API
     * @apiGroup Admin Specification
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
     *                            "modifiedBy": 1,
     *                            "modifiedDate": "",
     *                            "id": 1,
     *                            "name": "",
     *                            "type": "",
     *                            "sortOrder": 1,
     *                            "isMandatory": 1,
     *                            "description": "",
     *                            "label": "",
     *                            "useAsFilter": 1,
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
    // Specification List V1 API
    /**
     * @api {get} /api/specification Specification list V1 API
     * @apiGroup Admin Specification
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
     *                    "sortOrder": "",
     *                    "isActive": 1,
     *                    "isDelete": 0,
     *                    "attributes": [
     *                        {
     *                            "createdBy": 1,
     *                            "createdDate": "",
     *                            "modifiedBy": 1,
     *                            "modifiedDate": "",
     *                            "id": 1,
     *                            "name": "",
     *                            "type": "",
     *                            "sortOrder": 1,
     *                            "isMandatory": 1,
     *                            "description": "",
     *                            "label": "",
     *                            "useAsFilter": 1,
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
     *   }
     * @apiSampleRequest /api/specification
     * @apiErrorExample {json} SpecificationV1 error
     * HTTP/1.1 500 Internal Server Error
     */
    SpecificationlistV1(limit, offset, count, keyword, categoryIds, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const condition = {};
            if (limit) {
                condition.take = limit;
                if (offset) {
                    condition.skip = offset;
                }
            }
            const whereCondition = {};
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
                    const attributes = [];
                    for (const attributeGroup of specification.attributeGroups) {
                        attributes.push(...attributeGroup.attributes);
                    }
                    delete specification.attributeGroups;
                    return Object.assign(Object.assign({}, specification), { attributes, attributeCount, attributeGroupCount });
                }),
            });
        });
    }
    // Create Specification To Category
    /**
     * @api {put} /api/specification/category Create specification to category
     * @apiGroup Admin Specification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} categoryId categoryId
     * @apiParam (Request body) {Number} specificationIds specificationIds
     * @apiParam (Request body) {Number} deleteSpecificationIds deleteSpecificationIds
     * @apiParamExample {json} Input
     * {
     *    "categoryId": "",
     *    "specificationIds": [],
     *    "deleteSpecificationIds": []
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Updated Specification To Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/specification/category
     * @apiErrorExample {json} Attribute error
     * HTTP/1.1 500 Internal Server Error
     */
    createSpecificationToCategory(payload, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (payload.length) {
                for (const specCate of payload) {
                    for (const specId of (_a = specCate.specificationIds) !== null && _a !== void 0 ? _a : []) {
                        const specToCategory = new SpecificationToCategory_1.SpecificationToCategory();
                        specToCategory.categoryId = specCate.categoryId;
                        specToCategory.specificationId = specId;
                        yield this.specificationToCategoryService.create(specToCategory);
                    }
                    if ((_b = specCate.deleteSpecificationIds) === null || _b === void 0 ? void 0 : _b.length) {
                        yield this.specificationToCategoryService.delete({ categoryId: specCate.categoryId, specificationId: (0, typeorm_1.In)(specCate.deleteSpecificationIds) });
                    }
                }
            }
            return response.status(200).send({
                status: 1,
                message: `Successfully Updated Specification To Category.`,
            });
        });
    }
    // Get Category List Specification API
    /**
     * @api {get} /api/specification/category Get category list specification API
     * @apiGroup Admin Specification
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
     *    "message": "Successfully Got Specfication Category List.",
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
     * @apiSampleRequest /api/specification/category
     * @apiErrorExample {json} Specification category error
     * HTTP/1.1 500 Internal Server Error
     */
    getCategoryListSpecification(response, limit, offset, status, keyword, familyName, sortOrder, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'CategoryPath.categoryId as categoryId',
                'category.sortOrder as sortOrder',
                'category.parentInt as parentInt',
                'category.name as name',
                'category.image as image',
                'category.imagePath as imagePath',
                'category.isActive as isActive',
                'category.createdDate as createdDate',
                'family.familyName as familyName',
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
            relations.push({
                tableName: 'family',
                op: 'left-cond',
                cond: 'category.family_id = family.id',
                aliasName: 'family',
            });
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
            if (familyName && familyName !== '') {
                whereConditions.push({
                    name: 'family.familyName',
                    op: 'and',
                    value: `'${familyName}'`,
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
                    name: 'sortOrder',
                    order: sortOrder === 2 ? 'DESC' : 'ASC',
                });
            }
            else {
                sort.push({
                    name: 'createdDate',
                    order: 'DESC',
                });
            }
            const categoryLists = yield this.categoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            if (count) {
                return response.status(200).send({
                    status: 1,
                    message: `Successfully Got Specfication Category Count.`,
                    data: categoryLists.length,
                });
            }
            const categorySpec = yield Promise.all(categoryLists.map((category) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const specificationIds = (yield this.specificationToCategoryService.find({
                    where: {
                        categoryId: category.categoryId,
                    },
                }))
                    .map((specToCategory) => specToCategory.specificationId);
                const specifications = yield this.specificationService.find({
                    where: {
                        id: (0, typeorm_1.In)(specificationIds),
                    },
                });
                return Object.assign(Object.assign({}, category), { specifications });
            })));
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Specfication Category List.`,
                data: categorySpec,
            });
        });
    }
    // Get Attribute API
    /**
     * @api {get} /api/specification/:id Get attribute API
     * @apiGroup Admin Specification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id (Required)
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Got Specification.",
     *    "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "id": 1,
     *        "name": "",
     *        "slug": "",
     *        "isActive": 1,
     *        "isDelete": 0,
     *        "attributeGroups": [
     *            {
     *                "id": 1,
     *                "specificationId": 1,
     *                "attributeGroupId": 1,
     *                "attributes": [
     *                    {
     *                        "createdBy": 1,
     *                        "createdDate": "",
     *                        "modifiedBy": 1,
     *                        "modifiedDate": "",
     *                        "id": 1,
     *                        "name": "",
     *                        "type": "",
     *                        "sortOrder": 1,
     *                        "isMandatory": 1,
     *                        "description": "",
     *                        "label": "",
     *                        "useAsFilter": 1,
     *                        "sectionName": "",
     *                        "defaultValue": 1,
     *                        "isActive": 1,
     *                        "isDelete": 0,
     *                        "attributeValues": [
     *                            {
     *                                "createdBy": 1,
     *                                "createdDate": "",
     *                                "modifiedBy": 1,
     *                                "modifiedDate": "",
     *                                "id": 1,
     *                                "attributeId": 1,
     *                                "value": "",
     *                                "isActive": 1,
     *                                "isDelete": 0
     *                            }
     *                        ]
     *                    }
     *                ]
     *            }
     *        ]
     *    }
     * }
     * @apiSampleRequest /api/specification/:id
     * @apiErrorExample {json} Specification attribute error
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
    // Create Specification API
    /**
     * @api {post} /api/specification Create specification API
     * @apiGroup Admin Specification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..255}} name name (Required)
     * @apiParam (Request body) {Number} status status (Required)
     * @apiParam (Request body) {Object[]} attributeGroup attributeGroup
     * @apiParam (Request body) {Number} attributeGroupId attributeGroupId
     * @apiParam (Request body) {Number} attributeIds attributeIds
     * @apiParam (Request body) {Number} deleteAttributeGroupIds deleteAttributeGroupIds
     * @apiParam (Request body) {Number} deleteAttributes deleteAttributes
     * @apiParamExample {json} Input
     * {
     *    "name": "",
     *    "status": 1,
     *    "attributeGroup": [
     *        {
     *            "attributeGroupId": 1,
     *            "attributeIds": []
     *        }
     *    ],
     *    "deleteAttributeGroupIds": [],
     *    "deleteAttributes": []
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Created Specification.",
     *    "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "id": 1,
     *        "name": "",
     *        "slug": "",
     *        "isActive": 1,
     *        "isDelete": 0,
     *        "attributeGroups": [
     *            {
     *                "id": 1,
     *                "specificationId": 1,
     *                "attributeGroupId": 1,
     *                "attributes": [
     *                    {
     *                        "createdBy": 1,
     *                        "createdDate": "",
     *                        "modifiedBy": 1,
     *                        "modifiedDate": "",
     *                        "id": 1,
     *                        "name": "",
     *                        "type": "",
     *                        "sortOrder": 1,
     *                        "isMandatory": 1,
     *                        "description": "",
     *                        "label": "",
     *                        "useAsFilter": "",
     *                        "sectionName": "",
     *                        "defaultValue": 1,
     *                        "isActive": 1,
     *                        "isDelete": 0
     *                    }
     *                ]
     *            }
     *        ]
     *    }
     * }
     * @apiSampleRequest /api/specification
     * @apiErrorExample {json} Specification error
     * HTTP/1.1 500 Internal Server Error
     */
    createSpecification(response, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const specification = new Specification_1.Specification();
            specification.name = payload.name;
            specification.isActive = payload.status ? 1 : 0;
            specification.slug = yield this.validate_slug(payload.name.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.':*?<>{}]/g, '').toLowerCase());
            const specSave = yield this.specificationService.create(specification);
            for (const attributeGroup of payload.attributeGroup) {
                const specificationToAttributeGroup = new SpecificationToAttributeGroup_1.SpecificationToAttributeGroup();
                specificationToAttributeGroup.specificationId = specSave.id;
                specificationToAttributeGroup.attributeGroupId = attributeGroup.attributeGroupId;
                const specificationToAttributeGroupSave = yield this.specificationToAttributeGroupService.create(specificationToAttributeGroup);
                for (const attributeId of attributeGroup.attributeIds) {
                    const specificationToAttributeGrpToAttr = new SpecificationAttributeGrpToAttribute_1.SpecificationAttrGrpToAttribute();
                    specificationToAttributeGrpToAttr.attributeId = attributeId;
                    specificationToAttributeGrpToAttr.specAttrGrpId = specificationToAttributeGroupSave.id;
                    yield this.specificationAttrGrpToAttribute.create(specificationToAttributeGrpToAttr);
                }
            }
            const specificationDetails = yield this.specificationService.findOne({
                where: {
                    id: specSave.id,
                },
            });
            const specificationDetail = yield this.specificationToAttributeGroupService.find({
                where: {
                    specificationId: specSave.id,
                },
                relations: ['attributes'],
            });
            return response.status(200).send({
                status: 1,
                message: `Successfully Created Specification.`,
                data: Object.assign(Object.assign({}, specificationDetails), { attributeGroups: specificationDetail }),
            });
        });
    }
    // Update Specification API
    /**
     * @api {put} /api/specification/:id Update specification API
     * @apiGroup Admin Specification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiParam (Request body) {String{..255}} name name
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Object[]} attributeGroup attributeGroup
     * @apiParam (Request body) {Number} attributeGroupId attributeGroupId
     * @apiParam (Request body) {Number} attributeIds attributeIds
     * @apiParam (Request body) {Number} deleteAttributeGroupIds deleteAttributeGroupIds
     * @apiParam (Request body) {Number} deleteAttributes deleteAttributes
     * @apiParamExample {json} Input
     * {
     *    "name": "",
     *    "status": 1,
     *    "attributeGroup": [
     *        {
     *            "attributeGroupId": 1,
     *            "attributeIds": []
     *        }
     *    ],
     *    "deleteAttributeGroupIds": [],
     *    "deleteAttributes": []
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     *     {
     *    "status": 1,
     *    "message": "Successfully Update Specification.",
     *    "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "id": 1,
     *        "name": "gae",
     *        "slug": "",
     *        "isActive": 1,
     *        "isDelete": 0,
     *        "attributeGroups": [
     *            {
     *                "id": 1,
     *                "specificationId": 1,
     *                "attributeGroupId": 1,
     *                "attributes": [
     *                    {
     *                        "createdBy": 1,
     *                        "createdDate": "",
     *                        "modifiedBy": 1,
     *                        "modifiedDate": "",
     *                        "id": 1,
     *                        "name": "",
     *                        "type": "",
     *                        "sortOrder": 1,
     *                        "isMandatory": 1,
     *                        "description": "",
     *                        "label": "",
     *                        "useAsFilter": "",
     *                        "sectionName": "",
     *                        "defaultValue": 1,
     *                        "isActive": 1,
     *                        "isDelete": 0
     *                    }
     *                ]
     *            }
     *        ]
     *    }
     * }
     * @apiSampleRequest /api/specification:id
     * @apiErrorExample {json} Specification error
     * HTTP/1.1 500 Internal Server Error
     */
    updateSpecification(id, response, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const spec = yield this.specificationService.findOne({
                where: {
                    id,
                },
            });
            if (!spec) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid Specification Id.`,
                });
            }
            spec.name = payload.name;
            spec.isActive = payload.status;
            spec.slug = yield this.validate_slug((_a = payload.name) === null || _a === void 0 ? void 0 : _a.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.':*?<>{}]/g, '').toLowerCase());
            const specSave = yield this.specificationService.create(spec);
            // Delete Attrbute Group from Specification
            if ((_b = payload.deleteAttributeGroupIds) === null || _b === void 0 ? void 0 : _b.length) {
                yield this.specificationToAttributeGroupService.delete({ specificationId: specSave.id, attributeGroupId: (0, typeorm_1.In)(payload.deleteAttributeGroupIds) });
            }
            if ((_c = payload.deleteAttributes) === null || _c === void 0 ? void 0 : _c.length) {
                for (const attribute of payload.deleteAttributes) {
                    const specAttrGrpDetail = yield this.specificationToAttributeGroupService.findOne({
                        where: {
                            attributeGroupId: attribute.attributeGroupId,
                            specificationId: id,
                        },
                    });
                    yield this.specificationAttrGrpToAttribute.delete({ specAttrGrpId: specAttrGrpDetail.id, attributeId: (0, typeorm_1.In)(attribute.attributeIds) });
                }
            }
            for (const attributeGroup of (_d = payload.attributeGroup) !== null && _d !== void 0 ? _d : []) {
                const specificationToAttributeGroup = new SpecificationToAttributeGroup_1.SpecificationToAttributeGroup();
                specificationToAttributeGroup.specificationId = specSave.id;
                specificationToAttributeGroup.attributeGroupId = attributeGroup.attributeGroupId;
                const specificationToAttributeGroupSave = yield this.specificationToAttributeGroupService.create(specificationToAttributeGroup);
                for (const attributeId of attributeGroup.attributeIds) {
                    const specificationToAttributeGrpToAttr = new SpecificationAttributeGrpToAttribute_1.SpecificationAttrGrpToAttribute();
                    specificationToAttributeGrpToAttr.attributeId = attributeId;
                    specificationToAttributeGrpToAttr.specAttrGrpId = specificationToAttributeGroupSave.id;
                    yield this.specificationAttrGrpToAttribute.create(specificationToAttributeGrpToAttr);
                }
            }
            const specificationDetails = yield this.specificationService.findOne({
                where: {
                    id: specSave.id,
                },
            });
            const specificationDetail = yield this.specificationToAttributeGroupService.find({
                where: {
                    specificationId: specSave.id,
                },
                relations: ['attributes'],
            });
            return response.status(200).send({
                status: 1,
                message: `Successfully Update Specification.`,
                data: Object.assign(Object.assign({}, specificationDetails), { attributeGroups: specificationDetail }),
            });
        });
    }
    // delete Specification API
    /**
     * @api {delete} /api/specification/:id Delete specification API
     * @apiGroup Admin Specification
     * @apiHeader {String} Authorization
     * @apiParam {Number} id id (Required)
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Successfully deleted Specification..!"
     * }
     * @apiSampleRequest /api/specification/:id
     * @apiErrorExample {json} Currency error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteSpecification(response, specId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.specificationService.softDelete({ id: specId });
            yield this.specificationToAttributeGroupService.delete({ specificationId: specId });
            yield this.productToSpecificationService.delete({ specificationId: specId });
            return response.status(200).send({
                status: 1,
                message: `Successfully deleted Specification..!`,
            });
        });
    }
    validate_slug($slug_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function* ($slug, $id = 0, $count = 0) {
            const slugCount = yield this.specificationService.checkSlug($slug, $id, $count);
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
};
exports.SpecificationController = SpecificationController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)()
    // @Authorized()
    ,
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('categoryIds')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SpecificationController.prototype, "Specificationlist", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/v2')
    // @Authorized()
    ,
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('categoryIds')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SpecificationController.prototype, "SpecificationlistV1", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/category'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SpecificationController.prototype, "createSpecificationToCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/category'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('familyName')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('sortOrder')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, Number, Number, String, String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], SpecificationController.prototype, "getCategoryListSpecification", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SpecificationController.prototype, "getAttribute", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, CreateSpecificationRequest_1.CreateSpecification]),
    tslib_1.__metadata("design:returntype", Promise)
], SpecificationController.prototype, "createSpecification", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Body)({ validate: false })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, CreateSpecificationRequest_1.CreateSpecification]),
    tslib_1.__metadata("design:returntype", Promise)
], SpecificationController.prototype, "updateSpecification", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], SpecificationController.prototype, "deleteSpecification", null);
exports.SpecificationController = SpecificationController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/specification'),
    tslib_1.__metadata("design:paramtypes", [SpecificationService_1.SpecificationService,
        SpecificationToAttributeGroupService_1.SpecificationToAttributeGroupService,
        ProductToSpecificationService_1.ProductToSpecificationService,
        CategoryPathService_1.CategoryPathService,
        SpecificationToCategoryService_1.SpecificationToCategoryService,
        SpecificationAttrGrpToAttributeService_1.SpecificationAttrGrpToAttributeService])
], SpecificationController);
//# sourceMappingURL=SpecificationController.js.map