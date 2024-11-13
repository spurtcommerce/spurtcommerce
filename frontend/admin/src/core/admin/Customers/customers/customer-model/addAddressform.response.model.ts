/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class AddAddressResponseForm {
  public address1: string;
  public address2: string;
  public addressType: number;
  public city: string;
  public postcode: number;
  public state: string;
  public zoneId:number;
  public customerId: number;
  public addressId: number;

  constructor(addaddressresponseform: any) {
    this.address1 = addaddressresponseform.address1 || '';
    this.address2 = addaddressresponseform.address2 || '';
    this.city = addaddressresponseform.city || '';
    this.postcode = addaddressresponseform.pincode || '';
    this.state = addaddressresponseform.state || '';
    this.customerId = addaddressresponseform.customerId || '';
    this.addressType = addaddressresponseform.addresstype || '';
    if(addaddressresponseform.addressId){
      this.addressId = addaddressresponseform.addressId || '';
    }
    else{
      this.zoneId = addaddressresponseform.zoneId ||'';
    }
  }
}
