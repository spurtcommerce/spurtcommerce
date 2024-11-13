/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class StatusRequest {


    public productId: number;
    public status: number;

     constructor(statusRequest: any) {
         this.productId = statusRequest.productId || '';
         this.status = statusRequest.status || 0;
     }
 }
