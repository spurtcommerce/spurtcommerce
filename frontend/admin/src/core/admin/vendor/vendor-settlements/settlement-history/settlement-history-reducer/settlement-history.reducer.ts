/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

// action
import * as actions from '../settlement-history-action/settlement-history.action';
// state
import {
  SettlementHistoryState,
  SettlementHistoryStateRecord
} from './settlement-history.state';

export const initialState: SettlementHistoryState = new SettlementHistoryStateRecord() as unknown as SettlementHistoryState;

export function reducer(
  state = initialState,
  { type, payload }: any
): SettlementHistoryState {
  if (!type) {
    return state;
  }

  switch (type) {


// <--------------------SETTLEMENT HIST0RY LIST -----------------> //

case actions.ActionTypes.SETTLEMENT_HISTORY_LIST: {
      return Object.assign({}, state, {
        historyListLoading: true,
        historyListLoaded: false,
        historyListFailed: false,
      });
    }
    case actions.ActionTypes.SETTLEMENT_HISTORY_LIST_SUCCESS: {
      return Object.assign({}, state, {
        historyList: payload.data,
        historyListLoading: false,
        historyListLoaded: true,
        historyListFailed: false,
      });
    }

// <--------------------SETTLEMENT HISTORY LIST COUNT -----------------> //

    case actions.ActionTypes.SETTLEMENT_HISTORY_LIST_COUNT: {
      return Object.assign({}, state, {
        historyListCount: '',
      });
    }

    case actions.ActionTypes.SETTLEMENT_HISTORY_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        historyListCount: payload.data,
      });
    }


// <--------------------SETTLEMENT DETAILS -----------------> //

    case actions.ActionTypes.SETTLEMENT_DETAILS: {
      return Object.assign({}, state, {
        settlementDetailsLoading: true,
        settlementDetailsLoaded: false,
        settlementDetailsFailed: false,
      });
    }
    case actions.ActionTypes.SETTLEMENT_DETAILS_SUCCESS: {
      return Object.assign({}, state, {
        settlementDetails: payload.data,
        settlementDetailsLoading: false,
        settlementDetailsLoaded: true,
        settlementDetailsFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_PAYMENT: {
      return Object.assign({}, state, {
        excelLoading: true,
        excelLoaded: false,
      });
    }
    case actions.ActionTypes.EXPORT_PAYMENT_SUCCESS: {
      return Object.assign({}, state, {
        excelLoading: false,
        excelLoaded: true,
      });
    }

    default: {
      return state;
    }
  }
}

// product list action
export const historyList = (state: SettlementHistoryState) => state.historyList;
export const historyListCount = (state: SettlementHistoryState) => state.historyListCount;
export const historyListLoading = (state: SettlementHistoryState) =>
  state.historyListLoading;
export const historyListLoaded = (state: SettlementHistoryState) =>
  state.historyListLoaded;

export const settlementDetails = (state: SettlementHistoryState) => state.settlementDetails;

export const exportExcelLoading = (state: SettlementHistoryState) => state.excelLoading;


