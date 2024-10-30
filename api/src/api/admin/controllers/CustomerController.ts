/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Get,
    Post,
    Delete,
    Put,
    Body,
    QueryParam,
    Param,
    JsonController,
    Authorized,
    Req,
    Res,
} from 'routing-controllers';
import { instanceToPlain } from 'class-transformer';
import { aws_setup, env } from '../../../env';
import { CustomerService } from '../../core/services/CustomerService';
import { Customer } from '../../core/models/Customer';
import { CreateCustomer } from './requests/CreateCustomerRequest';
import { User } from '../../core/models/User';
import { MAILService } from '../../../auth/mail.services';
import { UpdateCustomer } from './requests/UpdateCustomerRequest';
import { SettingService } from '../../core/services/SettingService';
import { CustomerGroupService } from '../../core/services/CustomerGroupService';
import { OrderProductService } from '../../core/services/OrderProductService';
import { EmailTemplateService } from '../../core/services/EmailTemplateService';
import { VendorService } from '../../core/services/VendorService';
import { VendorProductService } from '../../core/services/VendorProductService';
import { ProductViewLogService } from '../../core/services/ProductViewLogService';
import { DeleteCustomerRequest } from './requests/DeleteCustomerRequest';
import * as fs from 'fs';
import { VendorOrdersService } from '../../core/services/VendorOrderService';
import { LoginLogService } from '../../core/services/LoginLogService';
import { getCustomerList } from '@spurtcommerce/customer';
import { Not, getConnection } from 'typeorm';
import { ExportLog } from '../../core/models/ExportLog';
import { ExportLogService } from '../../core/services/ExportLogService';

