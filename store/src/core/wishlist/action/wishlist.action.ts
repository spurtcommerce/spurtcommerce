/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Action } from '@ngrx/store';
import { type } from '../../shared/utility/utilityHelpers';

export const ActionTypes = {
  get_wishlist: type('[wishlist] get wishlist'),
  get_wishlist_SUCCESS: type('[wishlist] get wishlist success'),
  get_wishlist_FAIL: type('[wishlist] get wishlist fail'),
  delete_product: type('[wishlist] delete product'),
  delete_product_SUCCESS: type('[wishlist] delete product success'),
  delete_product_FAIL: type('[wishlist] delete product fail')
};
/* get wish list action*/

export class GetWishlist implements Action {
  type = ActionTypes.get_wishlist;

  constructor(public payload: any) {}
}

export class GetWishlistSuccess implements Action {
  type = ActionTypes.get_wishlist_SUCCESS;

  constructor(public payload: any) {}
}
export class GetWishlistFail implements Action {
  type = ActionTypes.get_wishlist_FAIL;

  constructor(public payload: any) {}
}
/* delete product from wish list action*/

export class DeleteProduct implements Action {
  type = ActionTypes.delete_product;

  constructor(public payload: any) {}
}

export class DeleteProductSuccess implements Action {
  type = ActionTypes.delete_product_SUCCESS;

  constructor(public payload: any) {}
}
export class DeleteProductFail implements Action {
  type = ActionTypes.delete_product_FAIL;

  constructor(public payload: any) {}
}

export type Actions =
  | GetWishlist
  | GetWishlistSuccess
  | GetWishlistFail
  | DeleteProduct
  | DeleteProductSuccess
  | DeleteProductFail;
