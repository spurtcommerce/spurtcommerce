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
import * as actions from '../action/myShop.action';

import { catchError } from 'rxjs/operators';
// service
import { MyShopService } from '../myShop.service';
import { tap } from 'rxjs/operators';
import * as store from '../../app.state.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';

@Injectable()
export class MyShopEffect {
  constructor(
    private action$: Actions,
    private service: MyShopService,
    private popup: NgbModal, public router: Router, public toaster: ToastrService
  ) { }


  // basicDetailCreate 
  
  basicDetailCreate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.BASIC_DETAIL_CREATE_ACTION),
    map((action: actions.basicDetailCreateAction) => action.payload),
    switchMap(state => {
      return this.service.basicDetailCreate(state).pipe(
        switchMap(product => [
          new actions.basicDetailCreateSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.basicDetailCreateFailAction(error))
        )
      );
    })
  ));

  // basicDetailGet 
  
  basicDetailGet$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.BASIC_DETAIL_GET_ACTION),
    map((action: actions.basicDetailGetAction) => action.payload),
    switchMap(state => {
      return this.service.basicDetailGet(state).pipe(
        switchMap(product => [
          new actions.basicDetailGetSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.basicDetailGetFailAction(error))
        )
      );
    })
  ));

  // certificateUpdate 
  
  certificateUpdate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.CERTIFICATE_UPDATE_ACTION),
    map((action: actions.certificateUpdateAction) => action.payload),
    switchMap(state => {
      return this.service.certificateUpdate(state).pipe(
        switchMap(product => [
          new actions.certificateUpdateSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.certificateUpdateFailAction(error))
        )
      );
    })
  ));



  // certificateDetail 
  
  certificateDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.CERTIFICATE_DETAIL_ACTION),
    map((action: actions.certificateDetailAction) => action.payload),
    switchMap(state => {
      return this.service.certificateDetail(state).pipe(
        switchMap(product => [
          new actions.certificateDetailSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.certificateDetailFailAction(error))
        )
      );
    })
  ));

  // imageUpload 
  
  imageUpload$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.IMAGE_UPLOAD_ACTION),
    map((action: actions.imageUploadAction) => action.payload),
    switchMap(state => {
      return this.service.imageUpload(state).pipe(
        switchMap(product => [
          new actions.imageUploadSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.imageUploadFailAction(error))
        )
      );
    })
  ));



  // imageUpdate 
  
  imageUpdate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.IMAGE_UPDATE_ACTION),
    map((action: actions.imageUpdateAction) => action.payload),
    switchMap(state => {
      return this.service.imageUpdate(state).pipe(
        switchMap(product => [
          new actions.imageUpdateSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.imageUpdateFailAction(error))
        )
      );
    })
  ));

  // imageDetail 
  
  imageDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.IMAGE_DETAIL_ACTION),
    map((action: actions.imageDetailAction) => action.payload),
    switchMap(state => {
      return this.service.imageDetail(state).pipe(
        switchMap(product => [
          new actions.imageDetailSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.imageDetailFailAction(error))
        )
      );
    })
  ));


  // videoUpload 
  
  videoUpload$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VIDEO_UPLOAD_ACTION),
    map((action: actions.videoUploadAction) => action.payload),
    switchMap(state => {
      return this.service.videoUpload(state).pipe(
        switchMap(product => [
          new actions.videoUploadSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.videoUploadFailAction(error))
        )
      );
    })
  ));



  // videoUpdate 
  
  videoUpdate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VIDEO_UPDATE_ACTION),
    map((action: actions.videoUpdateAction) => action.payload),
    switchMap(state => {
      return this.service.videoUpdate(state).pipe(
        switchMap(product => [
          new actions.videoUpdateSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.videoUpdateFailAction(error))
        )
      );
    })
  ));


  // videoDetail 
  
  videoDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VIDEO_DETAIL_ACTION),
    map((action: actions.videoDetailAction) => action.payload),
    switchMap(state => {
      return this.service.videoDetail(state).pipe(
        switchMap(product => [
          new actions.videoDetailSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.videoDetailFailAction(error))
        )
      );
    })
  ));

  // certificateList 
  
  certificateList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.CERTIFICATE_LIST_ACTION),
    map((action: actions.certificateListAction) => action.payload),
    switchMap(state => {
      return this.service.certificateList(state).pipe(
        switchMap(product => [
          new actions.certificateListSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.certificateListFailAction(error))
        )
      );
    })
  ));

  // certificateListCount 
  
  certificateListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.CERTIFICATE_LIST_COUNT_ACTION),
    map((action: actions.certificateListCountAction) => action.payload),
    switchMap(state => {
      return this.service.certificateListCount(state).pipe(
        switchMap(product => [
          new actions.certificateListCountSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.certificateListCountFailAction(error))
        )
      );
    })
  ));

  // certificateDelete 
  
  certificateDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.CERTIFICATE_DELETE_ACTION),
    map((action: actions.certificateDeleteAction) => action.payload),
    switchMap(state => {
      return this.service.certificateDelete(state).pipe(
        switchMap(product => [
          new actions.certificateDeleteSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.certificateDeleteFailAction(error))
        )
      );
    })
  ));

  // DocumentUpload 
  
  DocumentUpload$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DOCUMENT_UPLOAD_ACTION),
    map((action: actions.DocumentUploadAction) => action.payload),
    switchMap(state => {
      return this.service.DocumentUpload(state).pipe(
        switchMap(product => [
          new actions.DocumentUploadSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.DocumentUploadFailAction(error))
        )
      );
    })
  ));

  // documentType 
  
  documentType$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DOCUMENT_TYPE_ACTION),
    map((action: actions.documentTypeAction) => action.payload),
    switchMap(state => {
      return this.service.documentType(state).pipe(
        switchMap(product => [
          new actions.documentTypeSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.documentTypeFailAction(error))
        )
      );
    })
  ));

  // certificateCreate 
  
  certificateCreate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.CREATE_CERTIFICATE_ACTION),
    map((action: actions.certificateCreateAction) => action.payload),
    switchMap(state => {
      return this.service.certificateCreate(state).pipe(
        switchMap(product => [
          new actions.certificateCreateSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.certificateCreateFailAction(error))
        )
      );
    })
  ));

  // VideoStatusChange 
  
  VideoStatusChange$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VIDEO_STATUS_CHANGE_ACTION),
    map((action: actions.VideoStatusChangeAction) => action.payload),
    switchMap(state => {
      return this.service.VideoStatusChange(state).pipe(
        switchMap(product => [
          new actions.VideoStatusChangeSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.VideoStatusChangeFailAction(error))
        )
      );
    })
  ));


  // personalized settings

  // updatePersonalizedSettings

  updatePersonalizedSettings$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.UPDATE_PERSONALIZED_SETTINGS_ACTION),
    map((action: actions.updatePersonalizedSettingsAction) => action.payload),
    switchMap(state => {
      return this.service.updatePersonalizedSettings(state).pipe(
        switchMap(product => [
          new actions.updatePersonalizedSettingsSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.updatePersonalizedSettingsFailAction(error))
        )
      );
    })
  ));



  // getPersonalizedSettings

  getPersonalizedSettings$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PERSONALIZED_SETTINGS_ACTION),
    map((action: actions.getPersonalizedSettingsAction) => action.payload),
    switchMap(state => {
      return this.service.getPersonalizedSettings(state).pipe(
        switchMap(product => [
          new actions.getPersonalizedSettingsSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.getPersonalizedSettingsFailAction(error))
        )
      );
    })
  ));

}
