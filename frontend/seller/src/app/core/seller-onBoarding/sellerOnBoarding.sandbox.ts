/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as sellerOnBoardingAction from './action/sellerOnBoarding.action';
import * as store from '../app.state.interface';

import {
  getProfile,
  profileFailed,
  profileLoaded,
  profileLoading,
  getDocument,
  getDocumentFailed,
  getDocumentLoaded,
  getDocumentLoading,
  displayAvailability,
  displayAvailabilityLoaded,
  displayAvailabilityLoading,
  displayAvailabilityFailed,
  sellerSegment,
  getSellerSegmentLoading,
  getSellerSegmentLoaded,
  getSellerSegmentFailed,
  sellerIndustry,
  getSellerIndustryLoading,
  getSellerIndustryLoaded,
  getSellerIndustryFailed,
  sellerBusinessType,
  getSellerBusinessTypeFailed,
  getSellerBusinessTypeLoaded,
  getSellerBusinessTypeLoading,
  updateProfileDetails,
  updateProfileDetailsLoaded,
  updateProfileDetailsLoading,
  updateProfileDetailsFailed,
  getDocumentList,
  documentLoading,
  documentLoaded,
  documentFailed,
  getDocumentCount,
  documentCountLoading,
  documentCountFailed,
  documentCountLoaded,
  updateDocument,
  updateDocumentLoading,
  updateDocumentLoaded,
  updateDocumentFailed,
  downloadDocument,
  downloadDocumentLoading,
  downloadDocumentLoaded,
  downloadDocumentFailed,
  getMediaUploaddata,
  // getmediauploadResponse,
  getmediauploadRequestLoadings,
  getmediauploadRequestLoaded,
  getmediauploadRequestFailed,
  documentDetail,
  documentDetailLoading,
  documentDetailLoaded,
  documentDetailFailed
} from './reducer/sellerOnBoarding.selector';


@Injectable()
export class sellerOnBoardingSandbox {

  /* get profile status*/
  public getProfile$ = this.appState$.select(getProfile);
  public profileLoading$ = this.appState$.select(profileLoading);
  public profileLoaded$ = this.appState$.select(profileLoaded);
  public profileFailed$ = this.appState$.select(profileFailed);

  // updateProfileDetails
  public updateProfileDetails$ = this.appState$.select(updateProfileDetails);
  public updateProfileDetailsLoading$ = this.appState$.select(updateProfileDetailsLoading);
  public updateProfileDetailsLoaded$ = this.appState$.select(updateProfileDetailsLoaded);
  public updateProfileDetailsFailed$ = this.appState$.select(updateProfileDetailsFailed);

  // displayAvailability
  public displayAvailability$ = this.appState$.select(displayAvailability);
  public displayAvailabilityLoading$ = this.appState$.select(displayAvailabilityLoading);
  public displayAvailabilityLoaded$ = this.appState$.select(displayAvailabilityLoaded);
  public displayAvailabilityFailed$ = this.appState$.select(displayAvailabilityFailed);

  public sellerSegment$ = this.appState$.select(sellerSegment);
  public getSellerSegmentLoading$ = this.appState$.select(getSellerSegmentLoading);
  public getSellerSegmentLoaded$ = this.appState$.select(getSellerSegmentLoaded);
  public getSellerSegmentFailed$ = this.appState$.select(getSellerSegmentFailed);

  public sellerBusinessType$ = this.appState$.select(sellerBusinessType);
  public getSellerBusinessTypeLoading$ = this.appState$.select(getSellerBusinessTypeLoading);
  public getSellerBusinessTypeLoaded$ = this.appState$.select(getSellerBusinessTypeLoaded);
  public getSellerBusinessTypeFailed$ = this.appState$.select(getSellerBusinessTypeFailed);

  public sellerIndustry$ = this.appState$.select(sellerIndustry);
  public getSellerIndustryLoading$ = this.appState$.select(getSellerIndustryLoading);
  public getSellerIndustryLoaded$ = this.appState$.select(getSellerIndustryLoaded);
  public getSellerIndustryFailed$ = this.appState$.select(getSellerIndustryFailed);

