/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import {
    Post, Body, JsonController, Res, Req, Get, QueryParam, Delete, Param,
    Put,
    UseBefore
} from 'routing-controllers';
import { AddressService } from '../../core/services/AddressService';
import { Address } from '../../core/models/Address';
import { CustomerAddress } from './requests/CreateAddressRequest';
import { CheckCustomerMiddleware } from '../../core/middlewares/checkTokenMiddleware';
@UseBefore(CheckCustomerMiddleware)
@JsonController('/CustomerAddress')
export class CustomerAddressController {
    constructor(private addressService: AddressService) {
    }

    // Create Customer Address
    /**
     * @api {post} /api/CustomerAddress/add-address Add Customer Address API
     * @apiGroup Customer Address
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
     *      "address1" : "",
     *      "address2" : "",
     *      "city" : "",
     *      "state" : "",
     *      "countryId" : "",
     *      "postcode" : "",
     *      "countryId" : "",
     *      "addressType" : "",
     *      "company" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New Address is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/CustomerAddress/add-address
     * @apiErrorExample {json} addAddress error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-address')
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
        const newAddress = new Address();
        newAddress.customerId = request.user.id;
        newAddress.address1 = addressParam.address1;
        newAddress.address2 = addressParam.address2;
        newAddress.city = addressParam.city;
        newAddress.state = addressParam.state;
        newAddress.countryId = addressParam.countryId;
        newAddress.postcode = addressParam.postcode;
        newAddress.addressType = addressParam.addressType;
        newAddress.company = addressParam.company;

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
     * @api {delete} /api/CustomerAddress/delete-address/:id Delete Customer Address API
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
     * @apiSampleRequest /api/CustomerAddress/delete-address/:id
     * @apiErrorExample {json} address error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-address/:id')
    public async deleteAddress(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {

        const address = await this.addressService.findOne({
            where: {
                addressId: id, customerId: request.user.id,
            },
        });
        if (!address) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid address Id.',
            };
            return response.status(400).send(errorResponse);
        }

        const deleteAddress = await this.addressService.delete(address);
        if (deleteAddress === 1) {
            const successResponse: any = {
                status: 1,
                message: 'Address deleted',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the address. ',
            };
            return response.status(400).send(errorResponse);
        }
    }
    //   Get Customer Address List API
    /**
     * @api {get} /api/CustomerAddress/get-address-list Get Customer Address List API
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
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/CustomerAddress/get-address-list
     * @apiErrorExample {json} Address error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/get-address-list')
    public async getCustomerAddress(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const WhereConditions = [
            {
                name: 'customerId',
                value: request.user.id,
            },
        ];
        const customerAddress = await this.addressService.list(limit, offset, WhereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully Get the customer Address',
            data: customerAddress,
        };
        return response.status(200).send(successResponse);
    }

    // Update Customer Address
    /**
     * @api {put} /api/CustomerAddress/update-address/:id Update Customer Address API
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
     *      "address1" : "",
     *      "address2" : "",
     *      "city" : "",
     *      "state" : "",
     *      "postcode" : "",
     *      "countryId" : "",
     *      "addressType" : "",
     *      "company" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated  customer address.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/CustomerAddress/update-address/:id
     * @apiErrorExample {json} Address error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-address/:id')
    public async updateAddress(@Body({ validate: true }) addressParam: CustomerAddress, @Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {

        const address: any = await this.addressService.findOne({
            where: {
                addressId: id, customerId: request.user.id,
            },
        });
        if (!address) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid addressId',
            };
            return response.status(400).send(errorResponse);
        }
        address.customerId = request.user.id;
        address.address1 = addressParam.address1;
        address.address2 = addressParam.address2;
        address.city = addressParam.city;
        address.state = addressParam.state;
        address.countryId = addressParam.countryId;
        address.postcode = addressParam.postcode;
        address.addressType = addressParam.addressType;
        address.company = addressParam.company;
        const addressSave = await this.addressService.create(address);
        if (addressSave) {
            const successResponse: any = {
                status: 1,
                message: 'The Customer Detail have been updated Successfully',
                data: addressSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'Unable to update customer address. ',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
