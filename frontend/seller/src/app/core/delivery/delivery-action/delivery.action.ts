import { Action } from '@ngrx/store';
import { type } from '../../shared/utility/utilityHelpers';
import { DeliveryAddModel } from '../delivery-model/delivery-add.model';
import { DeliveryLocationlistModel } from '../delivery-model/delivery-list.model';
import { DeliveryDeleteModel } from '../delivery-model/delivery-delete.model';
import { DetailModel } from '../delivery-model/detail.model';
import { DeliveryUpdateModel } from '../delivery-model/delivery-update.model';
import { StatusRequest } from '../delivery-model/delivery-status.request.model';


export const ActionTypes = {
  DO_DELIVERY_ADD_LOCATION: type('[Add] Do Delivery Add'),
  DO_DELIVERY_ADD_LOCATION_SUCCESS: type('[Add] Do Delivery Add Success'),
  DO_DELIVERY_ADD_LOCATION_FAIL: type('[Add] Do Delivery Add Fail'),

  DO_DELIVERY_PERSON_ADD: type('[Add] Do Delivery Person Add'),
  DO_DELIVERY_PERSON_ADD_SUCCESS: type('[Add] Do Delivery Person Add Success'),
  DO_DELIVERY_PERSON_ADD_FAIL: type('[Add] Do Delivery Person Add Fail'),

  DO_DELIVERY_LOCATION_DELETE: type('[Add] Do Delivery Delete'),
  DO_DELIVERY_LOCATION_DELETE_SUCCESS: type('[Add] Do Delivery Delete Success'),
  DO_DELIVERY_LOCATION_DELETE_FAIL: type('[Add] Do Delivery Delete Fail'),

  DO_DELIVERY_PERSON_DELETE: type('[Add] Do Delivery Person Delete'),
  DO_DELIVERY_PERSON_DELETE_SUCCESS: type('[Add] Do Delivery Person Delete Success'),
  DO_DELIVERY_PERSON_DELETE_FAIL: type('[Add] Do Delivery Person Delete Fail'),

  DO_BULK_DELIVERY_LOCATION_DELETE: type('[Add] Do Delivery bulk Delete'),
  DO_BULK_DELIVERY_LOCATION_DELETE_SUCCESS: type('[Add] Do Delivery bulk Delete Success'),
  DO_BULK_DELIVERY_LOCATION_DELETE_FAIL: type('[Add] Do Delivery bulk Delete Fail'),

  DO_DELIVERY_UPDATE: type('[Update] Do Delivery Update'),
  DO_DELIVERY_UPDATE_SUCCESS: type('[Update] Do Delivery Update Success'),
  DO_DELIVERY_UPDATE_FAIL: type('[Update] Do Delivery Update Fail'),

  DO_DELIVERY_PERSON_UPDATE: type('[Update] Do Delivery person Update'),
  DO_DELIVERY_PERSON_UPDATE_SUCCESS: type('[Update] Do Delivery person Update Success'),
  DO_DELIVERY_PERSON_UPDATE_FAIL: type('[Update] Do Delivery person Update Fail'),

  GET_DELIVERY_DETAIL: type('[Detail] Do Delivery Detail'),
  GET_DELIVERY_DETAIL_SUCCESS: type('[Detail] Do Delivery Detail Success'),
  GET_DELIVERY_DETAIL_FAIL: type('[Detail] Do Delivery Detail Fail'),

  GET_DELIVERY_LOCATION_LIST: type('[List] Do delivery location list'),
  GET_DELIVERY_LOCATION_LIST_SUCCESS: type('[List] Do delivery location list Success'),
  GET_DELIVERY_LOCATION_LIST_FAIL: type('[List] Do delivery location list Fail'),

  GET_STOCK_STATUS_LIST: type('[List] Do Delivery Stock status list'),
  GET_STOCK_STATUS_LIST_SUCCESS: type('[List] Do Delivery Stock status list Success'),
  GET_STOCK_STATUS_LIST_FAIL: type('[List] Do Delivery Stock status list Fail'),

  GET_DELIVERY_PERSONS_LIST: type('[List] Do Delivery delivery persons list'),
  GET_DELIVERY_PERSONS_LIST_SUCCESS: type('[List] Do Delivery delivery persons list Success'),
  GET_DELIVERY_PERSONS_LIST_FAIL: type('[List] Do Delivery delivery persons list Fail'),


  DO_STATUS: type('[Delivery Status] Delivery Status'),
  DO_STATUS_SUCCESS: type('[Delivery Status] Delivery Status Success'),
  DO_STATUS_FAIL: type('[Delivery Status] Delivery Status Fail'),

  GET_TOTAL_DELIVERY_COUNT: type('[Delivery Count] Get Total Delivery Count'),
  GET_TOTAL_DELIVERY_COUNT_SUCCESS: type(
    '[Delivery Count] Get Total Delivery Count Success'
  ),
  GET_TOTAL_DELIVERY_COUNT_FAIL: type(
    '[Delivery Count] Get Total Delivery Count Fail'
  ),

  GET_DELIVERY_PERSONS_COUNT: type(
    '[Delivery Count Person] Get persons delivery count'
  ),
  GET_DELIVERY_PERSONS_COUNT_SUCCESS: type(
    '[Delivery Count Person] Get persons delivery count Success'
  ),
  GET_DELIVERY_PERSONS_COUNT_FAIL: type(
    '[Delivery Count Person] Get persons delivery count Fail'
  ),

  GET_INACTIVE_DELIVERY_COUNT: type(
    '[Delivery Count InActive] Get In persons delivery count'
  ),
  GET_INACTIVE_DELIVERY_COUNT_SUCCESS: type(
    '[Delivery Count InActive] Get In persons delivery count Success'
  ),
  GET_INACTIVE_DELIVERY_COUNT_FAIL: type(
    '[Delivery Count InActive] Get In persons delivery count Fail'
  ),

  GET_DELIVERY_EXCEL: type('[DELIVERYS EXCEL] DO Delivery Excel'),
  GET_DELIVERY_EXCEL_SUCCESS: type(
    '[DELIVERYS EXCEL SUCCESS] Do Delivery Excel Success'
  ),
  GET_DELIVERY_EXCEL_FAIL: type('[DELIVERYS EXCEL DELETE] Do Delivery Excel Fail'),

  GET_DELIVERYS_EXCEL: type('[ALL DELIVERYS EXCEL] DO Delivery Excel'),
  GET_DELIVERYS_EXCEL_SUCCESS: type(
    '[ALL DELIVERYS EXCEL SUCCESS] Do Delivery Excel Success'
  ),
  GET_DELIVERYS_EXCEL_FAIL: type(
    '[ALL DELIVERYS EXCEL DELETE] Do Delivery Excel Fail'
  ),
  DOWNLOAD_MAIN_PRICE_CSV: type('[main csv] Download Delivery main csv'),
  DOWNLOAD_MAIN_PRICE_CSV_SUCCESS: type('[main csv] Download Delivery main csv Success'),
  DOWNLOAD_MAIN_PRICE_CSV_FAIL: type('[main csv] Download Delivery main csv Fail'),
  UPLOAD_MAIN_PRICE_CSV: type('[main csv] Upload Delivery main csv'),
  UPLOAD_MAIN_PRICE_CSV_SUCCESS: type('[main csv] Upload Delivery main csv Success'),
  UPLOAD_MAIN_PRICE_CSV_FAIL: type('[main csv] Upload Delivery main csv Fail'),
  CHANGE_COUNT: type('[change count] Delivery Change count success'),

  PRICE_CSV_LIST: type('[price csv list] Delivery price  csv list '),
  PRICE_CSV_LIST_SUCCESS: type('[price csv list] Delivery price csv list success'),
  PRICE_CSV_LIST_FAIL: type('[price csv list] Delivery price csv list fail'),

  PRICE_CSV_COUNT: type('[price csv count] Delivery price csv count '),
  PRICE_CSV_COUNT_SUCCESS: type('[price csv count] Delivery price csv count success'),
  PRICE_CSV_COUNT_FAIL: type('[price csv count] Delivery price csv count fail'),

  DELETE_CSV_LIST: type('[delete csv list] Delivery delete csv list '),
  DELETE_CSV_LIST_SUCCESS: type('[delete csv list] Delivery delete csv list success'),
  DELETE_CSV_LIST_FAIL: type('[delete csv list] Delivery delete csv list fail'),

  DOWNLOAD_PRICE_CSV: type('[download csv] Delivery Download csv'),
  DOWNLOAD_PRICE_CSV_SUCCESS: type('[download csv] Delivery Download  csv Success'),
  DOWNLOAD_PRICE_CSV_FAIL: type('[download csv] Delivery Download csv Fail')
};

