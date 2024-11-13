/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';
import { ProfileModel } from '../models/profile.model';

export interface CommonState extends Map<string, any> {
  wishlistCount: number;
  profile: ProfileModel;

  wishlistCountLoading: boolean;
  wishlistCountLoaded: boolean;
  wishlistCountFailed: boolean;

  getProfileLoading: boolean;
  profileValid: boolean;
  getProfileLoaded: boolean;
  getProfileFailed: boolean;

  settings: any;
  getSettingLoading: boolean;
  getSettingLoaded: boolean;
  getSettingFailed: boolean;


  editProfileLoading: boolean;
  editProfile: any;
  editProfileLoaded: boolean;
  editProfileFailed: boolean;

  languageList: any;
  getlanguageLoading: boolean;
  getlanguageLoaded: boolean;
  getlanguageFailed: boolean;

  countryList: any;
  getCountryLoading: boolean;
  getCountryLoaded: boolean;
  getCountryFailed: boolean;

  documentList: any;
  getDocumentLoading: boolean;
  getDocumentLoaded: boolean;
  getDocumentFailed: boolean;

  documentCount: any;
  getDocumentCountLoading: boolean;
  getDocumentCountLoaded: boolean;
  getDocumentCountFailed: boolean;

  updateDocument: any;
  updateDocumentLoading: boolean;
  updateDocumentLoaded: boolean;
  updateDocumentFailed: boolean;

  downloadDocument: any;
  downloadDocumentLoading: boolean;
  downloadDocumentLoaded: boolean;
  downloadDocumentFailed: boolean;

  zoneList: any;
  zoneListLoading: boolean;
  zoneListLoaded: boolean;
  zoneListFailed: boolean;

  addOnConfig: any;
  addOnConfigLoading: boolean;
  addOnConfigLoaded: boolean;
  addOnConfigFailed: boolean;

  
  /*Product Attribute List*/

  languageList1: any;
 languageList1Loading: boolean;
 languageList1Loaded: boolean;
 languageList1Failed: boolean;

}

export const CommonRecord = Record({
  wishlistCount: 0,
  profile: null,

  wishlistCountLoading: false,
  wishlistCountLoaded: false,
  wishlistCountFailed: false,

  profileValid: false,
  getProfileLoading: false,
  getProfileLoaded: false,
  getProfileFailed: false,

  settings: {},
  getSettingLoading: false,
  getSettingLoaded: false,
  getSettingFailed: false,

  languageList: {},
  getlanguageLoading: false,
  getlanguageLoaded: false,
  getlanguageFailed: false,

  countryList: [],
  getCountryLoading: false,
  getCountryLoaded: false,
  getCountryFailed: false,

  documentList: [],
  getDocumentLoading: false,
  getDocumentLoaded: false,
  getDocumentFailed: false,

  documentCount: [],
  getDocumentCountLoading: false,
  getDocumentCountLoaded: false,
  getDocumentCountFailed: false,

  editProfileLoading: false,
  editProfile: {},
  editProfileLoaded: false,
  editProfileFailed: false,

  updateDocument: {},
  updateDocumentLoading: false,
  updateDocumentLoaded: false,
  updateDocumentFailed: false,

  downloadDocument: {},
  downloadDocumentLoading: false,
  downloadDocumentLoaded: false,
  downloadDocumentFailed: false,

  zoneList: [],
  zoneListLoading: false,
  zoneListLoaded: false,
  zoneListFailed: false,

  addOnConfig: [],
  addOnConfigLoading: false,
  addOnConfigLoaded: false,
  addOnConfigFailed: false,

  
  /*Product Attribute List*/

  languageList1: {},
  languageList1Loading: false,
  languageList1Loaded: false,
  languageList1Failed: false,

});
