/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { AppState } from '../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromCommon from './common.reducer';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getCommonState = (state: AppState) => state.common;
export const getlogOut = createSelector(
  getCommonState,
  fromCommon.getlogout
);
