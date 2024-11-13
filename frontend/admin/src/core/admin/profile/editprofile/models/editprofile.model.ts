/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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
