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

    /**
     * @api {post} /api/vendor-product Create Vendor Product
     * @apiGroup Vendor Product
     * @apiName CreateVendorProduct
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiBody {String} productName Product name
     * @apiBody {String} sku Product SKU
     * @apiBody {Number} quantity Available product quantity
     * @apiBody {Number} price Product price
     * @apiBody {String} categoryId Comma-separated category IDs
     * @apiBody {Object[]} [image] Array of product image objects
     * @apiBody {Number} status Active status (1: Active, 0: Inactive)
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully created seller product.",
     *         "data": {
     *             "productId": 1,
     *             "name": "Sample Product",
     *             "sku": "SKU-001"
     *         }
     *     }
     *
     * @apiErrorExample {json} Validation-Error:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Category should not be empty"
     *     }
     *
     * @apiSampleRequest /api/vendor-product
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

    /**
     * @api {put} /api/vendor-product/:id Update Vendor Product
     * @apiGroup Vendor Product
     * @apiName UpdateVendorProduct
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id Product ID
     *
     * @apiBody {String} productName Product name
     * @apiBody {String} sku Product SKU
     * @apiBody {Number} quantity Available product quantity
     * @apiBody {Number} price Product price
     * @apiBody {String} categoryId Comma-separated category IDs
     * @apiBody {Object[]} [image] Array of product image objects
     * @apiBody {Number} status Active status (1: Active, 0: Inactive)
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully updated seller product.",
     *         "data": {
     *             "productId": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Product:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid productId"
     *     }
     *
     * @apiSampleRequest /api/vendor-product/:id
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

    /**
     * @api {get} /api/vendor-product List Vendor Products
     * @apiGroup Vendor Product
     * @apiName VendorProductList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {Number} [limit] Number of records to return
     * @apiQuery {Number} [offset] Pagination offset
     * @apiQuery {String} [status] Product active status
     * @apiQuery {String} [keyword] Keyword search for product
     * @apiQuery {String} [price] Filter by product price
     * @apiQuery {String} [approvalFlag] Filter by approval flag
     * @apiQuery {String} [productName] Filter by product name
     * @apiQuery {String} [vendorName] Filter by vendor name
     * @apiQuery {String} [updatedOn] Filter by updated date
     * @apiQuery {String} [sortBy] Field to sort by
     * @apiQuery {String} [sortOrder] Sort order ('ASC' or 'DESC')
     * @apiQuery {Number} [count] Return count only if 1
     * @apiQuery {String} [sku] Filter by SKU
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got your product list.",
     *         "data": [
     *             {
     *                 "vendorProductId": 1,
     *                 "productId": 1,
     *                 "name": "Sample Product",
     *                 "sku": "SKU-001",
     *                 "price": 100
     *             }
     *         ]
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Internal Server Error"
     *     }
     *
     * @apiSampleRequest /api/vendor-product
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

    /**
     * @api {delete} /api/vendor-product/:id Delete Vendor Product
     * @apiGroup Vendor Product
     * @apiName DeleteVendorProduct
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id Product ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully deleted your product"
     *     }
     *
     * @apiErrorExample {json} Product-Ordered:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "That product is ordered"
     *     }
     *
     * @apiSampleRequest /api/vendor-product/:id
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

    /**
     * @api {get} /api/vendor-product/vendor-category-list List Vendor Categories By Group
     * @apiGroup Vendor Product
     * @apiName VendorCategoryListByGroup
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {Number} [limit] Number of records to return
     * @apiQuery {Number} [offset] Pagination offset
     * @apiQuery {String} [keyword] Keyword search for category
     * @apiQuery {Boolean} [count] Return count only if true
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got the vendor category list",
     *         "data": [
     *             {
     *                 "categoryId": 1,
     *                 "name": "Electronics"
     *             }
     *         ]
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Internal Server Error"
     *     }
     *
     * @apiSampleRequest /api/vendor-product/vendor-category-list
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
    /**
     * @api {get} /api/vendor-product/inventory-vendor-product-list List Vendor Inventory Products
     * @apiGroup Vendor Product
     * @apiName InventoryVendorProductList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {Number} [limit] Number of records to return
     * @apiQuery {Number} [offset] Pagination offset
     * @apiQuery {String} [keyword] Keyword search
     * @apiQuery {String} [sku] Filter by SKU
     * @apiQuery {String} [status] Filter by status
     * @apiQuery {String} [updatedDate] Filter by update date
     * @apiQuery {String} [productName] Filter by product name
     * @apiQuery {String} [price] Filter by price
     * @apiQuery {Number} [count] Return count only if 1
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got seller product list.",
     *         "data": [
     *             {
     *                 "productId": 1,
     *                 "name": "Sample Product",
     *                 "sku": "SKU-001",
     *                 "quantity": 50
     *             }
     *         ]
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Internal Server Error"
     *     }
     *
     * @apiSampleRequest /api/vendor-product/inventory-vendor-product-list
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
    /**
     * @api {get} /api/vendor-product/download-product-sample Download Product Sample File
     * @apiGroup Vendor Product
     * @apiName DownloadVendorProductSample
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiSuccessExample {file} Success-Response:
     *     HTTP/1.1 200 OK
     *     Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Download failed"
     *     }
     *
     * @apiSampleRequest /api/vendor-product/download-product-sample
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

    /**
     * @api {put} /api/vendor-product/product-status/:id Update Vendor Product Status
     * @apiGroup Vendor Product
     * @apiName UpdateVendorProductStatus
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id Product ID
     *
     * @apiBody {Number} status Active status (1: Active, 0: Inactive)
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Product status updated successfully."
     *     }
     *
     * @apiErrorExample {json} Invalid-Product:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid productId"
     *     }
     *
     * @apiSampleRequest /api/vendor-product/product-status/:id
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

    /**
     * @api {post} /api/vendor-product/update-stock Update Vendor Product Stock
     * @apiGroup Vendor Product
     * @apiName UpdateVendorProductStock
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiBody {Number} productId Product ID
     * @apiBody {Number} skuId SKU ID
     * @apiBody {Number} hasStock In-stock quantity
     * @apiBody {Number} [outOfStockThreshold] Out-of-stock notification threshold
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully updated stock"
     *     }
     *
     * @apiErrorExample {json} Invalid-SKU:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid skuId"
     *     }
     *
     * @apiSampleRequest /api/vendor-product/update-stock
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
     * @api {get} /api/vendor-product/allproduct-excel-list Export All Vendor Products Excel
     * @apiGroup Vendor Product
     * @apiName VendorExportAllProductsExcel
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {String} [dateFrom] Filter products from date (YYYY-MM-DD)
     * @apiQuery {String} [dateTo] Filter products to date (YYYY-MM-DD)
     * @apiQuery {Number} [productType] Filter by product type
     * @apiQuery {String} [title] Export title
     * @apiQuery {Number} [count] Return count only if 1
     *
     * @apiSuccessExample {file} Success-Response:
     *     HTTP/1.1 200 OK
     *     Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Products are empty"
     *     }
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

    /**
     * @api {get} /api/vendor-product/product-excel-list/:logId Export Selected Products From Log
     * @apiGroup Vendor Product
     * @apiName VendorExportSelectedProductsExcel
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} logId Export log ID
     *
     * @apiSuccessExample {file} Success-Response:
     *     HTTP/1.1 200 OK
     *     Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
     *
     * @apiErrorExample {json} Not-Found:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "No product IDs found in export log."
     *     }
     *
     * @apiSampleRequest /api/vendor-product/product-excel-list/:logId
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

    /**
     * @api {get} /api/vendor-product/sku/:skuId Get Product SKU Detail
     * @apiGroup Vendor Product
     * @apiName GetVendorProductSkuDetail
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} skuId SKU ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got Sku detail..!",
     *         "data": {
     *             "id": 1,
     *             "skuName": "SKU-001",
     *             "price": 100
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-SKU:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid Sku Id..!"
     *     }
     *
     * @apiSampleRequest /api/vendor-product/sku/:skuId
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
    /**
     * @api {get} /api/vendor-product/:id Get Vendor Product Detail
     * @apiGroup Vendor Product
     * @apiName GetVendorProductDetail
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id Product ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully get productDetail",
     *         "data": {
     *             "productId": 1,
     *             "name": "Sample Product",
     *             "sku": "SKU-001",
     *             "price": 100
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Product:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "invalid productId"
     *     }
     *
     * @apiSampleRequest /api/vendor-product/:id
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
