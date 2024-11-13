/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
// effects
import { createEffect, Actions, ofType } from '@ngrx/effects';
// store
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../action/sellermanagement.action';
import { catchError } from 'rxjs/operators';
// service
import { SellerManagementService } from '../sellermanagement.service';
import { tap } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SellerManagementEffect {
  constructor(
    private action$: Actions,
    private service: SellerManagementService,
    private toastr: ToastrService
  ) { }

  // attributeList 
  
  attributeList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.ATTRIBUTE_LISTS_ACTION),
    map((action: actions.attributeListAction) => action.payload),
    switchMap(state => {
      return this.service.attributeList(state).pipe(
        switchMap(product => [
          new actions.attributeListSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.attributeListFailAction(error))
        )
      );
    })
  ));


  // getListAttributecount
  
  getListAttributecount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_LIST_ATTRIBUTE_COUNT_ACTION),
    map((action: actions.getListAttributecountAction) => action.payload),
    switchMap(state => {
      return this.service.getListAttributecount(state).pipe(
        switchMap(product => [
          new actions.getListAttributecountSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.getListAttributecountFailAction(error))
        )
      );
    })
  ));





  // categoryList

  
  getCategoryList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_CATEGORY_LIST_ACTION),
    map((action: actions.getCategoryListAction) => action.payload),
    switchMap(state => {
      return this.service.getCategoryList(state).pipe(
        switchMap(product => [
          new actions.getCategoryListSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.getCategoryListFailAction(error))
        )
      );
    })
  ));



  // getCategoryListCount

  
  getCategoryListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_CATEGORY_LIST_COUNT_ACTION),
    map((action: actions.getCategoryListCountAction) => action.payload),
    switchMap(state => {
      return this.service.getCategoryListCount(state).pipe(
        switchMap(product => [
          new actions.getCategoryListCountSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.getCategoryListCountFailAction(error))
        )
      );
    })
  ));

  //rejectSellerList
  
  rejectSellerList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.REJECT_SELLER_LIST_ACTION),
    map((action: actions.rejectSellerListAction) => action.payload),
    switchMap(state => {
      return this.service.rejectSellerList(state).pipe(
        switchMap(product => [
          new actions.rejectSellerListSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.rejectSellerListFailAction(error))
        )
      );
    })
  ));

  //approvedListCount
  
  approvedListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.APPROVED_SELLER_LIST_COUNT_ACTION),
    map((action: actions.approvedListCountAction) => action.payload),
    switchMap(state => {
      return this.service.approvedListCount(state).pipe(
        switchMap(product => [
          new actions.approvedListCountSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.approvedListCountFailAction(error))
        )
      );
    })
  ));

  //rejectSellerListCount
  
  rejectSellerListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.REJECT_SELLER_LIST_COUNT_ACTION),
    map((action: actions.rejectSellerListCountAction) => action.payload),
    switchMap(state => {
      return this.service.rejectSellerListCount(state).pipe(
        switchMap(product => [
          new actions.rejectSellerListCountSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.rejectSellerListCountFailAction(error))
        )
      );
    })
  ));

  //approveListStatus
  
  approveListStatus$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.APPROVE_LIST_STATUS_ACTION),
    map((action: actions.approveListStatusAction) => action.payload),
    switchMap(state => {
      return this.service.approveListStatus(state).pipe(
        switchMap(product => [
          new actions.approveListStatusSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.approveListStatusFailAction(error))
        )
      );
    })
  ));


  //countryList
  
  countryList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.COUNTRY_LIST_ACTION),
    map((action: actions.countryListAction) => action.payload),
    switchMap(state => {
      return this.service.countryList(state).pipe(
        switchMap(product => [
          new actions.countryListSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.countryListFailAction(error))
        )
      );
    })
  ));

   //comment
   
   comment$: Observable<Action> = createEffect(() => this.action$.pipe(
     ofType(actions.ActionTypes.COMMENT_ACTION),
     map((action: actions.commentAction) => action.payload),
     switchMap(state => {
       return this.service.comment(state).pipe(
         switchMap(product => [
           new actions.commentSuccessAction(product)
         ]),
         catchError(error =>
           of(new actions.commentFailAction(error))
         )
       );
     })
   ));
}


