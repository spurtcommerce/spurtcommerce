"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const AddressService_1 = require("../../core/services/AddressService");
const Address_1 = require("../../core/models/Address");
const CreateAddressRequest_1 = require("./requests/CreateAddressRequest");
const CustomerService_1 = require("../../core/services/CustomerService");
let AddressController = class AddressController {
    constructor(addressService, customerService) {
        this.addressService = addressService;
        this.customerService = customerService;
        // --
    }
    // Create Address
    /**
     * @api {post} /api/address Add Customer Address API
     * @apiGroup Address
     * @apiParam (Request body) {Number} customerId customerId
     * @apiParam (Request body) {String{..128}} address1 address1
     * @apiParam (Request body) {String{..128}} [address2] address2
     * @apiParam (Request body) {String{..128}} city city
     * @apiParam (Request body) {String} state state
     * @apiParam (Request body) {Number{..10}} postcode postcode
     * @apiParam (Request body) {Number} addressType addressType
     * @apiParam (Request body) {Number} countryId countryId
     * @apiParam (Request body) {String{..32}} [company] company
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "customerId" : "",
     *      "address1" : "",
     *      "address2" : "",
     *      "city" : "",
     *      "state" : "",
     *      "postcode" : "",
     *      "addressType" : "",
     *      "countryId" : "",
     *      "company" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New Address is created successfully",
     *      "status": "1",
     *      "data": "{
     *                "createdBy": 1,
     *                "createdDate": "2024-08-05T07:24:42.000Z",
     *                "modifiedBy": 1,
     *                "modifiedDate": "2024-09-05T07:24:42.000Z",
     *                "addressId": 207,
     *                "customerId": 153,
     *                "countryId": 99,
     *                "zoneId": 76,
     *                "firstName": "Balabathra",
     *                "lastName": "Sankar",
     *                "company": "",
     *                "address1": "24, Gandhi Street",
     *                "address2": "Ruby Aoppartment",
     *                "postcode": "600046",
     *                "city": "Chennai",
     *                "state": "",
     *                "emailId": "",
     *                "phoneNo": "9898765476",
     *                "addressType": 0,
     *                "isActive": 1,
     *                "landmark": "",
     *                "isDefault": 1
     *              }"
     * }
     * @apiSampleRequest /api/address
     * @apiErrorExample {json} addAddress error
     * HTTP/1.1 500 Internal Server Error
     */
    createAddress(addressParam, response) {
        var _a, _b, _c, _d;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerService.findOne({
                where: {
                    id: addressParam.customerId,
                },
            });
            if (!customer) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid customerId, try again',
                };
                return response.status(400).send(errorResponse);
            }
            const newAddress = new Address_1.Address();
            newAddress.customerId = addressParam.customerId;
            newAddress.firstName = (_a = addressParam.firstName) !== null && _a !== void 0 ? _a : customer.firstName;
            newAddress.lastName = (_b = addressParam.lastName) !== null && _b !== void 0 ? _b : customer.lastName;
            newAddress.address1 = addressParam.address1;
            newAddress.address2 = addressParam.address2;
            newAddress.city = addressParam.city;
            newAddress.state = (_c = addressParam.state) !== null && _c !== void 0 ? _c : '';
            newAddress.postcode = addressParam.postcode;
            newAddress.addressType = addressParam.addressType;
            newAddress.countryId = addressParam.countryId;
            newAddress.company = addressParam.company;
            newAddress.zoneId = (_d = addressParam.zoneId) !== null && _d !== void 0 ? _d : 0;
            newAddress.phoneNo = addressParam.phoneNumber;
            newAddress.landmark = addressParam.landmark;
            const addressSave = yield this.addressService.create(newAddress);
            if (addressSave) {
                const successResponse = {
                    status: 1,
                    message: 'Address added sucessfully',
                    data: addressSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create address,try again',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Update Address
    /**
     * @api {put} /api/address/:id Update Address API
     * @apiGroup Address
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} customerId customerId
     * @apiParam (Request body) {String{..128}} address1 address1
     * @apiParam (Request body) {String{..128}} [address2] address2
     * @apiParam (Request body) {String{..128}} city city
     * @apiParam (Request body) {String{..128}} state state
     * @apiParam (Request body) {Number{..10}} postcode postcode
     * @apiParam (Request body) {Number} addressType addressType
     * @apiParam (Request body) {Number} countryId countryId
     * @apiParam (Request body) {String{..32}} [company] company
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "customerId" : "",
     *      "address1" : "",
     *      "address2" : "",
     *      "city" : "",
     *      "state" : "",
     *      "postcode" : "",
     *      "addressType" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated address.",
     *      "status": "1",
     *      "data": "{
     *                "createdBy": 1,
     *                "createdDate": "2024-08-05T07:24:42.000Z",
     *                "modifiedBy": 1,
     *                "modifiedDate": "2024-09-05T07:24:42.000Z",
     *                "addressId": 207,
     *                "customerId": 153,
     *                "countryId": 99,
     *                "zoneId": 76,
     *                "firstName": "Balabathra",
     *                "lastName": "Sankar",
     *                "company": "",
     *                "address1": "24, Gandhi Street",
     *                "address2": "Ruby Aoppartment",
     *                "postcode": "600046",
     *                "city": "Chennai",
     *                "state": "",
     *                "emailId": "",
     *                "phoneNo": "9898765476",
     *                "addressType": 0,
     *                "isActive": 1,
     *                "landmark": "",
     *                "isDefault": 1
     *              }"
     * }
     * @apiSampleRequest /api/address/:id
     * @apiErrorExample {json} Address error
     * HTTP/1.1 500 Internal Server Error
     */
    updateAddress(addressParam, id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const address = yield this.addressService.findOne({
                where: {
                    addressId: id,
                },
            });
            if (!address) {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to edit address,try again',
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
            const addressSave = yield this.addressService.create(address);
            if (addressSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated address',
                    data: addressSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'Unable to update the address',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Address List
    /**
     * @api {get} /api/address Address List API
     * @apiGroup Address
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get address list",
     *      "data":"[{
     *                "createdBy": 1,
     *                "createdDate": "2024-08-05T07:24:42.000Z",
     *                "modifiedBy": 1,
     *                "modifiedDate": "2024-09-05T07:24:42.000Z",
     *                "addressId": 207,
     *                "customerId": 153,
     *                "countryId": 99,
     *                "zoneId": 76,
     *                "firstName": "Balabathra",
     *                "lastName": "Sankar",
     *                "company": "",
     *                "address1": "24, Gandhi Street",
     *                "address2": "Ruby Aoppartment",
     *                "postcode": "600046",
     *                "city": "Chennai",
     *                "state": "",
     *                "emailId": "",
     *                "phoneNo": "9898765476",
     *                "addressType": 0,
     *                "isActive": 1,
     *                "landmark": "",
     *                "isDefault": 1
     *              }]"
     * }
     * @apiSampleRequest /api/address
     * @apiErrorExample {json} Address error
     * HTTP/1.1 500 Internal Server Error
     */
    addressList(limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const WhereConditions = [];
            const addressList = yield this.addressService.list(limit, offset, [], [], WhereConditions, count);
            if (addressList) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got complete address list',
                    data: addressList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'Unable to get the address list',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Delete Address
    /**
     * @api {delete} /api/address/:id Delete Address API
     * @apiGroup Address
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
     * @apiSampleRequest /api/address/:id
     * @apiErrorExample {json} address error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteAddress(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const address = yield this.addressService.findOne({
                where: {
                    addressId: id,
                },
            });
            if (!address) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid address Id',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteAddress = yield this.addressService.delete(address);
            if (deleteAddress === 1) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted address',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the address',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    //   Get Customer Address API
    /**
     * @api {get} /api/address/:id Get Customer Address  API
     * @apiGroup Address
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
     *      "status": "1"
     *      "message": "Successfully get customer address list",
     *      "data":"[{
     *                "createdBy": "",
     *                "createdDate": "2024-03-19T09:48:17.000Z",
     *                "modifiedBy": "",
     *                "modifiedDate": "2024-03-19T09:48:28.000Z",
     *                "addressId": 1,
     *                "customerId": 1,
     *                "countryId": 99,
     *                "zoneId": 76,
     *                "firstName": "",
     *                "lastName": "",
     *                "company": "Aditya",
     *                "address1": "tambaram",
     *                "address2": "chennai",
     *                "postcode": "636111",
     *                "city": "chrompet",
     *                "state": "",
     *                "emailId": "",
     *                "phoneNo": "",
     *                "addressType": 0,
     *                "isActive": "",
     *                "landmark": "",
     *                "isDefault": 0,
     *                "zone": {
     *                  "createdBy": "",
     *                  "createdDate": "2019-06-14T01:35:20.000Z",
     *                  "modifiedBy": "",
     *                  "modifiedDate": "",
     *                  "zoneId": 76,
     *                  "countryId": 99,
     *                  "code": "TN",
     *                  "name": "Tamil Nadu",
     *                  "isActive": 1
     *                }
     *              }]"
     * }
     * @apiSampleRequest /api/address/:id
     * @apiErrorExample {json} Address error
     * HTTP/1.1 500 Internal Server Error
     */
    getAddress(limit, offset, count, id, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerService.findOne({ where: { id } });
            if (customer.length === 0) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid customer Id',
                };
                return response.status(400).send(errorResponse);
            }
            const WhereConditions = [
                {
                    name: 'customerId',
                    value: id,
                },
            ];
            const relations = ['zone'];
            const customerAddress = yield this.addressService.list(limit, offset, [], relations, WhereConditions, count);
            const successResponse = {
                status: 1,
                message: 'Successfully got the customer address',
                data: customerAddress,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(['admin', 'add-customer-address']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateAddressRequest_1.CreateAddress, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AddressController.prototype, "createAddress", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'update-customer-address']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateAddressRequest_1.CreateAddress, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AddressController.prototype, "updateAddress", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(['admin', 'customer-address-list']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AddressController.prototype, "addressList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-customer-address']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AddressController.prototype, "deleteAddress", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AddressController.prototype, "getAddress", null);
AddressController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/address'),
    tslib_1.__metadata("design:paramtypes", [AddressService_1.AddressService,
        CustomerService_1.CustomerService])
], AddressController);
exports.AddressController = AddressController;
//# sourceMappingURL=AddressController.js.map