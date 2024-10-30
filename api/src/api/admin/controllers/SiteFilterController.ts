/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Get,
    Post,
    Put,
    Delete,
    Body,
    JsonController,
    Authorized,
    Res,
    Req,
    QueryParam,
    Param
} from 'routing-controllers';
import { CreateSiteFilterRequest } from './requests/CreateSiteFilterRequest';
import { SiteFilter } from '../../core/models/SiteFilter';
import { SiteFilterCategory } from '../../core/models/SiteFilterCategory';
import { SiteFilterSection } from '../../core/models/SiteFilterSection';
import { SiteFilterSectionItem } from '../../core/models/SiteFilterSectionItem';
import { SiteFilterService } from '../../core/services/SiteFilterService';
import { SiteFilterCategoryService } from '../../core/services/SiteFilterCategoryService';
import { SiteFilterSectionService } from '../../core/services/SiteFilterSectionService';
import { SiteFilterSectionItemService } from '../../core/services/SiteFilterSectionItemService';
import { CategoryService } from '../../../../src/api/core/services/CategoryService';
import { CategoryPathService } from '../../../../src/api/core/services/CategoryPathService';

@JsonController('/site-filter')
export class SiteFilterController {
    constructor(
        private siteFilterService: SiteFilterService,
        private siteFilterCategoryService: SiteFilterCategoryService,
        private siteFilterSectionService: SiteFilterSectionService,
        private siteFilterSectionItemService: SiteFilterSectionItemService,
        private categoryPathService: CategoryPathService,
        private categoryService: CategoryService) {
    }

