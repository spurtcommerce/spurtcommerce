import { Action } from '@ngrx/store';
import { type } from '../../shared/utility/utilityHelpers';
import { ProductAddModel } from '../product-model/Product-add.model';
import { ProductListModel } from '../product-model/Product-list.model';
import { ProductDeleteModel } from '../product-model/product-delete.model';
import { DetailModel } from '../product-model/detail.model';
import { ProductUpdateModel } from '../product-model/Product-update.model';
import { StatusRequest } from '../product-model/product-status.request.model';


export const ActionTypes = {
  DO_PRODUCT_ADD: type('[Add] Do Product Add'),
  DO_PRODUCT_ADD_SUCCESS: type('[Add] Do Product Add Success'),
  DO_PRODUCT_ADD_FAIL: type('[Add] Do Product Add Fail'),

  DO_PRODUCT_DELETE: type('[Add] Do Product Delete'),
  DO_PRODUCT_DELETE_SUCCESS: type('[Add] Do Product Delete Success'),
  DO_PRODUCT_DELETE_FAIL: type('[Add] Do Product Delete Fail'),

  DO_BULK_PRODUCT_DELETE: type('[Add] Do Product bulk Delete'),
  DO_BULK_PRODUCT_DELETE_SUCCESS: type('[Add] Do Product bulk Delete Success'),
  DO_BULK_PRODUCT_DELETE_FAIL: type('[Add] Do Product bulk Delete Fail'),

  DO_PRODUCT_UPDATE: type('[Update] Do Product Update'),
  DO_PRODUCT_UPDATE_SUCCESS: type('[Update] Do Product Update Success'),
  DO_PRODUCT_UPDATE_FAIL: type('[Update] Do Product Update Fail'),

  GET_PRODUCT_DETAIL: type('[Detail] Do Product Detail'),
  GET_PRODUCT_DETAIL_SUCCESS: type('[Detail] Do Product Detail Success'),
  GET_PRODUCT_DETAIL_FAIL: type('[Detail] Do Product Detail Fail'),

  GET_PRODUCT_LIST: type('[List] Do Product list'),
  GET_PRODUCT_LIST_SUCCESS: type('[List] Do Product list Success'),
  GET_PRODUCT_LIST_FAIL: type('[List] Do Product list Fail'),

  GET_STOCK_STATUS_LIST: type('[List] Do Stock status list'),
  GET_STOCK_STATUS_LIST_SUCCESS: type('[List] Do Stock status list Success'),
  GET_STOCK_STATUS_LIST_FAIL: type('[List] Do Stock status list Fail'),

  GET_CATEGORIES_LIST: type('[List] Do Categorieslist'),
  GET_CATEGORIES_LIST_SUCCESS: type('[List] Do Categorieslist Success'),
  GET_CATEGORIES_LIST_FAIL: type('[List] Do Categorieslist Fail'),

  ADD_CATEGORY: type('[List] add Categorieslist '),
  REMOVE_CATEGORY: type('[List] remove Categorieslist '),
  SEARCH_CATEGORY: type('[List] search Categorieslist '),


  DO_STATUS: type('[Product Status] Product Status'),
  DO_STATUS_SUCCESS: type('[Product Status] Product Status Success'),
  DO_STATUS_FAIL: type('[Product Status] Product Status Fail'),

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

  CHANGE_COUNT: type('[change count] Change count success'),

  MANUFACTURER_LIST: type('[List] Manufacturer list'),
  MANUFACTURER_LIST_SUCCESS: type('[List] Manufacturer list Success'),
  MANUFACTURER_LIST_FAIL: type('[List] Manufacturer list Fail'),

  CHANGE_QUOTATION_STATUS: type('[List] Change Quotation Status'),
  CHANGE_QUOTATION_STATUS_SUCCESS: type('[List] Change Quotation Status Success'),
  CHANGE_QUOTATION_STATUS_FAIL: type('[List] Change Quotation Status Fail'),

  VARIANT_LIST: type('[VARIANT LIST] DO VARIANT LIST'),
  VARIANT_LIST_SUCCESS: type('[VARIANT LIST] DO VARIANT LIST SUCCESS'),
  VARIANT_LIST_FAIL: type('[VARIANT LIST] DO VARIANT LIST FAIL'),


  SELECT_VARIANT: type('[VARIANT] SELECT VARIANT'),
  DESELECT_VARIANT: type('[VARIANT] DESELECT VARIANT'),
  ADD_IMAGE_FOR_VARIANT: type('[VARIANT] ADD IMAGE FOR VARIANT'),

  REMOVE_PROBABILITY_OPTION: type('[VARIANT] REMOVE PROBABIITY OPTION'),

  CHANGE_PROBABILITY_OPTION_STATUS: type('[VARIANT] CHANGE PROBABIITY OPTION STATUS'),

  REMOVE_OPTION_IMAGE: type('[VARIANT] REMOVE OPTION IMAGE'),

  CLEAR_VARIANT: type('[VARIANT] Clear Variant'),

  TAX_LIST: type('[List] Tax list'),
  TAX_LIST_SUCCESS: type('[List] Tax list Success'),
  TAX_LIST_FAIL: type('[List] Tax list Fail'),

  DELETE_PROBABILITY_OPTION: type('[VARIANT] DELETE PROBABIITY OPTION'),
  DELETE_PROBABILITY_OPTION_SUCCESS: type('[VARIANT] DELETE PROBABIITY OPTION Success'),
  DELETE_PROBABILITY_OPTION_FAIL: type('[VARIANT] DELETE PROBABIITY OPTION FAIL'),

  // QUESTION ADD

  DO_QUESTION_ADD: type('[Add] Do Question Add'),
  DO_QUESTION_ADD_SUCCESS: type('[Add] Do Question Add Success'),
  DO_QUESTION_ADD_FAIL: type('[Add] Do Question Add Fail'),

  // QUESTION LIST

  DO_QUESTION_LIST: type('[Add] Do Question List'),
  DO_QUESTION_LIST_SUCCESS: type('[Add] Do Question List Success'),
  DO_QUESTION_LIST_FAIL: type('[Add] Do Question List Fail'),

  // QUESTION DELETE

  DO_QUESTION_DELETE: type('[Add] Do Question Delete'),
  DO_QUESTION_DELETE_SUCCESS: type('[Add] Do Question Delete Success'),
  DO_QUESTION_DELETE_FAIL: type('[Add] Do Question Delete Fail'),


  // QUESTION STATUS

  DO_QUESTION_STATUS: type('[Add] Do Question Status'),
  DO_QUESTION_STATUS_SUCCESS: type('[Add] Do Question Status Success'),
  DO_QUESTION_STATUS_FAIL: type('[Add] Do Question Status Fail'),


  // ANSWER ADD

  DO_ANSWER_ADD: type('[Add] Do Answer Add'),
  DO_ANSWER_ADD_SUCCESS: type('[Add] Do Answer Add Success'),
  DO_ANSWER_ADD_FAIL: type('[Add] Do Answer Add Fail'),

  // ANSWER LIST

  DO_ANSWER_LIST: type('[Add] Do Answer List'),
  DO_ANSWER_LIST_SUCCESS: type('[Add] Do Answer List Success'),
  DO_ANSWER_LIST_FAIL: type('[Add] Do Answer List Fail'),

  // ANSWER DELETE

  DO_ANSWER_DELETE: type('[Add] Do Answer Delete'),
  DO_ANSWER_DELETE_SUCCESS: type('[Add] Do Answer Delete Success'),
  DO_ANSWER_DELETE_FAIL: type('[Add] Do Answer Delete Fail'),


  // ANSWER STATUS

  DO_ANSWER_STATUS: type('[Add] Do  Answer Status'),
  DO_ANSWER_STATUS_SUCCESS: type('[Add] Do Answer Status Success'),
  DO_ANSWER_STATUS_FAIL: type('[Add] Do Answer Status Fail'),

  // MAKE DEFAULT
  MAKE_DEFAULT: type('[Add] Make Default'),
  MAKE_DEFAULT_SUCCESS: type('[Add] Make Default Success'),
  MAKE_DEFAULT_FAIL: type('[Add] Make Default Fail'),

  INVENTORY_PRODUCT_LIST: type('[List] Inventory Product list'),
  INVENTORY_PRODUCT_LIST_SUCCESS: type('[List] Inventory Product list Success'),
  INVENTORY_PRODUCT_LIST_FAIL: type('[List] Inventory Product list Fail'),

  INVENTORY_PRODUCT_LIST_COUNT: type('[Inventory] Inventory Product List Count'),
  INVENTORY_PRODUCT_LIST_COUNT_SUCCESS: type('[Inventory] Inventory Product List Count Success'),
  INVENTORY_PRODUCT_LIST_COUNT_FAIL: type('[Inventory] Inventory Product List Count Fail'),


  UPDATE_STOCK: type('[Inventory] Update Stock'),
  UPDATE_STOCK_SUCCESS: type('[Inventory] Update Stock Success'),
  UPDATE_STOCK_FAIL: type('[Inventory] Update Stock Fail'),

  GET_ATTRIBUTE_GROUP_LIST: type('[Add] Get Attribute Group List'),
  GET_ATTRIBUTE_GROUP_LIST_SUCCESS: type('[Add] Get Attribute Group List Success'),
  GET_ATTRIBUTE_GROUP_LIST_FAIL: type('[Add] Get Attribute Group List Fail'),

  EXPORT_PRODUCT: type('[Export] Export Product '),
  EXPORT_PRODUCT_SUCCESS: type('[Export] Export Product  Success'),
  EXPORT_PRODUCT_FAIL: type('[Export] Export Product  Fail'),

  ALL_EXPORT_PRODUCT: type('[Export] All Export Product '),
  ALL_EXPORT_PRODUCT_SUCCESS: type('[Export] All Export Product  Success'),
  ALL_EXPORT_PRODUCT_FAIL: type('[Export] All Export Product  Fail'),

  VIDEO_UPLOAD: type('[Video] Video Upload  '),
  VIDEO_UPLOAD_SUCCESS: type('[Video] Video Upload   Success'),
  VIDEO_UPLOAD_FAIL: type('[Video] Video Upload   Fail'),


  //Image upload //

  IMAGE_UPLOAD: type('[image] image Upload  '),
  IMAGE_UPLOAD_SUCCESS: type('[image] image Upload   Success'),
  IMAGE_UPLOAD_FAIL: type('[image] image Upload   Fail'),


  
  //catalog edit//

  CATALOG_EDIT: type('[CATALOG_EDIT] CATALOG_EDIT Upload  '),
  CATALOG_EDIT_SUCCESS: type('[CATALOG_EDIT] CATALOG_EDIT Upload   Success'),
  CATALOG_EDIT_FAIL: type('[CATALOG_EDIT] CATALOG_EDIT Upload   Fail'),


};

