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
import * as actions from '../actions/quotation-request.action';
import { catchError } from 'rxjs/operators';
import { QuotationRequestService } from '../quotation-request.service';
import { Store } from '@ngrx/store';
import * as store from '../../../../app.state.interface';
import { saveAs } from 'file-saver';



@Injectable()
export class QuotationRequestEffects {
  constructor(
    private action$: Actions,
    private api: QuotationRequestService,
    protected appState: Store<store.AppState>
  ) {}

  
  quotationList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.QUOTATION_LIST_ACTION),
    map((action: actions.QuotationListAction) => action.payload),
    switchMap(state => {
      return this.api.quotationList(state).pipe(
        switchMap(salesPayments => [
          new actions.QuotationListSuccessAction(salesPayments)
        ]),
        catchError(error => of(new actions.QuotationListFailAction(error)))
      );
    })
  ));

  
  quotationListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.QUOTATION_LIST_COUNT_ACTION),
    map((action: actions.QuotationListCountAction) => action.payload),
    switchMap(state => {
      return this.api.quotationListCount(state).pipe(
        switchMap(salesPayments => [
          new actions.QuotationListCountSuccessAction(salesPayments)
        ]),
        catchError(error => of(new actions.QuotationListCountFailAction(error)))
      );
    })
  ));

}
