/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Post, Body, JsonController, Res, Req, Get, QueryParam, Delete, Param, Put, UseBefore, BodyParam, Authorized } from 'routing-controllers';
import { Response as ExpressResponse } from 'express';
import { AddressService } from '../../core/services/AddressService';
import { Address } from '../../core/models/Address';
import { CustomerAddress } from './requests/CreateAddressRequest';
import { CheckCustomerMiddleware, CheckTokenMiddleware } from '../../core/middlewares/checkTokenMiddleware';
import { LiveAddressService } from '../../core/services/LiveAddressService';
import { LiveAddress } from '../../core/models/LiveAddress';
import { AuthService } from '../../../auth/AuthService';
import { Service } from 'typedi';
import { VendorCountryService } from '../../core/services/VendorCountryService';

@Service()
@JsonController('/customer-address')
export class CustomerAddressController {
    constructor(
        private addressService: AddressService,
        private liveAddresService: LiveAddressService,
        private authSerivce: AuthService,
        private vendorCountryService: VendorCountryService
    ) {
    }

    // Create Customer Address
    /**
     * @api {post} /api/customer-address Add Customer Address API
     * @apiGroup Customer Address
     * @apiParam (Request body) {String{..128}} firstName firstName
     * @apiParam (Request body) {String{..128}} lastName lastName
     * @apiParam (Request body) {String{..128}} address1 address1
     * @apiParam (Request body) {String{..128}} [address2] address2
     * @apiParam (Request body) {String{..128}} city city
     * @apiParam (Request body) {String{..128}} state state
     * @apiParam (Request body) {Number{..6}} postcode postcode
     * @apiParam (Request body) {Number} countryId countryId
     * @apiParam (Request body) {Number} addressType addressType
     * @apiParam (Request body) {String{..128}} phoneNumber phoneNumber
     * @apiParam (Request body) {String{..32}} [company] company
     * @apiParam (Request body) {Number} isDefault isDefault
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "firstName": "",
     *      "lastName": "",
     *      "address1" : "",
     *      "address2" : "",
     *      "city" : "",
     *      "state" : "",
     *      "countryId" : "",
     *      "postcode" : "",
     *      "countryId" : "",
     *      "addressType" : "",
     *      "company" : "",
     *      "landmark": "",
     *      "phoneNumber": "",
     *      "isDefault": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New Address is created successfully",
     *      "status": "1"
     *      "data": {
     *              "createdBy": "",
     *              "createdDate": "",
     *              "modifiedBy": "",
     *              "modifiedDate": "",
     *              "addressId": 1,
     *              "customerId": 1,
     *              "countryId": 99,
     *              "firstName": "",
     *              "lastName": "",
     *              "company": "",
     *              "address1": "",
     *              "address2": "",
     *              "postcode": "",
     *              "city": "",
     *              "state": "",
     *              "emailId": "",
     *              "addressType": "",
     *              "isActive": 1,
     *              "landmark": "",
     *              "isDefault": ""
     *              }
     * }
     * @apiSampleRequest /api/customer-address
     * @apiErrorExample {json} addAddress error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(CheckCustomerMiddleware)
    @Post()
    @Authorized(['customer', 'create-customer-address'])
    public async createAddress(@Body({ validate: true }) addressParam: CustomerAddress, @Res() response: any, @Req() request: any): Promise<any> {
        if (addressParam.addressType === 2) {
            await this.addressService.find({
                where: {
                    addressType: addressParam.addressType,
                },
            }).then(async (value) => {
                for (const data of value) {
                    await this.addressService.delete(data.addressId);
                }
            });
        }
        if (addressParam.isDefault === 1) {
            const defaultAddress = await this.addressService.findOne({
                where: {
                    customerId: request.user.customerId, isDefault: 1, addressType: addressParam.addressType,
                },
            });
            if (defaultAddress?.addressType === addressParam.addressType) {
                defaultAddress.isDefault = 0;
                await this.addressService.create(defaultAddress);
            }
        }
        const newAddress = new Address();
        newAddress.firstName = addressParam.firstName ?? request.user?.firstName ?? '';
        newAddress.lastName = addressParam.lastName ?? request.user?.lastName ?? '';
        newAddress.customerId = request.user.customerId;
        newAddress.address1 = addressParam.address1;
        newAddress.address2 = addressParam.address2;
        newAddress.city = addressParam.city;
        newAddress.state = addressParam.state ?? '';
        newAddress.zoneId = addressParam.zoneId ?? 0;
        newAddress.countryId = addressParam.countryId;
        newAddress.postcode = addressParam.postcode;
        // 0 > delivery address 1 > billing address
        newAddress.addressType = addressParam.addressType;
        newAddress.company = addressParam.company ?? '';
        newAddress.landmark = addressParam.landmark;
        newAddress.phoneNo = addressParam.phoneNumber;
        newAddress.isDefault = addressParam.isDefault;
        newAddress.createdBy = request.user.id;

        const addressSave = await this.addressService.create(newAddress);
        if (addressSave) {
            const successResponse: any = {
                status: 1,
                message: 'Address added',
                data: addressSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to add address, try again. ',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Delete Customer Address
    /**
     * @api {delete} /api/customer-address/:id Delete Customer Address API
     * @apiGroup Customer Address
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "addressId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted address.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer-address/:id
     * @apiErrorExample {json} address error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(CheckCustomerMiddleware)
    @Delete('/:id')
    @Authorized(['customer', 'delete-customer-address'])
    public async deleteAddress(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {

        const address = await this.addressService.findOne({
            where: {
                addressId: id, customerId: request.user.customerId,
            },
        });
        if (!address) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid address ID.',
            };
            return response.status(400).send(errorResponse);
        }

        const deleteAddress = await this.addressService.delete(address.addressId);
        if (deleteAddress === 1) {
            const successResponse: any = {
                status: 1,
                message: 'Address deleted',
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
    //   Get Customer Address List API
    /**
     * @api {get} /api/customer-address Get Customer Address List API
     * @apiGroup Customer Address
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} count count
     * @apiParamExample {json} Input
     * {
     *      "customerId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get customer address list",
     *      "data": {
     *      "customerAddress": [
     *       {
     *           "createdBy": "",
     *           "createdDate": "",
     *           "modifiedBy": "",
     *           "modifiedDate": "",
     *           "addressId": 1,
     *           "customerId": 1,
     *           "countryId": 99,
     *           "zoneId": 1,
     *           "firstName": "",
     *           "lastName": "",
     *           "company": "",
     *           "address1": "",
     *           "address2": "",
     *           "postcode": "",
     *           "city": "",
     *           "state": "",
     *           "emailId": "",
     *           "phoneNo": "",
     *           "addressType": ,
     *           "isActive": "",
     *           "landmark": "",
     *           "isDefault": "",
     *           "zone": {
     *               "createdBy": "",
     *               "createdDate": "",
     *               "modifiedBy": "",
     *               "modifiedDate": "",
     *               "zoneId": 1,
     *               "countryId": 99,
     *               "code": "",
     *               "name": "",
     *               "isActive": 1
     *           }
     *       },
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer-address
     * @apiErrorExample {json} Address error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(CheckCustomerMiddleware)
    @Get()
    @Authorized(['customer', 'view-customer-address'])
    public async getCustomerAddress(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('type') addressType: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const whereConditions = [
            {
                name: 'customerId',
                op: 'where',
                value: request.user.customerId,
            },
        ];
        if (addressType === 0 || addressType === 1) {
            whereConditions.push(
                {
                    name: 'addressType',
                    op: 'and',
                    value: addressType,
                }
            );
        }
        const customerAddress = await this.addressService.list(limit, offset, [], ['zone'], whereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully Get the customer Address',
            data: { customerAddress },
        };
        return response.status(200).send(successResponse);
    }

    //   Get Customer Address Detail API
    /**
     * @api {get} /api/customer-address/:id Get Customer Address List API
     * @apiGroup Customer Address
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get customer address Detail.",
     *      "data": {
     *              "createdBy": "",
     *              "createdDate": "",
     *              "modifiedBy": "",
     *              "modifiedDate": "",
     *              "addressId": "",
     *              "customerId": "",
     *              "countryId": "",
     *              "zoneId": "",
     *              "firstName": "",
     *              "lastName": "",
     *              "company": "",
     *              "address1": "",
     *              "address2": "",
     *              "postcode": "",
     *              "city": "",
     *              "state": "",
     *              "emailId": "",
     *              "phoneNo": "",
     *              "addressType": "",
     *              "isActive": "",
     *              "landmark": "",
     *              "isDefault": ""
     *              }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer-address/:id
     * @apiErrorExample {json} Address error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(CheckCustomerMiddleware)
    @Get('/:id')
    @Authorized(['customer', 'view-customer-address'])
    public async addressDetail(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {
        const address: any = await this.addressService.findOne({
            where: {
                addressId: id, customerId: request.user.customerId,
            },
        });
        if (!address) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid address ID.',
            };
            return response.status(400).send(errorResponse);
        }
        const vendorCountryData = await this.vendorCountryService.findOne({
            where: {
                id: address.countryId,
            },
        });
        address.countryData = vendorCountryData;
        return response.status(200).send({
            status: 1,
            message: 'Successfully get the address detail.',
            data: address,
        });
    }
    // Update Customer Address
    /**
     * @api {put} /api/customer-address/:id Update Customer Address API
     * @apiGroup Customer Address
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..128}} address1 address1
     * @apiParam (Request body) {String{..128}} [address2] address2
     * @apiParam (Request body) {String{..128}} city city
     * @apiParam (Request body) {String{..128}} state state
     * @apiParam (Request body) {Number{..6}} postcode postcode
     * @apiParam (Request body) {Number} countryId countryId
     * @apiParam (Request body) {Number} addressType addressType
     * @apiParam (Request body) {String{..32}} [company] company
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "firstName": "",
     *      "lastName": "",
     *      "customerId": "",
     *      "zoneId": "",
     *      "countryId": ""
     *      "address1" : "",
     *      "address2" : "",
     *      "city" : "",
     *      "state" : "",
     *      "postcode" : "",
     *      "countryId" : "",
     *      "addressType" : "",
     *      "company" : "",
     *      "phoneNumber": "",
     *      "isDefault": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated  customer address.",
     *      "status": "1"
     *      "data": {
     *              "createdBy": "",
     *              "createdDate": "",
     *              "modifiedBy": "",
     *              "modifiedDate": "",
     *              "addressId": ,
     *              "customerId": ,
     *              "countryId": ,
     *              "firstName": "",
     *              "lastName": "",
     *              "company": "",
     *              "address1": "",
     *              "address2": "",
     *              "postcode": "",
     *              "city": "",
     *              "state": "",
     *              "emailId": ,
     *              "addressType": ,
     *              "isActive": ,
     *              "landmark": "",
     *              "isDefault":""
     *              }
     * }
     * @apiSampleRequest /api/customer-address/:id
     * @apiErrorExample {json} Address error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(CheckCustomerMiddleware)
    @Put('/:id')
    @Authorized(['customer', 'edit-customer-address'])
    public async updateAddress(@Body({ validate: true }) addressParam: CustomerAddress, @Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {

        const address: any = await this.addressService.findOne({
            where: {
                addressId: id, customerId: request.user.customerId,
            },
        });
        if (!address) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid address ID.',
            };
            return response.status(400).send(errorResponse);
        }
        if (addressParam.isDefault === 1) {
            const defaultAddress = await this.addressService.findOne({
                where: {
                    customerId: request.user.customerId, isDefault: 1, addressType: addressParam.addressType,
                },
            });
            if (defaultAddress?.addressType === addressParam.addressType) {
                defaultAddress.isDefault = 0;
                await this.addressService.create(defaultAddress);
            }
        }
        address.firstName = addressParam.firstName;
        address.lastName = addressParam.lastName;
        address.customerId = request.user.customerId;
        address.address1 = addressParam.address1;
        address.address2 = addressParam.address2;
        address.city = addressParam.city;
        address.state = addressParam.state ?? '';
        address.zoneId = addressParam.zoneId;
        address.countryId = addressParam.countryId;
        address.postcode = addressParam.postcode;
        address.addressType = addressParam.addressType;
        address.company = addressParam.company;
        address.landmark = addressParam.landmark;
        address.phoneNo = addressParam.phoneNumber;
        address.isDefault = addressParam.isDefault;
        address.modifiedBy = request.user.id;
        const addressSave = await this.addressService.create(address);
        if (addressSave) {
            const successResponse: any = {
                status: 1,
                message: 'The customer detail have been updated Successfully.',
                data: addressSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'Unable to update customer address.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Update Customer Default Address
    /**
     * @api {put} /api/customer-address/update-default/:id Update Customer Default Address API
     * @apiGroup Customer Address
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} addressType addressType
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "addressType": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Default Adress updated Successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer-address/update-default/:id
     * @apiErrorExample {json} Address error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(CheckCustomerMiddleware)
    @Put('/update-default/:id')
    @Authorized(['customer', 'edit-customer-address'])
    public async updateDefaultAddress(@Param('id') id: number, @BodyParam('addressType') addressType: number, @Res() response: any, @Req() request: any): Promise<any> {
        const address: any = await this.addressService.findOne({
            where: {
                addressId: id, customerId: request.user.customerId,
            },
        });
        if (!address) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid address ID',
            };
            return response.status(400).send(errorResponse);
        }
        const defaultAddress = await this.addressService.findOne({
            where: {
                customerId: request.user.customerId, isDefault: 1, addressType,
            },
        });
        if (defaultAddress?.addressType === addressType) {
            defaultAddress.isDefault = 0;
            await this.addressService.create(defaultAddress);
        }
        address.isDefault = 1;
        await this.addressService.create(address);
        const successResponse: any = {
            status: 1,
            message: 'Default address updated Successfully.',
        };
        return response.status(200).send(successResponse);

    }
    // live Address API
    /**
     * @api {post} /api/customer-address/live/ live Address API
     * @apiGroup Customer Address
     * @apiHeader {string} Authorized
     * @apiParam (requestBody) {string} address1 address1
     * @apiParam (requestBody) {string} address2 address2
     * @apiParam (requestBody) {string} city city
     * @apiParam (requestBody) {string} state state
     * @apiParam (requestBody) {Number} postcode postcode
     * @apiParam (requestBody) {Number} countryId countryId
     * @apiParam (requestBody) {string} company company
     * @apiParam (requestBody) {Number} addressType addressType
     * @apiParamExample {json} Input
     * {
     *           "address1": "",
     *            "address2": "",
     *             "city":"",
     *             "state":"",
     *             "postcode":"",
     *             "countryId":"",
     *             "company":""
     *             "addressType":
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Live Address Successfully Added..!",
     *    "status" : "1",
     *    "data" : {
     *              "userIp": "",
     *              "address1": "",
     *              "address2": "",
     *              "city": "",
     *              "state": "",
     *              "countryId": "",
     *              "postCode": "",
     *              "company": "",
     *              "isActive": "",
     *              "createdBy": "",
     *              "createdDate": ""
     *              }
     * }
     * @apiSampleRequest /api/customer-address/live/
     * @apiErrorExample {json} live Address error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(CheckTokenMiddleware)
    @Post('/live')
    public async CreateLiveAddress(@Body({ validate: true }) addressParam: CustomerAddress, @Req() request: any, @Res() response: ExpressResponse): Promise<ExpressResponse> {

        const userIp = (
            request.headers['x-forwarded-for'] ||
            request.connection.remoteAddress ||
            request.socket.remoteAddress ||
            request.connection.socket.remoteAddress
        ).split(',')[0];

        const currentUser = request.id === '' ? 0 : request.id;

        const whereConditions = {} as {
            ip: string;
            customerId: number;
        };

        currentUser ? whereConditions.customerId = currentUser : (
            whereConditions.ip = userIp,
            whereConditions.customerId = 0
        );

        await this.liveAddresService.delete(whereConditions);

        const newAddress = new LiveAddress();
        newAddress.customerId = request.id === '' ? 0 : request.id;
        newAddress.ip = userIp;
        newAddress.address1 = addressParam.address1;
        newAddress.address2 = addressParam.address2;
        newAddress.city = addressParam.city;
        newAddress.state = addressParam.state;
        newAddress.countryId = addressParam.countryId;
        newAddress.postcode = addressParam.postcode;
        newAddress.company = addressParam.company ?? '';

        const addressSave = await this.liveAddresService.create(newAddress);
        return response.status(addressSave ? 200 : 400).send({
            status: addressSave ? 1 : 0,
            message: addressSave ? 'Live Address Successfully Added' : 'Unable to Add Live Addres',
            data: addressSave ? addressSave : undefined,
        });
    }

    // Live Address API
    /**
     * @api {get} /api/customer-address/live/address live-Address API
     * @apiGroup Customer Address
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Got Live Address...!",
     *     "status" : "1"
     * }
     * @apiSampleRequest /api/customer-address/live/address
     * @apiErrorExample {json} live Address error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/live/address')
    public async LiveAddressList(@Req() request: any, @Res() response: ExpressResponse): Promise<any> {
        const userIp = (
            request.headers['x-forwarded-for'] ||
            request.connection.remoteAddress ||
            request.socket.remoteAddress ||
            request.connection.socket.remoteAddress
        ).split(',')[0];

        const liveAddress = await this.liveAddresService.findOne({
            where: {
                ip: userIp,
                customerId: 0,
            },
        });

        return response.status(200).send({
            status: 1,
            message: `${liveAddress ? 'Got' : 'No'} Live Address`,
            data: liveAddress,
        });
    }
    // Address Mapping
    /**
     * @api {put} /api/customer-address/live/address live Address API
     * @apiGroup Customer Address
     * @apiHeader {string} Authorized
     * @apiParam (requestBody) {string} customer customer
     * @apiParamExample {json} Input
     * {
     *    "customer": {
     *           "data": {
     *            "token": "",
     *              "ip": ""
     *       }
     *    }
     * }
     * HTTP/1.1 200 OK
     * {
     *    "message": "Live Address Mapping Service Called...!",
     *     "status" : "1"
     * }
     * @apiSampleRequest /api/customer-address/live/address
     * @apiErrorExample {json} live Address error
     * HTTP/1.1 500 Internal Server Error
     */
    // Map's Live Map Location/Address to Respective Registered Customer
    // API is called Automactically (Axios) when Customer Log's in..!
    //  Mapping Service API
    @Put('/live/address')
    public async UpdateLiveAddress(@Body({ validate: true }) customer: { data: { token: string, ip: number } }, @Res() response: ExpressResponse): Promise<ExpressResponse> {
        const customerParam = customer.data;
        const user = await this.authSerivce.decryptToken(customerParam.token);
        const liveAddress: LiveAddress = await this.liveAddresService.findOne({
            where: {
                ip: customerParam.ip,
                customerId: 0,
            },
        });
        if (liveAddress && user) {
            liveAddress.customerId = user.id;
            await this.liveAddresService.delete({ customerId: user.id });
            await this.liveAddresService.update(liveAddress.id, liveAddress);
        }
        return response.status(200).send({
            status: 1,
            message: 'Live address mapping service called.',
        });
    }
}
