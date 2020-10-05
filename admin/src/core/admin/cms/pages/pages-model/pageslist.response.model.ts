/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class PageslistResponseModel {
  public content: string;
  public metaTagContent: string;
  public isActive: number;
  public title: string;
  public pageId: number;
  public metaTagTitle: string;
  public metaTagKeyword: string;

  constructor(listResponse: any) {
    this.content = listResponse.content || '';
    this.metaTagContent = listResponse.metaTagContent || '';
    this.metaTagKeyword = listResponse.metaTagKeyword || '';
    this.metaTagTitle = listResponse.metaTagTitle || '';
    this.isActive = listResponse.isActive || 0;
    this.pageId = listResponse.pageId || 0;
    this.title = listResponse.title || '';
  }
}
