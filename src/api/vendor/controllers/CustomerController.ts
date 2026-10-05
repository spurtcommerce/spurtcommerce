/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, Post, Delete, Put, Body, QueryParam, Param, JsonController, Authorized, Req, Res } from 'routing-controllers';
import { aws_setup, env } from '../../../env';
import { CustomerService } from '../../core/services/CustomerService';
import { Customer } from '../../core/models/Customer';
import { CreateCustomer } from './requests/CreateCustomerRequest';
import { User } from '../../core/models/User';
import { MAILService } from '../../../auth/mail.services';
import { UpdateCustomer } from './requests/UpdateCustomerRequest';
import { CustomerGroupService } from '../../core/services/CustomerGroupService';
import { EmailTemplateService } from '../../core/services/EmailTemplateService';
import { VendorService } from '../../core/services/VendorService';
import { VendorProductService } from '../../core/services/VendorProductService';
import * as fs from 'fs';
import { ExportLog } from '../../core/models/ExportLog';
import { ExportLogService } from '../../core/services/ExportLogService';
import { S3, PutObjectCommand } from '@aws-sdk/client-s3';
import { VendorSettingsService } from '../../core/services/VendorSettingsService';
import { Not } from 'typeorm';
import { CustomerUsersService } from '../../core/services/CustomerUsersService';
import { VendorSettingsDomainService } from '../../core/services/VendorSettingsDomainService';
import { CustomerUsers } from '../../core/models/CustomerUsers';
import { CustomerUserGroupService } from '../../core/services/CustomerUserGroupService';
const s3 = new S3({ region: aws_setup.AWS_DEFAULT_REGION });
import { Service } from 'typedi';
import { pluginModule } from '../../../../src/loaders/pluginLoader';
import { getDataSource } from '../../../../src/loaders/typeormLoader';
import { CustomerToGroup } from '../../core/models/CustomerToGroup';
import { CustomerToGroupService } from '../../core/services/CustomerToGroupService';

@Service()
@JsonController('/vendor-customer')
export class CustomerController {
    constructor(
        private customerService: CustomerService,
        private customerGroupService: CustomerGroupService,
        private vendorService: VendorService,
        private vendorProductService: VendorProductService,
        private emailTemplateService: EmailTemplateService,
        private exportLogService: ExportLogService,
        private vendorSettingsService: VendorSettingsService,
        private customerUsersService: CustomerUsersService,
        private vendorSettingsDomainService: VendorSettingsDomainService,
        private customerUserGroupService: CustomerUserGroupService,
        private customerToGroupService: CustomerToGroupService
    ) {
        // --
    }

