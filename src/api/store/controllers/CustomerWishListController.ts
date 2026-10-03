/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Post, JsonController, Res, Req, Delete, Param, Get, QueryParam, UseBefore } from 'routing-controllers';
import { CustomerWishlist } from '../../core/models/CustomerWishlist';
import { ProductService } from '../../core/services/ProductService';
import { CustomerWishlistService } from '../../core/services/CustomerWishlistService';
import { ProductImageService } from '../../core/services/ProductImageService';
import { CheckCustomerMiddleware } from '../../core/middlewares/checkTokenMiddleware';
import { TranslationMiddleware } from '../../core/middlewares/TranslationMiddleware';
import { Service } from 'typedi';

@Service()
@UseBefore(CheckCustomerMiddleware)
@JsonController('/customer')
export class StoreCustomerWishListController {
    constructor(
        private customerWishlistService: CustomerWishlistService,
        private productImageService: ProductImageService,
        private productService: ProductService
        // private productTranslationService: ProductTranslationService
    ) {
        // --
    }

    // Add Product To Wishlist API
    /**
     * @api {post} /api/customer/add-product-to-wishlist Add Product To Wishlist
     * @apiGroup Store wishlist
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId Product Id
     * @apiParam (Request body) {String} productOptionValueId Product Option Value Id
     * @apiParamExample {json} Input
     * {
     *      "productId" : "",
     *      "ProductOptionValueId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "You have Successfully add to wishlist.",
     *      "status": "1",
     *      "data": {
     *              "wishlistProductId": "",
     *              "product": {
     *              "createdBy": 1,
     *              "createdDate": "",
     *              "modifiedBy": 1,
     *              "modifiedDate": "",
     *              "productId": 1,
     *              "sku": "",
     *              "upc": "",
     *              "hsn": "",
     *              "location": "",
     *              "quantity": 1,
     *              "minimumQuantity": 1,
     *              "subtractStock": "",
     *              "stockStatusId": 1,
     *              "quotationAvailable": 1,
     *              "image": "",
     *              "imagePath": "",
     *              "manufacturerId": 1,
     *              "shipping": "",
     *              "serviceCharges": "",
     *              "taxType": 1,
     *              "taxValue": "",
     *              "price": "",
     *              "priceUpdateFileLogId": 1,
     *              "dateAvailable": "",
     *              "sortOrder": 1,
     *              "name": "",
     *              "description": "",
     *              "amount": "",
     *              "keywords": "",
     *              "discount": "",
     *              "deleteFlag": 0,
     *              "isFeatured": 1,
     *              "todayDeals": "",
     *              "condition": "",
     *              "rating": "",
     *              "wishListStatus": 1,
     *              "productSlug": "",
     *              "isActive": 1,
     *              "width": "",
     *              "height": "",
     *              "length": "",
     *              "weight": "",
     *              "hasStock": 1,
     *              "priceType": "",
     *              "isSimplified": 1,
     *              "owner": "",
     *              "isCommon": 1,
     *              "skuId": "",
     *              "hasTirePrice": 1,
     *              "outOfStockThreshold": 1,
     *              "notifyMinQuantity": "",
     *              "minQuantityAllowedCart": "",
     *              "maxQuantityAllowedCart": "",
     *              "enableBackOrders": "",
     *              "pincodeBasedDelivery": "",
     *              "attributeKeyword": "",
     *              "settedAsCommonOn": "",
     *              "productHighlights":"",
     *              },
     *              "productImage": {
     *                 "createdBy": ,
     *                 "createdDate": "",
     *                 "modifiedBy": ,
     *                 "modifiedDate": "",
     *                 "productImageId": 1,
     *                 "productId": 1,
     *                 "image": "",
     *                 "containerName": "",
     *                 "sortOrder": ,
     *                 "defaultImage": ,
     *                 "isActive": 1
     *     }
     *   }
     *  }
     * }
     * @apiSampleRequest /api/customer/add-product-to-wishlist
     * @apiErrorExample {json} Add Product To Wishlist error
     * HTTP/1.1 500 Internal Server Error
     */
    // Add Product To Wishlist Function
    @Post('/add-product-to-wishlist')
    public async addProductToWishlist(@Req() request: any, @Res() response: any): Promise<any> {
        return new Promise(async () => {
            const data = await this.customerWishlistService.findOne({
                where: {
                    productId: request.body.productId,
                    customerId: request.user.customerId,
                },
            });
            if (data) {
                const errorResponse: any = {
                    status: 1,
                    message: 'Already added this product to wishlist',
                };
                return response.status(400).send(errorResponse);
            }
            const newProduct = new CustomerWishlist();
            newProduct.customerId = request.user.customerId;
            newProduct.productId = request.body.productId;
            newProduct.isActive = 1;
            const resultData = await this.customerWishlistService.create(newProduct);
            const id = resultData.wishlistProductId;
            const product = await this.productService.findOne({ where: { productId: resultData.productId } });
            const image = await this.productImageService.findOne({
                where: {
                    productId: resultData.productId,
                    defaultImage: 1,
                },
            });
            const successResponse: any = {
                status: 1,
                message: 'You have Successfully add to wishlist',
                data: {
                    wishlistProductId: id,
                    product,
                    productImage: image,
                },
            };
            return response.status(200).send(successResponse);
        });
    }

