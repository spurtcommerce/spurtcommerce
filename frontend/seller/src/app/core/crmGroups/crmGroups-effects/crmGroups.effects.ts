/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
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
import * as actions from '../crmGroups-action/crmGroups.action';

import { catchError } from 'rxjs/operators';
// service
import { crmGroupsService } from '../crmGroups.service';
import { tap } from 'rxjs/operators';
import * as store from '../../app.state.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';

@Injectable()
export class crmGroupsEffect {
  constructor(
    private action$: Actions,
    private service: crmGroupsService,
    private popup: NgbModal, public router: Router, public toaster: ToastrService
  ) { }


  // addCustomer 
  
  addCustomer$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.ADD_CUSTOMER_ACTION),
    map((action: actions.addCustomerAction) => action.payload),
    switchMap(state => {
      return this.service.addCustomer(state).pipe(
        switchMap(product => [
          new actions.addCustomerSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.addCustomerFailAction(error))
        )
      );
    })
  ));

  // customerGroupList 
  
  customerGroupList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.CUSTOMER_GROUP_LIST_ACTION),
    map((action: actions.customerGroupListAction) => action.payload),
    switchMap(state => {
      return this.service.customerGroupList(state).pipe(
        switchMap(product => [
          new actions.customerGroupListSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.customerGroupListFailAction(error))
        )
      );
    })
  ));

  // addCustomerGroup 
  
  addCustomerGroup$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.ADD_CUSTOMER_GROUP_ACTION),
    map((action: actions.addCustomerGroupAction) => action.payload),
    switchMap(state => {
      return this.service.addCustomerGroup(state).pipe(
        switchMap(product => [
          new actions.addCustomerGroupSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.addCustomerGroupFailAction(error))
        )
      );
    })
  ));



  // updateCustomerGroup 
  
  updateCustomerGroup$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.UPDATE_CUSTOMER_GROUP_ACTION),
    map((action: actions.updateCustomerGroupAction) => action.payload),
    switchMap(state => {
      return this.service.updateCustomerGroup(state).pipe(
        switchMap(product => [
          new actions.updateCustomerGroupSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.updateCustomerGroupFailAction(error))
        )
      );
    })
  ));

  // deleteCustomerGroup 
  
  deleteCustomerGroup$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DELETE_CUSTOMER_GROUP_ACTION),
    map((action: actions.deleteCustomerGroupAction) => action.payload),
    switchMap(state => {
      return this.service.deleteCustomerGroup(state).pipe(
        switchMap(product => [
          new actions.deleteCustomerGroupSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.deleteCustomerGroupFailAction(error))
        )
      );
    })
  ));


  // customerGroupListCount 
  
  customerGroupListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.CUSTOMER_GROUP_LIST_COUNT_ACTION),
    map((action: actions.customerGroupListCountAction) => action.payload),
    switchMap(state => {
      return this.service.customerGroupListCount(state).pipe(
        switchMap(product => [
          new actions.customerGroupListCountSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.customerGroupListCountFailAction(error))
        )
      );
    })
  ));


  // customerList 
  
  customerList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.CUSTOMER_LIST_ACTION),
    map((action: actions.customerListAction) => action.payload),
    switchMap(state => {
      return this.service.customerList(state).pipe(
        switchMap(product => [
          new actions.customerListSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.customerListFailAction(error))
        )
      );
    })
  ));


  // customerDetails 
  
  customerDetails$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.CUSTOMER_DETAILS_ACTION),
    map((action: actions.customerDetailsAction) => action.payload),
    switchMap(state => {
      return this.service.customerDetails(state).pipe(
        switchMap(product => [
          new actions.customerDetailsSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.customerDetailsFailAction(error))
        )
      );
    })
  ));

  // customerStatusUpdate 
  
  customerStatusUpdate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.CUSTOMER_STATUS_UPDATE_ACTION),
    map((action: actions.customerStatusUpdateAction) => action.payload),
    switchMap(state => {
      return this.service.customerStatusUpdate(state).pipe(
        switchMap(product => [
          new actions.customerStatusUpdateSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.customerStatusUpdateFailAction(error))
        )
      );
    })
  ));

  // customerGroupDetail 
  
  customerGroupDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.CUSTOMER_GROUP_DETAIL_ACTION),
    map((action: actions.customerGroupDetailAction) => action.payload),
    switchMap(state => {
      return this.service.customerGroupDetail(state).pipe(
        switchMap(product => [
          new actions.customerGroupDetailSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.customerGroupDetailFailAction(error))
        )
      );
    })
  ));

  // customerGroupUpdate 
  
  customerGroupUpdate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.CUSTOMER_GROUP_UPDATE_ACTION),
    map((action: actions.customerGroupUpdateAction) => action.payload),
    switchMap(state => {
      return this.service.customerGroupUpdate(state).pipe(
        switchMap(product => [
          new actions.customerGroupUpdateSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.customerGroupUpdateFailAction(error))
        )
      );
    })
  ));
}
