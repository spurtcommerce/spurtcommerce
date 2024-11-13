/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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