    // Create Site Filter API
    /**
     * @api {post} /api/site-filter/create-site-filter Create site filter API
     * @apiGroup Site Filter
     * @apiParam (Request body) {String} filterName filterName
     * @apiParam (Request body) {String} categoryId categoryId
     * @apiParam (Request body) {Object} section section
     * @apiParam (Request body) {String} seection.sectionId sectionId
     * @apiParam (Request body) {String} seection.sectionName sectionName
     * @apiParam (Request body) {Number} section.sectionType sectionType
     * @apiParam (Request body) {Array} section.sectionItem sectionItem
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "filterName" : "",
     *      "categoryId" : "",
     *      "section" : [{
     *          "sectionId": "",
     *          "sectionName": "",
     *          "sectionType":"",
     *          "sectionItem":""
     * }],
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New filter is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/site-filter/create-site-filter
     * @apiErrorExample {json} site filter error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/create-site-filter')
    @Authorized(['admin', 'add-filter'])
    public async createSiteFilter(@Body({ validate: true }) filterParam: CreateSiteFilterRequest, @Res() response: any): Promise<any> {

        const categories = filterParam.categoryId;
        for (const category of categories) {
            const findCategory = await this.siteFilterCategoryService.findOne({ where: { categoryId: category } });
            if (findCategory) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Duplicate category',
                };
                return response.status(400).send(errorResponse);
            }
        }
        const newSiteFilter = new SiteFilter();
        newSiteFilter.filterName = filterParam.filterName;
        const filter = await this.siteFilterService.create(newSiteFilter);
        for (const category of categories) {
            const newSiteFilterCategory = new SiteFilterCategory();
            newSiteFilterCategory.categoryId = category;
            newSiteFilterCategory.filterId = filter.id;
            await this.siteFilterCategoryService.create(newSiteFilterCategory);
        }
        const sections = filterParam.section;
        for (const section of sections) {
            const newSiteFilterSection = new SiteFilterSection();
            newSiteFilterSection.sectionId = section.sectionId;
            newSiteFilterSection.sectionName = section.sectionName;
            const data = section.sectionName.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            newSiteFilterSection.sectionSlug = data;
            newSiteFilterSection.sectionType = section.sectionType;
            newSiteFilterSection.filterId = filter.id;
            const sectionData = await this.siteFilterSectionService.create(newSiteFilterSection);
            const sectionItems: any = section.sectionItem;
            for (const sectionItem of sectionItems) {
                const newSiteFilterSectionItem = new SiteFilterSectionItem();
                newSiteFilterSectionItem.itemName = sectionItem;
                const itemSlug = sectionItem.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                newSiteFilterSectionItem.itemSlug = itemSlug;
                newSiteFilterSectionItem.filterSectionId = sectionData.id;
                await this.siteFilterSectionItemService.create(newSiteFilterSectionItem);
            }
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully created a new Filter',
        };
        return response.status(200).send(successResponse);
    }

    // update Site filter API
    /**
     * @api {put} /api/site-filter/update-site-filter/:id Update site filter API
     * @apiGroup Site Filter
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} filterName filterName
     * @apiParam (Request body) {String} categoryId categoryId
     * @apiParam (Request body) {Object} section section
     * @apiParam (Request body) {String} section.sectionId sectionId
     * @apiParam (Request body) {String} section.sectionName sectionName
     * @apiParam (Request body) {Number} section.sectionType sectionType 1-> varient 2-> attribute
     * @apiParam (Request body) {Array} section.sectionItem sectionItem
     * @apiParamExample {json} Input
     * {
     *      "filterName" : "",
     *      "categoryId" : "",
     *      "section" : [{
     *          "sectionId": "",
     *          "sectionName": "",
     *          "sectionType":"",
     *          "sectionItem":""
     * }],
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated site filter.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/site-filter/update-site-filter/:id
     * @apiErrorExample {json} Site filter error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-site-filter/:id')
    @Authorized(['admin', 'edit-filter'])
    public async updateSiteFilter(@Param('id') id: number, @Body({ validate: true }) siteFilterParams: CreateSiteFilterRequest, @Res() response: any, @Req() request: any): Promise<any> {

        const siteFilter = await this.siteFilterService.findOne({
            where: {
                id,
            },
        });
        if (!siteFilter) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid filter',
            };
            return response.status(400).send(errorResponse);
        }
        const categories = siteFilterParams.categoryId;
        for (const category of categories) {
            const findCategory = await this.siteFilterCategoryService.findDuplicateCategory(category, id);
            if (findCategory) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Duplicate category',
                };
                return response.status(400).send(errorResponse);
            }
        }
        siteFilter.filterName = siteFilterParams.filterName;
        const filter = await this.siteFilterService.create(siteFilter);
        if (siteFilterParams.categoryId) {
            await this.siteFilterCategoryService.delete({ filterId: filter.id });
            for (const category of categories) {
                const newSiteFilterCategory = new SiteFilterCategory();
                newSiteFilterCategory.categoryId = category;
                newSiteFilterCategory.filterId = filter.id;
                await this.siteFilterCategoryService.create(newSiteFilterCategory);
            }
        }
        if (siteFilterParams.section) {
            await this.siteFilterSectionService.delete({ filterId: filter.id });
            const sections = siteFilterParams.section;
            for (const section of sections) {
                const newSiteFilterSection = new SiteFilterSection();
                newSiteFilterSection.sectionId = section.sectionId;
                newSiteFilterSection.sectionName = section.sectionName;
                const data = section.sectionName.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                newSiteFilterSection.sectionSlug = data;
                newSiteFilterSection.sectionType = section.sectionType;
                newSiteFilterSection.filterId = filter.id;
                const sectionData = await this.siteFilterSectionService.create(newSiteFilterSection);
                const sectionItems: any = section.sectionItem;
                for (const sectionItem of sectionItems) {
                    const newSiteFilterSectionItem = new SiteFilterSectionItem();
                    newSiteFilterSectionItem.itemName = sectionItem;
                    const itemSlug = sectionItem.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                    newSiteFilterSectionItem.itemSlug = itemSlug;
                    newSiteFilterSectionItem.filterSectionId = sectionData.id;
                    await this.siteFilterSectionItemService.create(newSiteFilterSectionItem);
                }
            }
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully updated the site filter',
            data: filter,
        };
        return response.status(200).send(successResponse);
    }

    // Site filter List API
    /**
     * @api {get} /api/site-filter/site-filter-list Site Filter List
     * @apiGroup Site Filter
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get site filter list",
     *      "data":"[{
     *                "id": "",
     *                "filterName": "",
     *                "category": "",
     *                "varient": [],
     *                "attribute": []"
     *              }]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/site-filter/site-filter-list
     * @apiErrorExample {json} Site filter error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/site-filter-list')
    @Authorized(['admin', 'filter-list'])
    public async siteFilterList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['id', 'filterName'];
        const relation = [];
        const WhereConditions = [];
        if (keyword) {
            WhereConditions.push({
                name: 'filterName',
                op: 'like',
                value: keyword,
            });
        }
        const filterList = await this.siteFilterService.list(limit, offset, select, relation, WhereConditions, count);
        if (count) {
            const countResponse: any = {
                status: 1,
                message: 'Successfully got count',
                data: filterList,
            };
            return response.status(200).send(countResponse);
        }
        const promise = filterList.map(async (result: any) => {
            const categoryData = await this.siteFilterCategoryService.findOne({ where: { filterId: result.id } });
            const temp: any = result;
            if (categoryData) {
                const categoryValue = await this.categoryService.findOne({ where: { categoryId: categoryData.categoryId } });
                temp.category = categoryValue !== undefined ? categoryValue.name : ' ';
            } else {
                temp.category = '';
            }
            const varient = await this.siteFilterSectionService.findAll({ select: ['sectionName'], where: { filterId: result.id, sectionType: 1 } });
            temp.varient = varient;
            const attribute = await this.siteFilterSectionService.findAll({ select: ['sectionName'], where: { filterId: result.id, sectionType: 2 } });
            temp.attribute = attribute;
            return temp;
        });
        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got filter list',
            data: value,
        };
        return response.status(200).send(successResponse);
    }

    // delete filter API
    /**
     * @api {delete} /api/site-filter/delete-site-filter/:id Delete Site Filter API
     * @apiGroup Site Filter
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted filter.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/site-filter/delete-site-filter/:id
     * @apiErrorExample {json} SiteFilter error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-site-filter/:id')
    @Authorized(['admin', 'delete-filter'])
    public async deleteSiteFilter(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const siteFilter = await this.siteFilterService.findOne({
            where: {
                id,
            },
        });
        if (!siteFilter) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid filter Id',
            };
            return response.status(400).send(errorResponse);
        }
        await this.siteFilterCategoryService.delete({ filterId: siteFilter.id });
        await this.siteFilterSectionService.delete({ filterId: siteFilter.id });
        const deleteFilter = await this.siteFilterService.delete({ id: siteFilter.id });
        if (deleteFilter) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the filter',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete the filter',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // filter Detail
    /**
     * @api {get} /api/site-filter/filter-detail/:id Filter Detail API
     * @apiGroup Site Filter
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got filter detail",
     *      "data": "{
     *               "createdBy": null,
     *               "createdDate": "2024-07-20T06:23:11.000Z",
     *               "modifiedBy": null,
     *               "modifiedDate": "2024-07-20T06:23:11.000Z",
     *               "id": 32,
     *               "filterName": "Dresss",
     *               "isActive": null,
     *               "siteFilterCategory": [
     *                 {
     *                   "createdBy": null,
     *                   "createdDate": "2024-07-09T13:42:21.000Z",
     *                   "modifiedBy": null,
     *                   "modifiedDate": "2024-07-22T06:01:36.000Z",
     *                   "categoryId": 1304,
     *                   "name": "Dresses",
     *                   "image": null,
     *                   "imagePath": null,
     *                   "parentInt": 0,
     *                   "sortOrder": 1,
     *                   "categorySlug": "dresses4511",
     *                   "isActive": "1",
     *                   "categoryDescription": "",
     *                   "levels": "Dresses"
     *                 }
     *               ],
     *               "siteFiltersection": [
     *                 {
     *                   "id": 321,
     *                   "filterId": 32,
     *                   "sectionId": null,
     *                   "sectionName": "Material",
     *                   "sectionType": 2,
     *                   "sectionSlug": "material",
     *                   "sequence": null,
     *                   "sectionItem": [
     *                     {
     *                       "id": 923,
     *                       "filterSectionId": 321,
     *                       "itemName": "leather",
     *                       "itemSlug": "leather"
     *                     },"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/site-filter/filter-detail/:id
     * @apiErrorExample {json} filter Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/filter-detail/:id')
    @Authorized()
    public async filterDetail(@Param('id') id: number, @Res() response: any): Promise<any> {
        const filter = await this.siteFilterService.findOne({
            where: {
                id,
            },
        });
        if (!filter) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid filter Id',
            };
            return response.status(400).send(errorResponse);
        }
        filter.siteFilterCategory = await this.siteFilterCategoryService.findAll({
            where: {
                filterId: filter.id,
            },
        }).then(async (data) => {
            const promise = data.map(async (result: any) => {
                const category = await this.categoryService.findOne({ where: { categoryId: result.categoryId } });
                const categoryLevel = await this.categoryPathService.findCategoryLevel(category.categorySlug);
                category.levels = categoryLevel.levels;
                const temp: any = category;
                return temp;
            });
            const value = await Promise.all(promise);
            return value;
        });
        filter.siteFiltersection = await this.siteFilterSectionService.findAll({
            where: {
                filterId: filter.id,
            },
        }).then(async (data) => {
            const promise = data.map(async (result: any) => {
                const sectionItem = await this.siteFilterSectionItemService.findAll({ where: { filterSectionId: result.id } });
                const temp: any = result;
                temp.sectionItem = sectionItem;
                return temp;
            });
            const value = await Promise.all(promise);
            return value;
        });

        const successResponse: any = {
            status: 1,
            message: 'Successfully got filter detail',
            data: filter,
        };
        return response.status(200).send(successResponse);
    }
}
