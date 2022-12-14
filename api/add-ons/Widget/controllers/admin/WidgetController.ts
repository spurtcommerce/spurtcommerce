/*
 * Spurtcommerce PRO
 * version 4.8.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Get,
    Put,
    Delete,
    Param,
    QueryParam,
    Post,
    Body,
    JsonController,
    Authorized,
    Res,
    Req,
    UseBefore
} from 'routing-controllers';
import { WidgetService } from '../../../Widget/services/WidgetService';
import { Widget } from '../../../Widget/models/Widget';
import { CreateWidget } from './requests/CreateWidgetRequest';
import { ProductService } from '../../../../src/api/core/services/ProductService';
import { WidgetItemService } from '../../../Widget/services/WidgetItemService';
import { WidgetItem } from '../../../Widget/models/WidgetItem';
import { CategoryPathService } from '../../../../src/api/core/services/CategoryPathService';
import { CheckAddonMiddleware } from '../../../../src/api/core/middlewares/AddonValidationMiddleware';
@UseBefore(CheckAddonMiddleware)
@JsonController('/widget')
export class WidgetController {
    constructor(
        private widgetService: WidgetService,
        private widgetItemService: WidgetItemService,
        private productService: ProductService,
        private categoryPathService: CategoryPathService) {
    }

    // Create Widget
    /**
     * @api {post} /api/widget Add Widget API
     * @apiGroup Widget
     * @apiParam (Request body) {String{..255}} title title
     * @apiParam (Request body) {String} [content] content
     * @apiParam (Request body) {String} widgetLinkType widgetLinkType 1-> catgeory 2-> product
     * @apiParam (Request body) {String{..70}} [metaTagTitle] metaTagTitle
     * @apiParam (Request body) {String{..160}} [metaTagDescription] metaTagDescription
     * @apiParam (Request body) {String{..255}} [metaTagKeyword] metaTagKeyword
     * @apiParam (Request body) {String} [refId] refId
     * @apiParam (Request body) {String} [position] position
     * @apiParam (Request body) {Number} status status
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "content" : "",
     *      "widgetLinkType" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagKeyword" : "",
     *      "position" : "",
     *      "refId" : [],
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Widget is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/widget
     * @apiErrorExample {json} Banner error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized(['admin', 'add-widget'])
    public async createWidget(@Body({ validate: true }) widgetParam: CreateWidget, @Res() response: any): Promise<any> {
        const newWidget = new Widget();
        const widgetName = widgetParam.title;
        if (widgetName) {
            const data = widgetName.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getCustomerSlug = await this.widgetService.slugData(widgetName, 0);
            if (getCustomerSlug.length === 0) {
                newWidget.widgetSlugName = data;
            } else if (getCustomerSlug.length === 1) {
                newWidget.widgetSlugName = data + '-' + 1;
            } else {
                const slugVal = getCustomerSlug[getCustomerSlug.length - 1];
                const value = slugVal.widgetSlugName;
                const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                const slugNumber = parseInt(getSlugInt, 0);
                newWidget.widgetSlugName = data + '-' + (slugNumber + 1);
            }
        }
        newWidget.widgetTitle = widgetParam.title;
        newWidget.widgetDescription = widgetParam.content;
        newWidget.widgetLinkType = widgetParam.widgetLinkType;
        newWidget.metaTagTitle = widgetParam.metaTagTitle;
        newWidget.metaTagKeyword = widgetParam.metaTagKeyword;
        newWidget.metaTagDescription = widgetParam.metaTagDescription;
        newWidget.position = widgetParam.position;
        newWidget.isActive = widgetParam.status;
        const widgetSave = await this.widgetService.create(newWidget);
        if (widgetParam.refId) {
            const relatedItems: any = widgetParam.refId;
            for (const relatedItem of relatedItems) {
                const newItem: any = new WidgetItem();
                newItem.widgetId = widgetSave.widgetId;
                newItem.refId = relatedItem;
                await this.widgetItemService.create(newItem);
            }
        }

        if (widgetSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created a Widget.',
                data: widgetSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create the Widget.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Widget List
    /**
     * @api {get} /api/widget Widget List API
     * @apiGroup Widget
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Widget list",
     *      "data":"{
     *      "widgetId": "",
     *      "title": "",
     *      "content": "",
     *      "metaTagTitle": "",
     *      "metaTagDescription": "",
     *      "metaTagKeyword": "",
     *      "widgetlinkType": "",
     *      "position": "",
     *      }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/widget
     * @apiErrorExample {json} widget error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized(['admin', 'widget-list'])
    public async widgetList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['widgetId', 'widgetTitle', 'widgetDescription', 'widgetLinkType', 'position', 'isActive'];
        const search = [
            {
                name: 'widgetTitle',
                op: 'like',
                value: keyword,
            }, {
                name: 'isActive',
                op: 'like',
                value: status,
            },
        ];
        const WhereConditions = [];
        const widgetList: any = await this.widgetService.list(limit, offset, select, search, WhereConditions, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got widget count',
                data: widgetList,
            };
            return response.status(200).send(successRes);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got Widget list',
            data: widgetList,
        };
        return response.status(200).send(successResponse);
    }

    // Delete widget
    /**
     * @api {delete} /api/widget/:id Delete widget API
     * @apiGroup Widget
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "widgetId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Widget.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/widget/:id
     * @apiErrorExample {json} widget error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized(['admin', 'widget-delete'])
    public async deleteWidget(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const widget = await this.widgetService.findOne({
            where: {
                widgetId: id,
            },
        });
        if (!widget) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Widget Id.',
            };
            return response.status(400).send(errorResponse);
        }

        const deleteWidget = await this.widgetService.delete(widget);
        if (deleteWidget) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted.',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Update widget
    /**
     * @api {put} /api/widget/:id Update widget API
     * @apiGroup Widget
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..255}} title widget title
     * @apiParam (Request body) {String} [content] widget content
     * @apiParam (Request body) {String{..70}} [metaTagTitle] metaTagTitle
     * @apiParam (Request body) {String{..160}} [metaTagDescription] metaTagDescription
     * @apiParam (Request body) {String{..255}} [metaTagKeyword] metaTagkeyword
     * @apiParam (Request body) {String} widgetLinkType widgetLinkType
     * @apiParam (Request body) {Number} [position] widget position
     * @apiParam (Request body) {String} [refId] refId
     * @apiParam (Request body) {Number} status status
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "content" : "",
     *      "widgetLinkType" : "",
     *      "metaTagTitle" : "",
     *      "metaTagKeyword" : "",
     *      "metaTagDescription" : "",
     *      "position" : "",
     *      "refId" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated widget.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/widget/:id
     * @apiErrorExample {json} widget error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    @Authorized(['admin', 'edit-widget'])
    public async updateWidget(@Param('id') id: number, @Body({ validate: true }) widgetParam: CreateWidget, @Res() response: any, @Req() request: any): Promise<any> {

        const widget = await this.widgetService.findOne({
            where: {
                widgetId: id,
            },
        });
        if (!widget) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid widget Id.',
            };
            return response.status(400).send(errorResponse);
        }
        widget.widgetTitle = widgetParam.title;
        widget.widgetDescription = widgetParam.content;
        widget.widgetLinkType = widgetParam.widgetLinkType;
        widget.position = widgetParam.position;
        widget.metaTagTitle = widgetParam.metaTagTitle;
        widget.metaTagDescription = widgetParam.metaTagDescription;
        widget.metaTagKeyword = widgetParam.metaTagKeyword;
        widget.isActive = widgetParam.status;
        const title = widgetParam.title;
        const data = title.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        const getWidgetSlug = await this.widgetService.slugData(title, widget.widgetId);
        if (getWidgetSlug === '' || getWidgetSlug === undefined || getWidgetSlug.length === 0) {
            widget.widgetSlugName = data;
        } else if (getWidgetSlug.length === 1 && (title !== getWidgetSlug[getWidgetSlug.length - 1].name)) {
            widget.widgetSlugName = data + '-' + 1;
        } else if (getWidgetSlug.length > 1 && getWidgetSlug !== undefined && getWidgetSlug !== '') {
            const slugVal = getWidgetSlug[getWidgetSlug.length - 1];
            const val = slugVal.widgetSlugName;
            const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
            const slugNumber = parseInt(getSlugInt, 0);
            widget.widgetSlugName = data + '-' + (slugNumber + 1);
        }
        const widgetSave = await this.widgetService.create(widget);

        // Add ref item
        if (widgetParam.refId) {
            const findProduct: any = await this.widgetItemService.findOne({
                where: {
                    widgetId: widgetSave.widgetId,
                },
            });
            if (findProduct) {
                // delete previous related product
                await this.widgetItemService.delete({ widgetId: widgetSave.widgetId });
                const relatedItems: any = widgetParam.refId;
                for (const relatedItem of relatedItems) {
                    const newItem: any = new WidgetItem();
                    newItem.widgetId = widgetSave.widgetId;
                    newItem.refId = relatedItem;
                    await this.widgetItemService.create(newItem);
                }
            } else {
                const relatedItems: any = widgetParam.refId;
                for (const relatedItem of relatedItems) {
                    const newItem: any = new WidgetItem();
                    newItem.widgetId = widgetSave.widgetId;
                    newItem.refId = relatedItem;
                    await this.widgetItemService.create(newItem);
                }
            }
        }

        if (widgetSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the widget.',
                data: widgetSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the widget.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Widget Count API
    /**
     * @api {get} /api/widget/widget-count Widget Count API
     * @apiGroup Widget
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got widget count",
     *      "data":{},
     *      "status": "1"
     * }
     * @apiSampleRequest /api/widget/widget-count
     * @apiErrorExample {json} widget error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/widget-count')
    @Authorized()
    public async widgetCount(@Res() response: any): Promise<any> {
        const banner: any = {};
        const select = [];
        const search = [];
        const WhereConditions = [];
        const allWidgetCount = await this.widgetService.list(0, 0, select, search, WhereConditions, 1);
        const whereConditionsActive = [
            {
                name: 'isActive',
                op: 'like',
                value: 1,
            },
        ];
        const activeWidgetCount = await this.widgetService.list(0, 0, select, search, whereConditionsActive, 1);
        const whereConditionsInActive = [
            {
                name: 'isActive',
                op: 'like',
                value: 0,
            },
        ];
        const inActiveWidgetCount = await this.widgetService.list(0, 0, select, search, whereConditionsInActive, 1);
        banner.totalWidget = allWidgetCount;
        banner.activeWidget = activeWidgetCount;
        banner.inActiveWidget = inActiveWidgetCount;
        const successResponse: any = {
            status: 1,
            message: 'Successfully got count',
            data: banner,
        };
        return response.status(200).send(successResponse);
    }

    // Widget Detail
    /**
     * @api {get} /api/widget/widget-detail Widget Detail API
     * @apiGroup Widget
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} widgetId widgetId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got widget detail",
     *      "data": "{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/widget/widget-detail
     * @apiErrorExample {json} widget Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/widget-detail')
    @Authorized()
    public async WidgetDetail(@QueryParam('widgetId') widgetId: number, @Res() response: any): Promise<any> {
        const widget = await this.widgetService.findOne({
            where: {
                widgetId,
            },
        });
        if (!widget) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid widget Id',
            };
            return response.status(400).send(errorResponse);
        }
        const value = await this.widgetItemService.find({
            where: {
                widgetId,
            },
        });
        const arr: any = [];
        if (widget.widgetLinkType === 2) {
            for (const val of value) {
                const product = await this.productService.findOne({
                    select: ['productId', 'sku', 'name', 'quantity', 'price', 'productSlug', 'isActive'],
                    where: {
                        productId: val.refId,
                    },
                });
                arr.push(product);
            }
        } else {
            for (const val of value) {
                const select = [
                    'CategoryPath.categoryId as categoryId',
                    'category.sortOrder as sortOrder',
                    'category.parentInt as parentInt',
                    'category.name as name',
                    'category.image as image',
                    'category.imagePath as imagePath',
                    'category.metaTagTitle as metaTagTitle',
                    'category.metaTagDescription as metaTagDescription',
                    'category.metaTagKeyword as metaTagKeyword',
                    'category.isActive as isActive',
                    'category.createdDate as createdDate',
                    'GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'CategoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels',
                ];
                const relations = [
                    {
                        tableName: 'CategoryPath.category',
                        aliasName: 'category',
                    },
                    {
                        tableName: 'CategoryPath.path',
                        aliasName: 'path',
                    },
                ];
                const groupBy = [
                    {
                        name: 'CategoryPath.category_id',
                    },
                ];
                const whereConditions = [];
                whereConditions.push({
                    name: 'CategoryPath.categoryId',
                    op: 'or',
                    value: val.refId,
                });
                const searchConditions = [];
                const sort = [];
                const vendorCategoryList = await this.categoryPathService.listByQueryBuilder(1, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
                arr.push(vendorCategoryList[0]);
            }
        }
        widget.refId = arr;
        const successResponse: any = {
            status: 1,
            message: 'Successfully got widget detail',
            data: widget,
        };
        return response.status(200).send(successResponse);
    }

    // Product List for widget API
    /**
     * @api {get} /api/widget/productlist Product List for widget API
     * @apiGroup Widget
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} sku sku
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} price=1/2 if 1->asc 2->desc
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/widget/productlist
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/productlist')
    @Authorized()
    public async productList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sku') sku: string, @QueryParam('status') status: string, @QueryParam('price') price: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['productId', 'sku', 'name', 'quantity', 'price', 'image', 'imagePath', 'isFeatured', 'todayDeals', 'productSlug', 'isActive'];

        const relation = [];

        const WhereConditions = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            }, {
                name: 'sku',
                op: 'like',
                value: sku,
            }, {
                name: 'isActive',
                op: 'like',
                value: status,
            },
        ];
        const productLists: any = await this.productService.list(limit, offset, select, relation, WhereConditions, 0, price, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got count ',
                data: productLists,
            };
            return response.status(200).send(successRes);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete product list. ',
            data: productLists,
        };
        return response.status(200).send(successResponse);
    }
}
