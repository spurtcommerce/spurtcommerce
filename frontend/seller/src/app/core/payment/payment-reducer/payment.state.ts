

import { Map, Record } from 'immutable';
import { PaymentListResponseModel } from '../payment-model/payment-list-response.model';
import { PaymentAddResponseModel } from '../payment-model/payment-add-response.model';
import { DetailResponseModel } from '../payment-model/detail-response.model';
import { PriceUpdateListResponse } from '../payment-model/price-update-List.model';

export interface PaymentState extends Map<string, any> {

  paymentAdded: any;

  optionList: any;
  gettingoptionList: any;
  getRatingList: any;
  ratingStatus: any;
  paymentBulkDelete: any;

  deletePayment: any;
  deleteLoading: boolean;
  deleteLoaded: boolean;
  deleteFailed: boolean;

  deleteBulkPayment: any;
  deleteBulkLoading: boolean;
  deleteBulkLoaded: boolean;
  deleteBulkFailed: boolean;

  listLoading: boolean;
  listLoaded: boolean;
  listFailed: boolean;
  paymentList: Array<any>;

  archiveListLoading: boolean;
  archiveListLoaded: boolean;
  archiveListFailed: boolean;
  archivePaymentList: Array<any>;

  paymentStatus: any;
  paymentStatusLoading: boolean;
  paymentStatusLoaded: boolean;
  paymentStatusFailed: boolean;

  paymentUpdate: PaymentAddResponseModel;
  updateLoading: boolean;
  updateLoaded: boolean;
  updateFailed: boolean;

  paymentDetail: {};
  detailLoading: false;
  detailLoaded: false;
  detailFailed: false;
  availableCategoryList: [];

  addLoading: boolean;
  addLoaded: boolean;
  addFailed: boolean;
  categoryListLoading: boolean;
  categoryListLoaded: boolean;
  categoryList: Array<any>;
  tempCategoryList: Array<any>;
  currentCategoryList: Array<any>;
  totalPaymentCount: any;
  totalPaymentCountLoading: boolean;
  totalPaymentCountLoaded: boolean;
  totalPaymentCountFailed: boolean;

  EarningCount: number;
  EarningCountLoading: boolean;
  EarningCountLoaded: boolean;
  EarningCountFailed: boolean;

  inEarningCount: number;
  inEarningCountLoading: boolean;
  inEarningCountLoaded: boolean;
  inEarningCountFailed: boolean;

  exportPayment: number;
  exportPaymentLoading: boolean;
  exportPaymentLoaded: boolean;
  exportPaymentFailed: boolean;

  exportEarning: number;
  exportEarningLoading: boolean;
  exportEarningLoaded: boolean;
  exportEarningFailed: boolean;

  makeArchive: number;
  makeArchiveLoading: boolean;
  makeArchiveLoaded: boolean;
  makeArchiveFailed: boolean;

  MultiplePaymentExport: Array<PriceUpdateListResponse>;
  MultiplePaymentExportLoading: boolean;
  MultiplePaymentExportLoaded: boolean;
  MultiplePaymentExportFailed: boolean;

  MultipleEarningExport: number;
  MultipleEarningExportLoading: boolean;
  MultipleEarningExportLoaded: boolean;
  MultipleEarningExportFailed: boolean;

  DeleteCsvList: number;
  DeleteCsvListLoading: boolean;
  DeleteCsvListLoaded: boolean;
  DeleteCsvListFailed: boolean;

  downloadInvoice: number;
  downloadInvoiceLoading: boolean;
  downloadInvoiceLoaded: boolean;
  downloadInvoiceFailed: boolean;

  makePaymentArchiveLoading: boolean;
  makePaymentArchiveLoaded: boolean;
  makePaymentArchiveFailed: boolean;
  makePaymentArchive: {};

  exportArchivePayment: any;
  exportArchivePaymentLoading: boolean;
  exportArchivePaymentLoaded: boolean;
  exportArchivePaymentFailed: boolean;

  exportAllArchivePayment: any;
  exportAllArchivePaymentLoading: boolean;
  exportAllArchivePaymentLoaded: boolean;
  exportAllArchivePaymentFailed: boolean;

  archivePaymentListCountLoading: boolean;
  archivePaymentListCountLoaded: boolean;
  archivePaymentListCountFailed: boolean;
  archivePaymentListCount: any;

}

export const PaymentStateRecord = Record({

  paymentAdded: {},

  listLoading: false,
  listLoaded: false,
  listFailed: false,
  paymentList: [],

  archiveListLoading: false,
  archiveListLoaded: false,
  archiveListFailed: false,
  archivePaymentList: [],

  deletePayment: {},
  deleteLoading: false,
  deleteLoaded: false,
  deleteFailed: false,

  deleteBulkPayment: {},
  deleteBulkLoading: false,
  deleteBulkLoaded: false,
  deleteBulkFailed: false,

  addLoading: false,
  addLoaded: false,
  addFailed: false,

  paymentUpdate: {},
  updateLoading: false,
  updateLoaded: false,
  updateFailed: false,

  categoryListLoading: false,
  categoryListLoaded: false,

  categoryList: [],
  tempCategoryList: [],
  currentCategoryList: [],
  paymentDetail: DetailResponseModel,
  detailLoading: false,
  detailLoaded: false,
  detailFailed: false,

  paymentStatus: [],
  paymentStatusLoading: false,
  paymentStatusLoaded: false,
  paymentStatusFailed: false,

  totalPaymentCount: {},
  totalPaymentCountLoading: false,
  totalPaymentCountLoaded: false,
  totalPaymentCountFailed: false,

  EarningCount: [],
  EarningCountLoading: false,
  EarningCountLoaded: false,
  EarningCountFailed: false,

  inEarningCount: [],
  inEarningCountLoading: false,
  inEarningCountLoaded: false,
  inEarningCountFailed: false,

  exportPayment: {},
  exportPaymentLoading: false,
  exportPaymentLoaded: false,
  exportPaymentFailed: false,

  exportEarning: {},
  exportEarningLoading: false,
  exportEarningLoaded: false,
  exportEarningFailed: false,

  makeArchive: {},
  makeArchiveLoading: false,
  makeArchiveLoaded: false,
  makeArchiveFailed: false,

  MultiplePaymentExport: [],
  MultiplePaymentExportLoading: false,
  MultiplePaymentExportLoaded: false,
  MultiplePaymentExportFailed: false,

  MultipleEarningExport: [],
  MultipleEarningExportLoading: false,
  MultipleEarningExportLoaded: false,
  MultipleEarningExportFailed: false,

  DeleteCsvList: {},
  DeleteCsvListLoading: false,
  DeleteCsvListLoaded: false,
  DeleteCsvListFailed: false,


  downloadInvoice: {},
  downloadInvoiceLoading: false,
  downloadInvoiceLoaded: false,
  downloadInvoiceFailed: false,

  makePaymentArchiveLoading: false,
  makePaymentArchiveLoaded: false,
  makePaymentArchiveFailed: false,
  makePaymentArchive: {},

  exportArchivePayment: {},
  exportArchivePaymentLoading: false,
  exportArchivePaymentLoaded: false,
  exportArchivePaymentFailed: false,

  exportAllArchivePayment: {},
  exportAllArchivePaymentLoading: false,
  exportAllArchivePaymentLoaded: false,
  exportAllArchivePaymentFailed: false,

  archivePaymentListCountLoading: false,
  archivePaymentListCountLoaded: false,
  archivePaymentListCountFailed: false,
  archivePaymentListCount: '',

});

