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
// store
import { Store } from '@ngrx/store';
// actions
import * as paymentActions from './payment-action/payment.action';
// app state
import * as store from '../app.state.interface';
// router
import { Router } from '@angular/router';

import {
  // payment add selectors
  getPaymentAdd,
  paymentAddFailed,
  paymentAddLoaded,
  getPaymentAddLoading,
  paymentDeleteFailed, paymentDeleteLoaded, paymentDeleteLoading, getPaymentDelete,
  paymentBulkDeleteFailed,
  paymentBulkDeleteLoaded,
  paymentBulkDeleteLoading,
  getPaymentBulkDelete,
  paymentListFailed,
  paymentListLoaded,
  exportEarning,
  exportEarningFailed,
  exportEarningLoaded,
  exportEarningLoading,
  MultiplePaymentExport,
  MultiplePaymentExportLoading,
  MultiplePaymentExportLoaded,
  MultiplePaymentExportFailed,
  MultipleEarningExport, MultipleEarningExportFailed,
  MultipleEarningExportLoaded, MultipleEarningExportLoading,
  DeleteCsvList,
  DeleteCsvListLoading, archivePaymentList, archivePaymentListFailed, archivePaymentListLoaded, archivePaymentListLoading,
  DeleteCsvListLoaded, categoryListLoaded,
  DeleteCsvListFailed, downloadInvoice, downloadInvoiceFailed, downloadInvoiceLoaded, downloadInvoiceLoading,
  paymentListLoading, exportPayment, exportPaymentFailed, exportPaymentLoaded, exportPaymentLoading,
  categoryListLoading, getEarningCount, getEarningCountFailed,
  getEarningCountLoaded, getEarningCountLoading, getInEarningCount,
  getInEarningCountFailed, getInEarningCountLoaded,
  getInEarningCountLoading, getTotalPaymentCount, getTotalPaymentCountFailed,
  getTotalPaymentCountLoaded, getTotalPaymentCountLoading, makeArchiveLoaded, makeArchiveLoading, makeArchive, makeArchiveFailed,
  categoryList, getPaymentStatus, getPaymentStatusFailed, getPaymentStatusLoaded, getPaymentStatusLoading,
  tempCategoryList, paymentUpdateFailed, paymentUpdateLoaded, paymentUpdateLoading, getPaymentUpdate,
  paymentList, paymentDetailFailed, paymentDetailLoaded, paymentDetailLoading, getPaymentDetail,
  makePaymentArchive,
  makePaymentArchiveLoading,
  makePaymentArchiveLoaded,
  exportAllArchivePaymentLoading,
  exportArchivePaymentLoading,
  exportArchivePaymentLoaded,
  archivePaymentListCount
  // payment update selectors

} from './payment-reducer/payment.selector';
import { PaymentDeleteModel } from './payment-model/payment-delete.model';
import { StatusRequest } from './payment-model/payment-status.request.model';
import { PaymentBulkDeleteModel } from './payment-model/payment-bulk-delete.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentSandbox {

  public paymentAdd$ = this.appState.select(getPaymentAdd);
  public paymentAddLoading$ = this.appState.select(getPaymentAddLoading);
  public paymentAddLoaded$ = this.appState.select(paymentAddLoaded);
  public paymentAddFailed$ = this.appState.select(paymentAddFailed);
  public paymentDelete$ = this.appState.select(getPaymentDelete);
  public paymentDeleteLoading$ = this.appState.select(paymentDeleteLoading);
  public paymentDeleteLoaded$ = this.appState.select(paymentDeleteLoaded);
  public paymentDeleteFailed$ = this.appState.select(paymentDeleteFailed);
  public paymentBulkDelete$ = this.appState.select(getPaymentBulkDelete);
  public paymentBulkDeleteLoading$ = this.appState.select(paymentBulkDeleteLoading);
  public paymentBulkDeleteLoaded$ = this.appState.select(paymentBulkDeleteLoaded);
  public paymentBulkDeleteFailed$ = this.appState.select(paymentBulkDeleteFailed);
  public paymentDetails$ = this.appState.select(getPaymentDetail);
  public paymentDetailLoading$ = this.appState.select(paymentDetailLoading);
  public paymentDetailLoaded$ = this.appState.select(paymentDetailLoaded);
  public paymentDetailFailed$ = this.appState.select(paymentDetailFailed);
  public paymentListLoading$ = this.appState.select(paymentListLoading);
  public paymentListLoaded$ = this.appState.select(paymentListLoaded);
  public paymentListFailed$ = this.appState.select(paymentListFailed);
  public paymentList$ = this.appState.select(paymentList);
  public archivePaymentListLoading$ = this.appState.select(archivePaymentListLoading);
  public archivePaymentListLoaded$ = this.appState.select(archivePaymentListLoaded);
  public archivePaymentListFailed$ = this.appState.select(archivePaymentListFailed);
  public archivePaymentList$ = this.appState.select(archivePaymentList);
  public paymentUpdate$ = this.appState.select(getPaymentUpdate);
  public paymentUpdateLoading$ = this.appState.select(paymentUpdateLoading);
  public paymentUpdateLoaded$ = this.appState.select(paymentUpdateLoaded);
  public paymentUpdateFailed$ = this.appState.select(paymentUpdateFailed);
  public categoryListLoading$ = this.appState.select(categoryListLoading);
  public categoryListLoaded$ = this.appState.select(categoryListLoaded);
  public categoryList$ = this.appState.select(categoryList);
  public tempCategoryList$ = this.appState.select(tempCategoryList);
  public getPaymentStatus$ = this.appState.select(getPaymentStatus);
  public getPaymentStatusLoading$ = this.appState.select(
    getPaymentStatusLoading
  );
  public getPaymentStatusLoaded$ = this.appState.select(getPaymentStatusLoaded);
  public getPaymentStatusFailed$ = this.appState.select(getPaymentStatusFailed);
  public totalPaymentCount$ = this.appState.select(getTotalPaymentCount);
  public totalPaymentCountLoading$ = this.appState.select(
    getTotalPaymentCountLoading
  );
  public totalPaymentCountLoaded$ = this.appState.select(
    getTotalPaymentCountLoaded
  );

  public EarningCount$ = this.appState.select(getEarningCount);
  public EarningCountLoading$ = this.appState.select(
    getEarningCountLoading
  );
  public EarningCountLoaded$ = this.appState.select(
    getEarningCountLoaded
  );

  public inEarningCount$ = this.appState.select(getInEarningCount);
  public inEarningCountLoading$ = this.appState.select(
    getInEarningCountLoading
  );
  public inEarningCountLoaded$ = this.appState.select(
    getInEarningCountLoaded
  );
  public exportPayment$ = this.appState.select(exportPayment);
  public exportPaymentLoading$ = this.appState.select(
    exportPaymentLoading
  );
  public exportPaymentLoaded$ = this.appState.select(
    exportPaymentLoaded
  );
  public exportEarning$ = this.appState.select(exportEarning);
  public exportEarningLoading$ = this.appState.select(
    exportEarningLoading
  );
  public exportEarningLoaded$ = this.appState.select(
    exportEarningLoaded
  );
  public makeArchive$ = this.appState.select(makeArchive);
  public makeArchiveLoading$ = this.appState.select(
    makeArchiveLoading
  );
  public makeArchiveLoaded$ = this.appState.select(
    makeArchiveLoaded
  );

  public MultiplePaymentExport$ = this.appState.select(MultiplePaymentExport);
  public MultiplePaymentExportLoading$ = this.appState.select(MultiplePaymentExportLoading);
  public MultiplePaymentExportLoaded$ = this.appState.select(MultiplePaymentExportLoaded);
  public  MultiplePaymentExportFailed$ = this.appState.select(MultiplePaymentExportFailed);

  public MultipleEarningExport$ = this.appState.select(MultipleEarningExport);
  public MultipleEarningExportLoading$ = this.appState.select(MultipleEarningExportLoading);
  public MultipleEarningExportLoaded$ = this.appState.select(MultipleEarningExportLoaded);
  public MultipleEarningExportFailed$ = this.appState.select(MultipleEarningExportFailed);

  public DeleteCsvList$ = this.appState.select(DeleteCsvList);
  public DeleteCsvListLoading$ = this.appState.select(DeleteCsvListLoading);
  public DeleteCsvListLoaded$ = this.appState.select(DeleteCsvListLoaded);
  public  DeleteCsvListFailed$ = this.appState.select(DeleteCsvListFailed);



  public downloadCsv$ = this.appState.select(downloadInvoice);
  public downloadCsvLoading$ = this.appState.select(
    downloadInvoiceLoading
  );
  public downloadCsvLoaded$ = this.appState.select(
    downloadInvoiceLoaded
  );

  public makePaymentArchive$ = this.appState.select(makePaymentArchive);
  public makePaymentArchiveLoading$ = this.appState.select(makePaymentArchiveLoading);
  public makePaymentArchiveLoaded$ = this.appState.select(makePaymentArchiveLoaded);

  public exportAllArchivePaymentLoading$ = this.appState.select(exportAllArchivePaymentLoading);
  public exportArchivePaymentLoading$ = this.appState.select(exportArchivePaymentLoading);
  public exportArchivePaymentLoaded$ = this.appState.select(exportArchivePaymentLoaded);

  public archivePaymentListCount$ = this.appState.select(archivePaymentListCount);


  constructor(
    protected appState: Store<store.AppState>,
  ) {}


  public doPaymentDelete(value) {
    this.appState.dispatch(
      new paymentActions.DoPaymentDeleteAction(new PaymentDeleteModel(value))
    );
  }
  public doPaymentBulkDelete(value) {
    this.appState.dispatch(
      new paymentActions.DoPaymentBulkDeleteAction(new PaymentBulkDeleteModel(value))
    );
  }
  public getPaymentList(value) {
    this.appState.dispatch(
      new paymentActions.GetPaymentlistAction(value)
    );
  }
  public getArchivePaymentList(value) {
    this.appState.dispatch(
      new paymentActions.GetArchivePaymentlistAction(value)
    );
  }
  public getCategoryList(value) {
    this.appState.dispatch(
      new paymentActions.GetCategorieslistAction(value)
    );
  }

  public paymentStatus(params) {
    this.appState.dispatch(
      new paymentActions.DoPaymentStatus(new StatusRequest(params))
    );
  }

  public getPaymentListCount(params: any) {
    this.appState.dispatch(
      new paymentActions.GetTotalPaymentCountAction(
        params
      )
    );
  }

  public getEarningListCount(params) {
    this.appState.dispatch(
      new paymentActions.GetEarningCountAction(
        params
      )
    );
  }


  // Do Payment Excel
  public paymentExcel(value) {
    this.appState.dispatch(new paymentActions.DoPaymentExcel(value));
  }

  public paymentAllExcel(value) {
    this.appState.dispatch(new paymentActions.DoPaymentsExcel(value));
  }
  public exportPayment(value) {
    this.appState.dispatch(new paymentActions.ExportPayment(value));
  }
  public exportEarning(value) {
    this.appState.dispatch(new paymentActions.ExportEarning(value));
  }
  public makeArchive(value) {
    this.appState.dispatch(new paymentActions.MakeArchive(value));
  }
  public changeCount(value) {
    this.appState.dispatch(new paymentActions.ChangeCount(value));
  }

  public multiplePaymentExport(value) {
    this.appState.dispatch(new paymentActions.MultiplePaymentExport(value));
  }
  public multipleEarningExport(value) {
    this.appState.dispatch(new paymentActions.MultipleEarningExport(value));
  }
  public removeExportSelection(val) {
    this.appState.dispatch(new paymentActions.RemoveExportSelection(val));
  }
  public deleteCsvList(value) {
    this.appState.dispatch(new paymentActions.DeleteCsvList(value));
  }


  public downloadInvoice(value) {
    this.appState.dispatch(new paymentActions.DownloadInvoice(value));
  }

  public makePaymentArchive(value) {
    this.appState.dispatch(new paymentActions.MakePaymentArchiveAction(value));
  }

  public getArchivePaymentListCount(value) {
    this.appState.dispatch(new paymentActions.ArchivePaymentListCountAction(value));
  }

  public exportAllArchivePayment(value) {
    this.appState.dispatch(new paymentActions.ExportAllArchivePaymentAction(value));
  }
  public exportArchivePayment(value) {
    this.appState.dispatch(new paymentActions.ExportArchivePaymentAction(value));
  }
}
