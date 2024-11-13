

import { AppState } from '../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromProduct from './product.reducer';
// *************************** PUBLIC API's ****************************

export const getProdState = (state: AppState) => state.product;


// product add action
export const getProductAdd = createSelector(
  getProdState,
  fromProduct.getProductAdd
);
export const productAddLoading = createSelector(
  getProdState,
  fromProduct.getProductAddLoading
);
export const productAddLoaded = createSelector(
  getProdState,
  fromProduct.getProductAddLoaded
);
export const productAddFailed = createSelector(
  getProdState,
  fromProduct.getProductAddFailed
);
// product delete action
export const getProductDelete = createSelector(
  getProdState,
  fromProduct.getProductDelete
);
export const productDeleteLoading = createSelector(
  getProdState,
  fromProduct.getProductDeleteLoading
);
export const productDeleteLoaded = createSelector(
  getProdState,
  fromProduct.getProductDeleteLoaded
);
export const productDeleteFailed = createSelector(
  getProdState,
  fromProduct.getProductDeleteFailed
);
// product bulk delete action
export const getProductBulkDelete = createSelector(
  getProdState,
  fromProduct.getProductBulkDelete
);
export const productBulkDeleteLoading = createSelector(
  getProdState,
  fromProduct.getProductBulkDeleteLoading
);
export const productBulkDeleteLoaded = createSelector(
  getProdState,
  fromProduct.getProductBulkDeleteLoaded
);
export const productBulkDeleteFailed = createSelector(
  getProdState,
  fromProduct.getProductBulkDeleteFailed
);
// product Detail action
export const getProductDetail = createSelector(
  getProdState,
  fromProduct.getProductDetail
);
export const ProductDetailLoading = createSelector(
  getProdState,
  fromProduct.getProducDetailLoading
);
export const ProductDetailLoaded = createSelector(
  getProdState,
  fromProduct.getProductDetailLoaded
);
export const ProductDetailFailed = createSelector(
  getProdState,
  fromProduct.getProductDetailFailed
);
// product update action
export const getProductUpdate = createSelector(
  getProdState,
  fromProduct.getProductUpdate
);
export const getProductDetails = createSelector(
  getProdState,
  fromProduct.getProductDetail
);
export const productUpdateLoading = createSelector(
  getProdState,
  fromProduct.getProductUpdateLoading
);
export const productUpdateLoaded = createSelector(
  getProdState,
  fromProduct.getProductUpdateLoaded
);
export const productUpdateFailed = createSelector(
  getProdState,
  fromProduct.getProductUpdateFailed
);

// product status change
export const getProductStatus = createSelector(
  getProdState,
  fromProduct.getProductStatus
);
export const getProductStatusLoading = createSelector(
  getProdState,
  fromProduct.getProductStatusLoading
);
export const getProductStatusLoaded = createSelector(
  getProdState,
  fromProduct.getProductStatusLoaded
);
export const getProductStatusFailed = createSelector(
  getProdState,
  fromProduct.getProductStatusFailed
);

export const productListLoading = createSelector(
  getProdState,
  fromProduct.getProductListLoading
);
export const productListLoaded = createSelector(
  getProdState,
  fromProduct.getProductListLoaded
);
export const productListFailed = createSelector(
  getProdState,
  fromProduct.getProductListFailed
);
export const stockStatusList = createSelector(
  getProdState,
  fromProduct.getStockStatusList
);
export const stockStatusListLoading = createSelector(
  getProdState,
  fromProduct.getStockStatusListLoading
);
export const stockStatusListLoaded = createSelector(
  getProdState,
  fromProduct.getStockStatusListLoaded
);
export const stockStatusListFailed = createSelector(
  getProdState,
  fromProduct.getStockStatusListFailed
);

export const categoryList = createSelector(
  getProdState,
  fromProduct.categoryList
);
export const categoryListLoading = createSelector(
  getProdState,
  fromProduct.categoryListLoading
);

export const tempCategoryList = createSelector(
  getProdState,
  fromProduct.tempCategoryList
);
export const productList = createSelector(
  getProdState,
  fromProduct.productList
);
export const getTotalProductCount = createSelector(
  getProdState,
  fromProduct.getTotalProductCount
);
export const getTotalProductCountLoaded = createSelector(
  getProdState,
  fromProduct.getTotalProductCountLoaded
);
export const getTotalProductCountLoading = createSelector(
  getProdState,
  fromProduct.getTotalProductCountLoading
);
export const getTotalProductCountFailed = createSelector(
  getProdState,
  fromProduct.getTotalProductCountFailed
);

export const getActiveProductCount = createSelector(
  getProdState,
  fromProduct.getActiveProductCount
);
export const getActiveProductCountLoaded = createSelector(
  getProdState,
  fromProduct.getActiveProductCountLoaded
);
export const getActiveProductCountLoading = createSelector(
  getProdState,
  fromProduct.getActiveProductCountLoading
);
export const getActiveProductCountFailed = createSelector(
  getProdState,
  fromProduct.getActiveProductCountFailed
);

