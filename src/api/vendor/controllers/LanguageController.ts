/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, QueryParam, JsonController, Authorized, Req, Res, Post, Body } from 'routing-controllers';
import { In, Not } from 'typeorm';
import { VendorLanguageService } from '../../core/services/VendorLanguageService';
import { Service } from 'typedi';
import { VendorLanguage } from '../../core/models/VendorLanguage';
import { VendorSettingsService } from '../../core/services/VendorSettingsService';
// import { VendorService } from '../../core/services/VendorService';

@Service()
@JsonController('/vendor-language')
export class VendorLanguageController {
    constructor(
        private vendorLanguageService: VendorLanguageService,
        private vendorSettingsService: VendorSettingsService
        // private vendorService: VendorService
    ) {
        // --
    }

    /**
     * @api {get} /api/vendor-language Vendor Language List
     * @apiGroup Language
     * @apiName VendorLanguageList
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiQuery {Number} [limit]            Number of records to return
     * @apiQuery {Number} [offset]           Pagination offset
     * @apiQuery {String} [keyword]          Search keyword
     * @apiQuery {String} [status]           Filter by status
     * @apiQuery {String} [defaultLanguage]  Filter default language (1 or 0)
     * @apiQuery {Number|Boolean} [count]    If true/1, returns total count
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got vendor language list",
     *         "data": [
     *             {
     *                 "languageId": 1,
     *                 "name": "English",
     *                 "code": "en",
     *                 "isActive": 1
     *             }
     *         ]
     *     }
     *
     * @apiSampleRequest /api/vendor-language
     */
    @Get()
    @Authorized(['vendor', 'list-setting-localization'])
    public async languageList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('defaultLanguage') defaultLanguage: string, @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {
        const select = ['VendorLanguage.id', 'VendorLanguage.isActive', 'VendorLanguage.isDelete', 'language.name', 'language.languageId', 'language.code', 'language.image', 'language.imagePath'];
        const relation = [
            {
                tableName: 'VendorLanguage.language',
                aliasName: 'language',
                op: 'left',
            },
        ];
        const searchConditions = [];
        if (keyword?.trim()) {
            searchConditions.push({
                name: ['language.name', 'language.code'],
                value: keyword,
            });
        }

        const whereConditions: any = [
            {
                op: 'where',
                name: 'VendorLanguage.tenantId',
                value: request.user.tenantId,
            },
            {
                op: 'and',
                name: 'VendorLanguage.isDelete',
                value: 0,
            },
        ];
        if (status && status !== '') {
            whereConditions.push({
                op: 'and',
                name: 'VendorLanguage.isActive',
                value: status,
            });
        }
        if (defaultLanguage) {
            whereConditions.push(
                {
                    name: 'VendorLanguage.languageId',
                    op: 'and',
                    value: Not(defaultLanguage),
                }
            );
        }
        if (count) {
            const languageCount = await this.vendorLanguageService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relation, [], [], true, false);
            const successResponse: any = {
                status: 1,
                message: 'Successfully got all vendor language count.',
                data: languageCount,
            };
            return response.status(200).send(successResponse);
        }
        const languageList = await this.vendorLanguageService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relation, [], [], false, false);
        if (languageList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got all vendor language list.',
                data: languageList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'Unable to got vendor language list.',
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

    /**
     * @api {post} /api/vendor-language Map Vendor Languages
     * @apiGroup Language
     * @apiName MapVendorLanguage
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiBody {String} languageIds         Comma-separated language IDs
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully updated vendor languages."
     *     }
     *
     * @apiErrorExample {json} Invalid-Languages:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid vendor languages."
     *     }
     *
     * @apiSampleRequest /api/vendor-language
     */
    @Post()
    @Authorized(['vendor', 'list-setting-localization'])
    public async mapVendorLanguage(@Body({ validate: true }) languageParam: { languageIds: string, deleteVendorLanguageIds: string }, @Req() request: any, @Res() response: any): Promise<any> {
        const languageIds: string[] = languageParam.languageIds.split(',');
        if (languageParam.languageIds !== '') {
            const existingMappings = await this.vendorLanguageService.find({
                where: {
                    tenantId: request.user.tenantId,
                    languageId: In(languageIds),
                },
            });
            const existingIds = existingMappings.map(language => language.languageId);

            const newIds = languageIds.map(Number).filter(id => !existingIds.includes(id));

            if (newIds.length) {
                const vendorLanguages = newIds.map(langId => {
                    const vendorLanguage = new VendorLanguage();
                    vendorLanguage.languageId = +langId;
                    vendorLanguage.tenantId = request.user.tenantId;
                    return vendorLanguage;
                });
                await this.vendorLanguageService.create(vendorLanguages);
            }
        }

        const vendorLanguageIds: any = languageParam.deleteVendorLanguageIds.split(',');

        if (languageParam.deleteVendorLanguageIds !== '') {
            const checkLanguageExist = await this.vendorLanguageService.find({ where: { id: In(vendorLanguageIds), tenantId: request.user.tenantId } });

            if (checkLanguageExist.length !== vendorLanguageIds.length) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid vendor languages.',
                });
            }
            const vendorSettings = await this.vendorSettingsService.findOne({ where: { vendorId: request.user.tenantId } });
            if (vendorLanguageIds.includes(vendorSettings.storeLanguageId)) {
                return response.status(400).send({
                    status: 0,
                    message: 'You cannot remove the default language.',
                });
            }
            await this.vendorLanguageService.delete(vendorLanguageIds);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully updated vendor language.',
        };
        return response.status(200).send(successResponse);
    }

}