// product add action
export class DoProductAddAction implements Action {
  type = ActionTypes.DO_PRODUCT_ADD;

  constructor(public payload: ProductAddModel) { }
}

export class DoProductAddSuccessAction implements Action {
  type = ActionTypes.DO_PRODUCT_ADD_SUCCESS;

  constructor(public payload: any) { }
}

export class DoProductAddFailAction implements Action {
  type = ActionTypes.DO_PRODUCT_DELETE_FAIL;

  constructor(public payload: any = null) { }
}
// Product Update action
export class DoProductUpdateAction implements Action {
  type = ActionTypes.DO_PRODUCT_UPDATE;

  constructor(public payload: ProductUpdateModel) { }
}

export class DoProductUpdateSuccessAction implements Action {
  type = ActionTypes.DO_PRODUCT_UPDATE_SUCCESS;

  constructor(public payload: any) { }
}

export class DoProductUpdateFailAction implements Action {
  type = ActionTypes.DO_PRODUCT_UPDATE_FAIL;

  constructor(public payload: any = null) { }
}

// product detail action
export class GetProductDetailAction implements Action {
  type = ActionTypes.GET_PRODUCT_DETAIL;

  constructor(public payload: DetailModel) { }
}

export class GetProductDetailSuccess implements Action {
  type = ActionTypes.GET_PRODUCT_DETAIL_SUCCESS;

