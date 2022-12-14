/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class EditprofileForm {
  public username: string;
  public phoneNumber: string;
  public email: string;
  public address: string;
  public avatar: string;

  constructor(editprofileForm: any) {
    this.username = editprofileForm.username || '';
    this.phoneNumber = editprofileForm.phoneNumber || '';
    this.email = editprofileForm.email || '';
    this.address = editprofileForm.address || '';
    if (editprofileForm.avatar) {
      this.avatar = editprofileForm.avatar || '';
    }
  }
}