export const getInActiveProductCount = createSelector(
  getProdState,
  fromProduct.getInActiveProductCount
);
export const getInActiveProductCountLoaded = createSelector(
  getProdState,
  fromProduct.getInActiveProductCountLoaded
);
export const getInActiveProductCountLoading = createSelector(
  getProdState,
  fromProduct.getInActiveProductCountLoading
);
export const getInActiveProductCountFailed = createSelector(
  getProdState,
  fromProduct.getInActiveProductCountFailed
);


export const manufacturerList = createSelector(
  getProdState,
  fromProduct.manufacturerList
);
export const manufacturerListLoading = createSelector(
  getProdState,
  fromProduct.manufacturerListLoading
);
export const manufacturerListLoaded = createSelector(
  getProdState,
  fromProduct.manufacturerListLoaded
);


export const changeQuotationStatusLoading = createSelector(
  getProdState,
  fromProduct.changeQuotationStatusLoading
);
export const changeQuotationStatusLoaded = createSelector(
  getProdState,
  fromProduct.changeQuotationStatusLoaded
);

export const variantList = createSelector(
  getProdState,
  fromProduct.variantList
);
export const variantListLoading = createSelector(
  getProdState,
  fromProduct.variantListLoading
);
export const variantListLoaded = createSelector(
  getProdState,
  fromProduct.variantListListLoaded
);
export const selectedVariant = createSelector(
  getProdState,
  fromProduct.selectedVariant
);

export const probabiltyOptions = createSelector(
  getProdState,
  fromProduct.probabiltyOptions
);
export const skuArrayList = createSelector(
  getProdState,
  fromProduct.skuArrayList
);
export const selectedVariantId = createSelector(
  getProdState,
  fromProduct.selectedVariantId
);
export const taxList = createSelector(
  getProdState,
  fromProduct.taxList
);
export const taxListLoading = createSelector(
  getProdState,
  fromProduct.taxListLoading
);
export const taxListLoaded = createSelector(
  getProdState,
  fromProduct.taxListLoaded
);



// question add action
export const getquestionAdd = createSelector(
  getProdState,
  fromProduct.getQuestionAdd
);
export const questionAddLoading = createSelector(
  getProdState,
  fromProduct.getQuestionAddLoading
);
export const questionAddLoaded = createSelector(
  getProdState,
  fromProduct.getQuestionAddLoaded
);
export const questionAddFailed = createSelector(
  getProdState,
  fromProduct.getQuestionAddFailed
);

// question list action
export const getquestionList = createSelector(
  getProdState,
  fromProduct.getQuestionList
);
export const questionListLoading = createSelector(
  getProdState,
  fromProduct.getQuestionListLoading
);
export const questionListLoaded = createSelector(
  getProdState,
  fromProduct.getQuestionListLoaded
);
export const questionListFailed = createSelector(
  getProdState,
  fromProduct.getQuestionListFailed
);

// question Delete action
export const getquestionDelete = createSelector(
  getProdState,
  fromProduct.getQuestionDelete
);
export const questionDeleteLoading = createSelector(
  getProdState,
  fromProduct.getQuestionDelteLoading
);
export const questionDeleteLoaded = createSelector(
  getProdState,
  fromProduct.getQuestionDeleteLoaded
);
export const questionDeleteFailed = createSelector(
  getProdState,
  fromProduct.getQuestionDeleteFailed
);

// question Status action
export const getquestionStatus = createSelector(
  getProdState,
  fromProduct.getQuestionStatus
);
export const questionStatusLoading = createSelector(
  getProdState,
  fromProduct.getQuestionStatusLoading
);
export const questionStatusLoaded = createSelector(
  getProdState,
  fromProduct.getQuestionStatusLoaded
);
export const questionStatusFailed = createSelector(
  getProdState,
  fromProduct.getQuestionStatusFailed
);



// answer add action
export const getanswerAdd = createSelector(
  getProdState,
  fromProduct.getAnswerAdd
);
export const answerAddLoading = createSelector(
  getProdState,
  fromProduct.getAnswerAddLoading
);
export const answerAddLoaded = createSelector(
  getProdState,
  fromProduct.getAnswerAddLoaded
);
export const answerAddFailed = createSelector(
  getProdState,
  fromProduct.getAnswerAddFailed
);

// answer list action
export const getanswerList = createSelector(
  getProdState,
  fromProduct.getAnswerList
);
export const answerListLoading = createSelector(
  getProdState,
  fromProduct.getAnswerListLoading
);
export const answerListLoaded = createSelector(
  getProdState,
  fromProduct.getAnswerListLoaded
);
export const answerListFailed = createSelector(
  getProdState,
  fromProduct.getAnswerListFailed
);

