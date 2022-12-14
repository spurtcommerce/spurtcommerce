/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class CustomerFormResponseModel {
  public customerGroupId: number;
  public username: string;
  public email: string;
  public mobileNumber: string;
  public password: string;
  public confirmPassword: string;
  public avatar: string;
  public newsletter: number;
  public mailStatus: number;
  public status: number;
  public customerId: number;
  public avatarPath: string;
  public createdDate: string;
  public deleteFlag: number;
  public firstName: string;
  public isActive: number;

  constructor(customerresponsemodel: any) {
    this.customerGroupId = customerresponsemodel.customerGroupId || 0;
    this.username = customerresponsemodel.username || '';
    this.email = customerresponsemodel.email || '';
    this.mobileNumber = customerresponsemodel.mobileNumber || 0;
    this.password = customerresponsemodel.password || '';
    this.confirmPassword = customerresponsemodel.confirmPassword || '';
    this.avatar = customerresponsemodel.avatar || '';
    this.newsletter = customerresponsemodel.newsletter || 0;
    this.mailStatus = customerresponsemodel.mailStatus || 0;
    this.status = customerresponsemodel.status || 0;
    this.customerId = customerresponsemodel.id || 0;
    this.avatarPath = customerresponsemodel.avatarPath || '';
    this.createdDate = customerresponsemodel.createdDate || '';
    this.deleteFlag = customerresponsemodel.deleteFlag || 0;
    this.firstName = customerresponsemodel.firstName || '';
    this.isActive = customerresponsemodel.isActive || 0;
    this.firstName = customerresponsemodel.firstName || '';
  }
}
