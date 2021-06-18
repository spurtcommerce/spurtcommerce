/*
 * spurtcommerce
 * version 1.0
 * www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class CategorychildrenResponseModel {
  public categoryId: string;
  public image: string;
  public imagePath: string;
  public isActive: string;
  public metaTagDescription: string;
  public metaTagKeyword: string;
  public metaTagTitle: string;
  public name: string;
  public parentInt: string;
  public sortOrder: string;
  public children: CategorychildrenResponseModel;

  constructor(listResponse: any) {
    this.categoryId = listResponse.categoryId || '';
    this.image = listResponse.image || '';
    this.imagePath = listResponse.imagePath || '';
    this.isActive = listResponse.isActive || '';
    this.metaTagDescription = listResponse.metaTagDescription || '';
    this.metaTagKeyword = listResponse.metaTagKeyword || '';
    this.metaTagTitle = listResponse.metaTagTitle || '';
    this.name = listResponse.name || '';
    this.parentInt = listResponse.parentInt || '';
    this.sortOrder = listResponse.sortOrder || '';
    this.children = listResponse.children
      ? listResponse.children.map(children => {
          return new CategorychildrenResponseModel(children);
        })
      : [];
  }
}
