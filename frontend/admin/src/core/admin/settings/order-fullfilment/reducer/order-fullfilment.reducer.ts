/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../action/order-fullfilment.action';
import { OrderfullfillmentRecordState, OrderfullfillmentState } from '../reducer/order-fullfilment.state';

export const initialState: OrderfullfillmentState = new OrderfullfillmentRecordState() as unknown as OrderfullfillmentState;

export function reducer(
  state = initialState,
  { type, payload }: any
): OrderfullfillmentState {
  if (!type) {
    return state;
  }

  switch (type) {

    /*Order fullFillment List*/

    case actions.ActionTypes.ORDER_FULLFILLMENT_LIST: {
      return Object.assign({}, state, {
        OrderfullfillmentList: [],
        OrderfullfillmentlistLoading: true,
        OrderfullfillmentListActionLoaded: false,
        OrderfullfillmentListActionFailed: false
      });
    }

    case actions.ActionTypes.ORDER_FULLFILLMENT_LIST_SUCCESS: {

      return Object.assign({}, state, {
        Orderfullfillmentlist: payload.data,
        OrderfullfillmentlistLoading: false,
        OrderfullfillmentlistLoaded: true,
        OrderfullfillmentlistFailed: false
      });
    }

    case actions.ActionTypes.ORDER_FULLFILLMENT_LIST_FAIL: {
      return Object.assign({}, state, {
        Orderfullfillmentlist: false,
        OrderfullfillmentlistLoading: false,
        OrderfullfillmentlistLoaded: true,
        OrderfullfillmentlistFailed: true
      });
    }



    case actions.ActionTypes.ADD_ORDER_FULLFILLMENT: {
      return Object.assign({}, state, {
        addOrderfullfillment: [],
        addOrderfullfillmentActionLoading: true,
        addOrderfullfillmentActionLoaded: false,
        addOrderfullfillmentActionFailed: false
      });
    }

    case actions.ActionTypes.ADD_ORDER_FULLFILLMENT_SUCCESS: {

      return Object.assign({}, state, {
        addOrderfullfillment: payload,
        addOrderfullfillmentLoading: false,
        addOrderfullfillmentLoaded: true,
        addOrderfullfillmentFailed: false
      });
    }

    case actions.ActionTypes.ADD_ORDER_FULLFILLMENT_FAIL: {
      return Object.assign({}, state, {
        addOrderfullfillment: false,
        addOrderfullfillmentLoading: false,
        addOrderfullfillmentLoaded: true,
        addOrderfullfillmentFailed: true
      });
    }


    /*Order fullFillment Status*/

    case actions.ActionTypes.ORDER_FULLFILLMENT_STATUS: {
      return Object.assign({}, state, {
        orderfullfillmentstatus: [],
        orderfullfillmentstatusActionLoading: true,
        orderfullfillmentstatusActionLoaded: false,
        orderfullfillmentstatusActionFailed: false
      });
    }

    case actions.ActionTypes.ORDER_FULLFILLMENT_STATUS_SUCCESS: {

      return Object.assign({}, state, {
        orderfullfillmentstatus: payload.data,
        orderfullfillmentstatusLoading: false,
        orderfullfillmentstatusLoaded: true,
        orderfullfillmentstatusFailed: false
      });
    }

    case actions.ActionTypes.ORDER_FULLFILLMENT_STATUS_FAIL: {
      return Object.assign({}, state, {
        orderfullfillmentstatus: false,
        orderfullfillmentstatusLoading: false,
        orderfullfillmentstatusLoaded: true,
        orderfullfillmentstatusFailed: true
      });
    }

    /*Update Order fullFillment Status*/

    case actions.ActionTypes.UPDATE_ORDER_FULLFILLMENT_STATUS: {
      return Object.assign({}, state, {
        updateOrderfullfillment: [],
        updateOrderfullfillmentActionLoading: true,
        updateOrderfullfillmentActionLoaded: false,
        updateOrderfullfillmentActionFailed: false
      });
    }

    case actions.ActionTypes.UPDATE_ORDER_FULLFILLMENT_STATUS_SUCCESS: {

      return Object.assign({}, state, {
        updateOrderfullfillment: payload,
        updateOrderfullfillmentLoading: false,
        updateOrderfullfillmentLoaded: true,
        updateOrderfullfillmentFailed: false
      });
    }

    case actions.ActionTypes.UPDATE_ORDER_FULLFILLMENT_STATUS_FAIL: {
      return Object.assign({}, state, {
        updateOrderfullfillment: false,
        updateOrderfullfillmentLoading: false,
        updateOrderfullfillmentLoaded: true,
        updateOrderfullfillmentFailed: true
      });
    }


    /*Delete Order fullFillment List*/

    case actions.ActionTypes.DELETE_ORDER_FULLFILLMENT_STATUS: {
      return Object.assign({}, state, {
        DeleteOrderfullfillment: [],
        DeleteOrderfullfillmentLoading: true,
        DeleteOrderfullfillmentActionLoaded: false,
        DeleteOrderfullfillmentActionFailed: false
      });
    }

    case actions.ActionTypes.DELETE_ORDER_FULLFILLMENT_STATUS_SUCCESS: {

      return Object.assign({}, state, {
        DeleteOrderfullfillment: payload,
        DeleteOrderfullfillmentLoading: false,
        DeleteOrderfullfillmentLoaded: true,
        DeleteOrderfullfillmentFailed: false
      });
    }

    case actions.ActionTypes.DELETE_ORDER_FULLFILLMENT_STATUS_FAIL: {
      return Object.assign({}, state, {
        DeleteOrderfullfillment: false,
        DeleteOrderfullfillmentLoading: false,
        DeleteOrderfullfillmentLoaded: true,
        DeleteOrderfullfillmentFailed: true
      });
    }

    /*MANAGE_FULLFILLMENT_STATUS_LIST*/

    case actions.ActionTypes.MANAGE_FULLFILLMENT_STATUS_LIST: {
      return Object.assign({}, state, {
        ManagefullfillmentList: [],
        ManagefullfillmentListLoading: true,
        ManagefullfillmentListActionLoaded: false,
        ManagefullfillmentListActionFailed: false
      });
    }

    case actions.ActionTypes.MANAGE_FULLFILLMENT_STATUS_LIST_SUCCESS: {

      return Object.assign({}, state, {
        ManagefullfillmentList: payload.data,
        ManagefullfillmentListLoading: false,
        ManagefullfillmentListLoaded: true,
        ManagefullfillmentListFailed: false
      });
    }

    case actions.ActionTypes.MANAGE_FULLFILLMENT_STATUS_LIST_FAIL: {
      return Object.assign({}, state, {
        ManagefullfillmentList: false,
        ManagefullfillmentListLoading: false,
        ManagefullfillmentListLoaded: true,
        ManagefullfillmentListFailed: true
      });
    }

    /*subFullFuillmentStatus*/

    case actions.ActionTypes.SUB_FULL_FILLMENT_STATUS: {
      return Object.assign({}, state, {
        subFullFuillmentStatus: [],
        subFullFuillmentStatusLoading: true,
        subFullFuillmentStatusActionLoaded: false,
        subFullFuillmentStatusActionFailed: false
      });
    }

    case actions.ActionTypes.SUB_FULL_FILLMENT_STATUS_SUCCESS: {

      return Object.assign({}, state, {
        subFullFuillmentStatus: payload.data,
        subFullFuillmentStatusLoading: false,
        subFullFuillmentStatusLoaded: true,
        subFullFuillmentStatusFailed: false
      });
    }

    case actions.ActionTypes.SUB_FULL_FILLMENT_STATUS_FAIL: {
      return Object.assign({}, state, {
        subFullFuillmentStatus: false,
        subFullFuillmentStatusLoading: false,
        subFullFuillmentStatusLoaded: true,
        subFullFuillmentStatusFailed: true
      });
    }



    /*manageFullFillmentAdd*/

    case actions.ActionTypes.MANAGE_FULL_FILLMENT_ADD: {
      return Object.assign({}, state, {
        manageFullFillmentAdd: [],
        manageFullFillmentAddLoading: true,
        manageFullFillmentAddActionLoaded: false,
        manageFullFillmentAddActionFailed: false
      });
    }

    case actions.ActionTypes.MANAGE_FULL_FILLMENT_ADD_SUCCESS: {

      return Object.assign({}, state, {
        manageFullFillmentAdd: payload,
        manageFullFillmentAddLoading: false,
        manageFullFillmentAddLoaded: true,
        manageFullFillmentAddFailed: false
      });
    }

    case actions.ActionTypes.MANAGE_FULL_FILLMENT_ADD_FAIL: {
      return Object.assign({}, state, {
        manageFullFillmentAdd: false,
        manageFullFillmentAddLoading: false,
        manageFullFillmentAddLoaded: true,
        manageFullFillmentAddFailed: true
      });
    }

    /*manageFullFillmentUpdate*/

    case actions.ActionTypes.MANAGE_FULL_FILLMENT_UPDATE: {
      return Object.assign({}, state, {
        manageFullFillmentUpdate: [],
        manageFullFillmentUpdateLoading: true,
        manageFullFillmentUpdateActionLoaded: false,
        manageFullFillmentUpdateActionFailed: false
      });
    }

    case actions.ActionTypes.MANAGE_FULL_FILLMENT_UPDATE_SUCCESS: {

      return Object.assign({}, state, {
        manageFullFillmentUpdate: payload,
        manageFullFillmentUpdateLoading: false,
        manageFullFillmentUpdateLoaded: true,
        manageFullFillmentUpdateFailed: false
      });
    }

    case actions.ActionTypes.MANAGE_FULL_FILLMENT_UPDATE_FAIL: {
      return Object.assign({}, state, {
        manageFullFillmentUpdate: false,
        manageFullFillmentUpdateLoading: false,
        manageFullFillmentUpdateLoaded: true,
        manageFullFillmentUpdateFailed: true
      });
    }

    /*manageFullFillmentUpdateStatus*/

    case actions.ActionTypes.MANAGE_FULL_FILLMENT_UPDATE_STATUS: {
      return Object.assign({}, state, {
        manageFullFillmentUpdateStatus: [],
        manageFullFillmentUpdateStatusLoading: true,
        manageFullFillmentUpdateStatusActionLoaded: false,
        manageFullFillmentUpdateStatusActionFailed: false
      });
    }

    case actions.ActionTypes.MANAGE_FULL_FILLMENT_UPDATE_STATUS_SUCCESS: {

      return Object.assign({}, state, {
        manageFullFillmentUpdateStatus: payload,
        manageFullFillmentUpdateStatusLoading: false,
        manageFullFillmentUpdateStatusLoaded: true,
        manageFullFillmentUpdateStatusFailed: false
      });
    }

    case actions.ActionTypes.MANAGE_FULL_FILLMENT_UPDATE_STATUS_FAIL: {
      return Object.assign({}, state, {
        manageFullFillmentUpdateStatus: false,
        manageFullFillmentUpdateStatusLoading: false,
        manageFullFillmentUpdateStatusLoaded: true,
        manageFullFillmentUpdateStatusFailed: true
      });
    }

    /*manageFullFillmentDelete*/

    case actions.ActionTypes.MANAGE_FULL_FILLMENT_DELETE: {
      return Object.assign({}, state, {
        manageFullFillmentDelete: [],
        manageFullFillmentDeleteLoading: true,
        manageFullFillmentDeleteActionLoaded: false,
        manageFullFillmentDeleteActionFailed: false
      });
    }

    case actions.ActionTypes.MANAGE_FULL_FILLMENT_DELETE_SUCCESS: {

      return Object.assign({}, state, {
        manageFullFillmentDelete: payload,
        manageFullFillmentDeleteLoading: false,
        manageFullFillmentDeleteLoaded: true,
        manageFullFillmentDeleteFailed: false
      });
    }

    case actions.ActionTypes.MANAGE_FULL_FILLMENT_DELETE_FAIL: {
      return Object.assign({}, state, {
        manageFullFillmentDelete: false,
        manageFullFillmentDeleteLoading: false,
        manageFullFillmentDeleteLoaded: true,
        manageFullFillmentDeleteFailed: true
      });
    }

    /*OrderfullfillmentlistCount*/

    case actions.ActionTypes.ORDER_FULLFILLMENT_LIST_COUNT: {
      return Object.assign({}, state, {
        OrderfullfillmentlistCount: [],
        OrderfullfillmentlistCountLoading: true,
        OrderfullfillmentlistCountActionLoaded: false,
        OrderfullfillmentlistCountActionFailed: false
      });
    }

    case actions.ActionTypes.ORDER_FULLFILLMENT_LIST_COUNT_SUCCESS: {

      return Object.assign({}, state, {
        OrderfullfillmentlistCount: payload,
        OrderfullfillmentlistCountLoading: false,
        OrderfullfillmentlistCountLoaded: true,
        OrderfullfillmentlistCountFailed: false
      });
    }

    case actions.ActionTypes.ORDER_FULLFILLMENT_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        OrderfullfillmentlistCount: false,
        OrderfullfillmentlistCountLoading: false,
        OrderfullfillmentlistCountLoaded: true,
        OrderfullfillmentlistCountFailed: true
      });
    }

    default: {
      return state;
    }
  }
}

