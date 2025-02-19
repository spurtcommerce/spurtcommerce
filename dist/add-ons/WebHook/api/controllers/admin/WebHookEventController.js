"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebHookEventController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const WebHookService_1 = require("../../services/WebHookService");
const typeorm_1 = require("typeorm");
let WebHookEventController = class WebHookEventController {
    constructor(webHookService) {
        this.webHookService = webHookService;
        // --
    }
    // Get WebHook List API
    /**
     * @api {Get} /api/webhook-event Get WebHook List API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Got WebHook Event List",
     *      "data": ""
     *      "status": "1"
     * }
     * @apiSampleRequest /api/webhook-event
     * @apiErrorExample {json} GetWebHookList error
     * HTTP/1.1 500 Internal Server Error
     */
    getWebHookList(response, limit, offset, keyword, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const condition = {};
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
            const webHookList = yield this.webHookService.find(condition);
            return response.status(200).send({
                status: 1,
                message: `Successfully Got WebHook Event ${count ? 'count' : 'list'}..!`,
                data: count ? webHookList[1] : webHookList[0],
            });
        });
    }
    // Get WebHook List API
    /**
     * @api {Put} /api/webhook-event/:id Get WebHook List API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} urls urls
     * @apiParam (Request body) {Number} isActive isActive
     * @apiParam (Request body) {String} keyword keyword
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Updated WebHook Event ..!",
     *       "data": {
     *       "id": 1,
     *       "url": "",
     *       "isActive": 1
     *       }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/webhook-event/:id
     * @apiErrorExample {json} web HookUpdate error
     * HTTP/1.1 500 Internal Server Error
     */
    webHookUpdate(response, urls, isActive, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const webHookExist = yield this.webHookService.findOne({ where: { id } });
            if (!webHookExist) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid WebHook Event id..!`,
                });
            }
            webHookExist.url = urls;
            webHookExist.isActive = isActive ? isActive === '1' ? 1 : 0 : undefined;
            const webHookSave = yield this.webHookService.save(webHookExist);
            return response.status(200).send({
                status: 1,
                message: `Successfully Updated WebHook Event ..!`,
                data: webHookSave,
            });
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, Number, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], WebHookEventController.prototype, "getWebHookList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('urls')),
    tslib_1.__param(2, (0, routing_controllers_1.BodyParam)('isActive')),
    tslib_1.__param(3, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], WebHookEventController.prototype, "webHookUpdate", null);
WebHookEventController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/webhook-event'),
    tslib_1.__metadata("design:paramtypes", [WebHookService_1.WebHookService])
], WebHookEventController);
exports.WebHookEventController = WebHookEventController;
//# sourceMappingURL=WebHookEventController.js.map