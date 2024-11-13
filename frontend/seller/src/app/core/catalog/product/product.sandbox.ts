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
import * as productActions from './product-action/product.action';
// app state
import * as store from '../../app.state.interface';
// router
import { Router } from '@angular/router';
// notifications
// import { ToastrManager } from 'ng6-toastr-notifications';


import {
    CategoriesList, CategoriesListFailed, CategoriesListLoaded, CategoriesListLoading, ProductCreation, ProductCreationFailed, ProductCreationLoaded, ProductCreationLoading, ProductUpdateDetails, ProductUpdateDetailsFailed, ProductUpdateDetailsLoaded, ProductUpdateDetailsLoading, TaxList, TaxListFailed, TaxListLoaded,
    TaxListLoading, Productedit, ProducteditLoading, ProducteditLoaded, ProducteditFailed,
    ProductVideoUpload,
    ProductVideoUploadLoading,
    ProductVideoUploadLoaded,
    ProductVideoUploadFailed,
    ProductMultiDelete,
    ProductMultiDeleteLoading,
    ProductMultiDeleteLoaded,
    ProductMultiDeleteFailed
} from './product-reducer/product.selector';


@Injectable()
export class NewProductSandbox {

    /* Categories List*/
    public CategoriesList$ = this.appState.select(CategoriesList);
    public CategoriesListLoading = this.appState.select(CategoriesListLoading);
    public CategoriesListLoaded = this.appState.select(CategoriesListLoaded);
    public CategoriesListFailed = this.appState.select(CategoriesListFailed);

    /* Tax List*/
    public TaxList$ = this.appState.select(TaxList);
    public TaxListLoading = this.appState.select(TaxListLoading);
    public TaxListLoaded = this.appState.select(TaxListLoaded);
    public TaxListFailed = this.appState.select(TaxListFailed);


    /* Product  creation*/
    public ProductCreation$ = this.appState.select(ProductCreation);
    public ProductCreationLoading = this.appState.select(ProductCreationLoading);
    public ProductCreationLoaded = this.appState.select(ProductCreationLoaded);
    public ProductCreationFailed = this.appState.select(ProductCreationFailed);

    /* Product Update Details*/
    public ProductUpdateDetails$ = this.appState.select(ProductUpdateDetails);
    public ProductUpdateDetailsLoading = this.appState.select(ProductUpdateDetailsLoading);
    public ProductUpdateDetailsLoaded = this.appState.select(ProductUpdateDetailsLoaded);
    public ProductUpdateDetailsFailed = this.appState.select(ProductUpdateDetailsFailed);

    /* Product edit*/
    public Productedit$ = this.appState.select(Productedit);
    public ProducteditLoading = this.appState.select(ProducteditLoading);
    public ProducteditLoaded = this.appState.select(ProducteditLoaded);
    public ProducteditFailed = this.appState.select(ProducteditFailed);

    /* Product Video upload*/
    public ProductVideoUpload$ = this.appState.select(ProductVideoUpload);
    public ProductVideoUploadLoading$ = this.appState.select(ProductVideoUploadLoading);
    public ProductVideoUploadLoaded$ = this.appState.select(ProductVideoUploadLoaded);
    public ProductVideoUploadFailed$ = this.appState.select(ProductVideoUploadFailed);

    /* Product Multi Delete*/
    public ProductMultiDelete$ = this.appState.select(ProductMultiDelete);
    public ProductMultiDeleteLoading = this.appState.select(ProductMultiDeleteLoading);
    public ProductMultiDeleteLoaded = this.appState.select(ProductMultiDeleteLoaded);
    public ProductMultiDeleteFailed = this.appState.select(ProductMultiDeleteFailed);

    constructor(protected appState: Store<store.AppState>) { }

    /* Categories List*/
    public CategoriesList(data) {
        this.appState.dispatch(new productActions.CategoriesListAction(data));
    }


    /* Tax List*/
    public TaxList(data) {
        this.appState.dispatch(new productActions.TaxListAction(data));
    }


    /* Product  creation*/
    public ProductCreation(data) {
        this.appState.dispatch(new productActions.ProductCreationAction(data));
    }


    /* Product Update Details*/
    public ProductUpdateDetails(data) {
        this.appState.dispatch(new productActions.ProductUpdateDetailsAction(data));
    }

    /* Product edit*/
    public Productedit(data) {
        this.appState.dispatch(new productActions.ProducteditAction(data));
    }

    /* Product Video upload*/
    public ProductVideoUpload(data) {
        this.appState.dispatch(new productActions.ProductVideoUploadAction(data));
    }

    /* Product Multi Delete*/
    public ProductMultiDelete(data) {
        this.appState.dispatch(new productActions.ProductMultiDeleteAction(data));
    }
}