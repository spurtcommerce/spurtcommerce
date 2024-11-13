/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { type } from '../../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';
import { CatlistForm } from '../vendor-product-models/catlist.model';
import { SellerListRequest } from '../../../../../../core/admin/vendor/pages/vendor-product/vendor-product-models/seller.request.model';
import { SearchOptionListModel } from '../../../../../../core/admin/vendor/pages/vendor-product/vendor-product-models/option-List.model';
import { ProductAddModel } from '../../../../../../core/admin/vendor/pages/vendor-product/vendor-product-models/Product-add.model';
import { ProductListModel } from '../../../../../../core/admin/vendor/pages/vendor-product/vendor-product-models/Product-list.model';
import { ProductDeleteModel } from '../../../../../../core/admin/vendor/pages/vendor-product/vendor-product-models/product-delete.model';
import { ApprovalRequest } from '../vendor-product-models/seller-approval.request.model';

import { ProductUpdateModel } from '../vendor-product-models/Product-update.model';
import { DetailModel } from '../vendor-product-models/detail.model';
import { StatusRequest } from '../vendor-product-models/product-status.request.model';
export const ActionTypes = {
  DO_CAT_LIST: type('[Cat List] Do Catlist'),
  DO_CAT_LIST_SUCCESS: type('[Cat List] Do Catlist Success'),
  DO_CAT_LIST_FAIL: type('[Cat List] Do Catlist Fail'),

  GET_SELLER_LIST: type('[vendor List] get seller list'),
  GET_SELLER_LIST_SUCCESS: type(
    '[vendor List Success] get seller list success'
  ),
  GET_SELLER_LIST_FAIL: type('[vendor List Fail] get seller list fail'),


  DO_PRODUCT_ADD: type('[vendor product add] Do Product Add'),
  DO_PRODUCT_ADD_SUCCESS: type('[vendor product add] Do Product Add Success'),
  DO_PRODUCT_ADD_FAIL: type('[vendor product add] Do Product Add Fail'),

  DO_PRODUCT_COMMISSION: type('[vendor commission add] Do Product commission'),
  DO_PRODUCT_COMMISSION_SUCCESS: type('[vendor commission add] Do Product commission Success'),
  DO_PRODUCT_COMMISSION_FAIL: type('[vendor commission add] Do Product commission Fail'),

  DO_CLEAR_PRODUCT_DETAILS: type('[PRODUCT DETAIL] DO CLEAR PRODUCT DETAIL'),

  DO_PRODUCT_REMOVE_LIST: type('[Remove List] Do ProductList Remove'),

  DO_PRODUCT_ADD_LIST: type('[Add List] Do ProductList Add'),


  DO_PRODUCT_REMOVE: type('[Remove Pro] Do Product Remove'),
  DO_PRODUCT_ADD_VENDOR: type('[Add Pro] Do Product Add'),

  GET_PRODUCT_LIST: type('[Product List] Do Product list'),
  GET_PRODUCT_LIST_SUCCESS: type('[Product List] Do Product list Success'),
  GET_PRODUCT_LIST_FAIL: type('[Product List] Do Product list Fail'),

  DO_PRODUCT_DELETE: type('[Product Delete] Do Product Delete'),
  DO_PRODUCT_DELETE_SUCCESS: type('[Product Delete] Do Product Delete Success'),
  DO_PRODUCT_DELETE_FAIL: type('[Product Delete] Do Product Delete Fail'),

  DO_SELLER_APPROVAL: type('[Product Approval] Seller Approval'),
  DO_SELLER_APPROVAL_SUCCESS: type(
    '[Product Approval] Seller Approval Success'
  ),
  DO_SELLER_APPROVAL_FAIL: type('[Product Approval] Seller Approval Fail'),

  DO_STATUS: type('[Product Status] Product Status'),
  DO_STATUS_SUCCESS: type('[Product Status] Product Status Success'),
  DO_STATUS_FAIL: type('[Product Status] Product Status Fail'),

  DO_PRODUCT_UPDATE: type('[Vendor Product Update] Do Product Update'),
  DO_PRODUCT_UPDATE_SUCCESS: type(
    '[Vendor Product Update] Do Product Update Success'
  ),
  DO_PRODUCT_UPDATE_FAIL: type(
    '[Vendor Product Update] Do Product Update Fail'
  ),

  GET_PRODUCT_DETAIL: type('[Vendor Product Detail] Do Product Detail'),
  GET_PRODUCT_DETAIL_SUCCESS: type(
    '[Vendor Product Detail] Do Product Detail Success'
  ),
  GET_PRODUCT_DETAIL_FAIL: type(
    '[Vendor Product Detail] Do Product Detail Fail'
  ),

  GET_TOTAL_PRODUCT_COUNT: type('[Product Count] Get Total Product Count'),
  GET_TOTAL_PRODUCT_COUNT_SUCCESS: type(
    '[Product Count] Get Total Product Count Success'
  ),
  GET_TOTAL_PRODUCT_COUNT_FAIL: type(
    '[Product Count] Get Total Product Count Fail'
  ),

  GET_ACTIVE_PRODUCT_COUNT: type(
    '[Product Count Active] Get Active Product Count'
  ),
  GET_ACTIVE_PRODUCT_COUNT_SUCCESS: type(
    '[Product Count Active] Get Active Product Count Success'
  ),
  GET_ACTIVE_PRODUCT_COUNT_FAIL: type(
    '[Product Count Active] Get Active Product Count Fail'
  ),

  GET_INACTIVE_PRODUCT_COUNT: type(
    '[Product Count InActive] Get In Active Product Count'
  ),
  GET_INACTIVE_PRODUCT_COUNT_SUCCESS: type(
    '[Product Count InActive] Get In Active Product Count Success'
  ),
  GET_INACTIVE_PRODUCT_COUNT_FAIL: type(
    '[Product Count InActive] Get In Active Product Count Fail'
  ),

  GET_PRODUCT_EXCEL: type('[PRODUCTS EXCEL] DO Product Excel'),
  GET_PRODUCT_EXCEL_SUCCESS: type(
    '[PRODUCTS EXCEL SUCCESS] Do Product Excel Success'
  ),
  GET_PRODUCT_EXCEL_FAIL: type('[PRODUCTS EXCEL DELETE] Do Product Excel Fail'),

  GET_PRODUCTS_EXCEL: type('[ALL PRODUCTS EXCEL] DO Product Excel'),
  GET_PRODUCTS_EXCEL_SUCCESS: type(
    '[ALL PRODUCTS EXCEL SUCCESS] Do Product Excel Success'
  ),
  GET_PRODUCTS_EXCEL_FAIL: type(
    '[ALL PRODUCTS EXCEL DELETE] Do Product Excel Fail'
  ),

// over all count

  GET_VENDOR_PRODUCT_COUNT: type('[vendor product count] get vendor product count'),
  GET_VENDOR_PRODUCT_COUNT_SUCCESS: type('[vendor product count] get vendor product count Success'),
  GET_VENDOR_PRODUCT_COUNT_FAIL: type('[vendor product count] get vendor product count Fail'),

  // vendor product count for each vendor

  VENDOR_PRODUCT_COUNT: type('[vendor product count] vendor product count'),
  VENDOR_PRODUCT_COUNT_SUCCESS: type('[vendor product count] vendor product count Success'),
  VENDOR_PRODUCT_COUNT_FAIL: type('[vendor product count] vendor product count Fail'),

  MANUFACTURER_LIST: type('[MANUFACTURER LIST] VENDOR MANUFACTURER LIST '),
  MANUFACTURER_LIST_SUCCESS: type('[MANUFACTURER LIST] VENDOR MANUFACTURER LIST SUCCESS'),
  MANUFACTURER_LIST_FAIL: type('[MANUFACTURER LIST] VENDOR MANUFACTURER LIST FAIL'),

  SELECT_CATEGORY: type('[CATEGORY] SSELCT CATEGORY'),
  REMOVE_CATEGORY: type('[CATEGORY] REMOVE CATEGORY'),

  PRODUCT_LIST_COUNT: type('[PRODUCT LIST_COUNT] VENDOR PRODUCT LIST_COUNT '),
  PRODUCT_LIST_COUNT_SUCCESS: type('[PRODUCT LIST_COUNT] VENDOR PRODUCT LIST_COUNT SUCCESS'),
  PRODUCT_LIST_COUNT_FAIL: type('[PRODUCT LIST_COUNT] VENDOR PRODUCT LIST_COUNT FAIL'),

  VIDEO_UPLOAD: type('[VIDEO_UPLOAD] VENDOR VIDEO_UPLOAD '),
  VIDEO_UPLOAD_SUCCESS: type('[VIDEO_UPLOAD] VENDOR VIDEO_UPLOAD SUCCESS'),
  VIDEO_UPLOAD_FAIL: type('[VIDEO_UPLOAD] VENDOR VIDEO_UPLOAD FAIL'),

};

