/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { createSelector } from 'reselect';
import * as fromPayment from './payment.reducer';
import { AppState } from '../../../../../app.state.interface';

export const getPaymentState = (state: AppState) => state.payment;

export const exportExcelLoading = createSelector(getPaymentState, fromPayment.exportExcelLoading);

export const getPaymentList = createSelector(getPaymentState, fromPayment.getPaymentList);
export const getPaymentListLoading = createSelector(getPaymentState, fromPayment.getPaymentListLoading);
export const getPaymentListLoaded = createSelector(getPaymentState, fromPayment.getPaymentListLoaded);
export const getPaymentListFailed = createSelector(getPaymentState, fromPayment.getPaymentListFailed);

export const getPaymentListCount = createSelector(getPaymentState, fromPayment.getPaymentListCount);
export const getPaymentListCountLoading = createSelector(getPaymentState, fromPayment.getPaymentListCountLoading);
export const getPaymentListCountLoaded = createSelector(getPaymentState, fromPayment.getPaymentListCountLoaded);
export const getPaymentListCountFailed = createSelector(getPaymentState, fromPayment.getPaymentListCountFailed);

export const getPaymentDetail = createSelector(getPaymentState, fromPayment.getPaymentDetail);
export const getPaymentDetailLoading = createSelector(getPaymentState, fromPayment.getPaymentDetailLoading);
export const getPaymentDetailLoaded = createSelector(getPaymentState, fromPayment.getPaymentDetailLoaded);
export const getPaymentDetailFailed = createSelector(getPaymentState, fromPayment.getPaymentDetailFailed);


export const paymentDashboardCount = createSelector(getPaymentState, fromPayment.paymentDashboardCount);
export const getPaymentDashboardCountLoading = createSelector(getPaymentState, fromPayment.getPaymentDashboardCountLoading);
export const getPaymentDashboardCountLoaded = createSelector(getPaymentState, fromPayment.getPaymentDashboardCountLoaded);
export const getPaymentDashboardCountFailed = createSelector(getPaymentState, fromPayment.getPaymentDashboardCountFailed);
