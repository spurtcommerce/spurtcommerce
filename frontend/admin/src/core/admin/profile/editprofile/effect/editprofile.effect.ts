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
import { map, switchMap, tap } from 'rxjs/operators';
import * as actions from '../action/editprofile.action';
import { catchError } from 'rxjs/operators';
import { EditprofileService } from '../editprofile.service';
import { EditprofileResponseModel } from '../models/editprofile.response.model';

@Injectable()
export class EditprofileEffect {
  constructor(private action$: Actions, private service: EditprofileService) { }

  
  doEditProfile$: Observable<Action> = createEffect(() => this.action$.pipe(
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
  ));

  
  doGetProfile$: Observable<Action> = createEffect(() => this.action$.pipe(
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
  ));
}
