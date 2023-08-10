/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, QueryParam, Param, JsonController, Res } from 'routing-controllers';
import { PageService } from '../../core/services/PageService';
import { PageGroupService } from '../../core/services/PageGroupService';

@JsonController('/pages')
export class StorePageController {
    constructor(private pageService: PageService, private pageGroupService: PageGroupService) {
    }

    // Page List API
    /**
     * @api {get} /api/pages/pagelist Page List API
     * @apiGroup Store
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
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
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/pages/pagelist
     * @apiErrorExample {json} pageFront error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/pagelist')
    public async pageList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['groupId', 'groupName', 'isActive'];
        const search = [];
        const WhereConditions = [{
            name: 'isActive',
            value: 1,
        }];
        const relations = [];
        const pageGroupList = await this.pageGroupService.list(limit, offset, select, search, relations, WhereConditions, count);
        const promise = pageGroupList.map(async (result: any) => {
            const data: any = await this.pageService.find({ where: { pageGroupId: result.groupId, isActive: 1 } });
            const temp: any = result;
            temp.page = data;
            return temp;
        });
        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the group list.',
            data: value,
        };
        return response.status(200).send(successResponse);
    }

    // get Page Detail API
    /**
     * @api {get} /api/pages/get_pagedetails/:slugName Page Details API
     * @apiGroup Store
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get page Details",
     *      "data":{
     *      "pageId" : "",
     *      "title" : "",
     *      "content" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/pages/get_pagedetails/:slugName
     * @apiErrorExample {json} page error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/get_pagedetails/:slugName')
    public async pageDetails(@Param('slugName') slugName: string, @Res() response: any): Promise<any> {
        const page = await this.pageService.findOne({
            where: {
                slugName,
                isActive: 1,
            },
        });
        if (!page) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid page',
            };
            return response.status(404).send(errorResponse);
        }

        const pageDetails = await this.pageService.findOne(page);
        if (pageDetails) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get page Details',
                data: pageDetails,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to get page Details',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
