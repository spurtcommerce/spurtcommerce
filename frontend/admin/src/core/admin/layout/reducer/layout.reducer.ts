/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// action
import * as actions from '../actions/layout.action';
import { LayoutState, layoutStateRecord } from './layout.state';
export const initialState: LayoutState = new layoutStateRecord() as unknown as LayoutState;

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
        settings: symbolsettings,
        settingDetails: setting
      });
    }
    case actions.ActionTypes.GET_USER_DETAIL_ACTION: {
      return Object.assign({}, state, {
        userDetail: payload
      });
    }
        /* change payment action */

        case actions.ActionTypes.CHANGE_PAYMENT: {
          return Object.assign({}, state, {
            changePaymentLoading: true,
            changePaymentLoaded: false,
            changePaymentFailed: false
          });
        }

        case actions.ActionTypes.CHANGE_PAYMENT_SUCCESS: {
          return Object.assign({}, state, {
            changePayment: payload.data,
            changePaymentLoading: false,
            changePaymentLoaded: true,
            changePaymentFailed: false
          });
        }

        case actions.ActionTypes.CHANGE_PAYMENT_FAIL: {
          return Object.assign({}, state, {
            changePaymentLoading: false,
            changePaymentLoaded: true,
            changePaymentFailed: true
          });
        }

        //** Language List **//


        case actions.ActionTypes.GET_LANGUAGE_LIST: {
          return Object.assign({}, state, {
            languageListLoading: true,
            languageListLoaded: false,
            languageListFailed: false
          });
        }

        case actions.ActionTypes.GET_LANGUAGE_LIST_SUCCESS: {
          return Object.assign({}, state, {
            languageList: payload.data,
            languageListLoading: false,
            languageListLoaded: true,
            languageListFailed: false
          });
        }

        case actions.ActionTypes.GET_LANGUAGE_LIST_FAIL: {
          return Object.assign({}, state, {
            languageListLoading: false,
            languageListLoaded: true,
            languageListFailed: true
          });
        }

    default: {
      return state;
    }
  }
}

export const getSettings = (state: LayoutState) => state.settings;
export const settingDetails = (state: LayoutState) => state.settingDetails;

export const userDetail = (state: LayoutState) => state.userDetail;

export const getChangePayment = (state: LayoutState) =>
state.changePayment;
export const getChangePaymentLoading = (state: LayoutState) =>
state.changePaymentLoading;
export const getChangePaymentLoaded = (state: LayoutState) =>
state.changePaymentLoaded;
export const getChangePaymentFailed = (state: LayoutState) =>
state.changePaymentFailed;

export const languageList = (state: LayoutState) => state.languageList;
export const languageListLoading = (state: LayoutState) => state.languageListLoading;
export const languageListLoaded = (state: LayoutState) => state.languageListLoaded;
export const languageListFailed = (state: LayoutState) => state.languageListFailed;