// delivery add action
export class DoDeliveryAddAction implements Action {
  type = ActionTypes.DO_DELIVERY_ADD_LOCATION;

  constructor(public payload: DeliveryAddModel) {}
}

export class DoDeliveryAddSuccessAction implements Action {
  type = ActionTypes.DO_DELIVERY_ADD_LOCATION_SUCCESS;

  constructor(public payload: any) {}
}

export class DoDeliveryAddFailAction implements Action {
  type = ActionTypes.DO_DELIVERY_LOCATION_DELETE_FAIL;

  constructor(public payload: any = null) {}
}
// delivery person add action
export class DoDeliveryPersonAddAction implements Action {
  type = ActionTypes.DO_DELIVERY_PERSON_ADD;

  constructor(public payload: any) {
  }
}

export class DoDeliveryPersonAddSuccessAction implements Action {
  type = ActionTypes.DO_DELIVERY_PERSON_ADD_SUCCESS;

  constructor(public payload: any) {}
}

export class DoDeliveryPersonAddFailAction implements Action {
  type = ActionTypes.DO_DELIVERY_PERSON_ADD_FAIL;

  constructor(public payload: any = null) {}
}
// Delivery Update action
export class DoDeliveryUpdateAction implements Action {
  type = ActionTypes.DO_DELIVERY_UPDATE;

