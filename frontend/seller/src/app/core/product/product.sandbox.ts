/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
// store
import { Store } from '@ngrx/store';
// actions
import * as productActions from './product-action/product.action';
// app state
import * as store from '../app.state.interface';
// router
import { Subscription } from 'rxjs/index';
// notifications

import {
  // product add selectors
  getProductAdd,
  productAddFailed,
  productAddLoaded,
  productAddLoading,
  productDeleteFailed, productDeleteLoaded, productDeleteLoading, getProductDelete,
  productBulkDeleteFailed,
  productBulkDeleteLoaded,
  productBulkDeleteLoading,
  getProductBulkDelete,
  productListFailed,
  productListLoaded,

  stockStatusList, stockStatusListFailed, stockStatusListLoaded, stockStatusListLoading,
  productListLoading,
  categoryListLoading, getActiveProductCount, getActiveProductCountFailed,
  getActiveProductCountLoaded, getActiveProductCountLoading, getInActiveProductCount,
  getInActiveProductCountFailed, getInActiveProductCountLoaded,
  getInActiveProductCountLoading, getTotalProductCount, getTotalProductCountFailed,
  getTotalProductCountLoaded, getTotalProductCountLoading,
  categoryList, getProductStatus, getProductStatusFailed, getProductStatusLoaded, getProductStatusLoading,
  tempCategoryList, productUpdateFailed, productUpdateLoaded, productUpdateLoading, getProductUpdate,
  productList, ProductDetailFailed, ProductDetailLoaded, ProductDetailLoading, getProductDetail,
  manufacturerList,
  changeQuotationStatusLoading,
  changeQuotationStatusLoaded,
  variantList,
  variantListLoading,
  variantListLoaded,

  selectedVariant,
  probabiltyOptions,
  skuArrayList,
  selectedVariantId,
  taxList,
  getquestionAdd,
  questionAddLoading,
  questionAddLoaded,
  questionAddFailed,
  getquestionDelete,
  questionDeleteLoading,
  questionDeleteLoaded,
  questionDeleteFailed,
  getquestionList,
  questionListLoading,
  questionListLoaded,
  questionListFailed,
  getquestionStatus,
  questionStatusLoading,
  questionStatusLoaded,
  answerAddLoading,
  getanswerAdd,
  answerAddLoaded,
  answerAddFailed,
  getanswerDelete,
  answerDeleteLoading,
  answerDeleteLoaded,
  answerDeleteFailed,
  getanswerList,
  answerListLoading,
  answerListLoaded,
  answerListFailed,
  getanswerStatus,
  answerStatusLoaded,
  answerStatusLoading,
  answerStatusFailed,
  makeDefault,
  makeDefaultLoading,
  makeDefaultLoaded,
  makeDefaultFailed,
  InventoryProductListLoading,
  InventoryProductListLoaded,
  InventoryProductList,
  InventoryProductListFailed,
  inventoryProductListCount,
  getAttributeGroupList,
  getAttributeGroupListLoading,
  getAttributeGroupListLoaded,
  getAttributeGroupListFailed,
  exportProductLoading,
  exportProductLoaded,
  exportProductFailed,
  exportProduct,
  AllExportProductLoading,
  AllExportProductLoaded,
  AllExportProductFailed,
  AllExportProduct,
  videoUploadLoaded,
  videoUploadLoading,
  videoUploadFailed,
  videoUpload,
  imageUpload,
  imageUploadLoading,
  imageUploadLoaded,
  imageUploadFailed,
  CatalogEdit,
  CatalogEditLoading,
  CatalogEditLoaded,
  CatalogEditFailed,




  // product update selectors

} from './product-reducer/product.selector';
import { ProductListModel } from './product-model/Product-list.model';
import { ProductDeleteModel } from './product-model/product-delete.model';
import { ProductAddModel } from './product-model/Product-add.model';
import { DetailModel } from './product-model/detail.model';
import { ProductUpdateModel } from './product-model/Product-update.model';
import { StatusRequest } from './product-model/product-status.request.model';
import { ProductBulkDeleteModel } from './product-model/product-bulk-delete.model';
import { UpdateStockModel } from './product-model/update-stock-model';

