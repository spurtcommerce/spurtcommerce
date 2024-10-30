"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorGroupController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const CreateVendorGroupRequest_1 = require("./requests/CreateVendorGroupRequest");
const VendorGroupService_1 = require("../../core/services/VendorGroupService");
const VendorService_1 = require("../../core/services/VendorService");
const VendorGroup_1 = require("../../core/models/VendorGroup");
const VendorGroupCategoryService_1 = require("../../core/services/VendorGroupCategoryService");
const VendorGroupCategory_1 = require("../../core/models/VendorGroupCategory");
const CategoryPathService_1 = require("../../core/services/CategoryPathService");
const VendorProductService_1 = require("../../core/services/VendorProductService");
const CategoryService_1 = require("../../core/services/CategoryService");
const fs = tslib_1.__importStar(require("fs"));
let VendorGroupController = class VendorGroupController {
    constructor(vendorGroupService, vendorService, vendorGroupCategoryService, categoryPathService, vendorProductService, categoryService) {
        this.vendorGroupService = vendorGroupService;
        this.vendorService = vendorService;
        this.vendorGroupCategoryService = vendorGroupCategoryService;
        this.categoryPathService = categoryPathService;
        this.vendorProductService = vendorProductService;
        this.categoryService = categoryService;
    }
    // Create Vendor Group API
    /**
     * @api {post} /api/vendor-group Create vendor group API
     * @apiGroup VendorGroup
     * @apiParam (Request body) {String{..30}} name groupName
     * @apiParam (Request body) {Number} commission Group Commission
     * @apiParam (Request body) {String} [description] groupDescription
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number[]} categoryIds Category Id List
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "commission" : "",
     *      "description" : "",
     *      "status" : "",
     *      "categoryIds": []
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New Vendor group is created successfully",
     *      "status": "1",
     *      "data": {
     *               "name": "",
     *               "isActive": "",
     *               "commission": "",
     *               "createdDate": "",
     *               "groupId":""
     *     }
     * }
     * @apiSampleRequest /api/vendor-group
     * @apiErrorExample {json} createVendor error
     * HTTP/1.1 500 Internal Server Error
     */
    createVendorGroup(createVendorGroup, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const categories = createVendorGroup.categoryIds.toString();
            if (categories.length === 0) {
                const errorResponse = {
                    status: 0,
                    message: 'Category Ids cannot be empty',
                };
                return response.status(400).send(errorResponse);
            }
            const category = categories.split(',');
            const vendor = yield this.vendorGroupService.findOne({
                where: {
                    name: createVendorGroup.name,
                },
            });
            if (vendor) {
                const errorResponse = {
                    status: 0,
                    message: 'This Vendor Group already exists',
                };
                return response.status(400).send(errorResponse);
            }
            const newGroupParams = new VendorGroup_1.VendorGroup();
            newGroupParams.name = createVendorGroup.name;
            newGroupParams.description = createVendorGroup.description;
            newGroupParams.isActive = createVendorGroup.status;
            newGroupParams.commission = createVendorGroup.commission;
            const vendorGroupSaveResponse = yield this.vendorGroupService.create(newGroupParams);
            if (vendorGroupSaveResponse) {
                // Add vendor group category
                if (categories.length > 0) {
                    for (const categoryId of category) {
                        const vendorGroupCategory = new VendorGroupCategory_1.VendorGroupCategory();
                        vendorGroupCategory.vendorGroupId = vendorGroupSaveResponse.groupId;
                        vendorGroupCategory.categoryId = +categoryId;
                        vendorGroupCategory.isActive = 1;
                        yield this.vendorGroupCategoryService.create(vendorGroupCategory);
                    }
                }
                const successResponse = {
                    status: 1,
                    message: 'Seller group created successfully',
                    data: vendorGroupSaveResponse,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to save seller group',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Update Vendor Group API
    /**
     * @api {put} /api/vendor-group/:id Update Vendor Group API
     * @apiGroup VendorGroup
     * @apiParam (Request body) {String{..30}} name groupName
     * @apiParam (Request body) {Number} commission Group Commission
     * @apiParam (Request body) {String} [description] groupDescription
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number[]} categoryIds Category Id List
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "commission" : "",
     *      "description" : "",
     *      "status" : "",
     *      "categoryIds": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " Vendor Group is updated successfully",
     *      "status": "1",
     *      "data": {
     *      "name": "",
     *      "isActive": ,
     *      "commission": "",
     *      "groupId": "",
     *   }
     * }
     * @apiSampleRequest /api/vendor-group/:id
     * @apiErrorExample {json} update-vendor-group error
     * HTTP/1.1 500 Internal Server Error
     */
    updateVendorRole(id, updateVendorGroup, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const categories = updateVendorGroup.categoryIds;
            if (categories.length === 0) {
                const errorResponse = {
                    status: 0,
                    message: 'Category Ids should not be empty',
                };
                return response.status(400).send(errorResponse);
            }
            const vendor = yield this.vendorGroupService.findOne({
                where: {
                    groupId: id,
                },
            });
            if (!vendor) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid group Id',
                };
                return response.status(400).send(errorResponse);
            }
            const newVendorGroup = new VendorGroup_1.VendorGroup();
            newVendorGroup.name = updateVendorGroup.name;
            newVendorGroup.description = updateVendorGroup.description;
            newVendorGroup.isActive = updateVendorGroup.status;
            newVendorGroup.commission = updateVendorGroup.commission;
            const vendorGroupSaveResponse = yield this.vendorGroupService.update(id, newVendorGroup);
            if (vendorGroupSaveResponse) {
                // Delete existing and Add new Vendor Group Category
                if (categories.length > 0) {
                    const vendorGroupCategoryList = yield this.vendorGroupCategoryService.findAll({
                        where: { vendorGroupId: id },
                    });
                    if (vendorGroupCategoryList.length > 0) {
                        yield this.vendorGroupCategoryService.delete(vendorGroupCategoryList);
                    }
                    const listOfGroupCategories = [];
                    for (const categoryId of categories) {
                        const vendorGroupCategory = new VendorGroupCategory_1.VendorGroupCategory();
                        vendorGroupCategory.vendorGroupId = vendorGroupSaveResponse.groupId;
                        vendorGroupCategory.categoryId = categoryId;
                        vendorGroupCategory.isActive = 1;
                        listOfGroupCategories.push(vendorGroupCategory);
                    }
                    yield this.vendorGroupCategoryService.create(listOfGroupCategories);
                }
                const successResponse = {
                    status: 1,
                    message: 'Seller Group updated successfully',
                    data: vendorGroupSaveResponse,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the seller group',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Vendor Group List API
    /**
     * @api {get} /api/vendor-group Vendor Group List API
     * @apiGroup VendorGroup
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get vendor group list",
     *    "data":"    {
     *       "groupId": "",
     *       "name": "",
     *       "description": "",
     *       "commission": "",
     *       "isActive": "",
     *       "vendorCount": "",
     *       "categoryCount": ""
     *    }"
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/vendor-group
     * @apiErrorExample {json} vendor-group-list error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorgroupList(limit, offset, keyword, groupName, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['groupId', 'name', 'description', 'isActive', 'commission', 'createdDate', 'modifiedDate'];
            const whereConditions = [
                {
                    name: 'isActive',
                    op: 'like',
                    value: status,
                },
            ];
            if (keyword) {
                whereConditions.push({
                    name: 'name',
                    op: 'like',
                    value: keyword,
                });
            }
            if (groupName) {
                whereConditions.push({
                    name: 'name',
                    op: 'like',
                    value: groupName,
                });
            }
            const relation = [];
            const vendorGroupList = yield this.vendorGroupService.list(limit, offset, select, relation, whereConditions, count);
            if (count) {
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got seller group list count',
                    data: vendorGroupList,
                });
            }
            const vendorGroups = vendorGroupList.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = val;
                temp.vendorCount = yield this.vendorGroupService.vendorCount(val.groupId);
                temp.categoryCount = yield this.vendorGroupCategoryService.groupCategoryCount(val.groupId);
                return temp;
            }));
            const result = yield Promise.all(vendorGroups);
            const successResponse = {
                status: 1,
                message: 'Successfully got all seller group List',
                data: result,
            };
            return response.status(200).send(successResponse);
        });
    }
    // delete Vendor Group API
    /**
     * @api {delete} /api/vendor-group/:id Delete Vendor Group API
     * @apiGroup VendorGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} groupId  groupId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted vendorGroup.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-group/:id
     * @apiErrorExample {json} VendorGroup error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteGroup(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const groupId = yield this.vendorGroupService.findOne({
                where: {
                    groupId: id,
                },
            });
            if (!groupId) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid group Id',
                };
                return response.status(400).send(errorResponse);
            }
            // find Default group
            const defaultGroupId = yield this.vendorGroupService.findOne({
                where: {
                    groupId: id,
                    name: 'default',
                },
            });
            if (defaultGroupId) {
                const errorResponse = {
                    status: 0,
                    message: 'You cannot delete this seller group',
                };
                return response.status(400).send(errorResponse);
            }
            // find vendor
            const findVendor = yield this.vendorService.findOne({
                where: {
                    vendorGroupId: id,
                },
            });
            if (findVendor) {
                const errorResponse = {
                    status: 0,
                    message: 'You cannot delete this seller group as Vendors are mapped to it',
                };
                return response.status(400).send(errorResponse);
            }
            // find vendor group category and delete
            const findVendorGroupCategoryList = yield this.vendorGroupCategoryService.findAll({
                where: {
                    vendorGroupId: id,
                },
            });
            if (findVendorGroupCategoryList.length > 0) {
                yield this.vendorGroupCategoryService.delete(findVendorGroupCategoryList);
            }
            const deleteGroup = yield this.vendorGroupService.delete(id);
            if (deleteGroup) {
                const successResponse = {
                    status: 1,
                    message: 'Seller group deleted successfully',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the seller group',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Get Vendor Group Details API
    /**
     * @api {get} /api/vendor-group/vendor-group-details/:id Vendor Group Details API
     * @apiGroup VendorGroup
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully get vendor group details",
     * "status": "1",
     * "data" :{
     *   "name": "",
     *   "commission": "",
     *   "isActive": ""
     * ,
     *   "vendorGroupCategory": [
     *       {
     *           "createdBy": ""
     *           "createdDate": ""
     *           "modifiedBy": "",
     *           "modifiedDate": "",
     *           "categoryId": "",
     *           "name": "",
     *           "image": "",
     *           "imagePath": "",
     *           "parentInt": "",
     *           "sortOrder": "",
     *           "categorySlug": "",
     *           "isActive": "",
     *           "categoryDescription": "",
     *           "levels": "",
     *           "productAvailable": ""
     *       }
     * }
     * @apiSampleRequest /api/vendor-group/vendor-group-details/:id
     * @apiErrorExample {json} vendorgroup error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorGroupDetails(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorGroup = yield this.vendorGroupService.findOne({
                select: ['name', 'commission', 'isActive'],
                where: {
                    groupId: id,
                },
            });
            if (!vendorGroup) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid seller group Id',
                });
            }
            vendorGroup.vendorGroupCategory = yield this.vendorGroupCategoryService.findAll({
                where: {
                    vendorGroupId: id,
                },
            }).then((val) => {
                const category = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const categoryValue = yield this.categoryService.findOne({ where: { categoryId: value.categoryId } });
                    const categoryLevel = yield this.categoryPathService.findCategoryLevel(categoryValue.categorySlug);
                    if (categoryLevel && categoryLevel.levels) {
                        categoryValue.levels = categoryLevel.levels;
                    }
                    const temp = categoryValue;
                    const productToCategory = yield this.vendorProductService.findingProduct(value.categoryId);
                    if (productToCategory) {
                        temp.productAvailable = 1;
                    }
                    else {
                        temp.productAvailable = 0;
                    }
                    return temp;
                }));
                const results = Promise.all(category);
                return results;
            });
            const successRes = {
                status: 1,
                message: 'Successfully got seller group details',
                data: vendorGroup,
            };
            return response.status(200).send(successRes);
        });
    }
    // Vendor Group Count API
    /**
     * @api {get} /api/vendor-group/vendor-group-count Vendor Group Count API
     * @apiGroup VendorGroup
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor group count",
     *      "data": {
     *               "totalVendors": "",
     *               "activeVendors": "",
     *              "inActiveVendors": ""
     *     }
     *  }
     *     "status": "1"
     * }
     * @apiSampleRequest /api/vendor-group/vendor-group-count
     * @apiErrorExample {json} vendorGroup error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorGroupCount(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorGroup = {};
            const select = [];
            const search = [];
            const WhereConditions = [];
            const allVendorGroupCount = yield this.vendorGroupService.list(0, 0, select, search, WhereConditions, 1);
            const whereConditionsActive = [
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
            ];
            const activeVendorGroupCount = yield this.vendorGroupService.list(0, 0, select, search, whereConditionsActive, 1);
            const whereConditionsInActive = [
                {
                    name: 'isActive',
                    op: 'where',
                    value: 0,
                },
            ];
            const inActiveVendorGroupCount = yield this.vendorGroupService.list(0, 0, select, search, whereConditionsInActive, 1);
            vendorGroup.totalVendors = allVendorGroupCount ? allVendorGroupCount : 0;
            vendorGroup.activeVendors = activeVendorGroupCount ? activeVendorGroupCount : 0;
            vendorGroup.inActiveVendors = inActiveVendorGroupCount ? inActiveVendorGroupCount : 0;
            const successResponse = {
                status: 1,
                message: 'Successfully got the seller group count',
                data: vendorGroup,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Vendor Details Excel Document Download
    /**
     * @api {get} /api/vendor-group/vendor-group-excel Vendor Group Excel
     * @apiGroup VendorGroup
     * @apiParam (Request body) {String} sellerGroupIds sellerGroupIds
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Vendor Group Excel List",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-group/vendor-group-excel
     * @apiErrorExample {json} Vendor Excel List error
     * HTTP/1.1 500 Internal Server Error
     */
    exportVendorGroup(sellerGroupIds, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Vendor Group Sheet');
            const rows = [];
            worksheet.columns = [
                { header: 'Seller Group Id', key: 'groupId', size: 16, width: 15 },
                { header: 'Group Name', key: 'name', size: 16, width: 30 },
                { header: 'Seller Count', key: 'vendorCount', size: 16, width: 15 },
                { header: 'Commission', key: 'commission', size: 16, width: 15 },
                { header: 'Status', key: 'isActive', size: 16, width: 20 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            if (sellerGroupIds) {
                const groupIds = sellerGroupIds.split(',');
                for (const id of groupIds) {
                    const dataId = yield this.vendorGroupService.findOne(id);
                    if (dataId === undefined) {
                        const errorResponse = {
                            status: 0,
                            message: `Invalid seller group id: ${id}`,
                        };
                        return response.status(400).send(errorResponse);
                    }
                }
                for (const id of groupIds) {
                    const group = yield this.vendorGroupService.findOne({ where: { groupId: id } });
                    const sellerCount = yield this.vendorGroupService.vendorCount(+id);
                    if (group) {
                        rows.push([group.groupId, group.name, sellerCount, group.commission, group.isActive]);
                    }
                }
            }
            else {
                const whereConditions = [];
                const sellerGroups = yield this.vendorGroupService.list(0, 0, [], [], whereConditions, false);
                if (+sellerGroups.length === 0) {
                    return response.status(400).send({
                        status: 0,
                        message: 'list is empty',
                    });
                }
                for (const data of sellerGroups) {
                    const sellerGroup = yield this.vendorGroupService.findOne({
                        where: {
                            groupId: data.groupId,
                        },
                    });
                    const vendorCount = yield this.vendorGroupService.vendorCount(data.groupId);
                    rows.push([sellerGroup.groupId, sellerGroup.name, vendorCount, sellerGroup.commission, sellerGroup.isActive]);
                }
            }
            // Add all rows data in sheet
            rows.sort((a, b) => a[0] - b[0]);
            worksheet.addRows(rows);
            const fileName = './SellerGroupExcel_' + Date.now() + '.xlsx';
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
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateVendorGroupRequest_1.CreateVendorGroup, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorGroupController.prototype, "createVendorGroup", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateVendorGroupRequest_1.CreateVendorGroup, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorGroupController.prototype, "updateVendorRole", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('groupName')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorGroupController.prototype, "vendorgroupList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorGroupController.prototype, "deleteGroup", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-group-details/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorGroupController.prototype, "vendorGroupDetails", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-group-count'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorGroupController.prototype, "vendorGroupCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-group-excel'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('sellerGroupIds')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorGroupController.prototype, "exportVendorGroup", null);
VendorGroupController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/vendor-group'),
    tslib_1.__metadata("design:paramtypes", [VendorGroupService_1.VendorGroupService,
        VendorService_1.VendorService,
        VendorGroupCategoryService_1.VendorGroupCategoryService,
        CategoryPathService_1.CategoryPathService,
        VendorProductService_1.VendorProductService,
        CategoryService_1.CategoryService])
], VendorGroupController);
exports.VendorGroupController = VendorGroupController;
//# sourceMappingURL=VendorGroupController.js.map