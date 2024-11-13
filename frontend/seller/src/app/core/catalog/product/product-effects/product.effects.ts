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
import * as actions from '../product-action/product.action';
import { catchError } from 'rxjs/operators';
import { NewProductService } from '../product.service';

import { Store } from '@ngrx/store';
import * as store from '../../../app.state.interface';

@Injectable()
export class NewProductEffects {
    constructor(
        private action$: Actions,
        private apiCli: NewProductService,
        protected appState: Store<store.AppState>
    ) { }

    /* Categories List*/
    

    CategoriesList$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(actions.ActionTypes.CATEGORIES_LIST_ACTION),
        map((action: actions.CategoriesListAction) => action.payload),
        switchMap(state => {
            return this.apiCli.getorderlistCount(state).pipe(
                switchMap(salesPayments => [
                    new actions.CategoriesListSuccess(salesPayments)
                ]),
                catchError(error => of(new actions.CategoriesListFail(error)))
            );
        })
    ));

    /* Tax List*/
    

    TaxList$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(actions.ActionTypes.TAX_LIST_ACTION),
        map((action: actions.TaxListAction) => action.payload),
        switchMap(state => {
            return this.apiCli.TaxList(state).pipe(
                switchMap(salesPayments => [
                    new actions.TaxListSuccess(salesPayments)
                ]),
                catchError(error => of(new actions.TaxListFail(error)))
            );
        })
    ));

    /* Product  creation*/
    

    ProductCreation$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(actions.ActionTypes.PRODUCT_CREATION_ACTION),
        map((action: actions.ProductCreationAction) => action.payload),
        switchMap(state => {
            return this.apiCli.ProductCreation(state).pipe(
                switchMap(salesPayments => [
                    new actions.ProductCreationSuccess(salesPayments)
                ]),
                catchError(error => of(new actions.ProductCreationFail(error)))
            );
        })
    ));

    /* Product Update Details*/
    

    ProductUpdateDetails$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(actions.ActionTypes.PRODUCT_UPDATE_DETAILS_ACTION),
        map((action: actions.ProductUpdateDetailsAction) => action.payload),
        switchMap(state => {
            return this.apiCli.ProductUpdateDetails(state).pipe(
                switchMap(salesPayments => [
                    new actions.ProductUpdateDetailsSuccess(salesPayments)
                ]),
                catchError(error => of(new actions.ProductUpdateDetailsFail(error)))
            );
        })
    ));

    /* Product edit*/
    

    Productedit$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(actions.ActionTypes.PRODUCT_EDIT_ACTION),
        map((action: actions.ProducteditAction) => action.payload),
        switchMap(state => {
            return this.apiCli.Productedit(state).pipe(
                switchMap(salesPayments => [
                    new actions.ProducteditSuccess(salesPayments)
                ]),
                catchError(error => of(new actions.ProducteditFail(error)))
            );
        })
    ));

    /* Product Video upload*/
    

    ProductVideoUpload$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(actions.ActionTypes.PRODUCT_VIDEO_UPLOAD_ACTION),
        map((action: actions.ProductVideoUploadAction) => action.payload),
        switchMap(state => {
            return this.apiCli.ProductVideoUpload(state).pipe(
                switchMap(salesPayments => [
                    new actions.ProductVideoUploadSuccess(salesPayments)
                ]),
                catchError(error => of(new actions.ProductVideoUploadFail(error)))
            );
        })
    ));

   /* Product Multi Delete*/
    

    ProductMultiDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(actions.ActionTypes.PRODUCT_VIDEO_MULTI_DELETE_ACTION),
        map((action: actions.ProductMultiDeleteAction) => action.payload),
        switchMap(state => {
            return this.apiCli.ProductMultiDelete(state).pipe(
                switchMap(salesPayments => [
                    new actions.ProductMultiDeleteSuccess(salesPayments)
                ]),
                catchError(error => of(new actions.ProductMultiDeleteFail(error)))
            );
        })
    ));

}
