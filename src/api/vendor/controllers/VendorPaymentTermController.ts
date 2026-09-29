/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Post, Body, JsonController, Authorized, Req, Res, Put, Param, Get, QueryParam, Delete } from 'routing-controllers';
import { CreatePaymentTermRequest } from './requests/CreatePaymentTermRequest';
import { PaymentTerm } from '../../core/models/PaymentTerm';
import { PaymentTermService } from '../../core/services/PaymentTermService';
import { Not } from 'typeorm';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-payment-term')
export class VendorPaymentTermController {
    constructor(
        private paymentTermService: PaymentTermService
    ) {
        // --
    }

    // Create Vendor Payment Term API
    /**
     * @api {post} /api/vendor-payment-term Create Vendor Payment Term API
     * @apiGroup Vendor Payment Term
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} name
     * @apiParam (Request body) {String} label
     * @apiParam (Request body) {Number} termDays
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "label" : "",
     *      "termDays" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Payment term created sucessfully.",
     *      "status": "1",
     *      "data": {}
     * }
     * @apiSampleRequest /api/vendor-payment-term
     * @apiErrorExample {json} Customer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized('vendor')
    public async createPaymentTerm(@Body({ validate: true }) payload: CreatePaymentTermRequest, @Req() request: any, @Res() response: any): Promise<any> {

        const slugName = payload.name.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();

        const existPaymentTerm = await this.paymentTermService.findOne({ where: { tenantId: request.user.tenantId, slug: slugName, isDelete: 0 } });
        if (existPaymentTerm) {
            const errorResponse: any = {
                status: 0,
                message: 'Name already exist..',
            };
            return response.status(400).send(errorResponse);
        }
        const newPaymentTerm = new PaymentTerm();
        newPaymentTerm.name = payload.name;
        newPaymentTerm.tenantId = request.user.tenantId;
        newPaymentTerm.createdBy = request.user.id;
        newPaymentTerm.termDays = payload.termDays;
        newPaymentTerm.slug = slugName;

        const savePaymentTerm = await this.paymentTermService.save(newPaymentTerm);

        const successResponse: any = {
            status: 1,
            message: 'Payment term created sucessfully.',
            data: savePaymentTerm,
        };
        return response.status(200).send(successResponse);
    }

    // Update Vendor Payment Term API
    /**
     * @api {put} /api/vendor-payment-term Update Vendor Payment Term API
     * @apiGroup Vendor Payment Term
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} name
     * @apiParam (Request body) {String} label
     * @apiParam (Request body) {Number} termDays
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "label" : "",
     *      "termDays" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Payment term update sucessfully.",
     *      "status": "1",
     *      "data": {}
     * }
     * @apiSampleRequest /api/vendor-payment-term
     * @apiErrorExample {json} Customer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    @Authorized('vendor')
    public async updatePaymentTerm(@Param('id') paymentTermId: number, @Body({ validate: true }) payload: CreatePaymentTermRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const slugName = payload.name.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        const existPaymentTerm = await this.paymentTermService.findOne({ where: { id: Not(paymentTermId), slug: slugName, isDelete: 0 } });
        if (existPaymentTerm) {
            const errorResponse: any = {
                status: 0,
                message: 'Name already exist..',
            };
            return response.status(400).send(errorResponse);
        }
        const paymentTerm: PaymentTerm = await this.paymentTermService.findOne({ where: { id: paymentTermId } });
        paymentTerm.name = payload.name;
        paymentTerm.modifiedBy = request.user.id;
        paymentTerm.slug = slugName;
        paymentTerm.termDays = payload.termDays;

        const updatePaymentTerm = await this.paymentTermService.update(paymentTermId, paymentTerm);

        const successResponse: any = {
            status: 1,
            message: 'Payment term update sucessfully.',
            data: updatePaymentTerm,
        };
        return response.status(200).send(successResponse);
    }

    // Payment Term List API
    /**
     * @api {get} /api/vendor-payment-term Payment Term List API
     * @apiGroup Vendor Payment Term
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword filter
     * @apiParam (Request body) {Number} count count of the payment term
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully got the payment term list.",
     *      "data": []
     * }
     * @apiSampleRequest /api/vendor-payment-term
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized('vendor')
    public async listPaymentTerm(
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('count') count: number | boolean,
        @QueryParam('keyword') keyword: string,
        @Res() response: any, @Req() request: any): Promise<any> {

        const select = ['paymentTerm.name', 'paymentTerm.label', 'paymentTerm.termDays', 'paymentTerm.isActive', 'paymentTerm.isDelete', 'paymentTerm.createdDate', 'paymentTerm.modifiedDate'];

        const whereConditions = [
            {
                name: 'paymentTerm.tenantId',
                op: 'where',
                value: request.user.tenantId,
            },
            {
                name: 'paymentTerm.isDelete',
                op: 'and',
                value: 0,
            },
        ];

        const searchConditions = [];
        if (keyword) {
            searchConditions.push({
                name: ['paymentTerm.name', 'paymentTerm.label', 'paymentTerm.termDays'],
                value: keyword,
            });
        }

        const sort = [
            {
                name: 'paymentTerm.createdDate',
                order: 'DESC',
            },
        ];

        const paymentTermList: any = await this.paymentTermService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, [], [], sort, count, false);
        if (count) {
            const successCountResponse: any = {
                status: 1,
                message: 'Successfully got the payment term count.',
                data: paymentTermList,
            };
            return response.status(200).send(successCountResponse);
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the payment term list.',
            data: paymentTermList,
        };
        return response.status(200).send(successResponse);
    }

    // Payment Term Detail API
    /**
     * @api {get} /api/vendor-payment-term/dropdown-list Payment Term Detail API
     * @apiGroup Vendor Payment Term
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      'message': 'Successfully got payment term drowdown list.',
     *      "data": {}
     *      'status': '1'
     * }
     * @apiSampleRequest /api/vendor-payment-term/dropdown-list
     * @apiErrorExample {json} Payment Rule Detail Error
     * HTTP/1.1 500 Internal Server Error
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

    // Payment Term Detail API
    /**
     * @api {get} /api/vendor-payment-term/:id Payment Term Detail API
     * @apiGroup Vendor Payment Term
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      'message': 'Successfully got payment term details.',
     *      "data": {}
     *      'status': '1'
     * }
     * @apiSampleRequest /api/vendor-payment-term/:id
     * @apiErrorExample {json} Payment Rule Error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/:id')
    @Authorized(['vendor'])
    public async PaymentTermDetail(@Param('id') paymentTermId: number, @Res() response: any): Promise<any> {
        const getPaymentTerm = await this.paymentTermService.findOne({
            select: ['id', 'name', 'label', 'termDays', 'isActive', 'isDelete', 'tenantId', 'createdBy', 'createdDate', 'modifiedBy', 'modifiedDate'],
            where: {
                id: paymentTermId,
                isDelete: 0,
            },
        });
        if (!getPaymentTerm) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid payment term ID.',
            };
            return response.status(400).send(errorResponse);
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully got payment term details.',
            data: getPaymentTerm,
        };
        return response.status(200).send(successResponse);
    }

    // Delete Payment Rule API
    /**
     * @api {delete} /api/vendor-payment-term/:id Delete Payment Rule API
     * @apiGroup Vendor Payment Term
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} id  id
     * @apiParamExample {json} Input
     * {
     *      "id" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted payment term.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor-payment-term/:id
     * @apiErrorExample {json} Delete Payment Rule Error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized(['vendor'])
    public async deletePaymentTerm(@Param('id') paymentTermId: number, @Res() response: any): Promise<any> {

        const getPaymentTerm = await this.paymentTermService.findOne({ where: { id: paymentTermId } });
        if (!getPaymentTerm) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid payment term ID.',
            };
            return response.status(400).send(errorResponse);
        }
        getPaymentTerm.isDelete = 1;
        await this.paymentTermService.update(getPaymentTerm.id, getPaymentTerm);

        const successResponse: any = {
            status: 1,
            message: 'Successfully deleted payment term.',
        };
        return response.status(200).send(successResponse);
    }
}
