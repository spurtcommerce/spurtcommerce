/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { JsonController, Res, Post, Authorized, Get, QueryParam, Param, Body, Req, Put, Delete } from 'routing-controllers';
import { MSeoMetaService } from '../../core/services/MSeoMetaService';
import { MSeoMeta } from '../../core/models/MSeoMetaModel';
import { AddSeoRequest } from '../../../../src/api/vendor/controllers/requests/CreateSeoRequest';
import { PageService } from '../../../../src/api/core/services/PageService';
import { PageGroupService } from '../../../../src/api/core/services/PageGroupService';
// import { CheckVendorAddonMiddleware } from '../../../../src/api/core/middlewares/VendorAddonValidationMiddilware';
import { Service } from 'typedi';
import { PageGroup } from '../../../../src/api/core/models/PageGroup';
import { Page } from '../../../../src/api/core/models/Page';
import { Like } from 'typeorm';

@Service()
// @UseBefore(CheckVendorAddonMiddleware)
@JsonController('/vendor-page-seo')
export class VendorSeoPageController {
    constructor(
        private pageService: PageService,
        private mSeoMetaService: MSeoMetaService,
        private pageGroupService: PageGroupService
    ) { }

    // Seo Page List API
    /**
     * @api {Get} /api/page-seo Seo Page List API
     * @apiGroup Seo
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got the complete list of pages.",
     *      "data": [
     *       {
     *            "pageId": 1,
     *            "title": "",
     *            "pageGroupId": 1,
     *            "content": "",
     *            "isActive": 1,
     *            "slugName": "",
     *       }
     *      ]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-seo
     * @apiErrorExample {json} page List error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized(['vendor', 'seo-pages'])
    public async pageList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {
        const select = ['pageId', 'title', 'pageGroupId', 'content', 'isActive', 'slugName', 'link', 'position'];
        // const search = [
        //     { name: 'title', op: 'like', value: keyword },
        //     { name: 'isActive', op: 'like', value: status },
        // ];
        const searchConditions = [];

        if (keyword?.trim()) {
            searchConditions.push({
                name: ['page_group.groupName'],
                value: `%${keyword.toLowerCase()}%`,
            });
        }

        const whereConditions = [
            { name: 'tenantId', value: request.user.tenantId },
        ];
        const pageGroups = await this.pageGroupService.findAll({
            select: ['groupId', 'groupName', 'position', 'isActive'],
            where: {
              tenantId: request.user.tenantId,
              ...(keyword ? { groupName: Like(`%${keyword}%`) } : {}),
            },
          });
        const pageGroupList = await this.pageGroupService.list(limit, offset, [], searchConditions, [], whereConditions, count);
        const pageList = await this.pageService.list(0, 0, select, [], [], whereConditions, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got pages count.',
                data: pageGroupList,
            };
            return response.status(200).send(successRes);
        }
        const promise = pageList.map(async (result: any) => {
            const data: any = await this.pageGroupService.findOne({
                select: ['groupId', 'groupName', 'position', 'isActive'],
                where: { groupId: result.pageGroupId },
            });

            const temp: any = result;
            if (data) {
                temp.pageGroupName = data.groupName;
                temp.pageGroupPosition = data.position;
            } else {
                temp.pageGroupName = '';
                temp.pageGroupPosition = null;
            }
            return temp;
        });

        const value = await Promise.all(promise);

        const groupedResult: any = {};

        for (const group of pageGroups) {
            groupedResult[group.groupName] = {
                pageGroupId: group.groupId,
                menuName: group.groupName,
                menuItem: '',
                position: group.position ?? 0,
                isActive: group.isActive,
            };
        }

        for (const item of value) {
            const groupName = item.pageGroupName;

            if (groupedResult[groupName] && item.isActive === 1) {
                groupedResult[groupName].menuItem +=
                    (groupedResult[groupName].menuItem ? ', ' : '') + item.title;
            }
        }

        const finalResponse = Object.values(groupedResult).sort(
            (a: any, b: any) => a.position - b.position
        );
        if (count) {
            return response.status(200).send({
              status: 1,
              message: 'Successfully got pages count.',
              data: finalResponse.length,
            });
          }
          const paginatedResult = finalResponse.slice(
            offset,
            offset + limit
          );
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete list of pages.',
            data: paginatedResult,
        };
        return response.status(200).send(successResponse);
    }
    // Create/Update Seo API
    /**
     * @api {Post} /api/page-seo/:pageId Create/Update Seo API
     * @apiGroup Seo
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {Number} pageId pageId
     * @apiParam (Request body) {String} metaTagDescription metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword metaTagKeyword
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "metaTagTitle" : "",
     *      "metaTagDescription": "",
     *      "metaTagKeyword": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "SEO Updated successfully",
     *      "data": {
     *          "seoId": 1,
     *          "metaTagTitle": "",
     *          "metaTagDescription": "",
     *          "metaTagKeyword": "",
     *          "refId": 1,
     *          "seoType": ""
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-seo/:pageId
     * @apiErrorExample {json} Update Seo  error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/:pageId')
    @Authorized(['vendor', 'seo-pages'])
    public async updateSeo(@Param('pageId') pageId: number, @Body({ validate: true }) seo: AddSeoRequest, @Res() response: any): Promise<any> {

        const page = await this.pageService.findOne({ where: { pageId } });
        if (!page) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Page. ',
            };
            return response.status(400).send(errorResponse);
        }

        const updateSeo = await this.mSeoMetaService.findOne({
            where: {
                refId: pageId,
                seoType: 'pages',
            },
        });
        if (updateSeo) {

            updateSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : page.title;
            updateSeo.metaTagDescription = seo.metaTagDescription ? await this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
            updateSeo.metaTagKeyword = seo.metaTagKeyword;
            updateSeo.refId = pageId;
            updateSeo.seoType = 'pages';

            await this.mSeoMetaService.update(updateSeo.seoId, updateSeo);
            const successResponse: any = {
                status: 1,
                message: 'SEO Updated successfully',
            };
            return response.status(200).send(successResponse);
        }

        const newSeo = new MSeoMeta();
        newSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : page.title;
        newSeo.metaTagDescription = seo.metaTagDescription ? await this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
        newSeo.metaTagKeyword = seo.metaTagKeyword;
        newSeo.refId = pageId;
        newSeo.seoType = 'pages';
        const createSeo = await this.mSeoMetaService.create(newSeo);

        if (createSeo) {
            const successResponse: any = {
                status: 1,
                message: 'SEO created Successfully.',
                data: createSeo,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create SEO.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Seo Detail API
    /**
     * @api {Get} /api/page-seo/:pageId Seo Detail API
     * @apiGroup seo
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} pageId pageId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully got SEO details. ",
     *    "data": {
     *     "pageId": 1,
     *     "pageTitle": "",
     *     "pageContent": "",
     *     "seo": {
     *       "seoId": 1,
     *       "metaTagTitle": "",
     *       "metaTagDescription": "",
     *       "metaTagKeyword": ",
     *       "refId": 1,
     *       "seoType": ""
     *     }
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/page-seo/:pageId
     * @apiErrorExample {json} seoDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/bypage/:pageId')
    @Authorized(['vendor', 'seo-pages'])
    public async seoDetail(@Param('pageId') pageId: number, @Res() response: any): Promise<any> {
        const page = await this.pageService.findOne({ where: { pageId } });
        if (!page) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid page. ',
            };
            return response.status(400).send(errorResponse);
        }

        // page.seo = await this.mSeoMetaService.findOne({ where: { refId: pageId, seoType: 'pages' } });
        const successResponse: any = {
            status: 1,
            message: 'Successfully got SEO details. ',
            data: page,
        };
        return response.status(200).send(successResponse);
    }

    // Update Page & Page Group API
    /**
     * @api {Put} /api/vendor-page-seo/:pageId Update Page and Page Group API
     * @apiGroup seo
     * @apiHeader {String} Authorization
     *
     * @apiParam (Request param) {Number} pageId Page unique ID
     *
     * @apiParam (Request body) {String} title Page title
     * @apiParam (Request body) {Number} isActive Page active status (1 = Active, 0 = Inactive)
     * @apiParam (Request body) {Number} pageGroupId Page group ID
     * @apiParam (Request body) {String} pageGroupName Page group name
     * @apiParam (Request body) {Number} position Page group position / sort order
     * @apiParam (Request body) {Number} [groupIsActive] Page group active status (optional)
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Page and Page Group updated successfully"
     * }
     *
     * @apiSampleRequest /api/vendor-page-seo/:pageId
     *
     * @apiErrorExample {json} updatePage error
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Unable to update page and page group"
     * }
     */
    @Put('/:pageGroupId')
    @Authorized(['vendor', 'seo-pages'])
    public async updateMenuNavigation(
        @Param('pageGroupId') pageGroupId: number,
        @Body() body: any,
        @Req() request: any,
        @Res() response: any
    ): Promise<any> {

        const tenantId = request.user.tenantId;

        const existingPosition = await this.pageGroupService.find({
            position: body.position,
            tenantId,
        });

        if (existingPosition && existingPosition.groupId !== Number(pageGroupId)) {
            return response.status(400).send({
                status: 0,
                message: `Position ${body.position} already used by another menu (${existingPosition.groupName})`,
            });
        }

        await this.pageGroupService.updates(
            {
                groupId: pageGroupId,
                tenantId,
            },
            {
                groupName: body.menuName,
                position: body.position,
                isActive: body.isActive,
            }
        );
        const existingPages = await this.pageService.findAll({
            pageGroupId,
            tenantId,
        });

        const payloadPageIds: number[] = [];

        if (body.menuItem && body.menuItem.length > 0) {
            for (const dbPage of existingPages) {
                if (!payloadPageIds.includes(dbPage.pageId)) {
                    await this.pageService.updates(
                        {
                            pageId: dbPage.pageId,
                            pageGroupId,
                            tenantId,
                        },
                        {
                            isActive: 0,
                        }
                    );
                }
            }
            for (const page of body.menuItem) {

                if (page.pageId) {
                    payloadPageIds.push(page.pageId);
                    await this.pageService.updates(
                        {
                            pageId: page.pageId,
                            pageGroupId,
                            tenantId,
                        },
                        {
                            title: page.title,
                            position: page.position,
                            link: page.link,
                            isActive: page.isActive,
                        }
                    );
                } else {
                    const newPage = await this.pageService.create({
                        title: page.title,
                        slug: page.slugName,
                        position: page.position,
                        isActive: page.isActive,
                        link: page.link,
                        pageGroupId,
                        tenantId,
                    });
                    payloadPageIds.push(newPage.pageId);
                }
            }
        }

        return response.status(200).send({
            status: 1,
            message: 'Menu navigation updated successfully',
        });
    }

