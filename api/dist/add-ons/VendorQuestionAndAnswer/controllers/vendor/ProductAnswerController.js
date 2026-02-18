"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProductAnswerController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const CreateAnswerRequest_1 = require("./requests/CreateAnswerRequest");
const ProductQuestionService_1 = require("../../../QuestionAndAnswer/services/ProductQuestionService");
const ProductAnswerService_1 = require("../../../QuestionAndAnswer/services/ProductAnswerService");
const CustomerService_1 = require("../../../../src/api/core/services/CustomerService");
const ProductAnswer_1 = require("../../../QuestionAndAnswer/models/ProductAnswer");
const VendorService_1 = require("../../../../src/api/core/services/VendorService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const UserService_1 = require("../../../../src/api/core/services/UserService");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const EmailTemplateService_1 = require("../../../../src/api/core/services/EmailTemplateService");
const env_1 = require("../../../../src/env");
const SettingService_1 = require("../../../../src/api/core/services/SettingService");
const mail_services_1 = require("../../../../src/auth/mail.services");
const ProductImageService_1 = require("../../../../src/api/core/services/ProductImageService");
const CurrencyService_1 = require("../../../../src/api/core/services/CurrencyService");
const typedi_1 = require("typedi");
let VendorProductAnswerController = class VendorProductAnswerController {
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
     * @api {Post} /api/vendor-product-answer/add-answer Add Answer API
     * @apiGroup Vendor Product Answer
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
     *      "message": "Answer Posted Successfully",
     *      "data": {
     *        "answerId": 1,
     *       "answer": "",
     *       "questionId": 1,
     *       "type": "",
     *       "referenceId": 1,
     *       "isActive": 1,
     *       "createdBy": 1,
     *       "updatedBy": 1
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-answer/add-answer
     * @apiErrorExample {json} CreateAnswer error
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
            answer.type = 3;
            answer.referenceId = request.user.vendorId;
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
                    .replace('{replier}', 'Seller')
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
            return response.status(200).send({
                status: 1,
                message: 'Answer Posted Successfully',
                data: answerSaved,
            });
        });
    }
    // Update Answer Status API
    /**
     * @api {Put} /api/vendor-product-answer/update-answer-status/:answerId Update Answer status API
     * @apiGroup Vendor Product Answer
     * @apiParam (Request body) {Number} status status should be 0 | 1
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Updated Your Status",
     *     "data": {
     *       "answerId": 1,
     *       "answer": "",
     *       "questionId": 1,
     *       "type": "",
     *       "referenceId": 1,
     *       "isActive": 1,
     *       "createdBy": 1,
     *       "updatedBy": 1
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-answer/update-answer-status/:answerId
     * @apiErrorExample {json} UpdateAnswerStatus  error
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
                    message: 'invalid AnswerId',
                };
                return response.status(400).send(errorResponse);
            }
            answer.isActive = status;
            const answerSave = yield this.productAnswerService.create(answer);
            if (answerSave) {
                const successResponse = {
                    status: 1,
                    message: 'Updated Your Status',
                    data: answerSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to update your answer status',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Delete Answer API
    /**
     * @api {Delete} /api/vendor-product-answer/delete-answer/:answerId Delete Answer API
     * @apiGroup Vendor Product Answer
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Answer",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-answer/delete-answer/:answerId
     * @apiErrorExample {json} Delete Answer error
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
                    message: 'Invalid answerId',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteAnswer = yield this.productAnswerService.delete({ answerId: answer.answerId });
            if (deleteAnswer) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted Answer',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to delete Question',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Answer List API
    /**
     * @api {Get} /api/vendor-product-answer/answer-list Answer List API
     * @apiGroup Vendor Product Answer
     * @apiParam (Request body) {Number} questionId questionId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get all question List",
     *    "data": {
     *      "question": "",
     *      "answerList": ""
     *      }
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/vendor-product-answer/answer-list
     * @apiErrorExample {json} QuestionList error
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
                if (type && type === 1) {
                    const adminUser = yield this.userService.findOne({
                        select: ['userId', 'firstName', 'avatar', 'avatarPath'],
                        where: { userId: result.referenceId },
                    });
                    if (adminUser) {
                        temp.postedBy = adminUser;
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
                else if (type && type === 3) {
                    const vendor = yield this.vendorService.findOne({
                        select: ['customerId'],
                        where: { vendorId: result.referenceId },
                    });
                    const customer = yield this.customerService.findOne({
                        select: ['id', 'firstName', 'avatar', 'avatarPath', 'city'],
                        where: { id: vendor.customerId },
                    });
                    if (customer) {
                        temp.postedBy = customer;
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
     * @api {Put} /api/vendor-product-answer/make-default-answer/:answerId Make Default Answer API
     * @apiGroup Vendor Product Answer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} answerId answerId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Marked as default Answer",
     *      "data": {
     *        "answerId": 1,
     *       "answer": "",
     *       "questionId": 1,
     *       "type": "",
     *       "referenceId": 1,
     *       "isActive": 1,
     *       "createdBy": 1,
     *       "updatedBy": 1
     *      }
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-answer/make-default-answer/:answerId
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
                    message: 'invalid AnswerId',
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
                    message: 'Marked as default Answer',
                    data: answerSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to update',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
};
exports.VendorProductAnswerController = VendorProductAnswerController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/add-answer'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateAnswerRequest_1.CreateAnswer, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductAnswerController.prototype, "createAnswer", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-answer-status/:answerId'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('answerId')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('status')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductAnswerController.prototype, "updateAnswerStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete-answer/:answerId'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('answerId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductAnswerController.prototype, "deleteAnswer", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/answer-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('questionId')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductAnswerController.prototype, "questionList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/make-default-answer/:answerId'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('answerId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductAnswerController.prototype, "updateDefaultAnswer", null);
exports.VendorProductAnswerController = VendorProductAnswerController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/vendor-product-answer'),
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
], VendorProductAnswerController);
//# sourceMappingURL=ProductAnswerController.js.map