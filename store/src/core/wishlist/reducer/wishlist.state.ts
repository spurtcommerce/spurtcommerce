/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';

export interface WishlistState extends Map<string, any> {
  newPassword: any;
  wishlist: any;
  wishlistLoading: any;
  wishlistLoaded: any;
  wishlistFailed: any;
}

export const wishlistRecord = Record({
  newPassword: {},
  wishlist: [],
  wishlistLoading: false,
  wishlistLoaded: false,
  wishlistFailed: false
});
