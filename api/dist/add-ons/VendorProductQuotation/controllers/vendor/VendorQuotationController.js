"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorQuotationController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const QuotationService_1 = require("../../../ProductQuotation/services/QuotationService");
const QuotationListRequest_1 = require("./requests/QuotationListRequest");
const moment_1 = tslib_1.__importDefault(require("moment"));
const QuotationProductService_1 = require("../../../ProductQuotation/services/QuotationProductService");
const CurrencyService_1 = require("../.././../../src/api/core/services/CurrencyService");
const TranslationMiddleware_1 = require("../../../../src/api/core/middlewares/TranslationMiddleware");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const ExportLog_1 = require("../../../../src/api/core/models/ExportLog");
const ExportLogService_1 = require("../../../../src/api/core/services/ExportLogService");
const fs = require("fs");
const typedi_1 = require("typedi");
let VendorQuotationController = class VendorQuotationController {
    constructor(quotationService, quotationProductService, currencyService, exportLogService) {
        this.quotationService = quotationService;
        this.quotationProductService = quotationProductService;
        this.currencyService = currencyService;
        this.exportLogService = exportLogService;
    }
    // Get Vendor Quotation List
    /**
     * @api {Get} /api/vendor-quotation Vendor Quotation List API
     * @apiGroup VendorQuotation
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} startDate startDate
     * @apiParam (Request body) {String} endDate endDate
     * @apiParam (Request body) {String} firstname firstname
     * @apiParam (Request body) {String} lastname lastname
     * @apiParam (Request body) {String} email email
     * @apiParam (Request body) {String} telephone telephone
     * @apiParam (Request body) {Number} isActive isActive
     * @apiParam (Request body) {Number} quotationStatusId quotationStatusId
     * @apiParam (Request body) {String} keywords keywords
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Quotation list retrieved successfully!",
     *    "data": [
     *        {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedDate": "",
     *            "id": 1,
     *            "customerId": 1,
     *            "firstname": "",
     *            "lastname": "",
     *            "email": "",
     *            "telephone": "",
     *            "total": 1,
     *            "quotationStatusId": 1,
     *            "quotationNo": "",
     *            "respondedDate": "",
     *            "currencySymbol": "",
     *            "productCount": 1
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/vendor-quotation
     * @apiErrorExample {json} getQuotationList Error
     * HTTP/1.1 500 Internal Server Error
     */
    getQuotationList(params, count, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findQuotationList = yield this.getQuotationLists(params, count, request);
            return response.status(200).send(findQuotationList);
        });
    }
    // Get quotation functions
    getQuotationLists(params, count, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'Quotation.createdBy as createdBy',
                'Quotation.createdDate as createdDate',
                'Quotation.modifiedDate as modifiedDate',
                'Quotation.id as id',
                'Quotation.customerId as customerId',
                'Quotation.firstname as firstname',
                'Quotation.lastname as lastname',
                'Quotation.email as email',
                'Quotation.telephone as telephone',
                'Quotation.total as total',
                'Quotation.quotationStatusId as quotationStatusId',
                'Quotation.quotationNo as quotationNo',
                'Quotation.respondedDate as respondedDate',
                '(SELECT symbol_left from currency where currency_id = Quotation.currencyId limit 1) as currencySymbol',
                'COUNT(vendorQuotation.quotationProductId) as productCount',
            ];
            const relations = [
                {
                    op: 'left',
                    tableName: 'Quotation.vendorQuotation',
                    aliasName: 'vendorQuotation',
                },
            ];
            const searchConditions = [];
            const whereConditions = [];
            whereConditions.push({
                op: 'where',
                name: 'vendorQuotation.vendorId',
                value: request.user.vendorId,
            });
            if (params.startDate && params.startDate !== '') {
                whereConditions.push({
                    op: 'raw',
                    name: 'Quotation.createdDate',
                    sign: '>=',
                    value: (0, moment_1.default)(params.startDate).format('YYYY-MM-DD HH:mm:ss'),
                });
            }
            if (params.endDate && params.endDate !== '') {
                whereConditions.push({
                    op: 'raw',
                    name: 'Quotation.createdDate',
                    sign: '<=',
                    value: (0, moment_1.default)(params.endDate).format('YYYY-MM-DD 23:59:59'),
                });
            }
            if (params.quotationId && params.quotationId.length > 0) {
                whereConditions.push({
                    op: 'IN',
                    name: 'Quotation.id',
                    value: params.quotationId,
                });
            }
            if (params.isActive) {
                whereConditions.push({
                    op: 'and',
                    name: 'Quotation.isActive',
                    value: params.isActive,
                });
            }
            if (params.quotationStatusId) {
                whereConditions.push({
                    op: 'and',
                    name: 'Quotation.quotationStatusId',
                    value: params.quotationStatusId,
                });
            }
            if (params.firstname && params.firstname !== '') {
                searchConditions.push({
                    name: ['Quotation.firstname'],
                    value: params.firstname.toLowerCase(),
                });
            }
            if (params.lastname && params.lastname !== '') {
                searchConditions.push({
                    name: ['Quotation.lastname'],
                    value: params.lastname.toLowerCase(),
                });
            }
            if (params.email && params.email !== '') {
                searchConditions.push({
                    name: ['Quotation.email'],
                    value: params.email.toLowerCase(),
                });
            }
            if (params.telephone && params.telephone !== '') {
                searchConditions.push({
                    name: ['Quotation.telephone'],
                    value: params.telephone,
                });
            }
            if (params.quotationNo && params.quotationNo !== '') {
                searchConditions.push({
                    name: ['Quotation.quotationNo'],
                    value: params.quotationNo,
                });
            }
            if (params.keywords && params.keywords) {
                searchConditions.push({
                    name: ['Quotation.firstname', 'Quotation.lastname', 'Quotation.email', 'Quotation.telephone', 'Quotation.quotationNo', 'Quotation.total'],
                    value: params.keywords,
                });
            }
            if (params.dateAdded) {
                searchConditions.push({
                    name: ['Quotation.createdDate'],
                    value: params.dateAdded,
                });
            }
            if (params.responseDate) {
                searchConditions.push({
                    name: ['Quotation.modifiedDate'],
                    value: params.responseDate,
                });
            }
            const groupBy = [{ name: 'vendorQuotation.quotationId' }];
            const sort = [{ name: 'createdDate', order: 'DESC' }];
            const findQuotation = yield this.quotationService.listByQueryBuilder(params.limit, params.offset, select, whereConditions, searchConditions, relations, groupBy, sort, count, true);
            return { status: 1, message: `Quotation ${count ? 'count' : 'list'} retrieved successfully!`, data: findQuotation };
        });
    }
    // Export Quotation API
    /**
     * @api {Get} /api/vendor-quotation/export Export quotation API
     * @apiGroup  VendorQuotation
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} quotationId quotationId (Required)
     * @apiSampleRequest  /api/vendor-quotation/export
     * @apiErrorExample {json}  vendor quotation error
     * HTTP/1.1 500 Internal Server Error
     */
    quotationExcelListDownload(quotationId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Quotation Detail Sheet');
            const rows = [];
            const params = {};
            params.quotationId = quotationId && quotationId !== '' ? quotationId.split(',') : [];
            const findQuotationList = yield this.getQuotationLists(params, false, request);
            const quotationData = findQuotationList.data;
            // Excel sheet column define
            worksheet.columns = [
                { header: 'QUOTATION NUMBER', key: 'quotationNo', size: 16, width: 30 },
                { header: 'BUYER NAME', key: 'name', size: 16, width: 30 },
                { header: 'EMAIL ID', key: 'email', size: 16, width: 30 },
                { header: 'TOTAL AMOUNT', key: 'total', size: 16, width: 60 },
                { header: 'NO OF ITEMS', key: 'productCount', size: 16, width: 15 },
                { header: 'QUOTATION ON', key: 'createdDate', size: 16, width: 15 },
                { header: 'RESPONDED ON', key: 'respondedDate', size: 16, width: 30 },
                { header: 'STATUS', key: 'status', size: 16, width: 30 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            for (const data of quotationData) {
                if (+data.quotationStatusId === 1) {
                    data.status = 'Approved';
                }
                else {
                    data.status = 'Pending';
                }
                rows.push([data.quotationNo, data.firstname, data.email, data.currencySymbol + data.total, data.productCount, data.createdDate, data.respondedDate, data.status]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './QuotationExcel' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            // Add export log
            const newExportLog = new ExportLog_1.ExportLog();
            newExportLog.module = 'Product Categories';
            newExportLog.recordAvailable = quotationData.length;
            newExportLog.referenceType = 2;
            newExportLog.referenceId = request.user.vendorId;
            yield this.exportLogService.create(newExportLog);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(fileName);
                        return response.end();
                    }
                });
            });
        });
    }
    // Vendor Quotation Details
    /**
     * @api {Get} /api/vendor-quotation/detail/:id Vendor Quotation Details API
     * @apiGroup VendorQuotation
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id quotation id (Required)
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     *     {
     *    "status": 1,
     *    "message": "Successfully got the quotation detail",
     *    "data": {
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
     *        "total": "",
     *        "isActive": 1,
     *        "ip": "",
     *        "quantity": 1,
     *        "comment": "",
     *        "quotationStatusId": "",
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
     *            "customerGroupId": "",
     *            "lastLogin": "",
     *            "safe": "",
     *            "ip": "",
     *            "mailStatus": 1,
     *            "pincode": "",
     *            "deleteFlag": 1,
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
     *                "productPrice": "",
     *                "discountAmount": 1,
     *                "basePrice": "",
     *                "taxType": "",
     *                "taxValue": "",
     *                "total": 1,
     *                "discountedAmount": 1,
     *                "quotationStatusId": "",
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
     *                    "minimumQuantity": "",
     *                    "subtractStock": "",
     *                    "stockStatusId": "",
     *                    "quotationAvailable": "",
     *                    "image": "",
     *                    "imagePath": "",
     *                    "manufacturerId": "",
     *                    "shipping": "",
     *                    "serviceCharges": "",
     *                    "taxType": "",
     *                    "taxValue": "",
     *                    "price": 1,
     *                    "priceUpdateFileLogId": "",
     *                    "dateAvailable": "",
     *                    "sortOrder": "",
     *                    "name": "",detail
     *                    "description": "",
     *                    "amount": "",
     *                    "keywords": "",
     *                    "discount": 1,
     *                    "deleteFlag": 1,
     *                    "isFeatured": "",
     *                    "todayDeals": "",
     *                    "condition": "",
     *                    "rating": 1,
     *                    "wishListStatus": "",
     *                    "productSlug": "",
     *                    "isActive": 1,
     *                    "width": 1,
     *                    "height": 1,
     *                    "length": 1,
     *                    "weight": "",
     *                    "hasStock": "",
     *                    "priceType": "",
     *                    "isSimplified": 1,
     *                    "owner": "",
     *                    "isCommon": 1,
     *                    "skuId": 1,
     *                    "hasTirePrice": "",
     *                    "outOfStockThreshold": "",
     *                    "notifyMinQuantity": "",
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
     *                            "sortOrder": "",
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
     *                    "id": "1
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
     *                        "vendorPrefixId": 1,
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
     *                        "companyCountryId": "",
     *                        "pincode": "",
     *                        "companyDescription": "",
     *                        "companyMobileNumber": "",
     *                        "companyEmailId": "",
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
     *    }
     * }
     * @apiSampleRequest /api/vendor-quotation/detail/:id
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal Server Error
     */
    getQuotationDetail(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const where = (query) => {
                query.andWhere({ isActive: 1, id });
                query.andWhere('Quot__quPr__prInDe__prIm.defaultImage = 1');
                query.andWhere('Quotation__quotationProduct__productInformationDetail.isActive = :isActive', { isActive: 1 });
                query.andWhere('Quotation__quotationProduct__productInformationDetail.delete_flag = :deleteFlag', { deleteFlag: 0 });
                query.andWhere('Quotation__quotationProduct__vendorQuotation.vendor_id = :vendorId', { vendorId: request.user.vendorId });
                if (request.languageId) {
                    query.andWhere('Quot__quPr__prInDe__prTr.languageId = :languageId', { languageId: request.languageId });
                }
            };
            const relations = ['customer', 'quotationProduct', 'quotationProduct.productInformationDetail', 'quotationProduct.productInformationDetail.productImage', 'quotationProduct.vendorQuotation', 'quotationProduct.vendorQuotation.vendor'];
            if (request.languageId) {
                relations.push('quotationProduct.productInformationDetail.productTranslation');
            }
            const options = { where, relations };
            const findQuotation = yield this.quotationService.findOne(options);
            if (findQuotation) {
                const currencyValue = yield this.currencyService.findOne({ where: { currencyId: findQuotation === null || findQuotation === void 0 ? void 0 : findQuotation.currencyId } });
                findQuotation.currencySymbol = currencyValue === null || currencyValue === void 0 ? void 0 : currencyValue.symbolLeft;
            }
            return response.status(200).send({ status: 1, message: `${findQuotation ? 'Successfully' : 'Unable to'}` + ' got the quotation detail', data: findQuotation ? findQuotation : {} });
        });
    }
    // Update Quotation Status
    /**
     * @api {Put} /api/vendor-quotation/update/:id Update Quotation Status
     * @apiGroup VendorQuotation
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id quotation id (Required)
     * @apiParam (Request body) {Number} statusId statusId
     * @apiParam (Request body) {Number} quotationProductId quotationProductId
     * @apiParam (Request body) {Number} quotationStatusId quotationStatusId
     * @apiParam (Request body) {String} quotationStatusId quotationStatusId
     * @apiParam (Request body) {String} replyMessage replyMessage
     * @apiParamExample {json} Input
     * {
     *     "statusId": 1,
     *     "quotationProductId": 1,
     *     "quotationStatusId": 1,
     *     "bestQuotedPrice": "",
     *     "replyMessage": "",
     *     "productDetails": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 Ok
     *     {
     *    "status": 1,
     *    "message": "Quotation status updated successfully",
     *    "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "id": 1,
     *        "firstname": "",
     *        "lastname": "",
     *        "email": "",
     *        "telephone": "",vendor-store/vendor-product-list
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
     *        "respondedDate": ""
     *    }
     * }
     * }
     * @apiSampleRequest /api/vendor-quotation/:id
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal Server Error
     */
    updateQuottionStatus(id, params, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findQuotationDetail = yield this.quotationService.findOne({ where: { id } });
            if (!findQuotationDetail) {
                return response.status(400).send({ status: 0, message: 'Quotation ID invalid' });
            }
            const quotationProduct = [];
            for (const qutProd of params.productDetails) {
                const findProQuot = yield this.quotationProductService.findOne({ where: { id: qutProd.quotationProductId } });
                findProQuot.quotationStatusId = qutProd.quotationStatusId;
                findProQuot.bestQuotedPrice = qutProd.bestQuotedPrice;
                findProQuot.replyMessage = qutProd.replyMessage;
                quotationProduct.push(findProQuot);
            }
            const updateQuotStatus = yield this.quotationProductService.create(quotationProduct);
            findQuotationDetail.quotationStatusId = params.statusId;
            findQuotationDetail.respondedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
            yield this.quotationService.create(findQuotationDetail);
            const status = updateQuotStatus ? 1 : 0;
            const message = updateQuotStatus ? 'Quotation status updated successfully' : 'Failed to update the quotation status';
            const responseData = { status, message, data: findQuotationDetail !== null && findQuotationDetail !== void 0 ? findQuotationDetail : findQuotationDetail };
            return response.status(status ? 200 : 400).send(responseData);
        });
    }
};
exports.VendorQuotationController = VendorQuotationController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(['vendor']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParams)()),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [QuotationListRequest_1.QuotationListRequest, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorQuotationController.prototype, "getQuotationList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Authorized)(['vendor']),
    (0, routing_controllers_1.Get)('/export'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('quotationId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorQuotationController.prototype, "quotationExcelListDownload", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(TranslationMiddleware_1.TranslationMiddleware),
    (0, routing_controllers_1.Get)('/detail/:id'),
    (0, routing_controllers_1.Authorized)(['vendor']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorQuotationController.prototype, "getQuotationDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update/:id'),
    (0, routing_controllers_1.Authorized)(['vendor']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorQuotationController.prototype, "updateQuottionStatus", null);
exports.VendorQuotationController = VendorQuotationController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/vendor-quotation'),
    tslib_1.__metadata("design:paramtypes", [QuotationService_1.QuotationService,
        QuotationProductService_1.QuotationProductService,
        CurrencyService_1.CurrencyService,
        ExportLogService_1.ExportLogService])
], VendorQuotationController);
//# sourceMappingURL=VendorQuotationController.js.map