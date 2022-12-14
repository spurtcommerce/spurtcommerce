/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
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

@Injectable()
export class OrdersEffects {
  constructor(
    private action$: Actions,
    private apiCli: OrdersService,
    protected appState: Store<store.AppState>
  ) {}

  @Effect()
  doOrderlists$: Observable<Action> = this.action$.pipe(
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
  );

  @Effect()
  doOrderdelete$: Observable<Action> = this.action$.pipe(
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
  );
  @Effect()
  doOrderCount$: Observable<Action> = this.action$.pipe(
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
  );
  @Effect()
  doOrderDetails$: Observable<Action> = this.action$.pipe(
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
  );


  @Effect()
  doOrderLog$: Observable<Action> = this.action$.pipe(
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
  );

  // Order Status Change
  @Effect()
  doOrderStatusChange$: Observable<Action> = this.action$.pipe(
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
  );
  @Effect()
  getSettings$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_SETTINGS_ACTION),
    map((action: actions.GetSettings) => action.payload),
    switchMap(state => {
      return this.apiCli.getsettings().pipe(
        map(featured => new actions.GetSettingsSuccess(featured)),
        catchError(error => of(new actions.GetSettingsFail(error)))
      );
    })
  );

  // Order Excel
  @Effect()
  doOrderExcel$: Observable<Action> = this.action$.pipe(
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
  );
  @Effect()
  getInvoiceDetail$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DOWNLOAD_INVOICE),
    map((action: actions.DownloadInvoice) => action.payload),
    switchMap(state => {
      const orderPrefixId = state.orderPrefixId;
      return this.apiCli.downloadInvoice(state).pipe(
        tap(response => {
          this.downloadPdfFile(response.data, orderPrefixId);
        }),
        switchMap(SettingList => [
          new actions.DownloadInvoiceSuccess(SettingList)
        ]),
        catchError(error => of(new actions.DownloadInvoiceFail(error)))
      );
    })
  );

  downloadPdfFile(base64content: string, orderPrefixId: string) {
    const fileName = orderPrefixId.toUpperCase() + '-' + new Date();
    const blobData = this.convertBase64PDFToBlobData(base64content);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE
      window.navigator.msSaveOrOpenBlob(blobData, fileName);
    } else { // chrome
      const blob = new Blob([blobData], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
    }
  }
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
