/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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

export const getCategoryListCount = createSelector(
  getCatState,
  fromCategories.getCategoryListCount
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
// product add action
export const getProductAddResponse = createSelector(
  getCatState,
  fromCategories.getProductAddResponse
);
export const getProductAddRequestLoading = createSelector(
  getCatState,
  fromCategories.getProductAddRequestLoading
);
export const getProductAddRequestLoaded = createSelector(
  getCatState,
  fromCategories.getProductAddRequestLoaded
);
export const getProductAddRequestFailed = createSelector(
  getCatState,
  fromCategories.getProductAddRequestFailed
);
// product remove action
export const getProductRemoveResponse = createSelector(
  getCatState,
  fromCategories.getProductRemoveResponse
);
export const getProductRemoveRequestLoading = createSelector(
  getCatState,
  fromCategories.getProductRemoveRequestLoading
);
export const getProductRemoveRequestLoaded = createSelector(
  getCatState,
  fromCategories.getProductRemoveRequestLoaded
);
export const getProductRemoveRequestFailed = createSelector(
  getCatState,
  fromCategories.getProductRemoveRequestFailed
);


export const categoryDetails = createSelector(
  getCatState,
  fromCategories.categoryDetails
);
export const categoryDetailsLoading = createSelector(
  getCatState,
  fromCategories.categoryDetailsLoading
);
export const categoryDetailsLoaded = createSelector(
  getCatState,
  fromCategories.categoryDetailsLoaded
);
export const categoryDetailsFailed = createSelector(
  getCatState,
  fromCategories.categoryDetailsFailed
);
export const categoriesListResponse = createSelector(
  getCatState,
  fromCategories.categoriesListResponse
);

// export
export const CategoryExportExcel = createSelector(
  getCatState,
  fromCategories.CategoryExportExcel
);
export const CategoryExportExcelLoading = createSelector(
  getCatState,
  fromCategories.CategoryExportExcelLoading
);
export const CategoryExportExcelLoaded = createSelector(
  getCatState,
  fromCategories.CategoryExportExcelLoaded
);
export const CategoryExportExcelFailed = createSelector(
  getCatState,
  fromCategories.CategoryExportExcelFailed
);
export const CategoryExportExcelResponse = createSelector(
  getCatState,
  fromCategories.CategoryExportExcelResponse
);


// export all
export const ExportAllExcel = createSelector(
  getCatState,
  fromCategories.ExportAllExcel
);
export const ExportAllExcelLoading = createSelector(
  getCatState,
  fromCategories.ExportAllExcelLoading
);
export const ExportAllExcelLoaded = createSelector(
  getCatState,
  fromCategories.ExportAllExcelLoaded
);
export const ExportAllExcelFailed = createSelector(
  getCatState,
  fromCategories.ExportAllExcelFailed
);
export const ExportAllExcelResponse = createSelector(
  getCatState,
  fromCategories.ExportAllExcelResponse
);
