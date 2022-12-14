/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class AddAddressForm {
  public address1: string;
  public address2: string;
  public addressType: number;
  public city: string;
  public postcode: number;
  public state: string;
  public customerId: number;
  public addressId: number;

  constructor(addaddressform: any) {
    this.address1 = addaddressform.address1 || '';
    this.address2 = addaddressform.address2 || '';
    this.city = addaddressform.city || '';
    this.postcode = addaddressform.pincode || '';
    this.state = addaddressform.state || '';
    this.customerId = addaddressform.customerId || '';
    this.addressType = addaddressform.addresstype || '';
    this.addressId = addaddressform.addressId || '';
  }
}
