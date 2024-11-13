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
import * as store from '../../../app.state.interface';
// router
import { Router } from '@angular/router';
// notifications
// import { ToastrManager } from 'ng6-toastr-notifications';

import {
  // product add selectors
  getProductAdd,
  ProductAddFailed,
  ProductAddLoaded,
  ProductAddLoading,
  // product count selectors
  getProductCount,
  ProductCountFailed,
  ProductCountLoaded,
  ProductCountLoading,
  // product delete selectors
  getProductDelete,
  ProductDeleteFailed,
  ProductDeleteLoaded,
  ProductDeleteLoading,
  // product details selectors
  getProductAddDetail,
  getProductDetails,
  ProductDetailFailed,
  ProductDetailLoaded,
  ProductDetailLoading,
  // product list selectors
  getProductList,
  ProductListFailed,
  ProductListLoaded,
  ProductListLoading,
  // product update selectors
  getProductUpdate,
  ProductUpdateFailed,
  ProductUpdateLoaded,
  ProductUpdateLoading,
  // product add List
  getProductAddListRequestLoading,
  getProductAddListResponse,
  getProductAddListRequestFailed,
  getProductAddListRequestLoaded,
  // product remove List
  getProductRemoveListResponse,
  getProductRemoveListRequestLoading,
  getProductRemoveListRequestLoaded,
  getProductRemoveListRequestFailed,
  optionList,
  optionlistLoading,
  optionlistLoaded,
  optionlistFailed,
  gettingOptionList,
  gettingOptionListLoading,
  gettingOptionListLoaded,
  gettingOptionListFailed,
  gettingRatingList,
  skuArrayList,
  videoUploadFailed,
  videoUpload,
  videoUploadLoaded,
  videoUploadLoading,
  videoPreviewLoading,
  videoPreviewLoaded,
  videoPreviewFailed,
  videoPreview,productExcelLoading,


} from './product-reducer/product.selector';
import { ProductListModel } from './product-model/Product-list.model';
import { ProductDeleteModel } from './product-model/product-delete.model';
import { ProductAddModel } from './product-model/Product-add.model';
import { ProductUpdateModel } from './product-model/Product-update.model';
import { DetailModel } from './product-model/detail.model';
import { ProductRatingListModel } from './product-model/product-rating-list.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProductSandbox {
  public productExcelLoading$ = this.appState.select(productExcelLoading);
  public productList$ = this.appState.select(getProductList);
  public productCount$ = this.appState.select(getProductCount);
  public deletedProduct$ = this.appState.select(getProductDelete);
  public productAdd$ = this.appState.select(getProductAdd);
  public productAddDetail$ = this.appState.select(getProductAddDetail);
  public productUpdate$ = this.appState.select(getProductUpdate);
  public productDetails$ = this.appState.select(getProductDetails);
  public optionList$ = this.appState.select(optionList);
  public gettingOptionList$ = this.appState.select(gettingOptionList);
  public gettingRatingList$ = this.appState.select(gettingRatingList);

  public productDetailLoading$ = this.appState.select(ProductDetailLoading);
  public productDetailLoaded$ = this.appState.select(ProductDetailLoaded);
  public productDetailFailed$ = this.appState.select(ProductDetailFailed);

  public productListLoading$ = this.appState.select(ProductListLoading);
  public productListLoaded$ = this.appState.select(ProductListLoaded);
  public productListFailed$ = this.appState.select(ProductListFailed);

  public productDeleteLoading$ = this.appState.select(ProductDeleteLoading);
  public productDeleteLoaded$ = this.appState.select(ProductDeleteLoaded);
  public productDeleteFailed$ = this.appState.select(ProductDeleteFailed);

  public productCountLoading$ = this.appState.select(ProductCountLoading);
  public productCountLoaded$ = this.appState.select(ProductCountLoaded);
  public productCountFailed$ = this.appState.select(ProductCountFailed);

  public productAddLoading$ = this.appState.select(ProductAddLoading);
  public productAddLoaded$ = this.appState.select(ProductAddLoaded);
  public productAddFailed$ = this.appState.select(ProductAddFailed);

  public productUpdateLoading$ = this.appState.select(ProductUpdateLoading);
  public productUpdateLoaded$ = this.appState.select(ProductUpdateLoaded);
  public productUpdateFailed$ = this.appState.select(ProductUpdateFailed);

  public getProductAddResponse$ = this.appState.select(
    getProductAddListResponse
  );
  public getProductAddRequestLoading$ = this.appState.select(
    getProductAddListRequestLoading
  );
  public getProductAddRequestLoaded$ = this.appState.select(
    getProductAddListRequestLoaded
  );
  public getProductAddRequestFailed$ = this.appState.select(
    getProductAddListRequestFailed
  );

  public getProductRemoveResponse$ = this.appState.select(
    getProductRemoveListResponse
  );
  public getProductRemoveRequestLoading$ = this.appState.select(
    getProductRemoveListRequestLoading
  );
  public getProductRemoveRequestLoaded$ = this.appState.select(
    getProductRemoveListRequestLoaded
  );
  public getProductRemoveRequestFailed$ = this.appState.select(
    getProductRemoveListRequestFailed
  );

  public optionListLoading$ = this.appState.select(optionlistLoading);
  public optionListLoaded$ = this.appState.select(optionlistLoaded);
  public optionListFailed$ = this.appState.select(optionlistFailed);


  public gettingOptionListLoading$ = this.appState.select(
    gettingOptionListLoading
  );
  public gettingOptionListLoaded$ = this.appState.select(
    gettingOptionListLoaded
  );
  public gettingOptionListFailed$ = this.appState.select(
    gettingOptionListFailed
  );

  public videoUpload$ = this.appState.select(videoUpload);
  public videoUploadLoading$ = this.appState.select(videoUploadLoading);
  public videoUploadLoaded$ = this.appState.select(videoUploadLoaded);
  public videoUploadFailed$ = this.appState.select(videoUploadFailed);

  public videoPreview$ = this.appState.select(videoPreview);
  public videoPreviewLoading$ = this.appState.select(videoPreviewLoading);
  public videoPreviewLoaded$ = this.appState.select(videoPreviewLoaded);
  public videoPreviewFailed$ = this.appState.select(videoPreviewFailed);

  public skuArrayList$ = this.appState.select(skuArrayList);



  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrService
  ) {
    // this.subscribe();
  }

  public getProductList(value) {
    this.appState.dispatch(
      new productActions.GetProductlistAction(new ProductListModel(value))
    );
  }

  public getProductCount(value) {
    this.appState.dispatch(
      new productActions.GetProductCountAction(new ProductListModel(value))
    );
  }

  public doProductDelete(value) {
    this.appState.dispatch(
      new productActions.DoProductDeleteAction(new ProductDeleteModel(value))
    );
  }

  public doProductAdd(value) {
    this.appState.dispatch(
      new productActions.DoProductAddAction(new ProductAddModel(value))
    );
  }

  public doProductUpdate(value) {
    this.appState.dispatch(
      new productActions.DoProductUpdateAction(new ProductUpdateModel(value))
    );
  }

  public getProductDetail(value) {
    this.appState.dispatch(
      new productActions.GetProductDetailAction(new DetailModel(value))
    );
  }

  public productAddList(value) {
    this.appState.dispatch(new productActions.DoProductaddlistAction(value));
  }

  public productRemoveList(value) {
    this.appState.dispatch(new productActions.DoProductremovelistAction(value));
  }

  // clear product details
  public ClearProductDetails() {
    this.appState.dispatch(new productActions.DOClearProductDetails());
  }

  // Get Product Rating List
  public getProductRatingList(value) {
    this.appState.dispatch(
      new productActions.GetProductRating(new ProductRatingListModel(value))
    );
  }

  // Do Rating Status
  public doRatingStatus(value) {
    this.appState.dispatch(new productActions.DoProductRatingStatus(value));
  }

  // Do Product Bulk Delete
  public bulkDelete(value) {
    this.appState.dispatch(new productActions.DoProductBulkDelete(value));
  }

  // Do Product Excel
  public productExcel(value) {
    this.appState.dispatch(new productActions.DoProductExcel(value));
  }


  // Do Product Excel
  public productAllExcel(value) {
    this.appState.dispatch(new productActions.DoProductAllExcel(value));
  }

  // clear state variable to avoid subscription

  public clear() {
    this.appState.dispatch(new productActions.ClearVariableAction());
  }

  public videoUpload(value) {
    this.appState.dispatch(new productActions.VideoUpload(value));
  }

  public videoPreview(value) {
    this.appState.dispatch(new productActions.videoPreview(value));
  }


  subscribe() {
    this.productAdd$.subscribe(data => {
      if (data && data.status === 1) {
        this.router.navigate(['/catalog/manage-products/product']);
      }
    });

    this.productUpdate$.subscribe(data => {
      if (data && data['status'] === 1) {
        this.router.navigate(['/catalog/manage-products/product']);
      }
    });
  }
}
