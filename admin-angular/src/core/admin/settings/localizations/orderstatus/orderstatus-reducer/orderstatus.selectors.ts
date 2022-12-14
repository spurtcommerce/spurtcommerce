/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { AppState } from '../../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromorder from './orderstatus.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */

export const getorderState = (state: AppState) => state.orderStatus;
export const getOrderstatuslist = createSelector(
  getorderState,
  fromorder.getOrderstatuslist
);
export const getOrderstatuspaginationcount = createSelector(
  getorderState,
  fromorder.getOrderstatuspaginationcount
);
export const getneworderstatus = createSelector(
  getorderState,
  fromorder.getneworderstatus
);
export const getneworderstatusroot = createSelector(
  getorderState,
  fromorder.getneworderstatusroot
);
export const getupdateorderstatus = createSelector(
  getorderState,
  fromorder.getupdateorderstatus
);
export const getupdateorderstatusroot = createSelector(
  getorderState,
  fromorder.getupdateorderstatusroot
);
export const getupdateProductorderstatus = createSelector(
  getorderState,
  fromorder.getupdateProductorderstatus
);
export const getupdateProductTrackingstatus = createSelector(
  getorderState,
  fromorder.getupdateProductTrackingstatus
);
export const getorderdelete = createSelector(
  getorderState,
  fromorder.getorderdelete
);

export const OrderStatusListLoading = createSelector(
  getorderState,
  fromorder.getOrderStatusListLoading
);
export const OrderStatusListLoaded = createSelector(
  getorderState,
  fromorder.getOrderStatusListLoaded
);
export const OrderStatusListFailed = createSelector(
  getorderState,
  fromorder.getOrderStatusListFailed
);

export const OrderStatusCountLoading = createSelector(
  getorderState,
  fromorder.getOrderStatusCountLoading
);
export const OrderStatusCountLoaded = createSelector(
  getorderState,
  fromorder.getOrderStatusCountLoaded
);
export const OrderStatusCountFailed = createSelector(
  getorderState,
  fromorder.getOrderStatusCountFailed
);

export const OrderStatusAddLoading = createSelector(
  getorderState,
  fromorder.getOrderStatusAddLoading
);
export const OrderStatusAddLoaded = createSelector(
  getorderState,
  fromorder.getOrderStatusAddLoaded
);
export const OrderStatusAddFailed = createSelector(
  getorderState,
  fromorder.getOrderStatusAddFailed
);

export const OrderStatusDeleteLoading = createSelector(
  getorderState,
  fromorder.getOrderStatusDeleteLoading
);
export const OrderStatusDeleteLoaded = createSelector(
  getorderState,
  fromorder.getOrderStatusDeleteLoaded
);
export const OrderStatusDeleteFailed = createSelector(
  getorderState,
  fromorder.getOrderStatusDeleteFailed
);

export const OrderStatusUpdateLoading = createSelector(
  getorderState,
  fromorder.getOrderStatusUpdateLoading
);
export const OrderStatusUpdateLoaded = createSelector(
  getorderState,
  fromorder.getOrderStatusUpdateLoaded
);
export const OrderStatusUpdateFailed = createSelector(
  getorderState,
  fromorder.getOrderStatusUpdateFailed
);
export const OrderStatusUpdateProductLoading = createSelector(
  getorderState,
  fromorder.getOrderStatusUpdateProductLoading
);
export const OrderStatusUpdateProductLoaded = createSelector(
  getorderState,
  fromorder.getOrderStatusUpdateProductLoaded
);
export const OrderStatusUpdateProductFailed = createSelector(
  getorderState,
  fromorder.getOrderStatusUpdateProductFailed
);
export const TrackingStatusUpdateProductLoading = createSelector(
  getorderState,
  fromorder.getTrackingStatusUpdateProductLoading
);
export const TrackingStatusUpdateProductLoaded = createSelector(
  getorderState,
  fromorder.getTrackingStatusUpdateProductLoaded
);
export const TrackingStatusUpdateProductFailed = createSelector(
  getorderState,
  fromorder.getTrackingStatusUpdateProductFailed
);
