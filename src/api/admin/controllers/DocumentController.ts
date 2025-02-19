import { Body, Delete, Get, JsonController, Param, Post, Res, QueryParam, Authorized } from 'routing-controllers';
import { DocumentService } from '../../../../src/api/core/services/DocumentService';
import { Document } from '../../core/models/Document';
import { CreateDocumentRequest } from './requests/CreateDocumentRequest';

@JsonController('/document')
export class AdminDocumentController {
    constructor(
        private documentService: DocumentService
    ) {
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
    @Get()
    @Authorized()
    public async getDocumentList(
        @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('status') status: number,
        @QueryParam('keyword') keyword: string, @QueryParam('title') title: string, @QueryParam('count') count: number,  @Res() response: any): Promise<any> {

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
            WhereConditions.push(
                {
                    name: 'document.isActive',
                    op: 'and',
                    value: status,
                }
            );
        }

        const documentList = await this.documentService.listByQueryBuilder(limit, offset, select, WhereConditions, search, relations, [], [], false, false);

        return response.status(200).send({
            status: 1,
            message: `Successfully Got Document List`,
            data: count ? documentList.length : documentList,
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
    @Get('/:id')
    @Authorized()
    public async getDocumentDetail(@Res() response: any, @Param('id') id: number): Promise<any> {

        const document = await this.documentService.findOne({ where: { id } });

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
    @Post()
    @Authorized()
    public async createDocument(@Res() response: any, @Body({ validate: true }) payload: CreateDocumentRequest): Promise<any> {

        const document = new Document();

        if (payload.id) {

            const documentExist = await this.documentService.findOne({ where: { id: payload.id } });

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

        const documentSave = await this.documentService.save(document);

        return response.status(200).send({
            status: 1,
            message: `Successfully Saved Document`,
            data: documentSave,
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
    @Delete('/:id')
    @Authorized()
    public async deleteDocument(@Res() response: any, @Param('id') id: number): Promise<any> {

        const document = await this.documentService.delete({ id });

        return response.status(200).send({
            status: 1,
            message: `Successfully Delete Document`,
            data: document,
        });

    }
}
