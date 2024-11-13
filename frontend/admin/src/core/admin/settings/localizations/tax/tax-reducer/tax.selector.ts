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
import * as fromTax from '../tax-reducer/tax.reducer';

export const getTaxList = (state: AppState) => state.tax;
export const getTaxlist = createSelector(
  getTaxList,
  fromTax.getTaxList
);
export const getTaxlistCount = createSelector(
  getTaxList,
  fromTax.getTaxListCount
);
export const getTaxNew = createSelector(
  getTaxList,
  fromTax.getTaxNew
);
export const getTaxNewDetail = createSelector(
  getTaxList,
  fromTax.getTaxNewdetail
);
export const getTaxUpdate = createSelector(
  getTaxList,
  fromTax.getTaxUpdate
);
export const getTaxDelete = createSelector(
  getTaxList,
  fromTax.getTaxDelete
);

export const TaxListLoading = createSelector(
  getTaxList,
  fromTax.getTaxListLoading
);
export const TaxListLoaded = createSelector(
  getTaxList,
  fromTax.getTaxListLoaded
);
export const TaxListFailed = createSelector(
  getTaxList,
  fromTax.getTaxListFailed
);

export const TaxCountLoading = createSelector(
  getTaxList,
  fromTax.getTaxCountLoading
);
export const TaxCountLoaded = createSelector(
  getTaxList,
  fromTax.getTaxCountLoaded
);
export const TaxCountFailed = createSelector(
  getTaxList,
  fromTax.getTaxCountFailed
);

export const TaxAddLoading = createSelector(
  getTaxList,
  fromTax.getTaxAddLoading
);
export const TaxAddLoaded = createSelector(
  getTaxList,
  fromTax.getTaxAddLoaded
);
export const TaxAddFailed = createSelector(
  getTaxList,
  fromTax.getTaxAddFailed
);

export const TaxDeleteLoading = createSelector(
  getTaxList,
  fromTax.getTaxDeleteLoading
);
export const TaxDeleteLoaded = createSelector(
  getTaxList,
  fromTax.getTaxDeleteLoaded
);
export const TaxDeleteFailed = createSelector(
  getTaxList,
  fromTax.getTaxDeleteFailed
);

export const TaxUpdateLoading = createSelector(
  getTaxList,
  fromTax.getTaxUpdateLoading
);
export const TaxUpdateLoaded = createSelector(
  getTaxList,
  fromTax.getTaxUpdateLoaded
);
export const TaxUpdateFailed = createSelector(
  getTaxList,
  fromTax.getTaxUpdateFailed
);
