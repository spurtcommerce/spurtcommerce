/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { OrderfullfillmentService } from '../order-fullfilment.service';
import * as actions from '../action/order-fullfilment.action';
@Injectable()
export class OrderfullfillmentEffect {
  constructor(private action$: Actions, private service: OrderfullfillmentService) {}

     /*Order fullFillment List*/

  @Effect()
  Orderfullfillmentlist$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.ORDER_FULLFILLMENT_LIST),
    map((action: actions.OrderfullfillmentListAction) => action.payload),
    switchMap(state => {
      return this.service.Orderfullfillmentlist(state).pipe(
        switchMap(user => [new actions.OrderfullfillmentListSuccessAction(user)]),
        catchError(error => of(new actions.OrderfullfillmentListFailAction(error)))
      );
    })
  );

  @Effect()
  addOrderfullfillment$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.ADD_ORDER_FULLFILLMENT),
    map((action: actions.addOrderfullfillmentAction) => action.payload),
    switchMap(state => {
      return this.service.addOrderfullfillment(state).pipe(
        switchMap(user => [new actions.addOrderfullfillmentSuccessAction(user)]),
        catchError(error => of(new actions.addOrderfullfillmentFailAction(error)))
      );
    })
  );

     /*Order fullFillment Status*/

     @Effect()
     orderfullfillmentstatus$: Observable<Action> = this.action$.pipe(
       ofType(actions.ActionTypes.ORDER_FULLFILLMENT_STATUS),
       map((action: actions.orderfullfillmentstatusAction) => action.payload),
       switchMap(state => {
         return this.service.orderfullfillmentstatus(state).pipe(
           switchMap(user => [new actions.orderfullfillmentstatusSuccessAction(user)]),
           catchError(error => of(new actions.orderfullfillmentstatusFailAction(error)))
         );
       })
     );

          /*Update Order fullFillment Status*/

    @Effect()
    updateOrderfullfillment$: Observable<Action> = this.action$.pipe(
      ofType(actions.ActionTypes.UPDATE_ORDER_FULLFILLMENT_STATUS),
      map((action: actions.updateOrderfullfillmentAction) => action.payload),
      switchMap(state => {
        return this.service.updateOrderfullfillment(state).pipe(
          switchMap(user => [new actions.updateOrderfullfillmentSuccessAction(user)]),
          catchError(error => of(new actions.updateOrderfullfillmentFailAction(error)))
        );
      })
    );

}
