"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const Service_1 = require("../../core/models/Service");
const ServiceToCategory_1 = require("../../core/models/ServiceToCategory");
const ServiceImage_1 = require("../../core/models/ServiceImage");
const ServiceService_1 = require("../../core/services/ServiceService");
const ServiceToCategoryService_1 = require("../../core/services/ServiceToCategoryService");
const ServiceEnquiryService_1 = require("../../core/services/ServiceEnquiryService");
const ServiceCategoryService_1 = require("../../core/services/ServiceCategoryService");
const CreateServiceRequest_1 = require("./requests/CreateServiceRequest");
const DeleteEnquiryRequest_1 = require("./requests/DeleteEnquiryRequest");
const DeleteServiceRequest_1 = require("./requests/DeleteServiceRequest");
const ServiceImageService_1 = require("../../core/services/ServiceImageService");
const fs = tslib_1.__importStar(require("fs"));
let ServiceController = class ServiceController {
    constructor(serviceService, serviceToCategoryService, serviceEnquiryService, serviceImageService, serviceCategoryService) {
        this.serviceService = serviceService;
        this.serviceToCategoryService = serviceToCategoryService;
        this.serviceEnquiryService = serviceEnquiryService;
        this.serviceImageService = serviceImageService;
        this.serviceCategoryService = serviceCategoryService;
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
    addService(serviceParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newService = new Service_1.Services();
            newService.title = serviceParam.title;
            newService.description = serviceParam.description;
            newService.mobile = serviceParam.mobile;
            newService.price = serviceParam.price;
            newService.metaTagTitle = serviceParam.metaTagTitle;
            newService.metaTagDescription = serviceParam.metaTagDescription;
            newService.metaTagKeyword = serviceParam.metaTagKeyword;
            newService.isActive = serviceParam.status;
            const serviceSave = yield this.serviceService.create(newService);
            // save service category
            if (serviceParam.serviceCategoryId) {
                const category = serviceParam.serviceCategoryId;
                for (const categoryId of category) {
                    const newServiceToCategory = new ServiceToCategory_1.ServiceToCategory();
                    newServiceToCategory.serviceId = serviceSave.serviceId;
                    newServiceToCategory.serviceCategoryId = categoryId;
                    newServiceToCategory.isActive = 1;
                    yield this.serviceToCategoryService.create(newServiceToCategory);
                }
            }
            // Save Service Image
            const serviceImage = serviceParam.image;
            for (const imageRow of serviceImage) {
                const imageData = JSON.stringify(imageRow);
                const imageResult = JSON.parse(imageData);
                const newServiceImage = new ServiceImage_1.ServiceImage();
                newServiceImage.serviceId = serviceSave.serviceId;
                newServiceImage.image = imageResult.image;
                newServiceImage.containerName = imageResult.containerName;
                newServiceImage.defaultImage = imageResult.defaultImage;
                yield this.serviceImageService.create(newServiceImage);
            }
            if (serviceSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully added a new service',
                    data: serviceSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create service',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    serviceList(limit, offset, keyword, price, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                }
            ];
            const WhereConditions = [];
            const serviceList = yield this.serviceService.list(limit, offset, select, search, WhereConditions, price, count);
            if (count) {
                const successRes = {
                    status: 1,
                    message: 'Successfully got count',
                    data: serviceList,
                };
                return response.status(200).send(successRes);
            }
            const services = serviceList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const defaultValue = yield this.serviceImageService.findAll({
                    select: ['image', 'containerName', 'defaultImage'],
                    where: { serviceId: value.serviceId },
                });
                const categoryValue = yield this.serviceToCategoryService.find({
                    select: ['serviceId', 'serviceCategoryId'],
                    where: { serviceId: value.serviceId },
                }).then((val) => {
                    const category = val.map((values) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const categoryNames = yield this.serviceCategoryService.findOne({ serviceCategoryId: values.serviceCategoryId });
                        const tempVAL = values;
                        if (categoryNames !== undefined) {
                            tempVAL.categoryName = categoryNames.name;
                        }
                        else {
                            tempVAL.categoryName = '';
                        }
                        return tempVAL;
                    }));
                    const categoryFinalData = Promise.all(category);
                    return categoryFinalData;
                });
                const temp = value;
                temp.serviceImage = defaultValue;
                temp.category = categoryValue;
                return temp;
            }));
            const results = yield Promise.all(services);
            const successResponse = {
                status: 1,
                message: 'successfully got the complete service list',
                data: results,
            };
            return response.status(200).send(successResponse);
        });
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
    updateService(id, serviceParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const service = yield this.serviceService.findOne({ where: { serviceId: id } });
            if (!service) {
                const errorResponse = {
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
            const serviceSave = yield this.serviceService.create(service);
            const findCategory = yield this.serviceToCategoryService.find({
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
                const category = serviceParam.serviceCategoryId;
                for (const categoryId of category) {
                    const newServiceToCategory = new ServiceToCategory_1.ServiceToCategory();
                    newServiceToCategory.serviceId = serviceSave.serviceId;
                    newServiceToCategory.serviceCategoryId = categoryId;
                    newServiceToCategory.isActive = 1;
                    yield this.serviceToCategoryService.create(newServiceToCategory);
                }
            }
            // Delete previous images
            this.serviceImageService.delete({ serviceId: serviceSave.serviceId });
            // Save Service Image
            const serviceImage = serviceParam.image;
            for (const imageRow of serviceImage) {
                const imageData = JSON.stringify(imageRow);
                const imageResult = JSON.parse(imageData);
                const newServiceImage = new ServiceImage_1.ServiceImage();
                newServiceImage.serviceId = serviceSave.serviceId;
                newServiceImage.image = imageResult.image;
                newServiceImage.containerName = imageResult.containerName;
                newServiceImage.defaultImage = imageResult.defaultImage;
                this.serviceImageService.create(newServiceImage);
            }
            if (serviceSave) {
                const successResponse = {
                    status: 1,
                    message: 'Sucessfully updated the service',
                    data: serviceSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the service',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    deleteservice(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const service = yield this.serviceService.findOne({ where: { serviceId: id } });
            if (!service) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid service Id',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteService = yield this.serviceService.delete(service);
            // delete service category
            yield this.serviceToCategoryService.delete(service.serviceId);
            // Delete service images
            this.serviceImageService.delete({ serviceId: service.serviceId });
            if (!deleteService) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the service',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the service',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    deleteMultipleService(deleteService, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const serviceData = deleteService.serviceId.toString();
            const service = serviceData.split(',');
            const data = service.map((id) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const dataId = yield this.serviceService.findOne(id);
                if (dataId === undefined) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid Service Id',
                    };
                    return response.status(400).send(errorResponse);
                }
                else {
                    yield this.serviceService.delete(dataId);
                    // delete service category
                    yield this.serviceToCategoryService.delete(dataId.serviceId);
                    // Delete service images
                    yield this.serviceImageService.delete({ serviceId: dataId.serviceId });
                }
            }));
            const deleteServices = yield Promise.all(data);
            if (deleteServices) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the Service',
                };
                return response.status(200).send(successResponse);
            }
        });
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
    serviceEnquiryList(limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            const serviceEnquiryList = yield this.serviceEnquiryService.list(limit, offset, select, search, WhereConditions, count);
            if (count) {
                const successResponse = {
                    status: 1,
                    message: 'successfully got the count',
                    data: serviceEnquiryList,
                };
                return response.status(200).send(successResponse);
            }
            if (serviceEnquiryList) {
                const successResponse = {
                    status: 1,
                    message: 'successfully got the enquiry list',
                    data: serviceEnquiryList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to list enquiry',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    deleteEnquiry(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const enquiry = yield this.serviceEnquiryService.findOne({ where: { enquiryId: id } });
            if (!enquiry) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Enquiry Id.',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteEnquiry = yield this.serviceEnquiryService.delete(enquiry);
            if (!deleteEnquiry) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the enquiry',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the enquiry',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    deleteMultipleEnquiry(deleteEnquires, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const enquiryData = deleteEnquires.enquiryId.toString();
            const enquiry = enquiryData.split(',');
            const data = enquiry.map((id) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const dataId = yield this.serviceEnquiryService.findOne(id);
                if (dataId === undefined) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid Enquiry Id',
                    };
                    return response.status(400).send(errorResponse);
                }
                else {
                    return yield this.serviceEnquiryService.delete(dataId);
                }
            }));
            const deleteEnquiry = yield Promise.all(data);
            if (deleteEnquiry) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the Enquiry',
                };
                return response.status(200).send(successResponse);
            }
        });
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
    excelServiceView(serviceId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('service Detail Sheet');
            const rows = [];
            const services = serviceId.split(',');
            for (const id of services) {
                const dataId = yield this.serviceService.findOne(id);
                if (dataId === undefined) {
                    const errorResponse = {
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
                const dataId = yield this.serviceService.findOne(id);
                rows.push([dataId.title, dataId.description, dataId.mobile, dataId.price, dataId.isActive]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './ServiceExcel_' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(fileName);
                        return response.end();
                    }
                });
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
    excelLeadsView(leadsId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('leads Detail Sheet');
            const rows = [];
            const leads = leadsId.split(',');
            for (const id of leads) {
                const dataId = yield this.serviceEnquiryService.findOne(id);
                if (dataId === undefined) {
                    const errorResponse = {
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
                const dataId = yield this.serviceEnquiryService.findOne(id);
                rows.push([dataId.enquiryId, dataId.name, dataId.email, dataId.mobile]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './LeadsExcel_' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(fileName);
                        return response.end();
                    }
                });
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
    serviceDetail(serviceId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const serviceData = {};
            const service = yield this.serviceService.findOne({
                select: ['serviceId', 'title', 'description', 'mobile', 'price', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'isActive', 'createdDate'],
                where: {
                    serviceId,
                },
            });
            if (!service) {
                const errorResponse = {
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
            const defaultValue = yield this.serviceImageService.findAll({
                select: ['image', 'containerName', 'defaultImage'],
                where: { serviceId: service.serviceId },
            });
            serviceData.Image = defaultValue;
            const categoryValue = yield this.serviceToCategoryService.find({
                select: ['serviceCategoryId'],
                where: { serviceId: service.serviceId },
            });
            const serviceCategory = categoryValue.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const categoryNames = yield this.serviceCategoryService.findOne({
                    where: { serviceCategoryId: value.serviceCategoryId },
                });
                temp.name = categoryNames.name;
                return temp;
            }));
            const results = yield Promise.all(serviceCategory);
            serviceData.category = results;
            const successResponse = {
                status: 1,
                message: 'successfully got the service detail',
                data: serviceData,
            };
            return response.status(200).send(successResponse);
        });
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
    serviceCount(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const service = {};
            const select = [];
            const search = [];
            const WhereConditions = [];
            const servicesCount = yield this.serviceService.list(0, 0, select, search, WhereConditions, 0, 1);
            const serviceCategoryCount = yield this.serviceCategoryService.list(0, 0, select, search, WhereConditions, 0, 1);
            const serviceEnquiryCount = yield this.serviceEnquiryService.list(0, 0, select, search, WhereConditions, 1);
            service.totalServices = servicesCount;
            service.totalCategories = serviceCategoryCount;
            service.totalEnquires = serviceEnquiryCount;
            const successResponse = {
                status: 1,
                message: 'successfully got the dashboard count',
                data: service,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/add-service'),
    (0, routing_controllers_1.Authorized)(['admin', 'create-services']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateServiceRequest_1.CreateService, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceController.prototype, "addService", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/service-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'list-services']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('price')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceController.prototype, "serviceList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-service/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-services']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateServiceRequest_1.CreateService, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceController.prototype, "updateService", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete-service/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-services']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceController.prototype, "deleteservice", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/delete-multiple-service'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DeleteServiceRequest_1.DeleteService, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceController.prototype, "deleteMultipleService", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/service-enquiry-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'list-enquiry']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceController.prototype, "serviceEnquiryList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete-service-enquiry/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-enquiry']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceController.prototype, "deleteEnquiry", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/delete-multiple-enquiry'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DeleteEnquiryRequest_1.DeleteEnquiry, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceController.prototype, "deleteMultipleEnquiry", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/service-excel-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'export-services']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('serviceId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceController.prototype, "excelServiceView", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/leads-excel-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('leadsId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceController.prototype, "excelLeadsView", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/service-detail'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('serviceId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceController.prototype, "serviceDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/service-count'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceController.prototype, "serviceCount", null);
ServiceController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/service'),
    tslib_1.__metadata("design:paramtypes", [ServiceService_1.ServiceService,
        ServiceToCategoryService_1.ServiceToCategoryService,
        ServiceEnquiryService_1.ServiceEnquiryService,
        ServiceImageService_1.ServiceImageService,
        ServiceCategoryService_1.ServiceCategoryService])
], ServiceController);
exports.ServiceController = ServiceController;
//# sourceMappingURL=ServiceController.js.map