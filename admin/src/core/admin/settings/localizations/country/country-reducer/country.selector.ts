/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { AppState } from '../../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromCountry from '../country-reducer/country.reducer';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getCountryState = (state: AppState) => state.country;
export const getCountryLst = createSelector(
  getCountryState,
  fromCountry.getCountryList
);
export const getCountryCount = createSelector(
  getCountryState,
  fromCountry.getCoutryCount
);
export const getAddcountry = createSelector(
  getCountryState,
  fromCountry.getAddCountry
);
export const getUpdateCountry = createSelector(
  getCountryState,
  fromCountry.getUpdateCountry
);
export const getDeleteCountry = createSelector(
  getCountryState,
  fromCountry.getDeleteCountry
);

export const CountryListLoading = createSelector(
  getCountryState,
  fromCountry.getCountryListLoading
);
export const CountryListLoaded = createSelector(
  getCountryState,
  fromCountry.getCountryListLoaded
);
export const CountryListFailed = createSelector(
  getCountryState,
  fromCountry.getCountryListFailed
);

export const CountryCountLoading = createSelector(
  getCountryState,
  fromCountry.getCountryCountLoading
);
export const CountryCountLoaded = createSelector(
  getCountryState,
  fromCountry.getCountryCountLoaded
);
export const CountryCountFailed = createSelector(
  getCountryState,
  fromCountry.getCountryCountFailed
);

export const CountryAddLoading = createSelector(
  getCountryState,
  fromCountry.getCountryAddLoading
);
export const CountryAddLoaded = createSelector(
  getCountryState,
  fromCountry.getCountryAddLoaded
);
export const CountryAddFailed = createSelector(
  getCountryState,
  fromCountry.getCountryAddFailed
);

export const CountryDeleteLoading = createSelector(
  getCountryState,
  fromCountry.getCountryDeleteLoading
);
export const CountryDeleteLoaded = createSelector(
  getCountryState,
  fromCountry.getCountryDeleteLoaded
);
export const CountryDeleteFailed = createSelector(
  getCountryState,
  fromCountry.getCountryDeleteFailed
);

export const CountryUpdateLoading = createSelector(
  getCountryState,
  fromCountry.getCountryUpdateLoading
);
export const CountryUpdateLoaded = createSelector(
  getCountryState,
  fromCountry.getCountryUpdateLoaded
);
export const CountryUpdateFailed = createSelector(
  getCountryState,
  fromCountry.getCountryUpdateFailed
);
