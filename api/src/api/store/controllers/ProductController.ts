/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, QueryParam, JsonController, Res, Req, Param, UseBefore } from 'routing-controllers';
import { instanceToPlain } from 'class-transformer';
import { ProductToCategoryService } from '../../core/services/ProductToCategoryService';
import { ProductService } from '../../core/services/ProductService';
import { CategoryService } from '../../core/services/CategoryService';
import { ProductImageService } from '../../core/services/ProductImageService';
import { CustomerActivityService } from '../../core/services/CustomerActivityService';
import { ProductViewLog } from '../../core/models/productViewLog';
import { CustomerActivity } from '../../core/models/CustomerActivity';
import { ProductViewLogService } from '../../core/services/ProductViewLogService';
import { CustomerService } from '../../core/services/CustomerService';
import { CategoryPathService } from '../../core/services/CategoryPathService';
import { TaxService } from '../../core/services/TaxService';
import { OrderProductService } from '../../core/services/OrderProductService';
import { SkuService } from '../../core/services/SkuService';
import { ProductVideoService } from '../../core/services/ProductVideoService';
import moment = require('moment');
import { CheckTokenMiddleware } from '../../core/middlewares/checkTokenMiddleware';
@JsonController('/product-store')
export class StoreProductController {
    constructor(
        private productService: ProductService,
        private productToCategoryService: ProductToCategoryService,
        private categoryService: CategoryService,
        private productImageService: ProductImageService,
        private customerService: CustomerService,
        private productViewLogService: ProductViewLogService,
        private customerActivityService: CustomerActivityService,
        private taxService: TaxService,
        private orderProductService: OrderProductService,
        private skuService: SkuService,
        private categoryPathService: CategoryPathService,
        private productVideoService: ProductVideoService
    ) {
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
    @UseBefore(CheckTokenMiddleware)
    @Get('/productdetail/:productslug')
    public async productDetail(@Param('productslug') productslug: string, @QueryParam('categorySlug') categorySlug: string, @Req() request: any, @Res() response: any): Promise<any> {
        const productDetail: any = await this.productService.findOne({
            productSlug: productslug,
            isActive: 1,
        });
        if (!productDetail) {
            const errResponse: any = {
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
        const productDetails: any = instanceToPlain(productDetail);
        if (productDetails.taxType === 2) {
            const tax = await this.taxService.findOne({ taxId: productDetails.taxValue });
            if (tax) {
                productDetails.taxValue = tax.taxPercentage;
            } else {
                productDetails.taxValue = '';
            }
        }
        productDetails.ratingCount = 0;
        productDetails.reviewCount = 'null';
        productDetails.productImage = await this.productImageService.findAll({
            select: ['productId', 'image', 'containerName', 'defaultImage'],
            where: {
                productId: productDetail.productId,
            },
        });
        productDetails.productOriginalImage = productDetails.productImage.slice();
        if (categorySlug) {
            const category = await this.categoryService.findOne({ categorySlug, isActive: 1 });
            if (category) {
                const categoryLevels: any = await this.categoryPathService.find({
                    select: ['level', 'pathId'],
                    where: { categoryId: category.categoryId },
                    order: { level: 'ASC' },
                }).then((values) => {
                    const categories = values.map(async (val: any) => {
                        const categoryData = await this.categoryService.findOne({ categoryId: val.pathId });
                        const tempVal: any = val;
                        tempVal.categoryName = categoryData ? categoryData.name : '';
                        tempVal.categoryId = categoryData ? categoryData.categoryId : '';
                        tempVal.categorySlug = categoryData ? categoryData.categorySlug : '';
                        tempVal.parentInt = categoryData ? categoryData.parentInt : '';
                        tempVal.categoryDescription = categoryData ? categoryData.categoryDescription : '';
                        return tempVal;
                    });
                    const results = Promise.all(categories);
                    return results;
                });
                productDetails.Category = categoryLevels;
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid category',
                };
                return response.status(400).send(errorResponse);
            }
        } else {
            productDetails.Category = await this.productToCategoryService.findAll({
                select: ['categoryId', 'productId'],
                where: { productId: productDetail.productId },
            }).then((val) => {
                const category = val.map(async (value: any) => {
                    const categoryNames = await this.categoryService.findOne({ categoryId: value.categoryId });
                    const temp: any = value;
                    if (categoryNames !== undefined) {
                        temp.categoryName = categoryNames.name;
                        temp.categorySlug = categoryNames.categorySlug;
                    } else {
                        temp.categoryName = '';
                        temp.categorySlug = '';
                    }
                    return temp;
                });
                const results = Promise.all(category);
                return results;
            });
        }
        productDetails.productOption = [];
        productDetails.skuName = '';
        productDetails.skuId = productDetails.skuId ? productDetails.skuId : '';
        productDetails.variantName = '';
        productDetails.variantId = '';
        const skuValue = await this.skuService.findOne({ id: productDetails.skuId });
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
                } else {
                    productDetails.stockStatus = 'inStock';
                }
            } else {
                productDetails.stockStatus = 'inStock';
            }
        }
        productDetails.pricerefer = '';
        productDetails.flag = '';
        if (request.id) {
            let customerId;
            customerId = request.id;
            const orderProduct = await this.orderProductService.buyedCount(productDetail.productId, customerId);
            if (orderProduct.length > 0) {
                productDetails.buyed = 1;
            } else {
                productDetails.buyed = 0;
            }
            const customerDetail = await this.customerService.findOne({ where: { id: customerId } });
            const customerActivity = new CustomerActivity();
            customerActivity.customerId = customerId;
            customerActivity.activityId = 2;
            customerActivity.description = 'productviewed';
            customerActivity.productId = productDetail.productId;
            await this.customerActivityService.create(customerActivity);
            const viewLog: any = new ProductViewLog();
            viewLog.productId = productDetail.productId;
            viewLog.customerId = customerDetail.id;
            viewLog.firstName = customerDetail.firstName;
            viewLog.lastName = customerDetail.lastName;
            viewLog.username = customerDetail.username;
            viewLog.email = customerDetail.email;
            viewLog.mobileNumber = customerDetail.mobileNumber;
            viewLog.address = customerDetail.address;
            await this.productViewLogService.create(viewLog);
        } else {
            productDetails.buyed = 0;
        }
        // product video
        productDetails.productVideo = await this.productVideoService.findOne({
            select: ['id', 'name', 'path', 'type', 'productId'],
            where: { productId: productDetail.productId },
        });
        const successResponse: any = {
            status: 1,
            message: 'Successfully got productDetail',
            data: productDetails,
        };
        return response.status(200).send(successResponse);
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
    @Get('/Get-Category')
    public async getCategory(@QueryParam('CategoryId') CategoryId: number, @Res() response: any): Promise<any> {
        const select = ['categoryId', 'name', 'parentInt', 'sortOrder', 'categorySlug'];
        const search = [];
        const WhereConditions = [{
            name: 'categoryId',
            value: CategoryId,
        }];
        const category: any = await this.categoryService.list(0, 0, select, search, WhereConditions, 0, 0);
        const promise = category.map(async (result: any) => {
            const temp: any = result;
            const categoryLevel: any = await this.categoryPathService.find({
                select: ['level', 'pathId'],
                where: { categoryId: result.categoryId },
                order: { level: 'ASC' },
            }).then((values) => {
                const categories = values.map(async (val: any) => {
                    const categoryNames = await this.categoryService.findOne({ categoryId: val.pathId });
                    const tempVal: any = val;
                    tempVal.categoryName = categoryNames.name;
                    return tempVal;
                });
                const results = Promise.all(categories);
                return results;
            });
            temp.levels = categoryLevel;
            return temp;
        });
        const value = await Promise.all(promise);
        if (category) {
            const successResponse: any = {
                status: 1,
                message: 'successfully got the category. ',
                data: value,
            };
            return response.status(200).send(successResponse);
        }
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

    @Get('/Product-Compare')
    public async productCompare(@QueryParam('productId') productId: string, @QueryParam('data') data: string, @Res() response: any): Promise<any> {
        const productid = productId.split(',');
        if (productid.length === 0) {
            return response.status(200).send({
                status: 1,
                data: [],
            });
        }
        if (productid.length === 1) {
            if (data === '0') {
                const Response: any = {
                    status: 1,
                    message: 'Product added to compare.',
                };
                return response.status(200).send(Response);
            } else {
                const Detail = [];
                const List = await this.productService.findOne({ where: { productId: productid } });
                const defaultValue = await this.productImageService.findOne({
                    where: {
                        productId: List.productId,
                        defaultImage: 1,
                    },
                });
                const temp: any = List;
                temp.ratingCount = 0;
                temp.reviewCount = 'null';
                temp.skuName = '';
                const skuValue = await this.skuService.findOne({ id: List.skuId });
                if (skuValue) {
                    temp.price = skuValue.price;
                    temp.skuName = skuValue.skuName;
                }
                temp.pricerefer = '';
                temp.flag = '';
                if (List.taxType === 2) {
                    const tax = await this.taxService.findOne({ taxId: List.taxValue });
                    if (tax) {
                        temp.taxValue = tax.taxPercentage;
                    } else {
                        temp.taxValue = '';
                    }
                }
                temp.productImage = defaultValue;
                if (List.hasStock === 1) {
                    if (List.quantity <= List.outOfStockThreshold) {
                        temp.stockStatus = 'outOfStock';
                    } else {
                        temp.stockStatus = 'inStock';
                    }
                } else {
                    temp.stockStatus = 'inStock';
                }
                Detail.push(temp);
                const Response: any = {
                    status: 1,
                    message: 'Product Compared Successfully',
                    data: Detail,
                };
                return response.status(200).send(Response);
            }
        } else {
            if (data === '0') {
                const categoryDataDetail = [];
                // product find the which category
                for (const id of productid) {
                    const categoryId = await this.productToCategoryService.findAll({ where: { productId: id } });
                    const categoryDataValue = categoryId.map((item: any) => {
                        return item.categoryId;
                    });
                    categoryDataDetail.push(categoryDataValue);
                }
                let categoryData;
                if (categoryDataDetail.length === 2) {
                    categoryData = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                } else {
                    const intersectionsTwo = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                    categoryData = intersectionsTwo.filter(e => categoryDataDetail[2].indexOf(e) !== -1);
                }
                if (categoryData.length === 0) {
                    const errorResponse: any = {
                        status: 1,
                        message: 'please choose same category product',
                    };
                    return response.status(400).send(errorResponse);
                }
                const successResponse: any = {
                    status: 1,
                    message: 'Product Compared Successfully',
                };
                return response.status(200).send(successResponse);
            } else {
                const productDataDetail = [];
                const categoryDataDetail = [];
                // product find the which category
                for (const id of productid) {
                    const categoryId = await this.productToCategoryService.findAll({ where: { productId: id } });
                    const categoryDataValue = categoryId.map((item: any) => {
                        return item.categoryId;
                    });
                    categoryDataDetail.push(categoryDataValue);
                }
                let categoryData;
                if (categoryDataDetail.length === 2) {
                    categoryData = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                } else {
                    const intersectionsTwo = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                    categoryData = intersectionsTwo.filter(e => categoryDataDetail[2].indexOf(e) !== -1);
                }
                if (categoryData.length === 0) {
                    const errorResponse: any = {
                        status: 1,
                        message: 'please choose same category product',
                    };
                    return response.status(400).send(errorResponse);
                }
                let productListData;
                // find the product to compare
                for (const id of productid) {
                    productListData = await this.productService.findOne(id);
                    const defaultValue = await this.productImageService.findOne({
                        where: {
                            productId: productListData.productId,
                            defaultImage: 1,
                        },
                    });
                    const temp: any = productListData;
                    temp.ratingCount = 0;
                    temp.reviewCount = 'null';
                    temp.skuName = '';
                    const skuValue = await this.skuService.findOne({ id: productListData.skuId });

                    if (skuValue) {
                        temp.price = skuValue.price;
                        temp.skuName = skuValue.skuName;
                    }

                    temp.pricerefer = '';
                    temp.flag = '';

                    if (productListData.taxType === 2) {
                        const tax = await this.taxService.findOne({ taxId: productListData.taxValue });
                        if (tax) {
                            temp.taxValue = tax.taxPercentage;
                        } else {
                            temp.taxValue = '';
                        }
                    }
                    temp.productImage = defaultValue;
                    if (productListData.hasStock === 1) {
                        if (productListData.quantity <= productListData.outOfStockThreshold) {
                            temp.stockStatus = 'outOfStock';
                        } else {
                            temp.stockStatus = 'inStock';
                        }
                    } else {
                        temp.stockStatus = 'inStock';
                    }
                    productDataDetail.push(temp);
                }
                const successResponse: any = {
                    status: 1,
                    message: 'Product Compared Successfully',
                    data: productDataDetail,
                };
                return response.status(200).send(successResponse);
            }
        }
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
    @Get('/productSearchList')
    public async productSearchList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @Res() response: any, @Req() request: any): Promise<any> {
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
        whereConditions.push(
            {
                name: 'Product.isActive',
                op: 'and',
                value: 1,
            },
            {
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
        const productSearchList = await this.productService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], [], false, true);
        const productList = productSearchList.map(async (value: any) => {
            const temp = value;
            const defaultValue = await this.productImageService.findOne({
                where: {
                    productId: value.productId,
                    defaultImage: 1,
                },
            });
            temp.productImage = defaultValue;
            const productToCategory = await this.productToCategoryService.findOne({
                where: {
                    productId: value.productId,
                    isActive: 1,
                },
            });
            if (productToCategory) {
                const category = await this.categoryService.findOne({
                    select: ['categoryId', 'name', 'isActive', 'categorySlug'],
                    where: {
                        categoryId: productToCategory.categoryId,
                        isActive: 1,
                    },
                });
                temp.categoryName = category;
            } else {
                temp.categoryName = '';
            }
            return temp;
        });
        const results = await Promise.all(productList);
        if (productSearchList) {
            const successReponse: any = {
                status: 1,
                message: 'Successfully got a product search list.',
                data: results,
            };
            return response.status(200).send(successReponse);
        }
    }
}
