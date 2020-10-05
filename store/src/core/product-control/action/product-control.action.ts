/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Action } from '@ngrx/store';
import { type } from '../../shared/utility/utilityHelpers';
import { CheckoutModel } from '../models/checkout.model';

export const ActionTypes = {
  ADD_TO_WISHLIST: type('[wishlist] add to wishlist'),
  ADD_TO_WISHLIST_SUCCESS: type('[wishlist] add to wishlist success'),
  ADD_TO_WISHLIST_FAIL: type('[wishlist] add to wishlist fail'),
  GET_PAYMENT_SETTINGS: type('[payment] get payment type'),
  GET_PAYMENT_SETTINGS_SUCCESS: type('[payment] get payment type success'),
  GET_PAYMENT_SETTINGS_FAIL: type('[payment] get payment type fail'),

  CART_HANDLE_ACTION: type('[cart] cart handle'),
  DO_CHECKOUT: type('[checkout] do checkout '),
  DO_CHECKOUT_SUCCESS: type('[checkout] do checkout success'),

  DO_CHECKOUT_FAIL: type('[checkout] do checkout fail')
};
/* add to wishlist action*/

export class AddtoWishlist implements Action {
  type = ActionTypes.ADD_TO_WISHLIST;

  constructor(public payload: any) {}
}

export class AddtoWishlistSuccess implements Action {
  type = ActionTypes.ADD_TO_WISHLIST_SUCCESS;

  constructor(public payload: any) {}
}
export class AddtoWishlistFail implements Action {
  type = ActionTypes.ADD_TO_WISHLIST_FAIL;

  constructor(public payload: any) {}
}

/* cart handle action*/

export class CartHandleAction implements Action {
  type = ActionTypes.CART_HANDLE_ACTION;

  constructor(public payload: any) {}
}

/* product checkout action*/

export class DoCheckoutAction implements Action {
  type = ActionTypes.DO_CHECKOUT;

  constructor(public payload: CheckoutModel) {}
}
export class CheckoutActionSuccess implements Action {
  type = ActionTypes.DO_CHECKOUT_SUCCESS;

  constructor(public payload: any) {}
}
export class CheckoutActionFail implements Action {
  type = ActionTypes.DO_CHECKOUT_FAIL;

  constructor(public payload: any) {}
}

export type Actions =
  | AddtoWishlist
  | AddtoWishlistSuccess
  | AddtoWishlistFail

  | CartHandleAction
  | DoCheckoutAction
  | CheckoutActionSuccess
  | CheckoutActionFail;
