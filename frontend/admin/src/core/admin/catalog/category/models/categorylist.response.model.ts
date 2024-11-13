/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class CategorylistResponseModel {
  public categoryId: any = {};
  public name: any = {};
  public image: any = {};
  public imagePath: any = {};
  public parentInt: any = {};
  public sortOrder: any = {};
  public metaTagTitle: any = {};
  public metaTagDescription: any = {};
  public metaTagKeyword: any = {};
  public isActive: number;
  public levels: string;
  public categoryDescription:any
  public categorySlug:any;

  constructor(categorylistResponse: any) {
    this.categoryId = categorylistResponse.categoryId || '';
    this.categorySlug = categorylistResponse.categorySlug || '';
    this.name = categorylistResponse.name || '';
    this.image = categorylistResponse.image || '';
    this.imagePath = categorylistResponse.imagePath || '';
    this.parentInt = categorylistResponse.parentInt || '';
    this.sortOrder = categorylistResponse.sortOrder || '';
    this.metaTagTitle = categorylistResponse.metaTagTitle || '';
    this.metaTagDescription = categorylistResponse.metaTagDescription || '';
    this.metaTagKeyword = categorylistResponse.metaTagKeyword || '';
    this.isActive = categorylistResponse.isActive || 0;
    this.levels = categorylistResponse.levels || '';
    this.categoryDescription=categorylistResponse.categoryDescription || '';
  }
}
