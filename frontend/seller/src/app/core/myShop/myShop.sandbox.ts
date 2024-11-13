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
// store
import { Store } from '@ngrx/store';
// actions
import * as crmGroupsActions from './action/myShop.action';
// app state
import * as store from '../app.state.interface';

import {
  basicDetailCreate, basicDetailCreateLoading, basicDetailCreateLoaded,
  basicDetailGet, basicDetailGetLoading, basicDetailGetLoaded, certificateUpdate, certificateUpdateLoading, certificateUpdateLoaded, certificateDetail,
  certificateDetailLoading, certificateDetailLoaded, imageUpload, imageUploadLoading, imageUploadLoaded, imageUpdate, imageUpdateLoading, imageUpdateLoaded,
  imageDetail, imageDetailLoading, imageDetailLoaded, videoUpload, videoUploadLoading, videoUploadLoaded, videoUpdate, videoUpdateLoading, videoUpdateLoaded,
  videoDetail, videoDetailLoading, videoDetailLoaded, certificateList, certificateListLoading, certificateListLoaded, certificateListCount, certificateListCountLoading,
  certificateListCountLoaded, certificateDelete, certificateDeleteLoading, certificateDeleteLoaded, DocumentUpload, DocumentUploadLoading, DocumentUploadLoaded,
  documentType, documentTypeLoading, documentTypeLoaded, certificateCreate, certificateCreateLoading, certificateCreateLoaded, VideoStatusChange, VideoStatusChangeLoading,
  VideoStatusChangeLoaded, updatePersonalizedSettings, updatePersonalizedSettingsLoading, updatePersonalizedSettingsLoaded,getPersonalizedSettings,getPersonalizedSettingsLoading,getPersonalizedSettingsLoaded

} from './reducer/myShop.selector';


@Injectable()
export class MyShopSandbox {
  // basicDetailCreate 
  public basicDetailCreate$ = this.appState.select(basicDetailCreate);
  public basicDetailCreateLoading$ = this.appState.select(basicDetailCreateLoading);
  public basicDetailCreateLoaded$ = this.appState.select(basicDetailCreateLoaded);

  // basicDetailGet 
  public basicDetailGet$ = this.appState.select(basicDetailGet);
  public basicDetailGetLoading$ = this.appState.select(basicDetailGetLoading);
  public basicDetailGetLoaded$ = this.appState.select(basicDetailGetLoaded);


  // certificateUpdate 
  public certificateUpdate$ = this.appState.select(certificateUpdate);
  public certificateUpdateLoading$ = this.appState.select(certificateUpdateLoading);
  public certificateUpdateLoaded$ = this.appState.select(certificateUpdateLoaded);


  // certificateDetail 
  public certificateDetail$ = this.appState.select(certificateDetail);
  public certificateDetailLoading$ = this.appState.select(certificateDetailLoading);
  public certificateDetailLoaded$ = this.appState.select(certificateDetailLoaded);

  // imageUpload 
  public imageUpload$ = this.appState.select(imageUpload);
  public imageUploadLoading$ = this.appState.select(imageUploadLoading);
  public imageUploadLoaded$ = this.appState.select(imageUploadLoaded);

  // imageUpdate 
  public imageUpdate$ = this.appState.select(imageUpdate);
  public imageUpdateLoading$ = this.appState.select(imageUpdateLoading);
  public imageUpdateLoaded$ = this.appState.select(imageUpdateLoaded);

  // imageDetail 
  public imageDetail$ = this.appState.select(imageDetail);
  public imageDetailLoading$ = this.appState.select(imageDetailLoading);
  public imageDetailLoaded$ = this.appState.select(imageDetailLoaded);

  // videoUpload 
  public videoUpload$ = this.appState.select(videoUpload);
  public videoUploadLoading$ = this.appState.select(videoUploadLoading);
  public videoUploadLoaded$ = this.appState.select(videoUploadLoaded);

  // videoUpdate 
  public videoUpdate$ = this.appState.select(videoUpdate);
  public videoUpdateLoading$ = this.appState.select(videoUpdateLoading);
  public videoUpdateLoaded$ = this.appState.select(videoUpdateLoaded);

  // videoDetail 
  public videoDetail$ = this.appState.select(videoDetail);
  public videoDetailLoading$ = this.appState.select(videoDetailLoading);
  public videoDetailLoaded$ = this.appState.select(videoDetailLoaded);

