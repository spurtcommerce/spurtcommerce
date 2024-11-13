/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class ApprovalRequest {


    public vendorId: number;
    public approvalFlag: number;

     constructor(approvalRequest: any) {
         this.vendorId = approvalRequest.vendorId || '';
         this.approvalFlag = approvalRequest.approvalFlag || 1;
     }
 }
