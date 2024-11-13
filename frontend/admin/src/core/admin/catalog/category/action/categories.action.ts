/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { type } from '../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';
// Model
import { CategorydeleteForm } from '../models/categorydelete.model';
import { CategoryForm } from '../models/category.model';
import { CategoryupdateForm } from '../models/categoryupdate.model';
import { CategorylistForm } from '../models/categorylist.model';
import { CategorycountForm } from '../models/categorycount.model';

export const ActionTypes = {
  DO_CATEGORIES_LIST: type('[List] Do Categorieslist'),
  DO_CATEGORIES_LIST_SUCCESS: type('[List] Do Categorieslist Success'),
  DO_CATEGORIES_LIST_FAIL: type('[List] Do Categorieslist Fail'),

  GET_CATEGORY_TRANSLATION_LIST: type('[List] Do getCategoryTranslation'),
  GET_CATEGORY_TRANSLATION_LIST_SUCCESS: type('[List] Do getCategoryTranslation Success'),
  GET_CATEGORY_TRANSLATION_LIST_FAIL: type('[List] Do getCategoryTranslation Fail'),
 
  TRANSALTION_DETAIL: type('[List] Do translationDetail'),
  TRANSALTION_DETAIL_SUCCESS: type('[List] Do translationDetail Success'),
  TRANSALTION_DETAIL_FAIL: type('[List] Do translationDetail Fail'),

  ADD_TRANSLATION: type('[List] Do ADD_TRANSLATION'),
  ADD_TRANSLATION_SUCCESS: type('[List] Do ADD_TRANSLATION Success'),
  ADD_TRANSLATION_FAIL: type('[List] Do ADD_TRANSLATION Fail'),

  EDIT_TRANSLATION: type('[List] Do EDIT_TRANSLATION'),
  EDIT_TRANSLATION_SUCCESS: type('[List] Do EDIT_TRANSLATION Success'),
  EDIT_TRANSLATION_FAIL: type('[List] Do EDIT_TRANSLATION Fail'),
  
  GET_CATEGORY_TRANSLATIONS_COUNT: type('[List] Do getCategoryTranslationCount'),
  GET_CATEGORY_TRANSLATIONS_COUNT_SUCCESS: type('[List] Do getCategoryTranslationCount Success'),
  GET_CATEGORY_TRANSLATIONS_COUNT_FAIL: type('[List] Do getCategoryTranslationCount Fail'),


  DO_DELETE_CATEGORIES: type('[Delete] Do Delete Categories'),
  DO_DELETE_CATEGORIES_SUCCESS: type('[Delete] Do Delete Categories Success'),
  DO_DELETE_CATEGORIES_FAIL: type('[Delete] Do Delete Categories Fail'),

  DO_UPDATECATEGORIES: type('[Add] Do Update Categories'),
  DO_UPDATECATEGORIES_SUCCESS: type('[Add] Do Update Categories Success'),
  DO_UPDATECATEGORIES_FAIL: type('[Add] Do Update Categories Fail'),

  DO_ADDCATEGORIES: type('[Catalog] Do AddCategories'),
  DO_ADDCATEGORIES_SUCCESS: type('[Catalog] Do AddCategories Success'),
  DO_ADDCATEGORIES_FAIL: type('[Catalog] Do AddCategory Fail'),

  DO_CATEGORIESCOUNT: type('[Listcount] Do Categorieslistcount'),
  DO_CATEGORIESCOUNT_SUCCESS: type(
    '[Listcount] Do Categorieslistcount Success'
  ),
  DO_CATEGORIESCOUNT_FAIL: type('[Listcount] Do Categorieslistcount Fail'),

  DO_PRODUCT_REMOVE: type('[PRemove] Do Product Remove'),
  DO_PRODUCT_ADD: type('[PAdd] Do Product Add'),

  GET_CATEGORY_DETAILS: type('[List] Get Category Details'),
  GET_CATEGORY_DETAILS_SUCCESS: type('[List] Get Category Details Success'),
  GET_CATEGORY_DETAILS_FAIL: type('[List] Get Category Details Fail'),

  FILTER_CATEGORY: type('[List] Filter category'),

  CATEGORY_EXPORT_EXCEL: type('[List] Category Export Excel'),
  CATEGORY_EXPORT_EXCEL_SUCCESS: type('[List]  Category Export Excel Success'),
  CATEGORY_EXPORT_EXCEL_FAIL: type('[List]  Category Export Excel Fail'),

  EXPORT_ALL_EXCEL: type('[List] Export All Excel'),
  EXPORT_ALL_EXCEL_SUCCESS: type('[List]  Export All Excel Success'),
  EXPORT_ALL_EXCEL_FAIL: type('[List]  Export All Excel Fail'),

  CATEGORY_DETAILS_REMOVE: type('[List]  categoryDetailsRemove'),
};

