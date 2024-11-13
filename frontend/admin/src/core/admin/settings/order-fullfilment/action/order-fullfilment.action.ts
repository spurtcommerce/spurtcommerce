/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Action } from '@ngrx/store';
import { type } from 'src/core/admin/shared/utility/utilityHelpers';

export const ActionTypes = {

  /*Order fullFillment List*/

  ORDER_FULLFILLMENT_LIST: type('[Orderfullfillment] Orderfullfillment list'),
  ORDER_FULLFILLMENT_LIST_SUCCESS: type('[Orderfullfillment] Orderfullfillment list Success'),
  ORDER_FULLFILLMENT_LIST_FAIL: type('[Orderfullfillment] Orderfullfillment list Fail'),

  ADD_ORDER_FULLFILLMENT: type('[Orderfullfillment] add Orderfullfillment list'),
  ADD_ORDER_FULLFILLMENT_SUCCESS: type('[Orderfullfillment] add Orderfullfillment list Success'),
  ADD_ORDER_FULLFILLMENT_FAIL: type('[Orderfullfillment] add Orderfullfillment list Fail'),

  /*Order fullFillment Status*/
  ORDER_FULLFILLMENT_STATUS: type('[Orderfullfillment] Orderfullfillment status'),
  ORDER_FULLFILLMENT_STATUS_SUCCESS: type('[Orderfullfillment] Orderfullfillment status Success'),
  ORDER_FULLFILLMENT_STATUS_FAIL: type('[Orderfullfillment] Orderfullfillment status Fail'),

  /*Update Order fullFillment Status*/
  UPDATE_ORDER_FULLFILLMENT_STATUS: type('[Orderfullfillment] Update Orderfullfillment status'),
  UPDATE_ORDER_FULLFILLMENT_STATUS_SUCCESS: type('[Orderfullfillment] update Orderfullfillment status Success'),
  UPDATE_ORDER_FULLFILLMENT_STATUS_FAIL: type('[Orderfullfillment] update Orderfullfillment status Fail'),

  /*Delete Order fullFillment Status*/
  DELETE_ORDER_FULLFILLMENT_STATUS: type('[Orderfullfillment] Delete Orderfullfillment status'),
  DELETE_ORDER_FULLFILLMENT_STATUS_SUCCESS: type('[Orderfullfillment] Delete Orderfullfillment status Success'),
  DELETE_ORDER_FULLFILLMENT_STATUS_FAIL: type('[Orderfullfillment] D elete Orderfullfillment status Fail'),


  /*MANAGE_FULLFILLMENT_STATUS_LIST*/
  MANAGE_FULLFILLMENT_STATUS_LIST: type('[Orderfullfillment] fullfillment'),
  MANAGE_FULLFILLMENT_STATUS_LIST_SUCCESS: type('[Orderfullfillment] fullfillment Success'),
  MANAGE_FULLFILLMENT_STATUS_LIST_FAIL: type('[Orderfullfillment] fullfillment Fail'),

  /*subFullFuillmentStatus*/
  SUB_FULL_FILLMENT_STATUS: type('[Orderfullfillment] subFullFuillmentStatus'),
  SUB_FULL_FILLMENT_STATUS_SUCCESS: type('[Orderfullfillment] subFullFuillmentStatus Success'),
  SUB_FULL_FILLMENT_STATUS_FAIL: type('[Orderfullfillment] subFullFuillmentStatus Fail'),


  /*manageFullFillmentAdd*/
  MANAGE_FULL_FILLMENT_ADD: type('[Orderfullfillment] manageFullFillmentAdd'),
  MANAGE_FULL_FILLMENT_ADD_SUCCESS: type('[Orderfullfillment] manageFullFillmentAdd Success'),
  MANAGE_FULL_FILLMENT_ADD_FAIL: type('[Orderfullfillment] manageFullFillmentAdd Fail'),

  /*manageFullFillmentUpdate*/
  MANAGE_FULL_FILLMENT_UPDATE: type('[Orderfullfillment] manageFullFillmentUpdate'),
  MANAGE_FULL_FILLMENT_UPDATE_SUCCESS: type('[Orderfullfillment] manageFullFillmentUpdate Success'),
  MANAGE_FULL_FILLMENT_UPDATE_FAIL: type('[Orderfullfillment] manageFullFillmentUpdate Fail'),

  /*manageFullFillmentUpdateStatus*/
  MANAGE_FULL_FILLMENT_UPDATE_STATUS: type('[Orderfullfillment] manageFullFillmentUpdateStatus'),
  MANAGE_FULL_FILLMENT_UPDATE_STATUS_SUCCESS: type('[Orderfullfillment] manageFullFillmentUpdateStatus Success'),
  MANAGE_FULL_FILLMENT_UPDATE_STATUS_FAIL: type('[Orderfullfillment] manageFullFillmentUpdateStatus Fail'),


  /*manageFullFillmentDelete*/
  MANAGE_FULL_FILLMENT_DELETE: type('[Orderfullfillment] manageFullFillmentDelete'),
  MANAGE_FULL_FILLMENT_DELETE_SUCCESS: type('[Orderfullfillment] manageFullFillmentDelete Success'),
  MANAGE_FULL_FILLMENT_DELETE_FAIL: type('[Orderfullfillment] manageFullFillmentDelete Fail'),


  /*OrderfullfillmentlistCount*/
  ORDER_FULLFILLMENT_LIST_COUNT: type('[Orderfullfillment] OrderfullfillmentlistCount'),
  ORDER_FULLFILLMENT_LIST_COUNT_SUCCESS: type('[Orderfullfillment] OrderfullfillmentlistCount Success'),
  ORDER_FULLFILLMENT_LIST_COUNT_FAIL: type('[Orderfullfillment] OrderfullfillmentlistCount Fail'),

};

