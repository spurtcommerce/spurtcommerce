"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
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
const ProductDiscount_1 = require("../../core/models/ProductDiscount");
const VendorProducts_1 = require("../../core/models/VendorProducts");
const ProductSpecial_1 = require("../../core/models/ProductSpecial");
const class_transformer_1 = require("class-transformer");
const DeleteProductRequest_1 = require("./requests/DeleteProductRequest");
const CreateProductRequest_1 = require("./requests/CreateProductRequest");
const UpdateProductRequest_1 = require("./requests/UpdateProductRequest");
const ProductToCategory_1 = require("../../core/models/ProductToCategory");
const ProductImage_1 = require("../../core/models/ProductImage");
const CategoryService_1 = require("../../core/services/CategoryService");
const OrderProductService_1 = require("../../core/services/OrderProductService");
const OrderService_1 = require("../../core/services/OrderService");
const ProductTirePrice_1 = require("../../core/models/ProductTirePrice");
const UpdateStockRequest_1 = require("./requests/UpdateStockRequest");
const CreateTirePriceRequest_1 = require("./requests/CreateTirePriceRequest");
const ProductViewLogService_1 = require("../../core/services/ProductViewLogService");
const ProductDiscountService_1 = require("../../core/services/ProductDiscountService");
const ProductSpecialService_1 = require("../../core/services/ProductSpecialService");
const moment = require("moment");
const CustomerService_1 = require("../../core/services/CustomerService");
const fs = require("fs");
const TaxService_1 = require("../../core/services/TaxService");
const PaymentService_1 = require("../../core/services/PaymentService");
const path = tslib_1.__importStar(require("path"));
const ImageService_1 = require("../../core/services/ImageService");
const CategoryPathService_1 = require("../../core/services/CategoryPathService");
const ProductTirePriceService_1 = require("../../core/services/ProductTirePriceService");
const SkuService_1 = require("../../core/services/SkuService");
const SkuModel_1 = require("../../core/models/SkuModel");
const env_1 = require("../../../env");
const S3Service_1 = require("../../core/services/S3Service");
const VendorProductService_1 = require("../../core/services/VendorProductService");
const ProductVideoService_1 = require("../../core/services/ProductVideoService");
const ProductVideo_1 = require("../../core/models/ProductVideo");
const VendorService_1 = require("../../core/services/VendorService");
const VendorPaymentService_1 = require("../../core/services/VendorPaymentService");
const CustomerCartService_1 = require("../../core/services/CustomerCartService");
const pluginLoader_1 = require("../../../loaders/pluginLoader");
const BulkImportRequest_1 = require("./requests/BulkImportRequest");
const CategoryModel_1 = require("../../core/models/CategoryModel");
const CategoryPath_1 = require("../../core/models/CategoryPath");
const product_1 = require("@spurtcommerce/product");
const PluginService_1 = require("../../core/services/PluginService");
const ExportLog_1 = require("../../core/models/ExportLog");
const ExportLogService_1 = require("../../core/services/ExportLogService");
const uncino_1 = tslib_1.__importDefault(require("uncino"));
const typeorm_1 = require("typeorm");
const hooks = (0, uncino_1.default)();
let ProductController = class ProductController {
    constructor(productService, productToCategoryService, productImageService, categoryService, orderProductService, orderService, productViewLogService, productDiscountService, productSpecialService, customerService, taxService, paymentService, categoryPathService, productTirePriceService, skuService, s3Service, productVideoService, imageService, vendorProductService, vendorServie, vendorPaymentService, customerCartService, bulkImport, pluginService, exportLogService) {
        this.productService = productService;
        this.productToCategoryService = productToCategoryService;
        this.productImageService = productImageService;
        this.categoryService = categoryService;
        this.orderProductService = orderProductService;
        this.orderService = orderService;
        this.productViewLogService = productViewLogService;
        this.productDiscountService = productDiscountService;
        this.productSpecialService = productSpecialService;
        this.customerService = customerService;
        this.taxService = taxService;
        this.paymentService = paymentService;
        this.categoryPathService = categoryPathService;
        this.productTirePriceService = productTirePriceService;
        this.skuService = skuService;
        this.s3Service = s3Service;
        this.productVideoService = productVideoService;
        this.imageService = imageService;
        this.vendorProductService = vendorProductService;
        this.vendorServie = vendorServie;
        this.vendorPaymentService = vendorPaymentService;
        this.customerCartService = customerCartService;
        this.bulkImport = bulkImport;
        this.pluginService = pluginService;
        this.exportLogService = exportLogService;
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
    getProductList(limit, offset, keyword, sku, status, price, count, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const list = yield (0, product_1.productList)((0, typeorm_1.getConnection)(), [
                'productId',
                'sku',
                'productName',
                'quantity',
                'keywords',
                'productSlug',
                'dateAvailable',
                'width',
                'height',
                'length',
                'weight',
                'image',
                'defaultImage',
                'modifiedPrice',
                'productDiscount',
                'productSpecial',
                'isActive',
                'price',
                'containerName',
            ], limit, offset, keyword, sku, status, price, count);
            return response.status(200).send(list);
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
     * @apiParam (Request body) {Number} [hasTirePrice] hasTirePrice
     * @apiParam (Request body) {String} [productSpecial] productSpecial
     * @apiParam (Request body) {String} [productDiscount] productDiscount
     * @apiParam (Request body) {String} [tirePrices] tirePrices
     * @apiParam (Request body) {String} [height] height
     * @apiParam (Request body) {String} [weight] weight
     * @apiParam (Request body) {String} [length] length
     * @apiParam (Request body) {String} [width] width
     * @apiParam (Request body) {Object} [productVideo] video
     * @apiParam (Request body) {String} productVideo.name video name
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
     *      "hasTirePrice" : "",
     *      "image":[
     *      {
     *      "image":""
     *      "containerName":""
     *      "defaultImage":""
     *      }
     *      ]
     *      "tirePrices":[
     *      {
     *      "quantity":""
     *      "price":""
     *      }
     *      ]
     *     "relatedProductId":[ ]
     *     "productSpecial":[
     *      {
     *     "customerGroupId":""
     *     "specialPriority":""
     *     "specialPrice":""
     *     "specialDateStart":""
     *     "specialDateEnd":""
     *      }],
     *     "productDiscount":[
     *      {
     *         "discountQuantity":""
     *         "discountPriority":""
     *         "discountPrice":""
     *         "discountDateStart":""
     *         "discountDateEnd"""
     *      }],
     *      "productVideo":{
     *               "name": "",
     *               "path": "",
     *               "type": ""
     *      }
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
            const productNpm = yield (0, product_1.productCreate)(product, (0, typeorm_1.getConnection)());
            if (productNpm.status === 0) {
                return response.status(400).send({
                    status: 0,
                    message: productNpm.message,
                });
            }
            return response.status(200).send({
                status: 1,
                message: productNpm.message,
                data: productNpm.data,
            });
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
     * @apiParam (Request body) {Number} hasTirePrice
     * @apiParam (Request body) {String} [productSpecial] productSpecial
     * @apiParam (Request body) {String} [productDiscount] productDiscount
     * @apiParam (Request body) {String} [height] height
     * @apiParam (Request body) {String} [weight] weight
     * @apiParam (Request body) {String} [length] length
     * @apiParam (Request body) {String} [width] width
     * @apiParam (Request body) {String} [tirePrices] tirePrices
     * @apiParam (Request body) {Object} [productVideo] video
     * @apiParam (Request body) {String} productVideo.name video name
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
     *      "hasTirePrice" : "",
     *      "outOfStockStatus" : "",
     *      "sortOrder" : "",
     *      "quotationAvailable" : "",
     *      "tirePrices":[
     *      {
     *      "quantity":""
     *      "price":"",
     *      "skuName":""
     *      }
     *      ]
     *      "image":[
     *      {
     *      "image":""
     *      "containerName":""
     *      "defaultImage":""
     *      }
     *      ],
     *       "relatedProductId":[ "", ""],
     *      "productSpecial":[
     *      {
     *     "customerGroupId":""
     *     "specialPriority":""
     *     "skuName":""
     *     "specialPrice":""
     *     "specialDateStart":""
     *     "specialDateEnd":""
     *      }],
     *       "productDiscount":[
     *      {
     *         "discountPriority":""
     *         "discountPrice":""
     *         "skuName":""
     *         "discountDateStart":""
     *         "discountDateEnd"""
     *      }],
     *       "productVideo":{
     *               "name": "",
     *               "path": "",
     *               "type": ""
     *      }
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
            let validatedDiscount = false;
            let validatedSpecial = false;
            let validatedTier = false;
            const validateDiscountPrice = product.productDiscount;
            if (validateDiscountPrice.length > 0) {
                validatedDiscount = validateDiscountPrice.some(discData => discData.discountPrice < 0);
            }
            const validateSpecialPrice = product.productSpecial;
            if (validateSpecialPrice.length > 0) {
                validatedSpecial = validateSpecialPrice.some(specialData => specialData.specialPrice < 0);
            }
            const validateTierPrice = product.tirePrices;
            if (validateTierPrice.length > 0) {
                validatedTier = validateTierPrice.some(tireData => tireData.price < 0);
            }
            if (validatedDiscount || validatedSpecial || validatedTier || (product.price < 0)) {
                const errorResponse = {
                    status: 0,
                    message: 'Price should not be in negative',
                };
                return response.status(400).send(errorResponse);
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
            updateProduct.quantity = product.quantity;
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
            updateProduct.hasTirePrice = product.hasTirePrice;
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
            const vendorProductCheck = yield this.vendorProductService.findOne({
                where: {
                    productId: updateProduct.productId,
                },
            });
            if (vendorProductCheck) {
                const vendor = yield this.vendorServie.findOne({
                    where: {
                        vendorId: vendorProductCheck.vendorId,
                        approvalFlag: 1,
                    },
                });
                if (!vendor) {
                    return response.status(400).send({
                        status: 0,
                        message: 'You cannot update the vendor product as this vendor needs approval.',
                    });
                }
                vendorProductCheck.quotationAvailable = product.quotationAvailable ? product.quotationAvailable : 0;
                yield this.vendorProductService.create(vendorProductCheck);
            }
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
            // Product Discount
            if (product.productDiscount) {
                // Delete the product discount
                this.productDiscountService.delete({ productId: saveProduct.productId });
                const productDiscount = product.productDiscount;
                const distArr = [];
                for (const discount of productDiscount) {
                    const discountData = new ProductDiscount_1.ProductDiscount();
                    discountData.productId = saveProduct.productId;
                    discountData.quantity = 1;
                    if (saveProduct.price <= discount.discountPrice) {
                        const errorResponse = {
                            status: 0,
                            message: 'discount price should be less than original price.',
                        };
                        return response.status(400).send(errorResponse);
                    }
                    const skuValue = yield this.skuService.findOne({
                        where: {
                            skuName: discount.skuName,
                        },
                    });
                    if (skuValue) {
                        discountData.skuId = skuValue.id;
                    }
                    else {
                        const errorResponse = {
                            status: 0,
                            message: 'Sku does not exist in discount price.',
                        };
                        return response.status(400).send(errorResponse);
                    }
                    discountData.priority = discount.discountPriority;
                    discountData.price = discount.discountPrice;
                    discountData.dateStart = moment(discount.discountDateStart).toISOString();
                    discountData.dateEnd = moment(discount.discountDateEnd).toISOString();
                    distArr.push(discountData);
                }
                yield this.productDiscountService.create(distArr);
            }
            // Product Special
            if (product.productSpecial) {
                this.productSpecialService.delete({ productId: saveProduct.productId });
                const productSpecial = product.productSpecial;
                const splArr = [];
                for (const special of productSpecial) {
                    const specialPriceData = new ProductSpecial_1.ProductSpecial();
                    specialPriceData.productId = saveProduct.productId;
                    if (saveProduct.price < special.specialPrice) {
                        const errorResponse = {
                            status: 0,
                            message: 'special price should be less than original price.',
                        };
                        return response.status(400).send(errorResponse);
                    }
                    specialPriceData.customerGroupId = special.customerGroupId;
                    const specialSkuValue = yield this.skuService.findOne({
                        where: {
                            skuName: special.skuName,
                        },
                    });
                    if (specialSkuValue) {
                        specialPriceData.skuId = specialSkuValue.id;
                    }
                    else {
                        const errorResponse = {
                            status: 0,
                            message: 'Sku does not exist in special price',
                        };
                        return response.status(400).send(errorResponse);
                    }
                    specialPriceData.priority = special.specialPriority;
                    specialPriceData.price = special.specialPrice;
                    specialPriceData.dateStart = moment(special.specialDateStart).toISOString();
                    specialPriceData.dateEnd = moment(special.specialDateEnd).toISOString();
                    splArr.push(specialPriceData);
                }
                yield this.productSpecialService.create(splArr);
            }
            // Product tire price
            if (product.tirePrices) {
                yield this.productTirePriceService.delete({ productId: saveProduct.productId });
                const tirePrice = product.tirePrices;
                const tireArr = [];
                for (const tire of tirePrice) {
                    const productTirePrice = new ProductTirePrice_1.ProductTirePrice();
                    productTirePrice.productId = saveProduct.productId;
                    const tireSkuValue = yield this.skuService.findOne({
                        where: {
                            skuName: tire.skuName,
                        },
                    });
                    if (tireSkuValue) {
                        productTirePrice.skuId = tireSkuValue.id;
                    }
                    else {
                        const errorResponse = {
                            status: 0,
                            message: 'Sku does not exist tire price',
                        };
                        return response.status(400).send(errorResponse);
                    }
                    productTirePrice.quantity = tire.quantity;
                    productTirePrice.price = tire.price;
                    tireArr.push(productTirePrice);
                }
                yield this.productTirePriceService.create(tireArr);
            }
            // update product Video
            const video = product.productVideo;
            if (video) {
                yield this.productVideoService.delete({ productId: saveProduct.productId });
                const newProductVideo = new ProductVideo_1.ProductVideo();
                newProductVideo.productId = saveProduct.productId;
                newProductVideo.name = video.name;
                newProductVideo.type = video.type;
                newProductVideo.path = video.path;
                yield this.productVideoService.create(newProductVideo);
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
                    console.log(categoryLevel, 'categoryLevelcategoryLevel');
                    categoryValue.levels = categoryLevel.levels;
                    const temp = categoryValue;
                    return temp;
                }));
                const results = Promise.all(category);
                return results;
            });
            productDetails.productSpecialPrice = yield this.productSpecialService.findAll({
                select: ['productSpecialId', 'priority', 'price', 'dateStart', 'dateEnd', 'skuId'],
                where: { productId: productDetail.productId },
            }).then((val) => {
                const special = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const skuNames = yield this.skuService.findOne({ id: value.skuId });
                    const temp = value;
                    if (skuNames !== undefined) {
                        temp.skuName = skuNames.skuName;
                    }
                    else {
                        temp.skuName = '';
                    }
                    return temp;
                }));
                const results = Promise.all(special);
                return results;
            });
            productDetails.productDiscountData = yield this.productDiscountService.findAll({
                select: ['productDiscountId', 'quantity', 'priority', 'price', 'dateStart', 'dateEnd', 'skuId'],
                where: { productId: productDetail.productId },
            }).then((val) => {
                const discount = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const discountSkuNames = yield this.skuService.findOne({ id: value.skuId });
                    const temp = value;
                    if (discountSkuNames !== undefined) {
                        temp.skuName = discountSkuNames.skuName;
                    }
                    else {
                        temp.skuName = '';
                    }
                    return temp;
                }));
                const results = Promise.all(discount);
                return results;
            });
            productDetails.productTirePrices = yield this.productTirePriceService.findAll({
                select: ['id', 'quantity', 'price', 'skuId'],
                where: { productId: productDetail.productId },
            }).then((val) => {
                const tirePrice = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const tireSkuNames = yield this.skuService.findOne({ id: value.skuId });
                    const temp = value;
                    if (tireSkuNames !== undefined) {
                        temp.skuName = tireSkuNames.skuName;
                    }
                    else {
                        temp.skuName = '';
                    }
                    return temp;
                }));
                const results = Promise.all(tirePrice);
                return results;
            });
            productDetails.productVideo = yield this.productVideoService.findOne({
                select: ['id', 'name', 'path', 'type', 'productId'],
                where: { productId: productDetail.productId },
            });
            const successResponse = {
                status: 1,
                message: 'Successfully get productDetail',
                data: productDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
    //  Top Selling Product List API
    /**
     * @api {get} /api/product/top-selling-productlist  Top selling ProductList API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get top selling product..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/top-selling-productlist
     * @apiErrorExample {json} top selling product error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    topSellingProductList(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'COUNT(OrderProduct.orderId) as ordercount',
                'OrderProduct.skuName as skuName',
                'productInformationDetail.productId as productId',
                'productInformationDetail.price as price',
                'productInformationDetail.name as name',
                'productInformationDetail.description as description',
                'productInformationDetail.productSlug as productSlug',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = productInformationDetail.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = productInformationDetail.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = productInformationDetail.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
            ];
            const relations = [
                {
                    tableName: 'OrderProduct.productInformationDetail',
                    aliasName: 'productInformationDetail',
                },
                {
                    tableName: 'OrderProduct.product',
                    aliasName: 'product',
                },
            ];
            const sort = [
                {
                    name: 'ordercount',
                    order: 'DESC',
                },
            ];
            const groupBy = [
                {
                    name: 'productInformationDetail.productId',
                },
            ];
            const productTopsellingList = yield this.orderProductService.listByQueryBuilder(4, 0, select, [], [], relations, groupBy, sort, false, true);
            const successResponse = {
                status: 1,
                message: 'Successfully get Top Selling Product..!',
                data: productTopsellingList,
            };
            return response.status(200).send(successResponse);
        });
    }
    //  Top Five Repeatedly Purchased Customer List API
    /**
     * @api {get} /api/product/top-five-repeatedly-purchased-customers  Top Five Repeatedly Purchased Customer List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get top 5 repeatedly purchased customer list!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/top-five-repeatedly-purchased-customers
     * @apiErrorExample {json} top five repeatedly purchased customer list error
     * HTTP/1.1 500 Internal Server Error
     */
    topFiveRepeatedlyPurchasedCustomers(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const limit = 5;
            const select = [
                'MAX(Order.customerId) as customerId',
                'customer.firstName as firstName',
                'customer.lastName as lastName',
                'customer.avatar as avatar',
                'customer.avatarPath as avatarPath',
                '(SELECT ca.city as paymentCity FROM address ca WHERE ca.customer_id = MAX(Order.customerId) LIMIT 1) as paymentCity',
                'COUNT(Order.orderId) as orderCount',
            ];
            const relations = [{
                    tableName: 'Order.customer',
                    aliasName: 'customer',
                }];
            const whereConditions = [{
                    name: 'Order.paymentFlag',
                    op: 'and',
                    value: 1,
                },
                {
                    name: 'Order.paymentStatus',
                    op: 'and',
                    value: 1,
                },
                {
                    name: 'customer.deleteFlag',
                    op: 'and',
                    value: 0,
                }];
            const sort = [{
                    name: 'orderCount',
                    order: 'DESC',
                }];
            const groupBy = [{
                    name: 'Order.customerId',
                }];
            const topFiveRepeatedlyPurchasedCustomer = yield this.orderService.listByQueryBuilder(limit, 0, select, whereConditions, [], relations, groupBy, sort, false, true);
            if (topFiveRepeatedlyPurchasedCustomer) {
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got the top 5 repeatedly purchased customer..!',
                    data: topFiveRepeatedlyPurchasedCustomer,
                });
            }
        });
    }
    //  Top Performing Product List API
    /**
     * @api {get} /api/product/top-performing-products  Top Performing Product List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiParam (Request body) {Number} duration 1-> today 2-> this week 3-> this month 4-> this year
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get top performing product list!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/top-performing-products
     * @apiErrorExample {json} top performing product list error
     * HTTP/1.1 500 Internal Server Error
     */
    topPerformingProucts(limit, offset, count, duration, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const topPerformingProducts = yield this.orderProductService.topPerformingProducts(limit, offset, count, duration);
            if (topPerformingProducts !== '' && topPerformingProducts !== undefined) {
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got the top performing product list',
                    data: topPerformingProducts,
                });
            }
            else {
                return response.status(400).send({
                    status: 0,
                    message: 'Cannot get top performing product list',
                });
            }
        });
    }
    // Dashboard Customer Count API
    /**
     * @api {get} /api/product/dashboard/admin-customers-count Dashboard Customer Count API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} duration 1-> today 2-> this week 3-> this month 4-> this year
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get dashboard customers count",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/dashboard/admin-customers-count
     * @apiErrorExample {json} dashboard customers count list error
     * HTTP/1.1 500 Internal Server Error
     */
    dashboardCustomerCount(duration, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customerCount = yield this.customerService.dashboardCustomerCount(duration);
            if (customerCount !== '' && customerCount !== undefined) {
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got dashboard customers count',
                    data: customerCount,
                });
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
    // Dashboard Average Order Value API
    /**
     * @api {get} /api/product/dashboard-average-order-value Dashboard Average Order Value API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} duration 1-> today 2-> this week 3-> this month 4-> this year
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get average order value",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/dashboard-average-order-value
     * @apiErrorExample {json} average order value error
     * HTTP/1.1 500 Internal Server Error
     */
    averageOrderValue(duration, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderproductstotal = yield this.orderProductService.dashboardOrderProductsTotal(duration);
            const vendorcommission = yield this.vendorPaymentService.dashboardVendorCommissionTotal(duration);
            const orderProductsTotal = orderproductstotal.orderProductsTotal ? orderproductstotal.orderProductsTotal : 0;
            const vendorCommission = vendorcommission.vendorCommission ? vendorcommission.vendorCommission : 0;
            const totalCount = +orderproductstotal.ordersCount + +vendorcommission.vendorCommissionCount;
            const averageOrderValue = totalCount !== 0 ? (+orderProductsTotal + +vendorCommission) / +totalCount : 0;
            return response.status(200).send({
                status: 0,
                message: 'Successfully got the average order value',
                data: averageOrderValue.toFixed(2),
            });
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
            const totalvendorCommission = yield this.vendorPaymentService.dashboardVendorCommissionTotal(duration);
            const orderproductsTotal = orderProductsTotal.orderProductsTotal ? orderProductsTotal.orderProductsTotal : 0;
            const vendorCommission = totalvendorCommission.vendorCommission ? totalvendorCommission.vendorCommission : 0;
            const totalRevenue = +orderproductsTotal + +vendorCommission;
            return response.status(200).send({
                status: 0,
                message: 'Successfully got the total revenue amount',
                data: totalRevenue,
            });
        });
    }
    // Dashboard Average Conversion Ratio API
    /**
     * @api {get} /api/product/dashboard-average-conversion-ratio Dashboard Average Conversion Ratio API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} duration 1-> today 2-> this week 3-> this month 4-> this year
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get average conversion ratio",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/dashboard-average-conversion-ratio
     * @apiErrorExample {json} average conversion ratio error
     * HTTP/1.1 500 Internal Server Error
     */
    averageConversionRatio(duration, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderscount = yield this.orderService.ordersCount(duration);
            const customerscount = yield this.customerService.dashboardCustomerCount(duration);
            const averageConversionRatio = +customerscount !== 0 ? (+orderscount / +customerscount * 100) : 0;
            return response.status(200).send({
                status: 1,
                message: 'Successfully got average conversion ratio',
                data: averageConversionRatio.toFixed(2),
            });
        });
    }
    // Dashboard Graph Weekly Sales List API
    /**
     * @api {get} /api/product/dashboard/graph-weekly-saleslist Dashboard Graph Weekly Sales List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get top ten weekly sales list",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/dashboard/graph-weekly-saleslist
     * @apiErrorExample {json} dashboard graph weekly sales list error
     * HTTP/1.1 500 Internal Server Error
     */
    topTenWeeklySales(productId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productids = productId.split(',');
            if (!(productids.length <= 3)) {
                return response.status(400).send({
                    status: 0,
                    message: 'length of productId should be less than or equal to three',
                });
            }
            const orderProductData = yield this.productService.findProducts(productids);
            const list = orderProductData.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const data = yield this.orderProductService.topTenWeeklySalesList(result.productId);
                const temp = result;
                const weekOfdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const finaldata = [];
                for (const day of weekOfdays) {
                    const salesFilter = data.filter((val) => {
                        return val.days === day;
                    });
                    if (salesFilter.length === 0) {
                        finaldata.push({ value: 0, days: day });
                    }
                    else {
                        finaldata.push(salesFilter[0]);
                    }
                }
                temp.value = finaldata;
                return temp;
            }));
            const weeklysaleslist = yield Promise.all(list);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the top ten weekly sales list',
                data: weeklysaleslist,
            });
        });
    }
    // Recent Selling Product List
    /**
     * @api {get} /api/product/recent-selling-product  Recent Selling Product List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully listed recent product selling!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/recent-selling-product
     * @apiErrorExample {json} Selling Product List error
     * HTTP/1.1 500 Internal Server Errorproduct
     */
    // Recent selling product function
    sellingProduct(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const limit = 3;
            const select = [
                'DISTINCT(OrderProduct.productId) as productId',
                'OrderProduct.orderId as orderId',
                'OrderProduct.name as ProductName',
                'OrderProduct.quantity as Quantity',
                'OrderProduct.total as Total',
                'OrderProduct.createdDate as CreatedDate',
                'OrderProduct.skuName as skuName',
                'product.invoiceNo as invoiceNo',
                'product.invoicePrefix as invoicePrefix',
                'product.orderStatusId as orderStatusId',
                'product.orderPrefixId as orderPrefixId',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = OrderProduct.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = OrderProduct.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = OrderProduct.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
            ];
            const relations = [
                {
                    tableName: 'OrderProduct.productInformationDetail',
                    aliasName: 'productInformationDetail',
                },
                {
                    tableName: 'OrderProduct.product',
                    aliasName: 'product',
                },
            ];
            const whereConditions = [];
            const sort = [
                {
                    name: 'OrderProduct.createdDate',
                    order: 'DESC',
                },
            ];
            const recentSellingProductList = yield this.orderProductService.listByQueryBuilder(limit, 0, select, whereConditions, [], relations, [], sort, false, true);
            const successResponse = {
                status: 1,
                message: 'successfully listed recently selling products..!',
                data: recentSellingProductList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Recent viewLog list API
    /**
     * @api {get} /api/product/viewLog-list Product View Log List
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
     * @apiSampleRequest /api/product/viewLog-list
     * @apiErrorExample {json} ViewLog List error
     * HTTP/1.1 500 Internal Server Error
     */
    productViewLogList(limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const whereConditions = [];
            const search = [];
            const viewLogs = yield this.productViewLogService.list(limit, offset, select, search, whereConditions, 0, count);
            if (count) {
                const successresponse = {
                    status: 1,
                    message: 'Successfully got view log count',
                    data: viewLogs,
                };
                return response.status(200).send(successresponse);
            }
            else {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got view log List',
                    data: viewLogs,
                };
                return response.status(200).send(successResponse);
            }
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
    excelProductView(productId, keyword, sku, status, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let list;
            if (!productId || productId === '') {
                list = yield (0, product_1.productList)((0, typeorm_1.getConnection)(), [
                    'productId',
                    'sku',
                    'productName',
                    'quantity',
                    'keywords',
                    'productSlug',
                    'dateAvailable',
                    'width',
                    'height',
                    'length',
                    'weight',
                    'image',
                    'defaultImage',
                    'modifiedPrice',
                    'productDiscount',
                    'productSpecial',
                    'isActive',
                    'price',
                    'containerName',
                ], 0, 0, '', sku, status, 0, false).then((value) => {
                    console.log(value.data.map((data) => +data.productId));
                    const productListIds = value.data.map((data) => +data.productId);
                    return productListIds;
                });
            }
            // let productListIds = list.map()
            // if ()
            const productIds = productId ? productId.split(',').map((id) => +id) : list.length > 0 ? list : [];
            const excelFile = yield (0, product_1.excelExportProduct)((0, typeorm_1.getConnection)(), productIds);
            // Add export log
            const newExportLog = new ExportLog_1.ExportLog();
            newExportLog.module = 'Manage Products';
            newExportLog.recordAvailable = productIds.length;
            newExportLog.createdBy = request.user.userId;
            yield this.exportLogService.create(newExportLog);
            return new Promise((resolve, reject) => {
                response.download(excelFile, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(excelFile);
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
            const special = [];
            const specialPrices = yield this.productSpecialService.find();
            for (const specialPrice of specialPrices) {
                const productName = yield this.productService.findOne({ where: { productId: specialPrice.productId } });
                special.push([specialPrice.productSpecialId, specialPrice.productId, productName.name, specialPrice.priority, specialPrice.price, specialPrice.dateStart, specialPrice.dateEnd]);
            }
            // Add all rows data in sheet
            worksheet1.addRows(special);
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
            const discount = [];
            const discountPrices = yield this.productDiscountService.find();
            for (const discountPrice of discountPrices) {
                const productName = yield this.productService.findOne({ where: { productId: discountPrice.productId } });
                discount.push([discountPrice.productDiscountId, discountPrice.productId, productName.name, discountPrice.priority, discountPrice.price, discountPrice.dateStart, discountPrice.dateEnd]);
            }
            // Add all rows data in sheet
            worksheet2.addRows(discount);
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
    // Dashboard Count API
    /**
     * @api {get} /api/product/dashboard-count Dashboard Count API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get dashboard count",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product/dashboard-count
     * @apiErrorExample {json} product error
     * HTTP/1.1 500 Internal Server Error
     */
    dashboardCount(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const dashboard = {};
            const select = [];
            const searchOrder = [{
                    name: 'paymentProcess',
                    op: 'where',
                    value: 1,
                }];
            const relation = [];
            const WhereConditions = [];
            const search = [];
            const ordersCount = yield this.orderService.list(0, 0, select, searchOrder, WhereConditions, relation, 1);
            const paymentsCount = yield this.paymentService.list(0, 0, select, search, WhereConditions, 1);
            const productsCount = yield this.productService.list(0, 0, select, relation, WhereConditions, search, 0, 1);
            const customerWhereConditions = [{
                    name: 'deleteFlag',
                    op: 'where',
                    value: 0,
                }];
            const customersCount = yield this.customerService.list(0, 0, search, customerWhereConditions, 0, 1);
            dashboard.orders = ordersCount;
            dashboard.payments = paymentsCount;
            dashboard.products = productsCount;
            dashboard.customers = customersCount;
            const successResponse = {
                status: 1,
                message: 'successfully got the dashboard count.',
                data: dashboard,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Dashboard Admin Total Vendor and Total Product Count API
    /**
     * @api {get} /api/product/dashboard-admin-totalvendor-totalproduct-count Dashboard Admin Total Vendor and Total Product Count API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get total vendor and total product count",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product/dashboard-admin-totalvendor-totalproduct-count
     * @apiErrorExample {json} dashboard admin total vendor and total product count error
     * HTTP/1.1 500 Internal Server Error
     */
    dashboardAdminCount(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const dashboardAdmin = {};
            const select = [];
            const whereConditions = [{
                    name: 'vendor.customerId',
                    op: 'where',
                    value: 0,
                }];
            const whereConditionsForCustomers = [{
                    name: 'deleteFlag',
                    value: 0,
                }];
            const search = [];
            const totalCustomerCount = yield this.customerService.list(0, 0, search, whereConditionsForCustomers, 0, true);
            const totalVendorCount = yield this.vendorServie.vendorList(0, 0, select, [], search, whereConditions, true);
            const totalProductCount = yield this.productService.list(0, 0, select, [], [], search, 0, true);
            dashboardAdmin.customers = totalCustomerCount;
            dashboardAdmin.vendors = totalVendorCount;
            dashboardAdmin.products = totalProductCount;
            const successResponse = {
                status: 1,
                message: 'successfully got the dashboard total vendor and total product count.',
                data: dashboardAdmin,
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
    // Import Product data
    /**
     * @api {post} /api/product/import-product-data Import product Data
     * @apiGroup Product
     * @apiParam (Request body) {String} file File
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully saved imported data..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/import-product-data
     * @apiErrorExample {json} Import product Data
     * HTTP/1.1 500 Internal Server Error
     */
    ImportProductPrice(files, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
            const StreamZip = require('node-stream-zip');
            const random = Math.floor((Math.random() * 100) + 1);
            const name = files.originalname;
            const type = name.split('.')[1];
            const mainFileName = './product_' + random + '.' + type;
            yield this.imageService.writeFile(mainFileName, files.buffer);
            const rimraf = require('rimraf');
            // check zip contains invalid file
            const zip = new StreamZip({ file: path.join(process.cwd(), mainFileName) });
            const AcceptedFiles = ['xlsx', 'zip'];
            const zipRead = yield new Promise((resolved, reject) => {
                zip.on('ready', () => {
                    const errExtension = [];
                    for (const entry of Object.values(zip.entries())) {
                        const fileNameEntries = (Object.values(entry)[16]).split('.')[1];
                        if (AcceptedFiles.includes(fileNameEntries) === false) {
                            errExtension.push(fileNameEntries);
                        }
                    }
                    resolved(errExtension);
                    // Do not forget to close the file once you're done
                    zip.close();
                });
            });
            if (zipRead.length > 0) {
                rimraf(path.join(process.cwd(), 'product_' + random), ((err) => {
                    if (err) {
                        throw err;
                    }
                }));
                fs.unlinkSync(path.join(process.cwd(), mainFileName));
                return response.status(400).send({
                    status: 0,
                    message: 'The file you uploaded contains some invalid extensions',
                });
            }
            const resolve = require('path').resolve;
            const distPath = resolve('product_' + random);
            yield this.imageService.extractZip(mainFileName, distPath);
            const directoryPath = path.join(process.cwd(), 'product_' + random);
            const mainFiles = yield this.readDir(directoryPath);
            // check the image zip contains invalid data
            for (const fileExtNames of mainFiles) {
                const fileType = fileExtNames.split('.')[1];
                if (fileType === 'zip') {
                    const czip = new StreamZip({ file: path.join(process.cwd(), 'product_' + random + '/' + fileExtNames) });
                    const cAcceptedFiles = ['png', 'jpg', 'jpeg'];
                    const czipRead = yield new Promise((resolved, reject) => {
                        czip.on('ready', () => {
                            const cerrExtension = [];
                            for (const entry of Object.values(czip.entries())) {
                                const cfileNameEntries = (Object.values(entry)[16]).split('.')[1];
                                if (cfileNameEntries) {
                                    if (cAcceptedFiles.includes(cfileNameEntries) === false) {
                                        cerrExtension.push(cfileNameEntries);
                                    }
                                }
                            }
                            resolved(cerrExtension);
                            czip.close();
                        });
                    });
                    if (czipRead.length > 0) {
                        fs.unlinkSync(path.join(process.cwd(), mainFileName));
                        return response.status(400).send({
                            status: 0,
                            message: 'The file you uploaded contains some invalid extensions',
                        });
                    }
                }
            }
            try {
                for (const fileNames of mainFiles) {
                    const fileType = fileNames.split('.')[1];
                    if (fileType === 'xlsx') {
                        if (fileNames === 'productData.xlsx') {
                            const directoryPathh = path.join(process.cwd(), 'product_' + random + '/' + fileNames);
                            const result = yield this.imageService.xlsxToJson(directoryPathh);
                            const forExport = yield this.bulkImport.validateAndFormatData(result);
                            if (forExport.errorStatus) {
                                const findDuplicateSku = forExport.data.find((obj) => obj.Error.includes('give some other name'));
                                fs.unlinkSync(mainFileName);
                                if (findDuplicateSku) {
                                    throw new Error('Duplicate sku name, give some other name');
                                }
                                throw new Error('Oops! Data format mismatch detected');
                            }
                            const authorization = request.headers.authorization;
                            const createProduct = yield this.bulkProductImport(result, authorization);
                            return response.status(200).send({ status: 1, message: createProduct });
                        }
                    }
                    else if (fileNames === 'image.zip') {
                        const directPath = path.join(process.cwd(), 'product_' + random + '/' + fileNames);
                        yield this.imageService.extractZip(directPath, distPath);
                        const directoryPat = path.join(process.cwd(), 'product_' + random + '/' + 'image');
                        const filesss = yield this.readDir(directoryPat);
                        for (const fileNme of filesss) {
                            const image2base64 = require('image-to-base64');
                            const imagePath = directoryPat + '/' + fileNme;
                            const imageType = fileNme.split('.')[1];
                            image2base64(imagePath)
                                .then((responsee) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                                const base64Data = Buffer.from(responsee, 'base64');
                                if (env_1.env.imageserver === 's3') {
                                    yield this.s3Service.imageUpload((fileNme), base64Data, imageType);
                                }
                                else {
                                    yield this.imageService.imageUpload((fileNme), base64Data);
                                }
                            }))
                                .catch((error) => {
                                throw error;
                            });
                        }
                    }
                    else {
                        rimraf(path.join(process.cwd(), 'product_' + random), ((err) => {
                            if (err) {
                                throw err;
                            }
                        }));
                        fs.unlinkSync(mainFileName);
                        throw new Error('Only xlsx and zip file are accepted');
                    }
                }
                rimraf(path.join(process.cwd(), 'product_' + random), ((err) => {
                    if (err) {
                        throw err;
                    }
                }));
                fs.unlinkSync(mainFileName);
                const successResponse = {
                    status: 1,
                    message: 'Product Imported Successfully',
                };
                return response.status(200).send(successResponse);
            }
            catch (error) {
                return response.status(400).send({
                    status: 0,
                    message: error.message,
                });
            }
        });
    }
    bulkProductImport(jsonData, authorization) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productNames = jsonData.map(value => value.Name);
            const filterName = productNames.filter((item, index) => productNames.indexOf(item) === index);
            const productRequest = yield this.bulkImport.bulkImportRequest(filterName, jsonData);
            // Create category data
            const categoryProduct = [];
            for (const categorydata of productRequest) {
                const categoryIds = [];
                for (const data of categorydata.category) {
                    const categoryArr = (_a = data.category) === null || _a === void 0 ? void 0 : _a.split('>');
                    console.log(categoryArr, 'categoryArrcategoryArr', categorydata.category);
                    const length = categoryArr.length;
                    if (length === 1) {
                        const ifCategory = yield this.categoryService.findCategory(categoryArr[0], 0);
                        if (!ifCategory) {
                            const newCategory = new CategoryModel_1.Category();
                            const randomNumber = Math.floor(Math.random() * 90) + 10;
                            newCategory.name = categoryArr[0];
                            newCategory.sortOrder = 1;
                            newCategory.parentInt = 0;
                            newCategory.categorySlug = categoryArr[0] + randomNumber;
                            newCategory.isActive = 1;
                            const createCategoryData = yield this.categoryService.create(newCategory);
                            const newCategoryPath = new CategoryPath_1.CategoryPath();
                            newCategoryPath.categoryId = createCategoryData.categoryId;
                            newCategoryPath.pathId = createCategoryData.categoryId;
                            newCategoryPath.level = 0;
                            yield this.categoryPathService.create(newCategoryPath);
                            data.categoryId = createCategoryData.categoryId;
                            categoryIds.push(data);
                            console.log(categoryIds, 'categoryIdscategoryIdscategoryIds');
                        }
                        else {
                            data.categoryId = ifCategory.categoryId;
                            categoryIds.push(data);
                        }
                    }
                    else {
                        let index = 0;
                        let categoryIdss = 0;
                        let sortOrder = 1;
                        for (const value of categoryArr) {
                            if (index === 0) {
                                const ifCategory = yield this.categoryService.findCategory(categoryArr[index], 0);
                                if (!ifCategory) {
                                    const newCategory = new CategoryModel_1.Category();
                                    const randomNumber = Math.floor(Math.random() * 90) + 10;
                                    newCategory.name = value;
                                    newCategory.sortOrder = sortOrder;
                                    newCategory.parentInt = 0;
                                    newCategory.categorySlug = categoryArr[0] + randomNumber;
                                    newCategory.isActive = 1;
                                    const createCategory = yield this.categoryService.create(newCategory);
                                    categoryIdss = createCategory.categoryId;
                                    const newCategoryPath = new CategoryPath_1.CategoryPath();
                                    newCategoryPath.categoryId = createCategory.categoryId;
                                    newCategoryPath.pathId = createCategory.categoryId;
                                    newCategoryPath.level = 0;
                                    yield this.categoryPathService.create(newCategoryPath);
                                    sortOrder++;
                                }
                                else {
                                    categoryIdss = ifCategory.categoryId;
                                }
                            }
                            else {
                                const parentCategoryName = categoryArr[index - 1];
                                const ifCategory = yield this.categoryService.findCategory(parentCategoryName.toLowerCase(), 0);
                                const paentInt = ifCategory.categoryId ? ifCategory.categoryId : 0;
                                const checkCategory = yield this.categoryService.findCategory(value.toLowerCase(), paentInt);
                                if (!checkCategory && ifCategory) {
                                    const newCategory = new CategoryModel_1.Category();
                                    const randomNumber = Math.floor(Math.random() * 90) + 10;
                                    newCategory.categorySlug = categoryArr[0] + randomNumber;
                                    newCategory.name = value;
                                    newCategory.sortOrder = sortOrder;
                                    newCategory.parentInt = ifCategory.categoryId;
                                    newCategory.isActive = 1;
                                    const createCategory = yield this.categoryService.create(newCategory);
                                    categoryIdss = createCategory.categoryId;
                                    // create category path
                                    const getAllPath = yield this.categoryPathService.find({
                                        where: { categoryId: createCategory.parentInt },
                                        order: { level: 'ASC' },
                                    });
                                    let level = 0;
                                    for (const paths of getAllPath) {
                                        const CategoryPathLoop = new CategoryPath_1.CategoryPath();
                                        CategoryPathLoop.categoryId = createCategory.categoryId;
                                        CategoryPathLoop.pathId = paths.pathId;
                                        CategoryPathLoop.level = level;
                                        yield this.categoryPathService.create(CategoryPathLoop);
                                        level++;
                                        sortOrder++;
                                    }
                                    const newCategoryPath = new CategoryPath_1.CategoryPath();
                                    newCategoryPath.categoryId = createCategory.categoryId;
                                    newCategoryPath.pathId = createCategory.categoryId;
                                    newCategoryPath.level = level;
                                    yield this.categoryPathService.create(newCategoryPath);
                                }
                                else {
                                    categoryIdss = checkCategory.categoryId;
                                }
                            }
                            index++;
                        }
                        data.categoryId = categoryIdss;
                        categoryIds.push(data);
                    }
                }
                categorydata.category = categoryIds;
                categoryProduct.push(categorydata);
            }
            // create product datas...
            for (const data of categoryProduct) {
                if (data.Price === '' || data.Name === '') {
                    throw new Error('Product Price or Product Name should not empty');
                }
                const product = new ProductModel_1.Product();
                product.sku = data.SKU;
                product.upc = data.UPC;
                product.hsn = data.HSN;
                product.quantity = data.Quantity;
                // const taxType = data.TaxType?.toLowerCase() === 'percentage' ? 2 : 1;
                product.taxType = 1;
                product.taxValue = (_b = data.Tax) !== null && _b !== void 0 ? _b : 0;
                product.stockStatusId = data.StockStatusId;
                product.shipping = data.Required_Shipping;
                const serviceCharge = {};
                serviceCharge.productCost = data.Price;
                serviceCharge.packingCost = data.PackageCost ? data.PackageCost : 0;
                serviceCharge.shippingCost = data.ShippingCost ? data.ShippingCost : 0;
                serviceCharge.others = product.others ? product.others : 0;
                product.serviceCharges = JSON.stringify(serviceCharge);
                product.price = +serviceCharge.productCost + +serviceCharge.packingCost + +serviceCharge.shippingCost + +serviceCharge.others;
                product.price = data.Price;
                product.dateAvailable = data.DateAvailable;
                // saving sku //
                // const findSku = await this.skuService.findOne({ where: { skuName: product.sku } });
                // if (findSku) {
                //     throw new Error('duplicate sku name, give some other name');
                // }
                const newSku = new SkuModel_1.Sku();
                newSku.skuName = data.SKU;
                newSku.price = data.Price;
                newSku.quantity = data.Quantity ? Math.round(data.Quantity) : 1;
                newSku.isActive = 1;
                const saveSku = yield this.skuService.create(newSku);
                // ending sku //
                product.skuId = saveSku.id;
                product.name = data.Name;
                product.description = data.Description;
                product.shipping = 1;
                product.stockStatusId = 1;
                product.isFeatured = 0;
                product.todayDeals = 0;
                product.isActive = 0;
                product.sortOrder = 1;
                product.isSimplified = 1;
                // adding category name and product name in keyword field for keyword search
                const rowsArr = [];
                if (data.category.length > 0) {
                    const categories = data.category;
                    for (const categorys of categories) {
                        const categoryNames = yield this.categoryService.findOne({
                            where: {
                                categoryId: categorys.categoryId,
                            },
                        });
                        const categoryName = '~' + categoryNames.name + '~';
                        rowsArr.push(categoryName);
                    }
                }
                rowsArr.push('~' + data.Name + '~');
                const values = rowsArr.toString();
                product.keywords = values;
                const metaTagTitle = data.ProductSlug ? data.ProductSlug : data.Name;
                const slug = metaTagTitle.trim();
                const dataValue = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                product.productSlug = yield this.validate_slug(dataValue);
                product.height = (_c = data.Height !== '') !== null && _c !== void 0 ? _c : data.Height;
                product.weight = (_d = data.Weight !== '') !== null && _d !== void 0 ? _d : data.Height;
                product.width = (_e = data.Width !== '') !== null && _e !== void 0 ? _e : data.Width;
                product.length = (_f = data.Length !== '') !== null && _f !== void 0 ? _f : data.Length;
                const savedProduct = yield this.productService.create(product);
                if (data.VendorId) {
                    const vendor = yield this.vendorServie.findOne({
                        where: {
                            vendorId: data.VendorId,
                        },
                    });
                    if (vendor) {
                        const vendorProduct = new VendorProducts_1.VendorProducts();
                        vendorProduct.vendorId = data.VendorId;
                        vendorProduct.productId = savedProduct.productId;
                        vendorProduct.approvalFlag = 0;
                        yield this.vendorProductService.create(vendorProduct);
                    }
                }
                if (data.Images) {
                    const images = data.Images;
                    const findI = images.toString().includes(',');
                    if (findI === true) {
                        const image = data.Images.split(',');
                        for (const img of image) {
                            const productImage = new ProductImage_1.ProductImage();
                            productImage.image = img;
                            productImage.containerName = '';
                            productImage.productId = savedProduct.productId;
                            yield this.productImageService.create(productImage);
                        }
                    }
                    else {
                        const productImage = new ProductImage_1.ProductImage();
                        productImage.image = images;
                        productImage.containerName = '';
                        productImage.productId = savedProduct.productId;
                        yield this.productImageService.create(productImage);
                    }
                    const findImage = yield this.productImageService.findOne({ productId: savedProduct.productId });
                    findImage.defaultImage = 1;
                    yield this.productImageService.create(findImage);
                }
                if (data.category.length >= 1) {
                    for (const category of data.category) {
                        const newProductToCategory = new ProductToCategory_1.ProductToCategory();
                        newProductToCategory.productId = savedProduct.productId;
                        newProductToCategory.categoryId = category.categoryId;
                        newProductToCategory.isActive = 1;
                        this.productToCategoryService.create(newProductToCategory);
                    }
                }
                // Create Variant
                const findProductVariantbuteStatus = yield this.pluginService.findOne({ where: { pluginName: 'ProductVariants', pluginStatus: 1 } });
                if (data.variant.length > 0 && data.variant[0].variantSku !== '' && data.variant[0].variantSku && findProductVariantbuteStatus) {
                    const variantData = data.variant;
                    for (const datas of variantData) {
                        yield hooks.removeHook('product-variant', 'MPV-namespace');
                        if (pluginLoader_1.pluginModule.includes('ProductVariants')) {
                            // Add variant hook
                            hooks.addHook('product-variant', 'MPV-namespace', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                                const importPath = '../../../../add-ons/ProductVariants/BulkProductVariant';
                                const variant = yield require(importPath);
                                return yield variant.variantProcess(datas, savedProduct.productId);
                            }));
                            // Run variant hook
                            // const results =
                            yield hooks.runHook('product-variant');
                            // if (jsonData && results.status === 0) {
                            //     return ({ status: 0, message: 'Invalid varient Sku !!' });
                            // }
                        }
                    }
                    // update sku quantity
                    let quantity = 0;
                    console.log(variantData);
                    for (const quadata of variantData) {
                        quantity = quantity + ((_g = quadata.variantQuantity) !== null && _g !== void 0 ? _g : 0);
                        console.log(quantity);
                    }
                    if (data.variant.length > 0 && pluginLoader_1.pluginModule.includes('ProductVariants')) {
                        const findSkuValue = yield this.skuService.findOne({ where: { id: savedProduct.skuId } });
                        findSkuValue.quantity = quantity;
                        yield this.skuService.create(findSkuValue);
                        savedProduct.isSimplified = 0;
                        yield this.productService.create(savedProduct);
                    }
                }
                // Create Attribute
                // const findProductAttributeStatus = await this.pluginService.findOne({ where: { pluginName: 'ProductAttribute', pluginStatus: 1 } });
                // if (data.attribute.length > 0) {
                //     await hooks.removeHook('product-attribute', 'MPA-namespace');
                //     if (pluginModule.includes('VendorProductAttribute') && findProductAttributeStatus) {
                //         hooks.addHook('product-attribute', 'MPA-namespace', async () => {
                //             const importPath = '../../../../add-ons/ProductAttribute/BulkProductAttribute';
                //             const variant = await require(importPath);
                //             return await variant.attributeProcess(data.attribute, savedProduct.productId);
                //         });
                //         await hooks.runHook('product-attribute');
                //     }
                // }
                const discountData = data.productDiscount;
                // Product Discount
                if (discountData.length > 0) {
                    for (const discount of discountData) {
                        const newdiscountData = new ProductDiscount_1.ProductDiscount();
                        const skuData = yield this.skuService.findOne({ where: { skuName: discount.sku } });
                        newdiscountData.skuId = skuData.id;
                        newdiscountData.productId = savedProduct.productId;
                        newdiscountData.quantity = 1;
                        newdiscountData.priority = discount.discountPriority;
                        newdiscountData.price = discount.discountPrice;
                        newdiscountData.dateStart = moment(discount.discountStartDate).toISOString();
                        newdiscountData.dateEnd = moment(discount.discountEndDate).toISOString();
                        if (discount.discountPriority !== undefined && discount.discountStartDate !== undefined && discount.discountEndDate !== undefined) {
                            yield this.productDiscountService.create(newdiscountData);
                        }
                    }
                }
                // Product Special
                if (data.productSpecialPrice.length > 0) {
                    const productSpecials = data.productSpecialPrice;
                    for (const special of productSpecials) {
                        const specialPriceData = new ProductSpecial_1.ProductSpecial();
                        const skuData = yield this.skuService.findOne({ where: { skuName: special.sku } });
                        specialPriceData.skuId = skuData.id;
                        specialPriceData.productId = savedProduct.productId;
                        specialPriceData.priority = special.priority;
                        specialPriceData.price = special.price;
                        specialPriceData.dateStart = moment(special.startDate).toISOString();
                        specialPriceData.dateEnd = moment(special.endDate).toISOString();
                        if (special.priority !== undefined && special.price !== undefined && special.startDate !== undefined && special.startDate !== undefined && special.endDate !== undefined) {
                            yield this.productSpecialService.create(specialPriceData);
                        }
                    }
                }
                // Product tire price
                if (data.productTirePrice.length > 0) {
                    const tirePrice = data.productTirePrice;
                    for (const tire of tirePrice) {
                        const productTirePrice = new ProductTirePrice_1.ProductTirePrice();
                        const skuData = yield this.skuService.findOne({ where: { skuName: tire.sku } });
                        productTirePrice.skuId = skuData.id;
                        productTirePrice.productId = savedProduct.productId;
                        productTirePrice.quantity = tire.quantity;
                        productTirePrice.price = tire.price;
                        if (tire.quantity !== undefined && tire.price !== undefined) {
                            yield this.productTirePriceService.create(productTirePrice);
                        }
                    }
                }
                // product video
                if (data.video.length > 0) {
                    for (const videoData of data.video) {
                        const productVideo = new ProductVideo_1.ProductVideo();
                        productVideo.productId = savedProduct.productId;
                        productVideo.path = videoData;
                        productVideo.type = 2;
                        yield this.productVideoService.create(productVideo);
                    }
                }
                const axios = require('axios');
                const headers = {
                    'Authorization': authorization,
                    'Content-Type': 'application/json',
                };
                // Create Related Product
                const relatedProductsId = (_h = data === null || data === void 0 ? void 0 : data.RelatedProductId) === null || _h === void 0 ? void 0 : _h.split(',');
                const findProductRelated = yield this.pluginService.findOne({ where: { pluginName: 'ProductRelated', pluginStatus: 1 } });
                if ((relatedProductsId === null || relatedProductsId === void 0 ? void 0 : relatedProductsId.length) > 0 && pluginLoader_1.pluginModule.includes('ProductRelated') && findProductRelated && relatedProductsId[0] !== '') {
                    const relatedProductObject = {
                        productId: savedProduct.productId,
                        relatedProductId: relatedProductsId,
                    };
                    yield axios.post(env_1.env.baseUrl + '/product-related/update-product-related', relatedProductObject, { headers });
                }
                // Create product Seo
                const findSeo = yield this.pluginService.findOne({ where: { pluginName: 'Seo', pluginStatus: 1 } });
                if ((data === null || data === void 0 ? void 0 : data.MetaTagTitle) && (data === null || data === void 0 ? void 0 : data.MetaTagDescription) && (data === null || data === void 0 ? void 0 : data.MetaTagKeyword) && (data === null || data === void 0 ? void 0 : data.MetaTagTitle) !== '' && (data === null || data === void 0 ? void 0 : data.MetaTagDescription) !== '' && (data === null || data === void 0 ? void 0 : data.MetaTagKeyword) !== '') {
                    if (pluginLoader_1.pluginModule.includes('Seo') && findSeo) {
                        const seoObject = {
                            metaTagTitle: data === null || data === void 0 ? void 0 : data.MetaTagTitle,
                            metaTagDescription: data === null || data === void 0 ? void 0 : data.MetaTagDescription,
                            metaTagKeyword: data === null || data === void 0 ? void 0 : data.MetaTagKeyword,
                        };
                        const seoUpload = axios.post(env_1.env.baseUrl + '/product-seo/' + savedProduct.productId, seoObject, { headers });
                        console.log(seoUpload, 'seoUploadseoUploadseoUpload');
                    }
                }
            }
            const successMessage = 'Bulk product data created successfully!';
            return successMessage;
        });
    }
    // Download sample zip for product import
    /**
     * @api {get} /api/product/download-product-sample Download Product Import Sample Zip
     * @apiGroup Product
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the file..!!",
     *      "status": "1",
     * }
     * @apiSampleRequest /api/product/download-product-sample
     * @apiErrorExample {json} Download Data
     * HTTP/1.1 500 Internal Server Error
     */
    downloadSample(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            // product list excel
            const productWorkbook = new excel.Workbook();
            const productWorksheet = productWorkbook.addWorksheet('product List');
            const products = [];
            // Excel sheet column define
            productWorksheet.columns = [
                { header: 'productId', key: 'id', size: 16, width: 15 },
                { header: 'ProductName', key: 'first_name', size: 16, width: 15 },
            ];
            productWorksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            productWorksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            const product = yield this.productService.find({ select: ['productId', 'name'] });
            for (const prod of product) {
                products.push([prod.productId, prod.name]);
            }
            products.push(['If you want to map multiple related Product to product,you have to give relatedProductId splitted with commas (,) ']);
            productWorksheet.addRows(products);
            const productFileName = './demo/Productlist.xlsx';
            yield productWorkbook.xlsx.writeFile(productFileName);
            // for category excel
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Category List');
            const rows = [];
            // Excel sheet column define
            worksheet.columns = [
                { header: 'CategoryId', key: 'id', size: 16, width: 15 },
                { header: 'Levels', key: 'first_name', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            const select = [
                'CategoryPath.categoryId as categoryId',
                'category.name as name',
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
            const groupBy = [
                {
                    name: 'CategoryPath.category_id',
                },
            ];
            const whereConditions = [];
            const searchConditions = [];
            const sort = [];
            const vendorCategoryList = yield this.categoryPathService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            for (const id of vendorCategoryList) {
                rows.push([id.categoryId, id.levels]);
            }
            rows.push(['If you want to map multiple category to product,you have to give categoryId splitted with commas (,) ']);
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './demo/Category.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            const zipfolder = require('zip-a-folder');
            yield zipfolder.zip(path.join(process.cwd(), 'demo'), path.join(process.cwd(), 'demo.zip'));
            const file = path.basename('/demo.zip');
            return new Promise(() => {
                response.download(file, 'demo.zip');
            });
        });
    }
    readDir(pathfile) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((subresolve, subreject) => {
                fs.readdir(pathfile, (error, files) => {
                    if (error) {
                        subreject(error);
                    }
                    subresolve(files);
                });
            });
        });
    }
    // update stock  API
    /**
     * @api {post} /api/product/update-stock Update Stock API
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
     * @apiSampleRequest /api/product/update-stock
     * @apiErrorExample {json} stock error
     * HTTP/1.1 500 Internal Server Error
     */
    manageStock(updateStock, response) {
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
            product.hasStock = updateStock.hasStock;
            const productStock = updateStock.productStock;
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
    // add tire price  API
    /**
     * @api {post} /api/product/add-tire-price Add tire price API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} [hasTirePrice] send 0 or 1
     * @apiParam (Request body) {number} productId productId
     * @apiParam (Request body) {number} quantity
     * @apiParam (Request body) {number} price price
     * @apiParamExample {json} Input
     * {
     *      "hasTirePrice" : "",
     *      "productId" : "",
     *      "price" : "",
     *      "quantity" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully added tire price.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/add-tire-price
     * @apiErrorExample {json} tire price error
     * HTTP/1.1 500 Internal Server Error
     */
    addTirePrice(tirePrice, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findOne({
                where: {
                    productId: tirePrice.productId,
                },
            });
            if (!product) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid product Id.',
                };
                return response.status(400).send(errorResponse);
            }
            if (tirePrice.hasTirePrice) {
                product.hasTirePrice = tirePrice.hasTirePrice;
                yield this.productService.create(product);
            }
            const tirePrices = new ProductTirePrice_1.ProductTirePrice();
            tirePrices.productId = tirePrice.productId;
            tirePrices.quantity = tirePrice.quantity;
            tirePrices.price = tirePrice.price;
            const productSave = yield this.productTirePriceService.create(tirePrices);
            if (productSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully added tire price for this product.',
                    data: productSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to add tire price.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Delete tire price API
    /**
     * @api {delete} /api/product/delete-tire-price/:id Delete Product Tire Price API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/delete-tire-price/:id
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     */
    delete(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tire = yield this.productTirePriceService.findOne({
                where: {
                    id,
                },
            });
            if (!tire) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Id.',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteTirePrice = yield this.productTirePriceService.delete(id);
            if (deleteTirePrice) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted.',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    //   Get Product Price List API
    /**
     * @api {get} /api/product/get-product-tire-price-list Get product tire price list API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} count count
     * @apiParamExample {json} Input
     * {
     *      "productId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get tire price list",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/get-product-tire-price-list
     * @apiErrorExample {json} product error
     * HTTP/1.1 500 Internal Server Error
     */
    getCustomerAddress(productId, limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const WhereConditions = [
                {
                    name: 'productId',
                    value: productId,
                },
            ];
            const tire = yield this.productTirePriceService.list(limit, offset, WhereConditions, count);
            const successResponse = {
                status: 1,
                message: 'Successfully Get product tire price',
                data: tire,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Inventory Product List API
    /**
     * @api {get} /api/product/inventory-product-list Invendory Product List API
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
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product/inventory-product-list
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    inventoryProductList(limit, offset, keyword, sku, status, price, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['productId', 'sku', 'name', 'quantity', 'price', 'productSlug', 'isActive', 'hasStock', 'hasTirePrice', 'outOfStockThreshold', 'notifyMinQuantity', 'minQuantityAllowedCart', 'maxQuantityAllowedCart', 'maxQuantityAllowedCart', 'enableBackOrders', 'modifiedDate', 'isSimplified', 'skuId'];
            const relation = [];
            const WhereConditions = [
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                }, {
                    name: 'sku',
                    op: 'like',
                    value: sku,
                }, {
                    name: 'isActive',
                    op: 'like',
                    value: status,
                }, {
                    name: 'isSimplified',
                    op: 'where',
                    value: 1,
                },
            ];
            const productLists = yield this.productService.list(limit, offset, select, relation, WhereConditions, 0, price, count);
            if (count) {
                const successRes = {
                    status: 1,
                    message: 'Successfully got count ',
                    data: productLists,
                };
                return response.status(200).send(successRes);
            }
            const promise = productLists.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                let skuValue = undefined;
                skuValue = yield this.skuService.findAll({ where: { id: result.skuId } });
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
    // Inventory Product List API
    /**
     * @api {get} /api/product/update-owner-product-list Invendory Product List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product/update-owner-product-list
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    updateProductList(limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['productId'];
            const relation = [];
            const WhereConditions = [];
            const productLists = yield this.productService.list(limit, offset, select, relation, WhereConditions, 0, 0, count);
            if (count) {
                const successRes = {
                    status: 1,
                    message: 'Successfully got count ',
                    data: productLists,
                };
                return response.status(200).send(successRes);
            }
            const promise = productLists.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const vendorProduct = yield this.vendorProductService.findOne({ where: { productId: result.productId } });
                const temp = result;
                const product = yield this.productService.findOne({ where: { productId: result.productId } });
                if (vendorProduct) {
                    product.owner = 2;
                    product.createdBy = vendorProduct.vendorId;
                }
                else {
                    product.owner = 1;
                    product.createdBy = 80;
                }
                yield this.productService.create(product);
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
    // Update Vendor Product Sku
    /**
     * @api {get} /api/product/update-vendor-sku-list Update Vendor Product Sku
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product/update-vendor-sku-list
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    updateVendorSku(limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'Product.productId as productId',
            ];
            const relations = [];
            const whereConditions = [];
            const productLists = yield this.productService.listByQueryBuilder(limit, offset, select, whereConditions, [], relations, [], [], false, true);
            const promise = productLists.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const product = yield this.productService.findOne({
                    where: {
                        productId: result.productId,
                    },
                });
                const vendor = yield this.vendorProductService.findOne({
                    productId: product.productId,
                });
                console.log('product.skuId:', product.skuId);
                vendor.sku_id = product.skuId;
                yield this.vendorProductService.update(vendor.vendorProductId, vendor);
                return vendor;
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
    tslib_1.__param(8, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "getProductList", null);
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
    (0, routing_controllers_1.Get)('/top-selling-productlist'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "topSellingProductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/top-five-repeatedly-purchased-customers'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "topFiveRepeatedlyPurchasedCustomers", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/top-performing-products'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('duration')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "topPerformingProucts", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/dashboard/admin-customers-count'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('duration')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "dashboardCustomerCount", null);
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
    (0, routing_controllers_1.Get)('/dashboard-average-order-value'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('duration')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "averageOrderValue", null);
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
    (0, routing_controllers_1.Get)('/dashboard-average-conversion-ratio'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('duration')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "averageConversionRatio", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/dashboard/graph-weekly-saleslist'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "topTenWeeklySales", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/recent-selling-product'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "sellingProduct", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/viewLog-list'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "productViewLogList", null);
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
    (0, routing_controllers_1.Get)('/product-excel-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'export-product']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('sku')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Req)()),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, Object, Object, Object]),
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
    (0, routing_controllers_1.Get)('/dashboard-count'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "dashboardCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/dashboard-admin-totalvendor-totalproduct-count'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "dashboardAdminCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product-count'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "productCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/import-product-data'),
    (0, routing_controllers_1.Authorized)(['admin', 'import-product']),
    tslib_1.__param(0, (0, routing_controllers_1.UploadedFile)('file')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "ImportProductPrice", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/download-product-sample'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "downloadSample", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/update-stock'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateStockRequest_1.UpdateStockRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "manageStock", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/add-tire-price'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateTirePriceRequest_1.CreateTirePriceRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "addTirePrice", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete-tire-price/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/get-product-tire-price-list'),
    (0, routing_controllers_1.Authorized)(''),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "getCustomerAddress", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/inventory-product-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'inventory-list']),
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
], ProductController.prototype, "inventoryProductList", null);
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
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/update-owner-product-list'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "updateProductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/update-vendor-sku-list'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "updateVendorSku", null);
ProductController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/product'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        ProductToCategoryService_1.ProductToCategoryService,
        ProductImageService_1.ProductImageService,
        CategoryService_1.CategoryService,
        OrderProductService_1.OrderProductService,
        OrderService_1.OrderService,
        ProductViewLogService_1.ProductViewLogService,
        ProductDiscountService_1.ProductDiscountService,
        ProductSpecialService_1.ProductSpecialService,
        CustomerService_1.CustomerService,
        TaxService_1.TaxService,
        PaymentService_1.PaymentService,
        CategoryPathService_1.CategoryPathService,
        ProductTirePriceService_1.ProductTirePriceService,
        SkuService_1.SkuService,
        S3Service_1.S3Service,
        ProductVideoService_1.ProductVideoService,
        ImageService_1.ImageService,
        VendorProductService_1.VendorProductService,
        VendorService_1.VendorService,
        VendorPaymentService_1.VendorPaymentService,
        CustomerCartService_1.CustomerCartService,
        BulkImportRequest_1.BulkImport,
        PluginService_1.PluginService,
        ExportLogService_1.ExportLogService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map