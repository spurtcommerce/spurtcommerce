import {Subject} from 'rxjs';
/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import * as authAction from './action/account.action';
import * as store from '../state.interface';
import {ChangePasswordModel} from './models/changePassword.model';
import {
    getChangepasswordFailed,
    getChangepasswordLoaded,
    getChangepasswordLoading, getEditProfileFailed, getEditProfileLoaded, getEditProfileLoading, getEdittedStatus,
    getHistoryListFailed, getHistoryListLoaded, getHistoryListLoading, getNewPassword, getOrderHistoryDetail,
    getOrderHistoryList, getOrderHistoryDetailLoading, getOrderHistoryDetailFailed, getOrderHistoryDetailLoaded,
    getorderHistoryCount
} from './reducer/account.selector';
import {EditProfileModal} from './models/editProfile.modal';
import {OrderHistoryRequestModel} from './models/order-history-request.model';
import {CommonSandbox} from '../common/common.sandbox';


@Injectable()
export class AccountSandbox {
    /* order history detail*/
    public orderHistoryList$ = this.appState$.select(getOrderHistoryList);
    public orderHistoryCount$ = this.appState$.select(getorderHistoryCount);
    public orderHistoryDetail$ = this.appState$.select(getOrderHistoryDetail);
    public orderHistoryDetailLoaded$ = this.appState$.select(getOrderHistoryDetailLoaded);
    public orderHistoryDetailLoading$ = this.appState$.select(getOrderHistoryDetailLoading);
    public orderHistoryDetailFailed$ = this.appState$.select(getOrderHistoryDetailFailed);
    /* order history */
    public historyListLoaded$ = this.appState$.select(getHistoryListLoaded);
    public historyListLoading$ = this.appState$.select(getHistoryListLoading);
    public historyListFailed$ = this.appState$.select(getHistoryListFailed);
    /* change password */
    public newPassword$ = this.appState$.select(getNewPassword);
    public changePasswordLoading$ = this.appState$.select(getChangepasswordLoading);
    public changePasswordLoaded$ = this.appState$.select(getChangepasswordLoaded);
    public changePasswordFailed$ = this.appState$.select(getChangepasswordFailed);
    /* edit profile */
    public getEdittedStatus$ = this.appState$.select(getEdittedStatus);
    public getEditProfileLoaded$ = this.appState$.select(getEditProfileLoaded);
    public getEditProfileLoading$ = this.appState$.select(getEditProfileLoading);
    public getEditProfileFailed$ = this.appState$.select(getEditProfileFailed);


    private subscriptions: Array<Subscription> = [];
    public getCustomerAddressList: any = {};
    profileImageData = new Subject<any>();

    constructor(private router: Router,
                protected appState$: Store<store.AppState>,
                public commonSandbox: CommonSandbox) {
        this.registerEvents();
    }

    /**
     * trigger change password action
     */
    public doChangepassword(params): void {
        this.appState$.dispatch(new authAction.ChangePassword(new ChangePasswordModel(params)));
    }

    /**
     * trigger edit profile action
     */
    public doEditProfile(params): void {
        this.appState$.dispatch(new authAction.EditProfile(new EditProfileModal(params)));
    }

    /**
     * trigger get order history action
     */
    public getOrderHistory(params): void {
        this.appState$.dispatch(new authAction.GetOrderHistory(new OrderHistoryRequestModel(params)));
    }

    /**
     * trigger get order history count action
     */
    public getOrderHistoryCount(params): void {
        this.appState$.dispatch(new authAction.GetOrderHistoryCount(new OrderHistoryRequestModel(params)));
    }

    /**
     * trigger get order history detail action
     */
    public getOrderDetail(params): void {
        this.appState$.dispatch(new authAction.GetOrderDetail(params));
    }

    /**
     * clear state value of the order detail
     */
    public clearDetail(): void {
        this.appState$.dispatch(new authAction.ClearOrderDetail());
    }
    /**
     * subscribe events
     */
    public registerEvents() {
        this.subscriptions.push(this.newPassword$.subscribe(password => {
            if (password) {
                if (password.message) {
                    this.router.navigate(['/']);
                }
            }
        }));

        this.subscriptions.push(this.getEdittedStatus$.subscribe(edit => {
            if (edit && edit.status === 1) {
                this.commonSandbox.doGetProfile();
                this.router.navigate(['/']);
            }
        }));

    }
}
