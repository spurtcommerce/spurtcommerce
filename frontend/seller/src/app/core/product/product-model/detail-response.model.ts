/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class DetailResponseModel {
  public productId: number;
  public sku: string;
  public upc: string;
  public location: string;
  public quantity: number;
  public minimumQuantity: number;
  public subtractStock: number;
  public stockStatusId: number;
  public manufacturerId: string;
  public shipping: string;
  public dateAvailable: string;
  public sortOrder: string;
  public price: number;
  public name: string;
  public description: string;
  public metaTagTitle: string;
  public metaTagDescription: string;
  public metaTagKeyword: string;
  public condition: string;
  public isActive: number;
  public Category: any;
  public productImage: any;
  public relatedProductDetail: any;
  public productOption: any;
  public productDiscount: any;
  public productSpecialPrice: any;
  public pricerefer: number;
  public productSlug: string;
  public productCost: number;
  public packingCost: number;
  public shippingCost: number;
  public others: number;
  public pincodeBasedDelivery: number;
  public productvarientList: any;
  public productVarient: any;
  public tax: number;
  public taxType: number;
  public hsn: any;
  public productTirePrices: any;
  public productAttribute: any;
  public productVideo: any;
  public hasTirePrice: any;


  constructor(detailResponse: any) {
    this.productId = detailResponse.productId || 0;
    this.sku = detailResponse.sku || '';
    this.upc = detailResponse.upc || '';
    this.location = detailResponse.location || '';
    this.shipping = detailResponse.shipping || '';
    this.dateAvailable = detailResponse.dateAvailable || '';
    this.sortOrder = detailResponse.sortOrder || '';
    this.quantity = detailResponse.quantity || 0;
    this.minimumQuantity = detailResponse.minimumQuantity || 0;
    this.subtractStock = detailResponse.subtractStock || 0;
    this.stockStatusId = detailResponse.stockStatusId || 0;
    this.manufacturerId = detailResponse.manufacturerId || '';
    this.price = detailResponse.price || 0;
    this.name = detailResponse.name || '';
    this.description = detailResponse.description || '';
    this.metaTagTitle = detailResponse.metaTagTitle || '';
    this.metaTagDescription = detailResponse.metaTagDescription || '';
    this.metaTagKeyword = detailResponse.metaTagKeyword || '';
    this.condition = detailResponse.condition || '';
    this.isActive = detailResponse.isActive || 0;
    this.Category = detailResponse.Category || [];
    this.productImage = detailResponse.productImage || [];
    this.relatedProductDetail = detailResponse.relatedProductDetail || [];
    this.productOption = detailResponse.productOption || [];
    this.productDiscount = detailResponse.productDiscountData || [];
    this.productSpecialPrice = detailResponse.productSpecialPrice || [];
    this.pricerefer = detailResponse.pricerefer || 0;
    this.productSlug = detailResponse.productSlug || 0;
    this.productCost = detailResponse.productCost || 0;
    this.packingCost = detailResponse.packingCost || 0;
    this.shippingCost = detailResponse.shippingCost || 0;
    this.others = detailResponse.others || 0;
    this.pincodeBasedDelivery = detailResponse.pincodeBasedDelivery;
    this.productvarientList = detailResponse.productvarientList;
    this.productVarient = detailResponse.productVarient;
    this.tax = detailResponse.taxValue || 0;
    this.taxType = detailResponse.taxType || 0;
    this.hsn = detailResponse.hsn || 0;
    this.productTirePrices = detailResponse.productTirePrices || [];
    this.productAttribute = detailResponse.productAttribute || [];
    this.productVideo = detailResponse.productVideo || {};
    this.hasTirePrice = detailResponse.hasTirePrice || 0;

  }
}
