"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProductSpecificationController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const CreateProductSpecificationRequest_1 = require("./requests/CreateProductSpecificationRequest");
const ProductToSpecification_1 = require("../../../ProductAttribute/models/ProductToSpecification");
const ProductSpecToAttrGroup_1 = require("../../../ProductAttribute/models/ProductSpecToAttrGroup");
const typeorm_1 = require("typeorm");
const ProductSpecAttrGrpAttrtoAttrVal_1 = require("../../../ProductAttribute/models/ProductSpecAttrGrpAttrtoAttrVal");
const ProductToSpecificationService_1 = require("../../../ProductAttribute/services/ProductToSpecificationService");
const ProductSpecAttrGrpToAttribute_1 = require("../../../ProductAttribute/models/ProductSpecAttrGrpToAttribute");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const UpdateProductSpecificationRequest_1 = require("./requests/UpdateProductSpecificationRequest");
// import { ProductSpecToAttrGroupService } from '../../../ProductAttribute/services/ProductSpecToAttrGroupService';
// import { ProductSpecAttrGrptoAttrService } from '../../../ProductAttribute/services/ProductSpecAttrGrptoAttrService';
// import { ProductSpecAttrGrpAttrToAttrValService } from '../..vendor-product-specification/../ProductAttribute/services/ProductSpecAttrGrpAttrToAttrValService';
const VendorProductService_1 = require("../../../../src/api/core/services/VendorProductService");
const ProductToCategoryService_1 = require("../../../../src/api/core/services/ProductToCategoryService");
const CategoryService_1 = require("../../../../src/api/core/services/CategoryService");
const CategoryPathService_1 = require("../../../../src/api/core/services/CategoryPathService");
let VendorProductSpecificationController = class VendorProductSpecificationController {
    constructor(productToSpecService, 
    // private productSpectoAttrGroupService: ProductSpecToAttrGroupService,
    // private productSpecAttrGrpToAttrService: ProductSpecAttrGrptoAttrService,
    // private productSpecAttrGrpAttrToAttrValService: ProductSpecAttrGrpAttrToAttrValService,
    productService, vendorProductService, productToCategoryService, categoryService, categoryPathService) {
        this.productToSpecService = productToSpecService;
        this.productService = productService;
        this.vendorProductService = vendorProductService;
        this.productToCategoryService = productToCategoryService;
        this.categoryService = categoryService;
        this.categoryPathService = categoryPathService;
        // --
    }
    getProductSpecificationDetail(productId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorProduct = yield this.vendorProductService.findOne({
                where: {
                    productId,
                    vendorId: request.user.vendorId,
                },
            });
            if (!vendorProduct) {
                return response.status(200).send({
                    status: 0,
                    message: `Invalid Vendor Product Id`,
                });
            }
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
                    'attributeGroups',
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
                    attributeGroupId: productSpecToAttrGrp.attributeGroupId,
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
            // product.productSpecification = productSpec;
            return response.status(200).send({
                status: 1,
                message: `Successfully Got product Detail.!`,
                data: Object.assign(Object.assign({}, product), { productSpecification }),
            });
        });
    }
    allProductAttributeList(request, response, limit, offset, keyword, productName, sku, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const whereConditions = [
                {
                    op: 'where',
                    name: 'Product.isActive',
                    value: 1,
                },
                {
                    op: 'and',
                    name: 'vendorProducts.vendorId',
                    value: request.user.vendorId,
                },
                {
                    name: 'vendorProducts.reuse',
                    op: 'IS NULL',
                    value: '',
                },
            ];
            const searchConditions = [];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                searchConditions.push({
                    name: ['Product.name', 'Product.sku'],
                    value: keyword,
                });
            }
            if (productName && productName !== '') {
                searchConditions.push({
                    name: ['Product.name'],
                    value: productName,
                });
            }
            if (sku && sku !== '') {
                searchConditions.push({
                    name: ['Product.sku'],
                    value: sku,
                });
            }
            const relations = [
                {
                    op: 'inner-select',
                    tableName: 'Product.skuDetail',
                    aliasName: 'sku',
                },
                {
                    op: 'inner-select',
                    tableName: 'Product.vendorProducts',
                    aliasName: 'vendorProducts',
                },
                {
                    op: 'left-select-cond',
                    cond: 'productImage.defaultImage = 1',
                    tableName: 'Product.productImage',
                    aliasName: 'productImage',
                },
            ];
            const productList = yield this.productService.listByQueryBuilder(limit, offset, [], whereConditions, searchConditions, relations, [], [], false, false);
            const productWithSpec = yield Promise.all(productList.map((product) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const productSpec = yield this.productToSpecService.find({
                    where: {
                        productId: product.productId,
                    },
                    // relations: [
                    //     'attributeGroups',
                    //     'productSpecToAttrGroup',
                    //     'productSpecToAttrGroup.attributes',
                    //     'productSpecToAttrGroup.productSpecAttrGrouptoAttr',
                    //     'productSpecToAttrGroup.productSpecAttrGrouptoAttr.attributeValues',
                    //     'productSpecToAttrGroup.productSpecAttrGrouptoAttr.productSpecAttrGrpAttrToAttrVal',
                    // ],
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
    createProductSpecification(request, response, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorProduct = yield this.vendorProductService.findOne({
                where: {
                    productId: payload.productId,
                    vendorId: request.user.vendorId,
                },
            });
            if (!vendorProduct) {
                return response.status(200).send({
                    status: 0,
                    message: `Invalid Vendor Product Id`,
                });
            }
            const specificationExist = yield this.productToSpecService.findOne({
                where: {
                    productId: payload.productId,
                    specificationId: (0, typeorm_1.In)(payload.productSpecifications.map((spec) => spec.specificationId)),
                },
            });
            if (specificationExist) {
                return response.status(400).send({
                    status: 0,
                    message: `Specification Id ${specificationExist.specificationId} is Already Mapped.`,
                });
            }
            const queryRunner = (0, typeorm_1.getConnection)().createQueryRunner();
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
                        productSpecToAttrGrp.attributeGroupId = productSpecAttrGrp.attributeGroupId;
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
    updateProductAttributeSlug(request, response, productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorProduct = yield this.vendorProductService.findOne({
                where: {
                    productId,
                    vendorId: request.user.vendorId,
                },
            });
            if (!vendorProduct) {
                return response.status(200).send({
                    status: 0,
                    message: `Invalid Vendor Product Id`,
                });
            }
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
                    'attributeGroups',
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
                for (const attribute of specs.attributes) {
                    const attributeName = attribute.name;
                    for (const attributeVal of attribute.attributeValue) {
                        const attrString = `~${attributeName}-${attributeVal}~`;
                        productAttributeSlug.push(attrString);
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
    updateProductSpecification(request, response, productId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorProduct = yield this.vendorProductService.findOne({
                where: {
                    productId,
                    vendorId: request.user.vendorId,
                },
            });
            if (!vendorProduct) {
                return response.status(200).send({
                    status: 0,
                    message: `Invalid Vendor Product Id`,
                });
            }
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
            const queryRunner = (0, typeorm_1.getConnection)().createQueryRunner();
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
                        productSpecToAttrGrp.attributeGroupId = productSpecAttrGrp.attributeGroupId;
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
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductSpecificationController.prototype, "getProductSpecificationDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/products'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('productName')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('sku')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Number, Number, String, String, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductSpecificationController.prototype, "allProductAttributeList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, CreateProductSpecificationRequest_1.CreateProductSpecificationRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductSpecificationController.prototype, "createProductSpecification", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/attribute-slug/product/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductSpecificationController.prototype, "updateProductAttributeSlug", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/product/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(3, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Number, UpdateProductSpecificationRequest_1.UpdateProductSpecificationRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductSpecificationController.prototype, "updateProductSpecification", null);
VendorProductSpecificationController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/vendor-product-specification'),
    tslib_1.__metadata("design:paramtypes", [ProductToSpecificationService_1.ProductToSpecificationService,
        ProductService_1.ProductService,
        VendorProductService_1.VendorProductService,
        ProductToCategoryService_1.ProductToCategoryService,
        CategoryService_1.CategoryService,
        CategoryPathService_1.CategoryPathService])
], VendorProductSpecificationController);
exports.VendorProductSpecificationController = VendorProductSpecificationController;
//# sourceMappingURL=ProductSpecificationController.js.map