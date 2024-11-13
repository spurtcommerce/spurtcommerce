/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class CategoryAddForm {
    public vendorId: number;
    public categoryId: number;
    public commission: number;

    constructor(categoryAddForm: any) {
      this.vendorId = categoryAddForm.vendorId || '';
      this.categoryId = categoryAddForm.categoryId || '';
      this.commission = categoryAddForm.commission || '';

    }
  }
