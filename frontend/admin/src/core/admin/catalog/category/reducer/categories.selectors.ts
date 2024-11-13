/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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

//category Translation 

export const getCategoryTranslationList = createSelector(
  getCatState,
  fromCategories.getCategoryTranslationList
);
export const getCategoryTranslationListLoading = createSelector(
  getCatState,
  fromCategories.getCategoryTranslationListLoading
);
export const getCategoryTranslationListLoaded = createSelector(
  getCatState,
  fromCategories.getCategoryTranslationListLoaded
);
export const getCategoryTranslationListFailed = createSelector(
  getCatState,
  fromCategories.getCategoryTranslationListFailed
);

//category Translation 

export const translationDetail = createSelector(
  getCatState,
  fromCategories.translationDetail
);
export const translationDetailLoading = createSelector(
  getCatState,
  fromCategories.translationDetailLoading
);
export const translationDetailLoaded = createSelector(
  getCatState,
  fromCategories.translationDetailLoaded
);
export const translationDetailFailed = createSelector(
  getCatState,
  fromCategories.translationDetailFailed
);

//add_Translation  

export const add_Translation = createSelector(
  getCatState,
  fromCategories.add_Translation
);
export const add_TranslationLoading = createSelector(
  getCatState,
  fromCategories.add_TranslationLoading
);
export const add_TranslationLoaded = createSelector(
  getCatState,
  fromCategories.add_TranslationLoaded
);
export const add_TranslationFailed = createSelector(
  getCatState,
  fromCategories.add_TranslationFailed
);

////edit_Translation  

export const edit_Translation = createSelector(
  getCatState,
  fromCategories.edit_Translation
);
export const edit_TranslationLoading = createSelector(
  getCatState,
  fromCategories.edit_TranslationLoading
);
export const edit_TranslationLoaded = createSelector(
  getCatState,
  fromCategories.edit_TranslationLoaded
);
export const edit_TranslationFailed = createSelector(
  getCatState,
  fromCategories.edit_TranslationFailed
);

////edit_Translation  

export const getCategoryTranslationCount = createSelector(
  getCatState,
  fromCategories.getCategoryTranslationCount
);
export const getCategoryTranslationCountLoading = createSelector(
  getCatState,
  fromCategories.getCategoryTranslationCountLoading
);
export const getCategoryTranslationCountLoaded = createSelector(
  getCatState,
  fromCategories.getCategoryTranslationCountLoaded
);
export const getCategoryTranslationCountFailed = createSelector(
  getCatState,
  fromCategories.getCategoryTranslationCountFailed
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


// categoryDetailsRemove
export const categoryDetailsRemove = createSelector(
  getCatState,
  fromCategories.categoryDetailsRemove
);
