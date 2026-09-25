/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, JsonController, Res, Req, QueryParam, Body, Post, QueryParams, UseBefore, Param } from 'routing-controllers';
import { Contact } from '../../core/models/Contact';
import { AttributeDetails, ListRequest, VariantDetails } from './requests/ListRequest';
import { ContactRequest } from './requests/ContactRequest';
import { IndustryValidationMiddleware } from '../../../api/core/middlewares/IndustryValidationMiddleware';
import { TenantValidationMiddleware } from '../../core/middlewares/TenantValidationMiddleware';
import { CheckTokenMiddleware } from '../../core/middlewares/checkTokenMiddleware';
import { TranslationMiddleware } from '../../core/middlewares/TranslationMiddleware';
import { VendorCountryService } from '../../core/services/VendorCountryService';
import { ContactService } from '../../core/services/ContactService';
import { BannerService } from '../../core/services/BannerService';
import { MAILService } from '../../../auth/mail.services';
import { CategoryService } from '../../core/services/CategoryService';
import { ProductService } from '../../core/services/ProductService';
import { EmailTemplateService } from '../../core/services/EmailTemplateService';
import { VendorLanguageService } from '../../core/services/VendorLanguageService';
import { CategoryPathService } from '../../core/services/CategoryPathService';
import { PluginService } from '../../core/services/PluginService';
import { OrderStatusService } from '../../core/services/OrderStatusService';
import { OrderProductService } from '../../core/services/OrderProductService';
import { OrderProductLogService } from '../../core/services/OrderProductLogService';
import { VendorSettingsService } from '../../core/services/VendorSettingsService';
import { VendorPluginService } from '../../core/services/VendorPluginService';
import { VendorService } from '../../core/services/VendorService';
// import { CategoryTranslationService } from '../../core/services/CategoryTranslationService';
import { CustomerToGroupService } from '../../core/services/CustomerToGroupService';
import { pluginModule } from '../../../../src/loaders/pluginLoader';
import { IndustryService } from '../../core/services/IndustryService';
import { instanceToPlain } from 'class-transformer';
import moment = require('moment');
import { In, Not } from 'typeorm';
import { env } from '../../../env';
import arrayToTree from 'array-to-tree';
import { VendorUsersService } from '../../core/services/VendorUsersService';
// import uncino from 'uncino';
// const hooks = uncino();
import { Service } from 'typedi';
import { ZoneService } from '../../core/services/zoneService';
import { CurrencyService } from '../../core/services/CurrencyService';
import { StoreCategoryValidator } from '../../../../src/api/core/middlewares/StoreCategoryValidatorMiddleware';
@Service()
@UseBefore(IndustryValidationMiddleware)
@JsonController('/store-list')
export class CommonListController {
    constructor(
        private bannerService: BannerService,
        private categoryService: CategoryService,
        private productService: ProductService,
        private contactService: ContactService,
        private emailTemplateService: EmailTemplateService,
        private zoneService: ZoneService,
        private categoryPathService: CategoryPathService,
        private pluginService: PluginService,
        private vendorUsersService: VendorUsersService,
        private orderStatusService: OrderStatusService,
        private orderProductService: OrderProductService,
        private orderProductLogService: OrderProductLogService,
        // private categoryTranslationService: CategoryTranslationService,
        private customerToGroupService: CustomerToGroupService,
        private industryService: IndustryService,
        private vendorSettingsService: VendorSettingsService,
        private currencyService: CurrencyService,
        private vendorPluginService: VendorPluginService,
        private vendorService: VendorService,
        private vendorCountryService: VendorCountryService,
        private vendorLanguageService: VendorLanguageService
    ) {
        // --
    }

