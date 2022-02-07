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
import * as actions from '../customer-action/customers.action';
import { catchError } from 'rxjs/internal/operators';
import { CustomersApiClientService } from '../customer.ApiClient.service';
import { CustomerFormResponseModel } from '../customer-model/customerform.response.model';
import { tap } from 'rxjs/internal/operators/tap';
import { saveAs } from 'file-saver';

@Injectable()
export class Customereffects {
  constructor(
    private action$: Actions,
    private Service: CustomersApiClientService
  ) {}

  // Customer list
  @Effect()
  docatlists$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_Customers_List),
    map((action: actions.DoCustomersListAction) => action.payload),
    switchMap(state => {
      return this.Service.customersList(state).pipe(
        switchMap(customers => [
          new actions.DoCustomerslistSuccessAction(customers)
        ]),
        catchError(error => of(new actions.DoCustomerslistFailAction(error)))
      );
    })
  );
  // customerList Pagination
  @Effect()
  doPginationcustomers$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_PAGINATION_CUSTOMER_List),
    map((action: actions.DoCustomersListAction) => action.payload),
    switchMap(state => {
      return this.Service.customersList(state).pipe(
        switchMap(customers => [
          new actions.DoPaginationCustomersSuccessAction(customers)
        ]),
        catchError(error =>
          of(new actions.DoPaginationCustomersFailAction(error))
        )
      );
    })
  );
  // Add customer
  @Effect()
  doADDcustomers$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_ADD_Customers_Action),
    map((action: actions.DoAddCustomersListAction) => action.payload),
    switchMap(state => {
      return this.Service.addcustomer(state).pipe(
        switchMap(customers => [
          new actions.DoAddCustomersListActionSuccess(customers)
        ]),
        catchError(error => of(new actions.DoAddCustomersListFailAction(error)))
      );
    })
  );
  // update Customer
  @Effect()
  doupdateCustomer$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_UPDATE_CUSTOMER_ACTION),
    map((action: actions.DoUpdateCustomerAction) => action.payload),
    switchMap(state => {
      return this.Service.updatecustomer(state).pipe(
        switchMap(user => {
          return [new actions.DoUpdateCustomerSuccess(user)];
        }),
        catchError(error => of(new actions.DoUpdateCustomerFail(error)))
      );
    })
  );

  // delete customer
  @Effect()
  doCustomerDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_DELETE_CUSTOMER_ACTION),
    map((action: actions.DoDeleteCustomerAction) => action.payload),
    switchMap(state => {
      const customerId = state.customerId;

      return this.Service.deleteCustomer(state, customerId).pipe(
        switchMap(user => [new actions.DoDeleteCustomerSuccess(user)]),
        catchError(error => of(new actions.DoDeleteCustomerFail(error)))
      );
    })
  );

  // Customer  Detail  Effect
  @Effect()
  doCustomerDeatail$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_CUSTOMER_DETAIL_ACTION),
    map((action: actions.DoCustomerDetailAction) => action.payload),
    switchMap(state => {
      const Id = state.id;
      return this.Service.customerDetail(state, Id).pipe(
        switchMap(user => [new actions.DoCustomerDetailSuccess(user)]),
        catchError(error => of(new actions.DoCustomerDetailFail(error)))
      );
    })
  );

  // Customer Bulk Delete
  @Effect()
  doCustomerBulkDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_CUSTOMER_BULK_DELETE),
    map((action: actions.DoCustomerBulkDelete) => action.payload),
    switchMap(state => {
      return this.Service.customerBulkDelete(state).pipe(
        switchMap(user => [new actions.DoCustomerBulkDeleteSuccess(user)]),
        catchError(error => of(new actions.DoCustomerBulkDeleteFail(error)))
      );
    })
  );

  // Customer Bulk Delete
  @Effect()
  doCustomerExcel$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_CUSTOMER_EXCEL),
    map((action: actions.DoCustomerExcel) => action.payload),
    switchMap(state => {
      return this.Service.customerExcel(state).pipe(
        tap(data => {
          const filename = 'CustomerExcel_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(user => [new actions.DoCustomerExcelSuccess(user)]),
        catchError(error => of(new actions.DoCustomerExcelFail(error)))
      );
    })
  );

    // Customer list
    @Effect()
    CustomerGrouplists$: Observable<Action> = this.action$.pipe(
      ofType(actions.ActionTypes.DO_Customers_Group_List),
      map((action: actions.DoCustomersGroupListAction) => action.payload),
      switchMap(state => {
        return this.Service.customersGroupList(state).pipe(
          switchMap(customers => [
            new actions.DoCustomersGroupListSuccessAction(customers)
          ]),
          catchError(error => of(new actions.DoCustomersGroupListFailAction(error)))
        );
      })
    );
}
