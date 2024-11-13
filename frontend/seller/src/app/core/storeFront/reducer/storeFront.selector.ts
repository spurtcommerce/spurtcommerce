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

import * as fromWishlist from './storeFront.reducer';
import { AppState } from '../../app.state.interface';

export const getState = (State: AppState) => State.myProfile;



export const wishlistCount = createSelector(getState,fromWishlist.getWishlistCount);
export const wishlistCountLoading = createSelector(getState,fromWishlist.getWishlistCountLoading);
export const wishlistCountLoaded = createSelector(getState,fromWishlist.getWishlistCountLoaded);
export const wishlistCountFailed = createSelector(getState,fromWishlist.getWishlistCountFailed);

export const getProfile = createSelector(getState,fromWishlist.getProfile);
export const profileLoading = createSelector(getState,fromWishlist.getProfileLoading);
export const profileLoaded = createSelector(getState,fromWishlist.getProfileLoaded);
export const profileFailed = createSelector(getState,fromWishlist.getProfileFailed);
export const getProfileValid = createSelector(getState,fromWishlist.getProfileValid);

export const getSetting = createSelector(getState,fromWishlist.getSettings);
export const settingLoading = createSelector(getState,fromWishlist.getSettingLoading);
export const settingLoaded = createSelector(getState,fromWishlist.getSettingLoaded);
export const settingFailed = createSelector(getState,fromWishlist.getSettingFailed);