    // Delete Page Group API
    /**
     * @api {Delete} /api/vendor-page-seo/:groupId Delete Page Group API
     * @apiGroup seo
     * @apiHeader {String} Authorization
     *
     * @apiParam (Request param) {Number} groupId Page group unique ID
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Page Group and related Pages deleted successfully"
     * }
     *
     * @apiSampleRequest /api/vendor-page-seo/:groupId
     *
     * @apiErrorExample {json} deletePageGroup error
     * HTTP/1.1 400 Bad Request
     * {
     *   "status": 0,
     *   "message": "Invalid Page Group"
     * }
     *
     * @apiErrorExample {json} deletePageGroup server error
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Unable to delete page group"
     * }
     */
    @Delete('/:groupId')
    @Authorized(['vendor', 'seo-pages'])
    public async deletePageGroup(
        @Param('groupId') groupId: number,
        @Res() response: any
    ): Promise<any> {

        const pageGroup = await this.pageGroupService.findOne({
            where: { groupId },
        });

        if (!pageGroup) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid Page Group',
            });
        }

        await this.pageService.deleteByCondition({ pageGroupId: groupId });

        await this.pageGroupService.delete(groupId);

        return response.status(200).send({
            status: 1,
            message: 'Page Group and related Pages deleted successfully',
        });
    }

    // Create Menu Navigation API
    /**
     * @api {Post} /api/vendor-page-seo Create Menu Navigation API
     * @apiGroup seo
     * @apiHeader {String} Authorization
     *
     * @apiParam (Request body) {String} menuName Menu group name
     * @apiParam (Request body) {Number} position Menu group position / sort order
     * @apiParam (Request body) {Number} isActive Menu group active status (1 = Active, 0 = Inactive)
     * @apiParam (Request body) {Object[]} menuItems List of menu items
     * @apiParam (Request body) {String} menuItems.title Page title
     * @apiParam (Request body) {String} menuItems.slugName Page slug name
     * @apiParam (Request body) {String} menuItems.link Page link URL
     * @apiParam (Request body) {Number} menuItems.position Page position / sort order
     * @apiParam (Request body) {Number} menuItems.isActive Page active status (1 = Active, 0 = Inactive)
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Menu navigation created successfully"
     * }
     *
     * @apiSampleRequest /api/vendor-page-seo
     *
     * @apiErrorExample {json} createMenuNavigation error
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Unable to create menu navigation"
     * }
     */
    @Post()
    @Authorized(['vendor', 'seo-pages'])
    public async createMenuNavigation(
        @Body() body: any,
        @Req() request: any,
        @Res() response: any
    ): Promise<any> {
        const menuExists = await this.pageGroupService.findOne({
            where: {
                tenantId: request.user.tenantId,
                groupName: body.menuName,
            },
        });

        if (menuExists) {
            return response.status(400).send({
                status: 0,
                message: `Menu Name ${body.menuName} already exists. Please choose another name`,
            });
        }
        const positionExists = await this.pageGroupService.findOne({
            where: {
                tenantId: request.user.tenantId,
                position: body.position,
            },
        });

        if (positionExists) {
            return response.status(400).send({
                status: 0,
                message: `Menu position ${body.position} already exists. Please choose another position.`,
            });
        }
        if (body.position === 0) {
            return response.status(400).send({
                status: 0,
                message: `Menu position ${body.position} not accepted.`,
            });
        }
        const pageGroup = new PageGroup();
        pageGroup.groupName = body.menuName;
        pageGroup.position = body.position ?? 0;
        pageGroup.isActive = body.isActive ?? 1;
        pageGroup.tenantId = request.user.tenantId;

        const pageGroupSave = await this.pageGroupService.create(pageGroup);

        if (body.menuItem && body.menuItem.length > 0) {
            for (const item of body.menuItem) {

                const page = new Page();
                page.title = item.title;
                page.slugName = item.slugName;
                page.link = item.link;
                page.position = item.position ?? 0;
                page.isActive = item.isActive ?? 1;
                page.pageGroupId = pageGroupSave.groupId;
                page.tenantId = request.user.tenantId;

                await this.pageService.create(page);
            }
        }

        return response.status(200).send({
            status: 1,
            message: 'Menu navigation created successfully',
        });
    }

    // Update Menu Item API
    /**
     * @api {Put} /api/vendor-page-seo/item/:pageId Update Menu Item API
     * @apiGroup seo
     * @apiHeader {String} Authorization
     *
     * @apiParam (Request param) {Number} pageId Menu item (page) unique ID
     *
     * @apiParam (Request body) {String} [title] Menu item title
     * @apiParam (Request body) {String} [link] Menu item link URL
     * @apiParam (Request body) {Number} [position] Menu item position / sort order
     * @apiParam (Request body) {Number} [isActive] Menu item active status (1 = Active, 0 = Inactive)
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Menu item updated successfully"
     * }
     *
     * @apiSampleRequest /api/vendor-page-seo/item/:pageId
     *
     * @apiErrorExample {json} updateMenuItem error
     * HTTP/1.1 400 Bad Request
     * {
     *   "status": 0,
     *   "message": "Menu item not found"
     * }
     *
     * @apiErrorExample {json} updateMenuItem server error
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Unable to update menu item"
     * }
     */
    @Put('/item/:pageGroupId')
    @Authorized(['vendor', 'seo-pages'])
    public async updateMenuGroup(
        @Param('pageGroupId') pageGroupId: number,
        @Body() body: any, @Req() request: any,
        @Res() response: any
    ): Promise<any> {
        const tenantId = request.user.tenantId;
        const existingPosition = await this.pageGroupService.find({
            position: body.position,
            tenantId,
        });
        if (existingPosition && existingPosition.groupId !== Number(pageGroupId)) {
            return response.status(400).send({
                status: 0,
                message: `Position ${body.position}already used by another menu(${existingPosition.groupName})`,
            });
        }
        const existing = await this.pageGroupService.find({
            groupId: pageGroupId,
            tenantId,
        });
        if (!existing) {
            return response.status(404).send({
                status: 0,
                message: 'Page group not found',
            });
        }
        await this.pageGroupService.updates(
            {
                groupId: pageGroupId,
                tenantId,
            },
            {
                groupName: body.menuName ?? existing.groupName,
                position: body.position ?? existing.position,
                isActive: body.isActive ?? existing.isActive,
            });
        return response.status(200).send({
            status: 1, message: 'Menu group updated successfully',
        });
    }
    // Delete Menu Item API
    /**
     * @api {Delete} /api/vendor-page-seo/item/:pageId Delete Menu Item API
     * @apiGroup seo
     * @apiHeader {String} Authorization
     *
     * @apiParam (Request param) {Number} pageId Menu item (page) unique ID
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Menu item deleted successfully"
     * }
     *
     * @apiSampleRequest /api/vendor-page-seo/item/:pageId
     *
     * @apiErrorExample {json} deleteMenuItem error
     * HTTP/1.1 400 Bad Request
     * {
     *   "status": 0,
     *   "message": "Menu item not found"
     * }
     *
     * @apiErrorExample {json} deleteMenuItem server error
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Unable to delete menu item"
     * }
     */

    @Delete('/item/:pageId')
    @Authorized(['vendor', 'seo-pages'])
    public async deleteMenuItem(
        @Param('pageId') pageId: number,
        @Req() request: any,
        @Res() response: any
    ): Promise<any> {

        const page = await this.pageService.findOne({
            where: {
                pageId,
                tenantId: request.user.tenantId,
            },
        });

        if (!page) {
            return response.status(400).send({
                status: 0,
                message: 'Menu item not found',
            });
        }

        await this.pageService.delete(pageId);

        return response.status(200).send({
            status: 1,
            message: 'Menu item deleted successfully',
        });
    }

    @Get('/:groupId')
    @Authorized(['vendor', 'seo-pages'])
    public async pageListByGroupId(
        @Param('groupId') groupId: number,
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('keyword') keyword: string,
        @QueryParam('status') status: string,
        @QueryParam('count') count: number | boolean,
        @Res() response: any,
        @Req() request: any
    ): Promise<any> {

        const select = ['pageId', 'title', 'pageGroupId', 'content', 'isActive', 'slugName', 'link', 'position'];

        const search = [
            {
                name: 'title',
                op: 'like',
                value: keyword,
            },
            {
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
            {
                name: 'pageGroupId',
                value: groupId,
            },
            {
                name: 'isActive',
                value: 1,
            },
        ];

        const pageList = await this.pageService.list(limit, offset, select, [], search, whereConditions, count);

        if (count) {
            return response.status(200).send({
                status: 1,
                message: 'Successfully got pages count by group.',
                data: pageList,
            });
        }
        const grpId = Number(groupId);

        if (!grpId) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid group id',
            });
        }

        const groupData = await this.pageGroupService.find({
            groupId: grpId,
        });

        const finalResponse = {
            menuName: groupData ? groupData.groupName : '',
            position: groupData ? groupData.position : 0,
            isActive: groupData ? groupData.isActive : 0,
            pages: pageList,
        };

        return response.status(200).send({
            status: 1,
            message: 'Successfully got pages by group id.',
            data: finalResponse,
        });
    }

}
