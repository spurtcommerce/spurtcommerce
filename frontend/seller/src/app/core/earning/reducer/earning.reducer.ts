/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from "../action/earning.action";
import { EarningState, EarningRecord } from "./earning.state";

export const initialState: EarningState =
  new EarningRecord() as unknown as EarningState;
export function reducer(
  state = initialState,
  { type, payload }: any
): EarningState {
  if (!type) {
    return state;
  }
  switch (type) {
   

    /* get earning list*/
    case actions.ActionTypes.EARNING_LIST: {
      return Object.assign({}, state, {
       GetEarningLoading: true,
       GetEarningLoaded: false,
       GetEarningFailed: false,
      });
    }

    case actions.ActionTypes.EARNING_LIST_SUCCESS: {
      return Object.assign({}, state, {
       GetEarning: payload,
       GetEarningLoading: false,
       GetEarningLoaded: true,
       GetEarningFailed: false,
      });
    }
    case actions.ActionTypes.EARNING_LIST_FAIL: {
      return Object.assign({}, state, {
       GetEarning: 0,
       GetEarningLoading: false,
       GetEarningLoaded: true,
       GetEarningFailed: true,
      });
    }


     /* get earning  count*/
     case actions.ActionTypes.EARNING_COUNT: {
      return Object.assign({}, state, {
       GetEarningCountLoading: true,
       GetEarningCountLoaded: false,
       GetEarningCountFailed: false,
      });
    }

    case actions.ActionTypes.EARNING_COUNT_SUCCESS: {
      return Object.assign({}, state, {
       GetEarningCount: payload,
       GetEarningCountLoading: false,
       GetEarningCountLoaded: true,
       GetEarningCountFailed: false,
      });
    }
    case actions.ActionTypes.EARNING_COUNT_FAIL: {
      return Object.assign({}, state, {
       GetEarningCount: 0,
       GetEarningCountLoading: false,
       GetEarningCountLoaded: true,
       GetEarningCountFailed: true,
      });
    }

     /*Exportexcel*/
     case actions.ActionTypes.EARNING_EXPORT: {
      return Object.assign({}, state, {
       GetEarningExportLoading: true,
       GetEarningExportLoaded: false,
       GetEarningExportFailed: false,
      });
    }

    case actions.ActionTypes.EARNING_EXPORT_SUCCESS: {
      return Object.assign({}, state, {
       GetEarningExport: payload,
       GetEarningExportLoading: false,
       GetEarningExportLoaded: true,
       GetEarningExportFailed: false,
      });
    }
    case actions.ActionTypes.EARNING_EXPORT_FAIL: {
      return Object.assign({}, state, {
       GetEarningExport: 0,
       GetEarningExportLoading: false,
       GetEarningExportLoaded: true,
       GetEarningExportFailed: true,
      });
    }



    default: {
      return state;
    }
  }
}



/* get earning list*/
export const getGetEarning = (state: EarningState) => state.GetEarning;
export const getGetEarningLoading = (state: EarningState) =>
  state.GetEarningLoading;
export const getGetEarningLoaded = (state: EarningState) =>
  state.GetEarningLoaded;
export const getGetEarningFailed = (state: EarningState) =>
  state.GetEarningFailed;


/* get earning list*/
export const getGetEarningCount = (state: EarningState) => state.GetEarningCount;
export const getGetEarningCountLoading = (state: EarningState) =>
  state.GetEarningCountLoading;
export const getGetEarningCountLoaded = (state: EarningState) =>
  state.GetEarningCountLoaded;
export const getGetEarningCountFailed = (state: EarningState) =>
  state.GetEarningCountFailed;


/*Exportexcel*/
export const getGetEarningExport = (state: EarningState) => state.GetEarningExport;
export const getGetEarningExportLoading = (state: EarningState) =>
  state.GetEarningExportLoading;
export const getGetEarningExportLoaded = (state: EarningState) =>
  state.GetEarningExportLoaded;
export const getGetEarningExportFailed = (state: EarningState) =>
  state.GetEarningExportFailed;


