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
import * as documentActions from './document-action/document-action';
import { Subscription } from 'rxjs';

import {
  // Document List
  getDocumentList,
  getDocumentListLoaded,
  getDocumentListLoading,
  // Document List Count
  getDocumentListCount,
  getDocumentListCountLoaded,
  getDocumentListCountLoading,
  // Document Detail
  getDocumentDetail,
  getDocumentDetailLoaded,
  getDocumentDetailLoading,
  // Document Dashboard Count
  totalAmount,
  totalOrder,
  totalCommission,
  totalVendor,
  getDocumentDashboardCountLoaded,
  getDocumentDashboardCountLoading,
  documentStatusChangeLoaded,
  getDocumentListDataLoading,
  getDocumentListDataLoaded,
  getDocumentListData,
  updateDocumentLoading,
  updateDocumentLoaded,
  updateDocument,
} from './document-reducer/document.selector';

@Injectable()
export class DocumentSandbox {

  private subscriptions: Array<Subscription> = [];

    //  getDocumentListData
    public getDocumentListDataLoading$ = this.appState$.select(getDocumentListDataLoading);
    public getDocumentListDataLoaded$ = this.appState$.select(getDocumentListDataLoaded);
    public getDocumentListData$ = this.appState$.select(getDocumentListData);

    // updateDocument
    public updateDocumentLoading$ = this.appState$.select(updateDocumentLoading);
    public updateDocumentLoaded$ = this.appState$.select(updateDocumentLoaded);
    public updateDocument$ = this.appState$.select(updateDocument);


  public getDocumentListLoading$ = this.appState$.select(getDocumentListLoading);
  public getDocumentListLoaded$ = this.appState$.select(getDocumentListLoaded);
  public getDocumentList$ = this.appState$.select(getDocumentList);

  public getDocumentListCountLoading$ = this.appState$.select(getDocumentListCountLoading);
  public getDocumentListCountLoaded$ = this.appState$.select(getDocumentListCountLoaded);
  public getDocumentListCount$ = this.appState$.select(getDocumentListCount);

  public getDocumentDetailLoading$ = this.appState$.select(getDocumentDetailLoading);
  public getDocumentDetailLoaded$ = this.appState$.select(getDocumentDetailLoaded);
  public getDocumentDetail$ = this.appState$.select(getDocumentDetail);

  public getDocumentDashboardCountLoading$ = this.appState$.select(getDocumentDashboardCountLoading);
  public getDocumentDashboardCountLoaded$ = this.appState$.select(getDocumentDashboardCountLoaded);
  public totalAmount$ = this.appState$.select(totalAmount);
  public totalOrder$ = this.appState$.select(totalOrder);
  public totalCommission$ = this.appState$.select(totalCommission);
  public totalVendor$ = this.appState$.select(totalVendor);

  public documentStatusChangeLoaded$ = this.appState$.select(documentStatusChangeLoaded);

  constructor(
    protected appState$: Store<store.AppState>,
  ) {
   }

  //  getDocumentListData
   public getDocumentListData(form: any): void {
    this.appState$.dispatch(new documentActions.getDocumentListData(form));
  }

  // updateDocument
  public updateDocument(form: any): void {
    this.appState$.dispatch(new documentActions.updateDocument(form));
  }

  public getDocumentList(form: any): void {
    this.appState$.dispatch(new documentActions.GetDocumentList(form));
  }

  public getDocumentListCount(form: any = {}): void {
    this.appState$.dispatch(new documentActions.GetDocumentListCount(form));
  }

  public getDocumentDetail(form: any): void {
    this.appState$.dispatch(new documentActions.GetDocumentDetail(form));
  }

  public getDocumentStatusChange(form: any): void {
    this.appState$.dispatch(new documentActions.DocumentStatusChange(form));
  }

  public downloadDocument(params) {
    this.appState$.dispatch(
      new documentActions.DownloadDocument(params)
    );
  }
  public clearInvoice(params) {
    this.appState$.dispatch(
      new documentActions.ClearInvoice(params)
    );
  }

}
