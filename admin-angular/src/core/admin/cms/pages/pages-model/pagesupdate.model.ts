/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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
  public pageGroupId: any;


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
    this.pageGroupId = PagesUpdateForm.pageGroupId || 0;

  }
}
