/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { AppState } from '../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromsalesorder from './failed-order.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */

export const getorderState = (state: AppState) => state.salesFailedOrder;
export const settingDetail = createSelector(
  getorderState,
  fromsalesorder.getSettingDetail
);

export const orderList = createSelector(
  getorderState,
  fromsalesorder.orderList
);
export const orderListLoading = createSelector(
  getorderState,
  fromsalesorder.orderListLoading
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

export const moveToMainOrder = createSelector(
  getorderState,
  fromsalesorder.moveToMainOrder
);
export const moveToMainOrderLoading = createSelector(
  getorderState,
  fromsalesorder.moveToMainOrderLoading
);
export const moveToMainOrderLoaded = createSelector(
  getorderState,
  fromsalesorder.moveToMainOrderLoaded
);

export const paymentList = createSelector(
  getorderState,
  fromsalesorder.paymentList
);
export const paymentListLoading = createSelector(
  getorderState,
  fromsalesorder.paymentListLoading
);
export const paymentListLoaded = createSelector(
  getorderState,
  fromsalesorder.paymentListLoaded
);
export const orderExcelLoading = createSelector(getorderState,
  fromsalesorder.orderExcelLoading)
