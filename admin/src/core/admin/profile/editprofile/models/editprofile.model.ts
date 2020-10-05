/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
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
