/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class CustomerModel {
  public limit: number;
  public offset: number;
  public name: string;
  public email: string;
  public customerGroup: string;
  public date: string;
  public count: string;
  public status: string;

  constructor(params: any) {
    this.customerGroup = params.customerGroup || '';
    this.date = params.date || '';
    this.email = params.email || '';
    this.name = params.name || '';
    this.limit = params.limit || '';
    this.offset = params.offset || '';
    this.count = params.count || '';
    this.status = params.status || '';
  }
}
