/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
// action
import * as actions from '../actions/layout.action';
import { LayoutState, layoutStateRecord } from './layout.state';
export const initialState: LayoutState = new layoutStateRecord() as LayoutState;

export function reducer(
  state = initialState,
  { type, payload }: any
): LayoutState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.GET_SETTINGS_SUCCESS_ACTION: {
      return Object.assign({}, state, {
      });
    }
    default: {
      return state;
    }
  }
}
