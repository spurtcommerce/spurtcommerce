/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class EmailTempForm {
  public title: String;
  public subject: string;
  public content: String;
  public status: number;
  public Id: number;

  constructor(emailtempForm: any) {
    this.title = emailtempForm.title || '';
    this.subject = emailtempForm.subject || '';
    this.content = emailtempForm.content || '';
    this.status = emailtempForm.status || 0;
    if (emailtempForm && emailtempForm.id) {
      this.Id = emailtempForm.id || 0;
    }
  }
}
