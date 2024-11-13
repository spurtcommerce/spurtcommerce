/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class DeliveryLocationlistResponseModel {
  public deliveryId: number;
  public sku: string;
  public quantity: number;
  public image: string;
  public imagePath: string;
  public price: number;
  public name: string;
  public isActive: number;
  public deliveryToCategory: any;
  public deliveryImage: any;
  public relatedDeliveryId: any;
  public isFeatured: any;
  public todaydeals: any;
  public pricerefer: number;
  public flag: number;
  public deliveryprice: string;
  public selected: boolean;
  constructor(DeliveryLocationlistResponse: any) {
    this.deliveryId = DeliveryLocationlistResponse.deliveryId || 0;
    this.sku = DeliveryLocationlistResponse.sku || '';
    this.quantity = DeliveryLocationlistResponse.quantity || 0;
    this.image = DeliveryLocationlistResponse.image || '';
    this.imagePath = DeliveryLocationlistResponse.imagePath || '';
    this.price = DeliveryLocationlistResponse.price || 0;
    this.name = DeliveryLocationlistResponse.name || '';
    this.isActive = DeliveryLocationlistResponse.isActive || 0;
    this.deliveryToCategory = DeliveryLocationlistResponse.deliveryToCategory || [];
    this.deliveryImage = DeliveryLocationlistResponse.deliveryImage || [];
    this.relatedDeliveryId = DeliveryLocationlistResponse.relatedDeliveryId || [];
    this.isFeatured = DeliveryLocationlistResponse.isFeatured || 0;
    this.todaydeals = DeliveryLocationlistResponse.todayDeals || 0;
    this.pricerefer = DeliveryLocationlistResponse.pricerefer || 0;
    this.flag = DeliveryLocationlistResponse.flag || 0;
    this.deliveryprice = DeliveryLocationlistResponse.deliveryprice || 0;
    this.selected = false;
  }
}
