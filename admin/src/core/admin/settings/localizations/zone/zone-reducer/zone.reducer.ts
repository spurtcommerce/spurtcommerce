/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import * as actions from '../../../localizations/zone/zone-action/zone.action';
import { ZoneRecordState, ZoneState } from './zone.state';
import { ZoneListResponseModel } from '../zone-model/zonelist.response.model';

export const initialState: ZoneState = new ZoneRecordState() as ZoneState;

export function reducer(
  state = initialState,
  { type, payload }: any
): ZoneState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.DO_ADD_ZONE: {
      return Object.assign({}, state, {
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }
    case actions.ActionTypes.DO_UPDATE_ZONE: {
      return Object.assign({}, state, {
        updateLoading: true,
        updateLoaded: false,
        updateFailed: false
      });
    }
    case actions.ActionTypes.GET_ZONE_LIST: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }
    case actions.ActionTypes.GET_ZONE_COUNT_ACTION: {
      return Object.assign({}, state, {
        countLoading: true,
        countLoaded: false,
        countFailed: false
      });
    }
    case actions.ActionTypes.DO_ZONE_DELETE: {
      return Object.assign({}, state, {
        deleteLoading: true,
        deleteLoaded: false,
        deleteFailed: false
      });
    }
    case actions.ActionTypes.DO_ADD_ZONE_SUCCESS: {
      return Object.assign({}, state, {
        newZone: payload,
        addLoading: false,
        addLoaded: true,
        addFailed: false
      });
    }
    case actions.ActionTypes.DO_UPDATE_ZONE_SUCCESS: {
      return Object.assign({}, state, {
        updateZone: payload,
        updateLoading: false,
        updateLoaded: true,
        updateFailed: false
      });
    }
    case actions.ActionTypes.GET_ZONE_LIST_SUCCESS: {
      const zoneList = payload.data.map(_zone => {
        const tempListModel = new ZoneListResponseModel(_zone);
        return tempListModel;
      });
      return Object.assign({}, state, {
        zoneList: zoneList,
        listLoading: false,
        listLoaded: true,
        listFailed: false
      });
    }
    case actions.ActionTypes.GET_ZONE_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        zonePagination: payload.data,
        countLoading: false,
        countLoaded: true,
        countFailed: false
      });
    }
    case actions.ActionTypes.DO_ZONE_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        zoneDelete: payload,
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: false
      });
    }

    case actions.ActionTypes.DO_ADD_ZONE_FAIL: {
      return Object.assign({}, initialState, {
        newZone: payload,
        addLoading: false,
        addLoaded: true,
        addFailed: true
      });
    }

    case actions.ActionTypes.DO_UPDATE_ZONE_FAIL: {
      return Object.assign({}, initialState, {
        updateZone: payload,
        updateLoading: false,
        updateLoaded: true,
        updateFailed: true
      });
    }
    case actions.ActionTypes.DO_ZONE_DELETE_FAIL: {
      return Object.assign({}, initialState, {
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: true
      });
    }
    case actions.ActionTypes.GET_ZONE_COUNT_FAIL: {
      return Object.assign({}, initialState, {
        zoneDelete: payload,
        countLoading: false,
        countLoaded: true,
        countFailed: true
      });
    }
    case actions.ActionTypes.GET_ZONE_LIST_FAIL: {
      return Object.assign({}, initialState, {
        listLoading: false,
        listLoaded: true,
        listFailed: true
      });
    }
    default: {
      return state;
    }
  }
}

export const getnewzone = (state: ZoneState) => state.newZone;
export const getupdatzone = (state: ZoneState) => state.updateZone;
export const getzonedelte = (state: ZoneState) => state.zoneDelete;
export const getzoneslist = (state: ZoneState) => state.zoneList;
export const getzonepagination = (state: ZoneState) => state.zonePagination;

export const getZoneListLoading = (state: ZoneState) => state.listLoading;
export const getZoneListLoaded = (state: ZoneState) => state.listLoaded;
export const getZoneListFailed = (state: ZoneState) => state.listFailed;

export const getZoneCountLoading = (state: ZoneState) => state.countLoading;
export const getZoneCountLoaded = (state: ZoneState) => state.countLoaded;
export const getZoneCountFailed = (state: ZoneState) => state.countFailed;

export const getZoneAddLoading = (state: ZoneState) => state.addLoading;
export const getZoneAddLoaded = (state: ZoneState) => state.addLoaded;
export const getZoneAddFailed = (state: ZoneState) => state.addFailed;

export const getZoneUpdateLoading = (state: ZoneState) => state.updateLoading;
export const getZoneUpdateLoaded = (state: ZoneState) => state.updateLoaded;
export const getZoneUpdateFailed = (state: ZoneState) => state.updateFailed;

export const getZoneDeleteLoading = (state: ZoneState) => state.deleteLoading;
export const getZoneDeleteLoaded = (state: ZoneState) => state.deleteLoaded;
export const getZoneDeleteFailed = (state: ZoneState) => state.deleteFailed;
