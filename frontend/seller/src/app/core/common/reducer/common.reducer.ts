/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../action/common.action';
import { CommonState, CommonRecord } from './common.state';
import { ProfileModel } from '../models/profile.model';

export const initialState: CommonState = (new CommonRecord() as unknown) as CommonState;
export function reducer(
  state = initialState,
  { type, payload }: any
): CommonState {
  if (!type) {
    return state;
  }
  switch (type) {
    case actions.ActionTypes.GET_WISHLIST_COUNT: {
      return Object.assign({}, state, {
        wishlistCountLoading: true,
        wishlistCountLoaded: false,
        wishlistCountFailed: false
      });
    }

    case actions.ActionTypes.GET_WISHLIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        wishlistCount: payload.data,
        wishlistCountLoading: false,
        wishlistCountLoaded: true,
        wishlistCountFailed: false
      });
    }
    case actions.ActionTypes.GET_WISHLIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        wishlistCount: 0,
        wishlistCountLoading: false,
        wishlistCountLoaded: true,
        wishlistCountFailed: true
      });
    }


// <-----------------GET PROFILE------------------> //

    case actions.ActionTypes.GET_PROFILE: {
      return Object.assign({}, state, {
        getProfileLoading: true,
        getProfileLoaded: false,
        getProfileFailed: false
      });
    }

    case actions.ActionTypes.GET_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        profile: payload.data,
        getProfileLoading: false,
        getProfileLoaded: true,
        getProfileFailed: false
      });
    }

    case actions.ActionTypes.GET_PROFILE_FAIL: {
      return Object.assign({}, state, {
        getProfileLoading: false,
        getProfileLoaded: true,
        getProfileFailed: true
      });
    }

// <-----------------GET SETTINGS------------------> //

    case actions.ActionTypes.GET_SETTINGS: {
      return Object.assign({}, state, {
        getSettingsLoading: true,
        getSettingsLoaded: false,
        getSettingsFailed: false
      });
    }

    case actions.ActionTypes.GET_SETTINGS_SUCCESS: {
      return Object.assign({}, state, {
        getSettingsLoading: false,
        getSettingsLoaded: true,
        getSettingsFailed: false,
        settings: payload.data
      });
    }

    case actions.ActionTypes.GET_SETTINGS_FAIL: {
      return Object.assign({}, state, {
        getSettingsLoading: false,
        getSettingsLoaded: true,
        getSettingsFailed: true
      });
    }

    case actions.ActionTypes.CLEAR_SETTINGS: {
      return Object.assign({}, state, {
        getSettingsLoading: false,
        getSettingsLoaded: true,
        getSettingsFailed: true,
        settings:[]
      });
    }
// <-----------------EDIT PROFILE------------------> //

    case actions.ActionTypes.EDIT_PROFILE: {
      return Object.assign({}, state, {
        editProfileLoading: true,
        editProfileLoaded: false,
        editProfileFailed: false
      });
    }

    case actions.ActionTypes.EDIT_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        editprofile: payload.data,
        editProfileLoading: false,
        editProfileLoaded: true,
        editProfileFailed: false
      });
    }

    case actions.ActionTypes.EDIT_PROFILE_FAIL: {
      return Object.assign({}, state, {
        editProfileLoading: false,
        editProfileLoaded: true,
        editProfileFailed: true
      });
    }

// <-----------------LOGOUT------------------> //

    case actions.ActionTypes.DO_SIGN_OUT: {
      const validUser = false;
      return Object.assign({}, state, {
        profileValid: validUser,
        wishlistCount: 0,
        profile: {}
      });
    }


// <-----------------GET LANGUAGE LIST------------------> //

    case actions.ActionTypes.GET_LANGUAGELIST: {
      return Object.assign({}, state, {
        getlanguageLoading: true,
        getlanguageLoaded: false,
        getlanguageFailed: false
      });
    }

    case actions.ActionTypes.GET_LANGUAGELIST_SUCCESS: {
      return Object.assign({}, state, {
        languageList: payload.data,
        getlanguageLoading: false,
        getlanguageLoaded: true,
        getlanguageFailed: false
      });
    }

    case actions.ActionTypes.GET_LANGUAGELIST_FAIL: {
      return Object.assign({}, state, {
        getlanguageLoading: false,
        getlanguageLoaded: true,
        getlanguageFailed: true
      });
    }

// <-----------------GET COUNTRY LIST------------------> //

    case actions.ActionTypes.GET_COUNTRY_LIST: {
      return Object.assign({}, state, {
        getCountryLoading: true,
        getCountryLoaded: false,
        getCountryFailed: false
      });
    }

    case actions.ActionTypes.GET_COUNTRY_LIST_SUCCESS: {
      return Object.assign({}, state, {
        countryList: payload.data,
        getCountryLoading: false,
        getCountryLoaded: true,
        getCountryFailed: false
      });
    }

    case actions.ActionTypes.GET_COUNTRY_LIST_FAIL: {
      return Object.assign({}, state, {
        getCountryLoading: false,
        getCountryLoaded: true,
        getCountryFailed: true
      });
    }

