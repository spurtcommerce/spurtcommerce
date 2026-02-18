"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorPriceGroupController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const VendorPriceGroupService_1 = require("../../services/VendorPriceGroupService");
const VendorPriceGroupRequest_1 = require("./requests/VendorPriceGroupRequest");
const VendorPriceGroup_1 = require("../../models/VendorPriceGroup");
const VendorPriceGroupDetailService_1 = require("../../services/VendorPriceGroupDetailService");
const VendorCustomerPriceService_1 = require("../../services/VendorCustomerPriceService");
const typeorm_1 = require("typeorm");
const VendorPriceGroupDetail_1 = require("../../models/VendorPriceGroupDetail");
const VendorCustomerPrice_1 = require("../../models/VendorCustomerPrice");
const VendorCustomerGroupPrice_1 = require("../../models/VendorCustomerGroupPrice");
const VendorCustomerGroupPriceService_1 = require("../../services/VendorCustomerGroupPriceService");
const SkuService_1 = require("../../../../src/api/core/services/SkuService");
const CreateProductPriceGroupRequest_1 = require("./requests/CreateProductPriceGroupRequest");
const VendorPriceGroupSchedule_1 = require("../../models/VendorPriceGroupSchedule");
const VendorPriceGroupScheduleService_1 = require("../../services/VendorPriceGroupScheduleService");
const fs = require("fs");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const pluginLoader_1 = require("../../../../src/loaders/pluginLoader");
const typeormLoader_1 = require("../../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let VendorPriceGroupController = class VendorPriceGroupController {
    constructor(vendorPriceGroupService, vendorPriceGroupDetailService, vendorCustomerPriceService, vendorCustomerGroupPriceService, skuService, vendorPriceGroupScheduleService, productService) {
        this.vendorPriceGroupService = vendorPriceGroupService;
        this.vendorPriceGroupDetailService = vendorPriceGroupDetailService;
        this.vendorCustomerPriceService = vendorCustomerPriceService;
        this.vendorCustomerGroupPriceService = vendorCustomerGroupPriceService;
        this.skuService = skuService;
        this.vendorPriceGroupScheduleService = vendorPriceGroupScheduleService;
        this.productService = productService;
        // --
    }
    // GetSellerPriceGroupList API
    /**
     * @api {get} /api/vendor-price-group  GetSellerPriceGroupList API
     * @apiGroup SelllerPriceGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {string} keyword keyword
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {string} groupName groupName
     * @apiParam (Request body) {string} groupName groupName
     * @apiParam (Request body) {Number} isDefault isDefault
     * @apiParam (Request body) {string} createdDate createdDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "status": 1,
     *  "message": "Vendor price group list successfully retrieved.",
     *  "data": [
     *   {
     *       "createdBy": 1,
     *       "createdDate": "",
     *       "modifiedBy": 1,
     *       "modifiedDate": "",
     *       "id": 1,
     *       "vendorId": 1,
     *       "name": "",
     *       "slug": "",
     *       "description": "",
     *       "isActive": 1,
     *       "isDelete": 0,
     *       "isDefault": 1,
     *       "totalProduct": 1,
     *       "totalBuyer": 1
     *           }
     *   ]
     *  }
     * @apiSampleRequest /api/vendor-price-group
     * @apiErrorExample {json} price error
     * HTTP/1.1 500 Internal Server Error
     */
    getSellerPriceGroupList(limit, keyword, request, groupName, isDefault, createdDate, offset, status, updatedDate, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const whereConditions = [];
            whereConditions.push({
                name: 'is_delete',
                op: 'where',
                value: 0,
            }, {
                name: 'vendor_id',
                op: 'and',
                value: request.user.vendorId,
            });
            if (status === 0 || status === 1) {
                whereConditions.push({
                    name: 'is_active',
                    op: 'and',
                    value: status,
                });
            }
            const searchCondition = [];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                searchCondition.push({
                    name: ['name'],
                    value: keyword,
                });
            }
            else {
                if (groupName === null || groupName === void 0 ? void 0 : groupName.trim()) {
                    searchCondition.push({
                        name: ['name'],
                        value: groupName,
                    });
                }
                if (isDefault) {
                    searchCondition.push({
                        name: ['is_default'],
                        value: isDefault,
                    });
                }
                if (createdDate) {
                    searchCondition.push({
                        name: ['created_date'],
                        value: createdDate,
                    });
                }
                if (updatedDate) {
                    searchCondition.push({
                        name: ['modified_date'],
                        value: updatedDate,
                    });
                }
            }
            const priceGroupList = yield this.vendorPriceGroupService.list(limit, offset, [], [], whereConditions, searchCondition, count);
            if (count) {
                return response.status(200).send({
                    status: 1,
                    data: priceGroupList,
                    message: `Successfully retrieved the vendor price group count.`,
                });
            }
            const priceGroupDetailList = yield Promise.all(priceGroupList.map((priceGroup) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const totalProduct = yield this.vendorPriceGroupDetailService.getPriceGroupProductCount(priceGroup.id);
                const totalBuyer = yield this.vendorCustomerPriceService.getPriceGroupBuyerCount(priceGroup.id);
                priceGroup.totalProduct = totalProduct;
                priceGroup.totalBuyer = totalBuyer;
                return priceGroup;
            })));
            return response.status(200).send({
                status: 1,
                message: 'Vendor price group list successfully retrieved!',
                data: priceGroupDetailList,
            });
        });
    }
    // Update Bulk Vendor PriceGroup Status
    /**
     * @api {post} /api/vendor-price-group/bulk-status Admin Vendor Update PriceGroup Status
     * @apiGroup SelllerPriceGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number[]} priceGroupIds priceGroupIds
     * @apiParam (Request body) {Number} statusId statusId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated the bulk category status",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-price-group/bulk-status
     * @apiErrorExample {json} Admin Vendor Update PriceGroup Status error
     * HTTP/1.1 500 Internal Server Error
     */
    updateVendorPriceGroupStatus(params, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const priceGroupIds = params.priceGroupIds;
            const updatePriceGroupValue = [];
            if (priceGroupIds.length) {
                for (const priceGroupId of priceGroupIds) {
                    const findPriceGroup = yield this.vendorPriceGroupService.findOne({ where: { id: priceGroupId, isDelete: 0 } });
                    if (!findPriceGroup) {
                        return response.status(400).send({ status: 0, message: 'Invalid price group ID provided.' });
                    }
                    findPriceGroup.isActive = params.statusId;
                    updatePriceGroupValue.push(findPriceGroup);
                }
                yield this.vendorPriceGroupService.create(updatePriceGroupValue);
                return response.status(200).send({ status: 1, message: 'Bulk price group status updated successfully.' });
            }
        });
    }
    // CreateSellerPriceGroupDetail API
    /**
     * @api {Post} /api/vendor-price-group  CreateSellerPriceGroupDetail API
     * @apiGroup SelllerPriceGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {string} priceGroupName priceGroupName
     * @apiParam (Request body) {string} description description
     * @apiParam (Request body) {Number} isDefault isDefault
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} buyerIds buyerIds
     * @apiParam (Request body) {Number} buyerGroupIds buyerGroupIds
     * @apiParamExample {json} Input
     * {
     *  "priceGroupName": "",
     *  "description": "",
     *   "isDefault": 1,
     *   "status": 1,
     *   "buyerIds": [],
     *   "buyerGroupIds": [],
     *   "createProductDetails": [
     * {
     *   "skuId": 1,
     *   "maxQuantity": 1,
     *   "price": 1,
     *   "unitId": 1
     * }
     * ],
     *   "createPriceGroupSchedule": [
     * {
     * "startDate": "",
     * "endDate": ""
     * }
     * ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *
     *  "status": 1,
     *  "message": "Successfully Created Seller Price Group..",
     *  "data": [{
     *   "name": "",
     *   "slug": "",
     *   "description": "",
     *   "vendorId": 1,
     *   "isDefault": 1,
     *   "createdBy": 1,
     *   "isActive": 1,
     *   "createdDate": "",
     *   "modifiedBy": 1,
     *   "modifiedDate": "",
     *   "id": 1
     * }]
     *  }
     * @apiSampleRequest /api/vendor-price-group
     * @apiErrorExample {json} price error
     * HTTP/1.1 500 Internal Server Error
     */
    createSellerPriceGroupDetail(priceGroupParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const sellerInfo = request.user;
            if (+sellerInfo.approvalFlag !== 1) {
                return response.status(400).send({
                    status: 0,
                    message: 'You do not have permission to update this product. Please reach out to an admin for support.',
                });
            }
            const queryRunner = (0, typeormLoader_1.getDataSource)().createQueryRunner(); // Saving Entity With Rollback And Commit Feature..
            if (priceGroupParam.isDefault === 1) {
                const priceGroup = yield this.vendorPriceGroupService.findOne({ where: { vendorId: request.user.vendorId, isDefault: 1 } });
                if (priceGroup) {
                    return response.status(400).send({
                        status: 0,
                        message: `A default seller price group already exists. You cannot create another default group.`,
                    });
                }
            }
            const priceGroupName = yield this.vendorPriceGroupService.findOne({ where: { vendorId: request.user.vendorId, name: priceGroupParam.priceGroupName } });
            if (priceGroupName) {
                return response.status(400).send({
                    status: 0,
                    message: `A price group with this name already exists. Please choose a different name.`,
                });
            }
            if (priceGroupParam.createProductDetails.length === 0) {
                return response.status(400).send({
                    status: 0,
                    message: `You can map at least one product to this pricing group.`,
                });
            }
            // await queryRunner.startTransaction();
            try {
                const newPriceGroup = new VendorPriceGroup_1.VendorPriceGroup();
                const slugName = priceGroupParam.priceGroupName.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.':*?<>{}]/g, '').toLowerCase();
                newPriceGroup.name = priceGroupParam.priceGroupName;
                newPriceGroup.slug = slugName;
                newPriceGroup.description = priceGroupParam.description;
                newPriceGroup.vendorId = request.user.vendorId;
                newPriceGroup.isDefault = priceGroupParam.isDefault;
                newPriceGroup.createdBy = request.user.id;
                newPriceGroup.isDelete = 0;
                newPriceGroup.isActive = priceGroupParam.status;
                const savePriceGroup = yield queryRunner.manager.save(newPriceGroup);
                // mapping price group detail
                if (priceGroupParam.createProductDetails) {
                    const productDetails = priceGroupParam.createProductDetails;
                    for (const productDetail of productDetails) {
                        const newVendorPriceGroupDetail = new VendorPriceGroupDetail_1.VendorPriceGroupDetail();
                        newVendorPriceGroupDetail.priceGroupId = savePriceGroup.id;
                        newVendorPriceGroupDetail.skuId = productDetail.skuId;
                        newVendorPriceGroupDetail.unitId = productDetail.unitId;
                        newVendorPriceGroupDetail.price = productDetail.price;
                        newVendorPriceGroupDetail.maxQuantity = productDetail.maxQuantity;
                        newVendorPriceGroupDetail.isActive = 1;
                        newVendorPriceGroupDetail.isDelete = 0;
                        const priceGroupDetailData = yield this.vendorPriceGroupDetailService.save(newVendorPriceGroupDetail);
                        // mapping price group detail schedule
                        if (priceGroupParam.createPriceGroupSchedule) {
                            const scheduleDetails = priceGroupParam.createPriceGroupSchedule;
                            for (const scheduleDetail of scheduleDetails) {
                                const newPriceGroupSchedule = new VendorPriceGroupSchedule_1.VendorPriceGroupSchedule();
                                newPriceGroupSchedule.priceGroupDetailId = priceGroupDetailData.id;
                                newPriceGroupSchedule.startDate = scheduleDetail.startDate;
                                newPriceGroupSchedule.endDate = scheduleDetail.endDate;
                                newPriceGroupSchedule.isActive = 1;
                                newPriceGroupSchedule.isDelete = 0;
                                yield this.vendorPriceGroupScheduleService.save(newPriceGroupSchedule);
                            }
                        }
                    }
                }
                // -- Adding/mapping customer For price group
                if (priceGroupParam.buyerIds) {
                    const sellerBuyerPrices = [];
                    for (const customerId of priceGroupParam.buyerIds) {
                        const sellerBuyerPrice = new VendorCustomerPrice_1.VendorCustomerPrice();
                        sellerBuyerPrice.customerId = customerId;
                        sellerBuyerPrice.priceGroupId = savePriceGroup.id;
                        sellerBuyerPrice.createdBy = request.user.vendorId;
                        sellerBuyerPrice.modifiedBy = request.user.vendorId;
                        sellerBuyerPrices.push(sellerBuyerPrice);
                    }
                    yield queryRunner.manager.save(sellerBuyerPrices);
                }
                // -- Adding/mapping customer Group For price group
                if (priceGroupParam.buyerGroupIds) {
                    const sellerBuyerGroupPrices = [];
                    for (const customerGroupId of priceGroupParam.buyerGroupIds) {
                        const sellerBuyerGroupPrice = new VendorCustomerGroupPrice_1.VendorCustomerGroupPrice();
                        sellerBuyerGroupPrice.customerGroupId = customerGroupId;
                        sellerBuyerGroupPrice.priceGroupId = savePriceGroup.id;
                        sellerBuyerGroupPrice.createdBy = request.user.vendorId;
                        sellerBuyerGroupPrice.modifiedBy = request.user.vendorId;
                        sellerBuyerGroupPrices.push(sellerBuyerGroupPrice);
                    }
                    yield queryRunner.manager.save(sellerBuyerGroupPrices);
                }
                // await queryRunner.commitTransaction();
                // await queryRunner.release();
                return response.status(200).send({
                    status: 1,
                    message: `Seller price group successfully created.`,
                    data: savePriceGroup,
                });
            }
            catch (err) {
                // await queryRunner.rollbackTransaction();
                throw err;
            }
        });
    }
    // CreateProductPriceGroup API
    /**
     * @api {Put} /api/vendor-price-group/sku  CreateProductPriceGroup API
     * @apiGroup VendorPriceGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} priceGroupId priceGroupId
     * @apiParam (Request body) {Number} skuId skuId
     * @apiParam (Request body) {Number} maxQuantity maxQuantity
     * @apiParam (Request body) {Number} price price
     * @apiParam (Request body) {String} startDate startDate
     * @apiParam (Request body) {String} endDate endDate
     * @apiParamExample {json} Input
     * {
     *    "createProductPriceGroup": [
     *      {
     *        "priceGroupId": 1,
     *        "skuId": 1,
     *        "maxQuantity": 1,
     *        "price": 1,
     *        "startDate": "",
     *        "endDate": ""
     *      },
     *    ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Created Price Group Detail for Product..!",
     *    "data": [
     *        {
     *            "skuId": 1,
     *            "maxQuantity": 1,
     *            "price": "",
     *            "priceGroupId": 1,
     *            "createdDate": "",
     *            "id": 1
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/vendor-price-group/sku
     * @apiErrorExample {json} price error
     * HTTP/1.1 500 Internal Server Error
     */
    createProductPriceGroup(response, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const priceGroupDetailPreSave = new VendorPriceGroupDetail_1.VendorPriceGroupDetail();
            if (payload.id) {
                priceGroupDetailPreSave.id = payload.id;
            }
            const sku = yield this.skuService.findOne({ where: { id: payload.skuId } });
            if (!sku) {
                return response.status(200).send({
                    status: 1,
                    message: `Invalid SKU ID. Please check the provided SKU and try again`,
                });
            }
            priceGroupDetailPreSave.skuId = sku.id;
            priceGroupDetailPreSave.maxQuantity = payload.maxQuantity;
            priceGroupDetailPreSave.price = payload.price;
            priceGroupDetailPreSave.priceGroupId = payload.priceGroupId;
            priceGroupDetailPreSave.isActive = 1;
            priceGroupDetailPreSave.isDelete = 0;
            const savePriceGroupDetail = yield this.vendorPriceGroupDetailService.save(priceGroupDetailPreSave);
            // update price schedule
            const priceGroupSchedule = new VendorPriceGroupSchedule_1.VendorPriceGroupSchedule();
            const priceGroupDetailSchedule = yield this.vendorPriceGroupScheduleService.findOne({ where: { priceGroupDetailId: savePriceGroupDetail.id } });
            if (priceGroupDetailSchedule) {
                priceGroupSchedule.id = priceGroupDetailSchedule.id;
            }
            priceGroupSchedule.priceGroupDetailId = savePriceGroupDetail.id;
            priceGroupSchedule.startDate = payload.startDate;
            priceGroupSchedule.endDate = payload.endDate;
            priceGroupSchedule.isActive = 1;
            priceGroupSchedule.isDelete = 0;
            yield this.vendorPriceGroupScheduleService.save(priceGroupSchedule);
            return response.status(200).send({
                status: 1,
                message: `Successfully created price group detail for the product.`,
                data: savePriceGroupDetail,
            });
        });
    }
    // Get product price group details by sku API
    /**
     * @api {get} /api/vendor-price-group/sku/:id  Create product price group details by sku API
     * @apiGroup SelllerPriceGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} sku id (Required)
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *        "status": 1,
     *        "message": "Successfully Got Price Group Detail for Product..!",
     *        "data": [
     *            {
     *                "id": 1,
     *                "priceGroupId": 1,
     *                "skuId": 1,
     *                "maxQuantity": 1,
     *                "price": "",
     *                "isActive": 1,
     *                "vendorPriceGroupSchedule": [
     *                    {
     *                       "createdBy": 1,
     *                       "createdDate": "",
     *                       "modifiedBy": 1,
     *                       "modifiedDate": "",
     *                       "id": 1,
     *                       "priceGroupDetailId": 1,
     *                       "startDate": "",
     *                       "endDate": "",
     *                       "isActive": 1,
     *                       "isDelete": 0
     * }
     * ]
     *            }
     *        ]
     * }
     * @apiSampleRequest /api/vendor-price-group/sku/:id
     * @apiErrorExample {json} vendor price group error
     * HTTP/1.1 500 Internal Server Error
     */
    createProductPriceGroupDetailsBySku(response, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const priceGroupDetail = yield this.vendorPriceGroupDetailService.find({
                where: {
                    skuId: id,
                }, relations: ['vendorPriceGroupSchedule', 'vendorPriceGroup'], select: ['id', 'priceGroupId', 'price', 'maxQuantity', 'isActive'],
            });
            const promise = priceGroupDetail.map((pricegroup) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = pricegroup;
                pricegroup.priceGroupName = temp.vendorPriceGroup.name;
                temp.vendorPriceGroup = undefined;
                pricegroup.customerMapped = (yield this.vendorCustomerPriceService.find({ where: { priceGroupId: temp.priceGroupId } })).length;
                return temp;
            }));
            const finalResult = yield Promise.all(promise);
            return response.status(200).send({
                status: 1,
                message: `Successfully retrieved price group detail for the product.`,
                data: finalResult,
            });
        });
    }
    // Get product price group details by Id API
    /**
     * @api {get} /api/vendor-price-group/detail/:id  Create product price group details by Id API
     * @apiGroup SelllerPriceGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} detail id (Required)
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *        "status": 1,
     *        "message": "Successfully Got Price Group Detail for Product..!",
     *        "data":
     *            {
     *                "id": 1,
     *                "priceGroupId": 1,
     *                "skuId": 1,
     *                "maxQuantity": 1,
     *                "price": "",
     *                "isActive": 1,
     *                "vendorPriceGroupSchedule": [
     *                    {
     *                       "createdBy": 1,
     *                       "createdDate": "",
     *                       "modifiedBy": 1,
     *                       "modifiedDate": "",
     *                       "id": 1,
     *                       "priceGroupDetailId": 1,
     *                       "startDate": "",
     *                       "endDate": "",
     *                       "isActive": 1,
     *                       "isDelete": 0
     *      }
     *          ]
     *            }
     * }
     * @apiSampleRequest /api/vendor-price-group/detail/:id
     * @apiErrorExample {json} vendor price group error
     * HTTP/1.1 500 Internal Server Error
     */
    getProductPriceGroupDetailsById(response, priceGroupDetailId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const priceGroupDetail = yield this.vendorPriceGroupDetailService.findOne({
                where: {
                    id: priceGroupDetailId,
                }, relations: ['vendorPriceGroupSchedule'], select: ['id', 'priceGroupId', 'price', 'maxQuantity', 'isActive'],
            });
            if (!priceGroupDetail) {
                return response.status(200).send({
                    status: 0,
                    message: `Invalid price group detail ID. Please check the ID and try again.`,
                });
            }
            priceGroupDetail.customerMapped = (yield this.vendorCustomerPriceService.find({ where: { priceGroupId: priceGroupDetail.priceGroupId } })).length;
            return response.status(200).send({
                status: 1,
                message: `Successfully retrieved price group detail for the product.`,
                data: priceGroupDetail,
            });
        });
    }
    // UpdateSellerPriceGroupDetail API
    /**
     * @api {Put} /api/vendor-price-group/:id  Update seller price group detail API
     * @apiGroup SellerPriceGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id price group id
     * @apiParam (Request body) {string} priceGroupName priceGroupName
     * @apiParam (Request body) {string} description description
     * @apiParam (Request body) {Number} isDefault isDefault
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} buyerIds buyerIds
     * @apiParam (Request body) {Number} buyerGroupIds buyerGroupIds
     * @apiParam (Request body) {Number} deleteBuyerIds deleteBuyerIds
     * @apiParam (Request body) {Number} deleteBuyerGroupIds deleteBuyerGroupIds
     * @apiParamExample {json} Input
     * {
     *    "priceGroupName": "",
     *    "description": "",
     *    "isDefault": 0,
     *    "status": 1,
     *    "buyerIds": [],
     *    "deleteBuyerIds": [],
     *    "buyerGroupIds": [],
     *    "deleteBuyerGroupIds": [],
     *    "createProductDetails": [
     * {
     *   "skuId": 1,
     *   "maxQuantity": 1,
     *   "price": 1,
     *   "unitId": 1
     * }
     * ],
     *   "createPriceGroupSchedule": [
     * {
     * "startDate": "",
     * "endDate": ""
     * }
     * ],
     * "deleteProductGroupDetailIds": []
     *  }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Vendor price group created successfully.",
     *    "data": {
     *        "id": 1,
     *        "name": "",
     *        "slug": "",
     *        "description": "",
     *        "vendorId": 1,
     *        "isDefault": 1,
     *        "isActive": 1,
     *    }
     * }
     * @apiSampleRequest /api/vendor-price-group/:id
     * @apiErrorExample {json} price error
     * HTTP/1.1 500 Internal Server Error
     */
    updateSellerPriceGroupDetail(id, updatePriceGroupParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const priceGroup = yield this.vendorPriceGroupService.findOne({ where: { id } });
            if (!priceGroup) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid seller price group. Please verify the price group.`,
                });
            }
            const sellerInfo = request.user;
            if (+sellerInfo.approvalFlag !== 1) {
                return response.status(400).send({
                    status: 0,
                    message: 'You do not have permission to update this product. Contact an administrator for more details.',
                });
            }
            const queryRunner = (0, typeormLoader_1.getDataSource)().createQueryRunner(); // Saving Entity With Rollback And Commit Feature..
            if (updatePriceGroupParam.isDefault === 1) {
                const priceGroupData = yield this.vendorPriceGroupService.findOne({ where: { vendorId: request.user.vendorId, isDefault: 1, id: (0, typeorm_1.Not)(id) } });
                if (priceGroupData) {
                    return response.status(400).send({
                        status: 0,
                        message: `A default vendor price group already exists. You cannot create or update the default price group.`,
                    });
                }
            }
            const priceGroupName = yield this.vendorPriceGroupService.findOne({ where: { vendorId: request.user.vendorId, name: updatePriceGroupParam.priceGroupName, id: (0, typeorm_1.Not)(id) } });
            if (priceGroupName) {
                return response.status(400).send({
                    status: 0,
                    message: `The price group name already exists. Please choose a unique name.`,
                });
            }
            if (updatePriceGroupParam.deleteProductGroupDetailIds.length) {
                const productPrice = yield this.vendorPriceGroupDetailService.findOne({ where: { priceGroupId: priceGroup.id } });
                if (!productPrice) {
                    return response.status(400).send({
                        status: 0,
                        message: `You can map at least one product to this pricing group.`,
                    });
                }
            }
            // await queryRunner.startTransaction();
            try {
                const newPriceGroup = new VendorPriceGroup_1.VendorPriceGroup();
                newPriceGroup.id = priceGroup.id;
                const slugName = updatePriceGroupParam.priceGroupName.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.':*?<>{}]/g, '').toLowerCase();
                newPriceGroup.name = updatePriceGroupParam.priceGroupName;
                newPriceGroup.slug = slugName;
                newPriceGroup.description = updatePriceGroupParam.description;
                newPriceGroup.vendorId = request.user.vendorId;
                newPriceGroup.isDefault = updatePriceGroupParam.isDefault;
                newPriceGroup.createdBy = request.user.id;
                newPriceGroup.isActive = updatePriceGroupParam.status;
                const savePriceGroup = yield queryRunner.manager.save(newPriceGroup);
                // delete product
                if (updatePriceGroupParam.deleteProductGroupDetailIds) {
                    // await this.vendorPriceGroupScheduleService.delete({ priceGroupDetailId: In(updatePriceGroupParam.deleteProductGroupDetailIds) });
                    yield this.vendorPriceGroupDetailService.delete({ priceGroupId: priceGroup.id });
                }
                // mapping price group detail
                if (updatePriceGroupParam.createProductDetails) {
                    const productDetails = updatePriceGroupParam.createProductDetails;
                    for (const productDetail of productDetails) {
                        const newVendorPriceGroupDetail = new VendorPriceGroupDetail_1.VendorPriceGroupDetail();
                        // if (productDetail.productDetailId) {
                        //     newVendorPriceGroupDetail.id = productDetail.productDetailId;
                        // }
                        newVendorPriceGroupDetail.priceGroupId = savePriceGroup.id;
                        newVendorPriceGroupDetail.skuId = productDetail.skuId;
                        newVendorPriceGroupDetail.unitId = productDetail.unitId;
                        newVendorPriceGroupDetail.price = productDetail.price;
                        newVendorPriceGroupDetail.maxQuantity = productDetail.maxQuantity;
                        newVendorPriceGroupDetail.isActive = 1;
                        newVendorPriceGroupDetail.isDelete = 0;
                        const priceGroupDetailData = yield this.vendorPriceGroupDetailService.save(newVendorPriceGroupDetail);
                        // mapping price group detail schedule
                        if (updatePriceGroupParam.createPriceGroupSchedule) {
                            const scheduleDetails = updatePriceGroupParam.createPriceGroupSchedule;
                            for (const scheduleDetail of scheduleDetails) {
                                const newPriceGroupSchedule = new VendorPriceGroupSchedule_1.VendorPriceGroupSchedule();
                                // if (scheduleDetail.productDetailScheduleId) {
                                //     newPriceGroupSchedule.id = scheduleDetail.productDetailScheduleId;
                                // }
                                newPriceGroupSchedule.priceGroupDetailId = priceGroupDetailData.id;
                                newPriceGroupSchedule.startDate = scheduleDetail.startDate;
                                newPriceGroupSchedule.endDate = scheduleDetail.endDate;
                                newPriceGroupSchedule.isActive = 1;
                                newPriceGroupSchedule.isDelete = 0;
                                yield this.vendorPriceGroupScheduleService.save(newPriceGroupSchedule);
                            }
                        }
                    }
                }
                // -- Adding/mapping customer For price group
                if ((_a = updatePriceGroupParam.deleteBuyerIds) === null || _a === void 0 ? void 0 : _a.length) {
                    yield queryRunner.manager.delete(VendorCustomerPrice_1.VendorCustomerPrice, { customerId: (0, typeorm_1.In)(updatePriceGroupParam.deleteBuyerIds), priceGroupId: priceGroup.id });
                }
                if ((_b = updatePriceGroupParam.buyerIds) === null || _b === void 0 ? void 0 : _b.length) {
                    // const sellerBuyerPrices: VendorCustomerPrice[] = [];
                    for (const customerId of updatePriceGroupParam.buyerIds) {
                        const sellerBuyerPrice = new VendorCustomerPrice_1.VendorCustomerPrice();
                        const vendorCustomer = yield this.vendorCustomerPriceService.findOne({ where: { customerId, priceGroupId: savePriceGroup.id } });
                        if (vendorCustomer) {
                            sellerBuyerPrice.id = vendorCustomer.id;
                        }
                        sellerBuyerPrice.customerId = customerId;
                        sellerBuyerPrice.priceGroupId = savePriceGroup.id;
                        sellerBuyerPrice.createdBy = request.user.vendorId;
                        sellerBuyerPrice.modifiedBy = request.user.vendorId;
                        yield queryRunner.manager.save(sellerBuyerPrice);
                        // sellerBuyerPrices.push(sellerBuyerPrice);
                    }
                    // await queryRunner.manager.save(sellerBuyerPrices);
                }
                // -- Adding/mapping customer Group For price group
                if ((_c = updatePriceGroupParam.deleteBuyerGroupIds) === null || _c === void 0 ? void 0 : _c.length) {
                    yield queryRunner.manager.delete(VendorCustomerGroupPrice_1.VendorCustomerGroupPrice, { customerGroupId: (0, typeorm_1.In)(updatePriceGroupParam.deleteBuyerGroupIds), priceGroupId: priceGroup.id });
                }
                if ((_d = updatePriceGroupParam.buyerGroupIds) === null || _d === void 0 ? void 0 : _d.length) {
                    // const sellerBuyerGroupPrices: VendorCustomerGroupPrice[] = [];
                    for (const customerGroupId of updatePriceGroupParam.buyerGroupIds) {
                        const sellerBuyerGroupPrice = new VendorCustomerGroupPrice_1.VendorCustomerGroupPrice();
                        const vendorPriceGroup = yield this.vendorCustomerGroupPriceService.findOne({ where: { priceGroupId: savePriceGroup.id, customerGroupId } });
                        if (vendorPriceGroup) {
                            sellerBuyerGroupPrice.id = vendorPriceGroup.id;
                        }
                        sellerBuyerGroupPrice.customerGroupId = customerGroupId;
                        sellerBuyerGroupPrice.priceGroupId = savePriceGroup.id;
                        sellerBuyerGroupPrice.createdBy = request.user.vendorId;
                        sellerBuyerGroupPrice.modifiedBy = request.user.vendorId;
                        yield queryRunner.manager.save(sellerBuyerGroupPrice);
                        // sellerBuyerGroupPrices.push(sellerBuyerGroupPrice);
                    }
                    // await queryRunner.manager.save(sellerBuyerGroupPrices);
                }
                // await queryRunner.commitTransaction();
                // await queryRunner.release();
                return response.status(200).send({
                    status: 1,
                    message: `Vendor price group created successfully.`,
                    data: savePriceGroup,
                });
            }
            catch (err) {
                // await queryRunner.rollbackTransaction();
                throw err;
            }
        });
    }
    // DeletePriceGroupSchedule API
    /**
     * @api {Delete} /api/vendor-price-group/schedule/:scheduleId  DeletePriceGroupSchedule API
     * @apiGroup SelllerPriceGroup
     * @apiParam (Request body) {Number} scheduleId scheduleId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "status": 1,
     *  "message": "Successfully Deleted Schedule Data's.",
     *  }
     * @apiSampleRequest /api/vendor-price-group/schedule/:scheduleId
     * @apiErrorExample {json} price error
     * HTTP/1.1 500 Internal Server Error
     */
    deletePriceGroupSchedule(scheduleId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const scheduleData = yield this.vendorPriceGroupScheduleService.findOne({ where: { id: scheduleId } });
            if (!scheduleData) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid schedule ID. Please check the ID and try again.`,
                });
            }
            yield this.vendorPriceGroupScheduleService.delete({ startDate: scheduleData.startDate, endDate: scheduleData.endDate });
            return response.status(400).send({
                status: 0,
                message: `Successfully deleted the schedule data.`,
            });
        });
    }
    // DeletePriceGroup API
    /**
     * @api {Delete} /api/vendor-price-group/:id   DeletePriceGroup API
     * @apiGroup SelllerPriceGroup
     * @apiParam (Request body) {Number} id id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "status": 1,
     *  "message": "Successfully Deleted Seller Price Group..",
     *  }
     * @apiSampleRequest /api/vendor-price-group/:id
     * @apiErrorExample {json} price error
     * HTTP/1.1 500 Internal Server Error
     */
    deletePriceGroup(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const priceGroup = yield this.vendorPriceGroupService.findOne({ where: { id } });
            if (!priceGroup) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid seller price group.`,
                });
            }
            const sellerInfo = request.user;
            if (+sellerInfo.approvalFlag !== 1) {
                return response.status(400).send({
                    status: 0,
                    message: 'You do not have permission to delete this seller price group. Contact an administrator for assistance.',
                });
            }
            const priceGroupDetail = yield this.vendorPriceGroupDetailService.findOne({ where: { priceGroupId: id } });
            if (priceGroupDetail) {
                return response.status(400).send({
                    status: 0,
                    message: `Cannot delete the seller price group as it is mapped to existing seller price group details.`,
                });
            }
            yield this.vendorPriceGroupService.softDelete(id);
            return response.status(200).send({
                status: 1,
                message: `Successfully deleted the seller price group.`,
            });
        });
    }
    // PriceGroupStatusUpdate API
    /**
     * @api {Put} /api/vendor-price-group/status/:id   PriceGroupStatusUpdate API
     * @apiGroup SellerPriceGroup
     * @apiParam (Request body) {Number} id id
     * @apiParam (Request body) {Number} status status
     *  @apiParamExample {json} Input
     * {
     *  "status": 1
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "status": 1,
     *  "message": "Successfully Update Seller Price Group Status..",
     *  }
     * @apiSampleRequest /api/vendor-price-group/status/:id
     * @apiErrorExample {json} price error
     * HTTP/1.1 500 Internal Server Error
     */
    priceGroupStatusUpdate(id, response, status) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const priceGroup = yield this.vendorPriceGroupService.findOne({ where: { id } });
            if (!priceGroup) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid seller price group. Please check the price group and try again.`,
                });
            }
            priceGroup.isActive = status;
            yield this.vendorPriceGroupService.save(priceGroup);
            return response.status(200).send({
                status: 1,
                message: `Successfully updated the seller price group status.`,
            });
        });
    }
    // Delete Seller Buyer Price Mapping..!
    // DeleteBuyerForPriceGroupDetail API
    /**
     * @api {Delete} /api/vendor-price-group/:priceGroupId/customer/:customerId  DeleteBuyerForPriceGroupDetail API
     * @apiGroup SelllerPriceGroup
     * @apiParam (Request body) {Number} customerId customerId
     * @apiParam (Request body) {Number} priceGroupId priceGroupId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "status": 1,
     *  "message": "Successfully Deleted Seller Buyer Price ..!",
     *  " data" :  {
     *  "generatedMaps": "",
     *  "raw": "",
     *  "affected": ""
     *  }
     *  }
     * @apiSampleRequest  /api/vendor-price-group/:priceGroupId/customer/:customerId
     * @apiErrorExample {json} price error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteBuyerForPriceGroupDetail(response, priceGroupId, customerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.vendorCustomerPriceService.delete({ priceGroupId, customerId });
            return response.status(200).send({
                status: 1,
                message: `Successfully deleted seller buyer price.`,
                data: result,
            });
        });
    }
    // Delete Seller Buyer Price Mapping..!
    // DeleteBuyerGroupForPriceGroupDetail API
    /**
     * @api {Delete} /api/vendor-price-group/:priceGroupId/customer-group/:customerGroupId  DeleteBuyerGroupForPriceGroupDetail API
     * @apiGroup SelllerPriceGroup
     * @apiParam (Request body) {Number} customerGroupId customerGroupId
     * @apiParam (Request body) {Number} priceGroupId priceGroupId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "status": 1,
     *  "message": "Successfully Deleted Seller Buyer Group Price ..!",
     *  " data" :  {
     *  "generatedMaps": "",
     *  "raw": "",
     *  "affected": ""
     *  }
     *  }
     * @apiSampleRequest  /api/vendor-price-group/:priceGroupId/customer-group/:customerGroupId
     * @apiErrorExample {json} price error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteBuyerGroupForPriceGroupDetail(response, priceGroupId, customerGroupId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.vendorCustomerGroupPriceService.delete({ priceGroupId, customerGroupId });
            return response.status(200).send({
                status: 1,
                message: `Successfully deleted seller buyer group price.`,
                data: result,
            });
        });
    }
    // ----------------- Seller Price Group Detail CRUDS --------------------
    // GetPriceGroupDetails API
    /**
     * @api {Get} /api/vendor-price-group/:priceGroupId/details  GetPriceGroupDetails API
     * @apiGroup SelllerPriceGroup
     * @apiParam (Request body) {Number} priceGroupId priceGroupId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "status": 1,
     * "message": "Vendor price group details successfully retrieved.",
     * "data": {
     *  "priceGroupName": "",
     *  "isActive": 1,
     *  "priceGroupDetails": [
     * {
     *  "id": 1,
     *   "priceGroupId": 1,
     *   "productId": 1,
     *   "currencyId": 1,
     *   "currencyName": "",
     *   "maxQuantity": 1,
     *   "price": "",
     *   "isDefault": 1,
     *   "isActive": 1,
     *   "isDelete": 0,
     *   "sellerPriceGroupSchedule": [
     *   {
     *    "id": 1,
     *    "priceGroupDetailId": 1
     *    "startDate": "",
     *    "endDate": "",
     *    "isActive": 1
     *   }
     *  ]
     *   }
     *   ]
     *   }
     *  }
     * @apiSampleRequest  /api/vendor-price-group/:priceGroupId/details
     * @apiErrorExample {json} price error
     * HTTP/1.1 500 Internal Server Error
     */
    getPriceGroupDetails(response, request, priceGroupId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const priceGroupData = yield this.vendorPriceGroupService.findOne({
                where: {
                    id: priceGroupId,
                },
            });
            if (!priceGroupData) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid price group ID. Please check the ID and try again.`,
                });
            }
            const priceGroupDetails = yield this.vendorPriceGroupDetailService.find({ where: { priceGroupId }, relations: ['vendorPriceGroupSchedule'] });
            const priceGroupDetail = [];
            for (const priceGroupDet of priceGroupDetails) {
                const value = priceGroupDet;
                const sku = yield this.skuService.findOne({ where: { id: priceGroupDet.skuId } });
                const product = yield this.productService.findOne({ where: { skuId: sku.id } });
                if (!product && pluginLoader_1.pluginModule.includes('ProductVariants')) {
                    // Hook
                    const productVariantOptionService = (0, typeorm_1.getRepository)('ProductVarientOption');
                    const productVariant = yield productVariantOptionService.findOne({ where: { skuId: sku.id } });
                    if (productVariant) {
                        const productExist = yield this.productService.findOne({ where: { productId: productVariant.productId } });
                        value.productName = productExist.name;
                        value.productId = productExist.productId;
                        value.sku = sku.skuName;
                        value.productSlug = productExist.productSlug;
                        value.variantName = productVariant.varientName;
                        value.isVariant = 1;
                    }
                    // --
                }
                else {
                    value.productName = (_a = product === null || product === void 0 ? void 0 : product.name) !== null && _a !== void 0 ? _a : '';
                    value.productId = (_b = product === null || product === void 0 ? void 0 : product.productId) !== null && _b !== void 0 ? _b : '';
                    value.sku = sku.skuName;
                    value.productSlug = product.productSlug;
                    value.variantName = '';
                    value.isVariant = 0;
                }
                priceGroupDetail.push(value);
            }
            priceGroupData.priceGroupDetail = yield Promise.all(priceGroupDetails);
            const customers = yield this.vendorCustomerPriceService.find({ where: { priceGroupId }, select: ['id', 'customerId', 'priceGroupId'], relations: ['customer'] });
            customers.map((buyers) => {
                buyers.name = buyers.customer.firstName;
                buyers.email = buyers.customer.email;
                buyers.mobileNUmber = buyers.customer.mobileNumber;
                buyers.customer = undefined;
            });
            const customerGroup = yield this.vendorCustomerGroupPriceService.find({ where: { priceGroupId }, select: ['id', 'priceGroupId', 'customerGroupId'], relations: ['customerGroup'] });
            customerGroup.map((groups) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                groups.groupName = groups.customerGroup.name;
                groups.customerGroup = undefined;
            }));
            priceGroupData.vendorCustomer = customers;
            priceGroupData.vendorCustomerGroup = customerGroup;
            return response.status(200).send({
                status: 1,
                message: `Vendor price group details successfully retrieved.`,
                data: priceGroupData,
            });
        });
    }
    // DeletePriceGroupDetail API
    /**
     * @api {Delete} /api/vendor-price-group/details/:priceGroupDetailId  DeletePriceGroupDetail API
     * @apiGroup SelllerPriceGroup
     * @apiParam (Request body) {Number} priceGroupDetailId priceGroupDetailId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "status": 1,
     *  "message": "Successfully Deleted Price group Detail",
     * }
     * @apiSampleRequest  /api/vendor-price-group/details/:priceGroupDetailId
     * @apiErrorExample {json} price error
     * HTTP/1.1 500 Internal Server Error
     */
    deletePriceGroupDetail(response, priceGroupDetailId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.vendorPriceGroupDetailService.delete({ id: priceGroupDetailId });
            return response.status(200).send({
                status: 1,
                message: `Successfully deleted price group detail.`,
            });
        });
    }
    // ------------------------------------------------------------------------
    // Get Product List Based On Price Group
    /**
     * @api {Get} /api/vendor-price-group/:priceGroupId/products  GetProductListByPriceGroup API
     * @apiGroup SelllerPriceGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} priceGroupId priceGroupId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully got Price group Product Details..",
     *    "data": [
     *        {
     *            "id": 1,
     *            "unitId": 1,
     *            "sku": "",
     *            "productName": "",
     *            "quantity": 11,
     *            "price": ""
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/vendor-price-group/:priceGroupId/products
     * @apiErrorExample {json} price error
     * HTTP/1.1 500 Internal Server Error
     */
    getProductListByPriceGroup(response, request, priceGroupId, limit, offset, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const whereCondition = [
                {
                    op: 'where',
                    name: 'VendorPriceGroupDetail.priceGroupId',
                    value: priceGroupId,
                },
                {
                    op: 'and',
                    name: 'VendorPriceGroupDetail.isDelete',
                    value: 0,
                },
                {
                    op: 'and',
                    name: 'product.isDelete',
                    value: 0,
                },
            ];
            const relations = [
                {
                    op: 'inner-select',
                    tableName: 'VendorPriceGroupDetail.product',
                    aliasName: 'product',
                },
            ];
            const priceGroupProducts = yield this.vendorPriceGroupDetailService.listByQueryBuilder(limit, offset, [], whereCondition, [], relations, [], false, false);
            return response.status(200).send({
                status: 1,
                message: `Successfully got Price group Product ${count ? 'Count' : 'Details'}..`,
                data: count ? priceGroupProducts.length : priceGroupProducts
                    .map((priceGroupProduct) => ({
                    id: priceGroupProduct.id,
                    skuId: priceGroupProduct.skuId,
                    sku: priceGroupProduct.product.sku,
                    productName: priceGroupProduct.product.name,
                    quantity: priceGroupProduct.maxQuantity,
                    price: priceGroupProduct.price,
                })),
            });
        });
    }
    // getPriceGroupBuyerDetail API
    /**
     * @api {Get} /api/vendor-price-group/:priceGroupId/customer  GetPriceGroupBuyerDetail API
     * @apiGroup SelllerPriceGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} priceGroupId priceGroupId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Got Price Group Customer Details..!",
     *    "data": [
     *        {
     *            "id": 1,
     *            "customerId": 1,
     *            "buyerName": ""
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/vendor-price-group/:priceGroupId/customer
     * @apiErrorExample {json} price error
     * HTTP/1.1 500 Internal Server Error
     */
    getPriceGroupBuyerDetail(priceGroupId, response, limit, offset, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const whereCondition = [
                {
                    op: 'where',
                    name: 'VendorCustomerPrice.priceGroupId',
                    value: priceGroupId,
                },
                {
                    op: 'and',
                    name: 'customer.deleteFlag',
                    value: 0,
                },
            ];
            const relations = [
                {
                    op: 'inner-select',
                    tableName: 'VendorCustomerPrice.customer',
                    aliasName: 'customer',
                },
            ];
            const priceGroupBuyerList = yield this.vendorCustomerPriceService.listByQueryBuilder(limit, offset, [], whereCondition, [], relations, [], false, false);
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Price Group Customer ${count ? 'Count' : 'Details'}..!`,
                data: count ? priceGroupBuyerList.lenght : priceGroupBuyerList
                    .map((priceGroupBuyer) => ({
                    id: priceGroupBuyer.id,
                    customerId: priceGroupBuyer.customer.id,
                    customerName: priceGroupBuyer.customer.firstName,
                })),
            });
        });
    }
    // GetPriceGroupBuyerGroupDetail API
    /**
     * @api {Get} /api/vendor-price-group/:priceGroupId/customer-group  GetPriceGroupBuyerGroupDetail API
     * @apiGroup SelllerPriceGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} priceGroupId priceGroupId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Got Price Group Customer Group Details..!",
     *    "data": [
     *        {
     *            "id": 1,
     *            "customerGroupId": 1
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/vendor-price-group/:priceGroupId/customer-group
     * @apiErrorExample {json} price error
     * HTTP/1.1 500 Internal Server Error
     */
    getPriceGroupBuyerGroupDetail(priceGroupId, response, limit, offset, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const whereCondition = [
                {
                    op: 'where',
                    name: 'VendorCustomerGroupPrice.priceGroupId',
                    value: priceGroupId,
                },
                {
                    op: 'and',
                    name: 'customerGroup.isDelete',
                    value: 0,
                },
            ];
            const relations = [
                {
                    op: 'inner-select',
                    tableName: 'VendorCustomerGroupPrice.customerGroup',
                    aliasName: 'customerGroup',
                },
                {
                    op: 'inner-select',
                    tableName: 'customerGroup.customer',
                    aliasName: 'customer',
                },
            ];
            const priceGroupBuyerGroupList = yield this.vendorCustomerGroupPriceService.listByQueryBuilder(limit, offset, [], whereCondition, [], relations, [], false, false);
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Price Group Customer Group ${count ? 'Count' : 'Details'}..!`,
                data: count ? priceGroupBuyerGroupList.length : priceGroupBuyerGroupList
                    .map((priceGroupBuyerGroup) => ({
                    id: priceGroupBuyerGroup.id,
                    customerGroupId: priceGroupBuyerGroup.customerGroup.id,
                    customerGroupName: priceGroupBuyerGroup.customerGroup.groupName,
                })),
            });
        });
    }
    /**
     * @api {get} /api/vendor-price-group/export  GetSellerPriceGroupList API
     * @apiGroup SelllerPriceGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {string} keyword keyword
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} status status
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * @apiSampleRequest /api/vendor-price-group/export
     * @apiErrorExample {json} price error
     * HTTP/1.1 500 Internal Server Error
     */
    getSellerPriceGroupListExport(limit, keyword, request, groupName, isDefault, createdDate, offset, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const whereConditions = [];
            whereConditions.push({
                name: 'is_delete',
                op: 'where',
                value: 0,
            }, {
                name: 'vendor_id',
                op: 'and',
                value: request.user.vendorId,
            });
            if (status === 0 || status === 1) {
                whereConditions.push({
                    name: 'is_active',
                    op: 'and',
                    value: status,
                });
            }
            const searchCondition = [];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                searchCondition.push({
                    name: ['name'],
                    value: keyword,
                });
            }
            else {
                if (groupName === null || groupName === void 0 ? void 0 : groupName.trim()) {
                    searchCondition.push({
                        name: ['name'],
                        value: groupName,
                    });
                }
                if (isDefault) {
                    searchCondition.push({
                        name: ['is_default'],
                        value: isDefault,
                    });
                }
                if (createdDate) {
                    searchCondition.push({
                        name: ['created_date'],
                        value: createdDate,
                    });
                }
            }
            const priceGroupList = yield this.vendorPriceGroupService.list(limit, offset, [], [], whereConditions, searchCondition, count);
            if (count) {
                return response.status(200).send({
                    status: 1,
                    data: priceGroupList,
                    message: `Successfully get Seller Price Group Count`,
                });
            }
            const priceGroupDetailList = yield Promise.all(priceGroupList.map((priceGroup) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const totalProduct = yield this.vendorPriceGroupDetailService.getPriceGroupProductCount(priceGroup.id);
                const totalBuyer = yield this.vendorCustomerPriceService.getPriceGroupBuyerCount(priceGroup.id);
                priceGroup.totalProduct = totalProduct;
                priceGroup.totalBuyer = totalBuyer;
                return priceGroup;
            })));
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('All Product Excel');
            const priceGroupRows = [];
            worksheet.columns = [
                { header: 'Price Group Id', key: 'id', size: 16, width: 15 },
                { header: 'Price Group Name', key: 'name', size: 16, width: 15 },
                { header: 'Is Default', key: 'isDefault', size: 16, width: 30 },
                { header: 'Status', key: 'isActive', size: 16, width: 15 },
                { header: 'Products Mapped', key: 'totalProduct', size: 16, width: 15 },
                { header: 'Customer Mapped', key: 'totalBuyer', size: 16, width: 15 },
                { header: 'Created On', key: 'createdDate', size: 16, width: 15 },
                { header: 'Updated On', key: 'modifiedDate', size: 16, width: 19 },
            ];
            for (const row of priceGroupDetailList) {
                priceGroupRows.push([row.id, row.name, row.isDefault, row.isActive, row.totalProduct, row.totalBuyer, row.createdDate, row.modifiedDate]);
            }
            worksheet.addRows(priceGroupRows);
            const fileName = './pricegroup_' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err) => {
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
};
exports.VendorPriceGroupController = VendorPriceGroupController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('groupName')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('isDefault')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('createdDate')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(8, (0, routing_controllers_1.QueryParam)('updatedDate')),
    tslib_1.__param(9, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(10, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, Object, String, Number, String, Number, Number, String, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupController.prototype, "getSellerPriceGroupList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/bulk-status'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupController.prototype, "updateVendorPriceGroupStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [VendorPriceGroupRequest_1.PriceGroupRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupController.prototype, "createSellerPriceGroupDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/sku'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, CreateProductPriceGroupRequest_1.CreateProductPriceGroupRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupController.prototype, "createProductPriceGroup", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/sku/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupController.prototype, "createProductPriceGroupDetailsBySku", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/detail/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupController.prototype, "getProductPriceGroupDetailsById", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, VendorPriceGroupRequest_1.PriceGroupRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupController.prototype, "updateSellerPriceGroupDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/schedule/:scheduleId'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('scheduleId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupController.prototype, "deletePriceGroupSchedule", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupController.prototype, "deletePriceGroup", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/status/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.BodyParam)('status')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupController.prototype, "priceGroupStatusUpdate", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:priceGroupId/customer/:customerId'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('priceGroupId')),
    tslib_1.__param(2, (0, routing_controllers_1.Param)('customerId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupController.prototype, "deleteBuyerForPriceGroupDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:priceGroupId/customer-group/:customerGroupId'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('priceGroupId')),
    tslib_1.__param(2, (0, routing_controllers_1.Param)('customerGroupId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupController.prototype, "deleteBuyerGroupForPriceGroupDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:priceGroupId/details'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Param)('priceGroupId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupController.prototype, "getPriceGroupDetails", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/details/:priceGroupDetailId'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('priceGroupDetailId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupController.prototype, "deletePriceGroupDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:priceGroupId/product')
    // @UseBefore(languageHandlerMiddleware)
    ,
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Param)('priceGroupId')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Number, Number, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupController.prototype, "getProductListByPriceGroup", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:priceGroupId/customer'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('priceGroupId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Number, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupController.prototype, "getPriceGroupBuyerDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:priceGroupId/customer-group'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('priceGroupId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Number, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupController.prototype, "getPriceGroupBuyerGroupDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/export'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('groupName')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('isDefault')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('createdDate')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(8, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(9, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, Object, String, Number, String, Number, Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupController.prototype, "getSellerPriceGroupListExport", null);
exports.VendorPriceGroupController = VendorPriceGroupController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/vendor-price-group'),
    tslib_1.__metadata("design:paramtypes", [VendorPriceGroupService_1.VendorPriceGroupService,
        VendorPriceGroupDetailService_1.VendorPriceGroupDetailService,
        VendorCustomerPriceService_1.VendorCustomerPriceService,
        VendorCustomerGroupPriceService_1.VendorCustomerGroupPriceService,
        SkuService_1.SkuService,
        VendorPriceGroupScheduleService_1.VendorPriceGroupScheduleService,
        ProductService_1.ProductService])
], VendorPriceGroupController);
//# sourceMappingURL=VendorPriceGroupController.js.map