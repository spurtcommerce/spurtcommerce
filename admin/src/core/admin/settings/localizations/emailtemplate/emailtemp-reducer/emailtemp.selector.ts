/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { AppState } from '../../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromEmailTemp from '../emailtemp-reducer/emailtemp.reducer';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getEmailTempState = (state: AppState) => state.emailtemp;
export const getemailtemplst = createSelector(
  getEmailTempState,
  fromEmailTemp.getemailtemplist
);
export const getemailtemppagination = createSelector(
  getEmailTempState,
  fromEmailTemp.getemailtempagination
);
export const getaddemailtemp = createSelector(
  getEmailTempState,
  fromEmailTemp.getAddEmailTemp
);
export const getupdateemailtemp = createSelector(
  getEmailTempState,
  fromEmailTemp.getupdateemailtemp
);
export const getdeleteemailtemp = createSelector(
  getEmailTempState,
  fromEmailTemp.getdeleteemailtemp
);

export const EmailTempListLoading = createSelector(
  getEmailTempState,
  fromEmailTemp.getEmailTempListLoading
);
export const EmailTempListLoaded = createSelector(
  getEmailTempState,
  fromEmailTemp.getEmailTempListLoaded
);
export const EmailTempListFailed = createSelector(
  getEmailTempState,
  fromEmailTemp.getEmailTempListFailed
);

export const EmailTempCountLoading = createSelector(
  getEmailTempState,
  fromEmailTemp.getEmailTempCountLoading
);
export const EmailTempCountLoaded = createSelector(
  getEmailTempState,
  fromEmailTemp.getEmailTempCountLoaded
);
export const EmailTempCountFailed = createSelector(
  getEmailTempState,
  fromEmailTemp.getEmailTempCountFailed
);

export const EmailTempAddLoading = createSelector(
  getEmailTempState,
  fromEmailTemp.getEmailTempAddLoading
);
export const EmailTempAddLoaded = createSelector(
  getEmailTempState,
  fromEmailTemp.getEmailTempAddLoaded
);
export const EmailTempAddFailed = createSelector(
  getEmailTempState,
  fromEmailTemp.getEmailTempAddFailed
);

export const EmailTempDeleteLoading = createSelector(
  getEmailTempState,
  fromEmailTemp.getEmailTempDeleteLoading
);
export const EmailTempDeleteLoaded = createSelector(
  getEmailTempState,
  fromEmailTemp.getEmailTempDeleteLoaded
);
export const EmailTempDeleteFailed = createSelector(
  getEmailTempState,
  fromEmailTemp.getEmailTempDeleteFailed
);

export const EmailTempUpdateLoading = createSelector(
  getEmailTempState,
  fromEmailTemp.getEmailTempUpdateLoading
);
export const EmailTempUpdateLoaded = createSelector(
  getEmailTempState,
  fromEmailTemp.getEmailTempUpdateLoaded
);
export const EmailTempUpdateFailed = createSelector(
  getEmailTempState,
  fromEmailTemp.getEmailTempUpdateFailed
);