@Injectable()
export class ProductSandbox {

  public productAdd$ = this.appState.select(getProductAdd);


  public productAddLoading$ = this.appState.select(productAddLoading);
  public productAddLoaded$ = this.appState.select(productAddLoaded);
  public productAddFailed$ = this.appState.select(productAddFailed);

  public productDelete$ = this.appState.select(getProductDelete);
  public productDeleteLoading$ = this.appState.select(productDeleteLoading);
  public productDeleteLoaded$ = this.appState.select(productDeleteLoaded);
  public productDeleteFailed$ = this.appState.select(productDeleteFailed);

  public productBulkDelete$ = this.appState.select(getProductBulkDelete);
  public productBulkDeleteLoading$ = this.appState.select(productBulkDeleteLoading);
  public productBulkDeleteLoaded$ = this.appState.select(productBulkDeleteLoaded);
  public productBulkDeleteFailed$ = this.appState.select(productBulkDeleteFailed);

  public productDetails$ = this.appState.select(getProductDetail);
  public productDetailLoading$ = this.appState.select(ProductDetailLoading);
  public productDetailLoaded$ = this.appState.select(ProductDetailLoaded);
  public productDetailFailed$ = this.appState.select(ProductDetailFailed);

  public productListLoading$ = this.appState.select(productListLoading);
  public productListLoaded$ = this.appState.select(productListLoaded);
  public productListFailed$ = this.appState.select(productListFailed);
  public productList$ = this.appState.select(productList);

  public stockStatusListLoading$ = this.appState.select(stockStatusListLoading);
  public stockStatusListLoaded$ = this.appState.select(stockStatusListLoaded);
  public stockStatusListFailed$ = this.appState.select(stockStatusListFailed);
  public stockStatusList$ = this.appState.select(stockStatusList);

  public productUpdate$ = this.appState.select(getProductUpdate);
  public productUpdateLoading$ = this.appState.select(productUpdateLoading);
  public productUpdateLoaded$ = this.appState.select(productUpdateLoaded);
  public productUpdateFailed$ = this.appState.select(productUpdateFailed);

  public categoryListLoading$ = this.appState.select(categoryListLoading);
  public categoryList$ = this.appState.select(categoryList);
  public tempCategoryList$ = this.appState.select(tempCategoryList);

  public getProductStatus$ = this.appState.select(getProductStatus);
  public getProductStatusLoading$ = this.appState.select(
    getProductStatusLoading
  );
  public getProductStatusLoaded$ = this.appState.select(getProductStatusLoaded);
  public getProductStatusFailed$ = this.appState.select(getProductStatusFailed);
  public totalProductCount$ = this.appState.select(getTotalProductCount);
  public totalProductCountLoading$ = this.appState.select(
    getTotalProductCountLoading
  );
  public totalProductCountLoaded$ = this.appState.select(
    getTotalProductCountLoaded
  );

  public activeProductCount$ = this.appState.select(getActiveProductCount);
  public activeProductCountLoading$ = this.appState.select(
    getActiveProductCountLoading
  );
  public activeProductCountLoaded$ = this.appState.select(
    getActiveProductCountLoaded
  );

  public inActiveProductCount$ = this.appState.select(getInActiveProductCount);
  public inActiveProductCountLoading$ = this.appState.select(
    getInActiveProductCountLoading
  );
  public inActiveProductCountLoaded$ = this.appState.select(
    getInActiveProductCountLoaded
  );

  public manufacturerList$ = this.appState.select(manufacturerList);

  public changeQuotationStatusLoading$ = this.appState.select(changeQuotationStatusLoading);
  public changeQuotationStatusLoaded$ = this.appState.select(changeQuotationStatusLoaded);


