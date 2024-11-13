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
import * as store from '../../../app.state.interface';
import * as backorderActions from './actions/backorder-list.action';
import { backorderList, backorderListLoading, backorderListLoaded, backorderListCount, backorderListCountLoading,
backorderListCountLoaded} from './reducer/backorder-list.selector';

@Injectable()
export class BackorderListSandbox {

  public backorderList$ = this.appState.select(backorderList);
  public backorderListLoading$ = this.appState.select(backorderListLoading);
  public backorderListLoaded$ = this.appState.select(backorderListLoaded);

  public backorderListCount$ = this.appState.select(backorderListCount);
  public backorderListCountLoading$ = this.appState.select(backorderListCountLoading);
  public backorderListCountLoaded$ = this.appState.select(backorderListCountLoaded);


constructor(protected appState: Store<store.AppState>) {}

// Backorder list

public backOrderList(value: any) {
    this.appState.dispatch(new backorderActions.BackorderListAction(value));
}

// Backorder list count

public backOrderListCount(value: any) {
  this.appState.dispatch(new backorderActions.BackorderListCountAction(value));
}

}
