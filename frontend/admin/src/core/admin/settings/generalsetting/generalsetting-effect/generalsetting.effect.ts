/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';
import * as actions from '../generalsetting-action/generalsetting.action';
import { GeneralSettingService } from '../generalsetting.service';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as store from '../../../../app.state.interface';
import * as layoutAction from '../../../layout/actions/layout.action';

@Injectable()
export class GeneralSettingEffect {
  constructor(
    private action$: Actions,
    protected appState$: Store<store.AppState>,
    private service: GeneralSettingService,
    private translate: TranslateService
  ) {}

  // NEW USER
  
  doAddUser$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_NEW_GENERAL_SETTINGS),
    map((action: actions.DoNewGeneralSettingAction) => action.payload),
    switchMap(state => {
      return this.service.createGeneralSetting(state).pipe(
        switchMap(user => [new actions.DoNewGeneralSettingSuccessAction(user)]),
        tap(val => {
          debugger
          if (val.payload.data.storeLanguageName === 'Hindi') {
            sessionStorage.setItem('defaultlanguage', 'hi');
            localStorage.setItem('defaultlanguage', 'hi');
            this.translate.use('hi');
            this.translate.reloadLang('hi');
          } else {
            sessionStorage.setItem('defaultlanguage', 'en');
            localStorage.setItem('defaultlanguage', 'en');
            this.translate.use('en');
            this.translate.reloadLang('en');
          }
          this.appState$.dispatch(new layoutAction.GetSettings());
        }),
        catchError(error =>
          of(new actions.DoNewGeneralSettingFailAction(error))
        )
      );
    })
  ));

  // GET GENERAL SETTINGS
  
  dogetGeneralsetting$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_GET_GENERAL_SETTINGS),
    map((action: actions.DoGetGeneralSettingAction) => action.payload),
    switchMap(() => {
      return this.service.getGeneralSetting().pipe(
        switchMap(user => {
          return [new actions.DoGetGeneralSettingSuccessAction(user)];
        }),
        catchError(error => of(new actions.DoGetGeneralSettingFailAction()))
      );
    })
  ));

    // MAINTENANCE MODE
    
    maintenanceMode$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.MAINTENANCE_MODE),
      map((action: actions.MaintenanceModeAction) => action.payload),
      switchMap((state) => {
        return this.service.maintenanceMode(state).pipe(
          switchMap(user => {
            return [new actions.MaintenanceModeSuccessAction(user)];
          }),
          catchError(error => of(new actions.MaintenanceModeFailAction()))
        );
      })
    ));
}
