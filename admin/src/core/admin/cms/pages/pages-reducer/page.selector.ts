/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
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
export const getpageslist = createSelector(
  getpageState,
  frompages.getpageslist
);
export const getpageslistloading = createSelector(
  getpageState,
  frompages.getpageslistloading
);
export const getpageslistloaded = createSelector(
  getpageState,
  frompages.getpageslistloaded
);
export const getpageslistfailed = createSelector(
  getpageState,
  frompages.getpageslistfailed
);

export const getpageslistcount = createSelector(
  getpageState,
  frompages.getpageslistcount
);
export const getpagescountfailed = createSelector(
  getpageState,
  frompages.getpagescountfailed
);
export const getpagescountloaded = createSelector(
  getpageState,
  frompages.getpagescountloaded
);
export const getpagescountloading = createSelector(
  getpageState,
  frompages.getpagescountloading
);

export const getaddPages = createSelector(
  getpageState,
  frompages.getaddPages
);
export const getpagesaddloading = createSelector(
  getpageState,
  frompages.getpagesaddloading
);
export const getpagesaddloaded = createSelector(
  getpageState,
  frompages.getpagesaddloaded
);
export const getpagesaddfailed = createSelector(
  getpageState,
  frompages.getpagesaddfailed
);

export const getpagesupdateloading = createSelector(
  getpageState,
  frompages.getpagesupdateloading
);
export const getpagesupdateloaded = createSelector(
  getpageState,
  frompages.getpagesupdateloaded
);
export const getpagesupdatefailed = createSelector(
  getpageState,
  frompages.getpagesupdatefailed
);

export const getpagesdeleteloading = createSelector(
  getpageState,
  frompages.getpagesdeleteloading
);
export const getpagesdeleteloaded = createSelector(
  getpageState,
  frompages.getpagesdeleteloaded
);
export const getpagesdeletefailed = createSelector(
  getpageState,
  frompages.getpagesdeletefailed
);

export const getaddpagesstatus = createSelector(
  getpageState,
  frompages.getaddpagesstatus
);
export const getupdatepages = createSelector(
  getpageState,
  frompages.getupdatepages
);
export const getpagesdelete = createSelector(
  getpageState,
  frompages.getpagesdelete
);
export const getActivePageCount = createSelector(
  getpageState,
  frompages.getActiveCount
);
export const getInactivePageCount = createSelector(
  getpageState,
  frompages.getInactiveCount
);
