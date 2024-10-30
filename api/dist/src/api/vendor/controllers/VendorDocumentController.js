"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorDocumentController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const VendorService_1 = require("../../../api/core/services/VendorService");
const VendorDocument_1 = require("../../core/models/VendorDocument");
const VendorDocumentLog_1 = require("../../core/models/VendorDocumentLog");
const VendorDocumentLogService_1 = require("../../../api/core/services/VendorDocumentLogService");
const VendorDocumentService_1 = require("../../../api/core/services/VendorDocumentService");
const DocumentService_1 = require("../../../api/core/services/DocumentService");
const VendorDocumentRequest_1 = require("./requests/VendorDocumentRequest");
const UpdateVendorDocument_1 = require("./requests/UpdateVendorDocument");
let VendorDocumentController = class VendorDocumentController {
    constructor(vendorDocumentService, vendorService, vendorDocumentLogService, documentService) {
        this.vendorDocumentService = vendorDocumentService;
        this.vendorService = vendorService;
        this.vendorDocumentLogService = vendorDocumentLogService;
        this.documentService = documentService;
    }
    // Create Document API
    /**
     * @api {Post} /api/vendor-document CreateDocument API
     * @apiGroup VendorDocumentGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} documentId documentId
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiParam (Request body) {string} fileName fileName
     * @apiParam (Request body) {string} certificationType certificationType
     * @apiParam (Request body) {string} refrenceNo refrenceNo
     * @apiParam (Request body) {string} name name
     * @apiParam (Request body) {string} issuedBy issuedBy
     * @apiParam (Request body) {string} validFrom validFrom
     * @apiParam (Request body) {string} validTo validTo
     * @apiParam (Request body) {Number} status status
     * @apiParamExample {json} Input
     * {
     *  "documentId": 1,
     *  "vendorId": 1,
     *  "fileName": "",
     *  "filePath": "",
     *  "status": "",
     *  "certificate": {
     *      "certificationType": "",
     *      "refrenceNo": "",
     *      "name": "",
     *      "issuedBy": "",
     *      "validFrom": "",
     *      "validTo": ""
     *      }
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  {
     *   "status": 1,
     *   "message": "Document Upload Successfully.",
     *   "data": {
     *       "vendorId": 1,
     *       "documentId": 1,
     *       "fileName": "",
     *       "filePath": "",
     *       "createdBy": "",
     *       "isActive": 1,
     *       "createdDate": "",
     *       "modifiedDate": "",
     *       "modifiedBy": 1,
     *       "id": 1,
     *   }
     *  }
     *  }
     * @apiSampleRequest  /api/vendor-document
     * @apiErrorExample {json} createDocument error
     * HTTP/1.1 500 Internal Server Error
     */
    createDocument(documentParams, response, request) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorService.findOne({ where: { vendorId: documentParams.vendorId } });
            if (!vendor) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid seller Id',
                };
                return response.status(400).send(errorResponse);
            }
            const vendorDocument = yield this.vendorDocumentService.findOne({ where: { documentId: documentParams.documentId, vendorId: vendor.vendorId }, relations: ['document'] });
            if (vendorDocument && ((_a = vendorDocument === null || vendorDocument === void 0 ? void 0 : vendorDocument.document) === null || _a === void 0 ? void 0 : _a.name) !== 'Certificate') {
                return response.status(400).send({
                    status: 0,
                    message: 'Document type already uploaded',
                });
            }
            const newDocument = new VendorDocument_1.VendorDocument();
            let saveDocument;
            if (!documentParams.certificate) {
                newDocument.vendorId = vendor.vendorId;
                newDocument.documentId = documentParams.documentId;
                newDocument.fileName = documentParams.fileName;
                newDocument.filePath = documentParams.filePath;
                newDocument.createdBy = vendor.vendorId;
                newDocument.isDelete = 0;
                newDocument.status = (_b = documentParams.status) !== null && _b !== void 0 ? _b : 1;
                saveDocument = yield this.vendorDocumentService.create(newDocument);
                const documentLog = new VendorDocumentLog_1.VendorDocumentLog();
                documentLog.vendorDocumentId = saveDocument.id;
                documentLog.status = VendorDocumentLog_1.DocumentLogStatus.Uploaded;
                yield this.vendorDocumentLogService.create(documentLog);
            }
            else {
                newDocument.documentId = documentParams.documentId;
                newDocument.vendorId = vendor.vendorId;
                newDocument.fileName = documentParams.fileName;
                newDocument.filePath = documentParams.filePath;
                newDocument.status = (_c = documentParams.status) !== null && _c !== void 0 ? _c : 1;
                newDocument.isDelete = 0;
                newDocument.additionalInfo = documentParams.certificate;
                yield this.vendorDocumentService.create(newDocument);
            }
            return response.status(200).send({
                status: 1,
                message: 'Document Upload Successfully',
                data: saveDocument,
            });
        });
    }
    // GetDocument List API
    /**
     * @api {Get} /api/vendor-document Get Document List API
     * @apiGroup VendorDocumentGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {string} keyword keyword
     * @apiParam (Request body) {string} title title
     * @apiParam (Request body) {string} fileName fileName
     * @apiParam (Request body) {string} lastUpload lastUpload
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     *     {
     *    "status": 1,
     *    "message": "Successfully Get Document List.",
     *    "data": [
     *        {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedBy": 1,
     *            "modifiedDate": "",
     *            "id": 1,
     *            "vendorId": 1,
     *            "documentId": 1,
     *            "fileName": "",
     *            "filePath": "",
     *            "status": "",
     *            "document": {
     *                "createdBy": 1,
     *                "createdDate": "",
     *                "modifiedBy": 1,
     *                "modifiedDate": "",
     *                "id": 1,
     *                "name": "",
     *                "documentType": "",
     *                "isMandatory": "",
     *                "maxUploadSize": "",
     *                "isActive": 1,
     *                "isDelete": 0
     *            }
     *        }
     *    ]
     * }
     * @apiSampleRequest  /api/vendor-document
     * @apiErrorExample {json} getDocumentDetails error
     * HTTP/1.1 500 Internal Server Error
     */
    getDocumentDetails(limit, offset, status, certificate, refrenceNo, keyword, title, fileName, certificateName, vendorId, lastUpload, count, response, request, validTo, validFrom) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const search = [];
            const WhereConditions = [];
            if (!certificate) {
                WhereConditions.push({
                    name: 'document.name',
                    op: 'raw',
                    sign: '!=',
                    value: 'Certificate',
                });
                if (keyword && keyword !== '') {
                    search.push({
                        name: ['vendorDocument.fileName', 'vendorDocument.filePath', 'document.name'],
                        value: keyword,
                    });
                }
                if (title && title !== '') {
                    search.push({
                        name: ['document.name'],
                        value: title,
                    });
                }
                if (fileName && fileName !== '') {
                    search.push({
                        name: ['vendorDocument.fileName'],
                        value: fileName,
                    });
                }
            }
            WhereConditions.push({
                name: 'vendorDocument.isDelete',
                op: 'and',
                value: 0,
            }, {
                name: 'vendorDocument.vendorId',
                op: 'and',
                value: vendorId,
            });
            const relations = [
                {
                    tableName: 'vendorDocument.document',
                    aliasName: 'document',
                    op: 'left',
                },
            ];
            if (status === 0 || status === 1) {
                WhereConditions.push({
                    name: 'vendorDocument.status',
                    op: 'and',
                    value: status,
                });
            }
            if (certificate) {
                WhereConditions.push({
                    name: 'document.name',
                    op: 'IN',
                    // sign: 'IN',
                    value: '"Certificate"',
                });
            }
            const documentList = yield this.vendorDocumentService.listByQueryBuilder(limit, offset, select, WhereConditions, search, relations, [], [], false, false);
            const certificateValue = [];
            if (certificate) {
                if (keyword || certificateName || refrenceNo || validTo || validFrom) {
                    documentList.map((documents) => {
                        var _a, _b, _c, _d, _e, _f, _g;
                        if (keyword) {
                            if (((_a = documents.additionalInfo) === null || _a === void 0 ? void 0 : _a.name.toLowerCase().includes(keyword.toLowerCase())) || ((_b = documents.additionalInfo) === null || _b === void 0 ? void 0 : _b.refrenceNo.toLowerCase().includes(keyword.toLowerCase())) || ((_c = documents.additionalInfo) === null || _c === void 0 ? void 0 : _c.certificationType.toLowerCase().includes(keyword.toLowerCase()))) {
                                certificateValue.push(documents);
                            }
                        }
                        if (certificateName) {
                            if ((_d = documents.additionalInfo) === null || _d === void 0 ? void 0 : _d.name.toLowerCase().includes(certificateName.toLowerCase())) {
                                certificateValue.push(documents);
                            }
                        }
                        if (refrenceNo) {
                            if ((_e = documents.additionalInfo) === null || _e === void 0 ? void 0 : _e.refrenceNo.toLowerCase().includes(refrenceNo.toLowerCase())) {
                                certificateValue.push(documents);
                            }
                        }
                        if (validTo) {
                            if (((_f = documents.additionalInfo) === null || _f === void 0 ? void 0 : _f.validTo) === validTo) {
                                certificateValue.push(documents);
                            }
                        }
                        if (validFrom) {
                            if ((_g = documents.additionalInfo) === null || _g === void 0 ? void 0 : _g.validFrom.toLowerCase().includes(validFrom.toLowerCase())) {
                                certificateValue.push(documents);
                            }
                        }
                    });
                    return response.status(200).send({
                        status: 1,
                        message: 'Successfully got certificate list',
                        data: count ? certificateValue.length : certificateValue,
                    });
                }
            }
            return response.status(200).send({
                status: 1,
                message: 'Successfully got document list',
                data: count ? documentList.length : documentList,
            });
        });
    }
    // DeleteDocuments API
    /**
     * @api {Delete} /api/vendor-document/:id   DeleteDocuments API
     * @apiGroup VendorDocumentGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} documentId documentId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "status": 1,
     * "message": "Document Deleted Successfully.",
     *  }
     * @apiSampleRequest /api/vendor-document/:id
     * @apiErrorExample {json} document error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteDocuments(documentId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const document = yield this.vendorDocumentService.findOne({ where: { id: documentId, isDelete: 0 } });
            if (!document) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Document Id',
                });
            }
            yield this.vendorDocumentService.softDelete(documentId);
            const documentLog = new VendorDocumentLog_1.VendorDocumentLog();
            documentLog.vendorDocumentId = document.id;
            documentLog.status = VendorDocumentLog_1.DocumentLogStatus.Deleted;
            yield this.vendorDocumentLogService.create(documentLog);
            return response.status(200).send({
                status: 1,
                message: 'Document deleted successfully',
            });
        });
    }
    // GetMasterDocuments API
    /**
     * @api {Get} /api/vendor-document/document   GetMasterDocuments API
     * @apiGroup VendorDocumentGroup
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "status": 1
     * "message": "Successfully Get documents  List.",
     * "data": [
     * {
     *      "id": 1,
     *      "name": "",
     *      "documentType": "",
     *      "isMandatory": 1,
     *      "maxUploadSize": 1,
     *      "isActive": 1,
     *      "isDelete": 0,
     *      "createdDate": "",
     *      "modifiedDate": "",
     *      "createdBy": 1,
     *      "modifiedBy": 1
     * }]
     *  }
     * @apiSampleRequest /api/vendor-document/document
     * @apiErrorExample {json} document error
     * HTTP/1.1 500 Internal Server Error
     */
    getMasterDocuments(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const documentList = yield this.documentService.find({});
            return response.status(200).send({
                status: 1,
                message: 'Successfully got documents  list',
                data: documentList,
            });
        });
    }
    // VendorDocument API
    /**
     * @api {Get} /api/vendor-document/:id   VendorDocument API
     * @apiGroup VendorDocumentGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  {
     *   "status": 1,
     *   "message": "Successfully Get document  Details.",
     *   "data": {
     *   "createdBy": 1,
     *   "createdDate": "",
     *   "modifiedBy": 1,
     *   "modifiedDate": "",
     *   "id": 1,
     *   "vendorId": 1,
     *   "documentId": 1,
     *   "fileName": "",
     *   "filePath": "",
     *   "isActive": 1,
     *   "isDelete": 0,
     *   "isVerified": 1,
     *   }
     *  }
     *  }
     * @apiSampleRequest  /api/vendor-document/:id
     * @apiErrorExample {json} VendorDocument error
     * HTTP/1.1 500 Internal Server Error
     */
    VendorDocument(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const documentData = yield this.vendorDocumentService.findOne({ where: { id, isDelete: 0 }, relations: ['document', 'vendorDocumentLog'] });
            if (!documentData) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Document Id',
                });
            }
            return response.status(200).send({
                status: 1,
                message: 'Successfully got document  details',
                data: documentData,
            });
        });
    }
    // Update Documents API
    /**
     * @api {Put} /api/vendor-document/:id   Update Documents API
     * @apiGroup VendorDocumentGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} documentId documentId
     * @apiParam (Request body) {Number} certificate certificate
     * @apiParam (Request body) {string} certificationType certificationType
     * @apiParam (Request body) {string} refrenceNo refrenceNo
     * @apiParam (Request body) {string} name name
     * @apiParam (Request body) {string} issuedBy issuedBy
     * @apiParam (Request body) {string} validFrom validFrom
     * @apiParam (Request body) {string} validTo validTo
     * @apiParamExample {json} Input
     * "certificate": {
     *      "certificationType": 1,
     *      "certificate": "",
     *      "refrenceNo": "",
     *      "name": "",
     *      "issuedBy": 1,
     *      "validFrom": "",
     *      "validTo": ""
     *      }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "status": 1,
     * "message": "Successfully Update document..",
     *  }
     * @apiSampleRequest /api/vendor-document/:id
     * @apiErrorExample {json} UpdateDocument error
     * HTTP/1.1 500 Internal Server Error
     */
    UpdateDocument(id, param, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const documentData = yield this.vendorDocumentService.findOne({ where: { id, isDelete: 0 } });
            if (!documentData) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Document Id',
                });
            }
            if (request.user.vendorId !== documentData.vendorId) {
                return response.status(400).send({
                    status: 0,
                    message: 'Your not allowed to edit this page',
                });
            }
            documentData.additionalInfo = param.certificate;
            const updateData = yield this.vendorDocumentService.create(documentData);
            return response.status(200).send({
                status: 1,
                message: 'Successfully update document',
                data: updateData,
            });
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)('vendor-unapproved'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [VendorDocumentRequest_1.VendorDocumentRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorDocumentController.prototype, "createDocument", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)('vendor-unapproved'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('certificate')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('refrenceNo')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('title')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('fileName')),
    tslib_1.__param(8, (0, routing_controllers_1.QueryParam)('certificateName')),
    tslib_1.__param(9, (0, routing_controllers_1.QueryParam)('vendorId')),
    tslib_1.__param(10, (0, routing_controllers_1.QueryParam)('lastUpload')),
    tslib_1.__param(11, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(12, (0, routing_controllers_1.Res)()),
    tslib_1.__param(13, (0, routing_controllers_1.Req)()),
    tslib_1.__param(14, (0, routing_controllers_1.QueryParam)('validTo')),
    tslib_1.__param(15, (0, routing_controllers_1.QueryParam)('validFrom')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Number, String, String, String, String, String, Number, String, Object, Object, Object, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorDocumentController.prototype, "getDocumentDetails", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)('vendor-unapproved'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorDocumentController.prototype, "deleteDocuments", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/document'),
    (0, routing_controllers_1.Authorized)('vendor-unapproved'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorDocumentController.prototype, "getMasterDocuments", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_1.Authorized)('vendor-unapproved'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorDocumentController.prototype, "VendorDocument", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)('vendor-unapproved'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, UpdateVendorDocument_1.UpdateVendorDocumentRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorDocumentController.prototype, "UpdateDocument", null);
VendorDocumentController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/vendor-document'),
    tslib_1.__metadata("design:paramtypes", [VendorDocumentService_1.VendorDocumentService,
        VendorService_1.VendorService,
        VendorDocumentLogService_1.VendorDocumentLogService,
        DocumentService_1.DocumentService])
], VendorDocumentController);
exports.VendorDocumentController = VendorDocumentController;
//# sourceMappingURL=VendorDocumentController.js.map