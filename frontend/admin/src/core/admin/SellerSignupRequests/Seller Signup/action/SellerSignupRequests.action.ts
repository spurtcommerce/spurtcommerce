import { Action } from '@ngrx/store';
import { type } from 'src/core/admin/shared/utility/utilityHelpers';




export const ActionTypes = {

//sellerSignupList
 SELLER_SIGNUP_LIST_ACTION: type('[SELLER_VERIFY] sellerSignupListList'),
 SELLER_SIGNUP_LIST_SUCCESS: type('[SELLER_VERIFY] sellerSignupListList success'),
 SELLER_SIGNUP_LIST_FAIL: type('[SELLER_VERIFY] sellerSignupListList Fail'),   


 //sellerSignupListCount
 SELLER_SIGNUP_LIST_COUNT_ACTION: type('[SELLER_VERIFY] sellerSignupListCount'),
 SELLER_SIGNUP_LIST_COUNT_SUCCESS: type('[SELLER_VERIFY] sellerSignupListCount success'),
 SELLER_SIGNUP_LIST_COUNT_FAIL: type('[SELLER_VERIFY] sellerSignupListCount Fail'),   


  //updateSeller
  UPDATE_SELLER_ACTION: type('[SELLER_VERIFY] updateSeller'),
  UPDATE_SELLER_SUCCESS: type('[SELLER_VERIFY] updateSeller success'),
  UPDATE_SELLER_FAIL: type('[SELLER_VERIFY] updateSeller Fail'), 
}


 //sellerSignupList
export class sellerSignupListAction implements Action {
    type = ActionTypes.SELLER_SIGNUP_LIST_ACTION;
    constructor(public payload: any) { }

}

export class sellerSignupListSuccessAction implements Action {
    type = ActionTypes.SELLER_SIGNUP_LIST_SUCCESS;
    constructor(public payload: any) { }
}

export class sellerSignupListFailAction implements Action {
    type = ActionTypes.SELLER_SIGNUP_LIST_FAIL;
    constructor(public payload: any = null) { }
}




 //sellerSignupListCount
 export class sellerSignupListCountAction implements Action {
    type = ActionTypes.SELLER_SIGNUP_LIST_COUNT_ACTION;
    constructor(public payload: any) { }

}

export class sellerSignupListCountSuccessAction implements Action {
    type = ActionTypes.SELLER_SIGNUP_LIST_COUNT_SUCCESS;
    constructor(public payload: any) { }
}

export class sellerSignupListCountFailAction implements Action {
    type = ActionTypes.SELLER_SIGNUP_LIST_COUNT_FAIL;
    constructor(public payload: any = null) { }
}



 //updateSeller
 export class updateSellerAction implements Action {
    type = ActionTypes.UPDATE_SELLER_ACTION;
    constructor(public payload: any) { }

}

export class updateSellerSuccessAction implements Action {
    type = ActionTypes.UPDATE_SELLER_SUCCESS;
    constructor(public payload: any) { }
}

export class updateSellerFailAction implements Action {
    type = ActionTypes.UPDATE_SELLER_FAIL;
    constructor(public payload: any = null) { }
}



export type Actions =
    |sellerSignupListAction
    |sellerSignupListSuccessAction
    |sellerSignupListFailAction
    |sellerSignupListCountAction
    |sellerSignupListCountSuccessAction
    |sellerSignupListCountFailAction
    |updateSellerAction
    |updateSellerSuccessAction
    |updateSellerFailAction
