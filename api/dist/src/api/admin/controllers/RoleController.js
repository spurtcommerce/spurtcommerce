"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const DeleteRoleRequest_1 = require("./requests/DeleteRoleRequest");
const CreateRoleRequest_1 = require("./requests/CreateRoleRequest");
const UserGroupService_1 = require("../../core/services/UserGroupService");
const UserService_1 = require("../../core/services/UserService");
const UserGroup_1 = require("../../core/models/UserGroup");
const typeorm_1 = require("typeorm");
let RoleController = class RoleController {
    constructor(userGroupService, userService) {
        this.userGroupService = userGroupService;
        this.userService = userService;
    }
    // Create Role API
    /**
     * @api {post} /api/role/create-role Create Role API
     * @apiGroup Role
     * @apiParam (Request body) {String{..64}} name roleName
     * @apiParam (Request body) {Number} status status
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Role saved successfully.",
     *      "status": "1"
     *      "data": {
     *              "name": "",
     *              "isActive": "",
     *              "slug": "",
     *              "createdDate": "",
     *              }
     * }
     * @apiSampleRequest /api/role/create-role
     * @apiErrorExample {json} createRole error
     * HTTP/1.1 500 Internal Server Error
     */
    createRole(createRoleParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const slugName = createRoleParam.name.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const role = yield this.userGroupService.findOne({
                where: {
                    slug: slugName,
                },
            });
            if (role) {
                const errorResponse = {
                    status: 0,
                    message: 'This role already exists',
                };
                return response.status(400).send(errorResponse);
            }
            const newRoleParams = new UserGroup_1.UserGroup();
            newRoleParams.name = createRoleParam.name;
            newRoleParams.isActive = createRoleParam.status;
            newRoleParams.slug = slugName;
            const userGroupSaveResponse = yield this.userGroupService.create(newRoleParams);
            if (userGroupSaveResponse) {
                const successResponse = {
                    status: 1,
                    message: 'Role saved successfully',
                    data: userGroupSaveResponse,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to save the role',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Update Role API
    /**
     * @api {put} /api/role/update-role/:id Update Role API
     * @apiGroup Role
     * @apiParam (Request body) {String{..64}} name roleName
     * @apiParam (Request body) {Number} status status
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "slug" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " Role is updated successfully",
     *      "status": "1",
     *      "data": {
     *              "name": "",
     *              "isActive": "",
     *              "slug": "",
     *              "createdDate": "",
     *              "groupId": ""
     *            }
     * }
     * @apiSampleRequest /api/role/update-role/:id
     * @apiErrorExample {json} updateRole error
     * HTTP/1.1 500 Internal Server Error
     */
    updateRole(id, createRoleParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const role = yield this.userGroupService.findOne({
                where: {
                    groupId: id,
                },
            });
            if (!role) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid role Id.',
                };
                return response.status(400).send(errorResponse);
            }
            // const checkRole = await this.userGroupService.findOne({where: {name: }})
            const newRoleParams = new UserGroup_1.UserGroup();
            const slugName = createRoleParam.name.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const checkRole = yield this.userGroupService.findOne({
                where: {
                    slug: slugName, groupId: (0, typeorm_1.Not)(id),
                },
            });
            if (checkRole) {
                const errorResponse = {
                    status: 0,
                    message: 'This role already exists',
                };
                return response.status(400).send(errorResponse);
            }
            if (role.slug !== 'admin') {
                newRoleParams.name = createRoleParam.name;
                newRoleParams.isActive = createRoleParam.status;
                newRoleParams.slug = slugName;
                const userGroupSaveResponse = yield this.userGroupService.update(id, newRoleParams);
                if (userGroupSaveResponse) {
                    const successResponse = {
                        status: 1,
                        message: 'Role updated successfully',
                        data: userGroupSaveResponse,
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'Unable to update the Role',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            else {
                return response.status(400).send({
                    status: 0,
                    message: 'Cannot update admin',
                });
            }
        });
    }
    // Role List API
    /**
     * @api {get} /api/role/rolelist Role List API
     * @apiGroup Role
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get role list",
     *    "data": [{
     *       "groupId": "",
     *       "name": "",
     *       "isActive": ""
     *          }]
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/role/rolelist
     * @apiErrorExample {json} role error
     * HTTP/1.1 500 Internal Server Error
     */
    roleList(limit, offset, keyword, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['groupId', 'name', 'isActive'];
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
            const roleList = yield this.userGroupService.list(limit, offset, select, whereConditions, count);
            const successResponse = {
                status: 1,
                message: 'Successfully get all role list',
                data: roleList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // delete Role API
    /**
     * @api {delete} /api/role/delete-role/:id Delete Role API
     * @apiGroup Role
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} groupId  groupId
     * @apiParamExample {json} Input
     * {
     *      "roleId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Role.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/role/delete-role/:id
     * @apiErrorExample {json} Role error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteRole(role, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const roleId = yield this.userGroupService.findOne({
                where: {
                    groupId: role.groupId,
                },
            });
            if (!roleId) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid role Id',
                };
                return response.status(400).send(errorResponse);
            }
            const defaultRoleId = yield this.userGroupService.findOne({
                where: {
                    groupId: role.groupId,
                    slug: 'admin',
                },
            });
            if (defaultRoleId) {
                const errorResponse = {
                    status: 0,
                    message: 'You cannot delete default role',
                };
                return response.status(400).send(errorResponse);
            }
            const finduser = yield this.userService.findOne({
                where: {
                    userGroupId: role.groupId,
                    deleteFlag: 0,
                },
            });
            if (finduser) {
                const errorResponse = {
                    status: 0,
                    message: 'You cannot delete this role, as users are mapped to this role',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteRole = yield this.userGroupService.delete(role.groupId);
            if (deleteRole) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the role',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the role',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/create-role'),
    (0, routing_controllers_1.Authorized)(['admin', 'create-role']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateRoleRequest_1.CreateRole, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RoleController.prototype, "createRole", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-role/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-role']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateRoleRequest_1.CreateRole, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RoleController.prototype, "updateRole", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/rolelist'),
    (0, routing_controllers_1.Authorized)(['admin', 'list-role']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RoleController.prototype, "roleList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete-role/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-role']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DeleteRoleRequest_1.DeleteRoleRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RoleController.prototype, "deleteRole", null);
RoleController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/role'),
    tslib_1.__metadata("design:paramtypes", [UserGroupService_1.UserGroupService, UserService_1.UserService])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=RoleController.js.map