/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
// effects
import { createEffect, Actions, ofType } from '@ngrx/effects';
// store
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../reports-action/reports.action';
import { catchError } from 'rxjs/operators';
// service
import { ReportsService } from '../reports.service';

import { tap } from 'rxjs/operators';
import { saveAs } from 'file-saver';

@Injectable()
export class ReportsEffect {
  constructor(
    private action$: Actions,
    private service: ReportsService
  ) {}

  // attribute list
  
  vandorSalesReport$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VENDOR_SALES_REPORT),
    map((action: actions.VendorSalesReportAction) => action.payload),
    switchMap(state => {
      return this.service.vendorSalesReport(state).pipe(
        switchMap(product => [
          new actions.VendorSalesReportSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.VendorSalesReportFailAction(error))
        )
      );
    })
  ));

  // attribute list delete
  
  totalSalesReport$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.TOTAL_SALES_REPORT),
    map((action: actions.TotalSalesReportAction) => action.payload),
    switchMap(state => {
      return this.service.totalSalesReport(state).pipe(
        switchMap(user => [
          new actions.TotalSalesReportSuccessAction(user)
        ]),
        catchError(error =>
          of(new actions.TotalSalesReportFailAction(error))
        )
      );
    })
  ));

  // Attribute add
  
  settlementReport$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.SETTLEMENT_REPORT),
    map((action: actions.SettlementReportAction) => action.payload),
    switchMap(state => {
      return this.service.settlementReport(state).pipe(
        switchMap(user => [new actions.SettlementReportSuccessAction(user)]),
        catchError(error =>
          of(new actions.SettlementReportFailAction(error))
        )
      );
    })
  ));

  
  vendorList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VENDOR_LIST),
    map((action: actions.VendorListAction) => action.payload),
    switchMap(state => {
      return this.service.vendorList(state).pipe(
        switchMap(user => [new actions.VendorListSuccessAction(user)]),
        catchError(error =>
          of(new actions.VendorListFailAction(error))
        )
      );
    })
  ));

  
  exportSettlementReport$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_SETTLEMENT_REPORT),
    map((action: actions.ExportSettlementReportAction) => action.payload),
    switchMap(state => {
      return this.service.exportSettlementReport(state).pipe(
        tap(data => {
          const filename = 'SettlementReport_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(user => [new actions.ExportSettlementReportSuccessAction(user)]),
        catchError(error =>
          of(new actions.ExportSettlementReportFailAction(error))
        )
      );
    })
  ));

  
  exportTotalSalesReport$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_TOTAL_SALES_REPORT),
    map((action: actions.ExportTotalSalesReportAction) => action.payload),
    switchMap(state => {
      return this.service.exportTotalSalesReport(state).pipe(
        tap(data => {
          const filename = 'TotalSalesReport_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(user => [new actions.ExportTotalSalesReportSuccessAction(user)]),
        catchError(error =>
          of(new actions.ExportTotalSalesReportFailAction(error))
        )
      );
    })
  ));

  
  exportVendorSalesReport$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_VENDOR_SALES_REPORT),
    map((action: actions.ExportVendorSalesReportAction) => action.payload),
    switchMap(state => {
      return this.service.exportVendorSalesReport(state).pipe(
        tap(data => {
          const filename = 'VendorSalesReport_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(user => [new actions.ExportVendorSalesReportSuccessAction(user)]),
        catchError(error =>
          of(new actions.ExportVendorSalesReportFailAction(error))
        )
      );
    })
  ));

 // order status list
     
     orderStatusList$: Observable<Action> = createEffect(() => this.action$.pipe(
       ofType(actions.ActionTypes.ORDER_STATUS_LIST),
       map((action: actions.OrderStatusListAction) => action.payload),
       switchMap(state => {
         return this.service.orderStatusList(state).pipe(
           switchMap(product => [
             new actions.OrderStatusListSuccessAction(product)
           ]),
           catchError(error =>
             of(new actions.OrderStatusListFailAction(error))
           )
         );
       })
     ));

}
