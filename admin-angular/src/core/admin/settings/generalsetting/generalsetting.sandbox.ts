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
import * as generalsetting from '../generalsetting/generalsetting-action/generalsetting.action';
import * as store from '../../../app.state.interface';
import {
  getGeneralSettings,
  getNewGeneralSettings,
  mode
} from './generalsetting-reducer/generalsetting.selector';
import { GeneralSettingForm } from './generalsetting-model/generalsetting.model';

@Injectable()
export class GeneralSettingSandbox {
  public getNewGeneralSettings$ = this.appState.select(getNewGeneralSettings);
  public getGeneralSettings$ = this.appState.select(getGeneralSettings);
  public mode$ = this.appState.select(mode);

  constructor(protected appState: Store<store.AppState>) {
    this.subscribedata();
  }

  // Create General Setting
  public createGeneralSetting(value) {
    this.appState.dispatch(
      new generalsetting.DoNewGeneralSettingAction(
        new GeneralSettingForm(value)
      )
    );
  }

  // Get General Setting
  public getGeneralSetting() {
    this.appState.dispatch(new generalsetting.DoGetGeneralSettingAction());
  }

  public maintenanceMode(param) {
    this.appState.dispatch(new generalsetting.MaintenanceModeAction(param));
  }

  subscribedata() {
    this.getNewGeneralSettings$.subscribe(data => {
      if (data && data.status === 1) {
        this.getGeneralSetting();
      }
    });
  }
}
