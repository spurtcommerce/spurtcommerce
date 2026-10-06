/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { JsonController, Authorized, Res, Body, Post, Req, Put, Param, Get, QueryParam, Delete, BodyParam } from 'routing-controllers';
import { ProductService } from '../../core/services/ProductService';
import { ProductToCategoryService } from '../../core/services/ProductToCategoryService';
import { ProductImageService } from '../../core/services/ProductImageService';
import { Product } from '../../core/models/ProductModel';
import { ProductDiscount } from '../../core/models/ProductDiscount';
import { ProductSpecial } from '../../core/models/ProductSpecial';
import { VendorProducts } from '../../core/models/VendorProducts';
import { VendorProductRequest } from './requests/VendorProductRequest';
import { ProductToCategory } from '../../core/models/ProductToCategory';
import { ProductImage } from '../../core/models/ProductImage';
import { CategoryService } from '../../core/services/CategoryService';
import { VendorProductService } from '../../core/services/VendorProductService';
import { OrderProductService } from '../../core/services/OrderProductService';
import { ProductDiscountService } from '../../core/services/ProductDiscountService';
import { ProductSpecialService } from '../../core/services/ProductSpecialService';
import { VendorService } from '../../core/services/VendorService';
import { CustomerService } from '../../core/services/CustomerService';
import moment = require('moment');
import { instanceToPlain } from 'class-transformer';
import fs = require('fs');
import * as path from 'path';
import { Sku } from '../../core/models/SkuModel';
import { SkuService } from '../../core/services/SkuService';
import { ProductTirePriceService } from '../../core/services/ProductTirePriceService';
import { ProductTirePrice } from '../../core/models/ProductTirePrice';
import { UpdateStockRequest } from './requests/UpdateStockRequest';
import { ProductVideoService } from '../../core/services/ProductVideoService';
import { ProductVideo } from '../../core/models/ProductVideo';
import { CategoryPathService } from '../../core/services/CategoryPathService';
import { VendorProductAdditionalFileService } from '../../core/services/VendorProductAdditionalFileService';
import { pluginModule } from '../../../loaders/pluginLoader';
import uncino from 'uncino';
import { VendorProductAdditionalFile } from '../../core/models/VendorProductAdditionalFileModel';
const hooks = uncino();
import { VendorPluginService } from '../../core/services/VendorPluginService';
import { Service } from 'typedi';
import { ExportLog } from '../../core/models/ExportLog';
import { ExportLogService } from '../../core/services/ExportLogService';

@Service()
@JsonController('/vendor-product')
export class VendorProductController {
    constructor(
        private productService: ProductService,
        private productToCategoryService: ProductToCategoryService,
        private productImageService: ProductImageService,
        private categoryService: CategoryService,
        private vendorProductAdditionalFileService: VendorProductAdditionalFileService,
        private productDiscountService: ProductDiscountService,
        private productSpecialService: ProductSpecialService,
        private orderProductService: OrderProductService,
        private customerService: CustomerService,
        private vendorService: VendorService,
        private skuService: SkuService,
        private vendorProductService: VendorProductService,
        private productTirePriceService: ProductTirePriceService,
        private productVideoService: ProductVideoService,
        private categoryPathService: CategoryPathService,
        private vendorPluginService: VendorPluginService,
        private exportLogService: ExportLogService
    ) {
    }

