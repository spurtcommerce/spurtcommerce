/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class OrderListResponseModel {
  public orderId: number;
  public sku: string;
  public quantity: number;
  public image: string;
  public imagePath: string;
  public price: number;
  public name: string;
  public isActive: number;
  public orderToCategory: any;
  public orderImage: any;
  public relatedOrderId: any;
  public isFeatured: any;
  public todaydeals: any;
  public pricerefer: number;
  public flag: number;
  public orderprice: string;

  constructor(orderlistResponse: any) {
    this.orderId = orderlistResponse.orderId || 0;
    this.sku = orderlistResponse.sku || '';
    this.quantity = orderlistResponse.quantity || 0;
    this.image = orderlistResponse.image || '';
    this.imagePath = orderlistResponse.imagePath || '';
    this.price = orderlistResponse.price || 0;
    this.name = orderlistResponse.name || '';
    this.isActive = orderlistResponse.isActive || 0;
    this.orderToCategory = orderlistResponse.orderToCategory || [];
    this.orderImage = orderlistResponse.orderImage || [];
    this.relatedOrderId = orderlistResponse.relatedOrderId || [];
    this.isFeatured = orderlistResponse.isFeatured || 0;
    this.todaydeals = orderlistResponse.todayDeals || 0;
    this.pricerefer = orderlistResponse.pricerefer || 0;
    this.flag = orderlistResponse.flag || 0;
    this.orderprice = orderlistResponse.orderprice || 0;

  }
}
