"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProductVariantsController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const SkuService_1 = require("../../../../src/api/core/services/SkuService");
const ProductImageService_1 = require("../../../../src/api/core/services/ProductImageService");
const VariantValueService_1 = require("../../../ProductVariants/services/VariantValueService");
const ProductVarientService_1 = require("../../../ProductVariants/services/ProductVarientService");
const ProductVarientOptionDetailService_1 = require("../../../ProductVariants/services/ProductVarientOptionDetailService");
const ProductVarientOptionImageService_1 = require("../../../ProductVariants/services/ProductVarientOptionImageService");
const ProductVarientOptionService_1 = require("../../../ProductVariants/services/ProductVarientOptionService");
const class_transformer_1 = require("class-transformer");
const ProductVarient_1 = require("../../../ProductVariants/models/ProductVarient");
const ProductVarientOptionImage_1 = require("../../../ProductVariants/models/ProductVarientOptionImage");
const SkuModel_1 = require("../../../../src/api/core/models/SkuModel");
const ProductVarientOption_1 = require("../../../ProductVariants/models/ProductVarientOption");
const ProductVarientOptionDetail_1 = require("../../../ProductVariants/models/ProductVarientOptionDetail");
const UpdateProductRequest_1 = require("../../../ProductVariants/controllers/admin/requests/UpdateProductRequest");
const VendorProductService_1 = require("../../../../src/api/core/services/VendorProductService");
const UpdateStockRequest_1 = require("../../../../src/api/admin/controllers/requests/UpdateStockRequest");
const OrderProductService_1 = require("../../../../src/api/core/services/OrderProductService");
const VariantService_1 = require("../../../ProductVariants/services/VariantService");
const typeorm_1 = require("typeorm");
const ProductDiscount_1 = require("../../../../src/api/core/models/ProductDiscount");
const ProductSpecial_1 = require("../../../../src/api/core/models/ProductSpecial");
const ProductDiscountService_1 = require("../../../../src/api/core/services/ProductDiscountService");
const ProductSpecialService_1 = require("../../../../src/api/core/services/ProductSpecialService");
// import { CheckAddonMiddleware } from '../../../../src/api/core/middlewares/AddonValidationMiddleware';
// @UseBefore(CheckAddonMiddleware)
let VendorProductVariantsController = class VendorProductVariantsController {
    constructor(productService, skuService, productVarientService, productImageService, productVarientOptionDetailService, productVarientOptionImageService, productVarientOptionService, varientsValueService, vendorProductService, orderProductService, varientsService, productDiscountService, productSpecialService) {
        this.productService = productService;
        this.skuService = skuService;
        this.productVarientService = productVarientService;
        this.productImageService = productImageService;
        this.productVarientOptionDetailService = productVarientOptionDetailService;
        this.productVarientOptionImageService = productVarientOptionImageService;
        this.productVarientOptionService = productVarientOptionService;
        this.varientsValueService = varientsValueService;
        this.vendorProductService = vendorProductService;
        this.orderProductService = orderProductService;
        this.varientsService = varientsService;
        this.productDiscountService = productDiscountService;
        this.productSpecialService = productSpecialService;
        // ----
    }
    // Vendor Product Variant Product List API
    /**
     * @api {get} /api/vendor-product-variants/vendor-product-list Vendor Product Variant Product List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} sku search by sku
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} price=1/2 if 1-> asc 2-> desc
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get vendor product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/vendor-product-variants/vendor-product-list
     * @apiErrorExample {json} vendorProductList error
     * HTTP/1.1 500 Internal Server Error
     */
    productList(limit, offset, keyword, sku, status, productName, price, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorId = request.user.vendorId;
            console.log('vendorId:', request.user.vendorId);
            const select = [
                'Product.productId as productId',
                'Product.sku as sku',
                'Product.name as name',
                'Product.quantity as quantity',
                'Product.price as price',
                'Product.isFeatured as isFeatured',
                'Product.todayDeals as todayDeals',
                'Product.productSlug as productSlug',
                'Product.isActive as isActive',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
                '(SELECT id as skuId FROM sku WHERE sku.id = Product.skuId) AS skuId',
                '(SELECT sku.sku_name as sku FROM sku WHERE sku.id = skuId) as sku',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as modifiedPrice',
                '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
                '(SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
            ];
            const relations = [];
            relations.push({
                tableName: 'Product.vendorProducts',
                aliasName: 'vendorProducts',
            });
            const WhereConditions = [];
            WhereConditions.push({
                name: 'vendorProducts.reuse',
                op: 'IS NULL',
                value: '',
            }, {
                name: 'vendorProducts.vendorId',
                op: 'and',
                value: vendorId,
            });
            if (status) {
                WhereConditions.push({
                    name: 'Product.isActive',
                    op: 'and',
                    value: status,
                });
            }
            const searchConditions = [];
            if (keyword !== '') {
                searchConditions.push({
                    name: ['Product.name', 'Product.sku', 'Product.price', 'Product.isActive'],
                    value: keyword,
                });
            }
            if (productName && productName !== '') {
                searchConditions.push({
                    name: ['Product.name'],
                    value: productName,
                });
            }
            if (sku) {
                searchConditions.push({
                    name: ['Product.sku'],
                    value: sku,
                });
            }
            if (price) {
                searchConditions.push({
                    name: ['Product.price'],
                    value: price,
                });
            }
            const sort = [];
            if (+price && price === 1) {
                sort.push({
                    name: 'Product.price',
                    order: 'ASC',
                });
            }
            else if (+price && price === 2) {
                sort.push({
                    name: 'Product.price',
                    order: 'DESC',
                });
            }
            else {
                sort.push({
                    name: 'Product.createdDate',
                    order: 'DESC',
                });
            }
            const productLists = yield this.productService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relations, [], sort, false, true);
            if (count) {
                const productListCount = yield this.productService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relations, [], sort, true, true);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got vendor product lists count.',
                    data: productListCount,
                });
            }
            const productList = productLists.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const variant = yield this.productVarientOptionService.variantCount(temp.productId);
                temp.variantCount = variant;
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
                return temp;
            }));
            const results = yield Promise.all(productList);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete vendor product list. ',
                data: (0, class_transformer_1.instanceToPlain)(results),
            };
            return response.status(200).send(successResponse);
        });
    }
    // Vendor Product Variants update Product API
    /**
     * @api {post} /api/vendor-product-variants/update-vendor-product Vendor Product Variants Update Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {String} [productVarient] productVarient
     * @apiParam (Request body) {String} [productVarientOption] productVarientOption
     * @apiParamExample {json} Input
     * {
     *      "productVarient" : [],
     *      "productVarientOption" : [{
     *      "id":""
     *      "varientName":""
     *      "price":"",
     *      "sku":"",
     *      "quantity":""
     *      "optionValue":[],
     *      "optionImage":[{
     *      "image":"",
     *      "containerName": "",
     *      "defaultImage": "",
     *       }]
     *       }]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated product.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-variants/update-vendor-product
     * @apiErrorExample {json} updateProduct error
     * HTTP/1.1 500 Internal Server Error
     */
    updateProduct(product, response) {
        var _a, _b, _c, _d;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorProduct = yield this.vendorProductService.findOne({
                where: {
                    productId: product.productId,
                },
            });
            if (!vendorProduct) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Vendor Product',
                });
            }
            let validatedVarient = false;
            const validateVarientPrice = product.productVariantOptions;
            if (validateVarientPrice.length > 0) {
                validatedVarient = validateVarientPrice.some(varientData => varientData.price < 0);
            }
            if (validatedVarient) {
                const errorResponse = {
                    status: 0,
                    message: 'Price should not be in negative',
                };
                return response.status(400).send(errorResponse);
            }
            const updateProduct = yield this.productService.findOne({
                where: {
                    productId: product.productId,
                },
            });
            if (!updateProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid product Id.',
                };
                return response.status(400).send(errorResponse);
            }
            // update product Varient
            const productVariants = product.productVariants;
            const productVariantDetails = [];
            if (productVariants.length > 0) {
                // await this.productVarientService.delete({ productId: updateProduct.productId });
                const productVarient = [];
                for (const productVariant of productVariants) {
                    const newProductVarient = new ProductVarient_1.ProductVarient();
                    if (productVariant.id) {
                        newProductVarient.id = productVariant.id;
                    }
                    newProductVarient.productId = updateProduct.productId;
                    newProductVarient.variantId = productVariant.variantId;
                    newProductVarient.isActive = 1;
                    productVarient.push(newProductVarient);
                }
                productVariantDetails.push(...yield this.productVarientService.bulkSave(productVarient));
            }
            // update product Varient option
            const varientOptions = product.productVariantOptions;
            let totalQty = 0;
            let basePrice = 0;
            if (varientOptions.length > 0) {
                basePrice = varientOptions[0].price;
                for (const varientOption of varientOptions) {
                    if (varientOption.id) {
                        const pdtVarientOption = yield this.productVarientOptionService.findOne({ where: { id: varientOption.id } });
                        if (pdtVarientOption) {
                            // tslint:disable-next-line:no-shadowed-variable
                            const sku = yield this.skuService.findOne({ where: { id: pdtVarientOption.skuId } });
                            if (sku) {
                                sku.skuName = varientOption.sku;
                                sku.price = varientOption.price;
                                sku.quantity = varientOption.quantity ? varientOption.quantity : 1;
                                totalQty += +sku.quantity;
                                sku.isActive = varientOption.isActive;
                                sku.productId = pdtVarientOption.productId;
                                yield this.skuService.create(sku);
                                // create variant discount price
                                const variantDiscountPrice = (_a = varientOption.variantDiscountPrice) !== null && _a !== void 0 ? _a : [];
                                if (variantDiscountPrice.length > 0) {
                                    const createDiscountArr = [];
                                    for (const discountValue of variantDiscountPrice) {
                                        if (varientOption.price <= discountValue.price) {
                                            return response.status(400).send({
                                                status: 0,
                                                message: 'discount price should be less than original price.',
                                            });
                                        }
                                        const findVariantDiscount = yield this.productDiscountService.findOne({ productDiscountId: discountValue === null || discountValue === void 0 ? void 0 : discountValue.id });
                                        const newProductDiscount = findVariantDiscount || new ProductDiscount_1.ProductDiscount();
                                        newProductDiscount.productId = pdtVarientOption.productId;
                                        newProductDiscount.quantity = 1;
                                        newProductDiscount.skuId = sku.id;
                                        newProductDiscount.priority = discountValue.priority;
                                        newProductDiscount.price = discountValue.price;
                                        newProductDiscount.dateStart = discountValue.dateStart;
                                        newProductDiscount.dateEnd = discountValue.dateEnd;
                                        createDiscountArr.push(newProductDiscount);
                                    }
                                    yield this.productDiscountService.create(createDiscountArr);
                                }
                                // create variant special price
                                const variantSpecialPrice = (_b = varientOption.variantSpecialPrice) !== null && _b !== void 0 ? _b : [];
                                if (variantSpecialPrice.length > 0) {
                                    const createSpecialArr = [];
                                    for (const specialValue of variantSpecialPrice) {
                                        if (varientOption.price < specialValue.price) {
                                            return response.status(400).send({
                                                status: 0,
                                                message: 'special price should be less than original price.',
                                            });
                                        }
                                        const findVariantSpecial = yield this.productSpecialService.findOne({ productSpecialId: specialValue === null || specialValue === void 0 ? void 0 : specialValue.id });
                                        const productSpecial = findVariantSpecial || new ProductSpecial_1.ProductSpecial();
                                        productSpecial.productId = pdtVarientOption.productId;
                                        productSpecial.customerGroupId = specialValue.customerGroupId;
                                        productSpecial.skuId = sku.id;
                                        productSpecial.priority = specialValue.priority;
                                        productSpecial.price = specialValue.price;
                                        productSpecial.dateStart = specialValue.dateStart;
                                        productSpecial.dateEnd = specialValue.dateEnd;
                                        createSpecialArr.push(productSpecial);
                                    }
                                    yield this.productSpecialService.create(createSpecialArr);
                                }
                            }
                            pdtVarientOption.isActive = varientOption.isActive;
                            yield this.productVarientOptionService.create(pdtVarientOption);
                            const variantValueDetails = varientOption.variantValueDetails;
                            const varientValue = [];
                            for (const variantValueDetail of variantValueDetails) {
                                yield this.productVarientOptionDetailService.delete({ productVarientOptionId: pdtVarientOption.id, variantValueId: variantValueDetail.variantValueId });
                                const newProductVarientOptionDetail = new ProductVarientOptionDetail_1.ProductVarientOptionDetail();
                                newProductVarientOptionDetail.productVarientOptionId = pdtVarientOption.id;
                                newProductVarientOptionDetail.variantValueId = variantValueDetail.variantValueId;
                                newProductVarientOptionDetail.productVariantId = (productVariantDetails.find((productVariantDetail) => productVariantDetail.variantId === variantValueDetail.variantId)).id;
                                varientValue.push(newProductVarientOptionDetail);
                            }
                            yield this.productVarientOptionDetailService.bulkSave(varientValue);
                            if (varientOption.optionImage) {
                                yield this.productVarientOptionImageService.delete({ productVarientOptionId: varientOption.id });
                                const varientOptionsImages = varientOption.optionImage;
                                const image = [];
                                for (const varientOptionsImage of varientOptionsImages) {
                                    const newProductVarientOptionImage = new ProductVarientOptionImage_1.ProductVarientOptionImage();
                                    newProductVarientOptionImage.productVarientOptionId = varientOption.id;
                                    newProductVarientOptionImage.image = varientOptionsImage.image;
                                    newProductVarientOptionImage.containerName = varientOptionsImage.containerName;
                                    newProductVarientOptionImage.defaultImage = varientOptionsImage.defaultImage;
                                    image.push(newProductVarientOptionImage);
                                }
                                yield this.productVarientOptionImageService.bulkSave(image);
                            }
                        }
                        else {
                            const errorResponse = {
                                status: 0,
                                message: 'Invalid product Varient Option Id.',
                            };
                            return response.status(400).send(errorResponse);
                        }
                    }
                    else {
                        const newSkus = new SkuModel_1.Sku();
                        const find = yield this.skuService.findOne({ where: { skuName: varientOption.sku } });
                        if (find) {
                            const errorResponse = {
                                status: 0,
                                message: 'Duplicate sku name, give some other name for varient',
                            };
                            return response.status(400).send(errorResponse);
                        }
                        newSkus.skuName = varientOption.sku;
                        newSkus.price = varientOption.price.toString();
                        newSkus.quantity = varientOption.quantity ? varientOption.quantity : 1;
                        totalQty += +newSkus.quantity;
                        newSkus.isActive = varientOption.isActive;
                        // newSkus.productId = updateProduct.productId;
                        const saveSkus = yield this.skuService.create(newSkus);
                        const newProductVarientOption = new ProductVarientOption_1.ProductVarientOption();
                        newProductVarientOption.productId = updateProduct.productId;
                        newProductVarientOption.skuId = saveSkus.id;
                        newProductVarientOption.varientName = varientOption.varientName;
                        newProductVarientOption.isActive = varientOption.isActive;
                        const val = yield this.productVarientOptionService.create(newProductVarientOption);
                        // create variant discount price
                        const variantDiscountPrice = (_c = varientOption.variantDiscountPrice) !== null && _c !== void 0 ? _c : [];
                        if (variantDiscountPrice.length > 0) {
                            const createDiscountArr = [];
                            for (const discountValue of variantDiscountPrice) {
                                if (varientOption.price <= discountValue.price) {
                                    return response.status(400).send({
                                        status: 0,
                                        message: 'discount price should be less than original price.',
                                    });
                                }
                                const newProductDiscount = new ProductDiscount_1.ProductDiscount();
                                newProductDiscount.productId = val.productId;
                                newProductDiscount.quantity = 1;
                                newProductDiscount.skuId = saveSkus.id;
                                newProductDiscount.priority = discountValue.priority;
                                newProductDiscount.price = discountValue.price;
                                newProductDiscount.dateStart = discountValue.dateStart;
                                newProductDiscount.dateEnd = discountValue.dateEnd;
                                createDiscountArr.push(newProductDiscount);
                            }
                            yield this.productDiscountService.create(createDiscountArr);
                        }
                        // create variant special price
                        const variantSpecialPrice = (_d = varientOption.variantSpecialPrice) !== null && _d !== void 0 ? _d : [];
                        if (variantSpecialPrice.length > 0) {
                            const createSpecialArr = [];
                            for (const specialValue of variantSpecialPrice) {
                                if (varientOption.price < specialValue.price) {
                                    return response.status(400).send({
                                        status: 0,
                                        message: 'special price should be less than original price.',
                                    });
                                }
                                const productSpecial = new ProductSpecial_1.ProductSpecial();
                                productSpecial.productId = val.productId;
                                productSpecial.customerGroupId = specialValue.customerGroupId;
                                productSpecial.skuId = saveSkus.id;
                                productSpecial.priority = specialValue.priority;
                                productSpecial.price = specialValue.price;
                                productSpecial.dateStart = specialValue.dateStart;
                                productSpecial.dateEnd = specialValue.dateEnd;
                                createSpecialArr.push(productSpecial);
                            }
                            yield this.productSpecialService.create(createSpecialArr);
                        }
                        // --
                        const variantValueDetails = varientOption.variantValueDetails;
                        const varientValue = [];
                        for (const variantValueDetail of variantValueDetails) {
                            const newProductVarientOptionDetail = new ProductVarientOptionDetail_1.ProductVarientOptionDetail();
                            newProductVarientOptionDetail.productVarientOptionId = val.id;
                            newProductVarientOptionDetail.variantValueId = variantValueDetail.variantValueId;
                            newProductVarientOptionDetail.productVariantId = (productVariantDetails.find((productVariantDetail) => productVariantDetail.variantId === variantValueDetail.variantId)).id;
                            varientValue.push(newProductVarientOptionDetail);
                        }
                        yield this.productVarientOptionDetailService.bulkSave(varientValue);
                        // --
                        const varientOptionsImages = varientOption.optionImage;
                        const image = [];
                        for (const varientOptionsImage of varientOptionsImages) {
                            const newProductVarientOptionImage = new ProductVarientOptionImage_1.ProductVarientOptionImage();
                            newProductVarientOptionImage.productVarientOptionId = val.id;
                            newProductVarientOptionImage.image = varientOptionsImage.image;
                            newProductVarientOptionImage.containerName = varientOptionsImage.containerName;
                            newProductVarientOptionImage.defaultImage = varientOptionsImage.defaultImage;
                            image.push(newProductVarientOptionImage);
                        }
                        yield this.productVarientOptionImageService.bulkSave(image);
                    }
                }
            }
            // Update Over Stock and Base Price
            const sku = yield this.skuService.findOne({ where: { id: updateProduct.skuId } });
            sku.quantity = varientOptions.length > 0 ? totalQty : updateProduct.quantity;
            sku.price = varientOptions.length > 0 ? basePrice : updateProduct.price;
            yield this.skuService.create(sku);
            // --
            // Change Product isSimplified status
            const varientSimplified = product.productVariants;
            if (varientSimplified.length > 0) {
                updateProduct.isSimplified = 0;
            }
            else {
                updateProduct.isSimplified = 1;
            }
            // --
            yield this.productService.create(updateProduct);
            const successResponse = {
                status: 1,
                message: 'Successfully Updated the Product Variant',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Vendor Product Variants Product Detail API
    /**
     * @api {get} /api/vendor-product-variants/vendor-product-detail/:id Vendor Product Variants Product Detail API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/vendor-product-variants/vendor-product-detail/:id
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    productDetail(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorProduct = yield this.vendorProductService.findOne({
                where: {
                    productId: id,
                },
            });
            if (!vendorProduct) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Vendor Product',
                });
            }
            const productDetail = yield this.productService.findOne({
                where: { productId: id },
            });
            if (!productDetail) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Product Id..!',
                });
            }
            const productDetails = (0, class_transformer_1.instanceToPlain)(productDetail);
            productDetails.productImage = yield this.productImageService.findAll({
                select: ['productId', 'image', 'containerName', 'defaultImage'],
                where: {
                    productId: productDetail.productId,
                },
            });
            productDetails.productVariants = yield this.productVarientService.findAll({
                select: ['id', 'variantId', 'productId'],
                where: { productId: productDetail.productId },
            });
            productDetails.productVariantList = yield this.productVarientOptionService.findAll({
                select: ['id', 'productId', 'skuId', 'varientName', 'isActive', 'createdDate'],
                where: { productId: productDetail.productId },
            }).then((val) => {
                const productVarList = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const temp = value;
                    const sku = yield this.skuService.findOne({
                        select: ['id', 'skuName', 'price', 'isActive', 'quantity', 'outOfStockThreshold', 'notifyMinQuantity', 'minQuantityAllowedCart', 'maxQuantityAllowedCart', 'enableBackOrders', 'vendorId'],
                        where: { id: value.skuId },
                    });
                    const orderProducts = yield this.orderProductService.findVariantSku(sku.skuName);
                    console.log('orderProducts:', orderProducts);
                    if (orderProducts.length !== 0) {
                        Object.assign(temp, { availedVarient: 1 });
                    }
                    else {
                        Object.assign(temp, { availedVarient: 0 });
                    }
                    const image = yield this.productVarientOptionImageService.findAll({
                        select: ['id', 'image', 'containerName', 'defaultImage', 'productVarientOptionId'],
                        where: { productVarientOptionId: value.id },
                    });
                    const productVarientOptionDetails = yield this.productVarientOptionDetailService.findAll({
                        select: ['id', 'productVarientOptionId', 'variantValueId', 'productVariantId'],
                        where: { productVarientOptionId: value.id },
                    }).then((varientValue) => {
                        const varientValueList = varientValue.map((vv) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                            const tempValue = vv;
                            const varientValueData = yield this.varientsValueService.findOne({
                                select: ['id', 'value', 'variantId'],
                                where: { id: vv.variantValueId },
                            });
                            // console.log(varientValueData, 'valueeeeeeeee');
                            tempValue.value = (varientValueData !== undefined) ? varientValueData.value : '';
                            return tempValue;
                        }));
                        const rslt = Promise.all(varientValueList);
                        return rslt;
                    });
                    const discountPrice = yield this.productDiscountService.findAll({ where: { skuId: value.skuId } });
                    const specialPrice = yield this.productSpecialService.findAll({ where: { skuId: value.skuId } });
                    temp.skuName = sku.skuName;
                    temp.price = sku.price;
                    temp.quantity = sku.quantity;
                    temp.isActive = sku.isActive;
                    temp.outOfStockThreshold = sku.outOfStockThreshold;
                    temp.notifyMinQuantity = sku.notifyMinQuantity;
                    temp.minQuantityAllowedCart = sku.minQuantityAllowedCart;
                    temp.maxQuantityAllowedCart = sku.maxQuantityAllowedCart;
                    temp.enableBackOrders = sku.enableBackOrders;
                    temp.vendorId = sku.vendorId;
                    temp.optionImage = image;
                    temp.productVarientOptionDetails = productVarientOptionDetails;
                    temp.discountPrice = discountPrice;
                    temp.specialPrice = specialPrice;
                    return temp;
                }));
                const resultData = Promise.all(productVarList);
                return resultData;
            });
            const successResponse = {
                status: 1,
                message: 'Successfully got product variant detail.',
                data: productDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Vendor Product Variant Inventory List API
    /**
     * @api {get} /api/vendor-product-variants/vendor-product-variant-inventory-list Vendor Product Variant Inventory List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} sku sku
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} price=1/2 if 1->asc 2->desc
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get vendor product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/vendor-product-variants/vendor-product-variant-inventory-list
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    inventoryVendorProductList(limit, offset, keyword, sku, status, productName, price, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorId = request.user.vendorId;
            const selects = ['VendorProducts.vendorProductId as vendorProductId',
                'VendorProducts.approvalFlag as approvalFlag',
                'VendorProducts.vendorId as vendorId',
                'product.productId as productId',
                'product.pincodeBasedDelivery as pincodeBasedDelivery',
                'product.name as name',
                'product.sku as sku',
                'product.price as productprice',
                'product.quantity as quantity',
                'product.sortOrder as sortOrder',
                'product.isActive as isActive',
                'product.productSlug as productSlug',
                'product.hasStock as hasStock',
                'product.hasTirePrice as hasTirePrice',
                'product.outOfStockThreshold as outOfStockThreshold',
                'product.notifyMinQuantity as notifyMinQuantity',
                'product.minQuantityAllowedCart as minQuantityAllowedCart',
                'product.maxQuantityAllowedCart as maxQuantityAllowedCart',
                'product.enableBackOrders as enableBackOrders',
                'product.modifiedDate as modifiedDate',
                'product.isSimplified as isSimplified',
                'product.skuId as skuId',
                'VendorProducts.createdDate as createdDate',
                'product.keywords as keywords',
                'product.attributeKeyword as attributeKeyword'];
            const whereCondition = [];
            const relations = [];
            const groupBy = [];
            relations.push({
                tableName: 'VendorProducts.product',
                aliasName: 'product',
            });
            whereCondition.push({
                name: '(' + 'product.isSimplified',
                op: 'and',
                value: 0,
            });
            whereCondition.push({
                name: 'VendorProducts.vendorId',
                op: 'and',
                value: vendorId,
            });
            whereCondition.push({
                name: 'VendorProducts.reuse',
                op: 'IS NULL',
                value: ')',
            });
            if (price && price !== '') {
                whereCondition.push({
                    name: 'product.price',
                    op: 'and',
                    value: price,
                });
            }
            if (status) {
                whereCondition.push({
                    name: 'product.isActive',
                    op: 'and',
                    value: status,
                });
            }
            const searchConditions = [];
            if (keyword) {
                searchConditions.push({
                    name: ['product.keywords', 'product.name', 'product.sku'],
                    value: keyword.toLowerCase(),
                });
            }
            if (sku && sku !== '') {
                searchConditions.push({
                    name: ['product.sku'],
                    value: sku.toLowerCase(),
                });
            }
            if (productName && productName !== '') {
                searchConditions.push({
                    name: ['product.name'],
                    value: productName.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'VendorProducts.createdDate',
                order: 'DESC',
            });
            if (count) {
                const vendorProductListCount = yield this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, true, true);
                const sucResponse = {
                    status: 1,
                    message: 'Successfully got Vendor Product list.',
                    data: vendorProductListCount,
                };
                return response.status(200).send(sucResponse);
            }
            const vendorProductList = yield this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
            const promise = vendorProductList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                let skuValue = undefined;
                if (result.isSimplified === 0) {
                    skuValue = yield this.productVarientOptionService.findSkuForProductVarient(result.productId);
                }
                const temp = result;
                temp.skuValue = skuValue;
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete product list. ',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
    // update stock  API
    /**
     * @api {post} /api/vendor-product-variants/vendor-product-varient-update-stock Update Stock API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} productId productId
     * @apiParam (Request body) {number} [hasStock] send 0 or 1
     * @apiParam (Request body) {object} [productStock]
     * @apiParam (Request body) {number} productStock.skuId skuId
     * @apiParam (Request body) {number} productStock.outOfStockThreshold for setting out of stock threshold
     * @apiParam (Request body) {number} productStock.notifyMinQuantity notifyMinQuantity
     * @apiParam (Request body) {number} productStock.minQuantityAllowedCart  minQuantityAllowedCart
     * @apiParam (Request body) {number} productStock.maxQuantityAllowedCart maxQuantityAllowedCart
     * @apiParam (Request body) {number} productStock.enableBackOrders enableBackOrders
     * @apiParamExample {json} Input
     * {
     *      "hasStock" : "",
     *      "productId" : "",
     *      "productStock": [{
     *      "skuId" : "",
     *      "outOfStockThreshold" : "",
     *      "notifyMinQuantity" : "",
     *      "minQuantityAllowedCart" : "",
     *      "maxQuantityAllowedCart" : "",
     *      "enableBackOrders" : "",
     *      }]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated product stock.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-variants/vendor-product-varient-update-stock
     * @apiErrorExample {json} stock error
     * HTTP/1.1 500 Internal Server Error
     */
    manageStock(updateStock, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findOne({
                where: {
                    productId: updateStock.productId,
                },
            });
            if (!product) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid product Id.',
                };
                return response.status(400).send(errorResponse);
            }
            const vendorProduct = yield this.vendorProductService.findOne({
                where: {
                    productId: updateStock.productId,
                    vendorId: request.user.vendorId,
                },
            });
            if (!vendorProduct) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid vendor product Id.',
                });
            }
            product.hasStock = updateStock.hasStock;
            const productStock = updateStock.productStock;
            console.log('productStock:', productStock);
            const valArr = [];
            for (const value of productStock) {
                const sku = yield this.skuService.findOne({
                    where: {
                        id: value.skuId,
                    },
                });
                if (!sku) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid sku Id.',
                    };
                    return response.status(400).send(errorResponse);
                }
                if (sku.quantity < value.outOfStockThreshold) {
                    const errorResponse = {
                        status: 0,
                        message: 'outOfStockThreshold should be less than original quantity.',
                    };
                    return response.status(400).send(errorResponse);
                }
                sku.outOfStockThreshold = value.outOfStockThreshold ? value.outOfStockThreshold : sku.outOfStockThreshold;
                sku.notifyMinQuantity = value.notifyMinQuantity ? value.notifyMinQuantity : sku.notifyMinQuantity;
                sku.minQuantityAllowedCart = value.minQuantityAllowedCart ? value.minQuantityAllowedCart : sku.minQuantityAllowedCart;
                sku.maxQuantityAllowedCart = value.maxQuantityAllowedCart ? value.maxQuantityAllowedCart : sku.maxQuantityAllowedCart;
                sku.enableBackOrders = value.enableBackOrders ? value.enableBackOrders : sku.enableBackOrders;
                valArr.push(sku);
            }
            yield this.skuService.create(valArr);
            const productValue = yield this.productService.create(product);
            if (productValue) {
                const successResponse = {
                    status: 1,
                    message: 'successfully updated stock .',
                    data: productValue,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to update',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    deleteProductVarient(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productVariant = yield this.productVarientService.findOne({
                where: {
                    id,
                },
            });
            if (!productVariant) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid Product Variant Id..!`,
                });
            }
            // const variantValues = await this.varientsValueService.find({
            //     where: {
            //         variantId: productVariant.variantId,
            //     },
            // });
            const productVariantOptionDetail = yield this.productVarientOptionDetailService.findAll({
                where: {
                    productVariantId: productVariant.id,
                },
            });
            const productVarientOptions = yield this.productVarientOptionService.findAll({
                where: {
                    id: (0, typeorm_1.In)(productVariantOptionDetail.map((productVariantOptionDet) => productVariantOptionDet.productVarientOptionId)),
                },
            });
            const orderProductExist = [];
            for (const productVarientOption of productVarientOptions) {
                const sku = yield this.skuService.findOne({
                    where: {
                        id: productVarientOption.skuId,
                    },
                });
                const orderProduct = yield this.orderProductService.productVarientPaymentProcess(sku.skuName);
                if (orderProduct) {
                    orderProductExist.push(orderProduct);
                }
            }
            if (orderProductExist.length) {
                const errorResponse = {
                    status: 0,
                    message: 'You cannot delete this variant as this particular variants under product is already ordered.',
                    data: productVarientOptions,
                };
                return response.status(400).send(errorResponse);
            }
            yield this.skuService.bulkDelete({ id: (0, typeorm_1.In)(productVarientOptions.map((productVarientOption) => productVarientOption.skuId)) });
            yield this.productVarientOptionService.bulkDelete({ id: (0, typeorm_1.In)(productVarientOptions.map((productVarientOption) => productVarientOption.id)) });
            yield this.productVarientService.delete(id);
            return response.status(200).send({
                status: 0,
                message: `Successfully Deleted Product Variant..!`,
            });
        });
    }
    // Delete Product Varient Option API
    /**
     * @api {delete} /api/product-variants/:id Delete Product Varient Option API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-variants/:id
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteProductVarientOption(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productVarientOptionId = yield this.productVarientOptionService.findOne({
                where: {
                    id,
                },
            });
            if (!productVarientOptionId) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Id.',
                };
                return response.status(400).send(errorResponse);
            }
            const sku = yield this.skuService.findOne({
                where: {
                    id: productVarientOptionId.skuId,
                },
            });
            if (sku) {
                const orderProductId = yield this.orderProductService.productVarientPaymentProcess(sku.skuName);
                if (orderProductId) {
                    const errorResponse = {
                        status: 0,
                        message: 'You cannot delete this variant as this particular variant under product is already ordered.',
                    };
                    return response.status(400).send(errorResponse);
                }
                yield this.skuService.delete({ id: productVarientOptionId.skuId });
            }
            const productVarientOption = yield this.productVarientOptionService.delete(id);
            const successResponse = {
                status: 1,
                message: 'Successfully deleted.',
                data: productVarientOption,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Delete Vendor Product Varient Option API
    /**
     * @api {delete} /api/vendor-product-variants/delete-vendor-product-varient-option/:id Delete Vendor Product Varient Option API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-variants/delete-vendor-product-varient-option/:id
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     */
    // @Delete('/variant-option/:id')
    // @Authorized('vendor')
    // public async deleteProductVarientOption(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
    //     const productVarientOptionId = await this.productVarientOptionService.findOne({
    //         where: {
    //             id,
    //         },
    //     });
    //     if (!productVarientOptionId) {
    //         const errorResponse: any = {
    //             status: 0,
    //             message: 'Invalid Id.',
    //         };
    //         return response.status(400).send(errorResponse);
    //     }
    //     const sku = await this.skuService.findOne({
    //         where: {
    //             id: productVarientOptionId.skuId,
    //         },
    //     });
    //     if (sku) {
    //         const orderProductId = await this.orderProductService.productVarientPaymentProcess(sku.skuName);
    //         if (orderProductId) {
    //             const errorResponse: any = {
    //                 status: 0,
    //                 message: 'You cannot delete this variant as this particular variant under product is already ordered.',
    //             };
    //             return response.status(400).send(errorResponse);
    //         }
    //         await this.skuService.delete({ id: productVarientOptionId.skuId });
    //     }
    //     const productVarientOption = await this.productVarientOptionService.delete(id);
    //     if (productVarientOption) {
    //         const successResponse: any = {
    //             status: 1,
    //             message: 'Successfully deleted.',
    //         };
    //         return response.status(200).send(successResponse);
    //     } else {
    //         const errorResponse: any = {
    //             status: 0,
    //             message: 'unable to delete',
    //         };
    //         return response.status(400).send(errorResponse);
    //     }
    // }
    // Variants List API
    /**
     * @api {get} /api/vendor-product-variants/variants Varients List API
     * @apiGroup Variants
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get varient list",
     *      "data":{
     *      "id" : "",
     *      "name" : "",
     *      "type" : "",
     *      "sortOrder" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-variants/variants
     * @apiErrorExample {json} Variantlist error
     * HTTP/1.1 500 Internal Server Error
     */
    varientsList(limit, offset, keyword, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['id', 'type', 'name', 'sortOrder'];
            const relation = [];
            const WhereConditions = [];
            const varientsList = yield this.varientsService.list(limit, offset, select, relation, WhereConditions, count);
            if (count) {
                const successRes = {
                    status: 1,
                    message: 'Successfully got count',
                    data: varientsList,
                };
                return response.status(200).send(successRes);
            }
            const promise = varientsList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const data = yield this.varientsValueService.find({ where: { variantId: result.id }, order: { sortOrder: 'ASC' } });
                const temp = result;
                if (data) {
                    temp.varientsValue = data;
                    const availablevarientVal = temp.varientsValue.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const availableVarientValue = yield this.productVarientOptionDetailService.findOne({
                            where: {
                                variantValueId: val.id,
                            },
                        });
                        if (availableVarientValue) {
                            Object.assign(val, { availedVarientValue: 1 });
                        }
                        else {
                            Object.assign(val, { availedVarientValue: 0 });
                        }
                        return val;
                    }));
                    yield Promise.all(availablevarientVal);
                }
                else {
                    temp.varientsValue = [];
                }
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete list of varients. ',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('sku')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('productName')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('price')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(8, (0, routing_controllers_1.Req)()),
    tslib_1.__param(9, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductVariantsController.prototype, "productList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateProductRequest_1.UpdateProductRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductVariantsController.prototype, "updateProduct", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductVariantsController.prototype, "productDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/inventory'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('sku')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('ProductName')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('price')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(8, (0, routing_controllers_1.Req)()),
    tslib_1.__param(9, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductVariantsController.prototype, "inventoryVendorProductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/stock'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateStockRequest_1.UpdateStockRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductVariantsController.prototype, "manageStock", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductVariantsController.prototype, "deleteProductVarient", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/variant-option/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductVariantsController.prototype, "deleteProductVarientOption", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/variants'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductVariantsController.prototype, "varientsList", null);
VendorProductVariantsController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/vendor-product-variant'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        SkuService_1.SkuService,
        ProductVarientService_1.ProductVarientService,
        ProductImageService_1.ProductImageService,
        ProductVarientOptionDetailService_1.ProductVarientOptionDetailService,
        ProductVarientOptionImageService_1.ProductVarientOptionImageService,
        ProductVarientOptionService_1.ProductVarientOptionService,
        VariantValueService_1.VariantValueService,
        VendorProductService_1.VendorProductService,
        OrderProductService_1.OrderProductService,
        VariantService_1.VariantService,
        ProductDiscountService_1.ProductDiscountService,
        ProductSpecialService_1.ProductSpecialService])
], VendorProductVariantsController);
exports.VendorProductVariantsController = VendorProductVariantsController;
//# sourceMappingURL=VendorProductVariantController.js.map