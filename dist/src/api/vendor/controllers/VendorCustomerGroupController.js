"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorCustomerGroupController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const CustomerGroup_1 = require("../../../../src/api/core/models/CustomerGroup");
const CreateCustomerGroupRequest_1 = require("./requests/CreateCustomerGroupRequest");
const CustomerGroupService_1 = require("../../../../src/api/core/services/CustomerGroupService");
const typeorm_1 = require("typeorm");
const CustomerToGroup_1 = require("../../../../src/api/core/models/CustomerToGroup");
const CustomerToGroupService_1 = require("../../../../src/api/core/services/CustomerToGroupService");
const CustomerService_1 = require("../../../../src/api/core/services/CustomerService");
let VendorCustomerGroupController = class VendorCustomerGroupController {
    constructor(customerGroupService, customerToGroupService, customerService) {
        this.customerGroupService = customerGroupService;
        this.customerToGroupService = customerToGroupService;
        this.customerService = customerService;
        // --
    }
    // BuyerGroupList API
    /**
     * @api {Get} /api/vendor-customer-group BuyerGroupList API
     * @apiGroup VendorCustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} groupName groupName
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully got customer List..!",
     *    "data": [
     *       {
     *       "createdBy": 1,
     *       "createdDate": "",
     *       "modifiedBy": 1,
     *       "modifiedDate": "",
     *       "id": 1,
     *       "name": "",
     *       "description": "",
     *       "colorCode": "",
     *       "vendorId": 1,
     *       "isActive": 1,
     *       "isDelete": 0,
     *       "isMapped": 1
     *       }
     *    ]
     * }
     * @apiSampleRequest  /api/vendor-customer-group
     * @apiErrorExample {json} BuyerGroupList error
     * HTTP/1.1 500 Internal Server Error
     */
    BuyerGroupList(limit, offset, keyword, groupName, status, count, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const whereConditions = [
                {
                    op: 'where',
                    name: 'CustomerGroup.isDelete',
                    value: 0,
                },
                {
                    op: 'and',
                    name: 'CustomerGroup.vendorId',
                    value: request.user.vendorId,
                },
            ];
            const searchCondition = [];
            if (status === 0 || status === 1) {
                whereConditions.push({
                    op: 'and',
                    name: 'CustomerGroup.isActive',
                    value: status,
                });
            }
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                searchCondition.push({
                    name: ['CustomerGroup.name'],
                    value: keyword,
                });
            }
            if (groupName === null || groupName === void 0 ? void 0 : groupName.trim()) {
                searchCondition.push({
                    name: ['CustomerGroup.name'],
                    value: groupName,
                });
            }
            const sort = [{
                    name: 'CustomerGroup.createdDate',
                    order: 'DESC',
                }];
            const customerGroupList = yield this.customerGroupService.listByQueryBuilder(limit, offset, [], whereConditions, searchCondition, [], [], sort, count, false);
            if (count) {
                return response.status(200).send({
                    status: 1,
                    message: `Successfully got customer group count`,
                    data: customerGroupList,
                });
            }
            const buyerGroupDetail = yield this.customerToGroupService.find({ where: { customerGroupId: (0, typeorm_1.In)(customerGroupList.flatMap((list) => list.id)) } });
            yield Promise.all(customerGroupList.map((customerGroup) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const mapedValue = buyerGroupDetail.filter((details) => details.customerGroupId === customerGroup.id);
                customerGroup.isMapped = (mapedValue.length > 0) ? 1 : 0;
                const buyer = yield this.customerToGroupService.find({ where: { customerGroupId: customerGroup.id } });
                customerGroup.buyerCount = buyer.length;
            })));
            return response.status(200).send({
                status: 1,
                message: `Successfully got customer list`,
                data: customerGroupList,
            });
        });
    }
    // CreateBuyerGroup API
    /**
     * @api {Post} /api/vendor-customer-group CreateBuyerGroup API
     * @apiGroup VendorCustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {string} name name
     * @apiParam (Request body) {string} description description
     * @apiParam (Request body) {string} colorCode colorCode
     * @apiParam (Request body) {number} status status
     * @apiParamExample {json} Input
     * {
     *  "name": "",
     *  "description": "",
     *  "colorCode": "",
     *  "status": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "status": 1,
     *  "message": "Successfully Created Customer Group..!",
     *   "data": {
     *   "name": "",
     *   "description": "",
     *   "colorCode": "",
     *   "vendorId": 1,
     *   "isDelete": 1,
     *   "isActive": 1,
     *   "createdDate": "",
     *   "id": 1
     *    }
     * }
     * @apiSampleRequest  /api/vendor-customer-group
     * @apiErrorExample {json} createBuyerGroup error
     * HTTP/1.1 500 Internal Server Error
     */
    createBuyerGroup(bodyParam, request, response) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customerGroup = new CustomerGroup_1.CustomerGroup();
            customerGroup.name = bodyParam.name.trim();
            customerGroup.description = (_a = bodyParam.description) !== null && _a !== void 0 ? _a : '';
            customerGroup.colorCode = (_b = bodyParam.colorCode) !== null && _b !== void 0 ? _b : '';
            customerGroup.vendorId = request.user.vendorId;
            customerGroup.isDelete = 0;
            customerGroup.isActive = 1;
            const customerGroupSave = yield this.customerGroupService.create(customerGroup);
            return response.status(200).send({
                status: 1,
                message: `Successfully created customer group`,
                data: customerGroupSave,
            });
        });
    }
    // UpdateBuyerGroup API
    /**
     * @api {Put} /api/vendor-customer-group/:id/customer UpdateBuyerGroupCustomer API
     * @apiGroup VendorCustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} customerIds id
     * @apiParamExample {json} Input
     * {
     *   "customerIds": []
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "status": 1,
     *  "message": "Successfully Updated Buyer Groups..!",
     *   "data": {
     *   "createdBy": "1,
     *   "createdDate": "",
     *   "modifiedBy": 1,
     *   "modifiedDate": "",
     *   "id": 1,
     *   "name": "",
     *   "description": "",
     *   "colorCode": "",
     *   "vendorId": 1,
     *   "isDelete": 0
     *    }
     * }
     * @apiSampleRequest  /api/vendor-customer-group/:id/customer
     * @apiErrorExample {json} addBuyerUser error
     * HTTP/1.1 500 Internal Server Error
     */
    addBuyerUser(customerGroupId, customerIds, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customerGroupValid = yield this.customerGroupService.findOne({
                where: {
                    id: customerGroupId,
                    vendorId: request.user.vendorId,
                },
            });
            if (!customerGroupValid) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid customer group id`,
                });
            }
            yield this.customerToGroupService.delete({ customerGroupId });
            const updateBuyerGroup = customerIds.forEach((customerId) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const customerGroup = new CustomerToGroup_1.CustomerToGroup();
                customerGroup.customerId = customerId;
                customerGroup.customerGroupId = customerGroupId;
                yield this.customerToGroupService.create(customerGroup);
            }));
            return response.status(200).send({
                status: 1,
                message: `Successfully updated customer groups`,
                data: updateBuyerGroup,
            });
        });
    }
    // BuyerGroupDetails API
    /**
     * @api {Get} /api/vendor-customer-group/:id BuyerGroupDetails API
     * @apiGroup VendorCustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "status": 1,
     *  "message": "Successfully Get Customer Groups Detail..!",
     *  "data": {
     *   "createdBy": 1
     *   "createdDate": "",
     *   "modifiedBy": "",
     *   "modifiedDate": 1,
     *   "id": 1,
     *   "name": "",
     *   "description": "",
     *   "colorCode": "",
     *   "vendorId": 1,
     *   "isActive": 1,
     *   "isDelete": 1
     *    }
     * }
     * @apiSampleRequest  /api/vendor-customer-group/:id
     * @apiErrorExample {json} groupDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    groupDetail(customerGroupId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customerGroup = yield this.customerGroupService.findOne({
                where: {
                    id: customerGroupId,
                    vendorId: request.user.vendorId,
                },
            });
            if (!customerGroup) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid group id for customer`,
                });
            }
            return response.status(200).send({
                status: 1,
                message: `Successfully got customer groups detail`,
                data: customerGroup,
            });
        });
    }
    // UpdateBuyerGroup API
    /**
     * @api {Put} /api/vendor-customer-group/:id UpdateCustomerGroup API
     * @apiGroup VendorCustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiParamExample {json} Input
     * {
     *   "name": "",
     *   "description": "",
     *   "colorCode": "",
     *   "status": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully Updated Customer Group..!",
     *   "data": {
     *       "createdBy": 1,
     *       "createdDate": "",
     *       "modifiedDate": "",
     *       "id": 1,
     *       "name": "",
     *       "description": "",
     *       "colorCode": "",
     *       "vendorId": 1,
     *       "isDelete": 0
     *   }
     * }
     * @apiSampleRequest  /api/vendor-customer-group/:id
     * @apiErrorExample {json} updateBuyerGroup error
     * HTTP/1.1 500 Internal Server Error
     */
    updateBuyerGroup(customerGroupId, bodyParam, request, response) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customerGroup = yield this.customerGroupService.findOne({
                where: {
                    id: customerGroupId,
                    vendorId: request.user.vendorId,
                },
            });
            if (!customerGroup) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid group id for customer`,
                });
            }
            const buyerGroupNameExist = yield this.customerGroupService.findOne({
                where: {
                    name: (_a = bodyParam.name) === null || _a === void 0 ? void 0 : _a.trim(),
                    vendorId: request.user.vendorId,
                    id: (0, typeorm_1.Not)(customerGroupId),
                },
            });
            if (buyerGroupNameExist) {
                return response.status(400).send({
                    status: 0,
                    message: `Group name already exist`,
                });
            }
            customerGroup.name = bodyParam.name;
            customerGroup.description = (_b = bodyParam.description) !== null && _b !== void 0 ? _b : '';
            customerGroup.colorCode = (_c = bodyParam.colorCode) !== null && _c !== void 0 ? _c : '';
            customerGroup.isActive = bodyParam.status;
            const buyerGroupSave = yield this.customerGroupService.create(customerGroup);
            return response.status(200).send({
                status: 1,
                message: `Successfully updated customer group`,
                data: buyerGroupSave,
            });
        });
    }
    // DeleteSellerBuyerGroup API
    /**
     * @api {Delete} /api/vendor-customer-group/:id DeleteSellerCustomerGroup API
     * @apiGroup VendorCustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "status": 1,
     *  "message": "Successfully Deleted Customer Group..",
     *  }
     * @apiSampleRequest  /api/vendor-customer-group/:id
     * @apiErrorExample {json} customer error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteSellerBuyerGroup(request, response, customerGroupId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const buyerGroupValid = yield this.customerGroupService.findOne({
                where: {
                    id: customerGroupId,
                    vendorId: request.user.vendorId,
                },
            });
            if (!buyerGroupValid) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid customer group id`,
                });
            }
            yield this.customerGroupService.delete(customerGroupId);
            return response.status(200).send({
                status: 1,
                message: `Successfully deleted customer group`,
            });
        });
    }
    // SellerBuyerGroupStatus API
    /**
     * @api {Put} /api/vendor-customer-group/status/:id StatusUpdateSellerCustomerGroup API
     * @apiGroup VendorCustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiParam (Request body) {Number} status status
     *  @apiParamExample {json} Input
     * {
     *  "status": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "status": 1,
     *  "message": "Successfully Update Customer Group Status..!",
     *  }
     * @apiSampleRequest  /api/vendor-customer-group/status/:id
     * @apiErrorExample {json} Update Seller Customer Group API error
     * HTTP/1.1 500 Internal Server Error
     */
    sellerBuyerGroupStatusUpdate(request, response, customerGroupId, status) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const buyerGroupValid = yield this.customerGroupService.findOne({
                where: {
                    id: customerGroupId,
                    vendorId: request.user.vendorId,
                },
            });
            if (!buyerGroupValid) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid customer group id`,
                });
            }
            buyerGroupValid.isActive = status;
            yield this.customerGroupService.update(customerGroupId, buyerGroupValid);
            return response.status(200).send({
                status: 1,
                message: `Successfully update customer group status`,
            });
        });
    }
    // Update Bulk Vendor CustomerGroup Status
    /**
     * @api {get} /api/vendor-customer-group/bulk-status Admin Vendor Update CustomerGroup Status
     * @apiGroup SellerBuyerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number[]} customerGroupIds customerGroupIds
     * @apiParam (Request body) {Number} statusId statusId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated the bulk customerGroup status",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-customer-group/bulk-status
     * @apiErrorExample {json} Admin Vendor Update CustomerGroup Status error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorCustomerGroupStatus(params, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customerGroupIds = params.customerGroupIds;
            const updateCustomerGroupValue = [];
            if (customerGroupIds.length) {
                for (const customerGroupId of customerGroupIds) {
                    const buyerGroupValid = yield this.customerGroupService.findOne({
                        where: {
                            id: customerGroupId,
                            vendorId: request.user.vendorId,
                        },
                    });
                    if (!buyerGroupValid) {
                        return response.status(400).send({
                            status: 0,
                            message: `Invalid customer group id`,
                        });
                    }
                    buyerGroupValid.isActive = params.statusId;
                    updateCustomerGroupValue.push(buyerGroupValid);
                }
                yield this.customerGroupService.createBulk(updateCustomerGroupValue);
                return response.status(200).send({ status: 1, message: 'Successfully updated the bulk customer group status' });
            }
        });
    }
    // BuyerGroupDetail API
    /**
     * @api {Get} /api/vendor-customer-group/:id/customer CustomerGroupDetail API
     * @apiGroup VendorCustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset status
     * @apiParam (Request body) {Number} keyword keyword
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Get Customer List For Group !",
     *     "data": [
     *        {
     *       "createdBy": 1,
     *       "createdDate": "",
     *       "modifiedBy": 1,
     *       "modifiedDate": "",
     *       "id": 1,
     *       "firstName": "",
     *       "lastName": "",
     *       "gender": "",
     *       "dob": "",
     *       "username": "",
     *       "password": "",
     *       "email": "",
     *       "mobileNumber": "",
     *       "address": "",
     *       "countryId": 1,
     *       "zoneId": 1,
     *       "city": "",
     *       "local": "",
     *       "oauthData": "",
     *       "avatar": "",
     *       "newsletter": "",
     *       "avatarPath": "",
     *       "customerGroupId": "",
     *       "lastLogin": "",
     *       "safe": "",
     *       "ip": "",
     *       "mailStatus": "",
     *       "pincode": "",
     *       "deleteFlag": "",
     *       "isActive": 1,
     *       "forgetPasswordKey": "",
     *       "linkExpires": "",
     *       "lockedOn": "",
     *       "siteId": 1,
     *       "address2": "",
     *       "landmark": "",
     *       "mailOtp": "",
     *       "mailOtpExpireTime": ""
     *       }
     * }
     * @apiSampleRequest  /api/vendor-customer-group/:id/customer
     * @apiErrorExample {json} getCustomerGroupDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    getCustomerGroupDetail(customerGroupId, response, request, limit, offset, keyword, status, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customerGroupValid = yield this.customerGroupService.findOne({
                where: {
                    id: customerGroupId,
                    vendorId: request.user.vendorId,
                },
            });
            if (!customerGroupValid) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid customer group id`,
                });
            }
            const buyerGroupDetail = yield this.customerToGroupService.find({ where: { customerGroupId } });
            const customerIds = buyerGroupDetail.map((customerGroup) => customerGroup.customerId);
            const whereConditions = [];
            const searchConditions = [];
            whereConditions.push({
                name: 'Customer.id',
                op: 'IN',
                value: customerIds,
            });
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                searchConditions.push({
                    name: ['Customer.firstName', 'Customer.lastName', 'Customer.email'],
                    value: keyword,
                });
            }
            const customers = yield this.customerService.listByQueryBuilder(limit, offset, [], whereConditions, [], [], [], [], count ? true : false, false);
            return response.status(200).send({
                status: 1,
                message: `Successfully got customer list for group`,
                data: customers,
            });
        });
    }
    // Buyer list API
    /**
     * @api {Get} /api/vendor-customer-group/customer/list Buyer list API
     * @apiGroup SellerBuyerGroup
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Get Customer List..!",
     *    "data": [
     *        {
     *       "createdBy": 1,
     *       "createdDate": "",
     *       "modifiedBy": 1,
     *       "modifiedDate": "",
     *       "id": 1,
     *       "firstName": "",
     *       "lastName": "",
     *       "gender": "",
     *       "dob": "",
     *       "username": "",
     *       "password": "",
     *       "email": "",
     *       "mobileNumber": "",
     *       "address": "",
     *       "countryId": 1,
     *       "zoneId": 1,
     *       "city": "",
     *       "local": "",
     *       "oauthData": "",
     *       "avatar": "",
     *       "newsletter": "",
     *       "avatarPath": "",
     *       "customerGroupId": "",
     *       "lastLogin": "",
     *       "safe": "",
     *       "ip": "",
     *     "mailStatus": "",
     *       "pincode": "",
     *       "deleteFlag": 0,
     *       "isActive": 1,
     *       "forgetPasswordKey": "",
     *       "linkExpires": "",
     *       "lockedOn": "",
     *       "siteId": 1,
     *       "address2": "",
     *       "landmark": "",
     *       "mailOtp": "",
     *       "mailOtpExpireTime": ""
     *   }
     * }
     * @apiSampleRequest  /api/vendor-customer-group/customer/list
     * @apiErrorExample {json} customer error
     * HTTP/1.1 500 Internal Server Error
     */
    customerList(response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerService.find({ where: { deleteFlag: 0 } });
            return response.status(200).send({
                status: 1,
                message: `Successfully got customer list`,
                data: customer,
            });
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('groupName')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__param(7, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCustomerGroupController.prototype, "BuyerGroupList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateCustomerGroupRequest_1.BuyerGroupRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCustomerGroupController.prototype, "createBuyerGroup", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id/customer'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('customerIds')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Array, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCustomerGroupController.prototype, "addBuyerUser", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCustomerGroupController.prototype, "groupDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateCustomerGroupRequest_1.BuyerGroupRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCustomerGroupController.prototype, "updateBuyerGroup", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCustomerGroupController.prototype, "deleteSellerBuyerGroup", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/status/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(3, (0, routing_controllers_1.BodyParam)('status')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCustomerGroupController.prototype, "sellerBuyerGroupStatusUpdate", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Authorized)('vendor'),
    (0, routing_controllers_1.Post)('/bulk-status'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCustomerGroupController.prototype, "vendorCustomerGroupStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:id/customer'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object, Number, Number, String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCustomerGroupController.prototype, "getCustomerGroupDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/customer/list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCustomerGroupController.prototype, "customerList", null);
VendorCustomerGroupController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/vendor-customer-group'),
    tslib_1.__metadata("design:paramtypes", [CustomerGroupService_1.CustomerGroupService,
        CustomerToGroupService_1.CustomerToGroupService,
        CustomerService_1.CustomerService])
], VendorCustomerGroupController);
exports.VendorCustomerGroupController = VendorCustomerGroupController;
//# sourceMappingURL=VendorCustomerGroupController.js.map