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
import { SellerListRequest } from '../seller-model/seller.request.model';
import { SellerAddRequest } from '../seller-model/seller-add.request.model';
import { DetailRequest } from '../seller-model/details.model';
import { ApprovalRequest } from '../seller-model/seller-approval.request.model';
import { SellerUpdateRequest } from '../seller-model/seller-update.request.model';
import { CountryListForm } from '../seller-model/countrylist.model';


export const ActionTypes = {
  GET_SELLER_LIST: type('[Seller List] get seller list'),
  GET_SELLER_LIST_SUCCESS: type(
    '[Seller List Success] get seller list success'
  ),
  GET_SELLER_LIST_FAIL: type('[Seller List Fail] get seller list fail'),

  DO_SELLER_ADD: type('[Seller Add] do seller add'),
  DO_SELLER_ADD_SUCCESS: type('[Seller Add Success] do seller add success'),
  DO_SELLER_ADD_FAIL: type('[Seller Add Fail] do seller add fail'),

  DO_SELLER_UPDATE: type('[Seller Update] do seller Update'),
  DO_SELLER_UPDATE_SUCCESS: type(
    '[Seller Update Success] do seller Update success'
  ),
  DO_SELLER_UPDATE_FAIL: type('[Seller Update Fail] do seller Update fail'),

  PAGE_DETAILS: type('[page] details page'),
  PAGE_DETAILS_SUCCESS: type('[page] details page success'),
  PAGE_DETAILS_FAIL: type('[page] details page fail'),


  DO_SELLER_BULK_DELETE: type(
    '[SELLER BULK DELETE] DO Seller Bulk Delete'
  ),
  DO_SELLER_BULK_DELETE_SUCCESS: type(
    '[SELLER BULK DELETE SUCCESS] Do Seller Bulk Delete Success'
  ),
  DO_SELLER_BULK_DELETE_FAIL: type(
    '[SELLER BULK DELETE] Do Seller Bulk Delete Fail'
  ),


  DO_DELETE_SELLER_ACTION: type('[Delete Seller] Delete Seller'),
  DO_DELETE_SELLER_SUCCESS: type(
    '[Delete Seller] Delete Seller  Success'
  ),
  DO_DELETE_SELLER_FAIL: type('[Delete Seller] Delete Seller Fail'),


  GET_SELLER_EXCEL: type('[SELLER EXCEL] DO Seller Excel'),
  GET_SELLER_EXCEL_SUCCESS: type(
    '[SELLER EXCEL SUCCESS] Do Seller Excel Success'
  ),
  GET_SELLER_EXCEL_FAIL: type(
    '[SELLER EXCEL DELETE] Do Seller Excel Fail'
  ),

  DO_SELLER_APPROVAL: type('[Seller Approval] Seller Approval'),
  DO_SELLER_APPROVAL_SUCCESS: type('[Seller Approval] Seller Approval Success'),
  DO_SELLER_APPROVAL_FAIL: type('[Seller Approval] Seller Approval Fail'),

  GET_COUNTRY_LIST: type('[Country list] Do Countrylist'),
  GET_COUNTRY_LIST_SUCCESS: type('[Country list] Do Countrylist Success'),
  GET_COUNTRY_LIST_FAIL: type('[Country list] Do Countrylist Fail'),

  GET_VENDOR_COUNTS: type('[Seller] get vendor count'),
  GET_VENDOR_COUNTS_SUCCESS: type('[Seller] get vendor count success'),
  GET_VENDOR_COUNTS_FAIL: type('[Seller] get vendor count fail'),

  ZONE_LIST: type('[Zone list] Do Zonelist'),
  ZONE_LIST_SUCCESS: type('[Zone list] Do Zonelist Success'),
  ZONE_LIST_FAIL: type('[Zone list] Do Zonelist Fail'),

  SELLER_LIST_COUNT: type('[Seller list count] Do Seller list count'),
  SELLER_LIST_COUNT_SUCCESS: type('[Seller list count] Do Seller list count Success'),
  SELLER_LIST_COUNT_FAIL: type('[Seller list count] Do Seller list count Fail'),

  GET_PRODUCT_LIST: type('[Product List] get Product list'),
  GET_PRODUCT_LIST_SUCCESS: type(
    '[Product List Success] get Product list success'
  ),
  GET_PRODUCT_LIST_FAIL: type('[Product List Fail] get Product list fail'),

  GET_PRODUCT_LIST_COUNT: type('[Product List Count] get Product list Count'),
  GET_PRODUCT_LIST_COUNT_SUCCESS: type(
    '[Product List Count Success] get Product list Count success '
  ),
  GET_PRODUCT_LIST_COUNT_FAIL: type('[Product List Count Fail] get Product list Count fail'),

  CHECK_AVAILABILITY: type('[Check Availability] Check AVailability'),
  CHECK_AVAILABILITY_SUCCESS: type('[Check Availability Success] Check AVailability Success'),
  CHECK_AVAILABILITY_FAIL: type('[Check Availability FAIL] Check AVailability Fail'),
  
  STATE_LIST: type('[state list] state list'),
  STATE_LIST_SUCCESS: type('[state list Success] state list Success'),
  STATE_LIST_FAIL: type('[state list FAIL] state list Fail'),
  // country add Delete
  DO_COUNTRY_REMOVE: type('[CRemove] Do Country Remove'),
  DO_COUNTRY_ADD: type('[CAdd] Do Country Add'),
};

