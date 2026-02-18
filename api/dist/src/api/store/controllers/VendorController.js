"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorStoreController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const CountryService_1 = require("../../core/services/CountryService");
const env_1 = require("../../../env");
const SettingService_1 = require("../../core/services/SettingService");
const VendorService_1 = require("../../core/services/VendorService");
const VendorProductService_1 = require("../../core/services/VendorProductService");
const EmailTemplateService_1 = require("../../core/services/EmailTemplateService");
const checkTokenMiddleware_1 = require("../../core/middlewares/checkTokenMiddleware");
const moment_1 = tslib_1.__importDefault(require("moment"));
const CategoryService_1 = require("../../core/services/CategoryService");
const mail_services_1 = require("../../../auth/mail.services");
const ContactSeller_1 = require("./requests/ContactSeller");
const VendorContact_1 = require("../../core/models/VendorContact");
const VendorContactService_1 = require("../../core/services/VendorContactService");
const CustomerService_1 = require("../../core/services/CustomerService");
const typeorm_1 = require("typeorm");
const TranslationMiddleware_1 = require("../../../../src/api/core/middlewares/TranslationMiddleware");
const ContactSellerRequest_1 = require("./requests/ContactSellerRequest");
const VendorOrderService_1 = require("../../../api/core/services/VendorOrderService");
const VendorMediaService_1 = require("../../../api/core/services/VendorMediaService");
const VendorDocumentService_1 = require("../../../api/core/services/VendorDocumentService");
const PdfService_1 = require("../../../api/core/services/PdfService");
const fs = require("fs");
const IndustryValidationMiddleware_1 = require("../../../api/core/middlewares/IndustryValidationMiddleware");
const typedi_1 = require("typedi");
let VendorStoreController = class VendorStoreController {
    constructor(vendorService, vendorProductService, countryService, categoryService, vendorContactService, settingService, emailTemplateService, customerService, vendorOrderService, vendorMediaService, vendorDocumentService, pdfService
    // private productRatingService: ProductRatingService
    ) {
        this.vendorService = vendorService;
        this.vendorProductService = vendorProductService;
        this.countryService = countryService;
        this.categoryService = categoryService;
        this.vendorContactService = vendorContactService;
        this.settingService = settingService;
        this.emailTemplateService = emailTemplateService;
        this.customerService = customerService;
        this.vendorOrderService = vendorOrderService;
        this.vendorMediaService = vendorMediaService;
        this.vendorDocumentService = vendorDocumentService;
        this.pdfService = pdfService;
    }
    // Get vendor Detail API
    /**
     * @api {get} /api/vendor-store/vendor-details/:displayNameUrl Vendor Details API
     * @apiGroup vendor store
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully get vendor Details",
     * "data":{
     * "vendorId" : 1,
     * "firstName" : "",
     * "lastName" : "",
     * "email" : "",
     * "mobileNumber" : "",
     * "avatar" : "",
     * "avatarPath" : "",
     * "commission" : "",
     * "status" : 1,
     * }
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor-store/vendor-details/:displayNameUrl
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    storeVendorDetails(displayNameUrl, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorService.findOne({
                select: ['vendorId', 'vendorPrefixId', 'companyLogo', 'companyLogoPath', 'companyCoverImage', 'companyCoverImagePath', 'companyName', 'displayNameUrl',
                    'companyDescription', 'companyAddress1', 'companyAddress2', 'companyCity', 'companyState', 'companyCountryId', 'zoneId', 'capabilities',
                    'pincode', 'companyEmailId', 'companyWebsite', 'vendorSlugName', 'instagram', 'facebook', 'twitter', 'youtube', 'whatsapp', 'vendorDescription'],
                where: { displayNameUrl, isActive: 1, approvalFlag: 1, isDelete: 0 }, relations: ['customer'],
            });
            if (!vendor) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid vendor',
                    data: vendor,
                };
                return response.status(200).send(errorResponse);
            }
            vendor.persnolInfo = {
                firstName: vendor.customer.firstName,
                lastName: vendor.customer.lastName,
                avatar: vendor.customer.avatar,
                avatarPath: vendor.customer.avatarPath,
                email: vendor.customer.email,
            };
            vendor.customer = undefined;
            const country = yield this.countryService.findOne({
                select: ['name'],
                where: { countryId: vendor.companyCountryId },
            });
            if (country) {
                vendor.countryName = country.name;
            }
            else {
                vendor.countryName = '';
            }
            const orders = yield this.vendorOrderService.findAll({ where: { vendorId: vendor.vendorId } });
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
            const vendorMedia = yield this.vendorMediaService.findAll({ where: { vendorId: vendor.vendorId, isActive: 1, isDelete: 0 } });
            vendor.vendorImages = [];
            vendor.vendorVideos = [];
            if (vendorMedia) {
                vendor.vendorImages = vendorMedia.filter(image => image.mediaType === 1);
                vendor.vendorVideos = vendorMedia.filter(image => image.mediaType === 2);
            }
            // vendor certificates
            const certificates = yield this.vendorDocumentService.find({ select: ['id', 'fileName', 'filePath', 'status', 'additionalInfo'], where: { vendorId: vendor.vendorId, isDelete: 0, document: { name: 'Certificate' } }, relations: ['document'] });
            vendor.certificates = [];
            if (certificates) {
                certificates.flatMap(val => val.document = undefined);
                vendor.certificates = certificates;
            }
            // vendor rating
            const products = yield this.vendorProductService.findVendorActiveProduct(vendor.vendorId, 0, 0);
            vendor.productCount = products.length;
            const successResponse = {
                status: 1,
                message: 'successfully got Vendor details',
                data: vendor,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Get vendor Product list API
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
    storeVendorProductList(displayNameUrl, categorySlug, limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productLists = yield this.vendorProductList(displayNameUrl, categorySlug, limit, offset, count, request.id, request.languageId, request);
            if (productLists.status === 0) {
                return response.status(400).send(productLists);
            }
            return response.status(200).send(productLists);
        });
    }
    vendorProductList(displayNameUrl, categorySlug, limit, offset, count, requestId, languageId, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const currentDate = (0, moment_1.default)().format('YYYY-MM-DD');
            const whereCondition = [];
            const relations = [];
            const groupBy = [];
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
                'IF(product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `product`.`tax_value` LIMIT 1), (product.taxValue) )  as taxValue',
                '(SELECT sku.sku_name as skuName FROM sku WHERE sku.id = skuId) as skuName',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
                '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
                '(SELECT price FROM product_special ps WHERE ps.product_id = product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end > CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
            ];
            relations.push({
                tableName: 'VendorProducts.product',
                aliasName: 'product',
            }, {
                tableName: 'VendorProducts.vendor',
                aliasName: 'vendor',
            });
            relations.push({
                tableName: 'product.productToCategory',
                aliasName: 'productToCategory',
            }, {
                tableName: 'productToCategory.category',
                aliasName: 'category',
            });
            if (languageId) {
                relations.push({
                    tableName: 'product.productTranslation',
                    op: 'leftCond',
                    aliasName: 'productTranslation',
                    cond: 'productTranslation.languageId = ' + languageId,
                });
                selects.push('productTranslation.name as productNameTrans');
            }
            const searchConditions = [];
            if (categorySlug !== '' && categorySlug) {
                const category = yield this.categoryService.findOne({
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
                whereCondition.push({
                    name: 'category.categorySlug',
                    op: 'and',
                    value: `${categorySlug}`,
                });
            }
            whereCondition.push({
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
            const vendorData = yield this.vendorService.findOne({ where: { displayNameUrl, isActive: 1 } });
            if (!vendorData) {
                return {
                    status: 0,
                    message: 'Invalid display name URL',
                };
            }
            whereCondition.push({
                name: 'vendor.vendorId',
                op: 'and',
                value: vendorData.vendorId,
            }, {
                name: 'vendor.isDelete',
                op: 'and',
                value: 0,
            });
            whereCondition.push({
                name: 'product.isActive',
                op: 'and',
                value: 1,
            }, {
                name: 'product.dateAvailable',
                op: 'raw',
                sign: '<=',
                value: currentDate.toString(),
            }, {
                name: 'VendorProducts.reuse',
                op: 'IS NULL',
                value: '',
            }, {
                name: 'VendorProducts.reuseStatus',
                op: 'and',
                value: 0,
            });
            const sort = [];
            sort.push({
                name: 'product.sortOrder',
                order: 'ASC',
            });
            if (count) {
                const vendorProductListCount = yield this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, true, true);
                const sucResponse = {
                    status: 1,
                    message: 'Successfully got seller product list',
                    data: vendorProductListCount,
                };
                return sucResponse;
            }
            const vendorProductList = yield this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
            const promises = vendorProductList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = result;
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
                return temp;
            }));
            const finalResult = yield Promise.all(promises);
            const successResponse = {
                status: 1,
                message: 'successfully got seller product list',
                data: finalResult,
            };
            return successResponse;
        });
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
    categoryBasedVendorList(categorySlug, limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const searchConditions = [];
            const relations = [];
            const whereCondition = [];
            if (categorySlug !== '') {
                const category = yield this.categoryService.find({
                    where: {
                        categorySlug: (0, typeorm_1.In)(categorySlug.split(',')),
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
                relations.push({
                    tableName: 'vendor.vendorGroup',
                    aliasName: 'vendorGroup',
                }, {
                    tableName: 'vendorGroup.vendorGroupCategory',
                    aliasName: 'vendorGroupCategory',
                }, {
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
            relations.push({
                tableName: 'vendor.customer',
                aliasName: 'customer',
            }
            // {
            //     tableName: 'vendor.vendorMedia',
            //     aliasName: 'vendorMedia',
            // }
            );
            searchConditions.push({
                name: 'vendor.approvalFlag',
                op: 'andWhere',
                value: 1,
            }, {
                name: 'vendor.isActive',
                op: 'andWhere',
                value: 1,
            }, {
                name: 'vendor.isDelete',
                op: 'andWhere',
                value: 0,
            });
            const vendorGroupCategory = yield this.vendorService.vendorList(limit, offset, select, relations, searchConditions, whereCondition, false);
            if (count) {
                const vendorGroupCategoryCount = yield this.vendorService.vendorList(limit, offset, select, relations, searchConditions, whereCondition, true);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got count',
                    data: vendorGroupCategoryCount,
                });
            }
            const vendorCategory = vendorGroupCategory.map((values) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _a;
                const temp = values;
                const findCountry = yield this.countryService.findOne({ where: { countryId: values.companyCountryId } });
                temp.companyCountryName = findCountry === null || findCountry === void 0 ? void 0 : findCountry.name;
                temp.productCount = yield this.vendorProductService.vendorProductsCount(temp.vendorId);
                temp.activeProductCount = yield this.vendorProductService.activeVendorProductCount(temp.vendorId);
                const relation = ['product', 'product.productImage'];
                if (request.languageId) {
                    relation.push('product.productTranslation');
                }
                const productLists = yield this.vendorProductList(temp.displayNameUrl, '', 2, 0, false, request.id, (_a = request.languageId) !== null && _a !== void 0 ? _a : 0, request);
                temp.products = productLists.data;
                const vendorMedia = yield this.vendorMediaService.findAll({ where: { vendorId: values === null || values === void 0 ? void 0 : values.vendorId } });
                temp.vendorMedia = vendorMedia;
                return temp;
            }));
            const resultData = yield Promise.all(vendorCategory);
            const successResponse = {
                status: 1,
                message: 'Successfully got vendor list based on category',
                data: resultData,
            };
            return response.status(200).send(successResponse);
        });
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
    contactSeller(contactParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorService.findOne({
                where: {
                    vendorId: contactParam.vendorId,
                },
            });
            if (!vendor) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Vendor Id',
                });
            }
            const customer = yield this.customerService.findOne({
                where: {
                    id: vendor.customerId,
                },
            });
            const contactSellers = new VendorContact_1.VendorContact();
            contactSellers.vendorId = contactParam.vendorId;
            contactSellers.name = contactParam.name;
            contactSellers.email = contactParam.email;
            contactSellers.mobileNumber = +contactParam.mobileNumber;
            contactSellers.country = contactParam.country;
            contactSellers.requirement = contactParam.requirement;
            const vendorContactSave = yield this.vendorContactService.create(contactSellers);
            if (vendorContactSave) {
                const emailContent = yield this.emailTemplateService.findOne({ where: { emailTemplateId: 25 } });
                const message = emailContent.content.replace('{name}', contactParam.name).replace('{sellerName}', customer.firstName).replace('{email}', vendorContactSave.email).replace('{phoneNumber}', vendorContactSave.mobileNumber).replace('{message}', vendorContactSave.requirement);
                const redirectUrl = env_1.env.storeRedirectUrl;
                const logo = yield this.settingService.findOne({ where: {} });
                const mailContents = {};
                mailContents.logo = logo;
                mailContents.emailContent = message;
                mailContents.redirectUrl = redirectUrl;
                mailContents.productDetailData = '';
                const sendMailRes = mail_services_1.MAILService.sendMail(mailContents, vendor.companyEmailId, emailContent.subject, false, false, '');
                if (sendMailRes) {
                    const successResponse = {
                        status: 1,
                        message: 'Thank you for contacting us, your request has been sent successfully',
                        data: vendorContactSave,
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    return response.status(400).send({
                        status: 0,
                        message: `Couldn't send mail`,
                    });
                }
            }
        });
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
    sellerContact(contactSellerParams, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const attachments = [];
            try {
                const findMailContent = yield this.emailTemplateService.findOne({ where: { emailTemplateId: 48 } });
                const logo = yield this.settingService.findOne({ where: {} });
                const files = contactSellerParams.files;
                let counter = 0;
                for (const datas of files) {
                    const coverbase64Data = Buffer.from(datas.file.replace(/^data:application\/pdf;base64,/, ''), 'base64');
                    const timestamp = Date.now();
                    const uniqueSuffix = `${timestamp}_${counter++}`;
                    const fileName = `document_${uniqueSuffix}.pdf`;
                    const filePath = 'demo';
                    const attachmentPath = `${process.cwd()}/demo/${fileName}`;
                    attachments.push({ name: fileName, path: attachmentPath });
                    yield this.pdfService.decodeBase64AndSave(filePath, fileName, coverbase64Data);
                }
                const emailcontent = findMailContent.content.replace(/{name}/g, 'Seller')
                    .replace(/{FullName}/g, contactSellerParams.firstName + ' ' + contactSellerParams.lastName)
                    .replace(/{EmailId}/g, contactSellerParams.emailId)
                    .replace(/{appName}/g, logo.siteName)
                    .replace(/{userRequirements}/g, contactSellerParams.userRequirements);
                const settings = yield this.settingService.findOne({ where: {} });
                const mailContent = {};
                mailContent.logo = logo;
                mailContent.productInfo = [];
                mailContent.baseUrl = env_1.env.baseUrl;
                mailContent.emailContent = emailcontent;
                mailContent.productDetailData = undefined;
                mailContent.redirectUrl = env_1.env.storeRedirectUrl;
                mailContent.templateName = 'emailTemplates';
                mailContent.ccEmail = settings.storeEmail;
                const sendMail = mail_services_1.MAILService.sendMail(mailContent, contactSellerParams.vendorEmailId, findMailContent.subject, true, true, attachments);
                if (sendMail) {
                    return response.status(200).send({ status: 1, message: 'Your email has been successfully sent to the seller' });
                }
            }
            catch (err) {
                attachments.map(file => {
                    fs.unlinkSync(file.path);
                });
                return response.status(400).send({ status: 1, message: 'Oops! Something went wrong', data: err });
            }
        });
    }
};
exports.VendorStoreController = VendorStoreController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-details/:displayNameUrl'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('displayNameUrl')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorStoreController.prototype, "storeVendorDetails", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckTokenMiddleware),
    (0, routing_controllers_1.UseBefore)(TranslationMiddleware_1.TranslationMiddleware),
    (0, routing_controllers_1.Get)('/vendor-product-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('displayNameUrl')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('categorySlug')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Req)()),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorStoreController.prototype, "storeVendorProductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(TranslationMiddleware_1.TranslationMiddleware),
    (0, routing_controllers_1.Get)('/category-based-vendor-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('categorySlug')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorStoreController.prototype, "categoryBasedVendorList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/contact-seller'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ContactSeller_1.ContactSeller, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorStoreController.prototype, "contactSeller", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/seller-contact'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ContactSellerRequest_1.ContactSellerRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorStoreController.prototype, "sellerContact", null);
exports.VendorStoreController = VendorStoreController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.UseBefore)(IndustryValidationMiddleware_1.IndustryValidationMiddleware),
    (0, routing_controllers_1.JsonController)('/vendor-store'),
    tslib_1.__metadata("design:paramtypes", [VendorService_1.VendorService,
        VendorProductService_1.VendorProductService,
        CountryService_1.CountryService,
        CategoryService_1.CategoryService,
        VendorContactService_1.VendorContactService,
        SettingService_1.SettingService,
        EmailTemplateService_1.EmailTemplateService,
        CustomerService_1.CustomerService,
        VendorOrderService_1.VendorOrdersService,
        VendorMediaService_1.VendorMediaService,
        VendorDocumentService_1.VendorDocumentService,
        PdfService_1.PdfService
        // private productRatingService: ProductRatingService
    ])
], VendorStoreController);
//# sourceMappingURL=VendorController.js.map