    // Wish List Product Delete API
    /**
     * @api {delete} /api/customer/wishlist-product-delete/:id  Delete Product From Wishlist
     * @apiGroup Store wishlist
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "wishlistProductId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you deleted the product from wishlist successfully.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/wishlist-product-delete/:id
     * @apiErrorExample {json} Wishlist Product Delete error
     * HTTP/1.1 500 Internal Server Error
     */
    // Add Product Wishlist Function
    @Delete('/wishlist-product-delete/:id')
    public async wishlistProductDelete(@Param('id') wishlistId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const customerwishlistId = await this.customerWishlistService.findOne({ where: { productId: wishlistId, customerId: request.user.customerId } });
        if (!customerwishlistId) {
            const errResponse: any = {
                status: 1,
                message: 'Invalid Product',
            };
            return response.status(200).send(errResponse);
        }
        await this.customerWishlistService.delete(customerwishlistId.wishlistProductId);
        const successResponse: any = {
            status: 1,
            message: 'You have successfully remove from wishlist',
        };
        return response.status(200).send(successResponse);
    }

    // Wish List Product List API
    /**
     * @api {get} /api/customer/wishlist-product-list Wishlist Product List
     * @apiGroup Store Wishlist
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the wishlist Product List",
     *      "status": "1",
     *      "data": {
     *              "wishlistProductId": "",
     *              "productId": "",
     *              "taxType": "",
     *              "taxValue": "",
     *              "name": "",
     *              "price": "",
     *              "quantity": "",
     *              "description": "",
     *              "dateAvailable": "",
     *              "sku": "",
     *              "skuId": "",
     *              "sortOrder": "",
     *              "isSimplified": "",
     *              "upc": "",
     *              "rating": "",
     *              "isActive": "",
     *              "productSlug": "",
     *              "hasStock": "",
     *              "outOfStockThreshold": "",
     *              "stockStatusId": "",
     *              "createdDate": "",
     *              "keywords": "",
     *              "containerName": "",
     *              "image": "",
     *              "defaultImage": "",
     *              "ratingCount": "",
     *              "reviewCount": "",
     *              "skuName": "",
     *              "productDiscount": "",
     *              "productSpecial": "",
     *              "productNameTrans": "",
     *              "productDescriptionTrans": "",
     *              "pricerefer": "",
     *              "flag": "",
     *              "stockStatus": ""
     *   }
     * }
     * @apiSampleRequest /api/customer/wishlist-product-list
     * @apiErrorExample {json} Wishlist Product List error
     * HTTP/1.1 500 Internal Server Error
     */
    // View Product Wishlist Function
    @UseBefore(TranslationMiddleware)
    @Get('/wishlist-product-list')
    public async wishlistProductlist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<CustomerWishlist> {
        const selects = [
            'CustomerWishlist.wishlistProductId as wishlistProductId',
            'product.productId as productId',
            'product.taxType as taxType',
            'product.taxValue as taxValue',
            'product.name as name',
            'product.price as price',
            'product.taxType as taxType',
            'product.quantity as quantity',
            'product.description as description',
            'product.dateAvailable as dateAvailable',
            'product.sku as sku',
            'product.skuId as skuId',
            'product.sortOrder as sortOrder',
            'product.isSimplified as isSimplified',
            'product.isSpecification as isSpecification',
            'product.upc as upc',
            'product.rating as rating',
            'product.isActive as isActive',
            'product.productSlug as productSlug',
            'product.hasStock as hasStock',
            'product.outOfStockThreshold as outOfStockThreshold',
            'product.stockStatusId as stockStatusId',
            'product.createdDate as createdDate',
            'product.keywords as keywords',
            'MAX(productImage.containerName) as containerName',
            'MAX(productImage.image) as image',
            'MAX(productImage.defaultImage) as defaultImage',
            'MAX(vendor.vendorId) as vendorId',
            'MAX(customer.firstName) as vendorName',
            'MAX(vendor.companyName) as vendorCompanyName',
            'MAX(vendor.vendorSlugName) as vendorSlugName',
            'MAX(vendor.displayNameUrl) as displayNameUrl',
            'MAX(vendor.companyLogo) as companyLogo',
            'MAX(vendor.companyLogoPath) as companyLogoPath',
            'skuDetail.maxQuantityAllowedCart as maxQuantityAllowedCart',
            'skuDetail.minQuantityAllowedCart as minQuantityAllowedCart',
            '(SELECT COUNT(pr.rating) as ratingCount FROM product_rating pr WHERE pr.product_id = product.productId) as ratingCount',
            '(SELECT COUNT(pr.review) as reviewCount FROM product_rating pr WHERE pr.product_id = product.productId AND pr.review IS NOT NULL) as reviewCount',
            '(SELECT sku.sku_name as skuName FROM sku WHERE sku.id = skuId) as skuName',
            '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
            '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
            ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
            '(SELECT price FROM product_special ps WHERE ps.product_id = product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
        ];
        const groupBy = [{
            name: 'CustomerWishlist.wishlistProductId',
        }];

        const relations = [
            {
                tableName: 'CustomerWishlist.product',
                aliasName: 'product',
            },
            {
                tableName: 'product.productImage',
                op: 'leftCond',
                aliasName: 'productImage',
                cond: 'productImage.defaultImage = 1',
            },
            {
                tableName: 'product.vendorProducts',
                op: 'left',
                aliasName: 'vendorProducts',
            },
            {
                tableName: 'vendorProducts.vendor',
                op: 'left',
                aliasName: 'vendor',
            },
            {
                tableName: 'product.skuDetail',
                op: 'left',
                aliasName: 'skuDetail',
            },
            {
                tableName: 'vendor.customer',
                op: 'leftCond',
                cond: 'customer.isActive = 1',
                aliasName: 'customer',
            },
        ];
        const whereConditions = [{
            name: 'CustomerWishlist.customerId',
            op: 'where',
            value: request.user.customerId,
        }];

        const sort = [{
            name: 'CustomerWishlist.createdDate',
            order: 'DESC',
        }];
        const productCount: any = await this.customerWishlistService.listByQueryBuilder(limit, offset, selects, whereConditions, [], relations, groupBy, sort, true, true);
        if (count) {
            const successresponse: any = {
                status: 1,
                message: 'Successfully get count',
                data: productCount,
            };
            return response.status(200).send(successresponse);
        }
        const productList: any = await this.customerWishlistService.listByQueryBuilder(limit, offset, selects, whereConditions, [], relations, groupBy, sort, false, true);
        const promises = productList.map(async (result: any) => {
            const temp: any = result;
            if (result.productSpecial !== null) {
                temp.pricerefer = result.productSpecial;
                temp.flag = 1;
            } else if (result.productDiscount !== null) {
                temp.pricerefer = result.productDiscount;
                temp.flag = 0;
            } else {
                temp.pricerefer = '';
                temp.flag = '';
            }
            if (result.hasStock === 1) {
                if (result.quantity <= result.outOfStockThreshold) {
                    temp.stockStatus = 'outOfStock';
                } else {
                    temp.stockStatus = 'inStock';
                }
            } else {
                temp.stockStatus = 'inStock';
            }
            return temp;
        });
        const finalResult = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully show the wishlist product list',
            data: finalResult,
        };
        return response.status(200).send(successResponse);
    }
}
