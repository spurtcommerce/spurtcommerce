/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, Delete, Req, Put, QueryParam, Param, Post, Body, JsonController, Authorized, Res } from 'routing-controllers';
import { EmailTemplate } from '../../core/models/EmailTemplate';
import { CreateEmailTemplate } from './requests/CreateEmailTemplateRequest';
import { EmailTemplateService } from '../../core/services/EmailTemplateService';
import { Not } from 'typeorm';

@JsonController('/email-template')
export class EmailTemplateController {
    constructor(private emailTemplateService: EmailTemplateService) {
    }

    // Create EmailTemplate API
    /**
     * @api {post} /api/email-template/add-email-template Add Email Template API
     * @apiGroup EmailTemplate
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..30}} title EmailTemplate title
     * @apiParam (Request body) {String{..255}} subject EmailTemplate subject
     * @apiParam (Request body) {String} content EmailTemplate content
     * @apiParam (Request body) {Number} status EmailTemplate status
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "subject" : "",
     *      "content" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new emailTemplate.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/email-template/add-email-template
     * @apiErrorExample {json} EmailTemplate error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-email-template')
    @Authorized()
    public async addEmailTemplate(@Body({ validate: true }) emailTemplateParam: CreateEmailTemplate, @Res() response: any): Promise<any> {
        const ifCheckTitle = await this.emailTemplateService.findOne({where: {
            title: emailTemplateParam.title,
        }});
        if (ifCheckTitle) {
            return response.status(400).send({status: 1, message: 'This title already exists. Please try another one'});
        }
        const emailTemplate = new EmailTemplate();
        emailTemplate.title = emailTemplateParam.title;
        emailTemplate.subject = emailTemplateParam.subject;
        emailTemplate.content = emailTemplateParam.content;
        emailTemplate.isActive = emailTemplateParam.status;
        emailTemplate.dynamicFieldsRef = emailTemplateParam.dynamicFieldsRef;
        const emailTemplateSave = await this.emailTemplateService.create(emailTemplate);
        if (emailTemplateSave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created new email template',
                data: emailTemplateSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create email template',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // EmailTemplate List API
    /**
     * @api {get} /api/email-template/email-templatelist EmailTemplate List API
     * @apiGroup EmailTemplate
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get emailTemplate list",
     *      "data":{
     *      "id" : "",
     *      "title" : "",
     *      "subject" : "",
     *      "content" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/email-template/email-templatelist
     * @apiErrorExample {json} EmailTemplate error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/email-templatelist')
    @Authorized(['admin', 'list-email-template'])
    public async emailTemplateList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['emailTemplateId', 'title', 'subject', 'content', 'isActive', 'dynamicFieldsRef'];
        const search = [
            {
                name: 'title',
                op: 'like',
                value: keyword,
            },
        ];
        const WhereConditions = [];
        const emailTemplateList = await this.emailTemplateService.list(limit, offset, select, search, WhereConditions, count);
        if (emailTemplateList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got the complete email template list',
                data: emailTemplateList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to list email template',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Update EmailTemplate API
    /**
     * @api {put} /api/email-template/update-email-template/:id Update EmailTemplate API
     * @apiGroup EmailTemplate
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..30}} title EmailTemplate title
     * @apiParam (Request body) {String{..255}} subject EmailTemplate subject
     * @apiParam (Request body) {String} content EmailTemplate content
     * @apiParam (Request body) {Number} status EmailTemplate status
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "subject" : "",
     *      "content" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated emailTemplate",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/email-template/update-email-template/:id
     * @apiErrorExample {json} emailTemplate error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-email-template/:id')
    @Authorized(['admin', 'edit-email-template'])
    public async updateEmailTemplate(@Param('id') id: number, @Body({ validate: true }) emailTemplateParam: CreateEmailTemplate, @Res() response: any): Promise<any> {
        const emailTemplate = await this.emailTemplateService.findOne({
            where: {
                emailTemplateId: id,
            },
        });
        if (!emailTemplate) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid email template Id',
            };
            return response.status(400).send(errorResponse);
        }
        const ifCheckTitle = await this.emailTemplateService.findOne({where: {
            title: emailTemplateParam.title,
            emailTemplateId: Not(id),
        }});
        if (ifCheckTitle) {
            return response.status(400).send({status: 1, message: 'This title already exists. Please try another one'});
        }
        emailTemplate.title = emailTemplateParam.title;
        emailTemplate.subject = emailTemplateParam.subject;
        emailTemplate.content = emailTemplateParam.content;
        emailTemplate.isActive = emailTemplateParam.status;
        const templateSave = await this.emailTemplateService.create(emailTemplate);
        if (templateSave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the email template',
                data: templateSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the email template',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete EmailTemplate API
    /**
     * @api {delete} /api/email-template/delete-email-template/:id Delete EmailTemplate API
     * @apiGroup EmailTemplate
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "emailTemplateId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted emailTemplate.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/email-template/delete-email-template/:id
     * @apiErrorExample {json} EmailTemplate error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-email-template/:id')
    @Authorized(['admin', 'delete-email-template'])
    public async deleteEmailTemplate(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const emailTemplate = await this.emailTemplateService.findOne({
            where: {
                emailTemplateId: id,
            },
        });
        if (!emailTemplate) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid email template',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteEmailTemplate = await this.emailTemplateService.delete(emailTemplate);
        if (deleteEmailTemplate) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the email template',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the email template',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
