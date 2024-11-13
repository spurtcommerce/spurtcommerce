/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface CategoriesState extends Map<string, any> {
  categoryListCount: any;
  categoryList: any;
  categoryListFilter: any;
  categoryDoDelete: any;
  addCatagoryStatus: any;
  addCatagoryData: any;
  updateCatagory: any;
  categoryCountData: any;
  updateCategoryBadresponse: any;

  deleteCategoriesResponse: any;
  deleteCategoriesRequestLoading: any;
  deleteCategoriesRequestLoaded: any;
  deleteCategoriesRequestFailed: any;

  categoriesCountResponse: any;
  categoriesCountRequestLoading: any;
  categoriesCountRequestLoaded: any;
  categoriesCountRequestFailed: any;

  categoriesListResponse: any;
  categoriesListRequestLoading: any;
  categoriesListRequestLoaded: any;
  categoriesListRequestFailed: any;

  updateCategoriesResponse: any;
  updateCategoriesRequestLoading: any;
  updateCategoriesRequestLoaded: any;
  updateCategoriesRequestFailed: any;

  productRemoveResponse: any;
  productRemoveRequestLoading: any;
  productRemoveRequestLoaded: any;
  productRemoveRequestFailed: any;

  productAddResponse: any;
  productAddRequestLoading: any;
  productAddRequestLoaded: any;
  productAddRequestFailed: any;

  addCategoriesResponse: any;
  addCategoriesRequestLoading: any;
  addCategoriesRequestLoaded: any;
  addCategoriesRequestFailed: any;

  categoryDetails: any;
  categoryDetailsLoading: boolean;
  categoryDetailsLoaded: boolean;
  categoryDetailsFailed: boolean;


  CategoryExportExcel: any;
  CategoryExportExcelLoading: any;
  CategoryExportExceltLoaded: any;
  CategoryExportExcelFailed: any;
  CategoryExportExcelResponse: any;
  
  
  ExportAllExcel: any;
  ExportAllExcelLoading: any;
  ExportAllExceltLoaded: any;
  ExportAllExcelFailed: any;
  ExportAllExcelResponse: any;
  
  getCategoryTranslationList: any;
  getCategoryTranslationListLoading: boolean;
  getCategoryTranslationListLoaded: boolean;
  getCategoryTranslationListFailed: boolean;
  
  translationDetail: any;
  translationDetailLoading: boolean;
  translationDetailLoaded: boolean;
  translationDetailFailed: boolean;

  add_Translation: any;
  add_TranslationLoading: boolean;
  add_TranslationLoaded: boolean;
  add_TranslationFailed: boolean;

  edit_Translation: any;
  edit_TranslationLoading: boolean;
  edit_TranslationLoaded: boolean;
  edit_TranslationFailed: boolean;

  
  getCategoryTranslationCount: any;
  getCategoryTranslationCountLoading: boolean;
  getCategoryTranslationCountLoaded: boolean;
  getCategoryTranslationCountFailed: boolean;

  categoryDetailsRemove:any
  
 } 

export const CategoriesStateRecord = Record({

  getCategoryTranslationList: [],
  getCategoryTranslationListLoading: false,
  getCategoryTranslationListLoaded: false,
  getCategoryTranslationListFailed: false,

  add_Translation: [],
  add_TranslationLoading: false,
  add_TranslationLoaded: false,
  add_TranslationFailed: false,

  edit_Translation: [],
  edit_TranslationLoading: false,
  edit_TranslationLoaded: false,
  edit_TranslationFailed: false,

  getCategoryTranslationCount: [],
  getCategoryTranslationCountLoading: false,
  getCategoryTranslationCountLoaded: false,
  getCategoryTranslationCountFailed: false,

  translationDetail: [],
  translationDetailLoading: false,
  translationDetailLoaded: false,
  translationDetailFailed: false,

  categoryListCount: {},
  categoryList: [],
  categoryListFilter: {},
  categoryDoDelete: {},
  addCatagory: {},
  addCatagoryData: {},
  updateCatagory: {},
  categoryCountData: {},
  updateCategoryBadresponse: {},
  addCatagoryStatus: {},

  deleteCategoriesResponse: {},
  deleteCategoriesRequestLoading: {},
  deleteCategoriesRequestLoaded: {},
  deleteCategoriesRequestFailed: {},

  categoriesCountResponse: {},
  categoriesCountRequestLoading: {},
  categoriesCountRequestLoaded: {},
  categoriesCountRequestFailed: {},

  categoriesListResponse: {},
  categoriesListRequestLoading: {},
  categoriesListRequestLoaded: {},
  categoriesListRequestFailed: {},

  updateCategoriesResponse: {},
  updateCategoriesRequestLoading: {},
  updateCategoriesRequestLoaded: {},
  updateCategoriesRequestFailed: {},

  productRemoveResponse: {},
  productRemoveRequestLoading: {},
  productRemoveRequestLoaded: {},
  productRemoveRequestFailed: {},

  productAddResponse: {},
  productAddRequestLoading: {},
  productAddRequestLoaded: {},
  productAddRequestFailed: {},

  addCategoriesResponse: {},
  addCategoriesRequestLoading: {},
  addCcategoriesRequestLoaded: {},
  addCategoriesRequestFailed: {},

  categoryDetails: {},
  categoryDetailsLoading: false,
  categoryDetailsLoaded: false,
  categoryDetailsFailed: false,


  ExportAllExcel: {},
  ExportAllExcelLoading: {},
  ExportAllExcelLoaded: {},
  ExportAllExcelFailed: {},

  categoryDetailsRemove:{}
});
