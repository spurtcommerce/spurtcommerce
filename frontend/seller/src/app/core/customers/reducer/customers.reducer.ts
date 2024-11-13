/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
// action
import * as actions from '../action/customers.action';
// state
import { customer, CustomerStateRecord } from './customers.state';


export const initialState: customer = new CustomerStateRecord() as unknown as customer;


export function reducer(state = initialState, { type, payload }: any): customer {
  
  if (!type) {
    return state;
  }

  switch (type) {
    // MEDIA UPLOAD FILE
    case actions.ActionTypes.PURCHASED_CUSTOMER_LIST: {
      return Object.assign({}, state, {
        purchasedCustomerListLoading: true,
        purchasedCustomerListLoaded: false,
        purchasedCustomerListFailed: false
      });
    }

    case actions.ActionTypes.PURCHASED_CUSTOMER_LIST_SUCCESS: {

      return Object.assign({}, state, {
        purchasedCustomerList: payload.data,
        purchasedCustomerListLoading: false,
        purchasedCustomerListLoaded: true,
        purchasedCustomerListFailed: false
      });
    }
    case actions.ActionTypes.PURCHASED_CUSTOMER_LIST_FAIL: {
      return Object.assign({}, state, {
        purchasedCustomerListLoading: false,
        purchasedCustomerListLoaded: true,
        purchasedCustomerListFailed: true
      });
    }

    case actions.ActionTypes.PURCHASED_CUSTOMER_LIST_COUNT: {
      return Object.assign({}, state, {
        purchaseCount: 0,
        purchaseCountLoading: true,
        purchaseCountLoaded: false,
        purchaseCountFailed: false
      });
    }

    case actions.ActionTypes.PURCHASED_CUSTOMER_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        purchaseCount: payload.data,
        purchaseCountLoading: false,
        purchaseCountLoaded: true,
        purchaseCountFailed: false
      });
    }

    case actions.ActionTypes.PURCHASED_CUSTOMER_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        purchaseCount: 0,
        purchaseCountLoading: false,
        purchaseCountLoaded: false,
        purchaseCountFailed: true
      });
    }

//VIEW PRODUCT //
    case actions.ActionTypes.VIEW_PRODUCT_LIST: {
      return Object.assign({}, state, {
        ViewProductList: [],
        ViewProductListLoading: true,
        ViewProductListLoaded: false,
        ViewProductListFailed: false
      });
    }


    case actions.ActionTypes.VIEW_PRODUCT_LIST_SUCCESS: {
      return Object.assign({}, state, {
        ViewProductListLoading: false,
        ViewProductListLoaded: true,
        ViewProductListFailed: false,
        ViewProductList:payload.data
      });
    }


case actions.ActionTypes.VIEW_PRODUCT_LIST_FAIL: {
 
  return Object.assign({}, state, {
    ViewProductListLoading: false,
    ViewProductListLoaded: false,
    ViewProductListFailed: true
  });
}

//

case actions.ActionTypes.VIEW_PRODUCT_LIST_COUNT: {
  return Object.assign({}, state, {
    ViewProductListCount: 0,
    ViewProductListCountLoading: true,
    ViewProductListCountLoaded: false,
    ViewProductListCountFailed: false
  });
}

case actions.ActionTypes.VIEW_PRODUCT_LIST_COUNT_SUCCESS: {
  return Object.assign({}, state, {
    ViewProductListCount: payload.data,
    ViewProductListCountLoading: false,
    ViewProductListCountLoaded: true,
    ViewProductListCountFailed: false
  });
  
}

case actions.ActionTypes.VIEW_PRODUCT_LIST_COUNT_FAIL: {
  return Object.assign({}, state, {
   ViewProductListCount: 0,
   ViewProductListCountLoading: false,
   ViewProductListCountLoaded: false,
   ViewProductListCountFailed: true
  });
}
// 
  //ORDER PRODUCT //

  case actions.ActionTypes.ORDER_PRODUCT_LIST: {
  
    return Object.assign({}, state, {
      OrderProductList: 0,
      OrderProductListLoading: true,
      OrderProductListLoaded: false,
      OrderProductListFailed: false
    });
  }
    
case actions.ActionTypes.ORDER_PRODUCT_LIST_SUCCESS: {
  return Object.assign({}, state, {
    OrderProductListLoading: false,
    OrderProductListLoaded: true,
    OrderProductListFailed: false,
    OrderProductList: payload.data
  });
}

case actions.ActionTypes.ORDER_PRODUCT_LIST_FAIL: {
  return Object.assign({}, state, {
    OrderProductListLoading: false,
    OrderProductListLoaded: false,
    OrderProductListFailed: true
  });
}

//

case actions.ActionTypes.ORDER_PRODUCT_LIST_COUNT: {
  return Object.assign({}, state, {
    OrderProductListCount: 0,
    OrderProductListCountLoading: true,
    OrderProductListCountLoaded: false,
    OrderProductListCountFailed: false
  });
}

