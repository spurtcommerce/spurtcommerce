/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import * as actions from '../action/product-control.action';
import {
  productControlRecord,
  ProductControlState
} from './product-control.state';
export const initialState: ProductControlState = (new productControlRecord() as unknown) as ProductControlState;

export function reducer(
  state = initialState,
  { type, payload }: any
): ProductControlState {
  if (!type) {
    return state;
  }
  switch (type) {
    case actions.ActionTypes.CART_HANDLE_ACTION: {
      return Object.assign({}, state, {
        cartList: payload.products,
        cartCount: payload.productTotal,
        totalCartPrice: payload.totalPrice,
        checkedOut: {}
      });
    }

    // productOptions (filter the selected available option from total available options)optionsSelected
    case actions.ActionTypes.DO_CHECKOUT: {
      return Object.assign({}, state, {
        checkedOut: {},
        checkoutLoading: true,
        checkoutLoaded: false,
        checkoutFailed: false
      });
    }
    case actions.ActionTypes.DO_CHECKOUT_SUCCESS: {
      return Object.assign({}, state, {
        checkedOut: payload.data,
        checkoutLoading: false,
        checkoutLoaded: true,
        checkoutFailed: false
      });
    }
    case actions.ActionTypes.DO_CHECKOUT_FAIL: {
      return Object.assign({}, state, {
        checkedOut: {},
        checkoutLoading: false,
        checkoutLoaded: true,
        checkoutFailed: true
      });
    }

    case actions.ActionTypes.ADD_TO_WISHLIST: {
      return Object.assign({}, state, {
        whislistLoading: true,
        checkedOut: {}
      });
    }

    case actions.ActionTypes.ADD_TO_WISHLIST_SUCCESS: {
      return Object.assign({}, state, {
        whislistLoading: false,
        checkedOut: {}
      });
    }
    case actions.ActionTypes.ADD_TO_WISHLIST_FAIL: {
      return Object.assign({}, state, {
        whislistLoading: false,
        checkedOut: {}
      });
    }
    default: {
      return state;
    }
  }
}

export const getCartList = (state: ProductControlState) => state.cartList;
export const getCartListCount = (state: ProductControlState) => state.cartCount;
export const getTotalCartPrice = (state: ProductControlState) =>
  state.totalCartPrice;
export const getCheckedOut = (state: ProductControlState) => state.checkedOut;

export const getCheckoutLoading = (state: ProductControlState) =>
  state.checkoutLoading;
export const getCheckoutLoaded = (state: ProductControlState) =>
  state.checkoutLoaded;
export const getCheckoutFailed = (state: ProductControlState) =>
  state.checkoutFailed;

  export const getWhislistLoading = (state: ProductControlState) =>
  state.whislistLoading;
