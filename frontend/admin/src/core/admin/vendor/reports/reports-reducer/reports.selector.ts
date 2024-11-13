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
import * as fromProduct from './reports.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getProdState = (state: AppState) => state.reports;

export const vendorSalesReport = createSelector(
  getProdState,
  fromProduct.vendorSalesReport
);
export const vendorSalesReportLoading = createSelector(
  getProdState,
  fromProduct.vendorSalesReportLoading
);
export const vendorSalesReportLoaded = createSelector(
  getProdState,
  fromProduct.vendorSalesReportLoaded
);


export const totalSalesReport = createSelector(
  getProdState,
  fromProduct.totalSalesReport
);
export const totalSalesReportLoading = createSelector(
  getProdState,
  fromProduct.totalSalesReportLoading
);
export const totalSalesReportLoaded = createSelector(
  getProdState,
  fromProduct.totalSalesReportLoaded
);


export const settlementReport = createSelector(
  getProdState,
  fromProduct.settlementReport
);
export const settlementReportLoading = createSelector(
  getProdState,
  fromProduct.settlementReportLoading
);
export const settlementReportLoaded = createSelector(
  getProdState,
  fromProduct.settlementReportLoaded
);



export const vendorList = createSelector(
  getProdState,
  fromProduct.vendorList
);
export const vendorListLoading = createSelector(
  getProdState,
  fromProduct.vendorListLoading
);
export const vendorListLoaded = createSelector(
  getProdState,
  fromProduct.vendorListLoaded
);


export const exportSettlementReport = createSelector(
  getProdState,
  fromProduct.exportSettlementReport
);
export const exportSettlementReportLoading = createSelector(
  getProdState,
  fromProduct.exportSettlementReportLoading
);
export const exportSettlementReportLoaded = createSelector(
  getProdState,
  fromProduct.exportSettlementReportLoaded
);


export const exportTotalSalesReport = createSelector(
  getProdState,
  fromProduct.exportTotalSalesReport
);
export const exportTotalSalesReportLoading = createSelector(
  getProdState,
  fromProduct.exportTotalSalesReportLoading
);
export const exportTotalSalesReportLoaded = createSelector(
  getProdState,
  fromProduct.exportTotalSalesReportLoaded
);

export const exportVendorSalesReport = createSelector(
  getProdState,
  fromProduct.exportVendorSalesReport
);
export const exportVendorSalesReportLoading = createSelector(
  getProdState,
  fromProduct.exportVendorSalesReportLoading
);
export const exportVendorSalesReportLoaded = createSelector(
  getProdState,
  fromProduct.exportVendorSalesReportLoaded
);

export const orderStatusList = createSelector(
  getProdState,
  fromProduct.orderStatusList
);
