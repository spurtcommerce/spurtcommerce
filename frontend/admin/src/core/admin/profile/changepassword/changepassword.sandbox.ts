/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as changepasswordActions from './changepassword-action/changepassword.action';
import {Subscription} from 'rxjs/index';
import * as store from '../../../app.state.interface';
import {Router} from '@angular/router';
import {ChangePasswordForm} from './changepassword-models/changepassword.model';
import {
    getChangePassword, getChangePasswordRequestLoaded,
    getChangePasswordRequestLoading, getChangePasswordResponse,
    getChangePasswordRequestFailed
} from './changepassword-reducer/changepassword.selector';

@Injectable()
export class ChangepasswordSandbox {

    public getChangePassword$ = this.appState.select(getChangePassword);
    public getChangePasswordResponse$ = this.appState.select(getChangePasswordResponse);
    public getChangePasswordRequestLoading$ = this.appState.select(getChangePasswordRequestLoading);
    public getChangePasswordRequestLoade$ = this.appState.select(getChangePasswordRequestLoaded);
    public getChangePasswordRequestFailed$ = this.appState.select(getChangePasswordRequestFailed);


    private subscriptions: Array<Subscription> = [];

    constructor(protected appState: Store<store.AppState>, private router: Router) {

        this.subscribe();
    }


    public changePSW(value) {
        this.appState.dispatch(new changepasswordActions.DoChangePasswordAction(new ChangePasswordForm(value)));
    }

    subscribe() {
        this.subscriptions.push(this.getChangePassword$.subscribe(data => {
            if (data) {
                if (data.user) {
                    if (data.user.status === 1) {
                        this.router.navigate(['/dashboard']);
                    }
                }
            }
        }));
    }


}















