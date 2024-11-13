/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class DeliveryUpdateModel {
  public locationName: string;
  public zipCode: number;
  public deliveryLocationId: any;
  constructor(fromDeliveryAdd: any) {
    this.locationName = fromDeliveryAdd.locationName || '';
    this.zipCode = fromDeliveryAdd.zipCode || 0;
    this.deliveryLocationId = fromDeliveryAdd.deliveryLocationId || '';
  }
}
