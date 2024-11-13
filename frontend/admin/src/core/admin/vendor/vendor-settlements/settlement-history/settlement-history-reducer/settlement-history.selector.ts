/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { AppState } from '../../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromProduct from './settlement-history.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getProdState = (state: AppState) => state.settlementHistory;


// product list action

export const excelLoading = createSelector(
  getProdState,
  fromProduct.exportExcelLoading
);
export const historyListCount = createSelector(
  getProdState,
  fromProduct.historyListCount
);
export const historyList = createSelector(
  getProdState,
  fromProduct.historyList
);
export const historyListLoading = createSelector(
  getProdState,
  fromProduct.historyListLoading
);
export const historyListLoaded = createSelector(
  getProdState,
  fromProduct.historyListLoaded
);

export const settlementDetails = createSelector(
  getProdState,
  fromProduct.settlementDetails
);
