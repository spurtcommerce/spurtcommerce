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

import * as  fromProduct from './product-control.reducer';
import {AppState} from '../../state.interface';

export const getState = (State: AppState) => State.productControl;
export const getCartList = createSelector(getState, fromProduct.getCartList);
export const getCartListCount = createSelector(getState, fromProduct.getCartListCount);
export const getTotalCartPrice = createSelector(getState, fromProduct.getTotalCartPrice);
export const getCheckedOutData = createSelector(getState, fromProduct.getCheckedOut);

export const getCheckoutLoading = createSelector(getState, fromProduct.getCheckoutLoading);
export const getCheckoutLoaded = createSelector(getState, fromProduct.getCheckoutLoaded);
export const getCheckoutFailed = createSelector(getState, fromProduct.getCheckoutFailed);
export const wishListLoading = createSelector(getState, fromProduct.getWhislistLoading);


