/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class ManufacturerListResponseModel {
  public manufacturerId: number;
  public name: string;
  public image: string;
  public imagePath: string;
  public sortOrder: number;
  public isActive: number;

  constructor(manufacturerListResponse: any) {
    this.manufacturerId = manufacturerListResponse.manufacturerId || 0;
    this.name = manufacturerListResponse.name || '';
    this.image = manufacturerListResponse.image || '';
    this.imagePath = manufacturerListResponse.imagePath || '';
    this.sortOrder = manufacturerListResponse.sortOrder || 0;
    this.isActive = manufacturerListResponse.isActive || 0;
  }
}
