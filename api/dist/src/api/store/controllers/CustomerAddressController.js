"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerAddressController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const AddressService_1 = require("../../core/services/AddressService");
const Address_1 = require("../../core/models/Address");
const CreateAddressRequest_1 = require("./requests/CreateAddressRequest");
const checkTokenMiddleware_1 = require("../../core/middlewares/checkTokenMiddleware");
const LiveAddressService_1 = require("../../core/services/LiveAddressService");
const LiveAddress_1 = require("../../core/models/LiveAddress");
const checkTokenMiddleware_2 = require("../../core/middlewares/checkTokenMiddleware");
const AuthService_1 = require("../../../auth/AuthService");
let CustomerAddressController = class CustomerAddressController {
    constructor(addressService, liveAddresService, authSerivce) {
        this.addressService = addressService;
        this.liveAddresService = liveAddresService;
        this.authSerivce = authSerivce;
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
    createAddress(addressParam, response, request) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (addressParam.addressType === 2) {
                yield this.addressService.find({
                    where: {
                        addressType: addressParam.addressType,
                    },
                }).then((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    for (const data of value) {
                        yield this.addressService.delete(data.addressId);
                    }
                }));
            }
            const newAddress = new Address_1.Address();
            newAddress.customerId = request.user.id;
            newAddress.address1 = addressParam.address1;
            newAddress.address2 = addressParam.address2;
            newAddress.city = addressParam.city;
            newAddress.state = (_a = addressParam.state) !== null && _a !== void 0 ? _a : '';
            newAddress.zoneId = (_b = addressParam.zoneId) !== null && _b !== void 0 ? _b : 0;
            newAddress.countryId = addressParam.countryId;
            newAddress.postcode = addressParam.postcode;
            newAddress.addressType = addressParam.addressType;
            newAddress.company = addressParam.company;
            const addressSave = yield this.addressService.create(newAddress);
            if (addressSave) {
                const successResponse = {
                    status: 1,
                    message: 'Address added',
                    data: addressSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to add address, try again. ',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    deleteAddress(id, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const address = yield this.addressService.findOne({
                where: {
                    addressId: id, customerId: request.user.id,
                },
            });
            if (!address) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid address Id.',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteAddress = yield this.addressService.delete(address);
            if (deleteAddress === 1) {
                const successResponse = {
                    status: 1,
                    message: 'Address deleted',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the address. ',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    getCustomerAddress(limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const WhereConditions = [
                {
                    name: 'customerId',
                    value: request.user.id,
                },
            ];
            const customerAddress = yield this.addressService.list(limit, offset, [], ['zone'], WhereConditions, count);
            const liveAddress = yield this.liveAddresService.findOne({
                where: {
                    customerId: request.user.id,
                },
            });
            const successResponse = {
                status: 1,
                message: 'Successfully Get the customer Address',
                data: { customerAddress, liveAddress },
            };
            return response.status(200).send(successResponse);
        });
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
    updateAddress(addressParam, id, request, response) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const address = yield this.addressService.findOne({
                where: {
                    addressId: id, customerId: request.user.id,
                },
            });
            if (!address) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid addressId',
                };
                return response.status(400).send(errorResponse);
            }
            address.customerId = request.user.id;
            address.address1 = addressParam.address1;
            address.address2 = addressParam.address2;
            address.city = addressParam.city;
            address.state = (_a = addressParam.state) !== null && _a !== void 0 ? _a : '';
            address.zoneId = (_b = addressParam.zoneId) !== null && _b !== void 0 ? _b : 0;
            address.countryId = addressParam.countryId;
            address.postcode = addressParam.postcode;
            address.addressType = addressParam.addressType;
            address.company = addressParam.company;
            const addressSave = yield this.addressService.create(address);
            if (addressSave) {
                const successResponse = {
                    status: 1,
                    message: 'The Customer Detail have been updated Successfully',
                    data: addressSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'Unable to update customer address. ',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // live Address API
    /**
     * @api {post} /api/CustomerAddress/live/ live Address API
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
     *     "status" : "1"
     * }
     * @apiSampleRequest /api/CustomerAddress/live/
     * @apiErrorExample {json} live Address error
     * HTTP/1.1 500 Internal Server Error
     */
    CreateLiveAddress(addressParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userIp = (request.headers['x-forwarded-for'] ||
                request.connection.remoteAddress ||
                request.socket.remoteAddress ||
                request.connection.socket.remoteAddress).split(',')[0];
            const currentUser = request.id === '' ? 0 : request.id;
            const whereCondition = {};
            currentUser ? whereCondition.customerId = currentUser : (whereCondition.ip = userIp,
                whereCondition.customerId = 0);
            yield this.liveAddresService.delete(whereCondition);
            const newAddress = new LiveAddress_1.LiveAddress();
            newAddress.customerId = request.id === '' ? 0 : request.id;
            newAddress.ip = userIp;
            newAddress.address1 = addressParam.address1;
            newAddress.address2 = addressParam.address2;
            newAddress.city = addressParam.city;
            newAddress.state = addressParam.state;
            newAddress.countryId = addressParam.countryId;
            newAddress.postcode = addressParam.postcode;
            newAddress.company = addressParam.company;
            const addressSave = yield this.liveAddresService.create(newAddress);
            return response.status(addressSave ? 200 : 400).send({
                status: addressSave ? 1 : 0,
                message: addressSave ? 'Live Address Successfully Added..!' : 'Unable to Add Live Addres..!',
                data: addressSave ? addressSave : undefined,
            });
        });
    }
    // live Address API
    /**
     * @api {get} /api/CustomerAddress/live/ live-Address API
     * @apiGroup Customer Address
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Got Live Address...!",
     *     "status" : "1"
     * }
     * @apiSampleRequest /api/CustomerAddress/live/
     * @apiErrorExample {json} live Address error
     * HTTP/1.1 500 Internal Server Error
     */
    LiveAddressList(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userIp = (request.headers['x-forwarded-for'] ||
                request.connection.remoteAddress ||
                request.socket.remoteAddress ||
                request.connection.socket.remoteAddress).split(',')[0];
            const liveAddress = yield this.liveAddresService.findOne({
                where: {
                    ip: userIp,
                    customerId: 0,
                },
            });
            return response.status(200).send({
                status: 1,
                message: `${liveAddress ? 'Got' : 'No'} Live Address...!`,
                data: liveAddress,
            });
        });
    }
    // Address Mapping
    /**
     * @api {put} /api/CustomerAddress/live/ live Address API
     * @apiGroup Customer Address
     * @apiHeader {string} Authorized
     * @apiParam (requestBody) {string} customer customer
     * @apiParamExample {json} Input
     * {
     *    "customer": {
     *           "data": {
     *            "token": "string",
     *              "ip": "number"
     *       }
     *    }
     * }
     * HTTP/1.1 200 OK
     * {
     *    "message": "Live Address Mapping Service Called...!",
     *     "status" : "1"
     * }
     * @apiSampleRequest /api/CustomerAddress/live/
     * @apiErrorExample {json} live Address error
     * HTTP/1.1 500 Internal Server Error
     */
    // Map's Live Map Location/Address to Respective Registered Customer
    // API is called Automactically (Axios) when Customer Log's in..!
    //  Mapping Service API
    UpdateLiveAddress(customer, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.authSerivce.decryptToken(customer.data.token);
            const liveAddress = yield this.liveAddresService.findOne({
                where: {
                    ip: customer.data.ip,
                    customerId: 0,
                },
            });
            if (liveAddress && user) {
                liveAddress.customerId = user.id;
                yield this.liveAddresService.delete({ customerId: user.id });
                yield this.liveAddresService.update(liveAddress.id, liveAddress);
            }
            return response.status(200).send({
                status: 1,
                message: `Live Address Mapping Service Called...!`,
            });
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Post)('/add-address'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateAddressRequest_1.CustomerAddress, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerAddressController.prototype, "createAddress", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Delete)('/delete-address/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerAddressController.prototype, "deleteAddress", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Get)('/get-address-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerAddressController.prototype, "getCustomerAddress", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Put)('/update-address/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateAddressRequest_1.CustomerAddress, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerAddressController.prototype, "updateAddress", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_2.CheckTokenMiddleware),
    (0, routing_controllers_1.Post)('/live'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateAddressRequest_1.CustomerAddress, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerAddressController.prototype, "CreateLiveAddress", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/live'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerAddressController.prototype, "LiveAddressList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/live'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerAddressController.prototype, "UpdateLiveAddress", null);
CustomerAddressController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/CustomerAddress'),
    tslib_1.__metadata("design:paramtypes", [AddressService_1.AddressService,
        LiveAddressService_1.LiveAddressService,
        AuthService_1.AuthService])
], CustomerAddressController);
exports.CustomerAddressController = CustomerAddressController;
//# sourceMappingURL=CustomerAddressController.js.map