/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Authorized, Body, Delete, Get, JsonController, Param, Post, Put, QueryParam, Req, Res } from 'routing-controllers';
import { CreateCustomerContact } from './requests/CustomerContactRequest';
import { CustomerContact } from '../../core/models/CustomerContact';
import { CustomerContactService } from '../../core/services/CustomerContactService';
import { Service } from 'typedi';

@Service()
@JsonController('/customer-contact')
export class CustomerContactController {

    constructor(
        private customerContactService: CustomerContactService
    ) { }

    // Add Customer Contact API
    /**
     * @api {post} /api/customer-contact Add Customer Contact
     * @apiGroup Customer Contact
     *
     * @apiHeader {String} Authorization Bearer token.
     *
     * @apiParam (Request body) {String{..96}} firstName Customer Contact First Name
     * @apiParam (Request body) {String{..96}} lastName Customer Contact Last Name
     * @apiParam (Request body) {String{..96}} email Customer Contact Email
     * @apiParam (Request body) {String{..20}} phoneNumber Customer Contact Phone Number
     * @apiParam (Request body) {String{..255}} [description] Notes or description
     * @apiParam (Request body) {Number} customerId Customer ID
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {String{..255}} shippingAddress1 Shipping Address Line 1
     * @apiParam (Request body) {String{..255}} [shippingAddress2] Shipping Address Line 2
     * @apiParam (Request body) {String{..100}} shippingCity Shipping City
     * @apiParam (Request body) {String{..20}} shippingPostcode Shipping Postcode
     * @apiParam (Request body) {String{..10}} shippingCountryId Shipping Country ID
     * @apiParam (Request body) {String{..10}} shippingZoneId Shipping Zone/State ID
     * @apiParam (Request body) {String{..96}} [shippingFirstName] Shipping First Name
     * @apiParam (Request body) {String{..96}} [shippingLastName] Shipping Last Name
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "customerContact Saved Successfully",
     *   "data": {}
     * }
     * @apiErrorExample {json} Server Error
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Internal server error"
     * }
     *
     * @apiSampleRequest /api/customer-contact
     */

    @Post()
    @Authorized(['vendor', 'create-contacts'])
    public async addCustomerContact(@Body({ validate: true }) customerParam: CreateCustomerContact, @Res() response: any, @Req() request: any): Promise<any> {

        const existingEmail = await this.customerContactService.findOne({
            where: {
                email: customerParam.email,
                customerId: customerParam.customerId,
                tenantId: request.user.tenantId,
                isDelete: 0,
            },
        });

        if (existingEmail) {
            return response.status(400).send({
                status: 0,
                message: 'Customer contact with this email already exists',
            });
        }

        const existingPhone = await this.customerContactService.findOne({
            where: {
                phoneNumber: customerParam.phoneNumber,
                customerId: customerParam.customerId,
                tenantId: request.user.tenantId,
                isDelete: 0,
            },
        });

        if (existingPhone) {
            return response.status(400).send({
                status: 0,
                message: 'Customer contact with this phone number already exists',
            });
        }

        const newCustomerContact: any = new CustomerContact();
        newCustomerContact.firstName = customerParam.firstName;
        newCustomerContact.lastName = customerParam.lastName;
        newCustomerContact.email = customerParam.email;
        newCustomerContact.phoneNumber = customerParam.phoneNumber;
        newCustomerContact.description = customerParam.description;
        newCustomerContact.customerId = customerParam.customerId;
        newCustomerContact.isActive = customerParam.isActive;
        newCustomerContact.isDelete = 0;
        newCustomerContact.shippingAddress1 = customerParam.shippingAddress1;
        newCustomerContact.shippingAddress2 = customerParam.shippingAddress2;
        newCustomerContact.shippingCity = customerParam.shippingCity;
        newCustomerContact.shippingPostcode = customerParam.shippingPostcode;
        newCustomerContact.shippingCountryId = customerParam.shippingCountryId;
        newCustomerContact.shippingZoneId = customerParam.shippingZoneId;
        newCustomerContact.shippingFirstName = customerParam.shippingFirstName;
        newCustomerContact.shippingLastName = customerParam.shippingLastName;
        newCustomerContact.tenantId = request.user.tenantId;

        const customerSave = await this.customerContactService.create(newCustomerContact);

        return response.status(200).send({
            status: 1,
            message: 'customerContact Saved Successfully',
            data: customerSave,
        });

    }

