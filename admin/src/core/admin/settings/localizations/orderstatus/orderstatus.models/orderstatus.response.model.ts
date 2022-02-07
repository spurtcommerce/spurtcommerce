/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class OrderstatusResponseModel {
  public orderStatusId: number;
  public name: string;
  public modifiedDate: string;
  public modifiedBy: string;
  public isActive: number;
  public createdDate: string;
  public createdBy: string;

  constructor(orderstatusFormResponse: any) {
    this.name = orderstatusFormResponse.name || '';
    this.orderStatusId = orderstatusFormResponse.orderStatusId || 0;
    this.modifiedDate = orderstatusFormResponse.modifiedDate || '';
    this.modifiedBy = orderstatusFormResponse.modifiedBy || '';
    this.isActive = orderstatusFormResponse.isActive || 0;
    this.createdDate = orderstatusFormResponse.createdDate || '';
    this.createdBy = orderstatusFormResponse.createdBy || '';
  }
}
