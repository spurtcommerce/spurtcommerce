/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Post, Body, JsonController, Res, Authorized, Put, Param, QueryParam, Get, Delete, Req
} from 'routing-controllers';
import { CreateVendorGroup } from './requests/CreateVendorGroupRequest';
import { VendorGroupService } from '../../core/services/VendorGroupService';
import { VendorService } from '../../core/services/VendorService';
import { VendorGroup } from '../../core/models/VendorGroup';
import { VendorGroupCategoryService } from '../../core/services/VendorGroupCategoryService';
import { VendorGroupCategory } from '../../core/models/VendorGroupCategory';
import { CategoryPathService } from '../../core/services/CategoryPathService';
import { VendorProductService } from '../../core/services/VendorProductService';
import { CategoryService } from '../../core/services/CategoryService';
import * as fs from 'fs';

@JsonController('/vendor-group')
export class VendorGroupController {

    constructor(
        private vendorGroupService: VendorGroupService,
        private vendorService: VendorService,
        private vendorGroupCategoryService: VendorGroupCategoryService,
        private categoryPathService: CategoryPathService,
        private vendorProductService: VendorProductService,
        private categoryService: CategoryService
    ) {
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

    @Post()
    @Authorized()
    public async createVendorGroup(@Body({ validate: true }) createVendorGroup: CreateVendorGroup, @Res() response: any): Promise<any> {
        const categories = createVendorGroup.categoryIds.toString();
        if (categories.length === 0) {
            const errorResponse: any = {
                status: 0,
                message: 'Category Ids cannot be empty',
            };
            return response.status(400).send(errorResponse);
        }
        const category = categories.split(',');
        const vendor = await this.vendorGroupService.findOne({
            where: {
                name: createVendorGroup.name,
            },
        });
        if (vendor) {
            const errorResponse: any = {
                status: 0,
                message: 'This Vendor Group already exists',
            };
            return response.status(400).send(errorResponse);
        }
        const newGroupParams: any = new VendorGroup();
        newGroupParams.name = createVendorGroup.name;
        newGroupParams.description = createVendorGroup.description;
        newGroupParams.isActive = createVendorGroup.status;
        newGroupParams.commission = createVendorGroup.commission;
        const vendorGroupSaveResponse = await this.vendorGroupService.create(newGroupParams);
        if (vendorGroupSaveResponse) {
            // Add vendor group category
            if (categories.length > 0) {
                for (const categoryId of category) {
                    const vendorGroupCategory = new VendorGroupCategory();
                    vendorGroupCategory.vendorGroupId = vendorGroupSaveResponse.groupId;
                    vendorGroupCategory.categoryId = +categoryId;
                    vendorGroupCategory.isActive = 1;
                    await this.vendorGroupCategoryService.create(vendorGroupCategory);
                }
            }
            const successResponse: any = {
                status: 1,
                message: 'Seller group created successfully',
                data: vendorGroupSaveResponse,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to save seller group',
            };
            return response.status(400).send(errorResponse);
        }
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

    @Put('/:id')
    @Authorized()
    public async updateVendorRole(@Param('id') id: number, @Body({ validate: true }) updateVendorGroup: CreateVendorGroup, @Res() response: any): Promise<any> {
        const categories = updateVendorGroup.categoryIds;

        if (categories.length === 0) {
            const errorResponse: any = {
                status: 0,
                message: 'Category Ids should not be empty',
            };
            return response.status(400).send(errorResponse);
        }

        const vendor = await this.vendorGroupService.findOne({
            where: {
                groupId: id,
            },
        });
        if (!vendor) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid group Id',
            };
            return response.status(400).send(errorResponse);
        }
        const newVendorGroup: any = new VendorGroup();
        newVendorGroup.name = updateVendorGroup.name;
        newVendorGroup.description = updateVendorGroup.description;
        newVendorGroup.isActive = updateVendorGroup.status;
        newVendorGroup.commission = updateVendorGroup.commission;
        const vendorGroupSaveResponse = await this.vendorGroupService.update(id, newVendorGroup);
        if (vendorGroupSaveResponse) {
            // Delete existing and Add new Vendor Group Category
            if (categories.length > 0) {
                const vendorGroupCategoryList = await this.vendorGroupCategoryService.findAll({
                    where: { vendorGroupId: id },
                });
                if (vendorGroupCategoryList.length > 0) {
                    await this.vendorGroupCategoryService.delete(vendorGroupCategoryList);
                }
                const listOfGroupCategories: any = [];
                for (const categoryId of categories) {
                    const vendorGroupCategory = new VendorGroupCategory();
                    vendorGroupCategory.vendorGroupId = vendorGroupSaveResponse.groupId;
                    vendorGroupCategory.categoryId = categoryId;
                    vendorGroupCategory.isActive = 1;
                    listOfGroupCategories.push(vendorGroupCategory);
                }
                await this.vendorGroupCategoryService.create(listOfGroupCategories);
            }
            const successResponse: any = {
                status: 1,
                message: 'Seller Group updated successfully',
                data: vendorGroupSaveResponse,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the seller group',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Get()
    @Authorized()
    public async vendorgroupList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('groupName') groupName: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['groupId', 'name', 'description', 'isActive', 'commission', 'createdDate', 'modifiedDate'];
        const whereConditions = [
            {
                name: 'isActive',
                op: 'like',
                value: status,
            },
        ];
        if (keyword) {
            whereConditions.push(
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                }
            );
        }
        if (groupName) {
            whereConditions.push(
                {
                    name: 'name',
                    op: 'like',
                    value: groupName,
                }
            );
        }
        const relation = [];
        const vendorGroupList = await this.vendorGroupService.list(limit, offset, select, relation, whereConditions, count);
        if (count) {
            return response.status(200).send({
                status: 1,
                message: 'Successfully got seller group list count',
                data: vendorGroupList,
            });
        }
        const vendorGroups = vendorGroupList.map(async (val) => {
            const temp: any = val;
            temp.vendorCount = await this.vendorGroupService.vendorCount(val.groupId);
            temp.categoryCount = await this.vendorGroupCategoryService.groupCategoryCount(val.groupId);
            return temp;
        });
        const result = await Promise.all(vendorGroups);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got all seller group List',
            data: result,
        };
        return response.status(200).send(successResponse);
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

    @Delete('/:id')
    @Authorized()
    public async deleteGroup(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const groupId = await this.vendorGroupService.findOne({
            where: {
                groupId: id,
            },
        });
        if (!groupId) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid group Id',
            };
            return response.status(400).send(errorResponse);
        }

