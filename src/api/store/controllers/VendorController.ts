/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { JsonController, Res, Req, Param, Get, QueryParam, UseBefore, Body, Post } from 'routing-controllers';
import { VendorCountryService } from '../../core/services/VendorCountryService';
import { VendorService } from '../../core/services/VendorService';
import { VendorProductService } from '../../core/services/VendorProductService';
import { EmailTemplateService } from '../../core/services/EmailTemplateService';
import { CheckTokenMiddleware } from '../../core/middlewares/checkTokenMiddleware';
import { CategoryService } from '../../core/services/CategoryService';
import { MAILService } from '../../../auth/mail.services';
import { ContactSeller } from './requests/ContactSeller';
import { VendorContact } from '../../core/models/VendorContact';
import { VendorContactService } from '../../core/services/VendorContactService';
import { CustomerService } from '../../core/services/CustomerService';
import { TranslationMiddleware } from '../../../../src/api/core/middlewares/TranslationMiddleware';
import { ContactSellerRequest } from './requests/ContactSellerRequest';
import { VendorOrdersService } from '../../core/services/VendorOrderService';
import { VendorMediaService } from '../../core/services/VendorMediaService';
import { PdfService } from '../../core/services/PdfService';
import { IndustryValidationMiddleware } from '../../../api/core/middlewares/IndustryValidationMiddleware';
import { VendorSettingsService } from '../../core/services/VendorSettingsService';
import { TenantValidationMiddleware } from '../../../api/core/middlewares/TenantValidationMiddleware';
import fs = require('fs');
import moment from 'moment';
import { In } from 'typeorm';
import { env } from '../../../env';
import { VendorLanguageService } from '../../core/services/VendorLanguageService';
import { Service } from 'typedi';
import { CurrencyService } from '../../core/services/CurrencyService';

@Service()
@UseBefore(TenantValidationMiddleware)
@UseBefore(IndustryValidationMiddleware)
@JsonController('/vendor-store')
export class VendorStoreController {
    constructor(
        private vendorService: VendorService,
        private vendorProductService: VendorProductService,
        private vendorCountryService: VendorCountryService,
        private categoryService: CategoryService,
        private vendorContactService: VendorContactService,
        private emailTemplateService: EmailTemplateService,
        private customerService: CustomerService,
        private vendorOrderService: VendorOrdersService,
        private vendorMediaService: VendorMediaService,
        private pdfService: PdfService,
        private vendorSettingsService: VendorSettingsService,
        private currencyService: CurrencyService,
        private vendorLanguageService: VendorLanguageService
    ) {
    }

