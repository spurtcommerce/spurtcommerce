/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class OrderModel {
  public invoicePrefix: string;
  public orderStatus: number;
  public settingId: number;
  public siteUrl: number;
  constructor(generalsettingForm: any) {
    this.invoicePrefix = generalsettingForm.invoicePrefix || '';
    this.orderStatus = generalsettingForm.orderStatus || 0;
    this.settingId = generalsettingForm.settingId || 0;
    this.siteUrl = generalsettingForm.siteUrl || 0;
  }
}
