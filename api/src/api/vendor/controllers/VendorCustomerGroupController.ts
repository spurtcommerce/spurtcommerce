import { Authorized, Body, BodyParam, Delete, Get, JsonController, Param, Post, Put, QueryParam, Req, Res } from 'routing-controllers';
import { CustomerGroup } from '../../../../src/api/core/models/CustomerGroup';
import { BuyerGroupRequest } from './requests/CreateCustomerGroupRequest';
import { CustomerGroupService } from '../../../../src/api/core/services/CustomerGroupService';
import { In, Not } from 'typeorm';
import { CustomerToGroup } from '../../../../src/api/core/models/CustomerToGroup';
import { CustomerToGroupService } from '../../../../src/api/core/services/CustomerToGroupService';
import { CustomerService } from '../../../../src/api/core/services/CustomerService';

@JsonController('/vendor-customer-group')
export class VendorCustomerGroupController {
    constructor(
        private customerGroupService: CustomerGroupService,
        private customerToGroupService: CustomerToGroupService,
        private customerService: CustomerService
    ) {
        // --
    }
    // BuyerGroupList API
    /**
     * @api {Get} /api/vendor-customer-group BuyerGroupList API
     * @apiGroup VendorCustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} groupName groupName
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully got customer List..!",
     *    "data": [
     *       {
     *       "createdBy": 1,
     *       "createdDate": "",
     *       "modifiedBy": 1,
     *       "modifiedDate": "",
     *       "id": 1,
     *       "name": "",
     *       "description": "",
     *       "colorCode": "",
     *       "vendorId": 1,
     *       "isActive": 1,
     *       "isDelete": 0,
     *       "isMapped": 1
     *       }
     *    ]
     * }
     * @apiSampleRequest  /api/vendor-customer-group
     * @apiErrorExample {json} BuyerGroupList error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized('vendor')
    public async BuyerGroupList(
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('keyword') keyword: string,
        @QueryParam('groupName') groupName: string,
        @QueryParam('status') status: number,
        @QueryParam('count') count: number,
        @Res() response: any,
        @Req() request: any
    ): Promise<any> {

        const whereConditions = [
            {
                op: 'where',
                name: 'CustomerGroup.isDelete',
                value: 0,
            },
            {
                op: 'and',
                name: 'CustomerGroup.vendorId',
                value: request.user.vendorId,
            },
        ];

        const searchCondition = [];
        if (status === 0 || status === 1) {
            whereConditions.push(
                {
                    op: 'and',
                    name: 'CustomerGroup.isActive',
                    value: status,
                }
            );
        }
        if (keyword?.trim()) {
            searchCondition.push(
                {
                    name: ['CustomerGroup.name'],
                    value: keyword,
                }
            );
        }
        if (groupName?.trim()) {
            searchCondition.push(
                {
                    name: ['CustomerGroup.name'],
                    value: groupName,
                }
            );
        }
        const sort = [{
            name: 'CustomerGroup.createdDate',
            order: 'DESC',
        }];
        const customerGroupList = await this.customerGroupService.listByQueryBuilder(limit, offset, [], whereConditions, searchCondition, [], [], sort, count, false);
        if (count) {
            return response.status(200).send({
                status: 1,
                message: `Successfully got customer group count`,
                data: customerGroupList,
            });
        }
        const buyerGroupDetail = await this.customerToGroupService.find({ where: { customerGroupId: In(customerGroupList.flatMap((list) => list.id)) } });
        await Promise.all(customerGroupList.map(async (customerGroup: any) => {
            const mapedValue = buyerGroupDetail.filter((details) => details.customerGroupId === customerGroup.id);
            customerGroup.isMapped = (mapedValue.length > 0) ? 1 : 0;
            const buyer = await this.customerToGroupService.find({ where: { customerGroupId: customerGroup.id } });
            customerGroup.buyerCount = buyer.length;
        }));
        return response.status(200).send({
            status: 1,
            message: `Successfully got customer list`,
            data: customerGroupList,
        });
    }
    // CreateBuyerGroup API
    /**
     * @api {Post} /api/vendor-customer-group CreateBuyerGroup API
     * @apiGroup VendorCustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {string} name name
     * @apiParam (Request body) {string} description description
     * @apiParam (Request body) {string} colorCode colorCode
     * @apiParam (Request body) {number} status status
     * @apiParamExample {json} Input
     * {
     *  "name": "",
     *  "description": "",
     *  "colorCode": "",
     *  "status": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "status": 1,
     *  "message": "Successfully Created Customer Group..!",
     *   "data": {
     *   "name": "",
     *   "description": "",
     *   "colorCode": "",
     *   "vendorId": 1,
     *   "isDelete": 1,
     *   "isActive": 1,
     *   "createdDate": "",
     *   "id": 1
     *    }
     * }
     * @apiSampleRequest  /api/vendor-customer-group
     * @apiErrorExample {json} createBuyerGroup error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized('vendor')
    public async createBuyerGroup(@Body({ validate: true }) bodyParam: BuyerGroupRequest, @Req() request: any, @Res() response: any): Promise<any> {

        const customerGroup = new CustomerGroup();
        customerGroup.name = bodyParam.name.trim();
        customerGroup.description = bodyParam.description ?? '';
        customerGroup.colorCode = bodyParam.colorCode ?? '';
        customerGroup.vendorId = request.user.vendorId;
        customerGroup.isDelete = 0;
        customerGroup.isActive = 1;

        const customerGroupSave = await this.customerGroupService.create(customerGroup);

        return response.status(200).send({
            status: 1,
            message: `Successfully created customer group`,
            data: customerGroupSave,
        });
    }
    // UpdateBuyerGroup API
    /**
     * @api {Put} /api/vendor-customer-group/:id/customer UpdateBuyerGroupCustomer API
     * @apiGroup VendorCustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} customerIds id
     * @apiParamExample {json} Input
     * {
     *   "customerIds": []
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "status": 1,
     *  "message": "Successfully Updated Buyer Groups..!",
     *   "data": {
     *   "createdBy": "1,
     *   "createdDate": "",
     *   "modifiedBy": 1,
     *   "modifiedDate": "",
     *   "id": 1,
     *   "name": "",
     *   "description": "",
     *   "colorCode": "",
     *   "vendorId": 1,
     *   "isDelete": 0
     *    }
     * }
     * @apiSampleRequest  /api/vendor-customer-group/:id/customer
     * @apiErrorExample {json} addBuyerUser error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id/customer')
    @Authorized('vendor')
    public async addBuyerUser(@Param('id') customerGroupId: number, @BodyParam('customerIds') customerIds: number[], @Res() response: any, @Req() request: any): Promise<any> {
        const customerGroupValid = await this.customerGroupService.findOne({
            where: {
                id: customerGroupId,
                vendorId: request.user.vendorId,
            },
        });

        if (!customerGroupValid) {
            return response.status(400).send({
                status: 0,
                message: `Invalid customer group id`,
            });
        }
        await this.customerToGroupService.delete({ customerGroupId });

        const updateBuyerGroup = customerIds.forEach(async (customerId) => {
            const customerGroup = new CustomerToGroup();
            customerGroup.customerId = customerId;
            customerGroup.customerGroupId = customerGroupId;
            await this.customerToGroupService.create(customerGroup);
        });
        return response.status(200).send({
            status: 1,
            message: `Successfully updated customer groups`,
            data: updateBuyerGroup,
        });
    }
    // BuyerGroupDetails API
    /**
     * @api {Get} /api/vendor-customer-group/:id BuyerGroupDetails API
     * @apiGroup VendorCustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "status": 1,
     *  "message": "Successfully Get Customer Groups Detail..!",
     *  "data": {
     *   "createdBy": 1
     *   "createdDate": "",
     *   "modifiedBy": "",
     *   "modifiedDate": 1,
     *   "id": 1,
     *   "name": "",
     *   "description": "",
     *   "colorCode": "",
     *   "vendorId": 1,
     *   "isActive": 1,
     *   "isDelete": 1
     *    }
     * }
     * @apiSampleRequest  /api/vendor-customer-group/:id
     * @apiErrorExample {json} groupDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/:id')
    @Authorized('vendor')
    public async groupDetail(@Param('id') customerGroupId: number, @Res() response: any, @Req() request: any): Promise<any> {
        const customerGroup = await this.customerGroupService.findOne({
            where: {
                id: customerGroupId,
                vendorId: request.user.vendorId,
            },
        });

        if (!customerGroup) {
            return response.status(400).send({
                status: 0,
                message: `Invalid group id for customer`,
            });
        }

        return response.status(200).send({
            status: 1,
            message: `Successfully got customer groups detail`,
            data: customerGroup,
        });
    }
    // UpdateBuyerGroup API
    /**
     * @api {Put} /api/vendor-customer-group/:id UpdateCustomerGroup API
     * @apiGroup VendorCustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiParamExample {json} Input
     * {
     *   "name": "",
     *   "description": "",
     *   "colorCode": "",
     *   "status": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully Updated Customer Group..!",
     *   "data": {
     *       "createdBy": 1,
     *       "createdDate": "",
     *       "modifiedDate": "",
     *       "id": 1,
     *       "name": "",
     *       "description": "",
     *       "colorCode": "",
     *       "vendorId": 1,
     *       "isDelete": 0
     *   }
     * }
     * @apiSampleRequest  /api/vendor-customer-group/:id
     * @apiErrorExample {json} updateBuyerGroup error
     * HTTP/1.1 500 Internal Server Error
     */

