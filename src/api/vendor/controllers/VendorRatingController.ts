import 'reflect-metadata';
import { Get, JsonController, QueryParam, Res, Authorized, Put, Body, Req, Param } from 'routing-controllers';
import { ProductRatingService } from '../../core/services/RatingService';
import { ProductService } from '../../../../src/api/core/services/ProductService';
import { UpdateRatingStatusRequest } from './requests/UpdateRatingStatusRequest';
import { In } from 'typeorm';
// import { CustomerService } from '../../../../src/api/core/services/CustomerService';
// import { SkuService } from '../../../../src/api/core/services/SkuService';
import { Service } from 'typedi';
import { ProductRatingImagesService } from '../../core/services/RatingImageService';

@Service()
@JsonController('/vendor-product-rating')
export class VendorRatingController {
    constructor(
        private productService: ProductService,
        private productRatingService: ProductRatingService,
        private productRatingImagesService: ProductRatingImagesService
        // private skuService: SkuService
    ) {
        // ---
    }

    // Get product rating/review API
    /**
     * @api {Get} /api/vendor-product-rating/:skuId Get product Rating API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} skuId skuId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the product rating",
     *      "data": [{
     *      "ratingId": 1,
     *      "review": "",
     *      "rating": "",
     *      "createdDate": "",
     *      "firstName": "",
     *      "lastName": "",
     *      "productId": 1,
     *      "customerId": 1,
     *      "orderProductId": 1,
     *      "isActive": 1,
     *        }]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-rating/:skuId
     * @apiErrorExample {json} GetProductRating error
     * HTTP/1.1 500 Internal Server Error
     */
    // @Get('/:skuId')
    // @Authorized(['vendor', 'list-rating-and-review'])
    // public async getProductRating(@Param('skuId') skuId: number, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
    //     const sku = await this.skuService.findOne({ where: { id: skuId } });
    //     if (!sku) {
    //         const errorResponse: any = {
    //             status: 0,
    //             message: 'Invalid Sku ID.',
    //         };
    //         return response.status(400).send(errorResponse);
    //     }
    //     const select = ['ratingId', 'review', 'rating', 'createdDate', 'firstName', 'lastName', 'productId', 'customerId', 'orderProductId', 'isActive', 'skuId'];
    //     const whereConditions = [
    //         {
    //             name: 'skuId',
    //             op: 'where',
    //             value: skuId,
    //         },
    //     ];
    //     const rating: any = await this.productRatingService.list(limit, offset, select, [], whereConditions, count);
    //     const promise = rating.map(async (result: any) => {
    //         const temp: any = result;
    //         const customer: any = await this.customerService.findOne({
    //             select: ['avatar', 'avatarPath'],
    //             where: { id: result.customerId },
    //         });
    //         temp.skuName = sku.skuName;
    //         const val = Object.assign({}, temp, customer);
    //         return val;
    //     });
    //     const value = await Promise.all(promise);
    //     if (value) {
    //         const successResponse: any = {
    //             status: 1,
    //             message: 'Successfully got the product rating.',
    //             data: value,
    //         };
    //         return response.status(200).send(successResponse);
    //     } else {
    //         const errorResponse: any = {
    //             status: 1,
    //             message: 'Unable to get product rating.',
    //         };
    //         return response.status(400).send(errorResponse);
    //     }
    // }