  // certificateList 
  public certificateList$ = this.appState.select(certificateList);
  public certificateListLoading$ = this.appState.select(certificateListLoading);
  public certificateListLoaded$ = this.appState.select(certificateListLoaded);

  // certificateListCount 
  public certificateListCount$ = this.appState.select(certificateListCount);
  public certificateListCountLoading$ = this.appState.select(certificateListCountLoading);
  public certificateListCountLoaded$ = this.appState.select(certificateListCountLoaded);

  // certificateDelete 
  public certificateDelete$ = this.appState.select(certificateDelete);
  public certificateDeleteLoading$ = this.appState.select(certificateDeleteLoading);
  public certificateDeleteLoaded$ = this.appState.select(certificateDeleteLoaded);

  // DocumentUpload 
  public DocumentUpload$ = this.appState.select(DocumentUpload);
  public DocumentUploadLoading$ = this.appState.select(DocumentUploadLoading);
  public DocumentUploadLoaded$ = this.appState.select(DocumentUploadLoaded);

  // documentType 
  public documentType$ = this.appState.select(documentType);
  public documentTypeLoading$ = this.appState.select(documentTypeLoading);
  public documentTypeLoaded$ = this.appState.select(documentTypeLoaded);

  // certificateCreate 
  public certificateCreate$ = this.appState.select(certificateCreate);
  public certificateCreateLoading$ = this.appState.select(certificateCreateLoading);
  public certificateCreateLoaded$ = this.appState.select(certificateCreateLoaded);

  // VideoStatusChange 
  public VideoStatusChange$ = this.appState.select(VideoStatusChange);
  public VideoStatusChangeLoading$ = this.appState.select(VideoStatusChangeLoading);
  public VideoStatusChangeLoaded$ = this.appState.select(VideoStatusChangeLoaded);


  // personalized settings

  // updatePersonalizedSettings 
  public updatePersonalizedSettings$ = this.appState.select(updatePersonalizedSettings);
  public updatePersonalizedSettingsLoading$ = this.appState.select(updatePersonalizedSettingsLoading);
  public updatePersonalizedSettingsLoaded$ = this.appState.select(updatePersonalizedSettingsLoaded);

  // getPersonalizedSettings 
  public getPersonalizedSettings$ = this.appState.select(getPersonalizedSettings);
  public getPersonalizedSettingsLoading$ = this.appState.select(getPersonalizedSettingsLoading);
  public getPersonalizedSettingsLoaded$ = this.appState.select(getPersonalizedSettingsLoaded);

  constructor(
    protected appState: Store<store.AppState>,
  ) { }

  // basicDetailCreate
  public basicDetailCreate(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.basicDetailCreateAction(value)
    );
  }

  // basicDetailGet
  public basicDetailGet(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.basicDetailGetAction(value)
    );
  }

  // certificateUpdate
  public certificateUpdate(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.certificateUpdateAction(value)
    );
  }

  // certificateDetail
  public certificateDetail(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.certificateDetailAction(value)
    );
  }

  // imageUpload
  public imageUpload(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.imageUploadAction(value)
    );
  }

  // imageUpdate
  public imageUpdate(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.imageUpdateAction(value)
    );
  }

  // imageDetail
  public imageDetail(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.imageDetailAction(value)
    );
  }

  // videoUpload
  public videoUpload(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.videoUploadAction(value)
    );
  }

  // videoUpdate
  public videoUpdate(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.videoUpdateAction(value)
    );
  }

  // videoDetail
  public videoDetail(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.videoDetailAction(value)
    );
  }


  // certificateList
  public certificateList(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.certificateListAction(value)
    );
  }

  // certificateListCount
  public certificateListCount(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.certificateListCountAction(value)
    );
  }

  // certificateDelete
  public certificateDelete(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.certificateDeleteAction(value)
    );
  }

  // DocumentUpload
  public DocumentUpload(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.DocumentUploadAction(value)
    );
  }

  // documentType
  public documentType(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.documentTypeAction(value)
    );
  }

  // certificateCreate
  public certificateCreate(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.certificateCreateAction(value)
    );
  }

  // VideoStatusChange
  public VideoStatusChange(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.VideoStatusChangeAction(value)
    );
  }


  // personalized settings

  // updatePersonalizedSettings
  public updatePersonalizedSettings(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.updatePersonalizedSettingsAction(value)
    );
  }


  // getPersonalizedSettings
  public getPersonalizedSettings(value: any) {
    this.appState.dispatch(
      new crmGroupsActions.getPersonalizedSettingsAction(value)
    );
  }


}
