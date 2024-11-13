/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class DetailModel {
  public Id: string;

  constructor(DetailForm: any) {
    this.Id = DetailForm.Id || '';
  }
}
