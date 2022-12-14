/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class CategoryupdateForm {
  public categoryId: any;
  public name: string;
  public sortOrder: number;
  public metaTagDescription: string;
  public metaTagKeyword: string;
  public metaTagTitle: string;
  public parentInt: number;
  public image: string;
  public status: number;
  public categorySlug: string;

  constructor(categoryupdateForm: any) {
    this.categoryId = categoryupdateForm.categoryId;
    this.name = categoryupdateForm.name || '';
    this.sortOrder = categoryupdateForm.sortOrder || '';
    this.metaTagDescription = categoryupdateForm.metaTagDescription || '';
    this.metaTagKeyword = categoryupdateForm.metaTagKeyword || '';
    this.metaTagTitle = categoryupdateForm.metaTagTitle || '';
    this.parentInt = categoryupdateForm.parentInt || 0;
    this.image = categoryupdateForm.image || '';
    this.status = categoryupdateForm.status || '';
    this.categorySlug = categoryupdateForm.categorySlug || '';

  }
}
