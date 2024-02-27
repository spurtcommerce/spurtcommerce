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
let ProductAnswerController = class ProductAnswerController {
    constructor(productQuestionService, productAnswerService, customerService, vendorService, userService) {
        this.productQuestionService = productQuestionService;
        this.productAnswerService = productAnswerService;
        this.customerService = customerService;
        this.vendorService = vendorService;
        this.userService = userService;
    }
    // Create Answer API
    /**
     * @api {post} /api/admin-product-answer Add Answer API
     * @apiGroup Admin Product Answer
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
     * @apiSampleRequest /api/admin-product-answer
     * @apiErrorExample {json} Answer error
     * HTTP/1.1 500 Internal Server Error
     */
    createAnswer(answerParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const answer = new ProductAnswer_1.ProductAnswer();
            answer.answer = answerParam.answer;
            answer.questionId = +answerParam.questionId;
            answer.type = 1;
            answer.referenceId = request.user.userId;
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
                    message: 'Unable to create the Answer.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Update Answer API
    /**
     * @api {put} /api/admin-product-answer/update-answer/:answerId Update Answer API
     * @apiGroup Admin Product Answer
     * @apiParam (Request body) {String} answer answer
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "answer" : "",
     *      "questionId" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " Answer is updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-product-answer/update-answer/:answerId
     * @apiErrorExample {json} answer error
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
     * @api {put} /api/admin-product-answer/:answerId Update Answer status API
     * @apiGroup Admin Product Answer
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
     * @apiSampleRequest /api/admin-product-answer/:answerId
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
     * @api {delete} /api/admin-product-answer/:answerId Delete Answer API
     * @apiGroup Admin Product Answer
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Question.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-product-answer/:answerId
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
                    message: 'Invalid answer Id.',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteAnswer = yield this.productAnswerService.delete(answer);
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
     * @api {get} /api/admin-product-answer Answer List API
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
     *    "message": "Successfully get answer list",
     *    "data":"{}"
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/admin-product-answer
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
     * @api {put} /api/admin-product-answer/make-default-answer/:answerId Make Default Answer API
     * @apiGroup Admin Product Answer
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Updated Successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-product-answer/make-default-answer/:answerId
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
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(['admin', 'create-product-answer']),
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
ProductAnswerController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/admin-product-answer'),
    tslib_1.__metadata("design:paramtypes", [ProductQuestionService_1.ProductQuestionService,
        ProductAnswerService_1.ProductAnswerService,
        CustomerService_1.CustomerService,
        VendorService_1.VendorService,
        UserService_1.UserService])
], ProductAnswerController);
exports.ProductAnswerController = ProductAnswerController;
//# sourceMappingURL=ProductAnswerController.js.map