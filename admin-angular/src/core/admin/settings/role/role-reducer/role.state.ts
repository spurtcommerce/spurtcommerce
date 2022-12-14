/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';
import { RoleListResponseModel } from '../role.models/role-list-response.model';

export interface RoleState extends Map<string, any> {
  rolelist: RoleListResponseModel;
  newRoleStatus: any;
  updaterole: any;
  roleCount: any;
  paginationrolelist: any;

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
  roleDelete: any;
}

export const RoleStateRecord = Record({
  rolelist: [],
  newRoleStatus: {},
  updaterole: {},
  rolepage: {},
  paginationrolelist: {},

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
  roleDelete: {}
});
