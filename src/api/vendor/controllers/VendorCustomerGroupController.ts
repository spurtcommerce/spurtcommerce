import { Authorized, Body, BodyParam, Delete, Get, JsonController, Param, Post, Put, QueryParam, Req, Res } from 'routing-controllers';
import { CreateCustomerGroup } from './requests/CreateCustomerGroupRequest';
import { CustomerGroupService } from '../../core/services/CustomerGroupService';
import { CustomerToGroupService } from '../../core/services/CustomerToGroupService';
import { CustomerService } from '../../core/services/CustomerService';
import { CustomerToGroup } from '../../core/models/CustomerToGroup';
import { CustomerGroup } from '../../core/models/CustomerGroup';
import { In, Not } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-customer-group')
export class VendorCustomerGroupController {
    constructor(
        private customerGroupService: CustomerGroupService,
        private customerToGroupService: CustomerToGroupService,
        private customerService: CustomerService
    ) {
        // --
    }
    /**
     * @api {get} /api/vendor-customer-group List Vendor Customer Groups
     * @apiGroup Vendor Customer Group
     * @apiName VendorCustomerGroupList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {Number} [limit] Number of records to return
     * @apiQuery {Number} [offset] Pagination offset
     * @apiQuery {String} [keyword] Keyword search for group name
     * @apiQuery {String} [groupName] Filter by group name
     * @apiQuery {Number} [status] Filter by active status (0 or 1)
     * @apiQuery {Number} [count] Return count only if 1
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got customer list.",
     *         "data": [
     *             {
     *                 "id": 1,
     *                 "name": "Wholesale Buyers",
     *                 "description": "Wholesale customer tier",
     *                 "colorCode": "#336699",
     *                 "isActive": 1,
     *                 "buyerCount": 10
     *             }
     *         ]
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Internal Server Error"
     *     }
     *
     * @apiSampleRequest /api/vendor-customer-group
     */
    @Get()
    @Authorized(['vendor', 'list-customer-group'])
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
                value: request.user.tenantId,
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
            message: 'Successfully got customer list.',
            data: customerGroupList,
        });
    }
    /**
     * @api {post} /api/vendor-customer-group Create Vendor Customer Group
     * @apiGroup Vendor Customer Group
     * @apiName CreateVendorCustomerGroup
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiBody {String} name Customer group name
     * @apiBody {String} [description] Customer group description
     * @apiBody {String} [colorCode] Color tag code (hex)
     * @apiBody {Number} [status] Active status (1: Active, 0: Inactive)
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully created customer group",
     *         "data": {
     *             "id": 1,
     *             "name": "VIP Group",
     *             "description": "VIP Customers",
     *             "colorCode": "#FF9900",
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Internal Server Error"
     *     }
     *
     * @apiSampleRequest /api/vendor-customer-group
     */
    @Post()
    @Authorized(['vendor', 'create-customer-group'])
    public async createBuyerGroup(@Body({ validate: true }) bodyParam: CreateCustomerGroup, @Req() request: any, @Res() response: any): Promise<any> {

        const customerGroup = new CustomerGroup();
        customerGroup.name = bodyParam.name.trim();
        customerGroup.description = bodyParam.description ?? '';
        customerGroup.colorCode = bodyParam.colorCode ?? '';
        customerGroup.vendorId = request.user.tenantId;
        customerGroup.isDelete = 0;
        customerGroup.isActive = 1;

        const customerGroupSave = await this.customerGroupService.create(customerGroup);

        return response.status(200).send({
            status: 1,
            message: 'Successfully created customer group',
            data: customerGroupSave,
        });
    }
    /**
     * @api {put} /api/vendor-customer-group/:id/customer Update Customer Group Members
     * @apiGroup Vendor Customer Group
     * @apiName UpdateVendorCustomerGroupMembers
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id Customer Group ID
     *
     * @apiBody {Number[]} customerIds Array of Customer IDs to assign to this group
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully updated customer groups"
     *     }
     *
     * @apiErrorExample {json} Invalid-Group:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid customer group ID."
     *     }
     *
     * @apiSampleRequest /api/vendor-customer-group/:id/customer
     */
    @Put('/:id/customer')
    @Authorized(['vendor', 'edit-customer-group'])
    public async addBuyerUser(@Param('id') customerGroupId: number, @BodyParam('customerIds') customerIds: number[], @Req() request: any, @Res() response: any): Promise<any> {
        const customerGroupValid = await this.customerGroupService.findOne({
            where: {
                id: customerGroupId,
                vendorId: request.user.tenantId,
            },
        });

        if (!customerGroupValid) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid customer group ID.',
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
            message: 'Successfully updated customer groups',
            data: updateBuyerGroup,
        });
    }
    /**
     * @api {get} /api/vendor-customer-group/:id Get Customer Group Detail
     * @apiGroup Vendor Customer Group
     * @apiName GetVendorCustomerGroupDetail
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id Customer Group ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got customer groups detail",
     *         "data": {
     *             "id": 1,
     *             "name": "VIP Group",
     *             "description": "VIP Customers",
     *             "colorCode": "#FF9900",
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Group:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid group ID for customer"
     *     }
     *
     * @apiSampleRequest /api/vendor-customer-group/:id
     */
    @Get('/:id')
    @Authorized(['vendor', 'list-customer-group'])
    public async groupDetail(@Param('id') customerGroupId: number, @Res() response: any, @Req() request: any): Promise<any> {
        const customerGroup = await this.customerGroupService.findOne({
            where: {
                id: customerGroupId,
                vendorId: request.user.tenantId,
            },
        });

        if (!customerGroup) {
            return response.status(400).send({
                status: 0,
                message: `Invalid group ID for customer`,
            });
        }

        return response.status(200).send({
            status: 1,
            message: `Successfully got customer groups detail`,
            data: customerGroup,
        });
    }
    /**
     * @api {put} /api/vendor-customer-group/:id Update Vendor Customer Group
     * @apiGroup Vendor Customer Group
     * @apiName UpdateVendorCustomerGroup
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id Customer Group ID
     *
     * @apiBody {String} name Customer group name
     * @apiBody {String} [description] Customer group description
     * @apiBody {String} [colorCode] Color tag code (hex)
     * @apiBody {Number} [status] Active status (1: Active, 0: Inactive)
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully updated customer group",
     *         "data": {
     *             "id": 1,
     *             "name": "Updated VIP Group",
     *             "description": "Updated description",
     *             "colorCode": "#FF9900",
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Group-Exists:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Group name already exist"
     *     }
     *
     * @apiSampleRequest /api/vendor-customer-group/:id
     */
    @Put('/:id')
    @Authorized(['vendor', 'edit-customer-group'])
    public async updateBuyerGroup(@Param('id') customerGroupId: number, @Body({ validate: true }) bodyParam: CreateCustomerGroup, @Req() request: any, @Res() response: any): Promise<any> {

        const customerGroup = await this.customerGroupService.findOne({
            where: {
                id: customerGroupId,
                vendorId: request.user.tenantId,
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
                vendorId: request.user.tenantId,
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
    /**
     * @api {delete} /api/vendor-customer-group/:id Delete Vendor Customer Group
     * @apiGroup Vendor Customer Group
     * @apiName DeleteVendorCustomerGroup
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id Customer Group ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully deleted customer group"
     *     }
     *
     * @apiErrorExample {json} Invalid-Group:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid customer group id"
     *     }
     *
     * @apiSampleRequest /api/vendor-customer-group/:id
     */
    @Delete('/:id')
    @Authorized(['vendor', 'delete-customer-group'])
    public async deleteSellerBuyerGroup(@Req() request: any, @Res() response: any, @Param('id') customerGroupId: number): Promise<any> {
        const buyerGroupValid = await this.customerGroupService.findOne({
            where: {
                id: customerGroupId,
                vendorId: request.user.tenantId,
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

    /**
     * @api {put} /api/vendor-customer-group/status/:id Update Customer Group Status
     * @apiGroup Vendor Customer Group
     * @apiName UpdateVendorCustomerGroupStatus
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id Customer Group ID
     *
     * @apiBody {Number} status Active status (1: Active, 0: Inactive)
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully update customer group status"
     *     }
     *
     * @apiErrorExample {json} Invalid-Group:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid customer group id"
     *     }
     *
     * @apiSampleRequest /api/vendor-customer-group/status/:id
     */
    @Put('/status/:id')
    @Authorized(['vendor', 'edit-customer-group'])
    public async sellerBuyerGroupStatusUpdate(@Req() request: any, @Res() response: any, @Param('id') customerGroupId: number, @BodyParam('status') status: number): Promise<any> {
        const buyerGroupValid = await this.customerGroupService.findOne({
            where: {
                id: customerGroupId,
                vendorId: request.user.tenantId,
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

    /**
     * @api {get} /api/vendor-customer-group/:id/customer Get Customers in Customer Group
     * @apiGroup Vendor Customer Group
     * @apiName GetVendorCustomerGroupCustomers
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id Customer Group ID
     *
     * @apiQuery {Number} [limit] Number of records to return
     * @apiQuery {Number} [offset] Pagination offset
     * @apiQuery {String} [keyword] Keyword search for customer name/email
     * @apiQuery {Number} [status] Customer status
     * @apiQuery {Number} [count] Return count only if 1
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got customer list for group",
     *         "data": [
     *             {
     *                 "id": 1,
     *                 "firstName": "John",
     *                 "lastName": "Doe",
     *                 "email": "john@example.com",
     *                 "mobileNumber": "1234567890"
     *             }
     *         ]
     *     }
     *
     * @apiErrorExample {json} Invalid-Group:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid customer group id"
     *     }
     *
     * @apiSampleRequest /api/vendor-customer-group/:id/customer
     */
    @Get('/:id/customer')
    @Authorized(['vendor', 'manage-customer-group'])
    public async getCustomerGroupDetail(
        @Param('id') customerGroupId: number,
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('keyword') keyword: string,
        @QueryParam('status') status: number,
        @QueryParam('count') count: number,
        @Res() response: any,
        @Req() request: any
    ): Promise<any> {
        const customerGroupValid = await this.customerGroupService.findOne({
            where: {
                id: customerGroupId,
                vendorId: request.user.tenantId,
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

    /**
     * @api {get} /api/vendor-customer-group/customer/list Get Available Customers List
     * @apiGroup Vendor Customer Group
     * @apiName GetVendorCustomerGroupMemberList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got customer list.",
     *         "data": [
     *             {
     *                 "id": 1,
     *                 "firstName": "John",
     *                 "lastName": "Doe",
     *                 "email": "john@example.com"
     *             }
     *         ]
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Internal Server Error"
     *     }
     *
     * @apiSampleRequest /api/vendor-customer-group/customer/list
     */
    @Get('/customer/list')
    @Authorized(['vendor', 'manage-customer-group'])
    public async customerList(@Res() response: any, @Req() request: any): Promise<any> {
        const customer = await this.customerService.find(
            {
                where: { deleteFlag: 0, tenantId: request.user.tenantId, isActive: 1, isVendor: 0 },
            }
        );
        return response.status(200).send({
            status: 1,
            message: 'Successfully got customer list.',
            data: instanceToPlain(customer),
        });
    }
}
