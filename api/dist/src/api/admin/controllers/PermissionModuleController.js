"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPermissionController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const PermissionModuleService_1 = require("../../core/services/PermissionModuleService");
const PermissionModuleGroupService_1 = require("../../core/services/PermissionModuleGroupService");
const UserGroupService_1 = require("../../core/services/UserGroupService");
const UserService_1 = require("../../core/services/UserService");
let AdminPermissionController = class AdminPermissionController {
    constructor(permissionModuleService, permissionModuleGroupService, userService, userGroupService) {
        this.permissionModuleService = permissionModuleService;
        this.permissionModuleGroupService = permissionModuleGroupService;
        this.userService = userService;
        this.userGroupService = userGroupService;
    }
    // Permission List API
    /**
     * @api {get} /api/permission-module/list Permission Module List API
     * @apiGroup Permission Module
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get page list",
     *      "data": [{
     *              "moduleGroupId": 61,
     *              "name": "Settings Delivery Location",
     *              "slugName": "settings-delivery-location",
     *              "sortOrder": 1,
     *              "permissionModule": [
     *                {
     *                  "moduleId": 210,
     *                  "name": "Add Delivery Location",
     *                  "slugName": "add-delivery-location",
     *                  "moduleGroupId": 61
     *                }]
     *              }],
     *      "status": "1"
     * }
     * @apiSampleRequest /api/permission-module/list
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    permissionList(limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['moduleGroupId', 'name', 'slugName', 'sortOrder'];
            const search = [];
            const WhereConditions = [];
            const permissionModuleGroupList = yield this.permissionModuleGroupService.list(limit, offset, select, search, WhereConditions, count);
            if (count) {
                const successRes = {
                    status: 1,
                    message: 'Successfully got permission module group list count',
                    data: permissionModuleGroupList,
                };
                return response.status(200).send(successRes);
            }
            const promise = permissionModuleGroupList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const permissionModule = yield this.permissionModuleService.findAll({ select: ['moduleId', 'moduleGroupId', 'name', 'slugName'], where: { moduleGroupId: result.moduleGroupId }, orderBy: { sortOrder: 'ASC' } });
                const temp = result;
                temp.permissionModule = permissionModule;
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete list of pages',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Add Permission API
    /**
     * @api {post} /api/permission-module/add-permission Add Permission API
     * @apiGroup Permission Module
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} refType 1->role 2->user
     * @apiParam (Request body) {Number} refId refId roleId | userId
     * @apiParam (Request body) {String} permission stringified data
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully added permission",
     *      "data":{
     *      "pageId" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/permission-module/add-permission
     * @apiErrorExample {json} permission-module error
     * HTTP/1.1 500 Internal Server Error
     */
    addPermission(refType, refId, permission, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne({
                where: {
                    userId: request.user.userId,
                    deleteFlag: 0,
                }, relations: ['usergroup'],
            });
            const permissionModuleList = yield this.permissionModuleService.list(0, 0, [], [], [], false);
            const permissions = {};
            const userPermissions = permission ? JSON.parse(permission) : {};
            permissionModuleList.forEach(element => {
                if (userPermissions.indexOf(element.slugName) !== -1) {
                    permissions[element.slugName] = true;
                }
                else {
                    permissions[element.slugName] = false;
                }
            });
            let saveResponse;
            if (refType && +refType === 1) {
                const roleDetail = yield this.userGroupService.findOne({ where: { groupId: refId } });
                if (!roleDetail) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid Reference Id',
                    };
                    return response.status(400).send(errorResponse);
                }
                if (user) {
                    if (user.userGroupId === roleDetail.groupId) {
                        const errorResponse = {
                            status: 0,
                            message: 'You cannot update the role as currently the user is mapped to it',
                        };
                        return response.status(400).send(errorResponse);
                    }
                }
                roleDetail.permission = JSON.stringify(permissions);
                saveResponse = yield this.userGroupService.update(refId, roleDetail);
            }
            else if (refType && +refType === 2) {
                const userDetail = yield this.userService.findOne({ where: { userId: refId } });
                if (!userDetail) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid Reference Id',
                    };
                    return response.status(400).send(errorResponse);
                }
                if (request.user.userId !== refId) {
                    const errorResponse = {
                        status: 0,
                        message: 'Permission denied to perform this action',
                    };
                    return response.status(400).send(errorResponse);
                }
                userDetail.permission = JSON.stringify(permissions);
                saveResponse = yield this.userService.update(refId, userDetail);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully updated the permission',
                data: saveResponse,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Permission List API
    /**
     * @api {get} /api/permission-module/get-permission Get Permission API
     * @apiGroup Permission Module
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} refType 1->role 2->user
     * @apiParam (Request body) {Number} refId refId roleId | userId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got permission data",
     *      "data":{
     *      "pageId" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/permission-module/get-permission
     * @apiErrorExample {json} permission-module error
     * HTTP/1.1 500 Internal Server Error
     */
    getPermission(refType, refId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let permissionResponse;
            if (refType && +refType === 1) {
                const roleDetail = yield this.userGroupService.findOne({ where: { groupId: refId } });
                if (!roleDetail) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid Reference Id',
                    };
                    return response.status(400).send(errorResponse);
                }
                permissionResponse = roleDetail.permission ? JSON.parse(roleDetail.permission) : {};
            }
            else if (refType && +refType === 2) {
                const userDetail = yield this.userService.findOne({ where: { userId: refId } });
                if (!userDetail) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid Reference Id',
                    };
                    return response.status(400).send(errorResponse);
                }
                if (userDetail.permission) {
                    permissionResponse = userDetail.permission ? JSON.parse(userDetail.permission) : {};
                }
                else {
                    const roleDetail = yield this.userGroupService.findOne({ where: { groupId: userDetail.userGroupId } });
                    permissionResponse = roleDetail.permission ? JSON.parse(roleDetail.permission) : {};
                }
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got permission list',
                data: permissionResponse,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Permission for current admin user API
    /**
     * @api {get} /api/permission-module/permission-me Permission Me API
     * @apiGroup Permission Module
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got permission for user",
     *      "data":{
     *      "pageId" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/permission-module/permission-me
     * @apiErrorExample {json} permission-module error
     * HTTP/1.1 500 Internal Server Error
     */
    permissionMe(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne({
                where: {
                    userId: request.user.userId,
                    deleteFlag: 0,
                }, relations: ['usergroup'],
            });
            if (user) {
                let permission = {};
                if (user.userGroupId !== 1) {
                    const userDetail = yield this.userService.findOne({ where: { userId: user.userId } });
                    if (userDetail.permission) {
                        permission = JSON.parse(userDetail.permission);
                    }
                    else {
                        const roleDetail = yield this.userGroupService.findOne({ where: { groupId: user.userGroupId } });
                        permission = roleDetail.permission ? JSON.parse(roleDetail.permission) : {};
                    }
                }
                const successResponse = {
                    status: 1,
                    message: 'Successfully got permission list for current user',
                    data: permission,
                };
                return response.status(200).send(successResponse);
            }
            const errorResponse = {
                status: 0,
                message: 'Invalid token ID',
            };
            return response.status(400).send(errorResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/list'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminPermissionController.prototype, "permissionList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/add-permission'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('refType')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('refId')),
    tslib_1.__param(2, (0, routing_controllers_1.BodyParam)('permission')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminPermissionController.prototype, "addPermission", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/get-permission'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('refType')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('refId')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminPermissionController.prototype, "getPermission", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/permission-me'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminPermissionController.prototype, "permissionMe", null);
AdminPermissionController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/permission-module'),
    tslib_1.__metadata("design:paramtypes", [PermissionModuleService_1.PermissionModuleService, PermissionModuleGroupService_1.PermissionModuleGroupService, UserService_1.UserService, UserGroupService_1.UserGroupService])
], AdminPermissionController);
exports.AdminPermissionController = AdminPermissionController;
//# sourceMappingURL=PermissionModuleController.js.map