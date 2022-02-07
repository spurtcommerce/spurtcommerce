/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import * as actions from '../../../localizations/country/country-action/country.action';
import { CountryRecordState, CountryState } from './country.state';
import { CountryListResponseModel } from '../country-model/countrylist.response.model';

export const initialState: CountryState = new CountryRecordState() as CountryState;

export function reducer(
  state = initialState,
  { type, payload }: any
): CountryState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.DO_NEW_COUNTRY: {
      return Object.assign({}, state, {
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }
    case actions.ActionTypes.DO_UPDATE_COUNTRY: {
      return Object.assign({}, state, {
        updateLoading: true,
        updateLoaded: false,
        updateFailed: false
      });
    }
    case actions.ActionTypes.GET_COUNTRY_LIST: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }
    case actions.ActionTypes.GET_COUNTRY_COUNT_ACTION: {
      return Object.assign({}, state, {
        countLoading: true,
        countLoaded: false,
        countFailed: false
      });
    }
    case actions.ActionTypes.DO_COUNTRY_DELETE: {
      return Object.assign({}, state, {
        deleteLoading: true,
        deleteLoaded: false,
        deleteFailed: false
      });
    }
    case actions.ActionTypes.DO_NEW_COUNTRY_SUCCESS: {
      return Object.assign({}, state, {
        newCountry: payload,
        addLoading: false,
        addLoaded: true,
        addFailed: false
      });
    }
    case actions.ActionTypes.DO_UPDATE_COUNTRY_SUCCESS: {
      return Object.assign({}, state, {
        updateCountry: payload,
        updateLoading: false,
        updateLoaded: true,
        updateFailed: false
      });
    }
    case actions.ActionTypes.GET_COUNTRY_LIST_SUCCESS: {
      const contryList = payload.data.map(_roles => {
        const tempListModel = new CountryListResponseModel(_roles);
        return tempListModel;
      });
      return Object.assign({}, state, {
        countryList: contryList,
        listLoading: false,
        listLoaded: true,
        listFailed: false
      });
    }
    case actions.ActionTypes.GET_COUNTRY_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        countryCount: payload.data,
        countLoading: false,
        countLoaded: true,
        countFailed: false
      });
    }
    case actions.ActionTypes.DO_COUNTRY_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        countryDelete: payload,
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: false
      });
    }

    case actions.ActionTypes.DO_NEW_COUNTRY_FAIL: {
      return Object.assign({}, initialState, {
        newCountry: payload,
        addLoading: false,
        addLoaded: true,
        addFailed: true
      });
    }

    case actions.ActionTypes.DO_UPDATE_COUNTRY_FAIL: {
      return Object.assign({}, initialState, {
        updateCountry: payload,
        updateLoading: false,
        updateLoaded: true,
        updateFailed: true
      });
    }
    case actions.ActionTypes.DO_COUNTRY_DELETE_FAIL: {
      return Object.assign({}, initialState, {
        countryDelete: payload,
        failed: true,
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: true
      });
    }
    case actions.ActionTypes.GET_COUNTRY_LIST_FAIL: {
      return Object.assign({}, initialState, {
        listLoading: false,
        listLoaded: true,
        listFailed: true
      });
    }
    case actions.ActionTypes.GET_COUNTRY_COUNT_FAIL: {
      return Object.assign({}, initialState, {
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

export const getAddCountry = (state: CountryState) => state.newCountry;
export const getUpdateCountry = (state: CountryState) => state.updateCountry;
export const getDeleteCountry = (state: CountryState) => state.countryDelete;
export const getCountryList = (state: CountryState) => state.countryList;
export const getCoutryCount = (state: CountryState) => state.countryCount;

export const getCountryListLoading = (state: CountryState) => state.listLoading;
export const getCountryListLoaded = (state: CountryState) => state.listLoaded;
export const getCountryListFailed = (state: CountryState) => state.listFailed;

export const getCountryCountLoading = (state: CountryState) =>
  state.countLoading;
export const getCountryCountLoaded = (state: CountryState) => state.countLoaded;
export const getCountryCountFailed = (state: CountryState) => state.countFailed;

export const getCountryAddLoading = (state: CountryState) => state.addLoading;
export const getCountryAddLoaded = (state: CountryState) => state.addLoaded;
export const getCountryAddFailed = (state: CountryState) => state.addFailed;

export const getCountryUpdateLoading = (state: CountryState) =>
  state.updateLoading;
export const getCountryUpdateLoaded = (state: CountryState) =>
  state.updateLoaded;
export const getCountryUpdateFailed = (state: CountryState) =>
  state.updateFailed;

export const getCountryDeleteLoading = (state: CountryState) =>
  state.deleteLoading;
export const getCountryDeleteLoaded = (state: CountryState) =>
  state.deleteLoaded;
export const getCountryDeleteFailed = (state: CountryState) =>
  state.deleteFailed;
