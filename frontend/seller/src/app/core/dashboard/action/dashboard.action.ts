/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Action } from '@ngrx/store';
import { type } from '../../shared/utility/utilityHelpers';

export const ActionTypes = {
    GET_PROFILE: type('[login] get dashboard profile'),
    GET_PROFILE_SUCCESS: type('[login] get dashboard profile success'),
    GET_PROFILE_FAIL: type('[login] get dashboard profile fail'),

    EDIT_PROFILE: type('[login] edit dashboard profile'),
    EDIT_PROFILE_SUCCESS: type('[login] edit dashboard profile success'),
    EDIT_PROFILE_FAIL: type('[login] edit dashboard profile fail'),

    GET_DASHBOARD_COUNT: type('[count] get dashboard dashboard count'),
    GET_DASHBOARD_COUNT_SUCCESS: type('[count] dashboard count success'),
    GET_DASHBOARD_COUNT_FAIL: type('[count] dashboard count fail'),
    DO_SIGN_OUT: type('[signout] sign dashboard out'),

    GET_LANGUAGELIST: type('[language] get dashboard language'),
    GET_LANGUAGELIST_SUCCESS: type('[language] get dashboard language success'),
    GET_LANGUAGELIST_FAIL: type('[language] get dashboard language fail'),

    TOP_SELLING_PRODUCTS: type('[language] get top selling products'),
    TOP_SELLING_PRODUCTS_SUCCESS: type('[language] get top selling products success'),
    TOP_SELLING_PRODUCTS_FAIL: type('[language] get top selling products fail'),

    GET_ORDER_LIST: type('[order-list] get Order List'),
    GET_ORDER_LIST_SUCCESS: type('[order-list] get Order List success'),
    GET_ORDER_LIST_FAIL: type('[order-list] get get Order List fail'),


    GET_ORDER_LIST_COUNT: type('[order-list] get Order List Count'),
    GET_ORDER_LIST_COUNT_SUCCESS: type('[order-list] get Order List success Count'),
    GET_ORDER_LIST_COUNT_FAIL: type('[order-list] get get Order List fail Count'),

    GET_ITEMS_PAGECOUNT: type('[Dashboard] Get Items Page Count'),
    GET_ITEMS_PAGECOUNT_SUCCESS: type('[Dashboard] Get Items Page Count Success'),
    GET_ITEMS_PAGECOUNT_FAIL: type('[Dashboard] Get Items Page Count Fail'),

};

/* get dashboard dashboard count action*/
export class GetDashboardCount implements Action {
    type = ActionTypes.GET_DASHBOARD_COUNT;

    constructor(public payload: any) {
    }
}
/* get dashboard Dashboard action*/
export class GetDashboardCountSuccess implements Action {
    type = ActionTypes.GET_DASHBOARD_COUNT_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetDashboardCountFail implements Action {
    type = ActionTypes.GET_DASHBOARD_COUNT_FAIL;

    constructor(public payload: any) {
    }
}

/* get dashboard profile action*/

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
/* edit profile action*/

export class EditProfile implements Action {
    type = ActionTypes.EDIT_PROFILE;

    constructor(public payload) {
    }
}

export class EditProfileSuccess implements Action {
    type = ActionTypes.EDIT_PROFILE_SUCCESS;

    constructor(public payload: any) {
    }
}

export class EditProfileFail implements Action {
    type = ActionTypes.EDIT_PROFILE_FAIL;

    constructor(public payload: any) {
    }
}
/* do sign out action*/

export class DoSignOut implements Action {
    type = ActionTypes.DO_SIGN_OUT;

    constructor(public payload: any = null) {
    }
}

/* get dashboard language action*/

export class GetLanguage implements Action {
    type = ActionTypes.GET_LANGUAGELIST;

    constructor(public payload: any) {
    }
}

export class GetLanguageSuccess implements Action {
    type = ActionTypes.GET_LANGUAGELIST_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetLanguageFail implements Action {
    type = ActionTypes.GET_LANGUAGELIST_FAIL;

    constructor(public payload: any) {
    }
}
/* get top selling products action*/

export class GetTopSellingProducts implements Action {
    type = ActionTypes.TOP_SELLING_PRODUCTS;

    constructor(public payload: any) {
    }
}

export class GetTopSellingProductsSuccess implements Action {
    type = ActionTypes.TOP_SELLING_PRODUCTS_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetTopSellingProductsFail implements Action {
    type = ActionTypes.TOP_SELLING_PRODUCTS_FAIL;

    constructor(public payload: any) {
    }
}

export class GetOrderListAction implements Action {
    type = ActionTypes.GET_ORDER_LIST;
    constructor(public payload: any) {
    }
}

export class GetOrderListSuceess implements Action {
    type = ActionTypes.GET_ORDER_LIST_SUCCESS;
    constructor(public payload: any) {
    }
}

export class GetOrderListFail implements Action {
    type = ActionTypes.GET_ORDER_LIST_FAIL;
    constructor(public payload: any) {
    }
}



export class GetOrderListCountAction implements Action {
    type = ActionTypes.GET_ORDER_LIST_COUNT;
    constructor(public payload: any) {
    }
}

export class GetOrderListCountSuceess implements Action {
    type = ActionTypes.GET_ORDER_LIST_COUNT_SUCCESS;
    constructor(public payload: any) {
    }
}

export class GetOrderListCountFail implements Action {
    type = ActionTypes.GET_ORDER_LIST_COUNT_FAIL;
    constructor(public payload: any) {
    }
}

/* Settings ItemPerPage Count Actions */
export class GetItemPerPageCountAction implements Action {
    type = ActionTypes.GET_ITEMS_PAGECOUNT;
    constructor(public payload = null) { }
}

export class GetItemPerPageCountSuccessAction implements Action {
    type = ActionTypes.GET_ITEMS_PAGECOUNT_SUCCESS;
    constructor(public payload: any) { }
}

export class GetItemPerPageCountFailAction implements Action {
    type = ActionTypes.GET_ITEMS_PAGECOUNT_FAIL;
    constructor(public payload: any = null) { }
}


export type Actions
    = GetDashboardCount |
    GetDashboardCountSuccess |
    GetDashboardCountFail |
    GetProfile |
    GetProfileSuccess |
    GetProfileFail |
    DoSignOut |
    GetLanguage |
    GetLanguageSuccess |
    GetLanguageFail |
    GetTopSellingProducts |
    GetTopSellingProductsSuccess |
    GetTopSellingProductsFail |
    EditProfile |
    EditProfileSuccess |
    EditProfileFail |
    GetItemPerPageCountAction |
    GetItemPerPageCountSuccessAction |
    GetItemPerPageCountFailAction;
