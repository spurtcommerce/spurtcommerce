/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as socialaction from '../social/social-action/social.action';
import * as store from '../../../../app.state.interface';
import { SocialForm } from './social-model/social.model';
import { getNewSocial, getSocial } from './social-reducer/social.selector';

@Injectable()
export class SocialSandbox {
  public getNewSocial$ = this.appState.select(getNewSocial);
  public getSocial$ = this.appState.select(getSocial);

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
