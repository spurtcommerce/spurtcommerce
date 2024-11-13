/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { createSelector } from 'reselect';
import * as fromSetting from './vendor-setting.reducer';
import { AppState } from '../../../../../app.state.interface';

export const getSettingState = (state: AppState) => state.setting;

export const getSettingList = createSelector(
  getSettingState,
  fromSetting.getSettingList
);

export const getSettingListLoading = createSelector(
  getSettingState,
  fromSetting.getSettingListLoading
);
export const getSettingListLoaded = createSelector(
  getSettingState,
  fromSetting.getSettingListLoaded
);
export const getSettingListFailed = createSelector(
  getSettingState,
  fromSetting.getSettingListFailed
);

export const pageDetail = createSelector(
  getSettingState,
  fromSetting.getPageDetail
);
export const pageDetailLoadingStatus = createSelector(
  getSettingState,
  fromSetting.getpageDetailLoadingStatus
);
export const pageDetailLoadedStatus = createSelector(
  getSettingState,
  fromSetting.getpageDetailLoadedStatus
);
export const pageDetailFailedStatus = createSelector(
  getSettingState,
  fromSetting.getpageDetailFailedStatus
);

export const getCategoryListResponse = createSelector(
  getSettingState,
  fromSetting.getCategoryListResponse
);
export const getTempCategoryListResponse = createSelector(
  getSettingState,
  fromSetting.getTempCategoryListResponse
);
export const getCategoryListRequestLoading = createSelector(
  getSettingState,
  fromSetting.getCategoryListRequestLoading
);
export const getCategoryListRequestLoaded = createSelector(
  getSettingState,
  fromSetting.getCategoryListRequestLoaded
);
export const getCategoryListRequestFailed = createSelector(
  getSettingState,
  fromSetting.getCategoryListRequestFailed
);

export const getCategoryAddResponse = createSelector(
  getSettingState,
  fromSetting.getCategoryAddResponse
);
export const getCategoryAddRequestLoading = createSelector(
  getSettingState,
  fromSetting.getCategoryAddRequestLoading
);
export const getCategoryAddRequestLoaded = createSelector(
  getSettingState,
  fromSetting.getCategoryAddRequestLoaded
);
export const getCategoryAddRequestFailed = createSelector(
  getSettingState,
  fromSetting.getCategoryAddRequestFailed
);

export const getCatListResponse = createSelector(
  getSettingState,
  fromSetting.getCatListResponse
);
export const getCatListRequestLoading = createSelector(
  getSettingState,
  fromSetting.getCatListRequestLoading
);
export const getCatListRequestLoaded = createSelector(
  getSettingState,
  fromSetting.getCatListRequestLoaded
);
export const getCatListRequestFailed = createSelector(
  getSettingState,
  fromSetting.getCatListRequestFailed
);

export const getDeleteCategoriesResponse = createSelector(
  getSettingState,
  fromSetting.getDeleteCategoriesResponse
);
export const getDeleteCategoriesRequestLoading = createSelector(
  getSettingState,
  fromSetting.getDeleteCategoriesRequestLoading
);
export const getDeleteCategoriesRequestLoaded = createSelector(
  getSettingState,
  fromSetting.getDeleteCategoriesRequestLoaded
);
export const getDeleteCategoriesRequestFailed = createSelector(
  getSettingState,
  fromSetting.getDeleteCategoriesRequestFailed
);

export const getUpdateCategoriesResponse = createSelector(
  getSettingState,
  fromSetting.getUpdateCategoriesResponse
);
export const getUpdateCategoriesRequestLoading = createSelector(
  getSettingState,
  fromSetting.getUpdateCategoriesRequestLoading
);
export const getUpdateCategoriesRequestLoaded = createSelector(
  getSettingState,
  fromSetting.getUpdateCategoriesRequestLoaded
);
export const getUpdateCategoriesRequestFailed = createSelector(
  getSettingState,
  fromSetting.getUpdateCategoriesRequestFailed
);



export const getSetCommissionResponse = createSelector(
  getSettingState,
  fromSetting.getSetCommissionResponse
);
export const getSetCommissionLoading = createSelector(
  getSettingState,
  fromSetting.getSetCommissionLoading
);
export const getSetCommissionLoaded = createSelector(
  getSettingState,
  fromSetting.getSetCommissionLoaded
);
export const getSetCommissionFailed = createSelector(
  getSettingState,
  fromSetting.getSetCommissionFailed
);




export const getCommissionResponse = createSelector(
  getSettingState,
  fromSetting.getCommissionResponse
);
export const getCommissionLoading = createSelector(
  getSettingState,
  fromSetting.getCommissionLoading
);
export const getCommissionLoaded = createSelector(
  getSettingState,
  fromSetting.getCommissionLoaded
);
export const getCommissionFailed = createSelector(
  getSettingState,
  fromSetting.getCommissionFailed
);
