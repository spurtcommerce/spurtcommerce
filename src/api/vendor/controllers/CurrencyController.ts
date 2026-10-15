/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, JsonController, Authorized, Res, QueryParam, UseBefore } from 'routing-controllers';
import { VendorTranslationMiddleware } from '../../core/middlewares/VendorTranslationMiddleware';
import { Service } from 'typedi';
import { CurrencyService } from '../../core/services/CurrencyService';

@Service()
@UseBefore(VendorTranslationMiddleware)
@JsonController('/vendor-currency')
export class VendorCurrencyController {
    constructor(
        private currencyService: CurrencyService
    ) {
    }

    /**
     * @api {get} /api/vendor-currency/master-currency Master Currency List
     * @apiGroup Currency
     * @apiName MasterCurrencyList
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiQuery {Number} [limit]            Number of records to return
     * @apiQuery {Number} [offset]           Pagination offset
     * @apiQuery {String} [keyword]          Search keyword for currency title or code
     * @apiQuery {String} [status]           Filter by status
     * @apiQuery {Number|Boolean} [count]    If true/1, returns total count
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got the complete currency list",
     *         "data": [
     *             {
     *                 "currencyId": 73,
     *                 "title": "US Dollar",
     *                 "code": "USD",
     *                 "symbolLeft": "$",
     *                 "symbolRight": null,
     *                 "isActive": 1
     *             }
     *         ]
     *     }
     *
     * @apiSampleRequest /api/vendor-currency/master-currency
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

}