    @Put('/:id')
    @Authorized('vendor')
    public async updateBuyerGroup(@Param('id') customerGroupId: number, @Body({ validate: true }) bodyParam: BuyerGroupRequest, @Req() request: any, @Res() response: any): Promise<any> {

        const customerGroup = await this.customerGroupService.findOne({
            where: {
                id: customerGroupId,
                vendorId: request.user.vendorId,
            },
        });

        if (!customerGroup) {
            return response.status(400).send({
                status: 0,
                message: `Invalid group id for customer`,
            });
        }

        const buyerGroupNameExist = await this.customerGroupService.findOne({
            where: {
                name: bodyParam.name?.trim(),
                vendorId: request.user.vendorId,
                id: Not(customerGroupId),
            },
        });

        if (buyerGroupNameExist) {
            return response.status(400).send({
                status: 0,
                message: `Group name already exist`,
            });
        }

        customerGroup.name = bodyParam.name;
        customerGroup.description = bodyParam.description ?? '';
        customerGroup.colorCode = bodyParam.colorCode ?? '';
        customerGroup.isActive = bodyParam.status;

        const buyerGroupSave = await this.customerGroupService.create(customerGroup);

        return response.status(200).send({
            status: 1,
            message: `Successfully updated customer group`,
            data: buyerGroupSave,
        });
    }
    // DeleteSellerBuyerGroup API
    /**
     * @api {Delete} /api/vendor-customer-group/:id DeleteSellerCustomerGroup API
     * @apiGroup VendorCustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "status": 1,
     *  "message": "Successfully Deleted Customer Group..",
     *  }
     * @apiSampleRequest  /api/vendor-customer-group/:id
     * @apiErrorExample {json} customer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized('vendor')
    public async deleteSellerBuyerGroup(@Req() request: any, @Res() response: any, @Param('id') customerGroupId: number): Promise<any> {
        const buyerGroupValid = await this.customerGroupService.findOne({
            where: {
                id: customerGroupId,
                vendorId: request.user.vendorId,
            },
        });

        if (!buyerGroupValid) {
            return response.status(400).send({
                status: 0,
                message: `Invalid customer group id`,
            });
        }

        await this.customerGroupService.delete(customerGroupId);

        return response.status(200).send({
            status: 1,
            message: `Successfully deleted customer group`,
        });
    }

    // SellerBuyerGroupStatus API
    /**
     * @api {Put} /api/vendor-customer-group/status/:id StatusUpdateSellerCustomerGroup API
     * @apiGroup VendorCustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiParam (Request body) {Number} status status
     *  @apiParamExample {json} Input
     * {
     *  "status": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "status": 1,
     *  "message": "Successfully Update Customer Group Status..!",
     *  }
     * @apiSampleRequest  /api/vendor-customer-group/status/:id
     * @apiErrorExample {json} Update Seller Customer Group API error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/status/:id')
    @Authorized('vendor')
    public async sellerBuyerGroupStatusUpdate(@Req() request: any, @Res() response: any, @Param('id') customerGroupId: number, @BodyParam('status') status: number): Promise<any> {
        const buyerGroupValid = await this.customerGroupService.findOne({
            where: {
                id: customerGroupId,
                vendorId: request.user.vendorId,
            },
        });

        if (!buyerGroupValid) {
            return response.status(400).send({
                status: 0,
                message: `Invalid customer group id`,
            });
        }
        buyerGroupValid.isActive = status;
        await this.customerGroupService.update(customerGroupId, buyerGroupValid);
        return response.status(200).send({
            status: 1,
            message: `Successfully update customer group status`,
        });
    }

    // Update Bulk Vendor CustomerGroup Status
    /**
     * @api {get} /api/vendor-customer-group/bulk-status Admin Vendor Update CustomerGroup Status
     * @apiGroup SellerBuyerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number[]} customerGroupIds customerGroupIds
     * @apiParam (Request body) {Number} statusId statusId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated the bulk customerGroup status",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-customer-group/bulk-status
     * @apiErrorExample {json} Admin Vendor Update CustomerGroup Status error
     * HTTP/1.1 500 Internal Server Error
     */
    @Authorized('vendor')
    @Post('/bulk-status')
    public async vendorCustomerGroupStatus(@Body({ validate: true }) params: { customerGroupIds: number[], statusId: number }, @Res() response: any, @Req() request: any): Promise<any> {
        const customerGroupIds = params.customerGroupIds;
        const updateCustomerGroupValue = [];
        if (customerGroupIds.length) {
            for (const customerGroupId of customerGroupIds) {
                const buyerGroupValid: any = await this.customerGroupService.findOne({
                    where: {
                        id: customerGroupId,
                        vendorId: request.user.vendorId,
                    },
                });
                if (!buyerGroupValid) {
                    return response.status(400).send({
                        status: 0,
                        message: `Invalid customer group id`,
                    });
                }
                buyerGroupValid.isActive = params.statusId;
                updateCustomerGroupValue.push(buyerGroupValid);
            }
            await this.customerGroupService.createBulk(updateCustomerGroupValue);
            return response.status(200).send({ status: 1, message: 'Successfully updated the bulk customer group status' });
        }
    }

