"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQuestionController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const CreateQuestionRequest_1 = require("./requests/CreateQuestionRequest");
const ProductQuestionService_1 = require("../../services/ProductQuestionService");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const ProductAnswerService_1 = require("../../services/ProductAnswerService");
const CustomerService_1 = require("../../../../src/api/core/services/CustomerService");
const UserService_1 = require("../../../../src/api/core/services/UserService");
const ProductQuestion_1 = require("../../models/ProductQuestion");
const ProductAnswer_1 = require("../../models/ProductAnswer");
const class_transformer_1 = require("class-transformer");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const VendorService_1 = require("../../../../src/api/core/services/VendorService");
let ProductQuestionController = class ProductQuestionController {
    constructor(productQuestionService, customerService, userService, productAnswerService, vendorService, productService) {
        this.productQuestionService = productQuestionService;
        this.customerService = customerService;
        this.userService = userService;
        this.productAnswerService = productAnswerService;
        this.vendorService = vendorService;
        this.productService = productService;
    }
    // Create Question API
    /**
     * @api {post} /api/admin-product-question Add Question API
     * @apiGroup Admin Product Question
     * @apiParam (Request body) {String} question
     * @apiParam (Request body) {Number} productId
     * @apiParam (Request body) {String} [answer]
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "question" : "",
     *      "productId" : "",
     *      "answer" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Question created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-product-question
     * @apiErrorExample {json} Question error
     * HTTP/1.1 500 Internal Server Error
     */
    createQuestion(questionParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const question = new ProductQuestion_1.ProductQuestion();
            question.question = questionParam.question;
            question.productId = questionParam.productId;
            question.type = 1;
            question.referenceId = request.user.userId;
            question.isActive = 1;
            const questionSaved = yield this.productQuestionService.create(question);
            if (questionParam.answer) {
                const answer = new ProductAnswer_1.ProductAnswer();
                answer.answer = questionParam.answer;
                answer.questionId = +questionSaved.questionId;
                answer.type = 1;
                answer.referenceId = request.user.userId;
                answer.defaultAnswer = 1;
                answer.isActive = 1;
                yield this.productAnswerService.create(answer);
            }
            if (questionSaved !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Question Posted Successfully.',
                    data: questionSaved,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create question.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Update Question API
    /**
     * @api {put} /api/admin-product-question/update-question/:questionId Update Question API
     * @apiGroup Admin Product Question
     * @apiParam (Request body) {String} question question
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "question" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " Question is updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-product-question/update-question/:questionId
     * @apiErrorExample {json} updateQuestion error
     * HTTP/1.1 500 Internal Server Error
     */
    updateQuestion(questionId, question, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findQuestion = yield this.productQuestionService.findOne({
                where: {
                    questionId,
                },
            });
            if (!findQuestion) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Question Id.',
                };
                return response.status(400).send(errorResponse);
            }
            findQuestion.question = question;
            const questionSave = yield this.productQuestionService.create(findQuestion);
            if (questionSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated your question.',
                    data: questionSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update your question.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Update Question status API
    /**
     * @api {put} /api/admin-product-question/:questionId Update Question status API
     * @apiGroup Admin Product Question
     * @apiParam (Request body) {Number} status status should be 0 | 1
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " status updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-product-question/:questionId
     * @apiErrorExample {json} updateQuestion error
     * HTTP/1.1 500 Internal Server Error
     */
    updateQuestionStatus(questionId, status, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const question = yield this.productQuestionService.findOne({
                where: {
                    questionId,
                },
            });
            if (!question) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Question Id.',
                };
                return response.status(400).send(errorResponse);
            }
            question.isActive = status;
            const questionSave = yield this.productQuestionService.create(question);
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
                    message: 'Unable to update your question status.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // delete Question API
    /**
     * @api {delete} /api/admin-product-question/:questionId Delete Question API
     * @apiGroup Admin Product Question
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Question.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-product-question/:questionId
     * @apiErrorExample {json} Question error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteQuestion(questionId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const question = yield this.productQuestionService.findOne({
                where: {
                    questionId,
                },
            });
            if (!question) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid question Id.',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteQuestion = yield this.productQuestionService.delete(question);
            if (deleteQuestion) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the Question.',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the Question.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Question List API
    /**
     * @api {get} /api/admin-product-question Question List API
     * @apiGroup Admin Product Question
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
     * @apiSampleRequest /api/admin-product-question
     * @apiErrorExample {json} question error
     * HTTP/1.1 500 Internal Server Error
     */
    questionList(limit, offset, keyword, productId, count, response) {
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
                ];
                const ansCount = yield this.productAnswerService.list(0, 0, [], searchQuestion, [], 1);
                temp.answerCount = ansCount;
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully get all question List',
                data: {
                    productDetail,
                    questionList: value,
                },
            };
            return response.status(200).send(successResponse);
        });
    }
    // Product Question List API
    /**
     * @api {get} /api/admin-product-question/product-question-list  Product Question List API
     * @apiGroup Admin Product Question
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/admin-product-question/product-question-list
     * @apiErrorExample {json} product question list error
     * HTTP/1.1 500 Internal Server Error
     */
    questionproductList(limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'Product.productId as productId',
                'Product.sku as sku',
                'Product.name as name',
                'Product.quantity as quantity',
                'Product.price as price',
                'Product.skuId as skuId',
                'Product.productSlug as productSlug',
                'Product.isActive as isActive',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
                '(SELECT sku.sku_name as sku FROM sku WHERE sku.id = skuId) as sku',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as modifiedPrice',
                '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
                '(SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
                '(SELECT count(pq.question_id) as QuestionCount FROM product_question as pq WHERE pq.product_id = Product.productId) as questionCount',
            ];
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['Product.name'],
                    value: keyword,
                });
            }
            const sort = [{
                    name: 'Product.createdDate',
                    order: 'DESC',
                }];
            const productLists = yield this.productService.listByQueryBuilder(limit, offset, select, [], searchConditions, [], [], sort, false, true);
            if (count) {
                const productListCount = yield this.productService.listByQueryBuilder(limit, offset, select, [], searchConditions, [], [], sort, true, true);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got product lists count.',
                    data: productListCount,
                });
            }
            const productList = productLists.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                if (value.productSpecial !== null) {
                    temp.pricerefer = value.productSpecial;
                    temp.flag = 1;
                }
                else if (value.productDiscount !== null) {
                    temp.pricerefer = value.productDiscount;
                    temp.flag = 0;
                }
                else {
                    temp.pricerefer = '';
                    temp.flag = '';
                }
                return temp;
            }));
            const results = yield Promise.all(productList);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete product list.',
                data: (0, class_transformer_1.instanceToPlain)(results),
            };
            return response.status(200).send(successResponse);
        });
    }
    // Product Detail API
    /**
     * @api {get} /api/admin-product-question/product-detail-question-list/:id Product Detail API
     * @apiGroup Admin Product Question
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/admin-product-question/product-detail-question-list/:id
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    productDetail(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productDetail = yield this.productService.findOne({
                where: { productId: id },
            });
            const productDetails = (0, class_transformer_1.instanceToPlain)(productDetail);
            productDetails.questionList = yield this.productQuestionService.findAll({
                select: ['questionId', 'productId', 'question', 'type', 'referenceId', 'createdDate'],
                where: { productId: productDetail.productId },
            }).then((val) => {
                const user = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const referenceId = value.referenceId;
                    const type = value.type;
                    const temp = value;
                    if (type && type === 2) {
                        const customer = yield this.customerService.findOne({
                            select: ['id', 'firstName', 'avatar', 'avatarPath', 'city'],
                            where: { id: referenceId },
                        });
                        if (customer !== undefined) {
                            temp.customerDetail = customer;
                        }
                    }
                    else {
                        const adminUser = yield this.userService.findOne({
                            select: ['userId', 'firstName', 'avatar', 'avatarPath'],
                            where: { userId: referenceId },
                        });
                        if (adminUser !== undefined) {
                            temp.adminuserDetail = adminUser;
                        }
                    }
                    return temp;
                }));
                const resultData = Promise.all(user);
                return resultData;
            });
            const successResponse = {
                status: 1,
                message: 'Successfully get productDetail',
                data: productDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(['admin', 'create-product-question']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateQuestionRequest_1.CreateQuestion, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQuestionController.prototype, "createQuestion", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-question/:questionId'),
    (0, routing_controllers_1.Authorized)(['admin', 'update-product-question']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('questionId')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('question')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQuestionController.prototype, "updateQuestion", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:questionId'),
    (0, routing_controllers_1.Authorized)(['admin', 'update-question-status']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('questionId')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('status')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQuestionController.prototype, "updateQuestionStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:questionId'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-product-question']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('questionId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQuestionController.prototype, "deleteQuestion", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(['admin', 'product-question-list']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('productId')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQuestionController.prototype, "questionList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product-question-list'),
    (0, routing_controllers_1.Authorized)(['admin']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQuestionController.prototype, "questionproductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product-detail-question-list/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQuestionController.prototype, "productDetail", null);
ProductQuestionController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/admin-product-question'),
    tslib_1.__metadata("design:paramtypes", [ProductQuestionService_1.ProductQuestionService,
        CustomerService_1.CustomerService,
        UserService_1.UserService,
        ProductAnswerService_1.ProductAnswerService,
        VendorService_1.VendorService,
        ProductService_1.ProductService])
], ProductQuestionController);
exports.ProductQuestionController = ProductQuestionController;
//# sourceMappingURL=ProductQuestionController.js.map