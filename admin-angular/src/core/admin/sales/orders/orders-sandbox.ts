/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from './../../../app.state.interface';
import * as orderActions from './orders-action/orders.action';
import {
  orderList,
  orderListCount,
  orderListCountLoading,
  orderListCountLoaded,

  viewOrderDetails,
  viewOrderDetailsLoading,
  viewOrderDetailsLoaded,
  viewOrderDetailsFailed,

  settingDetail,

  getOrderDeleteLoading,
  getOrderDeleteLoaded,
  getOrderDeleteFailed,
  getorderDeleteValue,

  getOrderLogLoading,
  getOrderLogLoaded,
  getOrderLogFailed,
  getOrderLogValue,

  getInvoiceDetail,
  getInvoiceDetailLoading,
  getInvoiceDetailLoaded
} from './orders-reducer/orders.selector';
import { OrderslistModel } from './orders-models/orderslist.model';
import { ViewordersModel } from './orders-models/vieworders.model';
import { SalesDeleteModel } from './orders-models/sales-delete.model';

@Injectable()
export class OrdersSandbox {


  public orderList$ = this.appState.select(orderList);
  public orderListCount$ = this.appState.select(orderListCount);
  public viewOrderDetails$ = this.appState.select(viewOrderDetails);

  public getOrderCountLoaded$ = this.appState.select(orderListCountLoaded);
  public getOrderCountLoading$ = this.appState.select(orderListCountLoading);

  public getVieworderLoaded$ = this.appState.select(viewOrderDetailsLoaded);
  public getVieworderFailed$ = this.appState.select(viewOrderDetailsFailed);
  public getVieworderLoading$ = this.appState.select(viewOrderDetailsLoading);
  public settingDetail$ = this.appState.select(settingDetail);
  // sales order delete
  public getorderDeleteValue$ = this.appState.select(getorderDeleteValue);
  public getOrderDeleteLoading$ = this.appState.select(getOrderDeleteLoading);
  public getOrderDeleteLoaded$ = this.appState.select(getOrderDeleteLoaded);
  public getOrderDeleteFailed$ = this.appState.select(getOrderDeleteFailed);


  public getOrderLogValue$ = this.appState.select(getOrderLogValue);
  public getOrderLogLoading$ = this.appState.select(getOrderLogLoading);
  public getOrderLogLoaded$ = this.appState.select(getOrderLogLoaded);
  public getOrderLogFailed$ = this.appState.select(getOrderLogFailed);

  public invoiceDetail$ = this.appState.select(getInvoiceDetail);
  public invoiceDetailLoading$ = this.appState.select(getInvoiceDetailLoading);
  public invoiceDetailLoaded$ = this.appState.select(getInvoiceDetailLoaded);


  constructor(protected appState: Store<store.AppState>) {}

  public getOrderList(value: any) {
    this.appState.dispatch(
      new orderActions.DoOrderListAction(new OrderslistModel(value))
    );
  }

  // #pagination

  public getOrderListCount(value: any) {
    this.appState.dispatch(
      new orderActions.DoOrderCountAction(new OrderslistModel(value))
    );
  }

  // viewOrderdetails
  public viewOrderDetails(value: any) {
    this.appState.dispatch(
      new orderActions.DoOrderDetailsAction(new ViewordersModel(value))
    );
  }
  // delete order
  public salesOrderDelete(value: any) {
    this.appState.dispatch(
      new orderActions.DoOrderDeleteAction(new SalesDeleteModel(value))
    );
  }
  /*change-order-status*/
  public changeOrderStatus(value: any) {
    this.appState.dispatch(new orderActions.DoOrderChangeStatusAction(value));
  }
  // getSettings
  public getSettings(): void {
    this.appState.dispatch(new orderActions.GetSettings());
  }

  // Do Order Excel
  public orderExcel(value) {
    this.appState.dispatch(new orderActions.DoOrderExcel(value));
  }

  public orderLog(value: any) {
    this.appState.dispatch(
      new orderActions.DoOrderLogAction(value)
    );
  }

  public downloadInvoice(params) {
    this.appState.dispatch(
      new orderActions.DownloadInvoice(params)
    );
  }
  public clearInvoice(params) {
    this.appState.dispatch(
      new orderActions.ClearInvoice(params)
    );
  }
}

