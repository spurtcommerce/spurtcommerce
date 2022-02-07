/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class OrderHistoryResponseModel {
  public createdDate: string;
  public orderId: string;
  public orderPrefixId: string;
  public invoiceNo: string;
  public total: number;
  public orderStatusId: string;
  public orderStatus: any = {};
  public currencyCode: string;

  constructor(historyResponse: any) {
    this.createdDate = historyResponse.createdDate || '';
    this.orderId = historyResponse.orderId || '';
    this.orderPrefixId = historyResponse.orderPrefixId || '';
    this.invoiceNo = historyResponse.invoiceNo || '';
    this.orderStatusId = historyResponse.orderStatusId || '';
    this.total = historyResponse.total || 0;
    this.orderStatus = historyResponse.orderStatus || '';
    this.currencyCode = historyResponse.currencyCode || '';

  }
}
