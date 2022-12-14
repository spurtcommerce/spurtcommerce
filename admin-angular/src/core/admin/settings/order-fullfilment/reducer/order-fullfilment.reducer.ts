/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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
        OrderfullfillmentListActionLoading: true,
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