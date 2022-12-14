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
import * as zoneActions from '../zone/zone-action/zone.action';
import * as countryActions from '../country/country-action/country.action';
import { Subscription } from 'rxjs/index';
import * as store from '../../../../app.state.interface';
import { Router } from '@angular/router';
import { ZoneForm } from './zone-model/zone.model';
import {
  newZone,
  updateZone,
  zoneDelete,
  zonePagination,
  zoneList,
  ZoneAddFailed,
  ZoneAddLoaded,
  ZoneAddLoading,
  ZoneCountFailed,
  ZoneCountLoaded,
  ZoneCountLoading,
  ZoneDeleteFailed,
  ZoneDeleteLoaded,
  ZoneDeleteLoading,
  ZoneListFailed,
  ZoneListLoaded,
  ZoneListLoading,
  ZoneUpdateFailed,
  ZoneUpdateLoaded,
  ZoneUpdateLoading
} from './zone-reducer/zone.selector';
import { ZonelistForm } from './zone-model/zonelist.model';
import { CountryListForm } from '../country/country-model/countrylist.model';

@Injectable()
export class ZoneSandbox {
  public zoneList$ = this.appState.select(zoneList);
  public zonePagination$ = this.appState.select(zonePagination);
  public newZone$ = this.appState.select(newZone);
  public updateZone$ = this.appState.select(updateZone);
  public deleteZone$ = this.appState.select(zoneDelete);

  public zoneListLoading$ = this.appState.select(ZoneListLoading);
  public zoneListLoaded$ = this.appState.select(ZoneListLoaded);
  public zoneListFailed$ = this.appState.select(ZoneListFailed);

  public zoneDeleteLoading$ = this.appState.select(ZoneDeleteLoading);
  public zoneDeleteLoaded$ = this.appState.select(ZoneDeleteLoaded);
  public zoneDeleteFailed$ = this.appState.select(ZoneDeleteFailed);

  public zoneCountLoading$ = this.appState.select(ZoneCountLoading);
  public zoneCountLoaded$ = this.appState.select(ZoneCountLoaded);
  public zoneCountFailed$ = this.appState.select(ZoneCountFailed);

  public zoneAddLoading$ = this.appState.select(ZoneAddLoading);
  public zoneAddLoaded$ = this.appState.select(ZoneAddLoaded);
  public zoneAddFailed$ = this.appState.select(ZoneAddFailed);

  public zoneUpdateLoading$ = this.appState.select(ZoneUpdateLoading);
  public zoneUpdateLoaded$ = this.appState.select(ZoneUpdateLoaded);
  public zoneUpdateFailed$ = this.appState.select(ZoneUpdateFailed);

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router
  ) {
    this.subscribe();
  }

  public addNewZone(data) {
    this.appState.dispatch(new zoneActions.DoNewZoneAction(new ZoneForm(data)));
  }

  public updateZone(value) {
    this.appState.dispatch(
      new zoneActions.DoUpdateZoneAction(new ZoneForm(value))
    );
  }

  public getZoneList(value: any) {
    this.appState.dispatch(
      new zoneActions.GetZoneListAction(new ZonelistForm(value))
    );
  }

  public zoneDelete(value) {
    this.appState.dispatch(new zoneActions.DoZoneDeleteAction(value));
  }

  public getZonePagination(value) {
    this.appState.dispatch(
      new zoneActions.GetZoneCountAction(new ZonelistForm(value))
    );
  }

  public getCountriesList(value: any) {
    this.appState.dispatch(
      new countryActions.GetCountrylistAction(new CountryListForm(value))
    );
  }

  subscribe() {
    this.subscriptions.push(
      this.updateZone$.subscribe(data => {
        if (data && data.status === 1) {
          this.router.navigate(['/settings/local/zone']);
        }
      })
    );
    this.subscriptions.push(
      this.newZone$.subscribe(data => {
        if (data && data.status === 1) {
          this.router.navigate(['/settings/local/zone']);
        }
      })
    );
  }
}
