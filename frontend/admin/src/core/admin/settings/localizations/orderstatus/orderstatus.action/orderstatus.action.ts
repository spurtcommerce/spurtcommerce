/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Action } from '@ngrx/store';
import { type } from './../../../../shared/utility/utilityHelpers';
import { OrderstatusForm } from '../orderstatus.models/orderstatus.model';
import { OrderStatusListForm } from '../orderstatus.models/orderstatuslist.model';
import { OrderStatusCountModel } from '../orderstatus.models/OrderStatusCount.model';

export const ActionTypes = {
  DO_ORDERSTATUS_LIST_ACTION: type('[ORDERSTATUSList] Do ORDERSTATUS'),
  DO_ORDERSTATUS__LIST_SUCCESS: type(
    '[ORDERSTATUSList] Do ORDERSTATUS Success'
  ),
  DO_ORDERSTATUS__LIST_FAIL: type('[ORDERSTATUSList] Do ORDERSTATUS Fail'),

  DO_ORDERSTATUS_COUNT_ACTION: type('[Common] Do ORDER status Paination Count'),
  DO_ORDERSTATUS_COUNT_SUCCESS: type(
    '[Common] Doorder status Paination Count Success'
  ),
  DO_ORDERSTATUS_COUNT_FAIL: type(
    '[Common] Do order status Paination Count Fail'
  ),

  DO_NEWORDERSTATUS: type('[Settings] Do NEWORDERSTATUS'),
  DO_NEWORDERSTATUS_SUCCESS: type('[Settings] NEWORDERSTATUS Success'),
  DO_NEWORDERSTATUS_FAIL: type('[Settings] NEWORDERSTATUS Fail'),

  DO_UpdateOrderstatus: type('[Settings] DO_UpdateOrderstatus'),
  DO_UpdateOrderstatus_SUCCESS: type('[Settings] DO_UpdateOrderstatus Success'),
  DO_UpdateOrderstatus_FAIL: type('[Settings] DO_UpdateOrderstatus_FAIL '),

  DO_UpdateProductOrderstatus: type('[Settings] DO_UpdateProductOrderstatus'),
  DO_UpdateProductOrderstatus_SUCCESS: type('[Settings] DO_UpdateProductOrderstatus Success'),
  DO_UpdateProductOrderstatus_FAIL: type('[Settings] DO_UpdateProductOrderstatus_FAIL '),

  DO_UpdateProductTrackingstatus: type('[Settings] DO_UpdateProductTrackingstatus'),
  DO_UpdateProductTrackingstatus_SUCCESS: type('[Settings] DO_UpdateProductTrackingstatus Success'),
  DO_UpdateProductTrackingstatus_FAIL: type('[Settings] DO_UpdateProductTrackingstatus_FAIL '),

  DO_ORDERSTATUS_DELETE: type('[Delete] Do order status Delete'),
  DO_ORDERSTATUS_DELETE_SUCCESS: type('[Delete] Do order status Success'),
  DO_ORDERSTATUS_DELETE_FAIL: type('[Delete] Do order status Delete Fail')
};


export class DoOrderStatusListAction implements Action {
  type = ActionTypes.DO_ORDERSTATUS_LIST_ACTION;

  constructor(public payload: OrderStatusListForm) {}
}

export class DoOrderStatusSuccessAction implements Action {
  type = ActionTypes.DO_ORDERSTATUS__LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoOrderStatusListFailAction implements Action {
  type = ActionTypes.DO_ORDERSTATUS__LIST_FAIL;

  constructor(public payload: any = null) {}
}

export class DopaginationorderstatusListAction implements Action {
  type = ActionTypes.DO_ORDERSTATUS_COUNT_ACTION;