export class DoCatlistAction implements Action {
  type = ActionTypes.DO_CAT_LIST;

  constructor(public payload: CatlistForm) {}
}

export class DoCatlistSuccessAction implements Action {
  type = ActionTypes.DO_CAT_LIST_SUCCESS;

  constructor(public payload: CatlistForm) {}
}

export class DoCatlistFailAction implements Action {
  type = ActionTypes.DO_CAT_LIST_FAIL;

  constructor(public payload: any = null) {}
}

export class GetSellerList implements Action {
  type = ActionTypes.GET_SELLER_LIST;

  constructor(public payload: SellerListRequest) {}
}

export class GetSellerListSuccess implements Action {
  type = ActionTypes.GET_SELLER_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetSellerListFail implements Action {
  type = ActionTypes.GET_SELLER_LIST_FAIL;

  constructor(public payload: any = null) {}
}


export class DoProductAddAction implements Action {
  type = ActionTypes.DO_PRODUCT_ADD;

  constructor(public payload: ProductAddModel) {}
}

export class DoProductAddSuccessAction implements Action {
  type = ActionTypes.DO_PRODUCT_ADD_SUCCESS;

  constructor(public payload: any) {}
}

export class DoProductAddFailAction implements Action {
  type = ActionTypes.DO_PRODUCT_ADD_FAIL;