// category list action
export class DoCategorieslistAction implements Action {
  type = ActionTypes.DO_CATEGORIES_LIST;

  constructor(public payload: CategorylistForm) { }
}

export class DoCategorieslistSuccessAction implements Action {
  type = ActionTypes.DO_CATEGORIES_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class DoCategorieslistFailAction implements Action {
  type = ActionTypes.DO_CATEGORIES_LIST_FAIL;

  constructor(public payload: any = null) { }
}

// category count action

export class DoCategoriescountAction implements Action {
  type = ActionTypes.DO_CATEGORIESCOUNT;

  constructor(public payload: CategorycountForm) { }
}

export class DoCategoriescountSuccessAction implements Action {
  type = ActionTypes.DO_CATEGORIESCOUNT_SUCCESS;

  constructor(public payload: any) { }
}

export class DoCatcountFailAction implements Action {
  type = ActionTypes.DO_CATEGORIESCOUNT_FAIL;

  constructor(public payload: any = null) { }
}

// category delete action
export class DoDeleteCategoriesAction implements Action {
  type = ActionTypes.DO_DELETE_CATEGORIES;

  constructor(public payload: CategorydeleteForm) { }
}

export class DoDeleteCategoriesSuccessAction implements Action {
  type = ActionTypes.DO_DELETE_CATEGORIES_SUCCESS;

  constructor(public payload: any) { }
}

export class DoDeleteCategoriesFailAction implements Action {
  type = ActionTypes.DO_DELETE_CATEGORIES_FAIL;

  constructor(public payload: any = null) { }
}

// category add action
export class DoAddCategoriesAction implements Action {
  type = ActionTypes.DO_ADDCATEGORIES;

  constructor(public payload: CategoryForm) { }
}

export class DoAddCategoriesSuccessAction implements Action {
  type = ActionTypes.DO_ADDCATEGORIES_SUCCESS;

  constructor(public payload: any) { }
}

export class DoAddCategoriesFailAction implements Action {
  type = ActionTypes.DO_ADDCATEGORIES_FAIL;

  constructor(public payload: any = null) { }
}

// category update action
export class DoUpdateCategoriesAction implements Action {
  type = ActionTypes.DO_UPDATECATEGORIES;

  constructor(public payload: CategoryupdateForm) { }
}

export class DoUpdateCategoriesSuccessAction implements Action {
  type = ActionTypes.DO_UPDATECATEGORIES_SUCCESS;

  constructor(public payload: any) { }
}

export class DoUpdateCategoriesFailAction implements Action {
  type = ActionTypes.DO_UPDATECATEGORIES_FAIL;

  constructor(public payload: any = null) { }
}
//CATEGORY TRANSLATON

export class getCategoryTranslationListAction implements Action {
  type = ActionTypes.GET_CATEGORY_TRANSLATION_LIST;

  constructor(public payload: CategorylistForm) { }
}

export class getCategoryTranslationListSuccessAction implements Action {
  type = ActionTypes.GET_CATEGORY_TRANSLATION_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class getCategoryTranslationListFailAction implements Action {
  type = ActionTypes.GET_CATEGORY_TRANSLATION_LIST_FAIL;

  constructor(public payload: any = null) { }
}

//translation Detail

export class translationDetailAction implements Action {
  type = ActionTypes.TRANSALTION_DETAIL;

  constructor(public payload: CategorylistForm) { }
}

export class translationDetailSuccessAction implements Action {
  type = ActionTypes.TRANSALTION_DETAIL_SUCCESS;

  constructor(public payload: any) { }
}

export class translationDetailFailAction implements Action {
  type = ActionTypes.TRANSALTION_DETAIL_FAIL;

  constructor(public payload: any = null) { }
}

//EDIT_TRANSLATION
export class edit_TranslationAction implements Action {
  type = ActionTypes.EDIT_TRANSLATION;

  constructor(public payload: CategorylistForm) { }
}

export class edit_TranslationSuccessAction implements Action {
  type = ActionTypes.EDIT_TRANSLATION_SUCCESS;

  constructor(public payload: any) { }
}

export class edit_TranslationFailAction implements Action {
  type = ActionTypes.EDIT_TRANSLATION_FAIL;

  constructor(public payload: any = null) { }
}

//getCategoryTranslationCount
export class getCategoryTranslationCountAction implements Action {
  type = ActionTypes.GET_CATEGORY_TRANSLATIONS_COUNT;

  constructor(public payload: any) {
   }
}

export class getCategoryTranslationCountSuccessAction implements Action {
  type = ActionTypes.GET_CATEGORY_TRANSLATIONS_COUNT_SUCCESS;

