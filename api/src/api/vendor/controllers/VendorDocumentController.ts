
import 'reflect-metadata';
import { Authorized, Body, Delete, Get, JsonController, Param, Post, Put, QueryParam, Req, Res } from 'routing-controllers';
import { VendorService } from '../../../api/core/services/VendorService';
import { VendorDocument } from '../../core/models/VendorDocument';
import { VendorDocumentLog, DocumentLogStatus } from '../../core/models/VendorDocumentLog';
import { VendorDocumentLogService } from '../../../api/core/services/VendorDocumentLogService';
import { VendorDocumentService } from '../../../api/core/services/VendorDocumentService';
import { DocumentService } from '../../../api/core/services/DocumentService';
import { VendorDocumentRequest } from './requests/VendorDocumentRequest';
import { UpdateVendorDocumentRequest } from './requests/UpdateVendorDocument';

@JsonController('/vendor-document')
export class VendorDocumentController {
    constructor(
        private vendorDocumentService: VendorDocumentService,
        private vendorService: VendorService,
        private vendorDocumentLogService: VendorDocumentLogService,
        private documentService: DocumentService
    ) {
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
    @Post()
    @Authorized('vendor-unapproved')
    public async createDocument(@Body({ validate: true }) documentParams: VendorDocumentRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const vendor = await this.vendorService.findOne({ where: { vendorId: documentParams.vendorId } });
        if (!vendor) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid seller Id',
            };
            return response.status(400).send(errorResponse);
        }
        const vendorDocument = await this.vendorDocumentService.findOne({ where: { documentId: documentParams.documentId, vendorId: vendor.vendorId }, relations: ['document'] });
        if (vendorDocument && vendorDocument?.document?.name !== 'Certificate') {
            return response.status(400).send({
                status: 0,
                message: 'Document type already uploaded',
            });
        }
         const newDocument = new VendorDocument();
        let saveDocument;
        if (!documentParams.certificate) {
            newDocument.vendorId = vendor.vendorId;
            newDocument.documentId = documentParams.documentId;
            newDocument.fileName = documentParams.fileName;
            newDocument.filePath = documentParams.filePath;
            newDocument.createdBy = vendor.vendorId;
            newDocument.isDelete = 0;
            newDocument.status = documentParams.status ?? 1;
            saveDocument = await this.vendorDocumentService.create(newDocument);
            const documentLog = new VendorDocumentLog();
            documentLog.vendorDocumentId = saveDocument.id;
            documentLog.status = DocumentLogStatus.Uploaded;
            await this.vendorDocumentLogService.create(documentLog);
        } else {
            newDocument.documentId = documentParams.documentId;
            newDocument.vendorId = vendor.vendorId;
            newDocument.fileName = documentParams.fileName;
            newDocument.filePath = documentParams.filePath;
            newDocument.status = documentParams.status ?? 1;
            newDocument.isDelete = 0;
            newDocument.additionalInfo = documentParams.certificate;
            await this.vendorDocumentService.create(newDocument);
        }
        return response.status(200).send({
            status: 1,
            message: 'Document Upload Successfully',
            data: saveDocument,
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
    @Get()
    @Authorized('vendor-unapproved')
    public async getDocumentDetails(
        @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('status') status: number, @QueryParam('certificate') certificate: number, @QueryParam('refrenceNo') refrenceNo: string,
        @QueryParam('keyword') keyword: string, @QueryParam('title') title: string, @QueryParam('fileName') fileName: string, @QueryParam('certificateName') certificateName: string, @QueryParam('vendorId') vendorId: number,
        @QueryParam('lastUpload') lastUpload: string, @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any, @QueryParam('validTo') validTo: string, @QueryParam('validFrom') validFrom: string
    ): Promise<any> {

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
        WhereConditions.push(
            {
                name: 'vendorDocument.isDelete',
                op: 'and',
                value: 0,
            },
            {
                name: 'vendorDocument.vendorId',
                op: 'and',
                value: vendorId,
            }
        );

        const relations = [
            {
                tableName: 'vendorDocument.document',
                aliasName: 'document',
                op: 'left',
            },
        ];
        if (status === 0 || status === 1) {
            WhereConditions.push(
                {
                    name: 'vendorDocument.status',
                    op: 'and',
                    value: status,
                }
            );
        }
        if (certificate) {
            WhereConditions.push(
                {
                    name: 'document.name',
                    op: 'IN',
                    // sign: 'IN',
                    value: '"Certificate"',
                }
            );
        }
        const documentList = await this.vendorDocumentService.listByQueryBuilder(limit, offset, select, WhereConditions, search, relations, [], [], false, false);
        const certificateValue = [];
        if (certificate) {
            if (keyword || certificateName || refrenceNo || validTo || validFrom) {
                documentList.map((documents) => {
                    if (keyword) {
                        if (documents.additionalInfo?.name.toLowerCase().includes(keyword.toLowerCase()) || documents.additionalInfo?.refrenceNo.toLowerCase().includes(keyword.toLowerCase()) || documents.additionalInfo?.certificationType.toLowerCase().includes(keyword.toLowerCase())) {
                            certificateValue.push(documents);
                        }
                    }
                    if (certificateName) {
                        if (documents.additionalInfo?.name.toLowerCase().includes(certificateName.toLowerCase())) {
                            certificateValue.push(documents);
                        }
                    }
                    if (refrenceNo) {
                        if (documents.additionalInfo?.refrenceNo.toLowerCase().includes(refrenceNo.toLowerCase())) {
                            certificateValue.push(documents);
                        }
                    }
                    if (validTo) {
                        if (documents.additionalInfo?.validTo === validTo) {
                            certificateValue.push(documents);
                        }
                    }
                    if (validFrom) {
                        if (documents.additionalInfo?.validFrom.toLowerCase().includes(validFrom.toLowerCase())) {
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
    @Delete('/:id')
    @Authorized('vendor-unapproved')
    public async deleteDocuments(@Param('id') documentId: number, @Res() response: any): Promise<any> {

        const document = await this.vendorDocumentService.findOne({ where: { id: documentId, isDelete: 0 } });
        if (!document) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid Document Id',
            });
        }
        await this.vendorDocumentService.softDelete(documentId);

        const documentLog = new VendorDocumentLog();
        documentLog.vendorDocumentId = document.id;
        documentLog.status = DocumentLogStatus.Deleted;
        await this.vendorDocumentLogService.create(documentLog);

        return response.status(200).send({
            status: 1,
            message: 'Document deleted successfully',
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
    @Get('/document')
    @Authorized('vendor-unapproved')
    public async getMasterDocuments(@Res() response: any): Promise<any> {
        const documentList = await this.documentService.find({});
        return response.status(200).send({
            status: 1,
            message: 'Successfully got documents  list',
            data: documentList,
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
    @Get('/:id')
    @Authorized('vendor-unapproved')
    public async VendorDocument(@Param('id') id: number, @Res() response: any): Promise<any> {
        const documentData = await this.vendorDocumentService.findOne({ where: { id, isDelete: 0 }, relations: ['document', 'vendorDocumentLog'] });
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
    @Put('/:id')
    @Authorized('vendor-unapproved')
    public async UpdateDocument(@Param('id') id: number, @Body({ validate: true }) param: UpdateVendorDocumentRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const documentData = await this.vendorDocumentService.findOne({ where: { id, isDelete: 0 } });
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
        const updateData = await this.vendorDocumentService.create(documentData);
        return response.status(200).send({
            status: 1,
            message: 'Successfully update document',
            data: updateData,
        });
    }
}
