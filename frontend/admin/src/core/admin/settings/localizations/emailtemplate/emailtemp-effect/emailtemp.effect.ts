/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import * as actions from '../emailtemp-action/emailtemp.action';
import { EmailTempService } from '../emailtemp.service';
import { EmailTempListResponseModel } from '../emailtemp-model/emailtemplist.response.model';

@Injectable()
export class EmailTempEffect {
  constructor(private action$: Actions, private service: EmailTempService) {}

  // NEW EMAIL_TEMP
  
  doAddEmailTemp$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_NEW_EMAIL_TEMP_ACTION),
    map((action: actions.DoNewEmailTempAction) => action.payload),
    switchMap(state => {
      return this.service.addEmailtemp(state).pipe(
        switchMap(role => [new actions.DoNewEmailTempSuccessAction(role)]),
        catchError(error => of(new actions.DoNewEmailTempFailAction(error)))
      );
    })
  ));
  
  doUpdateEmailTemp$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_UPDATE_EMAIL_TEMP_ACTION),
    map((action: actions.DoUpdateEmailTempAction) => action.payload),
    switchMap(state => {
      return this.service.updateEmailTemp(state).pipe(
        switchMap(user => {
          return [new actions.DoUpdateEmailTempSuccessAction(user)];
        }),
        catchError(error => of(new actions.DoUpdateEmailTempFailAction(error)))
      );
    })
  ));

  // EMAIL TEMP LIST
  
  doemailtemplists$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_EMAIL_TEMP_LIST_ACTION),
    map((action: actions.DoEmailTemplistAction) => action.payload),
    switchMap(state => {
      return this.service.emailtemplist(state).pipe(
        switchMap(user => [new actions.DoEmailTemplistSuccessAction(user)]),
        catchError(error => of(new actions.DoEmailTemplistFailAction(error)))
      );
    })
  ));
  // PAGINATION EMAIL_TEMP
  
  doemailtemppagination$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_EMAIL_TEMP_COUNT_ACTION),
    map((action: actions.DoEmailTempPaginationAction) => action.payload),
    switchMap(state => {
      return this.service.emailtempPagiantion(state).pipe(
        switchMap(user => [
          new actions.DoEmailTempPaginationSuccessAction(user)
        ]),
        catchError(error =>
          of(new actions.DoEmailTempPaginationFailAction(error))
        )
      );
    })
  ));
  // EMAIL_TEMP DELETE
  
  doEmailtempDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_EMAIL_TEMP_DELETE),
    map((action: actions.DoEmailTempDeleteAction) => action.payload),
    switchMap(state => {
      const emailTemplateId = state.emailTemplateId;

      return this.service.deleteEmailtemp(state, emailTemplateId).pipe(
        switchMap(user => [new actions.DoEmailTempDeleteSuccessAction(user)]),
        catchError(error => of(new actions.DoEmailTempDeleteFailAction(error)))
      );
    })
  ));
}
