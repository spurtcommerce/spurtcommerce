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
import * as store from '../../../../app.state.interface';
import { Router } from '@angular/router';
import * as ProductActions from './vendor-product-action/vendor-product.action';
import { Subscription } from 'rxjs/index';
import { CatlistForm } from './vendor-product-models/catlist.model';
import { SellerListRequest } from '../../../../../core/admin/vendor/pages/vendor-product/vendor-product-models/seller.request.model';
import { ProductAddModel } from '../../../../../core/admin/vendor/pages/vendor-product/vendor-product-models/Product-add.model';
import { ApprovalRequest } from './vendor-product-models/seller-approval.request.model';
import { ProductUpdateModel } from './vendor-product-models/Product-update.model';
import { DetailModel } from './vendor-product-models/detail.model';
import { StatusRequest } from './vendor-product-models/product-status.request.model';

import {
  getCatListResponse,
  getCatListRequestLoading,
  getCatListRequestLoaded,
  getCatListRequestFailed,
  getSellerList,
  getSellerListLoaded,
  getSellerListLoading,
  getSellerListFailed,
  optionList,
  optionlistLoading,
  optionlistLoaded,
  optionlistFailed,
  getProductAdd,
  ProductAddFailed,
  ProductAddLoaded,
  ProductAddLoading,
  gettingOptionList,
  gettingOptionListLoading,
  gettingOptionListLoaded,
  gettingOptionListFailed,
  getProductList,
  ProductListFailed,
  ProductListLoaded,
  ProductListLoading,
  getProductDelete,
  ProductDeleteFailed,
  ProductDeleteLoaded,
  ProductDeleteLoading,
  getSellerApproval,
  getSellerApprovalLoaded,
  getSellerApprovalLoading,
  getSellerApprovalFailed,
  getProductUpdate,
  ProductUpdateFailed,
  ProductUpdateLoaded,
  ProductUpdateLoading,
  getProductDetails,
  ProductDetailFailed,
  ProductDetailLoaded,
  ProductDetailLoading,
  getProductStatus,
  getProductStatusLoaded,
  getProductStatusLoading,
  getProductStatusFailed,
  ProductCommissionFailed, ProductCommissionLoaded, ProductCommissionLoading, getProductCommission,
  vendorProductCount,
  vendorProductCountLoading,
  vendorProductListCount,
  manufacturerList,

  skuArrayList,
  productListCount,
  videoUpload,
  videoUploadLoading,
  videoUploadLoaded,exportListLoading
} from './vendor-product-reducer/vendor-product.selector';
import { ProductDeleteModel } from '../../../../../core/admin/vendor/pages/vendor-product/vendor-product-models/product-delete.model';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class VendorProductSandbox {
  private subscriptions: Array<Subscription> = [];
  public exportListLoading$ = this.appState.select(exportListLoading)
  public getCatListResponse$ = this.appState.select(getCatListResponse);
  public getCatListRequestLoading$ = this.appState.select(
    getCatListRequestLoading
  );
  public getCatListRequestLoaded$ = this.appState.select(
    getCatListRequestLoaded
  );
  public getCatListRequestFailed$ = this.appState.select(
    getCatListRequestFailed
  );

  public getSellerList$ = this.appState.select(getSellerList);
  public getSellerListLoading$ = this.appState.select(getSellerListLoading);
  public getSellerListLoaded$ = this.appState.select(getSellerListLoaded);
  public getSellerListFailed$ = this.appState.select(getSellerListFailed);

  public videoUpload$ = this.appState.select(videoUpload);
  public videoUploadLoading$ = this.appState.select(videoUploadLoading);
  public videoUploadLoaded$ = this.appState.select(videoUploadLoaded);

  public optionList$ = this.appState.select(optionList);
  public optionListLoading$ = this.appState.select(optionlistLoading);
  public optionListLoaded$ = this.appState.select(optionlistLoaded);
  public optionListFailed$ = this.appState.select(optionlistFailed);

  public productAdd$ = this.appState.select(getProductAdd);
  public productAddLoading$ = this.appState.select(ProductAddLoading);
  public productAddLoaded$ = this.appState.select(ProductAddLoaded);
  public productAddFailed$ = this.appState.select(ProductAddFailed);

  public productCommission$ = this.appState.select(getProductCommission);
  public productCommissionLoading$ = this.appState.select(ProductCommissionLoading);
  public productCommissionLoaded$ = this.appState.select(ProductCommissionLoaded);
  public productCommissionFailed$ = this.appState.select(ProductCommissionFailed);

  public gettingOptionList$ = this.appState.select(gettingOptionList);
  public gettingOptionListLoading$ = this.appState.select(
    gettingOptionListLoading
  );
  public gettingOptionListLoaded$ = this.appState.select(
    gettingOptionListLoaded
  );
  public gettingOptionListFailed$ = this.appState.select(
    gettingOptionListFailed
  );

  public productList$ = this.appState.select(getProductList);
  public productListLoading$ = this.appState.select(ProductListLoading);
  public productListLoaded$ = this.appState.select(ProductListLoaded);
  public productListFailed$ = this.appState.select(ProductListFailed);

  public deletedProduct$ = this.appState.select(getProductDelete);
  public productDeleteLoading$ = this.appState.select(ProductDeleteLoading);
  public productDeleteLoaded$ = this.appState.select(ProductDeleteLoaded);
  public productDeleteFailed$ = this.appState.select(ProductDeleteFailed);

  public getSellerApproval$ = this.appState.select(getSellerApproval);
  public getSellerApprovalLoading$ = this.appState.select(
    getSellerApprovalLoading
  );
  public getSellerApprovalLoaded$ = this.appState.select(
    getSellerApprovalLoaded
  );
  public getSellerApprovalFailed$ = this.appState.select(
    getSellerApprovalFailed
  );

  public productUpdate$ = this.appState.select(getProductUpdate);
  public productUpdateLoading$ = this.appState.select(ProductUpdateLoading);
  public productUpdateLoaded$ = this.appState.select(ProductUpdateLoaded);
  public productUpdateFailed$ = this.appState.select(ProductUpdateFailed);

  public productDetails$ = this.appState.select(getProductDetails);
  public productDetailLoading$ = this.appState.select(ProductDetailLoading);
  public productDetailLoaded$ = this.appState.select(ProductDetailLoaded);
  public productDetailFailed$ = this.appState.select(ProductDetailFailed);

  public getProductStatus$ = this.appState.select(getProductStatus);
  public getProductStatusLoading$ = this.appState.select(
    getProductStatusLoading
  );
  public getProductStatusLoaded$ = this.appState.select(getProductStatusLoaded);
  public getProductStatusFailed$ = this.appState.select(getProductStatusFailed);

  public vendorProductCount$ = this.appState.select(vendorProductCount);
  public vendorProductCountLoading$ = this.appState.select(vendorProductCountLoading);
  public vendorProductListCount$ = this.appState.select(vendorProductListCount);

  public manufacturerList$ = this.appState.select(manufacturerList);

  public skuArrayList$ = this.appState.select(skuArrayList);

  public productListCount$ = this.appState.select(productListCount);


  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrService
  ) {
     this.subscribe();
  }

  public catlist(value) {
    this.appState.dispatch(
      new ProductActions.DoCatlistAction(new CatlistForm(value))
    );
  }

  public sellerList(params) {
    this.appState.dispatch(
      new ProductActions.GetSellerList(new SellerListRequest(params))
    );
  }

  public doProductAdd(value) {
    this.appState.dispatch(
      new ProductActions.DoProductAddAction(new ProductAddModel(value))
    );
  }
  public doProductCommission(value) {
    this.appState.dispatch(
      new ProductActions.DoProductCommissionAction(value)
    );
  }

  // clear product details
  public ClearProductDetails() {
    this.appState.dispatch(new ProductActions.DOClearProductDetails());
  }

  public productRemoveList(value) {
    this.appState.dispatch(new ProductActions.DoProductremovelistAction(value));
  }
  public productAddList(value) {
    this.appState.dispatch(new ProductActions.DoProductaddlistAction(value));
  }


  public productRemove(value) {
    this.appState.dispatch(new ProductActions.DoProductremoveAction(value));
  }

  public productAdd(value) {
    this.appState.dispatch(new ProductActions.DoProductaddAction(value));
  }

  public productList(value) {
    this.appState.dispatch(new ProductActions.GetProductlistAction(value));
  }

  public productListCount(value) {
    this.appState.dispatch(new ProductActions.ProductListCountAction(value));
  }

  public doProductDelete(value) {
    this.appState.dispatch(
      new ProductActions.DoProductDeleteAction(new ProductDeleteModel(value))
    );
  }

  public sellerApproval(params) {
    this.appState.dispatch(
      new ProductActions.DoSellerApproval(new ApprovalRequest(params))
    );
  }

  public productStatus(params) {
    this.appState.dispatch(
      new ProductActions.DoProductStatus(new StatusRequest(params))
    );
  }

  public doProductUpdate(value) {
    this.appState.dispatch(
      new ProductActions.DoProductUpdateAction(new ProductUpdateModel(value))
    );
  }

  public getProductDetail(value) {
    this.appState.dispatch(
      new ProductActions.GetProductDetailAction(new DetailModel(value))
    );
  }


  // Do Product Excel
  public productExcel(value) {
    this.appState.dispatch(new ProductActions.DoProductExcel(value));
  }

  public productAllExcel(value) {
    this.appState.dispatch(new ProductActions.DoProductsExcel(value));
  }

  public getVendorProductCounts() {
    this.appState.dispatch(new ProductActions.GetVendorProductCountAction());
  }

  // get vendor product list count for set commision

  public vendorProductListCount(value) {
    this.appState.dispatch(new ProductActions.VendorProductCountAction(value));
  }

  // get manufacturer list
  public getManufaturerList(value) {
    this.appState.dispatch(new ProductActions.ManufacturerListAction(value));
  }

  public selectCategoryList(value) {
    this.appState.dispatch(new ProductActions.SelectCategory(value));
  }
  public removeCategoryList(value) {
    this.appState.dispatch(new ProductActions.RemoveCategory(value));
  }
  public videoUpload(value) {
    this.appState.dispatch(new ProductActions.uploadVideo(value));
  }

  subscribe() {
    this.productAdd$.subscribe(data => {
      if (data && data.status === 1) {
        this.router.navigate(['/vendors/manage-products/vendor-products']);
      }
    });

    this.productUpdateLoaded$.subscribe(data => {
      if (data && data === true) {
        this.router.navigate(['/vendors/manage-products/vendor-products']);
      }
    });
  }
}