    // Create Vendor Product API
    /**
     * @api {Post} /api/vendor-product Create Vendor Product API
     * @apiGroup  Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} [productDescription] productDescription
     * @apiParam (Request body) {String} sku stock keeping unit
     * @apiParam (Request body) {String} [upc] upc
     * @apiParam (Request body) {String} [hsn] hsn
     * @apiParam (Request body) {String} image product Image
     * @apiParam (Request body) {String} [productSlug] productSlug
     * @apiParam (Request body) {Number} [packingCost] packingCost
     * @apiParam (Request body) {Number} [shippingCost] shippingCost
     * @apiParam (Request body) {Number} [tax] tax
     * @apiParam (Request body) {Number} [taxType] taxType
     * @apiParam (Request body) {Number} [others] others
     * @apiParam (Request body) {String} categoryId CategoryId
     * @apiParam (Request body) {String} [relatedProductId] relatedProductId
     * @apiParam (Request body) {String} categoryId CategoryId
     * @apiParam (Request body) {String} relatedProductId relatedProductId
     * @apiParam (Request body) {Number} quantity quantity
     * @apiParam (Request body) {Number} price price
     * @apiParam (Request body) {Number} [outOfStockStatus] outOfStockStatus
     * @apiParam (Request body) {Number} [requiredShipping] requiredShipping
     * @apiParam (Request body) {String} [dateAvailable] dateAvailable
     * @apiParam (Request body) {Number{..9999}} sortOrder sortOrder
     * @apiParam (Request body) {String} [productSpecial] productSpecial
     * @apiParam (Request body) {String} [tirePrices] tirePrices
     * @apiParam (Request body) {String} [productDiscount] productDiscount
     * @apiParam (Request body) {Object} [productVideo] video
     * @apiParam (Request body) {String} productVideo.name video name
     * @apiParam (Request body) {String} productVideo.path for embedded have to pass path only
     * @apiParam (Request body) {Number} productVideo.type 1 -> video 2 -> embedded
     * @apiParamExample {json} Input
     * {
     *      "productName" : "",
     *      "productDescription" : "",
     *      "sku" : "",
     *      "hsn" : "",
     *      "image" : "",
     *      "productSlug" : "",
     *      "categoryId" : [],
     *      "upc" : "",
     *      "quantity" : "",
     *      "price" : "",
     *      "packingCost" : "",
     *      "shippingCost" : "",
     *      "tax" : "",
     *      "others" : "",
     *      "productSlug" : "",
     *      "outOfStockStatus" : "",
     *      "requiredShipping" : "",
     *      "dateAvailable" : "",
     *      "sortOrder" : "",
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
     *      "price":"",
     *      "skuName":""
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
     *      }]
     *     "productDiscount":[
     *      {
     *         "discountPriority":""
     *         "discountPrice":""
     *         "discountDateStart":""
     *         "discountDateEnd":""
     *      }],
     *      "productVideo":{
     *               "name": "",
     *               "path": "",
     *               "type": ""
     *      },
     *      "productHighlights": [
     *      {
     *          "data":""
     * }
     * ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new Vendor product.",
     *      "status": "1",
     *      "data": {
     *                "name": "",
     *                "description": "",
     *                "productSlug": "",
     *                "sku": "",
     *                "upc": "",
     *                "hsn": "",
     *                "quantity": "",
     *                "quotationAvailable": "",
     *                "serviceCharges": "",
     *                "price": "",
     *                "taxType": "",
     *                "taxValue": "",
     *                "stockStatusId": "",
     *                "skuId": "",
     *                "shipping": "",
     *                "dateAvailable": "",
     *                "isActive": "",
     *                "isFeatured": "",
     *                "todayDeals": "",
     *                "sortOrder": "",
     *                "height": "",
     *                "weight": "",
     *                "length": "",
     *                "width": "",
     *                "hasTirePrice": "",
     *                "keywords": "",
     *                "owner": "",
     *                "createdBy": "",
     *                "createdDate": "",
     *                "productId": "",
     *                "isSimplified": "",
     *                "modifiedDate": ""
     *     }
     * }
     * @apiSampleRequest /api/vendor-product
     * @apiErrorExample {json} Create Product error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized(['vendor', 'create-product'])
    public async createProduct(@Body({ validate: true }) product: VendorProductRequest, @Req() request: any, @Res() response: any): Promise<any> {

        const category = product.categoryId;
        if (category.length === 0) {
            return response.status(400).send({
                status: 0,
                message: 'Category should not be empty',
            });
        }
        if ((product.tax < 0)) {
            const errorResponse: any = {
                status: 0,
                message: 'Tax should not be in negative',
            };
            return response.status(400).send(errorResponse);
        }
        const newProduct: any = new Product();
        if (+newProduct.price === 0) {
            return response.status(400).send({
                status: 0,
                message: 'Product price input is missing',
            });
        }
        const productImage: any = product.image;
        if (productImage.length === 0) {
            return response.status(400).send({
                status: 0,
                message: 'Error ! Atleast one seelction is mandatory',
            });
        }
        newProduct.name = product.productName;
        newProduct.description = product.productDescription ?? '';
        const metaTagTitle = product.productSlug ? product.productSlug : product.productName;
        const slug = metaTagTitle.trim();
        const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        newProduct.productSlug = await this.validate_slug(data);
        newProduct.sku = product.sku;
        newProduct.upc = product.upc;
        newProduct.hsn = product.hsn;
        newProduct.quantity = product.quantity ? product.quantity : 1;
        const serviceCharge: any = {};
        serviceCharge.productCost = product.price;
        serviceCharge.packingCost = product.packingCost ? product.packingCost : 0;
        serviceCharge.shippingCost = product.shippingCost ? product.shippingCost : 0;
        serviceCharge.tax = 0;
        serviceCharge.others = product.others ? product.others : 0;
        newProduct.serviceCharges = JSON.stringify(serviceCharge);
        newProduct.price = serviceCharge.productCost + serviceCharge.packingCost + serviceCharge.shippingCost + serviceCharge.others;
        newProduct.quantity = product.quantity;
        newProduct.taxType = product.taxType ? product.taxType : 0;
        newProduct.taxValue = product.tax ? product.tax : 0;
        newProduct.taxId = product.taxId;
        newProduct.stockStatusId = product.outOfStockStatus ? product.outOfStockStatus : 1;
        newProduct.shipping = product.requiredShipping;
        const findSku = await this.skuService.findOne({ where: { skuName: product.sku } });
        if (findSku) {
            const errorResponse: any = {
                status: 0,
                message: 'duplicate sku name, give some other name',
            };
            return response.status(400).send(errorResponse);
        }
        const newSku: any = new Sku();
        newSku.skuName = product.sku;
        newSku.price = newProduct.price;
        newSku.quantity = product.quantity ? product.quantity : 1;
        newSku.isActive = 1;
        const saveSku = await this.skuService.create(newSku);
        newProduct.skuId = saveSku.id;
        newProduct.dateAvailable = moment(product.dateAvailable).toISOString();
        newProduct.hasTirePrice = product.hasTirePrice ? product.hasTirePrice : 0;
        newProduct.isActive = 0;
        newProduct.hasStock = 0;
        newProduct.sortOrder = product.sortOrder;
        // adding category name and product name in keyword field for keyword search
        const rows: any = [];
        if (category.length !== 0) {
            for (const categoryId of category) {
                const categoryNames: any = await this.categoryService.findOne({
                    where: {
                        categoryId,
                    },
                });
                const name = '~' + categoryNames.name + '~';
                rows.push(name);
            }
            rows.push('~' + product.productName + '~');
        }
        const value = rows.toString();
        newProduct.keywords = value;
        newProduct.owner = 2;
        newProduct.createdBy = request.user.tenantId;
        newProduct.width = (product && product.width) ? product.width : 0;
        newProduct.height = (product && product.height) ? product.height : 0;
        newProduct.weight = (product && product.weight) ? product.weight : 0;
        newProduct.length = (product && product.length) ? product.length : 0;
        // save highlight
        if (product.productHighlights.length > 0) {
            newProduct.productHighlights = product.productHighlights;
        }
        const saveProduct = await this.productService.create(newProduct);

        // save category
        if (category.length !== 0) {
            for (const categoryId of category) {
                const newProductToCategory: any = new ProductToCategory();
                newProductToCategory.productId = saveProduct.productId;
                newProductToCategory.categoryId = categoryId;
                newProductToCategory.isActive = 1;
                this.productToCategoryService.create(newProductToCategory);
            }
        }

        // Save products Image
        for (const imageRow of productImage) {
            const imageData = JSON.stringify(imageRow);
            const imageResult = JSON.parse(imageData);
            const newProductImage = new ProductImage();
            newProductImage.productId = saveProduct.productId;
            newProductImage.image = imageResult.image;
            newProductImage.sortOrder = imageResult?.sortOrder;
            if (newProductImage.image === '') {
                return response.status(400).send({
                    status: 0,
                    message: 'Error ! Atleast one seelction is mandatory',
                });
            }
            newProductImage.containerName = imageResult.containerName;
            newProductImage.defaultImage = imageResult.defaultImage;
            this.productImageService.create(newProductImage);
        }

        // save product Video
        if (product.productVideo) {
            const video = product.productVideo;
            const productVideo: any = new ProductVideo();
            productVideo.productId = saveProduct.productId;
            productVideo.name = video.name;
            productVideo.path = video.path;
            productVideo.type = video.type;
            await this.productVideoService.create(productVideo);
        }
        saveProduct.isSimplified = 1;
        saveProduct.isSpecification = product.isSpecification;
        await this.productService.create(saveProduct);
        // Product Discount
        if (product.productDiscount) {
            const productDiscount: any = product.productDiscount;
            for (const discount of productDiscount) {
                const discountData: any = new ProductDiscount();
                discountData.productId = saveProduct.productId;
                discountData.quantity = 1;
                discountData.priority = discount.discountPriority;
                discountData.price = discount.discountPrice;
                discountData.dateStart = moment(discount.discountDateStart).toISOString();
                discountData.dateEnd = moment(discount.discountDateEnd).toISOString();
                await this.productDiscountService.create(discountData);
            }
        }

        // Product Special
        if (product.productSpecial) {
            const productSpecial: any[] = product.productSpecial;
            for (const special of productSpecial) {
                const specialPriceData: any = new ProductSpecial();
                specialPriceData.productId = saveProduct.productId;
                specialPriceData.priority = special.specialPriority;
                specialPriceData.price = special.specialPrice;
                specialPriceData.dateStart = moment(special.specialDateStart).toISOString();
                specialPriceData.dateEnd = moment(special.specialDateEnd).toISOString();
                await this.productSpecialService.create(specialPriceData);
            }
        }

        // product tire price
        if (product.tirePrices) {
            const tirePrice: any = product.tirePrices;
            for (const tire of tirePrice) {
                const productTirePrice: any = new ProductTirePrice();
                productTirePrice.productId = saveProduct.productId;
                productTirePrice.quantity = tire.quantity;
                productTirePrice.price = tire.price;
                await this.productTirePriceService.create(productTirePrice);
            }
        }
        const vendorProducts: any = new VendorProducts();
        vendorProducts.productId = saveProduct.productId;
        vendorProducts.vendorId = request.user.tenantId;
        vendorProducts.sku_id = saveProduct.skuId;
        vendorProducts.approvalFlag = 1;
        vendorProducts.approvedBy = request.user.id;
        vendorProducts.approvedDate = undefined;
        vendorProducts.rejectReason = [];
        await this.vendorProductService.create(vendorProducts);

        if (saveProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created seller product.',
                data: saveProduct,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to create seller Product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Update Vendor Product API
    /**
     * @api {Put} /api/vendor-product/:id Update Vendor Product API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} [productDescription] productDescription
     * @apiParam (Request body) {String} sku stock keeping unit
     * @apiParam (Request body) {String} [upc] upc
     * @apiParam (Request body) {String} [hsn] hsn
     * @apiParam (Request body) {String} image product Image
     * @apiParam (Request body) {String} [productSlug] productSlug
     * @apiParam (Request body) {Number} quantity quantity
     * @apiParam (Request body) {String} categoryId CategoryId
     * @apiParam (Request body) {String} [relatedProductId relatedProductId
     * @apiParam (Request body) {Number} quantity quantity
     * @apiParam (Request body) {Number} price price
     * @apiParam (Request body) {Number} [packingCost] packingCost
     * @apiParam (Request body) {Number} [shippingCost] shippingCost
     * @apiParam (Request body) {Number} [tax] tax
     * @apiParam (Request body) {Number} [taxType] taxType
     * @apiParam (Request body) {Number} [others] others
     * @apiParam (Request body) {Number} [outOfStockStatus] outOfStockStatus
     * @apiParam (Request body) {Number} [requiredShipping] requiredShipping
     * @apiParam (Request body) {String} [dateAvailable] dateAvailable
     * @apiParam (Request body) {Number{..9999}} [sortOrder] sortOrder
     * @apiParam (Request body) {String} [productSpecial] productSpecial
     * @apiParam (Request body) {String} [tirePrices] tirePrices
     * @apiParam (Request body) {String} [productDiscount] productDiscount
     * @apiParam (Request body) {Object} [productVideo] video
     * @apiParamExample {json} Input
     * {
     *      "productName" : "",
     *      "productDescription" : "",
     *      "sku" : "",
     *      "hsn" : "",
     *      "image" : "",
     *      "categoryId" : [],
     *      "upc" : "",
     *      "price" : "",
     *      "packingCost" : "",
     *      "shippingCost" : "",
     *      "tax" : "",
     *      "others" : "",
     *      "outOfStockStatus" : "",
     *      "requiredShipping" : "",
     *      "dateAvailable" : "",
     *      "outOfStockStatus" : "",
     *      "sortOrder" : "",
     *      "image":[
     *      {
     *      "image":""
     *      "containerName":""
     *      "defaultImage":""
     *      }
     *      ],
     *      "tirePrices":[
     *      {
     *      "quantity":""
     *      "price":"",
     *      "skuName":""
     *      }
     *      ],
     *       "relatedProductId":[ "", ""],
     *      "productSpecial":[
     *      {
     *     "customerGroupId":""
     *     "specialPriority":""
     *     "specialPrice":""
     *     "specialDateStart":""
     *     "specialDateEnd":""
     *      }],
     *       "productDiscount":[
     *      {
     *         "discountPriority":""
     *         "discountPrice":""
     *         "discountDateStart":""
     *         "discountDateEnd"""
     *      }],
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated vendor products.",
     *      "status": "1",
     * }
     * @apiSampleRequest /api/vendor-product/:id
     * @apiErrorExample {json} updateProduct error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    @Authorized(['vendor', 'edit-product'])
    public async updateProduct(@Param('id') id: number, @Body({ validate: true }) product: VendorProductRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const category = product.categoryId;
        if (category.length === 0) {
            return response.status(400).send({
                status: 0,
                message: 'Category should not be empty',
            });
        }
        let validatedDiscount = false;
        let validatedSpecial = false;
        const validateDiscountPrice: any = product.productDiscount;
        if (validateDiscountPrice.length > 0) {
            validatedDiscount = validateDiscountPrice.some(discData => discData.discountPrice < 0);
        }
        const validateSpecialPrice: any = product.productSpecial;
        if (validateSpecialPrice.length > 0) {
            validatedSpecial = validateSpecialPrice.some(specialData => specialData.specialPrice < 0);
        }
        if (validatedDiscount || validatedSpecial || (product.price < 0)) {
            const errorResponse: any = {
                status: 0,
                message: 'Price should not be in negative',
            };
            return response.status(400).send(errorResponse);
        }
        if ((product.tax < 0)) {
            const errorResponse: any = {
                status: 0,
                message: 'Tax should not be in negative',
            };
            return response.status(400).send(errorResponse);
        }
        const updateProduct: any = await this.productService.findOne({
            where: {
                productId: id,
            },
        });
        if (!updateProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        const metaTagTitle = product.productSlug ? product.productSlug : product.productName;
        const slug = metaTagTitle.trim();
        const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        updateProduct.productSlug = await this.validate_slug(data, id);
        updateProduct.name = product.productName;
        updateProduct.description = product.productDescription ?? '';
        updateProduct.upc = product.upc;
        updateProduct.hsn = product.hsn;
        updateProduct.quantity = product.quantity ? product.quantity : 1;
        updateProduct.width = product.width;
        updateProduct.length = product.length;
        updateProduct.weight = product.weight;
        updateProduct.height = product.height;

        const serviceCharge: any = {};
        serviceCharge.productCost = product.price;
        serviceCharge.packingCost = product.packingCost ? product.packingCost : 0;
        serviceCharge.shippingCost = product.shippingCost ? product.shippingCost : 0;
        // saving sku //
        let saveSku;
        const findSku = await this.skuService.findOne({ where: { skuName: updateProduct.sku } });
        if (findSku) {
            const finddSku = await this.productService.findSkuName(updateProduct.productId, product.sku, 0);
            if (finddSku) {
                const errorResponse: any = {
                    status: 0,
                    message: 'duplicate sku name, give some other name',
                };
                return response.status(400).send(errorResponse);
            } else {
                findSku.skuName = updateProduct.sku;
                findSku.price = product.price;
                findSku.quantity = product.quantity;
                findSku.isActive = 1;
                saveSku = await this.skuService.create(findSku);
            }
        } else {
            const newSku: any = new Sku();
            newSku.skuName = product.sku;
            newSku.price = product.price;
            newSku.quantity = product.quantity;
            newSku.isActive = 1;
            saveSku = await this.skuService.create(newSku);
        }
        // ending sku //
        updateProduct.skuId = saveSku.id;
        serviceCharge.tax = 0;
        serviceCharge.others = product.others ? product.others : 0;
        updateProduct.serviceCharges = JSON.stringify(serviceCharge);
        updateProduct.price = serviceCharge.productCost + serviceCharge.packingCost + serviceCharge.shippingCost + serviceCharge.others;
        updateProduct.stockStatusId = product.outOfStockStatus;
        updateProduct.shipping = product.requiredShipping;
        updateProduct.dateAvailable = moment(product.dateAvailable).toISOString();
        updateProduct.taxType = product.taxType ? product.taxType : 0;
        updateProduct.taxValue = product.tax ? product.tax : 0;
        updateProduct.taxId = product.taxId;
        updateProduct.hasTirePrice = product.hasTirePrice ? product.hasTirePrice : 0;
        updateProduct.sortOrder = product.sortOrder;
        // adding category name and product name in keyword field for keyword search
        const rows: any = [];
        if (category.length !== 0) {
            for (const categoryId of category) {
                const categoryNames: any = await this.categoryService.findOne({
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
        updateProduct.modifiedBy = request.user.tenantId;
        // save highlight
        if (product.productHighlights.length > 0) {
            updateProduct.productHighlights.length = 0;
            updateProduct.productHighlights = product.productHighlights;
        }
        updateProduct.isActive = 0;
        const saveProduct = await this.productService.create(updateProduct);

        // delete previous category
        this.productToCategoryService.delete({ productId: saveProduct.productId });

        // save category
        if (category.length !== 0) {
            for (const categoryId of category) {
                const newProductToCategory: any = new ProductToCategory();
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
            const productImage: any = product.image;
            for (const imageRow of productImage) {
                const imageData = JSON.stringify(imageRow);
                const imageResult = JSON.parse(imageData);
                const newProductImage = new ProductImage();
                newProductImage.productId = saveProduct.productId;
                newProductImage.image = imageResult.image;
                newProductImage.containerName = imageResult.containerName;
                newProductImage.defaultImage = imageResult.defaultImage;
                newProductImage.sortOrder = imageResult?.sortOrder;
                this.productImageService.create(newProductImage);
            }
        }
        await this.productService.create(saveProduct);
        // Product Discount
        if (product.productDiscount) {
            // Delete the product discount
            this.productDiscountService.delete({ productId: saveProduct.productId });
            const productDiscount: any = product.productDiscount;
            const distArr: any = [];
            for (const discount of productDiscount) {
                const discountData: any = new ProductDiscount();
                discountData.productId = saveProduct.productId;
                if (saveProduct.price <= discount.discountPrice) {
                    const errorResponse: any = {
                        status: 0,
                        message: 'discount price should be less than original price',
                    };
                    return response.status(400).send(errorResponse);
                }
                discountData.quantity = 1;
                const skuValue: any = await this.skuService.findOne({
                    where: {
                        skuName: discount.skuName,
                    },
                });
                if (skuValue) {
                    discountData.skuId = skuValue.id;
                } else {
                    const errorResponse: any = {
                        status: 0,
                        message: 'sku does not exist in discount price',
                    };
                    return response.status(400).send(errorResponse);
                }
                discountData.priority = discount.discountPriority;
                discountData.price = discount.discountPrice;
                discountData.dateStart = moment(discount.discountDateStart).toISOString();
                discountData.dateEnd = moment(discount.discountDateEnd).toISOString();
                distArr.push(discountData);
            }
            await this.productDiscountService.create(distArr);
        }

        // Product Special
        if (product.productSpecial) {
            this.productSpecialService.delete({ productId: saveProduct.productId });
            const productSpecial: any = product.productSpecial;
            const splArr: any = [];
            for (const special of productSpecial) {
                const specialPriceData: any = new ProductSpecial();
                specialPriceData.productId = saveProduct.productId;
                if (saveProduct.price < special.specialPrice) {
                    const errorResponse: any = {
                        status: 0,
                        message: 'special price should be less than original price',
                    };
                    return response.status(400).send(errorResponse);
                }
                specialPriceData.customerGroupId = special.customerGroupId;
                specialPriceData.priority = special.specialPriority;
                const specialSkuValue: any = await this.skuService.findOne({
                    where: {
                        skuName: special.skuName,
                    },
                });
                if (specialSkuValue) {
                    specialPriceData.skuId = specialSkuValue.id;
                } else {
                    const errorResponse: any = {
                        status: 0,
                        message: 'sku does not exist in special price',
                    };
                    return response.status(400).send(errorResponse);
                }
                specialPriceData.price = special.specialPrice;
                specialPriceData.dateStart = moment(special.specialDateStart).toISOString();
                specialPriceData.dateEnd = moment(special.specialDateEnd).toISOString();
                splArr.push(specialPriceData);
            }
            await this.productSpecialService.create(splArr);
        }

        // Product tire price
        if (product.tirePrices) {
            await this.productTirePriceService.delete({ productId: saveProduct.productId });
            const tirePrice: any = product.tirePrices;
            const tireArr: any = [];
            for (const tire of tirePrice) {
                const productTirePrice: any = new ProductTirePrice();
                productTirePrice.productId = saveProduct.productId;
                const tireSkuValue: any = await this.skuService.findOne({
                    where: {
                        skuName: tire.skuName,
                    },
                });
                if (tireSkuValue) {
                    productTirePrice.skuId = tireSkuValue.id;
                } else {
                    const errorResponse: any = {
                        status: 0,
                        message: 'sku does not exist tire price',
                    };
                    return response.status(400).send(errorResponse);
                }
                productTirePrice.quantity = tire.quantity;
                productTirePrice.price = tire.price;
                tireArr.push(productTirePrice);
            }
            await this.productTirePriceService.create(tireArr);
        }
        // update additional file
        const additionalData = await this.vendorProductAdditionalFileService.findOne({
            where: {
                productId: saveProduct.productId,
            },
        });
        if (additionalData) {
            additionalData.productId = saveProduct.productId;
            additionalData.fileName = product.fileName;
            additionalData.containerName = product.containerName;
            await this.vendorProductAdditionalFileService.create(additionalData);
        } else {
            const newAdditionalData = new VendorProductAdditionalFile();
            newAdditionalData.productId = saveProduct.productId;
            newAdditionalData.fileName = product.fileName;
            newAdditionalData.containerName = product.containerName;
            await this.vendorProductAdditionalFileService.create(newAdditionalData);
        }
        // update product Video
        const video = product.productVideo;
        if (video) {
            await this.productVideoService.delete({ productId: saveProduct.productId });
            const newProductVideo: any = new ProductVideo();
            newProductVideo.productId = saveProduct.productId;
            newProductVideo.name = video.name;
            newProductVideo.type = video.type;
            newProductVideo.path = video.path;
            await this.productVideoService.create(newProductVideo);
        }

        const vendorProduct: any = await this.vendorProductService.findOne({
            where: {
                productId: id,
            },
        });
        vendorProduct.sku_id = saveSku.id;
        vendorProduct.approvalFlag = 1;
        await this.vendorProductService.create(vendorProduct);

        if (saveProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated your product',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update your Product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Vendor Product List API
    /**
     * @api {Get} /api/vendor-product Vendor Product List API
     * @apiGroup  Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} status 0->inactive 1-> active
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} price price
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "",
     *      "data": [{
     *             "vendorProductId": 875,
     *             "vendorProductCommission": 0,
     *             "quotationAvailable": 0,
     *             "approvalFlag": 0,
     *             "vendorId": 10,
     *             "productId": 1782,
     *             "name": "attractive",
     *             "sku": "12",
     *             "skuId": 3339,
     *             "productprice": "1222.00",
     *             "quantity": 12,
     *             "vendorName": "Marcello",
     *             "sortOrder": 1,
     *             "isActive": 0,
     *             "productSlug": "attractive",
     *             "width": "0.00",
     *             "height": "0.00",
     *             "length": "0.00",
     *             "weight": "0.00",
     *             "createdDate": "2024-08-03T05:49:35.000Z",
     *             "keywords": "~Mens Top Wear~,~attractive~",
     *             "isSimplified": 1,
     *             "attributeKeyword": "",
     *             "image": "",
     *             "containerName": "",
     *             "price": "1222.00",
     *             "modifiedPrice": "1222.00",
     *             "productDiscount": "",
     *             "productSpecial": "",
     *             "vendorCategory": [
     *                 {
     *                     "productId": 1782,
     *                     "categoryId": 6,
     *                     "categoryName": "Mens Top Wear"
     *                 }
     *             ],
     *             "pricerefer": "",
     *             "flag": "",
     *             "earnings": ""
     *         },
     *             "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product
     * @apiErrorExample {json} vendorProductList error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized(['vendor', 'list-product'])
    public async vendorProductList(
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('status') status: string,
        @QueryParam('keyword') keyword: string,
        @QueryParam('price') price: string,
        @QueryParam('approvalFlag') approvalFlag: string,
        @QueryParam('productName') productName: string,
        @QueryParam('vendorName') vendorName: string,
        @QueryParam('updatedOn') updatedOn: string,
        @QueryParam('sortBy') sortBy: string,
        @QueryParam('sortOrder') sortOrder: string,
        @QueryParam('count') count: number,
        @QueryParam('sku') sku: string,
        @Req() request: any,
        @Res() response: any): Promise<any> {
        const selects = [
            'VendorProducts.vendorProductId as vendorProductId',
            'VendorProducts.vendorProductCommission as vendorProductCommission',
            'VendorProducts.quotationAvailable as quotationAvailable',
            'VendorProducts.approvalFlag as approvalFlag',
            'VendorProducts.rejectReason as rejectReason',
            'vendor.vendorId as vendorId',
            'product.productId as productId',
            'product.name as name',
            'product.sku as sku',
            'product.skuId as skuId',
            'product.price as productprice',
            'product.quantity as quantity',
            'customer.firstName as vendorName',
            'product.sortOrder as sortOrder',
            'product.isActive as isActive',
            'product.taxType as taxType',
            'product.taxValue as taxValue',
            'product.productSlug as productSlug',
            'product.width as width',
            'product.height as height',
            'product.length as length',
            'product.weight as weight',
            'VendorProducts.createdDate as createdDate',
            'VendorProducts.modifiedDate as modifiedDate',
            'product.keywords as keywords',
            'product.isSimplified as isSimplified',
            'product.isSpecification as isSpecification',
            'product.attributeKeyword as attributeKeyword',
            // 'IF(product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `product`.`tax_value` LIMIT 1), product.taxValue)  as taxValue',
            '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as image',
            '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
            '(SELECT sku.sku_name as sku FROM sku WHERE sku.id = skuId) as sku',
            '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
            '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as modifiedPrice',
            '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
            'ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
            '(SELECT price FROM product_special ps WHERE ps.product_id = product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial'];

        const relations = [
            {
                tableName: 'VendorProducts.product',
                aliasName: 'product',
            },
            {
                tableName: 'VendorProducts.vendor',
                aliasName: 'vendor',
            },
            {
                tableName: 'vendor.customer',
                aliasName: 'customer',
            },
        ];
        const whereConditions = [];
        if (status && status !== '') {
            whereConditions.push({
                name: 'product.isActive',
                op: 'and',
                value: +status,
            });
        }
        if (approvalFlag && approvalFlag !== '') {
            whereConditions.push({
                name: 'VendorProducts.approvalFlag',
                op: 'and',
                value: +approvalFlag,
            });
        }
        whereConditions.push(
            {
                name: 'vendor.vendorId',
                op: 'and',
                value: request.user.tenantId,
            },
            {
                name: 'VendorProducts.reuse',
                op: 'IS NULL',
                value: '',
            }
        );
        const searchConditions = [];
        const having = [];
        if (keyword) {
            searchConditions.push({
                name: ['product.keywords', 'product.name', 'customer.first_name'],
                value: keyword.toLowerCase(),
            });
        } else if (!keyword) {
            if (productName?.trim()) {
                searchConditions.push({
                    name: ['product.name'],
                    value: productName.toLowerCase(),
                });
            }
            if (vendorName?.trim()) {
                searchConditions.push({
                    name: ['customer.first_name'],
                    value: vendorName.toLowerCase(),
                });
            }
            if (sku?.trim()) {
                searchConditions.push({
                    name: ['product.sku'],
                    value: sku.toLowerCase(),
                });
            }
            if (updatedOn?.trim()) {
                searchConditions.push({
                    name: ['VendorProducts.modifiedDate'],
                    value: updatedOn,
                });
            }
            if (price) {
                // whereConditions.push({
                //     name: 'product.price',
                //     op: 'and',
                //     value: price,
                // });
            }
            if (price) {
                having.push({
                    name: 'price',
                    op: 'where',
                    value: price,
                }, {
                    name: 'productSpecial',
                    op: 'or',
                    value: price,
                });
            }
        }
        const sort = [];
        if (sortBy === 'productName') {
            sort.push({
                name: 'product.name',
                order: sortOrder ?? 'DESC',
            });
        }
        if (sortBy === 'stock') {
            sort.push({
                name: 'product.quantity',
                order: sortOrder ?? 'DESC',
            });
        }
        if (sortBy === 'sku') {
            sort.push({
                name: 'product.sku',
                order: sortOrder ?? 'DESC',
            });
        }
        if (sortBy === 'modifiedDate') {
            sort.push({
                name: 'VendorProducts.modifiedDate',
                order: sortOrder ?? 'DESC',
            });
        }
        if (sortBy === 'createdDate' || !sortBy || sortBy === 'orderId') {
            sort.push({
                name: 'VendorProducts.createdDate',
                order: 'DESC',
            });
        }

        if (count) {
            const vendorProductListCount: any = await this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereConditions, searchConditions, relations, [], sort, true, true);
            return {
                status: 1,
                message: 'Successfully got Vendor Product count.',
                data: vendorProductListCount,
            };
        }
        const vendorProductListData: any = await this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereConditions, searchConditions, relations, [], sort, false, true, having);

        // const varientSku: any = await this.productVarientOptionService.find({});

        // const allPricing: any = await this.vendorPriceGroupDetailService.find({
        //     relations: ['vendorPriceGroup', 'skuDetail'],
        // });

        const productList = vendorProductListData.map(async (value: any) => {
            const temp: any = value;
            const categories = await this.productToCategoryService.findAll({
                select: ['categoryId', 'productId'],
                where: { productId: value.productId },
            }).then((val) => {
                const category = val.map(async (values: any) => {
                    const categoryNames: any = await this.categoryService.findOne({ where: { categoryId: values.categoryId } });
                    const tempp: any = values;
                    if (categoryNames) {
                        tempp.categoryName = categoryNames.name;
                    } else {
                        tempp.categoryName = '';
                    }
                    return tempp;
                });
                const result = Promise.all(category);
                return result;
            });
            temp.vendorCategory = categories;
            if (value.productSpecial !== null) {
                temp.pricerefer = value.productSpecial;
                temp.flag = 1;
            } else if (value.productDiscount !== null) {
                temp.pricerefer = value.productDiscount;
                temp.flag = 0;
            } else {
                temp.pricerefer = '';
                temp.flag = '';
            }
            const orderProduct = await this.orderProductService.getOrderEarnings(value.productId);
            if (orderProduct) {
                temp.earnings = orderProduct.productPriceTotal;
            } else {
                temp.earnings = '';
            }

            // if (pluginModule.includes('ProductPriceGroup') && await this.vendorPluginService.findOne({ where: { vendorId: request.user.tenantId, plugins: { slugName: 'product-price-group', pluginStatus: 1 } }, relations: ['plugins'] })) {
            //     if (value.isSimplified === 0) {
            //         const varientSkuFilter: any = varientSku.filter((variantSku) => variantSku.productId === value.productId).map((skuVal) => skuVal.skuId);
            //         temp.productPricing = allPricing.filter((item) => +varientSkuFilter.includes(+item.skuId));
            //     } else {
            //         const pricing = await this.vendorPriceGroupDetailService.find({ where: { skuId: value.skuId }, relations: ['vendorPriceGroup'] });
            //         temp.productPricing = pricing;
            //     }
            // }
            return temp;
        });

        const results = await Promise.all(productList);

        return {
            status: 1,
            message: 'Successfully got your product list.',
            data: results,
        };
    }

    // Delete Product API
    /**
     * @api {Delete} /api/vendor-product/delete-product/:id Delete Single Product API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "id" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted your product.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/:id
     * @apiErrorExample {json} productDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized(['vendor', 'delete-product'])
    public async deleteProduct(@Param('id') productid: number, @Res() response: any, @Req() request: any): Promise<Product> {
        // Remove's Hook if in Memory
        hooks.removeHook('coupon-delete', 'CD1-namespace');
        // --
        // Coupon Plugin
        function couponPlugin(productId: any, type: any): any {
            if (pluginModule.includes('Coupon')) {
                hooks.addHook('coupon-delete', 'CD1-namespace', async () => {
                    const importPath = '../../../../add-ons/Coupon/coupon';
                    const Coupon = await require(importPath);
                    return await Coupon.CouponProccess(productId, type);
                });
                return true;
            }
            return false;
        }
        // ---

        const product = await this.productService.findOne({ where: { productId: productid } });
        if (!product) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        const orderProductId = await this.orderProductService.findOne({ where: { productId: productid } });
        if (orderProductId) {
            const errorResponse: any = {
                status: 0,
                message: 'That product is ordered',
            };
            return response.status(400).send(errorResponse);
        }
        await this.skuService.delete({ id: product.skuId });
        const deleteProduct = await this.productService.delete(productid);
        const pluginExist = await couponPlugin(productid, 1);
        if (pluginExist) {
            await hooks.runHook('coupon-delete');
        }
        if (deleteProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted your product',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete your product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Vendor Category List by Group API
    /**
     * @api {Get} /api/vendor-product/vendor-category-list Vendor Category List API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Boolean} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got the vendor category list.",
     *      "data":{
     *       "vendorId" : "",
     *       "vendorCategoryId" : "",
     *       "categoryId" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/vendor-category-list
     * @apiErrorExample {json} Vendor category error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/vendor-category-list')
    @Authorized(['vendor', 'list-product'])
    public async vendorCategoryListbyGroup(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: boolean, @Req() request: any, @Res() response?: any): Promise<any> {

        // const findvendor = await this.vendorService.findOne({ where: { vendorId } });

        const select = [
            'CategoryPath.categoryId as categoryId',
            'category.sortOrder as sortOrder',
            'category.parentInt as parentInt',
            'category.name as categoryName',
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
            // {
            //     tableName: 'category.vendorGroupCategory',
            //     aliasName: 'vendorGroupCategory',
            // },
        ];
        const groupBy = [
            {
                name: 'CategoryPath.category_id',
            },
        ];

        const whereConditions = [
            {
                name: 'category.tenant_id',
                op: 'and',
                value: request.user.tenantId,
            },
            {
                name: 'category.is_active',
                op: 'and',
                value: 1,
            },
        ];
        const searchConditions = [];

        // whereConditions.push({
        //     name: 'vendorGroupCategory.vendor_group_id',
        //     op: 'and',
        //     value: findvendor.vendorGroupId,
        // });

        const sort = [
            {
                name: 'category.category_id',
                order: 'ASC',
            },
        ];
        // sort.push({
        //     name: 'vendorGroupCategory.category_id',
        //     order: 'ASC',
        // });
        const vendorCategoryList: any = await this.categoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the vendor category list',
            data: vendorCategoryList,
        };
        return response.status(200).send(successResponse);
    }
    // Inventory Product List API
    /**
     * @api {Get} /api/vendor-product/inventory-vendor-product-list Inventory Product List API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} sku sku
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} price=1/2 if 1->asc 2->desc
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully got the complete product list.",
     *      "data":"[{
     *               "vendorProductId": 875,
     *               "approvalFlag": 0,
     *               "vendorId": 10,
     *               "productId": 1782,
     *               "name": "attractive",
     *               "sku": "12",
     *               "productprice": "1222.00",
     *               "quantity": 12,
     *               "sortOrder": 1,
     *               "isActive": 0,
     *               "productSlug": "attractive",
     *               "hasStock": 1,
     *               "hasTirePrice": 0,
     *               "outOfStockThreshold": "",
     *               "notifyMinQuantity": "",
     *               "minQuantityAllowedCart": "",
     *               "maxQuantityAllowedCart": "",
     *               "enableBackOrders": "",
     *               "modifiedDate": "",
     *               "isSimplified": 1,
     *               "skuId": 3339,
     *               "createdDate": "2024-08-03T05:49:35.000Z",
     *               "keywords": "~Mens Top Wear~,~attractive~",
     *               "image": "1000_F_581192928_KgFAFEa4pmRm0mjFuESvYzjY0MXs2TIi.jpg",
     *               "containerName": "",
     *               "attributeKeyword": "",
     *               "skuValue": [
     *                 {
     *                   "createdBy": "",
     *                   "createdDate": "2024-08-03T05:49:35.000Z",
     *                   "modifiedBy": "",
     *                   "modifiedDate": "2024-08-03T06:00:19.000Z",
     *                   "id": 3339,
     *                   "skuName": "12",
     *                   "price": "1222.00",
     *                   "quantity": 12,
     *                   "isActive": 1,
     *                   "outOfStockThreshold": "",
     *                   "notifyMinQuantity": "",
     *                   "minQuantityAllowedCart": 1,
     *                   "maxQuantityAllowedCart": 5,
     *                   "enableBackOrders": "",
     *                   "vendorId": ""
     *                 }]
     *             },"
     * }
     * @apiSampleRequest /api/vendor-product/inventory-vendor-product-list
     * @apiErrorExample {json} Inventory Vendor ProductList error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/inventory-vendor-product-list')
    @Authorized(['vendor', 'stock-list'])
    public async inventoryVendorProductList(
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('keyword') keyword: string,
        @QueryParam('sku') sku: string,
        @QueryParam('status') status: string,
        @QueryParam('updatedDate') updatedDate: string,
        @QueryParam('productName') productName: string,
        @QueryParam('price') price: string,
        @QueryParam('count') count: number | boolean,
        @Req() request: any, @Res() response: any): Promise<Product> {

        const vendorId = request.user.tenantId;
        const selects = [
            'VendorProducts.vendorProductId as vendorProductId',
            'VendorProducts.approvalFlag as approvalFlag',
            'VendorProducts.vendorId as vendorId',
            'product.productId as productId',
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
            'product.isSpecification as isSpecification',
            'product.skuId as skuId',
            'VendorProducts.createdDate as createdDate',
            'VendorProducts.modifiedDate as modifiedDate',
            'product.keywords as keywords',
            '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as image',
            '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
            'product.attributeKeyword as attributeKeyword',
        ];
        const relations = [
            {
                tableName: 'VendorProducts.product',
                aliasName: 'product',
            },
        ];
        const whereConditions = [
            {
                name: 'product.isSimplified',
                op: 'and',
                value: 1,
            },
            {
                name: 'VendorProducts.vendorId',
                op: 'and',
                value: vendorId,
            },
        ];
        if (status) {
            whereConditions.push({
                name: 'product.isActive',
                op: 'and',
                value: status,
            });
        }

        if (price && price !== '') {
            whereConditions.push({
                name: 'product.price',
                op: 'and',
                value: price,
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

        if (updatedDate) {
            searchConditions.push({
                name: ['VendorProducts.modifiedDate'],
                value: updatedDate,
            });
        }

        const sort = [
            {
                name: 'VendorProducts.createdDate',
                order: 'DESC',
            },
        ];
        if (count) {
            const vendorProductListCount: any = await this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereConditions, searchConditions, relations, [], sort, true, true);
            const sucResponse: any = {
                status: 1,
                message: 'Successfully got seller product list.',
                data: vendorProductListCount,
            };
            return response.status(200).send(sucResponse);
        }
        const vendorProductLists: any = await this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereConditions, searchConditions, relations, [], sort, false, true);
        const promise = vendorProductLists.map(async (result: any) => {
            let skuValue = undefined;
            skuValue = await this.skuService.findAll({ where: { id: result.skuId } });
            const temp: any = result;
            temp.skuValue = skuValue;
            return temp;
        });
        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete product list',
            data: value,
        };
        return response.status(200).send(successResponse);
    }
    // Download sample zip for vendor product import
    /**
     * @api {Get} /api/vendor-product/download-product-sample Download Vendor Product Import Sample Zip
     * @apiGroup Vendor Product
     * @apiSampleRequest /api/vendor-product/download-product-sample
     * @apiErrorExample {json} Download Data error
     * HTTP/1.1 500 Internal Server Error
     */
    @Authorized(['vendor', 'standard-import'])
    @Get('/download-product-sample')
    public async downloadSample(@Res() response: any, @Req() request: any): Promise<any> {
        // const excel = require('exceljs');
        // const productWorkbook = new excel.Workbook();
        // const productWorksheet = productWorkbook.addWorksheet('product List');
        // const products = [];
        // productWorksheet.columns = [
        //     { header: 'productId', key: 'id', size: 16, width: 15 },
        //     { header: 'ProductName', key: 'first_name', size: 16, width: 150 },
        // ];
        // productWorksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        // productWorksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        // const product = await this.productService.find({
        //     where: {
        //         vendorProducts: {
        //             vendorId: request.user.tenantId,
        //         },
        //     }, select: ['productId', 'name'], relations: ['vendorProducts'],
        // });
        // for (const prod of product) {
        //     products.push([prod.productId, prod.name]);
        // }
        // products.push(['If you want to map multiple related Product to product,you have to give relatedProductId splitted with commas (,) ']);
        // productWorksheet.addRows(products);
        // const productFileName = './demo/Productlist.xlsx';
        // await productWorkbook.xlsx.writeFile(productFileName);
        const zipfolder = require('zip-a-folder');
        await zipfolder.zip(path.join(process.cwd(), 'demo'), path.join(process.cwd(), 'demo.zip'));
        const file = path.basename('/demo.zip');
        return new Promise(() => {
            response.download(file, 'demo.zip');
        });
    }

