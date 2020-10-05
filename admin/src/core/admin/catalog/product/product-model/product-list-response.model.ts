/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class ProductListResponseModel {
  public productId: number;
  public sku: string;
  public quantity: number;
  public image: string;
  public imagePath: string;
  public price: number;
  public name: string;
  public isActive: number;
  public productToCategory: any;
  public productImage: any;
  public relatedProductId: any;
  public isFeatured: any;
  public todaydeals: any;
  public pricerefer: number;
  public flag: number;

  constructor(productlistResponse: any) {
    this.productId = productlistResponse.productId || 0;
    this.sku = productlistResponse.sku || '';
    this.quantity = productlistResponse.quantity || 0;
    this.image = productlistResponse.image || '';
    this.imagePath = productlistResponse.imagePath || '';
    this.price = productlistResponse.price || 0;
    this.name = productlistResponse.name || '';
    this.isActive = productlistResponse.isActive || 0;
    this.productToCategory = productlistResponse.productToCategory || [];
    this.productImage = productlistResponse.productImage || [];
    this.relatedProductId = productlistResponse.relatedProductId || [];
    this.isFeatured = productlistResponse.isFeatured || 0;
    this.todaydeals = productlistResponse.todayDeals || 0;
    this.pricerefer = productlistResponse.pricerefer || 0;
    this.flag = productlistResponse.flag || 0;
  }
}
