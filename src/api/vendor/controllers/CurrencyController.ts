/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, JsonController, Authorized, Res, Req, QueryParam, Delete, Param, UseBefore } from 'routing-controllers';
import { VendorCurrencyService } from '../../core/services/VendorCurrencyService';
import { VendorTranslationMiddleware } from '../../core/middlewares/VendorTranslationMiddleware';
import { Service } from 'typedi';
import { CurrencyService } from '../../core/services/CurrencyService';
import { CheckAddonMiddleware } from '../../core/middlewares/AddonValidationMiddleware';

@Service()
@UseBefore(VendorTranslationMiddleware)
@UseBefore(CheckAddonMiddleware)
@JsonController('/vendor-currency')
export class VendorCurrencyController {
    constructor(
        private vendorCurrencyService: VendorCurrencyService,
        private currencyService: CurrencyService
    ) {
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
    @Get('/master-currency')
    @Authorized(['vendor', 'list-setting-localization'])
    public async masterCurrencyList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['currencyId', 'title', 'code', 'symbolLeft', 'symbolRight', 'modifiedDate', 'createdDate', 'isActive'];
        const search = [];
        if (keyword?.trim()) {
            search.push({
                name: ['Currency.title', 'Currency.code'],
                value: keyword,
            });
        }
        const whereConditions = [];
        if (status && status !== '') {
            whereConditions.push({
                name: 'Currency.isActive',
                op: 'where',
                value: status,
            });
        }
        const currencyList = await this.currencyService.list(limit, offset, select, whereConditions, search, count);
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
    @Authorized(['vendor', 'list-setting-localization'])
    public async currencyList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {
        const select = [
            'VendorCurrency.id',
            'VendorCurrency.isActive',
            'VendorCurrency.isDelete',
            'VendorCurrency.tenantId',
            'VendorCurrency.createdDate',
            'VendorCurrency.modifiedDate',
            'currency.currencyId',
            'currency.title',
            'currency.code',
            'currency.symbolLeft',
            'currency.symbolRight',
            'currency.decimalPlace',
            'currency.value',
        ];
        const relations = [
            {
                tableName: 'VendorCurrency.currency',
                aliasName: 'currency',
                op: 'left',
            },
        ];
        const whereConditions = [
            {
                name: 'VendorCurrency.tenantId',
                op: 'and',
                value: request.user.tenantId,
            },
            {
                name: 'VendorCurrency.isDelete',
                op: 'and',
                value: 0,
            },
        ];
        const search = [];
        if (keyword?.trim()) {
            search.push({
                name: ['currency.title', 'currency.code'],
                value: keyword,
            });
        }

        if (status && status !== '') {
            whereConditions.push({
                name: 'VendorCurrency.isActive',
                op: 'and',
                value: status,
            });
        }
        const currencyList = await this.vendorCurrencyService.listByQueryBuilder(limit, offset, select, whereConditions, search, relations, [], [], false, false);
        if (count) {
            const currencyCount = await this.vendorCurrencyService.listByQueryBuilder(limit, offset, select, whereConditions, search, relations, [], [], true, false);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the currency count',
                data: currencyCount,
            });
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete vendor currency list.',
            data: currencyList,
        };
        return response.status(200).send(successResponse);
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
    @Authorized(['vendor', 'delete-currency'])
    public async deleteCurrency(@Param('id') currencyId: number, @Res() response: any): Promise<any> {
        const vendorCurrency = await this.vendorCurrencyService.findOne({
            where: {
                id: currencyId,
            },
        });
        if (!vendorCurrency) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid currency Id',
            };
            return response.status(400).send(errorResponse);
        }

        vendorCurrency.isDelete = 1;

        await this.vendorCurrencyService.update(vendorCurrency.id, vendorCurrency);
        const successResponse: any = {
            status: 1,
            message: 'Successfullly deleted the vendor currency',
        };
        return response.status(200).send(successResponse);
    }
}
