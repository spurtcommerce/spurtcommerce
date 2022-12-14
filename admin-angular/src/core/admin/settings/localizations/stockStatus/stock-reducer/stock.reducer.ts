/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { StockRecordState, StockState } from './stock.state';
import * as actions from '../stock-action/stock.action';
import { StockStatusListResponseModel } from '../stock-model/stockstatuslist.response.model';

export const initialState: StockState = new StockRecordState() as unknown as StockState;

export function reducer(
  state = initialState,
  { type, payload }: any
): StockState {
  if (!type) {
    return state;
  }
  switch (type) {
    // stock actions
    case actions.ActionTypes.DO_STOCKLIST: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }
    case actions.ActionTypes.DO_NEWSTOCKLIST: {
      return Object.assign({}, state, {
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }
    case actions.ActionTypes.Do_STOCkLISTCOUNT: {
      return Object.assign({}, state, {
        countLoading: true,
        countLoaded: false,
        countFailed: false
      });
    }
    case actions.ActionTypes.DO_STOCKUPDATE: {
      return Object.assign({}, state, {
        updateLoading: true,
        updateLoaded: false,
        updateFailed: false
      });
    }
    case actions.ActionTypes.DO_STOCKDELETE: {
      return Object.assign({}, state, {
        deleteLoading: true,
        deleteLoaded: false,
        deleteFailed: false
      });
    }
    // stock list success
    case actions.ActionTypes.DO_STOCKLIST_SUCCESS: {
      const stocksList = payload.data.map(_roles => {
        const tempListModel = new StockStatusListResponseModel(_roles);
        return tempListModel;
      });
      return Object.assign({}, state, {
        stockList: stocksList,
        listLoading: false,
        listLoaded: true,
        listFailed: false
      });
    }
    // stock add success
    case actions.ActionTypes.DO_NEWSTOCKLIST_SUCCESS: {
      return Object.assign({}, state, {
        newStockList: payload,
        addLoading: false,
        addLoaded: true,
        addFailed: false
      });
    }
    // stock count success
    case actions.ActionTypes.Do_STOCkLISTCOUNT_SUCCESS: {
      return Object.assign({}, state, {
        stockListCount: payload,
        countLoading: false,
        countLoaded: true,
        countFailed: false
      });
    }
    // stock update success
    case actions.ActionTypes.DO_STOCKUPDATE_SUCCESS: {
      return Object.assign({}, state, {
        stockUpdate: payload,
        updateLoading: false,
        updateLoaded: true,
        updateFailed: false
      });
    }
    // stock delete success
    case actions.ActionTypes.DO_STOCKDELETE_SUCCESS: {
      return Object.assign({}, state, {
        stockdelete: payload,
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: false
      });
    }
    // stock fail action
    case actions.ActionTypes.DO_STOCKLIST_FAIL: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: true
      });
    }

    case actions.ActionTypes.DO_NEWSTOCKLIST_FAIL:
      return Object.assign({}, state, {
        newStockList: payload,
        addLoading: false,
        addLoaded: true,
        addFailed: true
      });
    case actions.ActionTypes.Do_STOCkLISTCOUNT_FAIL: {
      return Object.assign({}, state, {
        countLoading: false,
        countLoaded: true,
        countFailed: true
      });
    }
    case actions.ActionTypes.DO_STOCKUPDATE_FAIL: {
      return Object.assign({}, state, {
        failed: true,
        stockUpdate: payload,
        updateLoading: false,
        updateLoaded: true,
        updateFailed: true
      });
    }
    case actions.ActionTypes.DO_STOCKDELETE_FAIL: {
      return Object.assign({}, state, {
        stockdelete: payload,
        failed: true,
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: true
      });
    }
    default: {
      return state;
    }
  }
}

export const getStockList = (state: StockState) => state.stockList;
export const getNewStock = (state: StockState) => state.newStockList;
export const getStockcount = (state: StockState) => state.stockListCount;
export const getstockUpdate = (state: StockState) => state.stockUpdate;
export const getstockdelete = (state: StockState) => state.stockdelete;

export const getStockStatusListLoading = (state: StockState) =>
  state.listLoading;
export const getStockStatusListLoaded = (state: StockState) => state.listLoaded;
export const getStockStatusListFailed = (state: StockState) => state.listFailed;

export const getStockStatusCountLoading = (state: StockState) =>
  state.countLoading;
export const getStockStatusCountLoaded = (state: StockState) =>
  state.countLoaded;
export const getStockStatusCountFailed = (state: StockState) =>
  state.countFailed;

export const getStockStatusAddLoading = (state: StockState) => state.addLoading;
export const getStockStatusAddLoaded = (state: StockState) => state.addLoaded;
export const getStockStatusAddFailed = (state: StockState) => state.addFailed;

export const getStockStatusUpdateLoading = (state: StockState) =>
  state.updateLoading;
export const getStockStatusUpdateLoaded = (state: StockState) =>
  state.updateLoaded;
export const getStockStatusUpdateFailed = (state: StockState) =>
  state.updateFailed;

export const getStockStatusDeleteLoading = (state: StockState) =>
  state.deleteLoading;
export const getStockStatusDeleteLoaded = (state: StockState) =>
  state.deleteLoaded;
export const getStockStatusDeleteFailed = (state: StockState) =>
  state.deleteFailed;