  public selectedVariant$ = this.appState.select(selectedVariant);
  public probabiltyOptions$ = this.appState.select(probabiltyOptions);
  public skuArrayList$ = this.appState.select(skuArrayList);
  public selectedVariantId$ = this.appState.select(selectedVariantId);
  public variantListLoading$ = this.appState.select(variantListLoading);
  public variantListLoaded$ = this.appState.select(variantListLoaded);
  public variantList$ = this.appState.select(variantList);
  public taxList$ = this.appState.select(taxList);

  // question add
  public getquestionAdd$ = this.appState.select(getquestionAdd);
  public questionAddLoading$ = this.appState.select(questionAddLoading);
  public questionAddLoaded$ = this.appState.select(questionAddLoaded);
  public questionAddFailed$ = this.appState.select(questionAddFailed);


  public attributeGroupList$ = this.appState.select(getAttributeGroupList);
  public attributeGroupListLoading$ = this.appState.select(getAttributeGroupListLoading);
  public attributeGroupListLoaded$ = this.appState.select(getAttributeGroupListLoaded);
  public attributeGroupListFailed$ = this.appState.select(getAttributeGroupListFailed);

  // question delete
  public getquestionDelete$ = this.appState.select(getquestionDelete);
  public questionDeleteLoading$ = this.appState.select(questionDeleteLoading);
  public questionDeleteLoaded$ = this.appState.select(questionDeleteLoaded);
  public questionDeleteFailed$ = this.appState.select(questionDeleteFailed);

  // question list
  public getquestionList$ = this.appState.select(getquestionList);
  public questionListLoading$ = this.appState.select(questionListLoading);
  public questionListLoaded$ = this.appState.select(questionListLoaded);
  public questionListFailed$ = this.appState.select(questionListFailed);


  // question Status
  public getquestionStatus$ = this.appState.select(getquestionStatus);
  public questionStatusLoading$ = this.appState.select(questionStatusLoading);
  public questionStatusLoaded$ = this.appState.select(questionStatusLoaded);
  public questionStatusFailed$ = this.appState.select(questionListFailed);

  // answer add
  public getanswerAdd$ = this.appState.select(getanswerAdd);
  public answerAddLoading$ = this.appState.select(answerAddLoading);
  public answerAddLoaded$ = this.appState.select(answerAddLoaded);
  public answerAddFailed$ = this.appState.select(answerAddFailed);


  // answer delete
  public getanswerDelete$ = this.appState.select(getanswerDelete);
  public answerDeleteLoading$ = this.appState.select(answerDeleteLoading);
  public answerDeleteLoaded$ = this.appState.select(answerDeleteLoaded);
  public answerDeleteFailed$ = this.appState.select(answerDeleteFailed);

  // answer list
  public getanswerList$ = this.appState.select(getanswerList);
  public answerListLoading$ = this.appState.select(answerListLoading);
  public answerListLoaded$ = this.appState.select(answerListLoaded);
  public answerListFailed$ = this.appState.select(answerListFailed);


  // answer Status
  public answerStatus$ = this.appState.select(getanswerStatus);
  public answerStatusLoading$ = this.appState.select(answerStatusLoading);
  public answerStatusLoaded$ = this.appState.select(answerStatusLoaded);
  public answerStatusFailed$ = this.appState.select(answerStatusFailed);


  // make default
  public makeDefault$ = this.appState.select(makeDefault);
  public makeDefaultLoading$ = this.appState.select(makeDefaultLoading);
  public makeDefaultLoaded$ = this.appState.select(makeDefaultLoaded);
  public makeDefaultFailed$ = this.appState.select(makeDefaultFailed);



  public InventoryProductListLoading$ = this.appState.select(InventoryProductListLoading);
  public InventoryProductListLoaded$ = this.appState.select(InventoryProductListLoaded);
  public InventoryProductListFailed$ = this.appState.select(InventoryProductListFailed);
  public InventoryProductList$ = this.appState.select(InventoryProductList);

