/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as editprofileActions from './action/editprofile.action';
import * as store from '../../../app.state.interface';
import { Router } from '@angular/router';
import { EditprofileForm } from './models/editprofile.model';
import {
  getEditProfile,
  getEditProfileRequestFailed,
  getEditProfileRequestLoaded,
  getEditProfileRequestLoading,
  getEditProfileResponse,
  getProfile,
  getProfileFailed,
  getProfileLoaded,
  getProfileLoading
} from './reducer/editprofile.selector';

@Injectable()
export class EditprofileSandbox {
  public getEditProfile$ = this.appState.select(getEditProfile);
  public getEditProfileRespons$ = this.appState.select(getEditProfileResponse);
  public getEditProfileRequestLoading$ = this.appState.select(
    getEditProfileRequestLoading
  );
  public getEditProfileRequestLoaded$ = this.appState.select(
    getEditProfileRequestLoaded
  );
  public getEditProfileRequestFailed$ = this.appState.select(
    getEditProfileRequestFailed
  );

  public getProfile$ = this.appState.select(getProfile);
  public getProfileLoading$ = this.appState.select(
    getProfileLoading
  );
  public getProfileLoaded$ = this.appState.select(
    getProfileLoaded
  );
  public getProfileFailed$ = this.appState.select(
    getProfileFailed
  );

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router
  ) {
    this.subscribe();
  }

  public Editprofile(value) {
    this.appState.dispatch(
      new editprofileActions.DoEditprofileAction(new EditprofileForm(value))
    );
  }

  public getProfile(value) {
    this.appState.dispatch(
      new editprofileActions.getProfile(value)
    );
  }

  subscribe() {
    this.getEditProfile$.subscribe(data => {
      if (data) {
        if (data.user) {

        }
      }
    });
  }
}
