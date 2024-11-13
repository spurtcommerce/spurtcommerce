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
import * as taxactions from './tax-action/tax.actions';
import {
  TaxAddFailed,
  TaxAddLoaded,
  TaxAddLoading,
  TaxCountFailed,
  TaxCountLoaded,
  TaxCountLoading,
  TaxDeleteFailed,
  TaxDeleteLoaded,
  TaxDeleteLoading,
  TaxListFailed,
  TaxListLoaded,
  TaxListLoading,
  TaxUpdateFailed,
  TaxUpdateLoaded,
  TaxUpdateLoading,
  getTaxlist,
  getTaxNewDetail
} from './tax-reducer/tax.selector';
import { getTaxlistCount } from './tax-reducer/tax.selector';
import { getTaxNew } from './tax-reducer/tax.selector';
import { getTaxUpdate } from './tax-reducer/tax.selector';
import { getTaxDelete } from './tax-reducer/tax.selector';
import { TaxListForm } from './tax-model/taxList.model';
import { TaxCountForm } from './tax-model/taxcount.model';
import { TaxNewForm } from './tax-model/taxnew.model';
import { Router } from '@angular/router';

@Injectable()
export class TaxSandbox {
  public taxList$ = this.appState.select(getTaxlist);
  public taxListCount$ = this.appState.select(getTaxlistCount);
  public taxNew$ = this.appState.select(getTaxNew);
  public newTaxDetail$ = this.appState.select(getTaxNewDetail);
  public taxUpdate$ = this.appState.select(getTaxUpdate);
  public getTaxDelete$ = this.appState.select(getTaxDelete);

  public taxListLoading$ = this.appState.select(TaxListLoading);
  public taxListLoaded$ = this.appState.select(TaxListLoaded);
  public taxListFailed$ = this.appState.select(TaxListFailed);
  public taxDeleteLoading$ = this.appState.select(TaxDeleteLoading);
  public taxDeleteLoaded$ = this.appState.select(TaxDeleteLoaded);
  public taxDeleteFailed$ = this.appState.select(TaxDeleteFailed);
  public taxCountLoading$ = this.appState.select(TaxCountLoading);
  public taxCountLoaded$ = this.appState.select(TaxCountLoaded);
  public taxCountFailed$ = this.appState.select(TaxCountFailed);
  public taxAddLoading$ = this.appState.select(TaxAddLoading);
  public taxAddLoaded$ = this.appState.select(TaxAddLoaded);
  public taxAddFailed$ = this.appState.select(TaxAddFailed);
  public taxUpdateLoading$ = this.appState.select(TaxUpdateLoading);
  public taxUpdateLoaded$ = this.appState.select(TaxUpdateLoaded);
  public taxUpdateFailed$ = this.appState.select(TaxUpdateFailed);
  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router
  ) {
    this.subscribe();
  }

  getTaxList(value: any) {
    this.appState.dispatch(
      new taxactions.DoTaxListAction(new TaxListForm(value))
    );
  }

  getTaxListCount(value: any) {
    this.appState.dispatch(
      new taxactions.DoTaxListCountAction(
        new TaxCountForm(value)
      )
    );
  }

  addtax(value: any) {
    this.appState.dispatch(
      new taxactions.DoTaxNewAction(new TaxNewForm(value))
    );
  }

  updateTax(value: any) {
    this.appState.dispatch(
      new taxactions.DoTaxUpdateAction(new TaxNewForm(value))
    );
  }

  deleteTax(value: any) {
    this.appState.dispatch(new taxactions.DoTaxDeleteAction(value));
  }

  subscribe() {
    this.subscriptions.push(
      this.taxNew$.subscribe(val => {
        if (val && val.status === 1) {
          this.router.navigate(['/settings/local/tax']);
        }
      })
    );
    this.subscriptions.push(
      this.taxUpdate$.subscribe(val => {
        if (val && val.status === 1) {
          this.router.navigate(['/settings/local/tax']);
        }
      })
    );
  }
}
