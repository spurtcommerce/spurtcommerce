"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const class_transformer_1 = require("class-transformer");
const env_1 = require("../../../env");
const CustomerService_1 = require("../../core/services/CustomerService");
const Customer_1 = require("../../core/models/Customer");
const CreateCustomerRequest_1 = require("./requests/CreateCustomerRequest");
const User_1 = require("../../core/models/User");
const mail_services_1 = require("../../../auth/mail.services");
const UpdateCustomerRequest_1 = require("./requests/UpdateCustomerRequest");
const SettingService_1 = require("../../core/services/SettingService");
const CustomerGroupService_1 = require("../../core/services/CustomerGroupService");
const OrderProductService_1 = require("../../core/services/OrderProductService");
const EmailTemplateService_1 = require("../../core/services/EmailTemplateService");
const VendorService_1 = require("../../core/services/VendorService");
const VendorProductService_1 = require("../../core/services/VendorProductService");
const ProductViewLogService_1 = require("../../core/services/ProductViewLogService");
const DeleteCustomerRequest_1 = require("./requests/DeleteCustomerRequest");
const fs = tslib_1.__importStar(require("fs"));
const VendorOrderService_1 = require("../../core/services/VendorOrderService");
const LoginLogService_1 = require("../../core/services/LoginLogService");
const customer_1 = require("@spurtcommerce/customer");
const typeorm_1 = require("typeorm");
const ExportLog_1 = require("../../core/models/ExportLog");
const ExportLogService_1 = require("../../core/services/ExportLogService");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3 = new client_s3_1.S3({
    region: env_1.aws_setup.AWS_DEFAULT_REGION,
});
let CustomerController = class CustomerController {
    constructor(customerService, orderProductService, customerGroupService, settingService, productViewLogService, vendorService, vendorProductService, loginLogService, vendorOrdersService, emailTemplateService, exportLogService) {
        this.customerService = customerService;
        this.orderProductService = orderProductService;
        this.customerGroupService = customerGroupService;
        this.settingService = settingService;
        this.productViewLogService = productViewLogService;
        this.vendorService = vendorService;
        this.vendorProductService = vendorProductService;
        this.loginLogService = loginLogService;
        this.vendorOrdersService = vendorOrdersService;
        this.emailTemplateService = emailTemplateService;
        this.exportLogService = exportLogService;
        // --
    }
    // Create Customer API
    /**
     * @api {post} /api/admin-customer Add Customer API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} customerGroupId Customer customerGroupId
     * @apiParam (Request body) {String{..32}} username Customer username
     * @apiParam (Request body) {String{..96}} email Customer email
     * @apiParam (Request body) {Number{6..15}} mobileNumber Customer mobileNumber
     * @apiParam (Request body) {String{8..128}} password Customer password
     * @apiParam (Request body) {String{8..128}} confirmPassword Customer confirmPassword
     * @apiParam (Request body) {String} avatar Customer avatar
     * @apiParam (Request body) {Number} mailStatus Customer mailStatus should be 1 or 0
     * @apiParam (Request body) {Number} status Customer status
     * @apiParamExample {json} Input
     * {
     *      "customerGroupId" : "",
     *      "userName" : "",
     *      "email" : "",
     *      "mobileNumber" : "",
     *      "password" : "",
     *      "confirmPassword" : "",
     *      "avatar" : "",
     *      "mailStatus" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Customer Created successfully",
     *      "status": "1",
     *      "data": {
     *              "customerGroupId": "",
     *              "firstName": "",
     *              "username": "",
     *              "email": "",
     *              "mobileNumber": "",
     *              "password": "",
     *              "mailStatus": "",
     *              "deleteFlag": "",
     *              "isActive": "",
     *              "createdDate": "",
     *              "id": ""
     *              }
     * }
     * @apiSampleRequest /api/admin-customer
     * @apiErrorExample {json} Customer error
     * HTTP/1.1 500 Internal Server Error
     */
    addCustomer(customerParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newCustomer = new Customer_1.Customer();
            const resultUser = yield this.customerService.findOne({ where: { email: customerParam.email, deleteFlag: 0 } });
            if (resultUser) {
                const successResponse = {
                    status: 1,
                    message: 'A buyer is already registered with this email Id',
                };
                return response.status(400).send(successResponse);
            }
            if (customerParam.password === customerParam.confirmPassword) {
                const password = yield User_1.User.hashPassword(customerParam.password);
                newCustomer.customerGroupId = customerParam.customerGroupId;
                newCustomer.firstName = customerParam.username;
                newCustomer.lastName = customerParam.lastName;
                const emailId = customerParam.email;
                newCustomer.username = emailId;
                newCustomer.email = emailId;
                newCustomer.mobileNumber = customerParam.mobileNumber;
                newCustomer.password = password;
                newCustomer.mailStatus = customerParam.mailStatus;
                newCustomer.deleteFlag = 0;
                newCustomer.isActive = customerParam.status;
                newCustomer.siteId = customerParam.siteId;
                const customerSave = yield this.customerService.create(newCustomer);
                if (customerSave) {
                    if (+customerParam.mailStatus === 1) {
                        const emailContent = yield this.emailTemplateService.findOne(4);
                        const logo = yield this.settingService.findOne();
                        const message = emailContent.content.replace('{name}', customerParam.username).replace('{username}', customerParam.email).replace('{storeName}', logo.siteName).replace('{password}', customerParam.password).replace('{storeName}', logo.siteName);
                        const redirectUrl = env_1.env.storeRedirectUrl;
                        const mailContents = {};
                        mailContents.logo = logo;
                        mailContents.emailContent = message;
                        mailContents.redirectUrl = redirectUrl;
                        mailContents.productDetailData = '';
                        mail_services_1.MAILService.sendMail(mailContents, customerParam.email, emailContent.subject, false, false, '');
                        const successResponse = {
                            status: 1,
                            message: 'Successfully created new buyer with email Id and password and email sent',
                            data: customerSave,
                        };
                        return response.status(200).send(successResponse);
                    }
                    else {
                        const successResponse = {
                            status: 1,
                            message: 'Buyer created successfully',
                            data: customerSave,
                        };
                        return response.status(200).send(successResponse);
                    }
                }
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Password does not match',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Customer List API
    /**
     * @api {get} /api/admin-customer Customer List API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} name search by name
     * @apiParam (Request body) {String} email search by email
     * @apiParam (Request body) {Number} status 0->inactive 1-> active
     * @apiParam (Request body) {String} customerGroup search by customerGroup
     * @apiParam (Request body) {String} date search by date
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get customer list",
     *      "status": "1"
     *      "data":{
     *              "customerGroupId" : "",
     *              "username" : "",
     *              "email" : "",
     *              "mobileNUmber" : "",
     *              "password" : "",
     *              "avatar" : "",
     *              "avatarPath" : "",
     *              "status" : "",
     *              "safe" : "",
     *      }
     * }
     * @apiSampleRequest /api/admin-customer
     * @apiErrorExample {json} customer error
     * HTTP/1.1 500 Internal Server Error
     */
    customerList(limit, offset, name, keyword, status, email, customerGroup, date, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'Customer.id as id',
                'Customer.firstName as firstName',
                'Customer.email as email',
                'Customer.createdDate as createdDate',
                'Customer.modifiedDate as modifiedDate',
                'Customer.isActive as isActive',
                'Customer.username as username',
                'customerGroup.name as customerGroupName',
                'Customer.lastName as lastName',
            ];
            const customerList = yield (0, customer_1.getCustomerList)((0, typeorm_1.getConnection)(), select, limit, offset, name, status, email, customerGroup, keyword, date, count ? 1 : 0);
            return response.status(200).send({
                status: customerList.status,
                message: customerList.message,
                data: customerList.data,
            });
        });
    }
    // Delete Customer API
    /**
     * @api {delete} /api/admin-customer/:id Delete Customer API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "customerId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted customer",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-customer/:id
     * @apiErrorExample {json} Customer error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteCustomer(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerService.findOne({
                where: {
                    id,
                },
            });
            if (!customer) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid buyer Id',
                };
                return response.status(400).send(errorResponse);
            }
            const vendor = yield this.vendorService.findOne({
                where: {
                    customerId: id,
                },
            });
            if (vendor) {
                const product = yield this.vendorProductService.findOne({ where: { vendorId: vendor.vendorId } });
                if (product) {
                    const errorResponse = {
                        status: 0,
                        message: 'This buyer have seller account, you have to first delete the products mapped to this seller',
                    };
                    return response.status(400).send(errorResponse);
                }
                vendor.isDelete = 1;
                vendor.isActive = 0;
                yield this.vendorService.create(vendor);
            }
            customer.deleteFlag = 1;
            const deleteCustomer = yield this.customerService.create(customer);
            if (deleteCustomer) {
                const successResponse = {
                    status: 1,
                    message: 'Buyer deleted successfully',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to change delete flag status',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Update Customer API
    /**
     * @api {put} /api/admin-customer/:id Update Customer API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} customerGroupId Customer customerGroupId
     * @apiParam (Request body) {String{..96}} username Customer username
     * @apiParam (Request body) {String{..96}} email Customer email
     * @apiParam (Request body) {Number{6..15}} mobileNumber Customer mobileNumber
     * @apiParam (Request body) {String} [password] Customer password
     * @apiParam (Request body) {String} [confirmPassword] Customer confirmPassword
     * @apiParam (Request body) {String} [avatar] Customer avatar
     * @apiParam (Request body) {Number} mailStatus Customer mailStatus should be 1 or 0
     * @apiParam (Request body) {Number} status Customer status
     * @apiParamExample {json} Input
     * {
     *      "customerGroupId" : "",
     *      "userName" : "",
     *      "email" : "",
     *      "mobileNumber" : "",
     *      "password" : "",
     *      "confirmPassword" : "",
     *      "avatar" : "",
     *      "mailStatus" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " Customer is updated successfully",
     *      "status": "1",
     *      "data": {
     *              "customerGroupId": "",
     *              "firstName": "",
     *              "username": "",
     *              "email": "",
     *              "mobileNumber": "",
     *              "password": "",
     *              "mailStatus": "",
     *              "deleteFlag": "",
     *              "isActive": "",
     *              "createdDate": "",
     *              "id": ""
     *      }
     * }
     * @apiSampleRequest /api/admin-customer/:id
     * @apiErrorExample {json} updateCustomer error
     * HTTP/1.1 500 Internal Server Error
     */
    updateCustomer(id, customerParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerService.findOne({
                where: {
                    id,
                },
            });
            if (!customer) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid buyer id',
                };
                return response.status(400).send(errorResponse);
            }
            const customerEmailId = yield this.customerService.findOne({
                where: {
                    email: customerParam.email,
                    deleteFlag: 0,
                    id: (0, typeorm_1.Not)(id),
                },
            });
            if (customerEmailId !== undefined) {
                const errorResponses = {
                    status: 0,
                    message: 'MailId is already registered',
                };
                return response.status(400).send(errorResponses);
            }
            if (customerParam.password === customerParam.confirmPassword) {
                const avatar = customerParam.avatar;
                if (avatar) {
                    const type = avatar.split(';')[0].split('/')[1];
                    const availableTypes = env_1.env.availImageTypes.split(',');
                    if (!availableTypes.includes(type)) {
                        const errorTypeResponse = {
                            status: 0,
                            message: 'Only ' + env_1.env.availImageTypes + ' types are allowed',
                        };
                        return response.status(400).send(errorTypeResponse);
                    }
                    const name = 'Img_' + Date.now() + '.' + type;
                    const path = 'customer/';
                    const base64Data = Buffer.from(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                    const command = new client_s3_1.PutObjectCommand({
                        Bucket: env_1.aws_setup.AWS_BUCKET,
                        Key: 'customer/' + name,
                        Body: base64Data,
                        // ACL: 'public-read',
                        // ContentEncoding: 'base64',
                        // ContentType: `image/${imageType}`,
                        // Bucket: "test-bucket",
                        // Key: "hello-s3.txt",
                    });
                    s3.send(command, (err, data) => {
                        if (err) {
                            throw err;
                        }
                    });
                    customer.avatar = name;
                    customer.avatarPath = path;
                }
                customer.customerGroupId = customerParam.customerGroupId;
                customer.firstName = customerParam.username;
                customer.lastName = customerParam.lastName;
                customer.username = customerParam.email;
                customer.email = customerParam.email;
                customer.mobileNumber = customerParam.mobileNumber;
                if (customerParam.password) {
                    const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,}$/;
                    if (!customerParam.password.match(pattern)) {
                        const passwordValidatingMessage = [];
                        passwordValidatingMessage.push('Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');
                        const errResponse = {
                            status: 0,
                            message: "You have an error in your request's body. Check 'errors' field for more details",
                            data: { message: passwordValidatingMessage },
                        };
                        return response.status(422).send(errResponse);
                    }
                    const password = yield User_1.User.hashPassword(customerParam.password);
                    customer.password = password;
                }
                customer.mailStatus = customerParam.mailStatus;
                customer.isActive = customerParam.status;
                customer.siteId = customerParam.siteId;
                const customerSave = yield this.customerService.create(customer);
                if (customerSave) {
                    const successResponse = {
                        status: 1,
                        message: 'Buyer updated successfully',
                        data: customerSave,
                    };
                    return response.status(200).send(successResponse);
                }
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Password does not match',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Get Customer Detail API
    /**
     * @api {get} /api/admin-customer/customer-detail/:id Customer Details API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get customer Details",
     *      "data":{
     *           "id": "",
     *           "firstName": "",
     *           "email": "",
     *           "mobileNumber": "",
     *           "address": "",
     *           "avatar": "",
     *           "avatarPath": "",
     *           "customerGroupId": "",
     *           "lastLogin": "",
     *           "mailStatus": "",
     *           "isActive": "",
     *           "siteId": "",
     *           "customerGroupName": ""
     *      }
     *      }
     * @apiSampleRequest /api/admin-customer/customer-detail/:id
     * @apiErrorExample {json} customer error
     * HTTP/1.1 500 Internal Server Error
     */
    customerDetails(Id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerService.findOne({
                select: ['id', 'firstName', 'email', 'mobileNumber', 'address', 'lastLogin', 'isActive', 'mailStatus', 'customerGroupId', 'avatar', 'avatarPath', 'siteId', 'createdDate', 'modifiedDate'],
                where: { id: Id },
            });
            if (!customer) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid buyerId',
                };
                return response.status(400).send(errorResponse);
            }
            const groupName = yield this.customerGroupService.findOne({
                where: {
                    id: customer.customerGroupId,
                },
            });
            customer.customerGroupName = (groupName && groupName.name !== undefined) ? groupName.name : '';
            const successResponse = {
                status: 1,
                message: 'successfully got buyer details',
                data: customer,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Recently Added Customer List API
    /**
     * @api {get} /api/admin-customer/recent-customerlist Recent Customer List API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get customer list",
     *      "data":{
     *           "id": "",
     *           "firstName": "",
     *           "email": "",
     *           "mobileNumber": "",
     *           "address": "",
     *           "avatar": "",
     *           "avatarPath": "",
     *           "customerGroupId": "",
     *           "lastLogin": "",
     *           "mailStatus": "",
     *           "isActive": "",
     *           "siteId": "",
     *           "customerGroupName": ""
     *      }
     * }
     * @apiSampleRequest /api/admin-customer/recent-customerlist
     * @apiErrorExample {json} customer error
     * HTTP/1.1 500 Internal Server Error
     */
    recentCustomerList(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const order = 1;
            const WhereConditions = [
                {
                    name: 'deleteFlag',
                    value: 0,
                },
            ];
            const customerList = yield this.customerService.list(0, 0, 0, WhereConditions, order, 0);
            const successResponse = {
                status: 1,
                message: 'Successfully got buyer list',
                data: (0, class_transformer_1.instanceToPlain)(customerList),
            };
            return response.status(200).send(successResponse);
        });
    }
    //  Today Customer Count API
    /**
     * @api {get} /api/admin-customer/today-customercount Today Customer Count API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Today customer count",
     *      "data":{
     *              "customerCount": ""
     *              }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-customer/today-customercount
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    customerCount(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const nowDate = new Date();
            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            const customerCount = yield this.customerService.todayCustomerCount(todaydate);
            const successResponse = {
                status: 1,
                message: 'Successfully get buyer count',
                data: customerCount,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Delete Multiple Customer API
    /**
     * @api {post} /api/admin-customer/delete-customer Delete Multiple Customer API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} customerId customerId
     * @apiParamExample {json} Input
     * {
     * "customerId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted customer.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/admin-customer/delete-customer
     * @apiErrorExample {json} customerDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteMultipleCustomer(deleteCustomerId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customers = deleteCustomerId.customerId.toString();
            const customer = customers.split(',');
            const data = customer.map((id) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const vendor = yield this.vendorService.findOne({
                    where: {
                        customerId: id,
                    },
                });
                if (vendor) {
                    const product = yield this.vendorProductService.findOne({ where: { vendorId: vendor.vendorId } });
                    if (product) {
                        const errorResponse = {
                            status: 0,
                            message: 'Choosen buyer have seller account, you have to first delete the products mapped to this seller',
                        };
                        return response.status(400).send(errorResponse);
                    }
                }
                const dataId = yield this.customerService.findOne({ where: { id } });
                if (dataId === undefined) {
                    const errorResponse = {
                        status: 0,
                        message: 'Please choose a buyer that you want to delete',
                    };
                    return response.status(400).send(errorResponse);
                }
                else {
                    const vendorExist = yield this.vendorService.findOne({
                        where: {
                            customerId: id,
                        },
                    });
                    if (vendorExist) {
                        vendorExist.isDelete = 1;
                        vendorExist.isActive = 0;
                        yield this.vendorService.create(vendorExist);
                    }
                    dataId.deleteFlag = 1;
                    return yield this.customerService.create(dataId);
                }
            }));
            const deleteCustomer = yield Promise.all(data);
            if (deleteCustomer) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted buyer',
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Customer Details Excel Document Download
    /**
     * @api {get} /api/admin-customer/customer-excel-list Customer Excel
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} customerId customerId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Customer Excel List",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/admin-customer/customer-excel-list
     * @apiErrorExample {json} Customer Excel List error
     * HTTP/1.1 500 Internal Server Error
     */
    excelCustomerView(customerId, status, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Customer Export sheet');
            const rows = [];
            let customerAllIds;
            if (!customerId || customerId === '') {
                const select = [
                    'Customer.id as id',
                    'Customer.firstName as firstName',
                    'Customer.email as email',
                    'Customer.createdDate as createdDate',
                    'Customer.isActive as isActive',
                    'Customer.username as username',
                    'customerGroup.name as customerGroupName',
                    'Customer.lastName as lastName',
                    'Customer.mobileNumber as mobileNumber',
                ];
                customerAllIds = yield (0, customer_1.getCustomerList)((0, typeorm_1.getConnection)(), select, 0, 0, '', status, '', '', '', '', 0).then((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const customerIds = value.data.map((data) => data.id);
                    return customerIds;
                }));
            }
            const customerid = customerId && customerId !== '' ? customerId.split(',') : customerAllIds;
            for (const id of customerid) {
                const dataId = yield this.customerService.findOne({ where: { id } });
                if (dataId === undefined) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid buyerId',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            // Excel sheet column define
            worksheet.columns = [
                { header: 'Customer Id', key: 'id', size: 16, width: 15 },
                { header: 'Customer Name', key: 'first_name', size: 16, width: 15 },
                { header: 'User Name', key: 'username', size: 16, width: 24 },
                { header: 'Email Id', key: 'email', size: 16, width: 15 },
                { header: 'Mobile Number', key: 'mobileNumber', size: 16, width: 15 },
                { header: 'Date Of Registration', key: 'createdDate', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            for (const id of customerid) {
                const dataId = yield this.customerService.findOne({ where: { id } });
                if (dataId.lastName === null) {
                    dataId.lastName = '';
                }
                rows.push([dataId.id, dataId.firstName + ' ' + dataId.lastName, dataId.username, dataId.email, dataId.mobileNumber, dataId.createdDate]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './CustomerExcel_' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            // Add export log
            const newExportLog = new ExportLog_1.ExportLog();
            newExportLog.module = 'Manage Customers';
            newExportLog.recordAvailable = customerid.length;
            newExportLog.createdBy = request.user.userId;
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
    // Customer Details Excel Document Download
    /**
     * @api {get} /api/admin-customer/allcustomer-excel-list All Customer Excel
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} name name
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {String} email email
     * @apiParam (Request body) {String} customerGroup customerGroup
     * @apiParam (Request body) {String} date date
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the All Customer Excel List",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/admin-customer/allcustomer-excel-list
     * @apiErrorExample {json} All Customer Excel List error
     * HTTP/1.1 500 Internal Server Error
     */
    AllCustomerExcel(name, status, email, customerGroup, date, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Bulk Buyer Export');
            const rows = [];
            const search = [];
            if (name !== undefined && name !== '') {
                search.push({
                    name: 'firstName',
                    op: 'like',
                    value: name,
                });
            }
            if (email !== undefined && email !== '') {
                search.push({
                    name: 'email',
                    op: 'like',
                    value: email,
                });
            }
            if (+customerGroup) {
                search.push({
                    name: 'customerGroupId',
                    op: 'where',
                    value: customerGroup,
                });
            }
            if (+status) {
                search.push({
                    name: 'isActive',
                    op: 'like',
                    value: status,
                });
            }
            if (date !== undefined && date !== '') {
                search.push({
                    name: 'createdDate',
                    op: 'like',
                    value: date,
                });
            }
            const WhereConditions = [
                {
                    name: 'deleteFlag',
                    value: 0,
                },
            ];
            const customerList = yield this.customerService.list(0, 0, search, WhereConditions, 0, false);
            if (+customerList.length === 0) {
                return response.status(400).send({
                    status: 0,
                    message: 'list is empty',
                });
            }
            // Excel sheet column define
            worksheet.columns = [
                { header: 'Customer Id', key: 'id', size: 16, width: 15 },
                { header: 'Customer Name', key: 'first_name', size: 16, width: 15 },
                { header: 'User Name', key: 'username', size: 16, width: 24 },
                { header: 'Email Id', key: 'email', size: 16, width: 30 },
                { header: 'Mobile Number', key: 'mobile', size: 16, width: 20 },
                { header: 'Date Of Registration', key: 'createdDate', size: 16, width: 20 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            for (const customer of customerList) {
                if (customer.lastName === null) {
                    customer.lastName = '';
                }
                rows.push([customer.id, customer.firstName + ' ' + customer.lastName, customer.username, customer.email, customer.mobileNumber, customer.createdDate]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './CustomerExcel_' + Date.now() + '.xlsx';
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
    // Customer Count API
    /**
     * @api {get} /api/admin-customer/customer-count Customer Count API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get customer count",
     *      "status": "1"
     *     "data":{
     *              "allCustomerCount": 50
     *              "activeCustomerCount": 40
     *              "inActiveCustomerCount: 10
     *              "allCustomerGroupCount": 5
     *              "activeCustomerGroupCount": 4
     *              "inActiveCustomerGroupCount": 1
     *      },
     * }
     * @apiSampleRequest /api/admin-customer/customer-count
     * @apiErrorExample {json} customer error
     * HTTP/1.1 500 Internal Server Error
     */
    customerCounts(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = {};
            const select = [];
            const search = [];
            const WhereConditions = [{
                    name: 'deleteFlag',
                    op: 'where',
                    value: 0,
                }];
            const allCustomerCount = yield this.customerService.list(0, 0, search, WhereConditions, 0, 1);
            const whereConditionsActive = [
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
                {
                    name: 'deleteFlag',
                    op: 'where',
                    value: 0,
                },
            ];
            const activeCustomerCount = yield this.customerService.list(0, 0, search, whereConditionsActive, 0, 1);
            const whereConditionsInActive = [
                {
                    name: 'isActive',
                    op: 'where',
                    value: 0,
                },
                {
                    name: 'deleteFlag',
                    op: 'where',
                    value: 0,
                },
            ];
            const inActiveCustomerCount = yield this.customerService.list(0, 0, search, whereConditionsInActive, 0, 1);
            const WhereConditionss = [];
            const allCustomerGroupCount = yield this.customerGroupService.list(0, 0, select, WhereConditionss, 1);
            const whereConditionsGroupInActive = [
                {
                    name: 'isActive',
                    op: 'where',
                    value: 0,
                },
            ];
            const whereConditionsGroupActive = [
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
            ];
            const activeCustomerGroupCount = yield this.customerGroupService.list(0, 0, select, whereConditionsGroupActive, 1);
            const inActiveCustomerGroupCount = yield this.customerGroupService.list(0, 0, select, whereConditionsGroupInActive, 1);
            customer.totalCustomer = allCustomerCount;
            customer.activeCustomer = activeCustomerCount;
            customer.inActiveCustomer = inActiveCustomerCount;
            customer.totalCustomerGroup = allCustomerGroupCount;
            customer.activeCustomerGroup = activeCustomerGroupCount;
            customer.inActiveCustomerGroup = inActiveCustomerGroupCount;
            const successResponse = {
                status: 1,
                message: 'Successfully got the buyer Count',
                data: customer,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Order Product List API
    /**
     * @api {get} /api/admin-customer/order-product-list Order Product List API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count
     * @apiParam (Request body) {Number} customerId customerId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get order product list",
     *      "status": "1",
     *      "data": " [{
     *                   "productName": "",
     *                   "orderId": 29,
     *                   "createdDate": "2024-07-12T13:20:03.000Z",
     *                   "image": "printed bhagalpuri art silk saree1710481555207.png",
     *                   "containerName": "women ethnic/"
     *               }]"
     * }
     * @apiSampleRequest /api/admin-customer/order-product-list
     * @apiErrorExample {json} OrderProductList error
     * HTTP/1.1 500 Internal Server Error
     */
    orderProductList(limit, offset, count, emailId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'OrderProduct.name as productName',
                'order.orderId as orderId',
                'order.email as email',
                'order.createdDate as createdDate',
                'productImage.image as image',
                'productImage.containerName as containerName',
            ];
            const relations = [
                {
                    tableName: 'OrderProduct.order',
                    aliasName: 'order',
                },
                {
                    tableName: 'OrderProduct.productInformationDetail',
                    aliasName: 'productInformationDetail',
                },
                {
                    tableName: 'productInformationDetail.productImage',
                    aliasName: 'productImage',
                },
            ];
            // const whereconditions = [];
            // if (+customerId) {
            //     whereconditions.push({
            //         name: 'order.customerId',
            //         op: 'and',
            //         value: +customerId,
            //     });
            // }
            const whereconditions = [];
            if (emailId && emailId !== '') {
                whereconditions.push({
                    name: 'order.email',
                    op: 'and',
                    value: `'` + emailId + `'`,
                });
            }
            whereconditions.push({
                name: 'productImage.defaultImage',
                op: 'and',
                value: 1,
            });
            const sort = [];
            sort.push({
                name: 'order.createdDate',
                order: 'DESC',
            });
            if (count) {
                const orderProductCount = yield this.orderProductService.listByQueryBuilder(limit, offset, select, whereconditions, [], relations, [], sort, true, true);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got the count of order product count',
                    data: orderProductCount,
                });
            }
            const orderProductList = yield this.orderProductService.listByQueryBuilder(limit, offset, select, whereconditions, [], relations, [], sort, false, true);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got order product list',
                data: orderProductList,
            });
        });
    }
    // Product View Log List API
    /**
     * @api {get} /api/admin-customer/product-view-log-list Product View Log List API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count
     * @apiParam (Request body) {Number} customerId customerId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get product view log list",
     *      "status": "1",
     *       "data": [{
     *                 "productId": "108",
     *                 "createdDate": "2024-04-03T06:25:50.000Z",
     *                 "productName": "PristiveFashionHub Women Codding Long Anarkali Dress Material Gown With Duppta",
     *                 "image": "gown61710504383210.jpeg",
     *                 "containerName": "
     *              }]
     * }
     * @apiSampleRequest /api/admin-customer/product-view-log-list
     * @apiErrorExample {json} ProductViewLogList error
     * HTTP/1.1 500 Internal Server Error
     */
    productViewLogList(limit, offset, count, customerId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'product.productId as productId',
                'ProductViewLog.createdDate as createdDate',
                'product.name as productName',
                'productImage.image as image',
                'productImage.containerName as containerName',
            ];
            const relations = [
                {
                    tableName: 'ProductViewLog.product',
                    aliasName: 'product',
                },
                {
                    tableName: 'product.productImage',
                    aliasName: 'productImage',
                },
            ];
            const whereconditions = [];
            if (+customerId) {
                whereconditions.push({
                    name: 'ProductViewLog.customer',
                    op: 'and',
                    value: +customerId,
                });
            }
            whereconditions.push({
                name: 'productImage.defaultImage',
                op: 'and',
                value: 1,
            });
            const sort = [];
            sort.push({
                name: 'ProductViewLog.createdDate',
                order: 'DESC',
            });
            if (count) {
                const productViewLogCount = yield this.productViewLogService.listByQueryBuilder(limit, offset, select, whereconditions, [], relations, [], sort, true, true);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got the count of product view log list',
                    data: productViewLogCount,
                });
            }
            const productViewLogList = yield this.productViewLogService.listByQueryBuilder(limit, offset, select, whereconditions, [], relations, [], sort, false, true);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got product view log list',
                data: productViewLogList,
            });
        });
    }
    // Dashboard vendor Graph List API
    /**
     * @api {get} /api/admin-customer/vendor-graph-list Vendor Graph List API
     * @apiGroup Customer
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiParam (Request body) {Number} duration 1-> today 2-> this week 3-> this month 4-> this year
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get vendor graph list",
     *      "data":{
     *           "companyName": "",
     *           "productCount": "",
     *           "productSoldCount": "",
     *           "deliveryCount": "",
     *           "outOfStockCount": "",
     *           "pendingStockCount": ""
     *            }
     * }
     * @apiSampleRequest /api/admin-customer/vendor-graph-list
     * @apiErrorExample {json} sales error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorGraphList(vendorId, duration, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (vendorId !== 0) {
                const vendor = yield this.vendorService.findOne({
                    select: ['companyName', 'createdDate', 'modifiedDate'],
                    where: {
                        vendorId,
                    },
                });
                if (!vendor) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid Vendor',
                    };
                    return response.status(400).send(errorResponse);
                }
                const product = yield this.vendorProductService.vendorProductBasedOnDuration(vendorId, duration);
                const productSold = yield this.vendorOrdersService.productSoldBasedOnDuration(vendorId, duration);
                const delivery = yield this.vendorOrdersService.deliveredOrderBasedOnDuration(vendorId, duration);
                const outOfStock = yield this.vendorProductService.outOfStockBasedOnDuration(vendorId, duration, 1);
                const pendingStock = yield this.vendorProductService.outOfStockBasedOnDuration(vendorId, duration, 2);
                vendor.productCount = product !== undefined ? product : 0;
                vendor.productSoldCount = (productSold[0].soldCount !== undefined && productSold[0].soldCount) ? productSold[0].soldCount : 0;
                vendor.deliveryCount = delivery !== undefined ? delivery : 0;
                vendor.outOfStockCount = outOfStock !== undefined ? outOfStock : 0;
                vendor.pendingStockCount = pendingStock !== undefined ? pendingStock : 0;
                const successResponses = {
                    status: 1,
                    message: 'Successfully got the seller graph list',
                    data: vendor,
                };
                return response.status(200).send(successResponses);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got the seller graph list',
                data: {},
            };
            return response.status(200).send(successResponse);
        });
    }
    // Dashboard Customer Visit List API
    /**
     * @api {get} /api/admin-customer/customer-visit-list Dashboard Customer Visit List API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} month month
     * @apiParam (Request body) {Number} year year
     * @apiParamExample {json} Input
     * {
     *      "month": "",
     *      "year" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get customer visit list",
     *      "data":[{
     *              "visitCount": "2",
     *              "dayOfMonth": "19",
     *              "month": "3",
     *              "year": "2024"
     *             }],
     * }
     * @apiSampleRequest /api/admin-customer/customer-visit-list
     * @apiErrorExample {json} customer list error
     * HTTP/1.1 500 Internal Server Error
     */
    customerVisitList(month, year, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customervisitList = yield this.loginLogService.customerVisitList(month, year);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the buyer visit list',
                data: customervisitList,
            });
        });
    }
    // Update Bulk Vendor Customer Status
    /**
     * @api {get} /api/admin-customer/bulk-status Admin Vendor Update Customer Status
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number[]} customerIds customerIds
     * @apiParam (Request body) {Number} statusId statusId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated the bulk category status",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-customer/bulk-status
     * @apiErrorExample {json} Admin Vendor Update Customer Status error
     * HTTP/1.1 500 Internal Server Error
     */
    updateVendorCustomerStatus(params, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customerIds = params.customerIds;
            const updateCustomerValue = [];
            if (customerIds.length) {
                for (const customerId of customerIds) {
                    const findCustomer = yield this.customerService.findOne({ where: { id: customerId, deleteFlag: 0 } });
                    if (!findCustomer) {
                        return response.status(400).send({ status: 0, message: 'Invalid buyer Id' });
                    }
                    findCustomer.isActive = params.statusId;
                    updateCustomerValue.push(findCustomer);
                }
                yield this.customerService.create(updateCustomerValue);
                return response.status(200).send({ status: 1, message: 'Successfully updated the bulk buyer status' });
            }
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(['admin', 'create-customer']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateCustomerRequest_1.CreateCustomer, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "addCustomer", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(['admin-vendor', 'list-customer']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('name')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('email')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('customerGroup')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('date')),
    tslib_1.__param(8, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(9, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "customerList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "deleteCustomer", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-customer']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, UpdateCustomerRequest_1.UpdateCustomer, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "updateCustomer", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/customer-detail/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'view-customer']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "customerDetails", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/recent-customerlist'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "recentCustomerList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/today-customercount'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "customerCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/delete-customer'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-customer']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DeleteCustomerRequest_1.DeleteCustomerRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "deleteMultipleCustomer", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/customer-excel-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'export-customer']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('customerId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "excelCustomerView", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/allcustomer-excel-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'export-all-customer']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('name')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('email')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('customerGroup')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('date')),
    tslib_1.__param(5, (0, routing_controllers_1.Req)()),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "AllCustomerExcel", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/customer-count'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "customerCounts", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/order-product-list'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('emailId')),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "orderProductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product-view-log-list'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('customerId')),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "productViewLogList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-graph-list'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('vendorId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('duration')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "vendorGraphList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/customer-visit-list'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('month')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('year')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "customerVisitList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/bulk-status'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "updateVendorCustomerStatus", null);
CustomerController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/admin-customer'),
    tslib_1.__metadata("design:paramtypes", [CustomerService_1.CustomerService,
        OrderProductService_1.OrderProductService,
        CustomerGroupService_1.CustomerGroupService,
        SettingService_1.SettingService,
        ProductViewLogService_1.ProductViewLogService,
        VendorService_1.VendorService,
        VendorProductService_1.VendorProductService,
        LoginLogService_1.LoginLogService,
        VendorOrderService_1.VendorOrdersService,
        EmailTemplateService_1.EmailTemplateService,
        ExportLogService_1.ExportLogService])
], CustomerController);
exports.CustomerController = CustomerController;
//# sourceMappingURL=CustomerController.js.map