    // BuyerGroupDetail API
    /**
     * @api {Get} /api/vendor-customer-group/:id/customer CustomerGroupDetail API
     * @apiGroup VendorCustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset status
     * @apiParam (Request body) {Number} keyword keyword
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Get Customer List For Group !",
     *     "data": [
     *        {
     *       "createdBy": 1,
     *       "createdDate": "",
     *       "modifiedBy": 1,
     *       "modifiedDate": "",
     *       "id": 1,
     *       "firstName": "",
     *       "lastName": "",
     *       "gender": "",
     *       "dob": "",
     *       "username": "",
     *       "password": "",
     *       "email": "",
     *       "mobileNumber": "",
     *       "address": "",
     *       "countryId": 1,
     *       "zoneId": 1,
     *       "city": "",
     *       "local": "",
     *       "oauthData": "",
     *       "avatar": "",
     *       "newsletter": "",
     *       "avatarPath": "",
     *       "customerGroupId": "",
     *       "lastLogin": "",
     *       "safe": "",
     *       "ip": "",
     *       "mailStatus": "",
     *       "pincode": "",
     *       "deleteFlag": "",
     *       "isActive": 1,
     *       "forgetPasswordKey": "",
     *       "linkExpires": "",
     *       "lockedOn": "",
     *       "siteId": 1,
     *       "address2": "",
     *       "landmark": "",
     *       "mailOtp": "",
     *       "mailOtpExpireTime": ""
     *       }
     * }
     * @apiSampleRequest  /api/vendor-customer-group/:id/customer
     * @apiErrorExample {json} getCustomerGroupDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/:id/customer')
    @Authorized('vendor')
    public async getCustomerGroupDetail(
        @Param('id') customerGroupId: number,
        @Res() response: any,
        @Req() request: any,
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('keyword') keyword: string,
        @QueryParam('status') status: number,
        @QueryParam('count') count: number
    ): Promise<any> {
        const customerGroupValid = await this.customerGroupService.findOne({
            where: {
                id: customerGroupId,
                vendorId: request.user.vendorId,
            },
        });

        if (!customerGroupValid) {
            return response.status(400).send({
                status: 0,
                message: `Invalid customer group id`,
            });
        }

        const buyerGroupDetail = await this.customerToGroupService.find({ where: { customerGroupId } });

        const customerIds = buyerGroupDetail.map((customerGroup) => customerGroup.customerId);

        const whereConditions = [];
        const searchConditions = [];

        whereConditions.push(
            {
                name: 'Customer.id',
                op: 'IN',
                value: customerIds,
            }
        );

        if (keyword?.trim()) {
            searchConditions.push(
                {
                    name: ['Customer.firstName', 'Customer.lastName', 'Customer.email'],
                    value: keyword,
                }
            );
        }

        const customers = await this.customerService.listByQueryBuilder(limit, offset, [], whereConditions, [], [], [], [], count ? true : false, false);

        return response.status(200).send({
            status: 1,
            message: `Successfully got customer list for group`,
            data: customers,
        });
    }

    // Buyer list API
    /**
     * @api {Get} /api/vendor-customer-group/customer/list Buyer list API
     * @apiGroup SellerBuyerGroup
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Get Customer List..!",
     *    "data": [
     *        {
     *       "createdBy": 1,
     *       "createdDate": "",
     *       "modifiedBy": 1,
     *       "modifiedDate": "",
     *       "id": 1,
     *       "firstName": "",
     *       "lastName": "",
     *       "gender": "",
     *       "dob": "",
     *       "username": "",
     *       "password": "",
     *       "email": "",
     *       "mobileNumber": "",
     *       "address": "",
     *       "countryId": 1,
     *       "zoneId": 1,
     *       "city": "",
     *       "local": "",
     *       "oauthData": "",
     *       "avatar": "",
     *       "newsletter": "",
     *       "avatarPath": "",
     *       "customerGroupId": "",
     *       "lastLogin": "",
     *       "safe": "",
     *       "ip": "",
     *     "mailStatus": "",
     *       "pincode": "",
     *       "deleteFlag": 0,
     *       "isActive": 1,
     *       "forgetPasswordKey": "",
     *       "linkExpires": "",
     *       "lockedOn": "",
     *       "siteId": 1,
     *       "address2": "",
     *       "landmark": "",
     *       "mailOtp": "",
     *       "mailOtpExpireTime": ""
     *   }
     * }
     * @apiSampleRequest  /api/vendor-customer-group/customer/list
     * @apiErrorExample {json} customer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/customer/list')
    @Authorized('vendor')
    public async customerList(@Res() response: any, @Req() request: any): Promise<any> {
        const customer = await this.customerService.find({ where: { deleteFlag: 0 } });
        return response.status(200).send({
            status: 1,
            message: `Successfully got customer list`,
            data: customer,
        });
    }

}
