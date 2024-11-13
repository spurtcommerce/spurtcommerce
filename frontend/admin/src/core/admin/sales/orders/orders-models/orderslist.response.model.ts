/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class OrderslistResponseModel {
  public orderId: number;
  public totalAmount: string;
  public dateAdded: string;
  public keyword: string;
  public shippingFirstName: string;
  public dateModified: string;
  public isActive: number;
  public orderStatus: object;
  public invoicePrefix: string;
  public orderPrefixId: string;
  public currencySymbolLeft: string;
  public currencySymbolRight: string;
  public NoOfItems: number;
  public shippingZone: string;
  public shippingCity: string;

  constructor(responseOrdersListForm: any) {
    this.orderId = responseOrdersListForm.orderId || 0;
    this.totalAmount = responseOrdersListForm.total || '';
    this.dateAdded = responseOrdersListForm.createdDate || '';
    this.keyword = responseOrdersListForm.keyword || '';
    this.shippingFirstName = responseOrdersListForm.shippingFirstname || '';
    this.dateModified = responseOrdersListForm.modifiedDate || '';
    this.isActive = responseOrdersListForm.isActive || 0;
    this.orderStatus = responseOrdersListForm.orderStatus;
    this.invoicePrefix = responseOrdersListForm.invoicePrefix || 'SPU';
    this.orderPrefixId = responseOrdersListForm.orderPrefixId || '';
    this.currencySymbolLeft = responseOrdersListForm.currencySymbolLeft;
    this.currencySymbolRight = responseOrdersListForm.currencySymbolRight;
    this.NoOfItems = responseOrdersListForm.NoOfItems || 0;
    this.shippingZone = responseOrdersListForm.shippingZone || '';
    this.shippingCity = responseOrdersListForm.shippingCity || '';

  }
}
