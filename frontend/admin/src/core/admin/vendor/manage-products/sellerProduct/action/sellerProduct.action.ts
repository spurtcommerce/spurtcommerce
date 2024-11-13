import { Action } from '@ngrx/store';
import { type } from 'src/core/admin/shared/utility/utilityHelpers';


export const ActionTypes = {
    //sellerProductList
    SELLER_PRODUCT_LIST_ACTION: type('[SELLER_PRODUCT] sellerProductList'),
    SELLER_PRODUCT_LIST_SUCCESS: type('[SELLER_PRODUCT] sellerProductList success'),
    SELLER_PRODUCT_LIST_FAIL: type('[SELLER_PRODUCT] sellerProductList Fail'),

    //sellerProductCount
    SELLER_PRODUCT_COUNT_ACTION: type('[SELLER_PRODUCT] sellerProductCount'),
    SELLER_PRODUCT_COUNT_SUCCESS: type('[SELLER_PRODUCT] sellerProductCount success'),
    SELLER_PRODUCT_COUNT_FAIL: type('[SELLER_PRODUCT] sellerProductCount Fail'),

    //SingleProductDataExport
    SINGLE_PRODUCT_DATA_EXPORT_ACTION: type('[SELLER_PRODUCT] SingleProductDataExport'),
    SINGLE_PRODUCT_DATA_EXPORT_SUCCESS: type('[SELLER_PRODUCT] SingleProductDataExport success'),
    SINGLE_PRODUCT_DATA_EXPORT_FAIL: type('[SELLER_PRODUCT] SingleProductDataExport Fail'),

    //MultipleProductDataExport
    MULTIPLE_PRODUCT_DATA_EXPORT_ACTION: type('[SELLER_PRODUCT] MultipleProductDataExport'),
    MULTIPLE_PRODUCT_DATA_EXPORT_SUCCESS: type('[SELLER_PRODUCT] MultipleProductDataExport success'),
    MULTIPLE_PRODUCT_DATA_EXPORT_FAIL: type('[SELLER_PRODUCT] MultipleProductDataExport Fail'),


    //approveProduct
    APPROVED_PRODUCT_ACTION: type('[SELLER_PRODUCT] approveProduct'),
    APPROVED_PRODUCT_SUCCESS: type('[SELLER_PRODUCT] approveProduct success'),
    APPROVED_PRODUCT_FAIL: type('[SELLER_PRODUCT] approveProduct Fail'),

    //rejectProduct
    REJECT_PRODUCT_ACTION: type('[SELLER_PRODUCT] rejectProduct'),
    REJECT_PRODUCT_SUCCESS: type('[SELLER_PRODUCT] rejectProduct success'),
    REJECT_PRODUCT_FAIL: type('[SELLER_PRODUCT] rejectProduct Fail'),


    //productStatus
    PRODUCT_STATUS_ACTION: type('[SELLER_PRODUCT] productStatus'),
    PRODUCT_STATUS_SUCCESS: type('[SELLER_PRODUCT] productStatus success'),
    PRODUCT_STATUS_FAIL: type('[SELLER_PRODUCT] productStatus Fail'),

};

//sellerProductList
export class sellerProductListAction implements Action {
    type = ActionTypes.SELLER_PRODUCT_LIST_ACTION;
    constructor(public payload: any) { }
}

export class sellerProductListSuccessAction implements Action {
    type = ActionTypes.SELLER_PRODUCT_LIST_SUCCESS;
    constructor(public payload: any) { }
}

export class sellerProductListFailAction implements Action {
    type = ActionTypes.SELLER_PRODUCT_LIST_FAIL;
    constructor(public payload: any = null) { }
}


//sellerProductCount
export class sellerProductCountAction implements Action {
    type = ActionTypes.SELLER_PRODUCT_COUNT_ACTION;
    constructor(public payload: any) { }
}

export class sellerProductCountSuccessAction implements Action {
    type = ActionTypes.SELLER_PRODUCT_COUNT_SUCCESS;
    constructor(public payload: any) { }
}

export class sellerProductCountFailAction implements Action {
    type = ActionTypes.SELLER_PRODUCT_COUNT_FAIL;
    constructor(public payload: any = null) { }
}

//SingleProductDataExport
export class SingleProductDataExportAction implements Action {
    type = ActionTypes.SINGLE_PRODUCT_DATA_EXPORT_ACTION;
    constructor(public payload: any) { }
}

export class SingleProductDataExportSuccessAction implements Action {
    type = ActionTypes.SINGLE_PRODUCT_DATA_EXPORT_SUCCESS;
    constructor(public payload: any) { }
}

export class SingleProductDataExportFailAction implements Action {
    type = ActionTypes.SINGLE_PRODUCT_DATA_EXPORT_FAIL;
    constructor(public payload: any = null) { }
}


//MultipleProductDataExport
export class MultipleProductDataExportAction implements Action {
    type = ActionTypes.MULTIPLE_PRODUCT_DATA_EXPORT_ACTION;
    constructor(public payload: any) { }
}

export class MultipleProductDataExportSuccessAction implements Action {
    type = ActionTypes.MULTIPLE_PRODUCT_DATA_EXPORT_SUCCESS;
    constructor(public payload: any) { }
}

export class MultipleProductDataExportFailAction implements Action {
    type = ActionTypes.MULTIPLE_PRODUCT_DATA_EXPORT_FAIL;
    constructor(public payload: any = null) { }
}



//approveProduct
export class approveProductAction implements Action {
    type = ActionTypes.APPROVED_PRODUCT_ACTION;
    constructor(public payload: any) { }
}

export class approveProductSuccessAction implements Action {
    type = ActionTypes.APPROVED_PRODUCT_SUCCESS;
    constructor(public payload: any) { }
}

export class approveProductFailAction implements Action {
    type = ActionTypes.APPROVED_PRODUCT_FAIL;
    constructor(public payload: any = null) { }
}



//rejectProduct
export class rejectProductAction implements Action {
    type = ActionTypes.REJECT_PRODUCT_ACTION;
    constructor(public payload: any) { }
}

export class rejectProductSuccessAction implements Action {
    type = ActionTypes.REJECT_PRODUCT_SUCCESS;
    constructor(public payload: any) { }
}

export class rejectProductFailAction implements Action {
    type = ActionTypes.REJECT_PRODUCT_FAIL;
    constructor(public payload: any = null) { }
}


//productStatus
export class productStatusAction implements Action {
    type = ActionTypes.PRODUCT_STATUS_ACTION;
    constructor(public payload: any) { }
}

export class productStatusSuccessAction implements Action {
    type = ActionTypes.PRODUCT_STATUS_SUCCESS;
    constructor(public payload: any) { }
}

export class productStatusFailAction implements Action {
    type = ActionTypes.PRODUCT_STATUS_FAIL;
    constructor(public payload: any = null) { }
}

export type Actions =
    | sellerProductListAction
    | sellerProductListSuccessAction
    | sellerProductListFailAction
    | sellerProductCountAction
    | sellerProductCountSuccessAction
    | sellerProductCountFailAction
    | SingleProductDataExportAction
    | SingleProductDataExportSuccessAction
    | SingleProductDataExportFailAction
    | MultipleProductDataExportAction
    | MultipleProductDataExportSuccessAction
    | MultipleProductDataExportFailAction
    | approveProductAction
    | approveProductSuccessAction
    | approveProductFailAction
    | rejectProductAction
    | rejectProductSuccessAction
    | rejectProductFailAction
    | productStatusAction
    | productStatusSuccessAction
    | productStatusFailAction;