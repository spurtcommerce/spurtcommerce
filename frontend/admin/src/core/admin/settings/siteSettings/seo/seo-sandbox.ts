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
import * as seositesetting from '../seo/seo-action/seo-action';
import * as store from '../../../../app.state.interface';
import { Router } from '@angular/router';
import { SeoModel } from './seo-model/seo-model';
import { newSeo, getSeo,getSettingLoading } from './seo-reducer/seo-selector';
import { Subscription } from 'rxjs';

@Injectable()
export class SeoSandbox {
  public newSeo$ = this.appState.select(newSeo);
  public getSeo$ = this.appState.select(getSeo);
  public getSettingLoading$ = this.appState.select(getSettingLoading);

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router
  ) {}

  public createSeo(value) {
    this.appState.dispatch(
      new seositesetting.DoNewSeoSiteSettingAction(new SeoModel(value))
    );
  }

  public getSeo() {
    this.appState.dispatch(new seositesetting.DoGetSeoSiteSettingAction());
  }
}
