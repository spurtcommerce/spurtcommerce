/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from '../../../app.state.interface';
import { Router } from '@angular/router';
import * as customerAction from './customer-action/customers.action';
import {
  getDetailLoaded,
  getDetailLoading,
  customerList,
  customerListCount,
  addCustomer,
  deleteCustomer,
  updateCustomer,
  addAddressAdd,
  addAddressList,
  addressListCount,
  addAddressUpdate,
  deleteAddAddress,
  detailCustomer,
  viewCustomerProduct,
  viewCustomerProductLoading,
  viewCustomerProductLoaded,
  viewCustomerProductCount,
  viewCustomerProductCountLoading,
  viewCustomerProductCountLoaded,
  viewOrderProduct,
  viewOrderProductLoading,
  viewOrderProductLoaded,
  viewOrderProductCount,
  viewOrderProductCountLoading,
  viewOrderProductCountLoaded,listLoading,exportExcelLoading
} from './customer-reducer/customer.selector';
import { Subscription } from 'rxjs/index';
// import { ToastrManager } from 'ng6-toastr-notifications';
import { CustomerForm } from './customer-model/customerform.model';
import { CustomerListForm } from './customer-model/customerlistform.model';
import { AddAddressListForm } from './customer-model/addAddresslistform.model';
import { AddAddressForm } from './customer-model/addAddressform.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CustomerSandbox {


  private subscriptions: Array<Subscription> = [];

  /*customer*/
  public exportExcelLoading = this.appState.select(exportExcelLoading);
  public listLoading$ = this.appState.select(listLoading)
  
  public customerList$ = this.appState.select(customerList);
  public customerListLoading$ = this.appState.select(getDetailLoading);
  public customerListLoaded$ = this.appState.select(getDetailLoaded);
  public addCustomer$ = this.appState.select(addCustomer);
  public updateCustomer$ = this.appState.select(updateCustomer);
  public deleteCustomer$ = this.appState.select(deleteCustomer);
  public customerListCount$ = this.appState.select(customerListCount);

  /* address*/

  public addAddressList$ = this.appState.select(addAddressList);
  public addAddressAdd$ = this.appState.select(addAddressAdd);
  public addAddressUpdate$ = this.appState.select(addAddressUpdate);
  public deleteAddAddress$ = this.appState.select(deleteAddAddress);

  public addressListCount$ = this.appState.select(
    addressListCount
  );

  public getDetailCustomer$ = this.appState.select(detailCustomer);
  public getDetailLoading$ = this.appState.select(getDetailLoading);
  public getDetailLoaded$ = this.appState.select(getDetailLoaded);

  public viewCustomerProductLoaded$ = this.appState.select(viewCustomerProductLoaded);
  public viewCustomerProductLoading$ = this.appState.select(viewCustomerProductLoading);
  public viewCustomerProduct$ = this.appState.select(viewCustomerProduct);

  public viewCustomerProductCountLoaded$ = this.appState.select(viewCustomerProductCountLoaded);
  public viewCustomerProductCountLoading$ = this.appState.select(viewCustomerProductCountLoading);
  public viewCustomerProductCount$ = this.appState.select(viewCustomerProductCount);

  public viewOrderProductLoaded$ = this.appState.select(viewOrderProductLoaded);
  public viewOrderProductLoading$ = this.appState.select(viewOrderProductLoading);
  public viewOrderProduct$ = this.appState.select(viewOrderProduct);

  public viewOrderProductCountLoaded$ = this.appState.select(viewOrderProductCountLoaded);
  public viewOrderProductCountLoading$ = this.appState.select(viewOrderProductCountLoading);
  public viewOrderProductCount$ = this.appState.select(viewOrderProductCount);


  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  public customerList(value) {
    this.appState.dispatch(
      new customerAction.DoCustomersListAction(new CustomerListForm(value))
    );
  }

  public paginationCustomer(value) {
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

  // Add Address
  public addAddressList(value) {
    this.appState.dispatch(
      new customerAction.DoAddAddressListAction(new AddAddressListForm(value))
    );
  }

  public addAddresspagination(value) {
    this.appState.dispatch(
      new customerAction.DoAddAddressPaginationtAction(
        new AddAddressListForm(value)
      )
    );
  }

  // Add Address Add
  public addAddressAdd(value) {
    this.appState.dispatch(
      new customerAction.DoAddAddressAddAction(value)
    );
  }

  public updateAddressAdd(value) {
    this.appState.dispatch(
      new customerAction.DoAddAddressUpdateAction(value)
    );
  }

  public deleteAddressAdd(value) {
    this.appState.dispatch(new customerAction.DoDeleteAddAddressAction(value));
  }

  public viewCustomerDetail(value) {
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


  // Do Customer All Excel
  public customerAllExcel(value) {
    this.appState.dispatch(new customerAction.DoCustomerAllExcel(value));
  }

  public viewCustomerProduct(value) {
    this.appState.dispatch(new customerAction.ViewCustomerProduct(value));
  }
  public viewCustomerProductCount(value) {
    this.appState.dispatch(new customerAction.ViewCustomerProductCount(value));
  }
  public viewOrderProduct(value) {
    this.appState.dispatch(new customerAction.ViewOrderProduct(value));
  }
  public viewOrderProductCount(value) {
    this.appState.dispatch(new customerAction.ViewOrderProductCount(value));
  }

}
