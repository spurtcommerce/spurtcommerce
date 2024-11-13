/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface SettingState extends Map<string, any> {
  settingList: any;
  settingListLoading: boolean;
  settingListLoaded: boolean;
  settingListFailed: boolean;

  pageDetail: any;
  pageDetailLoading: boolean;
  pageDetailLoaded: boolean;
  pageDetailFailed: boolean;

  categoryListResponse: any;
  tempCategoryList: any;
  categoryListRequestLoading: boolean;
  categoryListRequestLoaded: boolean;
  categoryListRequestFailed: boolean;

  categoryAddResponse: any;
  categoryAddRequestLoading: boolean;
  categoryAddRequestLoaded: boolean;
  categoryAddRequestFailed: boolean;

  catListResponse: any;
  catListRequestLoading: boolean;
  catListRequestLoaded: boolean;
  catListRequestFailed: boolean;

  deleteCategoriesResponse: any;
  deleteCategoriesRequestLoading: boolean;
  deleteCategoriesRequestLoaded: boolean;
  deleteCategoriesRequestFailed: boolean;

  updateCategoriesResponse: any;
  updateCategoriesRequestLoading: boolean;
  updateCategoriesRequestLoaded: boolean;
  updateCategoriesRequestFailed: boolean;


  doSetCommissionResponse: any;
  doSetCommissionLoading: boolean;
  doSetCommissionLoaded: boolean;
  doSetCommissionFailed: boolean;

  doGetCommissionResponse: any;
  doGetCommissionLoading: boolean;
  doGetCommissionLoaded: boolean;
  doGetCommissionFailed: boolean;
  catSearch: boolean
}

export const SettingRecord = Record({
  settingList: [],
  settingListLoading: false,
  settingListLoaded: false,
  settingListFailed: false,

  pageDetail: [],
  pageDetailLoading: false,
  pageDetailLoaded: false,
  pageDetailFailed: false,

  categoryListResponse: [],
  tempCategoryList: [],
  categoryListRequestLoading: false,
  categoryListRequestLoaded: false,
  categoryListRequestFailed: false,

  categoryAddResponse: [],
  categoryAddRequestLoading: false,
  categoryAddRequestLoaded: false,
  categoryAddRequestFailed: false,

  catListResponse: [],
  catListRequestLoading: false,
  catListRequestLoaded: false,
  catListRequestFailed: false,

  deleteCategoriesResponse: [],
  deleteCategoriesRequestLoading: false,
  deleteCategoriesRequestLoaded: false,
  deleteCategoriesRequestFailed: false,

  updateCategoriesResponse: [],
  updateCategoriesRequestLoading: false,
  updateCategoriesRequestLoaded: false,
  updateCategoriesRequestFailed: false,


  doSetCommissionResponse: [],
  doSetCommissionLoading: false,
  doSetCommissionLoaded: false,
  doSetCommissionFailed: false,


  doGetCommissionResponse: [],
  doGetCommissionLoading: false,
  doGetCommissionLoaded: false,
  doGetCommissionFailed: false,
  catSearch: false
});
