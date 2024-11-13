/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { createSelector } from 'reselect';
// reducer
import * as fromCoupon from './inventory-products.reducer';
// app state
import { AppState } from '../../../../app.state.interface';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functionsget
 */

export const getinventoryState = (state: AppState) => state.inventoryProduct;


// inventory product list

export const inventoryProductList = createSelector(
  getinventoryState,
  fromCoupon.inventoryProductList
);
export const inventoryProductListLoading = createSelector(
  getinventoryState,
  fromCoupon.inventoryProductListLoading
);
export const inventoryProductListLoaded = createSelector(
  getinventoryState,
  fromCoupon.inventoryProductListLoaded
);

// inventory product list count

export const inventoryProductListCount = createSelector(
  getinventoryState,
  fromCoupon.inventoryProductListCount
);
export const inventoryProductListCountLoading = createSelector(
  getinventoryState,
  fromCoupon.inventoryProductListCountLoading
);
export const inventoryProductListCountLoaded = createSelector(
  getinventoryState,
  fromCoupon.inventoryProductListCountLoaded
);
