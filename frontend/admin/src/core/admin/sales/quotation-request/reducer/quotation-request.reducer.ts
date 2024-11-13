/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../actions/quotation-request.action';
import {
  QuotationRequestState,
  QuotationRequestStateRecord
} from './quotation-request.state';

export const initialState: QuotationRequestState = new QuotationRequestStateRecord() as unknown as QuotationRequestState;

export function reducer(
  state = initialState,
  { type, payload }: any
): QuotationRequestState {
  if (!type) {
    return state;
  }

  switch (type) {


  // <------------------QUATATION REQUEST LIST--------------------> //

    case actions.ActionTypes.QUOTATION_LIST_ACTION: {
      return Object.assign({}, state, {
        quotationList: [],
        quotationListLoading: true,
        quotationListLoaded: false,
        quotationListFailed: false,
      });
    }

    case actions.ActionTypes.QUOTATION_LIST_SUCCESS: {
      let tempQuotationList = [];
      if (payload.data && payload.data.length > 0) {
        tempQuotationList =  payload.data.map(element => {
          return { ...element, isCollapsed: true };
        });
      }
      return Object.assign({}, state, {
        quotationList: tempQuotationList,
        quotationListLoading: false,
        quotationListLoaded: true,
        quotationListFailed: false,
      });
    }

    case actions.ActionTypes.QUOTATION_LIST_FAIL: {
      return Object.assign({}, state, {
        quotationList: [],
        quotationListLoading: false,
        quotationListLoaded: false,
        quotationListFailed: true,
      });
    }

  // <------------------QUATATION REQUEST LIST COUNT--------------------> //

    case actions.ActionTypes.QUOTATION_LIST_COUNT_ACTION: {
      return Object.assign({}, state, {
        quotationListCount: '',
        quotationListCountLoading: true,
        quotationListCountLoaded: false,
        quotationListCountFailed: false,
      });
    }

    case actions.ActionTypes.QUOTATION_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        quotationListCount: payload.data,
        quotationListCountLoading: false,
        quotationListCountLoaded: true,
        quotationListCountFailed: false,
      });
    }

    case actions.ActionTypes.QUOTATION_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        quotationListCount: '',
        quotationListCountLoading: false,
        quotationListCountLoaded: false,
        quotationListCountFailed: true,
      });
    }

    default: {
      return state;
    }

  }
}

//
export const quotationList = (state: QuotationRequestState) => state.quotationList;
export const quotationListLoading = (state: QuotationRequestState) => state.quotationListLoading;
export const quotationListLoaded = (state: QuotationRequestState) => state.quotationListLoaded;

export const quotationListCount = (state: QuotationRequestState) => state.quotationListCount;
export const quotationListCountLoading = (state: QuotationRequestState) => state.quotationListCountLoading;
export const quotationListCountLoaded = (state: QuotationRequestState) => state.quotationListCountLoaded;
