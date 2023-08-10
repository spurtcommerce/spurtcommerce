"use strict";
/*
 * spurtcommerce API
 * version 4.8.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const ProductService_1 = require("../../core/services/ProductService");
const ProductToCategoryService_1 = require("../../core/services/ProductToCategoryService");
const ProductImageService_1 = require("../../core/services/ProductImageService");
const ProductModel_1 = require("../../core/models/ProductModel");
const class_transformer_1 = require("class-transformer");
const DeleteProductRequest_1 = require("./requests/DeleteProductRequest");
const CreateProductRequest_1 = require("./requests/CreateProductRequest");
const UpdateProductRequest_1 = require("./requests/UpdateProductRequest");
const ProductToCategory_1 = require("../../core/models/ProductToCategory");
const ProductImage_1 = require("../../core/models/ProductImage");
const CategoryService_1 = require("../../core/services/CategoryService");
const OrderProductService_1 = require("../../core/services/OrderProductService");
const ProductViewLogService_1 = require("../../core/services/ProductViewLogService");
const moment = require("moment");
const fs = require("fs");
const TaxService_1 = require("../../core/services/TaxService");
const ImageService_1 = require("../../core/services/ImageService");
const CategoryPathService_1 = require("../../core/services/CategoryPathService");
const SkuService_1 = require("../../core/services/SkuService");
const SkuModel_1 = require("../../core/models/SkuModel");
const CustomerCartService_1 = require("../../core/services/CustomerCartService");
const OrderService_1 = require("../../core/services/OrderService");
const pluginLoader_1 = require("../../../loaders/pluginLoader");
const uncino_1 = tslib_1.__importDefault(require("uncino"));
const hooks = (0, uncino_1.default)();
let ProductController = class ProductController {
    constructor(productService, productToCategoryService, productImageService, categoryService, orderProductService, productViewLogService, taxService, categoryPathService, skuService, imageService, customerCartService, orderService) {
        this.productService = productService;
        this.productToCategoryService = productToCategoryService;
        this.productImageService = productImageService;
        this.categoryService = categoryService;
        this.orderProductService = orderProductService;
        this.productViewLogService = productViewLogService;
        this.taxService = taxService;
        this.categoryPathService = categoryPathService;
        this.skuService = skuService;
        this.imageService = imageService;
        this.customerCartService = customerCartService;
        this.orderService = orderService;
    }
    // Product List API
    /**
     * @api {get} /api/product Product List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} sku sku
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} price=1/2 if 1-> asc 2-> desc
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    productList(limit, offset, keyword, sku, status, price, count, response) {
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
                'Product.dateAvailable as dateAvailable',
                'Product.width as width',
                'Product.height as height',
                'Product.length as length',
                'Product.weight as weight',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
                '(SELECT sku.sku_name as sku FROM sku WHERE sku.id = skuId) as sku',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as modifiedPrice',
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
                    name: ['Product.name'],
                    value: keyword,
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
                const productListCount = yield this.productService.listByQueryBuilder(limit, offset, select, WhereConditions, [], relations, [], sort, true, true);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got product lists count.',
                    data: productListCount,
                });
            }
            const productList = productLists.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const date = moment(value.dateAvailable).format('YYYY-MM-DD');
                const currentDate = moment().format('YYYY-MM-DD');
                if (currentDate >= date && value.isActive === 1) {
                    temp.globe = 1;
                }
                else {
                    temp.globe = 0;
                }
                temp.pricerefer = '';
                temp.flag = '';
                return temp;
            }));
            const results = yield Promise.all(productList);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete product list.',
                data: (0, class_transformer_1.instanceToPlain)(results),
            };
            return response.status(200).send(successResponse);
        });
    }
    // Create Product API
    /**
     * @api {post} /api/product Add Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..255}} productName productName
     * @apiParam (Request body) {String} [productDescription] productDescription
     * @apiParam (Request body) {String{..64}} sku stock keeping unit
     * @apiParam (Request body) {String{..12}} upc upc
     * @apiParam (Request body) {String{..64}} hsn hsn
     * @apiParam (Request body) {String} image product Image
     * @apiParam (Request body) {String{..255}} [productSlug] productSlug
     * @apiParam (Request body) {String} quantity quantity
     * @apiParam (Request body) {Number} [packingCost] packingCost
     * @apiParam (Request body) {Number} [shippingCost] shippingCost
     * @apiParam (Request body) {Number} [tax] tax
     * @apiParam (Request body) {Number} [taxType] taxType
     * @apiParam (Request body) {Number} [others] others
     * @apiParam (Request body) {String} categoryId CategoryId
     * @apiParam (Request body) {String} [relatedProductId] relatedProductId
     * @apiParam (Request body) {Number} price price
     * @apiParam (Request body) {Number} [outOfStockStatus] outOfStockStatus
     * @apiParam (Request body) {Number} [requiredShipping] requiredShipping
     * @apiParam (Request body) {String} dateAvailable dateAvailable
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number{..9999}} sortOrder sortOrder
     * @apiParam (Request body) {Number} [quotationAvailable] quotationAvailable
     * @apiParam (Request body) {String} [height] height
     * @apiParam (Request body) {String} [weight] weight
     * @apiParam (Request body) {String} [length] length
     * @apiParam (Request body) {String} [width] width
     * @apiParam (Request body) {String} productVideo.path for embedded have to pass path only
     * @apiParam (Request body) {Number} productVideo.type 1 -> video 2 -> embedded
     * @apiParamExample {json} Input
     * {
     *      "productName" : "",
     *      "productDescription" : "",
     *      "sku" : "",
     *      "image" : "",
     *      "categoryId" : [],
     *      "productSlug" : "",
     *      "upc" : "",
     *      "hsn" : "",
     *      "price" : "",
     *      "packingCost" : "",
     *      "shippingCost" : "",
     *      "tax" : "",
     *      "taxType" : "",
     *      "others" : "",
     *      "outOfStockStatus" : "",
     *      "requiredShipping" : "",
     *      "dateAvailable" : "",
     *      "status" : "",
     *      "outOfStockStatus" : "",
     *      "sortOrder" : "",
     *      "quotationAvailable" : "",
     *      "image":[
     *      {
     *      "image":""
     *      "containerName":""
     *      "defaultImage":""
     *      }
     *      ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new product.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product
     * @apiErrorExample {json} AddProduct error
     * HTTP/1.1 500 Internal Server Error
     */
    addProduct(product, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = product.categoryId;
            if (category.length === 0) {
                return response.status(400).send({
                    status: 0,
                    message: 'Category should not be empty',
                });
            }
            if ((product.tax < 0)) {
                const errorResponse = {
                    status: 0,
                    message: 'tax should not be in negative',
                };
                return response.status(400).send(errorResponse);
            }
            const newProduct = new ProductModel_1.Product();
            if (+newProduct.price === 0) {
                return response.status(400).send({
                    status: 0,
                    message: 'It is mandatory to mention price for the product.',
                });
            }
            const productImage = product.image;
            if (productImage.length === 0) {
                return response.status(400).send({
                    status: 0,
                    message: 'You need to upload at least one image for the product.',
                });
            }
            newProduct.name = product.productName;
            newProduct.description = product.productDescription ? yield this.imageService.escapeChar(product.productDescription) : '';
            const metaTagTitle = product.productSlug ? product.productSlug : product.productName;
            const slug = metaTagTitle.trim();
            const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            newProduct.productSlug = yield this.validate_slug(data);
            newProduct.sku = product.sku;
            newProduct.upc = product.upc;
            newProduct.hsn = product.hsn;
            newProduct.quantity = product.quantity ? product.quantity : 1;
            newProduct.quotationAvailable = product.quotationAvailable ? product.quotationAvailable : 0;
            // different charges
            const serviceCharge = {};
            serviceCharge.productCost = product.price;
            serviceCharge.packingCost = product.packingCost ? product.packingCost : 0;
            serviceCharge.shippingCost = product.shippingCost ? product.shippingCost : 0;
            serviceCharge.tax = 0;
            serviceCharge.others = product.others ? product.others : 0;
            newProduct.serviceCharges = JSON.stringify(serviceCharge);
            newProduct.price = serviceCharge.productCost + serviceCharge.packingCost + serviceCharge.shippingCost + serviceCharge.others;
            newProduct.taxType = product.taxType ? product.taxType : 0;
            newProduct.taxValue = product.tax ? product.tax : 0;
            newProduct.stockStatusId = product.outOfStockStatus ? product.outOfStockStatus : 0;
            // saving sku //
            const findSku = yield this.skuService.findOne({ where: { skuName: product.sku } });
            if (findSku) {
                const errorResponse = {
                    status: 0,
                    message: 'Duplicate sku name, give some other name.',
                };
                return response.status(400).send(errorResponse);
            }
            const newSku = new SkuModel_1.Sku();
            newSku.skuName = product.sku;
            newSku.price = newProduct.price;
            newSku.quantity = product.quantity ? product.quantity : 1;
            newSku.isActive = product.status;
            const saveSku = yield this.skuService.create(newSku);
            // ending sku
            newProduct.skuId = saveSku.id;
            newProduct.shipping = product.requiredShipping;
            newProduct.dateAvailable = moment(product.dateAvailable).toISOString();
            newProduct.isActive = product.status;
            newProduct.isFeatured = 0;
            newProduct.todayDeals = 0;
            newProduct.sortOrder = product.sortOrder ? product.sortOrder : 1;
            newProduct.height = (product && product.height) ? product.height : 0;
            newProduct.weight = (product && product.weight) ? product.weight : 0;
            newProduct.length = (product && product.length) ? product.length : 0;
            newProduct.width = (product && product.width) ? product.width : 0;
            const row = [];
            if (category.length !== 0) {
                for (const categoryId of category) {
                    const categoryNames = yield this.categoryService.findOne({
                        where: {
                            categoryId,
                        },
                    });
                    const name = '~' + categoryNames.name + '~';
                    row.push(name);
                }
                row.push('~' + product.productName + '~');
            }
            const value = row.toString();
            newProduct.keywords = value;
            newProduct.owner = 1;
            newProduct.createdBy = request.user.userId;
            const saveProduct = yield this.productService.create(newProduct);
            // save category
            if (category.length !== 0) {
                for (const categoryId of category) {
                    const newProductToCategory = new ProductToCategory_1.ProductToCategory();
                    newProductToCategory.productId = saveProduct.productId;
                    newProductToCategory.categoryId = categoryId;
                    newProductToCategory.isActive = 1;
                    yield this.productToCategoryService.create(newProductToCategory);
                }
            }
            // Save products Image
            for (const imageRow of productImage) {
                const imageData = JSON.stringify(imageRow);
                const imageResult = JSON.parse(imageData);
                const newProductImage = new ProductImage_1.ProductImage();
                newProductImage.productId = saveProduct.productId;
                newProductImage.image = imageResult.image;
                newProductImage.containerName = imageResult.containerName;
                newProductImage.defaultImage = imageResult.defaultImage;
                yield this.productImageService.create(newProductImage);
            }
            saveProduct.isSimplified = 1;
            yield this.productService.create(saveProduct);
            if (saveProduct) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully created Product.',
                    data: saveProduct,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create the Product.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // update Product API
    /**
     * @api {post} /api/product/update-product/:id Update Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {String{..255}} productName productName
     * @apiParam (Request body) {String} [productDescription] productDescription
     * @apiParam (Request body) {String{..64}} sku stock keeping unit
     * @apiParam (Request body) {String{..12}} upc upc
     * @apiParam (Request body) {String{..64}} hsn hsn
     * @apiParam (Request body) {String} image product Image
     * @apiParam (Request body) {String} quantity quantity
     * @apiParam (Request body) {String{.255}} [productSlug] productSlug
     * @apiParam (Request body) {String} categoryId CategoryId
     * @apiParam (Request body) {String} [relatedProductId] relatedProductId
     * @apiParam (Request body) {Number} price price
     * @apiParam (Request body) {Number} [packingCost] packingCost
     * @apiParam (Request body) {Number} [shippingCost] shippingCost
     * @apiParam (Request body) {Number} [tax] tax
     * @apiParam (Request body) {Number} [taxType] taxType
     * @apiParam (Request body) {Number} [others] others
     * @apiParam (Request body) {Number} [outOfStockStatus] outOfStockStatus
     * @apiParam (Request body) {Number} [requiredShipping] requiredShipping
     * @apiParam (Request body) {String} [dateAvailable] dateAvailable
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number{..9999}} [sortOrder] sortOrder
     * @apiParam (Request body) {Number} quotationAvailable quotationAvailable
     * @apiParam (Request body) {String} [height] height
     * @apiParam (Request body) {String} [weight] weight
     * @apiParam (Request body) {String} [length] length
     * @apiParam (Request body) {String} [width] width
     * @apiParam (Request body) {String} productVideo.path for embedded have to pass path only
     * @apiParam (Request body) {Number} productVideo.type 1 -> video 2 -> embedded
     * @apiParamExample {json} Input
     * {
     *      "productName" : "",
     *      "productDescription" : "",
     *      "sku" : "",
     *      "image" : "",
     *      "categoryId" : [],
     *      "upc" : "",
     *      "hsn" : "",
     *      "price" : "",
     *      "packingCost" : "",
     *      "shippingCost" : "",
     *      "tax" : "",
     *      "taxType" : "",
     *      "others" : "",
     *      "outOfStockStatus" : "",
     *      "requiredShipping" : "",
     *      "dateAvailable" : "",
     *      "status" : "",
     *      "outOfStockStatus" : "",
     *      "sortOrder" : "",
     *      "quotationAvailable" : "",
     *      "image":[
     *      {
     *      "image":""
     *      "containerName":""
     *      "defaultImage":""
     *      }
     *      ],
     *       "relatedProductId":[ "", ""],
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated product.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/update-product/:id
     * @apiErrorExample {json} updateProduct error
     * HTTP/1.1 500 Internal Server Error
     */
    updateProduct(product, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = product.categoryId;
            if (category.length === 0) {
                return response.status(400).send({
                    status: 0,
                    message: 'Category should not be empty',
                });
            }
            if ((product.tax < 0)) {
                const errorResponse = {
                    status: 0,
                    message: 'tax should not be in negative',
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
            const metaTagTitle = product.productSlug ? product.productSlug : product.productName;
            const slug = metaTagTitle.trim();
            const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            updateProduct.productSlug = yield this.validate_slug(data, product.productId);
            updateProduct.name = product.productName;
            updateProduct.description = product.productDescription ? yield this.imageService.escapeChar(product.productDescription) : '';
            updateProduct.sku = product.sku;
            updateProduct.upc = product.upc;
            updateProduct.hsn = product.hsn;
            updateProduct.quantity = product.quantity ? product.quantity : 1;
            updateProduct.quotationAvailable = product.quotationAvailable ? product.quotationAvailable : 0;
            //// special charges//////
            const serviceCharge = {};
            serviceCharge.productCost = product.price;
            serviceCharge.packingCost = product.packingCost ? product.packingCost : 0;
            serviceCharge.shippingCost = product.shippingCost ? product.shippingCost : 0;
            serviceCharge.tax = 0;
            serviceCharge.others = product.others ? product.others : 0;
            updateProduct.serviceCharges = JSON.stringify(serviceCharge);
            updateProduct.price = serviceCharge.productCost + serviceCharge.packingCost + serviceCharge.shippingCost + serviceCharge.others;
            updateProduct.taxType = product.taxType ? product.taxType : 0;
            updateProduct.taxValue = product.tax ? product.tax : 0;
            // saving sku //
            let saveSku;
            const findSku = yield this.skuService.findOne({ where: { skuName: updateProduct.sku } });
            if (findSku) {
                const finddSku = yield this.productService.findSkuName(product.productId, product.sku, 0);
                if (finddSku) {
                    const errorResponse = {
                        status: 0,
                        message: 'Duplicate sku name.',
                    };
                    return response.status(400).send(errorResponse);
                }
                else {
                    findSku.skuName = updateProduct.sku;
                    findSku.price = updateProduct.price;
                    findSku.quantity = product.quantity;
                    findSku.isActive = product.status;
                    saveSku = yield this.skuService.create(findSku);
                }
            }
            else {
                const newSku = new SkuModel_1.Sku();
                newSku.skuName = updateProduct.sku;
                newSku.price = updateProduct.price;
                newSku.quantity = product.quantity;
                newSku.isActive = product.status;
                saveSku = yield this.skuService.create(newSku);
            }
            // ending sku //
            updateProduct.skuId = saveSku.id;
            updateProduct.stockStatusId = product.outOfStockStatus ? product.outOfStockStatus : 0;
            updateProduct.shipping = product.requiredShipping;
            updateProduct.dateAvailable = moment(product.dateAvailable).toISOString();
            updateProduct.isActive = product.status;
            updateProduct.sortOrder = product.sortOrder ? product.sortOrder : 1;
            updateProduct.height = product.height;
            updateProduct.weight = product.weight;
            updateProduct.length = product.length;
            updateProduct.width = product.width;
            // adding category name and product name in keyword field for keyword search
            const rows = [];
            if (category.length !== 0) {
                for (const categoryId of category) {
                    const categoryNames = yield this.categoryService.findOne({
                        where: {
                            categoryId,
                        },
                    });
                    const name = '~' + categoryNames.name + '~';
                    rows.push(name);
                }
                rows.push('~' + product.productName + '~');
            }
            const values = rows.toString();
            updateProduct.keywords = values;
            updateProduct.modifiedBy = request.user.userId;
            const saveProduct = yield this.productService.create(updateProduct);
            // delete customerCart
            this.customerCartService.delete({ productId: product.productId });
            // delete previous category
            this.productToCategoryService.delete({ productId: saveProduct.productId });
            // save category
            if (category.length !== 0) {
                for (const categoryId of category) {
                    const newProductToCategory = new ProductToCategory_1.ProductToCategory();
                    newProductToCategory.productId = saveProduct.productId;
                    newProductToCategory.categoryId = categoryId;
                    newProductToCategory.isActive = 1;
                    this.productToCategoryService.create(newProductToCategory);
                }
            }
            // Delete previous images
            this.productImageService.delete({ productId: saveProduct.productId });
            // Save products Image
            if (product.image) {
                const productImage = product.image;
                for (const imageRow of productImage) {
                    const imageData = JSON.stringify(imageRow);
                    const imageResult = JSON.parse(imageData);
                    const newProductImage = new ProductImage_1.ProductImage();
                    newProductImage.productId = saveProduct.productId;
                    newProductImage.image = imageResult.image;
                    newProductImage.containerName = imageResult.containerName;
                    newProductImage.defaultImage = imageResult.defaultImage;
                    yield this.productImageService.create(newProductImage);
                }
            }
            yield this.productService.create(saveProduct);
            if (saveProduct) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated the Product.',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the Product.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Product Detail API
    /**
     * @api {get} /api/product/product-detail/:id Product Detail API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product/product-detail/:id
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    productDetail(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productDetail = yield this.productService.findOne({
                where: { productId: id },
            });
            const productDetails = (0, class_transformer_1.instanceToPlain)(productDetail);
            productDetails.quotationAvailable = productDetail.quotationAvailable;
            const serviceCharges = productDetails.serviceCharges;
            if (serviceCharges) {
                const specialCharge = JSON.parse(productDetails.serviceCharges);
                productDetails.productCost = specialCharge.productCost;
                productDetails.packingCost = specialCharge.packingCost;
                productDetails.shippingCost = specialCharge.shippingCost;
                productDetails.others = specialCharge.others;
            }
            if (productDetails.taxType === 2) {
                const tax = yield this.taxService.findOne({ taxId: productDetails.taxValue });
                let percentToAmount;
                if (tax) {
                    percentToAmount = productDetails.price * (tax.taxPercentage / 100);
                }
                else {
                    percentToAmount = 0;
                }
                const val = +productDetails.price + percentToAmount;
                productDetails.priceWithTax = val;
            }
            else {
                const taxValue = (productDetails.taxValue && productDetails.taxValue > 0) ? productDetails.taxValue : 0;
                const val = +productDetails.price + taxValue;
                productDetails.priceWithTax = val;
            }
            const productSku = yield this.skuService.findOne({ id: productDetails.skuId });
            productDetails.quantity = productSku ? productSku.quantity : productDetails.quantity;
            productDetails.productImage = yield this.productImageService.findAll({
                select: ['productId', 'image', 'containerName', 'defaultImage'],
                where: {
                    productId: productDetail.productId,
                },
            });
            productDetails.Category = yield this.productToCategoryService.findAll({
                select: ['categoryId', 'productId'],
                where: { productId: productDetail.productId },
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
            const successResponse = {
                status: 1,
                message: 'Successfully get productDetail',
                data: productDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Dashboard Get Total Revenue API
    /**
     * @api {get} /api/product/dashboard-total-revenue Dashboard Get Total Revenue API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} duration 1-> today 2-> this week 3-> this month 4-> this year
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get total revenue amount",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/dashboard-total-revenue
     * @apiErrorExample {json} total revenue error
     * HTTP/1.1 500 Internal Server Error
     */
    dashboardTotalRevenue(duration, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderProductsTotal = yield this.orderProductService.dashboardOrderProductsTotal(duration);
            const orderproductsTotal = orderProductsTotal.orderProductsTotal ? orderProductsTotal.orderProductsTotal : 0;
            const totalRevenue = +orderproductsTotal;
            return response.status(200).send({
                status: 0,
                message: 'Successfully got the total revenue amount',
                data: totalRevenue,
            });
        });
    }
    // Customer product view list API
    /**
     * @api {get} /api/product/customerProductView-list/:id Customer product View List
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Product view Log List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/customerProductView-list/:id
     * @apiErrorExample {json} customerProductView List error
     * HTTP/1.1 500 Internal Server Error
     */
    customerProductView(id, limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const whereConditions = [{
                    name: 'customerId',
                    value: id,
                }];
            const search = [];
            const customerProductview = yield this.productViewLogService.list(limit, offset, select, search, whereConditions, 0, count);
            if (count) {
                const successresponse = {
                    status: 1,
                    message: 'Successfully got view log count',
                    data: customerProductview,
                };
                return response.status(200).send(successresponse);
            }
            else {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got view log List',
                    data: customerProductview,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Dashboard Orders Count API
    /**
     * @api {get} /api/product/dashboard-admin/orders-count Dashboard Orders Count API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} duration 1-> today 2-> this week 3-> this month 4-> this year
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get dashboard orders and vendor count based on orders",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/dashboard-admin/orders-count
     * @apiErrorExample {json} dashboard orders count list error
     * HTTP/1.1 500 Internal Server Error
     */
    dashboardOrderCount(duration, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const countOfOrdersAndVendors = yield this.orderService.dashboardOrdersCount(duration);
            const count = {};
            count.ordersCount = countOfOrdersAndVendors.ordersCount ? countOfOrdersAndVendors.ordersCount : 0;
            count.vendorsCount = countOfOrdersAndVendors.vendorsCount ? countOfOrdersAndVendors.vendorsCount : 0;
            return response.status(200).send({
                status: 1,
                message: 'Successfully got dashboard orders and vendors count based on orders',
                data: count,
            });
        });
    }
    // Product Details Excel Document download
    /**
     * @api {get} /api/product/product-excel-list Product Excel
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productId productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Product Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/product-excel-list
     * @apiErrorExample {json} product Excel List error
     * HTTP/1.1 500 Internal Server Error
     */
    excelProductView(productId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Product Detail Sheet');
            const rows = [];
            const productid = productId.split(',');
            for (const id of productid) {
                const dataId = yield this.productService.findOne(id);
                if (dataId === undefined) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid productId',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            // Excel sheet column define
            worksheet.columns = [
                { header: 'Product Id', key: 'productId', size: 16, width: 15 },
                { header: 'Product Name', key: 'name', size: 16, width: 15 },
                { header: 'Description', key: 'description', size: 16, width: 30 },
                { header: 'Price', key: 'price', size: 16, width: 15 },
                { header: 'SKU', key: 'sku', size: 16, width: 15 },
                { header: 'UPC', key: 'upc', size: 16, width: 15 },
                { header: 'Quantity', key: 'quantity', size: 16, width: 15 },
                { header: 'Minimum Quantity', key: 'minimumQuantity', size: 16, width: 19 },
                { header: 'Subtract Stock', key: 'subtractstock', size: 16, width: 15 },
                { header: 'Manufacture Id', key: 'manufactureId', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('I1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('J1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('K1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            for (const id of productid) {
                const dataId = yield this.productService.findOne(id);
                const productDescription = dataId.description;
                const dataDescription = productDescription.replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '');
                rows.push([dataId.productId, dataId.name, dataDescription.trim(), dataId.price, dataId.sku, dataId.upc, dataId.quantity, dataId.minimumQuantity, dataId.subtractStock]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './ProductExcel_' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(fileName);
                        return response.end();
                    }
                });
            });
        });
    }
    // ExportAllProducts
    /**
     * @api {get} /api/product/allproduct-excel-list AllProduct Excel sheet
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the All Product Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/allproduct-excel-list
     * @apiErrorExample {json} Allproduct Excel List error
     * HTTP/1.1 500 Internal Server Error
     */
    ExportAllProducts(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('All Product Excel');
            const rows = [];
            const dataId = yield this.productService.findAll();
            if (dataId === undefined) {
                const errorResponse = {
                    status: 0,
                    message: 'Products are empty',
                };
                return response.status(400).send(errorResponse);
            }
            // Excel sheet column define
            worksheet.columns = [
                { header: 'Product Id', key: 'productId', size: 16, width: 15 },
                { header: 'Product Name', key: 'name', size: 16, width: 15 },
                { header: 'Description', key: 'description', size: 16, width: 30 },
                { header: 'Price', key: 'price', size: 16, width: 15 },
                { header: 'SKU', key: 'sku', size: 16, width: 15 },
                { header: 'UPC', key: 'upc', size: 16, width: 15 },
                { header: 'Quantity', key: 'quantity', size: 16, width: 15 },
                { header: 'Minimum Quantity', key: 'minimumQuantity', size: 16, width: 19 },
                { header: 'Subtract Stock', key: 'subtractstock', size: 16, width: 15 },
                { header: 'Manufacture Id', key: 'manufactureId', size: 16, width: 15 },
                { header: 'Condition', key: 'condition', size: 16, width: 15 },
                { header: 'Rating', key: 'Rating', size: 16, width: 15 },
                { header: 'Related Products', key: 'relatedProducts', size: 16, width: 15 },
                { header: 'IsActive', key: 'isActive', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('I1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('J1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('K1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('L1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('M1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('N1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('O1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            const product = yield this.productService.findAll();
            for (const products of product) {
                const productDescription = products.description;
                const dataDescription = productDescription.replace(/(&nbsp;|(<([^>]+)>))/ig, '');
                rows.push([products.productId, products.name, dataDescription.trim(), products.price, products.sku, products.upc, products.quantity, products.minimumQuantity, products.subtractStock, products.condition, products.rating, products.isActive]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const worksheet1 = workbook.addWorksheet('special price');
            worksheet1.columns = [
                { header: 'product Special Id', key: 'productSpecialId', size: 16, width: 30 },
                { header: 'product Id', key: 'productId', size: 16, width: 15 },
                { header: 'product Name', key: 'productName', size: 16, width: 15 },
                { header: 'priority', key: 'priority', size: 16, width: 15 },
                { header: 'price', key: 'price', size: 16, width: 30 },
                { header: 'start date', key: 'startDate', size: 16, width: 15 },
                { header: 'end date', key: 'endDate', size: 16, width: 15 },
            ];
            worksheet1.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet1.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet1.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet1.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet1.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet1.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet1.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            // Add all rows data in sheet
            const worksheet2 = workbook.addWorksheet('discount price');
            worksheet2.columns = [
                { header: 'product dicount Id', key: 'productDiscountId', size: 16, width: 30 },
                { header: 'product Id', key: 'productId', size: 16, width: 15 },
                { header: 'product name', key: 'productName', size: 16, width: 30 },
                { header: 'priority', key: 'priority', size: 16, width: 15 },
                { header: 'price', key: 'price', size: 16, width: 30 },
                { header: 'start date', key: 'startDate', size: 16, width: 15 },
                { header: 'end date', key: 'endDate', size: 16, width: 15 },
            ];
            worksheet2.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet2.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet2.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet2.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet2.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet2.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet2.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            const worksheet3 = workbook.addWorksheet('Images');
            worksheet3.columns = [
                { header: 'product Id', key: 'productId', size: 16, width: 15 },
                { header: 'product Name', key: 'productName', size: 16, width: 15 },
                { header: 'Image Path', key: 'imagePath', size: 16, width: 15 },
                { header: 'Image', key: 'image', size: 16, width: 30 },
                { header: 'Default Image', key: 'defaultImage', size: 16, width: 30 },
            ];
            worksheet3.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet3.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet3.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet3.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet3.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            const productimage = [];
            const images = yield this.productImageService.find();
            for (const image of images) {
                const productName = yield this.productService.findOne({ where: { productId: image.productId } });
                productimage.push([image.productId, productName.name, image.containerName, image.image, image.defaultImage]);
            }
            // Add all rows data in sheet
            worksheet3.addRows(productimage);
            const worksheet6 = workbook.addWorksheet('Related Category');
            worksheet6.columns = [
                { header: 'product Id', key: 'productId', size: 16, width: 15 },
                { header: 'Category Id', key: 'categoryId', size: 16, width: 15 },
                { header: 'Category Name', key: 'CategoryName', size: 16, width: 30 },
            ];
            worksheet6.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet6.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet6.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            const relatedCategory = [];
            const categories = yield this.productToCategoryService.find();
            for (const category of categories) {
                const categoryName = yield this.categoryService.findOne({ where: { categoryId: category.categoryId } });
                relatedCategory.push([category.productId, category.categoryId, categoryName.name]);
            }
            // Add all rows data in sheet
            worksheet6.addRows(relatedCategory);
            const fileName = './ProductExcel_' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(fileName);
                        return response.end();
                    }
                });
            });
        });
    }
    // Delete Product API
    /**
     * @api {delete} /api/product/:id Delete Single Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "id" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Product.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/product/:id
     * @apiErrorExample {json} productDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteProduct(productid, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Remove's Hook if in Memory
            hooks.removeHook('coupon-delete', 'CD1-namespace');
            // --
            // Coupon Hook
            function couponPlugin(productId, type) {
                if (pluginLoader_1.pluginModule.includes('Coupon')) {
                    hooks.addHook('coupon-delete', 'CD1-namespace', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const importPath = '../../../../add-ons/Coupon/coupon';
                        const Coupon = yield require(importPath);
                        return yield Coupon.CouponProccess(productId, type);
                    }));
                    return true;
                }
                return false;
            }
            // ---
            const product = yield this.productService.findOne(productid);
            if (product === undefined) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid product Id.',
                };
                return response.status(400).send(errorResponse);
            }
            const orderProductId = yield this.orderProductService.productPaymentProcess(productid);
            if (orderProductId) {
                const errorResponse = {
                    status: 0,
                    message: 'Product is already ordered so you cannot delete the product ',
                };
                return response.status(400).send(errorResponse);
            }
            yield this.skuService.delete({ id: product.skuId });
            const deleteProduct = yield this.productService.delete(productid);
            const pluginExist = yield couponPlugin(productid, 1);
            if (pluginExist) {
                yield hooks.runHook('coupon-delete');
            }
            if (deleteProduct) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the Product.',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the product.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Delete Multiple Product API
    /**
     * @api {post} /api/product/delete-product Delete Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} productId productId
     * @apiParamExample {json} Input
     * {
     * "productId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Product.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/product/delete-product
     * @apiErrorExample {json} productDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteMultipleProduct(productDelete, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Remove's Hook if in Memory
            hooks.removeHook('coupon-delete', 'CD1-namespace');
            // --
            // Coupon PLugin
            function couponPlugin(productId, type) {
                if (pluginLoader_1.pluginModule.includes('Coupon')) {
                    hooks.addHook('coupon-delete', 'CD1-namespace', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const importPath = '../../../../add-ons/Coupon/coupon';
                        const Coupon = yield require(importPath);
                        return yield Coupon.CouponProccess(productId, type);
                    }));
                    return true;
                }
                return false;
            }
            // ---
            const productIdNo = productDelete.productId.toString();
            const productid = productIdNo.split(',');
            for (const id of productid) {
                const dataId = yield this.productService.findOne(id);
                if (dataId === undefined) {
                    const errorResponse = {
                        status: 0,
                        message: 'Please choose a product that you want to delete.',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            for (const id of productid) {
                const orderProductId = yield this.orderProductService.productPaymentProcess(+id);
                if (orderProductId) {
                    const errorResponse = {
                        status: 0,
                        message: 'You cannot delete this product as it has been already ordered.',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            for (const id of productid) {
                const deleteProductId = parseInt(id, 10);
                const product = yield this.productService.findOne(id);
                yield this.skuService.delete({ id: product.skuId });
                const pluginExist = yield couponPlugin(deleteProductId, 1);
                if (pluginExist) {
                    yield hooks.runHook('coupon-delete');
                }
                yield this.productService.delete(deleteProductId);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully deleted the Product',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Update Product Slug API
    /**
     * @api {put} /api/product/update-product-slug Update Product Slug API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Product Slug.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/update-product-slug
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     */
    updateSlug(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const arr = [];
            const product = yield this.productService.findAll();
            for (const val of product) {
                const metaTagTitle = val.metaTagTitle;
                if (metaTagTitle) {
                    const dat = metaTagTitle.replace(/\s+/g, '-').replace(/[&\/\\#@,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                    const data = dat.replace(/--/gi, '-');
                    const getProductSlug = yield this.productService.slug(metaTagTitle);
                    if (getProductSlug.length === 0 || getProductSlug === '' || getProductSlug === undefined) {
                        val.productSlug = data;
                    }
                    else if (getProductSlug.length === 1 && (metaTagTitle !== getProductSlug[getProductSlug.length - 1].metaTagTitle)) {
                        val.productSlug = data + '-' + 1;
                    }
                    else if (getProductSlug.length > 1 && getProductSlug !== undefined && getProductSlug !== '') {
                        const slugVal = getProductSlug[getProductSlug.length - 1];
                        const value = slugVal.productSlug;
                        const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                        const slugNumber = parseInt(getSlugInt, 0);
                        val.productSlug = data + '-' + (slugNumber + 1);
                    }
                }
                else {
                    const title = val.name;
                    const dat = title.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                    const data = dat.replace(/--/gi, '-');
                    const getProductSlug = yield this.productService.slug(title);
                    if (getProductSlug === '' || getProductSlug === undefined || getProductSlug.length === 0) {
                        val.productSlug = data;
                    }
                    else if (getProductSlug.length === 1 && (title !== getProductSlug[getProductSlug.length - 1].title)) {
                        val.productSlug = data + '-' + 1;
                    }
                    else if (getProductSlug.length > 1 && getProductSlug !== undefined && getProductSlug !== '') {
                        const slugVal = getProductSlug[getProductSlug.length - 1];
                        const value = slugVal.productSlug;
                        const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                        const slugNumber = parseInt(getSlugInt, 0);
                        val.productSlug = data + '-' + (slugNumber + 1);
                    }
                }
                arr.push(val);
            }
            yield this.productService.create(arr);
            const successResponse = {
                status: 1,
                message: 'Successfully updated the product slug.',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Product Count API
    /**
     * @api {get} /api/product/product-count Product Count API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product count",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product/product-count
     * @apiErrorExample {json} productCount error
     * HTTP/1.1 500 Internal Server Error
     */
    productCount(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = {};
            const select = [];
            const search = [];
            const relation = [];
            const WhereConditions = [];
            const allProductCount = yield this.productService.list(0, 0, select, relation, WhereConditions, search, 0, 1);
            const whereConditionsActive = [
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
            ];
            const activeProductCount = yield this.productService.list(0, 0, select, relation, whereConditionsActive, search, 0, 1);
            const whereConditionsInActive = [
                {
                    name: 'isActive',
                    op: 'where',
                    value: 0,
                },
            ];
            const inActiveProductCount = yield this.productService.list(0, 0, select, relation, whereConditionsInActive, search, 0, 1);
            const allCategoryCount = yield this.categoryService.list(0, 0, select, search, WhereConditions, 0, 1);
            product.totalProduct = allProductCount;
            product.activeProduct = activeProductCount;
            product.inActiveProduct = inActiveProductCount;
            product.totalCategory = allCategoryCount;
            const successResponse = {
                status: 1,
                message: 'successfully got the product count.',
                data: product,
            };
            return response.status(200).send(successResponse);
        });
    }
    //  Update sku for product API
    /**
     * @api {post} /api/product/update-sku   update sku API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated sku.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/update-sku
     * @apiErrorExample {json} product error
     * HTTP/1.1 500 Internal Server Error
     */
    updateOrderProductShippingInformation(limit, offset, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const products = yield this.productService.find({
                take: limit,
                skip: offset,
            });
            for (const product of products) {
                const updateProduct = yield this.productService.findOne({ where: { productId: product.productId } });
                let saveSku;
                const findSku = yield this.skuService.findOne({ where: { skuName: product.sku } });
                if (findSku) {
                    const finddSku = yield this.productService.findSkuName(updateProduct.productId, updateProduct.sku, 0);
                    if (finddSku) {
                        const errorResponse = {
                            status: 0,
                            message: 'Duplicate sku name, give some other name',
                        };
                        return response.status(400).send(errorResponse);
                    }
                    else {
                        findSku.skuName = updateProduct.sku;
                        findSku.price = updateProduct.price;
                        findSku.quantity = updateProduct.quantity;
                        findSku.isActive = updateProduct.isActive;
                        saveSku = yield this.skuService.create(findSku);
                    }
                }
                else {
                    const newSku = new SkuModel_1.Sku();
                    newSku.skuName = updateProduct.sku;
                    newSku.price = updateProduct.price;
                    newSku.quantity = updateProduct.quantity;
                    newSku.isActive = updateProduct.isActive;
                    saveSku = yield this.skuService.create(newSku);
                }
                // ending sku //
                updateProduct.skuId = saveSku.id;
                updateProduct.isSimplified = 1;
                yield this.productService.create(updateProduct);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully updated Sku',
            };
            return response.status(200).send(successResponse);
        });
    }
    validate_slug($slug, $id = 0, $count = 0) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const slugCount = yield this.productService.checkSlug($slug, $id, $count);
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
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('sku')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('price')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(7, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "productList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(['admin', 'create-product']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateProductRequest_1.AddProductRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "addProduct", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/update-product/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-product']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateProductRequest_1.UpdateProductRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product-detail/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "productDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/dashboard-total-revenue'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('duration')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "dashboardTotalRevenue", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/customerProductView-list/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "customerProductView", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/dashboard-admin/orders-count'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('duration')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "dashboardOrderCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product-excel-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'export-product']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "excelProductView", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/allproduct-excel-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'export-product']),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "ExportAllProducts", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-product']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/delete-product'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DeleteProductRequest_1.DeleteProductRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "deleteMultipleProduct", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-product-slug'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "updateSlug", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product-count'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "productCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/update-sku'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "updateOrderProductShippingInformation", null);
ProductController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/product'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        ProductToCategoryService_1.ProductToCategoryService,
        ProductImageService_1.ProductImageService,
        CategoryService_1.CategoryService,
        OrderProductService_1.OrderProductService,
        ProductViewLogService_1.ProductViewLogService,
        TaxService_1.TaxService,
        CategoryPathService_1.CategoryPathService,
        SkuService_1.SkuService,
        ImageService_1.ImageService,
        CustomerCartService_1.CustomerCartService,
        OrderService_1.OrderService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map