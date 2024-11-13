/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
// store
import { Store } from '@ngrx/store';
// actions
import * as productActions from './settlement-order-action/settlement-order.action';
// app state
import * as store from '../../../../app.state.interface';
// router
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/index';


import { orderList, orderListCount, orderListLoaded, orderListLoading,
  makeSettlement,
  makeSettlementLoaded,
  makeSettlementLoading,
  vendorList,
  orderStatusList
} from './settlement-order-reducer/settlement-order.selector';
import { ToastrService } from 'ngx-toastr';



@Injectable()
export class SettlementOrderSandbox {

  public orderList$ = this.appState.select(orderList);
  public orderListCount$ = this.appState.select(orderListCount);
  public orderListLoaded$ = this.appState.select(orderListLoaded);
  public orderListLoading$ = this.appState.select(orderListLoading);

  public makeSettlement$ = this.appState.select(makeSettlement);
  public makeSettlementLoaded$ = this.appState.select(makeSettlementLoaded);
  public makeSettlementLoading$ = this.appState.select(makeSettlementLoading);


  public vendorList$ = this.appState.select(vendorList);
  public orderStatusList$ = this.appState.select(orderStatusList);

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  public getSettlementOrderList(value) {
    this.appState.dispatch(
      new productActions.SettlementOrderListAction(value)
    );
  }

  public getSettlementOrderListCount(value) {
    this.appState.dispatch(
      new productActions.SettlementOrderListCountAction(value)
    );
  }

  public makeSettlement(value) {
    this.appState.dispatch(
      new productActions.MakeSettlementAction(value)
    );
  }

  public getVendorList(value) {
    this.appState.dispatch(
      new productActions.GetVendorListAction(value)
    );
  }

  public orderStatusList(value) {
    this.appState.dispatch(
      new productActions.OrderStatusListAction(value)
    );
  }
}
