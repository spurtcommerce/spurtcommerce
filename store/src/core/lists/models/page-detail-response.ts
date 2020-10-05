/*
 * spurtcommerce
 * version 1.0
 * www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class PageDetailResponse {
  public content: string;
  public createdBy: string;
  public createdDate: string;
  public intro: string;
  public isActive: string;
  public metaTagContent: string;
  public metaTagKeyword: string;
  public metaTagTitle: string;
  public modifiedBy: string;
  public modifiedDate: string;
  public pageGroupId: string;
  public pageId: string;
  public sortOrder: string;
  public title: string;
  public viewPageCount: string;

  constructor(detailResponse: any) {
    this.content = detailResponse.content || '';
    this.createdBy = detailResponse.createdBy || '';
    this.createdDate = detailResponse.createdDate || '';
    this.intro = detailResponse.intro || '';
    this.isActive = detailResponse.isActive || '';
    this.metaTagContent = detailResponse.metaTagContent || '';
    this.metaTagKeyword = detailResponse.metaTagKeyword || '';
    this.metaTagTitle = detailResponse.metaTagTitle || '';
    this.modifiedBy = detailResponse.modifiedBy || '';
    this.modifiedDate = detailResponse.modifiedDate || '';
    this.pageGroupId = detailResponse.pageGroupId || '';
    this.pageId = detailResponse.pageId || '';
    this.sortOrder = detailResponse.sortOrder || '';
    this.title = detailResponse.title || '';
    this.viewPageCount = detailResponse.viewPageCount || '';
  }
}
