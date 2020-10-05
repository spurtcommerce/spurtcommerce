/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class ProfileModel {
  public address: string;
  public avatar: string;
  public avatarPath: string;
  public zoneId: number;
  public countryId: number;
  public createdDate: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public pincode: string;
  public mobileNumber: string;
  public id: string;
  public lastLogin: string;
  public username: string;

  constructor(bannerRequest: any) {
    this.address = bannerRequest.address || '';
    this.avatar = bannerRequest.avatar || '';
    this.avatarPath = bannerRequest.avatarPath || '';
    this.zoneId = bannerRequest.zoneId || '';
    this.countryId = bannerRequest.countryId || '';
    this.createdDate = bannerRequest.createdDate || '';
    this.email = bannerRequest.email || '';
    this.firstName = bannerRequest.firstName || '';
    this.lastName = bannerRequest.lastName || '';
    this.pincode = bannerRequest.pincode || '';
    this.mobileNumber = bannerRequest.mobileNumber || '';
    this.id = bannerRequest.id || '';
    this.lastLogin = bannerRequest.lastLogin || '';
    this.username = bannerRequest.username || '';
  }
}
