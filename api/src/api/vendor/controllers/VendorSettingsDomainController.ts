/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, JsonController, Authorized, Res, Req, QueryParam, Post, Body, Param, Put, Delete } from 'routing-controllers';
import { Service } from 'typedi';
import { VendorSettingsDomainService } from '../../core/services/VendorSettingsDomainService';
import { VendorSettingsDomain } from '../../core/models/VendorSettingsDomain';
import { CreateVendorDomainRequest } from './requests/CreateVendorDomainRequest';
import { env } from '../../../env';
import { VendorSettingsService } from '../../core/services/VendorSettingsService';
@Service()
@JsonController('/vendor-settings-domain')
export class VendorSettingsDomainController {
    constructor(
        private vendorSettingsDomainService: VendorSettingsDomainService,
        private vendorSettingsService: VendorSettingsService
    ) {
        // --
    }

    /**
     * @api {post} /api/vendor-settings-domain Create Vendor Domain
     * @apiGroup Vendor
     * @apiHeader {String} Authorization Bearer token
     * @apiPermission vendor
     *
     * @apiDescription
     * Creates a new domain for the vendor and links it with vendor settings.
     *
     * @apiParam (Request Body) {String} domainName Vendor domain name.
     * @apiParam (Request Body) {Number} vendorSettingsId Vendor settings ID.
     * @apiParam (Request Body) {Number} isPrimary  is primary.
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Domain created successfully",
     *   "data": {
     *     "id": 123,
     *     "domainName": "example.com",
     *     "vendorSettingsId": 10,
     *     "vendorId": 45,
     *     "isActive": 1,
     *     "isDelete": 0,
     *     "createdAt": "2025-09-26T12:34:56.000Z",
     *     "updatedAt": "2025-09-26T12:34:56.000Z"
     *   }
     * }
     *
     * @apiErrorExample {json} Failure
     * HTTP/1.1 400 Bad Request
     * {
     *   "status": 0,
     *   "message": "Unable to create domain",
     *   "error": "Validation or database error details"
     * }
     *
     * @apiSampleRequest /api/vendor-settings-domain
     */
    @Authorized('vendor')
    @Post()
    public async createVendorDomain(@Body({ validate: true }) payload: CreateVendorDomainRequest, @Res() response: any, @Req() request: any): Promise<any> {
        try {
            // if (payload.isPrimary === 1) {
            //     const getVendorSettingsDomain = await this.vendorSettingsDomainService.findOne({ where: { vendorId: request.user.tenantId, isPrimary: 1, isActive: 1, isDelete: 0 } });
            //     if (getVendorSettingsDomain) {
            //         getVendorSettingsDomain.isPrimary = 0;
            //         await this.vendorSettingsDomainService.update(getVendorSettingsDomain.id, getVendorSettingsDomain);
            //     }

            //     const getVendorSetting = await this.vendorSettingsService.findOne({ where: { id: payload.vendorSettingsId } });
            //     if (getVendorSetting) {
            //         getVendorSetting.storeUrl = payload.domainName?.trim();
            //         await this.vendorSettingsService.save(getVendorSetting);
            //     }
            // }

            if (env.app.type === 'cloud') {
                const getVendorSettings = await this.vendorSettingsService.findOne({ where: { vendorId: request.user.tenantId } });
                if (!getVendorSettings?.featureAccess?.own_domain_name) {
                    return response.status(400).send({
                        status: 0,
                        message: `You don't have access for it please upgrade your plan.`,
                    });
                }
            }
            const getVendorSettingsDomain = await this.vendorSettingsDomainService.findOne({ where: { vendorId: request.user.tenantId, isDelete: 0 } });
            if (getVendorSettingsDomain) {
                return response.status(400).send({
                    status: 0,
                    message: 'Domain already exists. You cannot add another one.',
                });
            }

            const newVendorSettingsDomain = new VendorSettingsDomain();
            newVendorSettingsDomain.domainName = payload.domainName?.trim();
            newVendorSettingsDomain.vendorSettingsId = payload.vendorSettingsId;
            newVendorSettingsDomain.vendorId = request.user.tenantId;
            newVendorSettingsDomain.createdBy = request.user.id;
            newVendorSettingsDomain.isActive = 1;
            newVendorSettingsDomain.isDelete = 0;
            newVendorSettingsDomain.isPrimary = payload.isPrimary;
            const savedDomain = await this.vendorSettingsDomainService.create(newVendorSettingsDomain);

            return response.status(200).send({
                status: 1,
                message: 'Domain created successfully',
                data: savedDomain,
            });
        } catch (err) {
            return response.status(400).send({
                status: 0,
                message: 'Unable to create domain',
                error: err,
            });
        }
    }

