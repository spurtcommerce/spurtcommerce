import { Injectable } from '@angular/core';
// effects
import { createEffect, Actions, ofType } from '@ngrx/effects';
// store
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
// actions
import * as actions from '../action/sellerProduct.action';
import { catchError } from 'rxjs/operators';
// service
import { SellerProduct } from '../sellerProduct.service';
import { saveAs } from 'file-saver';


@Injectable()
export class SellerProductEffect {

  constructor(
    private action$: Actions,
    private service: SellerProduct,
  ) { }

  // sellerProductList 

  sellerProductList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.SELLER_PRODUCT_LIST_ACTION),
    map((action: actions.sellerProductListAction) => action.payload),
    switchMap(state => {
      return this.service.sellerProductList(state).pipe(
        switchMap(product => [
          new actions.sellerProductListSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.sellerProductListFailAction(error))
        )
      );
    })
  ));


  // sellerProductCount 

  sellerProductCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.SELLER_PRODUCT_COUNT_ACTION),
    map((action: actions.sellerProductCountAction) => action.payload),
    switchMap(state => {
      return this.service.sellerProductCount(state).pipe(
        switchMap(product => [
          new actions.sellerProductCountSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.sellerProductCountFailAction(error))
        )
      );
    })
  ));


  //SingleProductDataExport

  SingleProductDataExport$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.SINGLE_PRODUCT_DATA_EXPORT_ACTION),
    map((action: actions.SingleProductDataExportAction) => action.payload),
    switchMap(state => {
      return this.service.SingleProductDataExport(state).pipe(
        tap(data => {
          const filename = 'SellerExcel_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(list => [new actions.SingleProductDataExportSuccessAction(list)]),
        catchError(error => of(new actions.SingleProductDataExportFailAction(error)))
      );
    })
  ));



  //MultipleProductDataExport

  MultipleProductDataExport$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.MULTIPLE_PRODUCT_DATA_EXPORT_ACTION),
    map((action: actions.MultipleProductDataExportAction) => action.payload),
    switchMap(state => {
      return this.service.MultipleProductDataExport(state).pipe(
        tap(data => {
          const filename = 'SellerExcel_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(list => [new actions.MultipleProductDataExportSuccessAction(list)]),
        catchError(error => of(new actions.MultipleProductDataExportFailAction(error)))
      );
    })
  ));


  // approveProduct 

  approveProduct$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.APPROVED_PRODUCT_ACTION),
    map((action: actions.approveProductAction) => action.payload),
    switchMap(state => {
      return this.service.approveProduct(state).pipe(
        switchMap(product => [
          new actions.approveProductSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.approveProductFailAction(error))
        )
      );
    })
  ));

  // rejectProduct 

  rejectProduct$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.REJECT_PRODUCT_ACTION),
    map((action: actions.rejectProductAction) => action.payload),
    switchMap(state => {
      return this.service.rejectProduct(state).pipe(
        switchMap(product => [
          new actions.rejectProductSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.rejectProductFailAction(error))
        )
      );
    })
  ));


  // productStatus 

  productStatus$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.PRODUCT_STATUS_ACTION),
    map((action: actions.productStatusAction) => action.payload),
    switchMap(state => {
      return this.service.productStatus(state).pipe(
        switchMap(product => [
          new actions.productStatusSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.productStatusFailAction(error))
        )
      );
    })
  ));

}