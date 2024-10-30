/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, Post, Body, Param, JsonController, Req, Res, Authorized, QueryParam } from 'routing-controllers';
import { CreatePageTranslationDTO } from './requests/CreatePageTranslationRequest';
import { PageService } from '../../core/services/PageService';
import { PageTranslationService } from '../../core/services/PageTranslationService';
import { PageTranslation } from '../../core/models/PageTranslation';
import { FindManyOptions, Like } from 'typeorm';
import { Page } from '../../core/models/Page';

@JsonController('/page-translation')
export class AdminPageTranslationController {
    constructor(
        private pageService: PageService,
        private pageTranslationService: PageTranslationService
    ) {
    }

    // Create Page Translation
    /**
     * @api {post} /api/page-translation/page/:id Add Page Translation API
     * @apiGroup Page-Translation
     * @apiParam (Request body) {Number} languageId language id
     * @apiParam (Request body) {String{..255}} title title
     * @apiParam (Request body) {String} content content
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "pageTranslation": [
     *         {
     *               "languageId" : "",
     *               "title" : "",
     *               "content" : ""
     *         }
     *      ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New page translation is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-translation/page/:id
     * @apiErrorExample {json} Add Page Translation Error
     * HTTP/1.1 500 Internal Server Error
     */

    @Post('/page/:id')
    @Authorized(['admin'])
    public async createPageTranslation(@Body({ validate: true }) payload: CreatePageTranslationDTO, @Param('id') pageId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const getPage = await this.pageService.findOne(pageId);

        if (!getPage) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid page id',
            };
            return response.status(400).send(errorResponse);
        }
        for (const data of payload.pageTranslation) {
            const getPageTranslation = await this.pageTranslationService.findOne({
                where: {
                    pageId: `${pageId}`,
                    languageId: data.languageId,
                },
            });
            const newPageTranslation = new PageTranslation();

            if (getPageTranslation) {

                newPageTranslation.id = getPageTranslation.id;
            }
            newPageTranslation.pageId = pageId;
            newPageTranslation.languageId = data.languageId;
            newPageTranslation.title = data.title;
            newPageTranslation.content = data.content;
            await this.pageTranslationService.create(newPageTranslation);
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully created new page translation',
        };
        return response.status(200).send(successResponse);

    }

    // Page Translation List
    /**
     * @api {get} /api/page-translation/page Page Translation List API
     * @apiGroup Page-Translation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got page translation list",
     *      "data": " [{
     *                 "createdBy": null,
     *                 "createdDate": "2024-05-22T06:12:12.000Z",
     *                 "modifiedBy": null,
     *                 "modifiedDate": "2024-05-24T06:04:59.000Z",
     *                 "pageId": 67,
     *                 "title": "Subscribe Sell Trade ",
     *                 "intro": null,
     *                 "content": "&lt;p&gt;Subscribe Sell Trade&amp;nbsp;&lt;/p&gt;\n",
     *                 "pageGroupId": 11,
     *                 "sortOrder": null,
     *                 "slugName": "subscribe-sell-trade",
     *                 "viewPageCount": null,
     *                 "isActive": 1,
     *                 "pageTranslation": [],
     *                 "lastModifieDate": null
     *                }]"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-translation/page
     * @apiErrorExample {json} Page List Error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/page')
    @Authorized(['admin'])
    public async PageTranslationList(@Res() response: any, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number): Promise<any> {

        const condition: FindManyOptions<Page> = {};

        condition.relations = ['pageTranslation'];

        if (keyword?.trim()) {
            condition.where = {
                title: Like(`%${keyword}%`),
            };
        }

        if (limit) {
            condition.take = limit;
            if (offset) {
                condition.skip = offset;
            }
        }
        condition.order = { createdDate: 'DESC' };
        const getPageTranslation = await this.pageService.findAll(condition);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got page translation list',
            data: count ? getPageTranslation.length : getPageTranslation.map((page: any) => {
                page.lastModifieDate = new Date(Math.max(...page.pageTranslation.map(e => new Date(e.modifiedDate))));
                return page;
            }),
        };
        return response.status(200).send(successResponse);
    }

    // Page Translation Detail
    /**
     * @api {get} /api/page-translation/page/:id Page Translation Detail API
     * @apiGroup Page-Translation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got page translation detail",
     *      "data": "{
     *               "createdBy": "",
     *               "createdDate": "",
     *               "modifiedBy": "",
     *               "modifiedDate": "",
     *               "pageId": "",
     *               "title": "",
     *               "intro": "",
     *               "content": "",
     *               "pageGroupId": "",
     *               "sortOrder": "",
     *               "slugName": "",
     *               "viewPageCount": "",
     *               "isActive": "",
     *               "pageTranslation": []
     *              }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page
     * @apiErrorExample {json} page Translation Detail error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/page/:id')
    @Authorized(['admin'])
    public async PageDetail(@Param('id') PageId: number, @Res() response: any): Promise<any> {
        const getPageTranslation = await this.pageService.findOne({
            where: {
                pageId: PageId,
            },
            relations: ['pageTranslation'],
        });
        if (!getPageTranslation) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid page id',
            };
            return response.status(400).send(errorResponse);
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully got page translation detail',
            data: getPageTranslation,
        };
        return response.status(200).send(successResponse);
    }

}
