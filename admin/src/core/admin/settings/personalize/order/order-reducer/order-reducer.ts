/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import * as actions from '../order-action/order-action';
import {
  PersonalizeOrderState,
  PersonalizeOrderRecordState
} from './order-state';
import { PersonalizeOrderResponseModel } from '../order-model/order-responsemodel';

export const initialState: PersonalizeOrderState = new PersonalizeOrderRecordState() as PersonalizeOrderState;

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
      return Object.assign({}, state, {});
    }
    case actions.ActionTypes.DO_NEW_ORDER_SETTINGS_SUCCESS: {
      return Object.assign({}, initialState, {
        newPersonalizeOrder: payload
      });
    }
    case actions.ActionTypes.DO_ORDER_SETTINGS_SUCCESS: {
      const generalsetting = payload.data.map(_setting => {
        const tempListModel = new PersonalizeOrderResponseModel(_setting);
        return tempListModel;
      });
      return Object.assign({}, initialState, {
        getPersonalizeOrder: generalsetting
      });
    }
    case actions.ActionTypes.DO_NEW_ORDER_SETTINGS_FAIL: {
      return Object.assign({}, initialState, {
        newPersonalizeOrder: payload
      });
    }
    case actions.ActionTypes.DO_ORDER_SETTINGS_FAIL: {
      return Object.assign({}, initialState, {
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
