/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface OrderfullfillmentState extends Map<string, any> {

   /*Order fullFillment List*/

   Orderfullfillmentlist: any;
   OrderfullfillmentlistLoading: boolean;
   OrderfullfillmentlistLoaded: boolean;
   OrderfullfillmentlistFailed: boolean;

   addOrderfullfillment: any;
   addOrderfullfillmentLoading: boolean;
   addOrderfullfillmentLoaded: boolean;
   addOrderfullfillmentFailed: boolean;


   /*Order fullFillment Status*/

   orderfullfillmentstatus: any;
   orderfullfillmentstatusLoading: boolean;
   orderfullfillmentstatusLoaded: boolean;
   orderfullfillmentstatusFailed: boolean;

   /*Update Order fullFillment Status*/


   updateOrderfullfillment: any;
   updateOrderfullfillmentLoading: boolean;
   updateOrderfullfillmentLoaded: boolean;
   updateOrderfullfillmentFailed: boolean;

   DeleteOrderfullfillment: any;
   DeleteOrderfullfillmentLoading: boolean;
   DeleteOrderfullfillmentLoaded: boolean;
   DeleteOrderfullfillmentFailed: boolean;

   /*MANAGE_FULLFILLMENT_STATUS_LIST*/
   ManagefullfillmentList: any;
   ManagefullfillmentListLoading: boolean;
   ManagefullfillmentListLoaded: boolean;
   ManagefullfillmentListFailed: boolean;

   /*subFullFuillmentStatus*/
   subFullFuillmentStatus: any;
   subFullFuillmentStatusLoading: boolean;
   subFullFuillmentStatusLoaded: boolean;
   subFullFuillmentStatusFailed: boolean;

   /*manageFullFillmentAdd*/
   manageFullFillmentAdd: any;
   manageFullFillmentAddLoading: boolean;
   manageFullFillmentAddLoaded: boolean;
   manageFullFillmentAddFailed: boolean;

   /*manageFullFillmentUpdate*/
   manageFullFillmentUpdate: any;
   manageFullFillmentUpdateLoading: boolean;
   manageFullFillmentUpdateLoaded: boolean;
   manageFullFillmentUpdateFailed: boolean;


   /*manageFullFillmentUpdateStatus*/
   manageFullFillmentUpdateStatus: any;
   manageFullFillmentUpdateStatusLoading: boolean;
   manageFullFillmentUpdateStatusLoaded: boolean;
   manageFullFillmentUpdateStatusFailed: boolean;


   /*manageFullFillmentDelete*/
   manageFullFillmentDelete: any;
   manageFullFillmentDeleteLoading: boolean;
   manageFullFillmentDeleteLoaded: boolean;
   manageFullFillmentDeleteFailed: boolean;

   /*OrderfullfillmentlistCount*/
   OrderfullfillmentlistCount: any;
   OrderfullfillmentlistCountLoading: boolean;
   OrderfullfillmentlistCountLoaded: boolean;
   OrderfullfillmentlistCountFailed: boolean;

}

export const OrderfullfillmentRecordState = Record({

   /*Order fullFillment List*/

   Orderfullfillmentlist: {},
   OrderfullfillmentlistLoading: false,
   OrderfullfillmentlistLoaded: false,
   OrderfullfillmentlistFailed: false,

   addOrderfullfillment: {},
   addOrderfullfillmentLoading: false,
   addOrderfullfillmentLoaded: false,
   addOrderfullfillmentFailed: false,

   /*Order fullFillment Status*/

   updateOrderfullfillment: {},
   updateOrderfullfillmentLoading: false,
   updateOrderfullfillmentLoaded: false,
   updateOrderfullfillmentFailed: false,

   DeleteOrderfullfillment: {},
   DeleteOrderfullfillmentLoading: false,
   DeleteOrderfullfillmentLoaded: false,
   DeleteOrderfullfillmentFailed: false,

   /*MANAGE_FULLFILLMENT_STATUS_LIST*/
   ManagefullfillmentList: {},
   ManagefullfillmentListLoading: false,
   ManagefullfillmentListLoaded: false,
   ManagefullfillmentListFailed: false,

   /*subFullFuillmentStatus*/
   subFullFuillmentStatus: {},
   subFullFuillmentStatusLoading: false,
   subFullFuillmentStatusLoaded: false,
   subFullFuillmentStatusFailed: false,

   /*manageFullFillmentAdd*/
   manageFullFillmentAdd: {},
   manageFullFillmentAddLoading: false,
   manageFullFillmentAddLoaded: false,
   manageFullFillmentAddFailed: false,

   /*manageFullFillmentUpdate*/
   manageFullFillmentUpdate: {},
   manageFullFillmentUpdateLoading: false,
   manageFullFillmentUpdateLoaded: false,
   manageFullFillmentUpdateFailed: false,

   /*manageFullFillmentUpdateStatus*/
   manageFullFillmentUpdateStatus: {},
   manageFullFillmentUpdateStatusLoading: false,
   manageFullFillmentUpdateStatusLoaded: false,
   manageFullFillmentUpdateStatusFailed: false,

   /*manageFullFillmentDelete*/
   manageFullFillmentDelete: {},
   manageFullFillmentDeleteLoading: false,
   manageFullFillmentDeleteLoaded: false,
   manageFullFillmentDeleteFailed: false,

   /*OrderfullfillmentlistCount*/
   OrderfullfillmentlistCount: {},
   OrderfullfillmentlistCountLoading: false,
   OrderfullfillmentlistCountLoaded: false,
   OrderfullfillmentlistCountFailed: false,
});
