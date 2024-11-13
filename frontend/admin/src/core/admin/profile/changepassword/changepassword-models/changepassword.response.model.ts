/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class ChangepasswordResponseModel {
  public user: any = {};

  constructor(changepasswordResponse: any) {
    this.user = changepasswordResponse || '';
  }
}
