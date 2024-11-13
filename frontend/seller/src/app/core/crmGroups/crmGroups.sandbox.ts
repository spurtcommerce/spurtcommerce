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
// actions
import * as crmGroupsActions from './crmGroups-action/crmGroups.action';
// app state
import * as store from '../app.state.interface';

import {
  addCustomer, addCustomerLoading, addCustomerLoaded,
  customerGroupList, customerGroupListLoading, customerGroupListLoaded, addCustomerGroup, addCustomerGroupLoading, addCustomerGroupLoaded, updateCustomerGroup,
  updateCustomerGroupLoading, updateCustomerGroupLoaded, deleteCustomerGroup, deleteCustomerGroupLoading, deleteCustomerGroupLoaded,
  customerGroupListCount, customerGroupListCountLoading, customerGroupListCountLoaded, customerList, customerListLoading, customerListLoaded, customerDetails, customerDetailsLoading,
  customerDetailsLoaded, customerStatusUpdate, customerStatusUpdateLoading, customerStatusUpdateLoaded,
  customerGroupDetail, customerGroupDetailLoading, customerGroupDetailLoaded, customerGroupUpdate, customerGroupUpdateLoading, customerGroupUpdateLoaded
} from './crmGroups-reducer/crmGroups.selector';


@Injectable()
export class crmGroupsSandbox {
  // addCustomer 
  public addCustomer$ = this.appState.select(addCustomer);
  public addCustomerLoading$ = this.appState.select(addCustomerLoading);
  public addCustomerLoaded$ = this.appState.select(addCustomerLoaded);

  // customerGroupList 
  public customerGroupList$ = this.appState.select(customerGroupList);
  public customerGroupListLoading$ = this.appState.select(customerGroupListLoading);
  public customerGroupListLoaded$ = this.appState.select(customerGroupListLoaded);


  // addCustomerGroup 
  public addCustomerGroup$ = this.appState.select(addCustomerGroup);
  public addCustomerGroupLoading$ = this.appState.select(addCustomerGroupLoading);
  public addCustomerGroupLoaded$ = this.appState.select(addCustomerGroupLoaded);


  // updateCustomerGroup 
  public updateCustomerGroup$ = this.appState.select(updateCustomerGroup);
  public updateCustomerGroupLoading$ = this.appState.select(updateCustomerGroupLoading);
  public updateCustomerGroupLoaded$ = this.appState.select(updateCustomerGroupLoaded);

  // deleteCustomerGroup 
  public deleteCustomerGroup$ = this.appState.select(deleteCustomerGroup);
  public deleteCustomerGroupLoading$ = this.appState.select(deleteCustomerGroupLoading);
  public deleteCustomerGroupLoaded$ = this.appState.select(deleteCustomerGroupLoaded);


  // customerGroupListCount 
  public customerGroupListCount$ = this.appState.select(customerGroupListCount);
  public customerGroupListCountLoading$ = this.appState.select(customerGroupListCountLoading);
  public customerGroupListCountLoaded$ = this.appState.select(customerGroupListCountLoaded);

  // customerList 
  public customerList$ = this.appState.select(customerList);
  public customerListLoading$ = this.appState.select(customerListLoading);
  public customerListLoaded$ = this.appState.select(customerListLoaded);

  // customerDetails 
  public customerDetails$ = this.appState.select(customerDetails);
  public customerDetailsLoading$ = this.appState.select(customerDetailsLoading);
  public customerDetailsLoaded$ = this.appState.select(customerDetailsLoaded);

  // customerStatusUpdate 
  public customerStatusUpdate$ = this.appState.select(customerStatusUpdate);
  public customerStatusUpdateLoading$ = this.appState.select(customerStatusUpdateLoading);
  public customerStatusUpdateLoaded$ = this.appState.select(customerStatusUpdateLoaded);

  // customerGroupDetail 
  public customerGroupDetail$ = this.appState.select(customerGroupDetail);
  public customerGroupDetailLoading$ = this.appState.select(customerGroupDetailLoading);
  public customerGroupDetailLoaded$ = this.appState.select(customerGroupDetailLoaded);

  // customerGroupUpdate 
  public customerGroupUpdate$ = this.appState.select(customerGroupUpdate);
  public customerGroupUpdateLoading$ = this.appState.select(customerGroupUpdateLoading);
  public customerGroupUpdateLoaded$ = this.appState.select(customerGroupUpdateLoaded);
  constructor(
    protected appState: Store<store.AppState>,
  ) { }

  // addCustomer
  public addCustomer(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.addCustomerAction(value)
    );
  }

  // customerGroupList
  public customerGroupList(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.customerGroupListAction(value)
    );
  }

  // addCustomerGroup
  public addCustomerGroup(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.addCustomerGroupAction(value)
    );
  }

  // updateCustomerGroup
  public updateCustomerGroup(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.updateCustomerGroupAction(value)
    );
  }

  // deleteCustomerGroup
  public deleteCustomerGroup(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.deleteCustomerGroupAction(value)
    );
  }

  // customerGroupListCount
  public customerGroupListCount(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.customerGroupListCountAction(value)
    );
  }

  // customerList
  public customerList(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.customerListAction(value)
    );
  }


  // customerDetails
  public customerDetails(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.customerDetailsAction(value)
    );
  }

  // customerStatusUpdate
  public customerStatusUpdate(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.customerStatusUpdateAction(value)
    );
  }

  // customerGroupDetail
  public customerGroupDetail(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.customerGroupDetailAction(value)
    );
  }


  // customerGroupUpdate
  public customerGroupUpdate(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.customerGroupUpdateAction(value)
    );
  }
}
