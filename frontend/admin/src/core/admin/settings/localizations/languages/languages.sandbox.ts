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
import * as languagesActions from './languages-action/languages.action';
import { Subscription } from 'rxjs/index';
import * as store from './../../../../app.state.interface';
import { Router } from '@angular/router';
import {
  languageListLoading,
  languageListLoaded,
  languageListFailed,
  languageDeleteLoading,
  languageDeleteLoaded,
  languageCountLoading,
  languageCountFailed,
  languageCountLoaded,
  languageAddLoaded,
  languageAddFailed,
  languageAddLoading,
  languageUpdateLoading,
  languageUpdateLoaded,
  languageUpdateFailed,
  languageDeleteFailed,
  languageList,
  languageUpdate,
  languagePagination,
  languageAdd,
  languageDelete
} from './languages-reducer/languages.seletor';
import { LanguageForm } from './languages-model/languages.model';

import { LanguageListForm } from './languages-model/languages-list.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class LanguagesSandbox {
  public languageList$ = this.appState.select(languageList);
  public languageUpdate$ = this.appState.select(languageUpdate);
  public languagePagination$ = this.appState.select(languagePagination);
  public languageAdd$ = this.appState.select(languageAdd);
  public languageDelete$ = this.appState.select(languageDelete);

  public languageListLoading$ = this.appState.select(languageListLoading);
  public languageListLoaded$ = this.appState.select(languageListLoaded);
  public languageListFailed$ = this.appState.select(languageListFailed);

  public languageDeleteLoading$ = this.appState.select(languageDeleteLoading);
  public languageDeleteLoaded$ = this.appState.select(languageDeleteLoaded);
  public languageDeleteFailed$ = this.appState.select(languageDeleteFailed);

  public languageCountLoading$ = this.appState.select(languageCountLoading);
  public languageCountLoaded$ = this.appState.select(languageCountLoaded);
  public languageCountFailed$ = this.appState.select(languageCountFailed);

  public languageAddLoading$ = this.appState.select(languageAddLoading);
  public languageAddLoaded$ = this.appState.select(languageAddLoaded);
  public languageAddFailed$ = this.appState.select(languageAddFailed);

  public languageUpdateLoading$ = this.appState.select(languageUpdateLoading);
  public languageUpdateLoaded$ = this.appState.select(languageUpdateLoaded);
  public languageUpdateFailed$ = this.appState.select(languageUpdateFailed);

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.subscribe();
  }

  public showSuccess(msg) {
    this.toastr.success(msg, 'Success!');
  }

  public showFailed(msg) {
    this.toastr.error(msg, 'Failed!');
  }

  public languageList(value) {
    this.appState.dispatch(
      new languagesActions.DoLanguageListAction(new LanguageListForm(value))
    );
  }

  public addLanguage(value) {
    this.appState.dispatch(
      new languagesActions.DoAddLanguageAction(new LanguageForm(value))
    );
  }

  public updateLanguage(value) {
    this.appState.dispatch(
      new languagesActions.DoUpdateLanguageAction(new LanguageForm(value))
    );
  }

  public deleteLanguage(value) {
    this.appState.dispatch(new languagesActions.DoDeleteLanguageAction(value));
  }

  public languageListPagination(value) {
    this.appState.dispatch(
      new languagesActions.DoLanguagePaginationAction(
        new LanguageListForm(value)
      )
    );
  }

  subscribe() {
    this.subscriptions.push(
      this.languageUpdate$.subscribe(data => {
        if (data && data.status === 1) {
          this.router.navigate(['/settings/local/language']);
        }
      })
    );
    this.subscriptions.push(
      this.languageAdd$.subscribe(data => {
        if (data && data.status === 1) {
          this.router.navigate(['/settings/local/language']);
        }
      })
    );
    this.subscriptions.push(
      this.languageDelete$.subscribe(data => {
        if (data && data.status === 1) {
          this.router.navigate(['/settings/local/language']);
        }
      })
    );
  }
}
