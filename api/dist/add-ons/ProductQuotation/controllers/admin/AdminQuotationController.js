"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminQuotationController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const QuotationService_1 = require("../../services/QuotationService");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typedi_1 = require("typedi");
let AdminQuotationController = class AdminQuotationController {
    constructor(quotationService) {
        this.quotationService = quotationService;
    }
    // Get Admin Quotation List
    /**
     * @api {get} /api/admin-quotation Admin Quotation List
     * @apiGroup AdminQuotation
     * @apiName AdminQuotationList
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiParam (Request body) {String} firstname firstname
     * @apiParam (Request body) {String} email email
     * @apiParam (Request body) {String} telephone telephone
     * @apiParam (Request body) {String} keywords keywords
     * @apiParam (Request body) {String} startDate startDate
     * @apiParam (Request body) {String} endDate endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     *     {
     *    "status": 1,
     *    "message": "Successfully got the quotation list!",
     *    "data": [
     *        {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "id": 1,
     *            "firstname": "",
     *            "email": "",
     *            "telephone": "",
     *            "customerId": 1,
     *            "total": 1,
     *            "isActive": 1,
     *            "quotationStatusId": 1,
     *            "customer": {
     *                "createdBy": 1,
     *                "createdDate": "",
     *                "modifiedBy": 1,
     *                "modifiedDate": "",
     *                "id": 1,
     *                "firstName": "",
     *                "lastName": "",
     *                "username": "",
     *                "password": "",
     *                "email": "",
     *                "mobileNumber": "",
     *                "address": "",
     *                "countryId": 1,
     *                "zoneId": 1,
     *                "city": "",
     *                "local": "",
     *                "oauthData": "",
     *                "avatar": "",
     *                "newsletter": "",
     *                "avatarPath": "",
     *                "customerGroupId": "",
     *                "lastLogin": "",
     *                "safe": "",
     *                "ip": "",
     *                "mailStatus": 1,
     *                "pincode": "",
     *                "deleteFlag": 0,
     *                "isActive": 1,
     *                "forgetPasswordKey": "",
     *                "linkExpires": "",
     *                "lockedOn": "",
     *                "siteId": 1,
     *                "address2": "",
     *                "landmark": "",
     *                "mailOtp": "",
     *                "mailOtpExpireTime": ""
     *            },
     *            "quotationProduct": [
     *                {
     *                    "createdBy": 1,
     *                    "createdDate": "",
     *                    "modifiedBy": 1,
     *                    "modifiedDate": "",
     *                    "id": 1,
     *                    "productId": 1,
     *                    "quotationId": 1,
     *                    "productName": "",
     *                    "quantity": 1,
     *                    "productPrice": "",
     *                    "discountAmount": 1,
     *                    "basePrice": "",
     *                    "taxType": "",
     *                    "taxValue": "",
     *                    "total": 1,
     *                    "quotationStatusId": 1,
     *                    "bestQuotedPrice": "",
     *                    "replyMessage": "",
     *                    "tax": "",
     *                    "isActive": 1,
     *                    "skuName": "",
     *                    "vendorQuotation": {
     *                        "createdBy": 1,
     *                        "createdDate": "",
     *                        "modifiedBy": 1,
     *                        "modifiedDate": "",
     *                        "id": 1,
     *                        "vendorId": 1,
     *                        "quotationProductId": 1,
     *                        "quotationId": 1,
     *                        "total": 1,
     *                        "vendor": {
     *                            "createdBy": 1,
     *                            "createdDate": "",
     *                            "modifiedBy": 1,
     *                            "modifiedDate": "",
     *                            "vendorId": 1,
     *                            "vendorPrefixId": "",
     *                            "customerId": 1,
     *                            "vendorGroupId": 1,
     *                            "commission": "",
     *                            "contactPersonName": "",
     *                            "vendorSlugName": "",
     *                            "designation": "",
     *                            "companyName": "",
     *                            "companyAddress1": "",
     *                            "companyAddress2": "",
     *                            "companyCity": "",
     *                            "companyState": "",
     *                            "zoneId": 1,
     *                            "companyCountryId": 1,
     *                            "pincode": "",
     *                            "companyDescription": "",
     *                            "companyMobileNumber": "",
     *                            "companyEmailId": 1,
     *                            "companyWebsite": "",
     *                            "companyTaxNumber": "",
     *                            "companyPanNumber": "",
     *                            "companyLogo": "",
     *                            "companyLogoPath": "",
     *                            "paymentInformation": "",
     *                            "verification": [
     *                                {
     *                                    "mail": "",
     *                                    "email": "",
     *                                    "policy": "",
     *                                    "category": "",
     *                                    "decision": "",
     *                                    "document": "",
     *                                    "storeFront": "",
     *                                    "bankAccount": "",
     *                                    "paymentInfo": "",
     *                                    "companyDetail": "",
     *                                    "deliveryMethod": "",
     *                                    "subscriptionPlan": "",
     *                                    "distributionPoint": ""
     *                                }
     *                            ],
     *                            "verificationComment": [],
     *                            "verificationDetailComment": [],
     *                            "approvalFlag": "",
     *                            "approvedBy": 1,
     *                            "approvalDate": "",
     *                            "companyCoverImage": "",
     *                            "companyCoverImagePath": "",
     *                            "displayNameUrl": "",
     *                            "instagram": "",
     *                            "twitter": "",
     *                            "youtube": "",
     *                            "facebook": "",
     *                            "whatsapp": "",
     *                            "bankName": "",
     *                            "bankAccountNumber": "",
     *                            "accountHolderName": "",
     *                            "ifscCode": ""
     *                        }
     *                    }
     *                }
     *            ]
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/admin-quotation
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal Server Error
     */
    getQuotationList(limit, offset, firstname, email, telephone, keywords, startDate, endDate, count, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const where = (query) => {
                if (firstname !== null && firstname !== void 0 ? firstname : '') {
                    query.andWhere({
                        firstname: (0, typeorm_1.ILike)('%' + firstname + '%'),
                    });
                }
                if (email !== null && email !== void 0 ? email : '') {
                    query.andWhere({
                        email: (0, typeorm_1.ILike)('%' + email + '%'),
                    });
                }
                if (telephone !== null && telephone !== void 0 ? telephone : '') {
                    query.andWhere({
                        telephone: (0, typeorm_1.ILike)('%' + telephone + '%'),
                    });
                }
                if (keywords !== null && keywords !== void 0 ? keywords : '') {
                    query.orWhere({
                        firstname: (0, typeorm_1.ILike)('%' + keywords + '%'),
                    });
                    query.orWhere({
                        email: (0, typeorm_1.ILike)('%' + keywords + '%'),
                    });
                    query.orWhere({
                        telephone: (0, typeorm_1.ILike)('%' + keywords + '%'),
                    });
                }
                if (startDate && startDate !== '' && endDate && endDate !== '') {
                    const startDateVal = (0, moment_1.default)(startDate).format('YYYY-MM-DD HH:mm:ss');
                    const endDateVal = (0, moment_1.default)(endDate).format('YYYY-MM-DD 23:59:59');
                    query.andWhere({ createdDate: (0, typeorm_1.Between)(startDateVal, endDateVal) });
                }
                query.andWhere({ isActive: 1 });
            };
            const select = ['createdBy', 'createdDate', 'id', 'customerId', 'firstname', 'email', 'telephone', 'total', 'quotationStatusId', 'isActive'];
            const relations = ['customer', 'quotationProduct', 'quotationProduct.vendorQuotation', 'quotationProduct.vendorQuotation.vendor'];
            const options = { select, where, relations, take: limit, skip: offset };
            const findQuotation = count ? yield this.quotationService.count(options) : yield this.quotationService.find(options);
            return response.status(200).send({ status: 1, message: `Successfully got the quotation ${count ? 'count!' : 'list!'}`, data: findQuotation });
        });
    }
};
exports.AdminQuotationController = AdminQuotationController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(['admin']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('firstname')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('email')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('telephone')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('keywords')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(8, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(9, (0, routing_controllers_1.Res)()),
    tslib_1.__param(10, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminQuotationController.prototype, "getQuotationList", null);
exports.AdminQuotationController = AdminQuotationController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/admin-quotation'),
    tslib_1.__metadata("design:paramtypes", [QuotationService_1.QuotationService])
], AdminQuotationController);
//# sourceMappingURL=AdminQuotationController.js.map