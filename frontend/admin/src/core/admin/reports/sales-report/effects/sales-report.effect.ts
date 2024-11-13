/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as actions from '../action/sales-report.action';
import { catchError } from 'rxjs/operators';
// service
import { SalesReportService } from '../sales-report.service';
import { tap } from 'rxjs/operators';
import { saveAs } from 'file-saver';


@Injectable()
export class SalesReportEffect {
  constructor(
    private action$: Actions,
    private service: SalesReportService) {}


  // <---------------SALES REPORT LIST------------------> //

  
  salesReportList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.SALES_REPORT_LIST),
    map((action: actions.SalesReportListAction) => action.payload),
    switchMap(state => {
      return this.service.salesReportList(state).pipe(
        switchMap(list => [new actions.SalesReportListSuccess(list)]),
        catchError(error => of(new actions.SalesReportListFail(error)))
      );
    })
  ));


  // <---------------SALES REPORT LIST COUNT------------------> //

   
   salesReportListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
     ofType(actions.ActionTypes.SALES_REPORT_LIST_COUNT),
     map((action: actions.SalesReportListCountAction) => action.payload),
     switchMap(state => {
       return this.service.salesReportListCount(state).pipe(
         switchMap(list => [new actions.SalesReportListCountSuccess(list)]),
         catchError(error => of(new actions.SalesReportListCountFail(error)))
       );
     })
   ));

    // <---------------EXPORT SALES REPORT LIST COUNT------------------> //

    
    exportSalesReport$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.EXPORT_SALES_REPORT),
      map((action: actions.ExportSalesReportAction) => action.payload),
      switchMap(state => {
        return this.service.exportSalesReport(state).pipe(
          tap((data: any) => {
            const filename = 'SalesReport' + Date.now() + '.xlsx';
            const blob = new Blob([data], { type: 'text/xlsx' });
            saveAs(blob, filename);
          }),
          switchMap(list => [new actions.ExportSalesReportSuccess(list)]),
          catchError(error => of(new actions.ExportSalesReportFail(error)))
        );
      })
    ));

// <---------------EXPORT ALL SALES REPORT LIST COUNT------------------> //

    
    exportAllSalesReport$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.EXPORT_ALL_SALES_REPORT),
      map((action: actions.ExportAllSalesReportAction) => action.payload),
      switchMap(state => {
        return this.service.exportAllSalesReport(state).pipe(
          tap((data: any) => {
            const filename = 'AllSalesReport' + Date.now() + '.xlsx';
            const blob = new Blob([data], { type: 'text/xlsx' });
            saveAs(blob, filename);
          }),
          switchMap(list => [new actions.ExportAllSalesReportSuccess(list)]),
          catchError(error => of(new actions.ExportAllSalesReportFail(error)))
        );
      })
    ));

    
    productList$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.PRODUCT_LIST),
      map((action: actions.ProductListAction) => action.payload),
      switchMap(state => {
        return this.service.productList(state).pipe(
          switchMap(list => [new actions.ProductListSuccess(list)]),
          catchError(error => of(new actions.ProductListFail(error)))
        );
      })
    ));

    
    categoryList$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.CATEGORY_LIST),
      map((action: actions.CategoryListAction) => action.payload),
      switchMap(state => {
        return this.service.categoryList(state).pipe(
          switchMap(list => [new actions.CategoryListSuccess(list)]),
          catchError(error => of(new actions.CategoryListFail(error)))
        );
      })
    ));

}
