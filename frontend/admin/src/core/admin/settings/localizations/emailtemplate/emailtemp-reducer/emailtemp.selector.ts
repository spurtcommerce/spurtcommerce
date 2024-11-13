/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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
export const emailTempList = createSelector(
  getEmailTempState,
  fromEmailTemp.emailTempList
);
export const emailTempPagination = createSelector(
  getEmailTempState,
  fromEmailTemp.emailTempPagination
);
export const getAddEmailTemp = createSelector(
  getEmailTempState,
  fromEmailTemp.getAddEmailTemp
);
export const updateEmailTemp = createSelector(
  getEmailTempState,
  fromEmailTemp.updateEmailTemp
);
export const emailTempDelete = createSelector(
  getEmailTempState,
  fromEmailTemp.emailTempDelete
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
