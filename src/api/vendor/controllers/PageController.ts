/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, Put, Delete, Param, QueryParam, Post, Body, JsonController, Authorized, Res, Req } from 'routing-controllers';
import { Page } from '../../core/models/Page';
import { CreatePage } from './requests/CreatePageRequest';
import { PageService } from '../../core/services/PageService';
import { UpdatePage } from './requests/UpdatePageRequest';
import { PageGroupService } from '../../core/services/PageGroupService';
import { Service } from 'typedi';

@Service()
@JsonController('/page')
export class PageController {
    constructor(private pageService: PageService, private pageGroupService: PageGroupService) {
    }

    // Create Page API
    /**
     * @api {post} /api/page Add Page API
     * @apiGroup Page
     * @apiParam (Request body) {String{..255}} title title
     * @apiParam (Request body) {String} content content
     * @apiParam (Request body) {String} pageGroupId pageGroupId
     * @apiParam (Request body) {String} [pageSlug] pageSlug
     * @apiParam (Request body) {Number} active active
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "content" : "",
     *      "pageGroupId" : "",
     *      "pageSlug" : "",
     *      "active" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New page is created successfully",
     *      "status": "1"
     *      "data": {
     *                  "title": "",
     *                  "content": "",
     *                  "isActive": 1,
     *                  "pageGroupId": 1,
     *                  "slugName": "",
     *                  "createdDate": "",
     *                  "pageId": 1
     *               }
     * }
     * @apiSampleRequest /api/page
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized(['vendor', 'create-pages'])
    public async createPage(@Body({ validate: true }) pageParam: CreatePage, @Res() response: any, @Req() request: any): Promise<any> {
        const page = new Page();
        page.title = pageParam.title;
        page.content = pageParam.content ?? '';
        page.isActive = pageParam.active;
        page.pageGroupId = pageParam.pageGroupId;
        page.tenantId = request.user.tenantId;
        const metaTagTitle = pageParam.pageSlug ? pageParam.pageSlug : pageParam.title;
        const slug = metaTagTitle.trim();
        const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        page.slugName = await this.validate_slug(data);
        const pageSave = await this.pageService.create(page);
        if (pageSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created a new page',
                data: pageSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create page',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Page List API
    /**
     * @api {get} /api/page Page List API
     * @apiGroup Page
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get page list",
     *      "data": [
     *                  {
     *                     "pageId": 57,
     *                     "title": "About us",
     *                     "content": "",
     *                     "pageGroupId": 4,
     *                     "slugName": "about-us1",
     *                     "isActive": 1,
     *                     "pageGroupName": "Policy"
     *                   }
     *              ]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized(['vendor', 'list-pages'])
    public async pageList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {
        const search = [
            {
                name: 'title',
                op: 'like',
                value: keyword,
            }, {
                name: 'isActive',
                op: 'like',
                value: status,
            },
        ];
        const whereConditions = [
            {
                name: 'tenantId',
                value: request.user.tenantId,
            },
        ];
        const pageList = await this.pageService.list(limit, offset, [], [], search, whereConditions, count);
        if (count) {
            return response.status(200).send({
                status: 1,
                message: 'Successfully got pages count.',
                data: pageList,
            });
        }
        const promise = pageList.map(async (result: any) => {
            const data: any = await this.pageGroupService.findOne({ where: { groupId: result.pageGroupId } });
            const temp: any = result;
            if (data) {
                temp.pageGroupName = data.groupName;
            } else {
                temp.pageGroupName = '';
            }
            return temp;
        });
        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete list of pages',
            data: value,
        };
        return response.status(200).send(successResponse);
    }

    // Update Page API
    /**
     * @api {put} /api/page/:id Update Page API
     * @apiGroup Page
     * @apiParam (Request body) {Number} pageId pageId
     * @apiParam (Request body) {String{..255}} title title
     * @apiParam (Request body) {String} content content
     * @apiParam (Request body) {Number} pageGroupId pageGroupId
     * @apiParam (Request body) {Number} active active
     * @apiParam (Request body) {String} pageSlug pageSlug
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "pageId" : "",
     *      "title" : "",
     *      "content" : "",
     *      "pageGroupId" : "",
     *      "active" : "",
     *      "pageSlug" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " Page is updated successfully",
     *      "status": "1"
     *      "data": {
     *                 "createdBy": 1,
     *                 "createdDate": "",
     *                 "modifiedBy": 1,
     *                 "modifiedDate": "",
     *                 "pageId": 57,
     *                 "title": "",
     *                 "intro": "",
     *                 "content": "",
     *                 "pageGroupId": 2,
     *                 "sortOrder": 1,
     *                 "slugName": "",
     *                 "viewPageCount": 1,
     *                 "isActive": 1
     *              }
     * }
     * @apiSampleRequest /api/page/:id
     * @apiErrorExample {json} updatePage error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    @Authorized(['vendor', 'edit-pages'])
    public async updatePage(@Body({ validate: true }) pageParam: UpdatePage, @Res() response: any): Promise<any> {
        const page = await this.pageService.findOne({
            where: {
                pageId: pageParam.pageId,
            },
        });
        if (!page) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid page id',
            };
            return response.status(400).send(errorResponse);
        }
        page.title = pageParam.title;
        page.content = pageParam.content ?? '';
        page.isActive = pageParam.active;
        page.pageGroupId = pageParam.pageGroupId;
        const metaTagTitle = pageParam.pageSlug ? pageParam.pageSlug : pageParam.title;
        const slug = metaTagTitle.trim();
        const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        page.slugName = await this.validate_slug(data, pageParam.pageId);
        const pageSave = await this.pageService.create(page);
        if (pageSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the page',
                data: pageSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the page',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Delete Page API
    /**
     * @api {delete} /api/page/:id Delete Page API
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
     * @apiSampleRequest /api/page/:id
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized(['vendor', 'delete-pages'])
    public async deletePage(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const page = await this.pageService.findOne({
            where: {
                pageId: id,
                tenantId: request.user.tenantId,
            },
        });

        if (!page) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid pageId',
            };
            return response.status(400).send(errorResponse);
        }
        const deletePage = await this.pageService.delete(page.pageId);
        if (deletePage) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the page',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the page',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // page Detail
    /**
     * @api {get} /api/page/page-detail Page Detail API
     * @apiGroup Page
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} pageId pageId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Page detail",
     *      "data": {
     *                 "createdBy": 1,
     *                 "createdDate": "",
     *                 "modifiedBy": 1,
     *                 "modifiedDate": "",
     *                 "pageId": 1,
     *                 "title": "1",
     *                 "intro": "",
     *                 "content": "1",
     *                 "pageGroupId": 1,
     *                 "sortOrder": 1,
     *                 "slugName": "1",
     *                 "viewPageCount": 1,
     *                 "isActive": 1
     *               }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page/:pageId
     * @apiErrorExample {json} page Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/:pageId')
    @Authorized(['vendor', 'list-pages'])
    public async PageDetail(@Param('pageId') pageId: number, @Res() response: any): Promise<any> {
        const page = await this.pageService.findOne({
            pageId,
        });
        if (!page) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Page Id',
            };
            return response.status(400).send(errorResponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got page detail',
            data: page,
        };
        return response.status(200).send(successResponse);
    }

    public async validate_slug($slug: string, $id: number = 0, $count: number = 0): Promise<string> {
        const slugCount = await this.pageService.checkSlug($slug, $id, $count);
        if (slugCount) {
            if (!$count) {
                $count = 1;
            } else {
                $count++;
            }
            return await this.validate_slug($slug, $id, $count);
        } else {
            if ($count > 0) {
                $slug = $slug + $count;
            }
            return $slug;
        }
    }
}
