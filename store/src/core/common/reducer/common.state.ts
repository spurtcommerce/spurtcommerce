/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';
import { ProfileModel } from '../models/profile.model';

export interface CommonState extends Map<string, any> {
  profile: ProfileModel;

  getProfileLoading: boolean;
  profileValid: boolean;
  getProfileLoaded: boolean;
  getProfileFailed: boolean;

  wishlistCountLoading: boolean;
  wishlistCountLoaded: boolean;
  wishlistCountFailed: boolean;
  wishlistCount: number;

}

export const CommonRecord = Record({
  profile: null,

  profileValid: false,
  getProfileLoading: false,
  getProfileLoaded: false,
  getProfileFailed: false,

  wishlistCount: 0,
  wishlistCountLoading: false,
  wishlistCountLoaded: false,
  wishlistCountFailed: false,
});
