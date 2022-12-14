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
import * as fromsalesorder from './orders.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */

export const getorderState = (state: AppState) => state.salesorder;
export const settingDetail = createSelector(
  getorderState,
  fromsalesorder.getSettingDetail
);

export const orderList = createSelector(
  getorderState,
  fromsalesorder.orderList
);
export const orderListCount = createSelector(
  getorderState,
  fromsalesorder.orderListCount
);
export const orderListCountLoading = createSelector(
  getorderState,
  fromsalesorder.orderListCountLoading
);
export const orderListCountLoaded = createSelector(
  getorderState,
  fromsalesorder.orderListCountLoaded
);


export const viewOrderDetails = createSelector(
  getorderState,
  fromsalesorder.viewOrderDetails
);
export const viewOrderDetailsLoading = createSelector(
  getorderState,
  fromsalesorder.viewOrderDetailsLoading
);
export const viewOrderDetailsLoaded = createSelector(
  getorderState,
  fromsalesorder.viewOrderDetailsLoaded
);
export const viewOrderDetailsFailed = createSelector(
  getorderState,
  fromsalesorder.viewOrderDetailsFailed
);


export const getOrderDeleteLoading = createSelector(
  getorderState,
  fromsalesorder.getOrderDeleteLoading
);
export const getOrderDeleteLoaded = createSelector(
  getorderState,
  fromsalesorder.getOrderDeleteLoaded
);
export const getOrderDeleteFailed = createSelector(
  getorderState,
  fromsalesorder.getOrderDeleteFailed
);
export const getorderDeleteValue = createSelector(
  getorderState,
  fromsalesorder.getorderDeleteValue
);


export const getOrderLogLoading = createSelector(
  getorderState,
  fromsalesorder.getOrderLogLoading
);
export const getOrderLogLoaded = createSelector(
  getorderState,
  fromsalesorder.getOrderLogLoaded
);
export const getOrderLogFailed = createSelector(
  getorderState,
  fromsalesorder.getOrderLogFailed
);
export const getOrderLogValue = createSelector(
  getorderState,
  fromsalesorder.getOrderLogValue
);


export const getInvoiceDetailLoading = createSelector(
  getorderState,
  fromsalesorder.getInvoiceDetailLoading
);
export const getInvoiceDetailLoaded = createSelector(
  getorderState,
  fromsalesorder.getInvoiceDetailLoaded
);
export const getInvoiceDetailFailed = createSelector(
  getorderState,
  fromsalesorder.getInvoiceDetailFailed
);
export const getInvoiceDetail = createSelector(
  getorderState,
  fromsalesorder.getInvoiceDetail
);