  constructor(public payload: any = null) {}
}
export class DoProductCommissionAction implements Action {
  type = ActionTypes.DO_PRODUCT_COMMISSION;

  constructor(public payload: ProductAddModel) {}
}

export class DoProductCommissionSuccessAction implements Action {
  type = ActionTypes.DO_PRODUCT_COMMISSION_SUCCESS;

  constructor(public payload: any) {}
}

export class DoProductCommissionFailAction implements Action {
  type = ActionTypes.DO_PRODUCT_COMMISSION_FAIL;

  constructor(public payload: any = null) {}
}
export class DOClearProductDetails implements Action {
  type = ActionTypes.DO_CLEAR_PRODUCT_DETAILS;

  constructor() {}
}

// product remove List action
export class DoProductremovelistAction implements Action {
  type = ActionTypes.DO_PRODUCT_REMOVE_LIST;

  constructor(public payload: any) {}
}

export class DoProductaddlistAction implements Action {
  type = ActionTypes.DO_PRODUCT_ADD_LIST;

  constructor(public payload: any) {}
}


// product remove action
export class DoProductremoveAction implements Action {
  type = ActionTypes.DO_PRODUCT_REMOVE;

  constructor(public payload: any) {}
}

// product add action
export class DoProductaddAction implements Action {
  type = ActionTypes.DO_PRODUCT_ADD_VENDOR;

  constructor(public payload: any) {}
}

export class GetProductlistAction implements Action {
  type = ActionTypes.GET_PRODUCT_LIST;

  constructor(public payload: ProductListModel) {}
}

export class GetProductlistSuccessAction implements Action {
  type = ActionTypes.GET_PRODUCT_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetProductlistFailAction implements Action {
  type = ActionTypes.GET_PRODUCT_LIST_FAIL;

  constructor(public payload: any = null) {}
}

export class DoProductDeleteAction implements Action {
  type = ActionTypes.DO_PRODUCT_DELETE;