// seller list action
export class GetSellerList implements Action {
  type = ActionTypes.GET_SELLER_LIST;

  constructor(public payload: SellerListRequest) { }
}

export class GetSellerListSuccess implements Action {
  type = ActionTypes.GET_SELLER_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class GetSellerListFail implements Action {
  type = ActionTypes.GET_SELLER_LIST_FAIL;

  constructor(public payload: any = null) { }
}

export class DoSellerAdd implements Action {
  type = ActionTypes.DO_SELLER_ADD;

  constructor(public payload: SellerAddRequest) {
  }
}

export class DoSellerAddSuccess implements Action {
  type = ActionTypes.DO_SELLER_ADD_SUCCESS;

  constructor(public payload: any) { }
}

export class DoSellerAddFail implements Action {
  type = ActionTypes.DO_SELLER_ADD_FAIL;

  constructor(public payload: any = null) { }
}

export class DoSellerUpdate implements Action {
  type = ActionTypes.DO_SELLER_UPDATE;

  constructor(public payload: SellerUpdateRequest) {
  }
}

export class DoSellerUpdateSuccess implements Action {
  type = ActionTypes.DO_SELLER_UPDATE_SUCCESS;

  constructor(public payload: any) { }
}

export class DoSellerUpdateFail implements Action {
  type = ActionTypes.DO_SELLER_UPDATE_FAIL;

  constructor(public payload: any = null) { }
}

export class PageDetails implements Action {
  type = ActionTypes.PAGE_DETAILS;

  constructor(public payload: any) { }
}

export class PageDetailsSuccess implements Action {
  type = ActionTypes.PAGE_DETAILS_SUCCESS;

  constructor(public payload: any) { }
}
export class PageDetailsFail implements Action {
  type = ActionTypes.PAGE_DETAILS_FAIL;

  constructor(public payload: any = null) { }
}


export class DoDeleteSellerAction implements Action {
  type = ActionTypes.DO_DELETE_SELLER_ACTION;

  constructor(public payload: any) {

  }
}

export class DoDeleteSellerSuccess implements Action {
  type = ActionTypes.DO_DELETE_SELLER_SUCCESS;

  constructor(public payload: any) {

  }
}

export class DoDeleteSellerFail implements Action {
  type = ActionTypes.DO_DELETE_SELLER_FAIL;

  constructor(public payload: any = null) { }
}

// get Seller Excel
export class DoSellerExcel implements Action {
  type = ActionTypes.GET_SELLER_EXCEL;

  constructor(public payload: any = null) { }
}

export class DoSellerExcelSuccess implements Action {
  type = ActionTypes.GET_SELLER_EXCEL_SUCCESS;

  constructor(public payload: any) { }
}

export class DoSellerExcelFail implements Action {
  type = ActionTypes.GET_SELLER_EXCEL_FAIL;

  constructor(public payload: any = null) { }
}



export class DoSellerBulkDelete implements Action {
  type = ActionTypes.DO_SELLER_BULK_DELETE;

  constructor(public payload: any = null) { }
}

export class DoSellerBulkDeleteSuccess implements Action {
  type = ActionTypes.DO_SELLER_BULK_DELETE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class DoSellerBulkDeleteFail implements Action {
  type = ActionTypes.DO_SELLER_BULK_DELETE_FAIL;

  constructor(public payload: any = null) {
  }
}


export class DoSellerApproval implements Action {
  type = ActionTypes.DO_SELLER_APPROVAL;
  constructor(public payload: ApprovalRequest) {

  }
}


export class DoSellerApprovalSuccess implements Action {
  type = ActionTypes.DO_SELLER_APPROVAL_SUCCESS;
  constructor(public payload: ApprovalRequest) {

  }
}

export class DoSellerApprovalFail implements Action {
  type = ActionTypes.DO_SELLER_APPROVAL_FAIL;
  constructor(public payload: any = null) { }
}

export class GetCountrylistAction implements Action {
  type = ActionTypes.GET_COUNTRY_LIST;

