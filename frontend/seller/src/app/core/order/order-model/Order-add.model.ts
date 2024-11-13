/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class OrderAddModel {
  public orderName: string;
  public orderDescription: string;
  public upc: string;
  public sku: string;
  public image: string;
  public metaTagTitle: string;
  public categoryId: string;
  public model: any;
  public location: string;
  public price: string;

  public outOfStockStatus: number;
  public requiredShipping: number;
  public dateAvailable: string;
  public status: number;
  public sortOrder: number;
  public condition: any;
  public relatedOrderId: string;
  public orderOptions: Array<any>;
  public orderDiscount: Array<any>;
  public orderSpecial: Array<any>;

  constructor(fromOrderAdd: any) {
    this.orderName = fromOrderAdd.orderName || '';
    this.orderDescription = fromOrderAdd.orderDescription || '';
    this.upc = fromOrderAdd.upc || '';
    this.sku = fromOrderAdd.sku || '';
    this.image = fromOrderAdd.image || '';
    this.metaTagTitle = fromOrderAdd.metaTagTitle || '';
    this.categoryId = fromOrderAdd.categoryId || '';
    this.model = fromOrderAdd.model || '';
    this.location = fromOrderAdd.location || '';
    this.price = fromOrderAdd.price || '';
    this.outOfStockStatus = fromOrderAdd.outOfStockStatus || '';
    this.requiredShipping = fromOrderAdd.requiredShipping || '';
    this.dateAvailable = fromOrderAdd.dateAvailable || '';
    this.status = fromOrderAdd.status || 0;
    this.sortOrder = fromOrderAdd.sortOrder || 0;
    this.condition = fromOrderAdd.condition || '';
    this.relatedOrderId = fromOrderAdd.relatedOrderId || '';
    this.orderOptions = fromOrderAdd.orderOptions || [];
    this.orderDiscount = fromOrderAdd.orderDiscount || [];
    this.orderSpecial = fromOrderAdd.orderSpecial || [];
  }
}
