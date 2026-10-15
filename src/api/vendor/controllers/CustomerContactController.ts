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

    /**
     * @api {post} /api/customer-contact Create Customer Contact
     * @apiGroup Customer Contact
     * @apiName CreateCustomerContact
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiBody {String} firstName           First name
     * @apiBody {String} lastName            Last name
     * @apiBody {String} email               Email address
     * @apiBody {String} phoneNumber         Contact phone number
     * @apiBody {String} [description]       Description
     * @apiBody {Number} [customerId]        Customer ID
     * @apiBody {Number} isActive            Active status (1: Active, 0: Inactive)
     * @apiBody {String} shippingAddress1    Shipping address line 1
     * @apiBody {String} [shippingAddress2]  Shipping address line 2
     * @apiBody {String} [shippingCity]      Shipping city
     * @apiBody {String} [shippingPostcode]  Shipping postal code
     * @apiBody {Number} [shippingCountryId] Shipping country ID
     * @apiBody {Number} [shippingZoneId]    Shipping zone ID
     * @apiBody {String} [shippingFirstName] Shipping first name
     * @apiBody {String} [shippingLastName]  Shipping last name
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Contact created successfully",
     *         "data": {
     *             "id": 1,
     *             "firstName": "John",
     *             "lastName": "Doe",
     *             "email": "john@example.com",
     *             "phoneNumber": "1234567890",
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Create-Failed:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Unable to create contact"
     *     }
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

    /**
     * @api {get} /api/customer-contact Customer Contact List
     * @apiGroup Customer Contact
     * @apiName CustomerContactList
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiQuery {Number} [limit]            Number of records to return
     * @apiQuery {Number} [offset]           Pagination offset
     * @apiQuery {String} [name]             Customer name filter
     * @apiQuery {String} [keyword]          Search keyword
     * @apiQuery {String} [status]           Status filter
     * @apiQuery {String} [email]            Email filter
     * @apiQuery {String} [createdate]       Creation date filter
     * @apiQuery {Number|Boolean} [count]    If true/1, returns total count
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got customer contact list",
     *         "data": [
     *             {
     *                 "id": 1,
     *                 "firstName": "John",
     *                 "lastName": "Doe",
     *                 "email": "john@example.com",
     *                 "phoneNumber": "1234567890",
     *                 "isActive": 1
     *             }
     *         ]
     *     }
     *
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

    /**
     * @api {get} /api/customer-contact/:id Get Customer Contact Detail
     * @apiGroup Customer Contact
     * @apiName GetCustomerContactDetail
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} id          Contact ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got contact details.",
     *         "data": {
     *             "id": 1,
     *             "firstName": "John",
     *             "lastName": "Doe",
     *             "email": "john@example.com",
     *             "phoneNumber": "1234567890",
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Contact-Not-Found:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid contact id"
     *     }
     *
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

    /**
     * @api {put} /api/customer-contact/:id Update Customer Contact
     * @apiGroup Customer Contact
     * @apiName UpdateCustomerContact
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} id          Contact ID
     *
     * @apiBody {String} firstName           First name
     * @apiBody {String} lastName            Last name
     * @apiBody {String} email               Email address
     * @apiBody {String} phoneNumber         Contact phone number
     * @apiBody {String} [description]       Description
     * @apiBody {Number} [customerId]        Customer ID
     * @apiBody {Number} isActive            Active status (1: Active, 0: Inactive)
     * @apiBody {String} shippingAddress1    Shipping address line 1
     * @apiBody {String} [shippingAddress2]  Shipping address line 2
     * @apiBody {String} [shippingCity]      Shipping city
     * @apiBody {String} [shippingPostcode]  Shipping postal code
     * @apiBody {Number} [shippingCountryId] Shipping country ID
     * @apiBody {Number} [shippingZoneId]    Shipping zone ID
     * @apiBody {String} [shippingFirstName] Shipping first name
     * @apiBody {String} [shippingLastName]  Shipping last name
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Contact updated successfully",
     *         "data": {
     *             "id": 1,
     *             "firstName": "John",
     *             "lastName": "Doe",
     *             "email": "john@example.com",
     *             "phoneNumber": "1234567890",
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Contact:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid contact Id"
     *     }
     *
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

    /**
     * @api {delete} /api/customer-contact/:id Delete Customer Contact
     * @apiGroup Customer Contact
     * @apiName DeleteCustomerContact
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} id          Contact ID to delete
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Contact deleted successfully."
     *     }
     *
     * @apiErrorExample {json} Invalid-Contact:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid contact Id"
     *     }
     *
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
