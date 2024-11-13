/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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
  ExportAllExcelResponse,
  
  getCategoryTranslationList,
  getCategoryTranslationListLoading,
  getCategoryTranslationListLoaded,
  getCategoryTranslationListFailed,

  translationDetail,
  translationDetailLoading,
  translationDetailLoaded,
  translationDetailFailed,

  
  add_Translation,
  add_TranslationLoading,
  add_TranslationLoaded,
  add_TranslationFailed,

  edit_Translation,
  edit_TranslationLoading,
  edit_TranslationLoaded,
  edit_TranslationFailed, 

  getCategoryTranslationCount,
  getCategoryTranslationCountLoading,
  getCategoryTranslationCountLoaded,
  getCategoryTranslationCountFailed,

  categoryDetailsRemove
} from './reducer/categories.selectors';
import { CategoryForm } from './models/category.model';
import { CategoryupdateForm } from './models/categoryupdate.model';
import { Router } from '@angular/router';
import { CategorycountForm } from './models/categorycount.model';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

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

  // categoryDetailsRemove
  public categoryDetailsRemove$ = this.appState.select(categoryDetailsRemove);

 //category translation List
 
 public getCategoryTranslationList$ = this.appState.select(
  getCategoryTranslationList
);
public getCategoryTranslationListLoading$ = this.appState.select(
  getCategoryTranslationListLoading
);
public getCategoryTranslationListLoaded$ = this.appState.select(
  getCategoryTranslationListLoaded
);
public getCategoryTranslationListFailed$ = this.appState.select(
  getCategoryTranslationListFailed
);

 //  Category Translations Count
  
 public getCategoryTranslationCount$ = this.appState.select(
  getCategoryTranslationCount
);
public getCategoryTranslationCountLoading$ = this.appState.select(
  getCategoryTranslationCountLoading
);
public getCategoryTranslationCountLoaded$ = this.appState.select(
  getCategoryTranslationCountLoaded
);
public getCategoryTranslationCountFailed$ = this.appState.select(
  getCategoryTranslationCountFailed
);




 
 //category Detail translation List
 
 public translationDetail$ = this.appState.select(
  translationDetail
  );
  public translationDetailLoading$ = this.appState.select(
  translationDetailLoading
  );
  public translationDetailLoaded$ = this.appState.select(
  translationDetailLoaded
  );
  public translationDetailFailed$ = this.appState.select(
   translationDetailFailed
  );

  
 //add Translation List
 
 public add_Translation$ = this.appState.select(
  add_Translation
  );
  public add_TranslationLoading$ = this.appState.select(
  add_TranslationLoading
  );
  public add_TranslationLoaded$ = this.appState.select(
  add_TranslationLoaded
  );
  public add_TranslationFailed$ = this.appState.select(
   add_TranslationFailed
  );

    
 //edit translation List
 
 public edit_Translation$ = this.appState.select(
  edit_Translation
  );
  public edit_TranslationLoading$ = this.appState.select(
  edit_TranslationLoading
  );
  public edit_TranslationLoaded$ = this.appState.select(
  edit_TranslationLoaded
  );
  public edit_TranslationFailed$ = this.appState.select(
   edit_TranslationFailed
  );




 public parentLevels: any = [];

  constructor(
    protected appState: Store<store.AppState>,
    private toastr: ToastrService,
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

  //CATEGORY TRANSLATION
  public getCategoryTranslation(value) {
  this.appState.dispatch(
      new categoriesActions.getCategoryTranslationListAction((value))
    );
  }
  
  //CATEGORY TRANSLATION DETAIL
  public translationDetail(value) {
  this.appState.dispatch(
      new categoriesActions.translationDetailAction((value))
    );
  }

  // ADD_ TRANSLATION
  public add_Translation(value) {
    this.appState.dispatch(
        new categoriesActions.add_TranslationAction((value))
      );
    }
  // EDIT_ TRANSLATION
  public edit_Translation(value) {
    this.appState.dispatch(
        new categoriesActions.edit_TranslationAction((value))
      );
    }

      // getCategoryTranslationCount
  public getCategoryTranslationCount(value) {
    this.appState.dispatch(
        new categoriesActions.getCategoryTranslationCountAction((value))
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


  // categoryDetailsRemove
  public categoryDetailsRemove(value) {
    this.appState.dispatch(new categoriesActions.categoryDetailsRemoveAction(value));
  }
}