  constructor(public payload: ProductDeleteModel) {}
}

export class DoProductDeleteSuccessAction implements Action {
  type = ActionTypes.DO_PRODUCT_DELETE_SUCCESS;

  constructor(public payload: ProductDeleteModel) {}
}

export class DoProductDeleteFailAction implements Action {
  type = ActionTypes.DO_PRODUCT_DELETE_FAIL;

  constructor(public payload: any = null) {}
}

export class DoSellerApproval implements Action {
  type = ActionTypes.DO_SELLER_APPROVAL;
  constructor(public payload: ApprovalRequest) {}
}

export class DoSellerApprovalSuccess implements Action {
  type = ActionTypes.DO_SELLER_APPROVAL_SUCCESS;
  constructor(public payload: ApprovalRequest) {}
}

export class DoSellerApprovalFail implements Action {
  type = ActionTypes.DO_SELLER_APPROVAL_FAIL;
  constructor(public payload: any = null) {}
}

export class DoProductUpdateAction implements Action {
  type = ActionTypes.DO_PRODUCT_UPDATE;

  constructor(public payload: ProductUpdateModel) {}
}

export class DoProductUpdateSuccessAction implements Action {
  type = ActionTypes.DO_PRODUCT_UPDATE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoProductUpdateFailAction implements Action {
  type = ActionTypes.DO_PRODUCT_UPDATE_FAIL;

  constructor(public payload: any = null) {}
}

export class GetProductDetailAction implements Action {
  type = ActionTypes.GET_PRODUCT_DETAIL;

  constructor(public payload: DetailModel) {}
}

export class GetProductDetailSuccess implements Action {
  type = ActionTypes.GET_PRODUCT_DETAIL_SUCCESS;

  constructor(public payload: any) {}
}

export class GetProductDetailFail implements Action {
  type = ActionTypes.GET_PRODUCT_DETAIL_FAIL;

  constructor(public payload: any = null) {}
}

export class DoProductStatus implements Action {
  type = ActionTypes.DO_STATUS;
  constructor(public payload: StatusRequest) {}
}

export class DoProductStatusSuccess implements Action {
  type = ActionTypes.DO_STATUS_SUCCESS;
  constructor(public payload: StatusRequest) {}
}

export class DoProductStatusFail implements Action {
  type = ActionTypes.DO_STATUS_FAIL;
  constructor(public payload: any = null) {}
}

// get Product Excel
export class DoProductExcel implements Action {
  type = ActionTypes.GET_PRODUCT_EXCEL;

  constructor(public payload: any = null) {}
}

export class DoProductExcelSuccess implements Action {
  type = ActionTypes.GET_PRODUCT_EXCEL_SUCCESS;

  constructor(public payload: any) {}
}

export class DoProductExcelFail implements Action {
  type = ActionTypes.GET_PRODUCT_EXCEL_FAIL;

  constructor(public payload: any = null) {}
}

// get Product Excel
export class DoProductsExcel implements Action {
  type = ActionTypes.GET_PRODUCTS_EXCEL;

  constructor(public payload: any = null) {}
}

export class DoProductsExcelSuccess implements Action {
  type = ActionTypes.GET_PRODUCTS_EXCEL_SUCCESS;

  constructor(public payload: any) {}
}

export class DoProductsExcelFail implements Action {
  type = ActionTypes.GET_PRODUCTS_EXCEL_FAIL;

