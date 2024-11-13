/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

// store
import {type} from '../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';

export const ActionTypes = {
  // Mediada upload
  PURCHASED_CUSTOMER_LIST: type('[Purchased-customer] purchased Customer List'),
  PURCHASED_CUSTOMER_LIST_SUCCESS: type('[Purchased-customer] purchased Customer List Success'),
  PURCHASED_CUSTOMER_LIST_FAIL: type('[Purchased-customer] purchased Customer List Fail'),

  PURCHASED_CUSTOMER_LIST_COUNT: type('[purchased count] purchased Customer List Count'),
  PURCHASED_CUSTOMER_LIST_COUNT_SUCCESS: type('[purchased count] purchased Customer List Count Success'),
  PURCHASED_CUSTOMER_LIST_COUNT_FAIL: type('[purchased count] purchased Customer List Count Fail'),


//View Customer//

VIEW_PRODUCT_LIST: type('[view Product] view Product'),
VIEW_PRODUCT_LIST_SUCCESS: type('[view product] view Product Success'),
VIEW_PRODUCT_LIST_FAIL: type('[view product] view Product Fail'),


VIEW_PRODUCT_LIST_COUNT: type('[view Product count]view Product Count'),
VIEW_PRODUCT_LIST_COUNT_SUCCESS: type('[view Product count] view Product Count Success'),
VIEW_PRODUCT_LIST_COUNT_FAIL: type('[view Product count] view Product Count Fail'),


//OrderProduct//

ORDER_PRODUCT_LIST: type('[order Product] order Product'),
ORDER_PRODUCT_LIST_SUCCESS:type('[order Product] order Product Success'),
ORDER_PRODUCT_LIST_FAIL: type('[order Product] order Product Fail'),


ORDER_PRODUCT_LIST_COUNT: type('[order Product count]order Product Count'),
ORDER_PRODUCT_LIST_COUNT_SUCCESS: type('[order Product count] order Product Count Success'),
ORDER_PRODUCT_LIST_COUNT_FAIL: type('[order Product count] order Product Count Fail'),



EXPORT_CUSTOMER: type('[Export] Export Customers'),
EXPORT_CUSTOMER_SUCCESS: type('[Export] Export Customers  Success'),
EXPORT_CUSTOMER_FAIL: type('[Export] Export Customers Fail'),

ALL_EXPORT_CUSTOMER: type('[All Export] All Export Customer '),
ALL_EXPORT_CUSTOMER_SUCCESS: type('[All Export] All Export Customer  Success'),
ALL_EXPORT_CUSTOMER_FAIL: type('[All Export] All Export Customer  Fail'),

};


// MEDIA UPLOAD
export class purchasedCustomer implements Action {
  type = ActionTypes.PURCHASED_CUSTOMER_LIST;

  constructor(public payload: any) {}
}

export class purchasedCustomerSuccessAction implements Action {
  type = ActionTypes.PURCHASED_CUSTOMER_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class purchasedCustomerFailAction implements Action {
  type = ActionTypes.PURCHASED_CUSTOMER_LIST_FAIL;

  constructor(public payload: any = null) {}
}

export class PurchasedCount implements Action {
  type = ActionTypes.PURCHASED_CUSTOMER_LIST_COUNT;

  constructor(public payload: any) { }
}

export class PurchasedCountSuccess implements Action {
  type = ActionTypes.PURCHASED_CUSTOMER_LIST_COUNT_SUCCESS;

  constructor(public payload: any) { }
}

export class PurchasedCountFail implements Action {
  type = ActionTypes.PURCHASED_CUSTOMER_LIST_COUNT_FAIL;

  constructor(public payload: any = null) { }
}


//View product //

export class ViewProductList implements Action {
  
  type = ActionTypes.VIEW_PRODUCT_LIST;
  constructor(public payload: any) {
   
}
}

export class ViewProductListSuccess implements Action {
  type = ActionTypes.VIEW_PRODUCT_LIST_SUCCESS;

  constructor(public payload: any) { 
  
  }

}
export class ViewProductListFail implements Action {
  type = ActionTypes.VIEW_PRODUCT_LIST_FAIL;

  constructor(public payload: any = null) { }
}

//View product Count

  export class  ViewProductListCount implements Action {
    type = ActionTypes.VIEW_PRODUCT_LIST_COUNT;
  
  
    constructor(public payload: any) { }
  }
  
  export class ViewProductListCountSuccess implements Action {
    type = ActionTypes.VIEW_PRODUCT_LIST_COUNT_SUCCESS;
  
    constructor(public payload: any) { }
  }
  
  export class  ViewProductListCountFail implements Action {
    type = ActionTypes.VIEW_PRODUCT_LIST_COUNT_FAIL;
  
    constructor(public payload: any = null) { }

  }




//Order product //

export class OrderProductList implements Action {
  
  type = ActionTypes.ORDER_PRODUCT_LIST;
  constructor(public payload: any) {
    
}
}

export class OrderProductListSuccess implements Action {
  type = ActionTypes.ORDER_PRODUCT_LIST_SUCCESS;

  constructor(public payload: any) { 
 
  }

}

export class OrderProductListFail implements Action {
  type = ActionTypes.ORDER_PRODUCT_LIST_FAIL;

  constructor(public payload: any = null) { }
}

//Order product Count

export class  OrderProductListCount implements Action {
  type = ActionTypes.ORDER_PRODUCT_LIST_COUNT;

  constructor(public payload: any) { }
}

export class OrderProductListCountSuccess implements Action {
  type = ActionTypes.ORDER_PRODUCT_LIST_COUNT_SUCCESS;

  constructor(public payload: any) { }
}

export class  OrderProductListCountFail implements Action {
  type = ActionTypes.ORDER_PRODUCT_LIST_COUNT_FAIL;

  constructor(public payload: any = null) { }
  
}


// product Export action
export class CustomerExportAction implements Action {
  type = ActionTypes.EXPORT_CUSTOMER;

  constructor(public payload: any ) { }
}

export class CustomerExportSuccessAction implements Action {
  type = ActionTypes.EXPORT_CUSTOMER_SUCCESS;

  constructor(public payload: any) { }
}

export class CustomerExportFailAction implements Action {
  type = ActionTypes.EXPORT_CUSTOMER_FAIL;

  constructor(public payload: any = null) { }
}

// Customer All Export action
export class CustomerAllExportAction implements Action {
  type = ActionTypes.ALL_EXPORT_CUSTOMER;

  constructor(public payload: any ) { }
}

export class CustomerAllExportSuccessAction implements Action {
  type = ActionTypes.ALL_EXPORT_CUSTOMER_SUCCESS;

  constructor(public payload: any) { }
}

export class CustomerAllExportFailAction implements Action {
  type = ActionTypes.ALL_EXPORT_CUSTOMER_FAIL;

  constructor(public payload: any = null) { }
}
