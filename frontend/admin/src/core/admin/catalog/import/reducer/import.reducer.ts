/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// action
import * as actions from '../action/import.action';
// state
import { ImportState, ImportStateRecord } from './import.state';

export const initialState: ImportState = new ImportStateRecord() as unknown as ImportState;

export function reducer(state = initialState, { type, payload }: any): ImportState {
  if (!type) {
    return state;
  }

  switch (type) {
   // <----------------ADD CATEGORY ------------------> //


   // getModulesList
   case actions.ActionTypes.DATA_IMPORTS: {
    return Object.assign({}, state, {
      dataImportsLoading: true,
      dataImportsLoaded: false,
      dataImportsFailed: false,
    });
  }

  case actions.ActionTypes.DATA_IMPORTS_SUCCESS: {
    return Object.assign({}, state, {
      dataImports: payload,
      dataImportsLoading: false,
      dataImportsLoaded: true,
      dataImportsFailed: false,
    });
  }
  case actions.ActionTypes.DATA_IMPORTS_FAIL: {
    return Object.assign({}, state, {
      dataImportsLoading: false,
      dataImportsLoaded: false,
      dataImportsFailed: true,
    });
  }



  //////////catagory



    // getModulesList
    case actions.ActionTypes.DATA_IMPORTS_CATAGORY: {
      return Object.assign({}, state, {
        dataImportsCatagoryLoading: true,
        dataImportsCatagoryLoaded: false,
        dataImportsCatagoryFailed: false,
      });
    }
  
    case actions.ActionTypes.DATA_IMPORTS_CATAGORY_SUCCESS: {
      return Object.assign({}, state, {
        dataImportsCatagory: payload,
        dataImportsCatagoryLoading: false,
        dataImportsCatagoryLoaded: true,
        dataImportsCatagoryFailed: false,
      });
    }
    case actions.ActionTypes.DATA_IMPORTS_CATAGORY_FAIL: {
      return Object.assign({}, state, {
        dataImportsCatagoryLoading: false,
        dataImportsCatagoryLoaded: false,
        dataImportsCatagoryFailed: true,
      });
    }
  

  
  // getModulesList
  case actions.ActionTypes.DATA_IMPORTS_LIST: {
    return Object.assign({}, state, {
      dataImportsListLoading: true,
      dataImportsListLoaded: false,
      dataImportsListFailed: false,
    });
  }

  case actions.ActionTypes.DATA_IMPORTS_LIST_SUCCESS: {
    return Object.assign({}, state, {
      dataImportsList: payload,
      dataImportsListLoading: false,
      dataImportsListLoaded: true,
      dataImportsListFailed: false,
    });
  }
  case actions.ActionTypes.DATA_IMPORTS_LIST_FAIL: {
    return Object.assign({}, state, {
      dataImportsListLoading: false,
      dataImportsListLoaded: false,
      dataImportsListFailed: true,
    });
  }

///////////////////////////////////////
    case actions.ActionTypes.UPLOAD_FILE: {
      return Object.assign({}, state, {
        uploadFileLoading: true,
        uploadFileLoaded: false,
        uploadFileFailed: false,
      });
    }

    case actions.ActionTypes.UPLOAD_FILE_SUCCESS: {
      return Object.assign({}, state, {
        uploadFile: payload,
        uploadFileLoading: false,
        uploadFileLoaded: true,
        uploadFileFailed: false,
      });
    }
    case actions.ActionTypes.UPLOAD_FILE_FAIL: {
      return Object.assign({}, state, {
        uploadFileLoading: false,
        uploadFileLoaded: false,
        uploadFileFailed: true,
      });
    }
    case actions.ActionTypes.DOWNLOAD_FILE: {
      return Object.assign({}, state, {
        downloadFileLoading: true,
        downloadFileLoaded: false,
      });
    }

    case actions.ActionTypes.DOWNLOAD_FILE_SUCCESS: {
      return Object.assign({}, state, {
        downloadFileLoading: false,
        downloadFileLoaded: true,
        
      });
    }
    default: {
      return state;
    }
  }
}

export const uploadFile = (state: ImportState) => state.uploadFile;
export const uploadFileLoading = (state: ImportState) => state.uploadFileLoading;
export const uploadFileLoaded = (state: ImportState) => state.uploadFileLoaded;
export const uploadFileFailed = (state: ImportState) => state.uploadFileFailed;
export const downloadFileLoading =(state:ImportState)=> state.downloadFileLoading;


///////////////////DATA IMPORTS///////////////////////

export const dataImports = (state: ImportState) => state.dataImports;
export const dataImportsLoading = (state: ImportState) => state.dataImportsLoading;
export const dataImportsLoaded = (state: ImportState) => state.dataImportsLoaded;
export const dataImportsFailed = (state: ImportState) => state.dataImportsFailed;


//////////catagory

export const dataImportsCatagory = (state: ImportState) => state.dataImportsCatagory;
export const dataImportsCatagoryLoading = (state: ImportState) => state.dataImportsCatagoryLoading;
export const dataImportsCatagoryLoaded = (state: ImportState) => state.dataImportsCatagoryLoaded;
export const dataImportsCatagoryFailed = (state: ImportState) => state.dataImportsCatagoryFailed;




export const dataImportsList = (state: ImportState) => state.dataImportsList;
export const dataImportsListLoading = (state: ImportState) => state.dataImportsListLoading;
export const dataImportsListLoaded = (state: ImportState) => state.dataImportsListLoaded;
export const dataImportsListFailed = (state: ImportState) => state.dataImportsListFailed;





