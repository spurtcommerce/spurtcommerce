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
import * as zoneActions from './action/multiple-websites.action';
import { Subscription } from 'rxjs/index';
import * as store from '../../../app.state.interface';
import { Router } from '@angular/router';
import { CreateMultipleWebsites, CreateMultipleWebsitesFailed, CreateMultipleWebsitesLoaded, CreateMultipleWebsitesLoading, GetSettingsMultipleWebsites, GetSettingsMultipleWebsitesFailed, GetSettingsMultipleWebsitesLoaded, GetSettingsMultipleWebsitesLoading, MultipleWebsitesList, MultipleWebsitesListFailed, MultipleWebsitesListLoaded, MultipleWebsitesListLoading, UpdateMultipleWebsites, UpdateMultipleWebsitesFailed, UpdateMultipleWebsitesLoaded, UpdateMultipleWebsitesLoading } from './reducer/multiple-websites.selector';

@Injectable()
export class MultipleWebsitesSandbox {

  /*Get Multiple websites List*/

  public MultipleWebsitesList$ = this.appState.select(MultipleWebsitesList);
  public MultipleWebsitesListLoading$ = this.appState.select(MultipleWebsitesListLoading);
  public MultipleWebsitesListLoaded$ = this.appState.select(MultipleWebsitesListLoaded);
  public MultipleWebsitesListFailed$ = this.appState.select(MultipleWebsitesListFailed);

  /*Create Multiple websites*/

  public CreateMultipleWebsites$ = this.appState.select(CreateMultipleWebsites);
  public CreateMultipleWebsites$Loading$ = this.appState.select(CreateMultipleWebsitesLoading);
  public CreateMultipleWebsites$Loaded$ = this.appState.select(CreateMultipleWebsitesLoaded);
  public CreateMultipleWebsites$Failed$ = this.appState.select(CreateMultipleWebsitesFailed);

  /*Update Multiple websites*/

  public UpdateMultipleWebsites$ = this.appState.select(UpdateMultipleWebsites);
  public UpdateMultipleWebsites$Loading$ = this.appState.select(UpdateMultipleWebsitesLoading);
  public UpdateMultipleWebsites$Loaded$ = this.appState.select(UpdateMultipleWebsitesLoaded);
  public UpdateMultipleWebsites$Failed$ = this.appState.select(UpdateMultipleWebsitesFailed);
  
// get settings details
 public GetSettingsMultipleWebsites$ = this.appState.select(GetSettingsMultipleWebsites);
  public GetSettingsMultipleWebsitesLoading$ = this.appState.select(GetSettingsMultipleWebsitesLoading);
  public GetSettingsMultipleWebsitesLoaded$ = this.appState.select(GetSettingsMultipleWebsitesLoaded);
  public GetSettingsMultipleWebsitesFailed$ = this.appState.select(GetSettingsMultipleWebsitesFailed);

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router
  ) {

  }


  /*Get Multiple websites List*/

  public GetMultipleWebsitesList(value: any) {
    this.appState.dispatch(
      new zoneActions.MultipleWebsitesListAction(value)
    );
  }

  /*Create Multiple websites*/

  public CreateMultipleWebsites(value: any) {
    this.appState.dispatch(
      new zoneActions.CreateMultipleWebsitesAction(value)
    );
  }

   /*Update Multiple websites*/

   public UpdateMultipleWebsites(value: any) {
    this.appState.dispatch(
      new zoneActions.UpdateMultipleWebsitesAction(value)
    );
  }
  // get settings details
  public GetSettingsMultipleWebsites(value: any) {
    this.appState.dispatch(
      new zoneActions.GetSettingsMultipleWebsitesAction(value)
    );
  }
}
