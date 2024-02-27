"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionAndAnswerController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const ProductQuestionService_1 = require("../../services/ProductQuestionService");
const ProductAnswerService_1 = require("../../services/ProductAnswerService");
const ProductAnswerLikeDislikeService_1 = require("../../services/ProductAnswerLikeDislikeService");
const ProductAnswerLikeDislike_1 = require("../../models/ProductAnswerLikeDislike");
const EmailTemplateService_1 = require("../../../../src/api/core/services/EmailTemplateService");
const CustomerService_1 = require("../../../../src/api/core/services/CustomerService");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const SettingService_1 = require("../../../../src/api/core/services/SettingService");
const UserService_1 = require("../../../../src/api/core/services/UserService");
const AnswerAbuseReasonService_1 = require("../../services/AnswerAbuseReasonService");
const AnswerReportAbuseService_1 = require("../../services/AnswerReportAbuseService");
const ProductQuestion_1 = require("../../models/ProductQuestion");
const ProductAnswer_1 = require("../../models/ProductAnswer");
const AnswerReportAbuse_1 = require("../../models/AnswerReportAbuse");
const CreateAnswerRequest_1 = require("./requests/CreateAnswerRequest");
const CreateQuestionRequest_1 = require("./requests/CreateQuestionRequest");
const CreateReportAbuseRequest_1 = require("./requests/CreateReportAbuseRequest");
const mail_services_1 = require("../../../../src/auth/mail.services");
const env_1 = require("../../../../src/env");
const checkTokenMiddleware_1 = require("../../../../src/api/core/middlewares/checkTokenMiddleware");
const class_transformer_1 = require("class-transformer");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const VendorService_1 = require("../../../../src/api/core/services/VendorService");
let QuestionAndAnswerController = class QuestionAndAnswerController {
    constructor(productQuestionService, productAnswerService, customerService, userService, productAnswerLikeService, settingsService, productService, emailTemplateService, answerAbuseReasonService, answerReportAbuseService, vendorService) {
        this.productQuestionService = productQuestionService;
        this.productAnswerService = productAnswerService;
        this.customerService = customerService;
        this.userService = userService;
        this.productAnswerLikeService = productAnswerLikeService;
        this.settingsService = settingsService;
        this.productService = productService;
        this.emailTemplateService = emailTemplateService;
        this.answerAbuseReasonService = answerAbuseReasonService;
        this.answerReportAbuseService = answerReportAbuseService;
        this.vendorService = vendorService;
    }
    // Create Question API
    /**
     * @api {post} /api/store-question-answer/add-question Add Question API
     * @apiGroup Store Question Answer
     * @apiParam (Request body) {String} question
     * @apiParam (Request body) {Number} productId
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "question" : "",
     *      "productId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Question created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/store-question-answer/add-question
     * @apiErrorExample {json} Question error
     * HTTP/1.1 500 Internal Server Error
     */
    createQuestion(questionParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productDetail = yield this.productService.findOne({
                where: { productId: questionParam.productId },
            });
            if (!productDetail) {
                const errorResponse = {
                    status: 1,
                    message: 'Invalid ProductId',
                };
                return response.status(400).send(errorResponse);
            }
            const question = new ProductQuestion_1.ProductQuestion();
            question.question = questionParam.question;
            question.productId = questionParam.productId;
            question.type = 2;
            question.referenceId = request.user.id;
            question.isActive = 0;
            const questionSaved = yield this.productQuestionService.create(question);
            const logo = yield this.settingsService.findOne();
            const customer = yield this.customerService.findOne({ where: { id: request.user.id } });
            const emailContent = yield this.emailTemplateService.findOne(17);
            const adminId = [];
            const adminUser = yield this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
            for (const user of adminUser) {
                const value = user.username;
                adminId.push(value);
            }
            const adminRedirectUrl = env_1.env.adminRedirectUrl;
            const message = emailContent.content.replace('{name}', 'Admin').replace('{question}', questionParam.question).replace('{title}', productDetail.name).replace('{username}', customer.email);
            const mailContents = {};
            mailContents.logo = logo;
            mailContents.emailContent = message;
            mailContents.redirectUrl = adminRedirectUrl;
            mailContents.productDetailData = undefined;
            mailContents.ccEmail = [];
            console.log('email:', adminId);
            mail_services_1.MAILService.sendMail(mailContents, adminId, emailContent.subject, false, false, '');
            if (questionSaved !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Question Posted Successfully',
                    data: questionSaved,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to create',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Create Answer API
    /**
     * @api {post} /api/store-question-answer/add-answer Add Answer API
     * @apiGroup Store Question Answer
     * @apiParam (Request body) {String} answer
     * @apiParam (Request body) {Number} questionId
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "question" : "",
     *      "productId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Answer created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/store-question-answer/add-answer
     * @apiErrorExample {json} Answer error
     * HTTP/1.1 500 Internal Server Error
     */
    createAnswer(answerParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const question = yield this.productQuestionService.findOne({
                where: { questionId: answerParam.questionId },
            });
            if (!question) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid QuestionId',
                };
                return response.status(400).send(errorResponse);
            }
            const answer = new ProductAnswer_1.ProductAnswer();
            answer.answer = answerParam.answer;
            answer.questionId = +answerParam.questionId;
            answer.type = 2;
            answer.referenceId = request.user.id;
            answer.isActive = 0;
            const answerSaved = yield this.productAnswerService.create(answer);
            const productDetail = yield this.productService.findOne({
                where: { productId: question.productId },
            });
            const customer = yield this.customerService.findOne({ where: { id: request.user.id } });
            const emailContent = yield this.emailTemplateService.findOne(18);
            const logo = yield this.settingsService.findOne();
            const adminId = [];
            const adminUser = yield this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
            for (const user of adminUser) {
                const value = user.username;
                adminId.push(value);
            }
            const message = emailContent.content.replace('{name}', 'Admin').replace('{question}', question.question).replace('{answer}', answerParam.answer).replace('{title}', productDetail.name).replace('{username}', customer.email);
            const adminRedirectUrl = env_1.env.adminRedirectUrl;
            const mailContents = {};
            mailContents.logo = logo;
            mailContents.emailContent = message;
            mailContents.redirectUrl = adminRedirectUrl;
            mailContents.productDetailData = undefined;
            mailContents.ccEmail = [];
            yield mail_services_1.MAILService.sendMail(mailContents, adminId, emailContent.subject, false, false, '');
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
                    message: 'unable to create',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Answer Like and DisLike API
    /**
     * @api {post} /api/store-question-answer/update-like-status Update Answer Like and DisLike API
     * @apiGroup Store Question Answer
     * @apiParam (Request body) {Number} answerId answerId
     * @apiParam (Request body) {Number} type  1-> like 2-> dislike
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "answerId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully updated",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/store-question-answer/update-like-status
     * @apiErrorExample {json} updateQuestion error
     * HTTP/1.1 500 Internal Server Error
     */
    updateLikeStatus(answerId, type, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const answer = yield this.productAnswerService.findOne({
                where: {
                    answerId,
                },
            });
            if (!answer) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid  AnswerId',
                };
                return response.status(400).send(errorResponse);
            }
            if (type === 2) {
                const findExist = yield this.productAnswerLikeService.findOne({
                    where: {
                        answerId, customerId: request.user.id, type: 2,
                    },
                });
                if (findExist) {
                    return response.status(200).send({
                        status: 1,
                        message: 'Successfully updated',
                    });
                }
                const answerLike = yield this.productAnswerLikeService.findOne({
                    where: {
                        answerId, customerId: request.user.id, type: 1,
                    },
                });
                if (answerLike) {
                    yield this.productAnswerLikeService.delete(answerLike.id);
                }
            }
            else if (type === 1) {
                const findExist = yield this.productAnswerLikeService.findOne({
                    where: {
                        answerId, customerId: request.user.id, type: 1,
                    },
                });
                if (findExist) {
                    return response.status(200).send({
                        status: 1,
                        message: 'Successfully updated',
                    });
                }
                const answerDislike = yield this.productAnswerLikeService.findOne({
                    where: {
                        answerId, customerId: request.user.id, type: 2,
                    },
                });
                if (answerDislike) {
                    yield this.productAnswerLikeService.delete(answerDislike.id);
                }
            }
            const productAnswer = new ProductAnswerLikeDislike_1.ProductAnswerLikeDislike();
            productAnswer.answerId = answerId;
            productAnswer.questionId = answer.questionId;
            productAnswer.type = type;
            productAnswer.customerId = request.user.id;
            const questionSave = yield this.productAnswerLikeService.create(productAnswer);
            const like = yield this.productAnswerLikeService.findLikeCount(answerId);
            const disLike = yield this.productAnswerLikeService.findDislikeCount(answerId);
            answer.likes = like.likeCount;
            answer.dislikes = disLike.dislikeCount;
            yield this.productAnswerService.create(answer);
            if (questionSave) {
                const successResponse = {
                    status: 1,
                    message: 'Updated Your Question Status',
                    data: questionSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to update your question status',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Answer Abuse Reason List
    /**
     * @api {get} /api/store-question-answer/abuse-reason-list Answer Abuse Reason List
     * @apiGroup Store Question Answer
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset": "",
     *      "count": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Listed..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/store-question-answer/abuse-reason-list
     * @apiErrorExample {json} Abuse reason List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Abuse Reason list Function
    reasonList(limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['id', 'reason'];
            const abuseReasonList = yield this.answerAbuseReasonService.list(limit, offset, select, 0, 0, count);
            const successResponse = {
                status: 1,
                message: 'Successfully got Abuse Reason list',
                data: abuseReasonList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Create Answer Abuse Report API
    /**
     * @api {post} /api/store-question-answer/add-report-abuse Add Report Abuse API
     * @apiGroup Store Question Answer
     * @apiParam (Request body) {String} [remark]
     * @apiParam (Request body) {Number} answerId
     * @apiParam (Request body) {Number} reasonId
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "remark" : "",
     *      "answerId" : "",
     *      "reasonId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully posted your report",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/store-question-answer/add-report-abuse
     * @apiErrorExample {json} Report Abuse error
     * HTTP/1.1 500 Internal Server Error
     */
    createAnswerAbuseReport(abuseReport, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productAnswer = yield this.productAnswerService.findOne({
                where: { answerId: abuseReport.answerId },
            });
            if (!productAnswer) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid AnswerId',
                };
                return response.status(400).send(errorResponse);
            }
            const reason = yield this.answerAbuseReasonService.findOne({
                where: { id: abuseReport.reasonId },
            });
            if (!reason) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid ReasonId',
                };
                return response.status(400).send(errorResponse);
            }
            const report = new AnswerReportAbuse_1.AnswerReportAbuse();
            report.questionId = productAnswer.questionId;
            report.reasonId = abuseReport.reasonId;
            report.answerId = abuseReport.answerId;
            report.remark = abuseReport.remark;
            report.isActive = 1;
            const abuseSaved = yield this.answerReportAbuseService.create(report);
            const product = yield this.productQuestionService.findOne({ where: { questionId: productAnswer.questionId } });
            const customer = yield this.customerService.findOne({ where: { id: request.user.id } });
            const emailContent = yield this.emailTemplateService.findOne(19);
            const logo = yield this.settingsService.findOne();
            const productDetail = yield this.productService.findOne({
                where: { productId: product.productId },
            });
            const adminId = [];
            const adminUser = yield this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
            for (const user of adminUser) {
                const value = user.username;
                adminId.push(value);
            }
            const adminRedirectUrl = env_1.env.adminRedirectUrl;
            const message = emailContent.content.replace('{name}', 'Admin').replace('{question}', product.question).replace('{title}', productDetail.name).replace('{username}', customer.email).replace('{answer}', productAnswer.answer).replace('{content}', reason.reason);
            const mailContents = {};
            mailContents.logo = logo;
            mailContents.emailContent = message;
            mailContents.redirectUrl = adminRedirectUrl;
            mailContents.productDetailData = undefined;
            console.log('adminId:', adminId);
            mail_services_1.MAILService.sendMail(mailContents, adminId, emailContent.subject, false, false, '');
            if (abuseSaved !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Your Report Posted Successfully',
                    data: abuseSaved,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to post',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Question List API
    /**
     * @api {get} /api/store-question-answer/question-list Question List API
     * @apiGroup Store Question Answer
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get question list",
     *    "data":"{}"
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/store-question-answer/question-list
     * @apiErrorExample {json} question error
     * HTTP/1.1 500 Internal Server Error
     */
    questionList(limit, offset, keyword, productId, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productDetail = yield this.productService.findOne({
                where: { productId },
            });
            if (!productDetail) {
                const errorResponse = {
                    status: 1,
                    message: 'Invalid ProductId',
                };
                return response.status(400).send(errorResponse);
            }
            const select = ['questionId', 'productId', 'question', 'referenceId', 'type', 'isActive'];
            const whereConditions = [];
            const search = [
                {
                    name: 'productId',
                    op: 'where',
                    value: productId,
                },
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
                {
                    name: 'question',
                    op: 'like',
                    value: keyword,
                },
            ];
            const questionList = yield this.productQuestionService.list(limit, offset, select, search, whereConditions, count);
            if (count) {
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully get count',
                    data: questionList,
                });
            }
            const promise = questionList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const type = result.type;
                const temp = result;
                const answer = yield this.productAnswerService.findOne({
                    select: ['questionId', 'answerId', 'answer', 'referenceId', 'likes', 'dislikes', 'type', 'createdDate', 'isActive'],
                    where: { questionId: result.questionId, isActive: 1, defaultAnswer: 1 },
                });
                if (answer) {
                    if (request.id) {
                        const likeType = yield this.productAnswerLikeService.findOne({
                            where: {
                                answerId: answer.answerId,
                                customerId: request.id,
                            },
                        });
                        if (likeType) {
                            answer.likeType = likeType.type;
                        }
                        else {
                            answer.likeType = 0;
                        }
                    }
                    else {
                        answer.likeType = 0;
                    }
                }
                temp.answerList = answer;
                if (type && type === 3) {
                    const vendor = yield this.vendorService.findOne({ where: { vendorId: result.referenceId } });
                    const customer = yield this.customerService.findOne({
                        select: ['id', 'firstName', 'avatar', 'avatarPath', 'city'],
                        where: { id: vendor.customerId },
                    });
                    if (customer !== undefined) {
                        temp.postedBy = customer;
                    }
                }
                else if (type && type === 2) {
                    const customer = yield this.customerService.findOne({
                        select: ['id', 'firstName', 'avatar', 'avatarPath', 'city'],
                        where: { id: result.referenceId },
                    });
                    if (customer !== undefined) {
                        temp.postedBy = customer;
                    }
                }
                else if (type && type === 1) {
                    const adminUser = yield this.userService.findOne({
                        select: ['userId', 'firstName', 'avatar', 'avatarPath'],
                        where: { userId: result.referenceId },
                    });
                    if (adminUser !== undefined) {
                        temp.postedBy = adminUser;
                    }
                }
                const searchQuestion = [
                    {
                        name: 'questionId',
                        op: 'where',
                        value: result.questionId,
                    },
                    {
                        name: 'isActive',
                        op: 'where',
                        value: 1,
                    },
                ];
                const ansCount = yield this.productAnswerService.list(0, 0, [], searchQuestion, [], 1);
                temp.answerCount = ansCount;
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully get all question List',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Answer List API
    /**
     * @api {get} /api/store-question-answer/answer-list Answer List API
     * @apiGroup Store Question Answer
     * @apiParam (Request body) {Number} questionId questionId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully got answer list",
     *    "data":"{}"
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/store-question-answer/answer-list
     * @apiErrorExample {json} answer error
     * HTTP/1.1 500 Internal Server Error
     */
    answerList(limit, offset, keyword, questionId, count, request, response) {
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
            const select = ['questionId', 'answerId', 'answer', 'referenceId', 'likes', 'dislikes', 'type', 'defaultAnswer', 'createdDate', 'isActive'];
            const whereConditions = [];
            const search = [
                {
                    name: 'questionId',
                    op: 'where',
                    value: questionId,
                },
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
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
                    if (customer !== undefined) {
                        temp.postedBy = customer;
                    }
                }
                else if (type && type === 2) {
                    const customer = yield this.customerService.findOne({
                        select: ['id', 'firstName', 'avatar', 'avatarPath', 'city'],
                        where: { id: result.referenceId },
                    });
                    if (customer !== undefined) {
                        temp.postedBy = customer;
                    }
                }
                else if (type && type === 1) {
                    const adminUser = yield this.userService.findOne({
                        select: ['userId', 'firstName', 'avatar', 'avatarPath'],
                        where: { userId: result.referenceId },
                    });
                    if (adminUser !== undefined) {
                        temp.postedBy = adminUser;
                    }
                }
                if (request.id) {
                    const likeType = yield this.productAnswerLikeService.findOne({
                        where: {
                            answerId: result.answerId,
                            customerId: request.id,
                        },
                    });
                    if (likeType) {
                        temp.likeType = likeType.type;
                    }
                    else {
                        temp.likeType = 0;
                    }
                }
                else {
                    temp.likeType = 0;
                }
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully get all answer List',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Product Details API
    /**
     * @api {get} /api/store-question-answer/productdetail-question-list/:productslug   Product detail API
     * @apiGroup Store Question Answer
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/store-question-answer/productdetail-question-list/:productslug
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    productDetail(productslug, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productDetail = yield this.productService.findOne({
                productSlug: productslug,
                isActive: 1,
            });
            if (!productDetail) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid product',
                };
                return response.status(404).send(errResponse);
            }
            const productDetails = (0, class_transformer_1.instanceToPlain)(productDetail);
            productDetails.questionList = yield this.productQuestionService.findAll({
                select: ['questionId', 'productId', 'question', 'type', 'referenceId', 'createdDate'],
                where: { productId: productDetail.productId, isActive: 1 },
                limit: 4,
            }).then((val) => {
                const user = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const referenceId = value.referenceId;
                    const type = value.type;
                    const temp = value;
                    if (type && type === 3) {
                        const vendor = yield this.vendorService.findOne({ where: { vendorId: referenceId } });
                        const customer = yield this.customerService.findOne({
                            select: ['id', 'firstName', 'avatar', 'avatarPath', 'city'],
                            where: { id: vendor.customerId },
                        });
                        if (customer !== undefined) {
                            temp.postedBy = customer;
                        }
                    }
                    else if (type && type === 2) {
                        const customer = yield this.customerService.findOne({
                            select: ['id', 'firstName', 'avatar', 'avatarPath', 'city'],
                            where: { id: referenceId },
                        });
                        if (customer !== undefined) {
                            temp.postedBy = customer;
                        }
                    }
                    else {
                        const adminUser = yield this.userService.findOne({
                            select: ['userId', 'firstName', 'avatar', 'avatarPath'],
                            where: { userId: referenceId },
                        });
                        if (adminUser !== undefined) {
                            temp.postedBy = adminUser;
                        }
                    }
                    return temp;
                }));
                const resultData = Promise.all(user);
                return resultData;
            });
            const successResponse = {
                status: 1,
                message: 'Successfully got productDetail',
                data: productDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Post)('/add-question'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateQuestionRequest_1.CreateQuestion, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionAndAnswerController.prototype, "createQuestion", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Post)('/add-answer')
    // @Authorized('customer')
    ,
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateAnswerRequest_1.CreateAnswer, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionAndAnswerController.prototype, "createAnswer", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Post)('/update-like-status'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('answerId')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('type')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionAndAnswerController.prototype, "updateLikeStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Get)('/abuse-Reason-list')
    // @Authorized('customer')
    ,
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionAndAnswerController.prototype, "reasonList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Post)('/add-report-abuse')
    // @Authorized('customer')
    ,
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateReportAbuseRequest_1.AbuseReportRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionAndAnswerController.prototype, "createAnswerAbuseReport", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckTokenMiddleware),
    (0, routing_controllers_1.Get)('/question-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('productId')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Req)()),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionAndAnswerController.prototype, "questionList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckTokenMiddleware),
    (0, routing_controllers_1.Get)('/answer-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('questionId')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Req)()),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionAndAnswerController.prototype, "answerList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckTokenMiddleware),
    (0, routing_controllers_1.Get)('/productdetail-question-list/:productslug'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productslug')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionAndAnswerController.prototype, "productDetail", null);
QuestionAndAnswerController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/store-question-answer'),
    tslib_1.__metadata("design:paramtypes", [ProductQuestionService_1.ProductQuestionService,
        ProductAnswerService_1.ProductAnswerService,
        CustomerService_1.CustomerService,
        UserService_1.UserService,
        ProductAnswerLikeDislikeService_1.ProductAnswerLikeService,
        SettingService_1.SettingService,
        ProductService_1.ProductService,
        EmailTemplateService_1.EmailTemplateService,
        AnswerAbuseReasonService_1.AnswerAbuseReasonService,
        AnswerReportAbuseService_1.AnswerReportAbuseService,
        VendorService_1.VendorService])
], QuestionAndAnswerController);
exports.QuestionAndAnswerController = QuestionAndAnswerController;
//# sourceMappingURL=QuestionAndAnswerController.js.map