/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, JsonController, QueryParam, Req, Res } from 'routing-controllers';
import { ProductRatingService } from '../../core/services/RatingService';
import { VendorService } from '../../../../src/api/core/services/VendorService';
import { Service } from 'typedi';

@Service()
@JsonController('/product-store')
export class VendorStoreRatingController {
    constructor(
        private productRatingService: ProductRatingService,
        private vendorService: VendorService
    ) {
        // ---
    }

    // Vendor Product Review list API
    /**
     * @api {Get} /api/product-store/vendor-product-review Vendor product review List
     * @apiGroup vendor store
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got rating list",
     *      "data": [{
     *       "review": "",
     *        "rating": "",
     *        "productId": 1,
     *        "createdDate": "",
     *        "firstName": "",
     *        "lastName": "",
     *        "customerId": 1,
     *        "isActive": 1,
     *        "avatar": "",
     *        "avatarPath": ""
     *      }]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-store/vendor-product-review
     * @apiErrorExample {json} Vendor Product Review List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Vendor Product Review list Function
    @Get('/vendor-product-review')
    public async vendorProductRatingList(@QueryParam('vendorId') vendorId: number, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const vendorDetail: any = await this.vendorService.findOne({
            where: {
                vendorId,
            },
        });
        if (!vendorDetail) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid vendorId.',
            };
            return response.status(400).send(errorResponse);
        }
        const selects = [
            'ProductRating.review as review',
            'ProductRating.rating as rating',
            'ProductRating.productId as productId',
            'ProductRating.createdDate as createdDate',
            'ProductRating.firstName as firstName',
            'ProductRating.lastName as lastName',
            'ProductRating.customerId as customerId',
            'ProductRating.skuId as skuId',
            'ProductRating.isActive as isActive',
            '(SELECT s.sku_name as skuName FROM sku s WHERE s.id = ProductRating.skuId LIMIT 1) as skuName',
            'customer.avatar as avatar',
            'customer.avatarPath as avatarPath',
        ];
        const whereConditions = [
            {
                name: 'ProductRating.isActive',
                op: 'and',
                value: 1,
            },
            {
                name: 'product.isActive',
                op: 'and',
                value: 1,
            },
            {
                name: 'vendorProducts.vendorId',
                op: 'and',
                value: vendorId,
            },
        ];
        const relations = [
            {
                tableName: 'ProductRating.product',
                aliasName: 'product',
            },
            {
                tableName: 'product.vendorProducts',
                aliasName: 'vendorProducts',
            },
            {
                tableName: 'ProductRating.customer',
                aliasName: 'customer',
            },
        ];
        const sort = [
            {
                name: 'ProductRating.createdDate',
                order: 'DESC',
            },
        ];
        if (count) {
            const ratingCountList: any = await this.productRatingService.listByQueryBuilder(limit, offset, selects, whereConditions, [], relations, [], sort, true, true);
            const countResponse: any = {
                status: 1,
                message: 'Successfully got rating count.',
                data: ratingCountList,
            };
            return response.status(200).send(countResponse);
        }
        const ratingList: any = await this.productRatingService.listByQueryBuilder(limit, offset, selects, whereConditions, [], relations, [], sort, false, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got rating list.',
            data: ratingList,
        };
        return response.status(200).send(successResponse);
    }
}
