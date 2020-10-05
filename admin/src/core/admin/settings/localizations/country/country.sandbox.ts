/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as countryActions from '../country/country-action/country.action';
import { Subscription } from 'rxjs/index';
import * as store from '../../../../app.state.interface';
import { Router } from '@angular/router';
import { CountryForm } from './country-model/country.model';
import { CountryListForm } from './country-model/countrylist.model';
import {
  CountryAddFailed,
  CountryAddLoaded,
  CountryAddLoading,
  CountryCountFailed,
  CountryCountLoaded,
  CountryCountLoading,
  CountryDeleteFailed,
  CountryDeleteLoaded,
  CountryDeleteLoading,
  CountryListFailed,
  CountryListLoaded,
  CountryListLoading,
  CountryUpdateFailed,
  CountryUpdateLoaded,
  CountryUpdateLoading,
  getAddcountry,
  getCountryCount,
  getCountryLst,
  getDeleteCountry,
  getUpdateCountry
} from './country-reducer/country.selector';

@Injectable()
export class CountrySandbox {
  public getcountries$ = this.appState.select(getCountryLst);
  public addCountry$ = this.appState.select(getAddcountry);
  public updateCountry$ = this.appState.select(getUpdateCountry);
  public deleteCountry$ = this.appState.select(getDeleteCountry);
  public countryCount$ = this.appState.select(getCountryCount);

  public countryListLoading$ = this.appState.select(CountryListLoading);
  public countryListLoaded$ = this.appState.select(CountryListLoaded);
  public countryListFailed$ = this.appState.select(CountryListFailed);

  public countryDeleteLoading$ = this.appState.select(CountryDeleteLoading);
  public countryDeleteLoaded$ = this.appState.select(CountryDeleteLoaded);
  public countryDeleteFailed$ = this.appState.select(CountryDeleteFailed);

  public countryCountLoading$ = this.appState.select(CountryCountLoading);
  public countryCountLoaded$ = this.appState.select(CountryCountLoaded);
  public countryCountFailed$ = this.appState.select(CountryCountFailed);

  public countryAddLoading$ = this.appState.select(CountryAddLoading);
  public countryAddLoaded$ = this.appState.select(CountryAddLoaded);
  public countryAddFailed$ = this.appState.select(CountryAddFailed);

  public countryUpdateLoading$ = this.appState.select(CountryUpdateLoading);
  public countryUpdateLoaded$ = this.appState.select(CountryUpdateLoaded);
  public countryUpdateFailed$ = this.appState.select(CountryUpdateFailed);

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrManager
  ) {}

  public addCountry(value) {
    this.appState.dispatch(
      new countryActions.DoNewCountryAction(new CountryForm(value))
    );
  }

  public updateCountry(value) {
    this.appState.dispatch(
      new countryActions.DoUpdateCountryAction(new CountryForm(value))
    );
  }

  public getcountrieslist(value: any) {
    this.appState.dispatch(
      new countryActions.GetCountrylistAction(new CountryListForm(value))
    );
  }

  public countryDelete(value) {
    this.appState.dispatch(new countryActions.DoCountryDeleteAction(value));
  }

  public getCountryCount(value) {
    this.appState.dispatch(
      new countryActions.GetCountryCountAction(new CountryListForm(value))
    );
  }
}