/*Order fullFillment List*/


export const Orderfullfillmentlist = (state: OrderfullfillmentState) => state.Orderfullfillmentlist;
export const OrderfullfillmentlistLoading = (state: OrderfullfillmentState) => state.OrderfullfillmentlistLoading;
export const OrderfullfillmentlistLoaded = (state: OrderfullfillmentState) => state.OrderfullfillmentlistLoaded;
export const OrderfullfillmentlistFailed = (state: OrderfullfillmentState) => state.OrderfullfillmentlistFailed;



export const addOrderfullfillment = (state: OrderfullfillmentState) => state.addOrderfullfillment;
export const addOrderfullfillmentLoading = (state: OrderfullfillmentState) => state.addOrderfullfillmentLoading;
export const addOrderfullfillmentLoaded = (state: OrderfullfillmentState) => state.addOrderfullfillmentLoaded;
export const addOrderfullfillmentFailed = (state: OrderfullfillmentState) => state.addOrderfullfillmentFailed;

/*Order fullFillment Status*/

export const orderfullfillmentstatus = (state: OrderfullfillmentState) => state.orderfullfillmentstatus;
export const orderfullfillmentstatusLoading = (state: OrderfullfillmentState) => state.orderfullfillmentstatusLoading;
export const orderfullfillmentstatusLoaded = (state: OrderfullfillmentState) => state.orderfullfillmentstatusLoaded;
export const orderfullfillmentstatusFailed = (state: OrderfullfillmentState) => state.orderfullfillmentstatusFailed;

