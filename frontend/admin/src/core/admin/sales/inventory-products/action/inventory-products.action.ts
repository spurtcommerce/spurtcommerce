/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { type } from '../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';
// Model

export const ActionTypes = {

  INVENTORY_PRODUCT_LIST: type('[Inventory] Inventory Product List'),
  INVENTORY_PRODUCT_LIST_SUCCESS: type('[Inventory] Inventory Product List Success'),
  INVENTORY_PRODUCT_LIST_FAIL: type('[Inventory] Inventory Product List Fail'),

  INVENTORY_PRODUCT_LIST_COUNT: type('[Inventory] Inventory Product List Count'),
  INVENTORY_PRODUCT_LIST_COUNT_SUCCESS: type('[Inventory] Inventory Product List Count Success'),
  INVENTORY_PRODUCT_LIST_COUNT_FAIL: type('[Inventory] Inventory Product List Count Fail'),

  UPDATE_STOCK: type('[Inventory] Update Stock'),
  UPDATE_STOCK_SUCCESS: type('[Inventory] Update Stock Success'),
  UPDATE_STOCK_FAIL: type('[Inventory] Update Stock Fail'),
};



// inventory product list

export class InventoryProductListAction implements Action {
  type = ActionTypes.INVENTORY_PRODUCT_LIST;
  constructor(public payload: any) {}
}

export class InventoryProductListSuccess implements Action {
  type = ActionTypes.INVENTORY_PRODUCT_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class InventoryProductListFail implements Action {
  type = ActionTypes.INVENTORY_PRODUCT_LIST_FAIL;
  constructor(public payload: any = null) {}
}


// inventory product list count

export class InventoryProductListCountAction implements Action {
  type = ActionTypes.INVENTORY_PRODUCT_LIST_COUNT;
  constructor(public payload: any) {}
}

export class InventoryProductListCountSuccess implements Action {
  type = ActionTypes.INVENTORY_PRODUCT_LIST_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class InventoryProductListCountFail implements Action {
  type = ActionTypes.INVENTORY_PRODUCT_LIST_COUNT_FAIL;
  constructor(public payload: any = null) {}
}


// update stock

export class UpdateStockAction implements Action {
  type = ActionTypes.UPDATE_STOCK;
  constructor(public payload: any) {}
}

export class UpdateStockSuccess implements Action {
  type = ActionTypes.UPDATE_STOCK_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateStockFail implements Action {
  type = ActionTypes.UPDATE_STOCK_FAIL;
  constructor(public payload: any = null) {}
}


