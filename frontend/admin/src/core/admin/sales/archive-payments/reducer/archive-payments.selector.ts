/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { AppState } from '../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromArchivePayment from './archive-payments.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */

export const archivePaymentState = (state: AppState) => state.archivePayment;

export const archivePaymentList = createSelector(archivePaymentState, fromArchivePayment.archivePaymentList);
export const archivePaymentListLoading = createSelector(archivePaymentState, fromArchivePayment.archivePaymentListLoading);
export const archivePaymentListLoaded = createSelector(archivePaymentState, fromArchivePayment.archivePaymentListLoaded);

export const archivePaymentListCount = createSelector(archivePaymentState, fromArchivePayment.archivePaymentListCount);
export const archivePaymentListCountLoading = createSelector(archivePaymentState, fromArchivePayment.archivePaymentListCountLoading);
export const archivePaymentListCountLoaded = createSelector(archivePaymentState, fromArchivePayment.archivePaymentListCountLoaded);

export const exportExcel = createSelector(archivePaymentState, fromArchivePayment.exportExcel);
export const exportExcelLoaded = createSelector(archivePaymentState, fromArchivePayment.exportExcelLoaded);
export const exportExcelLoading = createSelector(archivePaymentState,fromArchivePayment.exportExcelLoading)