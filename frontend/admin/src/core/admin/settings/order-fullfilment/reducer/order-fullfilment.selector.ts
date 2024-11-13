/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { AppState } from '../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromOrderfullfillment from '../reducer/order-fullfilment.reducer';

export const getOrderfullfillmentState = (state: AppState) => state.Orderfullfillment;

/*Order fullFillment List*/

export const Orderfullfillmentlist = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.Orderfullfillmentlist
);

export const OrderfullfillmentlistLoading = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.OrderfullfillmentlistLoading
);
export const OrderfullfillmentlistLoaded = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.OrderfullfillmentlistLoaded
);
export const OrderfullfillmentlistFailed = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.OrderfullfillmentlistFailed
);





export const addOrderfullfillment = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.addOrderfullfillment
);

export const addOrderfullfillmentLoading = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.addOrderfullfillmentLoading
);
export const addOrderfullfillmentLoaded = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.addOrderfullfillmentLoaded
);
export const addOrderfullfillmentFailed = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.addOrderfullfillmentFailed
);

/*Order fullFillment Status*/

export const orderfullfillmentstatus = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.orderfullfillmentstatus
);

export const orderfullfillmentstatusLoading = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.orderfullfillmentstatusLoading
);
export const orderfullfillmentstatusLoaded = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.orderfullfillmentstatusLoaded
);
export const orderfullfillmentstatusFailed = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.orderfullfillmentstatusFailed
);

/*Update Order fullFillment Status*/
export const updateOrderfullfillment = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.updateOrderfullfillment
);

export const updateOrderfullfillmentLoading = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.updateOrderfullfillmentLoading
);
export const updateOrderfullfillmentLoaded = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.updateOrderfullfillmentLoaded
);
export const updateOrderfullfillmentFailed = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.updateOrderfullfillmentFailed
);

/*Delete Order fullFillment Status*/
export const DeleteOrderfullfillment = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.DeleteOrderfullfillment
);

export const DeleteOrderfullfillmentLoading = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.DeleteOrderfullfillmentLoading
);
export const DeleteOrderfullfillmentLoaded = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.DeleteOrderfullfillmentLoaded
);
export const DeleteOrderfullfillmentFailed = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.DeleteOrderfullfillmentFailed
);

 /*MANAGE_FULLFILLMENT_STATUS_LIST*/
export const ManagefullfillmentList = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.ManagefullfillmentList
);

export const ManagefullfillmentListLoading = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.ManagefullfillmentListLoading
);
export const ManagefullfillmentListLoaded = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.ManagefullfillmentListLoaded
);
export const ManagefullfillmentListFailed = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.ManagefullfillmentListFailed
);

 /*subFullFuillmentStatus*/
 export const subFullFuillmentStatus = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.subFullFuillmentStatus
);

export const subFullFuillmentStatusLoading = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.subFullFuillmentStatusLoading
);
export const subFullFuillmentStatusLoaded = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.subFullFuillmentStatusLoaded
);
export const subFullFuillmentStatusFailed = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.subFullFuillmentStatusFailed
);

 /*manageFullFillmentAdd*/
 export const manageFullFillmentAdd = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.manageFullFillmentAdd
);

export const manageFullFillmentAddLoading = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.manageFullFillmentAddLoading
);
export const manageFullFillmentAddLoaded = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.manageFullFillmentAddLoaded
);
export const manageFullFillmentAddFailed = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.manageFullFillmentAddFailed
);


 /*manageFullFillmentUpdate*/
 export const manageFullFillmentUpdate = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.manageFullFillmentUpdate
);

export const manageFullFillmentUpdateLoading = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.manageFullFillmentUpdateLoading
);
export const manageFullFillmentUpdateLoaded = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.manageFullFillmentUpdateLoaded
);
export const manageFullFillmentUpdateFailed = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.manageFullFillmentUpdateFailed
);

 /*manageFullFillmentUpdateStatus*/
 export const manageFullFillmentUpdateStatus = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.manageFullFillmentUpdateStatus
);

export const manageFullFillmentUpdateStatusLoading = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.manageFullFillmentUpdateStatusLoading
);
export const manageFullFillmentUpdateStatusLoaded = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.manageFullFillmentUpdateStatusLoaded
);
export const manageFullFillmentUpdateStatusFailed = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.manageFullFillmentUpdateStatusFailed
);


 /*manageFullFillmentDelete*/
 export const manageFullFillmentDelete = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.manageFullFillmentDelete
);

export const manageFullFillmentDeleteLoading = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.manageFullFillmentDeleteLoading
);
export const manageFullFillmentDeleteLoaded = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.manageFullFillmentDeleteLoaded
);
export const manageFullFillmentDeleteFailed = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.manageFullFillmentDeleteFailed
);

 /*OrderfullfillmentlistCount*/
 export const OrderfullfillmentlistCount = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.OrderfullfillmentlistCount
);

export const OrderfullfillmentlistCountLoading = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.OrderfullfillmentlistCountLoading
);
export const OrderfullfillmentlistCountLoaded = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.OrderfullfillmentlistCountLoaded
);
export const OrderfullfillmentlistCountFailed = createSelector(
  getOrderfullfillmentState,
  fromOrderfullfillment.OrderfullfillmentlistCountFailed
);