"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAnswerController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const CreateAnswerRequest_1 = require("./requests/CreateAnswerRequest");
const ProductQuestionService_1 = require("../../services/ProductQuestionService");
const ProductAnswerService_1 = require("../../services/ProductAnswerService");
const CustomerService_1 = require("../../../../src/api/core/services/CustomerService");
const UserService_1 = require("../../../../src/api/core/services/UserService");
const ProductAnswer_1 = require("../../models/ProductAnswer");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const VendorService_1 = require("../../../../src/api/core/services/VendorService");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const EmailTemplateService_1 = require("../../../../src/api/core/services/EmailTemplateService");
const env_1 = require("../../../../src/env");
const SettingService_1 = require("../../../../src/api/core/services/SettingService");
const mail_services_1 = require("../../../../src/auth/mail.services");
const ProductImageService_1 = require("../../../../src/api/core/services/ProductImageService");
const CurrencyService_1 = require("../../../../src/api/core/services/CurrencyService");
const typedi_1 = require("typedi");
let ProductAnswerController = class ProductAnswerController {
    constructor(productQuestionService, productAnswerService, customerService, vendorService, userService, productService, emailTemplateService, settingsService, productImageService, currencyService) {
        this.productQuestionService = productQuestionService;
        this.productAnswerService = productAnswerService;
        this.customerService = customerService;
        this.vendorService = vendorService;
        this.userService = userService;
        this.productService = productService;
        this.emailTemplateService = emailTemplateService;
        this.settingsService = settingsService;
        this.productImageService = productImageService;
        this.currencyService = currencyService;
    }
    // Create Answer API
    /**
     * @api {Post} /api/admin-product-answer Add Answer API
     * @apiGroup Admin Product Answer
     * @apiParam (Request body) {String} answer
     * @apiParam (Request body) {Number} questionId
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "answer" : "",
     *      "questionId" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Answer created successfully",
     *      "status": "1",
     *      "data": {
     *      "answer": "",
     *      "questionId": 1,
     *      "type": "",
     *      "referenceId": 1,
     *      "isActive": 1,
     *      "id": 1
     *     }
     * }
     * @apiSampleRequest /api/admin-product-answer
     * @apiErrorExample {json} createAnswer error
     * HTTP/1.1 500 Internal Server Error
     */
    createAnswer(answerParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const question = yield this.productQuestionService.findOne({
                where: { questionId: answerParam.questionId },
            });
            const answer = new ProductAnswer_1.ProductAnswer();
            answer.answer = answerParam.answer;
            answer.questionId = +answerParam.questionId;
            answer.type = 1;
            // answer.referenceId = request.user.userId;
            answer.referenceId = 80;
            answer.isActive = 1;
            const answerSaved = yield this.productAnswerService.create(answer);
            if (question.type === 2) {
                const productDetail = yield this.productService.findOne({
                    where: { productId: question.productId },
                });
                const productImage = yield this.productImageService.findOne({
                    select: ['productId', 'image', 'containerName', 'defaultImage'],
                    where: {
                        productId: productDetail.productId,
                        defaultImage: 1,
                    },
                });
                const customer = yield this.customerService.findOne({ where: { id: question.referenceId } });
                const emailContent = yield this.emailTemplateService.findOne({ where: { emailTemplateId: 18 } });
                const logo = yield this.settingsService.findOne({ where: {} });
                const currencyData = yield this.currencyService.findOne({ where: { currencyId: logo.storeCurrencyId } });
                const price = `${(_a = currencyData.symbolLeft) !== null && _a !== void 0 ? _a : ''}${productDetail.price.toString()}${(_b = currencyData.symbolRight) !== null && _b !== void 0 ? _b : ''}`;
                const message = emailContent.content.replace('{name}', customer.firstName)
                    .replace('{replier}', 'Admin')
                    .replace('{question}', question.question)
                    .replace('{answer}', answerParam.answer)
                    .replace('{title}', productDetail.name)
                    .replace('{username}', customer.email)
                    .replace('{customerName}', customer.firstName)
                    .replace('{productUrl}', `${env_1.env.baseUrl}/media/image-resize/?width=93&height=93&name=${productImage.image}&path=${productImage.containerName}`)
                    .replace('{price}', price);
                const mailContents = {};
                mailContents.logo = logo;
                mailContents.emailContent = message;
                mailContents.redirectUrl = env_1.env.storeRedirectUrl;
                mailContents.productDetailData = '';
                // mailContents.regardsRequired = 0;
                mailContents.ccEmail = [];
                mail_services_1.MAILService.sendMail(mailContents, customer.email, emailContent.subject, false, false, '');
            }
            if (answerSaved !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Answer Posted Successfully',
                    data: answerSaved,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create the Answer.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Update Answer API
    /**
     * @api {Put} /api/admin-product-answer/update-answer/:answerId Update Answer API
     * @apiGroup Admin Product Answer
     * @apiParam (Request body) {String} answer answer
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "answer" : ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated your answer",
     *      "data": {
     *      "answer": "",
     *      "questionId": 1,
     *      "type": "",
     *      "referenceId": 1,
     *      "isActive": 1,
     *      "id": 1
     *     }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-product-answer/update-answer/:answerId
     * @apiErrorExample {json} updateAnswer error
     * HTTP/1.1 500 Internal Server Error
     */
    updateAnswer(answerId, answer, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findAnswer = yield this.productAnswerService.findOne({
                where: {
                    answerId,
                },
            });
            if (!findAnswer) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Answer Id.',
                };
                return response.status(400).send(errorResponse);
            }
            findAnswer.answer = answer;
            const answerSave = yield this.productAnswerService.create(findAnswer);
            if (answerSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated your answer.',
                    data: answerSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update your answer',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Update Answer Status API
    /**
     * @api {Put} /api/admin-product-answer/:answerId Update Answer status API
     * @apiGroup Admin Product Answer
     * @apiParam (Request body) {Number} status status should be 0 | 1
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "status" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "message": "Updated Your Status.",
     *  "data": {
     *  "answerId": 1,
     *  "questionId": 1,
     *  "answer": "",
     *  "type": "",
     *  "referenceId": 1,
     *  "defaultAnswer": "",
     *  "likes": "",
     *  "dislikes": "",
     *  "isActive": 1,
     *  "productQuestion": {}
     *  "productAnswerLike": [],
     *  "answerReportAbuse": []
     *   }
     *      "status": 1
     * }
     * @apiSampleRequest /api/admin-product-answer/:answerId
     * @apiErrorExample {json} updateAnswerStatus  error
     * HTTP/1.1 500 Internal Server Error
     */
    updateAnswerStatus(answerId, status, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const answer = yield this.productAnswerService.findOne({
                where: {
                    answerId,
                },
            });
            if (!answer) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Answer Id.',
                };
                return response.status(400).send(errorResponse);
            }
            answer.isActive = status;
            const answerSave = yield this.productAnswerService.create(answer);
            if (answerSave) {
                const successResponse = {
                    status: 1,
                    message: 'Updated Your Status.',
                    data: answerSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update your answer status.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // delete Answer API
    /**
     * @api {Delete} /api/admin-product-answer/:answerId Delete Answer API
     * @apiGroup Admin Product Answer
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Question.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-product-answer/:answerId
     * @apiErrorExample {json} deleteAnswer error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteAnswer(answerId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const answer = yield this.productAnswerService.findOne({
                where: {
                    answerId,
                },
            });
            if (!answer) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid answer Id.',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteAnswer = yield this.productAnswerService.delete({ answerId: answer.answerId });
            if (deleteAnswer) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the Answer.',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the Answer.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Answer List API
    /**
     * @api {Get} /api/admin-product-answer Answer List API
     * @apiGroup Admin Product Answer
     * @apiParam (Request body) {Number} questionId questionId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get answer list",
     *      "data": {
     *      "answer": "",
     *      "questionId": 1,
     *      "type": "",
     *      "referenceId": 1,
     *      "isActive": 1,
     *      "defaultAnswer": "",
     *      "answerId": 1
     *   }
     *      "status": "1"
     *  }
     * @apiSampleRequest /api/admin-product-answer
     * @apiErrorExample {json} questionList error
     * HTTP/1.1 500 Internal Server Error
     */
    questionList(limit, offset, keyword, questionId, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const question = yield this.productQuestionService.findOne({
                where: { questionId },
            });
            if (!question) {
                const errorResponse = {
                    status: 1,
                    message: 'Invalid QuestionId',
                };
                return response.status(400).send(errorResponse);
            }
            const select = ['questionId', 'answerId', 'answer', 'referenceId', 'defaultAnswer', 'createdDate', 'type', 'isActive'];
            const whereConditions = [];
            const search = [
                {
                    name: 'questionId',
                    op: 'where',
                    value: questionId,
                },
                {
                    name: 'answer',
                    op: 'like',
                    value: keyword,
                },
            ];
            const answerList = yield this.productAnswerService.list(limit, offset, select, search, whereConditions, count);
            if (count) {
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully get count',
                    data: answerList,
                });
            }
            const promise = answerList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const type = result.type;
                const temp = result;
                if (type && type === 3) {
                    const vendor = yield this.vendorService.findOne({ where: { vendorId: result.referenceId } });
                    const customer = yield this.customerService.findOne({
                        select: ['id', 'firstName', 'avatar', 'avatarPath', 'city'],
                        where: { id: vendor.customerId },
                    });
                    if (customer) {
                        temp.postedBy = customer;
                    }
                }
                else if (type && type === 2) {
                    const customer = yield this.customerService.findOne({
                        select: ['id', 'firstName', 'avatar', 'avatarPath', 'city'],
                        where: { id: result.referenceId },
                    });
                    if (customer) {
                        temp.postedBy = customer;
                    }
                }
                else if (type && type === 1) {
                    const adminUser = yield this.userService.findOne({
                        select: ['userId', 'firstName', 'avatar', 'avatarPath'],
                        where: { userId: result.referenceId },
                    });
                    if (adminUser) {
                        temp.postedBy = adminUser;
                    }
                }
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully get all question List',
                data: {
                    question,
                    answerList: value,
                },
            };
            return response.status(200).send(successResponse);
        });
    }
    // Make Default Answer API
    /**
     * @api {Put} /api/admin-product-answer/make-default-answer/:answerId Make Default Answer API
     * @apiGroup Admin Product Answer
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Marked as default Answer.",
     *      "data": {
     *      "answer": "",
     *      "questionId": 1,
     *      "type": "",
     *      "referenceId": 1,
     *      "isActive": 1,
     *      "id": 1
     *     }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-product-answer/make-default-answer/:answerId
     * @apiErrorExample {json} UpdateDefaultAnswer  error
     * HTTP/1.1 500 Internal Server Error
     */
    updateDefaultAnswer(answerId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const answers = yield this.productAnswerService.findOne({
                where: {
                    answerId,
                },
            });
            if (!answers) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Answer Id.',
                };
                return response.status(400).send(errorResponse);
            }
            const findAnswer = yield this.productAnswerService.findAll({ where: { questionId: answers.questionId } });
            if (findAnswer) {
                for (const answer of findAnswer) {
                    const ans = yield this.productAnswerService.findOne({
                        where: {
                            answerId: answer.answerId,
                        },
                    });
                    ans.defaultAnswer = 0;
                    yield this.productAnswerService.create(ans);
                }
            }
            answers.defaultAnswer = 1;
            const answerSave = yield this.productAnswerService.create(answers);
            if (answerSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully Marked as default Answer.',
                    data: answerSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
};
exports.ProductAnswerController = ProductAnswerController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)()
    // @Authorized(['admin', 'create-product-answer'])
    ,
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateAnswerRequest_1.CreateAnswer, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductAnswerController.prototype, "createAnswer", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-answer/:answerId'),
    (0, routing_controllers_1.Authorized)(['admin', 'update-product-answer']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('answerId')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('answer')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductAnswerController.prototype, "updateAnswer", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:answerId'),
    (0, routing_controllers_1.Authorized)(['admin', 'update-answer-status']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('answerId')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('status')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductAnswerController.prototype, "updateAnswerStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:answerId'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-product-answer']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('answerId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductAnswerController.prototype, "deleteAnswer", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(['admin', 'product-answer-list']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('questionId')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductAnswerController.prototype, "questionList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/make-default-answer/:answerId'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('answerId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductAnswerController.prototype, "updateDefaultAnswer", null);
exports.ProductAnswerController = ProductAnswerController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/admin-product-answer'),
    tslib_1.__metadata("design:paramtypes", [ProductQuestionService_1.ProductQuestionService,
        ProductAnswerService_1.ProductAnswerService,
        CustomerService_1.CustomerService,
        VendorService_1.VendorService,
        UserService_1.UserService,
        ProductService_1.ProductService,
        EmailTemplateService_1.EmailTemplateService,
        SettingService_1.SettingService,
        ProductImageService_1.ProductImageService,
        CurrencyService_1.CurrencyService])
], ProductAnswerController);
//# sourceMappingURL=ProductAnswerController.js.map