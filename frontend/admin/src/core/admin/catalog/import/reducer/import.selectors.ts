/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { createSelector } from 'reselect';
import * as fromImport from './import.reducer';
// app state
import { AppState } from '../../../../app.state.interface';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getImportState = (state: AppState) => state.import;

export const uploadFile = createSelector(getImportState, fromImport.uploadFile);
export const uploadFileLoading = createSelector(getImportState, fromImport.uploadFileLoading);
export const uploadFileLoaded = createSelector(getImportState, fromImport.uploadFileLoaded);
export const uploadFileFailed = createSelector(getImportState, fromImport.uploadFileFailed);

export const downloadFileLoading = createSelector(getImportState, fromImport.downloadFileLoading);


////////DATA IMPORTS///////////

export const dataImports = createSelector(getImportState, fromImport.dataImports);
export const dataImportsLoading = createSelector(getImportState, fromImport.dataImportsLoading);
export const dataImportsLoaded = createSelector(getImportState, fromImport.dataImportsLoaded);
export const dataImportsFailed = createSelector(getImportState, fromImport.dataImportsFailed);

/////catagory

export const dataImportsCatagory = createSelector(getImportState, fromImport.dataImportsCatagory);
export const dataImportsCatagoryLoading = createSelector(getImportState, fromImport.dataImportsCatagoryLoading);
export const dataImportsCatagoryLoaded = createSelector(getImportState, fromImport.dataImportsCatagoryLoaded);
export const dataImportsCatagoryFailed = createSelector(getImportState, fromImport.dataImportsCatagoryFailed);

// getExportList
export const dataImportsList = createSelector(getImportState, fromImport.dataImportsList);
export const dataImportsListLoading = createSelector(getImportState, fromImport.dataImportsListLoading);
export const dataImportsListLoaded = createSelector(getImportState, fromImport.dataImportsListLoaded);
export const dataImportsListFailed = createSelector(getImportState, fromImport.dataImportsListFailed);



