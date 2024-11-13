/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { createSelector } from 'reselect';

import * as fromEaring from './earning.reducer';
import { AppState } from '../../app.state.interface';

export const getState = (State: AppState) => State.earning;




/* get earning list*/
export const GetEarning = createSelector(getState,fromEaring.getGetEarning);
export const GetEarningLoading = createSelector(getState,fromEaring.getGetEarningLoading);
export const GetEarningLoaded = createSelector(getState,fromEaring.getGetEarningLoaded);
export const GetEarningFailed = createSelector(getState,fromEaring.getGetEarningFailed);



 /* get earning  count*/
export const GetEarningCount = createSelector(getState,fromEaring.getGetEarningCount);
export const GetEarningCountLoading = createSelector(getState,fromEaring.getGetEarningCountLoading);
export const GetEarningCountLoaded = createSelector(getState,fromEaring.getGetEarningCountLoaded);
export const GetEarningCountFailed = createSelector(getState,fromEaring.getGetEarningCountFailed);


 /*Exportexcel*/
 export const GetEarningExport = createSelector(getState,fromEaring.getGetEarningExport);
 export const GetEarningExportLoading = createSelector(getState,fromEaring.getGetEarningExportLoading);
 export const GetEarningExportLoaded = createSelector(getState,fromEaring.getGetEarningExportLoaded);
 export const GetEarningExportFailed = createSelector(getState,fromEaring.getGetEarningExportFailed);


