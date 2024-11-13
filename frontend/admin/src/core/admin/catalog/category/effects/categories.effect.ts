/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as actions from '../action/categories.action';
import { catchError } from 'rxjs/operators';
// service
import { CategoriesService } from '../categories.service';
// model
import { CategorydeleteResponseModel } from '../models/categorydelete.response.model';
import { CategoryupdateResponseModel } from '../models/categoryupdate.response.model';
import { saveAs } from 'file-saver';

@Injectable()
export class CategoriesEffect {
  constructor(
    private action$: Actions,
    private categoriesService: CategoriesService
  ) {}

  // CATEGORY LIST
  
  docatlists$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_CATEGORIES_LIST),
    map((action: actions.DoCategorieslistAction) => action.payload),
    switchMap((state) => {
      return this.categoriesService.categoryList(state).pipe(
        switchMap((list) => [new actions.DoCategorieslistSuccessAction(list)]),
        catchError((error) => of(new actions.DoCategorieslistFailAction(error)))
      );
    })
  ));
  //CATEGORY TRANSLATION LIST

  
  getCategoryTranslation$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_CATEGORY_TRANSLATION_LIST),
    map((action: actions.getCategoryTranslationListAction) => action.payload),
    switchMap((state) => {
      return this.categoriesService.getCategoryTranslation(state).pipe(
        switchMap((list) => [
          new actions.getCategoryTranslationListSuccessAction(list),
        ]),
        catchError((error) =>
          of(new actions.getCategoryTranslationListFailAction(error))
        )
      );
    })
  ));

  //CATEGORY TRANSLATION LIST
  
  translationDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.TRANSALTION_DETAIL),
    map((action: actions.translationDetailAction) => action.payload),
    switchMap((state) => {
      return this.categoriesService.translationDetail(state).pipe(
        switchMap((list) => [new actions.translationDetailSuccessAction(list)]),
        catchError((error) =>
          of(new actions.translationDetailFailAction(error))
        )
      );
    })
  ));

  //  add_Translation
  
  add_Translation$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.ADD_TRANSLATION),
    map((action: actions.add_TranslationAction) => action.payload),
    switchMap((state) => {
      return this.categoriesService.add_Translation(state).pipe(
        switchMap((list) => [new actions.add_TranslationSuccessAction(list)]),
        catchError((error) => of(new actions.add_TranslationFailAction(error)))
      );
    })
  ));

  //  edit_Translation
  
  edit_Translation$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.EDIT_TRANSLATION),
    map((action: actions.edit_TranslationAction) => action.payload),
    switchMap((state) => {
      return this.categoriesService.edit_Translation(state).pipe(
        switchMap((list) => [new actions.edit_TranslationSuccessAction(list)]),
        catchError((error) => of(new actions.edit_TranslationFailAction(error)))
      );
    })
  ));

  //  getCategoryTranslationCount
  
  getCategoryTranslationCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_CATEGORY_TRANSLATIONS_COUNT),
    map((action: actions.getCategoryTranslationCountAction) => action.payload),
    switchMap((state) => {
      return this.categoriesService.getCategoryTranslationCount(state).pipe(
        switchMap((list) => [
          new actions.getCategoryTranslationCountSuccessAction(list),
        ]),
        catchError((error) =>
          of(new actions.getCategoryTranslationCountFailAction(error))
        )
      );
    })
  ));

  
  doDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_DELETE_CATEGORIES),
    map((action: actions.DoDeleteCategoriesAction) => action.payload),
    switchMap((state) => {
      return this.categoriesService.delete(state).pipe(
        switchMap((user) => [
          new actions.DoDeleteCategoriesSuccessAction(
            new CategorydeleteResponseModel(user)
          ),
        ]),
        catchError((error) =>
          of(
            new actions.DoCatcountFailAction(
              new CategorydeleteResponseModel(error)
            )
          )
        )
      );
    })
  ));

  
  doaddCategory$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ADDCATEGORIES),
    map((action: actions.DoAddCategoriesAction) => action.payload),
    switchMap((state) => {
      return this.categoriesService.addCategory(state).pipe(
        switchMap((add) => {
          return [new actions.DoAddCategoriesSuccessAction(add)];
        }),
        catchError((error) => of(new actions.DoAddCategoriesFailAction(error)))
      );
    })
  ));

  
  doupdateCategory$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_UPDATECATEGORIES),
    map((action: actions.DoUpdateCategoriesAction) => action.payload),
    switchMap((state) => {
      return this.categoriesService.updateCategory(state).pipe(
        switchMap((user) => {
          return [new actions.DoUpdateCategoriesSuccessAction(user)];
        }),
        catchError((error) =>
          of(
            new actions.DoUpdateCategoriesFailAction(
              new CategoryupdateResponseModel(error)
            )
          )
        )
      );
    })
  ));

  // category pagination

  
  docount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_CATEGORIESCOUNT),
    map((action: actions.DoCategoriescountAction) => action.payload),
    switchMap((state) => {
      return this.categoriesService.categoryListPagination(state).pipe(
        switchMap((user) => [new actions.DoCategoriescountSuccessAction(user)]),
        catchError((error) => of(new actions.DoCatcountFailAction(error)))
      );
    })
  ));

  // CATEGORY DETAILS
  
  categoryDetails$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_CATEGORY_DETAILS),
    map((action: actions.GetCategoryDetailsAction) => action.payload),
    switchMap((state) => {
      return this.categoriesService.categoryDetails(state).pipe(
        switchMap((list) => [
          new actions.GetCategoryDetailsSuccessAction(list),
        ]),
        catchError((error) =>
          of(new actions.GetCategoryDetailsFailAction(error))
        )
      );
    })
  ));

  // CATEGORY EXPORT
  
  CategoryExportExcel$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.CATEGORY_EXPORT_EXCEL),
    map((action: actions.CategoryExportExcelAction) => action.payload),
    switchMap((state) => {
      return this.categoriesService.CategoryExportExcel(state).pipe(
        tap((data) => {
          const filename = "CategoriesExcel_" + Date.now() + ".xlsx";
          const blob = new Blob([data], { type: "text/xlsx" });
          saveAs(blob, filename);
        }),
        switchMap((list) => [
          new actions.CategoryExportExcelSuccessAction(list),
        ]),
        catchError((error) =>
          of(new actions.CategoryExportExcelFailAction(error))
        )
      );
    })
  ));

  // CATEGORY EXPORT ALL
  
  ExportAllExcel$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_ALL_EXCEL),
    map((action: actions.ExportAllExcelAction) => action.payload),
    switchMap((state) => {
      return this.categoriesService.ExportAllExcel(state).pipe(
        tap((data) => {
          const filename = "CategoriesExcel_" + Date.now() + ".xlsx";
          const blob = new Blob([data], { type: "text/xlsx" });
          saveAs(blob, filename);
        }),
        switchMap((list) => [new actions.ExportAllExcelSuccessAction(list)]),
        catchError((error) => of(new actions.ExportAllExcelFailAction(error)))
      );
    })
  ));
}
