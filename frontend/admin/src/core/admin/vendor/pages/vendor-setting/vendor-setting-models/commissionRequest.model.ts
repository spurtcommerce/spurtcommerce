/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class CommissionRequest {
    public commission: Number;
    public vendorId: Number;
    constructor(commissionRequest: any) {
        this.commission = commissionRequest.defaultCommission;
        this.vendorId = commissionRequest.vendorId;
    }
  }
