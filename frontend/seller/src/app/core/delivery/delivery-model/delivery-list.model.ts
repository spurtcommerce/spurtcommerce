/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class DeliveryLocationlistModel {
  public limit: number;
  public offset: number;
  public keyword: any;
  public sku: string;
  public status: any;
  public price: number;
  public count: number;

  constructor(fromDeliveryLocationlist: any) {
    this.limit = fromDeliveryLocationlist.limit || 0;
    this.offset = fromDeliveryLocationlist.offset || 0;
    this.keyword = fromDeliveryLocationlist.keyword || '';
    this.sku = fromDeliveryLocationlist.sku || '';
    this.status = fromDeliveryLocationlist.status || '';
    this.price = fromDeliveryLocationlist.price || '';
    this.count = fromDeliveryLocationlist.count || 0;
  }
}
export class DeliveryPersonslistModel {
  public limit: number;
  public offset: number;
  public keyword: any;
  public sku: string;
  public status: any;
  public price: number;
  public count: number;

  constructor(fromDeliveryLocationlist: any) {
    this.limit = fromDeliveryLocationlist.limit || 0;
    this.offset = fromDeliveryLocationlist.offset || 0;
    this.keyword = fromDeliveryLocationlist.keyword || '';
    this.sku = fromDeliveryLocationlist.sku || '';
    this.status = fromDeliveryLocationlist.status || '';
    this.price = fromDeliveryLocationlist.price || '';
    this.count = fromDeliveryLocationlist.count || 0;
  }
}
