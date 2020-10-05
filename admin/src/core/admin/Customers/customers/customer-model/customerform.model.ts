/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class CustomerForm {
  public customerGroupId: number;
  public username: string;
  public email: string;
  public mobileNumber: number;
  public password: string;
  public confirmPassword: string;
  public avatar: string;
  public newsletter: number;
  public mailStatus: number;
  public status: number;
  public customerId: string;

  constructor(customerform: any) {
    this.customerGroupId = customerform.customerGroupId || '';
    this.username = customerform.username || '';
    this.email = customerform.email || '';
    this.mobileNumber = customerform.mobileNumber || 0;
    this.password = customerform.password || '';
    this.confirmPassword = customerform.confirmPassword || '';
    this.avatar = customerform.avatar || '';
    this.newsletter = customerform.newsletter || '';
    this.mailStatus = customerform.mailStatus || 0;
    this.status = customerform.status || 0;
    if (customerform.id) {
      this.customerId = customerform.id || 0;
    }
  }
}
