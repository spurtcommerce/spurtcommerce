/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class CustomerListForm {
  public limit: number;
  public offset: number;
  public name: string;
  public email: string;
  public customerGroup: string;
  public date: string;
  public count: string;
  public status: number;
  public keyword: string;

  constructor(customerlistform: any) {
    this.customerGroup = customerlistform.customerGroup || '';
    this.date = customerlistform.date || '';
    this.keyword = customerlistform.keyword || '';
    this.email = customerlistform.email || '';
    this.name = customerlistform.name || '';
    this.limit = customerlistform.limit || 0;
    this.offset = customerlistform.offset || 0;
    this.count = customerlistform.count || 0;
    this.status = customerlistform.status || '';
  }
}
