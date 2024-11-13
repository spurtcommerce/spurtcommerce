/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../order-action/order-action';
import {
  PersonalizeOrderState,
  PersonalizeOrderRecordState
} from './order-state';
import { PersonalizeOrderResponseModel } from '../order-model/order-responsemodel';

export const initialState: PersonalizeOrderState = new PersonalizeOrderRecordState() as unknown as PersonalizeOrderState;

export function reducer(
  state = initialState,
  { type, payload }: any
): PersonalizeOrderState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.DO_NEW_ORDER_SETTINGS: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.DO_ORDER_SETTINGS: {
      return Object.assign({}, state, {
        getSettingLoading:true
      });
    }
    case actions.ActionTypes.DO_NEW_ORDER_SETTINGS_SUCCESS: {
      return Object.assign({}, state, {
        newPersonalizeOrder: payload
      });
    }
    case actions.ActionTypes.DO_ORDER_SETTINGS_SUCCESS: {
      const generalsetting = payload.data.map(_setting => {
        const tempListModel = new PersonalizeOrderResponseModel(_setting);
        return tempListModel;
      });
      return Object.assign({}, state, {
        getPersonalizeOrder: generalsetting,
        getSettingLoading:false
      });
    }
    case actions.ActionTypes.DO_NEW_ORDER_SETTINGS_FAIL: {
      return Object.assign({}, state, {
        newPersonalizeOrder: payload
      });
    }
    case actions.ActionTypes.DO_ORDER_SETTINGS_FAIL: {
      return Object.assign({}, state, {
        getPersonalizeOrder: payload
      });
    }
    default: {
      return state;
    }
  }
}

export const getnewPersonalizeOrder = (state: PersonalizeOrderState) =>
  state.newPersonalizeOrder;
export const getPersonalizeOrder = (state: PersonalizeOrderState) =>
  state.getPersonalizeOrder;

  export const getSettingLoading = (state: PersonalizeOrderState) =>
  state.getSettingLoading;

