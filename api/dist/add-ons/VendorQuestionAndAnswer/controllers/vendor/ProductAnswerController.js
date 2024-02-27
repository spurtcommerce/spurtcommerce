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
let VendorProductAnswerController = class VendorProductAnswerController {
    constructor(productQuestionService, productAnswerService, customerService, vendorService, userService) {
        this.productQuestionService = productQuestionService;
        this.productAnswerService = productAnswerService;
        this.customerService = customerService;
        this.vendorService = vendorService;
        this.userService = userService;
    }
    // Create Answer API
    /**
     * @api {post} /api/vendor-product-answer/add-answer Add Answer API
     * @apiGroup Vendor Product Answer
     * @apiParam (Request body) {String} answer
     * @apiParam (Request body) {Number} questionId
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "answer" : "",
     *      "questionId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Answer created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-answer/add-answer
     * @apiErrorExample {json} Answer error
     * HTTP/1.1 500 Internal Server Error
     */
    createAnswer(answerParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const answer = new ProductAnswer_1.ProductAnswer();
            answer.answer = answerParam.answer;
            answer.questionId = +answerParam.questionId;
            answer.type = 3;
            answer.referenceId = request.user.vendorId;
            answer.isActive = 1;
            const answerSaved = yield this.productAnswerService.create(answer);
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
    // Update Answer Status API
    /**
     * @api {put} /api/vendor-product-answer/update-answer-status/:answerId Update Answer status API
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
     *      "message": "Status Updated Successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-answer/update-answer-status/:answerId
     * @apiErrorExample {json} answer  error
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
    // delete Answer API
    /**
     * @api {delete} /api/vendor-product-answer/delete-answer/:answerId Delete Answer API
     * @apiGroup Vendor Product Answer
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Question.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-answer/delete-answer/:answerId
     * @apiErrorExample {json} Answer error
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
            const deleteAnswer = yield this.productAnswerService.delete(answer);
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
     * @api {get} /api/vendor-product-answer/answer-list Answer List API
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
     *    "message": "Successfully get answer list",
     *    "data":"{}"
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/vendor-product-answer/answer-list
     * @apiErrorExample {json} answer error
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
                    if (adminUser !== undefined) {
                        temp.postedBy = adminUser;
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
                else if (type && type === 3) {
                    const vendor = yield this.vendorService.findOne({
                        select: ['customerId'],
                        where: { vendorId: result.referenceId },
                    });
                    const customer = yield this.customerService.findOne({
                        select: ['id', 'firstName', 'avatar', 'avatarPath', 'city'],
                        where: { id: vendor.customerId },
                    });
                    if (customer !== undefined) {
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
     * @api {put} /api/vendor-product-answer/make-default-answer/:answerId Make Default Answer API
     * @apiGroup Vendor Product Answer
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Updated Successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-answer/make-default-answer/:answerId
     * @apiErrorExample {json} answer  error
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
VendorProductAnswerController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/vendor-product-answer'),
    tslib_1.__metadata("design:paramtypes", [ProductQuestionService_1.ProductQuestionService,
        ProductAnswerService_1.ProductAnswerService,
        CustomerService_1.CustomerService,
        VendorService_1.VendorService,
        UserService_1.UserService])
], VendorProductAnswerController);
exports.VendorProductAnswerController = VendorProductAnswerController;
//# sourceMappingURL=ProductAnswerController.js.map