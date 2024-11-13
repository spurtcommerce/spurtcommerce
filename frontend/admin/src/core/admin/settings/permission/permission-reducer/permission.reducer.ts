/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../permission-action/permission.action';
import { PermissionState, PermissionStateRecord} from '../permission-reducer/permission.state';
import { PermissionListResponseModel } from '../permission.models/permission-list-response.model';

export const initialState: PermissionState = new PermissionStateRecord() as unknown as PermissionState;

export function reducer(
  state = initialState,
  { type, payload }: any
): PermissionState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.DO_PERMISSION_LIST: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }

    case actions.ActionTypes.DO_NEW_PERMISSION: {
      return Object.assign({}, state, {
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }

    case actions.ActionTypes.DO_UPDATE_PERMISSION: {
      return Object.assign({}, state, {
        updateLoading: true,
        updateLoaded: false,
        updateFailed: false
      });
    }

    case actions.ActionTypes.GET_PERMISSION_COUNT: {
      return Object.assign({}, state, {
        countLoading: true,
        countLoaded: false,
        countFailed: false
      });
    }
    case actions.ActionTypes.GET_PERMISSION_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        countLoading: false,
        countLoaded: true,
        countFailed: false,
        permissionCount: payload.data
      });
    }

    case actions.ActionTypes.DO_PERMISSION_LIST_SUCCESS: {
      const permissionlistModel = payload.data.map(_permissions => {
        const temppermissionModel = new PermissionListResponseModel(_permissions);
        return temppermissionModel;
      });
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: false,
        permissionlist: permissionlistModel,
        tempPermissionList: permissionlistModel
      });
    }
    case actions.ActionTypes.DO_NEW_PERMISSION_SUCCESS: {
      return Object.assign({}, state, {
        addLoading: false,
        addLoaded: true,
        addFailed: false,
        newPermissionStatus: payload
      });
    }

    case actions.ActionTypes.DO_NEW_PERMISSION_FAIL: {
      return Object.assign({}, state, {
        addLoading: false,
        addLoaded: false,
        addFailed: true
      });
    }

    case actions.ActionTypes.DO_UPDATE_PERMISSION_SUCCESS: {
      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: true,
        updateFailed: false,
        updatepermission: payload
      });
    }

    case actions.ActionTypes.DO_PERMISSION_LIST_FAIL:
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: false,
        listFailed: true
      });
    case actions.ActionTypes.DO_UPDATE_PERMISSION_FAIL: {
      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: false,
        updateFailed: true
      });
    }
    case actions.ActionTypes.GET_PERMISSION_COUNT_FAIL: {
      return Object.assign({}, state, {
        countLoading: false,
        countLoaded: true,
        countFailed: true
      });
    }
    case actions.ActionTypes.GET_PERMISSION: {
      return Object.assign({}, state, {
        permissionLoading: true,
        permissionLoaded: false,
        permissionFailed: false
      });
    }

    case actions.ActionTypes.GET_PERMISSION_SUCCESS: {
      let permArray = [];
      permArray = state.permissionlist;
      const selectedPermissionArray = [];
      if (payload.data) {
        const permissionArray = Object.keys(payload.data).map(key => ({type: key, value: payload.data[key]}));
        permissionArray.forEach(data => {
          if (data.value === true) {
             selectedPermissionArray.push(data.type);
          }
        });
        permArray.map(data => {
           if (data) {
            data.permissionModule = data.permissionModule.map(moduleData => {
              selectedPermissionArray.forEach(item => {
                if (moduleData.slugName === item) {
                  const opts = { ...moduleData, selected: true};
                  moduleData = Object.assign({}, opts);
                }
              });
              return Object.assign({}, moduleData);

             });
           }
        });
        permArray.map(data => {
          data.permissionModule = data.permissionModule.map(moduleData => {
            if (!moduleData.selected) {
              const opts = { ...moduleData, selected: false};
              moduleData = Object.assign({}, opts);

            }
            return Object.assign({}, moduleData);
          });
        });
      }

      return Object.assign({}, state, {
        permissionGet: payload,
        permissionLoading: false,
        permissionLoaded: true,
        permissionFailed: false,
        permissionlist: permArray,
        tempPermissionList: permArray
      });
    }

    case actions.ActionTypes.GET_PERMISSION_FAIL: {
      return Object.assign({}, state, {
        permissionLoading: false,
        permissionLoaded: true,
        permissionFailed: true
      });
    }
        case actions.ActionTypes.SELECT_ALL_PERMISSION: {
        state.permissionlist.map(data => {
           if (data) {
             data.permissionModule.map(moduleData => {
                if (payload === true) {
                  const opts = { ...moduleData, selected: true};
                  Object.assign(moduleData, opts);
                } else {
                  const opts = { ...moduleData, selected: false};
                  Object.assign(moduleData, opts);
                }
             });
           }
        });
      return Object.assign({}, state, {
      });
    }
    default: {
      return state;
    }
  }
}

export const getPermissionList = (state: PermissionState) => state.permissionlist;
export const getNewPermissionStatus = (state: PermissionState) => state.newPermissionStatus;
export const getUpdatePermission = (state: PermissionState) => state.updatepermission;
export const getPermissionCount = (state: PermissionState) => state.permissionCount;

export const getpaginatioListLoading = (state: PermissionState) => state.listLoading;
export const getpaginatioListLoaded = (state: PermissionState) => state.listLoaded;
export const getpaginatioListFailed = (state: PermissionState) => state.listFailed;

export const getpaginatioCountLoading = (state: PermissionState) =>
  state.countLoading;
export const getpaginatioCountLoaded = (state: PermissionState) => state.countLoaded;
export const getpaginatioCountFailed = (state: PermissionState) => state.countFailed;

export const getpaginatioAddLoading = (state: PermissionState) => state.addLoading;
export const getpaginatioAddLoaded = (state: PermissionState) => state.addLoaded;
export const getpaginatioAddFailed = (state: PermissionState) => state.addFailed;

export const getpaginatioUpdateLoading = (state: PermissionState) =>
  state.updateLoading;
export const getpaginatioUpdateLoaded = (state: PermissionState) =>
  state.updateLoaded;
export const getpaginatioUpdateFailed = (state: PermissionState) =>
  state.updateFailed;

export const getPermissionGet = (state: PermissionState) => state.permissionGet;
export const getPermissionLoading = (state: PermissionState) => state.permissionLoading;
export const getPermissionLoaded = (state: PermissionState) => state.permissionLoaded;
export const getPermissionFailed = (state: PermissionState) => state.permissionFailed;
