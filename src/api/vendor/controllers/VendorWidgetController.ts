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
@JsonController('/vendor-widget')
export class VendorWidgetController {
    constructor(
        private widgetService: WidgetService,
        private widgetItemService: WidgetItemService,
        private productService: ProductService,
        private categoryPathService: CategoryPathService
    ) {
    }

    /**
     * @api {post} /api/vendor-widget Create Vendor Widget
     * @apiGroup Vendor Widget
     * @apiName CreateVendorWidget
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiBody {String} title Widget title (max 255 chars)
     * @apiBody {String} [widgetLongTitle] Widget full/long title
     * @apiBody {String} [content] Widget description content
     * @apiBody {Number} ShowHomePageWidget Show on home page flag (1: Yes, 0: No)
     * @apiBody {Number} widgetLinkType Widget link type (1: Category, 2: Product)
     * @apiBody {String} [metaTagTitle] Meta tag title (max 70 chars)
     * @apiBody {String} [metaTagDescription] Meta tag description (max 160 chars)
     * @apiBody {String} [metaTagKeyword] Meta tag keyword (max 255 chars)
     * @apiBody {Number} [position] Widget position ordering
     * @apiBody {Number[]} [refId] Array of referenced item IDs (category or product IDs)
     * @apiBody {Number} status Active status (1: Active, 0: Inactive)
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Widget created successfully.",
     *         "data": {
     *             "widgetId": 1,
     *             "widgetTitle": "Featured Products",
     *             "widgetSlugName": "featured-products",
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Limit-Exceeded:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Set-Home-Page Widget exceeds the Limit (MAX 10)..!"
     *     }
     *
     * @apiSampleRequest /api/vendor-widget
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

    /**
     * @api {get} /api/vendor-widget List Vendor Widgets
     * @apiGroup Vendor Widget
     * @apiName VendorWidgetList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {Number} [limit] Number of records to return
     * @apiQuery {Number} [offset] Pagination offset
     * @apiQuery {String} [keyword] Keyword search for widget title
     * @apiQuery {String} [status] Filter by active status
     * @apiQuery {Number} [count] Return count only if 1
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got Widget list.",
     *         "data": [
     *             {
     *                 "widgetId": 1,
     *                 "widgetTitle": "Featured Products",
     *                 "position": 1,
     *                 "isActive": 1
     *             }
     *         ]
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Internal Server Error"
     *     }
     *
     * @apiSampleRequest /api/vendor-widget
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

    /**
     * @api {delete} /api/vendor-widget/:id Delete Vendor Widget
     * @apiGroup Vendor Widget
     * @apiName DeleteVendorWidget
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id Widget ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Widget deleted successfully."
     *     }
     *
     * @apiErrorExample {json} Widget-Not-Found:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid widget ID."
     *     }
     *
     * @apiSampleRequest /api/vendor-widget/:id
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

    /**
     * @api {put} /api/vendor-widget/:id Update Vendor Widget
     * @apiGroup Vendor Widget
     * @apiName UpdateVendorWidget
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id Widget ID
     *
     * @apiBody {String} title Widget title (max 255 chars)
     * @apiBody {String} [widgetLongTitle] Widget full/long title
     * @apiBody {String} [content] Widget description content
     * @apiBody {Number} ShowHomePageWidget Show on home page flag (1: Yes, 0: No)
     * @apiBody {Number} widgetLinkType Widget link type (1: Category, 2: Product)
     * @apiBody {String} [metaTagTitle] Meta tag title (max 70 chars)
     * @apiBody {String} [metaTagDescription] Meta tag description (max 160 chars)
     * @apiBody {String} [metaTagKeyword] Meta tag keyword (max 255 chars)
     * @apiBody {Number} [position] Widget position ordering
     * @apiBody {Number[]} [refId] Array of referenced item IDs (category or product IDs)
     * @apiBody {Number} status Active status (1: Active, 0: Inactive)
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully updated the widget.",
     *         "data": {
     *             "widgetId": 1,
     *             "widgetTitle": "Updated Featured Products",
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Widget-Not-Found:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid widget ID."
     *     }
     *
     * @apiSampleRequest /api/vendor-widget/:id
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

    /**
     * @api {get} /api/vendor-widget/widget-detail Get Vendor Widget Detail
     * @apiGroup Vendor Widget
     * @apiName GetVendorWidgetDetail
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {Number} widgetId Widget ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got widget detail.",
     *         "data": {
     *             "widgetId": 1,
     *             "widgetTitle": "Featured Products",
     *             "widgetLinkType": 2,
     *             "position": 1,
     *             "isActive": 1,
     *             "refId": []
     *         }
     *     }
     *
     * @apiErrorExample {json} Widget-Not-Found:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid widget ID"
     *     }
     *
     * @apiSampleRequest /api/vendor-widget/widget-detail
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
