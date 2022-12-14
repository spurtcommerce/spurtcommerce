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
export const userPagination = createSelector(
  getUserState,
  fromUser.userPagination
);

export const userListLoading = createSelector(
  getUserState,
  fromUser.getUserListLoading
);
export const userListLoaded = createSelector(
  getUserState,
  fromUser.getUserListLoaded
);
export const userListFailed = createSelector(
  getUserState,
  fromUser.getUserListFailed
);

export const userCountLoading = createSelector(
  getUserState,
  fromUser.getUserCountLoading
);
export const userCountLoaded = createSelector(
  getUserState,
  fromUser.getUserCountLoaded
);
export const userCountFailed = createSelector(
  getUserState,
  fromUser.getUserCountFailed
);

export const userAddLoading = createSelector(
  getUserState,
  fromUser.getUserAddLoading
);
export const userAddLoaded = createSelector(
  getUserState,
  fromUser.getUserAddLoaded
);
export const userAddFailed = createSelector(
  getUserState,
  fromUser.getUserAddFailed
);

export const userGroupLoading = createSelector(
  getUserState,
  fromUser.getUserGroupLoading
);
export const userGroupLoaded = createSelector(
  getUserState,
  fromUser.getUserGroupLoaded
);
export const userGroupFailed = createSelector(
  getUserState,
  fromUser.getUserGroupFailed
);

export const userUpdateLoading = createSelector(
  getUserState,
  fromUser.getUserUpdateLoading
);
export const userUpdateLoaded = createSelector(
  getUserState,
  fromUser.getUserUpdateLoaded
);
export const userUpdateFailed = createSelector(
  getUserState,
  fromUser.getUserUpdateFailed
);
export const userDelate = createSelector(
  getUserState,
  fromUser.getUserDelate
);
