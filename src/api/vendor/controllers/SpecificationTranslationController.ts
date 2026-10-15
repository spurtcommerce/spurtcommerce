/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, Post, Body, Param, JsonController, Req, Res, Authorized, QueryParam } from 'routing-controllers';
import { SpecificationTranslation } from '../../core/models/SpecificationTranslation';
import { SpecificationService } from '../../core/services/SpecificationService';
import { SpecificationTranslationService } from '../../core/services/SpecificationTranslationService';
import { CreateSpecificationTranslation } from './requests/CreateSpecificationTranslationRequest';
import { FindManyOptions, Like } from 'typeorm';
import { Specification } from '../../core/models/Specification';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-specification-translation')
export class VendorSpecificationTranslationController {
    constructor(
        private specificationService: SpecificationService,
        private specificationTranslationService: SpecificationTranslationService
    ) {
        // --
    }

    // Create Specification Translation
    /**
     * @api {post} /api/vendor-specification-translation/specification/:id Add Specification Translation API
     * @apiGroup Specification-Translation
     * @apiParam (Request body) {Number} id specification id (Required)
     * @apiParam (Request body) {Number} languageId language id (Required)
     * @apiParam (Request body) {String{..255}} name name (Required)
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *    "specificationTranslation": [
     *        {
     *            "languageId": 1,
     *            "name": ""
     *        }
     *    ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully created new specification translation.",
     *    "data": [
     *        {
     *            "specificationId": 1,
     *            "languageId": 1,
     *            "name": "",
     *            "createdDate": "",
     *            "id": 1
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/vendor-specification-translation/specification
     * @apiErrorExample {json} Add Specification Translation Error
     * HTTP/1.1 500 Internal Server Error
     */

    @Post('/specification/:id')
    @Authorized(['vendor'])
    public async createSpecificationTranslation(@Body({ validate: true }) payload: CreateSpecificationTranslation, @Param('id') specificationId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const getSpecification = await this.specificationService.findOne({
            where: {
                id: specificationId,
                tenantId: request.user.tenantId,
            },
        });

        if (!getSpecification) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid specification id',
            };
            return response.status(400).send(errorResponse);
        }

        const spepcificationTranslationSave = [];

        for (const specTrans of payload.specificationTranslation) {
            const getSpecificationTranslation = await this.specificationTranslationService.findOne({
                where: {
                    specificationId,
                    languageId: specTrans.languageId,
                },
            });
            const newSpecificationTranslation = new SpecificationTranslation();

            if (getSpecificationTranslation) {
                newSpecificationTranslation.id = getSpecificationTranslation.id;
            }

            newSpecificationTranslation.specificationId = specificationId;
            newSpecificationTranslation.languageId = specTrans.languageId;
            newSpecificationTranslation.name = specTrans.name;

            const specificationTranslationSave = await this.specificationTranslationService.create(newSpecificationTranslation);

            spepcificationTranslationSave.push({ ...specificationTranslationSave });
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully created new specification translation.',
            data: spepcificationTranslationSave,
        };
        return response.status(200).send(successResponse);

    }

    // Specification Translation List
    /**
     * @api {get} /api/vendor-specification-translation/specification Specification Translation List API
     * @apiGroup Specification-Translation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully got specification translation list",
     *    "data": [
     *        {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedBy": 1,
     *            "modifiedDate": "",
     *            "id": 1,
     *            "name": "",
     *            "slug": "",
     *            "isActive": 1,
     *            "isDelete": 1,
     *            "specificationTranslation": [
     *                {
     *                    "createdBy": 1,
     *                    "createdDate": "",
     *                    "modifiedBy": 1,
     *                    "modifiedDate": "",
     *                    "id": 1,
     *                    "specificationId": 1,
     *                    "languageId": 1,
     *                    "name": ""
     *                }
     *            ]
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/vendor-specification-translation/specification
     * @apiErrorExample {json} Specification List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/specification')
    @Authorized(['vendor'])
    public async SpecificationTranslationList(@Res() response: any, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number): Promise<any> {

        const condition: FindManyOptions<Specification> = {};

        condition.relations = ['specificationTranslation'];

        if (keyword?.trim()) {
            condition.where = {
                name: Like(`%${keyword}%`),
            };
        }

        if (limit) {
            condition.take = limit;
            if (offset) {
                condition.skip = offset;
            }
        }

        const getSpecificationTranslation = await this.specificationService.find(condition);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got specification translation list',
            data: getSpecificationTranslation,
        };
        return response.status(200).send(successResponse);
    }

    // Specification Translation Detail
    /**
     * @api {get} /api/vendor-specification-translation/specification/:id Specification Translation Detail API
     * @apiGroup Specification-Translation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully got specification translation detail"
     *    "data": {
     *        {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedBy": 1,
     *            "modifiedDate": "",
     *            "id": 1,
     *            "name": "",
     *            "slug": "",
     *            "isActive": 1,
     *            "isDelete": 0,
     *            "specificationTranslation": [
     *                {
     *                    "createdBy": 1,
     *                    "createdDate": "",
     *                    "modifiedBy": 1,
     *                    "modifiedDate": "",
     *                    "id": 1,
     *                    "specificationId": 1,
     *                    "languageId": 1,
     *                    "name": ""
     *                }
     *            ]
     *        }
     *    }
     * }
     * @apiSampleRequest /api/vendor-Specification-translation/specification
     * @apiErrorExample {json} Specification Translation Detail error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/specification/:id')
    @Authorized(['vendor'])
    public async SpecificationDetail(@Param('id') specificationId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const getSpecificationTranslation = await this.specificationService.findOne({
            where: {
                id: specificationId,
                tenantId: request.user.tenantId,
            },
            relations: ['specificationTranslation'],
        });
        if (!getSpecificationTranslation) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Specification Translation Id',
            };
            return response.status(400).send(errorResponse);
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully got specification translation detail',
            data: getSpecificationTranslation,
        };
        return response.status(200).send(successResponse);
    }

}
