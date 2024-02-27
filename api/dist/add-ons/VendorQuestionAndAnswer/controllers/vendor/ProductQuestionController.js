"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProductQuestionController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const CreateQuestionRequest_1 = require("./requests/CreateQuestionRequest");
const ProductQuestionService_1 = require("../../../QuestionAndAnswer/services/ProductQuestionService");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const ProductAnswerService_1 = require("../../../QuestionAndAnswer/services/ProductAnswerService");
const CustomerService_1 = require("../../../../src/api/core/services/CustomerService");
const ProductQuestion_1 = require("../../../QuestionAndAnswer/models/ProductQuestion");
const ProductAnswer_1 = require("../../../QuestionAndAnswer/models/ProductAnswer");
const VendorService_1 = require("../../../../src/api/core/services/VendorService");
const class_transformer_1 = require("class-transformer");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const UserService_1 = require("../../../../src/api/core/services/UserService");
let VendorProductQuestionController = class VendorProductQuestionController {
    constructor(productQuestionService, customerService, productAnswerService, productService, vendorService, userService) {
        this.productQuestionService = productQuestionService;
        this.customerService = customerService;
        this.productAnswerService = productAnswerService;
        this.productService = productService;
        this.vendorService = vendorService;
        this.userService = userService;
    }
    // Create Question API
    /**
     * @api {post} /api/vendor-product-question/vendor-question Vendor Question API
     * @apiGroup Vendor Product Question
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
     * @apiSampleRequest /api/vendor-product-question/add-question
     * @apiErrorExample {json} Question error
     * HTTP/1.1 500 Internal Server Error
     */
    createQuestion(questionParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const question = new ProductQuestion_1.ProductQuestion();
            question.question = questionParam.question;
            question.productId = questionParam.productId;
            question.type = 3;
            question.referenceId = request.user.vendorId;
            question.isActive = 1;
            const questionSaved = yield this.productQuestionService.create(question);
            if (questionParam.answer) {
                const answer = new ProductAnswer_1.ProductAnswer();
                answer.answer = questionParam.answer;
                answer.questionId = +questionSaved.questionId;
                answer.type = 3;
                answer.referenceId = request.user.vendorId;
                answer.defaultAnswer = 1;
                answer.isActive = 1;
                yield this.productAnswerService.create(answer);
            }
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
    // Update Question status API
    /**
     * @api {put} /api/vendor-product-question/update-question-status/:questionId Update Question status API
     * @apiGroup Vendor Product Question
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
     * @apiSampleRequest /api/vendor-product-question/update-question-status/:questionId
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
                    message: 'invalid QuestionId',
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
                    message: 'unable to update your question status',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // delete Question API
    /**
     * @api {delete} /api/vendor-product-question/delete-question/:questionId Delete Question API
     * @apiGroup Vendor Product Question
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Question.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-question/delete-question/:questionId
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
                    message: 'Invalid questionId',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteQuestion = yield this.productQuestionService.delete(question);
            if (deleteQuestion) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted Question',
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
    // Question List API
    /**
     * @api {get} /api/vendor-product-question/question-list Question List API
     * @apiGroup Vendor Product Question
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
     * @apiSampleRequest /api/vendor-product-question/question-list
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
    // Vendor Product Question List API
    /**
     * @api {get} /api/vendor-product-question/vendor-product-question-list Vendor Product Question List API
     * @apiGroup Vendor Product Question
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get vendor product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/vendor-product-question/vendor-product-question-list
     * @apiErrorExample {json} vendor product question list error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorproductList(limit, offset, keyword, productName, price, count, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'Product.productId as productId',
                'Product.sku as sku',
                'Product.name as name',
                'Product.quantity as quantity',
                'Product.price as ProductPrice',
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
            const relations = [{
                    tableName: 'Product.vendorProducts',
                    aliasName: 'vendorProducts',
                }];
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['Product.name', 'Product.price'],
                    value: keyword,
                });
            }
            if (productName && productName !== '') {
                searchConditions.push({
                    name: ['Product.name'],
                    value: productName.toLowerCase(),
                });
            }
            const sort = [{
                    name: 'Product.createdDate',
                    order: 'DESC',
                }];
            const WhereConditions = [{
                    name: 'vendorProducts.vendorId',
                    op: 'and',
                    value: request.user.vendorId,
                }];
            if (price && price !== '') {
                WhereConditions.push({
                    name: 'Product.price',
                    op: 'and',
                    value: price,
                });
            }
            const productLists = yield this.productService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relations, [], sort, false, true);
            if (count) {
                const productListCount = yield this.productService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relations, [], sort, true, true);
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
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/add-question'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateQuestionRequest_1.CreateQuestion, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductQuestionController.prototype, "createQuestion", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-question-status/:questionId'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('questionId')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('status')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductQuestionController.prototype, "updateQuestionStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete-question/:questionId'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('questionId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductQuestionController.prototype, "deleteQuestion", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/question-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('productId')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductQuestionController.prototype, "questionList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-product-question-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('productName')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('price')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__param(7, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductQuestionController.prototype, "vendorproductList", null);
VendorProductQuestionController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/vendor-product-question'),
    tslib_1.__metadata("design:paramtypes", [ProductQuestionService_1.ProductQuestionService,
        CustomerService_1.CustomerService,
        ProductAnswerService_1.ProductAnswerService,
        ProductService_1.ProductService,
        VendorService_1.VendorService,
        UserService_1.UserService])
], VendorProductQuestionController);
exports.VendorProductQuestionController = VendorProductQuestionController;
//# sourceMappingURL=ProductQuestionController.js.map