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
import * as store from '../../../app.state.interface';
import * as archivePaymentActions from './actions/archive-payments.action';
import { archivePaymentList, archivePaymentListLoading, archivePaymentListLoaded,
         archivePaymentListCount,
         archivePaymentListCountLoading,exportExcelLoading,exportExcelLoaded,exportExcel,
         archivePaymentListCountLoaded} from './reducer/archive-payments.selector';

@Injectable()
export class ArchivePaymentSandbox {

  public archivePaymentList$ = this.appState.select(archivePaymentList);
  public archivePaymentListLoading$ = this.appState.select(archivePaymentListLoading);
  public archivePaymentListLoaded$ = this.appState.select(archivePaymentListLoaded);
  public archivePaymentListCount$ = this.appState.select(archivePaymentListCount);
  public archivePaymentListCountLoading$ = this.appState.select(archivePaymentListCountLoading);
  public archivePaymentListCountLoaded$ = this.appState.select(archivePaymentListCountLoaded);

  public exportExcel = this.appState.select(exportExcel);
  public exportExcelLoaded$ = this.appState.select(exportExcelLoaded);
  public exportExcelLoading$ = this.appState.select(exportExcelLoading)


constructor(protected appState: Store<store.AppState>) {}

// archive Payment list

public archivePaymentList(value: any) {
    this.appState.dispatch(
      new archivePaymentActions.ArchivePaymentListAction(value));
}

// archive Payment list count

public archivePaymentListCount(value: any) {
  this.appState.dispatch(
    new archivePaymentActions.ArchivePaymentListCountAction(value));
}


// export archive payment

public exportArchivePayment(value: any) {
  this.appState.dispatch(new archivePaymentActions.ExportArchivePaymentAction(value));
}

// export all archive payment

public exportAllArchivePayment(value: any) {
  this.appState.dispatch(new archivePaymentActions.ExportAllArchivePaymentAction(value));
}


}