// <-----------------GET DOCUMENT LIST------------------> //

    case actions.ActionTypes.GET_DOCUMENT_LIST: {
      return Object.assign({}, state, {
        getDocumentLoading: true,
        getDocumentLoaded: false,
        getDocumentFailed: false
      });
    }

    case actions.ActionTypes.GET_DOCUMENT_LIST_SUCCESS: {
      return Object.assign({}, state, {
        documentList: payload.data,
        getDocumentLoading: false,
        getDocumentLoaded: true,
        getDocumentFailed: false
      });
    }

    case actions.ActionTypes.GET_DOCUMENT_LIST_FAIL: {
      return Object.assign({}, state, {
        getDocumentLoading: false,
        getDocumentLoaded: true,
        getDocumentFailed: true
      });
    }

// <-----------------DOCUMENT LIST COUNT------------------> //

    case actions.ActionTypes.GET_DOCUMENT_COUNT: {
      return Object.assign({}, state, {
        getDocumentCountLoading: true,
        getDocumentCountLoaded: false,
        getDocumentCountFailed: false
      });
    }

    case actions.ActionTypes.GET_DOCUMENT_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        documentCount: payload.data,
        getDocumentCountLoading: false,
        getDocumentCountLoaded: true,
        getDocumentCountFailed: false
      });
    }

    case actions.ActionTypes.GET_DOCUMENT_COUNT_FAIL: {
      return Object.assign({}, state, {
        getDocumentCountLoading: false,
        getDocumentCountLoaded: true,
        getDocumentCountFailed: true
      });
    }

// <-----------------UPLOAD DOCUMENT------------------> //

    case actions.ActionTypes.UPDATE_DOCUMENT: {
      return Object.assign({}, state, {
        updateDocumentLoading: true,
        updateDocumentLoaded: false,
        updateDocumentFailed: false
      });
    }

    case actions.ActionTypes.UPDATE_DOCUMENT_SUCCESS: {
      return Object.assign({}, state, {
        updateDocument: payload.data,
        updateDocumentLoading: false,
        updateDocumentLoaded: true,
        updateDocumentFailed: false
      });
    }

    case actions.ActionTypes.UPDATE_DOCUMENT_FAIL: {
      return Object.assign({}, state, {
        updateDocumentLoading: false,
        updateDocumentLoaded: true,
        updateDocumentFailed: true
      });
    }

// <-----------------DOWNLOAD DOCUMENT------------------> //

    case actions.ActionTypes.DOWNLOAD_DOCUMENT: {
      return Object.assign({}, state, {
        downloadDocumentLoading: true,
        downloadDocumentLoaded: false,
        downloadDocumentFailed: false
      });
    }

    case actions.ActionTypes.DOWNLOAD_DOCUMENT_SUCCESS: {
      return Object.assign({}, state, {
        downloadDocument: payload.data,
        downloadDocumentLoading: false,
        downloadDocumentLoaded: true,
        downloadDocumentFailed: false
      });
    }

    case actions.ActionTypes.DOWNLOAD_DOCUMENT_FAIL: {
      return Object.assign({}, state, {
        downloadDocumentLoading: false,
        downloadDocumentLoaded: true,
        downloadDocumentFailed: true
      });
    }

// <-----------------GET ZONE LIST------------------> //

    case actions.ActionTypes.GET_ZONE_LIST: {
      return Object.assign({}, state, {
        zoneListLoading: true,
        zoneListLoaded: false,
        zoneListFailed: false
      });
    }

    case actions.ActionTypes.GET_ZONE_LIST_SUCCESS: {
      return Object.assign({}, state, {
        zoneList: payload.data,
        zoneListLoading: false,
        zoneListLoaded: true,
        zoneListFailed: false
      });
    }

    case actions.ActionTypes.GET_ZONE_LIST_FAIL: {
      return Object.assign({}, state, {
        zoneListLoading: false,
        zoneListLoaded: true,
        zoneListFailed: true
      });
    }
      
    case actions.ActionTypes.ADD_ON_CONFIG: {
      return Object.assign({}, state, {
        addOnConfigLoading: true,
        addOnConfigLoaded: false,
        addOnConfigFailed: false
      });
    }

    case actions.ActionTypes.ADD_ON_CONFIG_SUCCESS: {
      return Object.assign({}, state, {
        addOnConfig: payload.data,
        addOnConfigLoading: false,
        addOnConfigLoaded: true,
        addOnConfigFailed: false
      });
    }
    case actions.ActionTypes.ADD_ON_CONFIG_FAIL: {
      return Object.assign({}, state, {
        addOnConfig: 0,
        addOnConfigLoading: false,
        addOnConfigLoaded: true,
        addOnConfigFailed: true
      });
    }

    
    /*Product Attribute List*/

    case actions.ActionTypes.LANGUAGE_LIST: {
      return Object.assign({}, state, {
        languageList1: '',
        languageList1Loading: true,
        languageList1Loaded: false,
        languageList1Failed: false,
      });
    }
    case actions.ActionTypes.LANGUAGE_LIST_SUCCESS: {
      return Object.assign({}, state, {
        languageList1: payload.data,
        languageList1Loading: false,
        languageList1Loaded: true,
        languageList1Failed: false,
      });
    }
    case actions.ActionTypes.LANGUAGE_LIST_FAIL: {
      return Object.assign({}, state, {
        languageList1: '',
        languageList1Loading: false,
        languageList1Loaded: false,
        languageList1Failed: true,
      });
    }

    default: {
      return state;
    }
  }
}

