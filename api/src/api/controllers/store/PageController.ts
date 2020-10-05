/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, QueryParam, Param, JsonController, Res} from 'routing-controllers';
import { PageService } from '../../services/PageService';

@JsonController('/pages')
export class PageController {
    constructor(private pageService: PageService) {
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
     *      "metaTagTitle" : "",
     *      "metaTagContent" : "",
     *      "metaTagKeyword" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/pages/pagelist
     * @apiErrorExample {json} pageFront error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/pagelist')
    public async pageList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count')count: number|boolean, @Res() response: any): Promise<any> {
        const select = ['pageId', 'title', 'content', 'isActive', 'metaTagTitle', 'metaTagContent', 'metaTagKeyword'];
        const search = [
            {
                name: 'title',
                op: 'like',
                value: keyword,
            },
            {
                name: 'isActive',
                op: 'like',
                value: 1,
            },
        ];
        const WhereConditions = [];
        const pageList = await this.pageService.list(limit, offset, select, search, WhereConditions, count);
        if (pageList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get pages List',
                data: pageList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to list pages',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // get Page Detail API
    /**
     * @api {get} /api/pages/get_pagedetails/:id Page Details API
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
     * @apiSampleRequest /api/pages/get_pagedetails/:id
     * @apiErrorExample {json} page error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/get_pagedetails/:id')
    public async pageDetails(@Param('id')id: number, @Res() response: any): Promise<any> {
        const page = await this.pageService.findOne({
            where: {
                pageId: id,
            },
        });
        if (!page) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid page id',
            };
            return response.status(400).send(errorResponse);
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