    // Get vendor Detail API
    /**
     * @api {get} /api/vendor-store/vendor-details/:displayNameUrl Vendor Details API
     * @apiGroup vendor store
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got vendor details.",
     *      "data":{
     *          "vendorId" : 1,
     *          "firstName" : "",
     *          "lastName" : "",
     *          "email" : "",
     *          "mobileNumber" : "",
     *          "avatar" : "",
     *          "avatarPath" : "",
     *          "commission" : "",
     *          "status" : 1,
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-store/vendor-details/:displayNameUrl
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/vendor-details/:displayNameUrl')
    public async storeVendorDetails(@Param('displayNameUrl') displayNameUrl: string, @Res() response: any): Promise<any> {
        const vendor = await this.vendorService.findOne({
            select: ['vendorId', 'vendorPrefixId', 'companyLogo', 'companyLogoPath', 'companyCoverImage', 'companyCoverImagePath', 'companyName', 'displayNameUrl',
                'companyDescription', 'companyAddress1', 'companyAddress2', 'companyCity', 'companyState', 'companyCountryId', 'zoneId', 'capabilities',
                'pincode', 'companyEmailId', 'companyWebsite', 'vendorSlugName', 'instagram', 'facebook', 'twitter', 'youtube', 'whatsapp', 'vendorDescription'],
            where: { displayNameUrl, isActive: 1, approvalFlag: 1, isDelete: 0 }, relations: ['customer'],
        });
        if (!vendor) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid vendor.',
                data: vendor,
            };
            return response.status(400).send(errorResponse);
        }
        vendor.persnolInfo = {
            firstName: vendor.customer.firstName,
            lastName: vendor.customer.lastName,
            avatar: vendor.customer.avatar,
            avatarPath: vendor.customer.avatarPath,
            email: vendor.customer.email,
        };
        vendor.customer = undefined;
        const vendorCountry = await this.vendorCountryService.findOne({
            where: { id: vendor.companyCountryId },
            relations: ['country'],
        });
        if (vendorCountry) {
            vendor.countryName = vendorCountry.country?.name;
        } else {
            vendor.countryName = '';
        }
        const orders = await this.vendorOrderService.findAll({ where: { vendorId: vendor.vendorId } });

        // order details
        vendor.totalOrders = 0;
        vendor.totalEarnings = 0;
        if (orders.length > 0) {
            vendor.totalOrders = orders.length;
            let orderCount = 0;
            orders.forEach((order) => {
                orderCount = orderCount + (+order.total);
            });
            vendor.totalEarnings = orderCount;
        }

        // vendor media datas
        const vendorMedia = await this.vendorMediaService.findAll({ where: { vendorId: vendor.vendorId, isActive: 1, isDelete: 0 } });
        vendor.vendorImages = [];
        vendor.vendorVideos = [];
        if (vendorMedia) {
            vendor.vendorImages = vendorMedia.filter(image => image.mediaType === 1);
            vendor.vendorVideos = vendorMedia.filter(image => image.mediaType === 2);
        }
        // vendor rating
        const products = await this.vendorProductService.findVendorActiveProduct(vendor.vendorId, 0, 0);
        vendor.productCount = products.length;
        const successResponse: any = {
            status: 1,
            message: 'Successfully got vendor details.',
            data: vendor,
        };
        return response.status(200).send(successResponse);
    }

    // Get Vendor Product list API
    /**
     * @api {get} /api/vendor-store/vendor-product-list Vendor Product list API
     * @apiGroup vendor store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} count count
     * @apiParam (Request body) {String} categorySlug categorySlug
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully get vendor product list",
     * "data": {
     *       "productId": 1,
     *       "taxType": 1,
     *       "taxValue": "",
     *       "name": "",
     *       "skuId": "",
     *       "quantity": "",
     *       "rating": "",
     *       "description": "",
     *       "sortOrder": "",
     *       "price": "",
     *       "productSlug": "",
     *       "isActive": "",
     *       "hasStock": "",
     *       "isSimplified": ,
     *       "outOfStockThreshold": "",
     *       "containerName": "",
     *       "image": "",
     *       "maxQuantityAllowedCart": "",
     *       "defaultImage": "",
     *       "skuName": "",
     *       "productDiscount": "",
     *       "productSpecial": "",
     *       "pricerefer": "",
     *       "flag": "",
     *       "stockStatus": "",
     *       "wishListStatus": ""
     *   }
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor-store/vendor-product-list
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(CheckTokenMiddleware)
    @UseBefore(TranslationMiddleware)
    @Get('/vendor-product-list')
    public async storeVendorProductList(@QueryParam('displayNameUrl') displayNameUrl: string, @QueryParam('categorySlug') categorySlug: string, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const productLists: any = await this.vendorProductList(displayNameUrl, categorySlug, limit, offset, count, request.id, request.languageId, request);
        if (productLists.status === 0) {
            return response.status(400).send(productLists);
        }
        return response.status(200).send(productLists);
    }
    public async vendorProductList(displayNameUrl: string, categorySlug: string, limit: number, offset: number, count: number | boolean, requestId: any, languageId: number, request: any): Promise<any> {
        const currentDate = moment().format('YYYY-MM-DD');
        const selects = [
            'DISTINCT(product.productId) as productId',
            'product.taxType as taxType',
            'product.taxValue as taxValue',
            'product.name as name',
            'product.skuId as skuId',
            'product.quantity as quantity',
            'product.rating rating',
            'product.description as description',
            'product.sortOrder as sortOrder',
            'product.price as price',
            'product.productSlug as productSlug',
            'product.isActive as isActive',
            'product.hasStock as hasStock',
            'product.isSimplified as isSimplified',
            'product.isSpecification as isSpecification',
            'product.outOfStockThreshold as outOfStockThreshold',
            '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
            '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as image',
            '(SELECT sk.max_quantity_allowed_cart as max_quantity_allowed_cart FROM sku sk WHERE sk.id = product.sku_id ) as maxQuantityAllowedCart',
            '(SELECT sk.min_quantity_allowed_cart as min_quantity_allowed_cart FROM sku sk WHERE sk.id = product.sku_id ) as minQuantityAllowedCart',
            '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
            '(SELECT sku.sku_name as skuName FROM sku WHERE sku.id = skuId) as skuName',
            '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
            '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
            ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
            '(SELECT price FROM product_special ps WHERE ps.product_id = product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end > CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
        ];

        const relations: any = [
            {
                tableName: 'VendorProducts.product',
                aliasName: 'product',
            },
            {
                tableName: 'VendorProducts.vendor',
                aliasName: 'vendor',
            },
            {
                tableName: 'product.productToCategory',
                aliasName: 'productToCategory',
            },
            {
                tableName: 'productToCategory.category',
                aliasName: 'category',
            },
        ];

        if (languageId) {
            relations.push(
                {
                    tableName: 'product.productTranslation',
                    op: 'leftCond',
                    aliasName: 'productTranslation',
                    cond: 'productTranslation.languageId = ' + languageId,
                }
            );
            selects.push('productTranslation.name as productNameTrans');
        }

        const whereConditions = [];
        if (categorySlug !== '' && categorySlug) {

            const category = await this.categoryService.findOne({
                where: {
                    categorySlug,
                    industryId: request.store.industryId,
                },
            });
            if (!category) {
                return {
                    status: 0,
                    message: 'Invalid category',
                };
            }
            whereConditions.push({
                name: 'category.categorySlug',
                op: 'and',
                value: categorySlug,
            });
        }

        whereConditions.push({
            name: 'category.industryId',
            op: 'and',
            value: request.store.industryId,
        });

        if (requestId) {
            selects.push('customerWishlist.wishlistProductId as wishlistProductId');
            relations.push({
                tableName: 'product.wishlist',
                op: 'leftCond',
                aliasName: 'customerWishlist',
                cond: 'customerWishlist.customerId = ' + requestId,
            });
        }
        const vendorData = await this.vendorService.findOne({ where: { displayNameUrl, isActive: 1 } });
        if (!vendorData) {
            return {
                status: 0,
                message: 'Invalid display name URL',
            };
        }
        whereConditions.push(
            {
                name: 'vendor.vendorId',
                op: 'and',
                value: vendorData.vendorId,
            },
            {
                name: 'vendor.isDelete',
                op: 'and',
                value: 0,
            }
        );
        whereConditions.push(
            {
                name: 'product.isActive',
                op: 'and',
                value: 1,
            },
            {
                name: 'product.dateAvailable',
                op: 'raw',
                sign: '<=',
                value: currentDate.toString(),
            },
            {
                name: 'VendorProducts.reuse',
                op: 'IS NULL',
                value: '',
            },
            {
                name: 'VendorProducts.reuseStatus',
                op: 'and',
                value: 0,
            }
        );
        const sort = [
            {
                name: 'product.sortOrder',
                order: 'ASC',
            },
        ];
        if (count) {
            const vendorProductListCount: any = await this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereConditions, [], relations, [], sort, true, true);
            const sucResponse: any = {
                status: 1,
                message: 'Successfully got seller product list',
                data: vendorProductListCount,
            };
            return sucResponse;
        }
        const vendorProductList: any = await this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereConditions, [], relations, [], sort, false, true);
        const promises = vendorProductList.map(async (result: any) => {
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
            if ((result.wishlistProductId !== null) && result.wishlistProductId) {
                temp.wishListStatus = 1;
            } else {
                temp.wishListStatus = 0;
            }
            return temp;
        });
        const finalResult = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'successfully got seller product list',
            data: finalResult,
        };
        return successResponse;
    }
    // Vendor Details Based on Category API
    /**
     * @api {get} /api/vendor-store/category-based-vendor-list Vendor Details Based on Category API
     * @apiGroup vendor store
     * @apiHeader {String} Authorization
     * @apiHeader {string} languageKey
     * @apiHeader {string} key
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} count count
     * @apiParam (Request body) {String} categorySlug categorySlug
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully get vendor details based on category",
     * "status": "1",
     * "data":        {
     *       "vendorId": "",
     *       "vendorPrefixId": "",
     *       "vendorGroupId": "",
     *       "companyName": "",
     *       "companyCountryId": "",
     *       "companyLogo": "",
     *       "companyLogoPath": "",
     *       "approvalFlag": "",
     *       "companyCoverImage": "",
     *       "companyCoverImagePath": "",
     *       "displayNameUrl": "",
     *       "instagram": "",
     *       "twitter": "",
     *       "youtube": "",
     *       "facebook": "",
     *       "capabilities": "",
     *       "customer": {
     *           "email": ""
     *       },
     *       "vendorMedia": [],
     *       "companyCountryName": "",
     *       "productCount": "",
     *       "activeProductCount": "",
     *       "products": [
     *           {
     *               "productId": "",
     *               "taxType": "",
     *               "taxValue": "",
     *               "name": "",
     *               "skuId": "",
     *               "quantity": ,
     *               "rating": "",
     *               "description": "",
     *               "sortOrder": "",
     *               "price": "",
     *               "productSlug": "",
     *               "isActive": "",
     *               "hasStock": "",
     *               "isSimplified": "",
     *               "outOfStockThreshold": "",
     *               "containerName": "",
     *               "image": "",
     *               "maxQuantityAllowedCart": "",
     *               "defaultImage": "",
     *               "skuName": "",
     *               "productDiscount": "",
     *               "productSpecial": "",
     *               "pricerefer": "",
     *               "flag": "",
     *               "stockStatus": "",
     *               "wishListStatus": ""
     *           }
     *       ]
     *   }
     * }
     * @apiSampleRequest /api/vendor-store/category-based-vendor-list
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(TranslationMiddleware)
    @Get('/category-based-vendor-list')
    public async categoryBasedVendorList(@QueryParam('categorySlug') categorySlug: string, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const searchConditions = [];
        const relations = [];
        const whereConditions = [];
        if (categorySlug !== '') {
            const category: any = await this.categoryService.find({
                where: {
                    categorySlug: In(categorySlug.split(',')),
                },
            });
            const categories = category.map((value) => value.categoryId);
            if (!category) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Category',
                });
            }
            searchConditions.push({
                name: 'category.categoryId',
                op: 'In',
                value: categories,
            });
            relations.push(
                {
                    tableName: 'vendor.vendorGroup',
                    aliasName: 'vendorGroup',
                },

                {
                    tableName: 'vendorGroup.vendorGroupCategory',
                    aliasName: 'vendorGroupCategory',
                },
                {
                    tableName: 'vendorGroupCategory.category',
                    aliasName: 'category',
                });
        }
        const select = [
            'vendor.vendorId', 'vendor.companyName', 'vendor.vendorGroupId',
            'vendor.companyLogo', 'vendor.companyLogoPath', 'vendor.companyCountryId',
            'vendor.companyCoverImage', 'vendor.companyCoverImagePath', 'customer',
            'vendor.instagram', 'vendor.twitter', 'vendor.whatsapp', 'vendor.capabilities',
            'vendor.facebook', 'vendor.youtube', 'vendor.vendorPrefixId', 'vendor.approvalFlag', 'vendor.displayNameUrl',
        ];
        relations.push(
            {
                tableName: 'vendor.customer',
                aliasName: 'customer',
            }
        );
        searchConditions.push(
            {
                name: 'vendor.approvalFlag',
                op: 'andWhere',
                value: 1,
            },
            {
                name: 'vendor.isActive',
                op: 'andWhere',
                value: 1,
            },
            {
                name: 'vendor.isDelete',
                op: 'andWhere',
                value: 0,
            }
        );
        const vendorGroupCategory = await this.vendorService.vendorList(limit, offset, select, relations, searchConditions, whereConditions, false);
        if (count) {
            const vendorGroupCategoryCount = await this.vendorService.vendorList(limit, offset, select, relations, searchConditions, whereConditions, true);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got count',
                data: vendorGroupCategoryCount,
            });
        }
        const vendorCategory = vendorGroupCategory.map(async (values: any) => {
            const temp: any = values;
            const findCountry = await this.vendorCountryService.findOne({ where: { id: values.companyCountryId }, relations: ['country'] });
            temp.companyCountryName = findCountry?.country?.name;
            temp.productCount = await this.vendorProductService.vendorProductsCount(temp.vendorId);
            temp.activeProductCount = await this.vendorProductService.activeVendorProductCount(temp.vendorId);
            const relation = ['product', 'product.productImage'];
            if (request.languageId) {
                relation.push('product.productTranslation');
            }
            const productLists: any = await this.vendorProductList(temp.displayNameUrl, '', 2, 0, false, request.id, request.languageId ?? 0, request);
            temp.products = productLists.data;
            const vendorMedia: any = await this.vendorMediaService.findAll({ where: { vendorId: values?.vendorId } });
            temp.vendorMedia = vendorMedia;
            return temp;
        });
        const resultData = await Promise.all(vendorCategory);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got vendor list based on category',
            data: resultData,
        };
        return response.status(200).send(successResponse);
    }
    // Contact Seller API
    /**
     * @api {post} /api/vendor-store/contact-seller Contact Seller API
     * @apiGroup vendor store
     * @apiParam (Request body) {Number} vendorId
     * @apiParam (Request body) {String} name
     * @apiParam (Request body) {String} email
     * @apiParam (Request body) {String} mobileNumber
     * @apiParam (Request body) {String} country
     * @apiParam (Request body) {String} requirement
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "vendorId": "",
     *      "name": "",
     *      "email": "",
     *      "mobileNumber": "",
     *      "country": "",
     *      "requirement": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Request has been sent successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-store/contact-seller
     * @apiErrorExample {json} contactSeller error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/contact-seller')
    public async contactSeller(@Body({ validate: true }) contactParam: ContactSeller, @Res() response: any, @Req() request: any): Promise<any> {
        const vendor = await this.vendorService.findOne({
            where: {
                vendorId: contactParam.vendorId,
            },
        });
        if (!vendor) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid Vendor ID',
            });
        }
        const customer = await this.customerService.findOne({
            where: {
                id: vendor.customerId,
            },
        });
        const contactSellers = new VendorContact();
        contactSellers.vendorId = contactParam.vendorId;
        contactSellers.name = contactParam.name;
        contactSellers.email = contactParam.email;
        contactSellers.mobileNumber = +contactParam.mobileNumber;
        contactSellers.country = contactParam.country;
        contactSellers.requirement = contactParam.requirement;
        const vendorContactSave = await this.vendorContactService.create(contactSellers);
        if (vendorContactSave) {
            const emailContent = await this.emailTemplateService.findOne({ where: { emailTemplateId: 25 } });
            const message = emailContent.content.replace('{name}', contactParam.name).replace('{sellerName}', customer.firstName).replace('{email}', vendorContactSave.email).replace('{phoneNumber}', vendorContactSave.mobileNumber).replace('{message}', vendorContactSave.requirement);
            const vendorSetting = await this.vendorSettingsService.findOne({ where: { vendorId: request.tenantId } });
            const vendorData = await this.vendorService.findOne({ where: { vendorId: request.tenantId } });
            const mailContents: any = {};
            const storeUrl = await this.vendorSettingsService.getVendorDomainOrDefault(request.tenantId, request.get('referer'));
            mailContents.setting = { ...vendorSetting, ...vendorData };
            mailContents.emailContent = message;
            mailContents.redirectUrl = storeUrl ?? '';
            mailContents.productDetailData = '';
            const sendMailRes = MAILService.sendMail(mailContents, vendorData.companyEmailId, emailContent.subject, false, false, '');
            if (sendMailRes) {
                const successResponse: any = {
                    status: 1,
                    message: 'Thank you for contacting us, your request has been sent successfully',
                    data: vendorContactSave,
                };
                return response.status(200).send(successResponse);
            } else {
                return response.status(400).send({
                    status: 0,
                    message: `Couldn't send mail`,
                });
            }
        }
    }
    // Contact Seller API
    /**
     * @api {post} /api/vendor-store/seller-contact Seller Contact API
     * @apiGroup vendor store
     * @apiParam (Request body) {String} firstName
     * @apiParam (Request body) {String} lastName
     * @apiParam (Request body) {String} emailId
     * @apiParam (Request body) {String} mobileNo
     * @apiParam (Request body) {Number} pincode
     * @apiParam (Request body) {String} city
     * @apiParam (Request body) {String} state
     * @apiParam (Request body) {String} country
     * @apiParam (Request body) {String} userRequirements
     * @apiParam (Request body) {String} sellerEmailId
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *     "firstName": "",
     *     "lastName": "",
     *     "emailId": "",
     *     "userRequirements": "",
     *     "sellerEmailId": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {Your email has been successfully sent to the seller
     *      "message": "Your email has been successfully sent to the seller",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-store/seller-contact
     * @apiErrorExample {json} contactSeller error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/seller-contact')
    public async sellerContact(@Body({ validate: true }) contactSellerParams: ContactSellerRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const attachments = [];
        try {
            const findMailContent = await this.emailTemplateService.findOne({ where: { emailTemplateId: 48 } });
            const vendorSetting = await this.vendorSettingsService.findOne({ vendorId: request.tenantId });
            const vendor = await this.vendorService.findOne({ where: { vendorId: request.tenantId } });
            const files = contactSellerParams.files;

            files.forEach(async (datas) => {
                const coverbase64Data = Buffer.from(datas.file.replace(/^data:application\/pdf;base64,/, ''), 'base64');
                const fileName = `document_${Date.now()}.pdf`;
                const filePath = 'demo';
                const attachmentPath = `${process.cwd()}/demo/${fileName}`;
                attachments.push({ name: fileName, path: attachmentPath });
                await this.pdfService.decodeBase64AndSave(filePath, fileName, coverbase64Data);
            });
            const emailcontent = findMailContent.content.replace(/{name}/g, 'Seller')
                .replace(/{FullName}/g, contactSellerParams.firstName + ' ' + contactSellerParams.lastName)
                .replace(/{EmailId}/g, contactSellerParams.emailId)
                .replace(/{appName}/g, vendorSetting?.siteName ?? '')
                .replace(/{userRequirements}/g, contactSellerParams.userRequirements);
            const mailContent: any = {};
            const storeUrl = await this.vendorSettingsService.getVendorDomainOrDefault(request.tenantId, request.get('referer'));
            mailContent.setting = { ...vendorSetting, ...vendor };
            mailContent.productInfo = [];
            mailContent.baseUrl = env.baseUrl;
            mailContent.emailContent = emailcontent;
            mailContent.productDetailData = undefined;
            mailContent.redirectUrl = storeUrl ?? '';
            mailContent.templateName = 'emailTemplates';
            mailContent.ccEmail = vendorSetting?.storeEmail ?? '';
            const sendMail = MAILService.sendMail(mailContent, contactSellerParams.vendorEmailId, findMailContent.subject, true, true, attachments);

            if (sendMail) {
                return response.status(200).send({ status: 1, message: 'Your email has been successfully sent to the seller' });
            }
        } catch (err) {
            attachments.map(file => {
                fs.unlinkSync(file.path);
            });
            return response.status(400).send({ status: 1, message: 'Oops! Something went wrong', data: err });
        }
    }

    // Get Store Setting API
    /**
     * @api {get} /api/vendor-store/store-setting Get Setting API
     * @apiGroup Settings
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get settings",
     *      "data":"{
     *       "id": "",
     *       "currencyCode": "",
     *       "symbolLeft": "",
     *       "symbolRight": "",
     *       }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-store/store-setting
     * @apiErrorExample {json} getSettings error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/store-setting')
    public async settingsListSpecific(@Res() response: any, @Req() request: any): Promise<Response> {

        const vendorSettings = await this.vendorSettingsService.findOne({
            select: ['showBadge', 'storeName', 'storeLogoName', 'isMaintenance', 'storeLogoPath', 'storeEmail', 'storeMobileNo', 'storeUrl', 'storeAddressLine1', 'storeAddressLine2', 'storeCountryId', 'zoneId', 'storeCity', 'storeZipcode', 'storeCurrencyId', 'storeLanguageId', 'sellerLogoName', 'sellerLogoPath', 'sellerLogo2', 'sellerLogo2Path', 'siteName', 'defaultCountry', 'isActive', 'orderStatus', 'copyrights', 'customerServiceHours', 'storeTitle', 'enableAdvancedSkuSearch', 'allowBulkCsvOrdering', 'showRequestForQuote', 'heroImageName', 'heroImagePath', 'heroHeadline', 'heroSubHeadline', 'heroCtaText', 'heroCtaLink'],
            where: {
                vendorId: request.tenantId,
            },
        });
        const vendorData = await this.vendorService.findOne({
            select: ['instagram', 'twitter', 'youtube', 'facebook', 'whatsapp', 'linkedin', 'metaTitle', 'metaTagDescription', 'metaTagKeyword', 'companyDescription'],
            where: { vendorId: request.tenantId },
        });
         const setting = { ...vendorSettings, ...vendorData };
        const vendorCurrencyData = await this.currencyService.findOne({ where: { currencyId: setting?.storeCurrencyId } });
        const vendorLanguage: any = await this.vendorLanguageService.findOne({ where: { id: setting.storeLanguageId, tenantId: setting?.vendorId }, relations: ['language'] });
        const temp: any = {};
        temp.currencyCode = vendorCurrencyData?.code ?? '';
        temp.symbolLeft = vendorCurrencyData?.symbolLeft ?? '';
        temp.symbolRight = vendorCurrencyData?.symbolRight ?? '';

        temp.languageName = vendorLanguage.language.name ?? '';
        temp.languageCode = vendorLanguage.language.code ?? '';
        return response.status(200).send({ status: 1, message: 'Successfully got vendor settings', data: [{ ...setting, ...temp }] });
    }
}
