/*
 * spurtcommerce
 * version 1.0
 * www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { TodayDealImageModel } from './today-Deal-image.model';

export class TodayDealsResponseModel {
  public productId: string;
  public sku: string;
  public upc: string;
  public location: string;
  public quantity: string;
  public minimumQuantity: number;
  public subtractStock: number;
  public stockStatusId: number;
  public manufacturerId: number;
  public shipping: number;
  public todayDeals: number;
  public price: number;
  public dateAvailable: string;
  public sortOrder: number;
  public name: string;
  public description: string;
  public metaTagTitle: string;
  public isFeatured: number;
  public isActive: number;
  public image: any;

  constructor(todayDealsResponse: any) {
    this.productId = todayDealsResponse.productId || '';
    this.sku = todayDealsResponse.sku || '';
    this.upc = todayDealsResponse.name || '';
    this.location = todayDealsResponse.location || '';
    this.quantity = todayDealsResponse.quantity || '';
    this.minimumQuantity = todayDealsResponse.minimumQuantity || 0;
    this.subtractStock = todayDealsResponse.subtractStock || 0;
    this.stockStatusId = todayDealsResponse.stockStatusId || 0;
    this.manufacturerId = todayDealsResponse.manufacturerId || 0;
    this.shipping = todayDealsResponse.shipping || 0;
    this.todayDeals = todayDealsResponse.todayDeals || 0;
    this.price = todayDealsResponse.price || 0;
    this.dateAvailable = todayDealsResponse.dateAvailable || '';
    this.sortOrder = todayDealsResponse.sortOrder || 0;
    this.name = todayDealsResponse.name || '';
    this.description = todayDealsResponse.description || '';
    this.metaTagTitle = todayDealsResponse.metaTagTitle || '';
    this.isFeatured = todayDealsResponse.isFeatured || 0;
    this.isActive = todayDealsResponse.isActive || 0;
    this.image = todayDealsResponse.productImage;

    // this.Images = todayDealsResponse.Images ? new TodayDealImageModel(todayDealsResponse.Images) : null;
  }
}
