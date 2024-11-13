/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

// store
import {type} from '../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';

export const ActionTypes = {

  DOWNLOAD_FILE: type('[Import] Download File'),
  DOWNLOAD_FILE_SUCCESS: type('[Import] Download File Success'),
  DOWNLOAD_FILE_FAIL: type('[Import] Download File Fail'),

  UPLOAD_FILE: type('[Import] Upload File'),
  UPLOAD_FILE_SUCCESS: type('[Import] Upload File Success'),
  UPLOAD_FILE_FAIL: type('[Import] Upload File Fail'),

  //DATa IMPORS

    // getModulesList
     DATA_IMPORTS: type('[Import] DATA_IMPORTS'),
     DATA_IMPORTS_SUCCESS: type('[Import] DATA_IMPORTS Success'),
     DATA_IMPORTS_FAIL: type('[Import] DATA_IMPORTS Fail'),


/////Catagory

// getModulesList
DATA_IMPORTS_CATAGORY: type('[Import] DATA_IMPORTS_CATAGORY'),
DATA_IMPORTS_CATAGORY_SUCCESS: type('[Import] DATA_IMPORTS_CATAGORY_SUCCESS'),
DATA_IMPORTS_CATAGORY_FAIL: type('[Import] DATA_IMPORTS_CATAGORY_FAIL'),

  ///get data import

   DATA_IMPORTS_LIST: type('[Import] DATA_IMPORTS_LIST'),
   DATA_IMPORTS_LIST_SUCCESS: type('[Import] DATA_IMPORTS_LIST Success'),
   DATA_IMPORTS_LIST_FAIL: type('[Import] DATA_IMPORTS_LIST Fail'),

};

// Download File

export class DownloadFileAction implements Action {
  type = ActionTypes.DOWNLOAD_FILE;
  constructor(public payload: any = null) {}
}

export class  DownloadFileSuccessAction implements Action {
  type = ActionTypes.DOWNLOAD_FILE_SUCCESS;
  constructor(public payload: any) {}
}

export class  DownloadFileFailAction implements Action {
  type = ActionTypes.DOWNLOAD_FILE_FAIL;
  constructor(public payload: any = null) {}
}


// Upload File

export class UploadFileAction implements Action {
  type = ActionTypes.UPLOAD_FILE;
  constructor(public payload: any) {}
}

export class UploadFileSuccessAction implements Action {
  type = ActionTypes.UPLOAD_FILE_SUCCESS;
  constructor(public payload: any) {}
}

export class UploadFileFailAction implements Action {
  type = ActionTypes.UPLOAD_FILE_FAIL;
  constructor(public payload: any = null) {}
}




// Data Imports
// getModulesList
export class dataImports implements Action {
  type = ActionTypes.DATA_IMPORTS;
  constructor(public payload: any) { }
}

export class dataImportsSuccess implements Action {
  type = ActionTypes.DATA_IMPORTS_SUCCESS;
  constructor(public payload: any) { }
}

export class dataImportsFail implements Action {
  type = ActionTypes.DATA_IMPORTS_FAIL;
  constructor(public payload: any = null) { }
}


///////////catagory


export class dataImportsCatagory implements Action {
  type = ActionTypes.DATA_IMPORTS_CATAGORY;
  constructor(public payload: any) { }
}

export class dataImportsCatagorySuccess implements Action {
  type = ActionTypes.DATA_IMPORTS_CATAGORY_SUCCESS;
  constructor(public payload: any) { }
}

export class dataImportsCatagoryFail implements Action {
  type = ActionTypes.DATA_IMPORTS_CATAGORY_FAIL;
  constructor(public payload: any = null) { }
}




// getExportList
export class DataImportsList implements Action {
  type = ActionTypes.DATA_IMPORTS_LIST;
  constructor(public payload: any) { }
}

export class DataImportsListSuccess implements Action {
  type = ActionTypes.DATA_IMPORTS_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class DataImportsListFail implements Action {
  type = ActionTypes.DATA_IMPORTS_LIST_FAIL;
  constructor(public payload: any = null) { }
}



export type Actions =
  | DownloadFileAction
  | DownloadFileSuccessAction
  | DownloadFileFailAction
  | UploadFileAction
  | UploadFileSuccessAction
  | UploadFileFailAction
  | dataImports
  | dataImportsSuccess
  | dataImportsFail
  | DataImportsList
  | DataImportsListSuccess
  | DataImportsListFail
  | dataImportsCatagory
  | dataImportsCatagorySuccess
  | dataImportsCatagoryFail
