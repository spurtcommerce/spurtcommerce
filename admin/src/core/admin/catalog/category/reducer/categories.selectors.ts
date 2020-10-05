/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { createSelector } from 'reselect';
// reducer
import * as fromCategories from './categories.reducer';
// app state
import { AppState } from '../../../../app.state.interface';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functionsget
 */

export const getCatState = (state: AppState) => state.categories;
// category list action
export const getCategoryList = createSelector(
  getCatState,
  fromCategories.getCategoryList
);
// getCategoryFilterList
export const getCategoryFilterList = createSelector(
  getCatState,
  fromCategories.getCategoryFilterList
);

export const getCategoryListnCount = createSelector(
  getCatState,
  fromCategories.getCategoryListnCount
);
export const getCategoriesListResponse = createSelector(
  getCatState,
  fromCategories.getCategoriesListResponse
);
export const getCategoriesListRequestLoading = createSelector(
  getCatState,
  fromCategories.getCategoriesListRequestLoading
);
export const getCategoriesListRequestLoaded = createSelector(
  getCatState,
  fromCategories.getCategoriesListRequestLoaded
);
export const getCategoriesListRequestFailed = createSelector(
  getCatState,
  fromCategories.getCategoriesListRequestFailed
);
// category delete action
export const getCategoryDoDelete = createSelector(
  getCatState,
  fromCategories.getCategoryDoDelete
);
export const getDeleteCategoriesResponse = createSelector(
  getCatState,
  fromCategories.getDeleteCategoriesResponse
);
export const getDeleteCategoriesRequestLoading = createSelector(
  getCatState,
  fromCategories.getDeleteCategoriesRequestLoading
);
export const getDeleteCategoriesRequestLoaded = createSelector(
  getCatState,
  fromCategories.getDeleteCategoriesRequestLoaded
);
export const getDeleteCategoriesRequestFailed = createSelector(
  getCatState,
  fromCategories.getDeleteCategoriesRequestFailed
);
// product add action
export const getAddCatagoryStatus = createSelector(
  getCatState,
  fromCategories.getAddCatagoryStatus
);
export const getAddCatagoryData = createSelector(
  getCatState,
  fromCategories.getAddCatagoryData
);
export const getAddCategoriesResponse = createSelector(
  getCatState,
  fromCategories.getAddCategoriesResponse
);
export const getAddCategoriesRequestLoading = createSelector(
  getCatState,
  fromCategories.getAddCategoriesRequestLoading
);
export const getAddCategoriesRequestLoaded = createSelector(
  getCatState,
  fromCategories.getAddCategoriesRequestLoaded
);
export const getAddCategoriesRequestFailed = createSelector(
  getCatState,
  fromCategories.getAddCategoriesRequestFailed
);
// category update action
export const getUpdateCatagory = createSelector(
  getCatState,
  fromCategories.getUpdateCatagory
);
export const getUpdateCategoriesResponse = createSelector(
  getCatState,
  fromCategories.getUpdateCategoriesResponse
);
export const getUpdateCategoriesRequestLoading = createSelector(
  getCatState,
  fromCategories.getUpdateCategoriesRequestLoading
);
export const getUpdateCategoriesRequestLoaded = createSelector(
  getCatState,
  fromCategories.getUpdateCategoriesRequestLoaded
);
export const getUpdateCategoriesRequestFailed = createSelector(
  getCatState,
  fromCategories.getUpdateCategoriesRequestFailed
);
// category count action
export const getCategoryCountdata = createSelector(
  getCatState,
  fromCategories.getCategoryCountdata
);
export const getUpdateCategoryBadresponse = createSelector(
  getCatState,
  fromCategories.getUpdateCategoryBadresponse
);
export const getCategoriesCountResponse = createSelector(
  getCatState,
  fromCategories.getCategoriesCountResponse
);
export const getCategoriesCountRequestLoading = createSelector(
  getCatState,
  fromCategories.getCategoriesCountRequestLoading
);
export const getCategoriesCountRequestLoaded = createSelector(
  getCatState,
  fromCategories.getCategoriesCountRequestLoaded
);
export const getCategoriesCountRequestFailed = createSelector(
  getCatState,
  fromCategories.getCategoriesCountRequestFailed
);

