"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const EmailTemplate_1 = require("../../core/models/EmailTemplate");
const CreateEmailTemplateRequest_1 = require("./requests/CreateEmailTemplateRequest");
const EmailTemplateService_1 = require("../../core/services/EmailTemplateService");
const typeorm_1 = require("typeorm");
let EmailTemplateController = class EmailTemplateController {
    constructor(emailTemplateService) {
        this.emailTemplateService = emailTemplateService;
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
    addEmailTemplate(emailTemplateParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifCheckTitle = yield this.emailTemplateService.findOne({ where: {
                    title: emailTemplateParam.title,
                } });
            if (ifCheckTitle) {
                return response.status(400).send({ status: 1, message: 'This title already exists. Please try another one' });
            }
            const emailTemplate = new EmailTemplate_1.EmailTemplate();
            emailTemplate.title = emailTemplateParam.title;
            emailTemplate.subject = emailTemplateParam.subject;
            emailTemplate.content = emailTemplateParam.content;
            emailTemplate.isActive = emailTemplateParam.status;
            emailTemplate.dynamicFieldsRef = emailTemplateParam.dynamicFieldsRef;
            const emailTemplateSave = yield this.emailTemplateService.create(emailTemplate);
            if (emailTemplateSave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully created new email template',
                    data: emailTemplateSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create email template',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    emailTemplateList(limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['emailTemplateId', 'title', 'subject', 'content', 'isActive', 'dynamicFieldsRef'];
            const search = [
                {
                    name: 'title',
                    op: 'like',
                    value: keyword,
                },
            ];
            const WhereConditions = [];
            const emailTemplateList = yield this.emailTemplateService.list(limit, offset, select, search, WhereConditions, count);
            if (emailTemplateList) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the complete email template list',
                    data: emailTemplateList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to list email template',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    updateEmailTemplate(id, emailTemplateParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const emailTemplate = yield this.emailTemplateService.findOne({
                where: {
                    emailTemplateId: id,
                },
            });
            if (!emailTemplate) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid email template Id',
                };
                return response.status(400).send(errorResponse);
            }
            const ifCheckTitle = yield this.emailTemplateService.findOne({ where: {
                    title: emailTemplateParam.title,
                    emailTemplateId: (0, typeorm_1.Not)(id),
                } });
            if (ifCheckTitle) {
                return response.status(400).send({ status: 1, message: 'This title already exists. Please try another one' });
            }
            emailTemplate.title = emailTemplateParam.title;
            emailTemplate.subject = emailTemplateParam.subject;
            emailTemplate.content = emailTemplateParam.content;
            emailTemplate.isActive = emailTemplateParam.status;
            const templateSave = yield this.emailTemplateService.create(emailTemplate);
            if (templateSave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated the email template',
                    data: templateSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the email template',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    deleteEmailTemplate(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const emailTemplate = yield this.emailTemplateService.findOne({
                where: {
                    emailTemplateId: id,
                },
            });
            if (!emailTemplate) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid email template',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteEmailTemplate = yield this.emailTemplateService.delete(emailTemplate);
            if (deleteEmailTemplate) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the email template',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the email template',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/add-email-template'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateEmailTemplateRequest_1.CreateEmailTemplate, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "addEmailTemplate", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/email-templatelist'),
    (0, routing_controllers_1.Authorized)(['admin', 'list-email-template']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "emailTemplateList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-email-template/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-email-template']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateEmailTemplateRequest_1.CreateEmailTemplate, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "updateEmailTemplate", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete-email-template/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-email-template']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "deleteEmailTemplate", null);
EmailTemplateController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/email-template'),
    tslib_1.__metadata("design:paramtypes", [EmailTemplateService_1.EmailTemplateService])
], EmailTemplateController);
exports.EmailTemplateController = EmailTemplateController;
//# sourceMappingURL=EmailTemplateController.js.map