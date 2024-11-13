/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { AppState } from '../../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromSocial from './social.reducer';

export const getSocialState = (state: AppState) => state.social;
export const getNewSocial = createSelector(
  getSocialState,
  fromSocial.getNewSocial
);
export const getSocial = createSelector(
  getSocialState,
  fromSocial.getSocial
);

export const getSettingLoading = createSelector( getSocialState,
  fromSocial.getSettingLoading)