  constructor(public payload: DeliveryUpdateModel) {}
}

export class DoDeliveryUpdateSuccessAction implements Action {
  type = ActionTypes.DO_DELIVERY_UPDATE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoDeliveryUpdateFailAction implements Action {
  type = ActionTypes.DO_DELIVERY_UPDATE_FAIL;

  constructor(public payload: any = null) {}
}
// Delivery person Update action
export class DoDeliveryPersonUpdateAction implements Action {
  type = ActionTypes.DO_DELIVERY_PERSON_UPDATE;

  constructor(public payload: any) {}
}

export class DoDeliveryPersonUpdateSuccessAction implements Action {
  type = ActionTypes.DO_DELIVERY_PERSON_UPDATE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoDeliveryPersonUpdateFailAction implements Action {
  type = ActionTypes.DO_DELIVERY_PERSON_UPDATE_FAIL;

  constructor(public payload: any = null) {}
}
// delivery detail action
export class GetDeliveryDetailAction implements Action {
  type = ActionTypes.GET_DELIVERY_DETAIL;

  constructor(public payload: DetailModel) {}
}

export class GetDeliveryDetailSuccess implements Action {
  type = ActionTypes.GET_DELIVERY_DETAIL_SUCCESS;

  constructor(public payload: any) {}
}

export class GetDeliveryDetailFail implements Action {
  type = ActionTypes.GET_DELIVERY_DETAIL_FAIL;