    public async validate_slug($slug: string, $id: number = 0, $count: number = 0): Promise<string> {
        const slugCount = await this.productService.checkSlug($slug, $id, $count);
        if (slugCount) {
            if (!$count) {
                $count = 1;
            } else {
                $count++;
            }
            return await this.validate_slug($slug, $id, $count);
        } else {
            if ($count > 0) {
                $slug = $slug + $count;
            }
            return $slug;
        }
    }

    // Adding Status for vendors product  API
    /**
     * @api {Put} /api/vendor-product/product-status/:id Add Vendor Product Status API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} id id
     * @apiParam (Request body) {number} status either should be 1 or 0
     * @apiParamExample {json} Input
     * {
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Product status updated successfully.",
     *      "status": "1",
     *      "data": {
     *            }
     * }
     * @apiSampleRequest /api/vendor-product/product-status/:id
     * @apiErrorExample {json} AddProductStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/product-status/:id')
    @Authorized(['vendor', 'edit-product'])
    public async addProductStatus(@Param('id') id: number, @BodyParam('status') status: number, @Req() request: any, @Res() response: any): Promise<any> {

        const product = await this.productService.findOne({
            where: {
                productId: id,
            },
        });
        if (!product) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }

        product.isActive = status;
        const vendorProductSave = await this.productService.create(product);
        if (vendorProductSave) {
            const successResponse: any = {
                status: 1,
                message: 'Product status updated successfully.',
                data: vendorProductSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update product status.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // update stock  API
    /**
     * @api {Post} /api/vendor-product/update-stock Update Stock API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} productId productId
     * @apiParam (Request body) {number} hasStock send 0 or 1
     * @apiParam (Request body) {object} productStock
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
     *      "message": "Successfully updated stock .",
     *      "status": "1",
     *      "data": {
     *          }
     * }
     * @apiSampleRequest /api/vendor-product/update-stock
     * @apiErrorExample {json} stock error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/update-stock')
    @Authorized(['vendor', 'update-stock'])
    public async manageStock(@Body({ validate: true }) updateStock: UpdateStockRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const product = await this.productService.findOne({
            where: {
                productId: updateStock.productId,
            },
        });
        if (!product) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        const vendorProduct = await this.vendorProductService.findOne({
            where: {
                productId: updateStock.productId,
                vendorId: request.user.tenantId,
            },
        });
        if (!vendorProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid product for this seller',
            };
            return response.status(400).send(errorResponse);
        }
        product.hasStock = updateStock.hasStock;
        const productValue = await this.productService.create(product);
        const productStock = updateStock.productStock;
        const valArr: any = [];
        for (const value of productStock) {
            const sku = await this.skuService.findOne({
                where: {
                    id: value.skuId,
                },
            });
            if (!sku) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid skuId',
                };
                return response.status(400).send(errorResponse);
            }
            sku.outOfStockThreshold = value.outOfStockThreshold ? value.outOfStockThreshold : sku.outOfStockThreshold;
            sku.notifyMinQuantity = value.notifyMinQuantity ? value.notifyMinQuantity : sku.notifyMinQuantity;
            sku.minQuantityAllowedCart = value.minQuantityAllowedCart ? value.minQuantityAllowedCart : sku.minQuantityAllowedCart;
            sku.maxQuantityAllowedCart = value.maxQuantityAllowedCart ? value.maxQuantityAllowedCart : sku.maxQuantityAllowedCart;
            sku.enableBackOrders = value.enableBackOrders ? value.enableBackOrders : sku.enableBackOrders;
            sku.backOrderStockLimit = value.backOrderStockLimit ? value.backOrderStockLimit : sku.backOrderStockLimit;
            valArr.push(sku);
        }
        await this.skuService.create(valArr);
        if (productValue) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated stock',
                data: productValue,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update',
            };
            return response.status(400).send(errorResponse);
        }
    }

    /**
     * @api {get} /api/vendor-product/allproduct-excel-list Export All Products (Excel)
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization Bearer token
     * @apiPermission vendor
     *
     * @apiDescription
     * This API exports all products of the vendor into an Excel file.
     * The exported file includes:
     * - Product Details
     * - Special Price List
     * - Discount Price List
     * - Product Images
     * - Related Categories
     *
     * You can also get only the count of products using the `count` query parameter.
     *
     * @apiQuery {String} [dateFrom] Filter products created after this date (format: YYYY-MM-DD)
     * @apiQuery {String} [dateTo] Filter products created before this date (format: YYYY-MM-DD)
     * @apiQuery {Number=1,2} [productType] Filter by product type (1 = Simple, 2 = Specification)
     * @apiQuery {String} [title] Export title used for export logs
     * @apiQuery {Boolean} [count=false] If true, API returns only product count instead of Excel
     *
     * @apiSuccessExample {json} Success (Count Only)
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully got the seller product count",
     *   "data": 52
     * }
     *
     * @apiSuccessExample {binary} Success (Excel File Download)
     * HTTP/1.1 200 OK
     * Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
     * Content-Disposition: attachment; filename="ProductExcel_167845921.xlsx"
     *
     * (binary excel content)
     *
     * @apiErrorExample {json} No Products Found
     * HTTP/1.1 400 Bad Request
     * {
     *   "status": 0,
     *   "message": "Products are empty"
     * }
     *
     * @apiErrorExample {json} Server Error
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Something went wrong.",
     *   "error": "Error details here"
     * }
     *
     * @apiSampleRequest /api/vendor-product/allproduct-excel-list
     */
    @Get('/allproduct-excel-list')
    @Authorized('vendor')
    public async ExportAllProducts(@QueryParam('dateFrom') dateFrom: string, @QueryParam('dateTo') dateTo: string, @QueryParam('productType') productType: number, @QueryParam('title') title: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('All Product Excel');
        const rows = [];
        const dataId = await this.vendorProductService.find({ where: { vendorId: request.user.tenantId } });
        if (!dataId.length) {
            const errorResponse: any = {
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
        const vendorId = request.user.tenantId;
        const selects = [
            'vendor.vendorId as vendorId',
            'product.productId as productId',
            'product.name as name',
            'product.sku as sku',
            'product.upc as upc',
            'product.price as productPrice',
            'product.quantity as quantity',
            'product.description as description',
            'product.sortOrder as sortOrder',
            'product.isActive as isActive',
            'product.rating as rating',
            'product.productSlug as productSlug',
            'product.isSpecification as isSpecification',
            'VendorProducts.createdDate as createdDate',
            'product.keywords as keywords',
            'product.minimumQuantity as minimumQuantity',
            'product.subtractStock as subtractStock',
        ];
        const relations = [
            {
                tableName: 'VendorProducts.product',
                aliasName: 'product',
            },
            {
                tableName: 'VendorProducts.vendor',
                aliasName: 'vendor',
            },
        ];
        const whereConditions: any = [
            {
                name: 'vendor.vendorId',
                op: 'and',
                value: vendorId,
            },
        ];

        // DATE RANGE FILTER
        if (dateFrom && dateTo) {
            whereConditions.push({
                name: 'DATE(`VendorProducts`.`created_date`)',
                op: 'raw',
                sign: '>=',
                value: dateFrom,
            });
            whereConditions.push({
                name: 'DATE(`VendorProducts`.`created_date`)',
                op: 'raw',
                sign: '<=',
                value: dateTo,
            });
        } else if (dateFrom) {
            whereConditions.push({
                name: 'DATE(`VendorProducts`.`created_date`)',
                op: 'raw',
                sign: '>=',
                value: dateFrom,
            });
        } else if (dateTo) {
            whereConditions.push({
                name: 'DATE(`VendorProducts`.`created_date`)',
                op: 'raw',
                sign: '<=',
                value: dateTo,
            });
        }
        if (productType === 1) {
            // Simple Product
            whereConditions.push({
                name: 'product.isSpecification',
                op: 'and',
                value: 0,
            });
        }
        if (productType === 2) {
            // Specification Product
            whereConditions.push({
                name: 'product.isSpecification',
                op: 'and',
                value: 1,
            });
        }
        const sort = [
            {
                name: 'VendorProducts.createdDate',
                order: 'DESC',
            },
        ];
        if (count) {
            const vendorProductCount: any = await this.vendorProductService.listByQueryBuilder(0, 0, selects, whereConditions, [], relations, [], sort, true, true);
            return response.status(200).send({ status: 1, message: 'Successfully got the seller product count', data: vendorProductCount });
        }
        const vendorProductLists: any = await this.vendorProductService.listByQueryBuilder(0, 0, selects, whereConditions, [], relations, [], sort, false, true);
        const productIds = vendorProductLists.map((p) => p.productId);
        for (const products of vendorProductLists) {
            const productDescription = products.description;
            const dataDescription = productDescription?.replace(/(&nbsp;|(<([^>]+)>))/ig, '') ?? '';
            rows.push([products.productId, products.name, dataDescription.trim(), products.productPrice, products.sku, products.upc, products.quantity, products.minimumQuantity, products.subtractStock, products.rating, products.isActive]);
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
        const selectSpecial = ['VendorProducts.vendorProductId as vendorProductId',
            'vendor.vendorId as vendorId',
            'product.productId as productId',
            'product.name as name',
            'productSpecial.productSpecialId as productSpecialId',
            'productSpecial.priority as priority',
            'productSpecial.price as price',
            'productSpecial.dateStart as dateStart',
            'productSpecial.dateEnd as dateEnd',
        ];
        const whereConditionSpecial = [];
        const relationsSpecial = [];
        const groupBySpecial = [];
        relationsSpecial.push({
            tableName: 'VendorProducts.product',
            op: 'inner',
            aliasName: 'product',
        }, {
            tableName: 'VendorProducts.vendor',
            op: 'inner',
            aliasName: 'vendor',
        }, {
            tableName: 'product.productSpecial',
            op: 'inner',
            aliasName: 'productSpecial',
        });
        whereConditionSpecial.push({
            name: 'vendor.vendorId',
            op: 'and',
            value: vendorId,
        });

        // DATE RANGE FILTER
        if (dateFrom && dateTo) {
            whereConditionSpecial.push({
                name: '`VendorProducts`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: dateFrom,
            });
            whereConditionSpecial.push({
                name: '`VendorProducts`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: dateTo,
            });
        } else if (dateFrom) {
            whereConditionSpecial.push({
                name: '`VendorProducts`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: dateFrom,
            });
        } else if (dateTo) {
            whereConditionSpecial.push({
                name: '`VendorProducts`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: dateTo,
            });
        }
        if (productType === 1) {
            // Simple Product
            whereConditionSpecial.push({
                name: 'product.isSpecification',
                op: 'and',
                value: 0,
            });
        }
        if (productType === 2) {
            // Specification Product
            whereConditionSpecial.push({
                name: 'product.isSpecification',
                op: 'and',
                value: 1,
            });
        }
        const SearchConditionsSpecial = [];
        const specialSort = [];
        sort.push({
            name: 'VendorProducts.createdDate',
            order: 'DESC',
        });
        const vendorProductSpecialList: any = await this.vendorProductService.listByQueryBuilder(0, 0, selectSpecial, whereConditionSpecial, SearchConditionsSpecial, relationsSpecial, groupBySpecial, specialSort, false, true);
        for (const specialPrice of vendorProductSpecialList) {
            special.push([specialPrice.productSpecialId, specialPrice.productId, specialPrice.name, specialPrice.priority, specialPrice.price, specialPrice.dateStart, specialPrice.dateEnd]);
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
        const selectDiscount = ['VendorProducts.vendorProductId as vendorProductId',
            'vendor.vendorId as vendorId',
            'product.productId as productId',
            'product.name as name',
            'productDiscount.productDiscountId as productDiscountId',
            'productDiscount.priority as priority',
            'productDiscount.price as price',
            'productDiscount.dateStart as dateStart',
            'productDiscount.dateEnd as dateEnd',
        ];
        const whereConditionDiscount = [];
        const relationsDiscount = [];
        const groupByDiscount = [];
        relationsDiscount.push({
            tableName: 'VendorProducts.product',
            op: 'inner',
            aliasName: 'product',
        }, {
            tableName: 'VendorProducts.vendor',
            op: 'inner',
            aliasName: 'vendor',
        }, {
            tableName: 'product.productDiscount',
            op: 'inner',
            aliasName: 'productDiscount',
        });
        whereConditionDiscount.push({
            name: 'vendor.vendorId',
            op: 'and',
            value: vendorId,
        });
        // DATE RANGE FILTER
        if (dateFrom && dateTo) {
            whereConditionDiscount.push({
                name: '`VendorProducts`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: dateFrom,
            });
            whereConditionDiscount.push({
                name: '`VendorProducts`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: dateTo,
            });
        } else if (dateFrom) {
            whereConditionDiscount.push({
                name: '`VendorProducts`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: dateFrom,
            });
        } else if (dateTo) {
            whereConditionDiscount.push({
                name: '`VendorProducts`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: dateTo,
            });
        }
        if (productType === 1) {
            // Simple Product
            whereConditionDiscount.push({
                name: 'product.isSpecification',
                op: 'and',
                value: 0,
            });
        }
        if (productType === 2) {
            // Specification Product
            whereConditionDiscount.push({
                name: 'product.isSpecification',
                op: 'and',
                value: 1,
            });
        }
        const SearchConditionsDiscount = [];
        const discountSort = [];
        sort.push({
            name: 'VendorProducts.createdDate',
            order: 'DESC',
        });
        const vendorProductDiscountList: any = await this.vendorProductService.listByQueryBuilder(0, 0, selectDiscount, whereConditionDiscount, SearchConditionsDiscount, relationsDiscount, groupByDiscount, discountSort, false, true);
        for (const discountPrice of vendorProductDiscountList) {
            discount.push([discountPrice.productDiscountId, discountPrice.productId, discountPrice.name, discountPrice.priority, discountPrice.price, discountPrice.dateStart, discountPrice.dateEnd]);
        }
        // Add all rows data in sheet
        worksheet2.addRows(discount);
        const worksheet3 = workbook.addWorksheet('Images');
        worksheet3.columns = [
            { header: 'product Id', key: 'productId', size: 16, width: 15 },
            { header: 'product Name', key: 'productName', size: 16, width: 30 },
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
        const selectImages = [
            'product.productId as productId',
            'product.name as productName',
            'productImage.containerName as imagePath',
            'productImage.image as image',
            'productImage.defaultImage as defaultImage',
        ];
        const whereConditionsImages = [];
        const relationsImages = [];
        const groupByImages = [];
        relationsImages.push(
            {
                tableName: 'VendorProducts.product',
                op: 'inner',
                aliasName: 'product',
            },
            {
                tableName: 'VendorProducts.vendor',
                op: 'inner',
                aliasName: 'vendor',
            },
            {
                tableName: 'product.productImage',
                op: 'inner',
                aliasName: 'productImage',
            });
        whereConditionsImages.push({
            name: 'vendor.vendorId',
            op: 'and',
            value: vendorId,
        });
        // DATE RANGE FILTER
        if (dateFrom && dateTo) {
            whereConditionsImages.push({
                name: '`VendorProducts`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: dateFrom,
            });
            whereConditionsImages.push({
                name: '`VendorProducts`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: dateTo,
            });
        } else if (dateFrom) {
            whereConditionsImages.push({
                name: '`VendorProducts`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: dateFrom,
            });
        } else if (dateTo) {
            whereConditionsImages.push({
                name: '`VendorProducts`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: dateTo,
            });
        }
        if (productType === 1) {
            // Simple Product
            whereConditionsImages.push({
                name: 'product.isSpecification',
                op: 'and',
                value: 0,
            });
        }
        if (productType === 2) {
            // Specification Product
            whereConditionsImages.push({
                name: 'product.isSpecification',
                op: 'and',
                value: 1,
            });
        }
        const sortImages = [];
        const searchConditionsImages = [];
        sort.push({
            name: 'VendorProducts.createdDate',
            order: 'DESC',
        });
        const vendorProductImagesList = await this.vendorProductService.listByQueryBuilder(0, 0, selectImages, whereConditionsImages, searchConditionsImages, relationsImages, groupByImages, sortImages, false, true);
        for (const image of vendorProductImagesList) {
            productimage.push([image.productId, image.productName, image.imagePath, image.image, image.defaultImage]);
        }
        // // Add all rows data in sheet
        worksheet3.addRows(productimage);
        const worksheet4 = workbook.addWorksheet('Related Category');
        worksheet4.columns = [
            { header: 'product Id', key: 'productId', size: 16, width: 15 },
            { header: 'Category Id', key: 'categoryId', size: 16, width: 15 },
            { header: 'Category Name', key: 'CategoryName', size: 16, width: 30 },
        ];
        worksheet4.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet4.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet4.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const relatedCategory = [];
        const selectRelatedCategory = [
            'product.productId as productId',
            'category.categoryId as categoryId',
            'category.name as name',
        ];
        const whereConditionsRelatedCategory = [];
        const relationsRelatedCategory = [];
        const groupByRelatedCategory = [];
        relationsRelatedCategory.push({
            tableName: 'VendorProducts.product',
            op: 'inner',
            aliasName: 'product',
        },
            {
                tableName: 'VendorProducts.vendor',
                op: 'inner',
                aliasName: 'vendor',
            },
            {
                tableName: 'product.productToCategory',
                op: 'inner',
                aliasName: 'productToCategory',
            },
            {
                tableName: 'productToCategory.category',
                op: 'inner',
                aliasName: 'category',
            }
        );
        whereConditionsRelatedCategory.push({
            name: 'vendor.vendorId',
            op: 'and',
            value: vendorId,
        });
        // DATE RANGE FILTER
        if (dateFrom && dateTo) {
            whereConditionsRelatedCategory.push({
                name: '`VendorProducts`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: dateFrom,
            });
            whereConditionsRelatedCategory.push({
                name: '`VendorProducts`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: dateTo,
            });
        } else if (dateFrom) {
            whereConditionsRelatedCategory.push({
                name: '`VendorProducts`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: dateFrom,
            });
        } else if (dateTo) {
            whereConditionsRelatedCategory.push({
                name: '`VendorProducts`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: dateTo,
            });
        }
        if (productType === 1) {
            // Simple Product
            whereConditionsRelatedCategory.push({
                name: 'product.isSpecification',
                op: 'and',
                value: 0,
            });
        }
        if (productType === 2) {
            // Specification Product
            whereConditionsRelatedCategory.push({
                name: 'product.isSpecification',
                op: 'and',
                value: 1,
            });
        }
        const sortRelatedCategory = [];
        const searchConditionsRelatedCategory = [];
        sort.push({
            name: 'VendorProducts.createdDate',
            order: 'DESC',
        });
        const categories = await this.vendorProductService.listByQueryBuilder(0, 0, selectRelatedCategory, whereConditionsRelatedCategory, searchConditionsRelatedCategory, relationsRelatedCategory, groupByRelatedCategory, sortRelatedCategory, false, true);
        for (const category of categories) {
            relatedCategory.push([category.productId, category.categoryId, category.name]);
        }
        // Add all rows data in sheet
        worksheet4.addRows(relatedCategory);

        const fileName = './ProductExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);

        const newExportLog = new ExportLog();
        newExportLog.module = 'Manage Products';
        newExportLog.title = title;
        newExportLog.productType = productType;
        newExportLog.exportId = await this.exportLogService.generateExportId(request.user.tenantId, 'Manage Products');
        newExportLog.recordAvailable = vendorProductLists.length;
        newExportLog.tenantId = request.user.tenantId;
        newExportLog.createdBy = request.user.id;
        newExportLog.referenceType = 2;
        newExportLog.recordIds = productIds.join(',');
        await this.exportLogService.create(newExportLog);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
            });
        });
    }

    // ExportSelectedLog
    /**
     * @api {Get} /api/vendor-product/product-excel-list/:logId Export Selected Product Log
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization Vendor JWT Token
     * @apiParam (Path) {Number} logId Export log table ID that contains selected product IDs.
     *
     * @apiDescription
     * This API exports detailed Excel sheets for specific products recorded in the export log table.
     * The Excel file includes:
     * - Main product details
     * - Special price list
     * - Discount price list
     * - Product images
     * - Related categories
     *
     * Each section is generated based on the product IDs stored in the export log entry.
     *
     * @apiSampleRequest /api/vendor-product/product-excel-list/1
     *
     * @apiSuccessExample {file} Success-Response:
     * HTTP/1.1 200 OK
     * Excel file will be downloaded containing:
     * [
     *   "All Product Excel",
     *   "special price",
     *   "discount price",
     *   "Images",
     *   "Related Category"
     * ]
     *
     * @apiErrorExample {json} Export Selected Product Excel error
     * HTTP/1.1 400 Bad Request
     * {
     *   "status": 0,
     *   "message": "No product IDs found in export log."
     * }
     */
    @Get('/product-excel-list/:logId')
    @Authorized('vendor')
    public async exportSelectedProducts(
        @Param('logId') logId: number,
        @Req() request: any,
        @Res() response: any
    ): Promise<any> {
        const excel = require('exceljs');
        // tslint:disable-next-line:no-shadowed-variable
        const fs = require('fs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('All Product Excel');
        const rows = [];

        const exportLog = await this.exportLogService.findOne({
            where: { id: logId, tenantId: request.user.tenantId, module: 'Manage Products' },
        });

        if (!exportLog || !exportLog.recordIds) {
            return response.status(400).send({
                status: 0,
                message: 'No product IDs found in export log.',
            });
        }

        const productIds = exportLog.recordIds.split(',').map((id) => Number(id));
        if (!productIds.length) {
            return response.status(400).send({
                status: 0,
                message: 'No valid product IDs to export.',
            });
        }

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
            { header: 'Rating', key: 'Rating', size: 16, width: 15 },
            { header: 'Related Products', key: 'relatedProducts', size: 16, width: 15 },
            { header: 'IsActive', key: 'isActive', size: 16, width: 15 },
        ];

        worksheet.getRow(1).eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
        });

