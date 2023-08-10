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
const mail_services_1 = require("../../../auth/mail.services");
const class_transformer_1 = require("class-transformer");
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
const env_1 = require("../../../env");
const ListRequest_1 = require("./requests/ListRequest");
const moment = require("moment");
const checkTokenMiddleware_1 = require("../../core/middlewares/checkTokenMiddleware");
let CommonListController = class CommonListController {
    constructor(categoryService, productService, languageService, countryService, contactService, emailTemplateService, zoneService, categoryPathService, pluginService, userService, orderStatusService, settingsService, orderProductService, orderProductLogService) {
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
    }
    // Category List Tree API
    /**
     * @api {get} /api/list/category-list Category List Tree API
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
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/category-list
     * @apiErrorExample {json} Category List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Category List Function
    ParentCategoryList(limit, offset, keyword, sortOrder, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['categoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'categorySlug', 'isActive'];
            const search = [
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                }, {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
            ];
            const WhereConditions = [];
            const categoryData = yield this.categoryService.list(limit, offset, select, search, WhereConditions, sortOrder, count);
            if (count) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully get All category List',
                    data: categoryData,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const categoryList = (0, array_to_tree_1.default)(categoryData, {
                    parentProperty: 'parentInt',
                    customID: 'categoryId',
                });
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the list of categories.',
                    data: categoryList,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Custom Product List API
    /**
     * @api {get} /api/list/custom-product-list Custom Product List API
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} categoryslug categoryslug
     * @apiParam (Request body) {Number} priceFrom price from you want to list
     * @apiParam (Request body) {Number} priceTo price to you want to list
     * @apiParam (Request body) {String} price ASC OR DESC
     * @apiParam (Request body) {String} keyword keyword
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/list/custom-product-list
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    customProductList(params, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                    'Product.upc as upc',
                    'Product.quantity as quantity',
                    'Product.isActive as isActive',
                    'Product.productSlug as productSlug',
                    'Product.hasStock as hasStock',
                    'Product.outOfStockThreshold as outOfStockThreshold',
                    'Product.createdDate as createdDate',
                    'Product.keywords as keywords',
                    'Product.attributeKeyword as attributeKeyword',
                    '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                    '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image',
                    '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
                    'IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )  as taxValue',
                    '(SELECT sku.sku_name as skuName FROM sku WHERE sku.id = skuId) as skuName',
                    '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
                    '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as modifiedPrice',
                ];
                const whereCondition = [];
                const currentDate = moment().format('YYYY-MM-DD');
                const relations = [];
                const groupBy = [];
                groupBy.push({
                    name: 'Product.productId',
                });
                if (params.categoryslug === '' || params.categoryslug === undefined) {
                    whereCondition.push({
                        name: 'Product.isActive',
                        op: 'and',
                        value: 1,
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
                    });
                    whereCondition.push({
                        name: 'Product.isActive',
                        op: 'and',
                        value: 1,
                    }, {
                        name: 'category.category_slug',
                        op: 'and',
                        value: '"' + params.categoryslug + '"',
                    }, {
                        name: 'Product.dateAvailable',
                        op: 'raw',
                        sign: '<=',
                        value: currentDate.toString(),
                    });
                }
                const searchConditions = [];
                const sort = [];
                sort.push({
                    name: 'Product.sortOrder',
                    order: 'ASC',
                });
                const productList = yield this.productService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
                const promises = productList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const temp = result;
                    temp.taxValue = +result.taxValue;
                    return temp;
                }));
                const finalResult = yield Promise.all(promises);
                let categoryLevel;
                if (params.categoryslug) {
                    const category = yield this.categoryService.findOne({ categorySlug: params.categoryslug, isActive: 1 });
                    if (category) {
                        const categoryLevels = yield this.categoryPathService.find({
                            select: ['level', 'pathId'],
                            where: { categoryId: category.categoryId },
                            order: { level: 'ASC' },
                        }).then((values) => {
                            const categories = values.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                                const categoryData = yield this.categoryService.findOne({ categoryId: val.pathId });
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
                        return response.status(400).send(errorResponse);
                    }
                }
                else {
                    categoryLevel = '';
                }
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the complete list of products.',
                    data: finalResult,
                    categoryLevel,
                };
                return response.status(200).send(successResponse);
            }));
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
     *      "message": "Successfully get country list",
     *      "data":{
     *      "countryId"
     *      "name"
     *      "isoCode2"
     *      "isoCode3"
     *      "addressFormat"
     *      "postcodeRequired"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/country-list
     * @apiErrorExample {json} countryFront error
     * HTTP/1.1 500 Internal Server Error
     */
    countryList(countryName, limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['countryId', 'name', 'isoCode2', 'isoCode3', 'postcodeRequired', 'isActive'];
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
            const countryList = yield this.countryService.list(limit, offset, select, search, WhereConditions, count);
            const successResponse = {
                status: 1,
                message: 'Successfully got the list of countries.',
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
            const emailContent = yield this.emailTemplateService.findOne(3);
            const logo = yield this.settingsService.findOne();
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
            mailContent.productDetailData = undefined;
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
     * @api {get} /api/list/zone-list Zone List API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} countryId countryId
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get zone list",
     *      "data":{
     *      "countryId"
     *      "code"
     *      "name"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/zone-list
     * @apiErrorExample {json} Zone error
     * HTTP/1.1 500 Internal Server Error
     */
    zonelist(limit, offset, countryId, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['zoneId', 'countryId', 'code', 'name', 'isActive'];
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
            if (countryId) {
                search.push({
                    name: 'countryId',
                    op: 'where',
                    value: countryId,
                });
            }
            const WhereConditions = [];
            const relation = ['country'];
            const zoneList = yield this.zoneService.list(limit, offset, select, search, WhereConditions, relation, count);
            if (zoneList) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully get all zone List',
                    data: (0, class_transformer_1.instanceToPlain)(zoneList),
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'unable to get zone List',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Language List API
    /**
     * @api {get} /api/list/language-list Language List API
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got language list",
     *      "data":{
     *      "languageId"
     *      "name"
     *      "status"
     *      "code"
     *      "sortOrder"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/language-list
     * @apiErrorExample {json} Language error
     * HTTP/1.1 500 Internal Server Error
     */
    languageList(limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['languageId', 'name', 'code', 'image', 'imagePath', 'isActive', 'sortOrder', 'isActive'];
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
            const languageList = yield this.languageService.list(limit, offset, select, search, WhereConditions, count);
            if (languageList) {
                const successResponse = {
                    status: 1,
                    message: 'successfully got the complete language list.',
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
     * @api {get} /api/list/specific-category-list Specific Category List
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
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/specific-category-list
     * @apiErrorExample {json} Category List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Category List Function
    SpecificcategoryList(categorySlugParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const categoryDataId = yield this.categoryService.findOne({
                where: {
                    categorySlug: categorySlugParam,
                },
            });
            if (categoryDataId === undefined) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid categoryId',
                };
                return response.status(400).send(errorResponse);
            }
            const categoryDetailId = yield this.categoryPathService.findOne({ categoryId: categoryDataId.categoryId, level: 0 });
            const select = ['categoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'categorySlug'];
            const search = [
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
            ];
            const categoryData = yield this.categoryService.list(0, 0, select, search, 0, 0, 0);
            const categoryList = (0, array_to_tree_1.default)(categoryData, {
                parentProperty: 'parentInt',
                customID: 'categoryId',
            });
            const mainCategoryId = categoryDetailId.pathId;
            let dataList;
            const key = 'categoryId';
            for (const data of categoryList) {
                if (data[key] === mainCategoryId) {
                    dataList = data;
                }
            }
            const successResponse = {
                status: 1,
                message: 'Successfully get the related category List',
                data: dataList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // get payment setting API
    /**
     * @api {get} /api/list/get-payment-setting Get payment setting API
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
     *      "plugin_name"
     *      "plugin_avatar"
     *      "plugin_avatar_path"
     *      "plugin_type"
     *      "plugin_status"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/get-payment-setting
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
                message: 'Successfully got payment List.',
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
     *      "data":{
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
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
                'IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )  as taxValue',
                '(SELECT sku.sku_name as skuName FROM sku WHERE sku.id = skuId) as skuName',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as modifiedPrice',
            ];
            const whereCondition = [];
            const relations = [];
            const groupBy = [];
            if (params.categoryslug === '' || params.categoryslug === undefined) {
                whereCondition.push({
                    name: 'Product.isActive',
                    op: 'and',
                    value: 1,
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
                });
                whereCondition.push({
                    name: 'Product.isActive',
                    op: 'and',
                    value: 1,
                }, {
                    name: 'category.category_slug',
                    op: 'and',
                    value: '"' + params.categoryslug + '"',
                }, {
                    name: 'Product.dateAvailable',
                    op: 'raw',
                    sign: '<=',
                    value: currentDate.toString(),
                });
            }
            const searchConditions = [];
            if (params.keyword) {
                searchConditions.push({
                    name: ['Product.keywords', 'Product.name'],
                    value: params.keyword.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'Product.sortOrder',
                order: 'ASC',
            });
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
    // order log List API
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
     *      "orderStatus" : "",
     *      "createdDate" : "",
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
                    message: 'Invalid OrderProductId',
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
                message: 'Successfully got the complete order Log list.',
                data: result,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Plugin list
    /**
     * @api /api/list/get-addons Plugin List
     * @apiGroup Store
     * @apiParam (Request Body) {number} limit limit
     * @apiParam (Request Body) {number} offset offset
     * @apiParam (Request Body) {number} count count
     * @apiSuccessExample {json} success
     * HTTP/1.1 200 Ok
     * {
     *      "status": "1",
     *      "message": "Successfully get the plugin list. ",
     *      "data": {}
     * }
     * @apiSampleRequest /api/list/get-addons
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal server error
     */
    PluginList(limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginList = yield this.pluginService.pluginList(limit, offset, count);
            if (!pluginList) {
                const errorMessage = {
                    status: 0,
                    message: 'Unable to get the plugin list. ',
                };
                return response.status(400).send(errorMessage);
            }
            const values = {};
            console.log(pluginList);
            for (const value of pluginList) {
                values[value.slugName] = value.pluginStatus;
            }
            return response.status(200).send({ status: 1, message: 'Successfully get the list', data: values });
        });
    }
    // gmap redirect url
    /**
     * @api {Get} /api/list/gmap-key Get client id
     * @apiGroup Store
     * @apiParam (Request body) {string} pluginName pluginName
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 Ok
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
                        message: 'Redirect to this url.',
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
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/category-list'),
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
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckTokenMiddleware),
    (0, routing_controllers_1.Get)('/custom-product-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParams)()),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ListRequest_1.ListRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "customProductList", null);
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
    (0, routing_controllers_1.Get)('/zone-list'),
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
    (0, routing_controllers_1.Get)('/language-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "languageList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/specific-category-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('categorySlug')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "SpecificcategoryList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/get-payment-setting'),
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
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckTokenMiddleware),
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
    (0, routing_controllers_1.Get)('/get-addons'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "PluginList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/gmap-key'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('pluginName')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "gmapKey", null);
CommonListController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/list'),
    tslib_1.__metadata("design:paramtypes", [CategoryService_1.CategoryService,
        ProductService_1.ProductService, LanguageService_1.LanguageService, CountryService_1.CountryService, ContactService_1.ContactService,
        EmailTemplateService_1.EmailTemplateService,
        zoneService_1.ZoneService,
        CategoryPathService_1.CategoryPathService, PluginService_1.PluginService,
        UserService_1.UserService, OrderStatusService_1.OrderStatusService, SettingService_1.SettingService,
        OrderProductService_1.OrderProductService, OrderProductLogService_1.OrderProductLogService])
], CommonListController);
exports.CommonListController = CommonListController;
//# sourceMappingURL=CommonListController.js.map