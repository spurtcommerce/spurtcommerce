/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, Put, Delete, Param, QueryParam, Post, Body, JsonController, Authorized, Res, Req } from 'routing-controllers';
import { WidgetService } from '../../core/services/WidgetService';
import { Widget } from '../../core/models/Widget';
import { CreateWidget } from '../../../api/vendor/controllers/requests/CreateWidgetRequest';
import { ProductService } from '../../core/services/ProductService';
import { WidgetItemService } from '../../core/services/WidgetItemService';
import { WidgetItem } from '../../core/models/WidgetItem';
import { CategoryPathService } from '../../core/services/CategoryPathService';
// import { CheckVendorAddonMiddleware } from '../../core/middlewares/VendorAddonValidationMiddilware';

enum HomePageWidget {
    MAX_LIMIT = 10,
}
import { Service } from 'typedi';

@Service()
// @UseBefore(CheckVendorAddonMiddleware)
@JsonController('/vendor-widget')
export class VendorWidgetController {
    constructor(
        private widgetService: WidgetService,
        private widgetItemService: WidgetItemService,
        private productService: ProductService,
        private categoryPathService: CategoryPathService
    ) {
    }

    // Add Widget API
    /**
     * @api {Post} /api/widget Add Widget API
     * @apiGroup Widget
     * @apiParam (Request body) {String{..255}} title title
     * @apiParam (Request body) {String} [content] content
     * @apiParam (Request body) {String} ShowHomePageWidget ShowHomePageWidget
     * @apiParam (Request body) {String} widgetLongTitle widgetLongTitle
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
     *      "widgetLongTitle" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagKeyword" : "",
     *      "ShowHomePageWidget": "",
     *      "position" : "",
     *      "refId" : [],
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Widget created successfully.",
     *      "status": "1",
     *       "data": {
     *          "widgetId": 1,
     *          "widgetTitle": "",
     *          "widgetLongTitle": "",
     *          "ShowHomePageWidget": "",
     *          "widgetDescription": "",
     *          "widgetLinkType": "",
     *          "metaTagTitle": "",
     *          "metaTagKeyword": "",
     *          "metaTagDescription": "",
     *          "position": "",
     *          "isActive": 1,
     *          "widgetSlugName": ""
     *       }
     * }
     * @apiSampleRequest /api/widget
     * @apiErrorExample {json} createWidget error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized(['vendor', 'create-widget'])
    public async createWidget(@Body({ validate: true }) widgetParam: CreateWidget, @Res() response: any, @Req() request: any): Promise<any> {
        const newWidget = new Widget();
        const widgetName = widgetParam.title;
        const ShowWidgetFlag: Widget[] = await this.widgetService.find({
            where: {
                ShowHomePageWidget: 1,
                tenantId: request.user.tenantId,
            },
        });
        if (widgetParam.ShowHomePageWidget && ShowWidgetFlag.length >= HomePageWidget.MAX_LIMIT) {
            return response.status(400).send({
                status: 0,
                message: `Set-Home-Page Widget exceeds the Limit (MAX ${HomePageWidget.MAX_LIMIT})..!`,
            });
        }
        if (widgetName) {
            const data = widgetName.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getCustomerSlug = await this.widgetService.slugData(widgetName, 0, request.user.tenantId);
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
        newWidget.widgetLongTitle = widgetParam.widgetLongTitle ?? widgetParam.title;
        newWidget.ShowHomePageWidget = widgetParam.ShowHomePageWidget;
        newWidget.widgetDescription = widgetParam.content;
        newWidget.widgetLinkType = widgetParam.widgetLinkType;
        newWidget.metaTagTitle = widgetParam.metaTagTitle;
        newWidget.metaTagKeyword = widgetParam.metaTagKeyword;
        newWidget.metaTagDescription = widgetParam.metaTagDescription;
        newWidget.position = widgetParam.position;
        newWidget.isActive = widgetParam.status;
        newWidget.tenantId = request.user.tenantId;
        const widgetSave = await this.widgetService.create(newWidget);
        // Add ref item
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
                message: 'Widget created successfully.',
                data: widgetSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create the widget.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Widget List
    /**
     * @api {Get} /api/widget Widget List API
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
     *      "status": "1"
     *      "message": "Successfully got Widget list",
     *      "data": {
     *          "widgetId": 1,
     *          "widgetTitle": "",
     *          "widgetLongTitle": "",
     *          "content": "",
     *          "metaTagTitle": "",
     *          "widgetDescription": "",
     *          "metaTagKeyword": "",
     *          "widgetlinkType": "",
     *          "position": "",
     *          "isActive": 1,
     *          "ShowHomePageWidget": "",
     *          "widgetSlugName": ""
     *      }
     * }
     * @apiSampleRequest /api/widget
     * @apiErrorExample {json} widgetList error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized(['vendor', 'list-widget'])
    public async widgetList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {
        const select = ['widgetId', 'position', 'widgetTitle', 'isActive', 'createdDate', 'modifiedDate'];
        const search = [
            {
                name: 'widgetTitle',
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
        ];
        const widgetList: any = await this.widgetService.list(limit, offset, select, search, whereConditions, [], count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got widget count.',
                data: widgetList,
            };
            return response.status(200).send(successRes);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got Widget list.',
            data: widgetList,
        };
        return response.status(200).send(successResponse);
    }

    // Delete Widget API
    /**
     * @api {Delete} /api/widget/:id Delete Widget API
     * @apiGroup Widget
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "id" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Widget deleted successfully.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/widget/:id
     * @apiErrorExample {json} deleteWidget error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized(['vendor', 'delete-widget'])
    public async deleteWidget(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const widget = await this.widgetService.findOne({
            where: {
                widgetId: id,
                tenantId: request.user.tenantId,
            },
        });
        if (!widget) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid widget ID.',
            };
            return response.status(400).send(errorResponse);
        }

        const deleteWidget = await this.widgetService.delete(widget.widgetId);
        if (deleteWidget) {
            const successResponse: any = {
                status: 1,
                message: 'Widget deleted successfully.',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete widget.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Update widget
    /**
     * @api {Put} /api/widget/:id Update widget API
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
     *      "ShowHomePageWidget":"",
     *      "position" : "",
     *      "refId" : 1,
     *      "status" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully updated the widget.",
     *      "data": {
     *          "widgetId": 1,
     *          "widgetTitle": "",
     *          "widgetLongTitle": "",
     *          "content": "",
     *          "metaTagTitle": "",
     *          "widgetDescription": "",
     *          "metaTagKeyword": "",
     *          "widgetlinkType": "",
     *          "position": "",
     *          "isActive": 1,
     *          "ShowHomePageWidget": "",
     *          "widgetSlugName": ""
     *      }
     * }
     * @apiSampleRequest /api/widget/:id
     * @apiErrorExample {json} updateWidget error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    @Authorized(['vendor', 'edit-widget'])
    public async updateWidget(@Param('id') id: number, @Body({ validate: true }) widgetParam: CreateWidget, @Res() response: any, @Req() request: any): Promise<any> {

        const widget = await this.widgetService.findOne({
            where: {
                widgetId: id,
                tenantId: request.user.tenantId,
            },
        });
        if (!widget) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid widget ID.',
            };
            return response.status(400).send(errorResponse);
        }
        const ShowWidgetFlag: Widget[] = await this.widgetService.find({
            where: {
                ShowHomePageWidget: 1,
                tenantId: request.user.tenantId,
            },
        });
        if (widgetParam.ShowHomePageWidget && widget.ShowHomePageWidget !== 1 && ShowWidgetFlag.length >= HomePageWidget.MAX_LIMIT) {
            return response.status(400).send({
                status: 0,
                message: `Set-Home-Page Widget exceeds the Limit (MAX ${HomePageWidget.MAX_LIMIT})..!`,
            });
        }
        widget.widgetTitle = widgetParam.title;
        widget.widgetLongTitle = widgetParam.widgetLongTitle ?? widgetParam.title;
        widget.widgetDescription = widgetParam.content;
        widget.widgetLinkType = widgetParam.widgetLinkType;
        widget.position = widgetParam.position;
        widget.ShowHomePageWidget = widgetParam.ShowHomePageWidget;
        widget.metaTagTitle = widgetParam.metaTagTitle;
        widget.metaTagDescription = widgetParam.metaTagDescription;
        widget.metaTagKeyword = widgetParam.metaTagKeyword;
        widget.isActive = widgetParam.status;
        const title = widgetParam.title;
        const data = title.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        const getWidgetSlug = await this.widgetService.slugData(title, widget.widgetId, request.user.tenantId);
        if (getWidgetSlug.length === 0) {
            widget.widgetSlugName = data;
        } else if (getWidgetSlug.length === 1 && (title !== getWidgetSlug[getWidgetSlug.length - 1].name)) {
            widget.widgetSlugName = data + '-' + 1;
        } else if (getWidgetSlug.length > 1) {
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
     * @api {Get} /api/widget/widget-count Widget Count API
     * @apiGroup Widget
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully got widget count.",
     *      "data": {},
     * }
     * @apiSampleRequest /api/widget/widget-count
     * @apiErrorExample {json} widgetCount error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/widget-count')
    @Authorized(['vendor', 'list-widget'])
    public async widgetCount(@Res() response: any, @Req() request: any): Promise<any> {
        const whereConditions = [
            {
                name: 'tenantId',
                value: request.user.tenantId,
            },
        ];
        const allWidgetCount = await this.widgetService.list(0, 0, [], [], whereConditions, [], 1);
        const whereConditionsActive = [
            {
                name: 'tenantId',
                value: request.user.tenantId,
            },
            {
                name: 'isActive',
                op: 'like',
                value: 1,
            },
        ];
        const activeWidgetCount = await this.widgetService.list(0, 0, [], [], whereConditionsActive, [], 1);
        const whereConditionsInActive = [
            {
                name: 'tenantId',
                value: request.user.tenantId,
            },
            {
                name: 'isActive',
                op: 'like',
                value: 0,
            },
        ];
        const inActiveWidgetCount = await this.widgetService.list(0, 0, [], [], whereConditionsInActive, [], 1);
        const banner: any = {};
        banner.totalWidget = allWidgetCount;
        banner.activeWidget = activeWidgetCount;
        banner.inActiveWidget = inActiveWidgetCount;
        const successResponse: any = {
            status: 1,
            message: 'Successfully got widget count.',
            data: banner,
        };
        return response.status(200).send(successResponse);
    }

    // Widget Detail
    /**
     * @api {Get} /api/widget/widget-detail Widget Detail API
     * @apiGroup Widget
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} widgetId widgetId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully got widget detail",
     *      "data": {
     *          "widgetId": 1,
     *          "widgetTitle": "",
     *          "widgetLongTitle": "",
     *          "content": "",
     *          "metaTagTitle": "",
     *          "widgetDescription": "",
     *          "metaTagKeyword": "",
     *          "widgetlinkType": "",
     *          "position": "",
     *          "isActive": 1,
     *          "ShowHomePageWidget": "",
     *          "widgetSlugName": ""
     *      }
     * }
     * @apiSampleRequest /api/widget/widget-detail
     * @apiErrorExample {json} widget Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/widget-detail')
    @Authorized(['vendor', 'list-widget'])
    public async WidgetDetail(@QueryParam('widgetId') widgetId: number, @Res() response: any, @Req() request: any): Promise<any> {
        const widget = await this.widgetService.findOne({
            select: ['widgetId', 'widgetLinkType', 'widgetDescription', 'widgetLongTitle', 'metaTagKeyword', 'metaTagDescription', 'metaTagTitle', 'widgetSlugName', 'position', 'widgetTitle', 'isActive', 'createdDate', 'modifiedDate', 'ShowHomePageWidget'],
            where: {
                widgetId,
                tenantId: request.user.tenantId,
            },
        });
        if (!widget) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid widget ID',
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
                const vendorCategoryList = await this.categoryPathService.listByQueryBuilder(1, 0, select, whereConditions, [], relations, groupBy, [], false, true);
                arr.push(vendorCategoryList[0]);
            }
        }
        widget.refId = arr;
        const successResponse: any = {
            status: 1,
            message: 'Successfully got widget detail.',
            data: widget,
        };
        return response.status(200).send(successResponse);
    }
}
