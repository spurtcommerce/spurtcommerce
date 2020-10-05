/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class ProductUpdateModel {
  public productName: string;
  public productDescription: string;
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
  public productId: number;
  public condition: string;
  public productDiscount: Array<any>;

  constructor(ProdupdateForm: any) {
    this.productName = ProdupdateForm.productName || '';
    this.productDescription = ProdupdateForm.productDescription || '';
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
    this.productId = ProdupdateForm.productId || 0;
    this.condition = ProdupdateForm.condition || '';
    this.productDiscount = ProdupdateForm.productDiscount || [];
  }
}
