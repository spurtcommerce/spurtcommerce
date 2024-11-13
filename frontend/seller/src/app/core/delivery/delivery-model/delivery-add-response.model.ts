/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class DeliveryAddResponseModel {
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
  public deliveryId: string;

  constructor(deliveryaddResponse: any) {
    this.name = deliveryaddResponse.name || '';
    this.description = deliveryaddResponse.description || '';
    this.sku = deliveryaddResponse.sku || '';
    this.upc = deliveryaddResponse.upc || '';
    this.location = deliveryaddResponse.location || '';
    this.quantity = deliveryaddResponse.quantity || '';
    this.price = deliveryaddResponse.price || '';
    this.minimumQuantity = deliveryaddResponse.minimumQuantity || '';
    this.subtractStock = deliveryaddResponse.subtractStock || '';
    this.stockStatusId = deliveryaddResponse.stockStatusId || '';
    this.shipping = deliveryaddResponse.shipping || '';
    this.dateAvailable = deliveryaddResponse.dateAvailable || '';
    this.metaTagTitle = deliveryaddResponse.metaTagTitle || '';
    this.condition = deliveryaddResponse.condition || '';
    this.manufacturerId = deliveryaddResponse.manufacturerId || '';
    this.isActive = deliveryaddResponse.isActive || '';
    this.sortOrder = deliveryaddResponse.sortOrder || '';
    this.createdDate = deliveryaddResponse.createdDate || '';
    this.deliveryId = deliveryaddResponse.deliveryId || '';
  }
}
