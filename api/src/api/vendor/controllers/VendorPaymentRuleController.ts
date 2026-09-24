/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Post, Body, JsonController, Authorized, Req, Res, Put, Param, Get, QueryParam, Delete } from 'routing-controllers';
import { CreatePaymentRuleRequest } from './requests/CreatePaymentRuleRequest';
import { PaymentRule } from '../../core/models/PaymentRule';
import { PaymentRuleService } from '../../core/services/PaymentRuleService';
import { Not } from 'typeorm';
import { PaymentMethodService } from '../../core/services/PaymentMethodService ';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-payment-rule')
export class VendorPaymentRuleController {
    constructor(
        private paymentRuleService: PaymentRuleService,
        private paymentMethodService: PaymentMethodService
    ) {
        // --
    }

    // Create Vendor Payment rule API
    /**
     * @api {post} /api/vendor-payment-rule Create Vendor Payment rule API
     * @apiGroup Vendor Payment rule
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} name
     * @apiParam (Request body) {String} instructions
     * @apiParam (Requestt body) {Number} paymentMethodId
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "instructions": "",
     *      "paymentMethodId": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Payment rule created sucessfully.",
     *      "status": "1",
     *      "data": {}
     * }
     * @apiSampleRequest /api/vendor-payment-rule
     * @apiErrorExample {json} Customer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized('vendor')
    public async createPaymentRule(@Body({ validate: true }) payload: CreatePaymentRuleRequest, @Res() response: any, @Req() request: any): Promise<any> {

        const slugName = payload.name.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();

        const existPaymentRule: PaymentRule = await this.paymentRuleService.findOne({ where: { slug: slugName, isDelete: 0 } });
        if (existPaymentRule) {
            const errorResponse: any = {
                status: 0,
                message: 'Name already exist..',
            };
            return response.status(400).send(errorResponse);
        }
        const newPaymentRule = new PaymentRule();
        newPaymentRule.name = payload.name;
        newPaymentRule.tenantId = request.user.tenantId;
        newPaymentRule.createdBy = request.user.id;
        newPaymentRule.instructions = payload.instructions;
        newPaymentRule.slug = slugName;
        newPaymentRule.paymentMethodId = payload.paymentMethodId;

        const savePaymentRule = await this.paymentRuleService.save(newPaymentRule);

        const successResponse: any = {
            status: 1,
            message: 'Payment rule created sucessfully.',
            data: savePaymentRule,
        };
        return response.status(200).send(successResponse);
    }

    // Update Vendor Payment rule API
    /**
     * @api {put} /api/vendor-payment-rule Update Vendor Payment rule API
     * @apiGroup Vendor Payment rule
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} name
     * @apiParam (Request body) {Number} instructions
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "instructions" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Payment rule update sucessfully.",
     *      "status": "1",
     *      "data": {}
     * }
     * @apiSampleRequest /api/vendor-payment-rule
     * @apiErrorExample {json} Customer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    @Authorized('vendor')
    public async updatePaymentRule(@Param('id') paymentRuleId: number, @Body({ validate: true }) payload: CreatePaymentRuleRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const slugName = payload.name.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        const existPaymentRule = await this.paymentRuleService.findOne({ where: { id: Not(paymentRuleId), slug: slugName, isDelete: 0 } });
        if (existPaymentRule) {
            const errorResponse: any = {
                status: 0,
                message: 'Name already exist..',
            };
            return response.status(400).send(errorResponse);
        }
        const paymentRule: PaymentRule = await this.paymentRuleService.findOne({ where: { id: paymentRuleId } });
        paymentRule.name = payload.name;
        paymentRule.modifiedBy = request.user.id;
        paymentRule.slug = slugName;
        paymentRule.instructions = payload.instructions;
        paymentRule.paymentMethodId = payload.paymentMethodId;

        const updatePaymentRule = await this.paymentRuleService.update(paymentRuleId, paymentRule);

        const successResponse: any = {
            status: 1,
            message: 'Payment rule update sucessfully.',
            data: updatePaymentRule,
        };
        return response.status(200).send(successResponse);
    }

    // Payment rule List API
    /**
     * @api {get} /api/vendor-payment-rule Payment rule List API
     * @apiGroup Vendor Payment rule
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword filter
     * @apiParam (Request body) {Number} count count of the payment rule
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully got the payment rule list.",
     *      "data": []
     * }
     * @apiSampleRequest /api/vendor-payment-rule
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized('vendor')
    public async listPaymentRule(
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('count') count: number | boolean,
        @QueryParam('keyword') keyword: string,
        @Res() response: any, @Req() request: any): Promise<any> {

        const select = ['paymentRule.id', 'paymentRule.name', 'paymentRule.instructions', 'paymentRule.isActive', 'paymentRule.isDelete', 'paymentRule.createdDate', 'paymentRule.modifiedDate', 'paymentRule.paymentMethodId'];

        const whereConditions = [
            {
                name: 'paymentRule.tenantId',
                op: 'where',
                value: request.user.tenantId,
            },
            {
                name: 'paymentRule.isDelete',
                op: 'and',
                value: 0,
            },
        ];

        const relations = [
            {
                tableName: 'paymentRule.paymentMethod',
                aliasName: 'paymentMethod',
                op: 'left',
            },
        ];

        const searchConditions = [];
        if (keyword) {
            searchConditions.push({
                name: ['paymentRule.name'],
                value: keyword,
            });
        }

        const sort = [
            {
                name: 'paymentRule.createdDate',
                order: 'DESC',
            },
        ];

        const paymentRuleList: any = await this.paymentRuleService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], sort, count, false);
        if (count) {
            const successCountResponse: any = {
                status: 1,
                message: 'Successfully got the payment rule count.',
                data: paymentRuleList,
            };
            return response.status(200).send(successCountResponse);
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the payment rule list.',
            data: paymentRuleList,
        };
        return response.status(200).send(successResponse);
    }

    // Payment rule Detail API
    /**
     * @api {get} /api/vendor-payment-rule/dropdown-list Payment rule Detail API
     * @apiGroup Vendor Payment rule
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      'message': 'Successfully got payment rule drowdown list.',
     *      "data": {}
     *      'status': '1'
     * }
     * @apiSampleRequest /api/vendor-payment-rule/dropdown-list
     * @apiErrorExample {json} Payment Rule Detail Error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/dropdown-list')
    @Authorized(['vendor'])
    public async PaymentRuleDropdown(@Res() response: any, @Req() request: any): Promise<any> {

        const getPaymentRule = await this.paymentRuleService.find({
            select: ['id', 'name', 'isActive', 'instructions', 'isDelete', 'tenantId', 'createdBy', 'createdDate', 'modifiedBy', 'modifiedDate', 'paymentMethodId'],
            where: {
                tenantId: request.user.tenantId, isActive: 1, isDelete: 0,
            },
        });

        const successResponse: any = {
            status: 1,
            message: 'Successfully got payment rule dropdown list.',
            data: getPaymentRule,
        };
        return response.status(200).send(successResponse);
    }

    // Payment rule Detail API
    /**
     * @api {get} /api/vendor-payment-rule/method-dropdown-list Payment rule Detail API
     * @apiGroup Vendor Payment rule
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      'message': 'Successfully got payment rule method drowdown list.',
     *      "data": {}
     *      'status': '1'
     * }
     * @apiSampleRequest /api/vendor-payment-rule/method-dropdown-list
     * @apiErrorExample {json} Payment RUle Method error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/method-dropdown-list')
    @Authorized(['vendor'])
    public async PaymentRuleMethodDropdown(@Res() response: any): Promise<any> {
        const getPaymentRule = await this.paymentMethodService.find({
            select: ['id', 'name', 'isActive', 'isDelete', 'createdDate'],
            where: {
                isActive: 1, isDelete: 0,
            },
        });

        const successResponse: any = {
            status: 1,
            message: 'Successfully got payment rule method dropdown list.',
            data: getPaymentRule,
        };
        return response.status(200).send(successResponse);
    }

    // Payment rule Detail API
    /**
     * @api {get} /api/vendor-payment-rule/:id Payment rule Detail API
     * @apiGroup Vendor Payment rule
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      'message': 'Successfully got payment rule details.',
     *      "data": {}
     *      'status': '1'
     * }
     * @apiSampleRequest /api/vendor-payment-rule/:id
     * @apiErrorExample {json} Payment Rule Detail Error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/:id')
    @Authorized(['vendor'])
    public async PaymentRuleDetail(@Param('id') paymentRuleId: number, @Res() response: any): Promise<any> {
        const getPaymentRule = await this.paymentRuleService.findOne({
            select: ['id', 'name', 'instructions', 'isActive', 'isDelete', 'tenantId', 'createdBy', 'createdDate', 'modifiedBy', 'modifiedDate', 'paymentMethodId'],
            where: {
                id: paymentRuleId,
                isDelete: 0,
            },
        });
        if (!getPaymentRule) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid payment rule ID.',
            };
            return response.status(400).send(errorResponse);
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully got payment rule details.',
            data: getPaymentRule,
        };
        return response.status(200).send(successResponse);
    }

    // Delete Payment Rule API
    /**
     * @api {delete} /api/vendor-payment-rule/:id Delete Payment Rule API
     * @apiGroup Vendor Payment rule
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} id  id
     * @apiParamExample {json} Input
     * {
     *      "id" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted payment rule.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor-payment-rule/:id
     * @apiErrorExample {json} Delete Payment Rule Error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized(['vendor'])
    public async deletePaymentRule(@Param('id') paymentRuleId: number, @Res() response: any): Promise<any> {

        const getPaymentRule = await this.paymentRuleService.findOne({ where: { id: paymentRuleId } });
        if (!getPaymentRule) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid payment rule ID.',
            };
            return response.status(400).send(errorResponse);
        }
        getPaymentRule.isDelete = 1;
        await this.paymentRuleService.update(getPaymentRule.id, getPaymentRule);

        const successResponse: any = {
            status: 1,
            message: 'Successfully deleted payment rule.',
        };
        return response.status(200).send(successResponse);
    }
}
