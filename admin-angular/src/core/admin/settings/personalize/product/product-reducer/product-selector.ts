/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { AppState } from '../../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromproductsettings from './product-reducer';

export const getPersonalizeProductState = (state: AppState) =>
  state.personalizeProduct;
export const getNewPersonalizeProduct = createSelector(
  getPersonalizeProductState,
  fromproductsettings.getnewPersonalizeProduct
);
export const getPersonalizeProduct = createSelector(
  getPersonalizeProductState,
  fromproductsettings.getPersonalizeProduct
);
