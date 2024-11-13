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
import * as fromlanguage from '../languages-reducer/languages.reducer';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getLanguageState = (state: AppState) => state.language;


export const languageList = createSelector(
  getLanguageState,
  fromlanguage.languageList
);
export const languageUpdate = createSelector(
  getLanguageState,
  fromlanguage.languageUpdate
);
export const languagePagination = createSelector(
  getLanguageState,
  fromlanguage.languagePagination
);
export const languageAdd = createSelector(
  getLanguageState,
  fromlanguage.languageAdd
);
export const languageDelete = createSelector(
  getLanguageState,
  fromlanguage.languageDelete
);

export const languageListLoading = createSelector(
  getLanguageState,
  fromlanguage.getLanguageListLoading
);
export const languageListLoaded = createSelector(
  getLanguageState,
  fromlanguage.getLanguageListLoaded
);
export const languageListFailed = createSelector(
  getLanguageState,
  fromlanguage.getLanguageListFailed
);

export const languageCountLoading = createSelector(
  getLanguageState,
  fromlanguage.getLanguageCountLoading
);
export const languageCountLoaded = createSelector(
  getLanguageState,
  fromlanguage.getLanguageCountLoaded
);
export const languageCountFailed = createSelector(
  getLanguageState,
  fromlanguage.getLanguageCountFailed
);

export const languageAddLoading = createSelector(
  getLanguageState,
  fromlanguage.getLanguageAddLoading
);
export const languageAddLoaded = createSelector(
  getLanguageState,
  fromlanguage.getLanguageAddLoaded
);
export const languageAddFailed = createSelector(
  getLanguageState,
  fromlanguage.getLanguageAddFailed
);

export const languageDeleteLoading = createSelector(
  getLanguageState,
  fromlanguage.getLanguageDeleteLoading
);
export const languageDeleteLoaded = createSelector(
  getLanguageState,
  fromlanguage.getLanguageDeleteLoaded
);
export const languageDeleteFailed = createSelector(
  getLanguageState,
  fromlanguage.getLanguageDeleteFailed
);

export const languageUpdateLoading = createSelector(
  getLanguageState,
  fromlanguage.getLanguageUpdateLoading
);
export const languageUpdateLoaded = createSelector(
  getLanguageState,
  fromlanguage.getLanguageUpdateLoaded
);
export const languageUpdateFailed = createSelector(
  getLanguageState,
  fromlanguage.getLanguageUpdateFailed
);
