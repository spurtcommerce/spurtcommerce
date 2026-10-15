/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { JsonController, Authorized, Req, Res, Get } from 'routing-controllers';
import { PaymentTermService } from '../../core/services/PaymentTermService';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-payment-term')
export class VendorPaymentTermController {
    constructor(
        private paymentTermService: PaymentTermService
    ) {
        // --
    }

    /**
     * @api {get} /api/vendor-payment-term/dropdown-list Get Payment Term Dropdown List
     * @apiGroup Vendor Payment Term
     * @apiName VendorPaymentTermDropdownList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got payment term dropdown list.",
     *         "data": [
     *             {
     *                 "id": 1,
     *                 "name": "Net 30",
     *                 "termDays": 30,
     *                 "isActive": 1
     *             }
     *         ]
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Internal Server Error"
     *     }
     *
     * @apiSampleRequest /api/vendor-payment-term/dropdown-list
     */
    @Get('/dropdown-list')
    @Authorized(['vendor'])
    public async PaymentTermDropdown(@Res() response: any, @Req() request: any): Promise<any> {
        const getPaymentTerm = await this.paymentTermService.find({
            select: ['id', 'name', 'termDays', 'isActive', 'isDelete', 'tenantId', 'createdBy', 'createdDate', 'modifiedBy', 'modifiedDate'],
            where: {
                tenantId: request.user.tenantId, isActive: 1, isDelete: 0,
            },
        });

        const successResponse: any = {
            status: 1,
            message: 'Successfully got payment term dropdown list.',
            data: getPaymentTerm,
        };
        return response.status(200).send(successResponse);
    }

}
