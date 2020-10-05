/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as store from '../../state.interface';
import { catchError } from 'rxjs/internal/operators';
import * as actions from './../action/product-control.action';
import { ProductControlService } from '../product-control.service';

@Injectable()
export class ProductControlEffect {
  parameter: any = { limit: '', offser: 0 };
  countParameter: any = { limit: '', offser: 0, count: true };
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private actions$: Actions,
    private authApi: ProductControlService,
    private appState$: Store<store.AppState>
  ) {}

  @Effect()
  checkout$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DO_CHECKOUT),
    map((action: actions.DoCheckoutAction) => action.payload),
    switchMap(state => {
      const cartList = state.productDetails.product;
      state.productDetails = cartList;
      return this.authApi.CheckoutProduct(state).pipe(
        tap(res => {
          if (res.status === 3) {
            const cartParams: any = {};
            cartParams.products = [];
            cartParams.productTotal = 0;
            cartParams.totalPrice = 0;
            cartParams.changeCountTotalPrice = 0;
            if (isPlatformBrowser(this.platformId)) {
              sessionStorage.setItem(
                'productTotal',
                JSON.stringify(cartParams.totalPrice)
              );
              sessionStorage.setItem(
                'selectedProducts',
                JSON.stringify(cartParams.products)
              );
              sessionStorage.setItem(
                'selectedProductsCount',
                JSON.stringify(cartParams.productTotal)
              );
            }
            this.appState$.dispatch(new actions.CartHandleAction(cartParams));
            window.open('http://' + res.data, '_self');
          }
        }),
        map(checkout => new actions.CheckoutActionSuccess(checkout)),
        catchError(error => of(new actions.CheckoutActionFail(error)))
      );
    })
  );
}
