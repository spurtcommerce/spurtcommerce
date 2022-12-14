/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
// store
import { Store } from '@ngrx/store';
// app state
import * as store from '../../../app.state.interface';
// action
import * as categoriesActions from './action/categories.action';
// model
import { CategorylistForm } from './models/categorylist.model';
import { CategorydeleteForm } from './models/categorydelete.model';
import {
  // category list selectors
  getCategoryList,
  getCategoriesListResponse,
  getCategoriesListRequestLoading,
  getCategoriesListRequestLoaded,
  getCategoriesListRequestFailed,
  getCategoryListCount,
  // category count selectors
  getCategoriesCountRequestFailed,
  getCategoriesCountRequestLoaded,
  getCategoriesCountResponse,
  getCategoriesCountRequestLoading,
  getCategoryCountdata,
  // category update selectors
  getUpdateCatagory,
  getUpdateCategoryBadresponse,
  getUpdateCategoriesResponse,
  getUpdateCategoriesRequestLoading,
  getUpdateCategoriesRequestLoaded,
  getUpdateCategoriesRequestFailed,
  // category delete selectors
  getCategoryDoDelete,
  getDeleteCategoriesResponse,
  getDeleteCategoriesRequestLoading,
  getDeleteCategoriesRequestLoaded,
  getDeleteCategoriesRequestFailed,
  // category add selectors
  getAddCatagoryStatus,
  getAddCatagoryData,
  getAddCategoriesResponse,
  getAddCategoriesRequestLoading,
  getAddCategoriesRequestLoaded,
  getAddCategoriesRequestFailed,
  // product add selectors
  getProductAddResponse,
  getProductAddRequestLoading,
  getProductAddRequestLoaded,
  getProductAddRequestFailed,
  // product remove selectors
  getProductRemoveResponse,
  getProductRemoveRequestLoading,
  getProductRemoveRequestLoaded,
  getProductRemoveRequestFailed,
  getCategoryFilterList,
  categoryDetails,
  categoryDetailsLoading,
  categoryDetailsLoaded,
  categoriesListResponse,
  CategoryExportExcel,
  CategoryExportExcelLoading,
  CategoryExportExcelLoaded,
  CategoryExportExcelResponse,
  ExportAllExcel,
  ExportAllExcelLoading,
  ExportAllExcelLoaded,
  ExportAllExcelResponse
} from './reducer/categories.selectors';
import { CategoryForm } from './models/category.model';
import { CategoryupdateForm } from './models/categoryupdate.model';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { CategorycountForm } from './models/categorycount.model';
import * as _ from 'lodash';

@Injectable()
export class CategoriesSandbox {
  public levelsloop: any = [];
  public getCategoriesList$ = this.appState.select(getCategoryList);
  // CategoryFilterList
  public getCategoriesFilterList$ = this.appState.select(getCategoryFilterList);

  public getCategoriesListCount$ = this.appState.select(getCategoryListCount);
  public getCategoriesDelete$ = this.appState.select(getCategoryDoDelete);
  public getAddCategories$ = this.appState.select(getAddCatagoryStatus);
  public getAddCategoriesdata$ = this.appState.select(getAddCatagoryData);
  public getUpdateCategoriesData$ = this.appState.select(getUpdateCatagory);
  public getUpdateCategoriesountdatas$ = this.appState.select(
    getCategoryCountdata
  );
  public getUpdateCategoriesBadresponse$ = this.appState.select(
    getUpdateCategoryBadresponse
  );

  public getDeleteCategoriesResponse$ = this.appState.select(
    getDeleteCategoriesResponse
  );
  public getDeleteCategoriesRequestLoading$ = this.appState.select(
    getDeleteCategoriesRequestLoading
  );
  public getDeleteCategoriesRequestLoaded$ = this.appState.select(
    getDeleteCategoriesRequestLoaded
  );
  public getDeleteCategoriesRequestFailed$ = this.appState.select(
    getDeleteCategoriesRequestFailed
  );

  public getCategoriesCountResponse$ = this.appState.select(
    getCategoriesCountResponse
  );
  public getCategoriesCountRequestLoading$ = this.appState.select(
    getCategoriesCountRequestLoading
  );
  public getCategoriesCountRequestLoaded$ = this.appState.select(
    getCategoriesCountRequestLoaded
  );
  public getCategoriesCountRequestFailed$ = this.appState.select(
    getCategoriesCountRequestFailed
  );

  public getCategoriesListResponse$ = this.appState.select(
    getCategoriesListResponse
  );
  public getCategoriesListRequestLoading$ = this.appState.select(
    getCategoriesListRequestLoading
  );
  public getCategoriesListRequestLoaded$ = this.appState.select(
    getCategoriesListRequestLoaded
  );
  public getCategoriesListRequestFailed$ = this.appState.select(
    getCategoriesListRequestFailed
  );

