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
import * as fromUser from './user.reducer';

export const getUserState = (state: AppState) => state.user;
export const getGroupList = createSelector(
  getUserState,
  fromUser.getUserGroupList
);
export const getUsersList = createSelector(
  getUserState,
  fromUser.getUserList
);
export const getAddUser = createSelector(
  getUserState,
  fromUser.getNewUser
);
export const getAddUserData = createSelector(
  getUserState,
  fromUser.getNewUserData
);
export const getUpdateUser = createSelector(
  getUserState,
  fromUser.getUpdateUser
);
export const getuserpagination = createSelector(
  getUserState,
  fromUser.getuserspagination
);

export const UserListLoading = createSelector(
  getUserState,
  fromUser.getUserListLoading
);
export const UserListLoaded = createSelector(
  getUserState,
  fromUser.getUserListLoaded
);
export const UserListFailed = createSelector(
  getUserState,
  fromUser.getUserListFailed
);

export const UserCountLoading = createSelector(
  getUserState,
  fromUser.getUserCountLoading
);
export const UserCountLoaded = createSelector(
  getUserState,
  fromUser.getUserCountLoaded
);
export const UserCountFailed = createSelector(
  getUserState,
  fromUser.getUserCountFailed
);

export const UserAddLoading = createSelector(
  getUserState,
  fromUser.getUserAddLoading
);
export const UserAddLoaded = createSelector(
  getUserState,
  fromUser.getUserAddLoaded
);
export const UserAddFailed = createSelector(
  getUserState,
  fromUser.getUserAddFailed
);

export const UserGroupLoading = createSelector(
  getUserState,
  fromUser.getUserGroupLoading
);
export const UserGroupLoaded = createSelector(
  getUserState,
  fromUser.getUserGroupLoaded
);
export const UserGroupFailed = createSelector(
  getUserState,
  fromUser.getUserGroupFailed
);

export const UserUpdateLoading = createSelector(
  getUserState,
  fromUser.getUserUpdateLoading
);
export const UserUpdateLoaded = createSelector(
  getUserState,
  fromUser.getUserUpdateLoaded
);
export const UserUpdateFailed = createSelector(
  getUserState,
  fromUser.getUserUpdateFailed
);
export const UserDelate = createSelector(
  getUserState,
  fromUser.getUserDelate
);
