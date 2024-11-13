/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class CategoryModel {
  public limit: number;
  public offset: number;
  public keyword: string;
  public sortOrder: string;
  public count: boolean;

  constructor(categorylistForm: any) {
    this.limit = categorylistForm.limit || '';
    this.offset = categorylistForm.offset || '';
    this.keyword = categorylistForm.keyword || '';
    this.sortOrder = categorylistForm.sortOrder || '';
    this.count = categorylistForm.count || false;
  }
}
