/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as personalizeProductsetting from './product-action/product-action';
import * as store from '../../../../app.state.interface';
import { Router } from '@angular/router';
import { ProductModel } from './product-model/product-model';
import {
  getNewPersonalizeProduct,
  getPersonalizeProduct
} from './product-reducer/product-selector';

@Injectable()
export class PersonalizeProductSandbox {
  public getNewPersonalizeProduct$ = this.appState.select(
    getNewPersonalizeProduct
  );
  public getPersonalizeProduct$ = this.appState.select(getPersonalizeProduct);

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router
  ) {}

  public createPersonalizeProduct(value) {
    this.appState.dispatch(
      new personalizeProductsetting.DoNewProductSettingAction(
        new ProductModel(value)
      )
    );
  }

  public getPersonalizeProduct() {
    this.appState.dispatch(
      new personalizeProductsetting.DoGetProductSettingAction()
    );
  }
}