    /**
     * @api {put} /api/vendor-settings-domain/:id Update Vendor Domain
     * @apiGroup Vendor
     * @apiHeader {String} Authorization Bearer token
     * @apiPermission vendor
     *
     * @apiDescription
     * Updates an existing vendor domain by ID. Only the vendor who owns the domain can update it.
     *
     * @apiParam (Path Parameter) {Number} id Domain ID.
     *
     * @apiParam (Request Body) {String} domainName Vendor domain name.
     * @apiParam (Request Body) {Number} vendorSettingsId Vendor settings ID.
     * @apiParam (Request Body) {Number=0,1} isActive Domain status (1 = active, 0 = inactive).
     * @apiParam (Request Body) {Number} isPrimary  is primary.
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Domain updated successfully",
     *   "data": {
     *     "id": 123,
     *     "domainName": "updated-example.com",
     *     "vendorSettingsId": 12,
     *     "vendorId": 45,
     *     "isActive": 1,
     *     "isDelete": 0,
     *     "createdAt": "2025-09-20T10:20:30.000Z",
     *     "updatedAt": "2025-09-26T14:40:00.000Z"
     *   }
     * }
     *
     * @apiErrorExample {json} Domain Not Found
     * HTTP/1.1 404 Not Found
     * {
     *   "status": 0,
     *   "message": "Domain not found"
     * }
     *
     * @apiErrorExample {json} Failure
     * HTTP/1.1 400 Bad Request
     * {
     *   "status": 0,
     *   "message": "Unable to update domain",
     *   "error": "Validation or database error details"
     * }
     *
     * @apiSampleRequest /api/vendor-settings-domain/:id
     */
    @Authorized('vendor')
    @Put('/:id')
    public async updateVendorDomain(@Param('id') id: number, @Body({ validate: false }) payload: CreateVendorDomainRequest, @Res() response: any, @Req() request: any): Promise<any> {
        try {

            const getvendorSettingsDomain = await this.vendorSettingsDomainService.findOne({
                where: { id, vendorId: request.user.tenantId, isDelete: 0 },
            });

            if (!getvendorSettingsDomain) {
                return response.status(404).send({
                    status: 0,
                    message: 'Domain not found',
                });
            }

            // if (payload.isPrimary === 1) {
            //     const getVendorSettingsDomain = await this.vendorSettingsDomainService.findOne({ where: { vendorId: request.user.tenantId, isPrimary: 1, isActive: 1, isDelete: 0 } });
            //     if (getVendorSettingsDomain) {
            //         getVendorSettingsDomain.isPrimary = 0;
            //         await this.vendorSettingsDomainService.update(getVendorSettingsDomain.id, getVendorSettingsDomain);
            //     }

            //     const getVendorSetting = await this.vendorSettingsService.findOne({ where: { id: payload.vendorSettingsId } });
            //     if (getVendorSetting) {
            //         getVendorSetting.storeUrl = payload.domainName?.trim();
            //         await this.vendorSettingsService.save(getVendorSetting);
            //     }
            // }

            getvendorSettingsDomain.domainName = payload.domainName?.trim();
            getvendorSettingsDomain.vendorSettingsId = payload.vendorSettingsId;
            getvendorSettingsDomain.isActive = payload.isActive;
            getvendorSettingsDomain.modifiedBy = request.user.id;
            getvendorSettingsDomain.isPrimary = payload.isPrimary;

            const updatedvendorSettingsDomain = await this.vendorSettingsDomainService.update(id, getvendorSettingsDomain);

            return response.status(200).send({
                status: 1,
                message: 'Domain updated successfully',
                data: updatedvendorSettingsDomain,
            });
        } catch (err) {
            return response.status(400).send({
                status: 0,
                message: 'Unable to update domain',
                error: err,
            });
        }
    }

