/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Action } from 'routing-controllers';
import { Container } from 'typedi';
import { DataSourceOptions } from 'typeorm';
import { Logger } from '../lib/logger';
import { AuthService } from './AuthService';

export function authorizationChecker(connection: DataSourceOptions): (action: Action, roles: string[]) => Promise<boolean> | boolean {
    const log = new Logger(__filename);
    const authService = Container.get<AuthService>(AuthService);
    return async function innerAuthorizationChecker(action: Action, roles: any): Promise<boolean> {
        // const userId = await authService.parseBasicAuthFromRequest(action.request);
        // if (userId === undefined) {
        //     log.warn('No credentials given');
        //     return false;
        // }
        // // Check the token is revocked or not
        // const checkRevoke = await authService.checkTokenExist(action.request);
        // if (!checkRevoke) {
        //     log.warn('Invalid token');
        //     return false;
        // }

        let userId: any;
        let isApiKeyAuthenticated = false;
        const apiKey = action.request.header('x-api-key');
        if (roles[0] === 'vendor' && apiKey) {
        const apiKeyData = await authService.validateApiKey(apiKey);
        if (!apiKeyData) {
            log.warn('Invalid API Key');
            return false;
        }
        action.request.user = await authService.validateTenant(apiKeyData.tenantId);
        if (!action.request.user) {
            log.warn('Invalid Vendor Tenant');
            return false;
        }
        isApiKeyAuthenticated = true;
        } else {
        userId = await authService.parseBasicAuthFromRequest(action.request);
        if (userId === undefined) {
            log.warn('No credentials given');
            return false;
        }
        const checkRevoke = await authService.checkTokenExist(action.request);
        if (!checkRevoke) {
            log.warn('Invalid token');
            return false;
        }}

        if (roles[0] === 'customer') {
            action.request.user = await authService.validateUSerCustomer(userId.id);
            if (action.request.user === undefined) {
                log.warn('Invalid credentials given');
                return false;
            }
            const routeName = roles[1];
            const customerUserGroupId = (action.request.user && action.request.user.customerUserGroupId) ? action.request.user.customerUserGroupId : undefined;
            if (customerUserGroupId) {
                const getUserGroup = await authService.validateCustomerUserGroup(customerUserGroupId);
                if (getUserGroup) {
                    if (action.request.user.isSuperCustomer === 1) {
                        return true;
                    } else {
                        if (routeName) {
                            // const permissions = action.request.user.permission ? JSON.parse(action.request.user.permission) : {};
                            const rolePermission = getUserGroup.permission ? JSON.parse(getUserGroup.permission) : {};
                            if (!rolePermission[routeName]) {
                                // if (!permissions[routeName]) {
                                log.warn('Forbidden');
                                return false;
                                // }
                            }
                        }
                    }

                }

            }

            log.info('Successfully checked credentials');
            return true;

        } else if (roles[0] === 'vendor') { // roles[0] === 'vendor'
            if (isApiKeyAuthenticated) {
                log.info('Successfully authenticated using API Key');
                return true;
            }
            action.request.user = await authService.validateVendor(userId.id);
            if (action.request.user === undefined) {
                log.warn('Invalid credentials given');
                return false;
            }
            const routeName = roles[1];
            const vendorUserGroupId = (action.request.user && action.request.user.userGroupId) ? action.request.user.userGroupId : undefined;
            if (vendorUserGroupId) {
                const getUserGroup = await authService.validateVendorUserGroup(vendorUserGroupId);
                if (getUserGroup) {
                    if (action.request.user.isSuperVendor === 1 || getUserGroup.slug === 'admin') {
                        return true;
                    } else {
                        if (routeName) {
                            const permissions = action.request.user.permission ? JSON.parse(action.request.user.permission) : {};
                            const rolePermission = getUserGroup.permission ? JSON.parse(getUserGroup.permission) : {};
                            if (!rolePermission[routeName]) {
                                if (!permissions[routeName]) {
                                    log.warn('Forbidden');
                                    return false;
                                }
                            }
                        }
                    }

                }

            }
            log.info('Successfully checked credentials');
            return true;

        } else if (roles[0] === 'vendor-unapproved') {
            action.request.user = await authService.validateUnapprovedVendor(userId.id);
            if (action.request.user === undefined) {
                log.warn('Invalid credentials given');
                return false;
            }

            log.info('Successfully checked credentials');
            return true;

        } else if (roles[0] === 'admin-vendor') {
            if (userId.role === 'admin') {
                action.request.user = await authService.validateUser(userId.id);
            } else if (userId.role === 'vendor') {
                action.request.user = await authService.validateVendor(userId.id);
            }
            if (action.request.user === undefined) {
                log.warn('Invalid credentials given');
                return false;
            }
            log.info('Successfully checked credentials');
            return true;
        } else {
            action.request.user = await authService.validateUser(userId.id);
            if (action.request.user === undefined) {
                log.warn('Invalid credentials given');
                return false;
            }
            const routeName = roles[1];
            const userGroupId = (action.request.user && action.request.user.userGroupId) ? action.request.user.userGroupId : undefined;
            if (userGroupId) {
                const getUserGroup = await authService.validateUserGroup(userGroupId);
                if (getUserGroup) {
                    if (getUserGroup.groupId === 1) {
                        return true;
                    } else {
                        if (routeName) {
                            const permissions = action.request.user.permission ? JSON.parse(action.request.user.permission) : {};
                            const rolePermission = getUserGroup.permission ? JSON.parse(getUserGroup.permission) : {};
                            if (!rolePermission[routeName]) {
                                if (!permissions[routeName]) {
                                    log.warn('Forbidden');
                                    return false;
                                }
                            }
                        }
                    }

                }

            } else {
                log.warn('Invalid Admin group');
                return false;

            }
            log.info('Successfully checked credentials');
            return true;

        }
    };
}
