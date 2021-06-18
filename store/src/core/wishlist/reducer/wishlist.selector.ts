/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {createSelector} from 'reselect';

import * as  fromWishlist from './wishlist.reducer';
import {AppState} from '../../state.interface';

export const getState = (State: AppState) => State.wishlist;
export const getWishlist = createSelector(getState, fromWishlist.getWishlist);
export const wishlistLoading = createSelector(getState, fromWishlist.getWishlistLoading);
export const wishlistLoaded = createSelector(getState, fromWishlist.getWishlistLoaded);
export const wishlistFailed = createSelector(getState, fromWishlist.getWishlistFailed);
