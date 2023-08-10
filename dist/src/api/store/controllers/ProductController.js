"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreProductController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const class_transformer_1 = require("class-transformer");
const ProductToCategoryService_1 = require("../../core/services/ProductToCategoryService");
const ProductService_1 = require("../../core/services/ProductService");
const CategoryService_1 = require("../../core/services/CategoryService");
const ProductImageService_1 = require("../../core/services/ProductImageService");
const CustomerActivityService_1 = require("../../core/services/CustomerActivityService");
const productViewLog_1 = require("../../core/models/productViewLog");
const CustomerActivity_1 = require("../../core/models/CustomerActivity");
const ProductViewLogService_1 = require("../../core/services/ProductViewLogService");
const CustomerService_1 = require("../../core/services/CustomerService");
const CategoryPathService_1 = require("../../core/services/CategoryPathService");
const TaxService_1 = require("../../core/services/TaxService");
const OrderProductService_1 = require("../../core/services/OrderProductService");
const SkuService_1 = require("../../core/services/SkuService");
const ProductVideoService_1 = require("../../core/services/ProductVideoService");
const moment = require("moment");
const checkTokenMiddleware_1 = require("../../core/middlewares/checkTokenMiddleware");
let StoreProductController = class StoreProductController {
    constructor(productService, productToCategoryService, categoryService, productImageService, customerService, productViewLogService, customerActivityService, taxService, orderProductService, skuService, categoryPathService, productVideoService) {
        this.productService = productService;
        this.productToCategoryService = productToCategoryService;
        this.categoryService = categoryService;
        this.productImageService = productImageService;
        this.customerService = customerService;
        this.productViewLogService = productViewLogService;
        this.customerActivityService = customerActivityService;
        this.taxService = taxService;
        this.orderProductService = orderProductService;
        this.skuService = skuService;
        this.categoryPathService = categoryPathService;
        this.productVideoService = productVideoService;
        // --
    }
    // Product Details API
    /**
     * @api {get} /api/product-store/productdetail/:productslug   Product detail API
     * @apiGroup Store
     * @apiParam (Request body) {String} categorySlug categorySlug
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product-store/productdetail/:productslug
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    productDetail(productslug, categorySlug, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productDetail = yield this.productService.findOne({
                productSlug: productslug,
                isActive: 1,
            });
            if (!productDetail) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid product',
                };
                return response.status(404).send(errResponse);
            }
            const date = new Date();
            if (productDetail.dateAvailable > date) {
                return response.status(404).send({
                    status: 0,
                    message: 'Invalid product',
                });
            }
            const productDetails = (0, class_transformer_1.instanceToPlain)(productDetail);
            if (productDetails.taxType === 2) {
                const tax = yield this.taxService.findOne({ taxId: productDetails.taxValue });
                if (tax) {
                    productDetails.taxValue = tax.taxPercentage;
                }
                else {
                    productDetails.taxValue = '';
                }
            }
            productDetails.ratingCount = 0;
            productDetails.reviewCount = 'null';
            productDetails.productImage = yield this.productImageService.findAll({
                select: ['productId', 'image', 'containerName', 'defaultImage'],
                where: {
                    productId: productDetail.productId,
                },
            });
            productDetails.productOriginalImage = productDetails.productImage.slice();
            if (categorySlug) {
                const category = yield this.categoryService.findOne({ categorySlug, isActive: 1 });
                if (category) {
                    const categoryLevels = yield this.categoryPathService.find({
                        select: ['level', 'pathId'],
                        where: { categoryId: category.categoryId },
                        order: { level: 'ASC' },
                    }).then((values) => {
                        const categories = values.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                            const categoryData = yield this.categoryService.findOne({ categoryId: val.pathId });
                            const tempVal = val;
                            tempVal.categoryName = categoryData ? categoryData.name : '';
                            tempVal.categoryId = categoryData ? categoryData.categoryId : '';
                            tempVal.categorySlug = categoryData ? categoryData.categorySlug : '';
                            tempVal.parentInt = categoryData ? categoryData.parentInt : '';
                            tempVal.categoryDescription = categoryData ? categoryData.categoryDescription : '';
                            return tempVal;
                        }));
                        const results = Promise.all(categories);
                        return results;
                    });
                    productDetails.Category = categoryLevels;
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid category',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            else {
                productDetails.Category = yield this.productToCategoryService.findAll({
                    select: ['categoryId', 'productId'],
                    where: { productId: productDetail.productId },
                }).then((val) => {
                    const category = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const categoryNames = yield this.categoryService.findOne({ categoryId: value.categoryId });
                        const temp = value;
                        if (categoryNames !== undefined) {
                            temp.categoryName = categoryNames.name;
                            temp.categorySlug = categoryNames.categorySlug;
                        }
                        else {
                            temp.categoryName = '';
                            temp.categorySlug = '';
                        }
                        return temp;
                    }));
                    const results = Promise.all(category);
                    return results;
                });
            }
            productDetails.productOption = [];
            productDetails.skuName = '';
            productDetails.skuId = productDetails.skuId ? productDetails.skuId : '';
            productDetails.variantName = '';
            productDetails.variantId = '';
            const skuValue = yield this.skuService.findOne({ id: productDetails.skuId });
            if (skuValue) {
                productDetails.price = skuValue.price;
                productDetails.skuName = skuValue.skuName;
                productDetails.skuId = skuValue.skuId;
                productDetails.outOfStockThreshold = skuValue.outOfStockThreshold;
                productDetails.notifyMinQuantity = skuValue.notifyMinQuantity;
                productDetails.minQuantityAllowedCart = skuValue.minQuantityAllowedCart;
                productDetails.maxQuantityAllowedCart = skuValue.maxQuantityAllowedCart;
                productDetails.enableBackOrders = skuValue.enableBackOrders;
                if (productDetails.hasStock === 1) {
                    if (skuValue.quantity <= skuValue.outOfStockThreshold) {
                        productDetails.stockStatus = 'outOfStock';
                    }
                    else {
                        productDetails.stockStatus = 'inStock';
                    }
                }
                else {
                    productDetails.stockStatus = 'inStock';
                }
            }
            productDetails.pricerefer = '';
            productDetails.flag = '';
            if (request.id) {
                let customerId;
                customerId = request.id;
                const orderProduct = yield this.orderProductService.buyedCount(productDetail.productId, customerId);
                if (orderProduct.length > 0) {
                    productDetails.buyed = 1;
                }
                else {
                    productDetails.buyed = 0;
                }
                const customerDetail = yield this.customerService.findOne({ where: { id: customerId } });
                const customerActivity = new CustomerActivity_1.CustomerActivity();
                customerActivity.customerId = customerId;
                customerActivity.activityId = 2;
                customerActivity.description = 'productviewed';
                customerActivity.productId = productDetail.productId;
                yield this.customerActivityService.create(customerActivity);
                const viewLog = new productViewLog_1.ProductViewLog();
                viewLog.productId = productDetail.productId;
                viewLog.customerId = customerDetail.id;
                viewLog.firstName = customerDetail.firstName;
                viewLog.lastName = customerDetail.lastName;
                viewLog.username = customerDetail.username;
                viewLog.email = customerDetail.email;
                viewLog.mobileNumber = customerDetail.mobileNumber;
                viewLog.address = customerDetail.address;
                yield this.productViewLogService.create(viewLog);
            }
            else {
                productDetails.buyed = 0;
            }
            // product video
            productDetails.productVideo = yield this.productVideoService.findOne({
                select: ['id', 'name', 'path', 'type', 'productId'],
                where: { productId: productDetail.productId },
            });
            const successResponse = {
                status: 1,
                message: 'Successfully got productDetail',
                data: productDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Get Category API
    /**
     * @api {get} /api/product-store/Get-Category Get Category API
     * @apiGroup Store
     * @apiParam (Request body) {Number} CategoryId categoryId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the category.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-store/Get-Category
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    getCategory(CategoryId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['categoryId', 'name', 'parentInt', 'sortOrder', 'categorySlug'];
            const search = [];
            const WhereConditions = [{
                    name: 'categoryId',
                    value: CategoryId,
                }];
            const category = yield this.categoryService.list(0, 0, select, search, WhereConditions, 0, 0);
            const promise = category.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = result;
                const categoryLevel = yield this.categoryPathService.find({
                    select: ['level', 'pathId'],
                    where: { categoryId: result.categoryId },
                    order: { level: 'ASC' },
                }).then((values) => {
                    const categories = values.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const categoryNames = yield this.categoryService.findOne({ categoryId: val.pathId });
                        const tempVal = val;
                        tempVal.categoryName = categoryNames.name;
                        return tempVal;
                    }));
                    const results = Promise.all(categories);
                    return results;
                });
                temp.levels = categoryLevel;
                return temp;
            }));
            const value = yield Promise.all(promise);
            if (category) {
                const successResponse = {
                    status: 1,
                    message: 'successfully got the category. ',
                    data: value,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Product Compare API
    /**
     * @api {get} /api/product-store/product-compare Product Compare API
     * @apiGroup Store
     * @apiParam (Request body) {String} productId productId
     * @apiParam (Request body) {String} data data
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Product Compared",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product-store/product-compare
     * @apiErrorExample {json} product compare error
     * HTTP/1.1 500 Internal Server Error
     */
    productCompare(productId, data, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productid = productId.split(',');
            if (productid.length === 0) {
                return response.status(200).send({
                    status: 1,
                    data: [],
                });
            }
            if (productid.length === 1) {
                if (data === '0') {
                    const Response = {
                        status: 1,
                        message: 'Product added to compare.',
                    };
                    return response.status(200).send(Response);
                }
                else {
                    const Detail = [];
                    const List = yield this.productService.findOne({ where: { productId: productid } });
                    const defaultValue = yield this.productImageService.findOne({
                        where: {
                            productId: List.productId,
                            defaultImage: 1,
                        },
                    });
                    const temp = List;
                    temp.ratingCount = 0;
                    temp.reviewCount = 'null';
                    temp.skuName = '';
                    const skuValue = yield this.skuService.findOne({ id: List.skuId });
                    if (skuValue) {
                        temp.price = skuValue.price;
                        temp.skuName = skuValue.skuName;
                    }
                    temp.pricerefer = '';
                    temp.flag = '';
                    if (List.taxType === 2) {
                        const tax = yield this.taxService.findOne({ taxId: List.taxValue });
                        if (tax) {
                            temp.taxValue = tax.taxPercentage;
                        }
                        else {
                            temp.taxValue = '';
                        }
                    }
                    temp.productImage = defaultValue;
                    if (List.hasStock === 1) {
                        if (List.quantity <= List.outOfStockThreshold) {
                            temp.stockStatus = 'outOfStock';
                        }
                        else {
                            temp.stockStatus = 'inStock';
                        }
                    }
                    else {
                        temp.stockStatus = 'inStock';
                    }
                    Detail.push(temp);
                    const Response = {
                        status: 1,
                        message: 'Product Compared Successfully',
                        data: Detail,
                    };
                    return response.status(200).send(Response);
                }
            }
            else {
                if (data === '0') {
                    const categoryDataDetail = [];
                    // product find the which category
                    for (const id of productid) {
                        const categoryId = yield this.productToCategoryService.findAll({ where: { productId: id } });
                        const categoryDataValue = categoryId.map((item) => {
                            return item.categoryId;
                        });
                        categoryDataDetail.push(categoryDataValue);
                    }
                    let categoryData;
                    if (categoryDataDetail.length === 2) {
                        categoryData = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                    }
                    else {
                        const intersectionsTwo = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                        categoryData = intersectionsTwo.filter(e => categoryDataDetail[2].indexOf(e) !== -1);
                    }
                    if (categoryData.length === 0) {
                        const errorResponse = {
                            status: 1,
                            message: 'please choose same category product',
                        };
                        return response.status(400).send(errorResponse);
                    }
                    const successResponse = {
                        status: 1,
                        message: 'Product Compared Successfully',
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    const productDataDetail = [];
                    const categoryDataDetail = [];
                    // product find the which category
                    for (const id of productid) {
                        const categoryId = yield this.productToCategoryService.findAll({ where: { productId: id } });
                        const categoryDataValue = categoryId.map((item) => {
                            return item.categoryId;
                        });
                        categoryDataDetail.push(categoryDataValue);
                    }
                    let categoryData;
                    if (categoryDataDetail.length === 2) {
                        categoryData = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                    }
                    else {
                        const intersectionsTwo = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                        categoryData = intersectionsTwo.filter(e => categoryDataDetail[2].indexOf(e) !== -1);
                    }
                    if (categoryData.length === 0) {
                        const errorResponse = {
                            status: 1,
                            message: 'please choose same category product',
                        };
                        return response.status(400).send(errorResponse);
                    }
                    let productListData;
                    // find the product to compare
                    for (const id of productid) {
                        productListData = yield this.productService.findOne(id);
                        const defaultValue = yield this.productImageService.findOne({
                            where: {
                                productId: productListData.productId,
                                defaultImage: 1,
                            },
                        });
                        const temp = productListData;
                        temp.ratingCount = 0;
                        temp.reviewCount = 'null';
                        temp.skuName = '';
                        const skuValue = yield this.skuService.findOne({ id: productListData.skuId });
                        if (skuValue) {
                            temp.price = skuValue.price;
                            temp.skuName = skuValue.skuName;
                        }
                        temp.pricerefer = '';
                        temp.flag = '';
                        if (productListData.taxType === 2) {
                            const tax = yield this.taxService.findOne({ taxId: productListData.taxValue });
                            if (tax) {
                                temp.taxValue = tax.taxPercentage;
                            }
                            else {
                                temp.taxValue = '';
                            }
                        }
                        temp.productImage = defaultValue;
                        if (productListData.hasStock === 1) {
                            if (productListData.quantity <= productListData.outOfStockThreshold) {
                                temp.stockStatus = 'outOfStock';
                            }
                            else {
                                temp.stockStatus = 'inStock';
                            }
                        }
                        else {
                            temp.stockStatus = 'inStock';
                        }
                        productDataDetail.push(temp);
                    }
                    const successResponse = {
                        status: 1,
                        message: 'Product Compared Successfully',
                        data: productDataDetail,
                    };
                    return response.status(200).send(successResponse);
                }
            }
        });
    }
    // Product Search list Api
    /**
     * @api {get} /api/product-store/productSearchList Product Search List API
     * @apiGroup Store
     * @apiParam (Request body) {String} keyword Product Name
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product-store/productSearchList
     * @apiErrorExample {json} productSearchList error
     * HTTP/1.1 500 Internal Server Error
     */
    productSearchList(limit, offset, keyword, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'Product.productId as productId',
                'Product.sku as sku',
                'Product.name as name',
                'Product.quantity as quantity',
                'Product.price as price',
                'Product.productSlug as productSlug',
                'Product.isActive as isActive',
            ];
            const relations = [];
            const currentDate = moment().format('YYYY-MM-DD');
            const whereConditions = [];
            whereConditions.push({
                name: 'Product.isActive',
                op: 'and',
                value: 1,
            }, {
                name: 'Product.dateAvailable',
                op: 'raw',
                sign: '<=',
                value: currentDate.toString(),
            });
            whereConditions.push();
            const searchConditions = [];
            if (keyword !== '' && keyword !== undefined) {
                searchConditions.push({
                    name: ['Product.name'],
                    value: keyword,
                });
            }
            const productSearchList = yield this.productService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], [], false, true);
            const productList = productSearchList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const defaultValue = yield this.productImageService.findOne({
                    where: {
                        productId: value.productId,
                        defaultImage: 1,
                    },
                });
                temp.productImage = defaultValue;
                const productToCategory = yield this.productToCategoryService.findOne({
                    where: {
                        productId: value.productId,
                        isActive: 1,
                    },
                });
                if (productToCategory) {
                    const category = yield this.categoryService.findOne({
                        select: ['categoryId', 'name', 'isActive', 'categorySlug'],
                        where: {
                            categoryId: productToCategory.categoryId,
                            isActive: 1,
                        },
                    });
                    temp.categoryName = category;
                }
                else {
                    temp.categoryName = '';
                }
                return temp;
            }));
            const results = yield Promise.all(productList);
            if (productSearchList) {
                const successReponse = {
                    status: 1,
                    message: 'Successfully got a product search list.',
                    data: results,
                };
                return response.status(200).send(successReponse);
            }
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckTokenMiddleware),
    (0, routing_controllers_1.Get)('/productdetail/:productslug'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productslug')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('categorySlug')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreProductController.prototype, "productDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/Get-Category'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('CategoryId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreProductController.prototype, "getCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/Product-Compare'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('data')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreProductController.prototype, "productCompare", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/productSearchList'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreProductController.prototype, "productSearchList", null);
StoreProductController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/product-store'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        ProductToCategoryService_1.ProductToCategoryService,
        CategoryService_1.CategoryService,
        ProductImageService_1.ProductImageService,
        CustomerService_1.CustomerService,
        ProductViewLogService_1.ProductViewLogService,
        CustomerActivityService_1.CustomerActivityService,
        TaxService_1.TaxService,
        OrderProductService_1.OrderProductService,
        SkuService_1.SkuService,
        CategoryPathService_1.CategoryPathService,
        ProductVideoService_1.ProductVideoService])
], StoreProductController);
exports.StoreProductController = StoreProductController;
//# sourceMappingURL=ProductController.js.map