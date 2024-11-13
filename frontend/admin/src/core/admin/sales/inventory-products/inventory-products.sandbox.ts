/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
// store
import { Store } from '@ngrx/store';
// app state
import * as store from '../../../app.state.interface';
// action
import * as inventoryActions from './action/inventory-products.action';

import { inventoryProductList, inventoryProductListLoading,
         inventoryProductListLoaded,
         inventoryProductListCount} from './reducer/inventory-products.selectors';

// models

import { UpdateStockModel } from './models/update-stock.model';

@Injectable()
export class InventoryProductSandbox {

  public inventoryProductList$ = this.appState.select(inventoryProductList);
  public inventoryProductListLoading$ = this.appState.select(inventoryProductListLoading);
  public inventoryProductListLoaded$ = this.appState.select(inventoryProductListLoaded);
  public inventoryProductListCount$ = this.appState.select(inventoryProductListCount);


  constructor(
    protected appState: Store<store.AppState>,
  ) {
  }

  public inventoryProductList(value) {
    this.appState.dispatch(
      new inventoryActions.InventoryProductListAction(value));
  }

  public inventoryProductListCount(value) {
    this.appState.dispatch(
      new inventoryActions.InventoryProductListCountAction(value));
  }

  public updateStock(value) {
    this.appState.dispatch(
      new inventoryActions.UpdateStockAction( new UpdateStockModel(value)));
  }

}
