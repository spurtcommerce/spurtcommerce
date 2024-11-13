/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { F } from '@angular/cdk/keycodes';
import { Map, Record } from 'immutable';

export interface PaymentState extends Map<string, any> {
  excelLoading:boolean;
  paymentList: any;
  paymentListLoading: boolean;
  paymentListLoaded: boolean;
  paymentListFailed: boolean;

  paymentListCount: number;
  paymentListCountLoading: boolean;
  paymentListCountLoaded: boolean;
  paymentListCountFailed: boolean;

  paymentDetail: any;
  paymentDetailLoading: boolean;
  paymentDetailLoaded: boolean;
  paymentDetailFailed: boolean;


  paymentDashboardCount: any;
  paymentDashboardCountLoading: boolean;
  paymentDashboardCountLoaded: boolean;
  paymentDashboardCountFailed: boolean;

  invoiceDetail: any;
  invoiceDetailLoading: boolean;
  invoiceDetailLoaded: boolean;
  invoiceDetailFailed: boolean;
}

export const PaymentRecord = Record({

  excelLoading:false,
  paymentList: [],
  paymentListLoading: false,
  paymentListLoaded: false,
  paymentListFailed: false,

  paymentListCount: 0,
  paymentListCountLoading: false,
  paymentListCountLoaded: false,
  paymentListCountFailed: false,

  paymentDetail: [],
  paymentDetailLoading: false,
  paymentDetailLoaded: false,
  paymentDetailFailed: false,

  paymentDashboardCount: {},
  paymentDashboardCountLoading: false,
  paymentDashboardCountLoaded: false,
  paymentDashboardCountFailed: false,


  invoiceDetail: false,
  invoiceDetailLoading: false,
  invoiceDetailLoaded: false,
  invoiceDetailFailed: false,

});
