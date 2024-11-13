/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class StatusRequest {


    public deliveryId: number;
    public status: number;

     constructor(statusRequest: any) {
         this.deliveryId = statusRequest.deliveryId || '';
         this.status = statusRequest.status || 0;
     }
 }
