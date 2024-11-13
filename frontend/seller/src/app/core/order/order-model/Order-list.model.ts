/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class OrderListModel {
  public limit: number;
  public offset: number;
  public keyword: any;
  public sku: string;
  public status: string;
  public price: number;
  public count: boolean;
  public startDate: string;
  public endDate: string;
  public keyUp:boolean;
  constructor(fromOrderList: any) {
    this.limit = fromOrderList.limit || 0;
    this.offset = fromOrderList.offset || 0;
    this.keyword = fromOrderList.keyword || '';
    this.sku = fromOrderList.sku || '';
    this.status = fromOrderList.status || '';
    this.price = fromOrderList.price || '';
    this.count = fromOrderList.count || false;
    this.startDate = fromOrderList.startDate || '';
    this.endDate = fromOrderList.endDate || '';
    this.keyUp = fromOrderList.keyUp || false;

  }
}
