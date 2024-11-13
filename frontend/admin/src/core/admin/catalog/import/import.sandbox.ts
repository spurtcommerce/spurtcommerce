/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
// store
import { Store } from '@ngrx/store';
// app state
import * as store from '../../../app.state.interface';
// action
import * as importActions from './action/import.action';
// selectors
import { uploadFile ,downloadFileLoading,uploadFileLoading,dataImportsList, dataImportsListFailed, dataImportsListLoaded, dataImportsListLoading,dataImports, dataImportsFailed, dataImportsLoaded, dataImportsLoading,dataImportsCatagory, dataImportsCatagoryFailed, dataImportsCatagoryLoaded, dataImportsCatagoryLoading,} from './reducer/import.selectors';

@Injectable()
export class ImportSandbox {


//getModulesList
public dataImports$ = this.appState.select(dataImports);
public dataImportsLoading = this.appState.select(dataImportsLoading);
public dataImportsLoaded = this.appState.select(dataImportsLoaded);
public dataImportsFailed = this.appState.select(dataImportsFailed);


public dataImportsCatagory$ = this.appState.select(dataImportsCatagory);
public dataImportsCatagoryLoading = this.appState.select(dataImportsCatagoryLoading);
public dataImportsCatagoryLoaded = this.appState.select(dataImportsCatagoryLoaded);
public dataImportsCatagoryFailed = this.appState.select(dataImportsCatagoryFailed);

   //getExportList
   public dataImportsList$ = this.appState.select(dataImportsList);
   public dataImportsListLoading = this.appState.select(dataImportsListLoading);
   public dataImportsListLoaded = this.appState.select(dataImportsListLoaded);
   public dataImportsListFailed = this.appState.select(dataImportsListFailed);
 

  public uploadFile$ = this.appState.select(uploadFile);
  public downloadFileLoading$ =this.appState.select(downloadFileLoading);
  public uploadFileLoading$=this.appState.select(uploadFileLoading)

  constructor(protected appState: Store<store.AppState>) {}

  public downloadFile({}) {
    this.appState.dispatch(new importActions.DownloadFileAction({}));
  }

  public uploadFile(data) {
    this.appState.dispatch(new importActions.UploadFileAction(data));
    }


    public dataImports(data) {
      this.appState.dispatch(new importActions.dataImports(data));
    }


    public dataImportsCatagory(data) {
      this.appState.dispatch(new importActions.dataImportsCatagory(data));
    }
      public dataImportsList(data) {
        this.appState.dispatch(new importActions.DataImportsList(data));
      }
}