  constructor(public payload: any = null) {}
}
// delivery status change
export class DoDeliveryStatus implements Action {
  type = ActionTypes.DO_STATUS;
  constructor(public payload: StatusRequest) {}
}

export class DoDeliveryStatusSuccess implements Action {
  type = ActionTypes.DO_STATUS_SUCCESS;
  constructor(public payload: StatusRequest) {}
}

export class DoDeliveryStatusFail implements Action {
  type = ActionTypes.DO_STATUS_FAIL;
  constructor(public payload: any = null) {}
}
// delivery delete action
export class DoDeliveryDeleteAction implements Action {
  type = ActionTypes.DO_DELIVERY_LOCATION_DELETE;

  constructor(public payload: DeliveryDeleteModel) {}
}

export class DoDeliveryDeleteSuccessAction implements Action {
  type = ActionTypes.DO_DELIVERY_LOCATION_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoDeliveryDeleteFailAction implements Action {
  type = ActionTypes.DO_DELIVERY_LOCATION_DELETE_FAIL;

  constructor(public payload: any = null) {}
}
// delivery person delete action
export class DoDeliveryPersonDeleteAction implements Action {
  type = ActionTypes.DO_DELIVERY_PERSON_DELETE;

  constructor(public payload: DeliveryDeleteModel) {}
}

export class DoDeliveryPersonDeleteSuccessAction implements Action {
  type = ActionTypes.DO_DELIVERY_PERSON_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoDeliveryPersonDeleteFailAction implements Action {
  type = ActionTypes.DO_DELIVERY_PERSON_DELETE_FAIL;

  constructor(public payload: any = null) {}
}
// delivery bulk delete action
export class DoDeliveryBulkDeleteAction implements Action {
  type = ActionTypes.DO_BULK_DELIVERY_LOCATION_DELETE;

  constructor(public payload: DeliveryDeleteModel) {}
}

export class DoDeliveryBulkDeleteSuccessAction implements Action {
  type = ActionTypes.DO_BULK_DELIVERY_LOCATION_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoDeliveryBulkDeleteFailAction implements Action {
  type = ActionTypes.DO_BULK_DELIVERY_LOCATION_DELETE_FAIL;

  constructor(public payload: any = null) {}
}

// delivery location list action
export class GetDeliveryLocationlistAction implements Action {
  type = ActionTypes.GET_DELIVERY_LOCATION_LIST;

  constructor(public payload: DeliveryLocationlistModel) {}
}

export class GetDeliveryLocationlistSuccessAction implements Action {
  type = ActionTypes.GET_DELIVERY_LOCATION_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetDeliveryLocationlistFailAction implements Action {
  type = ActionTypes.GET_DELIVERY_LOCATION_LIST_FAIL;

  constructor(public payload: any = null) {}
}
// delivery location list action
export class GetStockStatuslistAction implements Action {
  type = ActionTypes.GET_STOCK_STATUS_LIST;

  constructor(public payload: DeliveryLocationlistModel) {}
}

export class GetStockStatuslistSuccessAction implements Action {
  type = ActionTypes.GET_STOCK_STATUS_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetStockStatuslistFailAction implements Action {
  type = ActionTypes.GET_STOCK_STATUS_LIST_FAIL;

  constructor(public payload: any = null) {}
}
// delivery persons list list action
export class GetDeliveryPersonslistAction implements Action {
  type = ActionTypes.GET_DELIVERY_PERSONS_LIST;

  constructor(public payload: any) {}
}

export class GetDeliveryPersonslistSuccessAction implements Action {
  type = ActionTypes.GET_DELIVERY_PERSONS_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetDeliveryPersonslistFailAction implements Action {
  type = ActionTypes.GET_DELIVERY_PERSONS_LIST_FAIL;

  constructor(public payload: any = null) {}
}

export class GetTotalDeliveryCountAction implements Action {
  type = ActionTypes.GET_TOTAL_DELIVERY_COUNT;

