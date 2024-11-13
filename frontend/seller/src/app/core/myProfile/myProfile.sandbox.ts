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
import * as myProfileAction from './action/myProfile.action';
import * as store from '../app.state.interface';

import {
  
  getProfile,
  profileFailed,
  profileLoaded,
  profileLoading,
 editProfile,
 editProfileFailed,
 editProfileLoaded,
 editProfileLoading,
  getProfileValid,changeEmail, changeEmailFailed, changeEmailLoaded, changeEmailLoading,changePassword,changePasswordLoading,changePasswordLoaded,
  changePasswordFailed, imageUpload, imageUploadLoaded, imageUploadLoading, imageUploadFailed, changeMailVerification, changeMailVerificationLoaded, changeMailVerificationLoading, changeMailVerificationFailed
} from './reducer/myProfile.selector';


@Injectable()
export class MyProfileSandbox {
  /* get profile*/
  public getProfile$ = this.appState$.select(getProfile);
  public getProfileValid$ = this.appState$.select(getProfileValid);
  public profileLoading$ = this.appState$.select(profileLoading);
  public profileLoaded$ = this.appState$.select(profileLoaded);
  public profileFailed$ = this.appState$.select(profileFailed);
  /*editProfile*/
  public editProfile$ = this.appState$.select(editProfile);
  public editProfileLoading$ = this.appState$.select(editProfileLoading);
  public editProfileLoaded$ = this.appState$.select(editProfileLoaded);
  public editProfileFailed$ = this.appState$.select(editProfileFailed);

  /*changeEmail*/
  public changeEmail$ = this.appState$.select(changeEmail);
  public changeEmailLoading$ = this.appState$.select(changeEmailLoading);
  public changeEmailLoaded$ = this.appState$.select(changeEmailLoaded);
  public changeEmailFailed$ = this.appState$.select(changeEmailFailed);

  /*changePassword*/
  public changePassword$ = this.appState$.select(changePassword);
  public changePasswordLoading$ = this.appState$.select(changePasswordLoading);
  public changePasswordLoaded$ = this.appState$.select(changePasswordLoaded);
  public changePasswordFailed$ = this.appState$.select(changePasswordFailed);

  /*imageUpload*/
  public imageUpload$ = this.appState$.select(imageUpload);
  public imageUploadLoading$ = this.appState$.select(imageUploadLoading);
  public imageUploadLoaded$ = this.appState$.select(imageUploadLoaded);
  public imageUploadFailed$ = this.appState$.select(imageUploadFailed);

    /*changeMailVerification*/
    public changeMailVerification$ = this.appState$.select(changeMailVerification);
    public changeMailVerificationLoading$ = this.appState$.select(changeMailVerificationLoading);
    public changeMailVerificationLoaded$ = this.appState$.select(changeMailVerificationLoaded);
    public changeMailVerificationFailed$ = this.appState$.select(changeMailVerificationFailed);
  constructor(
    private router: Router,
    protected appState$: Store<store.AppState>
  ) {
  }
  public getProfile(value: any): void {
    this.appState$.dispatch(new myProfileAction.GetProfile(value));
  }

  public editProfile(value: any): void {
    this.appState$.dispatch(new myProfileAction.editProfile(value));
  }

  public changeEmail(value: any): void {
    this.appState$.dispatch(new myProfileAction.changeEmail(value));
  }

  // changePassword
  public changePassword(value: any) {
    this.appState$.dispatch(
      new myProfileAction.changePassword(value)
    );
  }

  //image upload
  public imageUpload(value: any) {
    this.appState$.dispatch(
      new myProfileAction.imageUpload(value)
    );
  }

   //changeMailVerification
   public changeMailVerification(value: any) {
    this.appState$.dispatch(
      new myProfileAction.changeMailVerification(value)
    );
  }
  
}
