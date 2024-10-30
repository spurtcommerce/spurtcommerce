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
    Put,
    Delete,
    Post,
    Body,
    JsonController,
    Authorized,
    Res,
    Req,
    QueryParam,
    Param
} from 'routing-controllers';
import { TaxService } from '../../core/services/TaxService';
import { Tax } from '../../core/models/Tax';
import { CreateTaxRequest } from './requests/CreateTaxRequest';
import { ProductService } from '../../core/services/ProductService';
import { Not } from 'typeorm';

@JsonController('/tax')
export class TaxController {
    constructor(private taxService: TaxService, private productService: ProductService) {
    }

    // create tax API
    /**
     * @api {post} /api/tax/add-tax Add Tax API
     * @apiGroup Tax
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..255}} taxName Tax taxName
     * @apiParam (Request body) {Number} [taxPercentage] Tax taxPercentage
     * @apiParam (Request body) {Number} taxStatus Tax taxStatus
     * @apiParamExample {json} Input
     * {
     *      "taxName" : "",
     *      "taxPercentage" : "",
     *      "taxStatus" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new tax.",
     *      "status": "1",
     *      "data": {
     *         "taxName": "",
     *         "taxPercentage": "",
     *         "taxStatus": "",
     *         "createdDate": "",
     *         "taxId": ""
     *         }
     * }
     * @apiSampleRequest /api/tax/add-tax
     * @apiErrorExample {json} Zone error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-tax')
    @Authorized(['admin', 'create-tax'])
    public async addTax(@Body({ validate: true }) createParam: CreateTaxRequest, @Res() response: any): Promise<any> {
        const existTax = await this.taxService.findOne({ where: {taxName: createParam.taxName}});
        if (existTax) {
            const errorResponse: any = {
                status: 0,
                message: 'Tax name already exits',
            };
            return response.status(400).send(errorResponse);
        }
        const newTax = new Tax();
        newTax.taxName = createParam.taxName;
        newTax.taxPercentage = createParam.taxPercentage;
        newTax.taxStatus = createParam.taxStatus;
        const taxSave = await this.taxService.create(newTax);
        if (taxSave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created new tax',
                data: taxSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to create tax',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // update Tax API
    /**
     * @api {put} /api/tax/update-tax/:taxId Update Tax API
     * @apiGroup Tax
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..255}} taxName Tax taxName
     * @apiParam (Request body) {string} [taxPercentage] Tax taxPercentage
     * @apiParam (Request body) {String} taxStatus Tax taxStatus
     * @apiParamExample {json} Input
     * {
     *      "taxName" : "",
     *      "taxPercentage" : "",
     *      "taxStatus" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Tax.",
     *      "status": "1",
     *      "data": {
     *              "taxName": "",
     *              "taxPercentage": "",
     *              "taxStatus": "",
     *              "createdDate": "",
     *              "taxId": ""
     *              }
     * }
     * @apiSampleRequest /api/tax/update-tax/:taxId
     * @apiErrorExample {json} Tax error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-tax/:taxId')
    @Authorized(['admin', 'edit-tax'])
    public async updateTax(@Param('taxId') taxId: number, @Body({ validate: true }) updateParam: CreateTaxRequest, @Res() response: any): Promise<any> {

        const tax = await this.taxService.findOne({
            where: {
                taxId,
            },
        });
        if (!tax) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid tax Id',
            };
            return response.status(400).send(errorResponse);
        }
        const existTax = await this.taxService.findOne({ where: {taxName: updateParam.taxName, taxId: Not(tax.taxId) }});
        if (existTax) {
            const errorResponse: any = {
                status: 0,
                message: 'Tax name already exits',
            };
            return response.status(400).send(errorResponse);
        }

        tax.taxName = updateParam.taxName;
        tax.taxPercentage = updateParam.taxPercentage;
        tax.taxStatus = updateParam.taxStatus;
        const taxSave = await this.taxService.create(tax);
        if (taxSave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the tax',
                data: taxSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the tax',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Tax List API
    /**
     * @api {get} /api/tax/tax-list Tax List API
     * @apiGroup Tax
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get tax list",
     *      "status": "1",
     *      "data": {
     *              "taxId": ""
     *              "taxName": "",
     *              "taxPercentage": "",
     *              "taxStatus": "",
     *              }
     * }
     * @apiSampleRequest /api/tax/tax-list
     * @apiErrorExample {json} Tax error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/tax-list')
    public async taxList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['taxId', 'taxName', 'taxPercentage', 'taxStatus'];

        const WhereConditions = [];

        if (status === '0' || status) {
            WhereConditions.push({
                name: 'taxStatus',
                value: status,
            });
        }

        const taxList = await this.taxService.list(limit, offset, select, WhereConditions, keyword, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get all tax list',
            data: taxList,
        };
        return response.status(200).send(successResponse);
    }

    // delete Tax API
    /**
     * @api {delete} /api/tax/delete-tax/:taxId Delete Tax API
     * @apiGroup Tax
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "taxId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Tax.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/tax/delete-tax/:taxId
     * @apiErrorExample {json} Tax error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-tax/:taxId')
    @Authorized(['admin', 'delete-tax'])
    public async deleteTax(@Param('taxId') taxId: number, @Res() response: any, @Req() request: any): Promise<any> {

        const tax = await this.taxService.findOne({
            where: {
                taxId,
            },
        });
        if (!tax) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid tax Id',
            };
            return response.status(400).send(errorResponse);
        }
        const product = await this.productService.findOne({
            where: {
                taxType : 2, taxValue : tax.taxId,
            },
        });
        if (product) {
            const errResponse: any = {
                status: 0,
                message: 'You cannot delete this tax as it is already mapped to a product',
            };
            return response.status(400).send(errResponse);
        }

        const deleteTax = await this.taxService.delete(tax);
        if (deleteTax) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the tax',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the tax',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
