"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecificationController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const CreateProductSpecificationRequest_1 = require("./requests/CreateProductSpecificationRequest");
const ProductToSpecification_1 = require("../../models/ProductToSpecification");
const ProductSpecToAttrGroup_1 = require("../../models/ProductSpecToAttrGroup");
const typeorm_1 = require("typeorm");
const ProductSpecAttrGrpAttrtoAttrVal_1 = require("../../models/ProductSpecAttrGrpAttrtoAttrVal");
const ProductToSpecificationService_1 = require("../../services/ProductToSpecificationService");
const ProductSpecAttrGrpToAttribute_1 = require("../../models/ProductSpecAttrGrpToAttribute");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const UpdateProductSpecificationRequest_1 = require("./requests/UpdateProductSpecificationRequest");
const ProductToCategoryService_1 = require("../../../../src/api/core/services/ProductToCategoryService");
const CategoryService_1 = require("../../../../src/api/core/services/CategoryService");
const CategoryPathService_1 = require("../../../../src/api/core/services/CategoryPathService");
const ProductImageService_1 = require("../../../../src/api/core/services/ProductImageService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const typeormLoader_1 = require("../../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let ProductSpecificationController = class ProductSpecificationController {
    constructor(productToSpecService, productService, productToCategoryService, categoryService, categoryPathService, productImageService) {
        this.productToSpecService = productToSpecService;
        this.productService = productService;
        this.productToCategoryService = productToCategoryService;
        this.categoryService = categoryService;
        this.categoryPathService = categoryPathService;
        this.productImageService = productImageService;
        // --
    }
    // Get Product Specification Detail API
    /**
     * @api {Get} /api/product-specification/product/:id Get product specification detail API
     * @apiGroup Admin Product Specification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     *     {
     *    "status": 1,
     *    "message": "Successfully Got product Detail",
     *    "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "productId": 1,
     *        "sku": "",
     *        "upc": "",
     *        "hsn": "",
     *        "location": "",
     *        "quantity": "",
     *        "minimumQuantity": "",
     *        "subtractStock": "",
     *        "stockStatusId": 1,
     *        "quotationAvailable": "",
     *        "image": "",
     *        "imagePath": "",
     *        "manufacturerId": 1,
     *        "shipping": "",
     *        "serviceCharges": "",
     *        "taxType": "",
     *        "taxValue": "",
     *        "price": "",
     *        "priceUpdateFileLogId": "",
     *        "dateAvailable": "",
     *        "sortOrder": 1,
     *        "name": "",
     *        "description": ""
     *        "keywords": "",
     *        "discount": 1,
     *        "deleteFlag": 1,
     *        "isFeatured": 1,
     *        "todayDeals": 1,
     *        "condition": "",
     *        "rating": 1,
     *        "wishListStatus": "",
     *        "productSlug": "",
     *        "isActive": 1,
     *        "width": 1,
     *        "height": 1,
     *        "length": 1,
     *        "weight": 1,
     *        "hasStock": "",
     *        "priceType": "",
     *        "isSimplified": 1,
     *        "owner": "",
     *        "isCommon": 1,
     *        "skuId": 1,
     *        "hasTirePrice": "",
     *        "outOfStockThreshold": "",
     *        "notifyMinQuantity": "",
     *        "minQuantityAllowedCart": "",
     *        "maxQuantityAllowedCart": "",
     *        "enableBackOrders": "",
     *        "pincodeBasedDelivery": "",
     *        "attributeKeyword": "",
     *        "settedAsCommonOn": "",
     *        "productHighlights": "",
     *        "productSpecification": [
     *            {
     *                "id": 1,
     *                "productId": 1,
     *                "specificationId": 1,
     *                "attributeGroups": [
     *                    {
     *                        "id": 1,
     *                        "productSpecId": 1,
     *                        "attributes": [
     *                            {
     *                                "id": 1,
     *                                "productSpecAttrGrpId": 1,
     *                                "attributeId": 1,
     *                                "attributesValues": [
     *                                    {
     *                                        "id": 1,
     *                                        "productSpecAttrGrpAttrId": 1,
     *                                        "attributeValueId": 1,
     *                                        "value": ""
     *                                    }
     *                                ]
     *                            }
     *                        ]
     *                    }
     *                ]
     *            }
     *        ]
     *    }
     * }
     * @apiSampleRequest /api/product-specification/product/:id
     * @apiErrorExample {json} product specification error
     * HTTP/1.1 500 Internal Server Error
     */
    getProductSpecificationDetail(productId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findOne({
                where: {
                    productId,
                },
            });
            product.productImage = yield this.productImageService.findOne({
                select: ['productId', 'image', 'containerName', 'defaultImage'],
                where: {
                    productId: product.productId,
                    defaultImage: 1,
                },
            });
            if (!product) {
                return response.status(200).send({
                    status: 0,
                    message: `Invalid product Id`,
                });
            }
            const productSpec = yield this.productToSpecService.find({
                where: {
                    productId: product.productId,
                },
                relations: [
                    // 'attributeGroups',
                    'productSpecToAttrGroup',
                    'productSpecToAttrGroup.attributes',
                    'productSpecToAttrGroup.productSpecAttrGrouptoAttr',
                    'productSpecToAttrGroup.productSpecAttrGrouptoAttr.attributeValues',
                    'productSpecToAttrGroup.productSpecAttrGrouptoAttr.productSpecAttrGrpAttrToAttrVal',
                ],
            });
            const productSpecification = productSpec.map((productSp) => ({
                id: productSp.id,
                productId: productSp.productId,
                specificationId: productSp.specificationId,
                attributeGroups: productSp.productSpecToAttrGroup.map((productSpecToAttrGrp) => ({
                    id: productSpecToAttrGrp.id,
                    productSpecId: productSpecToAttrGrp.productSpecId,
                    // attributeGroupId: productSpecToAttrGrp.attributeGroupId,
                    attributes: productSpecToAttrGrp.productSpecAttrGrouptoAttr.map((productSpecAttrGrouptoAtt) => ({
                        id: productSpecAttrGrouptoAtt.id,
                        productSpecAttrGrpId: productSpecAttrGrouptoAtt.productSpecAttrGrpId,
                        attributeId: productSpecAttrGrouptoAtt.attributeId,
                        attributesValues: productSpecAttrGrouptoAtt.productSpecAttrGrpAttrToAttrVal.map((productSpecAttrGrpAttrToAttrVl) => ({
                            id: productSpecAttrGrpAttrToAttrVl.id,
                            productSpecAttrGrpAttrId: productSpecAttrGrpAttrToAttrVl.productSpecAttrGrpAttrId,
                            attributeValueId: productSpecAttrGrpAttrToAttrVl.attributeValueId,
                            value: productSpecAttrGrpAttrToAttrVl.value,
                        })),
                    })),
                })),
            }));
            return response.status(200).send({
                status: 1,
                message: `Successfully Got product Detail`,
                data: Object.assign(Object.assign({}, product), { productSpecification }),
            });
        });
    }
    // Get All Product Attribute list API
    /**
     * @api {Get} /api/product-specification/products Get all product attribute list API
     * @apiGroup Admin Product Specification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully got Product List.",
     *    "data": [
     *        {
     *            "productId": 1,
     *            "productName": "",
     *            "productSku": "",
     *            "productPrice": 1,
     *            "totalSpecification": "",
     *            "categoryIds": [
     *                {
     *                    "categoryId": 1,
     *                    "name": ""
     *                }
     *            ],
     *            "image": "",
     *            "containerName": ""
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/product-specification/products
     * @apiErrorExample {json} product specification error
     * HTTP/1.1 500 Internal Server Error
     */
    allProductAttributeList(response, limit, offset, keyword, productName, sku, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const whereConditions = [
                {
                    op: 'where',
                    name: 'Product.isActive',
                    value: 1,
                },
            ];
            const searchConditions = [];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                searchConditions.push({
                    name: ['Product.name', 'sku.skuName', 'sku.price'],
                    value: keyword,
                });
            }
            if (sku === null || sku === void 0 ? void 0 : sku.trim()) {
                searchConditions.push({
                    name: ['sku.skuName'],
                    value: sku,
                });
            }
            if (productName === null || productName === void 0 ? void 0 : productName.trim()) {
                searchConditions.push({
                    name: ['Product.name'],
                    value: productName,
                });
            }
            const relations = [
                {
                    op: 'inner-select',
                    tableName: 'Product.skuDetail',
                    aliasName: 'sku',
                },
                {
                    op: 'left-select-cond',
                    cond: 'productImage.defaultImage = 1',
                    tableName: 'Product.productImage',
                    aliasName: 'productImage',
                },
            ];
            const productList = yield this.productService.listByQueryBuilder(limit, offset, [], whereConditions, searchConditions, relations, [], [], false, false);
            if (count) {
                const productCount = yield this.productService.listByQueryBuilder(limit, offset, [], whereConditions, searchConditions, relations, [], [], true, false);
                return response.status(200).send({
                    status: 1,
                    message: `Successfully got Product Count..!`,
                    data: productCount,
                });
            }
            const productWithSpec = yield Promise.all(productList.map((product) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const productSpec = yield this.productToSpecService.find({
                    where: {
                        productId: product.productId,
                    },
                });
                product.totalSpecification = productSpec.length;
                product.categories = yield this.productToCategoryService.findAll({
                    select: ['categoryId', 'productId'],
                    where: { productId: product.productId },
                }).then((val) => {
                    const category = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const categoryValue = yield this.categoryService.findOne({ where: { categoryId: value.categoryId } });
                        const categoryLevel = yield this.categoryPathService.findCategoryLevel(categoryValue.categorySlug);
                        categoryValue.levels = categoryLevel.levels;
                        const temp = categoryValue;
                        return temp;
                    }));
                    const results = Promise.all(category);
                    return results;
                });
                return product;
            })));
            return response.status(200).send({
                status: 1,
                message: `Successfully got Product List.`,
                data: count ? productWithSpec.length : productWithSpec
                    .map((product) => {
                    var _a, _b, _c, _d;
                    return ({
                        productId: product.productId,
                        productName: product.name,
                        productSku: product.skuDetail.skuName,
                        productPrice: product.skuDetail.price,
                        totalSpecification: product.totalSpecification,
                        categoryIds: product.categories
                            .map((category) => ({ categoryId: category.categoryId, name: category.name })),
                        image: (_b = (_a = product.productImage[0]) === null || _a === void 0 ? void 0 : _a.image) !== null && _b !== void 0 ? _b : '',
                        containerName: (_d = (_c = product.productImage[0]) === null || _c === void 0 ? void 0 : _c.containerName) !== null && _d !== void 0 ? _d : '',
                    });
                }),
            });
        });
    }
    // Create Product Specification API
    /**
     * @api {Post} /api/product-specification Create product specification API
     * @apiGroup Admin Product Specification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} productSpecifications productSpecifications
     * @apiParam (Request body) {Number} attributeGroups attributeGroups
     * @apiParam (Request body) {Number} attributes attributes
     * @apiParam (Request body) {Number} attributeValues attributeValues
     * @apiParamExample {json} Input
     * {
     *    "productId": 1,
     *    "productSpecifications": [
     *        {
     *            "specificationId": 1,
     *            "attributeGroups": [
     *                {
     *                    "attributes": [
     *                      {
     *                            "attributeId": 1,
     *                            "attributeValues": [
     *                               {
     *                                    "attributeValueId": 1,
     *                                    "value": ""
     *                               }
     *                            ]
     *                      }
     *                    ]
     *                }
     *            ]
     *        }
     *    ]
     *
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *     status: 1,
     *     message: `Successfully Saved Product Specification.`,
     * }
     * @apiSampleRequest /api/product-specification
     * @apiErrorExample {json} product specification error
     * HTTP/1.1 500 Internal Server Error
     */
    createProductSpecification(response, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const specificationExist = yield this.productToSpecService.findOne({
                where: {
                    productId: payload.productId,
                    specificationId: (0, typeorm_1.In)(payload.productSpecifications.map((spec) => spec.specificationId)),
                },
            });
            if (specificationExist) {
                return response.status(400).send({
                    status: 0,
                    message: `Specification Id ${specificationExist.specificationId} is Already Mapped..!`,
                });
            }
            const queryRunner = (0, typeormLoader_1.getDataSource)().createQueryRunner();
            yield queryRunner.startTransaction();
            // -- Saving Specification To Product
            try {
                for (const productSpec of payload.productSpecifications) {
                    // -- Saving product to specification
                    const productToSpec = new ProductToSpecification_1.ProductToSpecification();
                    productToSpec.productId = payload.productId;
                    productToSpec.specificationId = productSpec.specificationId;
                    const productSpecSave = yield queryRunner.manager.save(productToSpec);
                    // --
                    for (const productSpecAttrGrp of productSpec.attributeGroups) {
                        // Saving product specification's attribute groups
                        const productSpecToAttrGrp = new ProductSpecToAttrGroup_1.ProductSpecToAttrGroup();
                        productSpecToAttrGrp.productSpecId = productSpecSave.id;
                        const productSpecToAttrgrpSave = yield queryRunner.manager.save(productSpecToAttrGrp);
                        // --
                        for (const productSpecAttrGrpAttr of productSpecAttrGrp.attributes) {
                            // Saving product specification attribute group's attributes
                            const productSpecAttrGrpToAttr = new ProductSpecAttrGrpToAttribute_1.ProductSpecAttrGrouptoAttr();
                            productSpecAttrGrpToAttr.attributeId = productSpecAttrGrpAttr.attributeId;
                            productSpecAttrGrpToAttr.productSpecAttrGrpId = productSpecToAttrgrpSave.id;
                            const productSpecAttrGrpToAttrSave = yield queryRunner.manager.save(productSpecAttrGrpToAttr);
                            // --
                            for (const productSpecAttrGrpAttrAttrValue of productSpecAttrGrpAttr.attributeValues) {
                                // Saving product specification attribute group's attribute's attribute-value
                                const productSpecAttrGrpAttrToAttrValue = new ProductSpecAttrGrpAttrtoAttrVal_1.ProductSpecAttrGrpAttrToAttrVal();
                                productSpecAttrGrpAttrToAttrValue.attributeValueId = productSpecAttrGrpAttrAttrValue.attributeValueId;
                                productSpecAttrGrpAttrToAttrValue.productSpecAttrGrpAttrId = productSpecAttrGrpToAttrSave.id;
                                productSpecAttrGrpAttrToAttrValue.value = productSpecAttrGrpAttrAttrValue.value;
                                yield queryRunner.manager.save(productSpecAttrGrpAttrToAttrValue);
                                // --
                            }
                        }
                    }
                }
                yield queryRunner.commitTransaction();
                yield queryRunner.release();
                return response.status(200).send({
                    status: 1,
                    message: `Successfully Saved Product Specification.`,
                });
            }
            catch (err) {
                yield queryRunner.rollbackTransaction();
                throw err;
            }
        });
    }
    // Update product Specification Slug API
    /**
     * @api {Put} /api/product-specification/attribute-slug/product/:id Update product specification slug API
     * @apiGroup Admin Product Specification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Updated Attribute keyword.",
     *    "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "productId": 1,
     *        "sku": "",
     *        "upc": "",
     *        "hsn": "",
     *        "location": "",
     *        "quantity": 1,
     *        "minimumQuantity": 1,
     *        "subtractStock": "",
     *        "stockStatusId": 1,
     *        "quotationAvailable": 1,
     *        "image": "",
     *        "imagePath": "",
     *        "manufacturerId": 1,
     *        "shipping": "",
     *        "serviceCharges": "",
     *        "taxType": "",
     *        "taxValue": "",
     *        "price": "",
     *        "priceUpdateFileLogId": 1,
     *        "dateAvailable": "",
     *        "sortOrder": 1,
     *        "name": "",
     *        "description": "",
     *        "amount": 1,
     *        "keywords": "",
     *        "discount": 1,
     *        "deleteFlag": 1,
     *        "isFeatured": 1,
     *        "todayDeals": 1,
     *        "condition": "",
     *        "rating": 1,
     *        "wishListStatus": 1,
     *        "productSlug": "",
     *        "isActive": 1,
     *        "width": 1,
     *        "height": 1,
     *        "length": 1,
     *        "weight": 1,
     *        "hasStock": "",
     *        "priceType": "",
     *        "isSimplified": 1,
     *        "owner": "",
     *        "isCommon": 1,
     *        "skuId": 1,
     *        "hasTirePrice": ',
     *        "outOfStockThreshold": "",
     *        "notifyMinQuantity": 1,
     *        "minQuantityAllowedCart": 1,
     *        "maxQuantityAllowedCart": 1,
     *        "enableBackOrders": "",
     *        "pincodeBasedDelivery": "",
     *        "attributeKeyword": "",
     *        "settedAsCommonOn": "",
     *        "productHighlights": ""
     *    }
     * }
     * @apiSampleRequest /api/product-specification/attribute-slug/product/:id
     * @apiErrorExample {json} product specification error
     * HTTP/1.1 500 Internal Server Error
     */
    updateProductAttributeSlug(response, productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findOne({
                where: {
                    productId,
                },
            });
            if (!product) {
                return response.status(200).send({
                    status: 0,
                    message: `Invalid product Id`,
                });
            }
            const productSpec = yield this.productToSpecService.find({
                where: {
                    productId: product.productId,
                },
                relations: [
                    // 'attributeGroups',
                    'specification',
                    'productSpecToAttrGroup',
                    'productSpecToAttrGroup.attributes',
                    'productSpecToAttrGroup.productSpecAttrGrouptoAttr',
                    'productSpecToAttrGroup.productSpecAttrGrouptoAttr.attributeValues',
                    'productSpecToAttrGroup.productSpecAttrGrouptoAttr.productSpecAttrGrpAttrToAttrVal',
                ],
            });
            const productSpecification = this.productToSpecService.getAttributeSimplified(productSpec);
            const productAttributeSlug = [];
            for (const specs of productSpecification) {
                for (const attributeGroup of specs.attributeGroups) {
                    for (const attribute of attributeGroup.attributes) {
                        const attributeName = attribute.attributeName;
                        for (const attributeVal of attribute.attributeValues) {
                            const attrString = `~${attributeName}-${attributeVal.value}~`;
                            productAttributeSlug.push(attrString);
                        }
                    }
                }
            }
            product.attributeKeyword = productAttributeSlug.toString();
            const productSave = yield this.productService.create(product);
            return response.status(200).send({
                status: 1,
                message: `Successfully Updated Attribute keyword.`,
                data: productSave,
            });
        });
    }
    // Update Product Specification API
    /**
     * @api {Put} /api/product-specification/product/:id Update Product Specification API
     * @apiGroup Admin Product Specification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} deleteSpecificationIds deleteSpecificationIds
     * @apiParam (Request body) {Number} deleteAttributeGroupIds deleteAttributeGroupIds
     * @apiParam (Request body) {Number} deleteAttributeIds deleteAttributeIds
     * @apiParam (Request body) {Number} deleteAttributeValueIds deleteAttributeValueIds
     * @apiParam (Request body) {String} productSpecifications productSpecifications
     * @apiParam (Request body) {String} attributeGroups attributeGroups
     * @apiParam (Request body) {String} attributes attributes
     * @apiParam (Request body) {String} attributeValues attributeValues
     * @apiParamExample {json} Input
     * {
     *    "productId": 1,
     *    "deleteSpecificationIds": [],
     *    "deleteAttributeGroupIds": [],
     *    "deleteAttributeIds": [],
     *    "deleteAttributeValueIds": [],
     *    "productSpecifications": [
     *        {
     *            "id": 1,
     *            "specificationId": 1,
     *            "attributeGroups": [
     *                {
     *                    "id": 1,
     *                    "attributes": [
     *                      {
     *                      	  "id": 1,
     *                            "attributeId": 1,
     *                            "attributeValues": [
     *                               {
     *                               	  "id": 1,
     *                                    "attributeValueId": 1,
     *                                    "value": ""
     *                               }
     *                            ]
     *                      }
     *                    ]
     *                }
     *            ]
     *        }
     *    ]
     *
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Saved Product Specification."
     * }
     * @apiSampleRequest /api/product-specification/product/:id
     * @apiErrorExample {json} product specification error
     * HTTP/1.1 500 Internal Server Error
     */
    updateProductSpecification(response, productId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findOne({
                where: {
                    productId,
                },
            });
            if (!product) {
                return response.status(200).send({
                    status: 0,
                    message: `Invalid product Id`,
                });
            }
            const queryRunner = (0, typeormLoader_1.getDataSource)().createQueryRunner();
            yield queryRunner.startTransaction();
            // -- Saving Specification To Product
            try {
                yield queryRunner.manager.delete(ProductToSpecification_1.ProductToSpecification, { id: (0, typeorm_1.In)(payload.deleteSpecificationIds) });
                yield queryRunner.manager.delete(ProductSpecToAttrGroup_1.ProductSpecToAttrGroup, { id: (0, typeorm_1.In)(payload.deleteAttributeGroupIds) });
                yield queryRunner.manager.delete(ProductSpecAttrGrpToAttribute_1.ProductSpecAttrGrouptoAttr, { id: (0, typeorm_1.In)(payload.deleteAttributeIds) });
                yield queryRunner.manager.delete(ProductSpecAttrGrpAttrtoAttrVal_1.ProductSpecAttrGrpAttrToAttrVal, { id: (0, typeorm_1.In)(payload.deleteAttributeValueIds) });
                for (const productSpec of payload.productSpecifications) {
                    // -- Saving product to specification
                    const productToSpec = new ProductToSpecification_1.ProductToSpecification();
                    if (productSpec.id) {
                        productToSpec.id = productSpec.id;
                    }
                    else {
                        const specificationExist = yield this.productToSpecService.findOne({
                            where: {
                                productId: payload.productId,
                                specificationId: productSpec.specificationId,
                            },
                        });
                        if (specificationExist) {
                            yield queryRunner.rollbackTransaction();
                            return response.status(400).send({
                                status: 0,
                                message: `Specification Id ${specificationExist.specificationId} is Already Mapped..!`,
                            });
                        }
                    }
                    productToSpec.productId = payload.productId;
                    productToSpec.specificationId = productSpec.specificationId;
                    const productSpecSave = yield queryRunner.manager.save(productToSpec);
                    // --
                    for (const productSpecAttrGrp of productSpec.attributeGroups) {
                        // Saving product specification's attribute groups
                        const productSpecToAttrGrp = new ProductSpecToAttrGroup_1.ProductSpecToAttrGroup();
                        if (productSpecAttrGrp.id) {
                            productSpecToAttrGrp.id = productSpecAttrGrp.id;
                        }
                        productSpecToAttrGrp.productSpecId = productSpecSave.id;
                        const productSpecToAttrgrpSave = yield queryRunner.manager.save(productSpecToAttrGrp);
                        // --
                        for (const productSpecAttrGrpAttr of productSpecAttrGrp.attributes) {
                            // Saving product specification attribute group's attributes
                            const productSpecAttrGrpToAttr = new ProductSpecAttrGrpToAttribute_1.ProductSpecAttrGrouptoAttr();
                            if (productSpecAttrGrpAttr.id) {
                                productSpecAttrGrpToAttr.id = productSpecAttrGrpAttr.id;
                            }
                            productSpecAttrGrpToAttr.attributeId = productSpecAttrGrpAttr.attributeId;
                            productSpecAttrGrpToAttr.productSpecAttrGrpId = productSpecToAttrgrpSave.id;
                            const productSpecAttrGrpToAttrSave = yield queryRunner.manager.save(productSpecAttrGrpToAttr);
                            // --
                            for (const productSpecAttrGrpAttrAttrValue of productSpecAttrGrpAttr.attributeValues) {
                                // Saving product specification attribute group's attribute's attribute-value
                                const productSpecAttrGrpAttrToAttrValue = new ProductSpecAttrGrpAttrtoAttrVal_1.ProductSpecAttrGrpAttrToAttrVal();
                                if (productSpecAttrGrpAttrAttrValue.id) {
                                    productSpecAttrGrpAttrToAttrValue.id = productSpecAttrGrpAttrAttrValue.id;
                                }
                                productSpecAttrGrpAttrToAttrValue.attributeValueId = productSpecAttrGrpAttrAttrValue.attributeValueId;
                                productSpecAttrGrpAttrToAttrValue.productSpecAttrGrpAttrId = productSpecAttrGrpToAttrSave.id;
                                productSpecAttrGrpAttrToAttrValue.value = productSpecAttrGrpAttrAttrValue.value;
                                yield queryRunner.manager.save(productSpecAttrGrpAttrToAttrValue);
                                // --
                            }
                        }
                    }
                }
                yield queryRunner.commitTransaction();
                yield queryRunner.release();
                return response.status(200).send({
                    status: 1,
                    message: `Successfully Saved Product Specification.`,
                });
            }
            catch (err) {
                yield queryRunner.rollbackTransaction();
                throw err;
            }
        });
    }
};
exports.ProductSpecificationController = ProductSpecificationController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductSpecificationController.prototype, "getProductSpecificationDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/products'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('productName')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('sku')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, Number, String, String, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductSpecificationController.prototype, "allProductAttributeList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, CreateProductSpecificationRequest_1.CreateProductSpecificationRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductSpecificationController.prototype, "createProductSpecification", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/attribute-slug/product/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductSpecificationController.prototype, "updateProductAttributeSlug", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/product/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(2, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, UpdateProductSpecificationRequest_1.UpdateProductSpecificationRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductSpecificationController.prototype, "updateProductSpecification", null);
exports.ProductSpecificationController = ProductSpecificationController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/product-specification'),
    tslib_1.__metadata("design:paramtypes", [ProductToSpecificationService_1.ProductToSpecificationService,
        ProductService_1.ProductService,
        ProductToCategoryService_1.ProductToCategoryService,
        CategoryService_1.CategoryService,
        CategoryPathService_1.CategoryPathService,
        ProductImageService_1.ProductImageService])
], ProductSpecificationController);
//# sourceMappingURL=ProductSpecificationController.js.map