        const vendorId = request.user.tenantId;

        // Main Product Sheet Data
        const selects = [
            'vendor.vendorId as vendorId',
            'product.productId as productId',
            'product.name as name',
            'product.sku as sku',
            'product.upc as upc',
            'product.price as productPrice',
            'product.quantity as quantity',
            'product.description as description',
            'product.sortOrder as sortOrder',
            'product.isActive as isActive',
            'product.rating as rating',
            'product.minimumQuantity as minimumQuantity',
            'product.subtractStock as subtractStock',
        ];

        const relations = [
            { tableName: 'VendorProducts.product', aliasName: 'product' },
            { tableName: 'VendorProducts.vendor', aliasName: 'vendor' },
        ];

        const whereConditions = [
            { name: 'vendor.vendorId', op: 'and', value: vendorId },
            { name: 'product.productId', op: 'IN', value: productIds },
        ];

        const sort = [{ name: 'VendorProducts.createdDate', order: 'DESC' }];

        const vendorProductLists: any = await this.vendorProductService.listByQueryBuilder(
            0,
            0,
            selects,
            whereConditions,
            [],
            relations,
            [],
            sort,
            false,
            true
        );

        for (const products of vendorProductLists) {
            const description = products.description?.replace(/(&nbsp;|(<([^>]+)>))/gi, '') ?? '';
            rows.push([
                products.productId,
                products.name,
                description.trim(),
                products.productPrice,
                products.sku,
                products.upc,
                products.quantity,
                products.minimumQuantity,
                products.subtractStock,
                products.rating,
                products.isActive,
            ]);
        }
        worksheet.addRows(rows);

