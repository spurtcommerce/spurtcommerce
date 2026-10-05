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

}
