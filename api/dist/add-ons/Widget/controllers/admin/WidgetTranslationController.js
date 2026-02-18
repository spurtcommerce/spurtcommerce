"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetTranslationController = void 0;
const tslib_1 = require("tslib");
const WidgetService_1 = require("../../services/WidgetService");
const routing_controllers_1 = require("routing-controllers");
const CreateWidgetTranslationRequest_1 = require("./requests/CreateWidgetTranslationRequest");
const WidgetTranslationService_1 = require("../../services/WidgetTranslationService");
const WidgetTranslation_1 = require("../../models/WidgetTranslation");
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
let WidgetTranslationController = class WidgetTranslationController {
    constructor(widgetService, widgetTranslationService) {
        this.widgetService = widgetService;
        this.widgetTranslationService = widgetTranslationService;
        // --
    }
    // Widget Translation List API
    /**
     * @api {Get} /api/widget-translation/widget Widget Language List API
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count
     * @apiGroup Widget Translation
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": 1
     *      "message": "Successfully Got Widget Translation List..!",
     *      "data": [
     *       {
     *       "widgetId": 1,
     *       "widgetTitle": "",
     *       "widgetTranslation": [
     *           {
     *               "modifiedDate": ""
     *           },
     *           {
     *               "modifiedDate": ""
     *           }
     *       ],
     *       "lastModifieDate": ""
     *   }  ]
     * }
     * @apiSampleRequest /api/widget-translation/widget
     * @apiErrorExample {json} Get Widget Translation List error
     * HTTP/1.1 500 Internal Server Error
     */
    getWidgetTranslationList(response, limit, offset, keyword, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const condition = {};
            condition.relations = ['widgetTranslation'];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                condition.where = {
                    widgetTitle: (0, typeorm_1.Like)(`%${keyword}%`),
                };
            }
            if (limit) {
                condition.take = limit;
                if (offset) {
                    condition.skip = offset;
                }
            }
            const widgetList = yield this.widgetService.find(condition);
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Widget Translation List..!`,
                data: count ? widgetList.length : widgetList.map((widget) => {
                    widget.lastModifieDate = new Date(Math.max(...widget.widgetTranslation.map(e => new Date(e.modifiedDate))));
                    return widget;
                }),
            });
        });
    }
    // Widget Detail Translation List API
    /**
     * @api {Get} /api/widget-translation/widget:id Widget Language Detail API
     * @apiGroup Widget Translation
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": 1,
     *      "message": "Successfully Got Widget Translation Detail ..!",
     *      "data": {
     *         "widgetId": 1,
     *         "widgetTitle": "",
     *         "widgetTranslation": [
     *             {
     *                 "languageId": 1,
     *                 "translation": ""
     *             }
     *         ]  }
     * }
     * @apiSampleRequest /api/widget-translation/widget:id
     * @apiErrorExample {json} List Attribute GroupTranslation error
     * HTTP/1.1 500 Internal Server Error
     */
    listAttributeGroupTranslation(response, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const widgetExist = yield this.widgetService.findOne({
                where: {
                    widgetId: id,
                },
                relations: ['widgetTranslation'],
            });
            if (!widgetExist) {
                return response.status(400).send({
                    status: 1,
                    message: `Invalid Widget Id..!`,
                });
            }
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Widget Translation Detail ..!`,
                data: widgetExist,
            });
        });
    }
    // Create Widget Language API
    /**
     * @api {Post} /api/widget-translation/widget/:id Widget Language Create API
     * @apiGroup Widget Translation
     * @apiParam (Request body) {Number} languageId languageId
     * @apiParam (Request body) {String} widgetTitle widgetTitle
     * @apiParam (Request body) {String} widgetDescription widgetDescription
     * @apiParam (Request body) {String} widgetLongTitle widgetLongTitle
     * @apiParamExample {json} Input
     * {
     *      "widgetTranslation": [
     *          {
     *              "widgetTitle" : "",
     *              "widgetDescriptions": "",
     *              "languageId": 1,
     *              "widgetLongTitle": ""
     *          }
     *          ]
     *            }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": 1,
     *      "message": "Successfully Created Translation For Widget..!",
     *      "data": {
     *      "widgetTranslation": {
     *          "id": 1,
     *          "widgetId": 1,
     *          "languageId": 1,
     *          "widgetTitle": "",
     *          "widgetLongTitle": "",
     *          "widgetDescription": ""
     *              }
     *       }
     * }
     * @apiSampleRequest /api/widget-translation/widget/:id
     * @apiErrorExample {json} Create Widget Translation error
     * HTTP/1.1 500 Internal Server Error
     */
    createWidgetTranslation(response, id, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const widgetExist = yield this.widgetService.findOne({
                where: {
                    widgetId: id,
                },
            });
            if (!widgetExist) {
                return response.status(400).send({
                    status: 1,
                    message: `Invalid Widget Id..!`,
                });
            }
            const widgetTranslations = [];
            for (const _widgetTranslation of payload.widgetTranslation) {
                const widgetTranslationExist = yield this.widgetTranslationService.findOne({
                    where: {
                        widgetId: widgetExist.widgetId,
                        languageId: _widgetTranslation.languageId,
                    },
                });
                const widgetTranslation = new WidgetTranslation_1.WidgetTranslation();
                if (widgetTranslationExist) {
                    widgetTranslation.id = widgetTranslationExist.id;
                }
                widgetTranslation.widgetId = widgetExist.widgetId;
                widgetTranslation.widgetDescription = (_a = _widgetTranslation.widgetDescription) !== null && _a !== void 0 ? _a : '';
                widgetTranslation.languageId = _widgetTranslation.languageId;
                widgetTranslation.widgetTitle = (_b = _widgetTranslation.widgetTitle) !== null && _b !== void 0 ? _b : '';
                widgetTranslation.widgetLongTitle = (_c = _widgetTranslation.widgetLongTitle) !== null && _c !== void 0 ? _c : '';
                widgetTranslations.push(widgetTranslation);
            }
            const widgetTranslationSave = yield this.widgetTranslationService.bulkSave(widgetTranslations);
            return response.status(200).send({
                status: 1,
                message: `Successfully Created Translation For Widget..!`,
                data: { widgetTranslation: widgetTranslationSave },
            });
        });
    }
};
exports.WidgetTranslationController = WidgetTranslationController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/widget'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, Number, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], WidgetTranslationController.prototype, "getWidgetTranslationList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/widget/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], WidgetTranslationController.prototype, "listAttributeGroupTranslation", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/widget/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(2, (0, routing_controllers_1.Body)({ validate: false })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, CreateWidgetTranslationRequest_1.CreateWidgetTranslationRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], WidgetTranslationController.prototype, "createWidgetTranslation", null);
exports.WidgetTranslationController = WidgetTranslationController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/widget-translation'),
    tslib_1.__metadata("design:paramtypes", [WidgetService_1.WidgetService,
        WidgetTranslationService_1.WidgetTranslationService])
], WidgetTranslationController);
//# sourceMappingURL=WidgetTranslationController.js.map