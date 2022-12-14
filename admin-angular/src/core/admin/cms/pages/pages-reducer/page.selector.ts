/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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

export const groupList = createSelector(
  getpageState,
  frompages.groupList
);
