/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { createSelector } from 'reselect';
import { AppState } from '../../../../../app.state.interface';
import * as fromstock from './stock.reducer';

export const getstockStatus = (state: AppState) => state.stockstatus;
export const getStockList = createSelector(
  getstockStatus,
  fromstock.getStockList
);
export const getNewStock = createSelector(
  getstockStatus,
  fromstock.getNewStock
);
export const getstockListCount = createSelector(
  getstockStatus,
  fromstock.getStockcount
);
export const getstockUpdate = createSelector(
  getstockStatus,
  fromstock.getstockUpdate
);
export const getStockDelete = createSelector(
  getstockStatus,
  fromstock.getstockdelete
);

export const StockStatusListLoading = createSelector(
  getstockStatus,
  fromstock.getStockStatusListLoading
);
export const StockStatusListLoaded = createSelector(
  getstockStatus,
  fromstock.getStockStatusListLoaded
);
export const StockStatusListFailed = createSelector(
  getstockStatus,
  fromstock.getStockStatusListFailed
);

export const StockStatusCountLoading = createSelector(
  getstockStatus,
  fromstock.getStockStatusCountLoading
);
export const StockStatusCountLoaded = createSelector(
  getstockStatus,
  fromstock.getStockStatusCountLoaded
);
export const StockStatusCountFailed = createSelector(
  getstockStatus,
  fromstock.getStockStatusCountFailed
);

export const StockStatusAddLoading = createSelector(
  getstockStatus,
  fromstock.getStockStatusAddLoading
);
export const StockStatusAddLoaded = createSelector(
  getstockStatus,
  fromstock.getStockStatusAddLoaded
);
export const StockStatusAddFailed = createSelector(
  getstockStatus,
  fromstock.getStockStatusAddFailed
);

export const StockStatusDeleteLoading = createSelector(
  getstockStatus,
  fromstock.getStockStatusDeleteLoading
);
export const StockStatusDeleteLoaded = createSelector(
  getstockStatus,
  fromstock.getStockStatusDeleteLoaded
);
export const StockStatusDeleteFailed = createSelector(
  getstockStatus,
  fromstock.getStockStatusDeleteFailed
);

export const StockStatusUpdateLoading = createSelector(
  getstockStatus,
  fromstock.getStockStatusUpdateLoading
);
export const StockStatusUpdateLoaded = createSelector(
  getstockStatus,
  fromstock.getStockStatusUpdateLoaded
);
export const StockStatusUpdateFailed = createSelector(
  getstockStatus,
  fromstock.getStockStatusUpdateFailed
);
