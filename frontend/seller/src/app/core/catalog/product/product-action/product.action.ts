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
import { type } from '../../../shared/utility/utilityHelpers'


export const ActionTypes = {
    /* Categories List*/
    CATEGORIES_LIST_ACTION: type('[Settings] categories '),
    CATEGORIES_LIST_SUCCESS: type('[Settings] categories success'),
    CATEGORIES_LIST_FAIL: type('[Settings] categories fail'),


    /* Tax List*/
    TAX_LIST_ACTION: type('[Settings] tax '),
    TAX_LIST_SUCCESS: type('[Settings] tax success'),
    TAX_LIST_FAIL: type('[Settings] tax fail'),

    /* Product  creation*/
    PRODUCT_CREATION_ACTION: type('[Settings] Product '),
    PRODUCT_CREATION_SUCCESS: type('[Settings] Product success'),
    PRODUCT_CREATION_FAIL: type('[Settings] Product fail'),


    /* Product Update Details*/
    PRODUCT_UPDATE_DETAILS_ACTION: type('[Settings] Updatte Details '),
    PRODUCT_UPDATE_DETAILS_SUCCESS: type('[Settings] Updatte Details success'),
    PRODUCT_UPDATE_DETAILS_FAIL: type('[Settings] Updatte Details fail'),

    /* Product edit*/
    PRODUCT_EDIT_ACTION: type('[Settings] edit '),
    PRODUCT_EDIT_SUCCESS: type('[Settings] edit success'),
    PRODUCT_EDIT_FAIL: type('[Settings] edit fail'),


    /* Product Video upload*/
    PRODUCT_VIDEO_UPLOAD_ACTION: type('[Settings] upload '),
    PRODUCT_VIDEO_UPLOAD_SUCCESS: type('[Settings] upload success'),
    PRODUCT_VIDEO_UPLOAD_FAIL: type('[Settings] upload fail'),


    /* Product Multi Delete*/
    PRODUCT_VIDEO_MULTI_DELETE_ACTION: type('[Settings] delete '),
    PRODUCT_VIDEO_MULTI_DELETE_SUCCESS: type('[Settings] delete success'),
    PRODUCT_VIDEO_MULTI_DELETE_FAIL: type('[Settings] delete fail'),

};


/* Categories List*/

export class CategoriesListAction implements Action {
    type = ActionTypes.CATEGORIES_LIST_ACTION;
    constructor(public payload: any) {
    }
}

export class CategoriesListSuccess implements Action {
    type = ActionTypes.CATEGORIES_LIST_SUCCESS;
    constructor(public payload: any) {
    }
}

export class CategoriesListFail implements Action {
    type = ActionTypes.CATEGORIES_LIST_FAIL;
    constructor(public payload = null) {
    }
}

/* Tax List*/

export class TaxListAction implements Action {
    type = ActionTypes.TAX_LIST_ACTION;
    constructor(public payload: any) {
    }
}

export class TaxListSuccess implements Action {
    type = ActionTypes.TAX_LIST_SUCCESS;
    constructor(public payload: any) {
    }
}

export class TaxListFail implements Action {
    type = ActionTypes.TAX_LIST_FAIL;
    constructor(public payload = null) {
    }
}


/* Product  creation*/

export class ProductCreationAction implements Action {
    type = ActionTypes.PRODUCT_CREATION_ACTION;
    constructor(public payload: any) {
    }
}

export class ProductCreationSuccess implements Action {
    type = ActionTypes.PRODUCT_CREATION_SUCCESS;
    constructor(public payload: any) {
    }
}

export class ProductCreationFail implements Action {
    type = ActionTypes.PRODUCT_CREATION_FAIL;
    constructor(public payload = null) {
    }
}


/* Product Update Details*/

export class ProductUpdateDetailsAction implements Action {
    type = ActionTypes.PRODUCT_UPDATE_DETAILS_ACTION;
    constructor(public payload: any) {
    }
}

export class ProductUpdateDetailsSuccess implements Action {
    type = ActionTypes.PRODUCT_UPDATE_DETAILS_SUCCESS;
    constructor(public payload: any) {
    }
}

export class ProductUpdateDetailsFail implements Action {
    type = ActionTypes.PRODUCT_UPDATE_DETAILS_FAIL;
    constructor(public payload = null) {
    }
}

/* Product edit*/

export class ProducteditAction implements Action {
    type = ActionTypes.PRODUCT_EDIT_ACTION;
    constructor(public payload: any) {
    }
}

export class ProducteditSuccess implements Action {
    type = ActionTypes.PRODUCT_EDIT_SUCCESS;
    constructor(public payload: any) {
    }
}

export class ProducteditFail implements Action {
    type = ActionTypes.PRODUCT_EDIT_FAIL;
    constructor(public payload = null) {
    }
}

/* Product Video upload*/

export class ProductVideoUploadAction implements Action {
    type = ActionTypes.PRODUCT_VIDEO_UPLOAD_ACTION;
    constructor(public payload: any) {
    }
}

export class ProductVideoUploadSuccess implements Action {
    type = ActionTypes.PRODUCT_VIDEO_UPLOAD_SUCCESS;
    constructor(public payload: any) {
    }
}

export class ProductVideoUploadFail implements Action {
    type = ActionTypes.PRODUCT_VIDEO_UPLOAD_FAIL;
    constructor(public payload = null) {
    }
}


/* Product Multi Delete*/

export class ProductMultiDeleteAction implements Action {
    type = ActionTypes.PRODUCT_VIDEO_MULTI_DELETE_ACTION;
    constructor(public payload: any) {
    }
}

export class  ProductMultiDeleteSuccess implements Action {
    type = ActionTypes.PRODUCT_VIDEO_MULTI_DELETE_SUCCESS;
    constructor(public payload: any) {
    }
}

export class  ProductMultiDeleteFail implements Action {
    type = ActionTypes.PRODUCT_VIDEO_MULTI_DELETE_FAIL;
    constructor(public payload = null) {
    }
}

export type Actions =
    | CategoriesListAction
    | CategoriesListSuccess
    | CategoriesListFail
    | TaxListAction
    | TaxListSuccess
    | TaxListFail
    | ProductCreationAction
    | ProductCreationSuccess
    | ProductCreationFail
    | ProductUpdateDetailsAction
    | ProductUpdateDetailsSuccess
    | ProductUpdateDetailsFail
    | ProducteditAction
    | ProducteditSuccess
    | ProducteditFail
    | ProductVideoUploadAction
    | ProductVideoUploadSuccess
    | ProductVideoUploadFail
    | ProductMultiDeleteAction
    | ProductMultiDeleteSuccess
    | ProductMultiDeleteFail;

