/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError } from 'rxjs/operators';
import * as actions from '../vendor-setting-action/vendor-setting.action';
import { SettingService } from '../vendor-setting.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
@Injectable()
export class SettingEffects {
  constructor(
    private action$: Actions,
    public router: Router,
    private settingService: SettingService
  ) {}

  
  settingList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_SETTING_LIST),
    map((action: actions.GetSettingList) => action.payload),
    switchMap(state => {
      return this.settingService.settingList(state).pipe(
        switchMap(SettingList => [
          new actions.GetSettingListSuccess(SettingList)
        ]),
        catchError(error => of(new actions.GetSettingListFail(error)))
      );
    })
  ));

  
  pageDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.PAGE_DETAIL),
    map((action: actions.PageDetail) => action.payload),
    switchMap(state => {
      return this.settingService.pageDetail(state).pipe(
        map((loggedin: any) => new actions.PageDetailSuccess(loggedin)),
        catchError(error => of(new actions.PageDetailFail(error)))
      );
    })
  ));

  
  docatlists$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_CATEGORY_LIST),
    map((action: actions.DoCategorylistAction) => action.payload),
    switchMap(state => {
      return this.settingService.categoryList(state).pipe(
        switchMap(list => [new actions.DoCategorylistSuccessAction(list)]),
        catchError(error => of(new actions.DoCategorylistFailAction(error)))
      );
    })
  ));

  
  docatlist$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_CAT_LIST),
    map((action: actions.DoCatlistAction) => action.payload),
    switchMap(state => {
      return this.settingService.catList(state).pipe(
        switchMap(lists => [new actions.DoCatlistSuccessAction(lists)]),
        catchError(error => of(new actions.DoCatlistFailAction(error)))
      );
    })
  ));

  
  docatAdd$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_CATEGORY_ADD),
    map((action: actions.DoCategoryAddAction) => action.payload),
    switchMap(state => {
      return this.settingService.categoryAdd(state).pipe(
        switchMap(Add => [new actions.DoCategoryAddSuccessAction(Add)]),
        catchError(error => of(new actions.DoCategoryAddFailAction(error)))
      );
    })
  ));

  
  doDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_DELETE_CATEGORIES),
    map((action: actions.DoDeleteCategoriesAction) => action.payload),
    switchMap(state => {
      return this.settingService.delete(state).pipe(
        switchMap(user => [new actions.DoDeleteCategoriesSuccessAction(user)]),
        catchError(error => of(new actions.DoDeleteCategoriesFailAction(error)))
      );
    })
  ));

  
  doupdateCategory$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_UPDATE_CATEGORIES),
    map((action: actions.DoUpdateCategoriesAction) => action.payload),
    switchMap(state => {
      return this.settingService.updateCategory(state).pipe(
        switchMap(user => {
          return [new actions.DoUpdateCategoriesSuccessAction(user)];
        }),
        catchError(error => of(new actions.DoUpdateCategoriesFailAction(error)))
      );
    })
  ));

  
    doSetCommission$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.DO_SET_COMMISSION),
      map((action: actions.DoSetCommission) => action.payload),
      switchMap(state => {
        return this.settingService.commission(state).pipe(
          switchMap(user => {
            return [new actions.DoSetCommissionSuccess(user)];
          }),
          catchError(error => of(new actions.DoSetCommissionFail(error)))
        );
      })
    ));


  
  doGetCommission$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_GET_COMMISSION),
    map((action: actions.DoGetCommission) => action.payload),
    switchMap(state => {
      return this.settingService.getCommission(state).pipe(
        switchMap(user => {
          return [new actions.DoGetCommissionSuccess(user)];
        }),
        catchError(error => of(new actions.DoGetCommissionFail(error)))
      );
    })
  ));
}
