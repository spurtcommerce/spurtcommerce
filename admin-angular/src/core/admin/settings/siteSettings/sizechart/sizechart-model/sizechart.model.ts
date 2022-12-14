/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class SizeChartForm {
  public templateName: string;
  public header: any;

  constructor(chartForm: any) {
    this.templateName = chartForm.templateName || '';
    this.header = chartForm.header || '';
  }
}
