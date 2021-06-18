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
import { Store } from '@ngrx/store';
import * as store from '../../../app.state.interface';
import { Router } from '@angular/router';
import * as customerAction from './customer-action/customers.action';
import {
  getaddFailed,
  getaddLoaded,
  getaddLoading,
  getcountFailed,
  getcountLoaded,
  getcountLoading,
  getcustomerslist,
  getdeletecustomer,
  getdeleteFailed,
  getdeleteLoaded,
  getdeleteLoading,
  getDetailCustomer,
  getDetailFailed,
  getDetailLoaded,
  getDetailLoading,
  getlistFailed,
  getlistLoaded,
  getlistLoading,
  getnewcustomer,
  getpagination,
  getupdatecustomers,
  getupdateFailed,
  getupdateLoaded,
  getupdateLoading,
  getCustomersGroupList,

} from './customer-reducer/customer.selector';
import { Subscription } from 'rxjs/index';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CustomerForm } from './customer-model/customerform.model';
import { CustomerListForm } from './customer-model/customerlistform.model';
import * as productActions from '../../catalog/product/product-action/product.action';

@Injectable()
export class CustomerSandbox {
  private subscriptions: Array<Subscription> = [];

  /*customer*/
  public getCustomerlist$ = this.appState.select(getcustomerslist);
  public getlistLoading$ = this.appState.select(getlistLoading);
  public getlistLoaded$ = this.appState.select(getlistLoaded);
  public getlistFailed$ = this.appState.select(getlistFailed);

  public getaddcustomer$ = this.appState.select(getnewcustomer);
  public getaddLoading$ = this.appState.select(getaddLoading);
  public getaddLoaded$ = this.appState.select(getaddLoaded);
  public getaddFailed$ = this.appState.select(getaddFailed);

  public getupdatecustomer$ = this.appState.select(getupdatecustomers);
  public getupdateLoading$ = this.appState.select(getupdateLoading);
  public getupdateLoaded$ = this.appState.select(getupdateLoaded);
  public getupdateFailed$ = this.appState.select(getupdateFailed);

  public getdeletecustomer$ = this.appState.select(getdeletecustomer);
  public getdeleteLoading$ = this.appState.select(getdeleteLoading);
  public getdeleteLoaded$ = this.appState.select(getdeleteLoaded);
  public getdeleteFailed$ = this.appState.select(getdeleteFailed);

  public getpagination$ = this.appState.select(getpagination);
  public getcountLoading$ = this.appState.select(getcountLoading);
  public getcountLoaded$ = this.appState.select(getcountLoaded);
  public getcountFailed$ = this.appState.select(getcountFailed);

  /* address*/
  public getDetailCustomer$ = this.appState.select(getDetailCustomer);
  public getDetailLoading$ = this.appState.select(getDetailLoading);
  public getDetailLoaded$ = this.appState.select(getDetailLoaded);
  public getDetailFailed$ = this.appState.select(getDetailFailed);
  public getCustomersGroupList$ = this.appState.select(getCustomersGroupList);

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrManager
  ) {
    this.subscripe();
  }

  public customerList(value) {
    this.appState.dispatch(
      new customerAction.DoCustomersListAction(new CustomerListForm(value))
    );
  }

  public PaginationCustomer(value) {
    this.appState.dispatch(
      new customerAction.DoPaginationCustomersListAction(
        new CustomerListForm(value)
      )
    );
  }

  public addCustomers(value) {
    this.appState.dispatch(
      new customerAction.DoAddCustomersListAction(new CustomerForm(value))
    );
  }

  public updateCustomers(value) {
    this.appState.dispatch(
      new customerAction.DoUpdateCustomerAction(new CustomerForm(value))
    );
  }

  public deleteCustomers(value) {
    this.appState.dispatch(new customerAction.DoDeleteCustomerAction(value));
  }

  public ViewCustomerDetail(value) {
    this.appState.dispatch(new customerAction.DoCustomerDetailAction(value));
  }

  // Do Customer Bulk Delete
  public bulkDelete(value) {
    this.appState.dispatch(new customerAction.DoCustomerBulkDelete(value));
  }

  // Do Customer Excel
  public customerExcel(value) {
    this.appState.dispatch(new customerAction.DoCustomerExcel(value));
  }

   // Group list
   public customersGroupList(value) {
    this.appState.dispatch(new customerAction.DoCustomersGroupListAction(value));
  }

  subscripe() {
    this.subscriptions.push(
      this.getaddcustomer$.subscribe(data => {
        if (data && data.status === 1) {
          this.router.navigate(['/customers/customer']);
        }
      })
    );
    this.subscriptions.push(
      this.getupdatecustomer$.subscribe(data => {
        if (data && data.status === 1) {
          this.router.navigate(['/customers/customer']);
        }
      })
    );
  }
}
