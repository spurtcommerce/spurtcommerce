/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {Get, QueryParam, JsonController, Res, Req, Param} from 'routing-controllers';
import {classToPlain} from 'class-transformer';
import {ProductToCategoryService} from '../../services/ProductToCategoryService';
import {ProductService} from '../../services/ProductService';
import {CategoryService} from '../../services/CategoryService';
import {ProductImageService} from '../../services/ProductImageService';
import {ProductViewLog} from '../../models/productViewLog';
import {ProductViewLogService} from '../../services/ProductViewLogService';
import jwt from 'jsonwebtoken';
import {CustomerService} from '../../services/CustomerService';
import {CategoryPathService} from '../../services/CategoryPathService';
import { CustomerWishlistService } from '../../services/CustomerWishlistService';

@JsonController('/product-store')
export class ProductController {
    constructor(private productService: ProductService,
                private productToCategoryService: ProductToCategoryService,
                private categoryService: CategoryService,
                private productImageService: ProductImageService,
                private customerService: CustomerService,
                private productViewLogService: ProductViewLogService,
                private customerWishlistService: CustomerWishlistService,
                private categoryPathService: CategoryPathService) {
    }

    // Product Details API
    /**
     * @api {get} /api/product-store/productdetail/:id Product Detail API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product-store/productdetail/:id
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/productdetail/:id')
    public async productDetail(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {
        const productDetail: any = await this.productService.findOne({
            productId: id,
        });
        const productDetails: any = classToPlain(productDetail);
        productDetails.productImage = await this.productImageService.findAll({
            select: ['productId', 'image', 'containerName', 'defaultImage'],
            where: {
                productId: id,
                },
        });
        productDetails.Category = await this.productToCategoryService.findAll({
            select: ['categoryId', 'productId'],
            where: {productId: id},
        }).then((val) => {
            const category = val.map(async (value: any) => {
                const categoryNames = await this.categoryService.findOne({categoryId: value.categoryId});
                const temp: any = value;
                if (categoryNames !== undefined ) {
                    temp.categoryName = categoryNames.name;
                } else {
                    temp.categoryName = '';
                }
                return temp;
            });
            const results = Promise.all(category);
            return results;
        });
            if (request.header('authorization')) {
            let customerId;
            jwt.verify(request.header('authorization').split(' ')[1], '123##$$)(***&', (err, decoded) => {
                if (err) {
                    console.log(err);
                }
                console.log('lll', decoded.id);
                customerId = decoded.id;
            });
            const wishStatus = await this.customerWishlistService.findOne({
                where: {
                    productId: id,
                    customerId,
                },
            });
            if (wishStatus) {
                productDetails.wishListStatus = 1;
            } else {
                productDetails.wishListStatus = 0;
            }

            const customerDetail = await this.customerService.findOne({where: {id: customerId}});
            const viewLog: any = new ProductViewLog();
            viewLog.productId = id;
            viewLog.customerId = customerDetail.id;
            viewLog.firstName = customerDetail.firstName;
            viewLog.lastName = customerDetail.lastName;
            viewLog.username = customerDetail.username;
            viewLog.email = customerDetail.email;
            viewLog.mobileNumber = customerDetail.mobileNumber;
            viewLog.address = customerDetail.address;
            await this.productViewLogService.create(viewLog);
        } else {
            productDetails.wishListStatus = 0;
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully get productDetail',
            data: productDetails,
        };
        return response.status(200).send(successResponse);
    }

    // Today Deals Product List API
    /**
     * @api {get} /api/product-store/todayDeals-list Today Deals List
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword search by name
     * @apiParam (Request body) {String} sku search by sku
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get today deals product List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product-store/todayDeals-list
     * @apiErrorExample {json} TodayDeals List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/todayDeals-list')
    public async todayDealsList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sku') sku: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = ['productId', 'sku', 'upc', 'name', 'description', 'location', 'minimumQuantity',
            'quantity', 'subtractStock', 'metaTagTitle', 'manufacturerId', 'stockStatusId', 'todayDeals',
            'shipping', 'dateAvailable', 'sortOrder', 'price', 'isActive'];
        const whereConditions = [
            {
                name: 'deleteFlag',
                op: 'where',
                value: 0,
            },
            {
                name: 'todayDeals',
                op: 'where',
                value: 1,
            },
            {
                name: 'isActive',
                op: 'where',
                value: 1,
            },
        ];

        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            },
            {
                name: 'sku',
                op: 'like',
                value: sku,
            },
        ];
        const todayDeals = await this.productService.list(limit, offset, select, 0, whereConditions, search, 0, count);
        if (count) {
            const successresponse: any = {
                status: 1,
                message: 'Successfully got today deals count',
                data: todayDeals,
            };
            return response.status(200).send(successresponse);
        }
        const promises = todayDeals.map(async (result: any) => {
            const productImage = await this.productImageService.findOne({
                select: ['productId', 'image', 'containerName', 'defaultImage'],
                where: {
                    productId: result.productId,
                    defaultImage: 1,
                },
            });
            const temp: any = result;
            temp.productImage = productImage;
            if (request.header('authorization')) {
                const userId = jwt.verify(request.header('authorization').split(' ')[1], '123##$$)(***&');
                const userUniqueId: any = Object.keys(userId).map((key: any) => {
                    return [(key), userId[key]];
                });
                console.log(userUniqueId[0][1]);
                const wishStatus = await this.customerWishlistService.findOne({
                    where: {
                        productId: result.productId,
                        customerId: userUniqueId[0][1],
                    },
                });
                if (wishStatus) {
                    temp.wishListStatus = 1;
                } else {
                    temp.wishListStatus = 0;
                }
            } else {
                temp.wishListStatus = 0;
            }
            return temp;
        });
        const finalResult = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got today deals List',
            data: finalResult,
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
        const select = ['categoryId', 'name', 'parentInt', 'sortOrder'];
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
                where: {categoryId: result.categoryId},
                order: {level: 'ASC'},
            }).then((values) => {
                const categories = values.map(async (val: any) => {
                    const categoryNames = await this.categoryService.findOne({categoryId: val.pathId});
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
}
