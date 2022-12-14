/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class SeoModel {
  public metaTagTitle: string;
  public metaTagDescription: string;
  public metaTagKeywords: string;

  constructor(generalsettingForm: any) {
    this.metaTagTitle = generalsettingForm.metaTagTitle || '';
    this.metaTagDescription = generalsettingForm.metaTagDescription || '';
    this.metaTagKeywords = generalsettingForm.metaTagKeywords || '';
  }
}
