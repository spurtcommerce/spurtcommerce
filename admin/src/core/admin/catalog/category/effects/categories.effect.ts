/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as actions from '../action/categories.action';
import { catchError } from 'rxjs/internal/operators';
// service
import { CategoriesService } from '../categories.service';
// model
import { CategorydeleteResponseModel } from '../models/categorydelete.response.model';
import { CategoryupdateResponseModel } from '../models/categoryupdate.response.model';

@Injectable()
export class CategoriesEffect {
  constructor(
    private action$: Actions,
    private categoriesService: CategoriesService
  ) {}

  // CATEGORY LIST
  @Effect()
  docatlists$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_CATEGORIES_LIST),
    map((action: actions.DoCategorieslistAction) => action.payload),
    switchMap(state => {
      return this.categoriesService.categoryList(state).pipe(
        switchMap(list => [new actions.DoCategorieslistSuccessAction(list)]),
        catchError(error => of(new actions.DoCategorieslistFailAction(error)))
      );
    })
  );

  @Effect()
  doDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_DELETE_CATEGORIES),
    map((action: actions.DoDeleteCategoriesAction) => action.payload),
    switchMap(state => {
      return this.categoriesService.delete(state).pipe(
        switchMap(user => [
          new actions.DoDeleteCategoriesSuccessAction(
            new CategorydeleteResponseModel(user)
          )
        ]),
        catchError(error =>
          of(
            new actions.DoCatcountFailAction(
              new CategorydeleteResponseModel(error)
            )
          )
        )
      );
    })
  );

  @Effect()
  doaddCategory$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_ADDCATEGORIES),
    map((action: actions.DoAddCategoriesAction) => action.payload),
    switchMap(state => {
      return this.categoriesService.addCategory(state).pipe(
        switchMap(add => {
          return [new actions.DoAddCategoriesSuccessAction(add)];
        }),
        catchError(error => of(new actions.DoAddCategoriesFailAction(error)))
      );
    })
  );

  @Effect()
  doupdateCategory$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_UPDATECATEGORIES),
    map((action: actions.DoUpdateCategoriesAction) => action.payload),
    switchMap(state => {
      return this.categoriesService.updateCategory(state).pipe(
        switchMap(user => {
          return [new actions.DoUpdateCategoriesSuccessAction(user)];
        }),
        catchError(error =>
          of(
            new actions.DoUpdateCategoriesFailAction(
              new CategoryupdateResponseModel(error)
            )
          )
        )
      );
    })
  );

  // category pagination

  @Effect()
  docount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_CATEGORIESCOUNT),
    map((action: actions.DoCategoriescountAction) => action.payload),
    switchMap(state => {
      return this.categoriesService.categoryListPagination(state).pipe(
        switchMap(user => [new actions.DoCategoriescountSuccessAction(user)]),
        catchError(error => of(new actions.DoCatcountFailAction(error)))
      );
    })
  );
}
