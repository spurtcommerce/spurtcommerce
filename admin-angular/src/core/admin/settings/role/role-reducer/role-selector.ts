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
import * as fromrole from './role.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */

export const getroleState = (state: AppState) => state.role;
export const getRoleList = createSelector(
  getroleState,
  fromrole.getRoleList
);
export const newRoleStatus = createSelector(
  getroleState,
  fromrole.getNewRoleStatus
);
export const getupdaterole = createSelector(
  getroleState,
  fromrole.getUpdateRole
);
export const getroleCount = createSelector(
  getroleState,
  fromrole.getRoleCount
);

export const RoleListLoading = createSelector(
  getroleState,
  fromrole.getpaginatioListLoading
);
export const RoleListLoaded = createSelector(
  getroleState,
  fromrole.getpaginatioListLoaded
);
export const RoleListFailed = createSelector(
  getroleState,
  fromrole.getpaginatioListFailed
);

export const RoleCountLoading = createSelector(
  getroleState,
  fromrole.getpaginatioCountLoading
);
export const RoleCountLoaded = createSelector(
  getroleState,
  fromrole.getpaginatioCountLoaded
);
export const RoleCountFailed = createSelector(
  getroleState,
  fromrole.getpaginatioCountFailed
);

export const RoleAddLoading = createSelector(
  getroleState,
  fromrole.getpaginatioAddLoading
);
export const RoleAddLoaded = createSelector(
  getroleState,
  fromrole.getpaginatioAddLoaded
);
export const RoleAddFailed = createSelector(
  getroleState,
  fromrole.getpaginatioAddFailed
);

export const RoleUpdateLoading = createSelector(
  getroleState,
  fromrole.getpaginatioUpdateLoading
);
export const RoleUpdateLoaded = createSelector(
  getroleState,
  fromrole.getpaginatioUpdateLoaded
);
export const RoleUpdateFailed = createSelector(
  getroleState,
  fromrole.getpaginatioUpdateFailed
);

export const RoleDelete = createSelector(
  getroleState,
  fromrole.getRoleDelete
);