    // Create Customer API
    /**
     * @api {post} /api/vendor-customer Add Customer API
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
     * @apiSampleRequest /api/vendor-customer
     * @apiErrorExample {json} Customer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized(['vendor', 'create-customer'])
    public async addCustomer(@Body({ validate: true }) customerParam: CreateCustomer, @Res() response: any, @Req() request: any): Promise<any> {
        const newCustomer: any = new Customer();
        const resultUser = await this.customerService.findOne({ where: { email: customerParam.email, tenantId: request.user.tenantId, deleteFlag: 0 } });
        let customeruserss: any = '';
        if (resultUser) {
            customeruserss = await this.customerUsersService.findOne({ where: { email: customerParam.email, customerId: resultUser.id, deleteFlag: 0 } });
            if (customeruserss) {
                const successResponse: any = {
                    status: 1,
                    message: 'A customer is already registered with this email Id',
                };
                return response.status(400).send(successResponse);
            }
        }

        if (customerParam.password === customerParam.confirmPassword) {
            const password = await Customer.hashPassword(customerParam.password);
            let customerSave;
            if (!customeruserss) {
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
                newCustomer.tenantId = request.user.tenantId;
                newCustomer.paymentTermId = customerParam.paymentTermId;
                newCustomer.isVendor = 0;
                customerSave = await this.customerService.create(newCustomer);
            } else {
                resultUser.password = password;
                resultUser.customerGroupId = customerParam.customerGroupId;
                resultUser.mailStatus = customerParam.mailStatus;
                resultUser.mobileNumber = customerParam.mobileNumber;
                resultUser.paymentTermId = customerParam.paymentTermId;
                customerSave = await this.customerService.create(resultUser);
            }

            const customerUser: any = new CustomerUsers();
            customerUser.username = customerParam.email;
            customerUser.password = password;
            customerUser.firstName = customerParam.username;
            customerUser.lastName = customerParam.lastName;
            customerUser.email = customerParam.email;
            customerUser.phoneNumber = customerParam.mobileNumber;
            customerUser.isActive = customerParam.status;
            customerUser.deleteFlag = 0;
            customerUser.isSuperCustomer = 1;
            const customerUserGroup = await this.customerUserGroupService.findOne({ where: { tenantId: request.tenantId, slug: 'buyer' } });
            customerUser.customerUserGroupId = customerUserGroup.id;
            customerUser.customerId = customerSave.id;
            await this.customerUsersService.create(customerUser);

            const customerToGroup: any = new CustomerToGroup();
            customerToGroup.customerId = customerSave.id;
            customerToGroup.customerGroupId = customerParam.customerGroupId;
            customerToGroup.isAvtive = 1;
            await this.customerToGroupService.create(customerToGroup);
            if (customerSave) {
                if (+customerParam.mailStatus === 1) {
                    const emailContent = await this.emailTemplateService.findOne({ where: { emailTemplateId: 4 } });
                    // const logo = await this.settingService.findOne();
                    const vendorSetting = await this.vendorSettingsService.findOne({ where: { vendorId: request.user.tenantId } });
                    const vendor = await this.vendorService.findOne({ where: { vendorId: request.user.tenantId } });
                    const message = emailContent.content.replace('{name}', customerParam.username).replace('{username}', customerParam.email).replace('{storeName}', vendorSetting?.siteName ?? '').replace('{password}', customerParam.password).replace('{storeName}', vendorSetting?.siteName ?? '');
                    // const redirectUrl = env.storeRedirectUrl;
                    const mailContents: any = {};
                    mailContents.setting = { ...vendorSetting, ...vendor };
                    mailContents.emailContent = message;
                    const vendorDomain = await this.vendorSettingsDomainService.findOne({ where: { vendorId: request.user.tenantId, isActive: 1, isDelete: 0 } });
                    let redirectUrl = vendorSetting.storeUrl;
                    if (vendorDomain?.name) {
                        redirectUrl = await this.vendorSettingsService.getVendorDomainOrDefault(request.user.tenantId, vendorDomain.name);
                    }
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
     * @api {get} /api/vendor-customer Customer List API
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
     * @apiSampleRequest /api/vendor-customer
     * @apiErrorExample {json} customer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized(['vendor', 'list-customer'])
    public async customerList(
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('name') name: string,
        @QueryParam('keyword') keyword: string,
        @QueryParam('status') status: string,
        @QueryParam('email') email: string,
        @QueryParam('customerGroup') customerGroup: string,
        @QueryParam('customerGroupName') customerGroupName: string,
        @QueryParam('customerName') customerName: string,
        @QueryParam('date') date: string,
        @QueryParam('count') count: number | boolean,
        @Res() response: any, @Req() request: any
    ): Promise<any> {

        const select = [
            'Customer.id as id',
            'Customer.firstName as firstName',
            'Customer.email as email',
            'Customer.mobileNumber as mobileNumber',
            'Customer.createdDate as createdDate',
            'Customer.modifiedDate as modifiedDate',
            'Customer.isActive as isActive',
            'Customer.username as username',
            'customerGroup.name as customerGroupName',
            'Customer.lastName as lastName',
            "CONCAT(Customer.firstName, ' ', Customer.lastName) as customerName",
            'paymentTerm.name as paymentTermName',
        ];

        const relations = [
            {
                tableName: 'Customer.customerGroup',
                op: 'left',
                aliasName: 'customerGroup',
            },
            {
                tableName: 'Customer.paymentTerm',
                op: 'left',
                aliasName: 'paymentTerm',
            },
            {
                tableName: 'Customer.customerUsers',
                op: 'left',
                aliasName: 'customerUsers',
            },
        ];
        const whereConditions = [
            {
                name: '`Customer`.`tenant_id`',
                op: 'where',
                value: request.user.tenantId,
            },
            {
                name: '`Customer`.`delete_flag`',
                op: 'and',
                value: 0,
            },
            {
                name: '`customerUsers`.`delete_flag`',
                op: 'and',
                value: 0,
            },
        ];
        if (customerGroup && customerGroup !== '') {
            whereConditions.push({
                name: '`Customer`.`customer_group_id`',
                op: 'and',
                value: customerGroup,
            });
        }
        if (customerGroupName && customerGroupName !== '') {
            whereConditions.push({
                name: '`customerGroup`.`name`',
                op: 'and',
                value: customerGroupName,
            });
        }
        if (status === '0' || status) {
            whereConditions.push({
                name: 'Customer.isActive',
                op: 'and',
                value: +status,
            });
        }
        const searchConditions = [];
        if (name && name !== '') {
            searchConditions.push({
                name: ['Customer.firstName'],
                value: name.toLowerCase(),
            });
        }
        if (customerName?.trim()) {
            searchConditions.push({
                name: ["CONCAT(Customer.firstName, ' ', Customer.lastName)"],
                value: customerName.trim().toLowerCase(),
            });
        }
        if (email && email !== '') {
            searchConditions.push({
                name: ['Customer.email'],
                value: email.toLowerCase(),
            });
        }
        if (date && date !== '') {
            searchConditions.push({
                name: ['Customer.createdDate'],
                value: date,
            });
        }
        if (keyword?.trim()) {
            searchConditions.push({
                name: ['Customer.email', 'customerGroup.name', "CONCAT(Customer.firstName, ' ', Customer.lastName)", 'Customer.mobileNumber'],
                value: `%${keyword.toLowerCase()}%`,
            });
        }
        const sort = [
            {
                name: 'Customer.createdDate',
                order: 'DESC',
            },
        ];
        const groupBy = [{ name: 'Customer.id' }, { name: 'paymentTerm.name' }];
        let customerList: any;
        if (count) {
            customerList = await this.customerService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            return {
                status: 1,
                message: 'Successfully got count.',
                data: customerList,
            };
        }
        customerList = await this.customerService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        return response.status(200).send({
            status: 1,
            message: 'Successfully got Customer list.',
            data: customerList,
        });
    }

    // Customer User List API
    /**
     * @api {get} /api/vendor-customer/user-list Customer User List API
     * @apiGroup Customer Users
     * @apiHeader {String} Authorization
     * @apiParam (Query Parameters) {Number} [limit]
     * @apiParam (Query Parameters) {Number} [offset]
     * @apiParam (Query Parameters) {String} [keyword]
     * @apiParam (Query Parameters) {Number|Boolean} [count]
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": "1",
     *   "message": "Successfully get user list",
     *   "data": []
     * }
     * @apiSampleRequest /api/vendor-customer/user-list
     * @apiErrorExample {json} Customer User Profile error
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "message": "Internal Server Error"
     * }
     */
    @Get('/user-list')
    @Authorized(['vendor', 'list-customer'])
    public async findAllCustomerUsers(@QueryParam('customerId') customerId: number, @Req() request: any, @Res() response: any): Promise<any> {

        const customerUsers = await this.customerUsersService.find({
            select: ['id', 'firstName', 'lastName', 'email', 'isActive', 'customerUserGroups'],
            relations: ['customerUserGroups'],
            where:
            {
                deleteFlag: 0,
                customerId,
            },
        });
        const successResponse: any = {
            status: 1,
            message: 'Successfully got all customer user list.',
            data: customerUsers,
        };
        return response.status(200).send(successResponse);
    }

