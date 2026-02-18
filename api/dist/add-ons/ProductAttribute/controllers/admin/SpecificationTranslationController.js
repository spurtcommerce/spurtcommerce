"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationTranslationController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const SpecificationTranslation_1 = require("../../models/SpecificationTranslation");
const SpecificationService_1 = require("../../services/SpecificationService");
const SpecificationTranslationService_1 = require("../../services/SpecificationTranslationService");
const CreateSpecificationTranslationRequest_1 = require("./requests/CreateSpecificationTranslationRequest");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
let SpecificationTranslationController = class SpecificationTranslationController {
    constructor(specificationService, specificationTranslationService) {
        this.specificationService = specificationService;
        this.specificationTranslationService = specificationTranslationService;
        // --
    }
    // Create Specification Translation
    /**
     * @api {post} /api/specification-translation/specification/:id Add Specification Translation API
     * @apiGroup Specification-Translation
     * @apiParam (Request body) {Number} id specification id (Required)
     * @apiParam (Request body) {Number} languageId language id (Required)
     * @apiParam (Request body) {String{..255}} name name (Required)
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *    "specificationTranslation": [
     *        {
     *            "languageId": 1,
     *            "name": ""
     *        }
     *    ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully created new specification translation.",
     *    "data": [
     *        {
     *            "specificationId": 1,
     *            "languageId": 1,
     *            "name": "",
     *            "createdDate": "",
     *            "id": 1
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/specification-translation/specification
     * @apiErrorExample {json} Add Specification Translation Error
     * HTTP/1.1 500 Internal Server Error
     */
    createSpecificationTranslation(payload, specificationId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const getSpecification = yield this.specificationService.findOne({
                where: {
                    id: specificationId,
                },
            });
            if (!getSpecification) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid specification id',
                };
                return response.status(400).send(errorResponse);
            }
            const spepcificationTranslationSave = [];
            for (const specTrans of payload.specificationTranslation) {
                const getSpecificationTranslation = yield this.specificationTranslationService.findOne({
                    where: {
                        specificationId,
                        languageId: specTrans.languageId,
                    },
                });
                const newSpecificationTranslation = new SpecificationTranslation_1.SpecificationTranslation();
                if (getSpecificationTranslation) {
                    newSpecificationTranslation.id = getSpecificationTranslation.id;
                }
                newSpecificationTranslation.specificationId = specificationId;
                newSpecificationTranslation.languageId = specTrans.languageId;
                newSpecificationTranslation.name = specTrans.name;
                const specificationTranslationSave = yield this.specificationTranslationService.create(newSpecificationTranslation);
                spepcificationTranslationSave.push(Object.assign({}, specificationTranslationSave));
            }
            const successResponse = {
                status: 1,
                message: 'Successfully created new specification translation.',
                data: spepcificationTranslationSave,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Specification Translation List
    /**
     * @api {get} /api/specification-translation/specification Specification Translation List API
     * @apiGroup Specification-Translation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully got specification translation list",
     *    "data": [
     *        {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedBy": 1,
     *            "modifiedDate": "",
     *            "id": 1,
     *            "name": "",
     *            "slug": "",
     *            "isActive": 1,
     *            "isDelete": 1,
     *            "specificationTranslation": [
     *                {
     *                    "createdBy": 1,
     *                    "createdDate": "",
     *                    "modifiedBy": 1,
     *                    "modifiedDate": "",
     *                    "id": 1,
     *                    "specificationId": 1,
     *                    "languageId": 1,
     *                    "name": ""
     *                }
     *            ]
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/specification-translation/specification
     * @apiErrorExample {json} Specification List error
     * HTTP/1.1 500 Internal Server Error
     */
    SpecificationTranslationList(response, limit, offset, keyword, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const condition = {};
            condition.relations = ['specificationTranslation'];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                condition.where = {
                    name: (0, typeorm_1.Like)(`%${keyword}%`),
                };
            }
            if (limit) {
                condition.take = limit;
                if (offset) {
                    condition.skip = offset;
                }
            }
            const getSpecificationTranslation = yield this.specificationService.find(condition);
            const successResponse = {
                status: 1,
                message: 'Successfully got specification translation list',
                data: getSpecificationTranslation,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Specification Translation Detail
    /**
     * @api {get} /api/specification-translation/specification/:id Specification Translation Detail API
     * @apiGroup Specification-Translation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully got specification translation detail"
     *    "data": {
     *        {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedBy": 1,
     *            "modifiedDate": "",
     *            "id": 1,
     *            "name": "",
     *            "slug": "",
     *            "isActive": 1,
     *            "isDelete": 0,
     *            "specificationTranslation": [
     *                {
     *                    "createdBy": 1,
     *                    "createdDate": "",
     *                    "modifiedBy": 1,
     *                    "modifiedDate": "",
     *                    "id": 1,
     *                    "specificationId": 1,
     *                    "languageId": 1,
     *                    "name": ""
     *                }
     *            ]
     *        }
     *    }
     * }
     * @apiSampleRequest /api/Specification-translation/specification
     * @apiErrorExample {json} Specification Translation Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    SpecificationDetail(specificationId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const getSpecificationTranslation = yield this.specificationService.findOne({
                where: {
                    id: specificationId,
                },
                relations: ['specificationTranslation'],
            });
            if (!getSpecificationTranslation) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Specification Translation Id',
                };
                return response.status(400).send(errorResponse);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got specification translation detail',
                data: getSpecificationTranslation,
            };
            return response.status(200).send(successResponse);
        });
    }
};
exports.SpecificationTranslationController = SpecificationTranslationController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/specification/:id'),
    (0, routing_controllers_1.Authorized)(['admin']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateSpecificationTranslationRequest_1.CreateSpecificationTranslation, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SpecificationTranslationController.prototype, "createSpecificationTranslation", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/specification'),
    (0, routing_controllers_1.Authorized)(['admin']),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, Number, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], SpecificationTranslationController.prototype, "SpecificationTranslationList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/specification/:id'),
    (0, routing_controllers_1.Authorized)(['admin']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SpecificationTranslationController.prototype, "SpecificationDetail", null);
exports.SpecificationTranslationController = SpecificationTranslationController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/specification-translation'),
    tslib_1.__metadata("design:paramtypes", [SpecificationService_1.SpecificationService,
        SpecificationTranslationService_1.SpecificationTranslationService])
], SpecificationTranslationController);
//# sourceMappingURL=SpecificationTranslationController.js.map