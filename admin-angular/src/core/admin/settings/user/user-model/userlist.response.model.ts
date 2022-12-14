/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class UserListResponseModel {
  public userId: number;
  public username: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public avatar: any;
  public avatarPath: any;
  public phoneNumber: number;
  public address: string;
  public usergroup: any;

  constructor(listResponse: any) {
    this.userId = listResponse.userId || 0;
    this.username = listResponse.username || '';
    this.firstName = listResponse.firstName || '';
    this.lastName = listResponse.lastName || '';
    this.email = listResponse.email || '';
    this.avatarPath = listResponse.avatarPath || '';
    this.phoneNumber = listResponse.phoneNumber || '';
    this.address = listResponse.address || '';
    this.usergroup = listResponse.usergroup || '';
  }
}