    // Delete Customer API
    /**
     * @api {delete} /api/vendor-customer/:id Delete Customer API
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
     * @apiSampleRequest /api/vendor-customer/:id
     * @apiErrorExample {json} Customer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized(['vendor', 'delete-customer'])
    public async deleteCustomer(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {
        const customer = await this.customerService.findOne({
            where: {
                id,
                tenantId: request.user.tenantId,
            },
        });
        if (!customer) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid customer ID.',
            };
            return response.status(400).send(errorResponse);
        }
        if (!customer) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid customer ID.',
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
        const customerUser = await this.customerUsersService.findOne({ where: { customerId: customer.id } });
        if (pluginModule.includes('ShoppingCart')) {
            const importPath = '../../../../add-ons/ShoppingCart/ShoppingCartHook';
            const shoppingCart = await require(importPath);
            const shoppingCartAllData: any = await shoppingCart.find({ where: { customerUserId: customerUser.id } });
            if (shoppingCartAllData?.length) {
                const shoppingCartIds = shoppingCartAllData.map((val: any) => val.id);
                await shoppingCart.deleteShoppingCart(shoppingCartIds);
            }
        }
        if (pluginModule.includes('RfqAndQuotes')) {
            const { QuoteRequest } = require('../../../../add-ons/RfqAndQuotes/models/QuoteRequest');
            const { Quote } = require('../../../../add-ons/RfqAndQuotes/models/Quote');
            const quoteRequestRepository = getDataSource().getRepository(QuoteRequest);
            const quoteRepository = getDataSource().getRepository(Quote);
            console.log('asdhca');
            const rfqQuotesAllData: any = await quoteRequestRepository.find({ where: { customerUserId: customerUser.id } });
            if (rfqQuotesAllData?.length) {
                const rfqQuotesIds = rfqQuotesAllData.map((val: any) => val.id);
                await quoteRequestRepository.delete(rfqQuotesIds);
            }

            const quotesAllData: any = await quoteRepository.find({ where: { customerUserId: customerUser.id } });
            if (quotesAllData?.length) {
                const quotesIds = quotesAllData.map((val: any) => val.id);
                await quoteRepository.delete(quotesIds);
            }
        }
        customerUser.deleteFlag = 1;
        await this.customerUsersService.create(customerUser);
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
     * @api {put} /api/vendor-customer/:id Update Customer API
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
     * @apiSampleRequest /api/vendor-customer/:id
     * @apiErrorExample {json} updateCustomer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    @Authorized(['vendor', 'edit-customer'])
    public async updateCustomer(@Param('id') id: number, @Body({ validate: true }) customerParam: UpdateCustomer, @Req() request: any, @Res() response: any): Promise<any> {
        const customer = await this.customerService.findOne({ where: { id, tenantId: request.user.tenantId } });
        if (!customer) {
            const errorResponse: any = {
                status: 0,
                message: 'Customer not founded.',
            };
            return response.status(400).send(errorResponse);
        }

        const checkMailExist = await this.customerService.findOne({ where: { email: customerParam.email, deleteFlag: 0, id: Not(id), tenantId: request.user.tenantId } });
        if (checkMailExist) {
            const errorResponses = {
                status: 0,
                message: 'Mail ID is already registered.',
            };
            return response.status(400).send(errorResponses);
        }

        const customerUser: any = await this.customerUsersService.findOne({ where: { customerId: customer.id, deleteFlag: 0 } });
        if (!customerUser) {
            const errorResponse: any = {
                status: 0,
                message: 'Customer not founded.',
            };
            return response.status(400).send(errorResponse);
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
            let password;
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
                password = await User.hashPassword(customerParam.password);
                customer.password = password;
            }
            customer.mailStatus = customerParam.mailStatus;
            customer.isActive = customerParam.status;
            customer.siteId = customerParam.siteId;
            customer.paymentTermId = customerParam.paymentTermId;
            await this.customerService.create(customer);

            customerUser.username = customerParam.email;
            customerUser.password = password;
            customerUser.firstName = customerParam.username;
            customerUser.lastName = customerParam.lastName;
            customerUser.email = customerParam.email;
            customerUser.phoneNumber = customerParam.mobileNumber;
            customerUser.isActive = customerParam.status;
            customerUser.customerId = request.user.customerId;
            await this.customerUsersService.create(customerUser);

            const successResponse: any = {
                status: 1,
                message: 'Customer updated successfully.',
            };
            return response.status(200).send(successResponse);
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
     * @api {get} /api/vendor-customer/customer-detail/:id Customer Details API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully got customer details.",
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
     *           "customerGroupName": "",
     *           "paymentTerm": {
     *                 "createdBy": 1,
     *                 "createdDate": "2025-06-16T09:31:35.000Z",
     *                 "modifiedBy": 1,
     *                 "modifiedDate": "2025-06-16T09:47:02.000Z",
     *                 "id": 1,
     *                 "name": "Net 17",
     *                 "slug": "net-17",
     *                 "termDays": 17,
     *                 "isActive": 1,
     *                 "isDelete": 1,
     *                 "tenantId": 4
     *             },
     *      }
     *      }
     * @apiSampleRequest /api/vendor-customer/customer-detail/:id
     * @apiErrorExample {json} customer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/customer-detail/:id')
    @Authorized(['vendor', 'list-customer'])
    public async customerDetails(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {
        const customer = await this.customerService.findOne({
            select: ['id', 'firstName', 'lastName', 'email', 'mobileNumber', 'address', 'lastLogin', 'isActive', 'mailStatus', 'customerGroupId', 'avatar', 'avatarPath', 'siteId', 'createdDate', 'modifiedDate'],
            where: { id },
            tenantId: request.user.tenantId,
            relations: ['paymentTerm'],
        });
        if (!customer) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid customer ID',
            };
            return response.status(400).send(errorResponse);
        }
        const groupName = await this.customerGroupService.findOne({
            where: {
                id: customer.customerGroupId,
            },
        });
        customer.customerGroupName = (groupName && groupName.name) ? groupName.name : '';
        const successResponse: any = {
            status: 1,
            message: 'Successfully got customer details.',
            data: customer,
        };
        return response.status(200).send(successResponse);
    }

    // Customer Details Excel Document Download
    /**
     * @api {get} /api/vendor-customer/customer-excel-list Customer Excel
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
     * @apiSampleRequest /api/vendor-customer/customer-excel-list
     * @apiErrorExample {json} Customer Excel List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/customer-excel-list')
    @Authorized(['vendor'])
    public async exportVendorCustomer(@QueryParam('dateFrom') dateFrom: string, @QueryParam('dateTo') dateTo: string, @QueryParam('title') title: string, @QueryParam('customerId') customerId: string, @Res() response: any, @Req() request: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Bulk Archive Order Archive Excel');
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Email', key: 'email', size: 16, width: 15 },
            { header: 'customerName', key: 'customerName', size: 16, width: 15 },
            { header: 'mobileNumber', key: 'mobileNumber', size: 16, width: 24 },
            { header: 'groupName', key: 'groupName', size: 16, width: 15 },
            { header: 'status', key: 'status', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        // const select = [
        //     'DISTINCT order.customerId as customerId',
        //     `orderCustomer.email as email`,
        //     `orderCustomer.firstName as firstName`,
        //     `orderCustomer.lastName as lastName`,
        //     `orderCustomer.mobileNumber as mobileNumber`,
        //     `orderCustomer.customerGroupId as customerGroupId`,
        //     `MAX(order.shippingAddress1) as shippingAddress1`,
        //     `MAX(order.shippingAddress2) as shippingAddress2`,
        //     `MAX(order.shippingCity) as shippingCity`,
        //     `MAX(order.shippingZone) as shippingZone`,
        //     `SUM(order.total) as purched`,
        //     `orderCustomer.isActive as isActive`,
        //     `orderCustomer.avatar as imageName`,
        //     `orderCustomer.avatarPath as containerName`,
        //     `customerGroup.name as groupName`,
        //     'COUNT(order.orderId) as ordered',
        //     'COUNT(orderProduct.orderProductId) as totalOrderProductId',
        // ];

        // const relations = [
        //     {
        //         tableName: 'VendorOrders.order',
        //         aliasName: 'order',
        //     },
        //     {
        //         tableName: 'order.customer',
        //         aliasName: 'orderCustomer',
        //     },
        //     {
        //         tableName: 'orderCustomer.customerGroup',
        //         aliasName: 'customerGroup',
        //     },
        //     {
        //         tableName: 'order.orderProduct',
        //         aliasName: 'orderProduct',
        //     },
        // ];

        // const whereConditions = [
        //     {
        //         name: 'VendorOrders.vendorId',
        //         op: 'and',
        //         value: request.user.tenantId,
        //     },
        // ];
        // if (customerId && customerId !== '') {
        //     const customerIds = customerId.split(',');
        //     // const orderIds = await this.orderService.find({ where: { email: In(emailId) }, select: ['orderId'] });
        //     whereConditions.push({
        //         name: 'order.orderId',
        //         op: 'IN',
        //         value: customerIds,
        //     });
        // }
        // const groupBy = [
        //     {
        //         name: 'order.orderId',
        //     },
        //     {
        //         name: `orderCustomer.id`,
        //     },
        // ];
        // const vendorOrders: any = await this.vendorOrdersService.listByQueryBuilder(0, 0, select, whereConditions, [], relations, groupBy, [], false, true);
        const select = [
            'Customer.id as id',
            'Customer.firstName as firstName',
            'Customer.email as email',
            'Customer.mobileNumber as mobileNumber',
            'Customer.isActive as isActive',
            'Customer.username as username',
            'customerGroup.name as groupName',
            'Customer.lastName as lastName',
            'Customer.createdDate as createdDate',
        ];

        const relations = [
            {
                tableName: 'Customer.customerGroup',
                op: 'left',
                aliasName: 'customerGroup',
            },
        ];
        const whereConditions: any = [
            {
                name: '`Customer`.`tenant_id`',
                op: 'where',
                value: request.user.tenantId,
            },
            {
                name: '`Customer`.`delete_flag`',
                op: 'and',
                value: 0,
            },
            {
                name: '`Customer`.`is_vendor`',
                op: 'and',
                value: 0,
            },
        ];
        if (customerId && customerId !== '') {
            const customerIds = customerId.split(',');
            whereConditions.push({
                name: 'Customer.id',
                op: 'IN',
                value: customerIds,
            });
        }

        const searchConditions = [];
        const sort = [
            {
                name: 'Customer.createdDate',
                order: 'DESC',
            },
        ];
        // DATE RANGE FILTER
        if (dateFrom && dateTo) {
            whereConditions.push({
                name: 'DATE(`Customer`.`created_date`)',
                op: 'raw',
                sign: '>=',
                value: dateFrom,
            });
            whereConditions.push({
                name: 'DATE(`Customer`.`created_date`)',
                op: 'raw',
                sign: '<=',
                value: dateTo,
            });
        } else if (dateFrom) {
            whereConditions.push({
                name: 'DATE(`Customer`.`created_date`)',
                op: 'raw',
                sign: '>=',
                value: dateFrom,
            });
        } else if (dateTo) {
            whereConditions.push({
                name: 'DATE(`Customer`.`created_date`)',
                op: 'raw',
                sign: '<=',
                value: dateTo,
            });
        }
        const customerList: any = await this.customerService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, [], sort, false, true);
        const mappingData = customerList.map((value) => {
            value.isActive = value.isActive === 1 ? 'Active' : 'In-active';
            return value;
        });
        const rows = [];
        for (const data of mappingData) {
            rows.push([data.email, data.firstName + ' ' + data.lastName, data.mobileNumber, data.groupName, data.isActive]);
        }
        const recordIdsList = mappingData.map((v) => v.id).join(',');
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './VendorCustomerExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        // Add export log
        const newExportLog = new ExportLog();
        newExportLog.module = 'Manage Customers';
        newExportLog.title = title;
        newExportLog.exportId = await this.exportLogService.generateExportId(request.user.tenantId, 'Manage Customers');
        newExportLog.recordAvailable = mappingData.length;
        newExportLog.tenantId = request.user.tenantId;
        newExportLog.createdBy = request.user.id;
        newExportLog.referenceType = 2;
        newExportLog.recordIds = recordIdsList;
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

    // ExportVendorCustomerByLog
    /**
     * @api {Get} /api/vendor-order/customer-excel-download/:logId Download Vendor Customer Export from Log
     * @apiGroup Vendor Customer
     * @apiHeader {String} Authorization Vendor JWT Token
     * @apiParam (Path) {Number} logId Export log table ID containing customer record IDs.
     *
     * @apiDescription
     * This API allows a vendor to download an Excel file containing specific customer records
     * that were previously exported and stored in the export log table for the module **"Manage Customers"**.
     *
     * The customer IDs are retrieved from the export log entry (`recordIds` field).
     * The API generates an Excel file that includes detailed customer information such as:
     * - Email
     * - Customer Name
     * - Mobile Number
     * - Group Name
     * - Status (Active/Inactive)
     *
     * @apiSampleRequest /api/vendor-order/customer-excel-download/12
     *
     * @apiSuccessExample {file} Success-Response:
     * HTTP/1.1 200 OK
     * Excel file will be downloaded containing the following columns:
     * [
     *   "Email",
     *   "Customer Name",
     *   "Mobile Number",
     *   "Group Name",
     *   "Status"
     * ]
     *
     * @apiErrorExample {json} Export Log Not Found
     * HTTP/1.1 404 Not Found
     * {
     *   "status": 0,
     *   "message": "Export log not found"
     * }
     *
     * @apiErrorExample {json} No Customer IDs Found
     * HTTP/1.1 400 Bad Request
     * {
     *   "status": 0,
     *   "message": "No customer IDs found in export log"
     * }
     *
     * @apiErrorExample {json} No Customers Found
     * HTTP/1.1 404 Not Found
     * {
     *   "status": 0,
     *   "message": "No customers found for the given export log IDs"
     * }
     */
    @Get('/customer-excel-download/:logId')
    @Authorized(['vendor', 'export-customer'])
    public async exportVendorCustomerByLog(
        @Param('logId') logId: number,
        @Req() request: any,
        @Res() response: any
    ): Promise<any> {
        const excel = require('exceljs');
        // tslint:disable-next-line:no-shadowed-variable
        const fs = require('fs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Vendor Customers');

        worksheet.columns = [
            { header: 'Email', key: 'email', width: 25 },
            { header: 'Customer Name', key: 'customerName', width: 25 },
            { header: 'Mobile Number', key: 'mobileNumber', width: 20 },
            { header: 'Group Name', key: 'groupName', width: 20 },
            { header: 'Status', key: 'status', width: 15 },
        ];

        const logEntry = await this.exportLogService.findOne({
            where: {
                id: logId,
                tenantId: request.user.tenantId,
                module: 'Manage Customers',
            },
        });

        if (!logEntry) {
            return response.status(404).send({
                status: 0,
                message: 'Export log not found',
            });
        }

        if (!logEntry.recordIds) {
            return response.status(400).send({
                status: 0,
                message: 'No customer IDs found in export log',
            });
        }

        const customerIds = logEntry.recordIds.split(',').map((id) => +id.trim()).filter(Boolean);

        if (!customerIds.length) {
            return response.status(400).send({
                status: 0,
                message: 'No valid customer IDs found in export log',
            });
        }

        const select = [
            'Customer.id as id',
            'Customer.firstName as firstName',
            'Customer.lastName as lastName',
            'Customer.email as email',
            'Customer.mobileNumber as mobileNumber',
            'Customer.isActive as isActive',
            'customerGroup.name as groupName',
        ];

        const relations = [
            {
                tableName: 'Customer.customerGroup',
                op: 'left',
                aliasName: 'customerGroup',
            },
        ];

        const whereConditions = [
            {
                name: '`Customer`.`tenant_id`',
                op: 'where',
                value: request.user.tenantId,
            },
            {
                name: '`Customer`.`delete_flag`',
                op: 'and',
                value: 0,
            },
            {
                name: '`Customer`.`id`',
                op: 'andIn',
                value: customerIds,
            },
        ];

        const customers: any = await this.customerService.listByQueryBuilder(
            0, 0, select, whereConditions, [], relations, [], [], false, true
        );

        if (!customers || customers.length === 0) {
            return response.status(404).send({
                status: 0,
                message: 'No customers found for the given export log IDs',
            });
        }

        customers.forEach((cust: any) => {
            worksheet.addRow({
                email: cust.email,
                customerName: `${cust.firstName || ''} ${cust.lastName || ''}`.trim(),
                mobileNumber: cust.mobileNumber,
                groupName: cust.groupName || '-',
                status: cust.isActive === 1 ? 'Active' : 'Inactive',
            });
        });

        const fileName = `./VendorCustomer_${Date.now()}.xlsx`;
        await workbook.xlsx.writeFile(fileName);

        return new Promise((resolve, reject) => {
            response.download(fileName, (err) => {
                fs.unlinkSync(fileName);
                if (err) {
                    reject(err);
                } else {
                    resolve(response.end());
                }
            });
        });
    }
}