  constructor(public payload: any) {}
}

export class GetTotalDeliveryCountSuccessAction implements Action {
  type = ActionTypes.GET_TOTAL_DELIVERY_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetTotalDeliveryCountFailAction implements Action {
  type = ActionTypes.GET_TOTAL_DELIVERY_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

export class GetDeliveryPersonsCountAction implements Action {
  type = ActionTypes.GET_DELIVERY_PERSONS_COUNT;

  constructor(public payload: any) {}
}

export class GetDeliveryPersonsCountSuccessAction implements Action {
  type = ActionTypes.GET_DELIVERY_PERSONS_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetDeliveryPersonsCountFailAction implements Action {
  type = ActionTypes.GET_DELIVERY_PERSONS_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

export class GetInActiveDeliveryCountAction implements Action {
  type = ActionTypes.GET_INACTIVE_DELIVERY_COUNT;

  constructor(public payload: any) {}
}

export class GetInActiveDeliveryCountSuccessAction implements Action {
  type = ActionTypes.GET_INACTIVE_DELIVERY_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetInActiveDeliveryCountFailAction implements Action {
  type = ActionTypes.GET_INACTIVE_DELIVERY_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

// get Delivery Excel
export class DoDeliveryExcel implements Action {
  type = ActionTypes.GET_DELIVERY_EXCEL;

  constructor(public payload: any = null) {}
}

export class DoDeliveryExcelSuccess implements Action {
  type = ActionTypes.GET_DELIVERY_EXCEL_SUCCESS;

  constructor(public payload: any) {}
}

export class DoDeliveryExcelFail implements Action {
  type = ActionTypes.GET_DELIVERY_EXCEL_FAIL;

  constructor(public payload: any = null) {}
}

// get Delivery Excel
export class DoDeliverysExcel implements Action {
  type = ActionTypes.GET_DELIVERYS_EXCEL;

  constructor(public payload: any = null) {}
}

export class DoDeliverysExcelSuccess implements Action {
  type = ActionTypes.GET_DELIVERYS_EXCEL_SUCCESS;

  constructor(public payload: any) {}
}

export class DoDeliverysExcelFail implements Action {
  type = ActionTypes.GET_DELIVERYS_EXCEL_FAIL;

  constructor(public payload: any = null) {}
}
// get main price csv Excel
export class DownloadPriceCsv implements Action {
  type = ActionTypes.DOWNLOAD_MAIN_PRICE_CSV;

  constructor(public payload: any = null) {}
}

export class DownloadPriceCsvSuccess implements Action {
  type = ActionTypes.DOWNLOAD_MAIN_PRICE_CSV_SUCCESS;

  constructor(public payload: any) {}
}

export class DownloadPriceCsvFail implements Action {
  type = ActionTypes.DOWNLOAD_MAIN_PRICE_CSV_FAIL;

  constructor(public payload: any = null) {}
}
// upload main price csv Excel
export class UploadPriceCsv implements Action {
  type = ActionTypes.UPLOAD_MAIN_PRICE_CSV;

  constructor(public payload: any) {}
}

export class UploadPriceCsvSuccess implements Action {
  type = ActionTypes.UPLOAD_MAIN_PRICE_CSV_SUCCESS;

  constructor(public payload: any) {}
}

export class UploadPriceCsvFail implements Action {
  type = ActionTypes.UPLOAD_MAIN_PRICE_CSV_FAIL;

  constructor(public payload: any = null) {}
}

export class ChangeCount implements Action {
  type = ActionTypes.CHANGE_COUNT;

  constructor(public payload: any) {}
}

export class PriceCsvList implements Action {
  type = ActionTypes.PRICE_CSV_LIST;

  constructor(public payload: any) {}
}

export class PriceCsvListSuccess implements Action {
  type = ActionTypes.PRICE_CSV_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class PriceCsvListFail implements Action {
  type = ActionTypes.PRICE_CSV_LIST_FAIL;

  constructor(public payload: any) {}
}
export class PriceCsvCount implements Action {
  type = ActionTypes.PRICE_CSV_COUNT;

  constructor(public payload: any) {}
}

export class PriceCsvCountSuccess implements Action {
  type = ActionTypes.PRICE_CSV_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class PriceCsvCountFail implements Action {
  type = ActionTypes.PRICE_CSV_COUNT_FAIL;

  constructor(public payload: any) {}
}
export class DeleteCsvList implements Action {
  type = ActionTypes.DELETE_CSV_LIST;

  constructor(public payload: any) {}
}

export class DeleteCsvListSuccess implements Action {
  type = ActionTypes.DELETE_CSV_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DeleteCsvListFail implements Action {
  type = ActionTypes.DELETE_CSV_LIST_FAIL;

  constructor(public payload: any) {}
}

export class DownloadPriceCsvList implements Action {
  type = ActionTypes.DOWNLOAD_PRICE_CSV;

  constructor(public payload: any = null) {}
}

export class DownloadPriceCsvSuccessList implements Action {
  type = ActionTypes.DOWNLOAD_PRICE_CSV_SUCCESS;

  constructor(public payload: any) {}
}

export class DownloadPriceCsvFailList implements Action {
  type = ActionTypes.DOWNLOAD_PRICE_CSV_FAIL;

  constructor(public payload: any = null) {}
}
export type Actions =
  | GetDeliveryLocationlistAction
  | GetDeliveryLocationlistSuccessAction
  | GetDeliveryLocationlistFailAction
  | GetStockStatuslistAction
  | GetStockStatuslistSuccessAction
  | GetStockStatuslistFailAction
  | GetDeliveryDetailAction
  | GetDeliveryDetailSuccess
  | GetDeliveryDetailFail
  | DoDeliveryAddAction
  | DoDeliveryAddSuccessAction
  | DoDeliveryAddFailAction
  | DoDeliveryPersonAddAction
  | DoDeliveryPersonAddSuccessAction
  | DoDeliveryPersonAddFailAction
  | DoDeliveryUpdateAction
  | DoDeliveryUpdateSuccessAction
  | DoDeliveryUpdateFailAction
  | DoDeliveryPersonUpdateAction
  | DoDeliveryPersonUpdateSuccessAction
  | DoDeliveryPersonUpdateFailAction
  | DoDeliveryDeleteAction
  | DoDeliveryDeleteSuccessAction
  | DoDeliveryDeleteFailAction
  | DoDeliveryPersonDeleteAction
  | DoDeliveryPersonDeleteSuccessAction
  | DoDeliveryPersonDeleteFailAction
  | DoDeliveryBulkDeleteAction
  | DoDeliveryBulkDeleteSuccessAction
  | DoDeliveryBulkDeleteFailAction
  | DoDeliveryStatus
  | DoDeliveryStatusSuccess
  | DoDeliveryStatusFail
  | GetTotalDeliveryCountAction
  | GetTotalDeliveryCountSuccessAction
  | GetTotalDeliveryCountFailAction
  | GetDeliveryPersonsCountAction
  | GetDeliveryPersonsCountSuccessAction
  | GetDeliveryPersonsCountFailAction
  | GetInActiveDeliveryCountAction
  | GetInActiveDeliveryCountSuccessAction
  | GetInActiveDeliveryCountFailAction
  | DoDeliveryExcel
  | DoDeliveryExcelSuccess
  | DoDeliveryExcelFail
  | DoDeliverysExcel
  | DoDeliverysExcelSuccess
  | DoDeliverysExcelFail
  | DownloadPriceCsv
  | DownloadPriceCsvSuccess
  | DownloadPriceCsvFail
  | UploadPriceCsv
  | UploadPriceCsvSuccess
  | UploadPriceCsvFail
  | ChangeCount
  | PriceCsvList
  | PriceCsvListSuccess
  | PriceCsvListFail
  | PriceCsvCount
  | PriceCsvCountSuccess
  | PriceCsvCountFail
  | DeleteCsvList
  | DeleteCsvListSuccess
  | DeleteCsvListFail
  | DownloadPriceCsvList
  | DownloadPriceCsvSuccessList
  | DownloadPriceCsvFailList;
