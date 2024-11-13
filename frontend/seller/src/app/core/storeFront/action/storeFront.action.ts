/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {Action} from '@ngrx/store';
import {type} from '../../shared/utility/utilityHelpers';

export const ActionTypes = {
    GET_PROFILE: type('[storeFront] get profile'),
    GET_PROFILE_SUCCESS: type('[storeFront] get profile success'),
    GET_PROFILE_FAIL: type('[storeFront] get profile fail'),

    GET_SETTINGS: type('[storeFront] get settings'),
    GET_SETTINGS_SUCCESS: type('[storeFront] get settings success'),
    GET_SETTINGS_FAIL: type('[storeFront] get settings fail'),

    GET_WISHLIST_COUNT: type('[storeFront] get wishlist count'),
    GET_WISHLIST_COUNT_SUCCESS: type('[storeFront] wishlist count success'),
    GET_WISHLIST_COUNT_FAIL: type('[storeFront] wishlist count fail'),
    DO_SIGN_OUT: type('[storeFront] sign out'),



};

/* get wishlist count action*/
export class GetWishlistCount implements Action {
    type = ActionTypes.GET_WISHLIST_COUNT;

    constructor(public payload: any) {
    }
}
/* get Wishlist action*/
export class GetWishlistCountSuccess implements Action {
    type = ActionTypes.GET_WISHLIST_COUNT_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetWishlistCountFail implements Action {
    type = ActionTypes.GET_WISHLIST_COUNT_FAIL;

    constructor(public payload: any) {
    }
}

/* get profile action*/

export class GetProfile implements Action {
    type = ActionTypes.GET_PROFILE;

    constructor(public payload = null) {
    }
}

export class GetProfileSuccess implements Action {
    type = ActionTypes.GET_PROFILE_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetProfileFail implements Action {
    type = ActionTypes.GET_PROFILE_FAIL;

    constructor(public payload: any) {
    }
}
/* get setting action*/

export class GetSetting implements Action {
    type = ActionTypes.GET_SETTINGS;

    constructor(public payload = null) {
    }
}

export class GetSettingSuccess implements Action {
    type = ActionTypes.GET_SETTINGS_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetSettingFail implements Action {
    type = ActionTypes.GET_SETTINGS_FAIL;

    constructor(public payload: any) {
    }
}


  
  