  constructor(public payload: any) { }
}

export class getCategoryTranslationCountFailAction implements Action {
  type = ActionTypes.GET_CATEGORY_TRANSLATIONS_COUNT_FAIL;

  constructor(public payload: any = null) { }
}



//add_Translation 

export class add_TranslationAction implements Action {
  type = ActionTypes.ADD_TRANSLATION;

  constructor(public payload: CategorylistForm) { }
}

export class add_TranslationSuccessAction implements Action {
  type = ActionTypes.ADD_TRANSLATION_SUCCESS;

  constructor(public payload: any) { }
}

export class add_TranslationFailAction implements Action {
  type = ActionTypes.ADD_TRANSLATION_FAIL;

  constructor(public payload: any = null) { }
}



// product remove action
export class DoProductremoveAction implements Action {
  type = ActionTypes.DO_PRODUCT_REMOVE;

  constructor(public payload: any) { }
}

// product add action
export class DoProductaddAction implements Action {
  type = ActionTypes.DO_PRODUCT_ADD;
  constructor(public payload: any) { }
}

// get category details

export class GetCategoryDetailsAction implements Action {
  type = ActionTypes.GET_CATEGORY_DETAILS;
  constructor(public payload: any) { }
}

export class GetCategoryDetailsSuccessAction implements Action {
  type = ActionTypes.GET_CATEGORY_DETAILS_SUCCESS;
  constructor(public payload: any) { }
}

export class GetCategoryDetailsFailAction implements Action {
  type = ActionTypes.GET_CATEGORY_DETAILS_FAIL;
  constructor(public payload: any) { }
}

// Filter Category

export class FilterCategoryAction implements Action {
  type = ActionTypes.FILTER_CATEGORY;
  constructor(public payload: any) { }
}



// export excel
export class CategoryExportExcelAction implements Action {
  type = ActionTypes.CATEGORY_EXPORT_EXCEL;
  constructor(public payload: any) { }
}

export class CategoryExportExcelSuccessAction implements Action {
  type = ActionTypes.CATEGORY_EXPORT_EXCEL_SUCCESS;
  constructor(public payload: any) { }
}

export class CategoryExportExcelFailAction implements Action {
  type = ActionTypes.CATEGORY_EXPORT_EXCEL_FAIL;
  constructor(public payload: any) { }
}



// export all excel
export class ExportAllExcelAction implements Action {
  type = ActionTypes.EXPORT_ALL_EXCEL;
  constructor(public payload: any) { }
}

export class ExportAllExcelSuccessAction implements Action {
  type = ActionTypes.EXPORT_ALL_EXCEL_SUCCESS;
  constructor(public payload: any) { }
}

export class ExportAllExcelFailAction implements Action {
  type = ActionTypes.EXPORT_ALL_EXCEL_FAIL;
  constructor(public payload: any) { }
}


export class categoryDetailsRemoveAction implements Action {
  type = ActionTypes.CATEGORY_DETAILS_REMOVE;
  constructor(public payload: any) { }
}

export type Actions =
  | edit_TranslationAction
  | edit_TranslationSuccessAction
  | edit_TranslationFailAction  
  | edit_TranslationAction
  | edit_TranslationSuccessAction
  | edit_TranslationFailAction 
  | add_TranslationAction
  | add_TranslationSuccessAction
  | add_TranslationFailAction
  | translationDetailAction
  | translationDetailSuccessAction
  | translationDetailFailAction
  | getCategoryTranslationListAction
  | getCategoryTranslationListSuccessAction
  | getCategoryTranslationListFailAction
  | DoCategorieslistAction
  | DoCategorieslistSuccessAction
  | DoCategorieslistFailAction
  | DoCategoriescountAction
  | DoCategoriescountSuccessAction
  | DoCatcountFailAction
  | DoDeleteCategoriesAction
  | DoDeleteCategoriesSuccessAction
  | DoDeleteCategoriesFailAction
  | DoAddCategoriesAction
  | DoAddCategoriesSuccessAction
  | DoAddCategoriesFailAction
  | DoUpdateCategoriesAction
  | DoUpdateCategoriesSuccessAction
  | DoUpdateCategoriesFailAction
  | DoProductremoveAction
  | DoProductaddAction
  | GetCategoryDetailsAction
  | GetCategoryDetailsSuccessAction
  | GetCategoryDetailsFailAction
  | CategoryExportExcelAction
  | CategoryExportExcelSuccessAction
  | CategoryExportExcelFailAction
  | ExportAllExcelAction
  | ExportAllExcelSuccessAction
  | ExportAllExcelFailAction
  | categoryDetailsRemoveAction;
