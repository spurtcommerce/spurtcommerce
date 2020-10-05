/*
 * spurtcommerce
 * version 1.0
 * www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class EnquiryModel {
  public name: string;
  public email: string;
  public mobile: number;
  public comments: string;
  public serviceId: number;

  constructor(enquiry: any) {
    this.name = enquiry.name || '';
    this.email = enquiry.email || '';
    this.mobile = enquiry.mobile || 0;
    this.comments = enquiry.comments || '';
    this.serviceId = enquiry.serviceId || '';
  }
}
