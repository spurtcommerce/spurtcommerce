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
import * as actions from '../seller-action/seller.action';
import { SellerService } from '../seller.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Injectable()
export class SellerEffects {
  constructor(
    private action$: Actions,
    public router: Router,
    private sellerService: SellerService
  ) {}

  
  sellerList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_SELLER_LIST),
    map((action: actions.GetSellerList) => action.payload),
    switchMap(state => {
      return this.sellerService.sellerList(state).pipe(
        switchMap(SellerList => [new actions.GetSellerListSuccess(SellerList)]),
        catchError(error => of(new actions.GetSellerListFail(error)))
      );
    })
  ));


  
  sellerAdd$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_SELLER_ADD),
    map((action: actions.DoSellerAdd) => action.payload),
    switchMap(state => {
      return this.sellerService.sellerAdd(state).pipe(
        tap(data => {
          if (data) {
            // this.router.navigate(['/vendors/vendor/seller']);
          }
        }),
        switchMap(SellerAdd => [new actions.DoSellerAddSuccess(SellerAdd)]),
        catchError(error => of(new actions.DoSellerAddFail(error)))
      );
    })
  ));

  
  sellerUpdate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_SELLER_UPDATE),
    map((action: actions.DoSellerUpdate) => action.payload),
    switchMap(state => {
      return this.sellerService.sellerUpdate(state).pipe(
       
        switchMap(SellerUpdate => [
          new actions.DoSellerUpdateSuccess(SellerUpdate)
        ]),
        catchError(error => of(new actions.DoSellerUpdateFail(error)))
      );
    })
  ));


  
  pageDetails$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.PAGE_DETAILS),
    map((action: actions.PageDetails) => action.payload),
    switchMap(state => {
      return this.sellerService.pageDetails(state).pipe(
        map((user: any) => new actions.PageDetailsSuccess(user)),
        catchError(error => of(new actions.PageDetailsFail(error)))
      );
    })
  ));

  
  doSellerDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_DELETE_SELLER_ACTION),
    map((action: actions.DoDeleteSellerAction) => action.payload),
    switchMap(state => {
      return this.sellerService.deleteSeller(state).pipe(
        switchMap(user => [new actions.DoDeleteSellerSuccess(user)]),
        catchError(error => of(new actions.DoDeleteSellerFail(error)))
      );
    })
  ));

  
  doSellerExcel$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_SELLER_EXCEL),
    map((action: actions.DoSellerExcel) => action.payload),
    switchMap(state => {
      return this.sellerService.sellerExcel(state).pipe(
        tap(data => {
          const filename = 'SellerExcel_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(user => [new actions.DoSellerExcelSuccess(user)]),
        catchError(error => of(new actions.DoSellerExcelFail(error)))
      );
    })
  ));

  
  doSellerBulkDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_SELLER_BULK_DELETE),
    map((action: actions.DoSellerBulkDelete) => action.payload),
    switchMap(state => {
      return this.sellerService.sellerBulkDelete(state).pipe(
        switchMap(user => [new actions.DoSellerBulkDeleteSuccess(user)]),
        catchError(error => of(new actions.DoSellerBulkDeleteFail(error)))
      );
    })
  ));



  
  doSellerApproval$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_SELLER_APPROVAL),
    map((action: actions.DoSellerApproval) => action.payload),
    switchMap(state => {
      return this.sellerService.sellerApproval(state).pipe(
        switchMap(user => [new actions.DoSellerApprovalSuccess(user)]),
        catchError(error => of(new actions.DoSellerApprovalFail(error)))
      );
    })
  ));


  
  docountrylists$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_COUNTRY_LIST),
    map((action: actions.GetCountrylistAction) => action.payload),
    switchMap(state => {
      return this.sellerService.countrylist(state).pipe(
        tap(data => {
          if (data) {
          }
        }),
        switchMap(user => [new actions.GetCountrylistSuccessAction(user)]),
        catchError(error => of(new actions.GetCountrylistFailAction(error)))
      );
    })
  ));

  
  vendorCounts$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_VENDOR_COUNTS),
    map((action: actions.GetVendorCountsAction) => action.payload),
    switchMap(state => {
      return this.sellerService.vendorCounts().pipe(
        switchMap(SellerList => [new actions.GetVendorCountsSuccess(SellerList)]),
        catchError(error => of(new actions.GetVendorCountsFail(error)))
      );
    })
  ));

  
  dozonelists$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.ZONE_LIST),
    map((action: actions.ZoneListAction) => action.payload),
    switchMap(state => {
      return this.sellerService.zoneList(state).pipe(
        switchMap(user => [new actions.ZoneListSuccessAction(user)]),
        catchError(error => of(new actions.ZoneListFailAction(error)))
      );
    })
  ));

  
  sellerListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.SELLER_LIST_COUNT),
    map((action: actions.SellerListCountAction) => action.payload),
    switchMap(state => {
      return this.sellerService.sellerListCount(state).pipe(
        switchMap(SellerList => [new actions.SellerListCountSuccessAction(SellerList)]),
        catchError(error => of(new actions.SellerListCountFailAction(error)))
      );
    })
  ));

  
  getproductList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_LIST),
    map((action: actions.getproductListAction) => action.payload),
    switchMap(state => {
      return this.sellerService.getproductList(state).pipe(
        switchMap(SellerList => [new actions.getproductListSuccessAction(SellerList)]),
        catchError(error => of(new actions.getproductListFailAction(error)))
      );
    })
  ));
  
  getproductListcount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_LIST_COUNT),
    map((action: actions.getproductListcountAction) => action.payload),
    switchMap(state => {
      return this.sellerService.getproductListcount(state).pipe(
        switchMap(SellerList => [new actions.getproductListcountSuccessAction(SellerList)]),
        catchError(error => of(new actions.getproductListcountFailAction(error)))
      );
    })
  ));
  
  checkAvailability$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.CHECK_AVAILABILITY),
    map((action: actions.checkAvailAction) => action.payload),
    switchMap(state => {
      return this.sellerService.checkAvailability(state).pipe(
        switchMap(SellerList => [new actions.checkAvailSuccessAction(SellerList)]),
        catchError(error => of(new actions.checkAvailFailAction(error)))
      );
    })
  ));

  
  stateList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.STATE_LIST),
    map((action: actions.stateListAction) => action.payload),
    switchMap(state => {
      return this.sellerService.stateList(state).pipe(
        switchMap(SellerList => [new actions.stateListSuccessAction(SellerList)]),
        catchError(error => of(new actions.stateListFailAction(error)))
      );
    })
  ));
}