    // Vendor Product Rating List API
    /**
     * @api {Get} /api/vendor-product-rating Vendor Product review List API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limits
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} startDate createDate
     * @apiParam (Request body) {String} endDate createDate
     * @apiParam (Request body) {String} starCount rating
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully got the vendor product review and rating list",
     *      "data": [{
     *        "ratingId": 1,
     *        "review": "",
     *        "rating": 1,
     *        "reviewImage": "",
     *        "reviewImagePath": "",
     *        "reviewVideo": "",
     *        "reviewVideoPath": "",
     *        "createdDate": "",
     *        "firstName": "",
     *        "lastName": "",
     *        "email": "",
     *        "productId": 1,
     *        "customerId": 1,
     *        "orderProductId": 1,
     *        "isActive": 1,
     *        "productName": ""
     *        "image": "",
     *        "imagePath": "",
     *           }]
     * }
     * @apiSampleRequest /api/vendor-product-rating
     * @apiErrorExample {json} VendorRatingList error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized(['vendor', 'list-rating-and-review'])
    public async vendorProductRatinglist(
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('productName') productName: string,
        @QueryParam('startDate') startDate: string,
        @QueryParam('endDate') endDate: string,
        @QueryParam('starCount') starCount: string,
        @QueryParam('keyword') keyword: string,
        @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {
        const select = [
            'ProductRating.ratingId as ratingId',
            'ProductRating.review as review',
            'ProductRating.rating as rating',
            'ProductRating.image as reviewImage',
            'ProductRating.imagePath as reviewImagePath',
            'ProductRating.video as reviewVideo',
            'ProductRating.videoPath as reviewVideoPath',
            'ProductRating.createdDate as createdDate',
            'ProductRating.modifiedDate as modifiedDate',
            'ProductRating.firstName as firstName',
            'ProductRating.lastName as lastName',
            'ProductRating.email as email',
            'product.productId as productId',
            'ProductRating.customerId as customerId',
            'ProductRating.skuId as skuId',
            'ProductRating.orderProductId as orderProductId',
            'ProductRating.isActive as isActive',
            'product.name as productName',
            'productImage.image as image',
            'productImage.containerName as imagePath',
            '(SELECT s.sku_name as skuName FROM sku s WHERE s.id = ProductRating.skuId LIMIT 1) as skuName',
            `CASE
            WHEN ProductRating.modified_date IS NOT NULL THEN ProductRating.modified_date
            ELSE ProductRating.created_date
            END as customSortOrder`,
        ];
        const relations = [{
            tableName: 'ProductRating.product',
            op: 'left-join',
            aliasName: 'product',
        },
        {
            tableName: 'product.productImage',
            op: 'left-join',
            aliasName: 'productImage',
        },
        {
            tableName: 'product.vendorProducts',
            op: 'left-join',
            aliasName: 'vendorProducts',
        },
        ];
        const whereConditions = [];

        if (startDate && startDate !== '') {
            whereConditions.push({
                name: 'ProductRating.createdDate',
                op: 'raw',
                sign: '>=',
                value: startDate,
            });
        }
        if (endDate && endDate !== '') {
            whereConditions.push({
                name: 'ProductRating.createdDate',
                op: 'raw',
                sign: '<=',
                value: endDate,
            });
        }
        if (starCount && starCount !== '') {
            whereConditions.push({
                name: 'ProductRating.rating',
                op: 'and',
                value: +starCount,
            });
        }
        whereConditions.push({
            name: 'vendorProducts.vendorId',
            op: 'and',
            value: request.user.tenantId,
        }, {
            name: 'productImage.defaultImage',
            op: 'and',
            value: 1,
        });

        const searchConditions = [];
        if (productName && productName !== '') {
            searchConditions.push({
                name: ['product.name'],
                value: productName,
            });
        }
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['product.name', 'ProductRating.review', 'ProductRating.rating', "CONCAT(ProductRating.firstName, ' ', ProductRating.lastName)"],
                value: keyword.trim(),
            });
        }
        const sort = [{
            name: 'customSortOrder',
            order: 'DESC',
        }];
        const vendorProductList: any = await this.productRatingService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], sort, false, true);
        if (count) {
            const vendorProductRatingCount: any = await this.productRatingService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], [], true, true);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got vendor product reviews and ratings count.',
                data: vendorProductRatingCount,
            });
        }
        return response.status(200).send({
            status: 1,
            message: 'Vendor product reviews and ratings retrieved successfully.',
            data: vendorProductList,
        });
    }

    // Change Status rating/review API
    /**
     * @api {Put} /api/vendor-product-rating/status Vendor Product Rating Status API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiBody (Request body) {Array} ids rating ids
     * @apiParam (Request body) {Number} status status should be 0-> In-Active or 1-> Active
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Updated Vendor product Rating Status.",
     *      "data": {
     *          "ratingId": 1,
     *          "status": 1
     *      },
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-rating/status
     * @apiErrorExample {json} VendorProduct error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/status')
    @Authorized(['vendor', 'update-rating-and-review'])
    public async VendorProductRatingStatus(@Body({ validate: true }) updateRatingStatus: UpdateRatingStatusRequest, @Res() response: any, @Req() request: any): Promise<any> {
        let ratings;
        ratings = await this.productRatingService.findAll({ where: { ratingId: In(updateRatingStatus.ids) } });
        ratings.map((productRating => productRating.isActive = updateRatingStatus.status));
        const updateRating = await this.productRatingService.create(ratings);

        ratings.map(async (rating) => {
            const RatingValue: any = await this.productRatingService.consolidateRating(rating.skuId);
            const ProductData = await this.productService.findOne({ where: { productId: rating.productId } });
            ProductData.rating = RatingValue ? RatingValue.RatingCount : 0;
            await this.productService.create(ProductData);
        });
        if (updateRating) {
            const successResponse: any = {
                status: 1,
                message: 'The vendor product rating status has been successfully updated..',
                data: updateRating,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'Unable to update the vendor product rating at the moment. Please try again later.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Get product rating/review API
    /**
     * @api {Get} /api/vendor-product-rating/:ratingId Get product Rating API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} ratingId ratingId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the product rating",
     *      "data": [{
     *      "ratingId": 1,
     *      "review": "",
     *      "rating": "",
     *      "createdDate": "",
     *      "firstName": "",
     *      "lastName": "",
     *      "productId": 1,
     *      "customerId": 1,
     *      "orderProductId": 1,
     *      "productRatingImages":""
     *      "isActive": 1,
     *        }]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-rating/:ratingId
     * @apiErrorExample {json} GetProductRating error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/:ratingId')
    @Authorized(['vendor', 'list-rating-and-review'])
    public async getProductRating(@Param('ratingId') ratingId: number, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = [
            'ProductRating.ratingId as ratingId',
            'ProductRating.review as review',
            'ProductRating.rating as rating',
            'ProductRating.createdDate as createdDate',
            'ProductRating.firstName as firstName',
            'ProductRating.lastName as lastName',
            'ProductRating.productId as productId',
            'ProductRating.customerId as customerId',
            'ProductRating.orderProductId as orderProductId',
            'ProductRating.isActive as isActive',
            'ProductRating.skuId as skuId',
            '(SELECT p.name as name from product p where p.product_id = ProductRating.productId LIMIT 1) as productName',
            '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = ProductRating.productId AND pi.default_image = 1 LIMIT 1) as image',
            '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = ProductRating.productId AND pi.default_image = 1 LIMIT 1) as imagePath',
            '(SELECT s.sku_name as skuName FROM sku s WHERE s.id = ProductRating.skuId LIMIT 1) as skuName',
            '(SELECT c.avatar FROM customer c WHERE c.id = ProductRating.customerId LIMIT 1) as avatar',
            '(SELECT c.avatar_path FROM customer c WHERE c.id = ProductRating.customerId LIMIT 1) as avatarPath',
        ];
        const relations = [];
        const WhereConditions = [
            {
                name: 'ProductRating.ratingId',
                op: 'where',
                value: ratingId,
            },
        ];
        const rating: any = await this.productRatingService.listByQueryBuilder(limit, offset, select, WhereConditions, [], relations, [], [], count, true);
        const promise = rating.map(async (result: any) => {
            const temp: any = result;
            const productRatingImages = await this.productRatingImagesService.find({ where: { ratingId: result.ratingId } });
            temp.productRatingImages = productRatingImages;
            return temp;
        });
        const value = await Promise.all(promise);
        if (value) {
            const successResponse: any = {
                status: 1,
                message: 'Product rating retrieved successfully.',
                data: value,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'Unable to retrieve product rating. Please try again later.',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
