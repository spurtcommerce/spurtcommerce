/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import * as actions from '../sizechart-action/sizechart.action';
import { SizeChartService } from '../sizechart.service';
import { Router } from '@angular/router';

@Injectable()
export class SizeChartEffect {
  constructor(private action$: Actions, private sizechart: SizeChartService, public router: Router) {}

    // LIST-SIZE_CHARTLIST
    @Effect()
    doSizeChartList$: Observable<Action> = this.action$.pipe(
      ofType(actions.ActionTypes.GET_SIZE_CHART_LIST),
      map((action: actions.DoSizeChartListAction) => action.payload),
      switchMap(state => {
        return this.sizechart.sizechartlist(state).pipe(
          map(analysis => new actions.DoSizeChartListSuccessAction(analysis)),
          catchError(error => of(new actions.DoSizeChartListFailAction(error)))
        );
      })
    );
    // SIZE_CHART LIST PAGINATION
    @Effect()
    dosizechartpagination$: Observable<Action> = this.action$.pipe(
      ofType(actions.ActionTypes.DO_SIZE_CHART_COUNT_ACTION),
      map((action: actions.DoSizeChartPaginationAction) => action.payload),
      switchMap(state => {
        return this.sizechart.sizechartpagiantion(state).pipe(
          switchMap(user => [new actions.DoSizeChartPaginationSuccessAction(user)]),
          catchError(error => of(new actions.DoSizeChartPaginationFailAction(error)))
        );
      })
    );
  // varientList
  @Effect()
  varientList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_VARIENT_LIST),
    map((action: actions.DoVarientListAction) => action.payload),
    switchMap(state => {
      return this.sizechart.varientList(state).pipe(
        map(analysis => new actions.DoVarientListSuccessAction(analysis)),
        catchError(error => of(new actions.DoVarientListFailAction(error)))
      );
    })
  );
  // NEW SOCIAL EFFECT
  @Effect()
  doAddsizechart$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_NEW_SIZE_CHART),
    map((action: actions.DoNewSizeChartAction) => action.payload),
    switchMap(state => {
      return this.sizechart.createsizechart(state).pipe(
        tap(res => {
          if (res) {
            this.router.navigate(['/settings/sitesettings/size-chart-template/list']);
          }
        }),
        switchMap(user => [new actions.DoNewSizeChartSuccessAction(user)]),
        catchError(error => of(new actions.DoNewSizeChartFailAction(error)))
      );
    })
  );

  // GET SOCIAL EFFECT
  @Effect()
  doGetSizeChart$: Observable<Action> = this.action$
    .pipe(
      ofType(actions.ActionTypes.DO_GET_SIZE_CHART),
      map((action: actions.DoGetSizeChartAction) => action.payload),
      switchMap((state) => {
          return this.sizechart.getSizeChart(state)
            .pipe(
              map((user) =>
                new actions.DoGetSizeChartSuccessAction(user),
              ),
              tap((res) => {
               }),
              catchError(error => of(new actions.DoGetSizeChartFailAction(error.error)))
            );
        }
      )
    );
  // SizeChartDelete
  @Effect()
  sizechartDelate$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DELETE_SIZE_CHART),
    map((action: actions.DeleteSizeChart) => action.payload),
    switchMap(state => {
      return this.sizechart.DeleteSizeChart(state).pipe(
        switchMap(user => [new actions.DeleteSizeChartSuccess(user)]),
        catchError(error => of(new actions.DeleteSizeChartFail(error)))
      );
    })
  );
  // headerTextList
  @Effect()
  headerTextList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.HEADER_TEXT_LIST),
    map((action: actions.HeaderTextListAction) => action.payload),
    switchMap(state => {
      return this.sizechart.headerTextList(state).pipe(
        map(analysis => new actions.HeaderTextListSuccessAction(analysis)),
        catchError(error => of(new actions.HeaderTextListFailAction(error)))
      );
    })
  );
  // CreateHeaderText
  @Effect()
  CreateHeaderText$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.CREATE_HEADER_TEXT),
    map((action: actions.CreateHeaderTestAction) => action.payload),
    switchMap(state => {
      return this.sizechart.CreateHeaderText(state).pipe(
        tap(res => {
          if (res) {
          }
        }),
        switchMap(user => [new actions.CreateHeaderTextSuccessAction(user)]),
        catchError(error => of(new actions.CreateHeaderTextFailAction(error)))
      );
    })
  );
  // headerTextDelete
  @Effect()
  headerTextDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DELETE_HEADER_TEXT),
    map((action: actions.DeleteHeaderText) => action.payload),
    switchMap(state => {
      return this.sizechart.DeleteHeaderText(state).pipe(
        switchMap(user => [new actions.DeleteHeaderTextSuccess(user)]),
        catchError(error => of(new actions.DeleteHeaderTextFail(error)))
      );
    })
  );
  // UpdateHeaderTest
  @Effect()
  UpdateHeaderTest$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.UPDATE_HEADER_TEXT),
    map((action: actions.UpdateHeaderTest) => action.payload),
    switchMap(state => {
      return this.sizechart.UpdateHeaderTest(state).pipe(
        switchMap(user => [new actions.UpdateHeaderTestSuccessAction(user)]),
        catchError(error => of(new actions.UpdateHeaderTestFailAction(error)))
      );
    })
  );
  // UpdateSizeChart
  @Effect()
  UpdateSizeChart$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.UPDATE_SIZE_CHART),
    map((action: actions.UpdateSizeChart) => action.payload),
    switchMap(state => {
      return this.sizechart.UpdateSizeChart(state).pipe(
        tap(res => {
          if (res) {
            this.router.navigate(['/settings/sitesettings/size-chart-template/list']);
          }
        }),
        switchMap(user => [new actions.UpdateSizeChartSuccessAction(user)]),
        catchError(error => of(new actions.UpdateSizeChartFailAction(error)))
      );
    })
  );
}


