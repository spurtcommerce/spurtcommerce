/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Post,
    Body,
    JsonController,
    Authorized,
    Res,
    Put,
    Param,
    Get,
    QueryParam,
    Delete,
    Req,
} from 'routing-controllers';
import { VendorCategoryService } from '../../core/services/VendorCategoryService';
import { VendorCategory } from '../../core/models/VendorCategory';
import { CreateVendorCategoryRequest } from './requests/CreateVendorCategoryRequest';
import { CategoryPathService } from '../../core/services/CategoryPathService';
import { VendorService } from '../../core/services/VendorService';

@JsonController('/vendor-category')
export class VendorCategoryController {
    constructor(
        private vendorCategoryService: VendorCategoryService,
        private vendorService: VendorService,
        private categoryPathService: CategoryPathService
    ) {
    }

    // Create vendor category API
    /**
     * @api {post} /api/vendor-categorCreate Vendor Category API
     * @apiGroup Admin Vendor Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number}  vendorId vendorId
     * @apiParam (Request body) {String}  categoryId CategoryId
     * @apiParam (Request body) {Number}  [commission] commission
     * @apiParamExample {json} Input
     * {
     *      "vendorId" : "",
     *      "categoryId" : "",
     *      "commission" : "",
     * }
     * @apiSuccessExample {json} Successs
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully added category",
     *      "status": "1",
     *      "data": {
     *      "vendorId": "",
     *      "categoryId": "",
     *      "vendorCommission": "",
     *      "vendorCategoryId": ""
     * }
     * }
     * @apiSampleRequest /api/vendor-categor     * @apiErrorExample {json} vendor category  error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized(['admin', 'assign-category'])
    public async createVendorCategory(@Body({ validate: true }) vendorCategories: CreateVendorCategoryRequest, @Res() response: any): Promise<any> {
        const arr: any = [];
        const category = vendorCategories.categoryId;
        const splitId = category.split(',');
        for (const data of splitId) {
            const newVendorCategory: any = new VendorCategory();
            newVendorCategory.vendorId = vendorCategories.vendorId;
            newVendorCategory.categoryId = data;
            newVendorCategory.vendorCategoryCommission = 0;
            arr.push(newVendorCategory);
        }
        const categoryVendor = await this.vendorCategoryService.create(arr);
        if (categoryVendor !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully added seller category',
                data: categoryVendor,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to add seller category',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Update vendor category API
    /**
     * @api {put} /api/vendor-categorUpdate Vendor Category API
     * @apiGroup Admin Vendor Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiParam (Request body) {String} categoryId categoryId
     * @apiParam (Request body) {Number}  [commission] commission
     * @apiParamExample {json} Input
     * {
     *      "vendorId" : "",
     *      "categoryId" : "",
     *      "commission" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully update",
     *      "status": "1",
     *      "data": {
     *      "vendorId": "",
     *      "vendorCategoryId": "",
     *      "categoryId": "",
     *      "vendorCategoryCommission": ""
     * }
     * }
     * @apiSampleRequest /api/vendor-category
     * @apiErrorExample {json} vendor category  error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put()
    @Authorized()
    public async updateVendorCategory(@Body({ validate: true }) updateParam: CreateVendorCategoryRequest, @Res() response: any): Promise<any> {
        const VendorsCategory = await this.vendorCategoryService.findAll({
            where: {
                vendorId: updateParam.vendorId,
            },
        });
        if (VendorsCategory.length > 0) {
            await this.vendorCategoryService.delete(VendorsCategory);
        }
        const arr: any = [];
        const category = updateParam.categoryId;
        const splitId = category.split(',');
        for (const data of splitId) {
            const newVendorCategory: any = new VendorCategory();
            newVendorCategory.vendorId = updateParam.vendorId;
            newVendorCategory.categoryId = data;
            newVendorCategory.vendorCategoryCommission = 0;
            arr.push(newVendorCategory);
        }
        const categoryVendor = await this.vendorCategoryService.create(arr);
        if (categoryVendor !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated seller category',
                data: categoryVendor,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update the seller category',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Vendor Category List API
    /**
     * @api {get} /api/vendor-category/category/:id Vendor Category List API
     * @apiGroup Admin Vendor Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Boolean} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor category list",
     *      "data":[{
     *               "categoryId": "",
     *               "sortOrder": "",
     *               "parentInt": "",
     *               "name": "",
     *               "levels": ""
     *             }],
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-category/category/:id
     * @apiErrorExample {json} Vendor category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/category/:id')
    @Authorized()
    public async vendorCategoryList(@Param('id') id: number, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = [
            'CategoryPath.categoryId as categoryId',
            'category.sortOrder as sortOrder',
            'category.parentInt as parentInt',
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
            {
                tableName: 'category.vendorCategory',
                aliasName: 'vendorCategory',
            },
        ];
        const groupBy = [
            {
                name: 'CategoryPath.category_id',
            },
        ];

        const whereConditions = [];
        const searchConditions = [];

        whereConditions.push({
            name: 'vendorCategory.vendorId',
            op: 'and',
            value: id,
        });

        const sort = [];
        sort.push({
            name: 'vendorCategory.category_id',
            order: 'ASC',
        });
        const vendorCategoryList: any = await this.categoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const findProduct = vendorCategoryList.map(async (val: any) => {
            const temp: any = val;
            return temp;
        });
        const results = await Promise.all(findProduct);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the seller category list',
            data: results,
        };
        return response.status(200).send(successResponse);
    }

    // Vendor Category List by Group API
    /**
     * @api {get} /api/vendor-category/vendor-category-list/:id Vendor Category List API
     * @apiGroup Admin Vendor Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Boolean} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor category list",
     *       "data": {
     *       "categoryId": "",
     *       "sortOrder": "",
     *       "parentInt": "",
     *       "name": "",
     *       "levels": ""
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-category/vendor-category-list/:id
     * @apiErrorExample {json} Vendor category error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/vendor-category-list/:id')
    @Authorized()
    public async vendorCategoryListbyGroup(@Param('id') id: number, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count:  boolean, @Res() response?: any): Promise<any> {
        const findvendor = await this.vendorService.findOne({ where: { customerId: id } });

            const select = [
                'CategoryPath.categoryId as categoryId',
                'category.sortOrder as sortOrder',
                'category.parentInt as parentInt',
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
                {
                    tableName: 'category.vendorGroupCategory',
                    aliasName: 'vendorGroupCategory',
                },
            ];
            const groupBy = [
                {
                    name: 'CategoryPath.category_id',
                },
            ];

            const whereConditions = [];
            const searchConditions = [];

            whereConditions.push({
                name: 'vendorGroupCategory.vendor_group_id',
                op: 'and',
                value: findvendor.vendorGroupId,
            });

            const sort = [];
            sort.push({
                name: 'vendorGroupCategory.category_id',
                order: 'ASC',
            });
            const vendorCategoryList: any = await this.categoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const successResponse: any = {
            status: 1,
            message: 'Successfully got the seller category list',
            data: vendorCategoryList,
            };
            return response.status(200).send(successResponse);
    }

    // Delete Vendor Category API
    /**
     * @api {delete} /api/vendor-category/delete-vendor-category/:id Delete Vendor Category API
     * @apiGroup Admin Vendor Category
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted vendor category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-category/delete-vendor-category/:id
     * @apiErrorExample {json} Vendor category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-vendor-category/:id')
    @Authorized()
    public async deleteVendorCategory(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const vendor = await this.vendorCategoryService.findOne({
            where: {
                vendoryCategoryId: id,
            },
        });
        if (!vendor) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid seller Category Id',
            };
            return response.status(400).send(errorResponse);
        }

        const deleteVendor = await this.vendorCategoryService.delete(id);
        if (deleteVendor) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the seller category',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete the seller category',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
