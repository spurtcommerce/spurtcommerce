"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonListController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const BannerService_1 = require("../../core/services/BannerService");
const mail_services_1 = require("../../../auth/mail.services");
const CategoryService_1 = require("../../core/services/CategoryService");
const ProductService_1 = require("../../core/services/ProductService");
const array_to_tree_1 = tslib_1.__importDefault(require("array-to-tree"));
const CountryService_1 = require("../../core/services/CountryService");
const ContactService_1 = require("../../core/services/ContactService");
const ContactRequest_1 = require("./requests/ContactRequest");
const Contact_1 = require("../../core/models/Contact");
const EmailTemplateService_1 = require("../../core/services/EmailTemplateService");
const zoneService_1 = require("../../core/services/zoneService");
const LanguageService_1 = require("../../core/services/LanguageService");
const CategoryPathService_1 = require("../../core/services/CategoryPathService");
const PluginService_1 = require("../../core/services/PluginService");
const UserService_1 = require("../../core/services/UserService");
const OrderStatusService_1 = require("../../core/services/OrderStatusService");
const OrderProductService_1 = require("../../core/services/OrderProductService");
const OrderProductLogService_1 = require("../../core/services/OrderProductLogService");
const SettingService_1 = require("../../core/services/SettingService");
// import { StoreCategoryValidator } from '../../core/middlewares/StoreCategoryValidatorMiddleware';
const env_1 = require("../../../env");
const ListRequest_1 = require("./requests/ListRequest");
const moment = require("moment");
const checkTokenMiddleware_1 = require("../../core/middlewares/checkTokenMiddleware");
const typeorm_1 = require("typeorm");
const TranslationMiddleware_1 = require("../../core/middlewares/TranslationMiddleware");
const CategoryTranslationService_1 = require("../../core/services/CategoryTranslationService");
const CustomerToGroupService_1 = require("../../../../src/api/core/services/CustomerToGroupService");
const pluginLoader_1 = require("../../../../src/loaders/pluginLoader");
const IndustryService_1 = require("../../core/services/IndustryService");
const IndustryValidationMiddleware_1 = require("../../../api/core/middlewares/IndustryValidationMiddleware");
const typedi_1 = require("typedi");
let CommonListController = class CommonListController {
    constructor(bannerService, categoryService, productService, languageService, countryService, contactService, emailTemplateService, zoneService, categoryPathService, pluginService, userService, orderStatusService, settingsService, orderProductService, orderProductLogService, categoryTranslationService, 
    // private vendorCustomerPriceService: VendorCustomerPriceService,
    // private vendorCustomerGroupPriceService: VendorCustomerGroupPriceService,
    customerToGroupService, industryService) {
        this.bannerService = bannerService;
        this.categoryService = categoryService;
        this.productService = productService;
        this.languageService = languageService;
        this.countryService = countryService;
        this.contactService = contactService;
        this.emailTemplateService = emailTemplateService;
        this.zoneService = zoneService;
        this.categoryPathService = categoryPathService;
        this.pluginService = pluginService;
        this.userService = userService;
        this.orderStatusService = orderStatusService;
        this.settingsService = settingsService;
        this.orderProductService = orderProductService;
        this.orderProductLogService = orderProductLogService;
        this.categoryTranslationService = categoryTranslationService;
        this.customerToGroupService = customerToGroupService;
        this.industryService = industryService;
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
     * @apiSampleRequest /api/list/banner
     * @apiErrorExample {json} Banner List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Product list Function
    bannerList(limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['bannerId', 'title', 'content', 'link', 'position', 'isActive', 'linkType'];
            const search = [
                {
                    name: 'title',
                    op: 'like',
                    value: keyword,
                },
            ];
            const WhereConditions = [
                {
                    name: 'isActive',
                    value: 1,
                },
            ];
            const relations = [
                {
                    tableName: 'bannerImages',
                },
            ];
            const bannerList = yield this.bannerService.list(limit, offset, select, relations, search, WhereConditions, count);
            const list = bannerList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                if (+temp.linkType === 2) {
                    const productRedirectUrl = env_1.env.productRedirectUrl;
                    temp.link = productRedirectUrl.concat(temp.link);
                }
                else if (+temp.linkType === 3) {
                    const categoryRedirectUrl = env_1.env.categoryRedirectUrl;
                    temp.link = categoryRedirectUrl.concat(temp.link).concat('?offset=0');
                }
                else {
                    temp.link = temp.link;
                }
                return temp;
            }));
            const result = yield Promise.all(list);
            const successResponse = {
                status: 1,
                message: 'Successfully got banner list',
                data: result,
            };
            return response.status(200).send(successResponse);
        });
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
    bannerByPosition(position, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const banner = yield this.bannerService.findOne({ where: { position, isActive: 1 } });
            if (!banner) {
                const error = {
                    status: 0,
                    message: 'Invalid/Inactive Banner Position',
                };
                return response.status(400).send(error);
            }
            if (+banner.linkType === 2) {
                const productRedirectUrl = env_1.env.productRedirectUrl;
                banner.link = productRedirectUrl.concat(banner.link);
            }
            else if (+banner.linkType === 3) {
                const categoryRedirectUrl = env_1.env.categoryRedirectUrl;
                banner.link = categoryRedirectUrl.concat(banner.link).concat('?offset=0');
            }
            else {
                banner.link = banner.link;
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got banner detail',
                data: banner,
            };
            return response.status(200).send(successResponse);
        });
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
    ParentCategoryList(limit, offset, keyword, sortOrder, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const relations = [];
            if (request.languageId) {
                relations.push({
                    tableName: 'Category.categoryTranslation',
                    aliasName: 'categoryTranslation',
                });
            }
            const WhereConditions = [];
            WhereConditions.push({
                name: 'Category.isActive',
                op: 'and',
                value: 1,
            }, {
                name: 'Category.industryId',
                op: 'and',
                value: request.store.industryId,
            });
            const search = [];
            if (keyword) {
                search.push({
                    name: ['Category.name'],
                    op: 'like',
                    value: keyword,
                });
            }
            const categoryData = yield this.categoryService.listByQueryBuilder(limit, offset, select, WhereConditions, search, relations, [], [], false, false);
            const categoryTransaDataList = categoryData.map((category) => {
                var _a, _b, _c, _d;
                const categoryTranslation = (_a = category === null || category === void 0 ? void 0 : category.categoryTranslation) === null || _a === void 0 ? void 0 : _a.find((item) => item.languageId === request.languageId);
                category.categoryNameTrans = (_b = categoryTranslation === null || categoryTranslation === void 0 ? void 0 : categoryTranslation.name) !== null && _b !== void 0 ? _b : '';
                category.categoryDescriptionTrans = (_c = categoryTranslation === null || categoryTranslation === void 0 ? void 0 : categoryTranslation.description) !== null && _c !== void 0 ? _c : '';
                category.languageId = (_d = categoryTranslation === null || categoryTranslation === void 0 ? void 0 : categoryTranslation.languageId) !== null && _d !== void 0 ? _d : '';
                category.categoryTranslation = undefined;
                category.imageUrl = `${env_1.env.baseUrl}/media/image-resize?width=150&height=150&name=${category.image}&path=${category.imagePath}`;
                category.redirectUrl = `${env_1.env.categoryRedirectUrl}/${category.categorySlug}`;
                return category;
            });
            const categoryList = (0, array_to_tree_1.default)(categoryTransaDataList, {
                parentProperty: 'parentInt',
                customID: 'categoryId',
            });
            const successResponse = {
                status: 1,
                message: count ? 'Successfully get category count.' : 'Successfully got the list of categories',
                data: count ? categoryList.length : categoryList,
            };
            return response.status(200).send(successResponse);
        });
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
    customProductList(params, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                const variant = [];
                const attribute = [];
                const tempVariant = (_b = (_a = params.variant) === null || _a === void 0 ? void 0 : _a.split(',')) !== null && _b !== void 0 ? _b : [];
                const tempAttribute = (_d = (_c = params.attribute) === null || _c === void 0 ? void 0 : _c.split(',')) !== null && _d !== void 0 ? _d : [];
                if ((tempVariant === null || tempVariant === void 0 ? void 0 : tempVariant.length) > 0) {
                    tempVariant.forEach(element => {
                        const temp = {};
                        const value = element.split('~');
                        temp.name = value[0];
                        temp.value = value[1];
                        variant.push(temp);
                    });
                }
                if ((tempAttribute === null || tempAttribute === void 0 ? void 0 : tempAttribute.length) > 0) {
                    tempAttribute.forEach(element => {
                        const temp = {};
                        const value = element.split('~');
                        temp.name = value[0];
                        temp.value = value[1];
                        attribute.push(temp);
                    });
                }
                const limit = params.limit;
                const offset = params.offset;
                const selects = ['Product.productId as productId',
                    'Product.taxType as taxType',
                    'Product.taxValue as taxValue',
                    'Product.name as name',
                    'Product.price as price',
                    'Product.description as description',
                    'Product.dateAvailable as dateAvailable',
                    'Product.sku as sku',
                    'Product.skuId as skuId',
                    'Product.isSimplified as isSimplified',
                    'Product.isSpecification as isSpecification',
                    'Product.upc as upc',
                    'Product.quantity as quantity',
                    'Product.rating as rating',
                    'Product.isActive as isActive',
                    'Product.isGrouped as isGrouped',
                    'Product.isVisible as isVisible',
                    'Product.productSlug as productSlug',
                    'Product.hasStock as hasStock',
                    'Product.outOfStockThreshold as outOfStockThreshold',
                    'Product.stockStatusId as stockStatusId',
                    'Product.createdDate as createdDate',
                    'Product.keywords as keywords',
                    'Product.attributeKeyword as attributeKeyword',
                    'MAX(vendor.vendorId) as vendorId',
                    'MAX(customer.firstName) as vendorName',
                    'MAX(vendor.companyName) as vendorCompanyName',
                    'MAX(vendor.vendorSlugName) as vendorSlugName',
                    'MAX(vendor.displayNameUrl) as displayNameUrl',
                    'MAX(vendor.companyLogo) as companyLogo',
                    'MAX(vendor.companyLogoPath) as companyLogoPath',
                    'skuDetail.maxQuantityAllowedCart as maxQuantityAllowedCart',
                    'skuDetail.minQuantityAllowedCart as minQuantityAllowedCart',
                    '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                    '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image',
                    '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
                    '(SELECT AVG(pr.rating) as ratingCount FROM product_rating pr WHERE pr.product_id = Product.productId) as ratingCount',
                    '(SELECT COUNT(pr.review) as reviewCount FROM product_rating pr WHERE pr.product_id = Product.productId AND pr.review IS NOT NULL) as reviewCount',
                    'IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )  as taxValue',
                    '(SELECT sku.sku_name as skuName FROM sku WHERE sku.id = skuId) as skuName',
                    '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
                    '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as modifiedPrice',
                    '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
                    '(SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
                ];
                const whereCondition = [];
                const currentDate = moment().format('YYYY-MM-DD');
                const relations = [];
                const groupBy = [];
                const searchConditions = [];
                groupBy.push({
                    name: 'Product.productId',
                });
                if (params.categorySlug === '' || params.categorySlug === undefined) {
                    relations.push({
                        tableName: 'Product.vendorProducts',
                        op: 'left',
                        aliasName: 'vendorProducts',
                    }, {
                        tableName: 'Product.productToCategory',
                        op: 'left',
                        aliasName: 'productToCategory',
                    }, {
                        tableName: 'productToCategory.category',
                        op: 'left',
                        aliasName: 'category',
                    }, {
                        tableName: 'vendorProducts.vendor',
                        op: 'leftCond',
                        cond: 'vendor.approvalFlag = 1',
                        aliasName: 'vendor',
                    }, {
                        tableName: 'vendor.customer',
                        op: 'leftCond',
                        cond: 'vendor.isActive = 1',
                        aliasName: 'customer',
                    }, {
                        tableName: 'Product.skuDetail',
                        op: 'left',
                        aliasName: 'skuDetail',
                    });
                    whereCondition.push({
                        name: 'Product.isActive',
                        op: 'and',
                        value: 1,
                    }, {
                        name: 'Product.isVisible',
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
                    // {
                    //     name: 'category.industry_id',
                    //     op: 'and',
                    //     value: request.store.industryId,
                    // },
                    {
                        name: 'Product.dateAvailable',
                        op: 'raw',
                        sign: '<=',
                        value: currentDate.toString(),
                    });
                }
                else {
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
                        op: 'leftCond',
                        cond: 'vendor.approvalFlag = 1',
                        aliasName: 'vendor',
                    }, {
                        tableName: 'Product.skuDetail',
                        op: 'left',
                        aliasName: 'skuDetail',
                    }, {
                        tableName: 'vendor.customer',
                        op: 'leftCond',
                        cond: 'vendor.isActive = 1',
                        aliasName: 'customer',
                    });
                    whereCondition.push({
                        name: 'Product.isActive',
                        op: 'and',
                        value: 1,
                    }, {
                        name: 'Product.isVisible',
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
                    }, {
                        name: 'category.category_slug',
                        op: 'and',
                        value: '"' + params.categorySlug + '"',
                    }, 
                    // {
                    //     name: 'category.industry_id',
                    //     op: 'and',
                    //     value: request.store.industryId,
                    // },
                    {
                        name: 'Product.dateAvailable',
                        op: 'raw',
                        sign: '<=',
                        value: currentDate.toString(),
                    });
                }
                searchConditions.push({
                    name: ['category.industry_id'],
                    value: request.store.industryId,
                });
                selects.push('MAX(customerWishlist.wishlistProductId) as wishlistProductId');
                relations.push({
                    tableName: 'Product.wishlist',
                    op: 'leftCond',
                    aliasName: 'customerWishlist',
                    cond: 'customerWishlist.customerId = ' + (request.id !== '' ? request.id : 0),
                });
                const defaultPriceFilterQuery = '(CASE WHEN (((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1)) + (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) WHEN (((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN ((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = ' +
                    ' Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) + IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )) ' +
                    ' WHEN (((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = ' +
                    'Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1)) + (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) WHEN ((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL AND `Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) + (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = ' +
                    'Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1)) WHEN ((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) THEN (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))'
                    + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1)' +
                    ' WHEN ((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL) THEN (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) WHEN (`Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT sku.price as price FROM sku WHERE sku.id = Product.skuId)) + (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                    ' Product.skuId) WHEN (`Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) + (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                    'Product.skuId)) ELSE (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                    'Product.skuId) END)';
                const defaultPriceSortQuery = '(CASE WHEN ((productSpecial IS NOT NULL) AND `Product`.`tax_type` = 2 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue/100 * productSpecial) + productSpecial WHEN ((productSpecial IS NOT NULL) AND `Product`.`tax_type` = 1 AND (taxValue != 0 || taxValue != NULL)) THEN (productSpecial + taxValue) ' +
                    ' WHEN ((productDiscount IS NOT NULL) AND `Product`.`tax_type` = 2 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue/100 * productDiscount) + productDiscount WHEN (productDiscount IS NOT NULL AND `Product`.`tax_type` = 1 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue + productDiscount) WHEN (productSpecial IS NOT NULL) THEN productSpecial' +
                    ' WHEN (productDiscount IS NOT NULL) THEN productDiscount WHEN (`Product`.`tax_type` = 2 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue/100 * modifiedPrice) + modifiedPrice WHEN (`Product`.`tax_type` = 1 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue + modifiedPrice) ELSE modifiedPrice END)';
                // price group addon exist
                let priceGroupFilterPriceQueryExist = undefined;
                let priceGroupFilterSortQueryExist = undefined;
                if (pluginLoader_1.pluginModule.includes('ProductPriceGroup') && (yield this.pluginService.findOne({ where: { slugName: 'product-price-group', pluginStatus: 1 } }))) {
                    // cutomer price
                    const { vendorCustomerPriceService, priceGroupFilterQuery, vendorCustomerGroupPriceService } = require('../../../../add-ons/ProductPriceGroup/priceGroupHook');
                    const vendorCustomerPriceList = yield vendorCustomerPriceService('find', { where: { customerId: request.id } });
                    const vendorCustomerPriceGroupIds = vendorCustomerPriceList.map((vendorCustomerPrice) => vendorCustomerPrice.priceGroupId);
                    selects.push(`(SELECT MIN(price) FROM vendor_price_group_detail vpgd INNER JOIN vendor_price_group_schedule vpgs ON vpgd.id = vpgs.price_group_detail_id WHERE vpgd.sku_id = Product.skuId AND vpgd.price_group_id IN(${[0, ...vendorCustomerPriceGroupIds]}) AND vpgs.start_date <= CURDATE() AND vpgs.end_date >= CURDATE()) as vcPrice`);
                    // cutomer group price
                    const vendorCustomerGroupList = yield this.customerToGroupService.find({ where: { customerId: request.id } });
                    const vendorCustomerGroupIds = vendorCustomerGroupList.map((vendorCustomerGroup) => vendorCustomerGroup.customerGroupId);
                    const vendorCustomerGroupPriceList = yield vendorCustomerGroupPriceService('find', { where: { customerGroupId: (0, typeorm_1.In)(vendorCustomerGroupIds) } });
                    const vendorCustomerGroupPriceGroupIds = vendorCustomerGroupPriceList.map((vendorCustomerGroupPrice) => vendorCustomerGroupPrice.priceGroupId);
                    selects.push(`(SELECT MIN(price) FROM vendor_price_group_detail vpgd INNER JOIN vendor_price_group_schedule vpgs ON vpgd.id = vpgs.price_group_detail_id WHERE vpgd.sku_id = Product.skuId AND vpgd.price_group_id IN(${[0, ...vendorCustomerGroupPriceGroupIds]}) AND vpgs.start_date <= CURDATE() AND vpgs.end_date >= CURDATE()) as vcgPrice`);
                    priceGroupFilterPriceQueryExist = priceGroupFilterQuery(defaultPriceFilterQuery, vendorCustomerPriceGroupIds, vendorCustomerGroupPriceGroupIds);
                    priceGroupFilterSortQueryExist = priceGroupFilterQuery(defaultPriceSortQuery, vendorCustomerPriceGroupIds, vendorCustomerGroupPriceGroupIds);
                }
                if (params.priceFrom) {
                    whereCondition.push({
                        name: priceGroupFilterPriceQueryExist !== null && priceGroupFilterPriceQueryExist !== void 0 ? priceGroupFilterPriceQueryExist : defaultPriceFilterQuery,
                        op: 'raw',
                        sign: '>=',
                        value: params.priceFrom,
                    });
                }
                if (params.priceTo) {
                    whereCondition.push({
                        name: priceGroupFilterPriceQueryExist !== null && priceGroupFilterPriceQueryExist !== void 0 ? priceGroupFilterPriceQueryExist : defaultPriceFilterQuery,
                        op: 'raw',
                        sign: '<=',
                        value: params.priceTo,
                    });
                }
                if (params.attribute) {
                    searchConditions.push({
                        name: ['Product.attribute_keyword'],
                        op: 'attribute',
                        value: attribute,
                    });
                }
                if (params.variant) {
                    whereCondition.push({
                        name: 'Product.product_id',
                        op: 'IN',
                        sign: 'variant',
                        value: variant,
                    });
                }
                const sort = [];
                if (params.price) {
                    sort.push({
                        name: priceGroupFilterSortQueryExist !== null && priceGroupFilterSortQueryExist !== void 0 ? priceGroupFilterSortQueryExist : defaultPriceSortQuery,
                        order: params.price,
                    });
                }
                else if (+params.latestArrival) {
                    sort.push({
                        name: 'Product.createdDate',
                        order: 'DESC',
                    });
                }
                else if (+params.byRating) {
                    sort.push({
                        name: 'Product.rating',
                        order: 'DESC',
                    });
                }
                else {
                    sort.push({
                        name: 'Product.sortOrder',
                        order: 'ASC',
                    });
                }
                const searchParam = [];
                if (request.languageId) {
                    relations.push({
                        tableName: 'Product.productTranslation',
                        op: 'leftCond',
                        cond: `productTranslation.languageId = ${request.languageId}`,
                        aliasName: 'productTranslation',
                    });
                    selects.push('MAX(productTranslation.name) as productNameTrans');
                    selects.push('MAX(productTranslation.description) as productDescriptionTrans');
                    groupBy.push({
                        name: 'productTranslation.languageId',
                    });
                    searchParam.push('productTranslation.name');
                }
                else {
                    searchParam.push(...['Product.name']); // 'Product.keywords'
                }
                if (params.keyword) {
                    searchConditions.push({
                        name: searchParam,
                        value: params.keyword.toLowerCase(),
                    });
                }
                const productList = yield this.productService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
                const promises = productList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    var _a, _b;
                    const temp = result;
                    temp.taxValue = +result.taxValue;
                    if (result.productSpecial !== null) {
                        temp.pricerefer = result.productSpecial;
                        temp.flag = 1;
                    }
                    else if (result.productDiscount !== null) {
                        temp.pricerefer = result.productDiscount;
                        temp.flag = 0;
                    }
                    else {
                        temp.pricerefer = '';
                        temp.flag = '';
                    }
                    if (result.hasStock === 1) {
                        if (result.quantity <= result.outOfStockThreshold) {
                            temp.stockStatus = 'outOfStock';
                        }
                        else {
                            temp.stockStatus = 'inStock';
                        }
                    }
                    else {
                        temp.stockStatus = 'inStock';
                    }
                    if ((result.wishlistProductId !== null) && result.wishlistProductId) {
                        temp.wishListStatus = 1;
                    }
                    else {
                        temp.wishListStatus = 0;
                    }
                    temp.productNameTrans = (_a = result.productNameTrans) !== null && _a !== void 0 ? _a : '';
                    temp.productDescriptionTrans = (_b = result.productDescriptionTrans) !== null && _b !== void 0 ? _b : '';
                    temp.imageUrl = `${env_1.env.baseUrl}/media/image-resize?width=150&height=150&name=${result.image}&path=${result.containerName}`;
                    temp.redirectUrl = `${env_1.env.storeRedirectUrl}/products/${result.productSlug}`;
                    return temp;
                }));
                const finalResult = yield Promise.all(promises);
                let categoryLevel;
                if (params.categorySlug) {
                    const category = yield this.categoryService.findOne({ where: { categorySlug: params.categorySlug, isActive: 1 } });
                    if (category) {
                        const categoryLevels = yield this.categoryPathService.find({
                            select: ['level', 'pathId'],
                            where: { categoryId: category.categoryId },
                            order: { level: 'ASC' },
                        }).then((values) => {
                            const categories = values.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                                const categoryData = yield this.categoryService.findOne({ where: { categoryId: val.pathId } });
                                const tempVal = val;
                                tempVal.categoryName = categoryData ? categoryData.name : '';
                                tempVal.categoryId = categoryData ? categoryData.categoryId : '';
                                tempVal.categorySlug = categoryData ? categoryData.categorySlug : '';
                                tempVal.parentInt = categoryData ? categoryData.parentInt : '';
                                tempVal.categoryDescription = categoryData ? categoryData.categoryDescription : '';
                                return tempVal;
                            }));
                            const results = Promise.all(categories);
                            return results;
                        });
                        categoryLevel = categoryLevels;
                    }
                    else {
                        const errorResponse = {
                            status: 0,
                            message: 'Invalid category',
                        };
                        return response.status(200).send(errorResponse);
                    }
                }
                else {
                    categoryLevel = '';
                }
                if (params.count) {
                    return response.status(200).send({
                        status: 1,
                        message: 'Successfully got the count of products',
                        data: finalResult.length,
                    });
                }
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the complete list of products',
                    data: finalResult,
                    categoryLevel,
                    categorySlug: params === null || params === void 0 ? void 0 : params.categorySlug,
                };
                return response.status(200).send(successResponse);
            }));
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
    productDetail(productSlug, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productData = yield this.productService.findOne({ where: { productSlug } });
            if (!productData) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid product slug',
                });
            }
            const whereCondition = [];
            whereCondition.push({
                name: 'Product.isActive',
                op: 'and',
                value: 1,
            }, {
                name: 'Product.productSlug',
                op: 'and',
                value: productData,
            });
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the complete list of products',
                data: productData,
            });
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
    countryList(countryName, limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (countryName) {
                const country = yield this.countryService.findOne({ where: { name: countryName } });
                if (!country) {
                    const successResponses = {
                        status: 0,
                        message: 'Enter Valid Country Name',
                    };
                    return response.status(200).send(successResponses);
                }
                const successResponse1 = {
                    status: 1,
                    message: 'Successfully got country Id',
                    data: country,
                };
                return response.status(200).send(successResponse1);
            }
            const select = ['countryId', 'name', 'isoCode2', 'isoCode3', 'postcodeRequired', 'isActive'];
            const search = [];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                search.push({
                    name: 'name',
                    op: 'like',
                    value: keyword,
                });
            }
            const WhereConditions = [
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
            ];
            const countryList = yield this.countryService.list(limit, offset, select, search, WhereConditions, count);
            const successResponse = {
                status: 1,
                message: 'Successfully got the list of countries',
                data: countryList,
            };
            return response.status(200).send(successResponse);
        });
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
    userContact(contactParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const contactInformation = new Contact_1.Contact();
            contactInformation.name = contactParam.name;
            contactInformation.email = contactParam.email;
            contactInformation.phoneNumber = contactParam.phoneNumber;
            contactInformation.message = contactParam.message;
            const informationData = yield this.contactService.create(contactInformation);
            const emailContent = yield this.emailTemplateService.findOne({ where: { emailTemplateId: 3 } });
            const logo = yield this.settingsService.findOne({ where: {} });
            const message = emailContent.content.replace('{name}', informationData.name).replace('{email}', informationData.email).replace('{phoneNumber}', informationData.phoneNumber).replace('{message}', informationData.message);
            const adminId = [];
            const adminUser = yield this.userService.findAll({ select: ['username'], where: { userGroupId: 1 } });
            for (const user of adminUser) {
                const val = user.username;
                adminId.push(val);
            }
            const redirectUrl = env_1.env.storeRedirectUrl;
            const mailContent = {};
            mailContent.logo = logo;
            mailContent.emailContent = message;
            mailContent.redirectUrl = redirectUrl;
            mailContent.productDetailData = '';
            const sendMailRes = mail_services_1.MAILService.sendMail(mailContent, adminId, emailContent.subject, false, false, '');
            if (sendMailRes) {
                const successResponse = {
                    status: 1,
                    message: 'Thanks for reaching out. We will be in touch soon',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Mail does not send',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    zonelist(limit, offset, countryId, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['zoneId', 'countryId', 'code', 'name', 'isActive', 'createdDate', 'modifiedDate'];
            const search = [];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                search.push({
                    name: 'name',
                    op: 'like',
                    value: keyword,
                });
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
            const zoneList = yield this.zoneService.list(limit, offset, select, search, WhereConditions, relation, count);
            if (zoneList) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully get all zone list',
                    data: zoneList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'unable to get zone list',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    languageList(limit, offset, keyword, count, defaultLanguage, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['languageId', 'name', 'code', 'image', 'imagePath', 'isActive', 'sortOrder', 'isActive', 'createdDate', 'modifiedDate'];
            const search = [
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                },
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
            ];
            const WhereConditions = [];
            if (defaultLanguage) {
                WhereConditions.push({
                    name: 'languageId',
                    value: (0, typeorm_1.Not)(defaultLanguage),
                });
            }
            const languageList = yield this.languageService.list(limit, offset, select, search, WhereConditions, count);
            if (languageList) {
                const successResponse = {
                    status: 1,
                    message: 'successfully got the complete language list',
                    data: languageList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to show language list',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    // @UseBefore(StoreCategoryValidator)
    SpecificcategoryList(categorySlugParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const categoryDataId = yield this.categoryService.findOne({
                where: {
                    categorySlug: categorySlugParam,
                },
            });
            const categoryTranslation = yield this.categoryTranslationService.findOne({ where: { categoryId: categoryDataId.categoryId, languageId: (_a = request.languageId) !== null && _a !== void 0 ? _a : 0 } });
            categoryDataId.categoryNameTrans = (_b = categoryTranslation === null || categoryTranslation === void 0 ? void 0 : categoryTranslation.name) !== null && _b !== void 0 ? _b : '';
            categoryDataId.categoryDescriptionTrans = (_c = categoryTranslation === null || categoryTranslation === void 0 ? void 0 : categoryTranslation.description) !== null && _c !== void 0 ? _c : '';
            const categories = [];
            let tempParentId = [];
            tempParentId = [categoryDataId.categoryId];
            categories.push(categoryDataId);
            while (true) {
                const chlidCategory = yield this.categoryService.find({
                    where: {
                        parentInt: (0, typeorm_1.In)(tempParentId),
                    },
                    relations: ['categoryTranslation'],
                });
                const childCategoryTranslations = chlidCategory.map((cc) => {
                    var _a, _b;
                    const childCategoryTranslation = cc.categoryTranslation.find((categoryTrans) => categoryTrans.languageId === request.languageId);
                    cc.categoryNameTrans = (_a = childCategoryTranslation === null || childCategoryTranslation === void 0 ? void 0 : childCategoryTranslation.name) !== null && _a !== void 0 ? _a : '';
                    cc.categoryDescriptionTrans = (_b = childCategoryTranslation === null || childCategoryTranslation === void 0 ? void 0 : childCategoryTranslation.description) !== null && _b !== void 0 ? _b : '';
                    delete cc.categoryTranslation;
                    return cc;
                });
                tempParentId = [];
                if ((chlidCategory === null || chlidCategory === void 0 ? void 0 : chlidCategory.length) === 0) {
                    break;
                }
                categories.push(...childCategoryTranslations);
                tempParentId = chlidCategory.map(category => category.categoryId);
            }
            const categoryList = (0, array_to_tree_1.default)(categories, {
                parentProperty: 'parentInt',
                customID: 'categoryId',
            });
            categoryList[0].children = (_d = categoryList[0].children) !== null && _d !== void 0 ? _d : [];
            const successResponse = {
                status: 1,
                message: 'Successfully get the related category list',
                data: categoryList[0],
            };
            return response.status(200).send(successResponse);
        });
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
    paymentSettingList(limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['id', 'pluginName', 'pluginAvatar', 'pluginAvatarPath', 'pluginType', 'pluginAdditionalInfo', 'pluginStatus'];
            const search = [
                {
                    name: 'pluginType',
                    op: 'like',
                    value: keyword,
                },
                {
                    name: 'pluginStatus',
                    op: 'where',
                    value: 1,
                },
            ];
            const WhereConditions = [];
            const paymentSettingList = yield this.pluginService.list(limit, offset, select, search, WhereConditions, count);
            const successResponse = {
                status: 1,
                message: 'Successfully got payment list',
                data: paymentSettingList,
            };
            return response.status(200).send(successResponse);
        });
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
    productCount(params, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const currentDate = moment().format('YYYY-MM-DD');
            const maximum = ['Max(product.price) As maximumProductPrice'];
            const maximumPrice = yield this.productService.productMaxPrice(maximum);
            const productPrice = maximumPrice.maximumProductPrice;
            const limit = params.limit;
            const offset = params.offset;
            const selects = ['Product.productId as productId',
                'Product.taxType as taxType',
                'Product.taxValue as taxValue',
                'Product.name as name',
                'Product.price as price',
                'Product.description as description',
                'Product.dateAvailable as dateAvailable',
                'Product.sku as sku',
                'Product.skuId as skuId',
                'Product.isSimplified as isSimplified',
                'Product.isSpecification as isSpecification',
                'Product.upc as upc',
                'Product.quantity as quantity',
                'Product.rating as rating',
                'Product.isActive as isActive',
                'Product.productSlug as productSlug',
                'Product.hasStock as hasStock',
                'Product.outOfStockThreshold as outOfStockThreshold',
                'Product.stockStatusId as stockStatusId',
                'Product.createdDate as createdDate',
                'Product.keywords as keywords',
                'Product.attributeKeyword as attributeKeyword',
                'vendor.vendorId as vendorId',
                'customer.firstName as vendorName',
                'vendor.companyName as vendorCompanyName',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
                'IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )  as taxValue',
                '(SELECT sku.sku_name as skuName FROM sku WHERE sku.id = skuId) as skuName',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as modifiedPrice',
                '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
                '(SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
            ];
            const whereCondition = [];
            const relations = [];
            const groupBy = [];
            if (params.categorySlug === '' || params.categorySlug === undefined) {
                relations.push({
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
                whereCondition.push({
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
            }
            else {
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
                whereCondition.push({
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
                whereCondition.push({
                    name: '(CASE WHEN (((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1)) + (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) WHEN (((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN ((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = ' +
                        ' Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) + IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )) ' +
                        ' WHEN (((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = ' +
                        'Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1)) + (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) WHEN ((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL AND `Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) + (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = ' +
                        'Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1)) WHEN ((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) THEN (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))'
                        + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1)' +
                        ' WHEN ((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL) THEN (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) WHEN (`Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT sku.price as price FROM sku WHERE sku.id = Product.skuId)) + (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                        ' Product.skuId) WHEN (`Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) + (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                        'Product.skuId)) ELSE (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                        'Product.skuId) END)',
                    op: 'raw',
                    sign: '>=',
                    value: params.priceFrom,
                });
            }
            if (params.priceTo) {
                whereCondition.push({
                    name: '(CASE WHEN (((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1)) + (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) WHEN (((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN ((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = ' +
                        ' Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) + IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )) ' +
                        ' WHEN (((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = ' +
                        'Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1)) + (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) WHEN ((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL AND `Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) + (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = ' +
                        'Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1)) WHEN ((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) THEN (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))'
                        + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1)' +
                        ' WHEN ((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL) THEN (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) WHEN (`Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT sku.price as price FROM sku WHERE sku.id = Product.skuId)) + (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                        ' Product.skuId) WHEN (`Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) + (SELECT sku.price as price FROM sku WHERE sku.id = ' +
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
            }
            else {
                sort.push({
                    name: 'Product.sortOrder',
                    order: 'ASC',
                });
            }
            const productList = yield this.productService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, true, true);
            const successResponse = {
                status: 1,
                message: 'Successfully get Product Count',
                data: {
                    productCount: productList,
                    maximumProductPrice: productPrice,
                },
            };
            return response.status(200).send(successResponse);
        });
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
    listOrderLog(orderProductPrefixId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderProductData = yield this.orderProductService.findOne({
                where: {
                    orderProductPrefixId,
                },
            });
            if (!orderProductData) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid order product Id',
                };
                return response.status(400).send(errorResponse);
            }
            const orderProductId = orderProductData.orderProductId;
            const select = ['orderProductId', 'orderStatusId', 'total', 'createdDate', 'modifiedDate'];
            const relation = [];
            const WhereConditions = [
                {
                    name: 'orderProductId',
                    op: 'where',
                    value: orderProductId,
                },
            ];
            const orderProductList = yield this.orderProductLogService.list(0, 0, select, relation, WhereConditions, 0);
            const orderStatuss = yield this.orderStatusService.findAll({ select: ['orderStatusId', 'name'], where: { isActive: 1 } });
            const orderProduct = orderStatuss.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const user = orderProductList.find(item => item.orderStatusId === value.orderStatusId);
                const temp = value;
                if (user === undefined) {
                    temp.createdDate = '';
                }
                else {
                    temp.createdDate = user.createdDate;
                }
                return temp;
            }));
            const result = yield Promise.all(orderProduct);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete order Log list',
                data: result,
            };
            return response.status(200).send(successResponse);
        });
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
    PluginList(limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginList = yield this.pluginService.pluginList(limit, offset, count);
            if (!pluginList) {
                const errorMessage = {
                    status: 0,
                    message: 'Unable to get the plugin list',
                };
                return response.status(400).send(errorMessage);
            }
            const values = {};
            for (const value of pluginList) {
                values[value.slugName] = {
                    status: value.pluginStatus,
                    additionalInfo: value.pluginAdditionalInfo ? JSON.parse(value.pluginAdditionalInfo) : {},
                };
            }
            return response.status(200).send({ status: 1, message: 'Successfully get the list', data: values });
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
    industryList(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const industryList = yield this.industryService.findAll({
                order: {
                    createdDate: 'DESC',
                },
            });
            return response.status(200).send({
                status: 1,
                message: `Successfully got industry list`,
                data: industryList,
            });
        });
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
    gmapKey(pluginName, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (pluginName === 'gmap') {
                const plugin = yield this.pluginService.findOne({ where: { pluginName, pluginStatus: 1 } });
                if (plugin) {
                    const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
                    const route = env_1.env.baseUrl + pluginInfo.defaultRoute;
                    const successResponse = {
                        status: 1,
                        message: 'Redirect to this url',
                        data: {
                            returnPath: route,
                            clientId: pluginInfo.clientId,
                        },
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    const successResponse = {
                        status: 0,
                        message: 'You are not Installed This Plugin / Problem In Installation',
                    };
                    return response.status(400).send(successResponse);
                }
            }
        });
    }
};
exports.CommonListController = CommonListController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/banner'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "bannerList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/banner/position/:position'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('position')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "bannerByPosition", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/category'),
    (0, routing_controllers_1.UseBefore)(TranslationMiddleware_1.TranslationMiddleware),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('sortOrder')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Req)()),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "ParentCategoryList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckTokenMiddleware)
    // @UseBefore(StoreCategoryValidator)
    ,
    (0, routing_controllers_1.UseBefore)(TranslationMiddleware_1.TranslationMiddleware),
    (0, routing_controllers_1.Get)('/custom-product-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParams)()),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ListRequest_1.ListRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "customProductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product-detail/:slug'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('slug')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "productDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/country-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('countryName')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "countryList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/contact-us'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ContactRequest_1.ContactRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "userContact", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/zone'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('countryId')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "zonelist", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/language'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('defaultLanguage')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "languageList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(TranslationMiddleware_1.TranslationMiddleware),
    (0, routing_controllers_1.Get)('/specific-category'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('categorySlug')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "SpecificcategoryList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/payment'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "paymentSettingList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckTokenMiddleware)
    // @UseBefore(StoreCategoryValidator)
    ,
    (0, routing_controllers_1.Get)('/product-count'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParams)()),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ListRequest_1.ListRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "productCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/orderLoglist'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderPrefixId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "listOrderLog", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/addons'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "PluginList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/industry'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "industryList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/gmap-key'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('pluginName')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "gmapKey", null);
exports.CommonListController = CommonListController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.UseBefore)(IndustryValidationMiddleware_1.IndustryValidationMiddleware),
    (0, routing_controllers_1.JsonController)('/list'),
    tslib_1.__metadata("design:paramtypes", [BannerService_1.BannerService,
        CategoryService_1.CategoryService,
        ProductService_1.ProductService,
        LanguageService_1.LanguageService,
        CountryService_1.CountryService,
        ContactService_1.ContactService,
        EmailTemplateService_1.EmailTemplateService,
        zoneService_1.ZoneService,
        CategoryPathService_1.CategoryPathService,
        PluginService_1.PluginService,
        UserService_1.UserService,
        OrderStatusService_1.OrderStatusService,
        SettingService_1.SettingService,
        OrderProductService_1.OrderProductService,
        OrderProductLogService_1.OrderProductLogService,
        CategoryTranslationService_1.CategoryTranslationService,
        CustomerToGroupService_1.CustomerToGroupService,
        IndustryService_1.IndustryService])
], CommonListController);
//# sourceMappingURL=CommonListController.js.map