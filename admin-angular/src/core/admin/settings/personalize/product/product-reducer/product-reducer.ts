/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../product-action/product-action';
import {
  PersonalizeProductState,
  PersonalizeProductRecordState
} from './product-state';
import { PersonalizeProductResponsemodel } from '../product-model/product-responsemodel';

export const initialState: PersonalizeProductState = new PersonalizeProductRecordState() as unknown as PersonalizeProductState;

export function reducer(
  state = initialState,
  { type, payload }: any
): PersonalizeProductState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.DO_NEW_PRODUCT_SETTINGS: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.DO_PRODUCT_SETTINGS: {
      return Object.assign({}, state, {});
    }
    case actions.ActionTypes.DO_NEW_PRODUCT_SETTINGS_SUCCESS: {
      return Object.assign({}, state, {
        newPersonalizeProduct: payload
      });
    }
    case actions.ActionTypes.DO_PRODUCT_SETTINGS_SUCCESS: {
      const generalsetting = payload.data.map(_setting => {
        const tempListModel = new PersonalizeProductResponsemodel(_setting);
        return tempListModel;
      });
      return Object.assign({}, state, {
        getPersonalizeProduct: generalsetting
      });
    }
    case actions.ActionTypes.DO_NEW_PRODUCT_SETTINGS_FAIL: {
      return Object.assign({}, state, {
        newPersonalizeProduct: payload
      });
    }
    case actions.ActionTypes.DO_PRODUCT_SETTINGS_FAIL: {
      return Object.assign({}, state, {
        getPersonalizeProduct: payload
      });
    }
    default: {
      return state;
    }
  }
}

export const getnewPersonalizeProduct = (state: PersonalizeProductState) =>
  state.newPersonalizeProduct;
export const getPersonalizeProduct = (state: PersonalizeProductState) =>
  state.getPersonalizeProduct;