  constructor(public payload: any) { }
}

export class GetProductDetailFail implements Action {
  type = ActionTypes.GET_PRODUCT_DETAIL_FAIL;

  constructor(public payload: any = null) { }
}
// product status change
export class DoProductStatus implements Action {
  type = ActionTypes.DO_STATUS;
  constructor(public payload: StatusRequest) { }
}

export class DoProductStatusSuccess implements Action {
  type = ActionTypes.DO_STATUS_SUCCESS;
  constructor(public payload: StatusRequest) { }
}

export class DoProductStatusFail implements Action {
  type = ActionTypes.DO_STATUS_FAIL;
  constructor(public payload: any = null) { }
}
// product delete action
export class DoProductDeleteAction implements Action {
  type = ActionTypes.DO_PRODUCT_DELETE;

  constructor(public payload: ProductDeleteModel) { }
}

export class DoProductDeleteSuccessAction implements Action {
  type = ActionTypes.DO_PRODUCT_DELETE_SUCCESS;

  constructor(public payload: any) { }
}

export class DoProductDeleteFailAction implements Action {
  type = ActionTypes.DO_PRODUCT_DELETE_FAIL;

  constructor(public payload: any = null) { }
}
// product bulk delete action
export class DoProductBulkDeleteAction implements Action {
  type = ActionTypes.DO_BULK_PRODUCT_DELETE;

