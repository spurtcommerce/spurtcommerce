/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as actions from '../customers-group-action/customers-group.action';
import { catchError } from 'rxjs/internal/operators';
import { tap } from 'rxjs/internal/operators/tap';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';

import { CustomersGroupService } from '../customers-group.service';
// import { CustomersGroupListResponseModel } from '../customers-group-model/customers-group list.response.model';

@Injectable()
export class CustomersGroupEffects {
  constructor(
    private action$: Actions,
    public router: Router,
    private Service: CustomersGroupService
  ) {}

  // Customer group list
  @Effect()
  doCustomersGroupList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_CUSTOMERS_GROUP_LIST),
    map((action: actions.DoCustomersGroupListAction) => action.payload),
    switchMap(state => {
      return this.Service.customersGroupList(state).pipe(
        switchMap(customersGroup => [
          new actions.DoCustomersGroupListSuccessAction(customersGroup)
        ]),
        catchError(error =>
          of(new actions.DoCustomersGroupListFailAction(error))
        )
      );
    })
  );

  // Add customer group
  @Effect()
  doAddCustomersGroup$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_ADD_CUSTOMERS_GROUP),
    map((action: actions.DoAddCustomersGroupAction) => action.payload),
    switchMap(state => {
      return this.Service.addCustomersGroup(state).pipe(
             tap(data => {
               if (data) {
            console.log('add', data);
            this.router.navigate(['/customers/groups/list']);
               }
          }),
        switchMap(customersGroup => [
          new actions.DoAddCustomersGroupSuccessAction(customersGroup)

        ]
        ),

        catchError(error =>
          of(new actions.DoAddCustomersGroupFailAction(error))
        )
      );
    })
  );
  // update Customer group
  @Effect()
  doUpdateCustomersGroup$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_UPDATE_CUSTOMERS_GROUP),
    map((action: actions.DoUpdateCustomersGroupAction) => action.payload),
    switchMap(state => {
      console.log(state, 'test32');
      return this.Service.updateCustomersGroup(state).pipe(
        tap(data => {
          if (data) {
       console.log('add', data);
       this.router.navigate(['/customers/groups/list']);
          }
     }),
        switchMap(user => {
          return [new actions.DoUpdateCustomersGroupSuccessAction(user)];
        }),
        catchError(error =>
          of(new actions.DoUpdateCustomersGroupFailAction(error))
        )
      );
    })
  );

  // update Customer group
  @Effect()
  doDeleteCustomersGroup$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_DELETE_CUSTOMERS_GROUP),
    map((action: actions.DoDeleteCustomersGroupAction) => action.payload),
    switchMap(state => {
      console.log(state, 'test32');
      return this.Service.deleteCustomersGroup(state).pipe(
        switchMap(user => {
          return [new actions.DoDeleteCustomersGroupSuccessAction(user)];
        }),
        catchError(error =>
          of(new actions.DoDeleteCustomersGroupFailAction(error))
        )
      );
    })
  );



 // customerList Pagination
 @Effect()
 doPginationcustomers$: Observable<Action> = this.action$.pipe(
   ofType(actions.ActionTypes.DO_PAGINATION_CUSTOMERS_GROUP_LIST),
   map((action: actions.DoCustomersGroupListAction) => action.payload),
   switchMap(state => {
     return this.Service.customersGroupList(state).pipe(
       switchMap(customers => [
         new actions.DoPaginationCustomersGroupSuccessAction(customers)
       ]),
       catchError(error =>
         of(new actions.DoPaginationCustomersGroupFailAction(error))
       )
     );
   })
 );

  }
