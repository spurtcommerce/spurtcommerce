/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
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
  getEditProfileResponse
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

  subscribe() {
    this.getEditProfile$.subscribe(data => {
      if (data) {
        if (data.user) {
          // if (data.user.status === 1) {
          //     this.router.navigate(['/catalog/product']);
          // }
        }
      }
    });
  }
}