export const getWishlistCount = (state: CommonState) => state.wishlistCount;
export const getProfile = (state: CommonState) => state.profile;
export const getSettings = (state: CommonState) => state.settings;
export const getProfileValid = (state: CommonState) => state.profileValid;

export const getWishlistCountLoading = (state: CommonState) =>
  state.wishlistCountLoading;
export const getWishlistCountLoaded = (state: CommonState) =>
  state.wishlistCountLoaded;
export const getWishlistCountFailed = (state: CommonState) =>
  state.wishlistCountFailed;

export const getProfileLoading = (state: CommonState) =>
  state.getProfileLoading;
export const getProfileLoaded = (state: CommonState) => state.getProfileLoaded;
export const getProfileFailed = (state: CommonState) => state.getProfileFailed;

export const getSettingLoading = (state: CommonState) =>
  state.getSettingLoading;
export const getSettingLoaded = (state: CommonState) => state.getSettingLoaded;
export const getSettingFailed = (state: CommonState) => state.getSettingFailed;

export const editProfile = (state: CommonState) =>
  state.editProfile;
export const editProfileLoading = (state: CommonState) =>
  state.editProfileLoading;
export const editProfileLoaded = (state: CommonState) => state.editProfileLoaded;
export const editProfileFailed = (state: CommonState) => state.editProfileFailed;

export const getLanguages = (state: CommonState) => state.languageList;
export const getLanguageLoading = (state: CommonState) =>
  state.getlanguageLoading;
export const getLanguageLoaded = (state: CommonState) =>
  state.getlanguageLoaded;
export const getLanguageFailed = (state: CommonState) =>
  state.getlanguageFailed;

  export const getCountry = (state: CommonState) => state.countryList;
  export const getCountryLoading = (state: CommonState) =>
    state.getCountryLoading;
  export const getCountryLoaded = (state: CommonState) =>
    state.getCountryLoaded;
  export const getCountryFailed = (state: CommonState) =>
    state.getCountryFailed;

    export const getDocument = (state: CommonState) => state.documentList;
    export const getDocumentLoading = (state: CommonState) =>
      state.getDocumentLoading;
    export const getDocumentLoaded = (state: CommonState) =>
      state.getDocumentLoaded;
    export const getDocumentFailed = (state: CommonState) =>
      state.getDocumentFailed;

      export const getDocumentCount = (state: CommonState) => state.documentCount;
      export const getDocumentCountLoading = (state: CommonState) =>
        state.getDocumentCountLoading;
      export const getDocumentCountLoaded = (state: CommonState) =>
        state.getDocumentCountLoaded;
      export const getDocumentCountFailed = (state: CommonState) =>
        state.getDocumentCountFailed;

      export const updateDocument = (state: CommonState) => state.updateDocument;
      export const updateDocumentLoading = (state: CommonState) =>
        state.updateDocumentLoading;
      export const updateDocumentLoaded = (state: CommonState) =>
        state.updateDocumentLoaded;
      export const updateDocumentFailed = (state: CommonState) =>
        state.updateDocumentFailed;

        export const downloadDocument = (state: CommonState) => state.downloadDocument;
        export const downloadDocumentLoading = (state: CommonState) =>
          state.downloadDocumentLoading;
        export const downloadDocumentLoaded = (state: CommonState) =>
          state.downloadDocumentLoaded;
        export const downloadDocumentFailed = (state: CommonState) =>
          state.downloadDocumentFailed;

          export const zoneList = (state: CommonState) =>
  state.zoneList;
          
  export const addOnConfig = (state: CommonState) => state.addOnConfig;
  export const addOnConfigLoading = (state: CommonState) =>
    state.addOnConfigLoading;
  export const addOnConfigLoaded = (state: CommonState) =>
    state.addOnConfigLoaded;
  export const addOnConfigFailed = (state: CommonState) =>
    state.addOnConfigFailed;

    
/*Product Attribute List*/

export const  languageList1Loading = (state: CommonState) => state. languageList1Loading;
export const  languageList1Loaded = (state: CommonState) => state. languageList1Loaded;
export const  languageList1Failed = (state: CommonState) => state. languageList1Failed;
export const  languageList1 = (state: CommonState) => state. languageList1;

