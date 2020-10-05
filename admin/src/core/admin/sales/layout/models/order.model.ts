/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class OrderModel {
  public limit: number;
  public offset: number;
  public orderId: number;
  public customerName: string;
  public totalAmount: number;
  public dateAdded: string;
  public count: boolean;
  public orderStatusId: string;

  constructor(params: any) {
    this.limit = params.limit || 0;
    this.offset = params.offset || 0;
    this.orderId = params.orderId || '';
    this.customerName = params.customerName || '';
    this.totalAmount = params.totalAmount || 0;
    this.dateAdded = params.dateAdded || '';
    this.count = params.count || false;
    this.orderStatusId = params.orderStatusId || '';
  }
}
