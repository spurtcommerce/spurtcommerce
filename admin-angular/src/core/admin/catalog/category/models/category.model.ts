/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class CategoryForm {
  public name: string;
  public sortOrder: number;
  public metaTagDescription: string;
  public metaTagKeyword: string;
  public metaTagTitle: string;
  public parentInt: number;
  public image: string;
  public imagePath: string;
  public status: number;
  public categorySlug: string;

  constructor(categoryForm: any) {
    this.name = categoryForm.name || '';
    this.sortOrder = categoryForm.sortOrder || '';
    this.metaTagDescription = categoryForm.metaTagDescription || '';
    this.metaTagKeyword = categoryForm.metaTagKeyword || '';
    this.metaTagTitle = categoryForm.metaTagTitle || '';
    this.parentInt = categoryForm.parentInt || 0;
    this.image = categoryForm.image || '';
    this.imagePath = categoryForm.imagePath || '';
    this.status = categoryForm.status || '';
    this.categorySlug = categoryForm.categorySlug || '';
  }
}
