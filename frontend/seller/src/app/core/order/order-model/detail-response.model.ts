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
  public createdDate: string;
  public currencySymbolLeft: string;
  public currencySymbolRight: string;
  public customerFirstName: string;
  public orderId: number;
  public orderStatusName: string;
  public paymentMethod: string;
  public paymentStatus: any;
  public productList: any;
  public deliveryPersonId: number;
  public shippingAddress1: string;
  public shippingAddress2: string;
  public shippingCity: string;
  public shippingCountry: string;
  public shippingPostcode: string;
  public shippingZone: string;
  public statusColorCode: string;
  public subOrderId: string;
  public subOrderStatusId: number;
  public total: number;
  public vendorId: number;
  public vendorOrderId: number;
  public trackingNo: string;
  public trackingUrl: string;
  public orderStatusId: any;
  public orderPrefixId: any;
  public email: any;
  public mobileNumber: any;

  constructor(detailResponse: any) {
    this.createdDate = detailResponse.createdDate || '';
    this.currencySymbolLeft = detailResponse.currencySymbolLeft || '';
    this.currencySymbolRight = detailResponse.currencySymbolRight || '';
    this.customerFirstName = detailResponse.customerFirstName || '';
    this.orderId = detailResponse.orderId || 0;
    this.orderStatusName = detailResponse.orderStatusName || '';
    this.paymentMethod = detailResponse.paymentMethod || '';
    this.productList = detailResponse.productList || [];
    this.shippingAddress1 = detailResponse.shippingAddress1 || '';
    this.shippingAddress2 = detailResponse.shippingAddress2 || '';
    this.shippingCity = detailResponse.shippingCity || '';
    this.shippingCountry = detailResponse.shippingCountry || '';
    this.shippingPostcode = detailResponse.shippingPostcode || '';
    this.shippingZone = detailResponse.shippingZone || '';
    this.statusColorCode = detailResponse.statusColorCode || '';
    this.subOrderId = detailResponse.subOrderId || '';
    this.subOrderStatusId = detailResponse.subOrderStatusId || 0;
    this.total = detailResponse.total || 0;
    this.vendorId = detailResponse.vendorId || 0;
    this.vendorOrderId = detailResponse.vendorOrderId || 0;
    this.paymentStatus = detailResponse.paymentStatus || '';
    this.trackingUrl = detailResponse.trackingUrl || '';
    this.trackingNo = detailResponse.trackingNo || '';
    this.deliveryPersonId = detailResponse.deliveryPersonId || 0;
    this.orderStatusId = detailResponse.orderStatusId || '';
    this.orderPrefixId = detailResponse.orderPrefixId || '';
    this.email = detailResponse.email || '';
    this.mobileNumber = detailResponse.mobileNumber || ''
  }
}
