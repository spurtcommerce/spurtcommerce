/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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
  public categoryDescription:any

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
    this.categoryDescription=categoryupdateForm.categoryDescription || '';

  }
}
