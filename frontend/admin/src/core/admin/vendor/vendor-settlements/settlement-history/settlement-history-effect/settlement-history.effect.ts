/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
// effects
import { createEffect, Actions, ofType } from '@ngrx/effects';
// store
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
// actions
import * as actions from '../settlement-history-action/settlement-history.action';
import { catchError } from 'rxjs/operators';
// service
import { SettlementHistoryService } from '../settlement-history.service';
import { saveAs } from 'file-saver';

@Injectable()
export class SettlementHistoryEffect {
  constructor(
    private action$: Actions,
    private service: SettlementHistoryService
  ) {}


  // settlement hostory list
  
  historyList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.SETTLEMENT_HISTORY_LIST),
    map((action: actions.SettlementHistoryListAction) => action.payload),
    switchMap(state => {
      return this.service.historyList(state).pipe(
        switchMap(product => [
          new actions.SettlementHistoryListSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.SettlementHistoryListFailAction(error))
        )
      );
    })
  ));

    // settlement hostory list count
    
    historyListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.SETTLEMENT_HISTORY_LIST_COUNT),
      map((action: actions.SettlementHistoryListCountAction) => action.payload),
      switchMap(state => {
        return this.service.historyListCount(state).pipe(
          switchMap(product => [
            new actions.SettlementHistoryListCountSuccessAction(product)
          ]),
          catchError(error =>
            of(new actions.SettlementHistoryListCountFailAction(error))
          )
        );
      })
    ));

        // settlement details list count
    
    settlementDetails$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.SETTLEMENT_DETAILS),
      map((action: actions.SettlementDetailsAction) => action.payload),
      switchMap(state => {
        return this.service.settlementDetails(state).pipe(
          switchMap(product => [
            new actions.SettlementDetailsSuccessAction(product)
          ]),
          catchError(error =>
            of(new actions.SettlementDetailsFailAction(error))
          )
        );
      })
    ));

    
    exportPayment$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.EXPORT_PAYMENT),
      map((action: actions.ExportPaymentAction) => action.payload),
      switchMap(state => {
        return this.service.exportPayment(state).pipe(
          tap(data => {
            const filename = 'SettlementHistoryExcel_' + Date.now() + '.xlsx';
            const blob = new Blob([data], { type: 'text/xlsx' });
            saveAs(blob, filename);
          }),
          switchMap(response => [new actions.ExportPaymentSuccess(response)]),
          catchError(error => of(new actions.ExportPaymentFail(error)))
        );
      })
    ));

    
    exportAllPayment$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.EXPORT_ALL_PAYMENT),
      map((action: actions.ExportAllPaymentAction) => action.payload),
      switchMap(state => {
        return this.service.exportAllPayment(state).pipe(
          tap(data => {
            const filename = 'SettlementHistoryExcel_' + Date.now() + '.xlsx';
            const blob = new Blob([data], { type: 'text/xlsx' });
            saveAs(blob, filename);
          }),
          switchMap(response => [new actions.ExportAllPaymentSuccess(response)]),
          catchError(error => of(new actions.ExportAllPaymentFail(error)))
        );
      })
    ));

  }
