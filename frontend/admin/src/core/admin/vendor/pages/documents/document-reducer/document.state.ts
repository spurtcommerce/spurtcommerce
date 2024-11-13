/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface DocumentState extends Map<string, any> {
  // getDocumentListData
  getDocumentListData: any;
  getDocumentListDataLoading: boolean;
  getDocumentListDataLoaded: boolean;
  getDocumentListDataFailed: boolean;

  // updateDocument
  updateDocument: any;
  updateDocumentLoading: boolean;
  updateDocumentLoaded: boolean;
  updateDocumentFailed: boolean;

  documentList: any;
  documentListLoading: boolean;
  documentListLoaded: boolean;
  documentListFailed: boolean;

  documentListCount: number;
  documentListCountLoading: boolean;
  documentListCountLoaded: boolean;
  documentListCountFailed: boolean;

  documentDetail: any;
  documentDetailLoading: boolean;
  documentDetailLoaded: boolean;
  documentDetailFailed: boolean;


  totalAmount: number;
  totalOrder: number;
  totalCommission: number;
  totalVendor: number;
  documentStatusChangeLoading: boolean;
  documentStatusChangeLoaded: boolean;
  documentStatusChangeFailed: boolean;

  invoiceDetail: any;
  invoiceDetailLoading: boolean;
  invoiceDetailLoaded: boolean;
  invoiceDetailFailed: boolean;
}

export const DocumentRecord = Record({

  // getDocumentListData
  getDocumentListData: [],
  getDocumentListDataLoading: false,
  getDocumentListDataLoaded: false,
  getDocumentListDataFailed: false,

  // updateDocument
  updateDocument: [],
  updateDocumentLoading: false,
  updateDocumentLoaded: false,
  updateDocumentFailed: false,

  documentList: [],
  documentListLoading: false,
  documentListLoaded: false,
  documentListFailed: false,

  documentListCount: 0,
  documentListCountLoading: false,
  documentListCountLoaded: false,
  documentListCountFailed: false,

  documentDetail: [],
  documentDetailLoading: false,
  documentDetailLoaded: false,
  documentDetailFailed: false,

  totalAmount: 0,
  totalOrder: 0,
  totalCommission: 0,
  totalVendor: 0,
  documentStatusChangeLoading: false,
  documentStatusChangeLoaded: false,
  documentStatusChangeFailed: false,


  invoiceDetail: false,
  invoiceDetailLoading: false,
  invoiceDetailLoaded: false,
  invoiceDetailFailed: false,

});
