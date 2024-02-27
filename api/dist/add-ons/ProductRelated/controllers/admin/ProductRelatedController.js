"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRelatedController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const ProductRelatedService_1 = require("../../services/ProductRelatedService");
const ProductRelatedRequest_1 = require("./request/ProductRelatedRequest");
const ProductRelated_1 = require("../../models/ProductRelated");
const class_transformer_1 = require("class-transformer");
const ProductImageService_1 = require("../../../../src/api/core/services/ProductImageService");
const CategoryService_1 = require("../../../../src/api/core/services/CategoryService");
const ProductToCategoryService_1 = require("../../../../src/api/core/services/ProductToCategoryService");
const SkuService_1 = require("../../../../src/api/core/services/SkuService");
const ProductSpecialService_1 = require("../../../../src/api/core/services/ProductSpecialService");
const ProductDiscountService_1 = require("../../../../src/api/core/services/ProductDiscountService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
let ProductRelatedController = class ProductRelatedController {
    constructor(productService, productRelatedService, productImageService, productDiscountService, productCategoryService, productToCategoryService, skuService, productSpecialService) {
        this.productService = productService;
        this.productRelatedService = productRelatedService;
        this.productImageService = productImageService;
        this.productDiscountService = productDiscountService;
        this.productCategoryService = productCategoryService;
        this.productToCategoryService = productToCategoryService;
        this.skuService = skuService;
        this.productSpecialService = productSpecialService;
    }
    // update Product related api
    /**
     * @api {Post} /api/product-related/update-product-related update product related
     * @apiGroup ProductRelated
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} productId productId
     * @apiParam (Request body) {number[]} relatedProductId  relatedProductId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      'status': 1,
     *      'message': 'Successfully update the product related'
     * }
     * @apiSampleRequest /api/product-related/update-product-related
     * @apiSampleError {json} error
     * HTTP/1.1 500 Internal Server Error
     */
    productRelated(productRelated, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExistProduct = yield this.productService.findOne({
                where: {
                    productId: productRelated.productId,
                },
            });
            if (!ifExistProduct) {
                return response.status(400).send({ status: 0, message: 'Invalid ProductId' });
            }
            const relatedProducts = productRelated.relatedProductId;
            for (const id of relatedProducts) {
                const findRelatedProducts = yield this.productService.findOne({
                    where: {
                        productId: id,
                    },
                });
                if (!findRelatedProducts) {
                    return response.status(400).send({ status: 0, message: 'Invalid relatedProductId' });
                }
            }
            const ifExistProductRelated = yield this.productRelatedService.find({
                where: {
                    productId: productRelated.productId,
                },
            });
            const productRelatedData = [];
            if (ifExistProductRelated.length >= 0) {
                yield this.productRelatedService.delete({ productId: productRelated.productId });
            }
            for (const id of relatedProducts) {
                const updateProductRelated = new ProductRelated_1.ProductRelated();
                updateProductRelated.productId = productRelated.productId;
                updateProductRelated.relatedProductId = id;
                productRelatedData.push(updateProductRelated);
            }
            const updateRelatedProduct = yield this.productRelatedService.create(productRelatedData);
            if (!updateRelatedProduct) {
                const errorStatus = {
                    status: 0,
                    message: 'unable to update the related products',
                };
                return response.status(400).send(errorStatus);
            }
            const successResponse = {
                status: 1,
                message: 'successfully updated the relate products',
                data: productRelatedData,
            };
            return response.status(200).send(successResponse);
        });
    }
    // product related detail api
    /**
     * @api {Get} /api/product-related/product-related-detail/:id product related details
     * @apiGroup ProductRelated
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} success
     * HTTP/1.1 200 success
     * {
     *      'status': '1',
     *      'message': 'Successfully get details for product'
     * }
     * @apiSampleRequest /api/product-related/product-related-detail/:id
     * @apiErrorExample {json} error
     * HTTP/1.1 500 Internal Server Error
     */
    productRelatedDetail(productId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productDetails = yield this.productService.findOne({
                select: ['productId', 'description', 'sku', 'name', 'productSlug'],
                where: {
                    productId,
                },
            });
            if (!productDetails) {
                return response.status(400).send({ status: 0, message: 'Invalid productId' });
            }
            const sku = yield this.skuService.findOne({
                where: {
                    skuName: productDetails.sku,
                },
            });
            if (!sku) {
                return response.status(400).send({
                    status: 0,
                    message: 'SKU does not exist.',
                });
            }
            const productSpecial = yield this.productSpecialService.findOne({
                where: {
                    skuId: sku.id,
                    productId: productDetails.productId,
                },
            });
            const productDiscount = yield this.productDiscountService.findOne({
                where: {
                    skuId: sku.id,
                    productId: productDetails.productId,
                },
            });
            if (productSpecial !== null && productSpecial !== undefined) {
                productDetails.pricerefer = productSpecial.price;
                productDetails.flag = 1;
            }
            else if (productDiscount !== null && productDiscount !== undefined) {
                productDetails.pricerefer = productDiscount.price;
                productDetails.flag = 0;
            }
            else {
                productDetails.pricerefer = '';
                productDetails.flag = '';
            }
            const productImage = yield this.productImageService.findOne({
                select: ['image', 'containerName'],
                where: {
                    productId: productDetails.productId,
                    defaultImage: 1,
                },
            });
            productDetails.price = sku.price;
            productDetails.skuName = sku.skuName;
            productDetails.image = productImage.image;
            productDetails.containerName = productImage.containerName;
            productDetails.category = yield this.productToCategoryService.findAll({
                where: {
                    productId: productDetails.productId,
                },
            }).then((values) => {
                const productCategory = values.map((data) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const category = yield this.productCategoryService.findOne({
                        select: ['categoryId', 'name'],
                        where: {
                            categoryId: data.categoryId,
                        },
                    });
                    return category;
                }));
                const result = Promise.all(productCategory);
                return result;
            });
            productDetails.relatedProductDetail = yield this.productRelatedService.findAll({
                where: { productId: productDetails.productId },
            }).then((val) => {
                const relatedProduct = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const temp = {};
                    const product = yield this.productService.findOne({
                        select: ['productId', 'name', 'sku'],
                        where: { productId: value.relatedProductId },
                    });
                    const productImages = yield this.productImageService.findOne({
                        select: ['image', 'containerName'],
                        where: {
                            productId: value.relatedProductId,
                        },
                    });
                    temp.productId = product.productId;
                    temp.productName = product.name;
                    temp.skuName = product.sku;
                    temp.image = productImages.image;
                    temp.containerName = productImages.containerName;
                    return temp;
                }));
                const resultData = Promise.all(relatedProduct);
                return resultData;
            });
            const successResponses = {
                status: 1,
                message: 'successfully got the details of given product id',
                data: productDetails,
            };
            return response.status(200).send(successResponses);
        });
    }
    // Related Product List API
    /**
     * @api {get} /api/product-related/product-list Related Product List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} sku sku
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      'status': '1'
     *      'message': 'Successfully get product list',
     *      'data':'{}'
     * }
     * @apiSampleRequest /api/product-related/product-list
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    productList(limit, offset, keyword, sku, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'Product.productId as productId',
                'Product.sku as sku',
                'Product.name as name',
                'Product.quantity as quantity',
                'Product.price as price',
                'Product.skuId as skuId',
                'Product.productSlug as productSlug',
                'Product.isActive as isActive',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
                '(SELECT sku.sku_name as sku FROM sku WHERE sku.id = skuId) as sku',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as modifiedPrice',
                '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
                '(SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
            ];
            const relations = [];
            const WhereConditions = [];
            if (sku) {
                WhereConditions.push({
                    name: 'Product.sku',
                    op: 'like',
                    value: sku,
                });
            }
            const searchConditions = [];
            if (keyword) {
                searchConditions.push({
                    name: ['Product.name'],
                    value: keyword,
                });
            }
            const sort = [];
            sort.push({
                name: 'Product.createdDate',
                order: 'DESC',
            });
            const productLists = yield this.productService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relations, [], sort, false, true);
            if (count) {
                const productListCount = yield this.productService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relations, [], sort, true, true);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got product lists count.',
                    data: productListCount,
                });
            }
            const productList = productLists.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                if (value.productSpecial !== null) {
                    temp.pricerefer = value.productSpecial;
                    temp.flag = 1;
                }
                else if (value.productDiscount !== null) {
                    temp.pricerefer = value.productDiscount;
                    temp.flag = 0;
                }
                else {
                    temp.pricerefer = '';
                    temp.flag = '';
                }
                temp.productRelatedCount = yield this.productRelatedService.productRelatedCount(value.productId);
                return temp;
            }));
            const results = yield Promise.all(productList);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete product list ',
                data: (0, class_transformer_1.instanceToPlain)(results),
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/update-product-related'),
    (0, routing_controllers_1.Authorized)(['admin', 'update-related-product']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ProductRelatedRequest_1.ProductRelatedRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductRelatedController.prototype, "productRelated", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product-related-detail/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'related-product-detail']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductRelatedController.prototype, "productRelatedDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'list-related-product']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('sku')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductRelatedController.prototype, "productList", null);
ProductRelatedController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/product-related'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService, ProductRelatedService_1.ProductRelatedService, ProductImageService_1.ProductImageService, ProductDiscountService_1.ProductDiscountService,
        CategoryService_1.CategoryService, ProductToCategoryService_1.ProductToCategoryService, SkuService_1.SkuService, ProductSpecialService_1.ProductSpecialService])
], ProductRelatedController);
exports.ProductRelatedController = ProductRelatedController;
//# sourceMappingURL=ProductRelatedController.js.map