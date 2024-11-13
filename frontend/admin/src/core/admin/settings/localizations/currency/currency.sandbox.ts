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
import { Subscription } from 'rxjs';
import * as store from '../../../../app.state.interface';
import * as currencyactions from './currency-action/currency.actions';
import {
  CurrencyAddFailed,
  CurrencyAddLoaded,
  CurrencyAddLoading,
  CurrencyCountFailed,
  CurrencyCountLoaded,
  CurrencyCountLoading,
  CurrencyDeleteFailed,
  CurrencyDeleteLoaded,
  CurrencyDeleteLoading,
  CurrencyListFailed,
  CurrencyListLoaded,
  CurrencyListLoading,
  CurrencyUpdateFailed,
  CurrencyUpdateLoaded,
  CurrencyUpdateLoading,
  getCurrencylist,
  getCurrencyNewDetail
} from './currency-reducer/currency.selector';
import { getCurrencylistCount } from './currency-reducer/currency.selector';
import { getCurrencyNew } from './currency-reducer/currency.selector';
import { getCurrencyUpdate } from './currency-reducer/currency.selector';
import { getCurrencyDelete } from './currency-reducer/currency.selector';
import { CurrencyListForm } from './currency-model/currencyList.model';
import { CurrencyCountForm } from './currency-model/currencycount.model';
import { CurrencyNewForm } from './currency-model/currencynew.model';
import { Router } from '@angular/router';

@Injectable()
export class CurrencySandbox {
  public currencyList$ = this.appState.select(getCurrencylist);
  public currencyListCount$ = this.appState.select(getCurrencylistCount);
  public currencyNew$ = this.appState.select(getCurrencyNew);
  public newCurrencyDetail$ = this.appState.select(getCurrencyNewDetail);
  public currencyUpdate$ = this.appState.select(getCurrencyUpdate);
  public getCurrencyDelete$ = this.appState.select(getCurrencyDelete);

  public currencyListLoading$ = this.appState.select(CurrencyListLoading);
  public currencyListLoaded$ = this.appState.select(CurrencyListLoaded);
  public currencyListFailed$ = this.appState.select(CurrencyListFailed);
  public currencyDeleteLoading$ = this.appState.select(CurrencyDeleteLoading);
  public currencyDeleteLoaded$ = this.appState.select(CurrencyDeleteLoaded);
  public currencyDeleteFailed$ = this.appState.select(CurrencyDeleteFailed);
  public currencyCountLoading$ = this.appState.select(CurrencyCountLoading);
  public currencyCountLoaded$ = this.appState.select(CurrencyCountLoaded);
  public currencyCountFailed$ = this.appState.select(CurrencyCountFailed);
  public currencyAddLoading$ = this.appState.select(CurrencyAddLoading);
  public currencyAddLoaded$ = this.appState.select(CurrencyAddLoaded);
  public currencyAddFailed$ = this.appState.select(CurrencyAddFailed);
  public currencyUpdateLoading$ = this.appState.select(CurrencyUpdateLoading);
  public currencyUpdateLoaded$ = this.appState.select(CurrencyUpdateLoaded);
  public currencyUpdateFailed$ = this.appState.select(CurrencyUpdateFailed);
  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router
  ) {
    this.subscribe();
  }

  getCurrencyList(value: any) {
    this.appState.dispatch(
      new currencyactions.DoCurrencyListAction(new CurrencyListForm(value))
    );
  }

  getCurrencyListCount(value: any) {
    this.appState.dispatch(
      new currencyactions.DoCurrencyListCountAction(
        new CurrencyCountForm(value)
      )
    );
  }

  addcurrency(value: any) {
    this.appState.dispatch(
      new currencyactions.DoCurrencyNewAction(new CurrencyNewForm(value))
    );
  }

  updateCurrency(value: any) {
    this.appState.dispatch(
      new currencyactions.DoCurrencyUpdateAction(new CurrencyNewForm(value))
    );
  }

  deleteCurrency(value: any) {
    this.appState.dispatch(new currencyactions.DoCurrencyDeleteAction(value));
  }

  subscribe() {
    this.subscriptions.push(
      this.currencyNew$.subscribe(val => {
        if (val && val.status === 1) {
          this.router.navigate(['/settings/local/currency']);
        }
      })
    );
    this.subscriptions.push(
      this.currencyUpdate$.subscribe(val => {
        if (val && val.status === 1) {
          this.router.navigate(['/settings/local/currency']);
        }
      })
    );
  }
}
