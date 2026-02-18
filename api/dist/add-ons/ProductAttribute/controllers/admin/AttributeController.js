"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const Attribute_1 = require("../../models/Attribute");
const AttributeService_1 = require("../../services/AttributeService");
const CreateAttributeRequest_1 = require("./requests/CreateAttributeRequest");
const AttributeValue_1 = require("../../models/AttributeValue");
const ProductSpecAttrGrptoAttrService_1 = require("../../services/ProductSpecAttrGrptoAttrService");
const AttributeToGroupService_1 = require("../../services/AttributeToGroupService");
const AttributeValueService_1 = require("../../services/AttributeValueService");
const typeorm_1 = require("typeorm");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const typedi_1 = require("typedi");
let AttributeController = class AttributeController {
    constructor(attributeService, productSpecAttrGrptoAttrService, attributeToGroupService, attributeValueService) {
        this.attributeService = attributeService;
        this.productSpecAttrGrptoAttrService = productSpecAttrGrptoAttrService;
        this.attributeToGroupService = attributeToGroupService;
        this.attributeValueService = attributeValueService;
        // --
    }
    // Add Attribute API
    /**
     * @api {post} /api/attribute Add Attribute API
     * @apiGroup Attribute
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..255}} name name (Required)
     * @apiParam (Request body) {Number} sortOrder sortOrder (Required)
     * @apiParam (Request body) {String} type type (Required)
     * @apiParam (Request body) {Number} isMandatory isMandatory
     * @apiParam (Request body) {Number} useAsFilter useAsFilter
     * @apiParam (Request body) {Number} isActive isActive
     * @apiParam (Request body) {String{..255}} description description
     * @apiParam (Request body) {String{..255}} label label
     * @apiParam (Request body) {String{..255}} sectionName sectionName
     * @apiParam (Request body) {String{..255}} defaultValue defaultValue
     * @apiParam (Request body) {Object[]} attributeValues array of attributeValues (Required)
     * @apiParam (Request body) {Number} id id for attribute value
     * @apiParam (Request body) {String} value value (Required)
     * @apiParam (Request body) {Number} deleteAttributeValueIds deleteAttributeValueIds
     * @apiParamExample {json} Input
     * {
     *    "name": "",
     *    "sortOrder" : 1,
     *    "type": "",
     *    "isMandatory": 1,
     *    "useAsFilter": 1,
     *    "isActive": 1,
     *    "description": "",
     *    "label": "",
     *    "sectionName": "",
     *    "defaultValue": "",
     *    "attributeValues": [
     *        {
     *            "id": 1,
     *            "value": ""
     *        }
     *    ],
     *    "deleteAttributeValueIds": 1
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Attribute added successfully.",
     *      "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "id": 1,
     *        "name": "",
     *        "type": "",
     *        "sortOrder": 1,
     *        "isMandatory": 1,
     *        "description": "",
     *        "label": "",
     *        "useAsFilter": 1,
     *        "sectionName": "",
     *        "defaultValue": "",
     *        "isActive": 1,
     *        "isDelete": 1,
     *        "attributeValues": [
     *            {
     *                "createdBy": 1,
     *                "createdDate": "",
     *                "modifiedBy": 1,
     *                "modifiedDate": "",
     *                "id": 1,
     *                "attributeId": 1,
     *                "value": "",
     *                "isActive": 1,
     *                "isDelete": 1
     *            }
     *        ]
     *    }
     * }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute
     * @apiErrorExample {json} Attribute error
     * HTTP/1.1 500 Internal Server Error
     */
    addAttributeGroup(attributeParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newAttribute = new Attribute_1.Attribute();
            newAttribute.name = attributeParam.name;
            newAttribute.sortOrder = attributeParam.sortOrder;
            newAttribute.type = attributeParam.type;
            newAttribute.isMandatory = attributeParam.isMandatory;
            newAttribute.useAsFilter = attributeParam.useAsFilter;
            newAttribute.defaultValue = attributeParam.defaultValue;
            newAttribute.sectionName = attributeParam.sectionName;
            newAttribute.label = attributeParam.label;
            newAttribute.description = attributeParam.description;
            const attributeValues = [];
            for (const attributeValueParam of attributeParam.attributeValues) {
                const attributeValue = new AttributeValue_1.AttributeValue();
                attributeValue.value = attributeValueParam.value.trim();
                attributeValues.push(attributeValue);
            }
            newAttribute.attributeValues = attributeValues;
            const AttributeSaved = yield this.attributeService.create(newAttribute);
            const successResponse = {
                status: 1,
                message: 'Attribute added successfully.',
                data: AttributeSaved,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Attribute List API
    /**
     * @api {get} /api/attribute Attribute list API
     * @apiGroup Attribute
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "messge": "Successfully got the attribute",
     *    "data": [
     *        {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedBy": 1,
     *            "modifiedDate": "",
     *            "id": 1,
     *            "name": "",
     *            "type": 1,
     *            "sortOrder": 1,
     *            "isMandatory": 1,
     *            "description": "",
     *            "label": "",
     *            "useAsFilter": 1,
     *            "sectionName": "",
     *            "defaultValue": 1,
     *            "isActive": 1,
     *            "isDelete": 1
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/attribute
     * @apiErrorExample {json} Attribute Group error
     * HTTP/1.1 500 Internal Server Error
     */
    Attributelist(limit, offset, count, keyword, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const sort = [{
                    name: 'Attribute.createdDate',
                    order: 'DESC',
                }];
            const whereConditions = [
                {
                    op: 'where',
                    name: 'Attribute.isDelete',
                    value: 0,
                },
            ];
            const relations = [];
            const searchConditions = [];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                searchConditions.push({
                    name: ['Attribute.name'],
                    value: keyword,
                });
            }
            const attributeList = yield this.attributeService.listByQueryBuilder(limit, offset, [], whereConditions, searchConditions, relations, [], sort, false, false);
            return response.status(200).send({
                status: 1,
                messge: 'Successfully got the attribute',
                data: count ? attributeList.length : attributeList,
            });
        });
    }
    // update Attribute Group
    /**
     * @api {put} /api/attribute/:id Update Attribute API
     * @apiGroup Attribute
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id for attribute
     * @apiParam (Request body) {String{..255}} name name
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {String} type type
     * @apiParam (Request body) {Number} isMandatory isMandatory
     * @apiParam (Request body) {Number} useAsFilter useAsFilter
     * @apiParam (Request body) {Number} isActive isActive
     * @apiParam (Request body) {String{..255}} description description
     * @apiParam (Request body) {String{..255}} label label
     * @apiParam (Request body) {String{..255}} sectionName sectionName
     * @apiParam (Request body) {String{..255}} defaultValue defaultValue
     * @apiParam (Request body) {Object[]} attributeValues array of attributeValues
     * @apiParam (Request body) {Number} id id for attribute value
     * @apiParam (Request body) {String} value value
     * @apiParam (Request body) {Number} deleteAttributeValueIds deleteAttributeValueIds
     * @apiParamExample {json} Input
     * {
     *    "name": "",
     *    "sortOrder" : 1,
     *    "type": "",
     *    "isMandatory": 1,
     *    "useAsFilter": 1,
     *    "isActive": 1,
     *    "description": "",
     *    "label": "",
     *    "sectionName": "",
     *    "defaultValue": "",
     *    "attributeValues": [
     *        {
     *            "id": 1,
     *            "value": ""
     *        }
     *    ],
     *    "deleteAttributeValueIds": 1
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated attribute.",
     *      "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "id": 1,
     *        "name": "",
     *        "type": "",
     *        "sortOrder": 1,
     *        "isMandatory": 1,
     *        "description": "",
     *        "label": "",
     *        "useAsFilter": 1,
     *        "sectionName": "",
     *        "defaultValue": "",
     *        "isActive": 1,
     *        "isDelete": 0,
     *        "attributeValues": [
     *            {
     *                "createdBy": 1,
     *                "createdDate": "",
     *                "modifiedBy": 1,
     *                "modifiedDate": "",
     *                "id": 1,
     *                "attributeId": 1,
     *                "value": "",
     *                "isActive": 1,
     *                "isDelete": 0
     *            }
     *        ]
     *    }
     * }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute/:id
     * @apiErrorExample {json} Attribute error
     * HTTP/1.1 500 Internal Server Error
     */
    updateAttribute(id, attributeParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const attribute = yield this.attributeService.findOne({
                where: {
                    id,
                },
                relations: ['attributeValues'],
            });
            if (!attribute) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid attribute Id',
                };
                return response.status(400).send(errorResponse);
            }
            // Delete attribute value
            if ((_a = attributeParam.deleteAttributeValueIds) === null || _a === void 0 ? void 0 : _a.length) {
                yield this.attributeValueService.delete({ id: (0, typeorm_1.In)(attributeParam.deleteAttributeValueIds) });
            }
            attribute.name = attributeParam.name;
            attribute.sortOrder = attributeParam.sortOrder;
            attribute.type = attributeParam.type;
            attribute.isMandatory = attributeParam.isMandatory;
            attribute.useAsFilter = attributeParam.useAsFilter;
            attribute.isActive = attributeParam.isActive;
            attribute.defaultValue = attributeParam.defaultValue;
            attribute.sectionName = attributeParam.sectionName;
            attribute.label = attributeParam.label;
            attribute.description = attributeParam.description;
            if ((_b = attributeParam.attributeValues) === null || _b === void 0 ? void 0 : _b.length) {
                const attributeValues = [];
                for (const attributeValueParam of attributeParam.attributeValues) {
                    const attributeValue = new AttributeValue_1.AttributeValue();
                    if (attributeValueParam.id) {
                        attributeValue.id = attributeValueParam.id;
                    }
                    attributeValue.value = attributeValueParam.value.trim();
                    attributeValues.push(attributeValue);
                }
                attribute.attributeValues = attributeValues;
            }
            const attributeSave = yield this.attributeService.create(attribute);
            const successResponse = {
                status: 1,
                message: 'Successfully updated Attribute.',
                data: attributeSave,
            };
            return response.status(200).send(successResponse);
        });
    }
    // delete Attribute API
    /**
     * @api {delete} /api/attribute/:id Delete Attribute API
     * @apiGroup Attribute
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id (Required)
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Successfullly deleted attribute."
     * }
     * @apiSampleRequest /api/attribute/:id
     * @apiErrorExample {json} attribute error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteAttribute(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.attributeService.softDelete(id);
            yield this.attributeToGroupService.delete({ attributeId: id });
            yield this.productSpecAttrGrptoAttrService.delete({ attributeId: id });
            const successResponse = {
                status: 1,
                message: 'Successfullly deleted attribute.',
            };
            return response.status(200).send(successResponse);
        });
    }
    //   Get attribute API
    /**
     * @api {get} /api/attribute/:id Get Attribute API
     * @apiGroup Attribute
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id (Required)
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Got attribute",
     *    "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "id": 1,
     *        "name": "",
     *        "type": "",
     *        "sortOrder": 1,
     *        "isMandatory": 1,
     *        "description": "",
     *        "label": "",
     *        "useAsFilter": "",
     *        "sectionName": "",
     *        "defaultValue": 1,
     *        "isActive": 1,
     *        "isDelete": 0,
     *        "attributeValues": [
     *            {
     *                "createdBy": 1,
     *                "createdDate": "",
     *                "modifiedBy": 1,
     *                "modifiedDate": "",
     *                "id": 1,
     *                "attributeId": 1,
     *                "value": "",
     *                "isActive": 1,
     *                "isDelete": 0
     *            }
     *        ]
     *    }
     * }
     * @apiSampleRequest /api/attribute/:id
     * @apiErrorExample {json} Attribute error
     * HTTP/1.1 500 Internal Server Error
     */
    getAttribute(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const attribute = yield this.attributeService.findOne({ where: { id, isDelete: 0 }, relations: ['attributeValues'] });
            if (!attribute) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid attribute Id',
                };
                return response.status(400).send(errorResponse);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully Got attribute',
                data: attribute,
            };
            return response.status(200).send(successResponse);
        });
    }
};
exports.AttributeController = AttributeController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(['admin', 'add-attribute']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateAttributeRequest_1.CreateAttribute, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeController.prototype, "addAttributeGroup", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)()
    // @Authorized(['admin', 'attribute-list'])
    ,
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeController.prototype, "Attributelist", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-attribute']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: false })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateAttributeRequest_1.CreateAttribute, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeController.prototype, "updateAttribute", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-attribute']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeController.prototype, "deleteAttribute", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeController.prototype, "getAttribute", null);
exports.AttributeController = AttributeController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/attribute'),
    tslib_1.__metadata("design:paramtypes", [AttributeService_1.AttributeService,
        ProductSpecAttrGrptoAttrService_1.ProductSpecAttrGrptoAttrService,
        AttributeToGroupService_1.AttributeToGroupService,
        AttributeValueService_1.AttributeValueService])
], AttributeController);
//# sourceMappingURL=AttributeController.js.map