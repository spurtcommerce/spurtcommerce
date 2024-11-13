/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class PaymentAddModel {
  public paymentName: string;
  public paymentDescription: string;
  public upc: string;
  public sku: string;
  public image: string;
  public metaTagTitle: string;
  public metaTagKeyword: string;
  public metaTagDescription: string;
  public categoryId: string;
  public location: string;
  public price: number;
  public packingCost: number;
  public shippingCost: number;
  public tax: number;
  public others: number;
  public outOfStockStatus: number;
  public requiredShipping: number;
  public dateAvailable: string;
  public quantity: number;
  public sortOrder: number;
  public relatedPaymentId: string;
  public paymentOptions: Array<any>;
  public paymentDiscount: Array<any>;
  public paymentSpecial: Array<any>;
  constructor(fromPaymentAdd: any) {
    this.paymentName = fromPaymentAdd.paymentName || '';
    this.paymentDescription = fromPaymentAdd.paymentDescription || '';
    this.upc = fromPaymentAdd.upc || '';
    this.sku = fromPaymentAdd.sku || '';
    this.image = fromPaymentAdd.image || '';
    this.metaTagTitle = fromPaymentAdd.metaTagTitle || '';
    this.metaTagKeyword = fromPaymentAdd.metaTagKeyword || '';
    this.metaTagDescription = fromPaymentAdd.metaTagDescription || '';
    this.categoryId = fromPaymentAdd.categoryId || '';
    this.location = fromPaymentAdd.location || '';
    this.price = fromPaymentAdd.price || 0;
    this.packingCost = fromPaymentAdd.packingCost || 0;
    this.shippingCost = fromPaymentAdd.shippingCost || 0;
    this.tax = fromPaymentAdd.tax || 0;
    this.others = fromPaymentAdd.others || 0;
    this.outOfStockStatus = Number(fromPaymentAdd.outOfStockStatus) || 0;
    this.requiredShipping = Number(fromPaymentAdd.requiredShipping) || 0;
    this.dateAvailable = fromPaymentAdd.dateAvailable || '';
    this.quantity = 100;
    this.sortOrder = Number(fromPaymentAdd.sortOrder) || 0;
    this.relatedPaymentId = fromPaymentAdd.relatedPaymentId || '';
    this.paymentOptions = fromPaymentAdd.paymentOptions;
    this.paymentDiscount = fromPaymentAdd.paymentDiscount;
    this.paymentSpecial = fromPaymentAdd.paymentSpecial;
  }
}
