/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { AppState } from '../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromDashboard from './layout.reducer';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getCatalogLayoutState = (state: AppState) => state.catalogLayout;

export const catalogCount = createSelector(
  getCatalogLayoutState,
  fromDashboard.catalogCount
);
export const catalogCountLoading = createSelector(
  getCatalogLayoutState,
  fromDashboard.catalogCountLoading
);
export const catalogCountLoaded = createSelector(
  getCatalogLayoutState,
  fromDashboard.catalogCountLoaded
);
export const catalogCountFailed = createSelector(
  getCatalogLayoutState,
  fromDashboard.catalogCountFailed
);
