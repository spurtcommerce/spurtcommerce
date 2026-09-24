/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { JsonController, Req, Res, Get, UseBefore } from 'routing-controllers';
import { PaymentRuleService } from '../../core/services/PaymentRuleService';
import { TenantValidationMiddleware } from '../../core/middlewares/TenantValidationMiddleware';
import { CustomerService } from '../../core/services/CustomerService';
import { CustomerToGroupService } from '../../core/services/CustomerToGroupService';
import { CheckTokenMiddleware } from '../../core/middlewares/checkTokenMiddleware';
import { Service } from 'typedi';

@Service()
@UseBefore(CheckTokenMiddleware)
@UseBefore(TenantValidationMiddleware)
@JsonController('/store-payment-rule')
export class StorePaymentRuleController {
    constructor(
        private paymentRuleService: PaymentRuleService,
        private customerService: CustomerService,
        private customerToGroupService: CustomerToGroupService
    ) {
        // --
    }

    // Payment Rule Detail API
    /**
     * @api {get} /api/store-payment-rule/dropdown-list Payment Rule Detail API
     * @apiGroup Vendor Payment Rule
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      'message': 'Successfully got payment rule drowdown list.',
     *      "data": {}
     *      'status': '1'
     * }
     * @apiSampleRequest /api/store-payment-rule/dropdown-list
     * @apiErrorExample {json} Store Payment Rule Translation Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/dropdown-list')
    public async PaymentRuleDropdown(@Res() response: any, @Req() request: any): Promise<any> {
        const getPaymentRules = await this.paymentRuleService.find({
            select: ['id', 'name', 'instructions'],
            where: {
                tenantId: request.tenantId, isActive: 1, isDelete: 0,
            },
            relations: ['paymentMethod'],
        });

        const result = await Promise.all(getPaymentRules.map(async (paymentRule) => {
            const temp = { ...paymentRule };
            const normalized = temp.paymentMethod.name.replace(/\s+/g, '').toLowerCase();
            if (normalized === 'paymentterms') {
                let paymentTerm;
                const customer = await this.customerService.findOne({ select: ['id'], where: { id: request.id }, relations: ['paymentTerm'] });
                paymentTerm = customer?.paymentTerm?.name ?? '';

                if (!paymentTerm) {
                    const customerToGroup = await this.customerToGroupService.findOne({ select: ['id'], where: { customerId: request.id, isActive: 1, customerGroup: { vendorId: request.tenantId, isActive: 1, isDelete: 0 } }, relations: ['customerGroup', 'customerGroup.paymentTerm'] });
                    paymentTerm = customerToGroup?.customerGroup?.paymentTerm?.name ?? '';
                }

                // tslint:disable-next-line:curly
                if (!paymentTerm) return null;
                temp.paymentTerm = paymentTerm;
            }
            temp.paymentMethod = undefined;
            return temp;
        }));
        const filteredResult = result.filter(Boolean);
        if (!filteredResult.length) {
            const errorResponse: any = {
                status: 1,
                message: 'No payment methods are available, please contact us to complete the order submission.',

            };
            return response.status(400).send(errorResponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got payment rule dropdown list.',
            data: filteredResult,

        };
        return response.status(200).send(successResponse);
    }
}
