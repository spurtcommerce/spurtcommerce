/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class ProductUpdateModel {
  public vendorId: number;
  public productName: string;
  public productDescription: string;
  public upc: string;
  public sku: string;
  public hsn: any;

  public image: string;
  public categoryId: string;
  public location: string;
  public price: number;
  public quantity: string;
  public requiredShipping: number;
  public dateAvailable: string;
  public sortOrder: number;
  public productId: number;
  public relatedProductId: string;
  public productOptions: Array<any>;
  public productDiscount: Array<any>;
  public productSpecial: Array<any>;
  public packingCost: number;
  public shippingCost: number;
  public tax: number;
  public others: number;
  public manufacturerId: number;
  public pincodeBasedDelivery: number;

  public productVarientOption: any;
  public productVarient: any;

  public taxType: number;

  public metaTagTitle: string;
  public metaTagKeyword: string;
  public metaTagDescription: string;
  public productSlug: any;
  public tirePrices: Array<any>;
  public hasTirePrice: number;
  public quotationAvailable: any;
  public productAttribute: any;
  public productVideo: any;
  
  public width: number;
  public height:number;
  public weight:number;
  public length:number;

  constructor(ProdupdateForm: any) {
    this.vendorId = ProdupdateForm.vendorId || '';
    this.productName = ProdupdateForm.productName || '';
    this.productDescription = ProdupdateForm.productDescription || '';
    this.upc = ProdupdateForm.upc || '';
    this.sku = ProdupdateForm.sku || '';
    this.hsn = ProdupdateForm.hsn || '';
    this.image = ProdupdateForm.image || '';
    this.metaTagTitle = ProdupdateForm.metaTagTitle || '';
    this.categoryId = ProdupdateForm.categoryId || '';
    this.location = ProdupdateForm.location || '';
    this.price = ProdupdateForm.price || 0;
    this.packingCost = ProdupdateForm.packingCost || 0;
    this.shippingCost = ProdupdateForm.shippingCost || 0;
    this.tax = ProdupdateForm.tax || 0;
    this.others = ProdupdateForm.others || 0;
    this.quantity = ProdupdateForm.quantity || 0;
    this.requiredShipping = ProdupdateForm.requiredShipping || '0';
    this.dateAvailable = ProdupdateForm.dateAvailable || '';
    this.sortOrder = ProdupdateForm.sortOrder || 0;
    this.productId = ProdupdateForm.productId || '';
    this.relatedProductId = ProdupdateForm.relatedProductId || '';
    this.productOptions = ProdupdateForm.productOptions || [];
    this.productDiscount = ProdupdateForm.productDiscount || [];
    this.productSpecial = ProdupdateForm.productSpecial || [];
    this.relatedProductId = ProdupdateForm.relatedProductId || '';
    this.productOptions = ProdupdateForm.productOptions || [];
    this.productDiscount = ProdupdateForm.productDiscount || [];
    this.productSpecial = ProdupdateForm.productSpecial || [];
    this.manufacturerId = ProdupdateForm.manufacturerId || '';
    this.pincodeBasedDelivery = ProdupdateForm.pincodeBasedDelivery || 0;
    this.metaTagKeyword = ProdupdateForm.metaTagKeyword || '';
    this.metaTagDescription = ProdupdateForm.metaTagDescription || '';


    this.productVarientOption = ProdupdateForm.productVarientOption;
    this.productVarient = ProdupdateForm.productVarient;
    this.taxType = ProdupdateForm.taxType;
    this.productSlug = ProdupdateForm.productSlug || '';

    this.tirePrices = ProdupdateForm.tierPrices || [];
    this.hasTirePrice = ProdupdateForm.hasTirePrice;
    this.quotationAvailable = ProdupdateForm.quotationAvailable;
    this.productAttribute = ProdupdateForm.productAttribute;

    this.productVideo = ProdupdateForm.productVideo || {};
    
    this.width = ProdupdateForm.width || 0;
    this.height = ProdupdateForm.height || 0;
    this.weight = ProdupdateForm.weight || 0;
    this.length = ProdupdateForm.length || 0;


  }

}
