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
import * as socialaction from '../social/social-action/social.action';
import * as store from '../../../../app.state.interface';
import { SocialForm } from './social-model/social.model';
import { getNewSocial, getSocial,getSettingLoading } from './social-reducer/social.selector';

@Injectable()
export class SocialSandbox {
  public getNewSocial$ = this.appState.select(getNewSocial);
  public getSocial$ = this.appState.select(getSocial);
  public getSettingLoading$ =this.appState.select(getSettingLoading)

  constructor(protected appState: Store<store.AppState>) {}

  public createSocial(value) {
    this.appState.dispatch(
      new socialaction.DoNewSocialAction(new SocialForm(value))
    );
  }

  public getSocial() {
    this.appState.dispatch(new socialaction.DoGetSocialAction());
  }
}
