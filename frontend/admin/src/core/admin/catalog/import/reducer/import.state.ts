/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Map, Record } from 'immutable';

export interface ImportState extends Map<string, any> {
  downloadFileLoading:boolean;
  uploadFile: any;
  uploadFileLoading: any;
  uploadFileLoaded: any;
  uploadFileFailed: any;
  //getModulesList
  dataImports: {};
  dataImportsLoading: any;
  dataImportsLoaded: any;
  dataImportsFailed: any;


  //////////catagory


  dataImportsCatagory: {};
  dataImportsCatagoryLoading: any;
  dataImportsCatagoryLoaded: any;
  dataImportsCatagoryFailed: any;

  //getExportList
  dataImportsList: {},
  dataImportsListLoading: any,
  dataImportsListLoaded: any,
  dataImportsListFailed: any,


}

export const ImportStateRecord = Record({

  uploadFile: {},
  uploadFileLoading: false,
  uploadFileLoaded: false,
  uploadFileFailed: false,

  downloadFileLoading:false,



  // getModulesList
  dataImports: {},
  dataImportsLoading: false,
  dataImportsLoaded: false,
  dataImportsFailed: false,



  //////catagory

  dataImportsCatagory: {},
  dataImportsCatagoryLoading: false,
  dataImportsCatagoryLoaded: false,
  dataImportsCatagoryFailed: false,

  // getExportList
  dataImportsList: {},
  dataImportsListLoading: false,
  dataImportsListLoaded: false,
  dataImportsListFailed: false,

});
