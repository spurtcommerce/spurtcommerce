/*
 * spurtcommerce API
 * version 4.8.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Get,
    JsonController,
    Authorized,
    QueryParam,
    Res,
    Body,
    Req,
    Post,
    Param,
    Put, Delete, BodyParam
} from 'routing-controllers';
import { ProductService } from '../../core/services/ProductService';
import { ProductToCategoryService } from '../../core/services/ProductToCategoryService';
import { ProductImageService } from '../../core/services/ProductImageService';
import { Product } from '../../core/models/ProductModel';
import { ProductDiscount } from '../../core/models/ProductDiscount';
import { ProductSpecial } from '../../core/models/ProductSpecial';
import { classToPlain } from 'class-transformer';
import { DeleteProductRequest } from './requests/DeleteProductRequest';
import { AddProductRequest } from './requests/CreateProductRequest';
import { UpdateProductRequest } from './requests/UpdateProductRequest';
import { ProductToCategory } from '../../core/models/ProductToCategory';
import { ProductImage } from '../../core/models/ProductImage';
import { CategoryService } from '../../core/services/CategoryService';
import { OrderProductService } from '../../core/services/OrderProductService';
import { OrderService } from '../../core/services/OrderService';
import { ProductViewLogService } from '../../core/services/ProductViewLogService';
import { ProductDiscountService } from '../../core/services/ProductDiscountService';
import { ProductSpecialService } from '../../core/services/ProductSpecialService';
import moment = require('moment');
import { CustomerService } from '../../core/services/CustomerService';
import fs = require('fs');
import { TaxService } from '../../core/services/TaxService';
import { PaymentService } from '../../core/services/PaymentService';
import { ImageService } from '../../core/services/ImageService';
import { CategoryPathService } from '../../core/services/CategoryPathService';
import { SkuService } from '../../core/services/SkuService';
import { Sku } from '../../core/models/SkuModel';
import { ProductVideoService } from '../../core/services/ProductVideoService';
import { ProductVideo } from '../../core/models/ProductVideo';
import { CustomerCartService } from '../../core/services/CustomerCartService';

@JsonController('/product')
export class ProductController {
    constructor(
        private productService: ProductService,
        private productToCategoryService: ProductToCategoryService,
        private productImageService: ProductImageService,
        private categoryService: CategoryService,
        private orderProductService: OrderProductService,
        private orderService: OrderService,
        private productViewLogService: ProductViewLogService,
        private productDiscountService: ProductDiscountService,
        private productSpecialService: ProductSpecialService,
        private customerService: CustomerService,
        private taxService: TaxService,
        private paymentService: PaymentService,
        private categoryPathService: CategoryPathService,
        private skuService: SkuService,
        private productVideoService: ProductVideoService,
        private imageService: ImageService,
        private customerCartService: CustomerCartService
    ) {
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
    @Get()
    @Authorized()
    public async productList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sku') sku: string, @QueryParam('status') status: string, @QueryParam('price') price: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<Product> {
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
        if (status) {
            WhereConditions.push({
                name: 'Product.isActive',
                op: 'and',
                value: status,
            });
        }
        const searchConditions = [];
        if (keyword !== '') {
            searchConditions.push(
                {
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
        } else if (+price && price === 2) {
            sort.push({
                name: 'Product.price',
                order: 'DESC',
            });
        } else {
            sort.push({
                name: 'Product.createdDate',
                order: 'DESC',
            });
        }
        const productLists: any = await this.productService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relations, [], sort, false, true);
        if (count) {
            const productListCount: any = await this.productService.listByQueryBuilder(limit, offset, select, WhereConditions, [], relations, [], sort, true, true);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got product lists count.',
                data: productListCount,
            });
        }
        const productList = productLists.map(async (value: any) => {
            const temp: any = value;
            const date = moment(value.dateAvailable).format('YYYY-MM-DD');
            const currentDate = moment().format('YYYY-MM-DD');
            if (currentDate >= date && value.isActive === 1) {
                temp.globe = 1;
            } else {
                temp.globe = 0;
            }
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
            return temp;
        });
        const results = await Promise.all(productList);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete product list.',
            data: classToPlain(results),
        };
        return response.status(200).send(successResponse);
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
     * @apiParam (Request body) {Number} [requiredShipping] requiredShipping
     * @apiParam (Request body) {String} dateAvailable dateAvailable
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number{..9999}} sortOrder sortOrder
     * @apiParam (Request body) {Number} [quotationAvailable] quotationAvailable
     * @apiParam (Request body) {String} [productSpecial] productSpecial
     * @apiParam (Request body) {String} [productDiscount] productDiscount
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
     *      "requiredShipping" : "",
     *      "dateAvailable" : "",
     *      "status" : "",
     *      "sortOrder" : "",
     *      "quotationAvailable" : "",
     *      "image":[
     *      {
     *      "image":""
     *      "containerName":""
     *      "defaultImage":""
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
    @Post()
    @Authorized(['admin', 'create-product'])
    public async addProduct(@Body({ validate: true }) product: AddProductRequest, @Req() request: any, @Res() response: any): Promise<any> {
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
                message: 'tax should not be in negative',
            };
            return response.status(400).send(errorResponse);
        }
        const newProduct: any = new Product();
        if (+newProduct.price === 0) {
            return response.status(400).send({
                status: 0,
                message: 'It is mandatory to mention price for the product.',
            });
        }
        const productImage: any = product.image;
        if (productImage.length === 0) {
            return response.status(400).send({
                status: 0,
                message: 'You need to upload at least one image for the product.',
            });
        }
        newProduct.name = product.productName;
        newProduct.description = product.productDescription ? await this.imageService.escapeChar(product.productDescription) : '';
        const metaTagTitle = product.productSlug ? product.productSlug : product.productName;
        const slug = metaTagTitle.trim();
        const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        newProduct.productSlug = await this.validate_slug(data);
        newProduct.sku = product.sku;
        newProduct.upc = product.upc;
        newProduct.hsn = product.hsn;
        newProduct.quantity = product.quantity ? product.quantity : 1;
        newProduct.quotationAvailable = product.quotationAvailable ? product.quotationAvailable : 0;

        // different charges
        const serviceCharge: any = {};
        serviceCharge.productCost = product.price;
        serviceCharge.packingCost = product.packingCost ? product.packingCost : 0;
        serviceCharge.shippingCost = product.shippingCost ? product.shippingCost : 0;
        serviceCharge.tax = 0;
        serviceCharge.others = product.others ? product.others : 0;
        newProduct.serviceCharges = JSON.stringify(serviceCharge);
        newProduct.price = serviceCharge.productCost + serviceCharge.packingCost + serviceCharge.shippingCost + serviceCharge.others;
        newProduct.taxType = product.taxType ? product.taxType : 0;
        newProduct.taxValue = product.tax ? product.tax : 0;
        // saving sku
        const findSku = await this.skuService.findOne({ where: { skuName: product.sku } });
        if (findSku) {
            const errorResponse: any = {
                status: 0,
                message: 'Duplicate sku name, give some other name.',
            };
            return response.status(400).send(errorResponse);
        }
        const newSku: any = new Sku();
        newSku.skuName = product.sku;
        newSku.price = newProduct.price;
        newSku.quantity = product.quantity ? product.quantity : 1;
        newSku.isActive = product.status;
        const saveSku = await this.skuService.create(newSku);
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
        // adding category name and product name in keyword field for keyword search
        const row: any = [];
        if (category.length !== 0) {
            for (const categoryId of category) {
                const categoryNames: any = await this.categoryService.findOne({
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
        const saveProduct = await this.productService.create(newProduct);

        // save category
        if (category.length !== 0) {
            for (const categoryId of category) {
                const newProductToCategory: any = new ProductToCategory();
                newProductToCategory.productId = saveProduct.productId;
                newProductToCategory.categoryId = categoryId;
                newProductToCategory.isActive = 1;
                await this.productToCategoryService.create(newProductToCategory);
            }
        }

        // Save products Image
        for (const imageRow of productImage) {
            const imageData = JSON.stringify(imageRow);
            const imageResult = JSON.parse(imageData);
            const newProductImage = new ProductImage();
            newProductImage.productId = saveProduct.productId;
            newProductImage.image = imageResult.image;
            newProductImage.containerName = imageResult.containerName;
            newProductImage.defaultImage = imageResult.defaultImage;
            await this.productImageService.create(newProductImage);
        }

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
        await this.productService.create(saveProduct);
        if (saveProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created Product.',
                data: saveProduct,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create the Product.',
            };
            return response.status(400).send(errorResponse);
        }
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
     * @apiParam (Request body) {Number} [requiredShipping] requiredShipping
     * @apiParam (Request body) {String} [dateAvailable] dateAvailable
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number{..9999}} [sortOrder] sortOrder
     * @apiParam (Request body) {Number} quotationAvailable quotationAvailable
     * @apiParam (Request body) {String} [productSpecial] productSpecial
     * @apiParam (Request body) {String} [productDiscount] productDiscount
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
     *      "upc" : "",
     *      "hsn" : "",
     *      "price" : "",
     *      "packingCost" : "",
     *      "shippingCost" : "",
     *      "tax" : "",
     *      "taxType" : "",
     *      "others" : "",
     *      "requiredShipping" : "",
     *      "dateAvailable" : "",
     *      "status" : "",
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
    @Post('/update-product/:id')
    @Authorized(['admin', 'edit-product'])
    public async updateProduct(@Body({ validate: true }) product: UpdateProductRequest, @Req() request: any, @Res() response: any): Promise<any> {
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
                message: 'tax should not be in negative',
            };
            return response.status(400).send(errorResponse);
        }
        const updateProduct: any = await this.productService.findOne({
            where: {
                productId: product.productId,
            },
        });
        if (!updateProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid product Id.',
            };
            return response.status(400).send(errorResponse);
        }
        const metaTagTitle = product.productSlug ? product.productSlug : product.productName;
        const slug = metaTagTitle.trim();
        const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        updateProduct.productSlug = await this.validate_slug(data, product.productId);
        updateProduct.name = product.productName;
        updateProduct.description = product.productDescription ? await this.imageService.escapeChar(product.productDescription) : '';
        updateProduct.sku = product.sku;
        updateProduct.upc = product.upc;
        updateProduct.hsn = product.hsn;
        updateProduct.quantity = product.quantity ? product.quantity : 1;
        updateProduct.quotationAvailable = product.quotationAvailable ? product.quotationAvailable : 0;

        // special charges
        const serviceCharge: any = {};
        serviceCharge.productCost = product.price;
        serviceCharge.packingCost = product.packingCost ? product.packingCost : 0;
        serviceCharge.shippingCost = product.shippingCost ? product.shippingCost : 0;
        serviceCharge.tax = 0;
        serviceCharge.others = product.others ? product.others : 0;
        updateProduct.serviceCharges = JSON.stringify(serviceCharge);
        updateProduct.price = serviceCharge.productCost + serviceCharge.packingCost + serviceCharge.shippingCost + serviceCharge.others;
        updateProduct.taxType = product.taxType ? product.taxType : 0;
        updateProduct.taxValue = product.tax ? product.tax : 0;
        // saving sku
        let saveSku;
        const findSku = await this.skuService.findOne({ where: { skuName: updateProduct.sku } });
        if (findSku) {
            const finddSku = await this.productService.findSkuName(product.productId, product.sku, 0);
            if (finddSku) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Duplicate sku name.',
                };
                return response.status(400).send(errorResponse);
            } else {
                findSku.skuName = updateProduct.sku;
                findSku.price = updateProduct.price;
                findSku.quantity = product.quantity;
                findSku.isActive = product.status;
                saveSku = await this.skuService.create(findSku);
            }
        } else {
            const newSku: any = new Sku();
            newSku.skuName = updateProduct.sku;
            newSku.price = updateProduct.price;
            newSku.quantity = product.quantity;
            newSku.isActive = product.status;
            saveSku = await this.skuService.create(newSku);
        }
        // ending sku
        updateProduct.skuId = saveSku.id;
        updateProduct.shipping = product.requiredShipping;
        updateProduct.dateAvailable = moment(product.dateAvailable).toISOString();
        updateProduct.isActive = product.status;
        updateProduct.sortOrder = product.sortOrder ? product.sortOrder : 1;
        updateProduct.height = product.height;
        updateProduct.weight = product.weight;
        updateProduct.length = product.length;
        updateProduct.width = product.width;
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
        updateProduct.modifiedBy = request.user.userId;
        const saveProduct = await this.productService.create(updateProduct);

        // delete customerCart
        this.customerCartService.delete({ productId: product.productId });

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
                await this.productImageService.create(newProductImage);
            }
        }

        // Product Discount
        if (product.productDiscount) {
            // Delete the product discount
            this.productDiscountService.delete({ productId: saveProduct.productId });
            const productDiscount: any = product.productDiscount;
            const distArr: any = [];
            for (const discount of productDiscount) {
                const discountData: any = new ProductDiscount();
                discountData.productId = saveProduct.productId;
                discountData.quantity = 1;
                if (saveProduct.price <= discount.discountPrice) {
                    const errorResponse: any = {
                        status: 0,
                        message: 'discount price should be less than original price.',
                    };
                    return response.status(400).send(errorResponse);
                }
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
                        message: 'special price should be less than original price.',
                    };
                    return response.status(400).send(errorResponse);
                }
                specialPriceData.customerGroupId = special.customerGroupId;
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
            await this.productSpecialService.create(splArr);
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
        await this.productService.create(saveProduct);
        if (saveProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the Product.',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the Product.',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Get('/product-detail/:id')
    @Authorized()
    public async productDetail(@Param('id') id: number, @Res() response: any): Promise<any> {
        const productDetail: any = await this.productService.findOne({
            where: { productId: id },
        });
        const productDetails: any = classToPlain(productDetail);
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
            const tax = await this.taxService.findOne({ taxId: productDetails.taxValue });
            let percentToAmount;
            if (tax) {
                percentToAmount = productDetails.price * (tax.taxPercentage / 100);
            } else {
                percentToAmount = 0;
            }
            const val = +productDetails.price + percentToAmount;
            productDetails.priceWithTax = val;
        } else {
            const taxValue = (productDetails.taxValue && productDetails.taxValue > 0) ? productDetails.taxValue : 0;
            const val = +productDetails.price + taxValue;
            productDetails.priceWithTax = val;
        }
        const productSku = await this.skuService.findOne({ id: productDetails.skuId });
        productDetails.quantity = productSku ? productSku.quantity : productDetails.quantity;
        productDetails.productImage = await this.productImageService.findAll({
            select: ['productId', 'image', 'containerName', 'defaultImage'],
            where: {
                productId: productDetail.productId,
            },
        });
        productDetails.Category = await this.productToCategoryService.findAll({
            select: ['categoryId', 'productId'],
            where: { productId: productDetail.productId },
        }).then((val) => {
            const category = val.map(async (value: any) => {
                const categoryValue = await this.categoryService.findOne({ where: { categoryId: value.categoryId } });
                const categoryLevel = await this.categoryPathService.findCategoryLevel(categoryValue.categorySlug);
                categoryValue.levels = categoryLevel.levels;
                const temp: any = categoryValue;
                return temp;
            });
            const results = Promise.all(category);
            return results;
        });
        productDetails.productSpecialPrice = await this.productSpecialService.findAll({
            select: ['productSpecialId', 'priority', 'price', 'dateStart', 'dateEnd', 'skuId'],
            where: { productId: productDetail.productId },
        }).then((val) => {
            const special = val.map(async (value: any) => {
                const skuNames = await this.skuService.findOne({ id: value.skuId });
                const temp: any = value;
                if (skuNames !== undefined) {
                    temp.skuName = skuNames.skuName;
                } else {
                    temp.skuName = '';
                }
                return temp;
            });
            const results = Promise.all(special);
            return results;
        });
        productDetails.productDiscountData = await this.productDiscountService.findAll({
            select: ['productDiscountId', 'quantity', 'priority', 'price', 'dateStart', 'dateEnd', 'skuId'],
            where: { productId: productDetail.productId },
        }).then((val) => {
            const discount = val.map(async (value: any) => {
                const discountSkuNames = await this.skuService.findOne({ id: value.skuId });
                const temp: any = value;
                if (discountSkuNames !== undefined) {
                    temp.skuName = discountSkuNames.skuName;
                } else {
                    temp.skuName = '';
                }
                return temp;
            });
            const results = Promise.all(discount);
            return results;
        });

        productDetails.productVideo = await this.productVideoService.findOne({
            select: ['id', 'name', 'path', 'type', 'productId'],
            where: { productId: productDetail.productId },
        });
        const successResponse: any = {
            status: 1,
            message: 'Successfully get productDetail',
            data: productDetails,
        };
        return response.status(200).send(successResponse);
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
    @Get('/top-selling-productlist')
    @Authorized()
    public async topSellingProductList(@Req() request: any, @Res() response: any): Promise<any> {
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
        const productTopsellingList = await this.orderProductService.listByQueryBuilder(4, 0, select, [], [], relations, groupBy, sort, false, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get Top Selling Product..!',
            data: productTopsellingList,
        };
        return response.status(200).send(successResponse);
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
    @Get('/top-five-repeatedly-purchased-customers')
    @Authorized()
    public async topFiveRepeatedlyPurchasedCustomers(@Req() request: any, @Res() response: any): Promise<any> {
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
        const topFiveRepeatedlyPurchasedCustomer = await this.orderService.listByQueryBuilder(limit, 0, select, whereConditions, [], relations, groupBy, sort, false, true);
        if (topFiveRepeatedlyPurchasedCustomer) {
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the top 5 repeatedly purchased customer..!',
                data: topFiveRepeatedlyPurchasedCustomer,
            });
        }
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
    @Get('/top-performing-products')
    @Authorized()
    public async topPerformingProucts(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @QueryParam('duration') duration: number, @Req() request: any, @Res() response: any): Promise<any> {
        const topPerformingProducts = await this.orderProductService.topPerformingProducts(limit, offset, count, duration);
        if (topPerformingProducts !== '' && topPerformingProducts !== undefined) {
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the top performing product list',
                data: topPerformingProducts,
            });
        } else {
            return response.status(400).send({
                status: 0,
                message: 'Cannot get top performing product list',
            });
        }
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
    @Get('/dashboard/admin-customers-count')
    @Authorized()
    public async dashboardCustomerCount(@QueryParam('duration') duration: number, @Req() request: any, @Res() response: any): Promise<any> {
        const customerCount = await this.customerService.dashboardCustomerCount(duration);
        if (customerCount !== '' && customerCount !== undefined) {
            return response.status(200).send({
                status: 1,
                message: 'Successfully got dashboard customers count',
                data: customerCount,
            });
        }
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
     *      "message": "Successfully get dashboard orders count based on orders",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/dashboard-admin/orders-count
     * @apiErrorExample {json} dashboard orders count list error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/dashboard-admin/orders-count')
    @Authorized()
    public async dashboardOrderCount(@QueryParam('duration') duration: number, @Req() request: any, @Res() response: any): Promise<any> {
        const countOfOrdersAndVendors = await this.orderService.dashboardOrdersCount(duration);
        const count: any = {};
        count.ordersCount = countOfOrdersAndVendors.ordersCount ? countOfOrdersAndVendors.ordersCount : 0;
        return response.status(200).send({
            status: 1,
            message: 'Successfully got dashboard orders count based on orders',
            data: count,
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
    @Get('/dashboard-average-order-value')
    @Authorized()
    public async averageOrderValue(@QueryParam('duration') duration: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderproductstotal = await this.orderProductService.dashboardOrderProductsTotal(duration);
        const orderProductsTotal = orderproductstotal.orderProductsTotal ? orderproductstotal.orderProductsTotal : 0;
        const totalCount = +orderproductstotal.ordersCount;
        const averageOrderValue = totalCount !== 0 ? (+orderProductsTotal) / +totalCount : 0;
        return response.status(200).send({
            status: 0,
            message: 'Successfully got the average order value',
            data: averageOrderValue.toFixed(2),
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
    @Get('/dashboard-total-revenue')
    @Authorized()
    public async dashboardTotalRevenue(@QueryParam('duration') duration: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderProductsTotal = await this.orderProductService.dashboardOrderProductsTotal(duration);
        const orderproductsTotal = orderProductsTotal.orderProductsTotal ? orderProductsTotal.orderProductsTotal : 0;
        const totalRevenue = +orderproductsTotal;
        return response.status(200).send({
            status: 0,
            message: 'Successfully got the total revenue amount',
            data: totalRevenue,
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
    @Get('/dashboard-average-conversion-ratio')
    @Authorized()
    public async averageConversionRatio(@QueryParam('duration') duration: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderscount = await this.orderService.ordersCount(duration);
        const customerscount = await this.customerService.dashboardCustomerCount(duration);
        const averageConversionRatio = +customerscount !== 0 ? (+orderscount / +customerscount * 100) : 0;
        return response.status(200).send({
            status: 1,
            message: 'Successfully got average conversion ratio',
            data: averageConversionRatio.toFixed(2),
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
    @Get('/dashboard/graph-weekly-saleslist')
    @Authorized()
    public async topTenWeeklySales(@QueryParam('productId') productId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const productids = productId.split(',');
        if (!(productids.length <= 3)) {
            return response.status(400).send({
                status: 0,
                message: 'length of productId should be less than or equal to three',
            });
        }
        const orderProductData = await this.productService.findProducts(productids);
        const list = orderProductData.map(async (result: any) => {
            const data: any = await this.orderProductService.topTenWeeklySalesList(result.productId);
            const temp: any = result;
            const weekOfdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const finaldata = [];
            for (const day of weekOfdays) {
                const salesFilter = data.filter((val) => {
                    return val.days === day;
                });
                if (salesFilter.length === 0) {
                    finaldata.push({ value: 0, days: day });
                } else {
                    finaldata.push(salesFilter[0]);
                }
            }
            temp.value = finaldata;
            return temp;
        });
        const weeklysaleslist = await Promise.all(list);
        return response.status(200).send({
            status: 1,
            message: 'Successfully got the top ten weekly sales list',
            data: weeklysaleslist,
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
    @Get('/recent-selling-product')
    @Authorized()
    public async sellingProduct(@Req() request: any, @Res() response: any): Promise<any> {
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
        const recentSellingProductList = await this.orderProductService.listByQueryBuilder(limit, 0, select, whereConditions, [], relations, [], sort, false, true);
        const successResponse: any = {
            status: 1,
            message: 'successfully listed recently selling products..!',
            data: recentSellingProductList,
        };
        return response.status(200).send(successResponse);
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

    @Get('/viewLog-list')
    @Authorized()
    public async productViewLogList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = [];
        const whereConditions = [];
        const search = [];
        const viewLogs = await this.productViewLogService.list(limit, offset, select, search, whereConditions, 0, count);
        if (count) {
            const successresponse: any = {
                status: 1,
                message: 'Successfully got view log count',
                data: viewLogs,
            };
            return response.status(200).send(successresponse);
        } else {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got view log List',
                data: viewLogs,
            };
            return response.status(200).send(successResponse);
        }
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

    @Get('/customerProductView-list/:id')
    @Authorized()
    public async customerProductView(@Param('id') id: number, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = [];
        const whereConditions = [{
            name: 'customerId',
            value: id,
        }];
        const search = [];
        const customerProductview = await this.productViewLogService.list(limit, offset, select, search, whereConditions, 0, count);
        if (count) {
            const successresponse: any = {
                status: 1,
                message: 'Successfully got view log count',
                data: customerProductview,
            };
            return response.status(200).send(successresponse);
        } else {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got view log List',
                data: customerProductview,
            };
            return response.status(200).send(successResponse);
        }
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

    @Get('/product-excel-list')
    @Authorized(['admin', 'export-product'])
    public async excelProductView(@QueryParam('productId') productId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Product Detail Sheet');
        const rows = [];
        const productid = productId.split(',');
        for (const id of productid) {
            const dataId = await this.productService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
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
            const dataId = await this.productService.findOne(id);
            const productDescription = dataId.description;
            const dataDescription = productDescription.replace(/(&nbsp;|(<([^>]+)>))/ig, '');
            rows.push([dataId.productId, dataId.name, dataDescription.trim(), dataId.price, dataId.sku, dataId.upc, dataId.quantity, dataId.minimumQuantity, dataId.subtractStock]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './ProductExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
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

    @Get('/allproduct-excel-list')
    @Authorized(['admin', 'export-product'])
    public async ExportAllProducts(@Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('All Product Excel');
        const rows = [];
        const dataId = await this.productService.findAll();
        if (dataId === undefined) {
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
        const product = await this.productService.findAll();
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
        const specialPrices = await this.productSpecialService.find();
        for (const specialPrice of specialPrices) {
            const productName = await this.productService.findOne({ where: { productId: specialPrice.productId } });
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
        const discountPrices = await this.productDiscountService.find();
        for (const discountPrice of discountPrices) {
            const productName = await this.productService.findOne({ where: { productId: discountPrice.productId } });
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
        const images = await this.productImageService.find();
        for (const image of images) {
            const productName = await this.productService.findOne({ where: { productId: image.productId } });
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
        const categories = await this.productToCategoryService.find();
        for (const category of categories) {
            const categoryName = await this.categoryService.findOne({ where: { categoryId: category.categoryId } });
            relatedCategory.push([category.productId, category.categoryId, categoryName.name]);
        }
        // Add all rows data in sheet
        worksheet6.addRows(relatedCategory);

        const fileName = './ProductExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
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
    @Delete('/:id')
    @Authorized(['admin', 'delete-product'])
    public async deleteProduct(@Param('id') productid: number, @Res() response: any, @Req() request: any): Promise<Product> {
        const product = await this.productService.findOne(productid);
        if (product === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid product Id.',
            };
            return response.status(400).send(errorResponse);
        }
        const orderProductId = await this.orderProductService.productPaymentProcess(productid);
        if (orderProductId) {
            const errorResponse: any = {
                status: 0,
                message: 'Product is already ordered so you cannot delete the product ',
            };
            return response.status(400).send(errorResponse);
        }
        await this.skuService.delete({ id: product.skuId });
        const deleteProduct = await this.productService.delete(productid);
        if (deleteProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the Product.',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the product.',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Post('/delete-product')
    @Authorized()
    public async deleteMultipleProduct(@Body({ validate: true }) productDelete: DeleteProductRequest, @Res() response: any, @Req() request: any): Promise<Product> {
        const productIdNo = productDelete.productId.toString();
        const productid = productIdNo.split(',');
        for (const id of productid) {
            const dataId = await this.productService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please choose a product that you want to delete.',
                };
                return response.status(400).send(errorResponse);
            }
        }
        for (const id of productid) {
            const orderProductId = await this.orderProductService.productPaymentProcess(+id);
            if (orderProductId) {
                const errorResponse: any = {
                    status: 0,
                    message: 'You cannot delete this product as it has been already ordered.',
                };
                return response.status(400).send(errorResponse);
            }
        }
        for (const id of productid) {
            const deleteProductId = parseInt(id, 10);
            const product = await this.productService.findOne(id);
            await this.skuService.delete({ id: product.skuId });
            await this.productService.delete(deleteProductId);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully deleted the Product',
        };
        return response.status(200).send(successResponse);
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
    @Put('/update-product-slug')
    public async updateSlug(@Res() response: any): Promise<Product> {
        const arr: any = [];
        const product = await this.productService.findAll();
        for (const val of product) {
            const metaTagTitle = val.metaTagTitle;
            if (metaTagTitle) {
                const dat = metaTagTitle.replace(/\s+/g, '-').replace(/[&\/\\#@,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                const data = dat.replace(/--/gi, '-');
                const getProductSlug = await this.productService.slug(metaTagTitle);
                if (getProductSlug.length === 0 || getProductSlug === '' || getProductSlug === undefined) {
                    val.productSlug = data;
                } else if (getProductSlug.length === 1 && (metaTagTitle !== getProductSlug[getProductSlug.length - 1].metaTagTitle)) {
                    val.productSlug = data + '-' + 1;
                } else if (getProductSlug.length > 1 && getProductSlug !== undefined && getProductSlug !== '') {
                    const slugVal = getProductSlug[getProductSlug.length - 1];
                    const value = slugVal.productSlug;
                    const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                    const slugNumber = parseInt(getSlugInt, 0);
                    val.productSlug = data + '-' + (slugNumber + 1);
                }
            } else {
                const title = val.name;
                const dat = title.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                const data = dat.replace(/--/gi, '-');
                const getProductSlug = await this.productService.slug(title);
                if (getProductSlug === '' || getProductSlug === undefined || getProductSlug.length === 0) {
                    val.productSlug = data;
                } else if (getProductSlug.length === 1 && (title !== getProductSlug[getProductSlug.length - 1].title)) {
                    val.productSlug = data + '-' + 1;
                } else if (getProductSlug.length > 1 && getProductSlug !== undefined && getProductSlug !== '') {
                    const slugVal = getProductSlug[getProductSlug.length - 1];
                    const value = slugVal.productSlug;
                    const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                    const slugNumber = parseInt(getSlugInt, 0);
                    val.productSlug = data + '-' + (slugNumber + 1);
                }
            }
            arr.push(val);
        }
        await this.productService.create(arr);
        const successResponse: any = {
            status: 1,
            message: 'Successfully updated the product slug.',
        };
        return response.status(200).send(successResponse);
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
    @Get('/dashboard-count')
    @Authorized()
    public async dashboardCount(@Res() response: any): Promise<any> {
        const dashboard: any = {};
        const select = [];
        const searchOrder = [{
            name: 'paymentProcess',
            op: 'where',
            value: 1,
        }];
        const relation = [];
        const WhereConditions = [];
        const search = [];
        const ordersCount = await this.orderService.list(0, 0, select, searchOrder, WhereConditions, relation, 1);
        const paymentsCount = await this.paymentService.list(0, 0, select, search, WhereConditions, 1);
        const productsCount = await this.productService.list(0, 0, select, relation, WhereConditions, search, 0, 1);
        const customerWhereConditions = [{
            name: 'deleteFlag',
            op: 'where',
            value: 0,
        }];
        const customersCount = await this.customerService.list(0, 0, search, customerWhereConditions, 0, 1);
        dashboard.orders = ordersCount;
        dashboard.payments = paymentsCount;
        dashboard.products = productsCount;
        dashboard.customers = customersCount;
        const successResponse: any = {
            status: 1,
            message: 'successfully got the dashboard count.',
            data: dashboard,
        };
        return response.status(200).send(successResponse);
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
    @Get('/dashboard-admin-totalvendor-totalproduct-count')
    @Authorized()
    public async dashboardAdminCount(@Res() response: any): Promise<any> {
        const dashboardAdmin: any = {};
        const select = [];
        const whereConditionsForCustomers = [{
            name: 'deleteFlag',
            value: 0,
        }];
        const search = [];
        const totalCustomerCount = await this.customerService.list(0, 0, search, whereConditionsForCustomers, 0, true);
        const totalProductCount = await this.productService.list(0, 0, select, [], [], search, 0, true);
        dashboardAdmin.customers = totalCustomerCount;
        dashboardAdmin.products = totalProductCount;
        const successResponse: any = {
            status: 1,
            message: 'successfully got the dashboard total product count.',
            data: dashboardAdmin,
        };
        return response.status(200).send(successResponse);
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
    @Get('/product-count')
    @Authorized()
    public async productCount(@Res() response: any): Promise<any> {
        const product: any = {};
        const select = [];
        const search = [];
        const relation = [];
        const WhereConditions = [];
        const allProductCount: any = await this.productService.list(0, 0, select, relation, WhereConditions, search, 0, 1);
        const whereConditionsActive = [
            {
                name: 'isActive',
                op: 'where',
                value: 1,
            },
        ];
        const activeProductCount = await this.productService.list(0, 0, select, relation, whereConditionsActive, search, 0, 1);
        const whereConditionsInActive = [
            {
                name: 'isActive',
                op: 'where',
                value: 0,
            },
        ];
        const inActiveProductCount = await this.productService.list(0, 0, select, relation, whereConditionsInActive, search, 0, 1);
        const allCategoryCount = await this.categoryService.list(0, 0, select, search, WhereConditions, 0, 1);
        product.totalProduct = allProductCount;
        product.activeProduct = activeProductCount;
        product.inActiveProduct = inActiveProductCount;
        product.totalCategory = allCategoryCount;
        const successResponse: any = {
            status: 1,
            message: 'successfully got the product count.',
            data: product,
        };
        return response.status(200).send(successResponse);
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
    @Post('/update-sku')
    @Authorized()
    public async updateOrderProductShippingInformation(@BodyParam('limit') limit: number, @BodyParam('offset') offset: number, @Res() response: any): Promise<any> {
        const products = await this.productService.find({
            take: limit,
            skip: offset,
        });
        for (const product of products) {
            const updateProduct = await this.productService.findOne({ where: { productId: product.productId } });
            let saveSku;
            const findSku = await this.skuService.findOne({ where: { skuName: product.sku } });
            if (findSku) {
                const finddSku = await this.productService.findSkuName(updateProduct.productId, updateProduct.sku, 0);
                if (finddSku) {
                    const errorResponse: any = {
                        status: 0,
                        message: 'Duplicate sku name, give some other name',
                    };
                    return response.status(400).send(errorResponse);
                } else {
                    findSku.skuName = updateProduct.sku;
                    findSku.price = updateProduct.price;
                    findSku.quantity = updateProduct.quantity;
                    findSku.isActive = updateProduct.isActive;
                    saveSku = await this.skuService.create(findSku);
                }
            } else {
                const newSku: any = new Sku();
                newSku.skuName = updateProduct.sku;
                newSku.price = updateProduct.price;
                newSku.quantity = updateProduct.quantity;
                newSku.isActive = updateProduct.isActive;
                saveSku = await this.skuService.create(newSku);
            }
            // ending sku //
            updateProduct.skuId = saveSku.id;
            updateProduct.isSimplified = 1;
            await this.productService.create(updateProduct);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully updated Sku',
        };
        return response.status(200).send(successResponse);
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
    @Get('/update-owner-product-list')
    @Authorized()
    public async updateProductList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<Product> {
        const select = ['productId'];

        const relation = [];

        const WhereConditions = [
        ];
        const productLists: any = await this.productService.list(limit, offset, select, relation, WhereConditions, 0, 0, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got count ',
                data: productLists,
            };
            return response.status(200).send(successRes);
        }
        const promise = productLists.map(async (result: any) => {
            const temp: any = result;
            const product = await this.productService.findOne({ where: { productId: result.productId } });
            product.owner = 1;
            product.createdBy = 80;

            await this.productService.create(product);
            return temp;
        });
        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete product list. ',
            data: value,
        };
        return response.status(200).send(successResponse);
    }
}
