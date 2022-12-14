/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
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
  @Effect()
  doAddUser$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_NEW_GENERAL_SETTINGS),
    map((action: actions.DoNewGeneralSettingAction) => action.payload),
    switchMap(state => {
      return this.service.createGeneralSetting(state).pipe(
        switchMap(user => [new actions.DoNewGeneralSettingSuccessAction(user)]),
        tap(val => {
          if (val.payload.data.storeLanguageName === 'Hindi') {
            sessionStorage.setItem('defaultlanguage', 'hi');
            this.translate.use('hi');
            this.translate.reloadLang('hi');
          } else {
            sessionStorage.setItem('defaultlanguage', 'en');
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
  );

  // GET GENERAL SETTINGS
  @Effect()
  dogetGeneralsetting$: Observable<Action> = this.action$.pipe(
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
  );

    // MAINTENANCE MODE
    @Effect()
    maintenanceMode$: Observable<Action> = this.action$.pipe(
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
    );
}