  constructor(public payload: ProductDeleteModel) { }
}

export class DoProductBulkDeleteSuccessAction implements Action {
  type = ActionTypes.DO_BULK_PRODUCT_DELETE_SUCCESS;

  constructor(public payload: any) { }
}

export class DoProductBulkDeleteFailAction implements Action {
  type = ActionTypes.DO_BULK_PRODUCT_DELETE_FAIL;

  constructor(public payload: any = null) { }
}

// product list action
export class GetProductlistAction implements Action {
  type = ActionTypes.GET_PRODUCT_LIST;

  constructor(public payload: ProductListModel) { }
}

export class GetProductlistSuccessAction implements Action {
  type = ActionTypes.GET_PRODUCT_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class GetProductlistFailAction implements Action {
  type = ActionTypes.GET_PRODUCT_LIST_FAIL;

  constructor(public payload: any = null) { }
}
// product list action
export class GetStockStatuslistAction implements Action {
  type = ActionTypes.GET_STOCK_STATUS_LIST;

  constructor(public payload: ProductListModel) { }
}

export class GetStockStatuslistSuccessAction implements Action {
  type = ActionTypes.GET_STOCK_STATUS_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class GetStockStatuslistFailAction implements Action {
  type = ActionTypes.GET_STOCK_STATUS_LIST_FAIL;

  constructor(public payload: any = null) { }
}
// category list action
export class GetCategorieslistAction implements Action {
  type = ActionTypes.GET_CATEGORIES_LIST;

  constructor(public payload: any) { }
}

export class GetCategorieslistSuccessAction implements Action {
  type = ActionTypes.GET_CATEGORIES_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetCategorieslistFailAction implements Action {
  type = ActionTypes.GET_CATEGORIES_LIST_FAIL;

  constructor(public payload: any = null) { }
}
export class RemoveCategory implements Action {
  type = ActionTypes.REMOVE_CATEGORY;

  constructor(public payload: any) { }
}

export class AddCategory implements Action {
  type = ActionTypes.ADD_CATEGORY;

  constructor(public payload: any = null) { 
  }
}

export class SearchCategory implements Action {
  type = ActionTypes.SEARCH_CATEGORY;

  constructor(public payload: any) { }
}
export class GetTotalProductCountAction implements Action {
  type = ActionTypes.GET_TOTAL_PRODUCT_COUNT;

  constructor(public payload: any) { }
}

export class GetTotalProductCountSuccessAction implements Action {
  type = ActionTypes.GET_TOTAL_PRODUCT_COUNT_SUCCESS;

  constructor(public payload: any) { }
}

export class GetTotalProductCountFailAction implements Action {
  type = ActionTypes.GET_TOTAL_PRODUCT_COUNT_FAIL;

  constructor(public payload: any = null) { }
}

export class GetActiveProductCountAction implements Action {
  type = ActionTypes.GET_ACTIVE_PRODUCT_COUNT;

