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
import * as commonAction from './action/common.action';
import * as store from '../app.state.interface';

import {
  getLanguage,
  getProfile,
  profileFailed,
  profileLoaded,
  profileLoading, getCountry,
  wishlistCount,
  wishlistCountFailed, documentCountFailed, documentCountLoaded, documentCountLoading, getDocumentCount,
  wishlistCountLoaded, downloadDocument, downloadDocumentFailed, downloadDocumentLoaded, downloadDocumentLoading,
  wishlistCountLoading, getDocument, documentFailed, documentLoaded, documentLoading,
  getProfileValid, editProfile, getSetting, settingFailed, settingLoaded, settingLoading,
  editProfileFailed, editProfileLoaded, editProfileLoading, updateDocument, updateDocumentFailed, updateDocumentLoaded, updateDocumentLoading,
  zoneList,
  addOnConfig,
  addOnConfigLoading,
  addOnConfigLoaded,
  addOnConfigFailed,
  languageList1,
  languageList1Loading,
  languageList1Loaded,
  languageList1Failed
} from './reducer/common.selector';
import { ProfileModel } from './models/profile.model';
import { EditProfileModel } from './models/edit-profile.model';

@Injectable()
export class CommonSandbox {
  /* get wishlist count status*/
  public wishlistCount$ = this.appState$.select(wishlistCount);
  public wishlistCountLoading$ = this.appState$.select(wishlistCountLoading);
  public wishlistCountLoaded$ = this.appState$.select(wishlistCountLoaded);
  public wishlistCountFailed$ = this.appState$.select(wishlistCountFailed);
  /* get profile status*/
  public getProfile$ = this.appState$.select(getProfile);
  public getProfileValid$ = this.appState$.select(getProfileValid);
  public profileLoading$ = this.appState$.select(profileLoading);
  public profileLoaded$ = this.appState$.select(profileLoaded);
  public profileFailed$ = this.appState$.select(profileFailed);
  /* get settings*/
  public getSetting$ = this.appState$.select(getSetting);
  public settingsLoading$ = this.appState$.select(settingLoading);
  public settingsLoaded$ = this.appState$.select(settingLoaded);
  public settingsFailed$ = this.appState$.select(settingFailed);

  public editProfile$ = this.appState$.select(editProfile);
  public editProfileLoading$ = this.appState$.select(editProfileLoading);
  public editProfileLoaded$ = this.appState$.select(editProfileLoaded);
  public editProfileFailed$ = this.appState$.select(editProfileFailed);

  public getLanguageList$ = this.appState$.select(getLanguage);
  public getCountryList$ = this.appState$.select(getCountry);

  public getDocumentList$ = this.appState$.select(getDocument);
  public documentLoading$ = this.appState$.select(documentLoading);
  public documentLoaded$ = this.appState$.select(documentLoaded);
  public documentFailed$ = this.appState$.select(documentFailed);

  public getDocumentCount$ = this.appState$.select(getDocumentCount);
  public documentCountLoading$ = this.appState$.select(documentCountLoading);
  public documentCountLoaded$ = this.appState$.select(documentCountLoaded);
  public documentCountFailed$ = this.appState$.select(documentCountFailed);

  public updateDocument$ = this.appState$.select(updateDocument);
  public updateDocumentLoading$ = this.appState$.select(updateDocumentLoading);
  public updateDocumentLoaded$ = this.appState$.select(updateDocumentLoaded);
  public updateDocumentFailed$ = this.appState$.select(updateDocumentFailed);

  public addOnConfig$ = this.appState$.select(addOnConfig);
  public addOnConfigLoading$ = this.appState$.select(addOnConfigLoading);
  public addOnConfigLoaded$ = this.appState$.select(addOnConfigLoaded);
  public addOnConfigFailed$ = this.appState$.select(addOnConfigFailed);

  
  /*Product Attribute List*/

  public languageList1$ = this.appState$.select(languageList1);
  public languageList1Loading$ = this.appState$.select(languageList1Loading);
  public languageList1Loaded$ = this.appState$.select(languageList1Loaded);
  public languageList1Failed$ = this.appState$.select(languageList1Failed);


  public downloadDocument$ = this.appState$.select(downloadDocument);
  public downloadDocumentLoading$ = this.appState$.select(downloadDocumentLoading);
  public downloadDocumentLoaded$ = this.appState$.select(downloadDocumentLoaded);
  public downloadDocumentFailed$ = this.appState$.select(downloadDocumentFailed);
  private subscriptions: Array<Subscription> = [];
  public zoneList$ = this.appState$.select(zoneList);

  constructor(
    private router: Router,
    protected appState$: Store<store.AppState>
  ) {
    this.registerEvents();
  }

  public getWishlistCounts(params): void {
    this.appState$.dispatch(new commonAction.GetWishlistCount(params));
  }

  public doGetProfile(): void {
    this.appState$.dispatch(new commonAction.GetProfile());
  }

  public doSettings(): void {
    this.appState$.dispatch(new commonAction.GetSetting());
  }
  public clearSetting(): void {
    this.appState$.dispatch(new commonAction.clearSetting());
  }
  public doEditProfile(params): void {
    this.appState$.dispatch(new commonAction.EditProfile( new EditProfileModel(params)));
  }

  public doSignout(): void {
    this.appState$.dispatch(new commonAction.DoSignOut());
  }

  public getLanguageList(params) {
    this.appState$.dispatch(new commonAction.GetLanguage(params));
  }
  public getCountryList(params) {
    this.appState$.dispatch(new commonAction.GetCountry(params));
  }
  public getDocumentList(params) {
    this.appState$.dispatch(new commonAction.GetDocument(params));
  }
  public getDocumentCount(params) {
    this.appState$.dispatch(new commonAction.GetDocumentCount(params));
  }
  public updateDocument(params) {
    this.appState$.dispatch(new commonAction.UpdateDocument(params));
  }
  public downloadDocument(params) {
    this.appState$.dispatch(new commonAction.DownloadDocument(params));
  }
  public getZoneList(params) {
    this.appState$.dispatch(new commonAction.GetZoneList(params));
  }
  public registerEvents() { }
  
  public addOnConfig(params) {
    this.appState$.dispatch(new commonAction.addOnConfig(params));
  }

   /*Product Attribute List*/

   public languageList1(value) {

    this.appState$.dispatch(
      new commonAction.languageList1Action(value));
  }
}
