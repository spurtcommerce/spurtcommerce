/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { createSelector } from 'reselect';

import * as fromDashboard from './dashboard.reducer';
import { AppState } from '../../app.state.interface';

export const getState = (State: AppState) => State.dashboard;
export const dashboardCount = createSelector(
  getState,
  fromDashboard.getDashboardCount
);
export const getProfile = createSelector(
  getState,
  fromDashboard.getProfile
);
export const getProfileValid = createSelector(
  getState,
  fromDashboard.getProfileValid
);
export const getLanguage = createSelector(
  getState,
  fromDashboard.getLanguages
);

export const dashboardCountLoading = createSelector(
  getState,
  fromDashboard.getDashboardCountLoading
);
export const dashboardCountLoaded = createSelector(
  getState,
  fromDashboard.getDashboardCountLoaded
);
export const dashboardCountFailed = createSelector(
  getState,
  fromDashboard.getDashboardCountFailed
);

export const profileLoading = createSelector(
  getState,
  fromDashboard.getProfileLoading
);
export const profileLoaded = createSelector(
  getState,
  fromDashboard.getProfileLoaded
);
export const profileFailed = createSelector(
  getState,
  fromDashboard.getProfileFailed
);

export const languageLoading = createSelector(
  getState,
  fromDashboard.getLanguageLoading
);
export const languageLoaded = createSelector(
  getState,
  fromDashboard.getLanguageLoaded
);
export const languageFailed = createSelector(
  getState,
  fromDashboard.getLanguageFailed
);
export const editProfile = createSelector(
  getState,
  fromDashboard.editProfile
);
export const editProfileLoading = createSelector(
  getState,
  fromDashboard.editProfileLoading
);
export const editProfileLoaded = createSelector(
  getState,
  fromDashboard.editProfileLoaded
);
export const editProfileFailed = createSelector(
  getState,
  fromDashboard.editProfileFailed
);

export const getTopSellingProducts = createSelector(
  getState,
  fromDashboard.getTopSellingProducts
);
export const countryLoading = createSelector(
  getState,
  fromDashboard.getTopSellingProductsLoading
);
export const countryLoaded = createSelector(
  getState,
  fromDashboard.getTopSellingProductsLoaded
);
export const countryFailed = createSelector(
  getState,
  fromDashboard.getTopSellingProductsFailed
);

export const orderList = createSelector(
  getState,
  fromDashboard.orderList
);
export const todayOrderList = createSelector(
  getState,
  fromDashboard.todayOrderList
);
export const previousOrderList = createSelector(
  getState,
  fromDashboard.previousOrderList
);
export const orderListLoading = createSelector(
  getState,
  fromDashboard.orderListLoading
);
export const orderListLoaded = createSelector(
  getState,
  fromDashboard.orderListLoaded
);
export const orderListFailed = createSelector(
  getState,
  fromDashboard.orderListFailed
);



export const orderListCount = createSelector(
  getState,
  fromDashboard.orderListCount
);
export const todayOrderListCount = createSelector(
  getState,
  fromDashboard.todayOrderListCount
);
export const previousOrderListCount = createSelector(
  getState,
  fromDashboard.previousOrderListCount
);
export const orderListCountLoading = createSelector(
  getState,
  fromDashboard.orderListCountLoading
);
export const orderListCountLoaded = createSelector(
  getState,
  fromDashboard.orderListCountLoaded
);
export const orderListCountFailed = createSelector(
  getState,
  fromDashboard.orderListCountFailed
);