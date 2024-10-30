/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Action } from 'routing-controllers';
import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { Logger } from '../lib/logger';
import { AuthService } from './AuthService';

export function authorizationChecker(connection: Connection): (action: Action, roles: string[]) => Promise<boolean> | boolean {
    const log = new Logger(__filename);
    const authService = Container.get<AuthService>(AuthService);
    return async function innerAuthorizationChecker(action: Action, roles: any): Promise<boolean> {
        const userId = await authService.parseBasicAuthFromRequest(action.request);
        if (userId === undefined) {
            log.warn('No credentials given');
            return false;
        }
        // Check the token is revocked or not
        const checkRevoke = await authService.checkTokenExist(action.request);
        if (!checkRevoke) {
            log.warn('Invalid token');
            return false;
        }

        if (roles[0] === 'customer') {
            action.request.user = await authService.validateCustomer(userId.id);
            if (action.request.user === undefined) {
                log.warn('Invalid credentials given');
                return false;
            }

            log.info('Successfully checked credentials');
            return true;

        } else if (roles[0] === 'vendor') {
            action.request.user = await authService.validateVendor(userId.id);
            if (action.request.user === undefined) {
                log.warn('Invalid credentials given');
                return false;
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
            console.log(routeName + 'routeName');
            const userGroupId = (action.request.user && action.request.user.userGroupId) ? action.request.user.userGroupId : undefined;
            if (userGroupId) {
                const getUserGroup = await authService.validateUserGroup(userGroupId);
                if (getUserGroup) {
                    if (getUserGroup.groupId === 1) {
                        return true;
                    } else {
                        if (routeName) {
                            let permissions;
                            if (action.request.user.permission) {
                                permissions = action.request.user.permission ? JSON.parse(action.request.user.permission) : {};
                            } else {
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

            } else {
                log.warn('Invalid group');
                return false;

            }
            log.info('Successfully checked credentials');
            return true;

        }
    };
}
