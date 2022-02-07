/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Map, Record} from 'immutable';

export interface AuthState extends Map<string, any> {
    token: any;
    tokenValid: boolean;
    loginLoading: boolean;
    loginLoaded: boolean;
    loginFailed: boolean;

    registerLoading: boolean;
    registerLoaded: boolean;
    registerFailed: boolean;

    recoverLoading: boolean;
    recoverLoaded: boolean;
    recoverFailed: boolean;
}

export const authrecord = Record({
    token: '',
    tokenValid: false,
    loginLoading: false,
    loginLoaded: false,
    loginFailed: false,

    registerLoading: false,
    registerLoaded: false,
    registerFailed: false,

    recoverLoading: false,
    recoverLoaded: false,
    recoverFailed: false,
});
