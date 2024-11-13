/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class CategoryupdateForm {
  public vendorId: number;
  public categoryId: number;
  public commission: number;
  public vendorCategoryId: number;

  constructor(categoryupdateForm: any) {
    this.vendorId = categoryupdateForm.vendorId || '';
    this.categoryId = categoryupdateForm.categoryId || '';
    this.commission = categoryupdateForm.commission || '';
    this.vendorCategoryId = categoryupdateForm.vendorCategoryId || '';
  }
}
