/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { createSelector } from 'reselect';
import * as fromDocument from './document.reducer';
import { AppState } from '../../../../../app.state.interface';

export const getDocumentState = (state: AppState) => state.document;

// getDocumentListData
export const getDocumentListData = createSelector(getDocumentState, fromDocument.getDocumentListData);
export const getDocumentListDataLoading = createSelector(getDocumentState, fromDocument.getDocumentListDataLoading);
export const getDocumentListDataLoaded = createSelector(getDocumentState, fromDocument.getDocumentListDataLoaded);
export const getDocumentListDataFailed = createSelector(getDocumentState, fromDocument.getDocumentListDataFailed);

// updateDocument
export const updateDocument = createSelector(getDocumentState, fromDocument.updateDocument);
export const updateDocumentLoading = createSelector(getDocumentState, fromDocument.updateDocumentLoading);
export const updateDocumentLoaded = createSelector(getDocumentState, fromDocument.updateDocumentLoaded);
export const updateDocumentFailed = createSelector(getDocumentState, fromDocument.updateDocumentFailed);


export const getDocumentList = createSelector(getDocumentState, fromDocument.getDocumentList);
export const getDocumentListLoading = createSelector(getDocumentState, fromDocument.getDocumentListLoading);
export const getDocumentListLoaded = createSelector(getDocumentState, fromDocument.getDocumentListLoaded);
export const getDocumentListFailed = createSelector(getDocumentState, fromDocument.getDocumentListFailed);

export const getDocumentListCount = createSelector(getDocumentState, fromDocument.getDocumentListCount);
export const getDocumentListCountLoading = createSelector(getDocumentState, fromDocument.getDocumentListCountLoading);
export const getDocumentListCountLoaded = createSelector(getDocumentState, fromDocument.getDocumentListCountLoaded);
export const getDocumentListCountFailed = createSelector(getDocumentState, fromDocument.getDocumentListCountFailed);

export const getDocumentDetail = createSelector(getDocumentState, fromDocument.getDocumentDetail);
export const getDocumentDetailLoading = createSelector(getDocumentState, fromDocument.getDocumentDetailLoading);
export const getDocumentDetailLoaded = createSelector(getDocumentState, fromDocument.getDocumentDetailLoaded);
export const getDocumentDetailFailed = createSelector(getDocumentState, fromDocument.getDocumentDetailFailed);


export const totalAmount = createSelector(getDocumentState, fromDocument.totalAmount);
export const totalOrder = createSelector(getDocumentState, fromDocument.totalOrder);
export const totalCommission = createSelector(getDocumentState, fromDocument.totalCommission);
export const totalVendor = createSelector(getDocumentState, fromDocument.totalVendor);
export const getDocumentDashboardCountLoading = createSelector(getDocumentState, fromDocument.getDocumentDashboardCountLoading);
export const getDocumentDashboardCountLoaded = createSelector(getDocumentState, fromDocument.getDocumentDashboardCountLoaded);
export const getDocumentDashboardCountFailed = createSelector(getDocumentState, fromDocument.getDocumentDashboardCountFailed);

export const documentStatusChangeLoaded = createSelector(getDocumentState, fromDocument.documentStatusChangeLoaded);

