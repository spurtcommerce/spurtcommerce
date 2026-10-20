/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, Put, Delete, Param, QueryParam, Post, Body, JsonController, Authorized, Res, Req } from 'routing-controllers';
import { Variant } from '../../core/models/Variant';
import { VariantValue } from '../../core/models/VariantValue';
import { VariantService } from '../../core/services/VariantService';
import { VariantValueService } from '../../core/services/VariantValueService';
import { UpdateVariant } from './requests/UpdateVariantRequest';
import { CreateVariant } from './requests/CreateVariantRequest';
import { ProductVarientService } from '../../core/services/ProductVarientService';
import { ProductVarientOptionDetailService } from '../../core/services/ProductVarientOptionDetailService';
import { In } from 'typeorm';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-variant')
export class VendorMasterVariantsController {
    constructor(
        private variantService: VariantService,
        private variantValueService: VariantValueService,
        private productVarientOptionDetailService: ProductVarientOptionDetailService,
        private productVarientService: ProductVarientService
    ) {
        // ----
    }

    // Create Variant API
    /**
     * @api {Post} /api/variants Add Variant API
     * @apiGroup Variants
     * @apiParam (Request body) {String} [type] type
     * @apiParam (Request body) {String{..255}} name name
     * @apiParam (Request body) {String} sortOrder sortOrder
     * @apiParam (Request body) {Object} [variantValue] variantValue
     * @apiParam (Request body) {String}  variantValue.valueName valueName
     * @apiParam (Request body) {String}  variantValue.sortOrder valueName
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "type" : "",
     *      "name" : "",
     *      "sortOrder" : "",
     *      "variantValue" : [
     *          {
     *               "valueName" : "",
     *               "sortOrder" : "",
     *          }
     *      ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "The vendor variant was created successfully.",
     *      "data": {
     *          "name": "",
     *          "sortOrder": "",
     *          "type": "",
     *          "variantValue": ""
     *          "isActive": 1
     *      }
     *      "status": 1
     * }
     * @apiSampleRequest /api/variants
     * @apiErrorExample {json} createPage error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized(['vendor', 'create-product-variant'])
    public async createPage(@Body({ validate: true }) variantParam: CreateVariant, @Res() response: any, @Req() request: any): Promise<any> {

        const variantValues: VariantValue[] = [];

        for (const variantVal of variantParam.variantValue) {
            const variantValue = new VariantValue();
            variantValue.value = variantVal.value;
            variantValue.sortOrder = variantVal.sortOrder;
            variantValues.push(variantValue);
        }

        const variant = new Variant();
        variant.name = variantParam.name;
        variant.sortOrder = variantParam.sortOrder;
        variant.type = variantParam.type;
        variant.tenantId = request.user.tenantId;
        variant.variantValue = variantValues;

        const variantSave = await this.variantService.create(variant);

        return response.status(200).send({
            status: 1,
            message: 'The vendor variant was created successfully.',
            data: variantSave,
        });

    }

    // Variants List API
    /**
     * @api {Get} /api/variants Variant List API
     * @apiGroup Variants
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get varient list",
     *      "data":{
     *          "id" : 1,
     *          "name" : "",
     *          "type" : "",
     *          "sortOrder" : 1,
     *          "variantValues": []
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/variants
     * @apiErrorExample {json} Variantlist error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized(['vendor', 'list-product-variant'])
    public async variantList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {
        const select = ['id', 'type', 'name', 'sortOrder'];
        const whereConditions: any = [
            {
                name: 'tenantId',
                value: request.user.tenantId,
            },
        ];

        if (keyword?.trim()) {
            whereConditions.push({
                name: 'name',
                op: 'like',
                value: keyword,
            });
        }
        const variantList = await this.variantService.list(limit, offset, select, [], whereConditions, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got variant count.',
                data: variantList,
            };
            return response.status(200).send(successRes);
        }
        const promise = variantList.map(async (result: any) => {
            const data: any = await this.variantValueService.find({ where: { variantId: result.id }, order: { sortOrder: 'ASC' } });
            const temp: any = result;
            if (data) {
                temp.variantValues = data;
                const availablevarientVal = temp.variantValues.map(async (val: any) => {
                    const availableVarientValue = await this.productVarientOptionDetailService.findOne({
                        where: {
                            variantValueId: val.id,
                        },
                    });
                    if (availableVarientValue) {
                        Object.assign(val, { availedVarientValue: 1 });
                    } else {
                        Object.assign(val, { availedVarientValue: 0 });
                    }
                    return val;
                });
                await Promise.all(availablevarientVal);
            } else {
                temp.variantValue = [];
            }
            return temp;
        });
        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got variant list.',
            data: value,
        };
        return response.status(200).send(successResponse);
    }

    // Update Variants API
    /**
     * @api {Put} /api/variants/:id Update Variant API
     * @apiGroup Variants
     * @apiParam (Request body) {String} [type] type
     * @apiParam (Request body) {String} name name
     * @apiParam (Request body) {Number{..9999}} sortOrder sortOrder
     * @apiParam (Request body) {Object} [variantValue] variantValue
     * @apiParam (Request body) {String} variantValue.valueName valueName
     * @apiParam (Request body) {String} variantValue.sortOrder sortOrder
     * @apiParam (Request body) {String} variantValue.id varient value id
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "type" : "",
     *      "name" : "",
     *      "sortOrder" : "",
     *      "variantValue" : [
     *          {
     *               "id" : 1,
     *               "valueName" : "",
     *               "sortOrder" : "",
     *          }
     *      ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " Variant are updated successfully",
     *      "data": {
     *        "id": 1,
     *        "name": "",
     *        "sortOrder": 1,
     *        "type": "",
     *        "variantValue": [
     *           {
     *             "id": 1,
     *             "value": "",
     *             "sortOrder":""
     *           }
     *         ]
     *       }
     *      "status": 1
     * }
     * @apiSampleRequest /api/variants/:id
     * @apiErrorExample {json} updateVariants error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    @Authorized(['vendor', 'edit-product-variant'])
    public async updateVariant(@Param('id') id: number, @Body({ validate: true }) variantParam: UpdateVariant, @Req() request: any, @Res() response: any): Promise<any> {
        const variant = await this.variantService.findOne({
            where: {
                id,
                tenantId: request.user.tenantId,
            },
        });
        if (!variant) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid varient Id.',
            };
            return response.status(400).send(errorResponse);
        }

        if (variantParam.deleteVariantValueIds?.length) {
            const variantValueProduct = await this.productVarientOptionDetailService.findOne({
                where: {
                    variantValueId: In(variantParam.deleteVariantValueIds),
                },
            });

            if (variantValueProduct) {
                return response.status(400).send({
                    status: 0,
                    message: `Variant Value Can't Be deleted As value are mapped to product.`,
                    data: variantValueProduct.variantValueId,
                });
            }

            await this.variantValueService.delete({ id: In(variantParam.deleteVariantValueIds) });
        }

        const variantValues: VariantValue[] = [];

        for (const variantVal of variantParam.variantValue) {

            const variantValue = new VariantValue();

            if (variantVal.id) {
                variantValue.id = variantVal.id;
            }

            variantValue.value = variantVal.value;
            variantValue.sortOrder = variantVal.sortOrder;

            variantValues.push(variantValue);
        }

        variant.name = variantParam.name;
        variant.sortOrder = variantParam.sortOrder;
        variant.type = variantParam.type;
        variant.variantValue = variantValues;

        const variantSave = await this.variantService.create(variant);

        return response.status(200).send({
            status: 1,
            message: 'Successfully Updated variant.',
            data: variantSave,
        });
    }

    // Delete Varient API
    /**
     * @api {Delete} /api/variants/:id Delete Varient API
     * @apiGroup Variants
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted variant.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/variants/:id
     * @apiErrorExample {json} deleteVariant error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized(['vendor', 'delete-product-variant'])
    public async deleteVariant(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {

        const variant = await this.variantService.findOne({
            where: {
                id,
                tenantId: request.user.tenantId,
            },
        });
        if (!variant) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid varient Id.',
            });
        }

        const productVariantExist = await this.productVarientService.findOne({ where: { variantId: id } });

        if (productVariantExist) {
            return response.status(400).send({
                status: 0,
                message: 'You cannot delete this varient, as products are mapped to it.',
            });
        }

        await this.variantService.delete(id);

        return response.status(200).send({
            status: 1,
            message: 'Successfully deleted the varient.',
        });

    }

    // variant Detail
    /**
     * @api {Get} /api/variants/variant-detail Variant Detail API
     * @apiGroup Variants
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got variant detail.",
     *      "data": {
     *          "id": 1,
     *          "name": "",
     *          "sortOrder": "",
     *          "type": "",
     *          "variantValue": [
     *            {
     *              "id": 1,
     *              "value": "",
     *              "sortOrder": ""
     *            },
     *            {
     *              "id": 1,
     *              "value": "",
     *              "sortOrder": ""
     *            }
     *          ]
     *      "status": 1
     * }
     * @apiSampleRequest /api/variants/variant-detail
     * @apiErrorExample {json} variant Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/:id')
    @Authorized(['vendor', 'list-product-variant'])
    public async variantDetail(@Param('id') variantId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const variant = await this.variantService.findOne({
            where: {
                id: variantId,
                tenantId: request.user.tenantId,
            },
        });
        if (!variant) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid variant ID.',
            };
            return response.status(400).send(errorResponse);
        }
        variant.variantValue = await this.variantValueService.find({
            where: {
                variantId: variant.id,
            },
            order: {
                sortOrder: 'ASC',
            },
        });

        const successResponse: any = {
            status: 1,
            message: 'Successfully got variant detail.',
            data: variant,
        };
        return response.status(200).send(successResponse);
    }
}