  constructor(public payload: any = null) {}
}


// get vendor prduct count

export class GetVendorProductCountAction implements Action {
  type = ActionTypes.GET_VENDOR_PRODUCT_COUNT;
  constructor(public payload: any = {}) {}
}

export class GetVendorProductCountSuccess implements Action {
  type = ActionTypes.GET_VENDOR_PRODUCT_COUNT_SUCCESS;
  constructor(public payload: CatlistForm) {}
}

export class GetVendorProductCountFail implements Action {
  type = ActionTypes.GET_VENDOR_PRODUCT_COUNT_FAIL;
  constructor(public payload: any = null) {}
}

// vendor prduct count for each vendor

export class VendorProductCountAction implements Action {
  type = ActionTypes.VENDOR_PRODUCT_COUNT;
  constructor(public payload: any) {}
}

export class VendorProductCountSuccess implements Action {
  type = ActionTypes.VENDOR_PRODUCT_COUNT_SUCCESS;
  constructor(public payload: CatlistForm) {}
}

export class VendorProductCountFail implements Action {
  type = ActionTypes.VENDOR_PRODUCT_COUNT_FAIL;
  constructor(public payload: any = null) {}
}


// vendor manufacturer list

export class ManufacturerListAction implements Action {
  type = ActionTypes.MANUFACTURER_LIST;
  constructor(public payload: any) {}
}

export class ManufacturerListSuccess implements Action {
  type = ActionTypes.MANUFACTURER_LIST_SUCCESS;
  constructor(public payload: CatlistForm) {}
}

export class ManufacturerListFail implements Action {
  type = ActionTypes.MANUFACTURER_LIST_FAIL;
  constructor(public payload: any = null) {}
}

// select category

export class SelectCategory implements Action {
  type = ActionTypes.SELECT_CATEGORY;
  constructor(public payload: any) {}
}

// remove category

export class RemoveCategory implements Action {
  type = ActionTypes.REMOVE_CATEGORY;
  constructor(public payload: any) {}
}

// Product List Count list

export class ProductListCountAction implements Action {
  type = ActionTypes.PRODUCT_LIST_COUNT;
  constructor(public payload: any) {}
}

export class ProductListCountSuccess implements Action {
  type = ActionTypes.PRODUCT_LIST_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class ProductListCountFail implements Action {
  type = ActionTypes.PRODUCT_LIST_COUNT_FAIL;
  constructor(public payload: any = null) {}
}

// Upload Video

export class uploadVideo implements Action {
  type = ActionTypes. VIDEO_UPLOAD;
  constructor(public payload: any) {}
}

export class uploadVideoSuccess implements Action {
  type = ActionTypes. VIDEO_UPLOAD_SUCCESS;
  constructor(public payload: any) {}
}

export class uploadVideoFail implements Action {
  type = ActionTypes. VIDEO_UPLOAD_FAIL;
  constructor(public payload: any = null) {}
}

export type Actions =
  | DoCatlistAction
  | DoCatlistSuccessAction
  | DoCatlistFailAction
  | GetSellerList
  | GetSellerListSuccess
  | GetSellerListFail
  | DoProductAddAction
  | DoProductAddSuccessAction
  | DoProductAddFailAction
  | DoProductCommissionAction
  | DoProductCommissionSuccessAction
  | DoProductCommissionFailAction
  | DOClearProductDetails
  | DoProductremovelistAction
  | DoProductaddlistAction
  | DoProductremoveAction
  | DoProductaddAction
  | GetProductlistAction
  | GetProductlistSuccessAction
  | GetProductlistFailAction
  | DoProductDeleteAction
  | DoProductDeleteSuccessAction
  | DoProductDeleteFailAction
  | DoSellerApproval
  | DoSellerApprovalSuccess
  | DoSellerApprovalFail
  | DoProductUpdateAction
  | DoProductUpdateSuccessAction
  | DoProductUpdateFailAction
  | GetProductDetailAction
  | GetProductDetailSuccess
  | GetProductDetailFail
  | DoProductStatus
  | DoProductStatusSuccess
  | DoProductStatusFail
  | DoProductExcel
  | DoProductExcelSuccess
  | DoProductExcelFail
  | DoProductsExcel
  | DoProductsExcelSuccess
  | DoProductsExcelFail
  | GetVendorProductCountAction
  | GetVendorProductCountSuccess
  | GetVendorProductCountFail
  | ManufacturerListAction
  | ManufacturerListSuccess
  | ManufacturerListFail;
