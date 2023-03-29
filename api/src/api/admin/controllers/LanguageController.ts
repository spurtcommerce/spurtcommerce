/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
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
    constructor(private languageService: LanguageService, private imageService: ImageService,
                private s3Service: S3Service) {
    }

    // Create Language API
    /**
     * @api {post} /api/language/add-language Add Language API
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
     *      "status": "1"
     * }
     * @apiSampleRequest /api/language/add-language
     * @apiErrorExample {json} Language error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-language')
    @Authorized(['admin', 'create-language'])
    public async addLanguage(@Body({ validate: true }) languageParam: CreateLanguage, @Res() response: any): Promise<any> {
        const image = languageParam.image;
        const existLanguage = await this.languageService.findOne({ where: {name: languageParam.name, code: languageParam.code}});
        if (existLanguage) {
            const errorResponse: any = {
                status: 0,
                message: 'You have already added this language.',
            };
            return response.status(400).send(errorResponse);
        }
        const newLanguage = new Language();
        if (image) {
            const type = image.split(';')[0].split('/')[1];
            const availableTypes = env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse: any = {
                        status: 0,
                        message: 'Only ' + env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
            const name = 'Img_' + Date.now() + '.' + type;
            const path = 'language/';
            const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const stringLength = image.replace(/^data:image\/\w+;base64,/, '').length;
            const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
            const sizeInKb = sizeInBytes / 1024;
            if (+sizeInKb <= 2048) {
                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((path + name), base64Data, type);
                } else {
                    await this.imageService.imageUpload((path + name), base64Data);
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Not able to upload as the file size is too large.',
                };
                return response.status(400).send(errorResponse);
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
                message: 'Successfully added a new language.',
                data: languageSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create this language.',
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
     *      "message": "Successfully get language list",
     *      "data":{
     *      "languageId"
     *      "name"
     *      "code"
     *      "sortOrder"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/language/languagelist
     * @apiErrorExample {json} Language error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/languagelist')
    @Authorized()
    public async languageList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['languageId', 'name', 'code', 'image', 'imagePath', 'sortOrder', 'isActive'];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            },
            {
                name: 'isActive',
                op: 'like',
                value: status,
            },
        ];
        const WhereConditions = [];
        const languageList = await this.languageService.list(limit, offset, select, search, WhereConditions, count);
        if (languageList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got the complete language list.',
                data: languageList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to list language',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Update Language API
    /**
     * @api {put} /api/language/update-language/:id Update Language API
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
     *      "message": "Successfully updated language.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/language/update-language/:id
     * @apiErrorExample {json} language error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-language/:id')
    @Authorized(['admin', 'edit-language'])
    public async updateLanguage(@Param('id') id: number, @Body({ validate: true }) languageParam: CreateLanguage, @Res() response: any): Promise<any> {
        const language = await this.languageService.findOne({
            where: {
                languageId: id,
            },
        });
        if (!language) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid language Id.',
            };
            return response.status(400).send(errorResponse);
        }
        const existLanguage = await this.languageService.findOne({ where: {name: languageParam.name, code: languageParam.code, languageId: Not(language.languageId) }});
        if (existLanguage) {
            const errorResponse: any = {
                status: 0,
                message: 'You have already added this language.',
            };
            return response.status(400).send(errorResponse);
        }
        const image = languageParam.image;
        if (image) {
            const type = image.split(';')[0].split('/')[1];
            const availableTypes = env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse: any = {
                        status: 0,
                        message: 'Only ' + env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
            const name = 'Img_' + Date.now() + '.' + type;
            const path = 'language/';
            const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const stringLength = image.replace(/^data:image\/\w+;base64,/, '').length;
            const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
            const sizeInKb = sizeInBytes / 1024;
            if (+sizeInKb <= 2048) {
                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((path + name), base64Data, type);
                } else {
                    await this.imageService.imageUpload((path + name), base64Data);
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Not able to upload as the file size is too large.',
                };
                return response.status(400).send(errorResponse);
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
                message: 'Successfully updated the language.',
                data: languageSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the language.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete Language API
    /**
     * @api {delete} /api/language/delete-language/:id Delete Language API
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
     * @apiSampleRequest /api/language/delete-language/:id
     * @apiErrorExample {json} Language error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-language/:id')
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
                message: 'Invalid language Id.',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteLanguage = await this.languageService.delete(language);
        if (deleteLanguage) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the language. ',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the language.',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
