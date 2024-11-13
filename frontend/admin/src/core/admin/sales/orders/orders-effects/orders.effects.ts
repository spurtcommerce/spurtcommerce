/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as actions from '../orders-action/orders.action';
import { catchError } from 'rxjs/operators';
import { OrdersService } from '../orders.service';
import { tap } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { Store } from '@ngrx/store';
import * as store from './../../../../app.state.interface';
import * as layoutAction from '../../layout/action/layout.action';
import * as fileSaver from 'file-saver';  
declare global {
  interface Navigator {
    msSaveOrOpenBlob: (blobOrBase64: Blob | string, filename: string) => void
  }
}

@Injectable()
export class OrdersEffects {
  constructor(
    private action$: Actions,
    private apiCli: OrdersService,
    protected appState: Store<store.AppState>
  ) {}

  
  doOrderlists$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ORDER_LIST_ACTION),
    map((action: actions.DoOrderListAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getorderlist(state).pipe(
        switchMap(salesorders => [
          new actions.DoOrderSuccessAction(salesorders)
        ]),
        catchError(error => of(new actions.DoOrderListFailAction(error)))
      );
    })
  ));

  
  doOrderdelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ORDER_DELETE_ACTION),
    map((action: actions.DoOrderDeleteAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getorderDelete(state).pipe(
        tap(data => {
          this.appState.dispatch(
            new layoutAction.GetSalesCountAction({ count: true })
          );
        }),
        switchMap(salesorders => [
          new actions.DoOrderDeleteSuccessAction(salesorders)
        ]),
        catchError(error => of(new actions.DoOrderDeleteFailAction(error)))
      );
    })
  ));
  
  doOrderCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ORDER_COUNT_ACTION),
    map((action: actions.DoOrderCountAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getorderlistCount(state).pipe(
        switchMap(salesorders => [
          new actions.DoOrderCountSuccessAction(salesorders)
        ]),
        catchError(error => of(new actions.DoOrderCountFailAction(error)))
      );
    })
  ));
  
  doOrderDetails$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ORDER_DETAIL_ACTION),
    map((action: actions.DoOrderDetailsAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getorderDetail(state).pipe(
        switchMap(orderDetails => [
          new actions.DoOrderDetailsSuccessAction(orderDetails)
        ]),
        catchError(error => of(new actions.DoOrderDetailsFailAction(error)))
      );
    })
  ));


  
  doOrderLog$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ORDER_LOG_ACTION),
    map((action: actions.DoOrderLogAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getOrderLog(state).pipe(
        switchMap(orderLog => [
          new actions.DoOrderLogSuccessAction(orderLog)
        ]),
        catchError(error => of(new actions.DoOrderLogFailAction(error)))
      );
    })
  ));

  // Order Status Change
  
  doOrderStatusChange$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ORDER_CHANGE_STATUS_ACTION),
    map((action: actions.DoOrderChangeStatusAction) => action.payload),
    switchMap(state => {
      return this.apiCli.changeOrderStatus(state).pipe(
        switchMap(orderDetails => [
          new actions.DoOrderChangeStatusSuccess(orderDetails)
        ]),
        catchError(error => of(new actions.DoOrderChangeStatusFail(error)))
      );
    })
  ));
  
  getSettings$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_SETTINGS_ACTION),
    map((action: actions.GetSettings) => action.payload),
    switchMap(state => {
      return this.apiCli.getsettings().pipe(
        map(featured => new actions.GetSettingsSuccess(featured)),
        catchError(error => of(new actions.GetSettingsFail(error)))
      );
    })
  ));

  // Order Excel
  
  doOrderExcel$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ORDER_EXCEL),
    map((action: actions.DoOrderExcel) => action.payload),
    switchMap(state => {
      return this.apiCli.orderExcel(state).pipe(
        tap(data => {
          const filename = 'OrderExcel_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(user => [new actions.DoOrderExcelSuccess(user)]),
        catchError(error => of(new actions.DoOrderExcelFail(error)))
      );
    })
  ));
  
  getInvoiceDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DOWNLOAD_INVOICE),
    map((action: actions.DownloadInvoice) => action.payload),
    switchMap(state => {
      return this.apiCli.downloadInvoice(state).pipe(
        tap(response => {
          const filename = state.orderPrefixId + ".pdf";
          const blob = new Blob([response], { type: 'application/pdf' });
          fileSaver.saveAs(blob, filename);
        }),
        switchMap(SettingList => [
          new actions.DownloadInvoiceSuccess(SettingList)
        ]),
        catchError(error => of(new actions.DownloadInvoiceFail(error)))
      );
    })
  ));

  convertBase64PDFToBlobData(base64Data: string, contentType: string = 'application/pdf', sliceSize = 512) {
    const byteCharacters = atob(base64Data.replace(/^data:([A-Za-z-+\/]+);base64,/, ''));
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

}
