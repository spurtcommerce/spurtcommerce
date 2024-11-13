/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';
import { PermissionListResponseModel } from '../permission.models/permission-list-response.model';

export interface PermissionState extends Map<string, any> {
  permissionlist: Array <PermissionListResponseModel>;
  tempPermissionList: Array <PermissionListResponseModel>;
  newPermissionStatus: any;
  updatepermission: any;
  permissionCount: any;
  paginationpermissionlist: any;

  detailLoading: boolean;
  detailLoaded: boolean;
  detailFailed: boolean;

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
  permissionGet: any;

  permissionLoading: boolean;
  permissionLoaded: boolean;
  permissionFailed: boolean;
}

export const PermissionStateRecord = Record({
  permissionlist: [],
  tempPermissionList: [],
  newPermissionStatus: {},
  updatepermission: {},
  permissionpage: {},
  paginationpermissionlist: {},

  detailLoading: false,
  detailLoaded: false,
  detailFailed: false,

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
  permissionGet: {},

  permissionLoading: false,
  permissionLoaded: false,
  permissionFailed: false
});
