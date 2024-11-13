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
import * as actions from '../vendor-group-action/vendor-group.action';
import { VendorGroupService } from '../vendor-group.service';
import { Router } from '@angular/router';

@Injectable()
export class vendorGroupEffects {
  constructor(
    private action$: Actions,
    public router: Router,
    private sellerService: VendorGroupService
  ) {}

  
  vendorGroupList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VENDOR_GROUP_LIST),
    map((action: actions.vendorGroup) => action.payload),
    switchMap(state => {
      return this.sellerService.vendorGroupList(state).pipe(
        switchMap(SellerList => [new actions.vendorGroupSuccess(SellerList)]),
        catchError(error => of(new actions.vendorGroupFail(error)))
      );
    })
  ));

  // industryList
  
  industryList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.INDUSTRY_LIST),
    map((action: actions.industryList) => action.payload),
    switchMap(state => {
      return this.sellerService.industryList(state).pipe(
        switchMap(SellerList => [new actions.industryListSuccess(SellerList)]),
        catchError(error => of(new actions.industryListFail(error)))
      );
    })
  ));

  
  vendorGroupListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VENDOR_GROUP_LIST_COUNT),
    map((action: actions.vendorGroupCount) => action.payload),
    switchMap(state => {
      return this.sellerService.vendorGroupListCount(state).pipe(
        switchMap(SellerList => [new actions.vendorGroupCountSuccess(SellerList)]),
        catchError(error => of(new actions.vendorGroupCountFail(error)))
      );
    })
  ));

  
  vendorGroupAdd$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VENDOR_GROUP_ADD),
    map((action: actions.vendorGroupAdd) => action.payload),
    switchMap(state => {
      return this.sellerService.vendorGroupAdd(state).pipe(
        switchMap(SellerList => [new actions.vendorGroupAddSuccess(SellerList)]),
        catchError(error => of(new actions.vendorGroupAddFail(error)))
      );
    })
  ));

  
  vendorGroupDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VENDOR_GROUP_DETAIL),
    map((action: actions.vendorGroupDetail) => action.payload),
    switchMap(state => {
      return this.sellerService.vendorGroupDetail(state).pipe(
        switchMap(SellerList => [new actions.vendorGroupDetailSuccess(SellerList)]),
        catchError(error => of(new actions.vendorGroupDetailFail(error)))
      );
    })
  ));

  
  vendorGroupDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VENDOR_GROUP_DELETE),
    map((action: actions.vendorGroupDelete) => action.payload),
    switchMap(state => {
      return this.sellerService.vendorGroupDelete(state).pipe(
        switchMap(SellerList => [new actions.vendorGroupDeleteSuccess(SellerList)]),
        catchError(error => of(new actions.vendorGroupDeleteFail(error)))
      );
    })
  ));

  
  vendorGroupCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VENDOR_GROUP_COUNT),
    map((action: actions.vendorGroupCountAction) => action.payload),
    switchMap(state => {
      return this.sellerService.vendorGroupCount(state).pipe(
        switchMap(SellerList => [new actions.vendorGroupCountActionSuccess(SellerList)]),
        catchError(error => of(new actions.vendorGroupCountActionFail(error)))
      );
    })
  ));

  
  vendorGroupUpdate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VENDOR_GROUP_UPDATE),
    map((action: actions.vendorGroupUpdate) => action.payload),
    switchMap(state => {
      return this.sellerService.vendorGroupUpdate(state).pipe(
        switchMap(SellerList => [new actions.vendorGroupUpdateSuccess(SellerList)]),
        catchError(error => of(new actions.vendorGroupUpdateFail(error)))
      );
    })
  ));
}