// answer Delete action
export const getanswerDelete = createSelector(
  getProdState,
  fromProduct.getAnswerDelete
);
export const answerDeleteLoading = createSelector(
  getProdState,
  fromProduct.getAnswerDelteLoading
);
export const answerDeleteLoaded = createSelector(
  getProdState,
  fromProduct.getAnswerDeleteLoaded
);
export const answerDeleteFailed = createSelector(
  getProdState,
  fromProduct.getAnswerDeleteFailed
);

// answer Status action
export const getanswerStatus = createSelector(
  getProdState,
  fromProduct.getAnswerStatus
);
export const answerStatusLoading = createSelector(
  getProdState,
  fromProduct.getAnswerStatusLoading
);
export const answerStatusLoaded = createSelector(
  getProdState,
  fromProduct.getAnswerStatusLoaded
);
export const answerStatusFailed = createSelector(
  getProdState,
  fromProduct.getAnswerStatusFailed
);

// MAKE DEFAULT
export const makeDefault = createSelector(
  getProdState,
  fromProduct.makeDefault
);
export const makeDefaultLoading = createSelector(
  getProdState,
  fromProduct.makeDefaultLoading
);
export const makeDefaultLoaded = createSelector(
  getProdState,
  fromProduct.makeDefaultLoaded
);
export const makeDefaultFailed = createSelector(
  getProdState,
  fromProduct.makeDefaultFailed
);



export const InventoryProductList = createSelector(
  getProdState,
  fromProduct.InventoryProductList
);
export const InventoryProductListLoading = createSelector(
  getProdState,
  fromProduct.InventoryProductListLoading
);
export const InventoryProductListLoaded = createSelector(
  getProdState,
  fromProduct.InventoryProductListLoaded
);
export const InventoryProductListFailed = createSelector(
  getProdState,
  fromProduct.InventoryProductListFailed
);


// inventory product list count

export const inventoryProductListCount = createSelector(
  getProdState,
  fromProduct.inventoryProductListCount
);
export const inventoryProductListCountLoading = createSelector(
  getProdState,
  fromProduct.inventoryProductListCountLoading
);
export const inventoryProductListCountLoaded = createSelector(
  getProdState,
  fromProduct.inventoryProductListCountLoaded
);

export const getAttributeGroupList = createSelector(
  getProdState,
  fromProduct.attributeGroupList
);
export const getAttributeGroupListLoading = createSelector(
  getProdState,
  fromProduct.attributeGroupListLoading
);
export const getAttributeGroupListLoaded = createSelector(
  getProdState,
  fromProduct.attributeGroupListLoaded
);
export const getAttributeGroupListFailed = createSelector(
  getProdState,
  fromProduct.attributeGroupListFailed
);

export const exportProduct = createSelector(
  getProdState,
  fromProduct.exportProduct
);
export const exportProductLoading = createSelector(
  getProdState,
  fromProduct.exportProductLoading
);
export const exportProductLoaded = createSelector(
  getProdState,
  fromProduct.exportProductLoaded
);
export const exportProductFailed = createSelector(
  getProdState,
  fromProduct.exportProductFailed
);

export const AllExportProduct = createSelector(
  getProdState,
  fromProduct.AllExportProduct
);
export const AllExportProductLoading = createSelector(
  getProdState,
  fromProduct.AllExportProductLoading
);
export const AllExportProductLoaded = createSelector(
  getProdState,
  fromProduct.AllExportProductLoaded
);
export const AllExportProductFailed = createSelector(
  getProdState,
  fromProduct.AllExportProductFailed
);


export const videoUpload = createSelector(
  getProdState,
  fromProduct.videoUpload
);
export const videoUploadLoading = createSelector(
  getProdState,
  fromProduct.videoUploadLoading
);
export const videoUploadLoaded = createSelector(
  getProdState,
  fromProduct.videoUploadLoaded
);
export const videoUploadFailed = createSelector(
  getProdState,
  fromProduct.videoUploadFailed
);


//IMAGE UPLOAD 
export const imageUpload = createSelector(
  getProdState,
  fromProduct.imageUpload
);
export const imageUploadLoading = createSelector(
  getProdState,
  fromProduct.imageUploadLoading
);
export const imageUploadLoaded = createSelector(
  getProdState,
  fromProduct.imageUploadLoaded
);
export const imageUploadFailed = createSelector(
  getProdState,
  fromProduct.imageUploadFailed
);



// Catalog edit 
export const CatalogEdit = createSelector(
  getProdState,
  fromProduct.CatalogEdit
);
export const CatalogEditLoading = createSelector(
  getProdState,
  fromProduct.CatalogEditLoading
);
export const CatalogEditLoaded = createSelector(
  getProdState,
  fromProduct.CatalogEditLoaded
);
export const CatalogEditFailed = createSelector(
  getProdState,
  fromProduct.CatalogEditFailed
);

