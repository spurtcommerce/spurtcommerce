/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../currency-action/currency.actions';
import { CurrencyState, CurrencyRecordState } from './currency.state';
import { CurrencyListResponseModel } from '../currency-model/currencylist.response.model';
import { CurrencyNewResponse } from '../currency-model/currencynewResponse.model';

export const initialState: CurrencyState = new CurrencyRecordState() as unknown as CurrencyState;

export function reducer(
  state = initialState,
  { type, payload }: any
): CurrencyState {
  if (!type) {
    return state;
  }
  switch (type) {
    case actions.ActionTypes.DO_CURRENCY_LIST: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }
    case actions.ActionTypes.DO_CURRENCY_LIST_COUNT: {
      return Object.assign({}, state, {
        countLoading: true,
        countLoaded: false,
        countFailed: false
      });
    }
    case actions.ActionTypes.DO_CURRENCY_LIST_NEW: {
      return Object.assign({}, state, {
        currencyNew:{},
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }
    case actions.ActionTypes.DO_CURRENCY_UPDATE: {
      return Object.assign({}, state, {
        currencyupdate:{},
        updateLoading: true,
        updateLoaded: false,
        updateFailed: false
      });
    }
    case actions.ActionTypes.DO_CURRENCY_DELETE: {
      return Object.assign({}, state, {
        deleteLoading: true,
        deleteLoaded: false,
        deleteFailed: false
      });
    }
    case actions.ActionTypes.DO_CURRENCY_LIST_SUCCESS: {
      const currencyList = payload.data.map(_currency => {
        const tempListModel = new CurrencyListResponseModel(_currency);
        return tempListModel;
      });
      return Object.assign({}, state, {
        currencyList: currencyList,
        listLoading: false,
        listLoaded: true,
        listFailed: false
      });
    }
    case actions.ActionTypes.DO_CURRENCY_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        currencyListCount: payload,
        countLoading: false,
        countLoaded: true,
        countFailed: false
      });
    }
    case actions.ActionTypes.DO_CURRENCY_LIST_NEW_SUCCESS: {
      const newCurrency = new CurrencyNewResponse(payload.data);
      return Object.assign({}, state, {
        currencyNew: payload,
        currencyNewdetail: newCurrency,
        addLoading: false,
        addLoaded: true,
        addFailed: false
      });
    }
    case actions.ActionTypes.DO_CURRENCY_UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        currencyupdate: payload,
        updateLoading: false,
        updateLoaded: true,
        updateFailed: false
      });
    }
    case actions.ActionTypes.DO_CURRENCY_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        currencyDelete: payload,
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: false
      });
    }
    case actions.ActionTypes.DO_CURRENCY_LIST_FAIL: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: true
      });
    }
    case actions.ActionTypes.DO_CURRENCY_LIST_NEW_FAIL: {
      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: true,
        updateFailed: true
      });
    }
    case actions.ActionTypes.DO_CURRENCY_UPDATE_FAIL: {
      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: true,
        updateFailed: true
      });
    }
    case actions.ActionTypes.DO_CURRENCY_DELETE_FAIL: {
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: true
      });
    }
    case actions.ActionTypes.DO_CURRENCY_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        countLoading: false,
        countLoaded: true,
        countFailed: true
      });
    }

    default: {
      return state;
    }
  }
}

export const getCurrencyList = (state: CurrencyState) => state.currencyList;
export const getCurrencyListCount = (state: CurrencyState) =>
  state.currencyListCount;
export const getCurrencyNew = (state: CurrencyState) => state.currencyNew;
export const getCurrencyNewdetail = (state: CurrencyState) =>
  state.currencyNewdetail;
export const getCurrencyUpdate = (state: CurrencyState) => state.currencyupdate;
export const getCurrencyDelete = (state: CurrencyState) => state.currencyDelete;

export const getCurrencyListLoading = (state: CurrencyState) =>
  state.listLoading;
export const getCurrencyListLoaded = (state: CurrencyState) => state.listLoaded;
export const getCurrencyListFailed = (state: CurrencyState) => state.listFailed;

export const getCurrencyCountLoading = (state: CurrencyState) =>
  state.countLoading;
export const getCurrencyCountLoaded = (state: CurrencyState) =>
  state.countLoaded;
export const getCurrencyCountFailed = (state: CurrencyState) =>
  state.countFailed;

export const getCurrencyAddLoading = (state: CurrencyState) => state.addLoading;
export const getCurrencyAddLoaded = (state: CurrencyState) => state.addLoaded;
export const getCurrencyAddFailed = (state: CurrencyState) => state.addFailed;

export const getCurrencyUpdateLoading = (state: CurrencyState) =>
  state.updateLoading;
export const getCurrencyUpdateLoaded = (state: CurrencyState) =>
  state.updateLoaded;
export const getCurrencyUpdateFailed = (state: CurrencyState) =>
  state.updateFailed;

export const getCurrencyDeleteLoading = (state: CurrencyState) =>
  state.deleteLoading;
export const getCurrencyDeleteLoaded = (state: CurrencyState) =>
  state.deleteLoaded;
export const getCurrencyDeleteFailed = (state: CurrencyState) =>
  state.deleteFailed;
