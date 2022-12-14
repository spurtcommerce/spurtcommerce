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
  customerCount,
  customerCountLoading
} from './reducer/selectors';

@Injectable()
export class LayoutSandbox {
  public customerCount$ = this.appState.select(customerCount);
  public customerCountLoading$ = this.appState.select(customerCountLoading);


  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
  ) {
    this.registerAuthEvents();
  }

  public getCustomerCount() {
    this.appState.dispatch(
      new catalogLayoutActions.GetCustomerCountAction()
    );
  }


  /**
   * Registers events
   */
  private registerAuthEvents(): void {
    // ----
  }
}
