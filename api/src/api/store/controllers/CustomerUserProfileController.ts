/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { JsonController, Res, Get, Authorized, Req, UseBefore, Put, Body } from 'routing-controllers';
import { CustomerUsersService } from '../../core/services/CustomerUsersService';
import { CheckCustomerMiddleware } from '../../core/middlewares/checkTokenMiddleware';
import { TenantValidationMiddleware } from '../../core/middlewares/TenantValidationMiddleware';
import { UpdateCustomerUsersRequest } from './requests/UpdateCustomerUsersRequest';
import { CustomerService } from '../../core/services/CustomerService';
// import { CustomerUserGroupService } from '../../core/services/CustomerUserGroupService';
import { env } from '../../../env';
import { S3Service } from '../../core/services/S3Service';
import { ImageService } from '../../core/services/ImageService';
import { instanceToPlain } from 'class-transformer';
import { Service } from 'typedi';

@Service()
@UseBefore(TenantValidationMiddleware)
@UseBefore(CheckCustomerMiddleware)
@JsonController('/customer-user-profile')
export class CustomerUserProfileController {

    constructor(
        private customerUsersService: CustomerUsersService,
        private customerService: CustomerService,
        // private customerUserGroupService: CustomerUserGroupService,
        private s3Service: S3Service,
        private imageService: ImageService
    ) {
        // --
    }

    // Get Customer User Profile API
    /**
     * @api {get} /api/customer-user-profile Get Customer User Profile API
     * @apiGroup Customer Users
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Get the Profile..!",
     *      "status": "1"
     *      "data": {
     *          "userId": "",
     *          "username": "",
     *          "email": "",
     *          "avatar": "",
     *          "avatarPath": "",
     *          "address": "",
     *          "createdDate": "",
     *          "firstName": "",
     *          "lastName": "",
     *          "deleteFlag": "",
     *          "phoneNumber": "",
     *          "isActive": "",
     *          "code": "",
     *      }
     * }
     * @apiSampleRequest /api/customer-user-profile
     * @apiErrorExample {json} Get Customer Profile error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized(['customer', 'view-customer-profile'])
    public async getCustomerUsersProfile(@Req() request: any, @Res() response: any): Promise<any> {
        const customerUser = await this.customerUsersService.findOne(
            {
                select: ['id', 'customerUserGroupId', 'username', 'firstName', 'lastName', 'email', 'avatar', 'avatarPath', 'address', 'phoneNumber', 'isActive', 'deleteFlag', 'createdBy', 'modifiedBy', 'createdDate', 'modifiedDate', 'isSuperCustomer'],
                where: { id: request.user.id },
                relations: ['customerUserGroups', 'customer'],
            });
        const successResponse: any = {
            status: 1,
            message: 'Profile fetched successfully.',
            data: instanceToPlain(customerUser),
        };
        return response.status(200).send(successResponse);
    }

    // Edit Profile API
    /**
     * @api {put} /api/customer-user-profile Edit Profile API
     * @apiGroup Authentication
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..96}} username User username
     * @apiParam (Request body) {String{..96}} email User email
     * @apiParam (Request body) {String{..15}} phoneNumber User phoneNumber
     * @apiParam (Request body) {String{.255}} address User address
     * @apiParam (Request body) {String} [avatar] User avatar
     * @apiParamExample {json} Input
     * {
     *      "username" : "",
     *      "email" : "",
     *      "phoneNumber" : "",
     *      "address" : "",
     *      "avatar" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated the customer user profile.",
     *      "status": "1",
     *      "data": {}
     * }
     * @apiSampleRequest /api/customer-user-profile
     * @apiErrorExample {json} User error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put()
    @Authorized(['customer', 'edit-customer-profile'])
    public async CustomerUsersProfile(@Body({ validate: false }) payload: UpdateCustomerUsersRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const customerUser = await this.customerUsersService.findOne({
            where: {
                id: request.user.id,
            },
        });

        if (!customerUser) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid user ID.',
            };
            return response.status(400).send(errorResponse);
        }

        if (customerUser.isSuperCustomer === 1) {
            const customer = await this.customerService.findOne({ where: { id: customerUser.customerId } });
            // customer.username = payload.email;
            // customer.email = payload.email;
            customer.mobile = payload.phoneNumber;
            customer.address = payload.address;
            await this.customerService.create(customer);
        }

        const avatar = payload.avatar;
        if (avatar) {
            const type = avatar.split(';')[0].split('/')[1];
            const availableTypes = env.availImageTypes.split(',');
            if (!availableTypes.includes(type)) {
                const errorTypeResponse: any = {
                    status: 0,
                    message: 'Only ' + env.availImageTypes + ' types are allowed',
                };
                return response.status(400).send(errorTypeResponse);
            }
            const name = 'Img_' + Date.now() + '.' + type;
            const path = 'user/';
            const base64Data = Buffer.from(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64');

            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((path + name), base64Data, type);
            } else {
                await this.imageService.imageUpload((path + name), base64Data);
            }

            customerUser.avatar = name;
            customerUser.avatarPath = path;
        }

        // customerUser.username = payload.username;
        customerUser.firstName = payload.firstName;
        customerUser.lastName = payload.lastName;
        // customerUser.email = payload.email;
        customerUser.phoneNumber = payload.phoneNumber;
        customerUser.address = payload.address;

        // const cutsomerUserSave: any = await this.customerUsersService.create(customerUser);

        // const customerUserGroup = await this.customerUserGroupService.findOne({ where: { id: cutsomerUserSave.customerUserGroupId } });

        const successResponse: any = {
            status: 1,
            message: 'Successfully updated the customer user profile.',
            data: { ...customerUser },
        };
        return response.status(200).send(successResponse);
    }
}
