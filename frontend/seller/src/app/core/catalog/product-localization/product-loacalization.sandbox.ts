/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
// store
import { Store } from '@ngrx/store';
// actions
import * as producLocalizationtActions from './action/product-localization.action';
// app state
import * as store from '../../app.state.interface';
// router
import { Router } from '@angular/router';
// notifications
// import { ToastrManager } from 'ng6-toastr-notifications';

import {
    getProductLocalization,
    getProductLocalizationFailed,
    getProductLocalizationLoaded,
    getProductLocalizationLoading,

    getProductLocalizationCount,
    getProductLocalizationCountLoading,
    getProductLocalizationCountLoaded,
    getProductLocalizationCountFailed,

    productLocalizationDetail,
    productLocalizationDetailFailed,
    productLocalizationDetailLoaded,
    productLocalizationDetailLoading,
    
    productLocalizationCreate,
    productLocalizationCreateLoading,
    productLocalizationCreateLoaded,
    productLocalizationCreateFailed
    
} from './reducer/product-localization.selector';


@Injectable()
export class ProductLocalizationSandbox {

    // Product Localization List
    public getProductLocalization$ = this.appState.select(getProductLocalization);
    public getProductLocalizationLoading = this.appState.select(getProductLocalizationLoading);
    public getProductLocalizationLoaded = this.appState.select(getProductLocalizationLoaded);
    public getProductLocalizationFailed = this.appState.select(getProductLocalizationFailed);

    // Product Localization List
    public getProductLocalizationCount$ = this.appState.select(getProductLocalizationCount);
    public getProductLocalizationCountLoading = this.appState.select(getProductLocalizationCountLoading);
    public getProductLocalizationCountLoaded = this.appState.select(getProductLocalizationCountLoaded);
    public getProductLocalizationCountFailed = this.appState.select(getProductLocalizationCountFailed);

    // Product Localization Detail
    public productLocalizationDetail$ = this.appState.select(productLocalizationDetail);
    public productLocalizationDetailLoading = this.appState.select(productLocalizationDetailLoading);
    public productLocalizationDetailLoaded = this.appState.select(productLocalizationDetailLoaded);
    public productLocalizationDetailFailed = this.appState.select(productLocalizationDetailFailed);

    // Product Localization Create
    public productLocalizationCreate$ = this.appState.select(productLocalizationCreate);
    public productLocalizationCreateLoading = this.appState.select(productLocalizationCreateLoading);
    public productLocalizationCreateLoaded = this.appState.select(productLocalizationCreateLoaded);
    public productLocalizationCreateFailed = this.appState.select(productLocalizationCreateFailed);

    constructor(protected appState: Store<store.AppState>) { }

    // Product Localization List
    public getProductLocalization(data) {
        this.appState.dispatch(new producLocalizationtActions.getProductLocalization(data));
    }

    // Product Localization Count
    public getProductLocalizationCount(data) {
        this.appState.dispatch(new producLocalizationtActions.getProductLocalizationCount(data));
    }

    // Product Localization Detail 
    public productLocalizationDetail(data) {
        this.appState.dispatch(new producLocalizationtActions.productLocalizationDetail(data));
    }

    // Product Localization Create 
    public productLocalizationCreate(data) {
        this.appState.dispatch(new producLocalizationtActions.productLocalizationCreate(data));
    }
}