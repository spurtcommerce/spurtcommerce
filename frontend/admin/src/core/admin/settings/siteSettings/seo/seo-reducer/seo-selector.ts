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
import * as fromseosettings from '../seo-reducer/seo-reducer';

export const getSeoState = (state: AppState) => state.seosetting;
export const newSeo = createSelector(
  getSeoState,
  fromseosettings.newSeo
);
export const getSeo = createSelector(
  getSeoState,
  fromseosettings.getSeo
);
export const getSettingLoading = createSelector( getSeoState,
  fromseosettings.getSettingLoading)
