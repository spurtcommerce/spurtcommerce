/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class ProductAddModel {
  public productName: string;
  public productDescription: string;
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
  public relatedProductId: string;
  public productOptions: Array<any>;
  public productDiscount: Array<any>;
  public productSpecial: Array<any>;
  public productAttribute: Array<any>;
  public pincodeBasedDelivery: any;
  public manufacturerId: any;
  public productVarientOption: any;
  public productVarient: any;
  public taxType: number;
  public hsn: any;
  public productVideo: any;


  constructor(fromProductAdd: any) {
    this.productName = fromProductAdd.productName || '';
    this.productDescription = fromProductAdd.productDescription || '';
    this.upc = fromProductAdd.upc || '';
    this.sku = fromProductAdd.sku || '';
    this.image = fromProductAdd.image || '';
    this.metaTagTitle = fromProductAdd.metaTagTitle || '';
    this.metaTagKeyword = fromProductAdd.metaTagKeyword || '';
    this.metaTagDescription = fromProductAdd.metaTagDescription || '';
    this.categoryId = fromProductAdd.categoryId || '';
    this.location = fromProductAdd.location || '';
    this.price = fromProductAdd.price || 0;
    this.packingCost = fromProductAdd.packingCost || 0;
    this.shippingCost = fromProductAdd.shippingCost || 0;
    this.tax = fromProductAdd.tax || 0;
    this.others = fromProductAdd.others || 0;
    this.outOfStockStatus = Number(fromProductAdd.outOfStockStatus) || 0;
    this.requiredShipping = Number(fromProductAdd.requiredShipping) || 0;
    this.dateAvailable = fromProductAdd.dateAvailable || '';
    // this.quantity = fromProductAdd.quantity || 1;
    if (fromProductAdd.quantity === '0') {
      this.quantity = 1;
    } else if (fromProductAdd.quantity !== '0') {

      this.quantity = fromProductAdd.quantity;
    }
    this.sortOrder = Number(fromProductAdd.sortOrder) || 0;
    this.relatedProductId = fromProductAdd.relatedProductId || '';
    this.productOptions = fromProductAdd.productOptions;
    this.productDiscount = fromProductAdd.productDiscount;
    this.productSpecial = fromProductAdd.productSpecial;
    this.productAttribute = fromProductAdd.productAttribute;
    this.pincodeBasedDelivery = fromProductAdd.pincodeBasedDelivery;
    this.manufacturerId = fromProductAdd.manufacturerId;
    this.productVarientOption = fromProductAdd.productVarientOption;
    this.productVarient = fromProductAdd.productVarient;
    this.taxType = fromProductAdd.taxType || 0;
    this.hsn = fromProductAdd.hsn || '';
    this.productVideo = fromProductAdd.productVideo || {};
  }
}
