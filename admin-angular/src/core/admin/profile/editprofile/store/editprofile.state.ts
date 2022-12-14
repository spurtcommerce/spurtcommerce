/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface EditprofileState extends Map<string, any> {
  editprofile: any;
  editprofileResponse: boolean;
  editprofileRequestLoading: boolean;
  editprofileRequestLoaded: boolean;
  editprofileRequestFailed: boolean;

  getProfile: any;
  getProfileLoading: boolean;
  getProfileLoaded: boolean;
  getProfileFailed: boolean;
}

export const EditprofileRecordState = Record({
  editprofile: [],
  editprofileResponse: false,
  editprofileRequestLoading: false,
  editprofileRequestLoaded: false,
  editprofileRequestFailed: false,

  getProfile: [],
  getProfileLoading: false,
  getProfileLoaded: false,
  getProfileFailed: false
});
