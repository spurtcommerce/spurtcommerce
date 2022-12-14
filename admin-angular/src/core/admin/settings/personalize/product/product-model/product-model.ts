/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class ProductModel {
  public categoryProductCount: number;
  public itemsPerPage: number;

  constructor(generalsettingForm: any) {
    this.categoryProductCount = generalsettingForm.categoryProductCount || 0;
    this.itemsPerPage = generalsettingForm.itemPage || 0;
  }
}
