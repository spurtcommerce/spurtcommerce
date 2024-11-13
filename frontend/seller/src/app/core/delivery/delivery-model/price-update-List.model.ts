/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class PriceUpdateListResponse {
  public createdDate: string;
  public file: string;
  public filePath: string;
  public title: string;
  public id: number;

  constructor(searchOptionListForm: any) {
    this.createdDate = searchOptionListForm.createdDate || '';
    this.file = searchOptionListForm.file || '';
    this.filePath = searchOptionListForm.filePath || '';
    this.title = searchOptionListForm.title || '';
    this.id = searchOptionListForm.id || '';

  }
}
