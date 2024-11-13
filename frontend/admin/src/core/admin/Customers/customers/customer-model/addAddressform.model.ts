/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class AddAddressForm {
  public address1: string;
  public address2: string;
  public addressType: number;
  public city: string;
  public postcode: number;
  public state: string;
  public zoneId:number;
  public customerId: number;
  public addressId: number;
  public countryId: number;
  public company: string;
 public firstName:String;
 public lastName:String;
 public phoneNumber:String;
 public landmark:String;
  constructor(addaddressform: any) {
    this.state = addaddressform.state || '';
    this.customerId = addaddressform.customerId || '';
    this.addressId = addaddressform.addressId || '';

    this.firstName = addaddressform.firstName || '';
    this.lastName = addaddressform.lastName || '';
    this.phoneNumber = addaddressform.phoneNumber || '';
    this.address1 = addaddressform.address1 || '';
    this.address2 = addaddressform.address2 || '';
    this.landmark = addaddressform.landmark || '';
    this.city = addaddressform.city || '';
    this.addressType = addaddressform.addresstype || '';
    this.countryId = addaddressform.countryId || '';

  

    this.postcode = addaddressform.pincode || '';
    if(addaddressform.company){
      this.company = addaddressform.company || '';
    }
    if(addaddressform.zoneId){
      this.zoneId = addaddressform.zoneId || ''
    }else{
      this.zoneId = 0;
    }
  }
}
