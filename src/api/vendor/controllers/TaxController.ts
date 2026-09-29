/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, Delete, JsonController, Authorized, Res, Req, QueryParam, Post, Body } from 'routing-controllers';
import { VendorTaxService } from '../../core/services/VendorTaxService';
import { Service } from 'typedi';
import { TaxService } from '../../core/services/TaxService';
import { In } from 'typeorm';
import { VendorTax } from '../../core/models/VendorTax';

@Service()
@JsonController('/vendor-tax')
export class VendorTaxController {
    constructor(
        private vendorTaxService: VendorTaxService,
        private taxService: TaxService
    ) {
        // --
    }

    // Tax List API
    /**
     * @api {get} /api/vendor-tax Tax List API
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
     * @apiSampleRequest /api/vendor-tax
     * @apiErrorExample {json} Tax error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized(['vendor', 'list-setting-localization'])
    public async taxList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {
        const select = ['VendorTax.id', 'VendorTax.isActive', 'VendorTax.isDelete', 'VendorTax.createdDate', 'VendorTax.modifiedDate', 'tax.taxId', 'tax.taxName', 'tax.taxPercentage', 'tax.taxStatus'];
        const relations = [
            {
                tableName: 'VendorTax.tax',
                aliasName: 'tax',
                op: 'left',
            },
        ];

        const whereConditions: any = [
            {
                name: 'VendorTax.tenantId',
                op: 'and',
                value: request.user.tenantId,
            },
            {
                name: 'VendorTax.isDelete',
                op: 'and',
                value: 0,
            },
        ];

        if (status === '0' || status) {
            whereConditions.push({
                name: 'VendorTax.isActive',
                op: 'and',
                value: status,
            });
        }

        if (count) {
            const vendorTaxCount = await this.vendorTaxService.listByQueryBuilder(limit, offset, select, whereConditions, [], relations, [], [], true, false);
            return response.status(200).send({
                status: 1,
                message: 'Successfully get all vendor tax count.',
                data: vendorTaxCount,
            });
        }
        const vendorTaxList = await this.vendorTaxService.listByQueryBuilder(limit, offset, select, whereConditions, [], relations, [], [], false, false);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get all vendor tax list.',
            data: vendorTaxList,
        };
        return response.status(200).send(successResponse);
    }

    // delete Tax API
    /**
     * @api {delete} /api/vendor-tax Delete Tax API
     * @apiGroup Tax
     * @apiHeader {String} Authorization
     *
     * @apiParam (Request body) {String} vendorTaxIds Comma-separated list of vendorTax IDs
     *
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
     * @apiSampleRequest /api/vendor-tax
     * @apiErrorExample {json} Tax error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete()
    @Authorized(['vendor', 'list-setting-localization'])
    public async deleteTax(@Body({ validate: true }) taxParam: { vendorTaxIds: string }, @Res() response: any, @Req() request: any): Promise<any> {

        const vendorTaxIds: any = taxParam.vendorTaxIds.split(',');

        const checkTaxExist = await this.vendorTaxService.find({ where: { id: In(vendorTaxIds), tenantId: request.user.tenantId } });

        if (checkTaxExist.length !== vendorTaxIds.length) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid vendor tax.',
            });
        }

        await this.vendorTaxService.delete(vendorTaxIds);
        const successResponse: any = {
            status: 1,
            message: 'Successfully remove the vendor tax.',
        };
        return response.status(200).send(successResponse);
    }

    // Vendor Master Tax List API
    /**
     * @api {get} /api/vendor-tax/master-tax Vendor Master Tax List API
     * @apiGroup Tax
     * @apiHeader {String} Authorization
     *
     * @apiParam (Query params) {Number} limit limit
     * @apiParam (Query params) {Number} offset offset
     * @apiParam (Query params) {String} keyword keyword
     * @apiParam (Query params) {String} status status
     * @apiParam (Query params) {Number} count count should be number or boolean
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully get all tax list",
     *   "data": []
     * }
     *
     * @apiSampleRequest /api/vendor-tax/master-tax
     *
     * @apiErrorExample {json} Tax error
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Unable to fetch tax list"
     * }
     */
    @Get('/master-tax')
    @Authorized(['vendor', 'list-setting-localization'])
    public async masterTaxList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['taxId', 'taxName', 'taxPercentage', 'taxStatus'];
        const whereConditions = [];
        if (status === '0' || status) {
            whereConditions.push({
                name: 'taxStatus',
                value: status,
            });
        }
        const taxList = await this.taxService.list(limit, offset, select, whereConditions, keyword, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get all tax list',
            data: taxList,
        };
        return response.status(200).send(successResponse);
    }

    // Update Vendor Taxes API
    /**
     * @api {post} /api/vendor-tax Update Vendor Taxes API
     * @apiGroup Tax
     * @apiHeader {String} Authorization
     *
     * @apiParam (Request body) {String} taxIds Comma-separated list of tax IDs
     * @apiParam (Request body) {String} deleteVendorTaxIds Comma-separated list of deleteVendorTax IDs
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully updated vendor tax."
     * }
     *
     * @apiSampleRequest /api/vendor-tax
     *
     * @apiErrorExample {json} Tax error
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Unable to update vendor tax."
     * }
     */
    @Post()
    @Authorized(['vendor', 'list-setting-localization'])
    public async mapVendorTax(@Body({ validate: true }) taxParam: { taxIds: string, deleteVendorTaxIds: string }, @Req() request: any, @Res() response: any): Promise<any> {
        const taxIds: string[] = taxParam.taxIds.split(',');
        if (taxParam.taxIds !== '') {
            const existingMappings = await this.vendorTaxService.find({
                where: {
                    tenantId: request.user.tenantId,
                    taxId: In(taxIds),
                },
            });
            const existingIds = existingMappings.map(tax => tax.taxId);

            const newIds = taxIds.map(Number).filter(id => !existingIds.includes(id));

            if (newIds.length) {
                const vendorstax = newIds.map(taxId => {
                    const vendortax = new VendorTax();
                    vendortax.taxId = +taxId;
                    vendortax.tenantId = request.user.tenantId;
                    return vendortax;
                });
                await this.vendorTaxService.create(vendorstax);
            }
        }

        const vendorTaxIds: any = taxParam.deleteVendorTaxIds.split(',');
        if (taxParam.deleteVendorTaxIds !== '') {
            const checkTaxExist = await this.vendorTaxService.find({ where: { id: In(vendorTaxIds), tenantId: request.user.tenantId } });
            if (checkTaxExist.length !== vendorTaxIds.length) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid vendor tax.',
                });
            }

            await this.vendorTaxService.delete(vendorTaxIds);
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully updated vendor tax.',
        };
        return response.status(200).send(successResponse);
    }
}
