/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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

});
