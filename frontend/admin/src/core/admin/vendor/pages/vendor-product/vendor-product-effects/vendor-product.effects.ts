/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError } from 'rxjs/operators';
import * as actions from '../vendor-product-action/vendor-product.action';
import { VendorProductService } from '../vendor-product.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Injectable()
export class VendorProductEffects {
  constructor(
    private action$: Actions,
    public router: Router,
    private productService: VendorProductService
  ) { }

  
  docatlist$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_CAT_LIST),
    map((action: actions.DoCatlistAction) => action.payload),
    switchMap(state => {
      return this.productService.catList(state).pipe(
        switchMap(lists => [new actions.DoCatlistSuccessAction(lists)]),
        catchError(error => of(new actions.DoCatlistFailAction(error)))
      );
    })
  ));

  
  videoUpload$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VIDEO_UPLOAD),
    map((action: actions.uploadVideo) => action.payload),
    switchMap(state => {
      return this.productService.videoUpload(state).pipe(
        switchMap(lists => [new actions.uploadVideoSuccess(lists)]),
        catchError(error => of(new actions.uploadVideoFail(error)))
      );
    })
  ));

  
  sellerList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_SELLER_LIST),
    map((action: actions.GetSellerList) => action.payload),
    switchMap(state => {
      return this.productService.sellerList(state).pipe(
        switchMap(SellerList => [new actions.GetSellerListSuccess(SellerList)]),
        catchError(error => of(new actions.GetSellerListFail(error)))
      );
    })
  ));

  
  doProductAdd$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_ADD),
    map((action: actions.DoProductAddAction) => action.payload),
    switchMap(state => {
      return this.productService.productAdd(state).pipe(
        tap(data => {
          if (data) {
            this.router.navigate(['/vendors/manage-products/vendor-products']);
          }
        }),
        switchMap(user => [new actions.DoProductAddSuccessAction(user)]),
        catchError(error => of(new actions.DoProductAddFailAction(error)))
      );
    })
  ));
  
  doProductCommision$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_COMMISSION),
    map((action: actions.DoProductCommissionAction) => action.payload),
    switchMap(state => {
      return this.productService.productCommission(state).pipe(
        tap(data => {

        }),
        switchMap(user => [new actions.DoProductCommissionSuccessAction(user)]),
        catchError(error => of(new actions.DoProductCommissionFailAction(error)))
      );
    })
  ));

  
  doprodlists$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_LIST),
    map((action: actions.GetProductlistAction) => action.payload),
    switchMap(state => {
      return this.productService.productList(state).pipe(
        switchMap(product => [
          new actions.GetProductlistSuccessAction(product)
        ]),
        catchError(error => of(new actions.GetProductlistFailAction(error)))
      );
    })
  ));


  
  doProductDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_DELETE),
    map((action: actions.DoProductDeleteAction) => action.payload),
    switchMap(state => {
      return this.productService.productDelete(state).pipe(
        switchMap(user => [new actions.DoProductDeleteSuccessAction(user)]),
        catchError(error => of(new actions.DoProductDeleteFailAction(error)))
      );
    })
  ));




  
  doSellerApproval$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_SELLER_APPROVAL),
    map((action: actions.DoSellerApproval) => action.payload),
    switchMap(state => {
      return this.productService.sellerApproval(state).pipe(
        switchMap(user => [new actions.DoSellerApprovalSuccess(user)]),
        catchError(error => of(new actions.DoSellerApprovalFail(error)))
      );
    })
  ));

  
  doProductStatus$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_STATUS),
    map((action: actions.DoSellerApproval) => action.payload),
    switchMap(state => {
      return this.productService.productStatus(state).pipe(
        switchMap(status => [new actions.DoProductStatusSuccess(status)]),
        catchError(error => of(new actions.DoProductStatusFail(error)))
      );
    })
  ));

  
  doProductUpdate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_UPDATE),
    map((action: actions.DoProductUpdateAction) => action.payload),
    switchMap(state => {
      return this.productService.productUpdate(state).pipe(
        switchMap(user => [new actions.DoProductUpdateSuccessAction(user)]),
        catchError(error => of(new actions.DoProductUpdateFailAction(error)))
      );
    })
  ));


  
  doDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_DETAIL),
    map((action: actions.GetProductDetailAction) => action.payload),
    switchMap(state => {
      return this.productService.productDetail(state).pipe(
        switchMap(user => [new actions.GetProductDetailSuccess(user)]),
        catchError(error => of(new actions.GetProductDetailFail(error)))
      );
    })
  ));


  // Product Excel
  
  doProductExcel$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_EXCEL),
    map((action: actions.DoProductExcel) => action.payload),
    switchMap(state => {
      return this.productService.productExcel(state).pipe(
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
  
  doProductsExcel$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCTS_EXCEL),
    map((action: actions.DoProductsExcel) => action.payload),
    switchMap(state => {
      return this.productService.productAllExcel(state).pipe(
        tap(data => {
          const filename = 'ProductsExcel_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(user => [new actions.DoProductsExcelSuccess(user)]),
        catchError(error => of(new actions.DoProductsExcelFail(error)))
      );
    })
  ));

  
  vendorProductCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_VENDOR_PRODUCT_COUNT),
    map((action: actions.GetVendorProductCountAction) => action.payload),
    switchMap(state => {
      return this.productService.getVendorProductCounts().pipe(
        switchMap(lists => [new actions.GetVendorProductCountSuccess(lists)]),
        catchError(error => of(new actions.GetVendorProductCountFail(error)))
      );
    })
  ));

  // get venor product list count for each vendor

  
  productcount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VENDOR_PRODUCT_COUNT),
    map((action: actions.VendorProductCountAction) => action.payload),
    switchMap(state => {
      return this.productService.vendorProductCount(state).pipe(
        switchMap(lists => [new actions.VendorProductCountSuccess(lists)]),
        catchError(error => of(new actions.VendorProductCountFail(error)))
      );
    })
  ));

  
  manufacturerList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.MANUFACTURER_LIST),
    map((action: actions.ManufacturerListAction) => action.payload),
    switchMap(state => {
      return this.productService.manufacturerList(state).pipe(
        switchMap(lists => [new actions.ManufacturerListSuccess(lists)]),
        catchError(error => of(new actions.ManufacturerListFail(error)))
      );
    })
  ));

  
  ProductListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.PRODUCT_LIST_COUNT),
    map((action: actions.ProductListCountAction) => action.payload),
    switchMap(state => {
      return this.productService.productListCount(state).pipe(
        switchMap(lists => [new actions.ProductListCountSuccess(lists)]),
        catchError(error => of(new actions.ProductListCountFail(error)))
      );
    })
  ));


}
