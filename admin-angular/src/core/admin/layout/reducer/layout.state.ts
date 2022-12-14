/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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
}

export const layoutStateRecord = Record({
  // Initialize Default State Values
  settings: {},
  settingDetails: {},
  userDetail: {},
  changePayment: {},
  changePaymentLoading: false,
  changePaymentLoaded: false,
  changePaymentFailed: false
});