  public exportProductLoading$ = this.appState.select(exportProductLoading);
  public exportProductLoaded$ = this.appState.select(exportProductLoaded);
  public exportProductFailed$ = this.appState.select(exportProductFailed);
  public exportProduct$ = this.appState.select(exportProduct);

  public AllExportProductLoading$ = this.appState.select(AllExportProductLoading);
  public AllExportProductLoaded$ = this.appState.select(AllExportProductLoaded);
  public AllExportProductFailed$ = this.appState.select(AllExportProductFailed);
  public AllExportProduct$ = this.appState.select(AllExportProduct);

  public videoUploadLoading$ = this.appState.select(videoUploadLoading);
  public videoUploadLoaded$ = this.appState.select(videoUploadLoaded);
  public videoUploadFailed$ = this.appState.select(videoUploadFailed);
  public videoUpload$ = this.appState.select(videoUpload);

  // IMAGE Document //


 
  public imageUpload$ = this.appState.select(imageUpload);
  public imageUploadLoading$ = this.appState.select(imageUploadLoading);
  public imageUploadLoaded$ = this.appState.select(imageUploadLoaded);
  public imageUploadFailed$ = this.appState.select(imageUploadFailed);


  
 
  public CatalogEdit$ = this.appState.select(CatalogEdit);
  public CatalogEditLoading$ = this.appState.select(CatalogEditLoading);
  public CatalogEditLoaded$ = this.appState.select(CatalogEditLoaded);
  public CatalogEditFailed$ = this.appState.select(CatalogEditFailed);



