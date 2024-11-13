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
import * as frompageGroup from './page-group.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */

export const getpageState = (state: AppState) => state.pageGroup;


export const pageGroupList = createSelector(
  getpageState,
  frompageGroup.pageGroupList
);
export const pageGroupListLoading = createSelector(
  getpageState,
  frompageGroup.pageGroupListLoading
);
export const pageGroupListLoaded = createSelector(
  getpageState,
  frompageGroup.pageGroupListLoaded
);

export const pageGroupListCount = createSelector(
  getpageState,
  frompageGroup.pageGroupListCount
);

export const addPages = createSelector(
  getpageState,
  frompageGroup.addPages
);



export const addPagesStatus = createSelector(
  getpageState,
  frompageGroup.addPagesStatus
);
export const updatePages = createSelector(
  getpageState,
  frompageGroup.updatePages
);


export const pageGroupDelete = createSelector(
  getpageState,
  frompageGroup.pageGroupDelete
);
export const pageActiveCount = createSelector(
  getpageState,
  frompageGroup.pageActiveCount
);
export const pageInactiveCount = createSelector(
  getpageState,
  frompageGroup.pageInactiveCount
);

export const pageCount = createSelector(
  getpageState,
  frompageGroup.pageCount
);
export const pageCountLoading = createSelector(
  getpageState,
  frompageGroup.pageCountLoading
);
export const pageCountLoaded = createSelector(
  getpageState,
  frompageGroup.pageCountLoaded
);
export const pageCountFailed = createSelector(
  getpageState,
  frompageGroup.pageCountFailed
);

export const pageDetails = createSelector(
  getpageState,
  frompageGroup.pageDetails
);
export const pageDetailsLoading = createSelector(
  getpageState,
  frompageGroup.pageDetailsLoading
);
export const pageDetailsLoaded = createSelector(
  getpageState,
  frompageGroup.pageDetailsLoaded
);
export const pageDetailsFailed = createSelector(
  getpageState,
  frompageGroup.pageDetailsFailed
);

export const pageGroupCount = createSelector(
  getpageState,
  frompageGroup.pageGroupCount
);
export const pageGroupCountLoading = createSelector(
  getpageState,
  frompageGroup.pageGroupCountLoading
);
export const pageGroupCountLoaded = createSelector(
  getpageState,
  frompageGroup.pageGroupCountLoaded
);
export const pageGroupCountFailed = createSelector(
  getpageState,
  frompageGroup.pageGroupCountFailed
);

// pageGroupLocalizationList
export const pageGroupLocalizationList = createSelector(getpageState, frompageGroup.pageGroupLocalizationList);
export const pageGroupLocalizationListLoading = createSelector(getpageState, frompageGroup.pageGroupLocalizationListLoading);
export const pageGroupLocalizationListLoaded = createSelector(getpageState, frompageGroup.pageGroupLocalizationListLoaded);
export const pageGroupLocalizationListFailed = createSelector(getpageState, frompageGroup.pageGroupLocalizationListFailed);

// pageGroupLocalizationCount
export const pageGroupLocalizationCount = createSelector(getpageState, frompageGroup.pageGroupLocalizationCount);
export const pageGroupLocalizationCountLoading = createSelector(getpageState, frompageGroup.pageGroupLocalizationCountLoading);
export const pageGroupLocalizationCountLoaded = createSelector(getpageState, frompageGroup.pageGroupLocalizationCountLoaded);
export const pageGroupLocalizationCountFailed = createSelector(getpageState, frompageGroup.pageGroupLocalizationCountFailed);

// pageGroupLocalizationDetail
export const pageGroupLocalizationDetail = createSelector(getpageState, frompageGroup.pageGroupLocalizationDetail);
export const pageGroupLocalizationDetailLoading = createSelector(getpageState, frompageGroup.pageGroupLocalizationDetailLoading);
export const pageGroupLocalizationDetailLoaded = createSelector(getpageState, frompageGroup.pageGroupLocalizationDetailLoaded);
export const pageGroupLocalizationDetailFailed = createSelector(getpageState, frompageGroup.pageGroupLocalizationDetailFailed);

// pageGroupLocalizationCreate
export const pageGroupLocalizationCreate = createSelector(getpageState, frompageGroup.pageGroupLocalizationCreate);
export const pageGroupLocalizationCreateLoading = createSelector(getpageState, frompageGroup.pageGroupLocalizationCreateLoading);
export const pageGroupLocalizationCreateLoaded = createSelector(getpageState, frompageGroup.pageGroupLocalizationCreateLoaded);
export const pageGroupLocalizationCreateFailed = createSelector(getpageState, frompageGroup.pageGroupLocalizationCreateFailed);