        // Special Price Sheet
        const worksheet1 = workbook.addWorksheet('special price');
        worksheet1.columns = [
            { header: 'product Special Id', key: 'productSpecialId', width: 30 },
            { header: 'product Id', key: 'productId', width: 15 },
            { header: 'product Name', key: 'productName', width: 15 },
            { header: 'priority', key: 'priority', width: 15 },
            { header: 'price', key: 'price', width: 30 },
            { header: 'start date', key: 'startDate', width: 15 },
            { header: 'end date', key: 'endDate', width: 15 },
        ];

        worksheet1.getRow(1).eachCell((cell) => {
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });

        const selectSpecial = [
            'product.productId as productId',
            'product.name as name',
            'productSpecial.productSpecialId as productSpecialId',
            'productSpecial.priority as priority',
            'productSpecial.price as price',
            'productSpecial.dateStart as dateStart',
            'productSpecial.dateEnd as dateEnd',
        ];

        const relationsSpecial = [
            { tableName: 'VendorProducts.product', aliasName: 'product' },
            { tableName: 'VendorProducts.vendor', aliasName: 'vendor' },
            { tableName: 'product.productSpecial', aliasName: 'productSpecial' },
        ];

        const whereConditionSpecial = [
            { name: 'vendor.vendorId', op: 'and', value: vendorId },
            { name: 'product.productId', op: 'IN', value: productIds },
        ];

