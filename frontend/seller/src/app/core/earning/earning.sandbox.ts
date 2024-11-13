/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as earingAction from './action/earning.action';
import * as store from '../app.state.interface';


import { GetEarning, GetEarningCount, GetEarningCountFailed, GetEarningCountLoaded, GetEarningCountLoading, GetEarningExport, GetEarningExportFailed, GetEarningExportLoaded, GetEarningExportLoading, GetEarningFailed, GetEarningLoaded, GetEarningLoading } from './reducer/earning.selector';





@Injectable()
export class EarningSandbox {
  /* get earning list*/

  public GetEarning$ = this.appState$.select(GetEarning);
  public GetEarningLoading$ = this.appState$.select(GetEarningLoading);
  public GetEarningLoaded$ = this.appState$.select(GetEarningLoaded);
  public GetEarningFailed$ = this.appState$.select(GetEarningFailed);


  /* get earning  count*/

  public GetEarningCount$ = this.appState$.select(GetEarningCount);
  public GetEarningCountLoading$ = this.appState$.select(GetEarningCountLoading);
  public GetEarningCountLoaded$ = this.appState$.select(GetEarningCountLoaded);
  public GetEarningCountFailed$ = this.appState$.select(GetEarningCountFailed);

   /*Exportexcel*/

  public GetEarningExport$ = this.appState$.select(GetEarningExport);
  public GetEarningExportLoading$ = this.appState$.select(GetEarningExportLoading);
  public GetEarningExportLoaded$ = this.appState$.select(GetEarningExportLoaded);
  public GetEarningExportFailed$ = this.appState$.select(GetEarningExportFailed);



  constructor(
    private router: Router,
    protected appState$: Store<store.AppState>
  ) {
  }

  /* get earning list*/
  public GetEarning(value: any): void {
    this.appState$.dispatch(new earingAction.GetEarning(value));
  }

  /* get earning  count*/
  public GetEarningCount(value: any): void {
    this.appState$.dispatch(new earingAction.GetEarningCount(value));
  }

 /*Exportexcel*/
   public GetEarningExport(value: any): void {
    this.appState$.dispatch(new earingAction.GetEarningExport(value));
  }


}
