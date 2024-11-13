/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class OrderAddResponseModel {
  public name: string;
  public description: string;
  public sku: string;
  public upc: string;
  public location: string;
  public quantity: string;
  public price: string;
  public minimumQuantity: string;
  public subtractStock: string;
  public stockStatusId: string;
  public shipping: string;
  public dateAvailable: string;
  public metaTagTitle: string;
  public condition: string;
  public manufacturerId: string;
  public isActive: string;
  public sortOrder: string;
  public createdDate: string;
  public orderId: string;

  constructor(orderaddResponse: any) {
    this.name = orderaddResponse.name || '';
    this.description = orderaddResponse.description || '';
    this.sku = orderaddResponse.sku || '';
    this.upc = orderaddResponse.upc || '';
    this.location = orderaddResponse.location || '';
    this.quantity = orderaddResponse.quantity || '';
    this.price = orderaddResponse.price || '';
    this.minimumQuantity = orderaddResponse.minimumQuantity || '';
    this.subtractStock = orderaddResponse.subtractStock || '';
    this.stockStatusId = orderaddResponse.stockStatusId || '';
    this.shipping = orderaddResponse.shipping || '';
    this.dateAvailable = orderaddResponse.dateAvailable || '';
    this.metaTagTitle = orderaddResponse.metaTagTitle || '';
    this.condition = orderaddResponse.condition || '';
    this.manufacturerId = orderaddResponse.manufacturerId || '';
    this.isActive = orderaddResponse.isActive || '';
    this.sortOrder = orderaddResponse.sortOrder || '';
    this.createdDate = orderaddResponse.createdDate || '';
    this.orderId = orderaddResponse.orderId || '';
  }
}