/*Order fullFillment List*/


export class OrderfullfillmentListAction implements Action {
  type = ActionTypes.ORDER_FULLFILLMENT_LIST;

  constructor(public payload: any) { }
}

export class OrderfullfillmentListSuccessAction implements Action {
  type = ActionTypes.ORDER_FULLFILLMENT_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class OrderfullfillmentListFailAction implements Action {
  type = ActionTypes.ORDER_FULLFILLMENT_LIST_FAIL;

  constructor(public payload: any = null) { }
}



export class addOrderfullfillmentAction implements Action {
  type = ActionTypes.ADD_ORDER_FULLFILLMENT;

  constructor(public payload: any) { }
}

export class addOrderfullfillmentSuccessAction implements Action {
  type = ActionTypes.ADD_ORDER_FULLFILLMENT_SUCCESS;

  constructor(public payload: any) { }
}

export class addOrderfullfillmentFailAction implements Action {
  type = ActionTypes.ADD_ORDER_FULLFILLMENT_FAIL;

  constructor(public payload: any = null) { }
}


/*Order fullFillment Status*/

export class orderfullfillmentstatusAction implements Action {
  type = ActionTypes.ORDER_FULLFILLMENT_STATUS;

  constructor(public payload: any) { }
}

export class orderfullfillmentstatusSuccessAction implements Action {
  type = ActionTypes.ORDER_FULLFILLMENT_STATUS_SUCCESS;

  constructor(public payload: any) { }
}

export class orderfullfillmentstatusFailAction implements Action {
  type = ActionTypes.ORDER_FULLFILLMENT_STATUS_FAIL;

  constructor(public payload: any = null) { }
}

/*Update Order fullFillment Status*/
export class updateOrderfullfillmentAction implements Action {
  type = ActionTypes.UPDATE_ORDER_FULLFILLMENT_STATUS;

  constructor(public payload: any) { }
}

export class updateOrderfullfillmentSuccessAction implements Action {
  type = ActionTypes.UPDATE_ORDER_FULLFILLMENT_STATUS_SUCCESS;

  constructor(public payload: any) { }
}

export class updateOrderfullfillmentFailAction implements Action {
  type = ActionTypes.UPDATE_ORDER_FULLFILLMENT_STATUS_FAIL;

  constructor(public payload: any = null) { }
}

/*Delete Order fullFillment Status*/
export class DeleteOrderfullfillmentAction implements Action {
  type = ActionTypes.DELETE_ORDER_FULLFILLMENT_STATUS;

  constructor(public payload: any) { }
}

export class DeleteOrderfullfillmentSuccessAction implements Action {
  type = ActionTypes.DELETE_ORDER_FULLFILLMENT_STATUS_SUCCESS;

  constructor(public payload: any) { }
}

export class DeleteOrderfullfillmentFailAction implements Action {
  type = ActionTypes.DELETE_ORDER_FULLFILLMENT_STATUS_FAIL;

  constructor(public payload: any = null) { }
}

/*MANAGE_FULLFILLMENT_STATUS_LIST*/
export class ManagefullfillmentListAction implements Action {
  type = ActionTypes.MANAGE_FULLFILLMENT_STATUS_LIST;

  constructor(public payload: any) { }
}

export class ManagefullfillmentListSuccessAction implements Action {
  type = ActionTypes.MANAGE_FULLFILLMENT_STATUS_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class ManagefullfillmentListFailAction implements Action {
  type = ActionTypes.MANAGE_FULLFILLMENT_STATUS_LIST_FAIL;

  constructor(public payload: any = null) { }
}

/*subFullFuillmentStatus*/
export class subFullFuillmentStatusAction implements Action {
  type = ActionTypes.SUB_FULL_FILLMENT_STATUS;

  constructor(public payload: any) { }
}

export class subFullFuillmentStatusSuccessAction implements Action {
  type = ActionTypes.SUB_FULL_FILLMENT_STATUS_SUCCESS;

