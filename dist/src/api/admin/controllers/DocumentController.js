"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDocumentController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const DocumentService_1 = require("../../../../src/api/core/services/DocumentService");
const Document_1 = require("../../core/models/Document");
const CreateDocumentRequest_1 = require("./requests/CreateDocumentRequest");
let AdminDocumentController = class AdminDocumentController {
    constructor(documentService) {
        this.documentService = documentService;
        // --
    }
    // Get DocumentList API
    /**
     * @api {Get} api/document  Get DocumentList API
     * @apiGroup DocumentGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {string} keyword keyword
     * @apiParam (Request body) {string} title title
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Got Document List",
     *    "data": [
     *        {
     *            "createdBy": "",
     *            "createdDate": "",
     *            "modifiedBy": null,
     *            "modifiedDate": "",
     *            "id": "",
     *            "name": "",
     *            "documentType": "",
     *            "isMandatory": "",
     *            "maxUploadSize": "",
     *            "isActive": "",
     *            "isDelete": ""
     *        },
     *    ]
     * }
     * @apiSampleRequest api/document
     * @apiErrorExample {json} document error
     * HTTP/1.1 500 Internal Server Error
     */
    getDocumentList(limit, offset, status, keyword, title, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const search = [];
            const WhereConditions = [];
            const relations = [];
            if (keyword && keyword !== '') {
                search.push({
                    name: ['document.name', 'document.documentType'],
                    value: keyword,
                });
            }
            if (title && title !== '') {
                search.push({
                    name: ['document.name'],
                    value: title,
                });
            }
            if (status === 0 || status === 1) {
                WhereConditions.push({
                    name: 'document.isActive',
                    op: 'and',
                    value: status,
                });
            }
            const documentList = yield this.documentService.listByQueryBuilder(limit, offset, select, WhereConditions, search, relations, [], [], false, false);
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Document List`,
                data: count ? documentList.length : documentList,
            });
        });
    }
    // Get Document Detail API
    /**
     * @api {Get} api/document/:id  Get Document Detail API
     * @apiGroup DocumentGroup
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Got Document Detail",
     *    "data": [
     *        {
     *            "createdBy": "",
     *            "createdDate": "",
     *            "modifiedBy": null,
     *            "modifiedDate": "",
     *            "id": "",
     *            "name": "",
     *            "documentType": "",
     *            "isMandatory": "",
     *            "maxUploadSize": "",
     *            "isActive": "",
     *            "isDelete": ""
     *        },
     *    ]
     * }
     * @apiSampleRequest api/document/:id
     * @apiErrorExample {json} document error
     * HTTP/1.1 500 Internal Server Error
     */
    getDocumentDetail(response, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const document = yield this.documentService.findOne({ where: { id } });
            if (!document) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid Document Id`,
                });
            }
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Document Detail`,
                data: document,
            });
        });
    }
    // Create Document API
    /**
     * @api {Post} api/document  Create Document API
     * @apiGroup DocumentGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiParam (Request body) {String} name name
     * @apiParam (Request body) {Number} isMandatory isMandatory
     * @apiParam (Request body) {Number} maxUploadSize maxUploadSize
     * @apiParam (Request body) {Number} isActive isActive
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Saved Document",
     *    "data": {
     *        "name": "",
     *        "isMandatory": "",
     *        "maxUploadSize": "",
     *        "isActive": "",
     *        "createdDate": "",
     *        "modifiedDate": "",
     *        "id": ""
     *    }
     * }
     * @apiSampleRequest api/document
     * @apiErrorExample {json} document error
     * HTTP/1.1 500 Internal Server Error
     */
    createDocument(response, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const document = new Document_1.Document();
            if (payload.id) {
                const documentExist = yield this.documentService.findOne({ where: { id: payload.id } });
                if (!documentExist) {
                    return response.status(400).send({
                        status: 1,
                        message: `Invalid Document Id`,
                    });
                }
                document.id = payload.id;
            }
            document.name = payload.name;
            document.isMandatory = payload.isMandatory;
            document.maxUploadSize = payload.maxUploadSize;
            document.isActive = payload.isActive;
            const documentSave = yield this.documentService.save(document);
            return response.status(200).send({
                status: 1,
                message: `Successfully Saved Document`,
                data: documentSave,
            });
        });
    }
    // Delete Document API
    /**
     * @api {Delete} api/document/:id  Delete Document API
     * @apiGroup DocumentGroup
     * @apiHeader {String} Authorizatione
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Delete Document ..!",
     *    "data": {
     *        "raw": [],
     *        "affected": ""
     *    }
     * }
     * @apiSampleRequest api/document/:id
     * @apiErrorExample {json} document error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteDocument(response, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const document = yield this.documentService.delete({ id });
            return response.status(200).send({
                status: 1,
                message: `Successfully Delete Document`,
                data: document,
            });
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('title')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, String, String, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminDocumentController.prototype, "getDocumentList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminDocumentController.prototype, "getDocumentDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, CreateDocumentRequest_1.CreateDocumentRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminDocumentController.prototype, "createDocument", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminDocumentController.prototype, "deleteDocument", null);
AdminDocumentController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/document'),
    tslib_1.__metadata("design:paramtypes", [DocumentService_1.DocumentService])
], AdminDocumentController);
exports.AdminDocumentController = AdminDocumentController;
//# sourceMappingURL=DocumentController.js.map