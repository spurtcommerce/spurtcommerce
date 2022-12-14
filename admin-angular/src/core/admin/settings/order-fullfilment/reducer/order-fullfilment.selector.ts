/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { AppState } from '../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromOrderfullfillment from '../reducer/order-fullfilment.reducer';

export const getOrderfullfillmentState = (state: AppState) => state.Orderfullfillment;

     /*Order fullFillment List*/

export const Orderfullfillmentlist = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.Orderfullfillmentlist
);

export const OrderfullfillmentlistLoading = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.OrderfullfillmentlistLoading
);
export const OrderfullfillmentlistLoaded = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.OrderfullfillmentlistLoaded
);
export const OrderfullfillmentlistFailed = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.OrderfullfillmentlistFailed
);





export const addOrderfullfillment = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.addOrderfullfillment
);

export const addOrderfullfillmentLoading = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.addOrderfullfillmentLoading
);
export const addOrderfullfillmentLoaded = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.addOrderfullfillmentLoaded
);
export const addOrderfullfillmentFailed = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.addOrderfullfillmentFailed
);

   /*Order fullFillment Status*/

   export const orderfullfillmentstatus = createSelector(
    getOrderfullfillmentState,
    fromOrderfullfillment.orderfullfillmentstatus
  );

   export const orderfullfillmentstatusLoading = createSelector(
    getOrderfullfillmentState,
    fromOrderfullfillment.orderfullfillmentstatusLoading
  );
  export const orderfullfillmentstatusLoaded = createSelector(
    getOrderfullfillmentState,
    fromOrderfullfillment.orderfullfillmentstatusLoaded
  );
  export const orderfullfillmentstatusFailed = createSelector(
    getOrderfullfillmentState,
    fromOrderfullfillment.orderfullfillmentstatusFailed
  );

        /*Update Order fullFillment Status*/
export const updateOrderfullfillment = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.updateOrderfullfillment
);

  export const updateOrderfullfillmentLoading = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.updateOrderfullfillmentLoading
);
export const updateOrderfullfillmentLoaded = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.updateOrderfullfillmentLoaded
);
export const updateOrderfullfillmentFailed = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.updateOrderfullfillmentFailed
);