    // Get Customer Contact List API
    /**
     * @api {get} /api/customer-contact Get Customer Contact List
     * @apiGroup Customer Contact
     * @apiHeader {String} Authorization Bearer token.
     *
     * @apiParam (Query Parameters) {Number} [limit] Number of records to return
     * @apiParam (Query Parameters) {Number} [offset] Number of records to skip
     * @apiParam (Query Parameters) {String} [name] Filter by first name (case-insensitive)
     * @apiParam (Query Parameters) {String} [email] Filter by email (case-insensitive)
     * @apiParam (Query Parameters) {String="0","1"} [status] Filter by active status (0 = Inactive, 1 = Active)
     * @apiParam (Query Parameters) {String} [date] Filter by creation date (e.g., "2025-07-18")
     * @apiParam (Query Parameters) {String} [keyword] Keyword search across name and email
     *
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully got Customer Contact list.",
     *   "data": []
     * }
     * @apiErrorExample {json} Server Error
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Internal server error"
     * }
     * @apiSampleRequest /api/customer-contact
     */

    @Get()
    @Authorized(['vendor', 'list-contacts'])
    public async customerContactList(
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('name') name: string,
        @QueryParam('keyword') keyword: string,
        @QueryParam('status') status: string,
        @QueryParam('email') email: string,
        @QueryParam('createdate') createdate: string,
        @QueryParam('count') count: number | boolean,
        @Res() response: any,
        @Req() request: any
    ): Promise<any> {

        const select = [
            'customerContact.id as id',
            'customerContact.email as email',
            'customerContact.phoneNumber as phoneNumber',
            'customerContact.createdDate as createdDate',
            'customerContact.modifiedDate as modifiedDate',
            'customerContact.isActive as isActive',
            'customerContact.customerId as customerId',
            'customerContact.firstName as firstName',
            'customerContact.lastName as lastName',
        ];

        const relations = [{
            tableName: 'customer',
            op: 'leftCond',
            aliasName: 'customer',
            cond: 'customerContact.customerId = customer.id',
        }];
        const whereConditions = [
            {
                name: 'customerContact.tenantId',
                op: 'where',
                value: request.user.tenantId,
            },
        ];
        if (status && status !== '') {
            whereConditions.push({
                name: 'customerContact.isActive',
                op: 'and',
                value: status,
            });
        }
        const searchConditions = [];
        if (name && name !== '') {
            const normalized = name.replace(/\s+/g, ' ').trim().toLowerCase();
            searchConditions.push({
                name: ["CONCAT(customerContact.first_name, ' ', customerContact.last_name)"],
                value: normalized,
            });
        }
        if (email && email !== '') {
            searchConditions.push({
                name: ['customerContact.email'],
                value: email.toLowerCase(),
            });
        }
        if (createdate && createdate !== '') {
            searchConditions.push({
                name: ['customerContact.createdDate'],
                value: createdate,
            });
        }
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['customerContact.firstName', 'customerContact.lastName', 'customerContact.email', 'customerContact.phoneNumber'],
                value: keyword.toLowerCase(),
            });
        }
        const sort = [
            {
                name: 'customerContact.createdDate',
                order: 'DESC',
            },
        ];

        if (count) {
            const customerContactCount = await this.customerContactService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], sort, true, true);
            return {
                status: 1,
                message: 'Successfully got count.',
                data: customerContactCount,
            };
        }
        const customerContactList = await this.customerContactService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], sort, false, true);
        return response.status(200).send({
            status: 1,
            message: 'Successfully got Customer Contact list.',
            data: customerContactList,
        });
    }

    // Customer Contact Detail API
    /**
     * @api {get} /api/customer-contact/:id Get Customer Contact Detail
     * @apiGroup Customer Contact
     * @apiHeader {String} Authorization Bearer token.
     *
     * @apiParam (Path Parameters) {Number} id Customer Contact ID
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Got customer Contact detail successfully.",
     *   "data": {}
     * @apiErrorExample {json} Server Error
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Internal server error"
     * }
     * @apiSampleRequest /api/customer-contact/:id
     */

    @Get('/:id')
    @Authorized(['vendor', 'list-contacts'])
    public async CustomerContactDetail(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {
        const customerContact = await this.customerContactService.findOne({ where: { id } });

        if (!customerContact) {
            const errResponse: any = {
                status: 1,
                message: 'Invalid customer contact ID.',
            };
            return response.status(400).send(errResponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Got customer Contact detail successfully.',
            data: customerContact,
        };
        return response.status(200).send(successResponse);
    }

    // Update Customer Contact API
    /**
     * @api {put} /api/customer-contact/:id Update Customer Contact API
     * @apiGroup Customer Contact
     * @apiHeader {String} Authorization Bearer token
     * @apiParam (Path) {Number} id Customer Contact ID
     * @apiParam (Request Body) {String} firstName Customer Contact First Name
     * @apiParam (Request Body) {String} lastName Customer Contact Last Name
     * @apiParam (Request Body) {String} email Customer Contact Email
     * @apiParam (Request Body) {String} phoneNumber Customer Contact Phone Number
     * @apiParam (Request Body) {String} [description] Description or notes
     * @apiParam (Request Body) {Number} customerId Related Customer ID
     * @apiParam (Request body) {String} status status
     * @apiParam (Request Body) {String} shippingAddress1 Shipping Address Line 1
     * @apiParam (Request Body) {String} [shippingAddress2] Shipping Address Line 2
     * @apiParam (Request Body) {String} shippingCity Shipping City
     * @apiParam (Request Body) {String} shippingPostcode Shipping Postcode
     * @apiParam (Request Body) {String} shippingCountryId Shipping Country ID
     * @apiParam (Request Body) {String} shippingZoneId Shipping Zone/State ID
     * @apiParam (Request Body) {String} [shippingFirstName] Shipping First Name
     * @apiParam (Request Body) {String} [shippingLastName] Shipping Last Name
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "customerContact Saved Successfully"
     * }
     * @apiErrorExample {json} Server Error
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Internal server error"
     * }
     * @apiSampleRequest /api/customer-contact/:id
     */

    @Put('/:id')
    @Authorized(['vendor', 'edit-contacts'])
    public async updateCustomerContact(@Param('id') id: number, @Body({ validate: false }) customerContactParam: CreateCustomerContact, @Req() request: any, @Res() response: any): Promise<any> {
        const customerContact = await this.customerContactService.findOne({
            where: {
                id,
                tenantId: request.user.tenantId,
            },
        });
        if (!customerContact) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Customer Contact ID.',
            };
            return response.status(400).send(errorResponse);
        }

        customerContact.firstName = customerContactParam.firstName;
        customerContact.lastName = customerContactParam.lastName;
        customerContact.email = customerContactParam.email;
        customerContact.phoneNumber = customerContactParam.phoneNumber;
        customerContact.description = customerContactParam.description;
        customerContact.customerId = customerContactParam.customerId;
        customerContact.isActive = customerContactParam.isActive;
        customerContact.isDelete = 0;
        customerContact.shippingAddress1 = customerContactParam.shippingAddress1;
        customerContact.shippingAddress2 = customerContactParam.shippingAddress2;
        customerContact.shippingCity = customerContactParam.shippingCity;
        customerContact.shippingPostcode = customerContactParam.shippingPostcode;
        customerContact.shippingCountryId = customerContactParam.shippingCountryId;
        customerContact.shippingZoneId = customerContactParam.shippingZoneId;
        customerContact.shippingFirstName = customerContactParam.shippingFirstName;
        customerContact.shippingLastName = customerContactParam.shippingLastName;

        await this.customerContactService.update(customerContact.id, customerContact);

        return response.status(200).send({
            status: 1,
            message: 'customerContact Saved Successfully',
        });
    }

    // Delete Customer Contact API
    /**
     * @api {delete} /api/customer-contact/:id Delete Customer Contact
     * @apiGroup Customer Contact
     * @apiParam (Request body) {Number} id Customer Contact ID
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Customer contact is deleted successfully",
     *      "status": "1"
     * }
     * @apiErrorExample {json} Delete Customer Contact error
     * HTTP/1.1 500 Internal Server Error
     * @apiSampleRequest /api/customer-contact/:id
     */

    @Delete('/:id')
    @Authorized(['vendor', 'delete-contacts'])
    public async deleteCustomerContact(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {

        const customerContact = await this.customerContactService.findOne({ where: { id, tenantId: request.user.tenantId } });
        if (!customerContact) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid customer contact ID.',
            });
        }

        await this.customerContactService.delete(id);

        return response.status(200).send({
            status: 1,
            message: 'customer contact deleted successfully.',
        });
    }
}
