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
import * as fromSalesLayout from './layout.reducer';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getSalesLayoutState = (state: AppState) => state.salesLayout;

export const salesCount = createSelector(
  getSalesLayoutState,
  fromSalesLayout.salesCount
);
export const salesCountLoading = createSelector(
  getSalesLayoutState,
  fromSalesLayout.salesCountLoading
);
export const salesCountLoaded = createSelector(
  getSalesLayoutState,
  fromSalesLayout.salesCountLoaded
);
export const salesCountFailed = createSelector(
  getSalesLayoutState,
  fromSalesLayout.salesCountFailed
);
