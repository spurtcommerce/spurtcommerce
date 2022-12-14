/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class EmailTempListResponseModel {
  public emailTemplateId: number;
  public title: string;
  public subject: string;
  public content: string;
  public isActive: number;

  constructor(listResponse: any) {
    this.emailTemplateId = listResponse.emailTemplateId || 0;
    this.title = listResponse.title || '';
    this.subject = listResponse.subject || '';
    this.content = listResponse.content || '';
    this.emailTemplateId = listResponse.emailTemplateId || 0;
    this.isActive = listResponse.isActive || 0;
  }
}
