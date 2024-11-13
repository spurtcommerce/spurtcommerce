/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import * as actions from '../action/layout.action';
import { CatalogLayoutState, CatalogLayoutStateRecord } from './layout.state';

export const initialState: CatalogLayoutState = new CatalogLayoutStateRecord() as unknown as CatalogLayoutState;

export function reducer(
  state = initialState,
  { type, payload }: any
): CatalogLayoutState {
  if (!type) {
    return state;
  }

  switch (type) {


     /* Get Catalog counts */

    case actions.ActionTypes.GET_CATALOG_COUNT: {
      return Object.assign({}, state, {
        catalogCount: {},
        catalogCountLoading: true,
        catalogCountLoaded: false,
        catalogCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_CATALOG_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        catalogCount: payload.data,
        catalogCountLoading: false,
        catalogCountLoaded: true,
        catalogCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_CATALOG_COUNT_FAIL: {
      return Object.assign({}, state, {
        catalogCount: {},
        catalogCountLoading: false,
        catalogCountLoaded: false,
        catalogCountFailed: true,
      });
    }

    default: {
      return state;
    }
  }
}


export const catalogCount = (state: CatalogLayoutState) =>
  state.catalogCount;
export const catalogCountLoading = (state: CatalogLayoutState) =>
  state.catalogCountLoading;
export const catalogCountLoaded = (state: CatalogLayoutState) =>
  state.catalogCountLoaded;
export const catalogCountFailed = (state: CatalogLayoutState) =>
  state.catalogCountFailed;