import { S3, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3({
    region: aws_setup.AWS_DEFAULT_REGION,
});
@JsonController('/admin-customer')
export class CustomerController {
    constructor(
        private customerService: CustomerService,
        private orderProductService: OrderProductService,
        private customerGroupService: CustomerGroupService,
        private settingService: SettingService,
        private productViewLogService: ProductViewLogService,
        private vendorService: VendorService,
        private vendorProductService: VendorProductService,
        private loginLogService: LoginLogService,
        private vendorOrdersService: VendorOrdersService,
        private emailTemplateService: EmailTemplateService,
        private exportLogService: ExportLogService
    ) {
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
    @Post()
    @Authorized(['admin', 'create-customer'])
    public async addCustomer(@Body({ validate: true }) customerParam: CreateCustomer, @Res() response: any): Promise<any> {
        const newCustomer: any = new Customer();
        const resultUser = await this.customerService.findOne({ where: { email: customerParam.email, deleteFlag: 0 } });
        if (resultUser) {
            const successResponse: any = {
                status: 1,
                message: 'A buyer is already registered with this email Id',
            };
            return response.status(400).send(successResponse);
        }
        if (customerParam.password === customerParam.confirmPassword) {
            const password = await User.hashPassword(customerParam.password);
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
            const customerSave = await this.customerService.create(newCustomer);
            if (customerSave) {
                if (+customerParam.mailStatus === 1) {
                    const emailContent = await this.emailTemplateService.findOne(4);
                    const logo = await this.settingService.findOne();
                    const message = emailContent.content.replace('{name}', customerParam.username).replace('{username}', customerParam.email).replace('{storeName}', logo.siteName).replace('{password}', customerParam.password).replace('{storeName}', logo.siteName);
                    const redirectUrl = env.storeRedirectUrl;
                    const mailContents: any = {};
                    mailContents.logo = logo;
                    mailContents.emailContent = message;
                    mailContents.redirectUrl = redirectUrl;
                    mailContents.productDetailData = '';
                    MAILService.sendMail(mailContents, customerParam.email, emailContent.subject, false, false, '');
                    const successResponse: any = {
                        status: 1,
                        message: 'Successfully created new buyer with email Id and password and email sent',
                        data: customerSave,
                    };
                    return response.status(200).send(successResponse);
                } else {
                    const successResponse: any = {
                        status: 1,
                        message: 'Buyer created successfully',
                        data: customerSave,
                    };
                    return response.status(200).send(successResponse);
                }
            }
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Password does not match',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Get()
    @Authorized(['admin-vendor', 'list-customer'])
    public async customerList(
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('name') name: string,
        @QueryParam('keyword') keyword: string,
        @QueryParam('status') status: string,
        @QueryParam('email') email: string,
        @QueryParam('customerGroup') customerGroup: string,
        @QueryParam('date') date: string,
        @QueryParam('count') count: number | boolean,
        @Res() response: any
    ): Promise<any> {

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

        const customerList = await getCustomerList(getConnection(), select, limit, offset, name, status, email, customerGroup, keyword, date, count ? 1 : 0);
        return response.status(200).send({
            status: customerList.status,
            message: customerList.message,
            data: customerList.data,
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
    @Delete('/:id')
    @Authorized()
    public async deleteCustomer(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const customer = await this.customerService.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid buyer Id',
            };
            return response.status(400).send(errorResponse);
        }
        const vendor = await this.vendorService.findOne({
            where: {
                customerId: id,
            },
        });
        if (vendor) {
            const product = await this.vendorProductService.findOne({ where: { vendorId: vendor.vendorId } });
            if (product) {
                const errorResponse: any = {
                    status: 0,
                    message: 'This buyer have seller account, you have to first delete the products mapped to this seller',
                };
                return response.status(400).send(errorResponse);
            }
            vendor.isDelete = 1;
            vendor.isActive = 0;
            await this.vendorService.create(vendor);
        }
        customer.deleteFlag = 1;
        const deleteCustomer = await this.customerService.create(customer);
        if (deleteCustomer) {
            const successResponse: any = {
                status: 1,
                message: 'Buyer deleted successfully',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to change delete flag status',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Put('/:id')
    @Authorized(['admin', 'edit-customer'])
    public async updateCustomer(@Param('id') id: number, @Body({ validate: true }) customerParam: UpdateCustomer, @Res() response: any): Promise<any> {
        const customer = await this.customerService.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid buyer id',
            };
            return response.status(400).send(errorResponse);
        }
        const customerEmailId = await this.customerService.findOne({
            where: {
                email: customerParam.email,
                deleteFlag: 0,
                id: Not(id),
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
                const availableTypes = env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse: any = {
                        status: 0,
                        message: 'Only ' + env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const name = 'Img_' + Date.now() + '.' + type;
                const path = 'customer/';
                const base64Data = Buffer.from(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const command = new PutObjectCommand({
                    Bucket: aws_setup.AWS_BUCKET,
                    Key: 'customer/' + name, // type is not required
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
                    const errResponse: any = {
                        status: 0,
                        message: "You have an error in your request's body. Check 'errors' field for more details",
                        data: { message: passwordValidatingMessage },
                    };
                    return response.status(422).send(errResponse);
                }
                const password = await User.hashPassword(customerParam.password);
                customer.password = password;
            }
            customer.mailStatus = customerParam.mailStatus;
            customer.isActive = customerParam.status;
            customer.siteId = customerParam.siteId;
            const customerSave = await this.customerService.create(customer);
            if (customerSave) {
                const successResponse: any = {
                    status: 1,
                    message: 'Buyer updated successfully',
                    data: customerSave,
                };
                return response.status(200).send(successResponse);

            }
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Password does not match',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Get('/customer-detail/:id')
    @Authorized(['admin', 'view-customer'])
    public async customerDetails(@Param('id') Id: number, @Res() response: any): Promise<any> {
        const customer = await this.customerService.findOne({
            select: ['id', 'firstName', 'email', 'mobileNumber', 'address', 'lastLogin', 'isActive', 'mailStatus', 'customerGroupId', 'avatar', 'avatarPath', 'siteId', 'createdDate', 'modifiedDate'],
            where: { id: Id },
        });
        if (!customer) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid buyerId',
            };
            return response.status(400).send(errorResponse);
        }
        const groupName = await this.customerGroupService.findOne({
            where: {
                id: customer.customerGroupId,
            },
        });
        customer.customerGroupName = (groupName && groupName.name !== undefined) ? groupName.name : '';
        const successResponse: any = {
            status: 1,
            message: 'successfully got buyer details',
            data: customer,
        };
        return response.status(200).send(successResponse);
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
    @Get('/recent-customerlist')
    @Authorized()
    public async recentCustomerList(@Res() response: any): Promise<any> {
        const order = 1;
        const WhereConditions = [
            {
                name: 'deleteFlag',
                value: 0,
            },
        ];
        const customerList = await this.customerService.list(0, 0, 0, WhereConditions, order, 0);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got buyer list',
            data: instanceToPlain(customerList),
        };

        return response.status(200).send(successResponse);
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
    @Get('/today-customercount')
    @Authorized()
    public async customerCount(@Res() response: any): Promise<any> {

        const nowDate = new Date();
        const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
        const customerCount = await this.customerService.todayCustomerCount(todaydate);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get buyer count',
            data: customerCount,
        };
        return response.status(200).send(successResponse);

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
    @Post('/delete-customer')
    @Authorized(['admin', 'delete-customer'])
    public async deleteMultipleCustomer(@Body({ validate: true }) deleteCustomerId: DeleteCustomerRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const customers = deleteCustomerId.customerId.toString();
        const customer: any = customers.split(',');
        const data: any = customer.map(async (id: any) => {
            const vendor = await this.vendorService.findOne({
                where: {
                    customerId: id,
                },
            });
            if (vendor) {
                const product = await this.vendorProductService.findOne({ where: { vendorId: vendor.vendorId } });
                if (product) {
                    const errorResponse: any = {
                        status: 0,
                        message: 'Choosen buyer have seller account, you have to first delete the products mapped to this seller',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            const dataId = await this.customerService.findOne({ where: { id } });
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please choose a buyer that you want to delete',
                };
                return response.status(400).send(errorResponse);
            } else {
                const vendorExist = await this.vendorService.findOne({
                    where: {
                        customerId: id,
                    },
                });
                if (vendorExist) {
                    vendorExist.isDelete = 1;
                    vendorExist.isActive = 0;
                    await this.vendorService.create(vendorExist);
                }
                dataId.deleteFlag = 1;
                return await this.customerService.create(dataId);
            }
        });
        const deleteCustomer = await Promise.all(data);
        if (deleteCustomer) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted buyer',
            };
            return response.status(200).send(successResponse);
        }
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

    @Get('/customer-excel-list')
    @Authorized(['admin', 'export-customer'])
    public async excelCustomerView(@QueryParam('customerId') customerId: string, @QueryParam('status') status: string, @Req() request: any, @Res() response: any): Promise<any> {
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

            customerAllIds = await getCustomerList(getConnection(), select, 0, 0, '', status, '', '', '', '', 0).then(async (value: any) => {
                const customerIds = value.data.map((data) => data.id);
                return customerIds;
            });
        }
        const customerid = customerId && customerId !== '' ? customerId.split(',') : customerAllIds;
        for (const id of customerid) {
            const dataId = await this.customerService.findOne({ where: { id } });
            if (dataId === undefined) {
                const errorResponse: any = {
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
            const dataId = await this.customerService.findOne({ where: { id } });
            if (dataId.lastName === null) {
                dataId.lastName = '';
            }
            rows.push([dataId.id, dataId.firstName + ' ' + dataId.lastName, dataId.username, dataId.email, dataId.mobileNumber, dataId.createdDate]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './CustomerExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        // Add export log
        const newExportLog = new ExportLog();
        newExportLog.module = 'Manage Customers';
        newExportLog.recordAvailable = customerid.length;
        newExportLog.createdBy = request.user.userId;
        await this.exportLogService.create(newExportLog);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
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

    @Get('/allcustomer-excel-list')
    @Authorized(['admin', 'export-all-customer'])
    public async AllCustomerExcel(@QueryParam('name') name: string, @QueryParam('status') status: string, @QueryParam('email') email: string, @QueryParam('customerGroup') customerGroup: string, @QueryParam('date') date: string, @Req() request: any, @Res() response: any): Promise<any> {
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
        const customerList = await this.customerService.list(0, 0, search, WhereConditions, 0, false);
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
        await workbook.xlsx.writeFile(fileName);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
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
    @Get('/customer-count')
    @Authorized()
    public async customerCounts(@Res() response: any): Promise<any> {
        const customer: any = {};
        const select = [];
        const search = [];
        const WhereConditions = [{
            name: 'deleteFlag',
            op: 'where',
            value: 0,
        }];
        const allCustomerCount = await this.customerService.list(0, 0, search, WhereConditions, 0, 1);
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
        const activeCustomerCount = await this.customerService.list(0, 0, search, whereConditionsActive, 0, 1);
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
        const inActiveCustomerCount = await this.customerService.list(0, 0, search, whereConditionsInActive, 0, 1);
        const WhereConditionss = [];
        const allCustomerGroupCount = await this.customerGroupService.list(0, 0, select, WhereConditionss, 1);
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
        const activeCustomerGroupCount = await this.customerGroupService.list(0, 0, select, whereConditionsGroupActive, 1);
        const inActiveCustomerGroupCount = await this.customerGroupService.list(0, 0, select, whereConditionsGroupInActive, 1);
        customer.totalCustomer = allCustomerCount;
        customer.activeCustomer = activeCustomerCount;
        customer.inActiveCustomer = inActiveCustomerCount;
        customer.totalCustomerGroup = allCustomerGroupCount;
        customer.activeCustomerGroup = activeCustomerGroupCount;
        customer.inActiveCustomerGroup = inActiveCustomerGroupCount;
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the buyer Count',
            data: customer,
        };
        return response.status(200).send(successResponse);
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
    @Get('/order-product-list')
    @Authorized()
    public async orderProductList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @QueryParam('emailId') emailId: string, @Res() response: any): Promise<any> {
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
            const orderProductCount = await this.orderProductService.listByQueryBuilder(limit, offset, select, whereconditions, [], relations, [], sort, true, true);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the count of order product count',
                data: orderProductCount,
            });
        }
        const orderProductList = await this.orderProductService.listByQueryBuilder(limit, offset, select, whereconditions, [], relations, [], sort, false, true);
        return response.status(200).send({
            status: 1,
            message: 'Successfully got order product list',
            data: orderProductList,
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
    @Get('/product-view-log-list')
    @Authorized()
    public async productViewLogList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @QueryParam('customerId') customerId: number, @Res() response: any): Promise<any> {
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
            const productViewLogCount = await this.productViewLogService.listByQueryBuilder(limit, offset, select, whereconditions, [], relations, [], sort, true, true);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the count of product view log list',
                data: productViewLogCount,
            });
        }
        const productViewLogList = await this.productViewLogService.listByQueryBuilder(limit, offset, select, whereconditions, [], relations, [], sort, false, true);
        return response.status(200).send({
            status: 1,
            message: 'Successfully got product view log list',
            data: productViewLogList,
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
    @Get('/vendor-graph-list')
    @Authorized()
    public async vendorGraphList(@QueryParam('vendorId') vendorId: number, @QueryParam('duration') duration: number, @Res() response: any): Promise<any> {
        if (vendorId !== 0) {
            const vendor = await this.vendorService.findOne({
                select: ['companyName', 'createdDate', 'modifiedDate'],
                where: {
                    vendorId,
                },
            });
            if (!vendor) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid Vendor',
                };
                return response.status(400).send(errorResponse);
            }
            const product = await this.vendorProductService.vendorProductBasedOnDuration(vendorId, duration);
            const productSold = await this.vendorOrdersService.productSoldBasedOnDuration(vendorId, duration);
            const delivery = await this.vendorOrdersService.deliveredOrderBasedOnDuration(vendorId, duration);
            const outOfStock = await this.vendorProductService.outOfStockBasedOnDuration(vendorId, duration, 1);
            const pendingStock = await this.vendorProductService.outOfStockBasedOnDuration(vendorId, duration, 2);
            vendor.productCount = product !== undefined ? product : 0;
            vendor.productSoldCount = (productSold[0].soldCount !== undefined && productSold[0].soldCount) ? productSold[0].soldCount : 0;
            vendor.deliveryCount = delivery !== undefined ? delivery : 0;
            vendor.outOfStockCount = outOfStock !== undefined ? outOfStock : 0;
            vendor.pendingStockCount = pendingStock !== undefined ? pendingStock : 0;
            const successResponses: any = {
                status: 1,
                message: 'Successfully got the seller graph list',
                data: vendor,
            };
            return response.status(200).send(successResponses);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the seller graph list',
            data: {},
        };
        return response.status(200).send(successResponse);
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
    @Get('/customer-visit-list')
    @Authorized()
    public async customerVisitList(@QueryParam('month') month: number, @QueryParam('year') year: number, @Res() response: any): Promise<any> {
        const customervisitList = await this.loginLogService.customerVisitList(month, year);
        return response.status(200).send({
            status: 1,
            message: 'Successfully got the buyer visit list',
            data: customervisitList,
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
    @Post('/bulk-status')
    public async updateVendorCustomerStatus(@Body({ validate: true }) params: { customerIds: number[], statusId: number }, @Res() response: any): Promise<any> {
        const customerIds = params.customerIds;
        const updateCustomerValue = [];
        if (customerIds.length) {
            for (const customerId of customerIds) {
                const findCustomer = await this.customerService.findOne({ where: { id: customerId, deleteFlag: 0 } });
                if (!findCustomer) {
                    return response.status(400).send({ status: 0, message: 'Invalid buyer Id' });
                }
                findCustomer.isActive = params.statusId;
                updateCustomerValue.push(findCustomer);
            }
            await this.customerService.create(updateCustomerValue);
            return response.status(200).send({ status: 1, message: 'Successfully updated the bulk buyer status' });
        }
    }

}