        const vendorProductSpecialList = await this.vendorProductService.listByQueryBuilder(
            0,
            0,
            selectSpecial,
            whereConditionSpecial,
            [],
            relationsSpecial,
            [],
            sort,
            false,
            true
        );
        worksheet1.addRows(
            vendorProductSpecialList.map((s) => [
                s.productSpecialId,
                s.productId,
                s.name,
                s.priority,
                s.price,
                s.dateStart,
                s.dateEnd,
            ])
        );

        //  Discount Price Sheet
        const worksheet2 = workbook.addWorksheet('discount price');
        worksheet2.columns = [
            { header: 'product Discount Id', key: 'productDiscountId', width: 30 },
            { header: 'product Id', key: 'productId', width: 15 },
            { header: 'product name', key: 'productName', width: 30 },
            { header: 'priority', key: 'priority', width: 15 },
            { header: 'price', key: 'price', width: 30 },
            { header: 'start date', key: 'startDate', width: 15 },
            { header: 'end date', key: 'endDate', width: 15 },
        ];
        worksheet2.getRow(1).eachCell((cell) => {
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });

        const selectDiscount = [
            'product.productId as productId',
            'product.name as name',
            'productDiscount.productDiscountId as productDiscountId',
            'productDiscount.priority as priority',
            'productDiscount.price as price',
            'productDiscount.dateStart as dateStart',
            'productDiscount.dateEnd as dateEnd',
        ];
        const relationsDiscount = [
            { tableName: 'VendorProducts.product', aliasName: 'product' },
            { tableName: 'VendorProducts.vendor', aliasName: 'vendor' },
            { tableName: 'product.productDiscount', aliasName: 'productDiscount' },
        ];
        const whereConditionDiscount = [
            { name: 'vendor.vendorId', op: 'and', value: vendorId },
            { name: 'product.productId', op: 'IN', value: productIds },
        ];