    /**
     * @api {get} /api/vendor-settings-domain Get Vendor Domains
     * @apiGroup Vendor
     * @apiHeader {String} Authorization Bearer token
     * @apiPermission vendor
     *
     * @apiDescription
     * Retrieves a list of vendor domains or the total count of domains for the authenticated vendor.
     *
     * @apiQuery {Number} [limit] Number of records to return (for pagination).
     * @apiQuery {Number} [offset] Number of records to skip (for pagination).
     * @apiQuery {String} [keyword] Keyword to filter domains by name.
     * @apiQuery {Number=0,1} [count] If `1`, returns only the total count instead of the list.
     *
     * @apiSuccessExample {json} Success (List)
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Domain retrieved successfully",
     *   "data": [
     *     {
     *       "id": 123,
     *       "domainName": "example.com",
     *       "vendorSettingsId": 10,
     *       "vendorId": 45,
     *       "isActive": 1,
     *       "isDelete": 0,
     *       "createdAt": "2025-09-20T10:20:30.000Z",
     *       "updatedAt": "2025-09-26T14:40:00.000Z"
     *     },
     *     {
     *       "id": 124,
     *       "domainName": "another-example.com",
     *       "vendorSettingsId": 11,
     *       "vendorId": 45,
     *       "isActive": 1,
     *       "isDelete": 0,
     *       "createdAt": "2025-09-21T09:15:00.000Z",
     *       "updatedAt": "2025-09-26T14:41:00.000Z"
     *     }
     *   ]
     * }
     *
     * @apiSuccessExample {json} Success (Count)
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully retrieved the domins count",
     *   "data": 2
     * }
     *
     * @apiErrorExample {json} Failure
     * HTTP/1.1 400 Bad Request
     * {
     *   "status": 0,
     *   "message": "Unable to retrieve domains",
     *   "error": "Validation or database error details"
     * }
     *
     * @apiSampleRequest /api/vendor-settings-domain
     */
    @Authorized('vendor')
    @Get()
    public async getVendorDomainsList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number, @Res() response: any, @Req() request: any): Promise<any> {

        const whereConditions = [
            {
                name: 'VendorSettingsDomain.vendorId',
                value: request.user.tenantId,
                op: 'where',
            },
        ];

        const searchCondition = [];
        if (keyword) {
            searchCondition.push({
                name: ['VendorSettingsDomain.domainName'],
                value: keyword,
            });
        }

        const sort: any[] = [
            {
                name: 'VendorSettingsDomain.createdDate',
                order: 'DESC',
            },
        ];

        if (count) {
            const countvendorSettingsDomain = await this.vendorSettingsDomainService.listByQueryBuilder(limit, offset, [], whereConditions, searchCondition, [], [], sort, true, false);
            return response.status(200).send({
                status: 1,
                message: 'Successfully retrieved the domins count',
                data: countvendorSettingsDomain,
            });
        }
        const listvendorSettingsDomain: any = await this.vendorSettingsDomainService.listByQueryBuilder(limit, offset, [], whereConditions, searchCondition, [], [], sort, false, false);

        const successResponse: any = {
            status: 1,
            message: 'Domain retrieved successfully',
            data: listvendorSettingsDomain,
        };
        return response.status(200).send(successResponse);
    }

    /**
     * @api {delete} /api/vendor-domain/:id Delete Vendor Domain
     * @apiGroup Vendor
     * @apiHeader {String} Authorization Bearer token
     * @apiPermission vendor
     *
     * @apiDescription
     * Deletes an existing vendor domain by ID. Only the vendor who owns the domain can delete it.
     *
     * @apiParam (Path Parameter) {Number} id Domain ID.
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Domain deleted successfully",
     *   "data": {
     *     "affected": 1
     *   }
     * }
     *
     * @apiErrorExample {json} Domain Not Found
     * HTTP/1.1 404 Not Found
     * {
     *   "status": 0,
     *   "message": "Domain not found"
     * }
     *
     * @apiErrorExample {json} Failure
     * HTTP/1.1 400 Bad Request
     * {
     *   "status": 0,
     *   "message": "Unable to delete domain",
     *   "error": "Validation or database error details"
     * }
     *
     * @apiSampleRequest /api/vendor-domain/:id
     */
    @Authorized('vendor')
    @Delete('/:id')
    public async deleteVendorDomain(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        try {
            const getvendorSettingsDomain = await this.vendorSettingsDomainService.findOne({
                where: { id, vendorId: request.user.tenantId, isDelete: 0 },
            });

            if (!getvendorSettingsDomain) {
                return response.status(404).send({
                    status: 0,
                    message: 'Domain not found',
                });
            }

            // if (getvendorSettingsDomain.isPrimary) {
            //     return response.status(400).send({
            //         status: 0,
            //         message: 'Primary domain cannot be deleted',
            //     });
            // }

            const deletedDomain = await this.vendorSettingsDomainService.delete(id);

            return response.status(200).send({
                status: 1,
                message: 'Domain deleted successfully',
                data: deletedDomain,
            });
        } catch (err) {
            return response.status(400).send({
                status: 0,
                message: 'Unable to delete domain',
                error: err,
            });
        }
    }
}