  constructor(public payload: CountryListForm) { }
}

export class GetCountrylistSuccessAction implements Action {
  type = ActionTypes.GET_COUNTRY_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class GetCountrylistFailAction implements Action {
  type = ActionTypes.GET_COUNTRY_LIST_FAIL;

  constructor(public payload: any = null) { }
}


// get vendor counts

export class GetVendorCountsAction implements Action {
  type = ActionTypes.GET_VENDOR_COUNTS;
  constructor(public payload: any = null) { }
}

export class GetVendorCountsSuccess implements Action {
  type = ActionTypes.GET_VENDOR_COUNTS_SUCCESS;
  constructor(public payload: any) { }
}

export class GetVendorCountsFail implements Action {
  type = ActionTypes.GET_VENDOR_COUNTS_FAIL;
  constructor(public payload: any = null) { }
}


// zone list

export class ZoneListAction implements Action {
  type = ActionTypes.ZONE_LIST;

  constructor(public payload: any) { 
  }
}

export class ZoneListSuccessAction implements Action {
  type = ActionTypes.ZONE_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class ZoneListFailAction implements Action {
  type = ActionTypes.ZONE_LIST_FAIL;

  constructor(public payload: any = null) { }
}

// Seller list count

export class SellerListCountAction implements Action {
  type = ActionTypes.SELLER_LIST_COUNT;
  constructor(public payload: any) { }
}

export class SellerListCountSuccessAction implements Action {
  type = ActionTypes.SELLER_LIST_COUNT_SUCCESS;
  constructor(public payload: any) { }
}

export class SellerListCountFailAction implements Action {
  type = ActionTypes.SELLER_LIST_COUNT_FAIL;
  constructor(public payload: any = null) { }
}

export class getproductListAction implements Action {
  type = ActionTypes.GET_PRODUCT_LIST;

  constructor(public payload: SellerListRequest) { }
}

export class getproductListSuccessAction implements Action {
  type = ActionTypes.GET_PRODUCT_LIST_SUCCESS;

  constructor(public payload: any) {
   }
}

export class getproductListFailAction implements Action {
  type = ActionTypes.GET_PRODUCT_LIST_FAIL;

  constructor(public payload: any = null) { }
}

export class getproductListcountAction implements Action {
  type = ActionTypes.GET_PRODUCT_LIST_COUNT;

  constructor(public payload: SellerListRequest) { }
}

export class getproductListcountSuccessAction implements Action {
  type = ActionTypes.GET_PRODUCT_LIST_COUNT_SUCCESS;

  constructor(public payload: any) {
   }
}

export class getproductListcountFailAction implements Action {
  type = ActionTypes.GET_PRODUCT_LIST_COUNT_FAIL;

  constructor(public payload: any = null) { }
}

export class checkAvailAction implements Action{
  type = ActionTypes.CHECK_AVAILABILITY;
  constructor(public payload: any ) { }

}
export class checkAvailSuccessAction implements Action{
  type = ActionTypes.CHECK_AVAILABILITY_SUCCESS;
  constructor(public payload: any) { }
}
export class checkAvailFailAction implements Action{
  type = ActionTypes.CHECK_AVAILABILITY_FAIL;
  constructor(public payload: any) { }
}

export class stateListAction implements Action{
  type = ActionTypes.STATE_LIST;
  constructor(public payload: any ) { }

}
export class stateListSuccessAction implements Action{
  type = ActionTypes.STATE_LIST_SUCCESS;
  constructor(public payload: any) { }
}
export class stateListFailAction implements Action{
  type = ActionTypes.STATE_LIST_FAIL;
  constructor(public payload: any) { }
}
// 
// country remove action
export class DoCountryremoveAction implements Action {
  type = ActionTypes.DO_COUNTRY_REMOVE;

  constructor(public payload: any) { }
}

// country add action
export class DoCountryaddAction implements Action {
  type = ActionTypes.DO_COUNTRY_ADD;
  constructor(public payload: any) { }
}
export type Actions =
  | GetSellerList
  | GetSellerListSuccess
  | GetSellerListFail
  | DoSellerAdd
  | DoSellerAddSuccess
  | DoSellerAddFail
  | DoSellerUpdate
  | DoSellerUpdateSuccess
  | DoSellerUpdateFail
  | PageDetails
  | PageDetailsSuccess
  | PageDetailsFail
  | DoDeleteSellerAction
  | DoDeleteSellerSuccess
  | DoDeleteSellerFail
  | DoSellerExcel
  | DoSellerExcelSuccess
  | DoSellerExcelFail
  | DoSellerBulkDelete
  | DoSellerBulkDeleteSuccess
  | DoSellerBulkDeleteFail
  | DoSellerApproval
  | DoSellerApprovalSuccess
  | DoSellerApprovalFail
  | GetCountrylistAction
  | GetCountrylistSuccessAction
  | GetCountrylistFailAction
  | GetVendorCountsAction
  | GetVendorCountsSuccess
  | GetVendorCountsFail
  | getproductListAction
  | getproductListSuccessAction
  | getproductListFailAction
  | getproductListcountAction
  | getproductListcountSuccessAction
  | getproductListcountFailAction
  | checkAvailAction
  | checkAvailSuccessAction
  | checkAvailFailAction
  | stateListAction
  | stateListSuccessAction
  | stateListFailAction
  |DoCountryremoveAction
  |DoCountryaddAction