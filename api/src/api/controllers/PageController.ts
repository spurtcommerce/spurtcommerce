/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, Put, Delete, Param, QueryParam, Post, Body, JsonController, Authorized, Res, Req} from 'routing-controllers';
import {Page} from '../models/Page';
import {CreatePage} from './requests/CreatePageRequest';
import {PageService} from '../services/PageService';
import {UpdatePage} from './requests/UpdatePageRequest';
import {DeletePageRequest} from './requests/DeletePageRequest';

@JsonController('/page')
export class PageController {
    constructor(private pageService: PageService) {
    }

    // Create Page API
    /**
     * @api {post} /api/page/add-page Add Page API
     * @apiGroup Page
     * @apiParam (Request body) {String} title title
     * @apiParam (Request body) {String} content content
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} metaTagContent metaTagContent
     * @apiParam (Request body) {String} metaTagKeyword metaTagKeyword
     * @apiParam (Request body) {Number} active active
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "content" : "",
     *      "metaTagTitle" : "",
     *      "metaTagContent" : "",
     *      "metaTagKeyword" : "",
     *      "active" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New page is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page/add-page
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-page')
    @Authorized()
    public async createPage(@Body({validate: true}) pageParam: CreatePage, @Res() response: any): Promise<any> {

        const page = new Page();
        page.title = pageParam.title;
        page.content = pageParam.content;
        page.isActive = pageParam.active;
        page.metaTagTitle = pageParam.metaTagTitle;
        page.metaTagContent = pageParam.metaTagContent;
        page.metaTagKeyword = pageParam.metaTagKeyword;

        const pageSave = await this.pageService.create(page);
        if (pageSave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created a new page.',
                data: pageSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to create page',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Page List API
    /**
     * @api {get} /api/page/pagelist Page List API
     * @apiGroup Page
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get page list",
     *      "data":{
     *      "pageId" : "",
     *      "title" : "",
     *      "content" : "",
     *      "active" : "",
     *      "metaTagTitle" : "",
     *      "metaTagContent" : "",
     *      "metaTagKeyword" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page/pagelist
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/pagelist')
    @Authorized()
    public async pageList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status')status: number, @QueryParam('count')count: number|boolean, @Res() response: any): Promise<any> {
        const select = ['pageId', 'title', 'content', 'isActive', 'metaTagTitle', 'metaTagContent', 'metaTagKeyword'];
        const search = [
            {
                name    : 'title',
                op      : 'like',
                value   : keyword,
            }, {
                name: 'isActive',
                op: 'like',
                value: status,
            },
        ];
        const WhereConditions = [];
        const pageList = await this.pageService.list(limit, offset , select, search, WhereConditions, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got pages count',
                data: pageList,
            };
            return response.status(200).send(successRes);
        }
            const successResponse: any = {
                status: 1,
                message: 'Successfully got the complete list of pages. ',
                data: pageList,
            };
            return response.status(200).send(successResponse);
        }

    // Update Page API
    /**
     * @api {put} /api/page/update-page/:id Update Page API
     * @apiGroup Page
     * @apiParam (Request body) {Number} pageId pageId
     * @apiParam (Request body) {String} title title
     * @apiParam (Request body) {String} content content
     * @apiParam (Request body) {Number} active active
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} metaTagContent metaTagContent
     * @apiParam (Request body) {String} metaTagKeyword metaTagKeyword
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "pageId" : "",
     *      "title" : "",
     *      "content" : "",
     *      "active" : "",
     *      "metaTagTitle" : "",
     *      "metaTagContent" : "",
     *      "metaTagKeyword" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " Page is updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page/update-page/:id
     * @apiErrorExample {json} updatePage error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-page/:id')
    @Authorized()
    public async updatePage( @Body({ validate: true }) pageParam: UpdatePage, @Res() response: any): Promise<any> {
        console.log(pageParam);
        const page = await this.pageService.findOne({
            where: {
                pageId: pageParam.pageId,
            },
        });
        if (!page) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid page id',
            };
            return response.status(400).send(errorResponse);
        }

        page.title = pageParam.title;
        page.content = pageParam.content;
        page.isActive = pageParam.active;
        page.metaTagTitle = pageParam.metaTagTitle;
        page.metaTagContent = pageParam.metaTagContent;
        page.metaTagKeyword = pageParam.metaTagKeyword;
        const pageSave = await this.pageService.create(page);
        if (pageSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the page.',
                data: pageSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update page',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Delete Page API
    /**
     * @api {delete} /api/page/delete-page/:id Delete Page API
     * @apiGroup Page
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "pageId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted page.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page/delete-page/:id
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-page/:id')
    @Authorized()
    public async deletePage(@Param('id')id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const page = await this.pageService.findOne({
            where: {
                pageId: id,
            },
        });
        if (!page) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid pageId',
            };
            return response.status(400).send(errorResponse);
        }
        const deletePage = await this.pageService.delete(page);
        if (deletePage) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the page.',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete page',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete Multiple Page API
    /**
     * @api {post} /api/page/delete-page Delete Multiple Page API
     * @apiGroup Page
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} pageId  pageId
     * @apiParamExample {json} Input
     * {
     * "pageId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Page.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/page/delete-page
     * @apiErrorExample {json} pageDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/delete-page')
    @Authorized()
    public async deleteMultiplePage(@Body({validate: true}) pageDelete: DeletePageRequest , @Res() response: any, @Req() request: any): Promise<any> {

        const pageIdNo = pageDelete.pageId.toString();
        const pageid = pageIdNo.split(',');
        for ( const id of pageid ) {
            const dataId = await this.pageService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please choose pages for delete',
                };
                return response.status(400).send(errorResponse);
            } else {
                const deletePageId = parseInt(id, 10);
                await this.pageService.delete(deletePageId);
            }
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully deleted page',
        };
        return response.status(200).send(successResponse);
    }
}
