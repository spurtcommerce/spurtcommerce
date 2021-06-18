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
      const setting = payload.data[0];
      let symbolsettings = {};
      if (setting.symbolLeft !== null) {
        symbolsettings = { position: 'left', symbol: setting.symbolLeft };
      } else if (setting.symbolRight !== null) {
        symbolsettings = { position: 'right', symbol: setting.symbolRight };
      }
      return Object.assign({}, state, {
        settings: symbolsettings
      });
    }
    default: {
      return state;
    }
  }
}
export const getSettings = (state: LayoutState) => state.settings;