    // Banner List API
    /**
     * @api {get} /api/list/banner Banner List
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiParam (Request body) {Number} keyword keyword
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset": "",
     *      "keyword": "",
     *      "count": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got banner list..",
     *      "status": "1",
     *      "data": {
     *          "bannerId": 1,
     *          "title": "",
     *          "link": "",
     *          "content": "",
     *          "position": "",
     *          "image": "",
     *          "imagePath": "",
     *          "isActive": "",
     *          "linkType": ""
     *      }
     * }
     * @apiSampleRequest /api/list/banner
     * @apiErrorExample {json} Banner List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Product list Function
    @UseBefore(TenantValidationMiddleware)
    @Get('/banner')
    public async bannerList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {
        const select = ['bannerId', 'title', 'content', 'link', 'position', 'isActive', 'linkType'];
        const search = [
            {
                name: 'title',
                op: 'like',
                value: keyword,
            },
        ];
        const whereConditions = [
            {
                name: 'isActive',
                value: 1,
            },
            {
                name: 'tenantId',
                value: request.tenantId,
            },
        ];
        const relations = [
            {
                tableName: 'bannerImages',
            },
        ];

        const bannerList: any = await this.bannerService.list(limit, offset, select, relations, search, whereConditions, count);

        /// const vendorSettings = await this.vendorSettingsService.findOne({ where: { vendorId: request.tenantId } });
        const storeUrl = await this.vendorSettingsService.getVendorDomainOrDefault(request.tenantId, request.get('referer'));
        // const productRedirectUrl = env.productRedirectUrl;

        // if (env.app.type === 'cloud') {
        //     const siteUrl = env.storeRedirectUrl.split('//')[0] + '//' + vendorSettings.storeUrl + '.' + env.storeRedirectUrl.split('//')[1];
        //     productRedirectUrl = siteUrl + env.productRedirectUrl;
        // }

        const list = bannerList.map(async (value: any) => {
            const temp: any = value;
            if (+temp.linkType === 2) {
                temp.link = `${storeUrl}/products/${temp.link}`;
            } else if (+temp.linkType === 3) {
                const categoryRedirectUrl = env.categoryRedirectUrl;
                temp.link = categoryRedirectUrl.concat(temp.link).concat('?offset=0');
            } else {
                temp.link = temp.link;
            }
            return temp;
        });
        const result = await Promise.all(list);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got banner list.',
            data: result,
        };
        return response.status(200).send(successResponse);
    }

    // Banner Detail API
    /**
     * @api {get} /api/list/banner/position/:position Banner Detail
     * @apiGroup Store List
     * @apiParam (Request body) {String} position position
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got banner detail..",
     *      "status": "1",
     *      "data": "{
     *               "bannerId": 1,
     *               "title": "",
     *               "link": "",
     *               "content": "",
     *               "position": "",
     *               "image": "",
     *               "imagePath": "",
     *               "isActive": "",
     *               "linkType": ""
     *              }"
     * }
     * @apiSampleRequest /api/list/banner/position/:position
     * @apiErrorExample {json} Banner Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Product list Function
    @UseBefore(TenantValidationMiddleware)
    @Get('/banner/position/:position')
    public async bannerByPosition(@Param('position') position: string, @Res() response: any): Promise<any> {

        const banner = await this.bannerService.findOne({ where: { position, isActive: 1 } });
        if (!banner) {
            const error = {
                status: 0,
                message: 'Invalid / Inactive banner position.',
            };
            return response.status(400).send(error);
        }

        if (+banner.linkType === 2) {
            const productRedirectUrl = env.productRedirectUrl;
            banner.link = productRedirectUrl.concat(banner.link);
        } else if (+banner.linkType === 3) {
            const categoryRedirectUrl = env.categoryRedirectUrl;
            banner.link = categoryRedirectUrl.concat(banner.link).concat('?offset=0');
        } else {
            banner.link = banner.link;
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully got banner detail.',
            data: banner,
        };

        return response.status(200).send(successResponse);
    }

    // Category List Tree API
    /**
     * @api {get} /api/list/category Category List Tree API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset": "",
     *      "keyorder": "",
     *      "sortOrder": "",
     *      "count": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "category list shown successfully..!",
     *      "status": "1",
     *      "data": "{
     *               "categoryId": 1,
     *               "name": "",
     *               "categoryDescription": ""
     *               "image": "",
     *               "imagePath": "",
     *               "parentInt": 1,
     *               "sortOrder": "",
     *               "categorySlug": "",
     *               "isActive": 1
     *              }"
     * }
     * @apiSampleRequest /api/list/category
     * @apiErrorExample {json} Category List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Category List Function
    @UseBefore(TenantValidationMiddleware)
    @Get('/category')
    @UseBefore(TranslationMiddleware)
    public async ParentCategoryList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {

        const select = [
            'Category.categoryId as categoryId', 'Category.name as name', 'Category.categoryDescription as categoryDescription',
            'Category.image as image', 'Category.imagePath as imagePath', 'Category.parentInt as parentInt', 'Category.sortOrder as sortOrder',
            'Category.categorySlug as categorySlug', 'Category.isActive as isActive', 'categoryTranslation.languageId as languageId',
            'categoryTranslation.name as categoryNameTrans', 'categoryTranslation.description as categoryDescriptionTrans',
        ];
        const whereConditions = [
            {
                name: 'Category.isActive',
                op: 'where',
                value: 1,
            },
            {
                name: 'Category.tenantId',
                op: 'and',
                value: request.tenantId,
            },
            {
                name: 'Category.industryId',
                op: 'and',
                value: request.store.industryId,
            },
        ];

        const relations = [
            {
                tableName: 'Category.categoryTranslation',
                aliasName: 'categoryTranslation',
            },
        ];

        const search = [];
        if (keyword && keyword !== '') {
            search.push({
                name: ['Category.name'],
                value: keyword,
            });
        }
        const categoryData = await this.categoryService.listByQueryBuilder(limit, offset, select, whereConditions, search, relations, [], [], count, true);

        if (count) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get all category list.',
                data: categoryData,
            };
            return response.status(200).send(successResponse);
        } else {
            const categoryTransaDataList = categoryData.map((category) => {
                const categoryTranslation = category.languageId === request.languageId;
                if (!categoryTranslation) {
                    category.categoryNameTrans = '';
                    category.categoryDescriptionTrans = '';
                }
                return category;
            });

            const categoryList = arrayToTree(categoryTransaDataList, {
                parentProperty: 'parentInt',
                customID: 'categoryId',
            });
            const successResponse: any = {
                status: 1,
                message: 'Successfully got the list of categories',
                data: categoryList,
            };
            return response.status(200).send(successResponse);
        }
    }

    // Custom Product List API
    /**
     * @api {get} /api/list/custom-product-list Custom Product List API
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} categorySlug categorySlug
     * @apiParam (Request body) {Number} priceFrom price from you want to list
     * @apiParam (Request body) {Number} priceTo price to you want to list
     * @apiParam (Request body) {String} price ASC OR DESC
     * @apiParam (Request body) {String} keyword keyword
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data": "{
     *               "productId": 1,
     *               "taxType": 1,
     *               "taxValue": "",
     *               "name": "",
     *               "price": "",
     *               "description": "",
     *               "dateAvailable": "",
     *               "sku": "",
     *               "skuId": "",
     *               "isSimplified": "",
     *               "upc": "",
     *               "quantity": 10,
     *               "rating": "",
     *               "isActive": 1,
     *               "productSlug": "",
     *               "hasStock": "",
     *               "outOfStockThreshold": "",
     *               "stockStatusId": "",
     *               "createdDate": "",
     *               "keywords": "",
     *               "attributeKeyword": "",
     *               "vendorId": 1,
     *               "vendorName": "",
     *               "vendorCompanyName": "",
     *               "vendorSlugName": "",
     *               "maxQuantityAllowedCart": 10,
     *               "minQuantityAllowedCart": 1,
     *               "containerName": "",
     *               "image": "",
     *               "defaultImage": "",
     *               "ratingCount": "",
     *               "reviewCount": "",
     *               "skuName": "",
     *               "modifiedPrice": "",
     *               "productDiscount": "",
     *               "productSpecial": "",
     *               "vcPrice": "",
     *               "vcgPrice": "",
     *               "pricerefer": "",
     *               "flag": 1,
     *               "stockStatus": 1,
     *               "wishListStatus": 1,
     *               "productNameTrans": "",
     *               "productDescriptionTrans": ""
     *              },
     * }
     * @apiSampleRequest /api/list/custom-product-list
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(TenantValidationMiddleware)
    @UseBefore(CheckTokenMiddleware)
    @UseBefore(TranslationMiddleware)
    @Get('/custom-product-list')
    public async customProductList(@QueryParams() params: ListRequest, @Req() request: any, @Res() response: any): Promise<any> {
        return new Promise(async () => {
            const variant: VariantDetails[] = [];
            const attribute: AttributeDetails[] = [];
            const tempVariant = params.variant?.split(',') ?? [];
            const tempAttribute = params.attribute?.split(',') ?? [];
            if (tempVariant?.length > 0) {
                tempVariant.forEach(element => {
                    const temp: VariantDetails = {};
                    const value = element.split('~');
                    temp.name = value[0];
                    temp.value = value[1];
                    variant.push(temp);
                });
            }
            if (tempAttribute?.length > 0) {
                tempAttribute.forEach(element => {
                    const temp: AttributeDetails = {};
                    const value = element.split('~');
                    temp.name = value[0];
                    temp.value = value[1];
                    attribute.push(temp);
                });
            }
            const limit = params.limit;
            const offset = params.offset;
            const selects = [
                'Product.productId as productId',
                'Product.taxType as taxType',
                'Product.taxValue as taxValue',
                'Product.name as name',
                'Product.price as price',
                'Product.dateAvailable as dateAvailable',
                'Product.sku as sku',
                'Product.skuId as skuId',
                'Product.isSimplified as isSimplified',
                'Product.isSpecification as isSpecification',
                'Product.quantity as quantity',
                'Product.isActive as isActive',
                'Product.productSlug as productSlug',
                'Product.hasStock as hasStock',
                'Product.outOfStockThreshold as outOfStockThreshold',
                'Product.stockStatusId as stockStatusId',
                'Product.createdDate as createdDate',
                'MAX(vendor.vendorId) as vendorId',
                'skuDetail.maxQuantityAllowedCart as maxQuantityAllowedCart',
                'skuDetail.minQuantityAllowedCart as minQuantityAllowedCart',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
                '(SELECT COUNT(pr.rating) as ratingCount FROM product_rating pr WHERE pr.product_id = Product.productId) as ratingCount',
                '(SELECT COUNT(pr.review) as reviewCount FROM product_rating pr WHERE pr.product_id = Product.productId AND pr.review IS NOT NULL) as reviewCount',
            ];
            if (pluginModule.includes('ProductVariants') && await this.vendorPluginService.findOne({ where: { vendorId: request.tenantId, isActive: 1, plugins: { slugName: 'product-variants', pluginStatus: 1 } }, relations: ['plugins'] })) {

                selects.push(
                    `(SELECT CASE
                        WHEN Product.isSimplified = 0
                        THEN (SELECT pvo.sku_id
                        FROM product_varient_option AS pvo
                        WHERE pvo.product_id = productId
                        AND pvo.is_active = 1
                        LIMIT 1)
                        ELSE \`Product\`.\`sku_id\`
                        END) AS skuId`,
                    `(SELECT COUNT(*) FROM product_varient_option as pvo WHERE pvo.product_id = Product.productId AND pvo.is_active = 1) AS variantCount`);
            }

            selects.push(
                '(SELECT sku.sku_name as skuName FROM sku WHERE sku.id = skuId) as skuName',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as modifiedPrice',
                '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
                ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
                '(SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial'
            );
            const whereConditions = [];
            const currentDate = moment().format('YYYY-MM-DD');
            const relations = [];
            const groupBy = [];
            groupBy.push({
                name: 'Product.productId',
            });
            if (params.categorySlug === '' || params.categorySlug === undefined) {
                relations.push(
                    {
                        tableName: 'Product.vendorProducts',
                        op: 'left',
                        aliasName: 'vendorProducts',
                    },
                    {
                        tableName: 'Product.productToCategory',
                        op: 'inner',
                        aliasName: 'productToCategory',
                    },
                    {
                        tableName: 'productToCategory.category',
                        op: 'inner',
                        aliasName: 'category',
                    },
                    {
                        tableName: 'vendorProducts.vendor',
                        op: 'leftCond',
                        cond: `vendor.vendorId = ${request.tenantId}`,
                        aliasName: 'vendor',
                    },
                    {
                        tableName: 'vendor.customer',
                        op: 'leftCond',
                        cond: 'vendor.isActive = 1',
                        aliasName: 'customer',
                    },
                    {
                        tableName: 'Product.skuDetail',
                        op: 'left',
                        aliasName: 'skuDetail',
                    }
                );
                whereConditions.push(
                    {
                        name: 'Product.isActive',
                        op: 'and',
                        value: 1,
                    },
                    // {
                    //     name: 'vendorProducts.approvalFlag',
                    //     op: 'raw',
                    //     sign: '!=',
                    //     value: 2,
                    // },
                    {
                        name: '( customer.id IS NOT NULL',
                        op: 'rawnumber',
                        sign: 'OR',
                        value: `vendorProducts.vendorId IS NULL )`,
                    },
                    {
                        name: `(LOWER(category.industry_id) LIKE '${request.store.industryId}')`,
                        op: 'raw',
                        value: '',
                    },
                    {
                        name: 'Product.dateAvailable',
                        op: 'raw',
                        sign: '<=',
                        value: currentDate.toString(),
                    }
                );
            } else {
                relations.push(
                    {
                        tableName: 'Product.productToCategory',
                        op: 'left',
                        aliasName: 'productToCategory',
                    },
                    {
                        tableName: 'productToCategory.category',
                        op: 'left',
                        aliasName: 'category',
                    },
                    {
                        tableName: 'Product.vendorProducts',
                        op: 'left',
                        aliasName: 'vendorProducts',
                    },
                    {
                        tableName: 'vendorProducts.vendor',
                        op: 'leftCond',
                        cond: `vendor.vendorId = ${request.tenantId}`,
                        aliasName: 'vendor',
                    },
                    {
                        tableName: 'Product.skuDetail',
                        op: 'left',
                        aliasName: 'skuDetail',
                    },
                    {
                        tableName: 'vendor.customer',
                        op: 'leftCond',
                        cond: 'vendor.isActive = 1',
                        aliasName: 'customer',
                    }
                );
                whereConditions.push(
                    {
                        name: 'Product.isActive',
                        op: 'and',
                        value: 1,
                    },
                    // {
                    //     name: 'vendorProducts.approvalFlag',
                    //     op: 'raw',
                    //     sign: '!=',
                    //     value: 2,
                    // },
                    {
                        name: '( customer.id IS NOT NULL',
                        op: 'rawnumber',
                        sign: 'OR',
                        value: `vendorProducts.vendorId IS NULL )`,
                    },
                    {
                        name: 'category.category_slug',
                        op: 'and',
                        value: '"' + params.categorySlug + '"',
                    },
                    {
                        name: 'category.industry_id',
                        op: 'and',
                        value: request.store.industryId,
                    },
                    {
                        name: 'Product.dateAvailable',
                        op: 'raw',
                        sign: '<=',
                        value: currentDate.toString(),
                    }
                );
            }

            // selects.push('MAX(customerWishlist.wishlistProductId) as wishlistProductId');
            // relations.push({
            //     tableName: 'Product.wishlist',
            //     op: 'leftCond',
            //     aliasName: 'customerWishlist',
            //     cond: 'customerWishlist.customerId = ' + (request.id !== '' ? request.id : 0),
            // });

            const vendorPlugin = await this.vendorPluginService.findOne(
                {
                    where: {
                        vendorId: request.tenantId,
                        isActive: 1,
                        plugins: {
                            pluginName: 'ShoppingCart',
                            pluginStatus: 1,
                        },
                    },
                    relations: ['plugins'],
                }
            );
            if (pluginModule.includes('ShoppingCart') && vendorPlugin) {
                selects.push(`(SELECT sc.id FROM shopping_cart AS sc INNER JOIN shopping_cart_detail as scd ON sc.id = scd.shopping_cart_id WHERE sc.customer_id = ${request.id ? request.id : 0} AND scd.sku_id = skuId ORDER BY sc.created_date DESC LIMIT 1) AS shoppingCartId`);
            }

            const defaultPriceFilterQuery = '(CASE WHEN (((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 2 AND (Product.taxValue != 0 || Product.taxValue != NULL) THEN (IF(Product.taxType = 2, Product.taxValue )/100 * (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1)) + (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) WHEN (((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, Product.taxValue ) != 0 || IF(Product.taxType = 2, Product.taxValue ) != NULL)) THEN ((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = ' +
                ' Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) + IF(Product.taxType = 2, Product.taxValue )) ' +
                ' WHEN (((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 2 AND (Product.taxValue != 0 || Product.taxValue != NULL) THEN (IF(Product.taxType = 2, Product.taxValue )/100 * (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = ' +
                'Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1)) + (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) WHEN ((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL AND `Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, Product.taxValue ) != 0 || IF(Product.taxType = 2, Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, Product.taxValue ) + (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = ' +
                'Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1)) WHEN ((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) THEN (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))'
                + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1)' +
                ' WHEN ((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL) THEN (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) WHEN (`Product`.`tax_type` = 2 AND (Product.taxValue != 0 || Product.taxValue != NULL) THEN (IF(Product.taxType = 2, Product.taxValue )/100 * (SELECT sku.price as price FROM sku WHERE sku.id = Product.skuId)) + (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                ' Product.skuId) WHEN (`Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, Product.taxValue ) != 0 || IF(Product.taxType = 2, Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, Product.taxValue ) + (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                'Product.skuId)) ELSE (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                'Product.skuId) END)';

            const defaultPriceSortQuery = '(CASE WHEN ((productSpecial IS NOT NULL) AND `Product`.`tax_type` = 2 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue/100 * productSpecial) + productSpecial WHEN ((productSpecial IS NOT NULL) AND `Product`.`tax_type` = 1 AND (taxValue != 0 || taxValue != NULL)) THEN (productSpecial + taxValue) ' +
                ' WHEN ((productDiscount IS NOT NULL) AND `Product`.`tax_type` = 2 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue/100 * productDiscount) + productDiscount WHEN (productDiscount IS NOT NULL AND `Product`.`tax_type` = 1 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue + productDiscount) WHEN (productSpecial IS NOT NULL) THEN productSpecial' +
                ' WHEN (productDiscount IS NOT NULL) THEN productDiscount WHEN (`Product`.`tax_type` = 2 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue/100 * modifiedPrice) + modifiedPrice WHEN (`Product`.`tax_type` = 1 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue + modifiedPrice) ELSE modifiedPrice END)';

            // price group addon exist

            let priceGroupFilterPriceQueryExist = undefined;
            let priceGroupFilterSortQueryExist = undefined;

            if (pluginModule.includes('ProductPriceGroup') && await this.pluginService.findOne({ where: { slugName: 'product-price-group', pluginStatus: 1 } })) {
                // cutomer price
                const { vendorCustomerPriceService, priceGroupFilterQuery, vendorCustomerGroupPriceService } = require('../../../../add-ons/ProductPriceGroup/priceGroupHook');
                const vendorCustomerPriceList = await vendorCustomerPriceService('find', { where: { customerId: request.id } });
                const vendorCustomerPriceGroupIds = vendorCustomerPriceList.map((vendorCustomerPrice) => vendorCustomerPrice.priceGroupId);

                selects.push(`(SELECT MIN(price) FROM vendor_price_group_detail vpgd INNER JOIN vendor_price_group_schedule vpgs ON vpgd.id = vpgs.price_group_detail_id INNER JOIN vendor_price_group vpg ON vpgd.price_group_id = vpg.id WHERE vpgd.sku_id = Product.skuId AND vpgd.price_group_id IN(${[0, ...vendorCustomerPriceGroupIds]}) AND vpgs.start_date <= CURDATE() AND vpgs.end_date >= CURDATE() AND vpgs.is_active = 1 AND vpg.is_active = 1) as vcPrice`);

                // cutomer group price
                const vendorCustomerGroupList = await this.customerToGroupService.find({ where: { customerId: request.id } });
                const vendorCustomerGroupIds = vendorCustomerGroupList.map((vendorCustomerGroup) => vendorCustomerGroup.customerGroupId);
                const vendorCustomerGroupPriceList = await vendorCustomerGroupPriceService('find', { where: { customerGroupId: In(vendorCustomerGroupIds) } });
                const vendorCustomerGroupPriceGroupIds = vendorCustomerGroupPriceList.map((vendorCustomerGroupPrice) => vendorCustomerGroupPrice.priceGroupId);

                selects.push(`(SELECT MIN(price) FROM vendor_price_group_detail vpgd INNER JOIN vendor_price_group_schedule vpgs ON vpgd.id = vpgs.price_group_detail_id INNER JOIN vendor_price_group vpg ON vpgd.price_group_id = vpg.id WHERE vpgd.sku_id = Product.skuId AND vpgd.price_group_id IN(${[0, ...vendorCustomerGroupPriceGroupIds]}) AND vpgs.start_date <= CURDATE() AND vpgs.end_date >= CURDATE() AND vpgs.is_active = 1 AND vpg.is_active = 1) as vcgPrice`);

                priceGroupFilterPriceQueryExist = priceGroupFilterQuery(defaultPriceFilterQuery, vendorCustomerPriceGroupIds, vendorCustomerGroupPriceGroupIds);
                priceGroupFilterSortQueryExist = priceGroupFilterQuery(defaultPriceSortQuery, vendorCustomerPriceGroupIds, vendorCustomerGroupPriceGroupIds);

            }

            if (params.priceFrom) {
                whereConditions.push({
                    name: priceGroupFilterPriceQueryExist ?? defaultPriceFilterQuery,
                    op: 'raw',
                    sign: '>=',
                    value: params.priceFrom,
                });
            }

            if (params.priceTo) {
                whereConditions.push({
                    name: priceGroupFilterPriceQueryExist ?? defaultPriceFilterQuery,
                    op: 'raw',
                    sign: '<=',
                    value: params.priceTo,
                });
            }

            const searchConditions = [];

            if (params.attribute) {
                searchConditions.push({
                    name: ['Product.attribute_keyword'],
                    op: 'attribute',
                    value: attribute,
                });
            }
            if (params.variant) {
                whereConditions.push({
                    name: 'Product.product_id',
                    op: 'IN',
                    sign: 'variant',
                    value: variant,
                });
            }

            if (params.productIds && params.productIds !== '') {
                whereConditions.push({
                    name: 'Product.product_id',
                    op: 'IN',
                    value: params.productIds.split(','),
                });
            }
            const sort = [];
            if (params.price) {
                sort.push({
                    name: priceGroupFilterSortQueryExist ?? defaultPriceSortQuery,
                    order: params.price,
                }, {
                    name: 'Product.createdDate',
                    order: 'DESC',
                });
            } else if (+params.latestArrival) {
                sort.push({
                    name: 'Product.createdDate',
                    order: 'DESC',
                });
            } else if (+params.byRating) {
                sort.push({
                    name: 'Product.rating',
                    order: 'DESC',
                });
            } else {
                // sort.push({
                //     name: 'Product.sortOrder',
                //     order: 'ASC',
                // });
                sort.push({
                    name: 'Product.createdDate',
                    order: 'DESC',
                });
            }
            const searchParam = [];

            if (request.languageId) {
                relations.push(
                    {
                        tableName: 'Product.productTranslation',
                        op: 'leftCond',
                        cond: `productTranslation.languageId = ${request.languageId}`,
                        aliasName: 'productTranslation',
                    }
                );
                selects.push('MAX(productTranslation.name) as productNameTrans');
                selects.push('MAX(productTranslation.description) as productDescriptionTrans');

                groupBy.push(
                    {
                        name: 'productTranslation.languageId',
                    }
                );

                searchParam.push('productTranslation.name');

            } else {

                searchParam.push(...['Product.name']); // 'Product.keywords'

            }

            if (params.keyword) {
                searchConditions.push({
                    name: searchParam,
                    value: params.keyword.toLowerCase(),
                });
            }
            const productList: any = await this.productService.listByQueryBuilder(limit, offset, selects, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const promises = productList.map(async (result: any) => {
                const temp: any = result;
                temp.taxValue = +result.taxValue;

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
                    if (result.quantity === 0) {
                        temp.stockStatus = 'outOfStock';
                    } else if (result.quantity <= result.outOfStockThreshold) {
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

                temp.productNameTrans = result.productNameTrans ?? '';
                temp.productDescriptionTrans = result.productDescriptionTrans ?? '';

                return temp;
            });
            const finalResult = await Promise.all(promises);
            let categoryLevel;
            if (params.categorySlug) {
                const category = await this.categoryService.findOne({ where: { categorySlug: params.categorySlug, isActive: 1 } });
                if (category) {
                    const categoryLevels: any = await this.categoryPathService.find({
                        select: ['level', 'pathId'],
                        where: { categoryId: category.categoryId },
                        order: { level: 'ASC' },
                    }).then((values) => {
                        const categories = values.map(async (val: any) => {
                            const categoryData = await this.categoryService.findOne({ where: { categoryId: val.pathId } });
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
                    categoryLevel = categoryLevels;

                } else {
                    const errorResponse: any = {
                        status: 0,
                        message: 'Invalid category',
                    };
                    return response.status(200).send(errorResponse);
                }
            } else {
                categoryLevel = '';
            }
            if (params.count) {
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got the count of products',
                    data: finalResult.length,
                });
            }
            const successResponse: any = {
                status: 1,
                message: 'Successfully got the complete list of products',
                data: finalResult,
                categoryLevel,
                categorySlug: params?.categorySlug,
            };
            return response.status(200).send(successResponse);
        });
    }

    //   Get Customer Address Detail API
    /**
     * @api {get} /api/list/product-detail/:slug Product Details
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} slug slug
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got the complete list of products.",
     *      "status": "1",
     *      "data":  {
     *               "createdDate": "2024-06-03T09:45:31.000Z",
     *               "productId": 1136,
     *               "sku": "cushion01",
     *               "upc": "1",
     *               "hsn": "",
     *               "location": "",
     *               "quantity": 290,
     *               "minimumQuantity": 1,
     *               "subtractStock": 1,
     *               "stockStatusId": 1,
     *               "quotationAvailable": 0,
     *               "image": "",
     *               "imagePath": "",
     *               "manufacturerId": "",
     *               "shipping": "",
     *               "serviceCharges": "{\"productCost\":348,\"packingCost\":0,\"shippingCost\":0,\"tax\":0,\"others\":0}",
     *               "taxType": 1,
     *               "taxValue": 40,
     *               "price": "455.00",
     *               "priceUpdateFileLogId": "",
     *               "dateAvailable": "2024-06-13T00:00:00.000Z",
     *               "sortOrder": 1,
     *               "name": "Polyester Cushion",
     *               "description": "",
     *               "amount": "",
     *               "keywords": "~ Outdoor cushions~,~Polyester Cushion~",
     *               "discount": "",
     *               "deleteFlag": 0,
     *               "isFeatured": "",
     *               "todayDeals": "",
     *               "condition": "",
     *               "rating": "4.20",
     *               "wishListStatus": 0,
     *               "productSlug": "polyester-cushion",
     *               "isActive": 1,
     *               "width": "0.00",
     *               "height": "0.00",
     *               "length": "0.00",
     *               "weight": "0.00",
     *               "hasStock": 1,
     *               "priceType": 1,
     *               "isSimplified": 0,
     *               "owner": 2,
     *               "isCommon": 0,
     *               "skuId": 1231,
     *               "hasTirePrice": 0,
     *               "outOfStockThreshold": 1,
     *               "notifyMinQuantity": 1,
     *               "minQuantityAllowedCart": 1,
     *               "maxQuantityAllowedCart": 5,
     *               "enableBackOrders": "",
     *               "pincodeBasedDelivery": 0,
     *               "attributeKeyword": "",
     *               "settedAsCommonOn": "",
     *               "productHighlights": [
     *                   {
     *                       "data": ""
     *                  }
     *               ],
     *               "productTranslation": [],
     *               "productNameTrans": "",
     *               "productDescriptionTrans": "",
     *               "ratingCount": 0,
     *               "reviewCount": "null",
     *               "productImage": [
     *                   {
     *                       "productId": 1136,
     *                       "image": "cushion 2_1717407705308.jpeg",
     *                       "containerName": "",
     *                       "defaultImage": 0
     *                   },
     *               ],
     *               "productOriginalImage": [
     *                   {
     *                       "productId": 1136,
     *                       "image": "cushion 2_1717407705308.jpeg",
     *                       "containerName": "",
     *                       "defaultImage": 0
     *                   },
     *               ],
     *               "Category": [
     *                   {
     *                       "productId": 1136,
     *                       "categoryId": 569,
     *                       "categoryName": " Outdoor cushions",
     *                       "categorySlug": "outdoor-cushions1"
     *                   }
     *               ],
     *               "productOption": [],
     *               "skuName": "cushion01",
     *               "variantName": "",
     *               "variantId": "",
     *               "stockStatus": "inStock",
     *               "pricerefer": "",
     *               "flag": "",
     *               "productTirePrices": [],
     *               "vendorId": 9,
     *               "vendorName": "Stella Mechenzi",
     *               "vendorCompanyName": "Van husen Ecommerce pvt lmtd",
     *               "vendorPrefixId": "Ven0009",
     *               "companyLogo": "Img_1722842102100.png",
     *               "companyLogoPath": "logo/",
     *               "vendorCompanyCity": "Chennai",
     *               "vendorDisplayNameUrl": "fathimasilks",
     *               "vendorSlugName": "stella-mechenzi-1",
     *               "companyTaxNumber": "3556676888",
     *               "vendorCompanyCountry": "India",
     *               "buyed": 0,
     *               "productVideo": {
     *                   "id": 1553,
     *                   "productId": 1136,
     *                   "name": "",
     *                   "path": "",
     *                   "type": 0
     *               }
     *  }
     * }
     * @apiSampleRequest /api/list/product-detail/:slug
     * @apiErrorExample {json} Address error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(TenantValidationMiddleware)
    @Get('/product-detail/:slug')
    public async productDetail(@Param('slug') productSlug: string, @Req() request: any, @Res() response: any): Promise<any> {
        const productData = await this.productService.findOne({
            where: {
                productSlug, isActive: 1,
                vendorProducts: {
                    vendorId: request.tenantId,
                },
            },
            relations: ['vendorProducts'],
        });
        if (!productData) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid product slug.',
            });
        }
        productData.vendorProducts = undefined;

        return response.status(200).send({
            status: 1,
            message: 'Successfully got the complete list of products',
            data: productData,
        });
    }

    // Country List API
    /**
     * @api {get} /api/list/country-list Country List API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get country list",
     *      "data":"{
     *              "countryId": ""
     *              "name" : ""
     *              "isoCode2": ""
     *              "isoCode3": ""
     *              "addressFormat": ""
     *              "postcodeRequired": ""
     *      }""
     * }
     * @apiSampleRequest /api/list/country-list
     * @apiErrorExample {json} countryFront error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(TenantValidationMiddleware)
    @Get('/country-list')
    public async countryList(@QueryParam('countryName') countryName: string, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        if (countryName) {
            const country = await this.vendorCountryService.findOne({
                where: {
                    tenantId: request.tenantId,
                    country: { name: countryName },
                },
                relations: ['country'],
            });
            if (!country) {
                const successResponses: any = {
                    status: 0,
                    message: 'Enter Valid Country Name',
                };
                return response.status(200).send(successResponses);
            }
            const successResponse1: any = {
                status: 1,
                message: 'Successfully got country Id',
                data: country,
            };
            return response.status(200).send(successResponse1);
        }
        const select = ['country.countryId', 'country.name', 'country.isoCode2', 'country.isoCode3', 'country.postcodeRequired', 'country.isActive', 'VendorCountry.id', 'VendorCountry.isActive', 'VendorCountry.isDelete'];
        const searchConditions = [];
        if (keyword?.trim()) {
            searchConditions.push(
                {
                    name: ['country.name'],
                    value: keyword,
                }
            );
        }
        const whereConditions = [
            {
                name: 'VendorCountry.tenantId',
                op: 'where',
                value: request.tenantId,
            }, {
                name: 'VendorCountry.isDelete',
                op: 'and',
                value: 0,
            },
        ];
        if (status && status !== '') {
            whereConditions.push({
                name: 'VendorCountry.isActive',
                op: 'and',
                value: status,
            });
        }
        const relations = [
            {
                tableName: 'VendorCountry.country',
                op: 'left',
                aliasName: 'country',
            },
        ];

        const vendorCountry = await this.vendorCountryService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], [], false, false);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the list of countries',
            data: vendorCountry,
        };
        return response.status(200).send(successResponse);

    }

    // Contact Us API
    /**
     * @api {post} /api/list/contact-us  Contact Us API
     * @apiGroup Store List
     * @apiParam (Request body) {String{..255}} name Name
     * @apiParam (Request body) {String{..96}} email Email
     * @apiParam (Request body) {String{..15}} phoneNumber Phone Number
     * @apiParam (Request body) {String{..6}} message Message
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "email" : "",
     *      "phoneNumber" : "",
     *      "message" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Your mail send to admin..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/contact-us
     * @apiErrorExample {json} Contact error
     * HTTP/1.1 500 Internal Server Error
     */
    // ContactUs Function
    @UseBefore(TenantValidationMiddleware)
    @Post('/contact-us')
    public async userContact(@Body({ validate: true }) contactParam: ContactRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const contactInformation = new Contact();
        contactInformation.name = contactParam.name;
        contactInformation.email = contactParam.email;
        contactInformation.phoneNumber = contactParam.phoneNumber;
        contactInformation.message = contactParam.message;
        const informationData = await this.contactService.create(contactInformation);
        const emailContent = await this.emailTemplateService.findOne({ where: { emailTemplateId: 3 } });
        const vendorSetting = await this.vendorSettingsService.findOne({ where: { vendorId: request.tenantId } });
        const vendor = await this.vendorService.findOne({ where: { vendorId: request.tenantId } });
        const message = emailContent.content.replace('{name}', informationData.name).replace('{email}', informationData.email).replace('{phoneNumber}', informationData.phoneNumber).replace('{message}', informationData.message);
        const adminId: any = [];
        const vendorUser = await this.vendorUsersService.find({
            where: {
                tenantId: request.tenantId,
                deleteFlag: 0,
                vendorUserGroup: {
                    slug: 'admin',
                },
            },
            relations: ['vendorUserGroup'],
        });
        for (const user of vendorUser) {
            const value = user.username;
            adminId.push(value);
        }
        // const redirectUrl = env.storeRedirectUrl;
        const mailContent: any = {};
        mailContent.setting = { ...vendorSetting, ...vendor };
        mailContent.emailContent = message;
        const storeUrl = await this.vendorSettingsService.getVendorDomainOrDefault(request.tenantId, request.get('referer'));
        mailContent.redirectUrl = storeUrl ?? '';
        mailContent.productDetailData = '';
        const sendMailRes = MAILService.sendMail(mailContent, adminId, emailContent.subject, false, false, '');
        if (sendMailRes) {
            const successResponse: any = {
                status: 1,
                message: 'Thanks for reaching out. We will be in touch soon',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Mail does not send',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Zone List API
    /**
     * @api {get} /api/list/zone Zone List API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} countryId countryId
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get zone list",
     *      "data":{
     *              "zoneId": 1
     *              "countryId": 99
     *              "code": ""
     *              "name": "",
     *              "isActive": 1
     *             }
     * }
     * @apiSampleRequest /api/list/zone
     * @apiErrorExample {json} Zone error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(TenantValidationMiddleware)
    @Get('/zone')
    public async zonelist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('countryId') countryId: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['zoneId', 'countryId', 'code', 'name', 'isActive', 'createdDate', 'modifiedDate'];
        const search: any = [];
        if (keyword?.trim()) {
            search.push(
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                }
            );
        }
        if (countryId) {
            search.push({
                name: 'countryId',
                op: 'where',
                value: countryId,
            });
        }
        const WhereConditions = [
            {
                name: 'isActive',
                op: 'where',
                value: 1,
            },
        ];
        const relation = ['country'];

        const zoneList = await this.zoneService.list(limit, offset, select, search, WhereConditions, relation, count);

        if (zoneList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get all zone list',
                data: zoneList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'unable to get zone list',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Language List API
    /**
     * @api {get} /api/list/language Language List API
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully got language list",
     *      "data":{
     *              "languageId": 1
     *              "name": ""
     *              "status": 1
     *              "code": ""
     *              "sortOrder": 1,
     *              "image": "",
     *              "imagePath": ""
     *      }
     * }
     * @apiSampleRequest /api/list/language
     * @apiErrorExample {json} Language error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(TenantValidationMiddleware)
    @Get('/language')
    public async languageList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('defaultLanguage') defaultLanguage: number, @Req() request: any, @Res() response: any): Promise<any> {
        const select = ['VendorLanguage.id', 'language.languageId', 'language.name', 'language.code', 'language.image', 'language.imagePath', 'VendorLanguage.isActive', 'language.sortOrder', 'VendorLanguage.createdDate', 'VendorLanguage.modifiedDate'];
        const searchConditions = [];
        if (keyword) {
            searchConditions.push({
                name: ['language.name'],
                value: keyword,
            });
        }
        const whereConditions = [
            {
                name: 'VendorLanguage.tenantId',
                op: 'where',
                value: request.tenantId,
            },
            {
                name: 'VendorLanguage.isDelete',
                op: 'and',
                value: 0,
            },
        ];
        if (status && status !== '') {
            whereConditions.push({
                name: 'VendorLanguage.isActive',
                op: 'and',
                value: status,
            });
        }

        if (defaultLanguage) {
            whereConditions.push(
                {
                    name: 'language.languageId',
                    op: 'and',
                    value: Not(defaultLanguage),
                }
            );
        }

        const relations = [
            {
                tableName: 'VendorLanguage.language',
                op: 'left',
                aliasName: 'language',
            },
        ];
        const languageList = await this.vendorLanguageService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], [], false, false);
        if (languageList) {
            const successResponse: any = {
                status: 1,
                message: 'successfully got the complete language list',
                data: languageList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to show language list',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Specific parent Category List API
    /**
     * @api {get} /api/list/specific-category Specific Category List
     * @apiGroup Store List
     * @apiParam (Request body) {String} categorySlug categorySlug
     * @apiParamExample {json} Input
     * {
     *      "parentInt" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Category listed successfully..!",
     *      "status": "1",
     *      "data" : {
     *              "createdBy": "",
     *              "createdDate": "",
     *              "modifiedBy": "",
     *              "modifiedDate": "",
     *              "categoryId": 1,
     *              "name": "",
     *              "image": "",
     *              "imagePath": "",
     *              "parentInt": 1,
     *              "sortOrder": 1,
     *              "categorySlug": "",
     *              "isActive": 1,
     *              "categoryDescription": "",
     *              "categoryNameTrans": "",
     *              "categoryDescriptionTrans": "",
     *              "children": [{
     *                          "createdBy": "",
     *                          "createdDate": "",
     *                          "modifiedBy": "",
     *                          "modifiedDate": "",
     *                          "categoryId": 2,
     *                          "name": "",
     *                          "image": "",
     *                          "imagePath": "",
     *                          "parentInt": 1,
     *                          "sortOrder": "",
     *                          "categorySlug": "",
     *                          "isActive": 1,
     *                          "categoryDescription": "",
     *                          "categoryNameTrans": "",
     *                          "categoryDescriptionTrans": ""
     *               }]
     * }
     * @apiSampleRequest /api/list/specific-category
     * @apiErrorExample {json} Category List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Category List Function
    @UseBefore(StoreCategoryValidator)
    @UseBefore(TenantValidationMiddleware)
    @UseBefore(TranslationMiddleware)
    @Get('/specific-category')
    public async SpecificcategoryList(@QueryParam('categorySlug') categorySlugParam: string, @Req() request: any, @Res() response: any): Promise<any> {
        const categoryDataId = await this.categoryService.findOne({
            where: {
                categorySlug: categorySlugParam,
            },
        });

        // const categoryTranslation = await this.categoryTranslationService.findOne({ where: { categoryId: categoryDataId.categoryId, languageId: request.languageId ?? 0 } });

        // categoryDataId.categoryNameTrans = categoryTranslation?.name ?? '';
        // categoryDataId.categoryDescriptionTrans = categoryTranslation?.description ?? '';
        const categories = [];
        let tempParentId: number[] = [];
        tempParentId = [categoryDataId.categoryId];

        categories.push(categoryDataId);

        while (true) {

            const chlidCategory = await this.categoryService.find({
                where: {
                    parentInt: In(tempParentId),
                },
                relations: ['categoryTranslation'],
            });

            const childCategoryTranslations = chlidCategory.map((cc) => {

                const childCategoryTranslation = cc.categoryTranslation.find((categoryTrans) => categoryTrans.languageId === request.languageId);

                cc.categoryNameTrans = childCategoryTranslation?.name ?? '';
                cc.categoryDescriptionTrans = childCategoryTranslation?.description ?? '';

                delete cc.categoryTranslation;

                return cc;
            });

            tempParentId = [];

            if (chlidCategory?.length === 0) {
                break;
            }

            categories.push(...childCategoryTranslations);

            tempParentId = chlidCategory.map(category => category.categoryId);
        }

        const categoryList = arrayToTree(categories, {
            parentProperty: 'parentInt',
            customID: 'categoryId',
        });

        categoryList[0].children = categoryList[0].children ?? [];

        const successResponse: any = {
            status: 1,
            message: 'Successfully get the related category list',
            data: categoryList[0],
        };

        return response.status(200).send(successResponse);
    }

    // get payment setting API
    /**
     * @api {get} /api/list/payment Get payment setting API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got payment setting",
     *      "data":{
     *              "plugin_name": ""
     *              "plugin_avatar": ""
     *              "plugin_avatar_path": ""
     *              "plugin_type" : ""
     *              "plugin_status": ""
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/payment
     * @apiErrorExample {json} get payment setting error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(TenantValidationMiddleware)
    @Get('/payment')
    public async paymentSettingList(@Res() response: any, @Res() request: any): Promise<any> {

        const vendorPlugins = await this.vendorPluginService.find({
            where: {
                vendorId: request.tenantId,
                isActive: 1,
            },
        });

        const plugins = await this.pluginService.findAll({
            select: ['id', 'pluginName', 'pluginAvatar', 'pluginAvatarPath'],
            where: {
                id: In(vendorPlugins.map((vendorPlugin) => vendorPlugin.pluginId)),
                pluginStatus: 1,
            },
        });

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the plugin list',
            data: instanceToPlain(plugins),
        };
        return response.status(200).send(successResponse);

    }

    // Active product count API
    /**
     * @api {get} /api/list/product-count  Product Count API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword for search
     * @apiParam (Request body) {String} categoryslug categoryslug
     * @apiParam (Request body) {Number} priceFrom price from you want to list
     * @apiParam (Request body) {Number} priceTo price to you want to list
     * @apiParam (Request body) {String} variant
     * @apiParam (Request body) {String} attribute
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Product Count",
     *       "data": {
     *       "productCount": 100,
     *       "maximumProductPrice": "100000.00"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/product-count
     * @apiErrorExample {json} product count error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(TenantValidationMiddleware)
    @UseBefore(CheckTokenMiddleware)
    @Get('/product-count')
    public async productCount(@QueryParams() params: ListRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const currentDate = moment().format('YYYY-MM-DD');
        const maximum: any = ['Max(product.price) As maximumProductPrice'];
        const maximumPrice: any = await this.productService.productMaxPrice(maximum);
        const productPrice: any = maximumPrice.maximumProductPrice;
        const limit = params.limit;
        const offset = params.offset;
        const selects = [
            'Product.productId as productId',
            'Product.taxType as taxType',
            'Product.taxValue as taxValue',
            'Product.name as name',
            'Product.price as price',
            // 'Product.description as description',
            // 'Product.dateAvailable as dateAvailable',
            'Product.sku as sku',
            'Product.skuId as skuId',
            'Product.isSimplified as isSimplified',
            'Product.isSpecification as isSpecification',
            // 'Product.upc as upc',
            'Product.quantity as quantity',
            // 'Product.rating as rating',
            'Product.isActive as isActive',
            'Product.productSlug as productSlug',
            'Product.hasStock as hasStock',
            'Product.outOfStockThreshold as outOfStockThreshold',
            'Product.stockStatusId as stockStatusId',
            'Product.createdDate as createdDate',
            // 'Product.keywords as keywords',
            // 'Product.attributeKeyword as attributeKeyword',
            // 'vendor.vendorId as vendorId',
            // 'customer.firstName as vendorName',
            // 'vendor.companyName as vendorCompanyName',
            '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
            '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image',
            '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
            '(SELECT sku.sku_name as skuName FROM sku WHERE sku.id = skuId) as skuName',
            '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
            '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as modifiedPrice',
            '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
            ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
            '(SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
        ];
        const whereConditions = [];
        const relations = [];
        const groupBy = [];
        if (params.categorySlug === '' || params.categorySlug === undefined) {
            relations.push(
                {
                    tableName: 'Product.vendorProducts',
                    op: 'left',
                    aliasName: 'vendorProducts',
                },
                {
                    tableName: 'vendorProducts.vendor',
                    op: 'left',
                    aliasName: 'vendor',
                },
                {
                    tableName: 'vendor.customer',
                    op: 'left',
                    aliasName: 'customer',
                });
            whereConditions.push(
                {
                    name: 'Product.isActive',
                    op: 'and',
                    value: 1,
                }, {
                name: '((' + 'customer.isActive',
                op: 'and',
                value: 1,
            }, {
                name: 'customer.deleteFlag',
                op: 'and',
                value: 0 + ')',
            }, {
                name: 'vendor.customer_id ',
                op: 'IS NULL',
                value: ')',
            }, {
                name: 'Product.dateAvailable',
                op: 'raw',
                sign: '<=',
                value: currentDate.toString(),
            });
        } else {
            relations.push({
                tableName: 'Product.productToCategory',
                op: 'left',
                aliasName: 'productToCategory',
            }, {
                tableName: 'productToCategory.category',
                op: 'left',
                aliasName: 'category',
            }, {
                tableName: 'Product.vendorProducts',
                op: 'left',
                aliasName: 'vendorProducts',
            }, {
                tableName: 'vendorProducts.vendor',
                op: 'left',
                aliasName: 'vendor',
            }, {
                tableName: 'vendor.customer',
                op: 'left',
                aliasName: 'customer',
            });
            whereConditions.push({
                name: 'Product.isActive',
                op: 'and',
                value: 1,
            }, {
                name: '((' + 'vendor.isActive',
                op: 'and',
                value: 1,
            }, {
                name: 'vendor.isDelete',
                op: 'and',
                value: 0 + ')',
            }, {
                name: 'vendor.customer_id ',
                op: 'IS NULL',
                value: ')',
            }, {
                name: 'category.category_slug',
                op: 'and',
                value: '"' + params.categorySlug + '"',
            }, {
                name: 'Product.dateAvailable',
                op: 'raw',
                sign: '<=',
                value: currentDate.toString(),
            });
        }

        if (request.id) {
            selects.push('customerWishlist.wishlistProductId as wishlistProductId');
            relations.push({
                tableName: 'Product.wishlist',
                op: 'leftCond',
                aliasName: 'customerWishlist',
                cond: 'customerWishlist.customerId = ' + request.id,
            });
        }
        const searchConditions = [];
        if (params.keyword) {
            searchConditions.push({
                name: ['Product.keywords', 'Product.name'],
                value: params.keyword.toLowerCase(),
            });
        }

        if (params.priceFrom) {
            whereConditions.push({
                name: '(CASE WHEN (((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, Product.taxValue ) != 0 || IF(Product.taxType = 2, Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, Product.taxValue )/100 * (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1)) + (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) WHEN (((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, Product.taxValue ) != 0 || IF(Product.taxType = 2, Product.taxValue ) != NULL)) THEN ((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = ' +
                    ' Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) + IF(Product.taxType = 2, Product.taxValue )) ' +
                    ' WHEN (((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, Product.taxValue ) != 0 || IF(Product.taxType = 2, Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, Product.taxValue )/100 * (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = ' +
                    'Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1)) + (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) WHEN ((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL AND `Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, Product.taxValue ) != 0 || IF(Product.taxType = 2, Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, Product.taxValue ) + (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = ' +
                    'Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1)) WHEN ((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) THEN (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))'
                    + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1)' +
                    ' WHEN ((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL) THEN (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) WHEN (`Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, Product.taxValue ) != 0 || IF(Product.taxType = 2, Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, Product.taxValue )/100 * (SELECT sku.price as price FROM sku WHERE sku.id = Product.skuId)) + (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                    ' Product.skuId) WHEN (`Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, Product.taxValue ) != 0 || IF(Product.taxType = 2, Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, Product.taxValue ) + (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                    'Product.skuId)) ELSE (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                    'Product.skuId) END)',
                op: 'raw',
                sign: '>=',
                value: params.priceFrom,
            });
        }
        if (params.priceTo) {
            whereConditions.push({
                name: '(CASE WHEN (((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, Product.taxValue ) != 0 || IF(Product.taxType = 2, Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, Product.taxValue )/100 * (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1)) + (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) WHEN (((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, Product.taxValue ) != 0 || IF(Product.taxType = 2, Product.taxValue ) != NULL)) THEN ((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = ' +
                    ' Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) + IF(Product.taxType = 2, Product.taxValue )) ' +
                    ' WHEN (((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, Product.taxValue ) != 0 || IF(Product.taxType = 2, Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, Product.taxValue )/100 * (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = ' +
                    'Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1)) + (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) WHEN ((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL AND `Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, Product.taxValue ) != 0 || IF(Product.taxType = 2, Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, Product.taxValue ) + (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = ' +
                    'Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1)) WHEN ((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) THEN (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))'
                    + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1)' +
                    ' WHEN ((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL) THEN (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) WHEN (`Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, Product.taxValue ) != 0 || IF(Product.taxType = 2, Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, Product.taxValue )/100 * (SELECT sku.price as price FROM sku WHERE sku.id = Product.skuId)) + (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                    ' Product.skuId) WHEN (`Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, Product.taxValue ) != 0 || IF(Product.taxType = 2, Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, Product.taxValue ) + (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                    'Product.skuId)) ELSE (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                    'Product.skuId) END)',
                op: 'raw',
                sign: '<=',
                value: params.priceTo,
            });
        }
        const sort = [];
        if (params.price) {
            sort.push({
                name: '(CASE WHEN ((productSpecial IS NOT NULL) AND `Product`.`tax_type` = 2 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue/100 * productSpecial) + productSpecial WHEN ((productSpecial IS NOT NULL) AND `Product`.`tax_type` = 1 AND (taxValue != 0 || taxValue != NULL)) THEN (productSpecial + taxValue) ' +
                    ' WHEN ((productDiscount IS NOT NULL) AND `Product`.`tax_type` = 2 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue/100 * productDiscount) + productDiscount WHEN (productDiscount IS NOT NULL AND `Product`.`tax_type` = 1 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue + productDiscount) WHEN (productSpecial IS NOT NULL) THEN productSpecial' +
                    ' WHEN (productDiscount IS NOT NULL) THEN productDiscount WHEN (`Product`.`tax_type` = 2 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue/100 * modifiedPrice) + modifiedPrice WHEN (`Product`.`tax_type` = 1 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue + modifiedPrice) ELSE modifiedPrice END)',
                order: params.price,
            });
        } else {
            sort.push({
                name: 'Product.sortOrder',
                order: 'ASC',
            });
        }
        const productList: any = await this.productService.listByQueryBuilder(limit, offset, selects, whereConditions, searchConditions, relations, groupBy, sort, true, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get Product Count',
            data: {
                productCount: productList,
                maximumProductPrice: productPrice,
            },
        };
        return response.status(200).send(successResponse);

    }

    // Order log List API
    /**
     * @api {get} /api/list/orderLoglist Order Log List API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} orderPrefixId orderPrefixId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get order log list",
     *      "data":{
     *              "orderProductId": 1
     *              "orderStatusId" : 2,
     *              "total": "",
     *              "createdDate" : "",
     *              "modifiedDate": ""
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/orderLoglist
     * @apiErrorExample {json} order log error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(TenantValidationMiddleware)
    @Get('/orderLoglist')
    public async listOrderLog(@QueryParam('orderPrefixId') orderProductPrefixId: string, @Res() response: any): Promise<any> {
        const orderProductData = await this.orderProductService.findOne({
            where: {
                orderProductPrefixId,
            },
        });
        if (!orderProductData) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid order product Id',
            };
            return response.status(400).send(errorResponse);
        }
        const orderProductId = orderProductData.orderProductId;
        const select = ['orderProductId', 'orderStatusId', 'total', 'createdDate', 'modifiedDate'];
        const whereConditions = [
            {
                name: 'orderProductId',
                op: 'where',
                value: orderProductId,
            },
        ];
        const orderProductList = await this.orderProductLogService.list(0, 0, select, [], whereConditions, 0);
        const orderStatuss = await this.orderStatusService.findAll({ select: ['orderStatusId', 'name'], where: { isActive: 1 } });
        const orderProduct = orderStatuss.map(async (value: any) => {
            const user = orderProductList.find(item => item.orderStatusId === value.orderStatusId);
            const temp: any = value;
            if (user === undefined) {
                temp.createdDate = '';
            } else {
                temp.createdDate = user.createdDate;
            }
            return temp;
        });
        const result = await Promise.all(orderProduct);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete order Log list',
            data: result,
        };
        return response.status(200).send(successResponse);
    }

    // Plugin list
    /**
     * @api /api/list/addons Plugin List
     * @apiGroup Store
     * @apiParam (Request Body) {number} limit limit
     * @apiParam (Request Body) {number} offset offset
     * @apiParam (Request Body) {number} count count
     * @apiSuccessExample {json} success
     * HTTP/1.1 200 Ok
     * {
     *      "status": "1",
     *      "message": "Successfully get the plugin list. ",
     *      "data": {
     *      "status": ,
     *      "additionalInfo": {
     *           "clientId": "",
     *           "clientSecret": "",
     *           "defaultRoute": "",
     *           "isTest": ""
     *       }
     *   }
     *  }
     * }
     * @apiSampleRequest /api/list/addons
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal server error
     */
    @UseBefore(TenantValidationMiddleware)
    @Get('/addons')
    public async PluginList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const pluginList = await this.vendorPluginService.pluginList(limit, offset, count, request.tenantId);
        if (!pluginList) {
            const errorMessage = {
                status: 0,
                message: 'Unable to get the plugin list',
            };
            return response.status(400).send(errorMessage);
        }
        const values = {};
        for (const value of pluginList) {
            const pluginData: any = {
                status: value.isActive,
            };
            if (value.slugName !== 'gmail' && value.slugName !== 'facebook') {
                pluginData.additionalInfo = value.pluginAdditionalInfo
                    ? JSON.parse(value.pluginAdditionalInfo)
                    : {};
            }
            values[value.slugName] = pluginData;
        }
        return response.status(200).send({ status: 1, message: 'Successfully get the list', data: values });
    }

    // Industry list
    /**
     * @api /api/list/industry Industry List
     * @apiGroup Store
     * @apiSuccessExample {json} success
     * HTTP/1.1 200 Ok
     * {
     *      "status": "1",
     *      "message": "Successfully Got Industry List..!",
     *      "data": {
     *              "id": "",
     *              "name": "",
     *              "slug": """,
     *              "isActive": "",
     *              "isDelete": ""
     *              }
     * }
     * @apiSampleRequest /api/list/industry
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal server error
     */
    @UseBefore(TenantValidationMiddleware)
    @Get('/industry')
    public async industryList(@Res() response: any): Promise<any> {
        const industryList = await this.industryService.findAll({
            order: {
                createdDate: 'DESC',
            },
        });
        return response.status(200).send({
            status: 1,
            message: 'Successfully got industry list.',
            data: industryList,
        });
    }

    // Industry list
    /**
     * @api /api/list/industry Industry List
     * @apiGroup Store
     * @apiSuccessExample {json} success
     * HTTP/1.1 200 Ok
     * {
     *      "status": "1",
     *      "message": "Successfully Got Industry List..!",
     *      "data": {
     *              "id": "",
     *              "name": "",
     *              "slug": """,
     *              "isActive": "",
     *              "isDelete": ""
     *              }
     * }
     * @apiSampleRequest /api/list/industry
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal server error
     */
    @UseBefore(TenantValidationMiddleware)
    @Get('/settings')
    public async fetchSettings(@Res() response: any, @Req() request: any): Promise<any> {
        const VendorSettings = await this.vendorSettingsService.findOne({
            where: {
                vendorId: request.tenantId,
            },
        });
        const vendorCurrencyData: any = await this.currencyService.findOne({ where: { currencyId: VendorSettings.storeCurrencyId } });
        const temp: any = {};
        if (vendorCurrencyData) {
            temp.currencyCode = vendorCurrencyData?.code;
            temp.symbolLeft = vendorCurrencyData?.symbolLeft;
            temp.symbolRight = vendorCurrencyData?.symbolRight;
        } else {
            temp.currencyCode = '';
            temp.symbolLeft = '';
            temp.symbolRight = '';
        }

        return response.status(200).send({ status: 1, message: 'Successfully got settings', data: { ...VendorSettings, ...temp } });
    }

    // gmap redirect url
    /**
     * @api {Get} /api/list/gmap-key Get Client Id
     * @apiGroup Store
     * @apiParam (Request body) {string} pluginName pluginName
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 Ok
     *  {
     *      "status": "1",
     *      "message": "Redirect to this url."",
     *      "data": {
     *       "routePath": "",
     *       "clientId": ""
     *   }
     * }
     * @apiSampleRequest /api/list/gmap-key
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal server errorS
     */
    @UseBefore(TenantValidationMiddleware)
    @Get('/gmap-key')
    public async gmapKey(@QueryParam('pluginName') pluginName: string, @Res() response: any): Promise<any> {
        if (pluginName === 'gmap') {
            const plugin = await this.pluginService.findOne({ where: { pluginName, pluginStatus: 1 } });
            if (plugin) {
                const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
                const route = env.baseUrl + pluginInfo.defaultRoute;
                const successResponse: any = {
                    status: 1,
                    message: 'Redirect to this url',
                    data: {
                        returnPath: route,
                        clientId: pluginInfo.clientId,
                    },
                };
                return response.status(200).send(successResponse);
            } else {
                const successResponse: any = {
                    status: 0,
                    message: 'You are not Installed This Plugin / Problem In Installation',
                };
                return response.status(400).send(successResponse);
            }
        }
    }

}
