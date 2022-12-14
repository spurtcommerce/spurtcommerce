/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class ManufacturerAddresponseModel {
   public name: string;
   public path: string;

    constructor(manufacturerAddresponse: any) {
      this.name = manufacturerAddresponse || '';
      this.path = manufacturerAddresponse || '';
    }
  }
