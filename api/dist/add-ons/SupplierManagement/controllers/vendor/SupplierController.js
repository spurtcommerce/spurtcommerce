"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const CreateSupplierRequest_1 = require("./requests/CreateSupplierRequest");
const Supplier_1 = require("../../models/Supplier");
const SupplierService_1 = require("../../services/SupplierService");
const SupplierLinkDoc_1 = require("../../models/SupplierLinkDoc");
const SupplierContacts_1 = require("../../models/SupplierContacts");
const UpdateSupplierContactRequest_1 = require("./requests/UpdateSupplierContactRequest");
const UpdateSupplierRequest_1 = require("./requests/UpdateSupplierRequest");
const CreateSupplierContactRequest_1 = require("./requests/CreateSupplierContactRequest");
const SupplierContactService_1 = require("../../services/SupplierContactService");
const SupplierLinkDocService_1 = require("../../services/SupplierLinkDocService");
const CreateSupplierScheRequest_1 = require("./requests/CreateSupplierScheRequest");
const UpdateSuppliersRequest_1 = require("./requests/UpdateSuppliersRequest");
const typeorm_1 = require("typeorm");
const fs = require("fs");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const typedi_1 = require("typedi");
let SupplierController = class SupplierController {
    constructor(supplierService, supplierContactService, supplierLinkDocService) {
        this.supplierService = supplierService;
        this.supplierContactService = supplierContactService;
        this.supplierLinkDocService = supplierLinkDocService;
        // --
    }
    // Create Supplier API
    /**
     * @api {Post} /api/supplier  Supplier contact document create API
     * @apiGroup Supplier
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} supplierName supplierName
     * @apiParam (Request body) {String} address address
     * @apiParam (Request body) {String} taxId taxId
     * @apiParam (Request body) {number} countryId countryId
     * @apiParam (Request body) {string} tags tags
     * @apiParam (Request body) {String} website website
     * @apiParam (Request body) {String} mobile mobile
     * @apiParam (Request body) {Number} categoryId categoryId
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} website website
     * @apiParam (Request body) {String} notes notes
     * @apiParam (Request body) {String} comments comments
     * @apiParam (Request body) {object[]} contactDetail contactDetail
     * @apiParam (Request body) {object[]} SupplierUpload SupplierUpload
     * @apiParamExample {json} Input
     * {
     *    "supplierName": "",
     *    "taxId": "",
     *    "countryId": 1,
     *    "tags": "",
     *    "website": "",
     *    "mobile": "",
     *    "address": "",
     *    "categoryId": 1,
     *    "status": 1,
     *    "contactDetail": [
     *      {
     *          "name": "",
     *          "email": "",
     *          "mobile": "",
     *          "position": "",
     *          "status" : 1,
     *      }
     *    ],
     *    "uploadDetail" : [
     *      {
     *        "documentId":1,
     *        "fileName": "",
     *        "name": "",
     *        "filePath": "",
     *        "isApproved" : 1,
     *        "link": "",
     *        "type": ""
     *      }
     *    ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully supplier Created.",
     *    "data": {
     *        "supplierName": "",
     *        "countryId": 1,
     *        "vendorId": 1,
     *        "mobile": "",
     *        "isActive": 1,
     *        "catogoryId": 1,
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "id": 1
     *    }
     * }
     * @apiSampleRequest /api/supplier
     * @apiErrorExample {json} createSupplier error
     * HTTP/1.1 500 Internal Server Error
     */
    createSupplier(supplierParams, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const supplierName = yield this.supplierService.findOne({
                where: {
                    supplierName: supplierParams.supplierName,
                    isDelete: 0,
                    isActive: 1,
                },
            });
            if (supplierName) {
                return response.status(400).send({
                    status: 0,
                    message: 'Supplier Name Already exist.',
                });
            }
            // creating supplier
            const newSupplier = new Supplier_1.Supplier();
            newSupplier.supplierName = supplierParams.supplierName;
            newSupplier.address = supplierParams.address;
            newSupplier.taxId = supplierParams.taxId;
            newSupplier.countryId = supplierParams.countryId;
            newSupplier.website = supplierParams.website;
            newSupplier.vendorId = request.user.vendorId;
            newSupplier.mobile = supplierParams.mobile;
            newSupplier.notes = supplierParams.notes;
            newSupplier.isActive = supplierParams.status;
            newSupplier.catogoryId = supplierParams.categoryId;
            newSupplier.tags = supplierParams.tags;
            newSupplier.createdBy = request.user.vendorId;
            newSupplier.comments = supplierParams.comments;
            const supplierData = yield this.supplierService.create(newSupplier);
            // creating supplier contacts
            const contactarr = [];
            for (const contactDetail of supplierParams.contactDetail) {
                if (supplierParams.contactDetail.filter(val => val.email === contactDetail.email).length > 1) {
                    return response.status(400).send({
                        status: 0,
                        message: `Duplicate mail entry`,
                    });
                }
                const SupplierContact = new SupplierContacts_1.SupplierContacts();
                SupplierContact.name = contactDetail.name;
                SupplierContact.email = contactDetail.email;
                SupplierContact.supplierId = supplierData.id;
                SupplierContact.mobile = contactDetail.mobile;
                SupplierContact.position = contactDetail.position;
                SupplierContact.isActive = contactDetail.status;
                contactarr.push(SupplierContact);
            }
            yield this.supplierContactService.bulkcreate(contactarr);
            // creating supplier document & link
            const uploadarr = [];
            for (const uploadsDetails of supplierParams.uploadDetail) {
                const SupplierLinkDocs = new SupplierLinkDoc_1.SupplierLinkDoc();
                SupplierLinkDocs.name = uploadsDetails.name;
                SupplierLinkDocs.documentId = uploadsDetails.documentId;
                SupplierLinkDocs.fileName = uploadsDetails.fileName;
                SupplierLinkDocs.filePath = uploadsDetails.filePath;
                SupplierLinkDocs.isApproved = uploadsDetails.isApproved;
                SupplierLinkDocs.link = uploadsDetails.link;
                SupplierLinkDocs.supplierId = supplierData.id;
                SupplierLinkDocs.isActive = 1;
                SupplierLinkDocs.UploadType = SupplierLinkDoc_1.UploadType[uploadsDetails.type];
                uploadarr.push(SupplierLinkDocs);
            }
            yield this.supplierLinkDocService.bulkcreate(uploadarr);
            const successResponse = {
                status: 1,
                message: 'Successfully supplier Created.',
                data: supplierData,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Updating Supplier API
    /**
     * @api {Put} api/supplier/:id Update Supplier contact document API
     * @apiGroup Supplier
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} supplierName supplierName
     * @apiParam (Request body) {String} address address
     * @apiParam (Request body) {String} taxId taxId
     * @apiParam (Request body) {number} countryId countryId
     * @apiParam (Request body) {string} tags tags
     * @apiParam (Request body) {String} website website
     * @apiParam (Request body) {String} mobile mobile
     * @apiParam (Request body) {Number} categoryId categoryId
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {array} contactDeleteId contactDeleteId
     * @apiParam (Request body) {array} uploadDeleteId uploadDeleteId
     * @apiParam (Request body) {object} contactDetail contactDetail
     * @apiParam (Request body) {object} SupplierUpload SupplierUpload
     * @apiParamExample {json} Input
     * {
     *   "supplierName": "",
     *   "address": "",
     *   "taxId": 1,
     *   "countryId": 1,
     *   "tags": "",
     *   "website": "",
     *   "mobile": "",
     *   "address": "",
     *   "categoryId": 1,
     *   "status": 1,
     *    "contactDetail": [
     *       {
     *           "name": "",
     *           "email": "",
     *           "mobile": "",
     *           "position": "",
     *           "status" : 1,
     *       }
     *     ]
     *   "contactDeleteId" : [],
     *   "uploadDeleteId": [],
     *   "SupplierUpload" : [
     *      {
     *         "fileName": "",
     *         "name": "",
     *         "filePath": "",
     *         "isApproved" : 1,
     *         "link": ""
     *      }
     *   ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Supplier Updated Successfully.",
     *    "data": {
     *        "supplierName": "",
     *        "countryId": 1,
     *        "vendorId": 1,
     *        "mobile": "",
     *        "isActive": 1,
     *        "catogoryId": 1,
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "id": 1
     *    }
     * @apiSampleRequest /api/supplier/:id
     * @apiErrorExample {json} Updatesupplier error
     * HTTP/1.1 500 Internal Server Error
     */
    UpdateSupplier(id, supplierParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            const supplier = yield this.supplierService.findOne({
                where: {
                    id,
                    // isActive: 1,
                    isDelete: 0,
                },
            });
            if (!supplier) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid supplier id',
                });
            }
            supplier.supplierName = supplierParam.supplierName;
            supplier.address = supplierParam.address;
            supplier.countryId = supplierParam.countryId;
            supplier.catogoryId = supplierParam.categoryId;
            supplier.mobile = supplierParam.mobile;
            supplier.website = supplierParam.website;
            supplier.notes = supplierParam.notes;
            supplier.tags = supplierParam.tags;
            supplier.taxId = supplierParam.taxId;
            supplier.comments = supplierParam.comments;
            supplier.modifiedBy = request.user.vendorId;
            supplier.isActive = supplierParam.status;
            const updatedSupplier = yield this.supplierService.update(supplier.id, supplier);
            if (supplierParam.contactDeleteId.length) {
                yield this.supplierContactService.delete({ id: (0, typeorm_1.In)(supplierParam.contactDeleteId) });
            }
            if (supplierParam.uploadDeleteId.length) {
                yield this.supplierLinkDocService.delete({ id: (0, typeorm_1.In)(supplierParam.uploadDeleteId) });
            }
            const contactarr = [];
            for (const contactDetail of supplierParam.contactDetail) {
                if (supplierParam.contactDetail.filter(val => val.email === contactDetail.email).length > 1) {
                    return response.status(400).send({
                        status: 0,
                        message: `Duplicate mail entry`,
                    });
                }
                if (contactDetail.id) {
                    const contactEmail = yield this.supplierContactService.findOne({
                        where: {
                            email: contactDetail.email,
                            supplierId: id,
                            id: (0, typeorm_1.Not)(contactDetail.id),
                            isActive: 1,
                            isDelete: 0,
                        },
                    });
                    if (contactEmail) {
                        return response.status(400).send({
                            status: 0,
                            message: `Already this email id exist`,
                        });
                    }
                    const contactData = yield this.supplierContactService.findOne({
                        where: {
                            id: contactDetail.id,
                            isActive: 1,
                            isDelete: 0,
                        },
                    });
                    contactData.name = contactDetail.name;
                    contactData.email = contactDetail.email;
                    contactData.mobile = contactDetail.mobile;
                    contactData.position = contactDetail.position;
                    contactData.isActive = contactDetail.status;
                    contactarr.push(contactData);
                }
                else {
                    const contactEmail = yield this.supplierContactService.findOne({
                        where: {
                            email: contactDetail.email,
                            supplierId: id,
                            isActive: 1,
                            isDelete: 0,
                        },
                    });
                    if (contactEmail) {
                        return response.status(400).send({
                            status: 0,
                            message: `Already this email id exist`,
                        });
                    }
                    const SupplierContact = new SupplierContacts_1.SupplierContacts();
                    SupplierContact.name = contactDetail.name;
                    SupplierContact.email = contactDetail.email;
                    SupplierContact.supplierId = id;
                    SupplierContact.mobile = contactDetail.mobile;
                    SupplierContact.position = contactDetail.position;
                    SupplierContact.isActive = contactDetail.status;
                    contactarr.push(SupplierContact);
                }
            }
            yield this.supplierContactService.bulkcreate(contactarr);
            const uploadarr = [];
            for (const uploadDetail of supplierParam.uploadDetail) {
                if (uploadDetail.id) {
                    const contactData = yield this.supplierLinkDocService.findOne({
                        where: {
                            id: uploadDetail.id,
                            isActive: 1,
                            isDelete: 0,
                        },
                    });
                    if (contactData === null || contactData === void 0 ? void 0 : contactData.documentId) {
                        contactData.documentId = uploadDetail.documentId;
                    }
                    contactData.name = uploadDetail.name;
                    contactData.fileName = uploadDetail.fileName;
                    contactData.filePath = uploadDetail.filePath;
                    contactData.link = uploadDetail.link;
                    contactData.isApproved = uploadDetail.isApproved;
                    contactData.isActive = 1;
                    uploadarr.push(contactData);
                }
                else {
                    const SupplierContact = new SupplierLinkDoc_1.SupplierLinkDoc();
                    SupplierContact.name = uploadDetail.name;
                    SupplierContact.documentId = (_a = uploadDetail === null || uploadDetail === void 0 ? void 0 : uploadDetail.documentId) !== null && _a !== void 0 ? _a : 0;
                    SupplierContact.fileName = uploadDetail.fileName;
                    SupplierContact.supplierId = id;
                    SupplierContact.filePath = uploadDetail.filePath;
                    SupplierContact.link = uploadDetail.link;
                    SupplierContact.isApproved = uploadDetail.isApproved;
                    SupplierContact.isActive = 1;
                    SupplierContact.UploadType = SupplierLinkDoc_1.UploadType[uploadDetail.type];
                    uploadarr.push(SupplierContact);
                }
            }
            yield this.supplierLinkDocService.bulkcreate(uploadarr);
            const successResponse = {
                status: 1,
                message: 'Supplier Updated Successfully.',
                data: updatedSupplier,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Create Supplier API
    /**
     * @api {Post} /api/create-supplier Create supplier API
     * @apiGroup Supplier
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} supplierName supplierName
     * @apiParam (Request body) {String} address address
     * @apiParam (Request body) {String} vendorId vendorId
     * @apiParam (Request body) {String} taxId taxId
     * @apiParam (Request body) {number} countryId countryId
     * @apiParam (Request body) {string} tags tags
     * @apiParam (Request body) {String} website website
     * @apiParam (Request body) {String} notes notes
     * @apiParam (Request body) {String} comments comments
     * @apiParam (Request body) {String} mobile mobile
     * @apiParam (Request body) {Number} categoryId categoryId
     * @apiParam (Request body) {Number} status status
     * @apiParamExample {json} Input
     * {
     *    "supplierName": "",
     *    "address": "",
     *    "vendorId": 1,
     *    "countryId": 1,
     *    "categoryId": 1,
     *    "content": "",
     *    "status": 1,
     *    "mobile": "",
     *    "website": "",
     *    "notes": "",
     *    "tags": "",
     *    "taxId": 1,
     *    "comments": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Supplier Created.",
     *    "data": {
     *        "supplierName": "",
     *        "address": "",
     *        "taxId": 1,
     *        "countryId": 1,
     *        "website": "",
     *        "vendorId": 1,
     *        "mobile": "",
     *        "notes": "",
     *        "isActive": 1,
     *        "catogoryId": 1,
     *        "tags": "",
     *        "createdBy": "",
     *        "comments": "",
     *        "createdDate": "",
     *        "id": 1
     *    }
     * }
     * @apiSampleRequest /api/create-supplier
     * @apiErrorExample {json} Create Suppliersche error
     * HTTP/1.1 500 Internal Server Error
     */
    createSuppliersche(supplierParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const supplierName = yield this.supplierService.findOne({
                where: {
                    supplierName: supplierParam.supplierName,
                    isDelete: 0,
                },
            });
            if (supplierName) {
                return response.status(400).send({
                    status: 0,
                    message: 'Supplier Name Already exist.',
                });
            }
            // creating supplier contacts
            const suppliers = new Supplier_1.Supplier();
            suppliers.supplierName = supplierParam.supplierName;
            suppliers.address = supplierParam.address;
            suppliers.taxId = supplierParam.taxId;
            suppliers.countryId = supplierParam.countryId;
            suppliers.website = supplierParam.website;
            suppliers.vendorId = request.user.vendorId;
            suppliers.mobile = supplierParam.mobile;
            suppliers.notes = supplierParam.notes;
            suppliers.isActive = supplierParam.status;
            suppliers.catogoryId = supplierParam.categoryId;
            suppliers.tags = supplierParam.tags;
            suppliers.createdBy = request.user.vendorId;
            suppliers.comments = supplierParam.comments;
            const supplierData = yield this.supplierService.create(suppliers);
            const successResponse = {
                status: 1,
                message: 'Successfully Supplier Created.',
                data: supplierData,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Updating supplier
    /**
     * @api {Put} /api/supplier/update-supplier/:id Update supplier API
     * @apiGroup Supplier
     * @apiParam (Request body) {Number} id supplier id (Required)
     * @apiParam (Request body) {String} supplierName supplierName (Required)
     * @apiParam (Request body) {String} address  address
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiParam (Request body) {Number} countryId countryId
     * @apiParam (Request body) {Number} categoryId categoryId
     * @apiParam (Request body) {String} content content
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} mobile mobile
     * @apiParam (Request body) {String} comments comments
     * @apiParam (Request body) {Number} supplierId  supplierId
     * @apiParam (Request body) {String} notes notes
     * @apiParam (Request body) {String} website website
     * @apiParam (Request body) {String} tags tags
     * @apiParam (Request body) {Number} taxId taxId
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *     "supplierName": "",
     *     "address": "",
     *     "vendorId": 1,
     *     "countryId": 1,
     *     "categoryId": 1,
     *     "content": "",
     *     "status": 1,
     *     "mobile": "",
     *     "website": "",
     *     "supplierId": 1,
     *     "notes": "",
     *     "tags": "",
     *     "taxId": 1,
     *     "comments": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Supplier Updated Successfully",
     *      "data": {
     *        "supplierName": "",
     *        "address": "",
     *        "taxId": 1,
     *        "countryId": 1,
     *        "website": "",
     *        "vendorId": 1,
     *        "mobile": "",
     *        "notes": "",
     *        "isActive": 1,
     *        "catogoryId": 1,
     *        "tags": "",
     *        "createdBy": 1,
     *        "comments": "",
     *        "createdDate": "",
     *        "id": 1
     *       }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/supplier/update-supplier/:id
     * @apiErrorExample {json} UpdateSuppliers error
     * HTTP/1.1 500 Internal Server Error
     */
    UpdateSuppliers(id, payload, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const supplierId = yield this.supplierService.findOne({
                where: {
                    id,
                },
            });
            if (!supplierId) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid supplier id',
                });
            }
            supplierId.supplierName = payload.supplierName;
            supplierId.countryId = payload.countryId;
            supplierId.comments = payload.comments;
            supplierId.mobile = payload.mobile;
            supplierId.tags = payload.tags;
            supplierId.address = payload.address;
            supplierId.website = payload.website;
            supplierId.notes = payload.notes;
            supplierId.catogoryId = payload.categoryId;
            supplierId.comments = payload.comments;
            supplierId.isActive = payload.status;
            const contact = yield this.supplierService.update(supplierId.id, supplierId);
            const successResponse = {
                status: 1,
                message: 'Supplier Updated Successfully.',
                data: contact,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Updating supplier Status
    /**
     * @api {put} /api/supplier/status/update Update supplier status API
     * @apiGroup Supplier
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} id  id
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "status" : 1,
     *      "id" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Supplier Status Updated Successfully.",
     *  }
     * @apiSampleRequest /api/supplier/status/update
     * @apiErrorExample {json} updateContact error
     * HTTP/1.1 500 Internal Server Error
     */
    upadteSupplierStatus(supplierId, status, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const whereConditions = [];
            whereConditions.push({
                name: 'id',
                op: 'In',
                value: supplierId,
            });
            whereConditions.push({
                name: 'is_delete',
                op: 'and',
                value: 0,
            }, {
                name: 'vendor_id',
                op: 'and',
                value: request.user.vendorId,
            });
            const supplierList = yield this.supplierService.list(0, 0, 0, 0, whereConditions, [], false);
            supplierList.map((supplier => supplier.isActive = status));
            yield this.supplierService.save(supplierList);
            return response.status(200).send({
                status: 1,
                message: 'Supplier Status Updated Successfully.',
            });
        });
    }
    // Delete supplier API
    /**
     * @api {Delete} /api/supplier/:id Delete supplier API
     * @apiGroup Supplier
     * @apiParam (Request body) {Number} id id (Required)
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Supplier deleted successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/supplier/:id
     * @apiErrorExample {json} deleteSuppliers error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteSuppliers(id, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const supplier = yield this.supplierService.findOne({
                where: {
                    id,
                    isDelete: 0,
                },
            });
            if (!supplier) {
                const errResponse = {
                    status: 1,
                    message: 'Invalid supplier Id.',
                };
                return response.status(400).send(errResponse);
            }
            const supplierContact = yield this.supplierContactService.find({
                where: {
                    supplierId: supplier.id,
                    isDelete: 0,
                },
            });
            const arr = [];
            for (const val of supplierContact) {
                val.isDelete = 1;
                val.isActive = 0;
                arr.push(val);
            }
            yield this.supplierContactService.bulkcreate(arr);
            const supplierLink = yield this.supplierLinkDocService.find({
                where: {
                    supplierId: supplier.id,
                    isDelete: 0,
                },
            });
            for (const data of supplierLink) {
                data.isActive = 0;
                data.isDelete = 1;
                arr.push(data);
            }
            yield this.supplierLinkDocService.bulkcreate(arr);
            yield this.supplierService.delete({ id });
            const successResponse = {
                status: 1,
                message: 'Supplier Deleted successfully.',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Supplier List API
    /**
     * @api {Get} /api/supplier Supplier list API
     * @apiGroup Supplier
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} supplierName supplierName
     * @apiParam (Request body) {String} countryName countryName
     * @apiParam (Request body) {Number} mobileNumber mobileNumber
     * @apiParam (Request body) {String} createdDate createdDate
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Get All supplier List",
     *    "data": [
     *        {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedBy": 1,
     *            "modifiedDate": "",
     *            "id": 1,
     *            "vendorId": 1,
     *            "supplierName": "",
     *            "taxId": 1,
     *            "address": "",
     *            "tags": "",
     *            "website": "",
     *            "mobile": "",
     *            "countryId": 1,
     *            "catogoryId": 1,
     *            "notes": "",
     *            "comments": "",
     *            "isActive": 1,
     *            "isDelete": 0,
     *            "vendor": {
     *                "createdBy": 1,
     *                "createdDate": "",
     *                "modifiedBy": 1,
     *                "modifiedDate": "",
     *                "vendorId": 1,
     *                "vendorPrefixId": 1,
     *                "customerId": 1,
     *                "vendorGroupId": 1,
     *                "commission": "",
     *                "contactPersonName": "",
     *                "vendorSlugName": "",
     *                "designation": "",
     *                "companyName": "",
     *                "companyAddress1": "",
     *                "companyAddress2": "",
     *                "companyCity": "",
     *                "companyState": "",
     *                "zoneId": 1,
     *                "companyCountryId": 1,
     *                "pincode": "",
     *                "companyDescription": "",
     *                "companyMobileNumber": "",
     *                "companyEmailId": "",
     *                "companyWebsite": "",
     *                "companyTaxNumber": "",
     *                "companyPanNumber": "",
     *                "companyLogo": "",
     *                "companyLogoPath": "",
     *                "paymentInformation": "",
     *                "verification": [
     *                    {
     *                        "mail": "",
     *                        "email": "",
     *                        "policy": "",
     *                        "category": "",
     *                        "decision": "",
     *                        "document": "",
     *                        "storeFront": "",
     *                        "bankAccount": "",
     *                        "paymentInfo": "",
     *                        "companyDetail": "",
     *                        "deliveryMethod": "",
     *                        "subscriptionPlan": "",
     *                        "distributionPoint": ""
     *                    }
     *                ],
     *                "verificationComment": [],
     *                "verificationDetailComment": [],
     *                "approvalFlag": 1,
     *                "approvedBy": 1,
     *                "approvalDate": "",
     *                "companyCoverImage": "",
     *                "companyCoverImagePath": "",
     *                "displayNameUrl": "",
     *                "instagram": "",
     *                "twitter": "",
     *                "youtube": "",
     *                "facebook": "",
     *                "whatsapp": "",
     *                "bankName": "",
     *                "bankAccountNumber": "",
     *                "accountHolderName": "",
     *                "ifscCode": ""
     *            },
     *            "country": {
     *                "countryId": 1,
     *                "name": "",
     *                "isoCode2": "",
     *                "isoCode3": "",
     *                "addressFormat": "",
     *                "postcodeRequired": "",
     *                "isActive": 1
     *            },
     *            "category": {
     *                "createdBy": 1,
     *                "createdDate": "",
     *                "modifiedBy": 1,
     *                "modifiedDate": "",
     *                "categoryId": 1,
     *                "name": "",
     *                "image": "",
     *                "imagePath": "",
     *                "parentInt": "",
     *                "sortOrder": "",
     *                "categorySlug": "",
     *                "isActive": 1,
     *                "categoryDescription": ""
     *            }
     *        }
     *     ]
     * }
     * @apiSampleRequest /api/supplier
     * @apiErrorExample {json} supplier list error
     * HTTP/1.1 500 Internal Server Error
     */
    supplierList(limit, offset, keyword, supplierName, updatedDate, countryName, categoryName, mobileNumber, createdDate, status, count, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const relation = [
                {
                    name: 'vendor',
                    relationDef: 'supplier.vendor',
                },
                {
                    name: 'country',
                    relationDef: 'supplier.country',
                },
                {
                    name: 'category',
                    relationDef: 'supplier.category',
                },
                // {
                //     name: 'productCategoryAliases',
                //     relationDef: 'category.productCategoryAliases',
                // },
            ];
            const searchCondition = [];
            const whereConditions = [
                {
                    name: 'supplier.isDelete',
                    op: 'and',
                    value: 0,
                },
                {
                    name: 'supplier.vendorId',
                    op: 'and',
                    value: request.user.vendorId,
                },
            ];
            if (status === 0 || status === 1) {
                whereConditions.push({
                    name: 'supplier.isActive',
                    op: 'and',
                    value: status,
                });
            }
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                searchCondition.push({
                    name: ['supplier.supplierName', 'supplier.address', 'country.name', 'category.name'],
                    value: keyword,
                });
            }
            else {
                if (supplierName === null || supplierName === void 0 ? void 0 : supplierName.trim()) {
                    searchCondition.push({
                        name: ['supplier.supplierName'],
                        value: supplierName,
                    });
                }
                if (countryName === null || countryName === void 0 ? void 0 : countryName.trim()) {
                    searchCondition.push({
                        name: ['country.name'],
                        value: countryName,
                    });
                }
                if (categoryName === null || categoryName === void 0 ? void 0 : categoryName.trim()) {
                    searchCondition.push({
                        name: ['category.name'],
                        value: categoryName,
                    });
                }
                if (mobileNumber === null || mobileNumber === void 0 ? void 0 : mobileNumber.trim()) {
                    searchCondition.push({
                        name: ['supplier.mobile'],
                        value: mobileNumber,
                    });
                }
                if (createdDate) {
                    searchCondition.push({
                        name: ['supplier.createdDate'],
                        value: createdDate,
                    });
                }
                if (updatedDate) {
                    searchCondition.push({
                        name: ['supplier.modifiedDate'],
                        value: updatedDate,
                    });
                }
            }
            const supplierList = yield this.supplierService.list(limit, offset, select, relation, whereConditions, searchCondition, count);
            if (count) {
                const successResponseCount = {
                    status: 1,
                    message: 'Successfully Get The supplier Count',
                    data: supplierList,
                };
                return response.status(200).send(successResponseCount);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully Get All supplier List',
                data: supplierList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Supplier Detail  API
    /**
     * @api {Get} /api/supplier/:id  Supplier detail API
     * @apiGroup Supplier
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Get All supplier List",
     *    "data": {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedBy": 1,
     *            "modifiedDate": "",
     *            "id": 1,
     *            "vendorId": 1,
     *            "supplierName": "",
     *            "taxId": 1,
     *            "address": "",
     *            "tags": "",
     *            "website": "",
     *            "mobile": "",
     *            "countryId": 1,
     *            "catogoryId": 1,
     *            "notes": "",
     *            "comments": "",
     *            "isActive": 1,
     *            "isDelete": 0,
     *            "vendor": {
     *                "createdBy": 1,
     *                "createdDate": "",
     *                "modifiedBy": 1,
     *                "modifiedDate": "",
     *                "vendorId": 1,
     *                "vendorPrefixId": "",
     *                "customerId": 1,
     *                "vendorGroupId": 1,
     *                "commission": "",
     *                "contactPersonName": "",
     *                "vendorSlugName": "",
     *                "designation": "",
     *                "companyName": "",
     *                "companyAddress1": "",
     *                "companyAddress2": "",
     *                "companyCity": "",
     *                "companyState": "",
     *                "zoneId": 1,
     *                "companyCountryId": 1,
     *                "pincode": "",
     *                "companyDescription": "",
     *                "companyMobileNumber": "",
     *                "companyEmailId": "",
     *                "companyWebsite": "",
     *                "companyTaxNumber": "",
     *                "companyPanNumber": "",
     *                "companyLogo": "",
     *                "companyLogoPath": "",
     *                "paymentInformation": "",
     *                "verification": [
     *                    {
     *                        "mail": "",
     *                        "email": "",
     *                        "policy": "",
     *                        "category": "",
     *                        "decision": "",
     *                        "document": "",
     *                        "storeFront": "",
     *                        "bankAccount": "",
     *                        "paymentInfo": "",
     *                        "companyDetail": "",
     *                        "deliveryMethod": "",
     *                        "subscriptionPlan": "",
     *                        "distributionPoint": ""
     *                    }
     *                ],
     *                "verificationComment": [],
     *                "verificationDetailComment": [],
     *                "approvalFlag": 1,
     *                "approvedBy": 1,
     *                "approvalDate": "",
     *                "companyCoverImage": "",
     *                "companyCoverImagePath": "",
     *                "displayNameUrl": "",
     *                "instagram": "",
     *                "twitter": "",
     *                "youtube": "",
     *                "facebook": "",
     *                "whatsapp": "",
     *                "bankName": "",
     *                "bankAccountNumber": "",
     *                "accountHolderName": "",
     *                "ifscCode": ""
     *            },
     *            "country": {
     *                "countryId": 1,
     *                "name": "",
     *                "isoCode2": "",
     *                "isoCode3": "",
     *                "addressFormat": "",
     *                "postcodeRequired": "",
     *                "isActive": 1
     *            },
     *            "category": {
     *                "createdBy": 1,
     *                "createdDate": "",
     *                "modifiedBy": 1,
     *                "modifiedDate": "",
     *                "categoryId": 1,
     *                "name": "",
     *                "image": "",
     *                "imagePath": "",
     *                "parentInt": "",
     *                "sortOrder": "",
     *                "categorySlug": "",
     *                "isActive": 1,
     *                "categoryDescription": ""
     *            }
     *        }
     * }
     * @apiSampleRequest /api/supplier/:id
     * @apiErrorExample {json} supplierDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    supplierDetail(id, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const relation = [
                {
                    name: 'vendor',
                    relationDef: 'supplier.vendor',
                },
                {
                    name: 'country',
                    relationDef: 'supplier.country',
                },
                {
                    name: 'category',
                    relationDef: 'supplier.category',
                },
                {
                    name: 'suppliercontacts',
                    relationDef: 'supplier.suppliercontacts',
                },
                {
                    name: 'supplierLinkDoc',
                    relationDef: 'supplier.supplierLinkDoc',
                },
                // {
                //     name: 'productCategoryAliases',
                //     relationDef: 'category.productCategoryAliases',
                // },
            ];
            const searchCondition = [];
            const whereConditions = [
                {
                    name: 'supplier.isDelete',
                    op: 'and',
                    value: 0,
                },
                // {
                //     name: 'supplier.isActive',
                //     op: 'and',
                //     value: 1,
                // },
                {
                    name: 'supplier.vendorId',
                    op: 'and',
                    value: request.user.vendorId,
                }, {
                    name: 'supplier.id',
                    op: 'and',
                    value: id,
                },
                // {
                //     name: 'suppliercontacts.isDelete',
                //     op: 'and',
                //     value: 0,
                // },
                // {
                //     name: 'suppliercontacts.isActive',
                //     op: 'and',
                //     value: 1,
                // },
                // {
                //     name: 'supplierLinkDoc.isDelete',
                //     op: 'and',
                //     value: 0,
                // },
                // {
                //     name: 'supplierLinkDoc.isActive',
                //     op: 'and',
                //     value: 1,
                // },
            ];
            const supplierData = yield this.supplierService.list(0, 0, [], relation, whereConditions, searchCondition, 0);
            if (!supplierData) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid supplier I..!`,
                });
            }
            const filteredSuppliers = supplierData.map((supplier) => {
                const val = Object.assign({}, supplier);
                val.suppliercontacts = val.suppliercontacts
                    ? val.suppliercontacts.filter(contact => contact.isDelete === 0 && contact.isActive === 1)
                    : [];
                return val;
            });
            const successResponse = {
                status: 1,
                message: 'Successfully Get supplier',
                data: filteredSuppliers,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Create Supplier Contact API
    /**
     * @api {Post} /api/supplier/create-contact  Create Supplier Contact API
     * @apiGroup Supplier
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} supplierId supplierId
     * @apiParam (Request body) {String} name name
     * @apiParam (Request body) {String} email email
     * @apiParam (Request body) {String} mobile mobile
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {string} position position
     * @apiParamExample {json} Input
     * {
     *    "supplierId": 1,
     *    "name": "",
     *    "email": "",
     *    "mobile": "",
     *    "status": 1,
     *    "position": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Supplier Contact Created.",
     *    "data": {
     *        "name": "",
     *        "email": "",
     *        "supplierId": 1,
     *        "mobile": "",
     *        "position": "",
     *        "isActive": 1,
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "id": 1
     *    }
     * }
     * @apiSampleRequest /api/supplier/create-contact
     * @apiErrorExample {json} create contact error
     * HTTP/1.1 500 Internal Server Error
     */
    createSupplierContact(payload, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const supplierName = yield this.supplierContactService.findOne({
                where: {
                    name: payload.name,
                    isDelete: 0,
                    supplierId: payload.supplierId,
                },
            });
            if (supplierName) {
                return response.status(400).send({
                    status: 0,
                    message: 'Supplier Contact Name Already exist.',
                });
            }
            const supplierEmail = yield this.supplierContactService.findOne({
                where: {
                    email: payload.email,
                    isDelete: 0,
                    supplierId: payload.supplierId,
                },
            });
            if (supplierEmail) {
                return response.status(400).send({
                    status: 0,
                    message: 'Supplier Contact email Already exist.',
                });
            }
            // creating supplier contacts
            const SupplierContact = new SupplierContacts_1.SupplierContacts();
            SupplierContact.name = payload.name;
            SupplierContact.email = payload.email;
            SupplierContact.supplierId = payload.supplierId;
            SupplierContact.mobile = payload.mobile;
            SupplierContact.position = payload.position;
            SupplierContact.isActive = payload.status;
            SupplierContact.createdBy = request.user.vendorId;
            const contact = yield this.supplierContactService.save(SupplierContact);
            const successResponse = {
                status: 1,
                message: 'Successfully Supplier Contact Created.',
                data: contact,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Supplier Contact List API
    /**
     * @api {Get} /api/supplier/contacts/list Supplier Contact List API
     * @apiGroup Supplier
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} name name
     * @apiParam (Request body) {String} supplierName supplierName
     * @apiParam (Request body) {String} position position
     * @apiParam (Request body) {String} mobile mobile
     * @apiParam (Request body) {String} createdDate createdDate
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Get All supplier Contact List",
     *    "data": [
     *        {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedBy": 1,
     *            "modifiedDate": "",
     *            "id": 1,
     *            "supplierId": 1,
     *            "name": "",
     *            "email": "",
     *            "mobile": "",
     *            "isActive": 1,
     *            "isDelete": 1,
     *            "position": "",
     *            "supplier": {
     *                "createdBy": 1,
     *                "createdDate": "",
     *                "modifiedBy": 1,
     *                "modifiedDate": "",
     *                "id": 1,
     *                "vendorId": 1,
     *                "supplierName": "",
     *                "taxId": 1,
     *                "address": "",
     *                "tags": "",
     *                "website": "",
     *                "mobile": "",
     *                "countryId": 1,
     *                "catogoryId": 1,
     *                "notes": "",
     *                "comments": "",
     *                "isActive": 1,
     *                "isDelete": 0
     *            }
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/supplier/contacts/list
     * @apiErrorExample {json} role error
     * HTTP/1.1 500 Internal Server Error
     */
    suppliercontactList(limit, offset, keyword, name, supplierName, position, mobile, createdDate, status, count, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const relation = [
                {
                    name: 'supplier',
                    relationDef: 'suppliercontacts.supplier',
                }
            ];
            const searchCondition = [];
            const whereConditions = [
                {
                    name: 'suppliercontacts.isDelete',
                    op: 'and',
                    value: 0,
                },
                {
                    name: 'supplier.vendorId',
                    op: 'and',
                    value: request.user.vendorId,
                }, {
                    name: 'supplier.isDelete',
                    op: 'and',
                    value: 0,
                },
            ];
            if (status === 0 || status === 1) {
                whereConditions.push({
                    name: 'suppliercontacts.isActive',
                    op: 'and',
                    value: status,
                });
            }
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                searchCondition.push({
                    name: ['suppliercontacts.name', 'suppliercontacts.position', 'supplier.supplierName'],
                    value: keyword,
                });
            }
            else {
                if (name === null || name === void 0 ? void 0 : name.trim()) {
                    searchCondition.push({
                        name: ['suppliercontacts.name'],
                        value: name,
                    });
                }
                if (supplierName === null || supplierName === void 0 ? void 0 : supplierName.trim()) {
                    searchCondition.push({
                        name: ['supplier.supplierName'],
                        value: supplierName,
                    });
                }
                if (position === null || position === void 0 ? void 0 : position.trim()) {
                    searchCondition.push({
                        name: ['suppliercontacts.position'],
                        value: position,
                    });
                }
                if (mobile === null || mobile === void 0 ? void 0 : mobile.trim()) {
                    searchCondition.push({
                        name: ['suppliercontacts.mobile'],
                        value: mobile,
                    });
                }
                if (createdDate) {
                    searchCondition.push({
                        name: ['suppliercontacts.createdDate', 'suppliercontacts.modifiedDate'],
                        value: createdDate,
                    });
                }
            }
            const supplierList = yield this.supplierContactService.list(limit, offset, select, relation, whereConditions, searchCondition, count);
            if (count) {
                const successResponseCount = {
                    status: 1,
                    message: 'Successfully Get The supplier Contact Count',
                    data: supplierList,
                };
                return response.status(200).send(successResponseCount);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully Get All supplier Contact List',
                data: supplierList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Supplier Contact Detail API
    /**
     * @api {Get} /api/supplier/contact/:id  Supplier contact detail API
     * @apiGroup Supplier
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Get supplier Contact",
     *    "data": {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedBy": 1,
     *            "modifiedDate": "",
     *            "id": 1,
     *            "supplierId": 1,
     *            "name": "",
     *            "email": "",
     *            "mobile": "",
     *            "isActive": 1,
     *            "isDelete": 0,
     *            "position": "",
     *            "supplier": {
     *                "createdBy": 1,
     *                "createdDate": "",
     *                "modifiedBy": 1,
     *                "modifiedDate": "",
     *                "id": 1,
     *                "vendorId": 1,
     *                "supplierName": "",
     *                "taxId": 1,
     *                "address": "",
     *                "tags": "",
     *                "website": "",
     *                "mobile": "",
     *                "countryId": 1,
     *                "catogoryId": 1,
     *                "notes": "",
     *                "comments": "",
     *                "isActive": 1,
     *                "isDelete": 0
     *            }
     *     }
     * }
     * @apiSampleRequest /api/supplier/contact/:id
     * @apiErrorExample {json} supplierContactDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    supplierContactDetail(id, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const supplierData = yield this.supplierContactService.findOne({
                relations: ['supplier'],
                where: (qb) => {
                    qb.where('SupplierContacts.id =' + id);
                },
            });
            if (!supplierData) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid supplier Contact Id..!`,
                });
            }
            const successResponse = {
                status: 1,
                message: 'Successfully Get supplier Contact',
                data: supplierData,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Updating supplier Contact
    /**
     * @api {Put} /api/supplier/contact/:id Update supplier contact API
     * @apiGroup Supplier
     * @apiParam (Request body) {String} name name
     * @apiParam (Request body) {String{..32}} email  email
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} id id
     * @apiParam (Request body) {Number} supplierId  supplierId
     * @apiParam (Request body) {String{..20}} mobile mobileNumber
     * @apiParam (Request body) {String{..128}} position position
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "email" : "",
     *      "status" : "",
     *      "supplierId" : 1,
     *      "mobile" : "",
     *      "position" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Supplier Contacts Updated Successfully.",
     *    "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "id": 1,
     *        "supplierId": 1,
     *        "name": "",
     *        "email": "",
     *        "mobile": "",
     *        "isActive": 1,
     *        "isDelete": 0,
     *        "position": ""
     *    }
     *  }
     * @apiSampleRequest /api/supplier/contact/:id
     * @apiErrorExample {json} UpdateSupplierContact error
     * HTTP/1.1 500 Internal Server Error
     */
    UpdateSupplierContact(id, payload, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const getSupplierContact = yield this.supplierContactService.findOne({
                where: {
                    // supplierId: payload.supplierId,
                    id,
                    isDelete: 0,
                },
            });
            if (!getSupplierContact) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid supplier contact id',
                });
            }
            const supplierName = yield this.supplierContactService.findOne({
                where: {
                    id: (0, typeorm_1.Not)(id),
                    name: payload.name,
                    isDelete: 0,
                    supplierId: payload.supplierId,
                },
            });
            if (supplierName) {
                return response.status(400).send({
                    status: 0,
                    message: 'Supplier Contact Name Already exist.',
                });
            }
            const supplierEmail = yield this.supplierContactService.findOne({
                where: {
                    id: (0, typeorm_1.Not)(id),
                    email: payload.email,
                    isDelete: 0,
                    supplierId: payload.supplierId,
                },
            });
            if (supplierEmail) {
                return response.status(400).send({
                    status: 0,
                    message: 'Supplier Contact email Already exist.',
                });
            }
            getSupplierContact.name = payload.name;
            getSupplierContact.email = payload.email;
            getSupplierContact.supplierId = payload.supplierId;
            getSupplierContact.mobile = payload.mobile;
            getSupplierContact.position = payload.position;
            getSupplierContact.isActive = payload.status;
            const contact = yield this.supplierContactService.update(getSupplierContact.id, getSupplierContact);
            const successResponse = {
                status: 1,
                message: 'Supplier Contacts Updated Successfully.',
                data: contact,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Updating supplier Contact status
    /**
     * @api {put} /api/supplier/contacts/status Update supplier contact status API
     * @apiGroup Supplier
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} id  id
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "status" : 1,
     *      "id" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Update contact status..!",
     *  }
     * @apiSampleRequest /api/supplier/contacts/status
     * @apiErrorExample {json} updateContact error
     * HTTP/1.1 500 Internal Server Error
     */
    updateContactStatus(contactId, status, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const getContact = yield this.supplierContactService.find({
                where: {
                    // supplierId: payload.supplierId,
                    id: (0, typeorm_1.In)(contactId),
                    isDelete: 0,
                    supplier: { vendorId: request.user.vendorId },
                }, relations: ['supplier'],
            });
            getContact.map((val => val.isActive = status));
            // }
            yield this.supplierContactService.save(getContact);
            return response.status(200).send({
                status: 1,
                message: 'Successfully Update contact status..!',
            });
        });
    }
    // Delete supplier contact API
    /**
     * @api {Delete} /api/supplier/contact/:id Delete Supplier Contact API
     * @apiGroup Supplier
     * @apiParam (Request body) {Number} id id (Required)
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Supplier Contact Deleted successfully.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/supplier/contact/:id
     * @apiErrorExample {json} deletesuppliercontact error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteSupplierContact(id, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const supplierContact = yield this.supplierContactService.findOne({
                where: {
                    id,
                    isDelete: 0,
                },
            });
            if (!supplierContact) {
                const errResponse = {
                    status: 1,
                    message: 'Invalid supplier contact Id.',
                };
                return response.status(400).send(errResponse);
            }
            yield this.supplierContactService.delete({ id });
            const successResponse = {
                status: 1,
                message: 'Supplier Contact Deleted successfully.',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Updating supplier Link Doc
    /**
     * @api {put} /api/supplier/document/:id Update Supplier document link API
     * @apiGroup Supplier
     * @apiParam (Request body) {String} name name
     * @apiParam (Request body) {String{..32}} fileName fileName
     * @apiParam (Request body) {String} filePath filePath
     * @apiParam (Request body) {String} supplierId  supplierId
     * @apiParam (Request body) {String} link link
     * @apiParam (Request body) {Number} status status
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "fileName" : "",
     *      "supplierId" : "",
     *      "filePath" : "",
     *      "link" : "",
     *      "status" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Supplier Contact Updated Successfully.",
     *    "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "id": 1,
     *        "supplierId": "",
     *        "documentId": "",
     *        "name": "",
     *        "filePath": "",
     *        "fileName": "",
     *        "link": "",
     *        "isApproved": 1,
     *        "isDelete": 1,
     *        "isActive": 0,
     *        "UploadType": ""
     *    }
     * }
     * @apiSampleRequest /api/supplier/document/:id
     * @apiErrorExample {json} updateLink error
     * HTTP/1.1 500 Internal Server Error
     */
    UpdateSupplierDocument(id, payload, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const supplierLink = yield this.supplierLinkDocService.findOne({
                where: {
                    id,
                },
            });
            if (!supplierLink) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid supplier id',
                });
            }
            supplierLink.name = payload.name;
            supplierLink.fileName = payload.fileName;
            supplierLink.supplierId = payload.supplierId;
            supplierLink.filePath = payload.filePath;
            supplierLink.link = payload.link;
            supplierLink.isActive = payload.status;
            const contact = yield this.supplierLinkDocService.update(supplierLink.id, supplierLink);
            const successResponse = {
                status: 1,
                message: 'Supplier Contact Updated Successfully.',
                data: contact,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Delete supplier Document API
    /**
     * @api {delete} /api/supplier/document/:id Delete Supplier document API
     * @apiGroup Supplier
     * @apiParam (Request body) {Number} id id
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Supplier Document deleted successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/supplier/document/:id
     * @apiErrorExample {json} deletesuppliercontact error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteSupplierDocument(id, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const supplierContact = yield this.supplierLinkDocService.findOne({
                where: {
                    id,
                    isDelete: 0,
                },
            });
            if (!supplierContact) {
                const errResponse = {
                    status: 1,
                    message: 'Invalid supplier doucment Id.',
                };
                return response.status(400).send(errResponse);
            }
            yield this.supplierLinkDocService.delete({ id });
            const successResponse = {
                status: 1,
                message: 'Document Deleted successfully.',
            };
            return response.status(200).send(successResponse);
        });
    }
    // ExportSupplier API
    /**
     * @api {Get} /api/supplier/export/supplier Export supplier API
     * @apiGroup  Supplier
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} supplierIds supplierIds (Required)
     * @apiSampleRequest  /api/supplier/export/supplier
     * @apiErrorExample {json}  Export Supplier error
     * HTTP/1.1 500 Internal Server Error
     */
    exportSupplier(supplierIds, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Supplier List');
            const rows = [];
            worksheet.columns = [
                { header: 'Supplier Id', key: 'supplierId', size: 46, width: 15 },
                { header: 'Supplier Name', key: 'supplierName', size: 46, width: 15 },
                { header: 'Country', key: 'country', size: 46, width: 15 },
                { header: 'Category', key: 'category', size: 46, width: 15 },
                { header: 'Phone Number', key: 'mobile', size: 46, width: 15 },
                { header: 'Status', key: 'isActive', size: 16, width: 15 },
                { header: 'Last Updated On', key: 'lastUpdateOn', size: 46, width: 19 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            const condition = {};
            condition.select = ['id', 'supplierName', 'mobile', 'modifiedDate', 'isActive'];
            condition.relations = ['country', 'category'];
            if (supplierIds.trim()) {
                condition.where = { id: (0, typeorm_1.In)(supplierIds.split(',')) };
            }
            const supplierData = yield this.supplierService.find(condition);
            for (const supplier of supplierData) {
                rows.push([supplier.id, supplier.supplierName, (supplier.country.name), (supplier.category.categorySlug), supplier.mobile, supplier.isActive ? 'ACTIVE' : 'IN-ACTIVE', supplier.modifiedDate]);
            }
            worksheet.addRows(rows);
            const fileName = './SupplierExcel' + Date.now() + '.xlsx';
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
    // ExportSupplier Contact API
    /**
     * @api {Get} /api/supplier/export/supplier-contact Export supplier Contact API
     * @apiGroup  Supplier
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} suppliercontactIds suppliercontactIds (Required)
     * @apiSampleRequest  /api/supplier/export/supplier-contact
     * @apiErrorExample {json}  Export Supplier Contact error
     * HTTP/1.1 500 Internal Server Error
     */
    exportSupplierContact(suppliercontactIds, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Supplier List');
            const rows = [];
            worksheet.columns = [
                { header: 'Company', key: 'company', size: 46, width: 15 },
                { header: 'Name', key: 'name', size: 46, width: 15 },
                { header: 'position', key: 'position', size: 46, width: 15 },
                { header: 'Email', key: 'email', size: 46, width: 15 },
                { header: 'Phone Number', key: 'mobile', size: 46, width: 15 },
                { header: 'Status', key: 'isActive', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            const condition = {};
            condition.select = ['name', 'email', 'mobile', 'position', 'isActive', 'supplier'];
            condition.relations = ['supplier'];
            if (suppliercontactIds.trim()) {
                condition.where = { id: (0, typeorm_1.In)(suppliercontactIds.split(',')) };
            }
            const suppliercontactData = yield this.supplierContactService.find(condition);
            for (const contact of suppliercontactData) {
                rows.push([(contact.supplier.supplierName), contact.name, contact.position, contact.email, contact.mobile, contact.isActive ? 'ACTIVE' : 'IN-ACTIVE']);
            }
            worksheet.addRows(rows);
            const fileName = './SupplierContactExcel' + Date.now() + '.xlsx';
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
    // Delete multiple supplier API
    /**
     * @api {Delete} /api/supplier/delete-multiple/supplier Delete multiple supplier API
     * @apiGroup Supplier
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} ids ids (Required)
     * @apiParamExample {json} Input
     * {
     *      "ids" : [],
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Deleted The supplier Data",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/supplier/delete-multiple/supplier
     * message: 'Invalid Supplier Id Occur..',
     * @apiErrorExample {json} bulkDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    bulkDelete(ids, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (const id of ids) {
                const supplier = yield this.supplierService.findOne({ where: { id, isDelete: 0 } });
                if (!supplier) {
                    return response.status(400).send({
                        status: 0,
                        message: `Invalid Supplier Id ${id} Occur..`,
                    });
                }
                yield this.supplierService.delete({ id });
            }
            return response.status(200).send({
                status: 1,
                message: 'Successfully Deleted The Supplier Datas.',
            });
        });
    }
    // Delete multiple supplier contact API
    /**
     * @api {Delete} /api/supplier/delete-multiple/contact Delete multiple supplier contact API
     * @apiGroup Supplier
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} ids ids
     * @apiParamExample {json} Input
     * {
     *      "ids" : [],
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Deleted The supplier Data",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/supplier/delete-multiple/contact
     * message: 'Invalid Supplier Id Occur..',
     * @apiErrorExample {json} Delete Multiple Contact error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteMultipleContact(ids, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (const id of ids) {
                const supplierContact = yield this.supplierContactService.findOne({ where: { id, isDelete: 0 } });
                if (!supplierContact) {
                    return response.status(400).send({
                        status: 0,
                        message: `Invalid Supplier Contact Id ${id} Occur..`,
                    });
                }
                yield this.supplierContactService.delete({ id });
            }
            return response.status(200).send({
                status: 1,
                message: 'Successfully Deleted The Supplier Contact Datas.',
            });
        });
    }
};
exports.SupplierController = SupplierController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateSupplierRequest_1.CreateSupplierRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "createSupplier", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, UpdateSupplierRequest_1.UpdateSupplierRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "UpdateSupplier", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/create-supplier'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateSupplierScheRequest_1.CreateSupplierScheRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "createSuppliersche", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-supplier/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, UpdateSuppliersRequest_1.UpdateSuppliersRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "UpdateSuppliers", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/status/update'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('status')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "upadteSupplierStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "deleteSuppliers", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('supplierName')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('updatedDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('countryName')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('categoryName')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('mobileNumber')),
    tslib_1.__param(8, (0, routing_controllers_1.QueryParam)('createdDate')),
    tslib_1.__param(9, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(10, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(11, (0, routing_controllers_1.Res)()),
    tslib_1.__param(12, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, String, String, String, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "supplierList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "supplierDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/create-contact'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateSupplierContactRequest_1.CreateSupplierContactRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "createSupplierContact", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/contacts/list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('name')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('supplierName')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('position')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('mobile')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('createdDate')),
    tslib_1.__param(8, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(9, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(10, (0, routing_controllers_1.Res)()),
    tslib_1.__param(11, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, String, String, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "suppliercontactList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/contact/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "supplierContactDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/contact/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateSupplierContactRequest_1.CreateSupplierContactRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "UpdateSupplierContact", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/contacts/status'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('status')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "updateContactStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/contact/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "deleteSupplierContact", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/document/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, UpdateSupplierContactRequest_1.UpdateSupplierLink, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "UpdateSupplierDocument", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/document/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "deleteSupplierDocument", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/export/supplier'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('supplierIds')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "exportSupplier", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/export/supplier-contact'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('suppliercontactIds')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "exportSupplierContact", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete-multiple/supplier'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('ids')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "bulkDelete", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete-multiple/contact'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('ids')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "deleteMultipleContact", null);
exports.SupplierController = SupplierController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/supplier'),
    tslib_1.__metadata("design:paramtypes", [SupplierService_1.SupplierService,
        SupplierContactService_1.SupplierContactsService,
        SupplierLinkDocService_1.SupplierLinkDocService])
], SupplierController);
//# sourceMappingURL=SupplierController.js.map