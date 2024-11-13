/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class OrderUpdateModel {
  public orderName: string;
  public orderDescription: string;
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
  public orderId: number;
  public condition: string;
  public relatedOrderId: string;
  public orderOptions: Array<any>;
  public orderDiscount: Array<any>;
  public orderSpecial: Array<any>;

  constructor(ProdupdateForm: any) {
    this.orderName = ProdupdateForm.orderName || '';
    this.orderDescription = ProdupdateForm.orderDescription || '';
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
    this.orderId = ProdupdateForm.orderId || 0;
    this.condition = ProdupdateForm.condition || '';
    this.relatedOrderId = ProdupdateForm.relatedOrderId || '';
    this.orderOptions = ProdupdateForm.orderOptions || [];
    this.orderDiscount = ProdupdateForm.orderDiscount || [];
    this.orderSpecial = ProdupdateForm.orderSpecial || [];
  }
}
