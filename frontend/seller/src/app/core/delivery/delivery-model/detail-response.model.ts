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
  public deliveryId: number;
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
  public deliveryImage: any;
  public relatedDeliveryDetail: any;
  public deliveryOption: any;
  public deliveryDiscount: any;
  public deliverySpecialPrice: any;
  public pricerefer: number;
  public deliverySlug: string;
  public deliveryCost: number;
  public packingCost: number;
  public shippingCost: number;
  public tax: number;
  public others: number;
  constructor(detailResponse: any) {
    this.deliveryId = detailResponse.deliveryId || 0;
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
    this.manufacturerId = detailResponse.manufacturerId || 0;
    this.price = detailResponse.price || 0;
    this.name = detailResponse.name || '';
    this.description = detailResponse.description || '';
    this.metaTagTitle = detailResponse.metaTagTitle || '';
    this.metaTagDescription = detailResponse.metaTagDescription || '';
    this.metaTagKeyword = detailResponse.metaTagKeyword || '';
    this.condition = detailResponse.condition || '';
    this.isActive = detailResponse.isActive || 0;
    this.Category = detailResponse.Category || [];
    this.deliveryImage = detailResponse.deliveryImage || [];
    this.relatedDeliveryDetail = detailResponse.relatedDeliveryDetail || [];
    this.deliveryOption = detailResponse.deliveryOption || [];
    this.deliveryDiscount = detailResponse.deliveryDiscountData || [];
    this.deliverySpecialPrice = detailResponse.deliverySpecialPrice || [];
    this.pricerefer = detailResponse.pricerefer || 0;
    this.deliverySlug = detailResponse.deliverySlug || 0;
    this.deliveryCost = detailResponse.deliveryCost || 0;
    this.packingCost = detailResponse.packingCost || 0;
    this.shippingCost = detailResponse.shippingCost || 0;
    this.tax = detailResponse.tax || 0;
    this.others = detailResponse.others || 0;

  }
}
