/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class AddAddressListResponseForm {
  public address1: string;
  public address2: string;
  public addressId: number;
  public addressType: number;
  public city: string;
  public company: string;
  public countryId: number;
  public createdBy: string;
  public createdDate: string;
  public customerId: number;
  public firstName: string;
  public isActive: number;
  public lastName: string;
  public modifiedBy: string;
  public modifiedDate: string;
  public postcode: string;
  public state: string;
  public zoneId: number;
  public data: number;
  zone: any;
  public phoneNumber:string;
  public landmark:string;
  constructor(addaddresslistresponseform: any) {
    this.address1 = addaddresslistresponseform.address1 || '';
    this.address2 = addaddresslistresponseform.address2 || '';
    this.addressId = addaddresslistresponseform.addressId || 0;
    this.addressType = addaddresslistresponseform.addressType || 0;
    this.city = addaddresslistresponseform.city || '';
    this.company = addaddresslistresponseform.company || '';
    this.countryId = addaddresslistresponseform.countryId || 0;
    this.createdBy = addaddresslistresponseform.createdBy || '';
    this.createdDate = addaddresslistresponseform.createdDate || '';
    this.customerId = addaddresslistresponseform.customerId || 0;
    this.firstName = addaddresslistresponseform.firstName || '';
    this.isActive = addaddresslistresponseform.isActive || 0;
    this.lastName = addaddresslistresponseform.lastName || '';
    this.modifiedBy = addaddresslistresponseform.modifiedBy || '';
    this.modifiedDate = addaddresslistresponseform.modifiedDate || '';
    this.postcode = addaddresslistresponseform.postcode || '';
    this.state = addaddresslistresponseform.state || '';
    this.zoneId = addaddresslistresponseform.zoneId || '';
    this.data = addaddresslistresponseform.data || 0;
    this.zone = addaddresslistresponseform.zone || 0;
    this.phoneNumber = addaddresslistresponseform.phoneNo || '';
    this.landmark = addaddresslistresponseform.landmark || '';
  }
}
