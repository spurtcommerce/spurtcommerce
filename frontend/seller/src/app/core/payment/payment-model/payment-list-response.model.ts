/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class PaymentListResponseModel {
  public CommissionAmount: number;
  public NetAmount: number;
  public commission: number;
  public isActive: number;
  public orderId: number;
  public orderStatusId: number;
  public subOrderStatusId: number;
  public vendorOrderId: number;
  public vendorId: number;
  public createdDate: string;
  public currencySymbolLeft: string;
  public currencySymbolRight: string;
  public customerFirstName: string;
  public orderColorCode: string;
  public shippingCity: string;
  public orderStatusName: string;
  public shippingCountry: string;
  public total: string;
  public subOrderId: string;
  public selected: boolean;
  constructor(paymentlistResponse: any) {
    this.CommissionAmount =  paymentlistResponse.CommissionAmount || 0;
    this.NetAmount =  paymentlistResponse.NetAmount || 0;
    this.commission =  paymentlistResponse.commission || 0;
    this.createdDate =  paymentlistResponse.createdDate || '';
    this.currencySymbolLeft =  paymentlistResponse.currencySymbolLeft || '';
    this.orderId =  paymentlistResponse.orderId || 0;
    this.currencySymbolRight =  paymentlistResponse.currencySymbolRight || '';
    this.isActive =  paymentlistResponse.isActive || 0;
    this.customerFirstName =  paymentlistResponse.customerFirstName || '';
    this.orderColorCode =  paymentlistResponse.orderColorCode || '';
    this.shippingCity =  paymentlistResponse.shippingCity || '';
    this.orderStatusName =  paymentlistResponse.orderStatusName || '';
    this.shippingCountry =  paymentlistResponse.shippingCountry || '';
    this.orderStatusId =  paymentlistResponse.orderStatusId || 0;
    this.subOrderStatusId =  paymentlistResponse.subOrderStatusId || 0;
    this.vendorOrderId =  paymentlistResponse.vendorOrderId || 0;
    this.vendorId =  paymentlistResponse.vendorId || 0;
    this.total =  paymentlistResponse.total || '';
    this.subOrderId = paymentlistResponse.subOrderId || '';
    this.selected = false;
  }
}