  /* get Document*/
  public getDocument$ = this.appState$.select(getDocument);
  public getDocumentLoading$ = this.appState$.select(getDocumentLoading);
  public getDocumentLoaded$ = this.appState$.select(getDocumentLoaded);
  public getDocumentFailed$ = this.appState$.select(getDocumentFailed);

  public getDocumentList$ = this.appState$.select(getDocumentList);
  public documentListLoading$ = this.appState$.select(documentLoading);
  public documentListLoaded$ = this.appState$.select(documentLoaded);
  public documentListFailed$ = this.appState$.select(documentFailed);

  public documentDetail$ = this.appState$.select(documentDetail);
  public documentDetailLoading$ = this.appState$.select(documentDetailLoading);
  public documentDetailLoaded$ = this.appState$.select(documentDetailLoaded);
  public documentDetailFailed$ = this.appState$.select(documentDetailFailed);

  public getDocumentCount$ = this.appState$.select(getDocumentCount);
  public documentCountLoading$ = this.appState$.select(documentCountLoading);
  public documentCountLoaded$ = this.appState$.select(documentCountLoaded);
  public documentCountFailed$ = this.appState$.select(documentCountFailed);

  public updateDocument$ = this.appState$.select(updateDocument);
  public updateDocumentLoading$ = this.appState$.select(updateDocumentLoading);
  public updateDocumentLoaded$ = this.appState$.select(updateDocumentLoaded);
  public updateDocumentFailed$ = this.appState$.select(updateDocumentFailed);
  
  public downloadDocument$ = this.appState$.select(downloadDocument);
  public downloadDocumentLoading$ = this.appState$.select(downloadDocumentLoading);
  public downloadDocumentLoaded$ = this.appState$.select(downloadDocumentLoaded);
  public downloadDocumentFailed$ = this.appState$.select(downloadDocumentFailed);

  public getMediaUpload$ = this.appState$.select(getMediaUploaddata);
  // public getmediauploadResponse$ = this.appState$.select(getmediauploadResponse);
  public getmediauploadRequestLoading$ = this.appState$.select(getmediauploadRequestLoadings);
  public getMediaCregetmediauploadRequestLoadedatefold$ = this.appState$.select(getmediauploadRequestLoaded);
  public getmediauploadRequestFailed$ = this.appState$.select(getmediauploadRequestFailed);    

  constructor(
    private router: Router,
    protected appState$: Store<store.AppState>
  ) { }

  public doGetProfile(params): void {
    this.appState$.dispatch(new sellerOnBoardingAction.GetProfile(params));
  }

  public updateProfileDetails(params) {
    this.appState$.dispatch(new sellerOnBoardingAction.updateProfileDetails(params));
  }

  public getSellerIndustryList(params) {
    this.appState$.dispatch(new sellerOnBoardingAction.GetSellerIndustry(params));
  }

  public displayAvailability(params): void {
    this.appState$.dispatch(new sellerOnBoardingAction.displayAvailability(params));
  }

  public getSellerSegmentList(params) {
    this.appState$.dispatch(new sellerOnBoardingAction.GetSellerSegment(params));
  }

  public getSellerBusinessTypeList(params) {
    this.appState$.dispatch(new sellerOnBoardingAction.GetSellerBusinessType(params));
  }

  public getDocument(params): void {
    this.appState$.dispatch(new sellerOnBoardingAction.getDocument(params));
  }
  
  public documentDetail(params) {
    this.appState$.dispatch(new sellerOnBoardingAction.documentDetail(params));
  }
  public getDocumentList(params) {
    this.appState$.dispatch(new sellerOnBoardingAction.getDocumentList(params));
  }
  public getDocumentCount(params) {
    this.appState$.dispatch(new sellerOnBoardingAction.getDocumentCount(params));
  }
  public updateDocument(params) {
    this.appState$.dispatch(new sellerOnBoardingAction.UpdateDocument(params));
  }
  public downloadDocument(params) {
    this.appState$.dispatch(new sellerOnBoardingAction.DownloadDocument(params));
  }
  public getbuckupload(data) {
    this.appState$.dispatch(new sellerOnBoardingAction.DoMediaUploadAction(data)
    );
  }
}