/*Update Order fullFillment Status*/

export const updateOrderfullfillment = (state: OrderfullfillmentState) => state.updateOrderfullfillment;
export const updateOrderfullfillmentLoading = (state: OrderfullfillmentState) => state.updateOrderfullfillmentLoading;
export const updateOrderfullfillmentLoaded = (state: OrderfullfillmentState) => state.updateOrderfullfillmentLoaded;
export const updateOrderfullfillmentFailed = (state: OrderfullfillmentState) => state.updateOrderfullfillmentFailed;

export const DeleteOrderfullfillment = (state: OrderfullfillmentState) => state.DeleteOrderfullfillment;
export const DeleteOrderfullfillmentLoading = (state: OrderfullfillmentState) => state.DeleteOrderfullfillmentLoading;
export const DeleteOrderfullfillmentLoaded = (state: OrderfullfillmentState) => state.DeleteOrderfullfillmentLoaded;
export const DeleteOrderfullfillmentFailed = (state: OrderfullfillmentState) => state.DeleteOrderfullfillmentFailed;

/*MANAGE_FULLFILLMENT_STATUS_LIST*/

export const ManagefullfillmentList = (state: OrderfullfillmentState) => state.ManagefullfillmentList;
export const ManagefullfillmentListLoading = (state: OrderfullfillmentState) => state.ManagefullfillmentListLoading;
export const ManagefullfillmentListLoaded = (state: OrderfullfillmentState) => state.ManagefullfillmentListLoaded;
export const ManagefullfillmentListFailed = (state: OrderfullfillmentState) => state.ManagefullfillmentListFailed;

