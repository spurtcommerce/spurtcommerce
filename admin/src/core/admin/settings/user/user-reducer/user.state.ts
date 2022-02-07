/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';

export interface UserState extends Map<string, any> {
  userGroupList: any;
  updateUser: any;
  userList: any;
  userpagination: any;
  newUser: any;
  newUserData: any;

  listLoading: boolean;
  listLoaded: boolean;
  listFailed: boolean;

  countLoading: boolean;
  countLoaded: boolean;
  countFailed: boolean;

  addLoading: boolean;
  addLoaded: boolean;
  addFailed: boolean;

  updatLoading: boolean;
  updatLoaded: boolean;
  updatFailed: boolean;

  updateLoading: boolean;
  updateLoaded: boolean;
  updateFailed: boolean;

  userGroupLoading: boolean;
  userGroupLoaded: boolean;
  userGroupFailed: boolean;
  userDelate: any;
}

export const UserRecordState = Record({
  userGroupList: {},
  updateUser: {},
  userList: {},
  userpagination: {},
  newUser: {},

  listLoading: false,
  listLoaded: false,
  listFailed: false,

  countLoading: false,
  countLoaded: false,
  countFailed: false,

  addLoading: false,
  addLoaded: false,
  addFailed: false,

  updatLoading: false,
  updatLoaded: false,
  updatFailed: false,

  updateLoading: false,
  updateLoaded: false,
  updateFailed: false,

  userGroupLoading: false,
  userGroupLoaded: false,
  userGroupFailed: false,
  userDelate: {}
});
