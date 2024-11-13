/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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
  public shipping: number;
  public dateAvailable: string;
  public sortOrder: string;
  public price: number;
  public name: string;
  public description: string;
  public metaTagTitle: string;
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
  public metaTagDescription: string;
  public metaTagKeyword: string;
  public productCost: number;
  public packingCost: number;
  public shippingCost: number;
  public tax: number;
  public taxType: number;
  public others: number;
  public productAttribute: any;
  public vendor: any;
  public width: any;
  public length: any;
  public height: any;
  public weight: any;
  public productTirePrices: Array<any>;
  public hasTirePrice: number;
  public pincodeBasedDelivery: number;
  public quotationAvailable: number;

  public hsn: any;
  public productVideo: any;



  constructor(detailResponse: any) {
    this.productId = detailResponse.productId || 0;
    this.sku = detailResponse.sku || '';
    this.upc = detailResponse.upc || '';
    this.hsn = detailResponse.hsn || '';
    this.location = detailResponse.location || '';
    this.shipping = detailResponse.shipping || 0;
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
    this.tax = detailResponse.taxValue || 0;
    this.taxType = detailResponse.taxType || 0;
    this.others = detailResponse.others || 0;
    this.vendor = detailResponse.vendor || {};
    this.width = detailResponse.width || 0;
    this.height = detailResponse.height || 0;
    this.length = detailResponse.length || 0;
    this.weight = detailResponse.weight || 0;
    this.productTirePrices = detailResponse.productTirePrices || [];
    this.hasTirePrice = detailResponse.hasTirePrice;
    this.pincodeBasedDelivery = detailResponse.pincodeBasedDelivery;
    this.quotationAvailable = detailResponse.quotationAvailable;
    this.productAttribute = detailResponse.productAttribute;

    this.productVideo = detailResponse.productVideo || {};
  }
}
