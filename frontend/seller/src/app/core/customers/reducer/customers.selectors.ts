/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { createSelector } from 'reselect';
import * as fromCustomer from './customers.reducer';
// app state
import { AppState } from '../../app.state.interface';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 * 
 * 
 */

export const purchasedCustomerState = (state: AppState) => state.customers;
// purchased customer list
export const purchasedCustomerList = createSelector(
  purchasedCustomerState,
  fromCustomer.purchasedCustomerList
);
export const purchasedCustomerListLoading = createSelector(
  purchasedCustomerState,
  fromCustomer.purchasedCustomerListLoading
);
export const purchasedCustomerListLoaded = createSelector(
  purchasedCustomerState,
  fromCustomer.purchasedCustomerListLoaded
);
export const purchasedCustomerListFailed = createSelector(
  purchasedCustomerState,
  fromCustomer.purchasedCustomerListFailed
);

export const purchaseCount = createSelector(
  purchasedCustomerState,
  fromCustomer.purchasedCount
);
export const purchaseCountLoaded = createSelector(
  purchasedCustomerState,
  fromCustomer.purchasedCountLoaded
);
export const purchaseCountLoading = createSelector(
  purchasedCustomerState,
  fromCustomer.purchasedCountLoading
);


//VIEW PRODUCT //

export const ViewProductList = createSelector(
  purchasedCustomerState,
  fromCustomer.ViewProductList
);
export const ViewProductListLoaded = createSelector(
  purchasedCustomerState,
  fromCustomer.ViewProductListLoaded
);
export const ViewProductListLoading = createSelector(
  purchasedCustomerState,
  fromCustomer.ViewProductListLoading,
);
 export const ViewProductListFailed = createSelector(
    purchasedCustomerState,
    fromCustomer.ViewProductListFailed,
  );


  export const ViewProductListCount = createSelector(
    purchasedCustomerState,
    fromCustomer.ViewProductListCount
  );
  export const ViewProductListCountLoaded = createSelector(
    purchasedCustomerState,
    fromCustomer.ViewProductListCountLoaded
  );
  export const ViewProductListCountLoading = createSelector(
    purchasedCustomerState,
    fromCustomer.ViewProductListCountLoading
  );

  //ORDER PRODUCT //

  
export const OrderProductList = createSelector(
  purchasedCustomerState,
  fromCustomer.OrderProductList,
);
export const OrderProductListLoaded = createSelector(
  purchasedCustomerState,
  fromCustomer.OrderProductListLoaded
);
export const OrderProductListLoading = createSelector(
  purchasedCustomerState,
  fromCustomer.OrderProductListLoading,
);
 export const OrderProductListFailed = createSelector(
    purchasedCustomerState,
    fromCustomer.OrderProductListFailed,
  );


  export const OrderProductListCount = createSelector(
    purchasedCustomerState,
    fromCustomer.OrderProductListCount
  );
  export const OrderProductListCountLoaded = createSelector(
    purchasedCustomerState,
    fromCustomer.OrderProductListCountLoaded
  );
  export const OrderProductListCountLoading = createSelector(
    purchasedCustomerState,
    fromCustomer.OrderProductListCountLoading
  );


  export const exportCustomer = createSelector(
    purchasedCustomerState,
    fromCustomer.exportCustomer
  );
  export const exportCustomerLoading = createSelector(
    purchasedCustomerState,
    fromCustomer.exportCustomerLoading
  );
  export const exportCustomerLoaded = createSelector(
    purchasedCustomerState,
    fromCustomer.exportCustomerLoaded
  );
  export const exportCustomerFailed = createSelector(
    purchasedCustomerState,
    fromCustomer.exportCustomerFailed
  );
  
  export const AllExportCustomer = createSelector(
    purchasedCustomerState,
    fromCustomer.AllExportCustomer
  );
  export const AllExportCustomerLoading = createSelector(
    purchasedCustomerState,
    fromCustomer.AllExportCustomerLoading
  );
  export const AllExportCustomerLoaded = createSelector(
    purchasedCustomerState,
    fromCustomer.AllExportCustomerLoaded
  );
  export const AllExportCustomerFailed = createSelector(
    purchasedCustomerState,
    fromCustomer.AllExportCustomerFailed
  );




  
