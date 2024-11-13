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
import * as actions from '../document-action/document-action';
import { DocumentService } from '../document.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Injectable()
export class DocumentEffects {
  constructor(
    private action$: Actions,
    public router: Router,
    private documentService: DocumentService
  ) { }

  
  // getDocumentListData
  getDocumentListData$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_DOCUMENT_LIST_DATA),
    map((action: actions.getDocumentListData) => action.payload),
    switchMap(state => {
      return this.documentService.getDocumentListData(state).pipe(
        switchMap(response => [new actions.getDocumentListDataSuccess(response)]),
        catchError(error => of(new actions.getDocumentListDataFail(error)))
      );
    })
  ));

  // updateDocument
  updateDocument$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.UPDATE_DOCUMENT),
    map((action: actions.updateDocument) => action.payload),
    switchMap(state => {
      return this.documentService.updateDocument(state).pipe(
        switchMap(response => [new actions.updateDocumentSuccess(response)]),
        catchError(error => of(new actions.updateDocumentFail(error)))
      );
    })
  ));

  documentList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_DOCUMENT_LIST),
    map((action: actions.GetDocumentList) => action.payload),
    switchMap(state => {
      return this.documentService.documentList(state).pipe(
        switchMap(response => [new actions.GetDocumentListSuccess(response)]),
        catchError(error => of(new actions.GetDocumentListFail(error)))
      );
    })
  ));

  
  documentListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_DOCUMENT_LIST_COUNT),
    map((action: actions.GetDocumentListCount) => action.payload),
    switchMap(state => {
      return this.documentService.documentListCount(state).pipe(
        switchMap(response => [new actions.GetDocumentListCountSuccess(response)]),
        catchError(error => of(new actions.GetDocumentListCountFail(error)))
      );
    })
  ));

  
  documentDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_DOCUMENT_DETAIL),
    map((action: actions.GetDocumentDetail) => action.payload),
    switchMap(state => {
      return this.documentService.documentDetail(state).pipe(
        switchMap(response => [new actions.GetDocumentDetailSuccess(response)]),
        catchError(error => of(new actions.GetDocumentDetailFail(error)))
      );
    })
  ));

  
  documentStatusChange$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DOCUMENT_STATUS_CHANGE),
    map((action: actions.DocumentStatusChange) => action.payload),
    switchMap(state => {
      return this.documentService.documentStatusChange(state).pipe(
        switchMap(response => [new actions.DocumentStatusChangeSuccess(response)]),
        catchError(error => of(new actions.DocumentStatusChangeFail(error)))
      );
    })
  ));

  
  getInvoiceDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DOWNLOAD_DOCUMENT),
    map((action: actions.DownloadDocument) => action.payload),
    switchMap(state => {
      return this.documentService.downloadDocument(state).pipe(
        tap(data => {
          const filename = 'SellerCertificate' + Date.now();
          const blob = new Blob([data], { type: data.type });
          saveAs(blob, filename);
        }),
        switchMap(SettingList => [
          new actions.DownloadDocumentSuccess(SettingList)
        ]),
        catchError(error => of(new actions.DownloadDocumentFail(error)))
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