  public inventoryProductListCount$ = this.appState.select(inventoryProductListCount);
  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
  ) { }

  public getProductDetail(value) {
    this.appState.dispatch(
      new productActions.GetProductDetailAction(new DetailModel(value))
    );
  }

  public doProductAdd(value) {
    this.appState.dispatch(
      new productActions.DoProductAddAction(value)
    );
  }

  public doProductUpdate(value) {
    this.appState.dispatch(
      new productActions.DoProductUpdateAction(value)
    );
  }
  public doProductDelete(value) {
    this.appState.dispatch(
      new productActions.DoProductDeleteAction(new ProductDeleteModel(value))
    );
  }
  public doProductBulkDelete(value) {
    this.appState.dispatch(
      new productActions.DoProductBulkDeleteAction(new ProductBulkDeleteModel(value))
    );
  }
  public getProductList(value) {
    this.appState.dispatch(
      new productActions.GetProductlistAction(value)
    );
  }
  public getStockStatusList(value) {
    this.appState.dispatch(
      new productActions.GetStockStatuslistAction(value)
    );
  }
  public getCategoryList(value) {
    this.appState.dispatch(
      new productActions.GetCategorieslistAction(value)
    );
  }
  public addCategory(value) {
    this.appState.dispatch(
      new productActions.AddCategory(value)
    );
  }
  public removeCategory(value) {
    this.appState.dispatch(
      new productActions.RemoveCategory(value)
    );
  }
  public searchCategory(value) {
    this.appState.dispatch(
      new productActions.SearchCategory(value)
    );
  }

  public getVariantList(value) {
    this.appState.dispatch(new productActions.VariantListAction(value));
  }


  public selectVariant(value) {
    this.appState.dispatch(new productActions.SelectVariant(value));
  }

  public deleteVariant(value) {
    this.appState.dispatch(new productActions.DeleteVariant(value));
  }

  public addImageForVaraint(value) {
    this.appState.dispatch(new productActions.AddImageForVariant(value));
  }

  public removeProbabiltyOption(value) {
    this.appState.dispatch(new productActions.RemoveProbabiltyOption(value));
  }

  public changeProbabilityOptionStatus(value) {
    this.appState.dispatch(new productActions.ChangeProbabiltyOptionStatus(value));
  }
  public removeOptionImage(value) {
    this.appState.dispatch(new productActions.RemoveOptionImage(value));
  }
  public variantClear() {
    this.appState.dispatch(new productActions.Variantclear());
  }


  public productStatus(params) {
    this.appState.dispatch(
      new productActions.DoProductStatus(new StatusRequest(params))
    );
  }

  public getProductListCount(params: any) {
    this.appState.dispatch(
      new productActions.GetTotalProductCountAction(
        params
      )
    );
  }

  public getActiveProductListCount(params) {
    this.appState.dispatch(
      new productActions.GetActiveProductCountAction(
        new ProductListModel(params)
      )
    );
  }

  public getInActiveProductListCount(params) {
    this.appState.dispatch(
      new productActions.GetInActiveProductCountAction(
        new ProductListModel(params)
      )
    );
  }


  // Do Product Excel
  public productExcel(value) {
    this.appState.dispatch(new productActions.DoProductExcel(value));
  }

  public productAllExcel(value) {
    this.appState.dispatch(new productActions.DoProductsExcel(value));
  }

  public changeCount(value) {
    this.appState.dispatch(new productActions.ChangeCount(value));
  }

  public getManufacturerList(value) {
    this.appState.dispatch(new productActions.ManufacturerListAction(value));
  }

  public changeQuotationStatus(value) {
    this.appState.dispatch(new productActions.ChangeQuotationStatusAction(value));
  }
  public getTaxList(value) {
    this.appState.dispatch(new productActions.TaxListAction(value));
  }
  public deleteProbabilityOption(value) {
    this.appState.dispatch(new productActions.DeleteProbabilityOption(value));
  }

  public getAttributeGroupList(value) {
    this.appState.dispatch(new productActions.GetAttributeGroupListAction(value));
  }

  //
  public doQuestionAdd(value) {
    this.appState.dispatch(
      new productActions.DoQuestionAddAction(value)
    );
  }

  public doQuestionList(value) {
    this.appState.dispatch(
      new productActions.DoQuestionListAction(value)
    );
  }

  public doQuestionDelete(value) {
    this.appState.dispatch(
      new productActions.DoQuestionDeleteAction(value)
    );
  }

  public doQuestionStatus(value) {
    this.appState.dispatch(
      new productActions.DoQuestionStatusAction(value)
    );
  }


  //
  public doAnswerAdd(value) {
    this.appState.dispatch(
      new productActions.DoAnswerAddAction(value)
    );
  }

  public doAnswerList(value) {
    this.appState.dispatch(
      new productActions.DoAnswerListAction(value)
    );
  }

  public doAnswerDelete(value) {
    this.appState.dispatch(
      new productActions.DoAnswerDeleteAction(value)
    );
  }

  public doAnswerStatus(value) {
    this.appState.dispatch(
      new productActions.DoAnswerStatusAction(value)
    );
  }

  public makeDefault(value) {
    this.appState.dispatch(
      new productActions.MakeDefaultAction(value)
    );
  }


  public InventoryProductList(value) {
    this.appState.dispatch(
      new productActions.InventoryProductListAction(value)
    );
  }



  public inventoryProductListCount(value) {
    this.appState.dispatch(
      new productActions.InventoryProductListCountAction(value));
  }

  public updateStock(value) {
    this.appState.dispatch(
      new productActions.UpdateStockAction(new UpdateStockModel(value)));
  }

  public exportProduct(value) {
    this.appState.dispatch(
      new productActions.ProductExportAction(value));
  }

  public allExportProduct(value) {
    this.appState.dispatch(
      new productActions.ProductAllExportAction(value));
  }

  public videoUpload(value) {
    this.appState.dispatch(
      new productActions.VideoUploadAction(value));
  }

  public imageUpload(value) {
    this.appState.dispatch(
      new productActions.ImageUploadAction(value));
  }

  public CatalogEdit(value) {
    this.appState.dispatch(
      new productActions.CatalogEdit(value));
  }
}
