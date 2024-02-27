"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbandonedCartController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const CustomerService_1 = require("../../../../src/api/core/services/CustomerService");
const CustomerCartService_1 = require("../../../../src/api/core/services/CustomerCartService");
const mail_services_1 = require("../../../../src/auth/mail.services");
const env_1 = require("../../../../src/env");
const fs = tslib_1.__importStar(require("fs"));
const excel = tslib_1.__importStar(require("exceljs"));
const SettingService_1 = require("../../../../src/api/core/services/SettingService");
const EmailTemplateService_1 = require("../../../../src/api/core/services/EmailTemplateService");
const ProductImageService_1 = require("../../../../src/api/core/services/ProductImageService");
const moment_1 = tslib_1.__importDefault(require("moment"));
const CreateExcelRequest_1 = require("./requests/CreateExcelRequest");
const UpdateCartRequest_1 = require("./requests/UpdateCartRequest");
const typeorm_1 = require("typeorm");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const CurrencyService_1 = require("../../../../src/api/core/services/CurrencyService");
let AbandonedCartController = class AbandonedCartController {
    constructor(customerCartService, customerService, settingService, emailTemplateService, productImageService, currencyService) {
        this.customerCartService = customerCartService;
        this.customerService = customerService;
        this.settingService = settingService;
        this.emailTemplateService = emailTemplateService;
        this.productImageService = productImageService;
        this.currencyService = currencyService;
    }
    // Live/Abandoned Cart List
    /**
     * @api {get} /api/admin-cart Live-Cart API
     * @apiGroup Admin Cart
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} keyword keyword
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfuly got Live/Abandoned Cart List",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-cart
     * @apiErrorExample {json} Admin Cart error
     * HTTP/1.1 500 Internal Server Error
     */
    liveCartList(response, keyword, limit, offset, startDate, endDate, count, type) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = (0, moment_1.default)(startDate).format('YYYY-MM-DD HH:mm:ss');
            const endDateMin = (0, moment_1.default)(endDate).format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'CustomerCart.customerId AS customerId',
                'MAX(CustomerCart.modifiedDate) AS lastModifiedDate',
                'cust.firstName AS customerName',
                'cust.lastName AS customerLastName',
                'cust.email AS email',
                'COUNT(1) AS productCount',
                'SUM(CustomerCart.total) AS totalCost',
                'CustomerCart.ip AS customerIp',
            ];
            const relation = [
                {
                    op: 'leftCond',
                    tableName: 'CustomerCart.customer',
                    aliasName: 'cust',
                    cond: 'CustomerCart.customerId = cust.id',
                },
            ];
            const groupBy = [
                {
                    name: 'CustomerCart.ip',
                },
                {
                    name: 'CustomerCart.customerId',
                },
            ];
            const whereConditionLive = [
                {
                    op: 'where',
                    sign: 'like',
                    name: 'CustomerCart.createdDate',
                    value: (0, moment_1.default)().format('YYYY-MM-DD'),
                },
            ];
            const whereConditionAbandoned = [
                {
                    op: 'where',
                    sign: 'not like',
                    name: 'CustomerCart.createdDate',
                    value: (0, moment_1.default)().format('YYYY-MM-DD'),
                },
            ];
            if (startDate) {
                whereConditionAbandoned.push({
                    op: 'raw',
                    sign: '>=',
                    name: '`CustomerCart`.`created_date`',
                    value: startDateMin,
                });
            }
            if (endDate) {
                whereConditionAbandoned.push({
                    op: 'raw',
                    sign: '<=',
                    name: '`CustomerCart`.`created_date`',
                    value: endDateMin,
                });
            }
            const searchAbandoned = [];
            if (keyword) {
                searchAbandoned.push({
                    name: ['cust.firstName', 'cust.email', 'CustomerCart.name'],
                    value: keyword,
                });
            }
            const sort = [];
            sort.push({
                name: 'MAX(CustomerCart.modifiedDate)',
                order: 'DESC',
            });
            let liveCart = {};
            let abandonedCart = {};
            if (type === 'live') {
                liveCart = yield this.customerCartService.listByQueryBuilder(limit, offset, select, whereConditionLive, searchAbandoned, relation, groupBy, sort, false, true);
            }
            else {
                abandonedCart = yield this.customerCartService.listByQueryBuilder(limit, offset, select, whereConditionAbandoned, searchAbandoned, relation, groupBy, sort, false, true);
            }
            const data = type === 'live' ? liveCart : abandonedCart;
            const successResponse = {
                status: 1,
                message: `Successfuly got ${type === 'live' ? 'Live' : 'Abandoned'} Cart List / Count..!`,
                data: count ? data.length : data,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Live/Abandoned Cart Detail
    /**
     * @api {get} /api/admin-cart/:customerId Live-Cart Detail API
     * @apiGroup Admin Cart
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} fromDate From Date
     * @apiParam (Request body) {String} toDate To Date
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfuly got Cart Details",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-cart/:customerId
     * @apiErrorExample {json} Admin Cart error
     * HTTP/1.1 500 Internal Server Error
     */
    cartDetail(id, ip, type, fromDate, toDate, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let customerCart;
            let customerCartDetails = {};
            const whereCondition = {};
            whereCondition.customerId = id !== null && id !== void 0 ? id : 0;
            if (type === 'live') {
                whereCondition.createdDate = (0, typeorm_1.Like)(`%${(0, moment_1.default)().format('YYYY-MM-DD')}%`);
            }
            else {
                whereCondition.createdDate = (0, typeorm_1.Not)((0, typeorm_1.Like)(`%${(0, moment_1.default)().format('YYYY-MM-DD')}%`));
            }
            if (id === 0) {
                whereCondition.ip = ip;
                customerCart = yield this.customerCartService.find({
                    select: ['name', 'total', 'quantity', 'productPrice', 'productId', 'ip', 'createdDate'],
                    where: whereCondition,
                });
                if (!customerCart.length) {
                    return response.status(404).send({
                        status: 0,
                        message: `Guest Has No Product In ${type === 'live' ? 'Live' : 'Abandoned'} Cart..!!`,
                    });
                }
                customerCartDetails.firstName = 'Guest';
            }
            else {
                customerCartDetails = yield this.customerService.findOne({
                    select: ['firstName', 'lastName', 'email', 'ip'],
                    where: { id },
                });
                if (!customerCartDetails) {
                    return response.status(404).send({
                        status: 0,
                        message: 'Invalid Customer Id/ No customer Found',
                    });
                }
                customerCart = yield this.customerCartService.find({
                    select: ['name', 'total', 'quantity', 'productPrice', 'productId', 'createdDate'],
                    where: whereCondition,
                });
                if (!customerCart.length) {
                    return response.status(200).send({
                        status: 1,
                        message: `Customer Has No Product In ${type === 'live' ? 'Live' : 'Abandoned'} Cart..!!`,
                    });
                }
            }
            customerCartDetails.totalProduct = customerCart.length;
            customerCartDetails.cartList = yield Promise.all(customerCart.map((cartDetails) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const productImage = yield this.productImageService.findAll({
                    select: ['productId', 'image', 'containerName'],
                    where: {
                        productId: cartDetails.productId,
                        defaultImage: 1,
                    },
                });
                cartDetails.productImage = productImage;
                return cartDetails;
            })));
            const successResponse = {
                status: 1,
                message: 'Successfuly got Cart Details',
                data: customerCartDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Send-E-mail
    /**
     * @api {get} /api/admin-cart/abandoned-cart-email Send E-mail API
     * @apiGroup Admin Cart
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} id Customer ID
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Email Sent to Customer",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-cart/abandoned-cart-email
     * @apiErrorExample {json} Admin Cart error
     * HTTP/1.1 500 Internal Server Error
     */
    emailToCustomer(customerId, message, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let customerCartDetails = [];
            const customer = yield this.customerService.findOne({
                select: ['id', 'firstName', 'lastName', 'email'],
                where: {
                    id: customerId,
                },
            });
            if (!customer) {
                return response.status(404).send({
                    status: 0,
                    message: 'Invalid customer ID',
                });
            }
            customerCartDetails = yield this.customerCartService.find({ where: { customerId: customer.id } });
            customerCartDetails = yield Promise.all(customerCartDetails.map((cartDetails) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const productImage = yield this.productImageService.findOne({
                    select: ['productId', 'image', 'containerName'],
                    where: {
                        productId: cartDetails.productId,
                        defaultImage: 1,
                    },
                });
                cartDetails.productImage = productImage;
                return cartDetails;
            })));
            const emailContent = yield this.emailTemplateService.findOne(30);
            const storeMailContents = {};
            storeMailContents.logo = yield this.settingService.findOne();
            const currencySymbol = yield this.currencyService.findOne(storeMailContents.logo.storeCurrencyId);
            const emailContentText = emailContent.content.replace('{name}', (customer.firstName)).replace('{supportEmail}', storeMailContents.logo.storeEmail).replace('{supportNumber}', storeMailContents.logo.storeTelephone).replace('{storeName}', storeMailContents.logo.storeName);
            const emailContentData = emailContentText.split('{cartDetail}');
            storeMailContents.emailContent1 = emailContentData[0];
            storeMailContents.emailContent2 = emailContentData[1];
            storeMailContents.adminContent = `<p>${message === null || message === void 0 ? void 0 : message.trim()}<p>`;
            storeMailContents.redirectUrl = env_1.env.storeRedirectUrl;
            storeMailContents.productDetailData = customerCartDetails;
            storeMailContents.orderData = {
                currencyRight: currencySymbol ? currencySymbol.symbolRight : '',
                currencyLeft: currencySymbol ? currencySymbol.symbolLeft : '',
            };
            storeMailContents.templateName = 'abandonedCartTemplate.ejs';
            const subject = emailContent.subject;
            mail_services_1.MAILService.sendMail(storeMailContents, customer.email, subject, false, false, '');
            return response.status(200).send({
                status: 1,
                message: 'Email Sent to Customer',
            });
        });
    }
    // Excel export
    /**
     * @api {post} /api/admin-cart/cart-export To Export Excel
     * @apiGroup Admin Cart
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} customerId Customer ID
     * @apiParam (Request body) {String} guestIp Guest IP
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * @apiSampleRequest /api/admin-cart/cart-export
     * @apiErrorExample {json} Admin Cart error
     * HTTP/1.1 500 Internal Server Error
     */
    cartListExcelExport(exportRequest, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Bulk Customer-Cart Export');
            const customerIds = exportRequest.customerId;
            const guestIp = exportRequest.guestIp;
            const customers = yield this.customerService.find({
                select: ['firstName', 'lastName', 'email', 'ip', 'id'],
                where: {
                    id: (0, typeorm_1.In)(customerIds),
                },
            });
            if ((guestIp === null || guestIp === void 0 ? void 0 : guestIp.length) > 0) {
                customers.push(...guestIp.map((guest) => ({
                    firstName: 'Guest',
                    lastName: '',
                    email: 'NA',
                    ip: guest,
                    id: 0,
                    cartList: [],
                })));
            }
            for (const customer of customers) {
                if (!customer.id) {
                    customer.cartList = yield this.customerCartService.find({
                        where: {
                            ip: customer.ip,
                        },
                    });
                }
                else {
                    customer.cartList = yield this.customerCartService.find({
                        where: {
                            customerId: customer.id,
                        },
                    });
                }
            }
            let customerCount = 1;
            worksheet.addRow(['S.no', 'Customer Name', 'Email Id', 'IP Address', 'Customer ID']).eachCell((cell) => cell.font = {
                bold: true,
            });
            for (const customer of customers) {
                let cartListCount = 1;
                worksheet.columns = [
                    { key: 'no_', width: 15 },
                    { key: 'name', width: 30 },
                    { key: 'email', width: 20 },
                    { key: 'ip', width: 20 },
                    { key: 'id', width: 20 },
                ];
                const customerExcel = {
                    no_: customerCount,
                    name: customer.firstName + '' + customer.lastName,
                    email: customer.email,
                    ip: customer.ip,
                    id: customer.id,
                };
                worksheet.addRow(customerExcel).eachCell((cell) => (cell.alignment = {
                    vertical: 'top',
                    horizontal: 'left',
                },
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFFF00' },
                    }));
                worksheet.addRow(['', 'No', 'Product Name', 'Quantity', 'Product Price', 'Total']).eachCell((cell) => (cell.font = {
                    bold: true,
                    size: 10,
                }));
                worksheet.columns = [
                    { key: '', width: 15 },
                    { key: 'no_', width: 30 },
                    { key: 'name', width: 45 },
                    { key: 'quantity', width: 30 },
                    { key: 'productPrice', width: 20 },
                    { key: 'total', width: 20 },
                ];
                for (const cartList of customer.cartList) {
                    const customerExcelCartList = Object.assign({ no_: cartListCount }, cartList);
                    worksheet.addRow(customerExcelCartList).eachCell((cell) => (cell.alignment = {
                        vertical: 'top',
                        horizontal: 'left',
                    },
                        cell.font = {
                            size: 10,
                        }));
                    cartListCount++;
                }
                customerCount++;
            }
            const fileName = './CustomerCartExcel_' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
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
    // Cart Update
    /**
     * @api {post} /api/admin-cart/:type To Update Cart
     * @apiGroup Admin Cart
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} customerId Customer ID
     * @apiParam (Request body) {String} guestIp Guest IP
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * @apiSampleRequest /api/admin-cart/:type
     * @apiErrorExample {json} Admin Cart error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteCart(customerCartUpdate, type, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customerIds = customerCartUpdate.customerId;
            const guestIp = customerCartUpdate.guestIp;
            const cartList = [];
            let cartDeleteResult;
            const whereCondition = {};
            if (customerCartUpdate.action.trim() === 'delete') {
                whereCondition.createdDate = (type === null || type === void 0 ? void 0 : type.trim()) === 'live' ? (0, typeorm_1.Like)(`%${(0, moment_1.default)().format('YYYY-MM-DD')}%`) : (0, typeorm_1.Not)((0, typeorm_1.Like)(`%${(0, moment_1.default)().format('YYYY-MM-DD')}%`));
                whereCondition.customerId = (0, typeorm_1.In)(customerIds);
                cartList.push(...yield this.customerCartService.find(whereCondition));
                whereCondition.customerId = 0;
                if (guestIp === null || guestIp === void 0 ? void 0 : guestIp.length) {
                    whereCondition.ip = (0, typeorm_1.In)(guestIp);
                    cartList.push(...yield this.customerCartService.find(whereCondition));
                }
                const cartDeleteIds = cartList.map((cart) => cart.id);
                cartDeleteResult = yield this.customerCartService.delete({ id: (0, typeorm_1.In)(cartDeleteIds) });
            }
            return response.status(200).send({
                status: 1,
                message: `Successfully Deleted Cart List...!`,
                data: cartDeleteResult,
            });
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('type')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, Number, Number, String, String, Boolean, String]),
    tslib_1.__metadata("design:returntype", Promise)
], AbandonedCartController.prototype, "liveCartList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:customerId'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('customerId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('ip')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('type')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('fromDate')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('toDate')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, String, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AbandonedCartController.prototype, "cartDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/abandoned-cart-email'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('message')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AbandonedCartController.prototype, "emailToCustomer", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/cart-export'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateExcelRequest_1.CreateExcelRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AbandonedCartController.prototype, "cartListExcelExport", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:type'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('type')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateCartRequest_1.UpdateCartRequest, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AbandonedCartController.prototype, "deleteCart", null);
AbandonedCartController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/admin-cart'),
    tslib_1.__metadata("design:paramtypes", [CustomerCartService_1.CustomerCartService,
        CustomerService_1.CustomerService,
        SettingService_1.SettingService,
        EmailTemplateService_1.EmailTemplateService,
        ProductImageService_1.ProductImageService,
        CurrencyService_1.CurrencyService])
], AbandonedCartController);
exports.AbandonedCartController = AbandonedCartController;
//# sourceMappingURL=AbandonedCartController.js.map