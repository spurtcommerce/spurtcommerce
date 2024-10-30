"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationChecker = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const logger_1 = require("../lib/logger");
const AuthService_1 = require("./AuthService");
function authorizationChecker(connection) {
    const log = new logger_1.Logger(__filename);
    const authService = typedi_1.Container.get(AuthService_1.AuthService);
    return function innerAuthorizationChecker(action, roles) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userId = yield authService.parseBasicAuthFromRequest(action.request);
            if (userId === undefined) {
                log.warn('No credentials given');
                return false;
            }
            // Check the token is revocked or not
            const checkRevoke = yield authService.checkTokenExist(action.request);
            if (!checkRevoke) {
                log.warn('Invalid token');
                return false;
            }
            if (roles[0] === 'customer') {
                action.request.user = yield authService.validateCustomer(userId.id);
                if (action.request.user === undefined) {
                    log.warn('Invalid credentials given');
                    return false;
                }
                log.info('Successfully checked credentials');
                return true;
            }
            else if (roles[0] === 'vendor') {
                action.request.user = yield authService.validateVendor(userId.id);
                if (action.request.user === undefined) {
                    log.warn('Invalid credentials given');
                    return false;
                }
                log.info('Successfully checked credentials');
                return true;
            }
            else if (roles[0] === 'vendor-unapproved') {
                action.request.user = yield authService.validateUnapprovedVendor(userId.id);
                if (action.request.user === undefined) {
                    log.warn('Invalid credentials given');
                    return false;
                }
                log.info('Successfully checked credentials');
                return true;
            }
            else if (roles[0] === 'admin-vendor') {
                if (userId.role === 'admin') {
                    action.request.user = yield authService.validateUser(userId.id);
                }
                else if (userId.role === 'vendor') {
                    action.request.user = yield authService.validateVendor(userId.id);
                }
                if (action.request.user === undefined) {
                    log.warn('Invalid credentials given');
                    return false;
                }
                log.info('Successfully checked credentials');
                return true;
            }
            else {
                action.request.user = yield authService.validateUser(userId.id);
                if (action.request.user === undefined) {
                    log.warn('Invalid credentials given');
                    return false;
                }
                const routeName = roles[1];
                console.log(routeName + 'routeName');
                const userGroupId = (action.request.user && action.request.user.userGroupId) ? action.request.user.userGroupId : undefined;
                if (userGroupId) {
                    const getUserGroup = yield authService.validateUserGroup(userGroupId);
                    if (getUserGroup) {
                        if (getUserGroup.groupId === 1) {
                            return true;
                        }
                        else {
                            if (routeName) {
                                let permissions;
                                if (action.request.user.permission) {
                                    permissions = action.request.user.permission ? JSON.parse(action.request.user.permission) : {};
                                }
                                else {
                                    permissions = getUserGroup.permission ? JSON.parse(getUserGroup.permission) : {};
                                }
                                if (permissions) {
                                    if (!permissions[routeName]) {
                                        log.warn('Forbidden');
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    log.warn('Invalid group');
                    return false;
                }
                log.info('Successfully checked credentials');
                return true;
            }
        });
    };
}
exports.authorizationChecker = authorizationChecker;
//# sourceMappingURL=authorizationChecker.js.map