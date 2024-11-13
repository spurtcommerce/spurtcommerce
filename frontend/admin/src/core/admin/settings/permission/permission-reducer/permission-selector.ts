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
import * as frompermission from '../permission-reducer/permission.reducer';


export const getpermissionState = (state: AppState) => state.permission;
export const getPermissionList = createSelector(
  getpermissionState,
  frompermission.getPermissionList
);
export const newPermissionStatus = createSelector(
  getpermissionState,
  frompermission.getNewPermissionStatus
);
export const getUpdatePermission = createSelector(
  getpermissionState,
  frompermission.getUpdatePermission
);
export const getPermissionCount = createSelector(
  getpermissionState,
  frompermission.getPermissionCount
);

export const PermissionListLoading = createSelector(
  getpermissionState,
  frompermission.getpaginatioListLoading
);
export const PermissionListLoaded = createSelector(
  getpermissionState,
  frompermission.getpaginatioListLoaded
);
export const PermissionListFailed = createSelector(
  getpermissionState,
  frompermission.getpaginatioListFailed
);

export const PermissionCountLoading = createSelector(
  getpermissionState,
  frompermission.getpaginatioCountLoading
);
export const PermissionCountLoaded = createSelector(
  getpermissionState,
  frompermission.getpaginatioCountLoaded
);
export const PermissionCountFailed = createSelector(
  getpermissionState,
  frompermission.getpaginatioCountFailed
);

export const PermissionAddLoading = createSelector(
  getpermissionState,
  frompermission.getpaginatioAddLoading
);
export const PermissionAddLoaded = createSelector(
  getpermissionState,
  frompermission.getpaginatioAddLoaded
);
export const PermissionAddFailed = createSelector(
  getpermissionState,
  frompermission.getpaginatioAddFailed
);

export const PermissionUpdateLoading = createSelector(
  getpermissionState,
  frompermission.getpaginatioUpdateLoading
);
export const PermissionUpdateLoaded = createSelector(
  getpermissionState,
  frompermission.getpaginatioUpdateLoaded
);
export const PermissionUpdateFailed = createSelector(
  getpermissionState,
  frompermission.getpaginatioUpdateFailed
);

export const PermissionGet = createSelector(
  getpermissionState,
  frompermission.getPermissionGet
);
export const PermissionLoading = createSelector(
  getpermissionState,
  frompermission.getPermissionLoading
);
export const PermissionLoaded = createSelector(
  getpermissionState,
  frompermission.getPermissionLoaded
);
export const PermissionFailed = createSelector(
  getpermissionState,
  frompermission.getPermissionFailed
);
