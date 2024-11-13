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
import * as frompages from './pages.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */

export const getpageState = (state: AppState) => state.pages;


export const pagesList = createSelector(
  getpageState,
  frompages.pagesList
);
export const pagesListLoading = createSelector(
  getpageState,
  frompages.pagesListLoading
);
export const pagesListLoaded = createSelector(
  getpageState,
  frompages.pagesListLoaded
);


export const pagesListCount = createSelector(
  getpageState,
  frompages.pagesListCount
);


export const addPages = createSelector(
  getpageState,
  frompages.addPages
);
export const pagesAddLoading = createSelector(
  getpageState,
  frompages.pagesAddLoading
);
export const pagesAddLoaded = createSelector(
  getpageState,
  frompages.pagesAddLoaded
);



export const updatePages = createSelector(
  getpageState,
  frompages.updatePages
);
export const pagesUpdateLoading = createSelector(
  getpageState,
  frompages.pagesUpdateLoading
);
export const pagesUpdateLoaded = createSelector(
  getpageState,
  frompages.pagesUpdateLoaded
);


export const pagesDelete = createSelector(
  getpageState,
  frompages.pagesDelete
);

export const pageDetailsLoaded = createSelector(
  getpageState,
  frompages.pageDetailsLoaded
);
export const pagesDeleteLoading = createSelector(
  getpageState,
  frompages.pagesDeleteLoading
);



export const addPagesStatus = createSelector(
  getpageState,
  frompages.addPagesStatus
);



export const pageActiveCount = createSelector(
  getpageState,
  frompages.pageActiveCount
);
export const pageInactiveCount = createSelector(
  getpageState,
  frompages.pageInactiveCount
);


export const pageCount = createSelector(
  getpageState,
  frompages.pageCount
);
export const pageCountLoading = createSelector(
  getpageState,
  frompages.pageCountLoading
);
export const pageCountLoaded = createSelector(
  getpageState,
  frompages.pageCountLoaded
);
export const pageCountFailed = createSelector(
  getpageState,
  frompages.pageCountFailed
);

export const pageDetails = createSelector(
  getpageState,
  frompages.pageDetails
);
export const pageDetailsLoading = createSelector(
  getpageState,
  frompages.pageDetailsLoading
);

export const pageDetailsFailed = createSelector(
  getpageState,
  frompages.pageDetailsFailed
);

export const groupListLoading = createSelector(
  getpageState,
  frompages.groupListLoading
);
export const groupList = createSelector(
  getpageState,
  frompages.groupList
);

// pageLocalizationList
export const pageLocalizationList = createSelector(getpageState, frompages.pageLocalizationList);
export const pageLocalizationListLoading = createSelector(getpageState, frompages.pageLocalizationListLoading);
export const pageLocalizationListLoaded = createSelector(getpageState, frompages.pageLocalizationListLoaded);
export const pageLocalizationListFailed = createSelector(getpageState, frompages.pageLocalizationListFailed);

// pageLocalizationCount
export const pageLocalizationCount = createSelector(getpageState, frompages.pageLocalizationCount);
export const pageLocalizationCountLoading = createSelector(getpageState, frompages.pageLocalizationCountLoading);
export const pageLocalizationCountLoaded = createSelector(getpageState, frompages.pageLocalizationCountLoaded);
export const pageLocalizationCountFailed = createSelector(getpageState, frompages.pageLocalizationCountFailed);

// pageLocalizationDetail
export const pageLocalizationDetail = createSelector(getpageState, frompages.pageLocalizationDetail);
export const pageLocalizationDetailLoading = createSelector(getpageState, frompages.pageLocalizationDetailLoading);
export const pageLocalizationDetailLoaded = createSelector(getpageState, frompages.pageLocalizationDetailLoaded);
export const pageLocalizationDetailFailed = createSelector(getpageState, frompages.pageLocalizationDetailFailed);

// pageLocalizationCreate
export const pageLocalizationCreate = createSelector(getpageState, frompages.pageLocalizationCreate);
export const pageLocalizationCreateLoading = createSelector(getpageState, frompages.pageLocalizationCreateLoading);
export const pageLocalizationCreateLoaded = createSelector(getpageState, frompages.pageLocalizationCreateLoaded);
export const pageLocalizationCreateFailed = createSelector(getpageState, frompages.pageLocalizationCreateFailed);
