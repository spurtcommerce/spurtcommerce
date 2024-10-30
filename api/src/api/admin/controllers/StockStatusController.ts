/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Get,
    Post,
    Put,
    Delete,
    Body,
    JsonController,
    Authorized,
    Res,
    Req,
    QueryParam,
    Param
} from 'routing-controllers';
import { CreateStockStatus } from './requests/CreateStockStatusRequest';
import { StockStatus } from '../../core/models/stockStatus';
import { StockStatusService } from '../../core/services/stockStatusService';

@JsonController('/stock-status')
export class StockStatusController {
    constructor(private stockStatusService: StockStatusService) {
    }

    // Create Stock Status API
    /**
     * @api {post} /api/stock-status/create-stock-status Create Stock Status API
     * @apiGroup StockStatus
     * @apiParam (Request body) {String{.255}} name name
     * @apiParam (Request body) {Number} status status
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New StockStatus is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/stock-status/create-stock-status
     * @apiErrorExample {json} createStockStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/create-stock-status')
    @Authorized(['admin', 'create-stock-status'])
    public async createStockStatus(@Body({ validate: true }) stockStatusParam: CreateStockStatus, @Res() response: any): Promise<any> {

        const newStockStatus = new StockStatus();
        newStockStatus.name = stockStatusParam.name;
        newStockStatus.isActive = stockStatusParam.status;

        const StockStatusSave = await this.stockStatusService.create(newStockStatus);
        if (StockStatusSave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created a new stock status',
                data: StockStatusSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create the stock status',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // update Stock Status API
    /**
     * @api {put} /api/stock-status/update-stock-status/:id Update Stock Status API
     * @apiGroup StockStatus
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..255}} name StockStatus name
     * @apiParam (Request body) {String} status StockStatus status
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated stockStatus.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/stock-status/update-stock-status/:id
     * @apiErrorExample {json} StockStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-stock-status/:id')
    @Authorized(['admin', 'edit-stock-status'])
    public async updateStockStatus(@Param('id') id: number, @Body({ validate: true }) stockStatusParams: CreateStockStatus, @Res() response: any, @Req() request: any): Promise<any> {

        const stockStatus = await this.stockStatusService.findOne({
            where: {
                stockStatusId: id,
            },
        });
        if (!stockStatus) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid stock status',
            };
            return response.status(400).send(errorResponse);
        }
        stockStatus.name = stockStatusParams.name;
        stockStatus.isActive = stockStatusParams.status;
        const stockStatusSave = await this.stockStatusService.create(stockStatus);
        if (stockStatusSave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the stock status',
                data: stockStatusSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'Unable to update the stock status',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Stock Status List API
    /**
     * @api {get} /api/stock-status/stock-status-list Stock Status List
     * @apiGroup StockStatus
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get stockStatus list",
     *      "data":"[{
     *                "stockStatusId": "",
     *                "name": "",
     *                "isActive": ""
     *              }],"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/stock-status/stock-status-list
     * @apiErrorExample {json} StockStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/stock-status-list')
    @Authorized()
    public async stockStatusList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['stockStatusId', 'name', 'isActive'];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            }, {
                name: 'isActive',
                op: 'like',
                value: status,
            },
        ];
        const WhereConditions = [];
        const stockStatusList = await this.stockStatusService.list(limit, offset, select, search, WhereConditions, count);
        if (stockStatusList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got all stock status list',
                data: stockStatusList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to get stock status list',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // delete StockStatus API
    /**
     * @api {delete} /api/stock-status/delete-stock-status/:id Delete Stock Status API
     * @apiGroup StockStatus
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "stockStatusId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted stockStatus.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/stock-status/delete-stock-status/:id
     * @apiErrorExample {json} StockStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-stock-status/:id')
    @Authorized(['admin', 'delete-stock-status'])
    public async deleteStockStatus(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const stockStatus = await this.stockStatusService.findOne({
            where: {
                stockStatusId: id,
            },
        });
        if (!stockStatus) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid stock Status Id',
            };
            return response.status(400).send(errorResponse);
        }

        const deleteStockStatus = await this.stockStatusService.delete(stockStatus);
        if (deleteStockStatus) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the stock status',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the stock status',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
