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
import * as reportsActions from './reports-action/reports.action';
import * as store from '../../../app.state.interface';
import { Subscription } from 'rxjs/index';

import { vendorSalesReport, vendorSalesReportLoading, vendorSalesReportLoaded,
  totalSalesReport, totalSalesReportLoading, totalSalesReportLoaded,
  settlementReport, settlementReportLoading, settlementReportLoaded,
  vendorList,
exportSettlementReportLoading,
exportTotalSalesReportLoading,
exportVendorSalesReportLoading,
orderStatusList } from './reports-reducer/reports.selector';

@Injectable()
export class ReportsSandbox {

  public vendorSalesReport$ = this.appState.select(vendorSalesReport);
  public vendorSalesReportLoading$ = this.appState.select(vendorSalesReportLoading);
  public vendorSalesReportLoaded$ = this.appState.select(vendorSalesReportLoaded);

  public totalSalesReport$ = this.appState.select(totalSalesReport);
  public totalSalesReportLoading$ = this.appState.select(totalSalesReportLoading);
  public totalSalesReportLoaded$ = this.appState.select(totalSalesReportLoaded);

  public settlementReport$ = this.appState.select(settlementReport);
  public settlementReportLoading$ = this.appState.select(settlementReportLoading);
  public settlementReportLoaded$ = this.appState.select(settlementReportLoaded);

  public exportSettlementReportLoading$ = this.appState.select(exportSettlementReportLoading);
  public exportTotalSalesReportLoading$ = this.appState.select(exportTotalSalesReportLoading);
  public exportVendorSalesReportLoading$ = this.appState.select(exportVendorSalesReportLoading);

  public vendorList$ = this.appState.select(vendorList);
  public orderStatusList$ = this.appState.select(orderStatusList);


  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
  ) {
  }

  public vendorSalesReports(value) {
    this.appState.dispatch(
      new reportsActions.VendorSalesReportAction(value)
    );
  }

  public vendorSalesReportsCount(value) {
    this.appState.dispatch(
      new reportsActions.VendorSalesReportCountAction(value)
    );
  }

  public totalSalesReports(value) {
    this.appState.dispatch(
      new reportsActions.TotalSalesReportAction(value)
    );
  }

  public totalSalesReportsCount(value) {
    this.appState.dispatch(
      new reportsActions.TotalSalesReportCountAction(value)
    );
  }

  public settlementReports(value) {
    this.appState.dispatch(
      new reportsActions.SettlementReportAction(value)
    );
  }

  public settlementReportsCount(value) {
    this.appState.dispatch(
      new reportsActions.SettlementReportCountAction(value)
    );
  }

  public getVendorList(value) {
    this.appState.dispatch(
      new reportsActions.VendorListAction(value)
    );
  }

  public clear() {
    this.appState.dispatch(
      new reportsActions.ClearAction()
    );
  }


  public exportTotalSalesReport(value) {
    this.appState.dispatch(
      new reportsActions.ExportTotalSalesReportAction(value)
    );
  }

  public exportVendorSalesReport(value) {
    this.appState.dispatch(
      new reportsActions.ExportVendorSalesReportAction(value)
    );
  }

  public exportSettlementReport(value) {
    this.appState.dispatch(
      new reportsActions.ExportSettlementReportAction(value)
    );
  }

  public orderStatusList(value) {
    this.appState.dispatch(
      new reportsActions.OrderStatusListAction(value)
    );
  }

}
