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
import { map, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../settlement-order-action/settlement-order.action';
import { catchError } from 'rxjs/operators';
// service
import { SettlementOrderService } from '../settlement-order.service';

@Injectable()
export class SettlementOrderEffect {
  constructor(
    private action$: Actions,
    private service: SettlementOrderService
  ) {}

   // settlement order list
   
   orderList$: Observable<Action> = createEffect(() => this.action$.pipe(
     ofType(actions.ActionTypes.SETTLEMENT_ORDER_LIST),
     map((action: actions.SettlementOrderListAction) => action.payload),
     switchMap(state => {
       return this.service.orderList(state).pipe(
         switchMap(product => [
           new actions.SettlementOrderListSuccessAction(product)
         ]),
         catchError(error =>
           of(new actions.SettlementOrderListFailAction(error))
         )
       );
     })
   ));

     // settlement order list count
     
     orderListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
       ofType(actions.ActionTypes.SETTLEMENT_ORDER_LIST_COUNT),
       map((action: actions.SettlementOrderListCountAction) => action.payload),
       switchMap(state => {
         return this.service.orderListCount(state).pipe(
           switchMap(product => [
             new actions.SettlementOrderListCountSuccessAction(product)
           ]),
           catchError(error =>
             of(new actions.SettlementOrderListCountFailAction(error))
           )
         );
       })
     ));

          // settlement order list count
          
          makeSettlement$: Observable<Action> = createEffect(() => this.action$.pipe(
            ofType(actions.ActionTypes.MAKE_SETTLEMENT),
            map((action: actions.MakeSettlementAction) => action.payload),
            switchMap(state => {
              return this.service.makeSettlement(state).pipe(
                switchMap(product => [
                  new actions.MakeSettlementSuccessAction(product)
                ]),
                catchError(error =>
                  of(new actions.MakeSettlementFailAction(error))
                )
              );
            })
          ));

          
          vendorList$: Observable<Action> = createEffect(() => this.action$.pipe(
            ofType(actions.ActionTypes.GET_VENDOR_LIST),
            map((action: actions.GetVendorListAction) => action.payload),
            switchMap(state => {
              return this.service.vendorList(state).pipe(
                switchMap(product => [
                  new actions.GetVendorListSuccessAction(product)
                ]),
                catchError(error =>
                  of(new actions.GetVendorListFailAction(error))
                )
              );
            })
          ));
                         // order status list
          
          orderStatusList$: Observable<Action> = createEffect(() => this.action$.pipe(
            ofType(actions.ActionTypes.ORDER_STATUS_LIST),
            map((action: actions.OrderStatusListAction) => action.payload),
            switchMap(state => {
              return this.service.orderStatusList(state).pipe(
                switchMap(product => [
                  new actions.OrderStatusListSuccessAction(product)
                ]),
                catchError(error =>
                  of(new actions.OrderStatusListFailAction(error))
                )
              );
            })
          ));
}
