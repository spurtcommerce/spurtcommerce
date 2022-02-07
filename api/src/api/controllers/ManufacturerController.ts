/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Get, Put, Post, Delete, Body, JsonController, Authorized, Res, Req, QueryParam,
    Param
} from 'routing-controllers';
import * as AWS from 'aws-sdk';
import {CreateManufacturer} from './requests/CreateManufacturerRequest';
import {Manufacturer} from '../models/ManufacturerModel';
import {ManufacturerService} from '../services/ManufacturerService';
import {aws_setup, env} from '../../env';
import {UpdateManufacturer} from './requests/UpdateManufacturerRequest';
import {DeleteManufacturer} from './requests/DeleteManufacturerRequest';
import {S3Service} from '../services/S3Service';
import {ImageService} from '../services/ImageService';

// S3 SetUp
AWS.config.update({
    accessKeyId: aws_setup.AWS_ACCESS_KEY_ID,
    secretAccessKey: aws_setup.AWS_SECRET_ACCESS_KEY,
    region: aws_setup.AWS_DEFAULT_REGION,
});

@JsonController('/manufacturer')
export class ManufacturerController {
    constructor(private manufacturerService: ManufacturerService, private s3Service: S3Service,
                private imageService: ImageService) {
    }

    // Create Manufacturer API
    /**
     * @api {post} /api/manufacturer/create-manufacturer Create Manufacturer API
     * @apiGroup Manufacturer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} name Manufacturer name
     * @apiParam (Request body) {String} image Manufacturer image
     * @apiParam (Request body) {number} sortOrder Manufacturer sortOrder
     * @apiParam (Request body) {number} status status
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "image" : "",
     *      "imagePath" : "",
     *      "sortOrder" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new Manufacturer.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/manufacturer/create-manufacturer
     * @apiErrorExample {json} Manufacturer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/create-manufacturer')
    @Authorized()
    public async createManufacturer(@Body({validate: true}) manufacturer: CreateManufacturer, @Req() request: any, @Res() response: any): Promise<any> {
        const image = manufacturer.image;
        if (image) {
            const path = 'manufacturer/';
            const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const type = image.split(';')[0].split('/')[1];
            const name = 'Img_' + Date.now() + '.' + type;
            let val: any;
            if (env.imageserver === 's3') {
                val = await this.s3Service.imageUpload((path + name), base64Data, type);
            } else {
                val = await this.imageService.imageUpload((path + name), base64Data);
            }
            console.log(val);
            const newManufacturer: any = new Manufacturer();
            newManufacturer.name = manufacturer.name;
            newManufacturer.image = name;
            newManufacturer.imagePath = path;
            newManufacturer.sortOrder = manufacturer.sortOrder;
            newManufacturer.isActive = manufacturer.status;
            await this.manufacturerService.create(newManufacturer);

            const successResponse: any = {
                status: 1,
                message: 'Successfully created a new Brand.',
                data: {name, path},
            };
            return response.status(200).send(successResponse);
        }
    }

    // Manufacturer List API
    /**
     * @api {get} /api/manufacturer/manufacturerlist Manufacturer List API
     * @apiGroup Manufacturer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} status 0->active 1->inactive
     * @apiParam (Request body) {Number} count count in number
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get manufacturer list",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/manufacturer/manufacturerlist
     * @apiErrorExample {json} Manufacturer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/manufacturerlist')
    @Authorized()
    public async manufacturerList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: number, @QueryParam('count')count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['manufacturerId', 'name', 'image', 'imagePath', 'sortOrder', 'isActive'];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            }, {
                name: 'isActive',
                op: 'where',
                value: status,
            },
        ];
        const WhereConditions = [];
        const manufacturerList: any = await this.manufacturerService.list(limit, offset, select, search, WhereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete brand list.',
            data: manufacturerList,
        };
        return response.status(200).send(successResponse);
    }

    // Update Manufacturer API
    /**
     * @api {put} /api/manufacturer/update-manufacturer/:id Update Manufacturer API
     * @apiGroup Manufacturer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} manufacturerId Manufacturer manufacturerId
     * @apiParam (Request body) {String} name Manufacturer name
     * @apiParam (Request body) {String} image Manufacturer image
     * @apiParam (Request body) {number} sortOrder Manufacturer sortOrder
     * @apiParam (Request body) {number} status Manufacturer status
     * @apiParamExample {json} Input
     * {
     *      "manufacturerId" : "",
     *      "name" : "",
     *      "image" : "",
     *      "sortOrder" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Manufacturer.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/manufacturer/update-manufacturer/:id
     * @apiErrorExample {json} Manufacturer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-manufacturer/:id')
    @Authorized()
    public async updateManufacturer(@Body({validate: true}) manufacturerParam: UpdateManufacturer, @Res() response: any, @Req() request: any): Promise<any> {

        const manufacturer = await this.manufacturerService.findOne({
            where: {
                manufacturerId: manufacturerParam.manufacturerId,
            },
        });
        if (!manufacturer) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid manufacturerId',
            };
            return response.status(400).send(errorResponse);
        }
        const image = manufacturerParam.image;
        if (image) {
            const type = image.split(';')[0].split('/')[1];
            const name = 'Img_' + Date.now() + '.' + type;
            const path = 'manufacturer/';
            const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            let val: any;
            if (env.imageserver === 's3') {
                val = await this.s3Service.imageUpload((path + name), base64Data, type);
            } else {
                val = await this.imageService.imageUpload((path + name), base64Data);
            }
            console.log(val);
            manufacturer.image = name;
            manufacturer.imagePath = path;
        }
        manufacturer.name = manufacturerParam.name;
        manufacturer.sortOrder = manufacturerParam.sortOrder;
        manufacturer.isActive = manufacturerParam.status;
        const manufacturerSave = await this.manufacturerService.create(manufacturer);

        if (manufacturerSave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the Brand.',
                data: manufacturerSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update Brand',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete single Manufacturer API
    /**
     * @api {delete} /api/manufacturer/delete-manufacturer/:id Delete Manufacturer API
     * @apiGroup Manufacturer
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "manufacturerId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Manufacturer.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/manufacturer/delete-manufacturer/:id
     * @apiErrorExample {json} Manufacturer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-manufacturer/:id')
    @Authorized()
    public async deleteManufacturer(@Param('id')id: number, @Res() response: any, @Req() request: any): Promise<Manufacturer> {

        const ManufacturerData = await this.manufacturerService.findOne({
            where: {
                manufacturerId : id,
            },
        });
        if (!ManufacturerData) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid manufacturerId',
            };
            return response.status(400).send(errorResponse);
        }

        const deleteManufacturer: any = await this.manufacturerService.delete(ManufacturerData.manufacturerId);
        if (!deleteManufacturer) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the Brand. ',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete manufacturer',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete Multiple Manufacturer API
    /**
     * @api {post} /api/manufacturer/delete-manufacturer Delete Multiple manufacturer API
     * @apiGroup Manufacturer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} manufacturerId  manufacturerId
     * @apiParamExample {json} Input
     * {
     * "manufacturerId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted manufacturer.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/manufacturer/delete-manufacturer
     * @apiErrorExample {json} manufacturerDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/delete-manufacturer')
    @Authorized()
    public async deleteMultipleManufacturer(@Body({validate: true}) deleteManufacturer: DeleteManufacturer , @Res() response: any, @Req() request: any): Promise<any> {

        const manufacturerIdNo = deleteManufacturer.manufacturerId.toString();
        const manufacturerid = manufacturerIdNo.split(',');
        for ( const id of manufacturerid ) {
            const dataId = await this.manufacturerService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid manufacturerId',
                };
                return response.status(400).send(errorResponse);
            } else {
                const deleteManufacturerId = parseInt(id, 10);
                await this.manufacturerService.delete(deleteManufacturerId);
            }
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully deleted manufacturer',
        };
        return response.status(200).send(successResponse);
    }
}
