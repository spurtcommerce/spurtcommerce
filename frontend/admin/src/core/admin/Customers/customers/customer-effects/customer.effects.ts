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
import * as actions from '../customer-action/customers.action';
import { catchError } from 'rxjs/operators';
import { CustomersApiClientService } from '../customer.ApiClient.service';
import { CustomerFormResponseModel } from '../customer-model/customerform.response.model';
import { AddAddressResponseForm } from '../customer-model/addAddressform.response.model';
import { tap } from 'rxjs/operators';
import { saveAs } from 'file-saver';

@Injectable()
export class Customereffects {
  constructor(
    private action$: Actions,
    private Service: CustomersApiClientService
  ) {}

  // Customer list
  
  docatlists$: Observable<Action> = createEffect(() => this.action$.pipe(
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
  ));
  // customerList Pagination
  
  doPginationcustomers$: Observable<Action> = createEffect(() => this.action$.pipe(
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
  ));
  // Add customer
  
  doADDcustomers$: Observable<Action> = createEffect(() => this.action$.pipe(
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
  ));
  // update Customer
  
  doupdateCustomer$: Observable<Action> = createEffect(() => this.action$.pipe(
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
  ));

  // delete customer
  
  doCustomerDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_DELETE_CUSTOMER_ACTION),
    map((action: actions.DoDeleteCustomerAction) => action.payload),
    switchMap(state => {
      const customerId = state.customerId;

      return this.Service.deleteCustomer(state, customerId).pipe(
        switchMap(user => [new actions.DoDeleteCustomerSuccess(user)]),
        catchError(error => of(new actions.DoDeleteCustomerFail(error)))
      );
    })
  ));

  // Add Address List
  
  doaddaddressList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ADD_ADDRESS_LIST_ACTION),
    map((action: actions.DoAddAddressListAction) => action.payload),
    switchMap(state => {
      const custId = state.customerId;
      return this.Service.addAddressList(state, custId).pipe(
        switchMap(customers => [
          new actions.DoAddAddressListSuccess(customers)
        ]),
        catchError(error => of(new actions.DoAddAddressListFail(error)))
      );
    })
  ));

  // Add Address Pagination
  
  doaddaddressListPagination$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ADD_ADDRESS_PAGINATION_ACTION),
    map((action: actions.DoAddAddressPaginationtAction) => action.payload),
    switchMap(state => {
      const custId = state.customerId;

      return this.Service.addAddressPagination(state, custId).pipe(
        switchMap(address => [
          new actions.DoAddAddressPaginationSuccess(address)
        ]),
        catchError(error => of(new actions.DoAddAddressPaginationFail(error)))
      );
    })
  ));

  // Add Address Add
  
  doAddressAdd$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ADD_ADDRESS_ADD_ACTION),
    map((action: actions.DoAddAddressAddAction) => action.payload),
    switchMap(state => {
      return this.Service.addaddressAdd(state).pipe(
        switchMap(customers => [new actions.DoAddAddressAddSuccess(customers)]),
        catchError(error => of(new actions.DoAddAddressAddFail(error)))
      );
    })
  ));
  // Add Address Update

  
  doaddaddressUpadte$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ADD_ADDRESS_UPDATE_ACTION),
    map((action: actions.DoAddAddressUpdateAction) => action.payload),
    switchMap(state => {
      return this.Service.updateAddAddress(state).pipe(
        switchMap(user => {
          return [
            new actions.DoAddAddressUpdateSuccess(user)
          ];
        }),
        catchError(error =>
          of(
            new actions.DoAddAddressUpdateFail(
              new CustomerFormResponseModel(error)
            )
          )
        )
      );
    })
  ));

  // delete customer Address
  
  doAddAddressDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ADD_ADDRESS_DELETE_ACTION),
    map((action: actions.DoDeleteAddAddressAction) => action.payload),
    switchMap(state => {
      const addressId = state.addressId;
      return this.Service.deleteAddAddress(state, addressId).pipe(
        switchMap(user => [new actions.DoDeleteAddAddressSuccess(user)]),
        catchError(error => of(new actions.DoDeleteAddAddressFail(error)))
      );
    })
  ));

  // Customer  Detail  Effect
  
  doCustomerDeatail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_CUSTOMER_DETAIL_ACTION),
    map((action: actions.DoCustomerDetailAction) => action.payload),
    switchMap(state => {
      const Id = state.id;
      return this.Service.customerDetail(state, Id).pipe(
        switchMap(user => [new actions.DoCustomerDetailSuccess(user)]),
        catchError(error => of(new actions.DoCustomerDetailFail(error)))
      );
    })
  ));

  // Customer Bulk Delete
  
  doCustomerBulkDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_CUSTOMER_BULK_DELETE),
    map((action: actions.DoCustomerBulkDelete) => action.payload),
    switchMap(state => {
      return this.Service.customerBulkDelete(state).pipe(
        switchMap(user => [new actions.DoCustomerBulkDeleteSuccess(user)]),
        catchError(error => of(new actions.DoCustomerBulkDeleteFail(error)))
      );
    })
  ));

  // Customer Bulk Delete
  
  doCustomerExcel$: Observable<Action> = createEffect(() => this.action$.pipe(
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
  ));


    // Customer Bulk Delete
    
    doCustomerAllExcel$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.GET_CUSTOMER_ALL_EXCEL),
      map((action: actions.DoCustomerAllExcel) => action.payload),
      switchMap(state => {
        return this.Service.customerAllExcel(state).pipe(
          tap(data => {
            const filename = 'CustomerAllExcel_' + Date.now() + '.xlsx';
            const blob = new Blob([data], { type: 'text/xlsx' });
            saveAs(blob, filename);
          }),
          switchMap(user => [new actions.DoCustomerAllExcelSuccess(user)]),
          catchError(error => of(new actions.DoCustomerAllExcelFail(error)))
        );
      })
    ));



    
    viewOrderProduct$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.VIEW_ORDER_PRODUCT),
      map((action: actions.ViewOrderProduct) => action.payload),
      switchMap(state => {
        return this.Service.viewOrderProduct(state).pipe(
          switchMap(user => [new actions.ViewOrderProductSuccess(user)]),
          catchError(error => of(new actions.ViewOrderProductFail(error)))
        );
      })
    ));


    
    viewOrderProductCount$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.VIEW_ORDER_PRODUCT_COUNT),
      map((action: actions.ViewOrderProductCount) => action.payload),
      switchMap(state => {
        return this.Service.viewOrderProductCount(state).pipe(
          switchMap(user => [new actions.ViewOrderProductCountSuccess(user)]),
          catchError(error => of(new actions.ViewOrderProductCountFail(error)))
        );
      })
    ));


    
    viewCustomerProduct$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.VIEW_CUSTOMER_PRODUCT),
      map((action: actions.ViewCustomerProduct) => action.payload),
      switchMap(state => {
        return this.Service.viewCustomerProduct(state).pipe(
          switchMap(user => [new actions.ViewCustomerProductSuccess(user)]),
          catchError(error => of(new actions.ViewCustomerProductFail(error)))
        );
      })
    ));


    
    viewCustomerProductCount$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.VIEW_CUSTOMER_PRODUCT_COUNT),
      map((action: actions.ViewCustomerProductCount) => action.payload),
      switchMap(state => {
        return this.Service.viewCustomerProductCount(state).pipe(
          switchMap(user => [new actions.ViewCustomerProductCountSuccess(user)]),
          catchError(error => of(new actions.ViewCustomerProductCountFail(error)))
        );
      })
    ));

}
