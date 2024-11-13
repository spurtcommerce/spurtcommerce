/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError } from 'rxjs/operators';
import * as actions from '../orders-action/orders.action';
import { Router } from '@angular/router';
import { OrdersService } from '../orders.service';
import * as fileSaver from 'file-saver';

@Injectable()
export class OrdersEffects {
  constructor(
    private action$: Actions,
    public router: Router,
    private ordersService: OrdersService

  ) { }

  
  ordersList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ORDERS_LIST),
    map((action: actions.GetOrdersList) => action.payload),
    switchMap(state => {
      return this.ordersService.ordersList(state).pipe(
        switchMap(SettingList => [
          new actions.GetOrdersListSuccess(SettingList)
        ]),
        catchError(error => of(new actions.GetOrdersListFail(error)))
      );
    })
  ));

  
  ordersListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ORDERS_LIST_COUNT),
    map((action: actions.GetOrdersListCount) => action.payload),
    switchMap(state => {
      return this.ordersService.ordersCount(state).pipe(
        switchMap(SettingList => [
          new actions.GetOrdersListCountSuccess(SettingList)
        ]),
        catchError(error => of(new actions.GetOrdersListCountFail(error)))
      );
    })
  ));

  
  ordersLogList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ORDERS_LOG_LIST),
    map((action: actions.GetOrdersLogList) => action.payload),
    switchMap(state => {
      return this.ordersService.ordersLogList(state).pipe(
        switchMap(SettingList => [
          new actions.GetOrdersLogListSuccess(SettingList)
        ]),
        catchError(error => of(new actions.GetOrdersLogListFail(error)))
      );
    })
  ));
  
  ordersStatusList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ORDERS_STATUS_LIST),
    map((action: actions.GetOrdersStatusList) => action.payload),
    switchMap(state => {
      return this.ordersService.ordersStatusList(state).pipe(
        switchMap(SettingList => [
          new actions.GetOrdersStatusListSuccess(SettingList)
        ]),
        catchError(error => of(new actions.GetOrdersStatusListFail(error)))
      );
    })
  ));
  
  orderDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ORDER_DETAIL),
    map((action: actions.GetOrderDetail) => action.payload),
    switchMap(state => {
      return this.ordersService.orderDetail(state).pipe(
        switchMap(SettingList => [
          new actions.GetOrderDetailSuccess(SettingList)
        ]),
        catchError(error => of(new actions.GetOrderDetailFail(error)))
      );
    })
  ));
  
  orderStatusChange$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.CHANGE_ORDER_STATUS),
    map((action: actions.ChangeOrderStatus) => action.payload),
    switchMap(state => {
      return this.ordersService.orderStatusChange(state).pipe(
        switchMap(SettingList => [
          new actions.ChangeOrderStatusSuccess(SettingList)
        ]),
        catchError(error => of(new actions.ChangeOrderStatusFail(error)))
      );
    })
  ));
  
  getInvoiceDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DOWNLOAD_INVOICE),
    map((action: actions.DownloadInvoice) => action.payload),
    switchMap(state => {
      const orderPrefixId = state.orderPrefixId;
      return this.ordersService.downloadInvoice(state).pipe(
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
