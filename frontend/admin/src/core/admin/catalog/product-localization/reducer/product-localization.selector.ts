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
import * as fromProductLocalization from './product-localization.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */

export const productLocalizationState = (state: AppState) => state.productLocalization;

// getProductLocalizationList
export const getProductLocalization = createSelector(productLocalizationState, fromProductLocalization.getProductLocalization);
export const getProductLocalizationLoading = createSelector(productLocalizationState, fromProductLocalization.getProductLocalizationLoading);
export const getProductLocalizationLoaded = createSelector(productLocalizationState, fromProductLocalization.getProductLocalizationLoaded);
export const getProductLocalizationFailed = createSelector(productLocalizationState, fromProductLocalization.getProductLocalizationFailed);

// getProductLocalizationCount
export const getProductLocalizationCount = createSelector(productLocalizationState, fromProductLocalization.getProductLocalizationCount);
export const getProductLocalizationCountLoading = createSelector(productLocalizationState, fromProductLocalization.getProductLocalizationCountLoading);
export const getProductLocalizationCountLoaded = createSelector(productLocalizationState, fromProductLocalization.getProductLocalizationCountLoaded);
export const getProductLocalizationCountFailed = createSelector(productLocalizationState, fromProductLocalization.getProductLocalizationCountFailed);

// ProductLocalizationDetail
export const productLocalizationDetail = createSelector(productLocalizationState, fromProductLocalization.productLocalizationDetail);
export const productLocalizationDetailLoading = createSelector(productLocalizationState, fromProductLocalization.productLocalizationDetailLoading);
export const productLocalizationDetailLoaded = createSelector(productLocalizationState, fromProductLocalization.productLocalizationDetailLoaded);
export const productLocalizationDetailFailed = createSelector(productLocalizationState, fromProductLocalization.productLocalizationDetailFailed);

// ProductLocalizationCreate
export const productLocalizationCreate = createSelector(productLocalizationState, fromProductLocalization.productLocalizationCreate);
export const productLocalizationCreateLoading = createSelector(productLocalizationState, fromProductLocalization.productLocalizationCreateLoading);
export const productLocalizationCreateLoaded = createSelector(productLocalizationState, fromProductLocalization.productLocalizationCreateLoaded);
export const productLocalizationCreateFailed = createSelector(productLocalizationState, fromProductLocalization.productLocalizationCreateFailed);
