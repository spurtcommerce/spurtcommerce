/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class ChangePasswordModel {
  public oldPassword: any;
  public newPassword: any;

  constructor(loginRequest: any) {
    this.oldPassword = loginRequest.currentPassword || '';
    this.newPassword = loginRequest.newPassword || '';
  }
}