        // find Default group
        const defaultGroupId = await this.vendorGroupService.findOne({
            where: {
                groupId: id,
                name: 'default',
            },
        });

        if (defaultGroupId) {
            const errorResponse: any = {
                status: 0,
                message: 'You cannot delete this seller group',
            };
            return response.status(400).send(errorResponse);
        }

        // find vendor
        const findVendor = await this.vendorService.findOne({
            where: {
                vendorGroupId: id,
            },
        });

        if (findVendor) {
            const errorResponse: any = {
                status: 0,
                message: 'You cannot delete this seller group as Vendors are mapped to it',
            };
            return response.status(400).send(errorResponse);
        }

        // find vendor group category and delete

        const findVendorGroupCategoryList = await this.vendorGroupCategoryService.findAll({
            where: {
                vendorGroupId: id,
            },
        });

        if (findVendorGroupCategoryList.length > 0) {
            await this.vendorGroupCategoryService.delete(findVendorGroupCategoryList);
        }

        const deleteGroup = await this.vendorGroupService.delete(id);
        if (deleteGroup) {
            const successResponse: any = {
                status: 1,
                message: 'Seller group deleted successfully',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the seller group',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Get('/vendor-group-details/:id')
    @Authorized()
    public async vendorGroupDetails(@Param('id') id: number, @Res() response: any): Promise<any> {
        const vendorGroup: any = await this.vendorGroupService.findOne({
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
        vendorGroup.vendorGroupCategory = await this.vendorGroupCategoryService.findAll({
            where: {
                vendorGroupId: id,
            },
        }).then((val) => {
            const category = val.map(async (value: any) => {
                const categoryValue = await this.categoryService.findOne({ where: { categoryId: value.categoryId } });
                const categoryLevel = await this.categoryPathService.findCategoryLevel(categoryValue.categorySlug);
                if (categoryLevel && categoryLevel.levels) {
                    categoryValue.levels = categoryLevel.levels;
                }
                const temp: any = categoryValue;
                const productToCategory = await this.vendorProductService.findingProduct(value.categoryId);
                if (productToCategory) {
                    temp.productAvailable = 1;
                } else {
                    temp.productAvailable = 0;
                }
                return temp;
            });
            const results = Promise.all(category);
            return results;
        });
        const successRes: any = {
            status: 1,
            message: 'Successfully got seller group details',
            data: vendorGroup,
        };
        return response.status(200).send(successRes);
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
    @Get('/vendor-group-count')
    @Authorized()
    public async vendorGroupCount(@Res() response: any): Promise<any> {
        const vendorGroup: any = {};
        const select = [];
        const search = [];
        const WhereConditions = [];
        const allVendorGroupCount = await this.vendorGroupService.list(0, 0, select, search, WhereConditions, 1);
        const whereConditionsActive = [
            {
                name: 'isActive',
                op: 'where',
                value: 1,
            },
        ];
        const activeVendorGroupCount = await this.vendorGroupService.list(0, 0, select, search, whereConditionsActive, 1);
        const whereConditionsInActive = [
            {
                name: 'isActive',
                op: 'where',
                value: 0,
            },
        ];
        const inActiveVendorGroupCount = await this.vendorGroupService.list(0, 0, select, search, whereConditionsInActive, 1);
        vendorGroup.totalVendors = allVendorGroupCount ? allVendorGroupCount : 0;
        vendorGroup.activeVendors = activeVendorGroupCount ? activeVendorGroupCount : 0;
        vendorGroup.inActiveVendors = inActiveVendorGroupCount ? inActiveVendorGroupCount : 0;
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the seller group count',
            data: vendorGroup,
        };
        return response.status(200).send(successResponse);
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

    @Get('/vendor-group-excel')
    @Authorized('admin')
    public async exportVendorGroup(@QueryParam('sellerGroupIds') sellerGroupIds: string, @Req() request: any, @Res() response: any): Promise<any> {
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
                const dataId = await this.vendorGroupService.findOne(id);
                if (dataId === undefined) {
                    const errorResponse: any = {
                        status: 0,
                        message: `Invalid seller group id: ${id}`,
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            for (const id of groupIds) {
                const group = await this.vendorGroupService.findOne({ where: { groupId: id } });
                const sellerCount = await this.vendorGroupService.vendorCount(+id);
                if (group) {
                    rows.push([group.groupId, group.name, sellerCount, group.commission, group.isActive]);
                }
            }
        } else {
            const whereConditions = [];
            const sellerGroups = await this.vendorGroupService.list(0, 0, [], [], whereConditions, false);
            if (+sellerGroups.length === 0) {
                return response.status(400).send({
                    status: 0,
                    message: 'list is empty',
                });
            }
            for (const data of sellerGroups) {
                const sellerGroup = await this.vendorGroupService.findOne({
                    where: {
                        groupId: data.groupId,
                    },
                });
                const vendorCount = await this.vendorGroupService.vendorCount(data.groupId);
                rows.push([sellerGroup.groupId, sellerGroup.name, vendorCount, sellerGroup.commission, sellerGroup.isActive]);
            }
        }
        // Add all rows data in sheet
        rows.sort((a, b) => a[0] - b[0]);
        worksheet.addRows(rows);
        const fileName = './SellerGroupExcel_' + Date.now() + '.xlsx';
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
}
