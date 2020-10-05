/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
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

export const getOrderlist = createSelector(
  getorderState,
  fromsalesorder.getOrderlist
);
export const getOrderlistCount = createSelector(
  getorderState,
  fromsalesorder.getOrderlistCount
);
export const getOrderCountLoaded = createSelector(
  getorderState,
  fromsalesorder.getOrderCountLoaded
);
export const getOrderCountLoading = createSelector(
  getorderState,
  fromsalesorder.getOrderCountLoading
);
export const getOrderCountFailed = createSelector(
  getorderState,
  fromsalesorder.getOrderCountFailed
);
export const getvieworderData = createSelector(
  getorderState,
  fromsalesorder.getvieworderData
);
export const getVieworderLoaded = createSelector(
  getorderState,
  fromsalesorder.getVieworderLoaded
);
export const getVieworderFailed = createSelector(
  getorderState,
  fromsalesorder.getVieworderFailed
);
export const getVieworderLoading = createSelector(
  getorderState,
  fromsalesorder.getVieworderLoading
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