  constructor(public payload: any) { }
}

export class GetActiveProductCountSuccessAction implements Action {
  type = ActionTypes.GET_ACTIVE_PRODUCT_COUNT_SUCCESS;

  constructor(public payload: any) { }
}

export class GetActiveProductCountFailAction implements Action {
  type = ActionTypes.GET_ACTIVE_PRODUCT_COUNT_FAIL;

  constructor(public payload: any = null) { }
}

export class GetInActiveProductCountAction implements Action {
  type = ActionTypes.GET_INACTIVE_PRODUCT_COUNT;

  constructor(public payload: any) { }
}

export class GetInActiveProductCountSuccessAction implements Action {
  type = ActionTypes.GET_INACTIVE_PRODUCT_COUNT_SUCCESS;

  constructor(public payload: any) { }
}

export class GetInActiveProductCountFailAction implements Action {
  type = ActionTypes.GET_INACTIVE_PRODUCT_COUNT_FAIL;

  constructor(public payload: any = null) { }
}

// get Product Excel
export class DoProductExcel implements Action {
  type = ActionTypes.GET_PRODUCT_EXCEL;

  constructor(public payload: any = null) { }
}

export class DoProductExcelSuccess implements Action {
  type = ActionTypes.GET_PRODUCT_EXCEL_SUCCESS;

  constructor(public payload: any) { }
}

export class DoProductExcelFail implements Action {
  type = ActionTypes.GET_PRODUCT_EXCEL_FAIL;

  constructor(public payload: any = null) { }
}

// get Product Excel
export class DoProductsExcel implements Action {
  type = ActionTypes.GET_PRODUCTS_EXCEL;

  constructor(public payload: any = null) { }
}

export class DoProductsExcelSuccess implements Action {
  type = ActionTypes.GET_PRODUCTS_EXCEL_SUCCESS;

  constructor(public payload: any) { }
}

export class DoProductsExcelFail implements Action {
  type = ActionTypes.GET_PRODUCTS_EXCEL_FAIL;

  constructor(public payload: any = null) { }
}



export class ChangeCount implements Action {
  type = ActionTypes.CHANGE_COUNT;

  constructor(public payload: any) { }
}


// manufacturer list

export class ManufacturerListAction implements Action {
  type = ActionTypes.MANUFACTURER_LIST;
  constructor(public payload: any) { }
}

export class ManufacturerListSuccessList implements Action {
  type = ActionTypes.MANUFACTURER_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class ManufacturerListFailList implements Action {
  type = ActionTypes.MANUFACTURER_LIST_FAIL;
  constructor(public payload: any = null) { }
}

// change quotation status

export class ChangeQuotationStatusAction implements Action {
  type = ActionTypes.CHANGE_QUOTATION_STATUS;
  constructor(public payload: any) { }
}

export class ChangeQuotationStatusSuccess implements Action {
  type = ActionTypes.CHANGE_QUOTATION_STATUS_SUCCESS;
  constructor(public payload: any) { }
}

export class ChangeQuotationStatusFail implements Action {
  type = ActionTypes.CHANGE_QUOTATION_STATUS_FAIL;
  constructor(public payload: any = null) { }
}


// variant list
export class VariantListAction implements Action {
  type = ActionTypes.VARIANT_LIST;

