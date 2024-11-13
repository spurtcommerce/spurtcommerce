/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Action } from '@ngrx/store';
import { type } from '../../../shared/utility/utilityHelpers';

export const ActionTypes = {

    // Product Localization List
    GET_PRODUCT_LOCALIZATION: type('getProductLocalization] get product localization'),
    GET_PRODUCT_LOCALIZATION_SUCCESS: type('[getProductLocalizationSuccess] get product localization'),
    GET_PRODUCT_LOCALIZATION_FAILED: type('[getProductLocalizationFailed] get product localization'),

    // Product Localization Count
    GET_PRODUCT_LOCALIZATION_COUNT: type('getProductLocalizationCount] get product localization count'),
    GET_PRODUCT_LOCALIZATION_COUNT_SUCCESS: type('[getProductLocalizationCountSuccess] get product localization count'),
    GET_PRODUCT_LOCALIZATION_COUNT_FAILED: type('[getProductLocalizationCountFailed] get product localization count'),

    // Product Localization Detail
    PRODUCT_LOCALIZATION_DETAIL: type('productLocalizationDetail] product localization detail'),
    PRODUCT_LOCALIZATION_DETAIL_SUCCESS: type('[productLocalizationDetailSuccess] product localization detail'),
    PRODUCT_LOCALIZATION_DETAIL_FAILED: type('[productLocalizationDetailFailed] product localization detail'),

    // Product Localization Create
    PRODUCT_LOCALIZATION_CREATE: type('productLocalizationCreate] product localization create'),
    PRODUCT_LOCALIZATION_CREATE_SUCCESS: type('[productLocalizationCreateSuccess] product localization create'),
    PRODUCT_LOCALIZATION_CREATE_FAILED: type('[productLocalizationCreateFailed] product localization create'),
};

// Product Localization List
export class getProductLocalization implements Action {
    type = ActionTypes.GET_PRODUCT_LOCALIZATION;
    constructor(public payload: any) { }
}
export class getProductLocalizationSuccess implements Action {
    type = ActionTypes.GET_PRODUCT_LOCALIZATION_SUCCESS;
    constructor(public payload: any) { }
}
export class getProductLocalizationFailed implements Action {
    type = ActionTypes.GET_PRODUCT_LOCALIZATION_FAILED;
    constructor(public payload: any = null) { }
}

// Product Localization Count
export class getProductLocalizationCount implements Action {
    type = ActionTypes.GET_PRODUCT_LOCALIZATION_COUNT;
    constructor(public payload: any) { }
}
export class getProductLocalizationCountSuccess implements Action {
    type = ActionTypes.GET_PRODUCT_LOCALIZATION_COUNT_SUCCESS;
    constructor(public payload: any) { }
}
export class getProductLocalizationCountFailed implements Action {
    type = ActionTypes.GET_PRODUCT_LOCALIZATION_FAILED;
    constructor(public payload: any = null) { }
}

// Product Localization Detail
export class productLocalizationDetail implements Action {
    type = ActionTypes.PRODUCT_LOCALIZATION_DETAIL;
    constructor(public payload: any) { }
}
export class productLocalizationDetailSuccess implements Action {
    type = ActionTypes.PRODUCT_LOCALIZATION_DETAIL_SUCCESS;
    constructor(public payload: any) { }
}
export class productLocalizationDetailFailed implements Action {
    type = ActionTypes.PRODUCT_LOCALIZATION_DETAIL_FAILED;
    constructor(public payload: any = null) { }
}

// Product Localization Create
export class productLocalizationCreate implements Action {
    type = ActionTypes.PRODUCT_LOCALIZATION_CREATE;
    constructor(public payload: any) { }
}
export class productLocalizationCreateSuccess implements Action {
    type = ActionTypes.PRODUCT_LOCALIZATION_CREATE_SUCCESS;
    constructor(public payload: any) { }
}
export class productLocalizationCreateFailed implements Action {
    type = ActionTypes.PRODUCT_LOCALIZATION_CREATE_FAILED;
    constructor(public payload: any = null) { }
}

export type Actions = 
| getProductLocalization
| getProductLocalizationSuccess
| getProductLocalizationCountFailed
| getProductLocalizationCount
| getProductLocalizationCountSuccess
| getProductLocalizationCountSuccess
| productLocalizationDetail
| productLocalizationDetailSuccess
| productLocalizationDetailFailed
| productLocalizationCreate
| productLocalizationCreateSuccess
| productLocalizationCreateFailed