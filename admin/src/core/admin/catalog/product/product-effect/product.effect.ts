/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
// effects
import { Effect, Actions, ofType } from '@ngrx/effects';
// store
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../product-action/product.action';
import * as layoutActions from '../../layout/action/layout.action';

import { catchError } from 'rxjs/internal/operators';
// service
import { ProductService } from '../product.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { tap } from 'rxjs/internal/operators/tap';
import { saveAs } from 'file-saver';
import * as store from '../../../../app.state.interface';
import { ProductModel } from '../../layout/models/product.model';

@Injectable()
export class ProductEffect {
  constructor(
    private action$: Actions,
    protected appState: Store<store.AppState>,
    private service: ProductService,
    private toastr: ToastrManager
  ) {}

  // Product list
  @Effect()
  doprodlists$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_LIST),
    map((action: actions.GetProductlistAction) => action.payload),
    switchMap(state => {
      return this.service.productList(state).pipe(
        switchMap(product => [
          new actions.GetProductlistSuccessAction(product)
        ]),
        catchError(error => of(new actions.GetProductlistFailAction(error)))
      );
    })
  );
  // Product list count
  @Effect()
  doprodlistscount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_COUNT),
    map((action: actions.GetProductCountAction) => action.payload),
    switchMap(state => {
      return this.service.productCount(state).pipe(
        map(count => new actions.GetProductCountSuccessAction(count)),
        catchError(error => of(new actions.GetProductCountFailAction(error)))
      );
    })
  );
  // Product delete
  @Effect()
  doProductDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_DELETE),
    map((action: actions.DoProductDeleteAction) => action.payload),
    switchMap(state => {
      return this.service.productDelete(state).pipe(
        switchMap(user => [new actions.DoProductDeleteSuccessAction(user)]),
        catchError(error => of(new actions.DoProductDeleteFailAction(error)))
      );
    })
  );
  // Product add
  @Effect()
  doProductAdd$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_ADD),
    map((action: actions.DoProductAddAction) => action.payload),
    switchMap(state => {
      return this.service.productAdd(state).pipe(
        switchMap(user => [new actions.DoProductAddSuccessAction(user)]),
        catchError(error => of(new actions.DoProductAddFailAction(error)))
      );
    })
  );
  // Product update
  @Effect()
  doProductUpdate$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_UPDATE),
    map((action: actions.DoProductUpdateAction) => action.payload),
    switchMap(state => {
      return this.service.productUpdate(state).pipe(
        switchMap(user => [new actions.DoProductUpdateSuccessAction(user)]),
        catchError(error => of(new actions.DoProductUpdateFailAction(error)))
      );
    })
  );
  // Product detail
  @Effect()
  doDetail$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_DETAIL),
    map((action: actions.GetProductDetailAction) => action.payload),
    switchMap(state => {
      return this.service.productDetail(state).pipe(
        switchMap(user => [new actions.GetProductDetailSuccess(user)]),
        catchError(error => of(new actions.GetProductDetailFail(error)))
      );
    })
  );

  // Product Today Deals
  @Effect()
  doProductTodayDeals$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_TODAY_DEALS_DETAIL),
    map((action: actions.DoProductTodayDealAction) => action.payload),
    switchMap(state => {
      return this.service.productTodayDeals(state).pipe(
        switchMap(user => [new actions.DoProductTodayDealSuccess(user)]),
        catchError(error => of(new actions.DoProductTodayDealFail(error)))
      );
    })
  );

  // getting option value
  @Effect()
  DoGettingOptionValue$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_GETTING_OPTION),
    map((action: actions.DoGettingOption) => action.payload),
    switchMap(state => {
      return this.service.gettingOptionApi(state).pipe(
        switchMap(user => [new actions.DoGettingOptionSuccess(user)]),
        catchError(error => of(new actions.DoGettingOptionFail(error)))
      );
    })
  );
  // Product Bulk Delete
  @Effect()
  doProductBulkDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_BULK_DELETE),
    map((action: actions.DoProductBulkDelete) => action.payload),
    switchMap(state => {
      return this.service.productBulkDelete(state).pipe(
        switchMap(user => [new actions.DoProductBulkDeleteSuccess(user)]),
        catchError(error => of(new actions.DoProductBulkDeleteFail(error)))
      );
    })
  );

  // Product Excel
  @Effect()
  doProductExcel$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_EXCEL),
    map((action: actions.DoProductExcel) => action.payload),
    switchMap(state => {
      return this.service.productExcel(state).pipe(
        tap(data => {
          const filename = 'ProductExcel_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(user => [new actions.DoProductExcelSuccess(user)]),
        catchError(error => of(new actions.DoProductExcelFail(error)))
      );
    })
  );
  /**
   * Shows error notification with given title and message
   *
   * @params message
   */
  private showNotificationError(message: string): void {
    this.toastr.errorToastr(message);
  }

  private showSuccess(message) {
    this.toastr.successToastr(message);
  }
}