  constructor(public payload: any) { }
}

export class VariantListSuccess implements Action {
  type = ActionTypes.VARIANT_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class VariantListFail implements Action {
  type = ActionTypes.VARIANT_LIST_FAIL;

  constructor(public payload: any = null) { }
}

export class SelectVariant implements Action {
  type = ActionTypes.SELECT_VARIANT;
  constructor(public payload: any) { }
}

export class DeleteVariant implements Action {
  type = ActionTypes.DESELECT_VARIANT;
  constructor(public payload: any) { }
}

export class AddImageForVariant implements Action {
  type = ActionTypes.ADD_IMAGE_FOR_VARIANT;
  constructor(public payload: any) { }
}

export class RemoveProbabiltyOption implements Action {
  type = ActionTypes.REMOVE_PROBABILITY_OPTION;
  constructor(public payload: any) { }
}

export class ChangeProbabiltyOptionStatus implements Action {
  type = ActionTypes.CHANGE_PROBABILITY_OPTION_STATUS;
  constructor(public payload: any) { }
}

export class RemoveOptionImage implements Action {
  type = ActionTypes.REMOVE_OPTION_IMAGE;
  constructor(public payload: any) { }
}

export class Variantclear implements Action {
  type = ActionTypes.CLEAR_VARIANT;
  constructor(public payload: any = null) { }
}

// tax list

export class TaxListAction implements Action {
  type = ActionTypes.TAX_LIST;
  constructor(public payload: any) { }
}

export class TaxListSuccessList implements Action {
  type = ActionTypes.TAX_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class TaxListFailList implements Action {
  type = ActionTypes.TAX_LIST_FAIL;
  constructor(public payload: any = null) { }
}


// delete probability option

export class DeleteProbabilityOption implements Action {
  type = ActionTypes.DELETE_PROBABILITY_OPTION;
  constructor(public payload: any) { }
}
export class DeleteProbabilityOptionSuccess implements Action {
  type = ActionTypes.DELETE_PROBABILITY_OPTION_SUCCESS;
  constructor(public payload: any) { }
}
export class DeleteProbabilityOptionFail implements Action {
  type = ActionTypes.DELETE_PROBABILITY_OPTION_FAIL;
  constructor(public payload: any) { }
}



// ANSWER add action
export class DoAnswerAddAction implements Action {
  type = ActionTypes.DO_ANSWER_ADD;

  constructor(public payload: any) { }
}

export class DoAnswerAddSuccessAction implements Action {
  type = ActionTypes.DO_ANSWER_ADD_SUCCESS;

  constructor(public payload: any) { }
}

export class DoAnswerAddFailAction implements Action {
  type = ActionTypes.DO_ANSWER_ADD_FAIL;

  constructor(public payload: any = null) { }
}

// ANSWER List action
export class DoAnswerListAction implements Action {
  type = ActionTypes.DO_ANSWER_LIST;

  constructor(public payload: any) { }
}

export class DoAnswerListSuccessAction implements Action {
  type = ActionTypes.DO_ANSWER_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class DoAnswerListFailAction implements Action {
  type = ActionTypes.DO_ANSWER_LIST_FAIL;

  constructor(public payload: any = null) { }
}

// ANSWER Delete action
export class DoAnswerDeleteAction implements Action {
  type = ActionTypes.DO_ANSWER_DELETE;

  constructor(public payload: any) { }
}

export class DoAnswerDeleteSuccessAction implements Action {
  type = ActionTypes.DO_ANSWER_DELETE_SUCCESS;

  constructor(public payload: any) { }
}

export class DoAnswerDeleteFailAction implements Action {
  type = ActionTypes.DO_ANSWER_DELETE_FAIL;

  constructor(public payload: any = null) { }
}

// ANSWER Status action
export class DoAnswerStatusAction implements Action {
  type = ActionTypes.DO_ANSWER_STATUS;

  constructor(public payload: any) { }
}

export class DoAnswerStatusSuccessAction implements Action {
  type = ActionTypes.DO_ANSWER_STATUS_SUCCESS;

  constructor(public payload: any) { }
}

export class DoAnswerStatusFailAction implements Action {
  type = ActionTypes.DO_ANSWER_STATUS_FAIL;

  constructor(public payload: any) { }
}

// MAKE DEFAULT action
export class MakeDefaultAction implements Action {
  type = ActionTypes.MAKE_DEFAULT;

  constructor(public payload: any) { }
}

export class MakeDefaultSuccessAction implements Action {
  type = ActionTypes.MAKE_DEFAULT_SUCCESS;

  constructor(public payload: any) { }
}

export class MakedefaultFailAction implements Action {
  type = ActionTypes.MAKE_DEFAULT_FAIL;

  constructor(public payload: any) { }
}


// QUESTION add action
export class DoQuestionAddAction implements Action {
  type = ActionTypes.DO_QUESTION_ADD;

  constructor(public payload: any) { }
}

export class DoQuestionAddSuccessAction implements Action {
  type = ActionTypes.DO_QUESTION_ADD_SUCCESS;

  constructor(public payload: any) { }
}

export class DoQuestionAddFailAction implements Action {
  type = ActionTypes.DO_QUESTION_ADD_FAIL;

