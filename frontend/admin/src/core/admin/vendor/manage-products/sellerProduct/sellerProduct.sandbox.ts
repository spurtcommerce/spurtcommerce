import { Injectable } from '@angular/core';
// store
import { Store } from '@ngrx/store';
// actions
import * as SellerManagementActions from './action/sellerProduct.action';
// app state
import * as store from 'src/core/app.state.interface';


import * as _ from 'lodash';
import { Router } from '@angular/router';
import { sellerProductCount, sellerProductCountLoaded, sellerProductCountLoading, sellerProductList, sellerProductListLoaded, sellerProductListLoading, SingleProductDataExport, SingleProductDataExportLoading, SingleProductDataExportLoaded, MultipleProductDataExport, MultipleProductDataExportLoading, MultipleProductDataExportLoaded, approveProduct, approveProductLoading, approveProductLoaded, rejectProduct, rejectProductLoading, rejectProductLoaded, productStatus, productStatusLoading,productStatusLoaded} from './reducer/sellerProduct.selector';



@Injectable()
export class SellerProductSandox {


    // sellerProductList 
    public sellerProductList$ = this.appState.select(sellerProductList);
    public sellerProductListLoading$ = this.appState.select(sellerProductListLoading);
    public sellerProductListLoaded$ = this.appState.select(sellerProductListLoaded);


    // sellerProductCount 
    public sellerProductCount$ = this.appState.select(sellerProductCount);
    public sellerProductCountLoading$ = this.appState.select(sellerProductCountLoading);
    public sellerProductCountLoaded$ = this.appState.select(sellerProductCountLoaded);


    // SingleProductDataExport 
    public SingleProductDataExport$ = this.appState.select(SingleProductDataExport);
    public SingleProductDataExportLoading$ = this.appState.select(SingleProductDataExportLoading);
    public SingleProductDataExportLoaded$ = this.appState.select(SingleProductDataExportLoaded);

    // MultipleProductDataExport 
    public MultipleProductDataExport$ = this.appState.select(MultipleProductDataExport);
    public MultipleProductDataExportLoading$ = this.appState.select(MultipleProductDataExportLoading);
    public MultipleProductDataExportLoaded$ = this.appState.select(MultipleProductDataExportLoaded);


    // approveProduct 
    public approveProduct$ = this.appState.select(approveProduct);
    public approveProductLoading$ = this.appState.select(approveProductLoading);
    public approveProductLoaded$ = this.appState.select(approveProductLoaded);


    // rejectProduct 
    public rejectProduct$ = this.appState.select(rejectProduct);
    public rejectProductLoading$ = this.appState.select(rejectProductLoading);
    public rejectProductLoaded$ = this.appState.select(rejectProductLoaded);

    // productStatus 
    public productStatus$ = this.appState.select(productStatus);
    public productStatusLoading$ = this.appState.select(productStatusLoading);
    public productStatusLoaded$ = this.appState.select(productStatusLoaded);

    constructor(
        protected appState: Store<store.AppState>,
        private router: Router,
    ) {
        // ----
    }

    // sellerProductList
    public sellerProductList(value: any) {
        this.appState.dispatch(
            new SellerManagementActions.sellerProductListAction(value)
        );
    }

    // sellerProductCount
    public sellerProductCount(value: any) {
        this.appState.dispatch(
            new SellerManagementActions.sellerProductCountAction(value)
        );
    }



    // SingleProductDataExport
    public SingleProductDataExport(value: any) {
        this.appState.dispatch(
            new SellerManagementActions.SingleProductDataExportAction(value)
        );
    }


    // MultipleProductDataExport
    public MultipleProductDataExport(value: any) {
        this.appState.dispatch(
            new SellerManagementActions.MultipleProductDataExportAction(value)
        );
    }


    // approveProduct
    public approveProduct(value: any) {
        this.appState.dispatch(
            new SellerManagementActions.approveProductAction(value)
        );
    }

    // rejectProduct
    public rejectProduct(value: any) {
        this.appState.dispatch(
            new SellerManagementActions.rejectProductAction(value)
        );
    }



    // productStatus
    public productStatus(value: any) {
        this.appState.dispatch(
            new SellerManagementActions.productStatusAction(value)
        );
    }

}