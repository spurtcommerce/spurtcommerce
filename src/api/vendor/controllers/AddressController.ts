/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, Post, Put, Delete, Body, JsonController, Authorized, Res, Req, QueryParam, Param } from 'routing-controllers';
import { AddressService } from '../../core/services/AddressService';
import { Address } from '../../core/models/Address';
import { CreateAddress } from './requests/CreateAddressRequest';
import { CustomerService } from '../../core/services/CustomerService';
import { Service } from 'typedi';

@Service()
@JsonController('/address')
export class AddressController {
    constructor(
        private addressService: AddressService,
        private customerService: CustomerService
    ) {
        // --
    }

    /**
     * @api {post} /api/address Create Customer Address
     * @apiGroup Customer Address
     * @apiName CreateCustomerAddress
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiBody {Number} customerId          Customer ID
     * @apiBody {String} [firstName]         First name (optional, defaults to customer's first name)
     * @apiBody {String} [lastName]          Last name (optional, defaults to customer's last name)
     * @apiBody {String} address1            Primary address
     * @apiBody {String} [address2]          Secondary address
     * @apiBody {String} city                City
     * @apiBody {String} [state]             State (optional)
     * @apiBody {String} postcode            Postal code
     * @apiBody {String} addressType         Address type (e.g., home, office)
     * @apiBody {Number} countryId           Country ID
     * @apiBody {String} [company]           Company name
     * @apiBody {Number} [zoneId]            Zone ID (optional)
     * @apiBody {String} phoneNumber         Contact phone number
     * @apiBody {String} [landmark]          Landmark or nearby place
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Your address has been saved!",
     *         "data": {
     *             "id": 12,
     *             "customerId": 3,
     *             "firstName": "John",
     *             "lastName": "Doe",
     *             "address1": "123 Main St",
     *             "address2": "",
     *             "city": "New York",
     *             "state": "NY",
     *             "postcode": "10001",
     *             "addressType": "home",
     *             "countryId": 1,
     *             "company": null,
     *             "zoneId": 0,
     *             "phoneNo": "5551234567",
     *             "landmark": "Near Central Park"
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Customer-Id:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid customer ID, try again"
     *     }
     *
     * @apiErrorExample {json} Create-Failed:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Unable to add address. Please try again."
     *     }
     *
     * @apiSampleRequest /api/address
     */
    @Post()
    @Authorized(['vendor', 'add-customer-address'])
    public async createAddress(@Body({ validate: true }) addressParam: CreateAddress, @Res() response: any): Promise<any> {
        const customer = await this.customerService.findOne({
            where: {
                id: addressParam.customerId,
            },
        });
        if (!customer) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid customer ID, try again',
            };
            return response.status(400).send(errorResponse);
        }
        const newAddress = new Address();
        newAddress.customerId = addressParam.customerId;
        newAddress.firstName = addressParam.firstName ?? customer.firstName;
        newAddress.lastName = addressParam.lastName ?? customer.lastName;
        newAddress.address1 = addressParam.address1;
        newAddress.address2 = addressParam.address2;
        newAddress.city = addressParam.city;
        newAddress.state = addressParam.state ?? '';
        newAddress.postcode = addressParam.postcode;
        newAddress.addressType = addressParam.addressType;
        newAddress.countryId = addressParam.countryId;
        newAddress.company = addressParam.company;
        newAddress.zoneId = addressParam.zoneId ?? 0;
        newAddress.phoneNo = addressParam.phoneNumber;
        newAddress.landmark = addressParam.landmark;
        const addressSave = await this.addressService.create(newAddress);
        if (addressSave) {
            const successResponse: any = {
                status: 1,
                message: 'Your address has been saved!',
                data: addressSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to add address. Please try again.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    /**
     * @api {put} /api/address/:id Update Customer Address
     * @apiGroup Customer Address
     * @apiName UpdateCustomerAddress
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} id  Address ID to update
     *
     * @apiBody {Number} customerId          Customer ID
     * @apiBody {String} firstName           First name
     * @apiBody {String} lastName            Last name
     * @apiBody {String} address1            Primary address
     * @apiBody {String} [address2]          Secondary address
     * @apiBody {String} city                City
     * @apiBody {String} [state]             State
     * @apiBody {String} postcode            Postal code
     * @apiBody {String} addressType         Address type (e.g., home, office)
     * @apiBody {Number} countryId           Country ID
     * @apiBody {String} [company]           Company name
     * @apiBody {Number} [zoneId]            Zone ID
     * @apiBody {String} phoneNumber         Contact phone number
     * @apiBody {String} [landmark]          Landmark
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Your address has been updated.",
     *         "data": {
     *             "addressId": 12,
     *             "customerId": 3,
     *             "firstName": "John",
     *             "lastName": "Doe",
     *             "address1": "123 Main St",
     *             "address2": "",
     *             "city": "New York",
     *             "state": "NY",
     *             "postcode": "10001",
     *             "addressType": "home",
     *             "countryId": 1,
     *             "company": null,
     *             "zoneId": 0,
     *             "phoneNo": "5551234567",
     *             "landmark": "Near Central Park"
     *         }
     *     }
     *
     * @apiErrorExample {json} Address-Not-Found:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Unable to add address. Please try again."
     *     }
     *
     * @apiErrorExample {json} Update-Failed:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Unable to update address. Please try again."
     *     }
     *
     * @apiSampleRequest /api/address/:id
     */
    @Put('/:id')
    @Authorized(['vendor', 'update-customer-address'])
    public async updateAddress(@Body({ validate: true }) addressParam: CreateAddress, @Param('id') id: number, @Res() response: any): Promise<any> {

        const address: any = await this.addressService.findOne({
            where: {
                addressId: id,
            },
        });
        if (!address) {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to add address. Please try again.',
            };
            return response.status(400).send(errorResponse);
        }
        address.customerId = addressParam.customerId;
        address.firstName = addressParam.firstName;
        address.lastName = addressParam.lastName;
        address.address1 = addressParam.address1;
        address.address2 = addressParam.address2;
        address.city = addressParam.city;
        address.state = addressParam.state;
        address.postcode = addressParam.postcode;
        address.addressType = addressParam.addressType;
        address.countryId = addressParam.countryId;
        address.company = addressParam.company;
        address.zoneId = addressParam.zoneId;
        address.landmark = addressParam.landmark;
        address.phoneNo = addressParam.phoneNumber;

        const addressSave = await this.addressService.create(address);
        if (addressSave) {
            const successResponse: any = {
                status: 1,
                message: 'Your address has been updated.',
                data: addressSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'Unable to update address. Please try again.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    /**
     * @api {get} /api/address Address List
     * @apiGroup Address
     * @apiName AddressList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {Number} [limit]   Number of records to return
     * @apiQuery {Number} [offset]  Pagination offset
     * @apiQuery {Number|Boolean} [count]  If true OR 1, returns only the total count
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Address list loaded successfully!",
     *         "data": {
     *             "data": [
     *                 {
     *                     "addressId": 12,
     *                     "customerId": 3,
     *                     "firstName": "John",
     *                     "lastName": "Doe",
     *                     "address1": "123 Main St",
     *                     "address2": "",
     *                     "city": "New York",
     *                     "state": "NY",
     *                     "postcode": "10001",
     *                     "countryId": 1,
     *                     "addressType": "home",
     *                     "company": null,
     *                     "zoneId": 0,
     *                     "phoneNo": "5551234567",
     *                     "landmark": "Near Central Park"
     *                 }
     *             ],
     *             "count": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 1,
     *         "message": "Unable to update address. Please try again."
     *     }
     *
     * @apiSampleRequest /api/address
     */
    @Get()
    @Authorized(['vendor', 'customer-address-list'])
    public async addressList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const addressList = await this.addressService.list(limit, offset, [], [], [], count);
        if (addressList) {
            const successResponse: any = {
                status: 1,
                message: 'Address list loaded successfully!',
                data: addressList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'Unable to update address. Please try again.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    /**
     * @api {delete} /api/address/:id Delete Address
     * @apiGroup Address
     * @apiName DeleteAddress
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id  Address ID to delete
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "The address has been deleted."
     *     }
     *
     * @apiErrorExample {json} Address-Not-Found:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Oops! That address ID doesn't exist."
     *     }
     *
     * @apiErrorExample {json} Delete-Failed:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Unable to delete the address."
     *     }
     *
     * @apiSampleRequest /api/address/:id
     */
    @Delete('/:id')
    @Authorized(['vendor', 'delete-customer-address'])
    public async deleteAddress(@Param('id') id: number, @Res() response: any): Promise<any> {

        const address = await this.addressService.findOne({
            where: {
                addressId: id,
            },
        });
        if (!address) {
            const errorResponse: any = {
                status: 0,
                message: `Oops! That address ID doesn't exist.`,
            };
            return response.status(400).send(errorResponse);
        }
        const deleteAddress = await this.addressService.delete(address.addressId);
        if (deleteAddress === 1) {
            const successResponse: any = {
                status: 1,
                message: 'The address has been deleted.',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the address.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    /**
     * @api {get} /api/address/:id Get Customer Address by Customer ID
     * @apiGroup Address
     * @apiName GetAddressByCustomerId
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id  Customer ID whose address you want to fetch
     *
     * @apiQuery {Number} [limit]   Number of records to return
     * @apiQuery {Number} [offset]  Pagination offset
     * @apiQuery {Number|Boolean} [count]  If true/1 returns only total count
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully fetched customer address.",
     *         "data": {
     *             "data": [
     *                 {
     *                     "createdDate": "2024-01-10T12:00:00.000Z",
     *                     "modifiedDate": "2024-01-10T12:00:00.000Z",
     *                     "addressId": 15,
     *                     "customerId": 3,
     *                     "countryId": 1,
     *                     "firstName": "John",
     *                     "lastName": "Doe",
     *                     "company": null,
     *                     "address1": "123 Main St",
     *                     "address2": "",
     *                     "postcode": "10001",
     *                     "city": "New York",
     *                     "emailId": "john@example.com",
     *                     "phoneNo": "5551234567",
     *                     "addressType": "home",
     *                     "isActive": 1,
     *                     "landmark": "Near Central Park",
     *                     "isDefault": 1,
     *                     "zoneCode": "NY-Z1",
     *                     "zoneName": "New York Zone 1",
     *                     "zoneId": 22
     *                 }
     *             ],
     *             "count": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Customer-Not-Found:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Customer ID not found."
     *     }
     *
     * @apiSampleRequest /api/address/:id
     */
    @Get('/:id')
    @Authorized('vendor')
    public async getAddress(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {
        const customer = await this.customerService.findOne({ where: { id } });
        if (!customer) {
            const errorResponse: any = {
                status: 0,
                message: 'Customer ID not found.',
            };
            return response.status(400).send(errorResponse);
        }
        const select = [
            'Address.createdDate as createdDate',
            'Address.modifiedDate as modifiedDate',
            'Address.addressId as addressId',
            'Address.customerId as customerId',
            'Address.countryId as countryId',
            'Address.firstName as firstName',
            'Address.lastName as lastName',
            'Address.company as company',
            'Address.address1 as address1',
            'Address.address2 as address2',
            'Address.postcode as postcode',
            'Address.city as city',
            'Address.emailId as emailId',
            'Address.phoneNo as phoneNo',
            'Address.addressType as addressType',
            'Address.isActive as isActive',
            'Address.landmark as landmark',
            'Address.isDefault as isDefault',
            'zone.code as zoneCode',
            'zone.name as zoneName',
            'Address.zoneId as zoneId',
        ];
        const whereConditions = [
            {
                name: 'Address.customerId',
                op: 'where',
                value: id,
            },
        ];
        const relations = [
            {
                tableName: 'Address.zone',
                op: 'left',
                aliasName: 'zone',
            },
        ];
        const customerAddress = await this.addressService.listByQueryBuilder(limit, offset, select, whereConditions, [], relations, [], [], count, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully fetched customer address.',
            data: customerAddress,
        };
        return response.status(200).send(successResponse);
    }
}
