/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Action } from '@ngrx/store';
import { type } from '../../../shared/utility/utilityHelpers';

export const ActionTypes = {

  ARCHIVE_PAYMENT_LIST: type('[Archive-Payment] Archive Payment List'),
  ARCHIVE_PAYMENT_LIST_SUCCESS: type('[Archive-Payment] Archive Payment List success'),
  ARCHIVE_PAYMENT_LIST_FAIL: type('[Archive-Payment]Get Archive Payment List Fail'),

  ARCHIVE_PAYMENT_LIST_COUNT: type('[Archive-Payment] Archive Payment List Count'),
  ARCHIVE_PAYMENT_LIST_COUNT_SUCCESS: type('[Archive-Payment] Archive Payment List Count success'),
  ARCHIVE_PAYMENT_LIST_COUNT_FAIL: type('[Archive-Payment] Archive Payment List Count Fail'),

  EXPORT_ARCHIVE_PAYMENT: type('[Cancel-Order] Export Archive Payment'),
  EXPORT_ARCHIVE_PAYMENT_SUCCESS: type('[Cancel-Order] Export Archive Payment success'),
  EXPORT_ARCHIVE_PAYMENT_FAIL: type('[Cancel-Order] Export Archive Payment Fail'),

  EXPORT_ALL_ARCHIVE_PAYMENT: type('[Cancel-Order] Export All Archive Payment'),
  EXPORT_ALL_ARCHIVE_PAYMENT_SUCCESS: type('[Cancel-Order] Export All Archive Payment success'),
  EXPORT_ALL_ARCHIVE_PAYMENT_FAIL: type('[Cancel-Order] Export All Archive Payment Fail'),

};

// Archive Payments List

export class ArchivePaymentListAction implements Action {
  type = ActionTypes.ARCHIVE_PAYMENT_LIST;
  constructor(public payload: any) {}
}

export class ArchivePaymentListSuccess implements Action {
  type = ActionTypes.ARCHIVE_PAYMENT_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class ArchivePaymentListFail implements Action {
  type = ActionTypes.EXPORT_ARCHIVE_PAYMENT_FAIL;
  constructor(public payload: any = null) {}
}

// Archive Payments List Count

export class ArchivePaymentListCountAction implements Action {
  type = ActionTypes.ARCHIVE_PAYMENT_LIST_COUNT;
  constructor(public payload: any) {}
}

export class ArchivePaymentListCountSuccess implements Action {
  type = ActionTypes.ARCHIVE_PAYMENT_LIST_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class ArchivePaymentListCountFail implements Action {
  type = ActionTypes.ARCHIVE_PAYMENT_LIST_COUNT_FAIL;
  constructor(public payload: any = null) {}
}

// export archive payment

export class ExportArchivePaymentAction implements Action {
  type = ActionTypes.EXPORT_ARCHIVE_PAYMENT;
  constructor(public payload: any) {}
}

export class ExportArchivePaymentSuccess implements Action {
  type = ActionTypes.EXPORT_ARCHIVE_PAYMENT_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportArchivePaymentFail implements Action {
  type = ActionTypes.EXPORT_ARCHIVE_PAYMENT_FAIL;
  constructor(public payload: any = null) {}
}

// export all archive payment

export class ExportAllArchivePaymentAction implements Action {
  type = ActionTypes.EXPORT_ALL_ARCHIVE_PAYMENT;
  constructor(public payload: any) {}
}

export class ExportAllArchivePaymentSuccess implements Action {
  type = ActionTypes.EXPORT_ALL_ARCHIVE_PAYMENT_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportAllArchivePaymentFail implements Action {
  type = ActionTypes.EXPORT_ALL_ARCHIVE_PAYMENT_FAIL;
  constructor(public payload: any = null) {}
}

