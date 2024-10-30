"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerGroupController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const CreateCustomerGroupRequest_1 = require("./requests/CreateCustomerGroupRequest");
const CustomerGroupService_1 = require("../../core/services/CustomerGroupService");
const CustomerService_1 = require("../../core/services/CustomerService");
const CustomerGroup_1 = require("../../core/models/CustomerGroup");
let CustomerGroupController = class CustomerGroupController {
    constructor(customerGroupService, customerService) {
        this.customerGroupService = customerGroupService;
        this.customerService = customerService;
    }
    // Create Customer Group API
    /**
     * @api {post} /api/customer-group Create customer group API
     * @apiGroup CustomerGroup
     * @apiParam (Request body) {String{..30}} name groupName
     * @apiParam (Request body) {String} [description] groupDescription
     * @apiParam (Request body) {String} colorcode colorcode
     * @apiParam (Request body) {Number} status status
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "description" : "",
     *      "status" : "",
     *      "colorcode": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New Customer group is created successfully",
     *      "status": "1",
     *      "data": {
     *              "name": "",
     *              "description": "",
     *              "colorCode": "",
     *              "isActive": "",
     *              "createdDate": "",
     *              "groupId": ""
     *      }
     * }
     * @apiSampleRequest /api/customer-group
     * @apiErrorExample {json} createCustomer error
     * HTTP/1.1 500 Internal Server Error
     */
    createCustomerGroup(createCustomerGroup, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerGroupService.findOne({
                where: {
                    name: createCustomerGroup.name,
                },
            });
            if (customer) {
                const errorResponse = {
                    status: 0,
                    message: 'This Customer Group already exists',
                };
                return response.status(400).send(errorResponse);
            }
            const newGroupParams = new CustomerGroup_1.CustomerGroup();
            newGroupParams.name = createCustomerGroup.name;
            newGroupParams.description = createCustomerGroup.description;
            newGroupParams.colorCode = createCustomerGroup.colorcode;
            newGroupParams.isActive = createCustomerGroup.status;
            const customerGroupSaveResponse = yield this.customerGroupService.create(newGroupParams);
            if (customerGroupSaveResponse) {
                const successResponse = {
                    status: 1,
                    message: 'Customer Group Created Successfully',
                    data: customerGroupSaveResponse,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to save Customer Group',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Update Customer Group API
    /**
     * @api {put} /api/customer-group/:id Update Customer Group API
     * @apiGroup CustomerGroup
     * @apiParam (Request body) {String{..30}} name groupName
     * @apiParam (Request body) {String} [description] groupDescription
     * @apiParam (Request body) {String} colorcode colorcode
     * @apiParam (Request body) {Number} status status
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "description" : "",
     *      "colorcode" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " Customer Group is updated successfully",
     *      "status": "1",
     *      "data": {
     *              "name": "",
     *              "description": "",
     *              "colorCode": "",
     *              "isActive": "",
     *              "createdDate": "",
     *              "groupId": ""
     *              }
     * }
     * @apiSampleRequest /api/customer-group/:id
     * @apiErrorExample {json} update-customer-group error
     * HTTP/1.1 500 Internal Server Error
     */
    updateCustomerRole(id, createRoleParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerGroupService.findOne({
                where: {
                    id,
                },
            });
            if (!customer) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid group Id',
                };
                return response.status(400).send(errorResponse);
            }
            const newCustomerGroup = new CustomerGroup_1.CustomerGroup();
            newCustomerGroup.name = createRoleParam.name;
            newCustomerGroup.description = createRoleParam.description;
            newCustomerGroup.colorCode = createRoleParam.colorcode;
            newCustomerGroup.isActive = createRoleParam.status;
            const customerGroupSaveResponse = yield this.customerGroupService.update(id, newCustomerGroup);
            if (customerGroupSaveResponse) {
                const successResponse = {
                    status: 1,
                    message: 'Customer Group updated successfully',
                    data: customerGroupSaveResponse,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the Customer Group',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Customer Group List API
    /**
     * @api {get} /api/customer-group customergroup-list API
     * @apiGroup CustomerGroup
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} groupName groupName
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get customer group list",
     *    "status": "1"
     *    "data":{
     *           "groupId": "",
     *           "name": "",
     *           "description": "",
     *           "colorCode": "",
     *           "isActive": ""
     *    },
     *  }
     * @apiSampleRequest /api/customer-group
     * @apiErrorExample {json} customergroup error
     * HTTP/1.1 500 Internal Server Error
     */
    customergroupList(limit, offset, groupName, keyword, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['id', 'name', 'description', 'colorCode', 'isActive', 'createdDate', 'modifiedDate'];
            const whereConditions = [
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                },
                {
                    name: 'isActive',
                    op: 'like',
                    value: status,
                },
            ];
            if (groupName) {
                whereConditions.push({
                    name: 'name',
                    op: 'like',
                    value: groupName,
                });
            }
            const customerGroupList = yield this.customerGroupService.list(limit, offset, select, whereConditions, count);
            const successResponse = {
                status: 1,
                message: 'Successfully got all customer group List',
                data: customerGroupList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // delete Customer Group API
    /**
     * @api {delete} /api/customer-group/:id Delete Customer Group API
     * @apiGroup CustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} groupId  groupId
     * @apiParamExample {json} Input
     * {
     *      "groupId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted customerGroup.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer-group/:id
     * @apiErrorExample {json} CustomerGroup error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteGroup(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const groupId = yield this.customerGroupService.findOne({
                where: {
                    id,
                },
            });
            if (!groupId) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid group Id',
                };
                return response.status(400).send(errorResponse);
            }
            const defaultGroupId = yield this.customerGroupService.findOne({
                where: {
                    id,
                    name: 'default',
                },
            });
            if (defaultGroupId) {
                const errorResponse = {
                    status: 0,
                    message: 'You cannot delete this customer group',
                };
                return response.status(400).send(errorResponse);
            }
            const findCustomer = yield this.customerService.findOne({
                where: {
                    customerGroupId: id,
                    deleteFlag: 0,
                },
            });
            if (findCustomer) {
                const errorResponse = {
                    status: 0,
                    message: 'You cannot delete this Customer group as Users are mapped to it',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteGroup = yield this.customerGroupService.delete(id);
            if (deleteGroup) {
                const successResponse = {
                    status: 1,
                    message: 'Group deleted successfully',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the group',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Detail Customer Group API
    /**
     * @api {delete} /api/customer-group/:id Detail Customer Group API
     * @apiGroup CustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} groupId  groupId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Got Customer Group",
     *      "status": "1",
     *      "data":{
     *           "name": "",
     *           "description": "",
     *           "colorCode": "",
     *           "isActive": ""
     *            },
     * }
     * @apiSampleRequest /api/customer-group/:id
     * @apiErrorExample {json} CustomerGroup error
     * HTTP/1.1 500 Internal Server Error
     */
    detailGroup(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const group = yield this.customerGroupService.findOne({
                where: {
                    id,
                },
            });
            if (!group) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid group Id',
                };
                return response.status(400).send(errorResponse);
            }
            return response.status(400).send({
                status: 0,
                message: 'Successfully Got Customer Group',
                data: group,
            });
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(['admin', 'create-customer-group']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateCustomerGroupRequest_1.CreateCustomerGroup, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerGroupController.prototype, "createCustomerGroup", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-customer-group']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateCustomerGroupRequest_1.CreateCustomerGroup, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerGroupController.prototype, "updateCustomerRole", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('groupName')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerGroupController.prototype, "customergroupList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-customer-group']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerGroupController.prototype, "deleteGroup", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerGroupController.prototype, "detailGroup", null);
CustomerGroupController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/customer-group'),
    tslib_1.__metadata("design:paramtypes", [CustomerGroupService_1.CustomerGroupService, CustomerService_1.CustomerService])
], CustomerGroupController);
exports.CustomerGroupController = CustomerGroupController;
//# sourceMappingURL=CustomerGroupController.js.map