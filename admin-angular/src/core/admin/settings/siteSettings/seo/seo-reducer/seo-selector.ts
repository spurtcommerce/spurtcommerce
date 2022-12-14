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
