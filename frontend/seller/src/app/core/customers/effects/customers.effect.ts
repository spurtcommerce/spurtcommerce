/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
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
import * as actions from '../action/customers.action';
import { catchError } from 'rxjs/operators';
// service
import { CustomerService } from '../customers.service';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';


@Injectable()
export class CustomerEffects {
  constructor(private action$: Actions, private apiCli: CustomerService, public toaster: ToastrService,) {}

  // MEDIA UPLOAD
  
  purchasedCustomerList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.PURCHASED_CUSTOMER_LIST),
    map((action: actions.purchasedCustomer) => action.payload),
    switchMap(state => {
      return this.apiCli.purchasedCustomerList(state).pipe(
        switchMap(user => [new actions.purchasedCustomerSuccessAction(user)]),
        catchError(error => of(new actions.purchasedCustomerFailAction(error)))
      );
    })
  ));

  
  purchaseCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.PURCHASED_CUSTOMER_LIST_COUNT),
    map((action: actions.PurchasedCount) => action.payload),
    switchMap(state => {
      return this.apiCli.purchaseCount(state).pipe(

        tap((data:any) => {



        }),
        switchMap(response => [
          new actions.PurchasedCountSuccess(response)
        ]),
        catchError(error =>
          of(new actions.PurchasedCountFail(error))
        )
      );
    })
  ));


   // export product list

   
   exportCustomer$: Observable<Action> = createEffect(() => this.action$.pipe(
     ofType(actions.ActionTypes.EXPORT_CUSTOMER),
     map((action: actions.CustomerExportAction) => action.payload),
     switchMap(state => {
       return this.apiCli.exportCustomer(state).pipe(
         tap((data:any) => {
           const filename = 'product_list_' + Date.now() + '.xlsx';
           const blob = new Blob([data], { type: 'text/xlsx' });
           saveAs(blob, filename);
         }),

         switchMap(response => [
          new actions.PurchasedCountSuccess(response)
        ]),
        catchError(error =>
          of(new actions.PurchasedCountFail(error))
        )
       );
     })
   ));
 
   // export All product list
 
   
   exportAllCustomer$: Observable<Action> = createEffect(() => this.action$.pipe(
     ofType(actions.ActionTypes.ALL_EXPORT_CUSTOMER),
     map((action: actions.CustomerAllExportAction) => action.payload),
     switchMap(state => {
       return this.apiCli.customerAllExcel(state).pipe(
         tap((data:any) => {
           const filename = 'product_list_' + Date.now() + '.xlsx';
           const blob = new Blob([data], { type: 'text/xlsx' });
           saveAs(blob, filename);
         }),
         switchMap(list => [new actions.CustomerAllExportSuccessAction(list)]),
         catchError(error => of(new actions.CustomerAllExportFailAction(error)))
       );
     })
   ));
 

  //VIEW PRODUCT //

  
  ViewProductList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VIEW_PRODUCT_LIST),
    map((action: actions.ViewProductList ) => action.payload),
    switchMap(state => {
      return this.apiCli.ViewProductList(state).pipe(
        switchMap(response => [
          new actions.ViewProductListSuccess(response)
        ]),
        catchError(error =>
          of(new actions.ViewProductListFail(error))
        )
      );
    })
  ));

  //VIEW PRODUCT COUNT
  
  ViewProductListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VIEW_PRODUCT_LIST_COUNT),
    map((action: actions.ViewProductListCount) => action.payload),
    switchMap(state => {
      
      return this.apiCli.ViewProductListCount(state).pipe(
        tap((data:any) => {



        }),
        switchMap(response => [
          new actions.ViewProductListCountSuccess(response)
        ]),
        catchError(error =>
          of(new actions.ViewProductListCountFail(error))
        )
      );
    })
  ));


  //ORDER PRODUCT//

  
  OrderProductList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.ORDER_PRODUCT_LIST),
    map((action: actions.OrderProductList) => action.payload),
    switchMap(state => {
      return this.apiCli.OrderProductList(state).pipe(
        switchMap(response => [
          new actions.OrderProductListSuccess(response)
        ]),
        catchError(error =>
          of(new actions.OrderProductListFail(error))
        )
      );
    })
  ));


  //ORDER PRODUCT COUNT //
  
  OrderProductListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.ORDER_PRODUCT_LIST_COUNT),
    map((action: actions.OrderProductListCount) => action.payload),
    switchMap(state => {
      return this.apiCli.OrderProductListCount(state).pipe(
        switchMap(response => [
          new actions.OrderProductListCountSuccess(response)
        ]),
        tap((res)=>{

        }),
        catchError(error =>
          of(new actions.OrderProductListCountFail(error))
        )
      );
    })
  ));
 

}