/*subFullFuillmentStatus*/
export const subFullFuillmentStatus = (state: OrderfullfillmentState) => state.subFullFuillmentStatus;
export const subFullFuillmentStatusLoading = (state: OrderfullfillmentState) => state.subFullFuillmentStatusLoading;
export const subFullFuillmentStatusLoaded = (state: OrderfullfillmentState) => state.subFullFuillmentStatusLoaded;
export const subFullFuillmentStatusFailed = (state: OrderfullfillmentState) => state.subFullFuillmentStatusFailed;


/*manageFullFillmentAdd*/
export const manageFullFillmentAdd = (state: OrderfullfillmentState) => state.manageFullFillmentAdd;
export const manageFullFillmentAddLoading = (state: OrderfullfillmentState) => state.manageFullFillmentAddLoading;
export const manageFullFillmentAddLoaded = (state: OrderfullfillmentState) => state.manageFullFillmentAddLoaded;
export const manageFullFillmentAddFailed = (state: OrderfullfillmentState) => state.manageFullFillmentAddFailed;

/*manageFullFillmentUpdate*/
export const manageFullFillmentUpdate = (state: OrderfullfillmentState) => state.manageFullFillmentUpdate;
export const manageFullFillmentUpdateLoading = (state: OrderfullfillmentState) => state.manageFullFillmentUpdateLoading;
export const manageFullFillmentUpdateLoaded = (state: OrderfullfillmentState) => state.manageFullFillmentUpdateLoaded;
export const manageFullFillmentUpdateFailed = (state: OrderfullfillmentState) => state.manageFullFillmentUpdateFailed;

