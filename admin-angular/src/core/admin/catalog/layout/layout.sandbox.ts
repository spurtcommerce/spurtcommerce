/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from '../../../app.state.interface';
import * as catalogLayoutActions from './action/layout.action';
import { Subscription } from 'rxjs';

import {
  catalogCount,
  catalogCountLoading
} from './reducer/selectors';

@Injectable()
export class LayoutsSandbox {

  public catalogCount$ = this.appState.select(
    catalogCount
  );
  public catalogCountLoading$ = this.appState.select(
    catalogCountLoading
  );

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>) {
    this.registerAuthEvents();
  }

  public getCatalogCount() {
    this.appState.dispatch(new catalogLayoutActions.GetCatalogCountAction());
  }

  /**
   * Registers events
   */
  private registerAuthEvents(): void {}
}
