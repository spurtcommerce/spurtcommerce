/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../tax-action/tax.actions';
import { TaxState, TaxRecordState } from './tax.state';
import { TaxListResponseModel } from '../tax-model/taxlist.response.model';
import { TaxNewResponse } from '../tax-model/taxnewResponse.model';

export const initialState: TaxState = new TaxRecordState() as unknown as TaxState;

export function reducer(
  state = initialState,
  { type, payload }: any
): TaxState {
  if (!type) {
    return state;
  }
  switch (type) {
    case actions.ActionTypes.DO_TAX_LIST: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }
    case actions.ActionTypes.DO_TAX_LIST_COUNT: {
      return Object.assign({}, state, {
        countLoading: true,
        countLoaded: false,
        countFailed: false
      });
    }
    case actions.ActionTypes.DO_TAX_LIST_NEW: {
      return Object.assign({}, state, {
        taxNew:{},
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }
    case actions.ActionTypes.DO_TAX_UPDATE: {
      return Object.assign({}, state, {
        taxupdate:{},
        updateLoading: true,
        updateLoaded: false,
        updateFailed: false
      });
    }
    case actions.ActionTypes.DO_TAX_DELETE: {
      return Object.assign({}, state, {
        deleteLoading: true,
        deleteLoaded: false,
        deleteFailed: false
      });
    }
    case actions.ActionTypes.DO_TAX_LIST_SUCCESS: {
      const taxList = payload.data.map(_tax => {
        const tempListModel = new TaxListResponseModel(_tax);
        return tempListModel;
      });
      return Object.assign({}, state, {
        taxList: taxList,
        listLoading: false,
        listLoaded: true,
        listFailed: false
      });
    }
    case actions.ActionTypes.DO_TAX_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        taxListCount: payload,
        countLoading: false,
        countLoaded: true,
        countFailed: false
      });
    }
    case actions.ActionTypes.DO_TAX_LIST_NEW_SUCCESS: {
      const newTax = new TaxNewResponse(payload.data);
      return Object.assign({}, state, {
        taxNew: payload,
        taxNewdetail: newTax,
        addLoading: false,
        addLoaded: true,
        addFailed: false
      });
    }
    case actions.ActionTypes.DO_TAX_UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        taxupdate: payload,
        updateLoading: false,
        updateLoaded: true,
        updateFailed: false
      });
    }
    case actions.ActionTypes.DO_TAX_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        taxDelete: payload,
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: false
      });
    }
    case actions.ActionTypes.DO_TAX_LIST_FAIL: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: true
      });
    }
    case actions.ActionTypes.DO_TAX_LIST_NEW_FAIL: {
      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: true,
        updateFailed: true
      });
    }
    case actions.ActionTypes.DO_TAX_UPDATE_FAIL: {
      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: true,
        updateFailed: true
      });
    }
    case actions.ActionTypes.DO_TAX_DELETE_FAIL: {
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: true
      });
    }
    case actions.ActionTypes.DO_TAX_LIST_COUNT_FAIL: {
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

export const getTaxList = (state: TaxState) => state.taxList;
export const getTaxListCount = (state: TaxState) =>
  state.taxListCount;
export const getTaxNew = (state: TaxState) => state.taxNew;
export const getTaxNewdetail = (state: TaxState) =>
  state.taxNewdetail;
export const getTaxUpdate = (state: TaxState) => state.taxupdate;
export const getTaxDelete = (state: TaxState) => state.taxDelete;

export const getTaxListLoading = (state: TaxState) =>
  state.listLoading;
export const getTaxListLoaded = (state: TaxState) => state.listLoaded;
export const getTaxListFailed = (state: TaxState) => state.listFailed;

export const getTaxCountLoading = (state: TaxState) =>
  state.countLoading;
export const getTaxCountLoaded = (state: TaxState) =>
  state.countLoaded;
export const getTaxCountFailed = (state: TaxState) =>
  state.countFailed;

export const getTaxAddLoading = (state: TaxState) => state.addLoading;
export const getTaxAddLoaded = (state: TaxState) => state.addLoaded;
export const getTaxAddFailed = (state: TaxState) => state.addFailed;

export const getTaxUpdateLoading = (state: TaxState) =>
  state.updateLoading;
export const getTaxUpdateLoaded = (state: TaxState) =>
  state.updateLoaded;
export const getTaxUpdateFailed = (state: TaxState) =>
  state.updateFailed;

export const getTaxDeleteLoading = (state: TaxState) =>
  state.deleteLoading;
export const getTaxDeleteLoaded = (state: TaxState) =>
  state.deleteLoaded;
export const getTaxDeleteFailed = (state: TaxState) =>
  state.deleteFailed;
