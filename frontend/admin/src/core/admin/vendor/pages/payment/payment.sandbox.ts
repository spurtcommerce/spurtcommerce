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
import * as store from '../../../../app.state.interface';
import * as paymentActions from './payment-action/payment.action';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  // Payment List
  getPaymentList,
  getPaymentListLoaded,
  getPaymentListLoading,
  // Payment List Count
  getPaymentListCount,
  getPaymentListCountLoaded,
  getPaymentListCountLoading,
  // Payment Detail
  getPaymentDetail,
  getPaymentDetailLoaded,
  getPaymentDetailLoading,
  // Payment Dashboard Count
  paymentDashboardCount,
  getPaymentDashboardCountLoaded,
  getPaymentDashboardCountLoading,exportExcelLoading,
} from './payment-reducer/payment.selector';

@Injectable()
export class PaymentSandbox {

  private subscriptions: Array<Subscription> = [];

  public exportExcelLoading$ =this.appState$.select(exportExcelLoading)

  public getPaymentListLoading$ = this.appState$.select(getPaymentListLoading);
  public getPaymentListLoaded$ = this.appState$.select(getPaymentListLoaded);
  public getPaymentList$ = this.appState$.select(getPaymentList);

  public getPaymentListCountLoading$ = this.appState$.select(getPaymentListCountLoading);
  public getPaymentListCountLoaded$ = this.appState$.select(getPaymentListCountLoaded);
  public getPaymentListCount$ = this.appState$.select(getPaymentListCount);

  public getPaymentDetailLoading$ = this.appState$.select(getPaymentDetailLoading);
  public getPaymentDetailLoaded$ = this.appState$.select(getPaymentDetailLoaded);
  public getPaymentDetail$ = this.appState$.select(getPaymentDetail);

  public getPaymentDashboardCountLoading$ = this.appState$.select(getPaymentDashboardCountLoading);
  public getPaymentDashboardCountLoaded$ = this.appState$.select(getPaymentDashboardCountLoaded);
  public paymentDashboardCount$ = this.appState$.select(paymentDashboardCount);

  constructor(
    protected appState$: Store<store.AppState>,
  ) {}

  public getPaymentList(form: any): void {
    this.appState$.dispatch(new paymentActions.GetPaymentList(form));
  }

  public getPaymentListCount(form: any = {}): void {
    this.appState$.dispatch(new paymentActions.GetPaymentListCount(form));
  }

  public getPaymentDetail(form: any): void {
    this.appState$.dispatch(new paymentActions.GetPaymentDetail(form));
  }

  public getPaymentDashboardCount(): void {
    this.appState$.dispatch(new paymentActions.GetPaymentDashboardCount());
  }

  public downloadInvoice(params) {
    this.appState$.dispatch(
      new paymentActions.DownloadInvoice(params)
    );
  }
  public clearInvoice(params) {
    this.appState$.dispatch(
      new paymentActions.ClearInvoice(params)
    );
  }
  public exportPayment(params) {
    this.appState$.dispatch(
      new paymentActions.ExportPaymentAction(params)
    );
  }
  public exportAllVendorPayment(params) {
    this.appState$.dispatch(
      new paymentActions.ExportAllVendorPaymentAction(params)
    );
  }

}
