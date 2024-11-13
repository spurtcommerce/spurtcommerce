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

export interface DashboardState extends Map<string, any> {
  dashboardCount: any;
  profile: ProfileModel;

  dashboardCountLoading: boolean;
  dashboardCountLoaded: boolean;
  dashboardCountFailed: boolean;

  getProfileLoading: boolean;
  profileValid: boolean;
  getProfileLoaded: boolean;
  getProfileFailed: boolean;


  editProfileLoading: boolean;
  editProfile: any;
  editProfileLoaded: boolean;
  editProfileFailed: boolean;

  languageList: any;
  getlanguageLoading: boolean;
  getlanguageLoaded: boolean;
  getlanguageFailed: boolean;

  getTopSellingProducts: any;
  getTopSellingProductsLoading: boolean;
  getTopSellingProductsLoaded: boolean;
  getTopSellingProductsFailed: boolean;

  orderList: any;
  todayOrderList: any;
  previousOrderList: any;
  orderListLoading: boolean;
  orderListLoaded: boolean;
  orderListFailed: boolean;


  orderListCount: any;
  todayOrderListCount: any;
  previousOrderListCount: any;
  orderListCountLoading: boolean;
  orderListCountLoaded: boolean;
  orderListCountFailed: boolean;
}

export const DashboardRecord = Record({
  dashboardCount: {},
  profile: null,

  dashboardCountLoading: false,
  dashboardCountLoaded: false,
  dashboardCountFailed: false,

  profileValid: false,
  getProfileLoading: false,
  getProfileLoaded: false,
  getProfileFailed: false,

  languageList: {},
  getlanguageLoading: false,
  getlanguageLoaded: false,
  getlanguageFailed: false,

  getTopSellingProducts: [],
  getTopSellingProductsLoading: false,
  getTopSellingProductsLoaded: false,
  getTopSellingProductsFailed: false,

  editProfileLoading: false,
  editProfile: {},
  editProfileLoaded: false,
  editProfileFailed: false,

  orderList: [],
  todayOrderList: [],
  previousOrderList: [],
  orderListLoading: false,
  orderListLoaded: false,
  orderListFailed: false,


  orderListCount: [],
  todayOrderListCount: [],
  previousOrderListCount: [],
  orderListCountLoading: false,
  orderListCountLoaded: false,
  orderListCountFailed: false,
});
