/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class PagesaddResponseModel {
  public content: string;
  public createdDate: string;
  public metaTagContent: string;
  public isActive: number;
  public title: string;
  public pageId: number;
  public metaTagTitle: string;
  public metaTagKeyword: string;

  constructor(addResponse: any) {
    this.content = addResponse.content || '';
    this.createdDate = addResponse.createdDate || '';
    this.metaTagContent = addResponse.metaTagContent || '';
    this.metaTagKeyword = addResponse.metaTagKeyword || '';
    this.metaTagTitle = addResponse.metaTagTitle || '';
    this.isActive = addResponse.isActive || 0;
    this.pageId = addResponse.pageId || 0;
    this.title = addResponse.title || '';
  }
}
