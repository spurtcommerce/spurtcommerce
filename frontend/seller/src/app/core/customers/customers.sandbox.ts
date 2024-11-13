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
// store
import { Store } from '@ngrx/store';
// app state
import * as store from '../app.state.interface';
// action
import * as customerActions from './action/customers.action';
// selectors
import { purchasedCustomerList, purchasedCustomerListFailed, purchasedCustomerListLoaded, purchasedCustomerListLoading,purchaseCount,  ViewProductList, ViewProductListLoading, ViewProductListFailed, ViewProductListLoaded, OrderProductList, OrderProductListLoaded, OrderProductListLoading, OrderProductListFailed, exportCustomerLoading,
  exportCustomerLoaded,
  exportCustomerFailed,
  exportCustomer,
  AllExportCustomerLoading,
  AllExportCustomerLoaded,
  AllExportCustomerFailed,
  AllExportCustomer,
  ViewProductListCount,
  OrderProductListCount, } from './reducer/customers.selectors';

@Injectable()
export class CustomerSandbox {
  public purchasedCustomerList$ = this.appState.select(purchasedCustomerList);
  public purchasedCustomerListLoading$ = this.appState.select(purchasedCustomerListLoading);
  public purchasedCustomerListLoaded$ = this.appState.select(purchasedCustomerListLoaded);
  public purchasedCustomerListFailed$ = this.appState.select(purchasedCustomerListFailed);

  public purchaseCount$ = this.appState.select(purchaseCount);


  public ViewProductList$ = this.appState.select(ViewProductList);
  public ViewProductListLoading$ = this.appState.select(ViewProductListLoading);
  public ViewProductListLoaded$ = this.appState.select(ViewProductListLoaded);
  public ViewProductListFailed$ = this.appState.select(ViewProductListFailed);

  
  public ViewProductListCount$ = this.appState.select(ViewProductListCount);

  public OrderProductList$ = this.appState.select(OrderProductList);
  public OrderProductListLoading$ = this.appState.select(OrderProductListLoading);
  public OrderProductListLoaded$ = this.appState.select(OrderProductListLoaded);
  public OrderProductListFailed$ = this.appState.select(OrderProductListFailed);

  public OrderProductListCount$ = this.appState.select(OrderProductListCount);



  public exportCustomerLoading$ = this.appState.select(exportCustomerLoading);
  public exportCustomerLoaded$ = this.appState.select(exportCustomerLoaded);
  public exportCustomerFailed$ = this.appState.select(exportCustomerFailed);
  public exportCustomer$ = this.appState.select(exportCustomer);

  public AllExportCustomerLoading$ = this.appState.select(AllExportCustomerLoading);
  public AllExportCustomerLoaded$ = this.appState.select(AllExportCustomerLoaded);
  public AllExportCustomerFailed$ = this.appState.select(AllExportCustomerFailed);
  public AllExportCustomer$ = this.appState.select(AllExportCustomer);



  constructor(protected appState: Store<store.AppState>) {
    this.purchasedCustomerList$.subscribe(data =>{
      if(data){

      }
    })
  }
  public purchasedCustomerList(value) {
    this.appState.dispatch(
      new customerActions.purchasedCustomer(value)
    );
  }

  public purchaseCount(params: any) {
    this.appState.dispatch(
      new customerActions.PurchasedCount(params)
    );
  }

  public ViewProductList(params: any) {
    this.appState.dispatch(
      new customerActions.ViewProductList(params)
    );
  }

  public ViewProductListCount(params: any) {
    this.appState.dispatch(
      new customerActions.ViewProductListCount(params)
    );
  }
  public OrderProductList(params: any) {
    this.appState.dispatch(
      new customerActions.OrderProductList(params)
    );
  }

  
  public OrderProductListCount(params: any) {
    this.appState.dispatch(
      new customerActions.OrderProductListCount(params)
    );
  }

  
  public exportCustomer(value) {
    this.appState.dispatch(
      new customerActions.CustomerExportAction(value));
  }

  public allExportCustomer(value) {
    this.appState.dispatch(
      new customerActions.CustomerAllExportAction(value));
  }

}
