/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as emailtempActions from '../emailtemplate/emailtemp-action/emailtemp.action';
import { Subscription } from 'rxjs/index';
import * as store from '../../../../app.state.interface';
import { Router } from '@angular/router';
import {
  EmailTempAddFailed,
  EmailTempAddLoaded,
  EmailTempAddLoading,
  EmailTempCountFailed,
  EmailTempCountLoaded,
  EmailTempCountLoading,
  EmailTempDeleteFailed,
  EmailTempDeleteLoaded,
  EmailTempDeleteLoading,
  EmailTempListFailed,
  EmailTempListLoaded,
  EmailTempListLoading,
  EmailTempUpdateFailed,
  EmailTempUpdateLoaded,
  EmailTempUpdateLoading,
  getaddemailtemp,
  getdeleteemailtemp,
  getemailtemplst,
  getemailtemppagination,
  getupdateemailtemp
} from './emailtemp-reducer/emailtemp.selector';
import { EmailTempForm } from './emailtemp-model/emailtemp.model';
import { EmailTempListForm } from './emailtemp-model/emailtemplist.model';

@Injectable()
export class EmailTempSandbox {
  public getemailtemplist$ = this.appState.select(getemailtemplst);
  public getemailtemppagelength$ = this.appState.select(getemailtemppagination);
  public getaddemailtemp$ = this.appState.select(getaddemailtemp);
  public getupdateemailtemp$ = this.appState.select(getupdateemailtemp);
  public getdeleteemailtemp$ = this.appState.select(getdeleteemailtemp);

  public emailTempListLoading$ = this.appState.select(EmailTempListLoading);
  public emailTempListLoaded$ = this.appState.select(EmailTempListLoaded);
  public emailTempListFailed$ = this.appState.select(EmailTempListFailed);
  public emailTempDeleteLoading$ = this.appState.select(EmailTempDeleteLoading);
  public emailTempDeleteLoaded$ = this.appState.select(EmailTempDeleteLoaded);
  public emailTempDeleteFailed$ = this.appState.select(EmailTempDeleteFailed);
  public emailTempCountLoading$ = this.appState.select(EmailTempCountLoading);
  public emailTempCountLoaded$ = this.appState.select(EmailTempCountLoaded);
  public emailTempCountFailed$ = this.appState.select(EmailTempCountFailed);
  public emailTempAddLoading$ = this.appState.select(EmailTempAddLoading);
  public emailTempAddLoaded$ = this.appState.select(EmailTempAddLoaded);
  public emailTempAddFailed$ = this.appState.select(EmailTempAddFailed);
  public emailTempUpdateLoading$ = this.appState.select(EmailTempUpdateLoading);
  public emailTempUpdateLoaded$ = this.appState.select(EmailTempUpdateLoaded);
  public emailTempUpdateFailed$ = this.appState.select(EmailTempUpdateFailed);

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrManager
  ) {
    this.subscribe();
  }

  public addEmailtemp(value) {
    this.appState.dispatch(
      new emailtempActions.DoNewEmailTempAction(new EmailTempForm(value))
    );
  }

  public updateemailtemp(value) {
    this.appState.dispatch(
      new emailtempActions.DoUpdateEmailTempAction(new EmailTempForm(value))
    );
  }

  public getemailtemplist(value: any) {
    this.appState.dispatch(
      new emailtempActions.DoEmailTemplistAction(new EmailTempListForm(value))
    );
  }

  public emailtempDelete(value) {
    this.appState.dispatch(new emailtempActions.DoEmailTempDeleteAction(value));
  }

  public emailtemppagination(value) {
    this.appState.dispatch(
      new emailtempActions.DoEmailTempPaginationAction(
        new EmailTempListForm(value)
      )
    );
  }

  subscribe() {
    this.subscriptions.push(
      this.getaddemailtemp$.subscribe(data => {
        if (data) {
          if (data.message) {
            this.router.navigate(['/settings/local/emailtemp']);
          }
        }
      })
    );

    // getupdateemailtemp$

    this.subscriptions.push(
      this.getupdateemailtemp$.subscribe(data => {
        if (data) {
          if (data.message && data.status === 1) {
            this.router.navigate(['/settings/local/emailtemp']);
          }
        }
      })
    );
  }
}
