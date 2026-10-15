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

    /**
     * @api {post} /api/page Create Page
     * @apiGroup Page
     * @apiName CreateVendorPage
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiBody {String} title               Page title (max 255 characters)
     * @apiBody {String} content             Page content/HTML
     * @apiBody {Number} active              Active status (1: Active, 0: Inactive)
     * @apiBody {Number} pageGroupId         Page Group ID
     * @apiBody {String} [pageSlug]          Page slug
     * @apiBody {String} [metaTagTitle]       Meta tag title (max 70 chars)
     * @apiBody {String} [metaTagContent]     Meta tag content (max 160 chars)
     * @apiBody {String} [metaTagKeyword]     Meta tag keyword (max 255 chars)
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully created new page.",
     *         "data": {
     *             "pageId": 1,
     *             "title": "About Us",
     *             "pageGroupId": 1,
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiSampleRequest /api/page
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

    /**
     * @api {get} /api/page Page List
     * @apiGroup Page
     * @apiName VendorPageList
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiQuery {Number} [limit]            Number of records to return
     * @apiQuery {Number} [offset]           Pagination offset
     * @apiQuery {String} [keyword]          Search keyword
     * @apiQuery {String} [status]           Status filter
     * @apiQuery {Number|Boolean} [count]    If true/1, returns total count
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got page list.",
     *         "data": [
     *             {
     *                 "pageId": 1,
     *                 "title": "About Us",
     *                 "isActive": 1
     *             }
     *         ]
     *     }
     *
     * @apiSampleRequest /api/page
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

    /**
     * @api {put} /api/page/:id Update Page
     * @apiGroup Page
     * @apiName UpdateVendorPage
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} id          Page ID
     *
     * @apiBody {Number} pageId              Page ID
     * @apiBody {String} title               Page title
     * @apiBody {String} content             Page content
     * @apiBody {Number} active              Active status
     * @apiBody {Number} pageGroupId         Page Group ID
     * @apiBody {String} [pageSlug]          Page slug
     * @apiBody {String} [metaTagTitle]       Meta tag title
     * @apiBody {String} [metaTagContent]     Meta tag content
     * @apiBody {String} [metaTagKeyword]     Meta tag keyword
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully updated page.",
     *         "data": {
     *             "pageId": 1,
     *             "title": "About Us Updated",
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Page:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid page Id"
     *     }
     *
     * @apiSampleRequest /api/page/:id
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
    /**
     * @api {delete} /api/page/:id Delete Page
     * @apiGroup Page
     * @apiName DeleteVendorPage
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} id          Page ID to delete
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully deleted page."
     *     }
     *
     * @apiErrorExample {json} Invalid-Page:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid page Id"
     *     }
     *
     * @apiSampleRequest /api/page/:id
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

    /**
     * @api {get} /api/page/:pageId Get Page Detail
     * @apiGroup Page
     * @apiName GetVendorPageDetail
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} pageId      Page ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got page details.",
     *         "data": {
     *             "pageId": 1,
     *             "title": "About Us",
     *             "content": "Page content...",
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Page:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid page Id"
     *     }
     *
     * @apiSampleRequest /api/page/:pageId
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
