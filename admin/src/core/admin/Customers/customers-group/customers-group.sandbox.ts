/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from '../../../app.state.interface';
import { Router } from '@angular/router';
import * as customersGroupAction from './customers-group-action/customers-group.action';
import { Subscription } from 'rxjs/index';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CustomersGroupList } from './customers-group-model/customers-group list.model';
import { CustomersGroupAdd } from './customers-group-model/customers-group add.model';
import { CustomersGroupUpdate } from './customers-group-model/customers-group update.model';
import { CustomersGroupDelete } from './customers-group-model/customers-group delete.model';

import {
  getCustomersGroupList,
  getCustomersGroupListLoading,
  getCustomerGroupListLoaded,
  getCustomersGroupListFailed,
  getNewCustomersGroup,
  getAddCustomersGroupLoaded,
  getAddCustomersGroupLoading,
  getAddCustomersGroupFailed,
  getUpdateCustomersGroup,
  getUpdateCustomersGroupLoading,
  getUpdateCustomersGroupLoaded,
  getUpdateCustomersGroupFailed,
  getDeleteCustomersGroup,
  getDeleteCustomersGroupLoading,
  getDeleteCustomersGroupLoaded,
  getDeleteCustomersGroupFailed,
  getpagination,
  getcountFailed,
  getcountLoaded,
  getcountLoading,
} from './customers-group-reducer/customers-group.selector';

@Injectable()
export class CustomersGroupSandbox {
  private subscriptions: Array<Subscription> = [];

  /*customer*/
  public getCustomersGroupList$ = this.appState.select(getCustomersGroupList);
  public getCustomersGroupListLoading$ = this.appState.select(
    getCustomersGroupListLoading
  );
  public getCustomersGroupListLoaded$ = this.appState.select(
    getCustomerGroupListLoaded
  );
  public getCustomersGroupListFailed$ = this.appState.select(
    getCustomersGroupListFailed
  );







  public getNewCustomersGroup$ = this.appState.select(getNewCustomersGroup);
  public getAddCustomersGroupLoading$ = this.appState.select(
    getAddCustomersGroupLoading
  );
  public getAddCustomersGroupLoaded$ = this.appState.select(
    getAddCustomersGroupLoaded
  );
  public getAddCustomersGroupFailed$ = this.appState.select(
    getAddCustomersGroupFailed
  );

  public getUpdateCustomersGroup$ = this.appState.select(
    getUpdateCustomersGroup
  );
  public getUpdateCustomersGroupLoading$ = this.appState.select(
    getUpdateCustomersGroupLoading
  );
  public getUpdateCustomersGroupLoaded$ = this.appState.select(
    getUpdateCustomersGroupLoaded
  );
  public getUpdateCustomersGroupFailed$ = this.appState.select(
    getUpdateCustomersGroupFailed
  );

  public getDeleteCustomersGroup$ = this.appState.select(
    getDeleteCustomersGroup
  );
  public getDeleteCustomersGroupLoading$ = this.appState.select(
    getDeleteCustomersGroupLoading
  );
  public getDeleteCustomersGroupLoaded$ = this.appState.select(
    getDeleteCustomersGroupLoaded
  );
  public getDeleteCustomersGroupFailed$ = this.appState.select(
    getDeleteCustomersGroupFailed
  );


  public getpagination$ = this.appState.select(getpagination);
  public getcountLoading$ = this.appState.select(getcountLoading);
  public getcountLoaded$ = this.appState.select(getcountLoaded);
  public getcountFailed$ = this.appState.select(getcountFailed);




  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrManager
  ) {  }

  public customersGroupList(params: CustomersGroupList) {
    this.appState.dispatch(
      new customersGroupAction.DoCustomersGroupListAction(
        new CustomersGroupList(params)
      )
    );
  }

  public addCustomersGroup(params: CustomersGroupAdd) {
    this.appState.dispatch(
      new customersGroupAction.DoAddCustomersGroupAction(
        new CustomersGroupAdd(params)
      )
    );
  }

  public updateCustomersGroup(params: CustomersGroupUpdate) {
    this.appState.dispatch(
      new customersGroupAction.DoUpdateCustomersGroupAction(
        new CustomersGroupUpdate(params)
      )
    );
  }


  public deleteCustomersGroup(params) {
    this.appState.dispatch(
      new customersGroupAction.DoDeleteCustomersGroupAction(
        new CustomersGroupDelete(params)
      )
    );
  }


  public PaginationCustomersGroup(value) {
    this.appState.dispatch(
      new customersGroupAction.DoPaginationCustomersGroupListAction(
        new CustomersGroupList(value)
      )
    );
  }

}