  public getUpdateCategoriesResponse$ = this.appState.select(
    getUpdateCategoriesResponse
  );
  public getUpdateCategoriesRequestLoading$ = this.appState.select(
    getUpdateCategoriesRequestLoading
  );
  public getUpdateCategoriesRequestLoaded$ = this.appState.select(
    getUpdateCategoriesRequestLoaded
  );
  public getUpdateCategoriesRequestFailed$ = this.appState.select(
    getUpdateCategoriesRequestFailed
  );

  public getAddCategoriesResponse$ = this.appState.select(
    getAddCategoriesResponse
  );
  public getAddCategoriesRequestLoading$ = this.appState.select(
    getAddCategoriesRequestLoading
  );
  public getAddCategoriesRequestLoaded$ = this.appState.select(
    getAddCategoriesRequestLoaded
  );
  public getAddCategoriesRequestFailed$ = this.appState.select(
    getAddCategoriesRequestFailed
  );

  public getProductAddResponse$ = this.appState.select(getProductAddResponse);
  public getProductAddRequestLoading$ = this.appState.select(
    getProductAddRequestLoading
  );
  public getProductAddRequestLoaded$ = this.appState.select(
    getProductAddRequestLoaded
  );
  public getProductAddRequestFailed$ = this.appState.select(
    getProductAddRequestFailed
  );

  public getProductRemoveResponse$ = this.appState.select(
    getProductRemoveResponse
  );
  public getProductRemoveRequestLoading$ = this.appState.select(
    getProductRemoveRequestLoading
  );
  public getProductRemoveRequestLoaded$ = this.appState.select(
    getProductRemoveRequestLoaded
  );
  public getProductRemoveRequestFailed$ = this.appState.select(
    getProductRemoveRequestFailed
  );

  public categoryDetails$ = this.appState.select(categoryDetails);
  public categoryDetailsLoading$ = this.appState.select(categoryDetailsLoading);
  public categoryDetailsLoaded$ = this.appState.select(categoryDetailsLoaded);
  public categoriesListResponse$ = this.appState.select(categoriesListResponse);


  public CategoryExportExcel$ = this.appState.select(CategoryExportExcel);
  public CategoryExportExcelLoading$ = this.appState.select(CategoryExportExcelLoading);
  public CategoryExportExcelLoaded$ = this.appState.select(CategoryExportExcelLoaded);
  public CategoryExportExcelResponse$ = this.appState.select(CategoryExportExcelResponse);

  public ExportAllExcel$ = this.appState.select(ExportAllExcel);
  public ExportAllExcelLoading$ = this.appState.select(ExportAllExcelLoading);
  public ExportAllExcelLoaded$ = this.appState.select(ExportAllExcelLoaded);
  public ExportAllExcelResponse$ = this.appState.select(ExportAllExcelResponse);

  public parentLevels: any = [];

  constructor(
    protected appState: Store<store.AppState>,
    private toastr: ToastrManager,
    private router: Router
  ) {
    // this.subscribe();
  }

  public categoryList(value) {

    this.appState.dispatch(
      new categoriesActions.DoCategorieslistAction(new CategorylistForm(value))
    );
  }

  public getCategoryListCount(value) {
    this.appState.dispatch(
      new categoriesActions.DoCategoriescountAction(
        new CategorycountForm(value)
      )
    );
  }

  public deleteCategory(value) {
    this.appState.dispatch(
      new categoriesActions.DoDeleteCategoriesAction(
        new CategorydeleteForm(value)
      )
    );
  }

  public addCategories(value) {
    this.appState.dispatch(
      new categoriesActions.DoAddCategoriesAction(new CategoryForm(value))
    );
  }

  public updateCategories(value) {
    this.appState.dispatch(
      new categoriesActions.DoUpdateCategoriesAction(
        new CategoryupdateForm(value)
      )
    );
  }

  public productRemove(value) {
    this.appState.dispatch(new categoriesActions.DoProductremoveAction(value));
  }

  public productAdd(value) {
    this.appState.dispatch(new categoriesActions.DoProductaddAction(value));
  }

  public getCategoryDetails(value) {
    this.appState.dispatch(new categoriesActions.GetCategoryDetailsAction(value));
  }

  public filterCategory(value) {
    this.appState.dispatch(new categoriesActions.FilterCategoryAction(value));
  }

  public CategoryExcel(value) {
    this.appState.dispatch(new categoriesActions.CategoryExportExcelAction(value));
  }

  public ExportAllExcel(value) {
    this.appState.dispatch(new categoriesActions.ExportAllExcelAction(value));

  }

}
