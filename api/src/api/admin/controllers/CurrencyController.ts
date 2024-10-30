/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Put,
    Delete,
    Get,
    Post,
    Body,
    JsonController,
    Authorized,
    Res,
    Req,
    QueryParam,
    Param
} from 'routing-controllers';
import { Currency } from '../../core/models/Currency';
import { CreateCurrency } from './requests/CreateCurrencyRequest';
import { CurrencyService } from '../../core/services/CurrencyService';
import { UpdateCurrency } from './requests/UpdateCurrenyRequest';
import { Not } from 'typeorm';

@JsonController('/currency')
export class CurrencyController {
    constructor(private currencyService: CurrencyService) {
    }

    // Create Currency API
    /**
     * @api {post} /api/currency Add Currency API
     * @apiGroup Currency
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..30}} title Currency title
     * @apiParam (Request body) {String{..4}} code Currency code
     * @apiParam (Request body) {String{..4}} symbolLeft Currency symbolLeft
     * @apiParam (Request body) {String{..4}} symbolRight Currency  symbolRight
     * @apiParam (Request body) {Number} status Currency status
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "code" : "",
     *      "symbolLeft" : "",
     *      "symbolRight" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new Currency",
     *      "status": "1",
     *      "data":{
     *              "title": "",
     *              "code": "",
     *              "symbolLeft": "",
     *              "isActive": "",
     *              "createdDate": "",
     *              "currencyId": ""
     *             }
     * }
     * @apiSampleRequest /api/currency
     * @apiErrorExample {json} Currency error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized(['admin', 'create-currency'])
    public async addCurrency(@Body({ validate: true }) currencyParameter: CreateCurrency, @Res() response: any): Promise<any> {
        const existsCurrency = await this.currencyService.findOne({
            where: {
                title: currencyParameter.title,
                code: currencyParameter.code,
            },
        });
        if (existsCurrency) {
            const errorResponse: any = {
                status: 0,
                message: 'Currency name already exists',
            };
            return response.status(400).send(errorResponse);
        }
        const newCurrency = new Currency();
        newCurrency.title = currencyParameter.title;
        newCurrency.code = currencyParameter.code;
        newCurrency.symbolLeft = currencyParameter.symbolLeft !== '' ? currencyParameter.symbolLeft : undefined;
        newCurrency.symbolRight = currencyParameter.symbolRight !== '' ? currencyParameter.symbolRight : undefined;
        newCurrency.isActive = currencyParameter.status;
        const currencySave = await this.currencyService.create(newCurrency);
        if (currencySave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully added new currency',
                data: currencySave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create currency',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Currency List API
    /**
     * @api {get} /api/currency/currencylist Currency List API
     * @apiGroup Currency
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get currency list",
     *      "data":[{
     *       "createdDate": "2022-10-04T06:15:48.000Z",
     *       "modifiedDate": "2024-08-05T09:12:36.000Z",
     *       "currencyId": 73,
     *       "title": "שקל",
     *       "code": "ILS",
     *       "symbolLeft": null,
     *       "symbolRight": "₪",
     *       "isActive": 1
     *   }]
     * }
     * @apiSampleRequest /api/currency
     * @apiErrorExample {json} Currency error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized(['admin', 'list-currency'])
    public async currencyList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['currencyId', 'title', 'code', 'symbolLeft', 'symbolRight', 'modifiedDate', 'createdDate', 'isActive'];
        const search = [];
        if (keyword?.trim()) {
            search.push({
                name: ['Currency.title', 'Currency.code'],
                value: keyword,
            });
        }
        search.push({
            name: 'isActive',
            op: 'like',
            value: status,
        });
        const WhereConditions = [];
        const currencyList = await this.currencyService.list(limit, offset, select, WhereConditions, search, count);
        if (count) {
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the currency count',
                data: currencyList,
            });
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete currency list',
            data: currencyList,
        };
        return response.status(200).send(successResponse);
    }

    // update Currency
    /**
     * @api {put} /api/currency/:id Update Currency API
     * @apiGroup Currency
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} currencyId Currency currencyId
     * @apiParam (Request body) {String{..30}} title Currency title
     * @apiParam (Request body) {String{..3}} [code] Currency code
     * @apiParam (Request body) {String{..4}} symbolLeft Currency symbolLeft
     * @apiParam (Request body) {String{..4}} symbolRight Currency  symbolRight
     * @apiParam (Request body) {Number} status Currency status
     * @apiParamExample {json} Input
     * {
     *      "currencyId" : "",
     *      "title" : "",
     *      "code" : "",
     *      "symbolLeft" : "",
     *      "symbolRight" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Currency",
     *      "status": "1",
     *      "data":{
     *              "currencyId" : "",
     *              "title" : "",
     *              "code" : "",
     *              "value" : "",
     *              "update" : "",
     *      }
     * }
     * @apiSampleRequest /api/currency/:id
     * @apiErrorExample {json} Currency error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    @Authorized(['admin', 'edit-currency'])
    public async updateCurrency(@Body({ validate: true }) currencyParam: UpdateCurrency, @Res() response: any): Promise<any> {

        const currency = await this.currencyService.findOne({
            where: {
                currencyId: currencyParam.currencyId,
            },
        });
        if (!currency) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid currency Id',
            };
            return response.status(400).send(errorResponse);
        }
        const existsCurrency = await this.currencyService.findOne({
            where: {
                title: currencyParam.title,
                code: currencyParam.code,
                currencyId: Not(currency.currencyId),
            },
        });
        if (existsCurrency) {
            const errorResponse: any = {
                status: 0,
                message: 'Currency name already exists',
            };
            return response.status(400).send(errorResponse);
        }
        currency.title = currencyParam.title;
        currency.code = currencyParam.code;
        currency.symbolLeft = (currencyParam.symbolLeft === undefined) ? undefined : currencyParam.symbolLeft;
        currency.symbolRight = (currencyParam.symbolRight === undefined) ? undefined : currencyParam.symbolRight;
        currency.isActive = currencyParam.status;
        const currencySave = await this.currencyService.create(currency);
        if (currencySave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the currency',
                data: currencySave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the currency',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // delete Currency API
    /**
     * @api {delete} /api/currency/:id Delete Currency API
     * @apiGroup Currency
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "currencyId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted currency",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/currency/:id
     * @apiErrorExample {json} Currency error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized(['admin', 'delete-currency'])
    public async deleteCurrency(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const currency = await this.currencyService.findOne({
            where: {
                currencyId: id,
            },
        });
        if (!currency) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid currency Id',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteCurrency = await this.currencyService.delete(currency.currencyId);
        if (deleteCurrency === undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfullly deleted the currency',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the currency',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
