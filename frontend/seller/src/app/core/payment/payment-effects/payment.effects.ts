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
// effects
import { createEffect, Actions, ofType } from '@ngrx/effects';
// store
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../payment-action/payment.action';

import { catchError } from 'rxjs/operators';
// service
import { PaymentService } from '../payment.service';
import { tap } from 'rxjs/operators';
import * as store from '../../app.state.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import * as fileSaver from 'file-saver';  


@Injectable()
export class PaymentEffect {
  constructor(
    private action$: Actions,
    protected appState: Store<store.AppState>,
    private service: PaymentService,
    private popup: NgbModal, public router: Router, public toaster: ToastrService
  ) { }


  
  doPaymentDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PAYMENT_DELETE),
    map((action: actions.DoPaymentDeleteAction) => action.payload),
    switchMap(state => {
      return this.service.paymentDelete(state).pipe(
        switchMap(user => [new actions.DoPaymentDeleteSuccessAction(user)]),
        catchError(error => of(new actions.DoPaymentDeleteFailAction(error)))
      );
    })
  ));
  
  doPaymentBulkDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_BULK_PAYMENT_DELETE),
    map((action: actions.DoPaymentBulkDeleteAction) => action.payload),
    switchMap(state => {
      return this.service.paymentBulkDelete(state).pipe(
        switchMap(user => [new actions.DoPaymentBulkDeleteSuccessAction(user)]),
        tap(data => {
          if (data) {
            this.toaster.success('Success', data.payload['message']);
          }
        }),
        catchError(error => of(new actions.DoPaymentBulkDeleteFailAction(error)))
      );
    })
  ));

    // payment status change
  
  doPaymentStatus$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_STATUS),
    map((action: actions.DoPaymentStatus) => action.payload),
    switchMap(state => {
      return this.service.paymentStatus(state).pipe(
        switchMap(status => [new actions.DoPaymentStatusSuccess(status)]),
        catchError(error => of(new actions.DoPaymentStatusFail(error)))
      );
    })
  ));

  
  getPaymentList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PAYMENT_LIST),
    map((action: actions.GetPaymentlistAction) => action.payload),
    switchMap(state => {
      return this.service.paymentList(state).pipe(
        map(user => new actions.GetPaymentlistSuccessAction(user)),
        catchError(error => of(new actions.GetPaymentlistFailAction(error)))
      );
    })
  ));
  
  getArchivePaymentList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ARCHIVE_PAYMENT_LIST),
    map((action: actions.GetArchivePaymentlistAction) => action.payload),
    switchMap(state => {
      return this.service.archivePaymentList(state).pipe(
        map(user => new actions.GetArchivePaymentlistSuccessAction(user)),
        catchError(error => of(new actions.GetArchivePaymentlistFailAction(error)))
      );
    })
  ));
  
  getCategoryList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_CATEGORIES_LIST),
    map((action: actions.GetCategorieslistAction) => action.payload),
    switchMap(state => {
      return this.service.categoryList(state).pipe(
        map(user => new actions.GetCategorieslistSuccessAction(user)),
        catchError(error => of(new actions.GetCategorieslistFailAction(error)))
      );
    })
  ));
  
  doTotalPaymentListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_TOTAL_PAYMENT_COUNT),
    map((action: actions.GetTotalPaymentCountAction) => action.payload),
    switchMap(state => {
      return this.service.paymentCount(state).pipe(
        tap(data => {
          if (data) {
          }
        }),
        switchMap(response => [
          new actions.GetTotalPaymentCountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetTotalPaymentCountFailAction(error))
        )
      );
    })
  ));

  
  doActiveCustomerListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ACTIVE_PAYMENT_COUNT),
    map((action: actions.GetEarningCountAction) => action.payload),
    switchMap(state => {
      return this.service.earningPaymentCount(state).pipe(
        tap(data => {
          if (data) {
          }
        }),
        switchMap(response => [
          new actions.GetEarningCountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetEarningCountFailAction(error))
        )
      );
    })
  ));

  
  downloadMainPriceCsv$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_PAYMENT),
    map((action: actions.ExportPayment) => action.payload),
    switchMap(state => {
      return this.service.exportPayment(state).pipe(
        tap(data => {
          const filename = 'payment_list_' + Date.now() + '.xlsx';
          const blob = new Blob([data], {type: 'text/xlsx'});
          saveAs(blob, filename);
      }),
        switchMap(response => [
          new actions.ExportPaymentSuccess(response)
        ]),
        catchError(error =>
          of(new actions.ExportPaymentFail(error))
        )
      );
    })
  ));
  
  makeArchive$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.MAKE_ARCHIVE),
    map((action: actions.MakeArchive) => action.payload),
    switchMap(state => {
      return this.service.makeArchive(state).pipe(
        switchMap(response => [
          new actions.MakeArchiveSuccess(response)
        ]),
        catchError(error =>
          of(new actions.MakeArchiveFail(error))
        )
      );
    })
  ));
  
  uploadMainPriceCsv$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_EARNINGS),
    map((action: actions.ExportEarning) => action.payload),
    switchMap(state => {
      return this.service.exportEarning(state).pipe(
        tap(data => {
          const filename = 'earnings_list_' + Date.now() + '.xlsx';
          const blob = new Blob([data], {type: 'text/xlsx'});
          saveAs(blob, filename);
      }),
        switchMap(response => [
          new actions.ExportEarningSuccess(response)
        ]),
        tap(data => {
          if (data) {

          }
        }),
        catchError(error =>
          of(new actions.ExportEarningFail(error))
        )
      );
    })
  ));

  
  priceCsvList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.MULTIPLE_PAYMENT_EXPORT),
    map((action: actions.MultiplePaymentExport) => action.payload),
    switchMap(state => {
      return this.service.multiplePaymentExport(state).pipe(
        tap(data => {
          if (data) {
            const filename = 'payment_list_' + Date.now() + '.xlsx';
            const blob = new Blob([data], {type: 'text/xlsx'});
            saveAs(blob, filename);
          }
        }),
        switchMap(response => [
          new actions.MultiplePaymentExportSuccess(response)
        ]),
        catchError(error =>
          of(new actions.MultiplePaymentExportFail(error))
        )
      );
    })
  ));

  
  multipleEarningExport$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.MULTIPLE_EARNINGS_EXPORT),
    map((action: actions.MultipleEarningExport) => action.payload),
    switchMap(state => {
      return this.service.multipleEarningExport(state).pipe(
        tap(data => {
          if (data) {
            const filename = 'earnings_list_' + Date.now() + '.xlsx';
            const blob = new Blob([data], {type: 'text/xlsx'});
            saveAs(blob, filename);
          }
        }),
        switchMap(response => [
          new actions.MultipleEarningExportSuccess(response)
        ]),
        catchError(error =>
          of(new actions.MultipleEarningExportFail(error))
        )
      );
    })
  ));

  
  deleteCsvList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DELETE_CSV_LIST),
    map((action: actions.DeleteCsvList) => action.payload),
    switchMap(state => {
      return this.service.deleteCsvList(state).pipe(
        tap(data => {
          if (data) {
          }
        }),
        switchMap(response => [
          new actions.DeleteCsvListSuccess(response)
        ]),
        tap(data => {
          if (data) {
          }
        }),
        catchError(error =>
          of(new actions.DeleteCsvListFail(error))
        )
      );
    })
  ));



  
  downloadInvoice$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DOWNLOAD_INVOICE),
    map((action: actions.DownloadInvoice) => action.payload),
    switchMap(state => {
      return this.service.downloadInvoice(state).pipe(
        tap(response => {
          const filename = state.vendorOrderId + ".pdf";
          const blob = new Blob([response], { type: 'application/pdf' });
          fileSaver.saveAs(blob, filename);
        }),
        switchMap(response => [
          new actions.DownloadInvoiceSuccess(response)
        ]),
        catchError(error =>
          of(new actions.DownloadInvoiceFail(error))
        )
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



  
  makePaymentArchive$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.MAKE_PAYMENT_ARCHIVE),
    map((action: actions.MakePaymentArchiveAction) => action.payload),
    switchMap(state => {
      return this.service.makePaymentArchive(state).pipe(
        switchMap(user => [new actions.MakePaymentArchiveSuccess(user)]),
        catchError(error => of(new actions.MakePaymentArchiveFail(error)))
      );
    })
  ));


  
  archivePaymentCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.ARCHIVE_PAYMENT_LIST_COUNT),
    map((action: actions.ArchivePaymentListCountAction) => action.payload),
    switchMap(state => {
      return this.service.archivePaymentCount(state).pipe(
        switchMap(user => [new actions.ArchivePaymentListCountSuccess(user)]),
        catchError(error => of(new actions.ArchivePaymentListCountFail(error)))
      );
    })
  ));

  
  archivePaymentExport$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_ARCHIVE_PAYMENT),
    map((action: actions.ExportArchivePaymentAction) => action.payload),
    switchMap(state => {
      return this.service.exportArchivePayment(state).pipe(
        tap(data => {
          if (data) {
            const filename = 'archive_payment_' + Date.now() + '.xlsx';
            const blob = new Blob([data], {type: 'text/xlsx'});
            saveAs(blob, filename);
          }
        }),
        switchMap(user => [new actions.ExportArchivePaymentSuccess(user)]),
        catchError(error => of(new actions.ExportArchivePaymentFail(error)))
      );
    })
  ));

  
  archivePaymentExportAll$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_ALL_ARCHIVE_PAYMENT),
    map((action: actions.ExportAllArchivePaymentAction) => action.payload),
    switchMap(state => {
      return this.service.exportAllArchivePayment(state).pipe(
        tap(data => {
          if (data) {
            const filename = 'archive_payment_all_' + Date.now() + '.xlsx';
            const blob = new Blob([data], {type: 'text/xlsx'});
            saveAs(blob, filename);
          }
        }),
        switchMap(user => [new actions.ExportAllArchivePaymentSuccess(user)]),
        catchError(error => of(new actions.ExportAllArchivePaymentFail(error)))
      );
    })
  ));

}