  constructor(public payload: OrderStatusCountModel) {}
}

export class DopaginationorderstatusSuccessAction implements Action {
  type = ActionTypes.DO_ORDERSTATUS_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class DopaginationorderstatusFailAction implements Action {
  type = ActionTypes.DO_ORDERSTATUS_COUNT_FAIL;

  constructor(public payload: any = null) {}
}


export class DoNewOrderStatusAction implements Action {
  type = ActionTypes.DO_NEWORDERSTATUS;

  constructor(public payload: OrderstatusForm) {}
}

export class DoNewOrderStatusSuccessAction implements Action {
  type = ActionTypes.DO_NEWORDERSTATUS_SUCCESS;

  constructor(public payload: any) {}
}

export class DoNewOrderStatusFailAction implements Action {
  type = ActionTypes.DO_NEWORDERSTATUS_FAIL;

  constructor(public payload: any = null) {}
}

// / # Update  Order Status

export class DoUpdateOrderstatusAction implements Action {
  type = ActionTypes.DO_UpdateOrderstatus;

  constructor(public payload: OrderstatusForm) {}
}

export class DoUpdateOrderstatusSuccessAction implements Action {
  type = ActionTypes.DO_UpdateOrderstatus_SUCCESS;

  constructor(public payload: any) {}
}

export class DoUpdateOrderstatusFailAction implements Action {
  type = ActionTypes.DO_UpdateOrderstatus_FAIL;

  constructor(public payload: any = null) {}
}
// / # Update product Order Status

export class DoUpdateProductOrderstatusAction implements Action {
  type = ActionTypes.DO_UpdateProductOrderstatus;

  constructor(public payload: OrderstatusForm) {}
}

export class DoUpdateProductOrderstatusSuccessAction implements Action {
  type = ActionTypes.DO_UpdateProductOrderstatus_SUCCESS;

  constructor(public payload: any) {}
}

export class DoUpdateProductOrderstatusFailAction implements Action {
  type = ActionTypes.DO_UpdateProductOrderstatus_FAIL;

  constructor(public payload: any = null) {}
}
// / # Update product Order Status

export class DoUpdateProductTrackingstatusAction implements Action {
  type = ActionTypes.DO_UpdateProductTrackingstatus;

  constructor(public payload: OrderstatusForm) {}
}

export class DoUpdateProductTrackingstatusSuccessAction implements Action {
  type = ActionTypes.DO_UpdateProductTrackingstatus_SUCCESS;

  constructor(public payload: any) {}
}

export class DoUpdateProductTrackingstatusFailAction implements Action {
  type = ActionTypes.DO_UpdateProductTrackingstatus_FAIL;

  constructor(public payload: any = null) {}
}
// # delete
export class DoOrderStatusDeleteAction implements Action {
  type = ActionTypes.DO_ORDERSTATUS_DELETE;

  constructor(public payload: any) {}
}

export class DoOrderStatusDeleteSuccessAction implements Action {
  type = ActionTypes.DO_ORDERSTATUS_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoOrderStatusDeleteFailAction implements Action {
  type = ActionTypes.DO_ORDERSTATUS_DELETE_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | DoOrderStatusListAction
  | DoOrderStatusSuccessAction
  | DoOrderStatusListFailAction
  | DopaginationorderstatusListAction
  | DopaginationorderstatusSuccessAction
  | DopaginationorderstatusFailAction
  | DoNewOrderStatusAction
  | DoNewOrderStatusSuccessAction
  | DoNewOrderStatusFailAction
  | DoUpdateOrderstatusSuccessAction
  | DoUpdateOrderstatusAction
  | DoUpdateOrderstatusFailAction
  | DoUpdateProductOrderstatusSuccessAction
  | DoUpdateProductOrderstatusAction
  | DoUpdateProductOrderstatusFailAction
  | DoUpdateProductTrackingstatusSuccessAction
  | DoUpdateProductTrackingstatusAction
  | DoUpdateProductTrackingstatusFailAction
  | DoOrderStatusDeleteAction
  | DoOrderStatusDeleteSuccessAction
  | DoOrderStatusDeleteFailAction;
