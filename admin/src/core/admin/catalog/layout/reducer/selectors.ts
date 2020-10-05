/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
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
export const getTotalProductCount = createSelector(
  getCatalogLayoutState,
  fromDashboard.getTotalProductCount
);
export const getTotalProductCountLoaded = createSelector(
  getCatalogLayoutState,
  fromDashboard.getTotalProductCountLoaded
);
export const getTotalProductCountLoading = createSelector(
  getCatalogLayoutState,
  fromDashboard.getTotalProductCountLoading
);
export const getTotalProductCountFailed = createSelector(
  getCatalogLayoutState,
  fromDashboard.getTotalProductCountFailed
);

export const getActiveProductCount = createSelector(
  getCatalogLayoutState,
  fromDashboard.getActiveProductCount
);
export const getActiveProductCountLoaded = createSelector(
  getCatalogLayoutState,
  fromDashboard.getActiveProductCountLoaded
);
export const getActiveProductCountLoading = createSelector(
  getCatalogLayoutState,
  fromDashboard.getActiveProductCountLoading
);
export const getActiveProductCountFailed = createSelector(
  getCatalogLayoutState,
  fromDashboard.getActiveProductCountFailed
);

export const getInActiveProductCount = createSelector(
  getCatalogLayoutState,
  fromDashboard.getInActiveProductCount
);
export const getInActiveProductCountLoaded = createSelector(
  getCatalogLayoutState,
  fromDashboard.getInActiveProductCountLoaded
);
export const getInActiveProductCountLoading = createSelector(
  getCatalogLayoutState,
  fromDashboard.getInActiveProductCountLoading
);
export const getInActiveProductCountFailed = createSelector(
  getCatalogLayoutState,
  fromDashboard.getInActiveProductCountFailed
);

export const getTotalCategoryCount = createSelector(
  getCatalogLayoutState,
  fromDashboard.getTotalCategoryCount
);
export const getTotalCategoryCountLoaded = createSelector(
  getCatalogLayoutState,
  fromDashboard.getTotalCategoryCountLoaded
);
export const getTotalCategoryCountLoading = createSelector(
  getCatalogLayoutState,
  fromDashboard.getTotalCategoryCountLoading
);
export const getTotalCategoryCountFailed = createSelector(
  getCatalogLayoutState,
  fromDashboard.getTotalCategoryCountFailed
);
