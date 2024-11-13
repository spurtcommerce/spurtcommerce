/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { createSelector } from 'reselect';
import { AppState } from '../../../../../app.state.interface';
import * as fromCurrency from '../currency-reducer/currency.reducer';

export const getCurrencyList = (state: AppState) => state.currency;
export const getCurrencylist = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyList
);
export const getCurrencylistCount = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyListCount
);
export const getCurrencyNew = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyNew
);
export const getCurrencyNewDetail = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyNewdetail
);
export const getCurrencyUpdate = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyUpdate
);
export const getCurrencyDelete = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyDelete
);

export const CurrencyListLoading = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyListLoading
);
export const CurrencyListLoaded = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyListLoaded
);
export const CurrencyListFailed = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyListFailed
);

export const CurrencyCountLoading = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyCountLoading
);
export const CurrencyCountLoaded = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyCountLoaded
);
export const CurrencyCountFailed = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyCountFailed
);

export const CurrencyAddLoading = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyAddLoading
);
export const CurrencyAddLoaded = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyAddLoaded
);
export const CurrencyAddFailed = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyAddFailed
);

export const CurrencyDeleteLoading = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyDeleteLoading
);
export const CurrencyDeleteLoaded = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyDeleteLoaded
);
export const CurrencyDeleteFailed = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyDeleteFailed
);

export const CurrencyUpdateLoading = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyUpdateLoading
);
export const CurrencyUpdateLoaded = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyUpdateLoaded
);
export const CurrencyUpdateFailed = createSelector(
  getCurrencyList,
  fromCurrency.getCurrencyUpdateFailed
);
