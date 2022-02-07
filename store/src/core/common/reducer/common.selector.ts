/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { createSelector } from 'reselect';

import * as fromWishlist from './common.reducer';
import { AppState } from '../../state.interface';

export const getState = (State: AppState) => State.common;
export const getProfile = createSelector(
  getState,
  fromWishlist.getProfile
);
export const getProfileValid = createSelector(
  getState,
  fromWishlist.getProfileValid
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
export const wishlistCount = createSelector(
  getState,
  fromWishlist.getWishlistCount
);
