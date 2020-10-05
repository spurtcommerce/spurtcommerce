/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
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
  getCategoryListnCount,
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
  getCategoryFilterList
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

  public getCategoriesListCount$ = this.appState.select(getCategoryListnCount);
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

  public parentLevels: any = [];

  constructor(
    protected appState: Store<store.AppState>,
    private toastr: ToastrManager,
    private router: Router
  ) {
    this.subscribe();
  }

  public categorylist(value) {
    this.appState.dispatch(
      new categoriesActions.DoCategorieslistAction(new CategorylistForm(value))
    );
  }

  public categorycountdata(value) {
    this.appState.dispatch(
      new categoriesActions.DoCategoriescountAction(
        new CategorycountForm(value)
      )
    );
  }

  public categorydelete(value) {
    this.appState.dispatch(
      new categoriesActions.DoDeleteCategoriesAction(
        new CategorydeleteForm(value)
      )
    );
  }

  public addcategories(value) {
    this.appState.dispatch(
      new categoriesActions.DoAddCategoriesAction(new CategoryForm(value))
    );
  }

  public updatecategories(value) {
    this.appState.dispatch(
      new categoriesActions.DoUpdateCategoriesAction(
        new CategoryupdateForm(value)
      )
    );
  }

  public subscribe() {
    this.getAddCategories$.subscribe(data => {
      if (data && data.status === 1) {
        this.router.navigate(['/catalog/categories']);
      }
    });

    this.getUpdateCategoriesData$.subscribe(data => {
      if (data && data.status === 1) {
        this.router.navigate(['/catalog/categories']);
      }
    });
    this.getCategoriesList$.subscribe(data => {
      _.each(data, value => {
        const params: any = {};
        params.subLevel1 = _.get(value, 'levels[0].categoryName');
        params.subLevel2 = _.get(value, 'levels[1].categoryName')
          ? ' > ' + _.get(value, 'levels[1].categoryName')
          : '';
        params.subLevel3 = _.get(value, 'levels[2].categoryName')
          ? ' > ' + _.get(value, 'levels[2].categoryName')
          : '';
        value.level = params.subLevel1 + params.subLevel2 + params.subLevel3;
        this.levelsloop = value.level;
      });
    });
  }
}
