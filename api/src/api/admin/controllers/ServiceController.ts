/*
 * spurtcommerce API
 * version 5.1.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, Put, Delete, Param, QueryParam, Post, Body, JsonController, Authorized, Req, Res } from 'routing-controllers';
import { Services } from '../../core/models/Service';
import { ServiceToCategory } from '../../core/models/ServiceToCategory';
import { ServiceImage } from '../../core/models/ServiceImage';
import { ServiceService } from '../../core/services/ServiceService';
import { ServiceToCategoryService } from '../../core/services/ServiceToCategoryService';
import { ServiceEnquiryService } from '../../core/services/ServiceEnquiryService';
import { ServiceCategoryService } from '../../core/services/ServiceCategoryService';
import { CreateService } from './requests/CreateServiceRequest';
import { DeleteEnquiry } from './requests/DeleteEnquiryRequest';
import { DeleteService } from './requests/DeleteServiceRequest';
import { ServiceImageService } from '../../core/services/ServiceImageService';
import * as fs from 'fs';

@JsonController('/service')
export class ServiceController {
    constructor(
        private serviceService: ServiceService,
        private serviceToCategoryService: ServiceToCategoryService,
        private serviceEnquiryService: ServiceEnquiryService,
        private serviceImageService: ServiceImageService,
        private serviceCategoryService: ServiceCategoryService) {
    }
    // Create Service API
    /**
     * @api {post} /api/service/add-service Add Service API
     * @apiGroup Service
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {string} categoryId CategoryId(required)
     * @apiParam (Request body) {String{..255}} title Service title(required)
     * @apiParam (Request body) {String} [description] Service description
     * @apiParam (Request body) {Number{..15}} mobile Service mobile(required)
     * @apiParam (Request body) {Number} [price] Service price
     * @apiParam (Request body) {String} [image] Service image
     * @apiParam (Request body) {String{..70}} [metaTagTitle] Service metaTagTitle(required)
     * @apiParam (Request body) {String{..160}} [metaTagDescription] Service metaTagDescription
     * @apiParam (Request body) {String{..255}} [metaTagKeyword] Service metaTagKeyword
     * @apiParam (Request body) {Number} status inactive-> 0, active-> 1 (required)
     * @apiParam (Request body) {Number} [defaultImage]
     * @apiParamExample {json} Input
     * {
     *      "categoryId" : [],
     *      "title" : "",
     *      "description" : "",
     *      "mobile" : "",
     *      "price" : "",
     *      "image" : "",
     *      "metaTagTitle" : "",
     *      "metaTagdescription" : "",
     *      "metaTagKeyword" : "",
     *      "status" : "",
     *      "image":[{
     *      "image":""
     *      "containerName":""
     *      "defaultImage":""
     *      }]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new Service.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/service/add-service
     * @apiErrorExample {json} Service error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-service')
    @Authorized(['admin', 'create-services'])
    public async addService(@Body({ validate: true }) serviceParam: CreateService, @Res() response: any): Promise<any> {
        const newService = new Services();
        newService.title = serviceParam.title;
        newService.description = serviceParam.description;
        newService.mobile = serviceParam.mobile;
        newService.price = serviceParam.price;
        newService.metaTagTitle = serviceParam.metaTagTitle;
        newService.metaTagDescription = serviceParam.metaTagDescription;
        newService.metaTagKeyword = serviceParam.metaTagKeyword;
        newService.isActive = serviceParam.status;
        const serviceSave = await this.serviceService.create(newService);
        // save service category
        if (serviceParam.serviceCategoryId) {
            const category: any = serviceParam.serviceCategoryId;
            for (const categoryId of category) {
                const newServiceToCategory: any = new ServiceToCategory();
                newServiceToCategory.serviceId = serviceSave.serviceId;
                newServiceToCategory.serviceCategoryId = categoryId;
                newServiceToCategory.isActive = 1;
                await this.serviceToCategoryService.create(newServiceToCategory);
            }
        }
        // Save Service Image
        const serviceImage: any = serviceParam.image;
        for (const imageRow of serviceImage) {
            const imageData = JSON.stringify(imageRow);
            const imageResult = JSON.parse(imageData);
            const newServiceImage = new ServiceImage();
            newServiceImage.serviceId = serviceSave.serviceId;
            newServiceImage.image = imageResult.image;
            newServiceImage.containerName = imageResult.containerName;
            newServiceImage.defaultImage = imageResult.defaultImage;
            await this.serviceImageService.create(newServiceImage);
        }
        if (serviceSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully added a new service',
                data: serviceSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create service',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Service List API
    /**
     * @api {get} /api/service/service-list Service List API
     * @apiGroup Service
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status Status
     * @apiParam (Request body) {Number} price=1/2 if 1->asc 2->desc
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get service list",
     *      "data":"{
     *              "serviceId",
     *              "title",
     *              "mobile",
     *              "description",
     *              "price",
     *              "isActive",
     *              "createdDate",
     *      }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/service/service-list
     * @apiErrorExample {json} Service error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/service-list')
    @Authorized(['admin', 'list-services'])
    public async serviceList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('price') price: number,
                             @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['serviceId', 'title', 'description', 'mobile', 'price', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'isActive', 'createdDate'];
        const search = [
            {
                name: 'title',
                op: 'like',
                value: keyword,
            }, {
                name: 'isActive',
                op: 'like',
                value: status,
            }];
        const WhereConditions = [];
        const serviceList = await this.serviceService.list(limit, offset, select, search, WhereConditions, price, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got count',
                data: serviceList,
            };
            return response.status(200).send(successRes);
        }
        const services = serviceList.map(async (value: any) => {
            const defaultValue = await this.serviceImageService.findAll({
                select: ['image', 'containerName', 'defaultImage'],
                where: { serviceId: value.serviceId },
            });
            const categoryValue = await this.serviceToCategoryService.find({
                select: ['serviceId', 'serviceCategoryId'],
                where: { serviceId: value.serviceId },
            }).then((val) => {
                const category = val.map(async (values: any) => {
                    const categoryNames = await this.serviceCategoryService.findOne({ serviceCategoryId: values.serviceCategoryId });
                    const tempVAL: any = values;
                    if (categoryNames !== undefined) {
                        tempVAL.categoryName = categoryNames.name;
                    } else {
                        tempVAL.categoryName = '';
                    }
                    return tempVAL;
                });
                const categoryFinalData = Promise.all(category);
                return categoryFinalData;
            });
            const temp: any = value;
            temp.serviceImage = defaultValue;
            temp.category = categoryValue;
            return temp;
        });
        const results = await Promise.all(services);
        const successResponse: any = {
            status: 1,
            message: 'successfully got the complete service list',
            data: results,
        };
        return response.status(200).send(successResponse);
    }
    // Update Service API
    /**
     * @api {put} /api/service/update-service/:id Update Service API
     * @apiGroup Service
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} categoryId CategoryId(required)
     * @apiParam (Request body) {String{..255}} title Service title(required)
     * @apiParam (Request body) {String} [description] Service description
     * @apiParam (Request body) {Number{..15}} mobile Service mobile(required)
     * @apiParam (Request body) {Number} [price] Service price
     * @apiParam (Request body) {String} [image] Service image
     * @apiParam (Request body) {String{..70}} [metaTagTitle] Service metaTagTitle(required)
     * @apiParam (Request body) {String{..160}} [metaTagDescription] Service metaTagDescription
     * @apiParam (Request body) {String{..255}} [metaTagKeyword] Service metaTagKeyword
     * @apiParam (Request body) {Number} status inactive-> 0, active-> 1 (required)
     * @apiParam (Request body) {Number} [defaultImage]
     * @apiParamExample {json} Input
     * {
     *      "categoryId" : "",
     *      "title" : "",
     *      "description" : "",
     *      "mobile" : "",
     *      "price" : "",
     *      "image" : "",
     *      "metaTagTitle" : "",
     *      "metaTagdescription" : "",
     *      "metaTagKeyword" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated service.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/service/update-service/:id
     * @apiErrorExample {json} Service error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-service/:id')
    @Authorized(['admin', 'edit-services'])
    public async updateService(@Param('id') id: number, @Body({ validate: true }) serviceParam: CreateService, @Res() response: any): Promise<any> {
        const service = await this.serviceService.findOne({ where: { serviceId: id } });
        if (!service) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid service Id',
            };
            return response.status(400).send(errorResponse);
        }
        service.title = serviceParam.title;
        service.description = serviceParam.description;
        service.mobile = serviceParam.mobile;
        service.price = serviceParam.price;
        service.metaTagTitle = serviceParam.metaTagTitle;
        service.metaTagDescription = serviceParam.metaTagDescription;
        service.metaTagKeyword = serviceParam.metaTagKeyword;
        service.isActive = serviceParam.status;
        const serviceSave = await this.serviceService.create(service);
        const findCategory: any = await this.serviceToCategoryService.find({
            where: {
                serviceId: serviceSave.serviceId,
            },
        });
        if (findCategory) {
            // delete category id mapped with service
            this.serviceToCategoryService.delete({ serviceId: serviceSave.serviceId });
        }
        // save service category
        if (serviceParam.serviceCategoryId) {
            const category: any = serviceParam.serviceCategoryId;
            for (const categoryId of category) {
                const newServiceToCategory: any = new ServiceToCategory();
                newServiceToCategory.serviceId = serviceSave.serviceId;
                newServiceToCategory.serviceCategoryId = categoryId;
                newServiceToCategory.isActive = 1;
                await this.serviceToCategoryService.create(newServiceToCategory);
            }
        }
        // Delete previous images
        this.serviceImageService.delete({ serviceId: serviceSave.serviceId });
        // Save Service Image
        const serviceImage: any = serviceParam.image;
        for (const imageRow of serviceImage) {
            const imageData = JSON.stringify(imageRow);
            const imageResult = JSON.parse(imageData);
            const newServiceImage = new ServiceImage();
            newServiceImage.serviceId = serviceSave.serviceId;
            newServiceImage.image = imageResult.image;
            newServiceImage.containerName = imageResult.containerName;
            newServiceImage.defaultImage = imageResult.defaultImage;
            this.serviceImageService.create(newServiceImage);
        }
        if (serviceSave) {
            const successResponse: any = {
                status: 1,
                message: 'Sucessfully updated the service',
                data: serviceSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the service',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete Service API
    /**
     * @api {delete} /api/service/delete-service/:id Delete Service API
     * @apiGroup Service
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "serviceId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted service.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/service/delete-service/:id
     * @apiErrorExample {json} Service error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-service/:id')
    @Authorized(['admin', 'delete-services'])
    public async deleteservice(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const service = await this.serviceService.findOne({ where: { serviceId: id } });
        if (!service) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid service Id',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteService = await this.serviceService.delete(service);
        // delete service category
        await this.serviceToCategoryService.delete(service.serviceId);
        // Delete service images
        this.serviceImageService.delete({ serviceId: service.serviceId });
        if (!deleteService) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the service',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the service',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Delete Multiple Service API
    /**
     * @api {post} /api/service/delete-multiple-service Delete Multiple Service API
     * @apiGroup Service
     * @apiHeader {String} Authorization
     * @apiParam {Number} serviceId ServiceId
     * @apiParamExample {json} Input
     * {
     *   "ServiceId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Service.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/service/delete-multiple-service
     * @apiErrorExample {json} Service error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/delete-multiple-service')
    @Authorized()
    public async deleteMultipleService(@Body({ validate: true }) deleteService: DeleteService, @Res() response: any, @Req() request: any): Promise<any> {
        const serviceData = deleteService.serviceId.toString();
        const service: any = serviceData.split(',');
        const data: any = service.map(async (id: any) => {
            const dataId = await this.serviceService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid Service Id',
                };
                return response.status(400).send(errorResponse);
            } else {
                await this.serviceService.delete(dataId);
                // delete service category
                await this.serviceToCategoryService.delete(dataId.serviceId);
                // Delete service images
                await this.serviceImageService.delete({ serviceId: dataId.serviceId });
            }
        });
        const deleteServices = await Promise.all(data);
        if (deleteServices) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the Service',
            };
            return response.status(200).send(successResponse);
        }
    }
    // Service Enquiry List API
    /**
     * @api {get} /api/service/service-enquiry-list Service Enquiry List API
     * @apiGroup Service
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get service enquiry list",
     *      "data": {
     *              "serviceId": "",
     *              "name": "",
     *              "email": "",
     *              "mobile": "",
     *              "comments": ""
     *              }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/service/service-enquiry-list
     * @apiErrorExample {json} Enquiry error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/service-enquiry-list')
    @Authorized(['admin', 'list-enquiry'])
    public async serviceEnquiryList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['enquiryId', 'name', 'email', 'mobile', 'comments', 'isActive', 'createdDate'];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            },
             {
                name: 'email',
                op: 'like',
                value: keyword,
            },
        ];
        const WhereConditions = [];
        const serviceEnquiryList = await this.serviceEnquiryService.list(limit, offset, select, search, WhereConditions, count);
        if (count) {
            const successResponse: any = {
                status: 1,
                message: 'successfully got the count',
                data: serviceEnquiryList,
            };
            return response.status(200).send(successResponse);
        }
        if (serviceEnquiryList) {
            const successResponse: any = {
                status: 1,
                message: 'successfully got the enquiry list',
                data: serviceEnquiryList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to list enquiry',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Delete Service Enquiry API
    /**
     * @api {delete} /api/service/delete-service-enquiry/:id Delete Enquiry API
     * @apiGroup Service
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "enquiryId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted service Enquiry.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/service/delete-service-enquiry/:id
     * @apiErrorExample {json} Enquiry error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-service-enquiry/:id')
    @Authorized(['admin', 'delete-enquiry'])
    public async deleteEnquiry(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const enquiry = await this.serviceEnquiryService.findOne({ where: { enquiryId: id } });
        if (!enquiry) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Enquiry Id.',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteEnquiry = await this.serviceEnquiryService.delete(enquiry);
        if (!deleteEnquiry) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the enquiry',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the enquiry',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Delete Multiple Enquiry API
    /**
     * @api {post} /api/service/delete-multiple-enquiry Delete Multiple Enquiry API
     * @apiGroup Service
     * @apiHeader {String} Authorization
     * @apiParam {number} enquiryId EnquiryId
     * @apiParamExample {json} Input
     * {
     *   "EnquiryId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Enquiry.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/service/delete-multiple-enquiry
     * @apiErrorExample {json} Enquiry error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/delete-multiple-enquiry')
    @Authorized()
    public async deleteMultipleEnquiry(@Body({ validate: true }) deleteEnquires: DeleteEnquiry, @Res() response: any, @Req() request: any): Promise<any> {
        const enquiryData = deleteEnquires.enquiryId.toString();
        const enquiry: any = enquiryData.split(',');
        const data: any = enquiry.map(async (id: any) => {
            const dataId = await this.serviceEnquiryService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid Enquiry Id',
                };
                return response.status(400).send(errorResponse);
            } else {
                return await this.serviceEnquiryService.delete(dataId);
            }
        });
        const deleteEnquiry = await Promise.all(data);
        if (deleteEnquiry) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the Enquiry',
            };
            return response.status(200).send(successResponse);
        }
    }
    //  Service Export Excel Document Download
    /**
     * @api {get} /api/service/service-excel-list Service Excel download
     * @apiGroup Service
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {string} serviceId service Id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the service excel list..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/service/service-excel-list
     * @apiErrorExample {json} Service Excel List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/service-excel-list')
    @Authorized(['admin', 'export-services'])
    public async excelServiceView(@QueryParam('serviceId') serviceId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('service Detail Sheet');
        const rows = [];
        const services = serviceId.split(',');
        for (const id of services) {
            const dataId = await this.serviceService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid service Id',
                };
                return response.status(400).send(errorResponse);
            }
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Title', key: 'title', size: 16, width: 15 },
            { header: 'Description', key: 'desciption', size: 16, width: 25 },
            { header: 'Mobile Number', key: 'mobile', size: 16, width: 15 },
            { header: 'Price', key: 'price', size: 16, width: 15 },
            { header: 'Status', key: 'isActive', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        for (const id of services) {
            const dataId = await this.serviceService.findOne(id);
            rows.push([dataId.title, dataId.description, dataId.mobile, dataId.price, dataId.isActive]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './ServiceExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
            });
        });
    }
    // leads Details Excel Document Download
    /**
     * @api {get} /api/service/leads-excel-list Leads Excel download
     * @apiGroup Service
     * @apiParam (Request body) {string} leadsId leadsId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the leads excel list..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/service/leads-excel-list
     * @apiErrorExample {json} Service Excel List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/leads-excel-list')
    public async excelLeadsView(@QueryParam('leadsId') leadsId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('leads Detail Sheet');
        const rows = [];
        const leads = leadsId.split(',');
        for (const id of leads) {
            const dataId = await this.serviceEnquiryService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid leads Id',
                };
                return response.status(400).send(errorResponse);
            }
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Leads Id', key: 'enquiryId', size: 16, width: 15 },
            { header: 'Name', key: 'name', size: 16, width: 15 },
            { header: 'Email Id', key: 'email', size: 16, width: 20 },
            { header: 'Mobile Number', key: 'mobile', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        for (const id of leads) {
            const dataId = await this.serviceEnquiryService.findOne(id);
            rows.push([dataId.enquiryId, dataId.name, dataId.email, dataId.mobile]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './LeadsExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
            });
        });
    }

    // Service Detail API
    /**
     * @api {get} /api/service/service-detail Service Detail API
     * @apiGroup Service
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} serviceId serviceId
     * @apiParamExample {json} Input
     * {
     *      "serviceId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the service detail.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/service/service-detail
     * @apiErrorExample {json} Service error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/service-detail')
    @Authorized()
    public async serviceDetail(@QueryParam('serviceId') serviceId: number, @Res() response: any): Promise<any> {
        const serviceData: any = {};
        const service = await this.serviceService.findOne({
            select: ['serviceId', 'title', 'description', 'mobile', 'price', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'isActive', 'createdDate'],
            where: {
                serviceId,
            },
        });
        if (!service) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid serviceId',
            };
            return response.status(400).send(errorResponse);
        }
        serviceData.serviceId = service.serviceId;
        serviceData.title = service.title;
        serviceData.description = service.description;
        serviceData.mobile = service.mobile;
        serviceData.price = service.price;
        serviceData.metaTagTitle = service.metaTagTitle;
        serviceData.metaTagDescription = service.metaTagDescription;
        serviceData.metaTagKeyword = service.metaTagKeyword;
        serviceData.isActive = service.isActive;
        serviceData.createdDate = service.createdDate;
        const defaultValue = await this.serviceImageService.findAll({
            select: ['image', 'containerName', 'defaultImage'],
            where: { serviceId: service.serviceId },
        });
        serviceData.Image = defaultValue;
        const categoryValue = await this.serviceToCategoryService.find({
            select: ['serviceCategoryId'],
            where: { serviceId: service.serviceId },
        });
        const serviceCategory = categoryValue.map(async (value: any) => {
            const temp: any = value;
            const categoryNames = await this.serviceCategoryService.findOne({
                where: { serviceCategoryId: value.serviceCategoryId },
            });
            temp.name = categoryNames.name;
            return temp;
        });
        const results = await Promise.all(serviceCategory);
        serviceData.category = results;
        const successResponse: any = {
            status: 1,
            message: 'successfully got the service detail',
            data: serviceData,
        };
        return response.status(200).send(successResponse);
    }

    // Service Count API
    /**
     * @api {get} /api/service/service-count Service Count API
     * @apiGroup Service
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the service count.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/service/service-count
     * @apiErrorExample {json} Service error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/service-count')
    @Authorized()
    public async serviceCount(@Res() response: any): Promise<any> {
        const service: any = {};
        const select = [];
        const search = [];
        const WhereConditions = [];
        const servicesCount = await this.serviceService.list(0, 0, select, search, WhereConditions, 0, 1);
        const serviceCategoryCount = await this.serviceCategoryService.list(0, 0, select, search, WhereConditions, 0, 1);
        const serviceEnquiryCount = await this.serviceEnquiryService.list(0, 0, select, search, WhereConditions, 1);
        service.totalServices = servicesCount;
        service.totalCategories = serviceCategoryCount;
        service.totalEnquires = serviceEnquiryCount;
        const successResponse: any = {
            status: 1,
            message: 'successfully got the dashboard count',
            data: service,
        };
        return response.status(200).send(successResponse);
    }
}
