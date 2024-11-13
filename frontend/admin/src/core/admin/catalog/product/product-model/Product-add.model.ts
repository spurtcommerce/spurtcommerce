/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class ProductAddModel {
  public productName: string;
  public productDescription: string;
  public upc: string;
  public sku: string;
  public image: string;
  public metaTagTitle: string;
  public categoryId: string;
  public model: any;
  public location: string;
  public price: number;
  public quantity: string;
  public requiredShipping: number;
  public dateAvailable: string;
  public status: number;
  public sortOrder: number;
  public condition: any;
  public relatedProductId: string;
  public productOptions: Array<any>;
  public productDiscount: Array<any>;
  public productSpecial: Array<any>;
  public tax: number;
  public taxType: number;
  public others: number;
  public metaTagKeyword: string;
  public metaTagDescription: string;
  public productSlug: string;
  public manufacturerId: number;
  public tirePrices: Array<any>;
  public hasTirePrice: number;
  public pincodeBasedDelivery: number;
  public quotationAvailable: any;
  public productAttribute: any;

  public productVarientOption: any;
  public productVarient: any;
  public hsn: any;
  public productVideo: any;




  constructor(fromProductAdd: any) {
    this.productName = fromProductAdd.productName || '';
    this.productDescription = fromProductAdd.productDescription || '';
    this.upc = fromProductAdd.upc || '';
    this.sku = fromProductAdd.sku || '';
    this.hsn = fromProductAdd.hsn || '';
    this.image = fromProductAdd.image || '';
    this.metaTagTitle = fromProductAdd.metaTagTitle || '';
    this.categoryId = fromProductAdd.categoryId || '';
    this.model = fromProductAdd.model || '';
    this.location = fromProductAdd.location || '';
    this.price = fromProductAdd.price || 0;
    this.quantity = fromProductAdd.quantity || 0;
    this.requiredShipping = fromProductAdd.requiredShipping || '0';
    this.dateAvailable = fromProductAdd.dateAvailable || '';
    this.status = fromProductAdd.status || 0;
    this.sortOrder = fromProductAdd.sortOrder || 0;
    this.condition = fromProductAdd.condition || '';
    this.relatedProductId = fromProductAdd.relatedProductId || '';
    this.productOptions = fromProductAdd.productOptions || [];
    this.productDiscount = fromProductAdd.productDiscount || [];
    this.productSpecial = fromProductAdd.productSpecial || [];
    this.metaTagTitle = fromProductAdd.metaTagTitle || '';
    this.metaTagKeyword = fromProductAdd.metaTagKeyword || '';
    this.metaTagDescription = fromProductAdd.metaTagDescription || '';
    this.tax = fromProductAdd.tax || 0;
    this.taxType = fromProductAdd.taxType || 0;
    this.others = fromProductAdd.others || 0;
    this.productSlug = fromProductAdd.productSlug || '';
    this.manufacturerId = fromProductAdd.manufacturerId || '';
    this.tirePrices = fromProductAdd.tierPrices || [];
    this.hasTirePrice = fromProductAdd.hasTirePrice;
    this.pincodeBasedDelivery = fromProductAdd.pincodeBasedDelivery;
    this.quotationAvailable = fromProductAdd.quotationAvailable;
    this.productAttribute = fromProductAdd.productAttribute;

    this.productVarientOption = fromProductAdd.productVarientOption;
    this.productVarient = fromProductAdd.productVarient;
    this.productVideo = fromProductAdd.productVideo || {};


  }
}
