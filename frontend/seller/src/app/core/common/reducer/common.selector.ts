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

import * as fromWishlist from './common.reducer';
import { AppState } from '../../app.state.interface';

export const getState = (State: AppState) => State.common;
export const wishlistCount = createSelector(
  getState,
  fromWishlist.getWishlistCount
);
export const getProfile = createSelector(
  getState,
  fromWishlist.getProfile
);
export const getProfileValid = createSelector(
  getState,
  fromWishlist.getProfileValid
);
export const getLanguage = createSelector(
  getState,
  fromWishlist.getLanguages
);

export const wishlistCountLoading = createSelector(
  getState,
  fromWishlist.getWishlistCountLoading
);
export const wishlistCountLoaded = createSelector(
  getState,
  fromWishlist.getWishlistCountLoaded
);
export const wishlistCountFailed = createSelector(
  getState,
  fromWishlist.getWishlistCountFailed
);

export const profileLoading = createSelector(
  getState,
  fromWishlist.getProfileLoading
);
export const profileLoaded = createSelector(
  getState,
  fromWishlist.getProfileLoaded
);
export const profileFailed = createSelector(
  getState,
  fromWishlist.getProfileFailed
);
export const getSetting = createSelector(
  getState,
  fromWishlist.getSettings
);
export const settingLoading = createSelector(
  getState,
  fromWishlist.getSettingLoading
);
export const settingLoaded = createSelector(
  getState,
  fromWishlist.getSettingLoaded
);
export const settingFailed = createSelector(
  getState,
  fromWishlist.getSettingFailed
);

export const languageLoading = createSelector(
  getState,
  fromWishlist.getLanguageLoading
);
export const languageLoaded = createSelector(
  getState,
  fromWishlist.getLanguageLoaded
);
export const languageFailed = createSelector(
  getState,
  fromWishlist.getLanguageFailed
);
export const editProfile = createSelector(
  getState,
  fromWishlist.editProfile
);
export const editProfileLoading = createSelector(
  getState,
  fromWishlist.editProfileLoading
);
export const editProfileLoaded = createSelector(
  getState,
  fromWishlist.editProfileLoaded
);
export const editProfileFailed = createSelector(
  getState,
  fromWishlist.editProfileFailed
);

export const getCountry = createSelector(
  getState,
  fromWishlist.getCountry
);
export const countryLoading = createSelector(
  getState,
  fromWishlist.getCountryLoading
);
export const countryLoaded = createSelector(
  getState,
  fromWishlist.getCountryLoaded
);
export const countryFailed = createSelector(
  getState,
  fromWishlist.getCountryFailed
);
export const getDocument = createSelector(
  getState,
  fromWishlist.getDocument
);
export const documentLoading = createSelector(
  getState,
  fromWishlist.getDocumentLoading
);
export const documentLoaded = createSelector(
  getState,
  fromWishlist.getDocumentLoaded
);
export const documentFailed = createSelector(
  getState,
  fromWishlist.getDocumentFailed
);
export const getDocumentCount = createSelector(
  getState,
  fromWishlist.getDocumentCount
);
export const documentCountLoading = createSelector(
  getState,
  fromWishlist.getDocumentCountLoading
);
export const documentCountLoaded = createSelector(
  getState,
  fromWishlist.getDocumentCountLoaded
);
export const documentCountFailed = createSelector(
  getState,
  fromWishlist.getDocumentCountFailed
);
export const updateDocument = createSelector(
  getState,
  fromWishlist.updateDocument
);
export const updateDocumentLoading = createSelector(
  getState,
  fromWishlist.updateDocumentLoading
);
export const updateDocumentLoaded = createSelector(
  getState,
  fromWishlist.updateDocumentLoaded
);
export const updateDocumentFailed = createSelector(
  getState,
  fromWishlist.updateDocumentFailed
);
export const downloadDocument = createSelector(
  getState,
  fromWishlist.downloadDocument
);
export const downloadDocumentLoading = createSelector(
  getState,
  fromWishlist.downloadDocumentLoading
);
export const downloadDocumentLoaded = createSelector(
  getState,
  fromWishlist.downloadDocumentLoaded
);
export const downloadDocumentFailed = createSelector(
  getState,
  fromWishlist.downloadDocumentFailed
);
export const zoneList = createSelector(
  getState,
  fromWishlist.zoneList
);

export const addOnConfig = createSelector(
  getState,
  fromWishlist.addOnConfig
);
export const addOnConfigLoading = createSelector(
  getState,
  fromWishlist.addOnConfigLoading
);
export const addOnConfigLoaded = createSelector(
  getState,
  fromWishlist.addOnConfigLoaded
);
export const addOnConfigFailed = createSelector(
  getState,
  fromWishlist.addOnConfigFailed
);


/*Product Attribute List*/

export const languageList1 = createSelector(
  getState,
  fromWishlist.languageList1
);
export const languageList1Loading = createSelector(
  getState,
  fromWishlist.languageList1Loading
);
export const languageList1Loaded = createSelector(
  getState,
  fromWishlist.languageList1Loaded
);
export const languageList1Failed = createSelector(
  getState,
  fromWishlist.languageList1Failed
);