  constructor(public payload: any = null) { }
}

// QUESTION List action
export class DoQuestionListAction implements Action {
  type = ActionTypes.DO_QUESTION_LIST;

  constructor(public payload: any) { }
}

export class DoQuestionListSuccessAction implements Action {
  type = ActionTypes.DO_QUESTION_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class DoQuestionListFailAction implements Action {
  type = ActionTypes.DO_QUESTION_LIST_FAIL;

  constructor(public payload: any = null) { }
}

// QUESTION Delete action
export class DoQuestionDeleteAction implements Action {
  type = ActionTypes.DO_QUESTION_DELETE;

  constructor(public payload: any) { }
}

export class DoQuestionDeleteSuccessAction implements Action {
  type = ActionTypes.DO_QUESTION_DELETE_SUCCESS;

  constructor(public payload: any) { }
}

export class DoQuestionDeleteFailAction implements Action {
  type = ActionTypes.DO_QUESTION_DELETE_FAIL;

  constructor(public payload: any = null) { }
}

// QUESTION Status action
export class DoQuestionStatusAction implements Action {
  type = ActionTypes.DO_QUESTION_STATUS;

  constructor(public payload: any) { }
}

export class DoQuestionStatusSuccessAction implements Action {
  type = ActionTypes.DO_QUESTION_STATUS_SUCCESS;

  constructor(public payload: any) { }
}

export class DoQuestionStatusFailAction implements Action {
  type = ActionTypes.DO_QUESTION_STATUS_FAIL;

  constructor(public payload: any = null) { }
}

// attribute list action
export class GetAttributeGroupListAction implements Action {
  type = ActionTypes.GET_ATTRIBUTE_GROUP_LIST;

  constructor(public payload: any) { }
}

export class GetAttributeGroupListSuccessAction implements Action {
  type = ActionTypes.GET_ATTRIBUTE_GROUP_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class GetAttributeGroupListFailAction implements Action {
  type = ActionTypes.GET_ATTRIBUTE_GROUP_LIST_FAIL;

  constructor(public payload: any = null) { }
}



// Inventory list action
export class InventoryProductListAction implements Action {
  type = ActionTypes.INVENTORY_PRODUCT_LIST;

  constructor(public payload: ProductListModel) { }
}

export class InventoryProductListSuccessAction implements Action {
  type = ActionTypes.INVENTORY_PRODUCT_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class InventoryProductListFailAction implements Action {
  type = ActionTypes.INVENTORY_PRODUCT_LIST_FAIL;

  constructor(public payload: any = null) { }
}

// inventory product list count

export class InventoryProductListCountAction implements Action {
  type = ActionTypes.INVENTORY_PRODUCT_LIST_COUNT;
  constructor(public payload: any) { }
}

export class InventoryProductListCountSuccess implements Action {
  type = ActionTypes.INVENTORY_PRODUCT_LIST_COUNT_SUCCESS;
  constructor(public payload: any) { }
}

export class InventoryProductListCountFail implements Action {
  type = ActionTypes.INVENTORY_PRODUCT_LIST_COUNT_FAIL;
  constructor(public payload: any = null) { }
}


//  stock

export class UpdateStockAction implements Action {
  type = ActionTypes.UPDATE_STOCK;
  constructor(public payload: any) { }
}

export class UpdateStockSuccess implements Action {
  type = ActionTypes.UPDATE_STOCK_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateStockFail implements Action {
  type = ActionTypes.UPDATE_STOCK_FAIL;
  constructor(public payload: any = null) { }
}

// product Export action
export class ProductExportAction implements Action {
  type = ActionTypes.EXPORT_PRODUCT;

  constructor(public payload: ProductAddModel) { }
}

export class ProductExportSuccessAction implements Action {
  type = ActionTypes.EXPORT_PRODUCT_SUCCESS;

  constructor(public payload: any) { }
}

export class ProductExportFailAction implements Action {
  type = ActionTypes.EXPORT_PRODUCT_FAIL;

  constructor(public payload: any = null) { }
}

// product All Export action
export class ProductAllExportAction implements Action {
  type = ActionTypes.ALL_EXPORT_PRODUCT;

