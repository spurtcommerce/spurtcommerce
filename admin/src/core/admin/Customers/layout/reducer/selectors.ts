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
import * as fromCustomerLayout from './layout.reducer';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getCustomerLayoutState = (state: AppState) => state.customerLayout;
export const getTotalCustomerCount = createSelector(
  getCustomerLayoutState,
  fromCustomerLayout.getTotalCustomerCount
);
export const getTotalCustomerCountLoaded = createSelector(
  getCustomerLayoutState,
  fromCustomerLayout.getTotalCustomerCountLoaded
);
export const getTotalCustomerCountLoading = createSelector(
  getCustomerLayoutState,
  fromCustomerLayout.getTotalCustomerCountLoading
);
export const getTotalCustomerCountFailed = createSelector(
  getCustomerLayoutState,
  fromCustomerLayout.getTotalCustomerCountFailed
);

export const getActiveCustomerCount = createSelector(
  getCustomerLayoutState,
  fromCustomerLayout.getActiveCustomerCount
);
export const getActiveCustomerCountLoaded = createSelector(
  getCustomerLayoutState,
  fromCustomerLayout.getActiveCustomerCountLoaded
);
export const getActiveCustomerCountLoading = createSelector(
  getCustomerLayoutState,
  fromCustomerLayout.getActiveCustomerCountLoading
);
export const getActiveCustomerCountFailed = createSelector(
  getCustomerLayoutState,
  fromCustomerLayout.getActiveCustomerCountFailed
);

export const getInActiveCustomerCount = createSelector(
  getCustomerLayoutState,
  fromCustomerLayout.getInActiveCustomerCount
);
export const getInActiveCustomerCountLoaded = createSelector(
  getCustomerLayoutState,
  fromCustomerLayout.getInActiveCustomerCountLoaded
);
export const getInActiveCustomerCountLoading = createSelector(
  getCustomerLayoutState,
  fromCustomerLayout.getInActiveCustomerCountLoading
);
export const getInActiveCustomerCountFailed = createSelector(
  getCustomerLayoutState,
  fromCustomerLayout.getInActiveCustomerCountFailed
);
