/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../action/multiple-websites.action';
import { MultipleWebsitesRecordState, MultipleWebsitesState } from './multiple-websites.state';

export const initialState: MultipleWebsitesState = new MultipleWebsitesRecordState() as unknown as MultipleWebsitesState;

export function reducer(
  state = initialState,
  { type, payload }: any
): MultipleWebsitesState {
  if (!type) {
    return state;
  }

  switch (type) {

    /*Get Multiple websites List*/

    case actions.ActionTypes.MULTIPLE_WEBSITES_LIST: {
      return Object.assign({}, state, {
        MultipleWebsitesList: [],
        MultipleWebsitesListLoading: true,
        MultipleWebsitesListActionLoaded: false,
        MultipleWebsitesListActionFailed: false
      });
    }

    case actions.ActionTypes.MULTIPLE_WEBSITES_LIST_SUCCESS: {
        return Object.assign({}, state, {
          MultipleWebsiteslist: payload,
          MultipleWebsiteslistLoading: false,
          MultipleWebsiteslistLoaded: true,
          MultipleWebsiteslistFailed: false
        });
      }

    case actions.ActionTypes.MULTIPLE_WEBSITES_LIST_FAIL: {
        return Object.assign({}, state, {
          MultipleWebsiteslist: false,
          MultipleWebsiteslistLoading: false,
          MultipleWebsiteslistLoaded: true,
          MultipleWebsiteslistFailed: true
        });
      }

    /* Create Multiple websites*/

    case actions.ActionTypes.CREATE_MULTIPLE_WEBSITES: {
      return Object.assign({}, state, {
        CreateMultipleWebsites: [],
        CreateMultipleWebsitesLoading: true,
        CreateMultipleWebsitesActionLoaded: false,
        CreateMultipleWebsitesActionFailed: false
      });
    }

    case actions.ActionTypes.CREATE_MULTIPLE_WEBSITES_SUCCESS: {
        return Object.assign({}, state, {
          CreateMultipleWebsites: payload,
          CreateMultipleWebsitesLoading: false,
          CreateMultipleWebsitesLoaded: true,
          CreateMultipleWebsitesFailed: false
        });
      }

    case actions.ActionTypes.CREATE_MULTIPLE_WEBSITES_FAIL: {
        return Object.assign({}, state, {
          CreateMultipleWebsites: false,
          CreateMultipleWebsitesLoading: false,
          CreateMultipleWebsitesLoaded: true,
          CreateMultipleWebsitesFailed: true
        });
      }

    /* Update Multiple websites*/

    case actions.ActionTypes.UPDATE_MULTIPLE_WEBSITES: {
      return Object.assign({}, state, {
        UpdateMultipleWebsites: [],
        UpdateMultipleWebsitesLoading: true,
        UpdateMultipleWebsitesActionLoaded: false,
        UpdateMultipleWebsitesActionFailed: false
      });
    }

    case actions.ActionTypes.UPDATE_MULTIPLE_WEBSITES_SUCCESS: {
        return Object.assign({}, state, {
          UpdateMultipleWebsites: payload,
          UpdateMultipleWebsitesLoading: false,
          UpdateMultipleWebsitesLoaded: true,
          UpdateMultipleWebsitesFailed: false
        });
      }

    case actions.ActionTypes.UPDATE_MULTIPLE_WEBSITES_FAIL: {
        return Object.assign({}, state, {
          UpdateMultipleWebsites: false,
          UpdateMultipleWebsitesLoading: false,
          UpdateMultipleWebsitesLoaded: true,
          UpdateMultipleWebsitesFailed: true
        });
      }

//  get settings details
 case actions.ActionTypes.GET_SETTINGS_MULTIPLE_WEBSITES: {
      return Object.assign({}, state, {
        GetSettingsMultipleWebsites: [],
        GetSettingsMultipleWebsitesLoading: true,
        GetSettingsMultipleWebsitesLoaded: false,
        GetSettingsMultipleWebsitesFailed: false
      });
    }

    case actions.ActionTypes.GET_SETTINGS_MULTIPLE_WEBSITES_SUCCESS: {
        return Object.assign({}, state, {
          GetSettingsMultipleWebsites: payload.data,
          GetSettingsMultipleWebsitesLoading: false,
          GetSettingsMultipleWebsitesLoaded: true,
          GetSettingsMultipleWebsitesFailed: false
        });
      }

    case actions.ActionTypes.GET_SETTINGS_MULTIPLE_WEBSITES_FAIL: {
        return Object.assign({}, state, {
          GetSettingsMultipleWebsites: false,
          GetSettingsMultipleWebsitesLoading: false,
          GetSettingsMultipleWebsitesLoaded: true,
          GetSettingsMultipleWebsitesFailed: true
        });
      }


      
    default: {
      return state;
    }
  }
}

/*Get Multiple websites List*/

export const MultipleWebsiteslist = (state: MultipleWebsitesState) => state.MultipleWebsiteslist;
export const MultipleWebsiteslistLoading = (state: MultipleWebsitesState) => state.MultipleWebsiteslistLoading;
export const MultipleWebsiteslistLoaded = (state: MultipleWebsitesState) => state.MultipleWebsiteslistLoaded;
export const MultipleWebsiteslistFailed = (state: MultipleWebsitesState) => state.MultipleWebsiteslistFailed;


 /*Create Multiple websites*/

 export const CreateMultipleWebsites = (state: MultipleWebsitesState) => state.CreateMultipleWebsites;
 export const CreateMultipleWebsitesLoading = (state: MultipleWebsitesState) => state.CreateMultipleWebsitesLoading;
 export const CreateMultipleWebsitesLoaded = (state: MultipleWebsitesState) => state.CreateMultipleWebsitesLoaded;
 export const CreateMultipleWebsitesFailed = (state: MultipleWebsitesState) => state.CreateMultipleWebsitesFailed;


 /*Update Multiple websites*/

 export const UpdateMultipleWebsites = (state: MultipleWebsitesState) => state.UpdateMultipleWebsites;
 export const UpdateMultipleWebsitesLoading = (state: MultipleWebsitesState) => state.UpdateMultipleWebsitesLoading;
 export const UpdateMultipleWebsitesLoaded = (state: MultipleWebsitesState) => state.UpdateMultipleWebsitesLoaded;
 export const UpdateMultipleWebsitesFailed = (state: MultipleWebsitesState) => state.UpdateMultipleWebsitesFailed;

//  get settings details
export const GetSettingsMultipleWebsites = (state: MultipleWebsitesState) => state.GetSettingsMultipleWebsites;
export const GetSettingsMultipleWebsitesLoading = (state: MultipleWebsitesState) => state.GetSettingsMultipleWebsitesLoading;
export const GetSettingsMultipleWebsitesLoaded = (state: MultipleWebsitesState) => state.GetSettingsMultipleWebsitesLoaded;
export const GetSettingsMultipleWebsitesFailed = (state: MultipleWebsitesState) => state.GetSettingsMultipleWebsitesFailed;
