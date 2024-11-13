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
import { tap } from 'rxjs/operators';
import { saveAs } from 'file-saver';


// actions
import * as actions from '../action/import.action';
import { catchError } from 'rxjs/operators';
// service
import { ImportService } from '../import.service';

@Injectable()
export class ImportEffects {

  constructor(private action$: Actions,
              private apiCli: ImportService) {}

  // Download File

  
  downloadFile$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DOWNLOAD_FILE),
    map((action: actions.DownloadFileAction) => action.payload),
    switchMap(state => {
      return this.apiCli.downloadFile(state).pipe(
        tap(data => {
          const blob = new Blob([data], {type: 'application/zip'});
          const fileName = 'products.zip';
          saveAs(blob, fileName);
        }),
        switchMap(user => [new actions.DownloadFileSuccessAction(user)]),
        catchError(error => of(new actions.DownloadFileFailAction(error)))
      );
    })
  ));

  // Upload File

  
  uploadFile$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.UPLOAD_FILE),
    map((action: actions.UploadFileAction) => action.payload),
    switchMap(state => {
      return this.apiCli.uploadFile(state).pipe(
        switchMap(user => [new actions.UploadFileSuccessAction(user)]),
        catchError(error => of(new actions.UploadFileFailAction(error)))
      );
    })
  ));




  //  // DATA IMPORTS
  //  @Effect()
  //  dataImports$: Observable<Action> = this.action$.pipe(
  //    ofType(actions.ActionTypes.DATA_IMPORTS),
  //    map((action: actions.DataImportsAction) => action.payload),
  //    switchMap(state => {
  //      return this.apiCli.dataImports(state).pipe(
  //        switchMap(user => [new actions.DataImportsSuccessAction(user)]),
  //        catchError(error => of(new actions.DataImportsFailAction(error)))
  //      );
  //    })
  //  );


   
   dataImports$: Observable<Action> = createEffect(() => this.action$.pipe(
     ofType(actions.ActionTypes.DATA_IMPORTS),
     map((action: actions.dataImports) => action.payload),
     switchMap(state => {
       return this.apiCli.dataImports(state).pipe(
         switchMap(user => [new actions.dataImportsSuccess(user)]),
         catchError(error => of(new actions.dataImportsFail(error)))
       );
     })
   ));

   ///catagory


   
   dataImportsCatagory$: Observable<Action> = createEffect(() => this.action$.pipe(
     ofType(actions.ActionTypes.DATA_IMPORTS_CATAGORY),
     map((action: actions.dataImportsCatagory) => action.payload),
     switchMap(state => {
       return this.apiCli.dataImportsCatagory(state).pipe(
         switchMap(user => [new actions.dataImportsCatagorySuccess(user)]),
         catchError(error => of(new actions.dataImportsCatagoryFail(error)))
       );
     })
   ));



   
   dataImportsList$: Observable<Action> = createEffect(() => this.action$.pipe(
     ofType(actions.ActionTypes.DATA_IMPORTS_LIST),
     map((action: actions.DataImportsList) => action.payload),
     switchMap(state => {
       return this.apiCli.dataImportsList(state).pipe(
         switchMap(user => [new actions.DataImportsListSuccess(user)]),
         catchError(error => of(new actions.DataImportsListFail(error)))
       );
     })
   ));

   
  // @Effect()
  // dataImportsList$: Observable<Action> = this.action$.pipe(
  //   ofType(actions.ActionTypes.DATA_IMPORTS_LIST),
  //   map((action: actions.DataImportsList) => action.payload),
  //   switchMap(state => {
  //     return this.apiCli.dataImportsList(state).pipe(
  //       tap(data => {
  //         const filename = 'OrderExcel_' + Date.now() + '.xlsx';
  //         const blob = new Blob([data as any], { type: 'text/xlsx' });
  //         saveAs(blob, filename);
  //       }),
  //       switchMap(user => [new actions.DataImportsListSuccess(user)]),
  //       catchError(error => of(new actions.DataImportsListFail(error)))
  //     );
  //   })
  // );

    //  getdataimport

  // @Effect()
  // dataImportsList$: Observable<Action> = this.action$.pipe(
  //   ofType(actions.ActionTypes.DATA_IMPORTS_LIST),
  //   map((action: actions.DataImportsList) => action.payload),
  //   switchMap(state => {
  //     return this.apiCli.dataImportsList(state).pipe(
  //       switchMap(user => [new actions.DataImportsListSuccess(user)]),
  //       catchError(error => of(new actions.DataImportsListFail(error)))
  //     );
  //   })
  // );


}
