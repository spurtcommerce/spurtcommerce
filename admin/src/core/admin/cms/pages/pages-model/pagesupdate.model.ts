/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class PagesupdateModel {
  public title: string;
  public content: string;
  public active: number;
  public count: number;
  public pageId: number;
  public metaTagTitle: string;
  public metaTagContent: string;
  public metaTagKeyword: string;

  constructor(PagesUpdateForm: any) {
    this.title = PagesUpdateForm.title || '';
    this.content = PagesUpdateForm.content || '';
    this.active = PagesUpdateForm.active || 0;
    this.pageId = PagesUpdateForm.pageId || 0;
    this.metaTagTitle = PagesUpdateForm.metaTagTitle || '';
    this.metaTagContent = PagesUpdateForm.metaTagContent || '';
    this.metaTagKeyword = PagesUpdateForm.metaTagKeyword || '';
    if (PagesUpdateForm.bannerId) {
      this.pageId = PagesUpdateForm.pageId || 0;
    }
  }
}
