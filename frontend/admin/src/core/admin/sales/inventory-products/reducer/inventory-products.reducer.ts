/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import * as actions from '../action/inventory-products.action';
// state
import { InventoryProductState, InventoryProductStateRecord } from './inventory-products.state';

export const initialState: InventoryProductState = new InventoryProductStateRecord() as unknown as InventoryProductState;

export function reducer(
  state = initialState,
  { type, payload }: any
): InventoryProductState {
  if (!type) {
    return state;
  }

  switch (type) {

  // <------------------INVENTORY PRODUCT LIST--------------------> //

    case actions.ActionTypes.INVENTORY_PRODUCT_LIST: {
      return Object.assign({}, state, {
        inventoryProductList: [],
        inventoryProductListLoading: true,
        inventoryProductListLoaded: false,
        inventoryProductListFailed: false,
      });
    }
    case actions.ActionTypes.INVENTORY_PRODUCT_LIST_SUCCESS: {
      let tempInventoryList = [];
      if (payload.data && payload.data.length > 0) {
        tempInventoryList =  payload.data.map(element => {
          return { ...element, isCollapsed: true };
        });
      }
      return Object.assign({}, state, {
        inventoryProductList: tempInventoryList,
        inventoryProductListLoading: false,
        inventoryProductListLoaded: true,
        inventoryProductListFailed: false,
      });
    }
    case actions.ActionTypes.INVENTORY_PRODUCT_LIST_FAIL: {
      return Object.assign({}, state, {
        inventoryProductList: [],
        inventoryProductListLoading: false,
        inventoryProductListLoaded: false,
        inventoryProductListFailed: true,
      });
    }

  // <------------------INVENTORY PRODUCT LIST COUNT--------------------> //

    case actions.ActionTypes.INVENTORY_PRODUCT_LIST_COUNT: {
      return Object.assign({}, state, {
        inventoryProductListCount: '',
        inventoryProductListCountLoading: true,
        inventoryProductListCountLoaded: false,
        inventoryProductListCountFailed: false,
      });
    }
    case actions.ActionTypes.INVENTORY_PRODUCT_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        inventoryProductListCount: payload.data,
        inventoryProductListCountLoading: false,
        inventoryProductListCountLoaded: true,
        inventoryProductListCountFailed: false,
      });
    }
    case actions.ActionTypes.INVENTORY_PRODUCT_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        inventoryProductListCount: '',
        inventoryProductListCountLoading: false,
        inventoryProductListCountLoaded: false,
        inventoryProductListCountFailed: true,
      });
    }

    default: {
      return state;
    }
  }
}

// inventory product list

export const inventoryProductList = (state: InventoryProductState) =>
  state.inventoryProductList;
export const inventoryProductListLoading = (state: InventoryProductState) =>
  state.inventoryProductListLoading;
export const inventoryProductListLoaded = (state: InventoryProductState) =>
  state.inventoryProductListLoaded;

// inventory product list count

export const inventoryProductListCount = (state: InventoryProductState) =>
  state.inventoryProductListCount;
export const inventoryProductListCountLoading = (state: InventoryProductState) =>
  state.inventoryProductListCountLoading;
export const inventoryProductListCountLoaded = (state: InventoryProductState) =>
  state.inventoryProductListCountLoaded;
