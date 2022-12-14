/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Action } from '@ngrx/store';
import { type } from 'src/core/admin/shared/utility/utilityHelpers';

export const ActionTypes = {

       /*Order fullFillment List*/

  ORDER_FULLFILLMENT_LIST: type('[Orderfullfillment] Orderfullfillment list'),
  ORDER_FULLFILLMENT_LIST_SUCCESS: type('[Orderfullfillment] Orderfullfillment list Success'),
  ORDER_FULLFILLMENT_LIST_FAIL: type('[Orderfullfillment] Orderfullfillment list Fail'),

  ADD_ORDER_FULLFILLMENT: type('[Orderfullfillment] add Orderfullfillment list'),
  ADD_ORDER_FULLFILLMENT_SUCCESS: type('[Orderfullfillment] add Orderfullfillment list Success'),
  ADD_ORDER_FULLFILLMENT_FAIL: type('[Orderfullfillment] add Orderfullfillment list Fail'),

     /*Order fullFillment Status*/
  ORDER_FULLFILLMENT_STATUS: type('[Orderfullfillment] Orderfullfillment status'),
  ORDER_FULLFILLMENT_STATUS_SUCCESS: type('[Orderfullfillment] Orderfullfillment status Success'),
  ORDER_FULLFILLMENT_STATUS_FAIL: type('[Orderfullfillment] Orderfullfillment status Fail'),
  
       /*Update Order fullFillment Status*/
  UPDATE_ORDER_FULLFILLMENT_STATUS: type('[Orderfullfillment] Update Orderfullfillment status'),
  UPDATE_ORDER_FULLFILLMENT_STATUS_SUCCESS: type('[Orderfullfillment] update Orderfullfillment status Success'),
  UPDATE_ORDER_FULLFILLMENT_STATUS_FAIL: type('[Orderfullfillment] update Orderfullfillment status Fail'),


};

     /*Order fullFillment List*/


export class OrderfullfillmentListAction implements Action {
  type = ActionTypes.ORDER_FULLFILLMENT_LIST;

  constructor(public payload: any) {}
}

export class OrderfullfillmentListSuccessAction implements Action {
  type = ActionTypes.ORDER_FULLFILLMENT_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class OrderfullfillmentListFailAction implements Action {
  type = ActionTypes.ORDER_FULLFILLMENT_LIST_FAIL;

  constructor(public payload: any = null) {}
}



export class addOrderfullfillmentAction implements Action {
  type = ActionTypes.ADD_ORDER_FULLFILLMENT;

  constructor(public payload: any) {}
}

export class addOrderfullfillmentSuccessAction implements Action {
  type = ActionTypes.ADD_ORDER_FULLFILLMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class addOrderfullfillmentFailAction implements Action {
  type = ActionTypes.ADD_ORDER_FULLFILLMENT_FAIL;

  constructor(public payload: any = null) {}
}


   /*Order fullFillment Status*/

   export class orderfullfillmentstatusAction implements Action {
    type = ActionTypes.ORDER_FULLFILLMENT_STATUS;
  
    constructor(public payload: any) {}
  }
  
  export class orderfullfillmentstatusSuccessAction implements Action {
    type = ActionTypes.ORDER_FULLFILLMENT_STATUS_SUCCESS;
  
    constructor(public payload: any) {}
  }
  
  export class orderfullfillmentstatusFailAction implements Action {
    type = ActionTypes.ORDER_FULLFILLMENT_STATUS_FAIL;
  
    constructor(public payload: any = null) {}
  }

     /*Update Order fullFillment Status*/
     export class updateOrderfullfillmentAction implements Action {
      type = ActionTypes.UPDATE_ORDER_FULLFILLMENT_STATUS;
    
      constructor(public payload: any) {}
    }
    
    export class updateOrderfullfillmentSuccessAction implements Action {
      type = ActionTypes.UPDATE_ORDER_FULLFILLMENT_STATUS_SUCCESS;
    
      constructor(public payload: any) {}
    }
    
    export class updateOrderfullfillmentFailAction implements Action {
      type = ActionTypes.UPDATE_ORDER_FULLFILLMENT_STATUS_FAIL;
    
      constructor(public payload: any = null) {}
    }

export type Actions =
  | OrderfullfillmentListAction
  | OrderfullfillmentListSuccessAction
  | OrderfullfillmentListFailAction
  | addOrderfullfillmentAction
  | addOrderfullfillmentSuccessAction
  | addOrderfullfillmentFailAction
  | orderfullfillmentstatusAction
  | orderfullfillmentstatusSuccessAction
  | orderfullfillmentstatusFailAction
  | updateOrderfullfillmentAction
  | updateOrderfullfillmentSuccessAction
  | updateOrderfullfillmentFailAction
  ;