        const vendorProductDiscountList = await this.vendorProductService.listByQueryBuilder(
            0,
            0,
            selectDiscount,
            whereConditionDiscount,
            [],
            relationsDiscount,
            [],
            sort,
            false,
            true
        );
        worksheet2.addRows(
            vendorProductDiscountList.map((d) => [
                d.productDiscountId,
                d.productId,
                d.name,
                d.priority,
                d.price,
                d.dateStart,
                d.dateEnd,
            ])
        );

        // Images Sheet
        const worksheet3 = workbook.addWorksheet('Images');
        worksheet3.columns = [
            { header: 'product Id', key: 'productId', width: 15 },
            { header: 'product Name', key: 'productName', width: 30 },
            { header: 'Image Path', key: 'imagePath', width: 15 },
            { header: 'Image', key: 'image', width: 30 },
            { header: 'Default Image', key: 'defaultImage', width: 30 },
        ];
        worksheet3.getRow(1).eachCell((cell) => {
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });

        const selectImages = [
            'product.productId as productId',
            'product.name as productName',
            'productImage.containerName as imagePath',
            'productImage.image as image',
            'productImage.defaultImage as defaultImage',
        ];
        const relationsImages = [
            { tableName: 'VendorProducts.product', aliasName: 'product' },
            { tableName: 'VendorProducts.vendor', aliasName: 'vendor' },
            { tableName: 'product.productImage', aliasName: 'productImage' },
        ];
        const whereConditionsImages = [
            { name: 'vendor.vendorId', op: 'and', value: vendorId },
            { name: 'product.productId', op: 'IN', value: productIds },
        ];

        const vendorProductImagesList = await this.vendorProductService.listByQueryBuilder(
            0,
            0,
            selectImages,
            whereConditionsImages,
            [],
            relationsImages,
            [],
            sort,
            false,
            true
        );
        worksheet3.addRows(
            vendorProductImagesList.map((i) => [
                i.productId,
                i.productName,
                i.imagePath,
                i.image,
                i.defaultImage,
            ])
        );

        // Related Category Sheet
        const worksheet4 = workbook.addWorksheet('Related Category');
        worksheet4.columns = [
            { header: 'product Id', key: 'productId', width: 15 },
            { header: 'Category Id', key: 'categoryId', width: 15 },
            { header: 'Category Name', key: 'CategoryName', width: 30 },
        ];
        worksheet4.getRow(1).eachCell((cell) => {
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });

        const selectRelatedCategory = [
            'product.productId as productId',
            'category.categoryId as categoryId',
            'category.name as name',
        ];
        const relationsRelatedCategory = [
            { tableName: 'VendorProducts.product', aliasName: 'product' },
            { tableName: 'VendorProducts.vendor', aliasName: 'vendor' },
            { tableName: 'product.productToCategory', aliasName: 'productToCategory' },
            { tableName: 'productToCategory.category', aliasName: 'category' },
        ];
        const whereConditionsRelatedCategory = [
            { name: 'vendor.vendorId', op: 'and', value: vendorId },
            { name: 'product.productId', op: 'IN', value: productIds },
        ];

        const categories = await this.vendorProductService.listByQueryBuilder(
            0,
            0,
            selectRelatedCategory,
            whereConditionsRelatedCategory,
            [],
            relationsRelatedCategory,
            [],
            sort,
            false,
            true
        );
        worksheet4.addRows(categories.map((c) => [c.productId, c.categoryId, c.name]));

        const fileName = './ProductExcelDetails_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);

