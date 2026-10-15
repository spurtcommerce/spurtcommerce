/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, Delete, Put, QueryParam, Param, Post, Body, JsonController, Authorized, Res, Req } from 'routing-controllers';
import { VendorEmailTemplate } from '../../core/models/VendorEmailTemplate';
import { CreateEmailTemplate } from './requests/CreateEmailTemplateRequest';
import { VendorEmailTemplateService } from '../../core/services/VendorEmailTemplateService';
import { Not } from 'typeorm';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-email-template')
export class VendorEmailTemplateController {
    constructor(
        private vendorEmailTemplateService: VendorEmailTemplateService
    ) {
        // --
    }

    /**
     * @api {post} /api/vendor-email-template Create Email Template
     * @apiGroup Email Template
     * @apiName CreateVendorEmailTemplate
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiBody {String} title               Template title (max 30 characters)
     * @apiBody {Number} status              Status (1: Active, 0: Inactive)
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully created new email template.",
     *         "data": {
     *             "emailTemplateId": 1,
     *             "title": "Order Placed",
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiSampleRequest /api/vendor-email-template
     */
    @Post()
    @Authorized(['vendor', 'edit-email-template'])
    public async addEmailTemplate(@Body({ validate: true }) payload: CreateEmailTemplate, @Res() response: any, @Req() request: any): Promise<any> {
        const emailTemplate = await this.vendorEmailTemplateService.findOne({
            where: {
                title: payload.title,
                tenantId: request.user.tenantId,
            },
        });
        if (emailTemplate) {
            return response.status(400).send({ status: 1, message: 'This title already exists. Please try another one' });
        }
        const newEmailTemplate = new VendorEmailTemplate();
        newEmailTemplate.title = payload.title;
        newEmailTemplate.isActive = payload.status;
        newEmailTemplate.tenantId = request.user.tenantId;
        newEmailTemplate.isDefault = 0;
        const saveEmailTemplate = await this.vendorEmailTemplateService.create(newEmailTemplate);
        const successResponse: any = {
            status: 1,
            message: 'Successfully created new email template.',
            data: saveEmailTemplate,
        };
        return response.status(200).send(successResponse);
    }

    /**
     * @api {get} /api/vendor-email-template Email Template List
     * @apiGroup Email Template
     * @apiName VendorEmailTemplateList
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiQuery {Number} [limit]            Number of records to return
     * @apiQuery {Number} [offset]           Pagination offset
     * @apiQuery {String} [keyword]          Search keyword
     * @apiQuery {String} [templateGroup]    Template group filter
     * @apiQuery {Number|Boolean} [count]    If true/1, returns total count
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got email template list",
     *         "data": [
     *             {
     *                 "emailTemplateId": 1,
     *                 "title": "Order Placed",
     *                 "isActive": 1
     *             }
     *         ]
     *     }
     *
     * @apiSampleRequest /api/vendor-email-template
     */
    @Get()
    @Authorized(['vendor', 'list-email-template'])
    public async emailTemplateList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('templateGroup') templateGroup: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        console.log('Enter in emailTemplateList');

        const select = ['vendorEmailTemplate.id', 'vendorEmailTemplate.title', 'vendorEmailTemplate.isActive', 'vendorEmailTemplate.isDefault', 'emailTemplate.subject', 'emailTemplate.content', 'emailTemplate.dynamicFieldsRef', 'emailTemplate.templateGroup'];

        const searchConditions = [];
        if (keyword) {
            searchConditions.push(
                {
                    name: ['vendorEmailTemplate.title'],
                    value: keyword,
                }
            );
        }
        const whereConditions = [
            {
                name: 'vendorEmailTemplate.tenantId',
                op: 'where',
                value: request.user.tenantId,
            },
            {
                name: 'vendorEmailTemplate.isActive',
                op: 'and',
                value: 1,
            },
        ];
        if (templateGroup && templateGroup !== '') {
            whereConditions.push({
                name: 'emailTemplate.templateGroup',
                op: 'and',
                value: templateGroup,
            });
        }
        const relations = [
            {
                tableName: 'vendorEmailTemplate.emailTemplate',
                op: 'left',
                aliasName: 'emailTemplate',
            },
        ];
        const sort = [
            {
                name: 'vendorEmailTemplate.id',
                order: 'ASC',
            },
        ];
        const emailTemplateList = await this.vendorEmailTemplateService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], sort, count, false);
        if (count) {
            const countSuccessResponse: any = {
                status: 1,
                message: 'Successfully got email template count.',
                data: emailTemplateList,
            };
            return response.status(200).send(countSuccessResponse);
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully got email template list',
            data: emailTemplateList,
        };
        return response.status(200).send(successResponse);
    }

    /**
     * @api {put} /api/vendor-email-template/:id Update Email Template
     * @apiGroup Email Template
     * @apiName UpdateVendorEmailTemplate
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} id          Email Template ID
     *
     * @apiBody {String} title               Template title (max 30 characters)
     * @apiBody {Number} status              Status (1: Active, 0: Inactive)
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully updated email template.",
     *         "data": {
     *             "emailTemplateId": 1,
     *             "title": "Order Placed Updated",
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Template:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid email template Id"
     *     }
     *
     * @apiSampleRequest /api/vendor-email-template/:id
     */
    @Put('/:id')
    @Authorized(['vendor', 'edit-email-template'])
    public async updateEmailTemplate(@Param('id') id: number, @Body({ validate: true }) payload: CreateEmailTemplate, @Req() request: any, @Res() response: any): Promise<any> {
        const emailTemplate = await this.vendorEmailTemplateService.findOne({
            where: {
                id,
                tenantId: request.user.tenantId,
            },
        });
        if (!emailTemplate) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid email template ID.',
            };
            return response.status(400).send(errorResponse);
        }
        const existEmailTemplate = await this.vendorEmailTemplateService.findOne({
            where: {
                title: payload.title,
                id: Not(id),
                tenantId: request.user.tenantId,
            },
        });

        if (existEmailTemplate) {
            return response.status(400).send({ status: 1, message: 'This title already exists. Please try another one' });
        }
        emailTemplate.title = payload.title;
        emailTemplate.isActive = payload.status;
        const templateSave = await this.vendorEmailTemplateService.create(emailTemplate);

        const successResponse: any = {
            status: 1,
            message: 'Successfully updated the email template.',
            data: templateSave,
        };
        return response.status(200).send(successResponse);

    }

    /**
     * @api {delete} /api/vendor-email-template/:id Delete Email Template
     * @apiGroup Email Template
     * @apiName DeleteVendorEmailTemplate
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} id          Email Template ID to delete
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully deleted email template."
     *     }
     *
     * @apiErrorExample {json} Invalid-Template:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid email template Id"
     *     }
     *
     * @apiSampleRequest /api/vendor-email-template/:id
     */
    @Delete('/:id')
    @Authorized(['vendor', 'delete-email-template'])
    public async deleteEmailTemplate(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {
        const emailTemplate = await this.vendorEmailTemplateService.findOne({
            where: {
                tenantId: request.user.tenantId,
                id,
            },
        });
        if (!emailTemplate) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid email template.',
            };
            return response.status(400).send(errorResponse);
        }
        await this.vendorEmailTemplateService.delete(emailTemplate.id);

        const successResponse: any = {
            status: 1,
            message: 'Email template deleted sucessfully.',
        };
        return response.status(200).send(successResponse);

    }
}
