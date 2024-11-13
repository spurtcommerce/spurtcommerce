/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
// effects
import { createEffect, Actions, ofType } from '@ngrx/effects';
// store
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../product-action/product.action';
import * as layoutActions from '../../layout/action/layout.action';

import { catchError } from 'rxjs/operators';
// service
import { ProductService } from '../product.service';
import { tap } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import * as store from '../../../../app.state.interface';
import { ProductModel } from '../../layout/models/product.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProductEffect {
  constructor(
    private action$: Actions,
    protected appState: Store<store.AppState>,
    private service: ProductService,
    private toastr: ToastrService
  ) {
  }

  // Product list
  
  doprodlists$: Observable<Action> = createEffect(() => this.action$.pipe(
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
  ));
  // Product list count
  
  doprodlistscount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_COUNT),
    map((action: actions.GetProductCountAction) => action.payload),
    switchMap(state => {
      return this.service.productCount(state).pipe(
        map(count => new actions.GetProductCountSuccessAction(count)),
        catchError(error => of(new actions.GetProductCountFailAction(error)))
      );
    })
  ));
  // Product delete
  
  doProductDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_DELETE),
    map((action: actions.DoProductDeleteAction) => action.payload),
    switchMap(state => {
      return this.service.productDelete(state).pipe(
        switchMap(user => [new actions.DoProductDeleteSuccessAction(user)]),
        catchError(error => of(new actions.DoProductDeleteFailAction(error)))
      );
    })
  ));
  // Product add
  
  doProductAdd$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_ADD),
    map((action: actions.DoProductAddAction) => action.payload),
    switchMap(state => {
      return this.service.productAdd(state).pipe(
        map(user => new actions.DoProductAddSuccessAction(user)),
        catchError(error => of(new actions.DoProductAddFailAction(error)))
      );
    })
  ));
  // Product update
  
  doProductUpdate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_UPDATE),
    map((action: actions.DoProductUpdateAction) => action.payload),
    switchMap(state => {
      return this.service.productUpdate(state).pipe(
        switchMap(user => [new actions.DoProductUpdateSuccessAction(user)]),
        catchError(error => of(new actions.DoProductUpdateFailAction(error)))
      );
    })
  ));
  // Product detail
  
  doDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_DETAIL),
    map((action: actions.GetProductDetailAction) => action.payload),
    switchMap(state => {
      return this.service.productDetail(state).pipe(
        switchMap(user => [new actions.GetProductDetailSuccess(user)]),
        catchError(error => of(new actions.GetProductDetailFail(error)))
      );
    })
  ));


  // Get Rating list
  
  DoRatingList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_RATING),
    map((action: actions.GetProductRating) => action.payload),
    switchMap(state => {
      return this.service.ratingListApi(state).pipe(
        switchMap(user => [new actions.GetProductRatingSuccess(user)]),
        catchError(error => of(new actions.GetProductRatingFail(error)))
      );
    })
  ));

  // Rating Status

  
  // Product Bulk Delete
  
  doProductBulkDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_BULK_DELETE),
    map((action: actions.DoProductBulkDelete) => action.payload),
    switchMap(state => {
      return this.service.productBulkDelete(state).pipe(
        switchMap(user => [new actions.DoProductBulkDeleteSuccess(user)]),
        catchError(error => of(new actions.DoProductBulkDeleteFail(error)))
      );
    })
  ));

  // Product Excel
  
  doProductExcel$: Observable<Action> = createEffect(() => this.action$.pipe(
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
  ));



  // Product Excel
  
  doProductAllExcel$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_ALL_EXCEL),
    map((action: actions.DoProductAllExcel) => action.payload),
    switchMap(state => {
      return this.service.productAllExcel(state).pipe(
        tap(data => {
          const filename = 'ProductExcel_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(user => [new actions.DoProductExcelSuccess(user)]),
        catchError(error => of(new actions.DoProductExcelFail(error)))
      );
    })
  ));

  
  videoUpload$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VIDEO_UPLOAD),
    map((action: actions.VideoUpload) => action.payload),
    switchMap(state => {
      return this.service.videoUpload(state).pipe(
        switchMap(user => [new actions.VideoUploadSuccess(user)]),
        catchError(error => of(new actions.VideoUploadFail(error)))
      );
    })
  ));

  
  videoPreview$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VIDEO_PREVIEW),
    map((action: actions.videoPreview) => action.payload),
    switchMap(state => {
      return this.service.videoPreview(state).pipe(
        switchMap(user => [new actions.videoPreviewSuccess(user)]),
        catchError(error => of(new actions.videoPreviewFail(error)))
      );
    })
  ));


  /**
   * Shows error notification with given title and message
   *
   * @params message
   */
  private showNotificationError(message: string): void {
    this.toastr.error(message);
  }

  private showSuccess(message) {
    this.toastr.success(message);
  }
}