/*manageFullFillmentUpdateStatus*/
export const manageFullFillmentUpdateStatus = (state: OrderfullfillmentState) => state.manageFullFillmentUpdateStatus;
export const manageFullFillmentUpdateStatusLoading = (state: OrderfullfillmentState) => state.manageFullFillmentUpdateStatusLoading;
export const manageFullFillmentUpdateStatusLoaded = (state: OrderfullfillmentState) => state.manageFullFillmentUpdateStatusLoaded;
export const manageFullFillmentUpdateStatusFailed = (state: OrderfullfillmentState) => state.manageFullFillmentUpdateStatusFailed;


/*manageFullFillmentDelete*/
export const manageFullFillmentDelete = (state: OrderfullfillmentState) => state.manageFullFillmentDelete;
export const manageFullFillmentDeleteLoading = (state: OrderfullfillmentState) => state.manageFullFillmentDeleteLoading;
export const manageFullFillmentDeleteLoaded = (state: OrderfullfillmentState) => state.manageFullFillmentDeleteLoaded;
export const manageFullFillmentDeleteFailed = (state: OrderfullfillmentState) => state.manageFullFillmentDeleteFailed;

/*OrderfullfillmentlistCount*/
export const OrderfullfillmentlistCount = (state: OrderfullfillmentState) => state.OrderfullfillmentlistCount;
export const OrderfullfillmentlistCountLoading = (state: OrderfullfillmentState) => state.OrderfullfillmentlistCountLoading;
export const OrderfullfillmentlistCountLoaded = (state: OrderfullfillmentState) => state.OrderfullfillmentlistCountLoaded;
export const OrderfullfillmentlistCountFailed = (state: OrderfullfillmentState) => state.OrderfullfillmentlistCountFailed;