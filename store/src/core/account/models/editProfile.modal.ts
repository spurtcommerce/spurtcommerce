/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class EditProfileModal {
  public firstName: any;
  public lastName: any;
  public password: any;
  public emailId: any;
  public phoneNumber: any;
  public image: any;

  constructor(editRequest: any) {
    this.firstName = editRequest.firstName || '';
    this.lastName = editRequest.lastName || '';
    this.password = editRequest.password || '';
    this.emailId = editRequest.email || '';
    this.phoneNumber = editRequest.phoneNumber || '';
    this.image = editRequest.image || '';
  }
}
