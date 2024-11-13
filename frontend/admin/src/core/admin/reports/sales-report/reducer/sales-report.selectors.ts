/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { createSelector } from 'reselect';
// reducer
import * as fromCoupon from './sales-report.reducer';
// app state
import { AppState } from '../../../../app.state.interface';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functionsget
 */

export const topupDetailsState = (state: AppState) => state.salesReport;


// customer topup list

export const salesReportList = createSelector(
  topupDetailsState,
  fromCoupon.salesReportList
);
export const salesReportListLoading = createSelector(
  topupDetailsState,
  fromCoupon.salesReportListLoading
);
export const salesReportListLoaded = createSelector(
  topupDetailsState,
  fromCoupon.salesReportListLoaded
);

// customer topup list count

export const salesReportListCount = createSelector(
  topupDetailsState,
  fromCoupon.salesReportListCount
);



export const productList = createSelector(
  topupDetailsState,
  fromCoupon.productList
);
export const selectedProductList = createSelector(
  topupDetailsState,
  fromCoupon.selectedProductList
);
export const productListLoading = createSelector(
  topupDetailsState,
  fromCoupon.productListLoading
);
export const productListLoaded = createSelector(
  topupDetailsState,
  fromCoupon.productListLoaded
);


export const categoryList = createSelector(
  topupDetailsState,
  fromCoupon.categoryList
);
export const categoryListLoading = createSelector(
  topupDetailsState,
  fromCoupon.categoryListLoading
);
export const categoryListLoaded = createSelector(
  topupDetailsState,
  fromCoupon.categoryListLoaded
);

export const exportListLoading =createSelector(topupDetailsState,
  fromCoupon.exportListLoading)
