/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class PaymentAddResponseModel {
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
  public metaTagKeyword: string;
  public condition: string;
  public manufacturerId: string;
  public isActive: string;
  public sortOrder: string;
  public createdDate: string;
  public paymentId: string;

  constructor(paymentaddResponse: any) {
    this.name = paymentaddResponse.name || '';
    this.description = paymentaddResponse.description || '';
    this.sku = paymentaddResponse.sku || '';
    this.upc = paymentaddResponse.upc || '';
    this.location = paymentaddResponse.location || '';
    this.quantity = paymentaddResponse.quantity || '';
    this.price = paymentaddResponse.price || '';
    this.minimumQuantity = paymentaddResponse.minimumQuantity || '';
    this.subtractStock = paymentaddResponse.subtractStock || '';
    this.stockStatusId = paymentaddResponse.stockStatusId || '';
    this.shipping = paymentaddResponse.shipping || '';
    this.dateAvailable = paymentaddResponse.dateAvailable || '';
    this.metaTagTitle = paymentaddResponse.metaTagTitle || '';
    this.metaTagKeyword = paymentaddResponse.metaTagKeyword || '';
    this.condition = paymentaddResponse.condition || '';
    this.manufacturerId = paymentaddResponse.manufacturerId || '';
    this.isActive = paymentaddResponse.isActive || '';
    this.sortOrder = paymentaddResponse.sortOrder || '';
    this.createdDate = paymentaddResponse.createdDate || '';
    this.paymentId = paymentaddResponse.paymentId || '';
  }
}