case actions.ActionTypes.ORDER_PRODUCT_LIST_COUNT_SUCCESS: {
  return Object.assign({}, state, {
     OrderProductListCount: payload.count,
     OrderProductListCountLoading: false,
     OrderProductListCountLoaded: true,
     OrderProductListCountFailed: false
  });
}

case actions.ActionTypes.ORDER_PRODUCT_LIST_COUNT_FAIL: {
  return Object.assign({}, state, {
    OrderProductListCount: 0,
    OrderProductListCountLoading: false,
    OrderProductListCountLoaded: false,
    OrderProductListCountFailed: true
  });
}
  

    
    default: {
      return state;
    }


   // <------------------PRODUCT EXPORT --------------------> //

   case actions.ActionTypes.EXPORT_CUSTOMER: {
    return Object.assign({}, state, {
      exportCustomer: '',
      exportCustomerLoading: true,
      exportCustomerLoaded: false,
      exportCustomerFailed: false,
    });
  }
  case actions.ActionTypes.EXPORT_CUSTOMER_SUCCESS: {
    return Object.assign({}, state, {
      exportCustomer: payload.data,
      exportCustomerLoading: false,
      exportCustomerLoaded: true,
      exportCustomerFailed: false,
    });
  }
  case actions.ActionTypes.EXPORT_CUSTOMER_FAIL: {
    return Object.assign({}, state, {
      exportCustomer: '',
      exportCustomerLoading: false,
      exportCustomerLoaded: false,
      exportCustomerFailed: true,
    });
  }

  // <------------------PRODUCT ALL EXPORT --------------------> //

  case actions.ActionTypes.ALL_EXPORT_CUSTOMER: {
    return Object.assign({}, state, {
      AllExportCustomerLoading: true,
      AllExportCustomerLoaded: false,
      AllExportCustomerFailed: false,
    });
  }
  case actions.ActionTypes.ALL_EXPORT_CUSTOMER_SUCCESS: {
    return Object.assign({}, state, {
      AllExportCustomer: payload.data,
      AllExportCustomerLoading: false,
      AllExportCustomerLoaded: true,
      AllExportCustomerFailed: false,
    });
  }
  case actions.ActionTypes.ALL_EXPORT_CUSTOMER_FAIL: {
    return Object.assign({}, state, {
      AllExportCustomerLoading: false,
      AllExportCustomerLoaded: true,
      AllExportCustomerFailed: true,
    });
  }









  }
}


// Media upload
export const purchasedCustomerList = (state: customer) => state.purchasedCustomerList;
export const purchasedCustomerListLoading = (state: customer) =>
  state.purchasedCustomerListLoading;
export const purchasedCustomerListLoaded = (state: customer) =>
  state.purchasedCustomerListLoaded;
export const purchasedCustomerListFailed = (state: customer) =>
  state.purchasedCustomerListFailed;

  export const purchasedCount = (state: customer) => state.purchaseCount;
  export const purchasedCountLoading = (state: customer) =>
  state.purchaseCountLoading;
  export const purchasedCountLoaded = (state: customer) =>
  state.purchaseCountLoaded;


  //VIEW PRODUCT //

  export const ViewProductList = (state: customer) => state.ViewProductList;
  export const ViewProductListLoading = (state: customer) =>
  state.ViewProductListLoading;
  export const ViewProductListLoaded = (state: customer) => state.ViewProductListLoaded;
  export const ViewProductListFailed = (state: customer) => state.ViewProductListFailed;


  export const ViewProductListCount = (state: customer) => state.ViewProductListCount;
  export const ViewProductListCountLoading = (state: customer) =>state.ViewProductListCountLoading;
  export const ViewProductListCountLoaded = (state: customer) =>state.ViewProductListCountLoaded;


  //VIEW PRODUCT //

  export const OrderProductList = (state: customer) => state.OrderProductList;
  export const OrderProductListLoading = (state: customer) =>
  state.OrderProductListLoading;
  export const OrderProductListLoaded = (state: customer) =>
  state.OrderProductListLoaded;
  export const OrderProductListFailed = (state: customer) =>
  state.OrderProductListFailed;

  export const OrderProductListCount = (state: customer) => state.OrderProductListCount;
  export const OrderProductListCountLoading = (state: customer) =>state.OrderProductListCountLoading;
  export const OrderProductListCountLoaded = (state: customer) =>state.OrderProductListCountLoaded;



  export const exportCustomerLoading = (state: customer) => state.exportCustomerLoading;
export const exportCustomerLoaded = (state: customer) => state.exportCustomerLoaded;
export const exportCustomerFailed = (state: customer) => state.exportCustomerFailed;
export const exportCustomer = (state: customer) => state.exportCustomer;

export const AllExportCustomerLoading = (state: customer) => state.AllExportCustomerLoading;
export const AllExportCustomerLoaded = (state: customer) => state.AllExportCustomerLoaded;
export const AllExportCustomerFailed = (state: customer) => state.AllExportCustomerFailed;
export const AllExportCustomer = (state: customer) => state.AllExportCustomer;
