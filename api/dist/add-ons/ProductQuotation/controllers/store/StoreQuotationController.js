"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreQuotationController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const checkTokenMiddleware_1 = require("../../../../src/api/core/middlewares/checkTokenMiddleware");
const Quotation_1 = require("../../models/Quotation");
const QuotationProduct_1 = require("../../models/QuotationProduct");
const QuotationService_1 = require("../../services/QuotationService");
const QuotationProductService_1 = require("../../services/QuotationProductService");
const VendorQuotation_1 = require("../../models/VendorQuotation");
const VendorQuotationService_1 = require("../../services/VendorQuotationService");
const StoreQuotationRequest_1 = require("./requests/StoreQuotationRequest");
const CurrencyService_1 = require("../../../../src/api/core/services/CurrencyService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const TranslationMiddleware_1 = require("../../../../src/api/core/middlewares/TranslationMiddleware");
const typedi_1 = require("typedi");
let StoreQuotationController = class StoreQuotationController {
    constructor(quotationService, quotationProductService, vendorQuotationervice, currencyService) {
        this.quotationService = quotationService;
        this.quotationProductService = quotationProductService;
        this.vendorQuotationervice = vendorQuotationervice;
        this.currencyService = currencyService;
    }
    /**
     * @api {post} /api/quotation Create Store Quotation
     * @apiName CreateStoreQuotation
     * @apiGroup StoreQuotation
     * @apiDescription Endpoint to create a new Store Quotation.
     * @apiParam {String} firstname First name of the customer. (Required)
     * @apiParam {String} lastname Last name of the customer.
     * @apiParam {String} email Email address of the customer. (Required)
     * @apiParam {Number} telephone Telephone number of the customer. (Required)
     * @apiParam {Number} total total. (Required)
     * @apiParam {String} businessName Name of the company. (Required)
     * @apiParam {String} postalCode Postal code.
     * @apiParam {String} city City.
     * @apiParam {String} state state.
     * @apiParam {Number} stateId stateId.
     * @apiParam {String} country country.
     * @apiParam {Number} countryId countryId.
     * @apiParam {String} comment Additional comment for the quotation.
     * @apiParam {String} currencyId ID of the currency.
     * @apiParam {Object[]} productDetails Array of product details.
     * @apiParam {Number} productDetails.productId ID of the product.
     * @apiParam {String} productDetails.productName Name of the product.
     * @apiParam {Number} productDetails.quantity Quantity of the product.
     * @apiParam {Number} productDetails.productPrice Price of the product.
     * @apiParam {Number} productDetails.discountAmount Discount amount for the product.
     * @apiParam {Number} productDetails.basePrice Base price of the product.
     * @apiParam {Number} productDetails.taxType Type of tax applied.
     * @apiParam {Number} productDetails.taxValue Value of tax applied.
     * @apiParam {Number} productDetails.total Total price for the product.
     * @apiParam {Number} productDetails.vendorId ID of the vendor.
     * @apiParam {Number} productDetails.discountedAmount Discounted amount for the product.
     * @apiParam {Number} productDetails.tax Tax amount for the product.
     * @apiParam {String} productDetails.sku Stock Keeping Unit (SKU) for the product.
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Request-Example:
     *    {
     *      "firstname": "",
     *      "lastname": "",
     *      "email": "",
     *      "telephone": 1,
     *      "total": 1,
     *      "businessName": "",
     *      "postalCode": "",
     *      "city": "",
     *      "state": "",
     *      "stateId": 1,
     *      "country": "",
     *      "countryId": 1,
     *      "comment": "",
     *      "currencyId": 1,
     *      "quantity": 1,
     *      "productDetails": [
     *        {
     *          "productId": 1,
     *          "productName": "",
     *          "quantity": 1,
     *          "productPrice": 1,
     *          "discountAmount": 1,
     *          "basePrice": 1,
     *          "taxType": "",
     *          "taxValue": "",
     *          "total": 1,
     *          "vendorId": 1,
     *          "discountedAmount": 1,
     *          "tax": "",
     *          "sku": ""
     *        }
     *      ]
     *    }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * @apiSampleRequest /api/quotation
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal Server Error
     */
    storeQuotation(storeQutnParams, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ip = (request.headers['x-forwarded-for'] ||
                request.connection.remoteAddress ||
                request.socket.remoteAddress ||
                request.connection.socket.remoteAddress).split(',')[0];
            const findCurrency = yield this.currencyService.findOne({ where: { currencyId: storeQutnParams === null || storeQutnParams === void 0 ? void 0 : storeQutnParams.currencyId } });
            if (!findCurrency) {
                return response.status(400).send({ status: 1, message: 'Invalid currency id!' });
            }
            const random = Math.floor(Math.random() * 900000000) + 100000000;
            const newQuotation = new Quotation_1.Quotation();
            newQuotation.customerId = request.id;
            newQuotation.currencyId = storeQutnParams === null || storeQutnParams === void 0 ? void 0 : storeQutnParams.currencyId;
            newQuotation.firstname = storeQutnParams === null || storeQutnParams === void 0 ? void 0 : storeQutnParams.firstname;
            newQuotation.email = storeQutnParams === null || storeQutnParams === void 0 ? void 0 : storeQutnParams.email;
            newQuotation.telephone = storeQutnParams === null || storeQutnParams === void 0 ? void 0 : storeQutnParams.telephone;
            newQuotation.city = storeQutnParams === null || storeQutnParams === void 0 ? void 0 : storeQutnParams.city;
            newQuotation.postalCode = storeQutnParams === null || storeQutnParams === void 0 ? void 0 : storeQutnParams.postalCode;
            newQuotation.country = storeQutnParams === null || storeQutnParams === void 0 ? void 0 : storeQutnParams.country;
            newQuotation.countryId = storeQutnParams === null || storeQutnParams === void 0 ? void 0 : storeQutnParams.countryId;
            newQuotation.state = storeQutnParams === null || storeQutnParams === void 0 ? void 0 : storeQutnParams.state;
            newQuotation.stateId = storeQutnParams === null || storeQutnParams === void 0 ? void 0 : storeQutnParams.stateId;
            newQuotation.comment = storeQutnParams === null || storeQutnParams === void 0 ? void 0 : storeQutnParams.comment;
            newQuotation.total = storeQutnParams === null || storeQutnParams === void 0 ? void 0 : storeQutnParams.total;
            newQuotation.businessName = storeQutnParams === null || storeQutnParams === void 0 ? void 0 : storeQutnParams.businessName;
            newQuotation.quantity = storeQutnParams === null || storeQutnParams === void 0 ? void 0 : storeQutnParams.quantity;
            newQuotation.quotationNo = random;
            newQuotation.ip = ip;
            newQuotation.isActive = 1;
            const createQuotation = yield this.quotationService.create(newQuotation);
            // Proceed product details
            const productDetails = storeQutnParams === null || storeQutnParams === void 0 ? void 0 : storeQutnParams.productDetails;
            for (const productQuotation of productDetails) {
                const newQuotationProduct = new QuotationProduct_1.QuotationProduct();
                newQuotationProduct.productId = productQuotation === null || productQuotation === void 0 ? void 0 : productQuotation.productId;
                newQuotationProduct.quotationId = createQuotation.id;
                newQuotationProduct.productName = productQuotation === null || productQuotation === void 0 ? void 0 : productQuotation.productName;
                newQuotationProduct.quantity = productQuotation === null || productQuotation === void 0 ? void 0 : productQuotation.quantity;
                newQuotationProduct.productPrice = productQuotation === null || productQuotation === void 0 ? void 0 : productQuotation.productPrice;
                newQuotationProduct.discountAmount = productQuotation === null || productQuotation === void 0 ? void 0 : productQuotation.discountAmount;
                newQuotationProduct.basePrice = productQuotation === null || productQuotation === void 0 ? void 0 : productQuotation.basePrice;
                newQuotationProduct.taxType = productQuotation === null || productQuotation === void 0 ? void 0 : productQuotation.taxType;
                newQuotationProduct.taxValue = productQuotation === null || productQuotation === void 0 ? void 0 : productQuotation.taxValue;
                newQuotationProduct.total = productQuotation === null || productQuotation === void 0 ? void 0 : productQuotation.total;
                newQuotationProduct.discountedAmount = productQuotation.discountedAmount;
                newQuotationProduct.tax = productQuotation.tax;
                newQuotationProduct.skuName = productQuotation.sku;
                newQuotationProduct.isActive = 1;
                const createQuotationProduct = yield this.quotationProductService.create(newQuotationProduct);
                // Create Vendore Quotation
                const newVendorQuotation = new VendorQuotation_1.VendorQuotation();
                newVendorQuotation.vendorId = productQuotation.vendorId;
                newVendorQuotation.quotationProductId = createQuotationProduct.id;
                newVendorQuotation.quotationId = createQuotation.id;
                newVendorQuotation.total = productQuotation === null || productQuotation === void 0 ? void 0 : productQuotation.total;
                yield this.vendorQuotationervice.create(newVendorQuotation);
            }
            return response.status(200).send({ status: 1, message: 'Successfully create the Quotation!' });
        });
    }
    // Get Store Quotation List
    /**
     * @api {get} /api/quotation Store Quotation List
     * @apiGroup StoreQuotation
     * @apiName StoreQuotationList
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiParam (Request body) {Number} quotationId quotationId for detail API
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully got the quotation list!",
     *    "data": [
     *       {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "id": 1,
     *        "firstname": "",
     *        "lastname": "",
     *        "email": "",
     *        "telephone": "",
     *        "businessName": "",
     *        "postalCode": "",
     *        "city": "",
     *        "state": "",
     *        "stateId": 1,
     *        "country": "",
     *        "countryId": 1,
     *        "customerId": 1,
     *        "quotationNo": "",
     *        "currencyId": 1,
     *        "total": 1,
     *        "isActive": 1,
     *        "ip": "",
     *        "quantity": 1,
     *        "comment": "",
     *        "quotationStatusId": 1,
     *        "respondedDate": "",
     *        "customer": {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedBy": 1,
     *            "modifiedDate": "",
     *            "id": 1,
     *            "firstName": "",
     *            "lastName": "",
     *            "username": "",
     *            "password": "",
     *            "email": "",
     *            "mobileNumber": "",
     *            "address": "",
     *            "countryId": 1,
     *            "zoneId": 1,
     *            "city": "",
     *            "local": "",
     *            "oauthData": "",
     *            "avatar": "",
     *            "newsletter": "",
     *            "avatarPath": "",
     *            "customerGroupId": 1,
     *            "lastLogin": "",
     *            "safe": "",
     *            "ip": "",
     *            "mailStatus": "",
     *            "pincode": "",
     *            "deleteFlag": "",
     *            "isActive": 1,
     *            "forgetPasswordKey": "",
     *            "linkExpires": "",
     *            "lockedOn": "",
     *            "siteId": 1,
     *            "address2": "",
     *            "landmark": "",
     *            "mailOtp": "",
     *            "mailOtpExpireTime":""
     *        },
     *        "quotationProduct": [
     *            {
     *                "createdBy": 1,
     *                "createdDate": "",
     *                "modifiedBy": 1,
     *                "modifiedDate": "",
     *                "id": 1,
     *                "productId": 1,
     *                "quotationId": 1,
     *                "productName": "",
     *                "quantity": 1,
     *                "productPrice": 1,
     *                "discountAmount": 1,
     *                "basePrice": "",
     *                "taxType": "",
     *                "taxValue": "",
     *                "total": 1,
     *                "discountedAmount": 1,
     *                "quotationStatusId": 1,
     *                "bestQuotedPrice": "",
     *                "replyMessage": "",
     *                "tax": "",
     *                "isActive": 1,
     *                "skuName": "",
     *                "productInformationDetail": {
     *                    "createdBy": 1,
     *                    "createdDate": "",
     *                    "modifiedBy": 1,
     *                    "modifiedDate": "",
     *                    "productId": 1,
     *                    "sku": "",
     *                    "upc": "",
     *                    "hsn": "",
     *                    "location": "",
     *                    "quantity": 1,
     *                    "minimumQuantity": 1,
     *                    "subtractStock": "",
     *                    "stockStatusId": 1,
     *                    "quotationAvailable": "",
     *                    "image": "",
     *                    "imagePath": "",
     *                    "manufacturerId": 1,
     *                    "shipping": "",
     *                    "serviceCharges": "",
     *                    "taxType": "",
     *                    "taxValue": "",
     *                    "price": "",
     *                    "priceUpdateFileLogId": 1,
     *                    "dateAvailable": "",
     *                    "sortOrder": 1,
     *                    "name": "",
     *                    "description": "",
     *                    "amount": 1,
     *                    "keywords": "",
     *                    "discount": 1,
     *                    "deleteFlag": 1,
     *                    "isFeatured": 1,
     *                    "todayDeals": "",
     *                    "condition": "",
     *                    "rating": 1,
     *                    "wishListStatus": 1,
     *                    "productSlug": "",
     *                    "isActive": 1,
     *                    "width": 1,
     *                    "height": 1,
     *                    "length": 1,
     *                    "weight": 1,
     *                    "hasStock": "",
     *                    "priceType": "",
     *                    "isSimplified": 1,
     *                    "owner": "",
     *                    "isCommon": 1,
     *                    "skuId": 1,
     *                    "hasTirePrice": "",
     *                    "outOfStockThreshold": "",
     *                    "notifyMinQuantity": 1,
     *                    "minQuantityAllowedCart": 1,
     *                    "maxQuantityAllowedCart": 1,
     *                    "enableBackOrders": "",
     *                    "pincodeBasedDelivery": "",
     *                    "attributeKeyword": "",
     *                    "settedAsCommonOn": "",
     *                    "productHighlights": "",
     *                    "productImage": [
     *                        {
     *                            "createdBy": 1,
     *                            "createdDate": "",
     *                            "modifiedBy": 1,
     *                            "modifiedDate": "",
     *                            "productImageId": 1,
     *                            "productId": 1,
     *                            "image": "",
     *                            "containerName": "",
     *                            "sortOrder": 1,
     *                            "defaultImage": "",
     *                            "isActive": 1
     *                        }
     *                    ]
     *                },
     *                "vendorQuotation": {
     *                    "createdBy": 1,
     *                    "createdDate": "",
     *                    "modifiedBy": 1,
     *                    "modifiedDate": "",
     *                    "id": 1,
     *                    "vendorId": 1,
     *                    "quotationProductId": 1,
     *                    "quotationId": 1,
     *                    "total": 1,
     *                    "vendor": {
     *                        "createdBy": 1,
     *                        "createdDate": "",
     *                        "modifiedBy": 1,
     *                        "modifiedDate": "",
     *                        "vendorId": 1,
     *                        "vendorPrefixId": "",
     *                        "customerId": 1,
     *                        "vendorGroupId": 1,
     *                        "commission": "",
     *                        "contactPersonName": "",
     *                        "vendorSlugName": "",
     *                        "designation": "",
     *                        "companyName": "",
     *                        "companyAddress1": "",
     *                        "companyAddress2": "",
     *                        "companyCity": "",
     *                        "companyState": "",
     *                        "zoneId": 1,
     *                        "companyCountryId": 1,
     *                        "pincode": "",
     *                        "companyDescription": "",
     *                        "companyMobileNumber": "",
     *                        "companyEmailId": 1,
     *                        "companyWebsite": "",
     *                        "companyTaxNumber": "",
     *                        "companyPanNumber": "",
     *                        "companyLogo": "",
     *                        "companyLogoPath": "",
     *                        "paymentInformation": "",
     *                        "verification": [
     *                            {
     *                                "mail": "",
     *                                "email": "",
     *                                "policy": "",
     *                                "category": "",
     *                                "decision": "",
     *                                "document": "",
     *                                "storeFront": "",
     *                                "bankAccount": "",
     *                                "paymentInfo": "",
     *                                "companyDetail": "",
     *                                "deliveryMethod": "",
     *                                "subscriptionPlan": "",
     *                                "distributionPoint": ""
     *                            }
     *                        ],
     *                        "verificationComment": [],
     *                        "verificationDetailComment": [],
     *                        "approvalFlag": 1,
     *                        "approvedBy": 1,
     *                        "approvalDate": "",
     *                        "companyCoverImage": "",
     *                        "companyCoverImagePath": "",
     *                        "displayNameUrl": "",
     *                        "instagram": "",
     *                        "twitter": "",
     *                        "youtube": "",
     *                        "facebook": "",
     *                        "whatsapp": "",
     *                        "bankName": "",
     *                        "bankAccountNumber": "",
     *                        "accountHolderName": "",
     *                        "ifscCode": ""
     *                    }
     *                }
     *            }
     *        ]
     *      }
     *    ]
     * }
     * @apiSampleRequest /api/quotation
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal Server Error
     */
    getQuotationList(limit, offset, count, quotationId, statusId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const where = (query) => {
                const customerId = request.id;
                query.andWhere({ customerId, isActive: 1 });
                query.andWhere('Quot__quPr__prInDe__prIm.defaultImage = 1');
                query.andWhere('Quotation__quotationProduct__productInformationDetail.isActive = :isActive', { isActive: 1 });
                query.andWhere('Quotation__quotationProduct__productInformationDetail.delete_flag = :deleteFlag', { deleteFlag: 0 });
                if (quotationId && quotationId > 0) {
                    query.andWhere({ id: quotationId });
                }
                if (request.languageId) {
                    query.andWhere('Quot__quPr__prInDe__prTr.languageId = :languageId', { languageId: request.languageId });
                }
                if (statusId === 1 || statusId === 0) {
                    query.andWhere({ quotationStatusId: statusId });
                }
            };
            const relations = ['customer', 'quotationProduct', 'quotationProduct.productInformationDetail', 'quotationProduct.productInformationDetail.productImage', 'quotationProduct.vendorQuotation', 'quotationProduct.vendorQuotation.vendor'];
            if (request.languageId) {
                relations.push('quotationProduct.productInformationDetail.productTranslation');
            }
            const order = {
                createdDate: 'DESC',
            };
            const options = { take: limit, skip: offset, where, relations, order };
            const findQuotation = count ? yield this.quotationService.count(options) :
                quotationId ? yield this.quotationService.findOne(options) :
                    yield this.quotationService.find(options);
            return response.status(200).send({ status: 1, message: `Successfully got the quotation ${count ? 'count!' : 'list!'}`, data: findQuotation });
        });
    }
    // delete quotation API
    /**
     * @api {delete} /api/quotation/delete/:id Delete Store Quotation API
     * @apiGroup StoreQuotation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully delete the quotation!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/quotation/delete/:id
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal Server Error
     */
    updateQuotationStatus(id, quotationStatusId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findQuotationDetail = yield this.quotationService.findOne({ where: { id } });
            if (!findQuotationDetail) {
                return response.status(400).send({ status: 0, message: 'Invalid quotation id!' });
            }
            const deleteQuotation = yield this.quotationService.delete({ id });
            if (deleteQuotation) {
                return response.status(200).send({ status: 1, message: 'Successfully delete the quotation!' });
            }
            return response.status(400).send({ status: 0, message: 'Unable to delete the quotation!' });
        });
    }
};
exports.StoreQuotationController = StoreQuotationController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [StoreQuotationRequest_1.StoreQuotationRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreQuotationController.prototype, "storeQuotation", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(TranslationMiddleware_1.TranslationMiddleware),
    (0, routing_controllers_1.Get)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('quotationId')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('statusId')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__param(6, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreQuotationController.prototype, "getQuotationList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('quotationStatus')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreQuotationController.prototype, "updateQuotationStatus", null);
exports.StoreQuotationController = StoreQuotationController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckTokenMiddleware),
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/quotation'),
    tslib_1.__metadata("design:paramtypes", [QuotationService_1.QuotationService,
        QuotationProductService_1.QuotationProductService,
        VendorQuotationService_1.VendorQuotationService,
        CurrencyService_1.CurrencyService])
], StoreQuotationController);
//# sourceMappingURL=StoreQuotationController.js.map