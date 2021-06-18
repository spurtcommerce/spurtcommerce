/*
 * spurtcommerce
 * version 1.0
 * www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

export class SubcategoryResponseModel {
  public categoryId: number;
  public parentInt: number;
  public sortOrder: number;
  public levels: Array<any>;
  public children: Array<any>;
  public image: string;
  public imagePath: string;
  public metaTagDescription: string;
  public metaTagKeyword: string;
  public metaTagTitle: string;
  public name: string;

  constructor(subcategoryresponse: any) {
    this.categoryId = subcategoryresponse.categoryId || '';
    this.parentInt = subcategoryresponse.parentInt || '';
    this.sortOrder = subcategoryresponse.sortOrder || '';
    this.levels = subcategoryresponse.levels || [];
    this.children = subcategoryresponse.children || [];
    this.image = subcategoryresponse.image || '';
    this.imagePath = subcategoryresponse.imagePath || '';
    this.metaTagDescription = subcategoryresponse.metaTagDescription || '';
    this.metaTagKeyword = subcategoryresponse.metaTagKeyword || '';
    this.name = subcategoryresponse.name || '';
  }
}
