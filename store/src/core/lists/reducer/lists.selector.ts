/*
 * spurtcommerce
 * version 1.0
 * www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { createSelector } from 'reselect';

import * as fromList from './lists.reducer';
import { AppState } from '../../state.interface';

export const getState = (State: AppState) => State.list;
export const getProductList = createSelector(
  getState,
  fromList.productList
);
export const getactiveCategoryID = createSelector(
  getState,
  fromList.activeCategoryID
);
export const getMaxProductPrice = createSelector(
  getState,
  fromList.maxProductPrice
);
export const getProductCount = createSelector(
  getState,
  fromList.getProductCount
);
export const getCategoryList = createSelector(
  getState,
  fromList.categoryList
);
export const getManufacturer = createSelector(
  getState,
  fromList.manufacturer
);
export const getProductDetail = createSelector(
  getState,
  fromList.productDetail
);
export const getproductDetailMandatory = createSelector(
  getState,
  fromList.productDetailMandatory
);
export const getProductLoading = createSelector(
  getState,
  fromList.productLoading
);
export const getProductLoaded = createSelector(
  getState,
  fromList.productLoaded
);
export const getProductFailed = createSelector(
  getState,
  fromList.productFailed
);

export const getAvailableOptionsArray = createSelector(
  getState,
  fromList.getAvailableOptionsArray
);

export const bannerList = createSelector(
  getState,
  fromList.getBannerList
);
export const bannerLoadingStatus = createSelector(
  getState,
  fromList.getListLoading
);
export const bannerLoadedStatus = createSelector(
  getState,
  fromList.getListLoaded
);
export const bannerFailedStatus = createSelector(
  getState,
  fromList.getListFailed
);

export const bannerCount = createSelector(
  getState,
  fromList.getBannerCount
);
export const countLoadingStatus = createSelector(
  getState,
  fromList.getCountLoading
);
export const countLoadedStatus = createSelector(
  getState,
  fromList.getCountLoaded
);
export const countFailedStatus = createSelector(
  getState,
  fromList.getCountFailed
);

export const getPageList = createSelector(
  getState,
  fromList.getPageList
);
export const pageListLoadingStatus = createSelector(
  getState,
  fromList.getPageListLoading
);
export const pageListLoadedStatus = createSelector(
  getState,
  fromList.getPageListLoaded
);
export const pageListFailedStatus = createSelector(
  getState,
  fromList.getPageListFailed
);
export const settingDetail = createSelector(
  getState,
  fromList.getSettingDetail
);

export const contactUsLoadingStatus = createSelector(
  getState,
  fromList.getContactUsLoading
);
export const contactUsLoadedStatus = createSelector(
  getState,
  fromList.getContactUsLoaded
);
export const contactUsFailedStatus = createSelector(
  getState,
  fromList.getContactUsFailed
);
export const getContactDetail = createSelector(
  getState,
  fromList.getContactDetail
);

export const pageDetailLoadingStatus = createSelector(
  getState,
  fromList.getPageDetailLoading
);
export const pageDetailLoadedStatus = createSelector(
  getState,
  fromList.getPageDetailLoaded
);
export const pageDetailFailedStatus = createSelector(
  getState,
  fromList.getPageDetailFailed
);
export const pageDetail = createSelector(
  getState,
  fromList.getPageDetail
);

export const manufacturerLoadingStatus = createSelector(
  getState,
  fromList.getManufacturerLoading
);
export const manufacturerLoadedStatus = createSelector(
  getState,
  fromList.getManufacturerLoaded
);
export const manufacturerFailedStatus = createSelector(
  getState,
  fromList.getManufacturerFailed
);

export const productDetailLoadingStatus = createSelector(
  getState,
  fromList.getProductDetailLoading
);
export const productDetailLoadedStatus = createSelector(
  getState,
  fromList.getProductDetailLoaded
);
export const productDetailFailedStatus = createSelector(
  getState,
  fromList.getProductDetailFailed
);

export const countryList = createSelector(
  getState,
  fromList.getCountryList
);
export const countryLoading = createSelector(
  getState,
  fromList.getCountryLoading
);
export const countryLoaded = createSelector(
  getState,
  fromList.getCountryLoaded
);
export const countryFailed = createSelector(
  getState,
  fromList.getCountryFailed
);

export const zoneList = createSelector(
  getState,
  fromList.getZoneList
);
export const zoneLoading = createSelector(
  getState,
  fromList.getZoneLoading
);
export const zoneLoaded = createSelector(
  getState,
  fromList.getZoneLoaded
);
export const zoneFailed = createSelector(
  getState,
  fromList.getZoneFailed
);

export const todayDealList = createSelector(
  getState,
  fromList.getTodayDealList
);
export const todayDealLoading = createSelector(
  getState,
  fromList.getTodayDealLoading
);
export const todayDealLoaded = createSelector(
  getState,
  fromList.getTodayDealLoaded
);
export const todayDealFailed = createSelector(
  getState,
  fromList.getTodayDealFailed
);
export const priceLoading = createSelector(
  getState,
  fromList.getPriceLoading
);