  constructor(public payload: ProductAddModel) { }
}

export class ProductAllExportSuccessAction implements Action {
  type = ActionTypes.ALL_EXPORT_PRODUCT_SUCCESS;

  constructor(public payload: any) { }
}

export class ProductAllExportFailAction implements Action {
  type = ActionTypes.ALL_EXPORT_PRODUCT_FAIL;

  constructor(public payload: any = null) { }
}

// video upload
export class VideoUploadAction implements Action {
  type = ActionTypes.VIDEO_UPLOAD;

  constructor(public payload: ProductAddModel) { }
}

export class VideoUploadSuccessAction implements Action {
  type = ActionTypes.VIDEO_UPLOAD_SUCCESS;

  constructor(public payload: any) { }
}

export class VideoUploadFailAction implements Action {
  type = ActionTypes.VIDEO_UPLOAD_FAIL;

  constructor(public payload: any = null) { }
}


//Image upload //
export class ImageUploadAction implements Action {
  type = ActionTypes.IMAGE_UPLOAD;

  constructor(public payload: ProductAddModel) { }
}

export class ImageUploadSuccessAction implements Action {
  type = ActionTypes.IMAGE_UPLOAD_SUCCESS;

  constructor(public payload: any) { }
}

export class ImageUploadFailAction implements Action {
  type = ActionTypes.IMAGE_UPLOAD_FAIL;

  constructor(public payload: any = null) { }
}


//Image upload //
export class CatalogEdit implements Action {
  type = ActionTypes.CATALOG_EDIT;

  constructor(public payload: ProductAddModel) { }
}

export class CatalogEditSuccess implements Action {
  type = ActionTypes.CATALOG_EDIT_SUCCESS;

  constructor(public payload: any) { }
}

export class CatalogEditFail implements Action {
  type = ActionTypes.CATALOG_EDIT_FAIL;

  constructor(public payload: any = null) { }
}



export type Actions =
  | GetProductlistAction
  | GetProductlistSuccessAction
  | GetProductlistFailAction
  | GetStockStatuslistAction
  | GetStockStatuslistSuccessAction
  | GetStockStatuslistFailAction
  | GetProductDetailAction
  | GetProductDetailSuccess
  | GetProductDetailFail
  | DoProductAddAction
  | DoProductAddSuccessAction
  | DoProductAddFailAction
  | DoProductUpdateAction
  | DoProductUpdateSuccessAction
  | DoProductUpdateFailAction
  | DoProductDeleteAction
  | DoProductDeleteSuccessAction
  | DoProductDeleteFailAction
  | DoProductBulkDeleteAction
  | DoProductBulkDeleteSuccessAction
  | DoProductBulkDeleteFailAction
  | DoProductStatus
  | DoProductStatusSuccess
  | DoProductStatusFail
  | GetTotalProductCountAction
  | GetTotalProductCountSuccessAction
  | GetTotalProductCountFailAction
  | GetActiveProductCountAction
  | GetActiveProductCountSuccessAction
  | GetActiveProductCountFailAction
  | GetInActiveProductCountAction
  | GetInActiveProductCountSuccessAction
  | GetInActiveProductCountFailAction
  | DoProductExcel
  | DoProductExcelSuccess
  | DoProductExcelFail
  | DoProductsExcel
  | DoProductsExcelSuccess
  | DoProductsExcelFail
  | ChangeCount
  | ManufacturerListAction
  | ManufacturerListSuccessList
  | ManufacturerListFailList
  | ChangeQuotationStatusAction
  | ChangeQuotationStatusSuccess
  | ChangeQuotationStatusFail

  // Question Action
  | DoQuestionAddAction
  | DoQuestionAddSuccessAction
  | DoQuestionAddFailAction

  | InventoryProductListAction
  | InventoryProductListSuccessAction
  | InventoryProductListFailAction
  | InventoryProductListCountAction
  | InventoryProductListCountSuccess
  | InventoryProductListCountFail
  | UpdateStockAction
  | UpdateStockSuccess
  | UpdateStockFail

  | ImageUploadAction
  | ImageUploadSuccessAction
  | ImageUploadFailAction;

