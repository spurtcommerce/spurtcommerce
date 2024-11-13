/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
// effects
import { createEffect, Actions, ofType } from '@ngrx/effects';
// store
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../action/product-localization.action';

import { catchError } from 'rxjs/operators';
// service
import { ProductLocalizationService } from '../product-localisation.service';

import * as store from '../../../app.state.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProductLocalizationEffect {
    constructor(
        private action$: Actions,
        protected appState: Store<store.AppState>,
        private service: ProductLocalizationService,
        private toastr: ToastrService
    ) {
    }

    // Product localization list
    
    getProductLocalization$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(actions.ActionTypes.GET_PRODUCT_LOCALIZATION),
        map((action: actions.getProductLocalization) => action.payload),
        switchMap(state => {
            return this.service.getProductLocalization(state).pipe(
                switchMap(product => [
                    new actions.getProductLocalizationSuccess(product)
                ]),
                catchError(error => of(new actions.getProductLocalizationFailed(error)))
            );
        })
    ));

    // Product localization Count
    
    getProductLocalizationCount$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(actions.ActionTypes.GET_PRODUCT_LOCALIZATION_COUNT),
        map((action: actions.getProductLocalizationCount) => action.payload),
        switchMap(state => {
            return this.service.getProductLocalizationCount(state).pipe(
                switchMap(product => [
                    new actions.getProductLocalizationCountSuccess(product)
                ]),
                catchError(error => of(new actions.getProductLocalizationCountFailed(error)))
            );
        })
    ));

    // Product localization Detail
    
    productLocalizationDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(actions.ActionTypes.PRODUCT_LOCALIZATION_DETAIL),
        map((action: actions.productLocalizationDetail) => action.payload),
        switchMap(state => {
            return this.service.productLocalizationDetail(state).pipe(
                switchMap(product => [
                    new actions.productLocalizationDetailSuccess(product)
                ]),
                catchError(error => of(new actions.productLocalizationDetailFailed(error)))
            );
        })
    ));

    // Product localization create
    
    productLocalizationCreate$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(actions.ActionTypes.PRODUCT_LOCALIZATION_CREATE),
        map((action: actions.productLocalizationCreate) => action.payload),
        switchMap(state => {
            return this.service.productLocalizationCreate(state).pipe(
                switchMap(product => [
                    new actions.productLocalizationCreateSuccess(product)
                ]),
                catchError(error => of(new actions.productLocalizationCreateFailed(error)))
            );
        })
    ));
}