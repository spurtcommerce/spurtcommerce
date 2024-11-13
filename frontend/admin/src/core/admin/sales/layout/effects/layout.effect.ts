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
import { map, switchMap } from 'rxjs/operators';
import * as actions from '../action/layout.action';
import { catchError } from 'rxjs/operators';
import { LayoutService } from '../layout.service';

@Injectable()
export class LayoutEffects {
  constructor(private action$: Actions, private layoutService: LayoutService) {}



  
  salesCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_SALES_COUNT),
    map((action: actions.GetSalesCountAction) => action.payload),
    switchMap(state => {
      return this.layoutService.getSalesCount().pipe(
        switchMap(response => [
          new actions.GetSalesCountSuccessAction(response)
        ]),
        catchError(error => of(new actions.GetSalesCountFailAction(error)))
      );
    })
  ));

}
