/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class OauthModel {
  public emailId: any;
  public url: any;
  public oAuthData: string;
  constructor(oauthRequest: any) {
    this.url = oauthRequest.url || '';
    this.emailId = oauthRequest.email || '';
    this.oAuthData = oauthRequest.oAuthData || '';
  }
}
