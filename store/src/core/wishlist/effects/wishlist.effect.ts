/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as store from '../../state.interface';
import { catchError } from 'rxjs/internal/operators';
import * as actions from './../action/wishlist.action';
import { WishlistService } from '../wishlist.service';
import * as countActions from '../../common/action/common.action';

@Injectable()
export class WishlistEffect {
  parameter: any = { limit: '', offser: 0 };
  countParameter: any = { limit: '', offser: 0, count: true };
  constructor(
    private actions$: Actions,
    private authApi: WishlistService,
    private appState$: Store<store.AppState>
  ) {}

  @Effect()
  getWishlist$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.get_wishlist),
    map((action: actions.GetWishlist) => action.payload),
    switchMap(state => {
      return this.authApi.getWishlist(state).pipe(
        map(wishlish => new actions.GetWishlistSuccess(wishlish)),
        catchError(error => of(new actions.GetWishlistFail(error)))
      );
    })
  );
  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.delete_product),
    map((action: actions.DeleteProduct) => action.payload),
    switchMap(state => {
      return this.authApi.deleteProduct(state).pipe(
        switchMap(product => [
          new actions.DeleteProductSuccess(product),
          new actions.GetWishlist(this.parameter),
          new countActions.GetWishlistCount(this.countParameter)
        ]),
        catchError(error => of(new actions.DeleteProductFail(error)))
      );
    })
  );
}
