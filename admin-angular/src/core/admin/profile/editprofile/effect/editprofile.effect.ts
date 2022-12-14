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
import { map, switchMap, tap } from 'rxjs/operators';
import * as actions from '../action/editprofile.action';
import { catchError } from 'rxjs/operators';
import { EditprofileService } from '../editprofile.service';
import { EditprofileResponseModel } from '../models/editprofile.response.model';

@Injectable()
export class EditprofileEffect {
  constructor(private action$: Actions, private service: EditprofileService) { }

  @Effect()
  doEditProfile$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_EDIT_PROFILE),
    map((action: actions.DoEditprofileAction) => action.payload),
    switchMap(state => {
      return this.service.editProfile(state).pipe(
        switchMap(user => [
          new actions.DoEditprofileSucessAction(
            new EditprofileResponseModel(user)
          )
        ]),
        catchError(error => of(new actions.DoEditprofileFailAction(error)))
      );
    })
  );

  @Effect()
  doGetProfile$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PROFILE),
    map((action: actions.getProfile) => action.payload),
    switchMap(state => {
      return this.service.getProfileDetail().pipe(
        switchMap(user => [
          new actions.getProfileSuccess(user)
        ]),
        catchError(error => of(new actions.getProfileFail(error)))
      );
    })
  );
}
