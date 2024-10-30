/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, Put, Delete, Param, QueryParam, Post, Body, JsonController, Authorized, Req, Res } from 'routing-controllers';
import { Language } from '../../core/models/Language';
import { CreateLanguage } from './requests/CreateLanguageRequest';
import { LanguageService } from '../../core/services/LanguageService';
import { env } from '../../../env';
import { S3Service } from '../../core/services/S3Service';
import { ImageService } from '../../core/services/ImageService';
import { Not } from 'typeorm';

@JsonController('/language')
export class LanguageController {
    constructor(
        private languageService: LanguageService,
        private imageService: ImageService,
        private s3Service: S3Service
        // private settingService: SettingService
    ) {
        // --
    }

    // Create Language API
    /**
     * @api {post} /api/language Add Language API
     * @apiGroup Language
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..32}} name Language name
     * @apiParam (Request body) {String{..5}} code Language code
     * @apiParam (Request body) {String} [image] Language image
     * @apiParam (Request body) {Number{..9999}} [sortOrder] Language sortOrder
     * @apiParam (Request body) {Number} status Language status
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "code" : "",
     *      "image" : "",
     *      "sortOrder" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new Language.",
     *      "status": "1",
     *      "data": {
     *              "name": "Russian",
     *              "code": "Rus",
     *              "sortOrder": 4,
     *              "isActive": "0",
     *              "createdDate": "2024-07-20 05:58:47",
     *              "languageId": 71
     *              }
     * }
     * @apiSampleRequest /api/language
     * @apiErrorExample {json} Language error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    // @Authorized(['admin', 'create-language'])
    public async addLanguage(@Body({ validate: true }) languageParam: CreateLanguage, @Res() response: any): Promise<any> {
        const mime = require('mime');
        const image = languageParam.image;
        const existLanguage = await this.languageService.findOne({ where: { name: languageParam.name, code: languageParam.code } });
        if (existLanguage) {
            const errorResponse: any = {
                status: 0,
                message: 'Language name already exists',
            };
            return response.status(400).send(errorResponse);
        }
        const languageName = await this.languageService.find({ select: ['name'] });
        for (const language of languageName) {
            if (languageParam.name.toLowerCase() === language.name.toLowerCase()) {
                const errorResponse = {
                    status: 0,
                    message: 'Language name already exists',
                };
                return response.status(400).send(errorResponse);
            }
        }
        const sortCheck = await this.languageService.findOne({ where: { sortOrder: languageParam.sortOrder } });
        if (sortCheck) {
            const errorResponse = {
                status: 0,
                message: 'Duplicate Sort Order Not Allowed',
            };
            return response.status(400).send(errorResponse);
        }
        const newLanguage = new Language();
        if (image) {
            const mimeType = this.base64MimeType(image);
            const fileType = mime.getExtension(mimeType);

            const availableTypes = env.availImageTypes.split(',');
            if (!availableTypes.includes(fileType)) {
                const errorTypeResponse: any = {
                    status: 0,
                    message: 'Only ' + env.availImageTypes + ' types are allowed',
                };
                return response.status(400).send(errorTypeResponse);
            }
            const name = 'Img_' + Date.now() + '.' + fileType;
            const path = 'language/';

            const base64Only = image.split(',')[1];

            const base64Data = Buffer.from(base64Only, 'base64');

            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((path + name), base64Data, mimeType);
            } else {
                await this.imageService.imageUpload((path + name), base64Data);
            }

            newLanguage.image = name;
            newLanguage.imagePath = path;
        }
        newLanguage.name = languageParam.name;
        newLanguage.code = languageParam.code;
        newLanguage.sortOrder = languageParam.sortOrder;
        newLanguage.isActive = languageParam.status;
        const languageSave = await this.languageService.create(newLanguage);
        if (languageSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully added a new language',
                data: languageSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create this language',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Language List API
    /**
     * @api {get} /api/language/languageList Language List API
     * @apiGroup Language
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status inactive-> 0, active-> 1
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get language list",
     *      "data": [{
     *                "languageId": 57,
     *                "name": "English",
     *                "code": "en",
     *                "image": "Img_1622893818038.png",
     *                "imagePath": "language/",
     *                "sortOrder": 1,
     *                "isActive": 1
     *              }],
     * }
     * @apiSampleRequest /api/language
     * @apiErrorExample {json} Language error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized()
    public async languageList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('defaultLanguage') defaultLanguage: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = [];
        const relation = [];
        const searchConditions = [];
        if (keyword?.trim()) {
            searchConditions.push({
                name: ['Language.name', 'Language.code'],
                value: keyword,
            });
        }

        const WhereConditions = [];
        if (status) {
            WhereConditions.push({
                op: 'where',
                name: 'Language.isActive',
                value: status,
            });
        }
        if (defaultLanguage) {
            WhereConditions.push(
                {
                    name: 'Language.languageId',
                    value: Not(defaultLanguage),
                }
            );
        }
        if (count) {
            const languageCount = await this.languageService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relation, [], [], true, false);
            const successResponse: any = {
                status: 1,
                message: 'Successfully got all Language Count',
                data: languageCount,
            };
            return response.status(200).send(successResponse);
        }
        const languageList = await this.languageService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relation, [], [], false, false);
        if (languageList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got all language List',
                data: languageList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'Unable to got language List',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Update Language API
    /**
     * @api {put} /api/language/:id Update Language API
     * @apiGroup Language
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..32}} name Language name
     * @apiParam (Request body) {String{..5}} code Language code
     * @apiParam (Request body) {String} [image] Language image
     * @apiParam (Request body) {Number{..9999}} [sortOrder] Language sortOrder
     * @apiParam (Request body) {Number} status Language status
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "code" : "",
     *      "image" : "",
     *      "sortOrder" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated the language.",
     *      "status": "1",
     *      "data": {
     *              "createdBy": null,
     *              "createdDate": "2024-07-17T05:25:48.000Z",
     *              "modifiedBy": null,
     *              "modifiedDate": "2024-07-20 06:01:25",
     *              "languageId": 66,
     *              "name": "Chinese",
     *              "code": "zh",
     *              "image": "Img_1721284099023.png",
     *              "imagePath": "language/",
     *              "locale": null,
     *              "sortOrder": 5,
     *              "isActive": "1"
     *              }
     * }
     * @apiSampleRequest /api/language/:id
     * @apiErrorExample {json} language error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    @Authorized(['admin', 'edit-language'])
    public async updateLanguage(@Param('id') id: number, @Body({ validate: true }) languageParam: CreateLanguage, @Res() response: any): Promise<any> {
        const mime = require('mime');
        const language = await this.languageService.findOne({
            where: {
                languageId: id,
            },
        });
        if (!language) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid language Id',
            };
            return response.status(400).send(errorResponse);
        }
        const existLanguage = await this.languageService.findOne({ where: { name: languageParam.name, code: languageParam.code, languageId: Not(language.languageId) } });
        if (existLanguage) {
            const errorResponse: any = {
                status: 0,
                message: 'Language name already exists',
            };
            return response.status(400).send(errorResponse);
        }
        const languageName = await this.languageService.find({ select: ['name'], where: { languageId: Not(language.languageId) } });
        for (const languages of languageName) {
            if (languageParam.name.toLowerCase() === languages.name.toLowerCase()) {
                const errorResponse = {
                    status: 0,
                    message: 'Language name already exists',
                };
                return response.status(400).send(errorResponse);
            }
        }
        const sortCheck = await this.languageService.findOne({ where: { sortOrder: languageParam.sortOrder, languageId: Not(id) } });
        if (sortCheck) {
            const errorResponse = {
                status: 0,
                message: 'Duplicate Sort Order Not Allowed',
            };
            return response.status(400).send(errorResponse);
        }
        const image = languageParam.image;
        if (image) {
            const mimeType = this.base64MimeType(image);
            const fileType = mime.getExtension(mimeType);

            const availableTypes = env.availImageTypes.split(',');
            if (!availableTypes.includes(fileType)) {
                const errorTypeResponse: any = {
                    status: 0,
                    message: 'Only ' + env.availImageTypes + ' types are allowed',
                };
                return response.status(400).send(errorTypeResponse);
            }
            const name = 'Img_' + Date.now() + '.' + fileType;
            const path = 'language/';

            const base64Only = image.split(',')[1];

            const base64Data = Buffer.from(base64Only, 'base64');

            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((path + name), base64Data, mimeType);
            } else {
                await this.imageService.imageUpload((path + name), base64Data);
            }

            language.image = name;
            language.imagePath = path;
        }
        language.name = languageParam.name;
        language.code = languageParam.code;
        language.sortOrder = languageParam.sortOrder;
        language.isActive = languageParam.status;
        const languageSave = await this.languageService.create(language);
        if (languageSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the language',
                data: languageSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the language',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete Language API
    /**
     * @api {delete} /api/language/:id Delete Language API
     * @apiGroup Language
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "languageId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted language.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/language/:id
     * @apiErrorExample {json} Language error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized(['admin', 'delete-language'])
    public async deleteLanguage(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const language = await this.languageService.findOne({
            where: {
                languageId: id,
            },
        });
        if (!language) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid language Id',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteLanguage = await this.languageService.delete(language);
        if (deleteLanguage) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the language',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the language',
            };
            return response.status(400).send(errorResponse);
        }
    }

    public base64MimeType(encoded: string): string {
        let result = undefined;

        if (typeof encoded !== 'string') {
            return result;
        }

        const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

        if (mime && mime.length) {
            result = mime[1];
        }

        return result;
    }
}
