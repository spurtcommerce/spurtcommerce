/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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
  public price: number;
  public quantity: string;
  public requiredShipping: number;
  public dateAvailable: string;
  public status: number;
  public sortOrder: number;
  public productId: number;
  public condition: string;
  public relatedProductId: string;
  public productOptions: Array<any>;
  public productDiscount: Array<any>;
  public productSpecial: Array<any>;
  public packingCost: number;
  public shippingCost: number;
  public tax: number;
  public taxType: number;
  public others: number;
  public productSlug: string;

  public weight: number;
  public height: number;
  public length: number;
  public width: number;
  // public manufacturerId: any;
  public tirePrices: Array<any>;
  public hasTirePrice: number;
  // public pincodeBasedDelivery: number;
  // public quotationAvailable: any;
  // public productAttribute: any;

  // public productVarientOption: any;
  // public productVarient: any;
  public hsn: any;


  public metaTagKeyword: string;
  public metaTagDescription: string;
  public productVideo: any;



  constructor(ProdupdateForm: any) {
    this.productName = ProdupdateForm.productName || '';
    this.productDescription = ProdupdateForm.productDescription || '';
    this.upc = ProdupdateForm.upc || '';
    this.sku = ProdupdateForm.sku || '';
    this.hsn = ProdupdateForm.hsn || '';
    this.image = ProdupdateForm.image || '';
    this.metaTagTitle = ProdupdateForm.metaTagTitle || '';
    this.categoryId = ProdupdateForm.categoryId || '';
    this.model = ProdupdateForm.model || 0;
    this.location = ProdupdateForm.location || '';
    this.price = ProdupdateForm.price || 0;
    this.quantity = ProdupdateForm.quantity || 0;
    this.requiredShipping = ProdupdateForm.requiredShipping || '0';
    this.dateAvailable = ProdupdateForm.dateAvailable || '';
    this.status = ProdupdateForm.status || 0;
    this.sortOrder = ProdupdateForm.sortOrder || 0;
    this.productId = ProdupdateForm.productId || 0;
    this.condition = ProdupdateForm.condition || '';
    this.relatedProductId = ProdupdateForm.relatedProductId || '';
    this.productOptions = ProdupdateForm.productOptions || [];
    this.productDiscount = ProdupdateForm.productDiscount || [];
    this.productSpecial = ProdupdateForm.productSpecial || [];
    this.packingCost = ProdupdateForm.packingCost || 0;
    this.shippingCost = ProdupdateForm.shippingCost || 0;
    this.tax = ProdupdateForm.tax || 0;
    this.taxType = ProdupdateForm.taxType || 0;
    this.others = ProdupdateForm.others || 0;
    this.productSlug = ProdupdateForm.productSlug || '';
    this.weight = ProdupdateForm.weight || 0;
    this.height = ProdupdateForm.height || 0;
    this.length = ProdupdateForm.length || 0;
    this.width = ProdupdateForm.width || 0;
    // this.manufacturerId = ProdupdateForm.manufacturerId || '';
    this.tirePrices = ProdupdateForm.tierPrices || [];
    this.hasTirePrice = ProdupdateForm.hasTirePrice;
    // this.pincodeBasedDelivery = ProdupdateForm.pincodeBasedDelivery;
    // this.quotationAvailable = ProdupdateForm.quotationAvailable;
    // this.productAttribute = ProdupdateForm.productAttribute;


    // this.productVarientOption = ProdupdateForm.productVarientOption;
    // this.productVarient = ProdupdateForm.productVarient;

    this.metaTagKeyword = ProdupdateForm.metaTagKeyword || '';
    this.metaTagDescription = ProdupdateForm.metaTagDescription || '';
    this.productVideo = ProdupdateForm.productVideo || {};



  }
}