        return new Promise((resolve, reject) => {
            response.download(fileName, (err) => {
                fs.unlinkSync(fileName);
                if (err) {
                    reject(err);
                } else {
                    response.end();
                }
            });
        });
    }

    // Vendor Product Sku Detail API
    /**
     * @api {Get} /api/vendor-product/sku/:skuId Sku Detail Api
     * @apiGroup Vendor Product
     * @apiParam (Request body) {String} skuId skuId
     * @apiSampleRequest /api/vendor-product/sku/:skuId
     * @apiErrorExample {json} Vendor Product Sku Error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/sku/:skuId')
    @Authorized('vendor')
    public async inventoryVendorProductDetail(
        @Res() response: any,
        @Param('skuId') skuId: number
    ): Promise<any> {

        const sku = await this.skuService.findOne({ where: { id: skuId } });

        if (!sku) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid Sku Id..!',
            });
        }

        return response.status(200).send({
            status: 1,
            message: 'Successfully got Sku detail..!',
            data: sku,
        });
    }
    // Vendor Product Detail API
    /**
     * @api {Get} /api/vendor-product/:id Vendor Product Detail API
     * @apiGroup  Vendor Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Successfully get product Detail",
     *      "data": {
     *               "createdDate": "2024-08-03T05:49:35.000Z",
     *               "productId": 1782,
     *               "sku": "12",
     *               "upc": "1",
     *               "hsn": "",
     *               "location": null,
     *               "quantity": 12,
     *               "minimumQuantity": null,
     *               "subtractStock": null,
     *               "stockStatusId": 1,
     *               "quotationAvailable": 0,
     *               "image": null,
     *               "imagePath": null,
     *               "manufacturerId": null,
     *               "shipping": null,
     *               "serviceCharges": "{\"productCost\":1222,\"packingCost\":0,\"shippingCost\":0,\"tax\":0,\"others\":0}",
     *               "taxType": 1,
     *               "taxValue": 12,
     *               "price": "1222.00",
     *               "priceUpdateFileLogId": null,
     *               "dateAvailable": "2024-08-03T00:00:00.000Z",
     *               "sortOrder": 1,
     *               "name": "attractive",
     *               "description": "&lt;p&gt;Provide a detailed description of your product‚ highlighting its unique features‚ benefits‚ and specifications. This helps potential buyers make informed purchasing decisions and enhances your product&amp;quotes;s appeal.&lt;/p&gt;&lt;p&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;Paragraph&lt;/p&gt;&lt;p&gt;&amp;nbsp;&lt;/p&gt;",
     *               "amount": null,
     *               "keywords": "~Mens Top Wear~,~attractive~",
     *               "discount": null,
     *               "deleteFlag": 0,
     *               "isFeatured": null,
     *               "todayDeals": null,
     *               "condition": null,
     *               "rating": null,
     *               "wishListStatus": null,
     *               "productSlug": "attractive",
     *               "isActive": 0,
     *               "width": "0.00",
     *               "height": "0.00",
     *               "length": "0.00",
     *               "weight": "0.00",
     *               "hasStock": 1,
     *               "priceType": 1,
     *               "isSimplified": 1,
     *               "owner": 2,
     *               "isCommon": 0,
     *               "skuId": 3339,
     *               "hasTirePrice": 0,
     *               "outOfStockThreshold": null,
     *               "notifyMinQuantity": null,
     *               "minQuantityAllowedCart": null,
     *               "maxQuantityAllowedCart": null,
     *               "enableBackOrders": null,
     *               "pincodeBasedDelivery": 0,
     *               "attributeKeyword": null,
     *               "settedAsCommonOn": null,
     *               "productHighlights": [
     *                 {
     *                   "data": ""
     *                 }
     *               ],
     *               "productCost": 1222,
     *               "packingCost": 0,
     *               "shippingCost": 0,
     *               "tax": 0,
     *               "others": 0,
     *               "approvalflag": 0,
     *               "vendorId": 10,
     *               "vendorName": "Marcello",
     *               "productImage": [
     *                 {
     *                   "productId": 1782,
     *                   "image": "1000_F_581192928_KgFAFEa4pmRm0mjFuESvYzjY0MXs2TIi.jpg",
     *                   "containerName": "",
     *                   "sortOrder": 1,
     *                   "defaultImage": 1
     *                 }
     *               ],
     *               "productVideo": {
     *                 "id": 3107,
     *                 "productId": 1782,
     *                 "name": "",
     *                 "path": "",
     *                 "type": 1
     *               },
     *               "Category": [
     *                 {
     *                   "createdBy": null,
     *                   "createdDate": null,
     *                   "modifiedBy": null,
     *                   "modifiedDate": "2024-05-17T12:46:35.000Z",
     *                   "categoryId": 6,
     *                   "name": "Mens Top Wear",
     *                   "image": "Img_1715949995235.png",
     *                   "imagePath": "category/",
     *                   "parentInt": 304,
     *                   "sortOrder": 1,
     *                   "categorySlug": "mens-top-wear11111111111",
     *                   "isActive": "1",
     *                   "categoryDescription": "&lt;p&gt;Men&amp;&#35;39;s shirts come in many different varieties. Depending on the event&amp;sbquo; types of shirts for men could be&amp;nbsp;&lt;strong&gt;an Oxford&amp;sbquo; a dress shirt&amp;sbquo; a flannel&amp;sbquo; a henley or a polo&lt;/strong&gt;.&lt;/p&gt;\n",
     *                   "levels": "Mens Top  Wear > Mens Top Wear"
     *                 }
     *               ],
     *               "productSpecialPrice": [],
     *               "productTirePrices": [],
     *               "productDiscountData": []
     * }
     * @apiSampleRequest /api/vendor-product/:id
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/:id')
    @Authorized(['vendor', 'list-product'])
    public async vendorProductDetail(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {
        const vendorProductDetail = await this.vendorProductService.find({ where: { productId: id, vendorId: request.user.tenantId } });
        if (vendorProductDetail.length === 0) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        const productDetail: any = await this.productService.findOne({
            where: { productId: id },
        });
        const productDetails: any = instanceToPlain(productDetail);
        const specialCharges = productDetails.serviceCharges;
        if (specialCharges) {
            const specialCharge = JSON.parse(productDetails.serviceCharges);
            productDetails.productCost = specialCharge.productCost;
            productDetails.packingCost = specialCharge.packingCost;
            productDetails.shippingCost = specialCharge.shippingCost;
            productDetails.tax = specialCharge.tax;
            productDetails.others = specialCharge.others;
        }
        productDetail.description = productDetail.description.replace(/"/g, `'`);
        const productSku = await this.skuService.findOne({ where: { id: productDetails.skuId } });
        productDetails.quantity = productSku ? productSku.quantity : productDetails.quantity;
        const vendorProduct = await this.vendorProductService.findOne({
            select: ['vendorId', 'productId', 'approvalFlag', 'rejectReason'],
            where: { productId: id },
        });
        const vendor = await this.vendorService.findOne({
            select: ['customerId'],
            where: { vendorId: vendorProduct.vendorId },
        });
        const customer = await this.customerService.findOne({
            select: ['firstName'],
            where: { id: vendor.customerId },
        });
        productDetails.approvalflag = vendorProduct.approvalFlag;
        productDetails.vendorId = vendorProduct.vendorId;
        productDetails.vendorName = customer.firstName;
        productDetails.rejectReason = vendorProduct.rejectReason;
        productDetails.productImage = await this.productImageService.findAll({
            select: ['productId', 'image', 'containerName', 'defaultImage', 'sortOrder'],
            where: {
                productId: id,
            },
            order: {
                sortOrder: 'ASC',
            },
        });
        productDetails.productVideo = await this.productVideoService.findOne({
            select: ['id', 'name', 'path', 'type', 'productId'],
            where: { productId: productDetail.productId },
        });
        productDetails.Category = await this.productToCategoryService.findAll({
            select: ['categoryId', 'productId'],
            where: { productId: id },
        }).then((val) => {
            const category = val.map(async (value: any) => {
                const categoryValue = await this.categoryService.findOne({ where: { categoryId: value.categoryId } });
                const categoryLevel = await this.categoryPathService.findCategoryLevel(categoryValue.categorySlug, request.user.tenantId);
                categoryValue.levels = categoryLevel.levels;
                const temp: any = categoryValue;
                return temp;
            });
            const results = Promise.all(category);
            return results;
        });
        productDetails.productSpecialPrice = await this.productSpecialService.findAll({
            select: ['productSpecialId', 'priority', 'price', 'dateStart', 'dateEnd', 'skuId'],
            where: { productId: id },
            order: {
                priority: 'ASC',
            },
        }).then((val) => {
            const special = val.map(async (value: any) => {
                const skuNames = await this.skuService.findOne({ where: { id: value.skuId } });
                const temp: any = value;
                if (skuNames) {
                    temp.skuName = skuNames.skuName;
                } else {
                    temp.skuName = '';
                }
                return temp;
            });
            const results = Promise.all(special);
            return results;
        });

        // Product tire price
        productDetails.productTirePrices = await this.productTirePriceService.findAll({
            select: ['id', 'quantity', 'price', 'skuId'],
            where: { productId: productDetail.productId },
        }).then((val) => {
            const tirePrice = val.map(async (value: any) => {
                const tireSkuNames = await this.skuService.findOne({ where: { id: value.skuId } });
                const temp: any = value;
                if (tireSkuNames) {
                    temp.skuName = tireSkuNames.skuName;
                } else {
                    temp.skuName = '';
                }
                return temp;
            });
            const results = Promise.all(tirePrice);
            return results;
        });
        productDetails.productDiscountData = await this.productDiscountService.findAll({
            select: ['productDiscountId', 'quantity', 'priority', 'price', 'dateStart', 'dateEnd', 'skuId'],
            where: { productId: id },
            order: {
                priority: 'ASC',
            },
        }).then((val) => {
            const discount = val.map(async (value: any) => {
                const discountSkuNames = await this.skuService.findOne({ where: { id: value.skuId } });
                const temp: any = value;
                if (discountSkuNames) {
                    temp.skuName = discountSkuNames.skuName;
                } else {
                    temp.skuName = '';
                }
                return temp;
            });
            const results = Promise.all(discount);
            return results;
        });

        if (pluginModule.includes('ProductPriceGroup') && await this.vendorPluginService.findOne({ where: { vendorId: request.user.tenantId, plugins: { slugName: 'product-price-group', pluginStatus: 1 } }, relations: ['plugins'] })) {
            if (productDetail.isSimplified === 0) {
                // const varientSku = await this.productVarientOptionService.findAll({ where: { productId: productDetail.productId } });
                // const skuIds = varientSku.map((sku) => sku.skuId);
                // const pricing = await this.vendorPriceGroupDetailService.find({
                //     select: ['id', 'createdDate', 'maxQuantity', 'price', 'unitId', 'isDefault'],
                //     where: { skuId: In(skuIds) },
                //     relations: ['vendorPriceGroup', 'skuDetail'],
                // });
                // productDetails.productPricing = pricing;
            } else {
                // const pricing = await this.vendorPriceGroupDetailService.find({
                //     select: ['id', 'createdDate', 'maxQuantity', 'price', 'unitId', 'isDefault'],
                //     where: { skuId: productDetail.skuId },
                //     relations: ['vendorPriceGroup'],
                // });
                // productDetails.productPricing = pricing;
            }
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully get productDetail',
            data: productDetails,
        };
        return response.status(200).send(successResponse);
    }
}
