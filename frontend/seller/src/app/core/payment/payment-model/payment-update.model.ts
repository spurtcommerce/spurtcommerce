/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class PaymentUpdateModel {
  public paymentName: string;
  public paymentDescription: string;
  public upc: string;
  public sku: string;
  public image: string;
  public metaTagTitle: string;
  public categoryId: string;
  public model: number;
  public location: string;
  public price: string;
  public outOfStockStatus: number;
  public requiredShipping: number;
  public dateAvailable: string;
  public status: number;
  public sortOrder: number;
  public paymentId: number;
  public condition: string;
  public relatedPaymentId: string;
  public paymentOptions: Array<any>;
  public paymentDiscount: Array<any>;
  public paymentSpecial: Array<any>;

  constructor(ProdupdateForm: any) {
    this.paymentName = ProdupdateForm.paymentName || '';
    this.paymentDescription = ProdupdateForm.paymentDescription || '';
    this.upc = ProdupdateForm.upc || '';
    this.sku = ProdupdateForm.sku || '';
    this.image = ProdupdateForm.image || '';
    this.metaTagTitle = ProdupdateForm.metaTagTitle || '';
    this.categoryId = ProdupdateForm.categoryId || '';
    this.model = ProdupdateForm.model || 0;
    this.location = ProdupdateForm.location || '';
    this.price = ProdupdateForm.price || '';
    this.outOfStockStatus = ProdupdateForm.outOfStockStatus || '';
    this.requiredShipping = ProdupdateForm.requiredShipping || '';
    this.dateAvailable = ProdupdateForm.dateAvailable || '';
    this.status = ProdupdateForm.status || 0;
    this.sortOrder = ProdupdateForm.sortOrder || 0;
    this.paymentId = ProdupdateForm.paymentId || 0;
    this.condition = ProdupdateForm.condition || '';
    this.relatedPaymentId = ProdupdateForm.relatedPaymentId || '';
    this.paymentOptions = ProdupdateForm.paymentOptions || [];
    this.paymentDiscount = ProdupdateForm.paymentDiscount || [];
    this.paymentSpecial = ProdupdateForm.paymentSpecial || [];
  }
}
