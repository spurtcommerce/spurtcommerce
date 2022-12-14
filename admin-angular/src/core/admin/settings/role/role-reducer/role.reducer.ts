/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../role-action/role.action';
import { RoleState, RoleStateRecord } from '../role-reducer/role.state';
import { RoleListResponseModel } from '../role.models/role-list-response.model';

export const initialState: RoleState = new RoleStateRecord() as unknown as RoleState;

export function reducer(
  state = initialState,
  { type, payload }: any
): RoleState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.DO_ROLE_LIST: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }

    case actions.ActionTypes.DO_NEW_ROLE: {
      return Object.assign({}, state, {
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }

    case actions.ActionTypes.DO_UPDATE_ROLE: {
      return Object.assign({}, state, {
        updateLoading: true,
        updateLoaded: false,
        updateFailed: false
      });
    }

    case actions.ActionTypes.GET_ROLE_COUNT: {
      return Object.assign({}, state, {
        countLoading: true,
        countLoaded: false,
        countFailed: false
      });
    }
    case actions.ActionTypes.GET_ROLE_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        countLoading: false,
        countLoaded: true,
        countFailed: false,
        roleCount: payload.data
      });
    }

    case actions.ActionTypes.DO_ROLE_LIST_SUCCESS: {
      const rolelistModel = payload.data.map(_roles => {
        const temproleModel = new RoleListResponseModel(_roles);
        return temproleModel;
      });
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: false,
        rolelist: rolelistModel
      });
    }
    case actions.ActionTypes.DO_NEW_ROLE_SUCCESS: {
      return Object.assign({}, state, {
        addLoading: false,
        addLoaded: true,
        addFailed: false,
        newRoleStatus: payload
      });
    }

    case actions.ActionTypes.DO_NEW_ROLE_FAIL: {
      return Object.assign({}, state, {
        addLoading: false,
        addLoaded: false,
        addFailed: true
      });
    }

    case actions.ActionTypes.DO_UPDATE_ROLE_SUCCESS: {
      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: true,
        updateFailed: false,
        updaterole: payload
      });
    }

    case actions.ActionTypes.DO_ROLE_LIST_FAIL:
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: false,
        listFailed: true
      });
    case actions.ActionTypes.DO_UPDATE_ROLE_FAIL: {
      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: false,
        updateFailed: true
      });
    }
    case actions.ActionTypes.GET_ROLE_COUNT_FAIL: {
      return Object.assign({}, state, {
        countLoading: false,
        countLoaded: true,
        countFailed: true
      });
    }
    case actions.ActionTypes.DELETA_ROLE: {
      return Object.assign({}, state, {});
    }
    case actions.ActionTypes.DELETA_ROLE_SUCCESS: {
      return Object.assign({}, state, {
        roleDelete: payload
      });
    }
    case actions.ActionTypes.DELETA_ROLE_FAIL: {
      return Object.assign({}, state, {});
    }
    default: {
      return state;
    }
  }
}

export const getRoleList = (state: RoleState) => state.rolelist;
export const getNewRoleStatus = (state: RoleState) => state.newRoleStatus;
export const getUpdateRole = (state: RoleState) => state.updaterole;
export const getRoleCount = (state: RoleState) => state.roleCount;

export const getpaginatioListLoading = (state: RoleState) => state.listLoading;
export const getpaginatioListLoaded = (state: RoleState) => state.listLoaded;
export const getpaginatioListFailed = (state: RoleState) => state.listFailed;

export const getpaginatioCountLoading = (state: RoleState) =>
  state.countLoading;
export const getpaginatioCountLoaded = (state: RoleState) => state.countLoaded;
export const getpaginatioCountFailed = (state: RoleState) => state.countFailed;

export const getpaginatioAddLoading = (state: RoleState) => state.addLoading;
export const getpaginatioAddLoaded = (state: RoleState) => state.addLoaded;
export const getpaginatioAddFailed = (state: RoleState) => state.addFailed;

export const getpaginatioUpdateLoading = (state: RoleState) =>
  state.updateLoading;
export const getpaginatioUpdateLoaded = (state: RoleState) =>
  state.updateLoaded;
export const getpaginatioUpdateFailed = (state: RoleState) =>
  state.updateFailed;

export const getRoleDelete = (state: RoleState) => state.roleDelete;
