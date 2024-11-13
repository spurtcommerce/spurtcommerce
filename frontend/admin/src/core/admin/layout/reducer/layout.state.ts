/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Map, Record } from 'immutable';

export interface LayoutState extends Map<string, any> {
  settings: any;
  settingDetails: any;
  userDetail: any;
  changePayment: any;
  changePaymentLoading: boolean;
  changePaymentLoaded: boolean;
  changePaymentFailed: boolean;
  languageList:any;
  languageListLoading:boolean;
  languageListLoaded:boolean;
  languageListFailed:boolean;
}

export const layoutStateRecord = Record({
  // Initialize Default State Values
  settings: {},
  settingDetails: {},
  userDetail: {},
  changePayment: {},
  changePaymentLoading: false,
  changePaymentLoaded: false,
  changePaymentFailed: false,
  languageList:{},
  languageListLoading:false,
  languageListLoaded:false,
  languageListFailed:false
});
