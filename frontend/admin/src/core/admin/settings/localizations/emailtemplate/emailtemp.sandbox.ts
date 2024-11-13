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
  getAddEmailTemp,
  emailTempDelete,
  emailTempList,
  emailTempPagination,
  updateEmailTemp
} from './emailtemp-reducer/emailtemp.selector';
import { EmailTempForm } from './emailtemp-model/emailtemp.model';
import { EmailTempListForm } from './emailtemp-model/emailtemplist.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class EmailTempSandbox {
  public emailTempList$ = this.appState.select(emailTempList);
  public emailTempPagination$ = this.appState.select(emailTempPagination);
  public getAddEmailTemp$ = this.appState.select(getAddEmailTemp);
  public updateEmailTemp$ = this.appState.select(updateEmailTemp);
  public emailTempDelete$ = this.appState.select(emailTempDelete);

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
    private toastr: ToastrService
  ) {
  }

  public addEmailTemplate(value) {
    this.appState.dispatch(
      new emailtempActions.DoNewEmailTempAction(new EmailTempForm(value))
    );
  }

  public updateEmailTemplate(value) {
    this.appState.dispatch(
      new emailtempActions.DoUpdateEmailTempAction(new EmailTempForm(value))
    );
  }

  public getEmailTemplateList(value: any) {
    this.appState.dispatch(
      new emailtempActions.DoEmailTemplistAction(new EmailTempListForm(value))
    );
  }

  public emailTemplateDelete(value) {
    this.appState.dispatch(new emailtempActions.DoEmailTempDeleteAction(value));
  }

  public emailTemplatePagination(value) {
    this.appState.dispatch(
      new emailtempActions.DoEmailTempPaginationAction(
        new EmailTempListForm(value)
      )
    );
  }

  subscribe() {
    this.subscriptions.push(
      this.getAddEmailTemp$.subscribe(data => {
        if (data) {
          if (data.message) {
            this.router.navigate(['/settings/local/emailtemp']);
          }
        }
      })
    );


    this.subscriptions.push(
      this.updateEmailTemp$.subscribe(data => {
        if (data) {
          if (data.message && data.status === 1) {
            this.router.navigate(['/settings/local/emailtemp']);
          }
        }
      })
    );
  }
}
