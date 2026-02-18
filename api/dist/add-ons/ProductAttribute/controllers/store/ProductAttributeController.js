"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreProductAttributesController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const ProductToSpecificationService_1 = require("../../services/ProductToSpecificationService");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const AttributeTranslationService_1 = require("../../services/AttributeTranslationService");
const AttributeValueTranslationService_1 = require("../../services/AttributeValueTranslationService");
const TranslationMiddleware_1 = require("../../../../src/api/core/middlewares/TranslationMiddleware");
const SpecificationTranslationService_1 = require("../../../../add-ons/ProductAttribute/services/SpecificationTranslationService");
const typeorm_1 = require("typeorm");
const SpecificationToCategoryService_1 = require("../../../../add-ons/ProductAttribute/services/SpecificationToCategoryService");
const SpecificationService_1 = require("../../../../add-ons/ProductAttribute/services/SpecificationService");
const typedi_1 = require("typedi");
let StoreProductAttributesController = class StoreProductAttributesController {
    constructor(productToSpecService, productService, attributeTranslationService, attributeValueTranslationService, specificationTranslationService, specificationToCategoryService, specificationService) {
        this.productToSpecService = productToSpecService;
        this.productService = productService;
        this.attributeTranslationService = attributeTranslationService;
        this.attributeValueTranslationService = attributeValueTranslationService;
        this.specificationTranslationService = specificationTranslationService;
        this.specificationToCategoryService = specificationToCategoryService;
        this.specificationService = specificationService;
        // ----
    }
    // Product Attributes Product Detail API
    /**
     * @api {get} /api/store-product-attributes/product/:productSlug Product Attributes Product Detail API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Got product Detail...!",
     *    "data": [
     *        {
     *            "specificationId": 1,
     *            "specificationName": "",
     *            "attributeGroups": [
     *                {
     *                    "id": 1,
     *                    "attributes": [
     *                        {
     *                            "attributeId": 1,
     *                            "attributeName": "",
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
     *                                    "isDelete": 1,
     *                                    "valueTrans": ""
     *                                }
     *                            ],
     *                            "attributeNameTrans": ""
     *                        }
     *                    ]
     *                }
     *            ],
     *            "specificationNameTrans": ""
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/store-product-attributes/product/:productSlug
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    productDetail(productSlug, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            const product = yield this.productService.findOne({
                where: {
                    productSlug,
                    isActive: 1,
                },
            });
            if (!product) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid product Slug`,
                });
            }
            const productSpec = yield this.productToSpecService.find({
                where: {
                    productId: product.productId,
                },
                relations: [
                    'specification',
                    'productSpecToAttrGroup',
                    'productSpecToAttrGroup.attributes',
                    'productSpecToAttrGroup.productSpecAttrGrouptoAttr',
                    'productSpecToAttrGroup.productSpecAttrGrouptoAttr.attributeValues',
                    'productSpecToAttrGroup.productSpecAttrGrouptoAttr.productSpecAttrGrpAttrToAttrVal',
                ],
            });
            const productSpecification = this.productToSpecService.getAttributeSimplified(productSpec);
            const specifications = [];
            for (const specs of productSpecification) {
                specs.specificationNameTrans = (_c = (_b = (yield this.specificationTranslationService.findOne({ where: { specificationId: specs.specificationId, languageId: (_a = request.languageId) !== null && _a !== void 0 ? _a : 0 } }))) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : '';
                const attributeGroups = [];
                for (const attributeGroup of specs.attributeGroups) {
                    // Fetch Attribute Translation
                    const attributes = [];
                    for (const attribute of attributeGroup.attributes) {
                        attribute.attributeNameTrans = (_f = (_e = (yield this.attributeTranslationService.findOne({ where: { languageId: (_d = request.languageId) !== null && _d !== void 0 ? _d : 0, attributeId: attribute.attributeId } }))) === null || _e === void 0 ? void 0 : _e.attributeName) !== null && _f !== void 0 ? _f : '';
                        const attributeValues = [];
                        for (const attributeVal of attribute.attributeValues) {
                            if (!ProductToSpecificationService_1.attributeTextType.includes(attribute.type)) {
                                // Fetch Attribute Value Translation
                                attributeVal.valueTrans = (_j = (_h = (yield this.attributeValueTranslationService.findOne({ where: { languageId: (_g = request.languageId) !== null && _g !== void 0 ? _g : 0, attributeValueId: attributeVal.id } }))) === null || _h === void 0 ? void 0 : _h.value) !== null && _j !== void 0 ? _j : '';
                            }
                            // Saving Attribute Value
                            attributeValues.push(attributeVal);
                        }
                        // Saving Attribute Value with Attribute
                        attribute.attributeValues = [...attributeValues];
                        attributes.push(attribute);
                    }
                    attributeGroup.attributes = [...attributes];
                    attributeGroups.push(attributeGroup);
                }
                // Saving Specification With Attribtue and Value
                specs.attributeGroups = [...attributeGroups];
                specifications.push(specs);
            }
            return response.status(200).send({
                status: 1,
                message: `Successfully Got product Detail...!`,
                data: specifications,
            });
        });
    }
    // Product Attributes Product Detail API
    /**
     * @api {get} /api/store-product-attributes Product Specification API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Got Specification List...!",
     *    "data": {
     *       "createdBy": 1,
     *       "createdDate": "",
     *       "modifiedBy": 1,
     *       "modifiedDate": "",
     *       "id": 1,
     *       "name": "",
     *       "slug": "",
     *       "isActive": 1,
     *       "isDelete": 1,
     *       "attributeGroups": [
     *           {
     *               "createdBy": 1,
     *               "createdDate": "",
     *               "modifiedBy": 1,
     *               "modifiedDate": "",
     *               "id": 1,
     *               "name": "",
     *               "sortOrder": "",
     *               "isActive": 1,
     *               "isDelete": 0,
     *               "attributes": [
     *                   {
     *                       "createdBy": 1,
     *                       "createdDate": "",
     *                       "modifiedBy": 1,
     *                       "modifiedDate": "",
     *                       "id": 1,
     *                       "name": "",
     *                       "type": "",
     *                       "sortOrder": 1,
     *                       "isMandatory": 1,
     *                       "description": "",
     *                       "label": "",
     *                       "useAsFilter": "",
     *                       "sectionName": "",
     *                       "defaultValue": 1,
     *                       "isActive": 1,
     *                       "isDelete": 0,
     *                       "attributeValues": [
     *                           {
     *                               "createdBy": 1,
     *                               "createdDate": "",
     *                               "modifiedBy": 1,
     *                               "modifiedDate": "",
     *                               "id": 1,
     *                               "attributeId": 1,
     *                               "value": "",
     *                               "isActive": 1,
     *                               "isDelete": 0
     *                  }
     *              ]
     *           }
     *        ]
     *     }
     * }
     * @apiSampleRequest /api/store-product-attributes
     * @apiErrorExample {json} Product error
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
};
exports.StoreProductAttributesController = StoreProductAttributesController;
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(TranslationMiddleware_1.TranslationMiddleware),
    (0, routing_controllers_1.Get)('/product/:productSlug'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productSlug')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreProductAttributesController.prototype, "productDetail", null);
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
], StoreProductAttributesController.prototype, "Specificationlist", null);
exports.StoreProductAttributesController = StoreProductAttributesController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/store-product-attributes'),
    tslib_1.__metadata("design:paramtypes", [ProductToSpecificationService_1.ProductToSpecificationService,
        ProductService_1.ProductService,
        AttributeTranslationService_1.AttributeTranslationService,
        AttributeValueTranslationService_1.AttributeValueTranslationService,
        SpecificationTranslationService_1.SpecificationTranslationService,
        SpecificationToCategoryService_1.SpecificationToCategoryService,
        SpecificationService_1.SpecificationService])
], StoreProductAttributesController);
//# sourceMappingURL=ProductAttributeController.js.map