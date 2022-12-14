/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../generalsetting-action/generalsetting.action';
import {
  GeneralsettingState,
  GeneralsettingRecordState
} from './generalsetting.state';
import { GeneralsettingetResponseModel } from '../generalsetting-model/generalsettinget.response.model';

export const initialState: GeneralsettingState = new GeneralsettingRecordState() as unknown as GeneralsettingState;

export function reducer(
  state = initialState,
  { type, payload }: any
): GeneralsettingState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.DO_NEW_GENERAL_SETTINGS: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.DO_GET_GENERAL_SETTINGS: {
      return Object.assign({}, state, {});
    }
    case actions.ActionTypes.DO_NEW_GENERAL_SETTINGS_SUCCESS: {
      return Object.assign({}, state, {
        newgeneralsettings: payload
      });
    }
    case actions.ActionTypes.DO_GET_GENERAL_SETTINGS_SUCCESS: {
      const generalsetting = payload.data.map(_setting => {
        const tempListModel = new GeneralsettingetResponseModel(_setting);
        return tempListModel;
      });
      return Object.assign({}, state, {
        getgeneralsetting: generalsetting
      });
    }
    case actions.ActionTypes.DO_NEW_GENERAL_SETTINGS_FAIL: {
      return Object.assign({}, state, {
        newgeneralsettings: payload
      });
    }
    case actions.ActionTypes.DO_GET_GENERAL_SETTINGS_FAIL: {
      return Object.assign({}, state, {
        getgeneralsetting: payload
      });
    }


    case actions.ActionTypes.MAINTENANCE_MODE: {
      return Object.assign({}, state, {});
    }
    case actions.ActionTypes.MAINTENANCE_MODE_SUCCESS: {
      return Object.assign({}, state, {
        mode: payload
      });
    }
    case actions.ActionTypes.MAINTENANCE_MODE_FAIL: {
      return Object.assign({}, state, {
        newMode: payload
      });
    }


    default: {
      return state;
    }
  }
}

// Export State value Pass to Selector
export const getNewGeneralsettings = (state: GeneralsettingState) =>
  state.newgeneralsettings;
export const getGeneralsettings = (state: GeneralsettingState) =>
  state.getgeneralsetting;
export const maintenaceMode = (state: GeneralsettingState) =>
  state.mode;