  constructor(public payload: any) { }
}

export class subFullFuillmentStatusFailAction implements Action {
  type = ActionTypes.SUB_FULL_FILLMENT_STATUS_FAIL;

  constructor(public payload: any = null) { }
}

/*manageFullFillmentAdd*/
export class manageFullFillmentAddAction implements Action {
  type = ActionTypes.MANAGE_FULL_FILLMENT_ADD;

  constructor(public payload: any) { }
}

export class manageFullFillmentAddSuccessAction implements Action {
  type = ActionTypes.MANAGE_FULL_FILLMENT_ADD_SUCCESS;

  constructor(public payload: any) { }
}

export class manageFullFillmentAddFailAction implements Action {
  type = ActionTypes.MANAGE_FULL_FILLMENT_ADD_FAIL;

  constructor(public payload: any = null) { }
}


/*manageFullFillmentUpdate*/
export class manageFullFillmentUpdateAction implements Action {
  type = ActionTypes.MANAGE_FULL_FILLMENT_UPDATE;

  constructor(public payload: any) { }
}

export class manageFullFillmentUpdateSuccessAction implements Action {
  type = ActionTypes.MANAGE_FULL_FILLMENT_UPDATE_SUCCESS;

  constructor(public payload: any) { }
}

export class manageFullFillmentUpdateFailAction implements Action {
  type = ActionTypes.MANAGE_FULL_FILLMENT_UPDATE_FAIL;

  constructor(public payload: any = null) { }
}

/*manageFullFillmentUpdateStatus*/
export class manageFullFillmentUpdateStatusAction implements Action {
  type = ActionTypes.MANAGE_FULL_FILLMENT_UPDATE_STATUS;

  constructor(public payload: any) { }
}

export class manageFullFillmentUpdateStatusSuccessAction implements Action {
  type = ActionTypes.MANAGE_FULL_FILLMENT_UPDATE_STATUS_SUCCESS;

  constructor(public payload: any) { }
}

export class manageFullFillmentUpdateStatusFailAction implements Action {
  type = ActionTypes.MANAGE_FULL_FILLMENT_UPDATE_STATUS_FAIL;

  constructor(public payload: any = null) { }
}

/*manageFullFillmentDelete*/
export class manageFullFillmentDeleteAction implements Action {
  type = ActionTypes.MANAGE_FULL_FILLMENT_DELETE;

  constructor(public payload: any) { }
}

export class manageFullFillmentDeleteSuccessAction implements Action {
  type = ActionTypes.MANAGE_FULL_FILLMENT_DELETE_SUCCESS;

  constructor(public payload: any) { }
}

export class manageFullFillmentDeleteFailAction implements Action {
  type = ActionTypes.MANAGE_FULL_FILLMENT_DELETE_FAIL;

  constructor(public payload: any = null) { }
}


/*OrderfullfillmentlistCount*/
export class OrderfullfillmentlistCountAction implements Action {
  type = ActionTypes.ORDER_FULLFILLMENT_LIST_COUNT;

  constructor(public payload: any) { }
}

export class OrderfullfillmentlistCountSuccessAction implements Action {
  type = ActionTypes.ORDER_FULLFILLMENT_LIST_COUNT_SUCCESS;

  constructor(public payload: any) { }
}

export class OrderfullfillmentlistCountFailAction implements Action {
  type = ActionTypes.ORDER_FULLFILLMENT_LIST_COUNT_FAIL;

  constructor(public payload: any = null) { }
}

export type Actions =
  | OrderfullfillmentListAction
  | OrderfullfillmentListSuccessAction
  | OrderfullfillmentListFailAction
  | addOrderfullfillmentAction
  | addOrderfullfillmentSuccessAction
  | addOrderfullfillmentFailAction
  | orderfullfillmentstatusAction
  | orderfullfillmentstatusSuccessAction
  | orderfullfillmentstatusFailAction
  | updateOrderfullfillmentAction
  | updateOrderfullfillmentSuccessAction
  | updateOrderfullfillmentFailAction
  | ManagefullfillmentListAction
  | ManagefullfillmentListSuccessAction
  | ManagefullfillmentListFailAction
  | subFullFuillmentStatusAction
  | subFullFuillmentStatusSuccessAction
  | subFullFuillmentStatusFailAction
  | manageFullFillmentAddAction
  | manageFullFillmentAddSuccessAction
  | manageFullFillmentAddFailAction
  | manageFullFillmentUpdateAction
  | manageFullFillmentUpdateSuccessAction
  | manageFullFillmentUpdateFailAction
  | manageFullFillmentUpdateStatusAction
  | manageFullFillmentUpdateStatusSuccessAction
  | manageFullFillmentUpdateStatusFailAction
  | manageFullFillmentDeleteAction
  | manageFullFillmentDeleteSuccessAction
  | manageFullFillmentDeleteFailAction
  | OrderfullfillmentlistCountAction
  | OrderfullfillmentlistCountSuccessAction
  | OrderfullfillmentlistCountFailAction;

