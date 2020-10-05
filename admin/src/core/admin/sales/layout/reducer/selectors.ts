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
import * as fromSalesLayout from './layout.reducer';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getSalesLayoutState = (state: AppState) => state.salesLayout;
export const getTotalOrderCount = createSelector(
  getSalesLayoutState,
  fromSalesLayout.getTotalOrderCount
);
export const getTotalOrderCountLoaded = createSelector(
  getSalesLayoutState,
  fromSalesLayout.getTotalOrderCountLoaded
);
export const getTotalOrderCountLoading = createSelector(
  getSalesLayoutState,
  fromSalesLayout.getTotalOrderCountLoading
);
export const getTotalOrderCountFailed = createSelector(
  getSalesLayoutState,
  fromSalesLayout.getTotalOrderCountFailed
);

export const getTotalOrderAmount = createSelector(
  getSalesLayoutState,
  fromSalesLayout.getTotalOrderAmount
);
export const getTotalOrderAmountLoaded = createSelector(
  getSalesLayoutState,
  fromSalesLayout.getTotalOrderAmountLoaded
);
export const getTotalOrderAmountLoading = createSelector(
  getSalesLayoutState,
  fromSalesLayout.getTotalOrderAmountLoading
);
export const getTotalOrderAmountFailed = createSelector(
  getSalesLayoutState,
  fromSalesLayout.getTotalOrderAmountFailed
);

export const getTodayOrderAmount = createSelector(
  getSalesLayoutState,
  fromSalesLayout.getTodayOrderAmount
);
export const getTodayOrderAmountLoaded = createSelector(
  getSalesLayoutState,
  fromSalesLayout.getTodayOrderAmountLoaded
);
export const getTodayOrderAmountLoading = createSelector(
  getSalesLayoutState,
  fromSalesLayout.getTodayOrderAmountLoading
);
export const getTodayOrderAmountFailed = createSelector(
  getSalesLayoutState,
  fromSalesLayout.getTotalOrderAmountFailed
);

export const getTodayOrderCount = createSelector(
  getSalesLayoutState,
  fromSalesLayout.getTodayOrderCount
);
export const getTodayOrderCountLoaded = createSelector(
  getSalesLayoutState,
  fromSalesLayout.getTodayOrderCountLoaded
);
export const getTodayOrderCountLoading = createSelector(
  getSalesLayoutState,
  fromSalesLayout.getTodayOrderCountLoading
);
export const getTodayOrderCountFailed = createSelector(
  getSalesLayoutState,
  fromSalesLayout.getTotalOrderAmountFailed
);
