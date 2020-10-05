/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class ManufactureAddModel {
  public name: string;
  public image: string;
  public sortOrder: number;
  public status: number;

  constructor(manufactureAddForm: any) {
    this.name = manufactureAddForm.name || '';
    this.image = manufactureAddForm.image || '';
    this.sortOrder = manufactureAddForm.sortOrder || 0;
    this.status = manufactureAddForm.status || 0;
  }
}
