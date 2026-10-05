/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Post, Body, JsonController, Res, Get, Authorized, Put, Req, UseBefore } from 'routing-controllers';
import { VendorUsersService } from '../../core/services/VendorUsersService';
import { VendorUserGroupService } from '../../core/services/VendorUserGroupService';
import { VendorUsers } from '../../core/models/VendorUsers';
import { VendorService } from '../../core/services/VendorService';
import { VendorUserEditProfileRequest } from './requests/VendorUserEditProfileRequest';
import { env } from '../../../env';
import { S3Service } from '../../core/services/S3Service';
import { ImageService } from '../../core/services/ImageService';
import { CustomerService } from '../../core/services/CustomerService';
import { VendorPwdChangeRequest } from './requests/VendorPwdChangeRequest';
import { Service } from 'typedi';
import { CheckAddonMiddleware } from '../../core/middlewares/AddonValidationMiddleware';

@Service()
@UseBefore(CheckAddonMiddleware)
@JsonController('/vendor-user')
export class VendorUserController {

    constructor(
        private vendorUsersService: VendorUsersService,
        private vendorUserGroupService: VendorUserGroupService,
        private vendorService: VendorService,
        private s3Service: S3Service,
        private imageService: ImageService,
        private customerService: CustomerService
    ) {
        // --
    }

    // Change Password API
    /**
     * @api {put} /api/auth/change-password Change Password API
     * @apiGroup Authentication
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} oldPassword User oldPassword
     * @apiParam (Request body) {String} newPassword User newPassword
     * @apiParamExample {json} Input
     * {
     *      "oldPassword" : "",
     *      "newPassword" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Password changed",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/change-password
     * @apiErrorExample {json} User error
     * HTTP/1.1 500 Internal Server Error
     */

    @Put('/change-password')
    @Authorized(['vendor', 'edit-user'])
    public async changePassword(@Body({ validate: true }) payload: VendorPwdChangeRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const vendorUser = await this.vendorUsersService.findOne({
            where: {
                id: request.user.id,
            },
        });

        if (!vendorUser) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid vendor user ID.',
            };
            return response.status(400).send(errResponse);
        }

        if (await VendorUsers.comparePassword(vendorUser, payload.oldPassword)) {
            const val = await VendorUsers.comparePassword(vendorUser, payload.newPassword);
            if (val) {
                const errResponse: any = {
                    status: 0,
                    message: 'Existing password and new password should not match',
                };
                return response.status(400).send(errResponse);
            }
            const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/;
            if (!payload.newPassword.match(pattern)) {
                const passwordValidatingMessage = [];
                passwordValidatingMessage.push('Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters');
                const errResponse: any = {
                    status: 0,
                    message: "You have an error in your request's body. Check 'errors' field for more details",
                    data: { message: passwordValidatingMessage },
                };
                return response.status(422).send(errResponse);
            }

            const hashPassword = await VendorUsers.hashPassword(payload.newPassword);

            if (vendorUser.isSuperVendor === 1) {
                const vendorCustomer = await this.customerService.findOne({
                    where: {
                        tenantId: vendorUser.tenantId,
                    },
                });

                vendorCustomer.password = hashPassword;

                this.customerService.create(vendorCustomer);
            }

            vendorUser.password = hashPassword;
            const savedVendorUser = await this.vendorUsersService.update(vendorUser.id, vendorUser);
            if (savedVendorUser) {
                const successResponse: any = {
                    status: 1,
                    message: 'Your password changed successfully.',
                };
                return response.status(200).send(successResponse);
            }
        }
        const errorResponse: any = {
            status: 0,
            message: 'The old password you entered is incorrect.',
        };
        return response.status(400).send(errorResponse);
    }

    // Edit Profile API
    /**
     * @api {post} /api/auth/edit-profile Edit Profile API
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
     *      "personalizedSettings":{
     *              "defaultLanguage": "",
     *              "dateFormat": "",
     *              "timeFormat": "",
     *              "timeZone": ""
     *          }
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated User.",
     *      "status": "1",
     *      "data": {
     *              "createdBy": "",
     *              "createdDate": "",
     *              "modifiedBy": "",
     *              "modifiedDate": "",
     *              "userId": "",
     *              "userGroupId": "",
     *              "username": "",
     *              "password": "",
     *              "firstName": "",
     *              "lastName": "",
     *              "email": "",
     *              "avatar": "",
     *              "avatarPath": "",
     *              "isActive": "",
     *              "code": "",
     *              "ip": "",
     *              "phoneNumber": "",
     *              "address": "",
     *              "deleteFlag": "",
     *              "linkExpires": "",
     *              "forgetPasswordKey": "",
     *              "permission": "",
     *              "userGroup": {
     *                "createdBy": "",
     *                "createdDate": "",
     *                "modifiedBy": "",
     *                "modifiedDate": "",
     *                "groupId": "",
     *                "name": "",
     *                "slug": "",
     *                "permission": "",
     *                "isActive": ""
     * }
     * }
     * @apiSampleRequest /api/auth/edit-profile
     * @apiErrorExample {json} User error
     * HTTP/1.1 500 Internal Server Error
     */

    @Post('/edit-profile')
    @Authorized(['vendor', 'edit-user'])
    public async editProfile(@Body({ validate: false }) payload: VendorUserEditProfileRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const vendorUser = await this.vendorUsersService.findOne({ where: { id: request.user.id } });

        if (!vendorUser) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid vendor user ID.',
            };
            return response.status(400).send(errorResponse);
        }

        if (vendorUser.isSuperVendor === 1) {

            const customer = await this.customerService.findOne({ where: { tenantId: vendorUser.tenantId } });
            customer.username = payload.email;
            customer.email = payload.email;
            customer.mobile = payload.phoneNumber === '' || payload.phoneNumber ? +(payload.phoneNumber) : customer.mobile;
            customer.address = payload.address;

            this.customerService.create(customer);
        }

        const avatar = payload.avatar;
        const path = request?.user?.vendor?.vendorPrefixId ? request.user.vendor.vendorPrefixId + '/' : 'user/';
        // const path = 'user/';
        if (avatar) {
            const base64Data = Buffer.from(avatar.split(',')[1], 'base64');
            const type = avatar.split(';')[0].split(':')[1].toString();
            const mime = require('mime');
            const ext = mime.getExtension(type);
            const availableTypes = env.availImageTypes.split(',');

            if (!availableTypes.includes(ext)) {
                const errorTypeResponse: any = {
                    status: 0,
                    message: 'Only ' + env.availImageTypes + ' Types are Allowed',
                };
                return response.status(400).send(errorTypeResponse);
            }
            let name = '';
            if (payload.avatarFileName) {
                const originalName = payload.avatarFileName.split('.')[0];
                name = originalName + '_' + Date.now() + '.' + ext;
            } else {
                name = 'Avatar_' + Date.now() + '.' + ext;
            }

            const stringLength = avatar.replace(/^data:image\/\w+;base64,/, '').length;
            const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
            const sizeInKb = sizeInBytes / 1024;

            const allowedSize = +env.imageUploadSize * 1024;

            if (+sizeInKb <= allowedSize) {
                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload(path + name, base64Data, type, 0);
                } else {
                    await this.imageService.imageUpload((path + name), base64Data);
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Not Able To Update as The File Size Is Too Large',
                };
                return response.status(400).send(errorResponse);
            }

            vendorUser.avatar = name;
            vendorUser.avatarPath = path;
        }

        // tslint:disable:no-null-keyword
        if (avatar === null) {
            vendorUser.avatar = null;
            vendorUser.avatarPath = null;
        }
        // tslint:enable:no-null-keyword

        vendorUser.username = payload.username;
        vendorUser.email = payload.email;
        vendorUser.phoneNumber = payload.phoneNumber === '' || payload.phoneNumber ? +(payload.phoneNumber) : vendorUser.phoneNumber;
        vendorUser.address = payload.address;

        const vendorUserSave: any = await this.vendorUsersService.create(vendorUser);

        vendorUser.vendorUserGroup = await this.vendorUserGroupService.findOne({ where: { id: vendorUserSave.userGroupId } });

        const successResponse: any = {
            status: 1,
            message: 'Successfully updated the vendor user profile.',
            data: vendorUserSave,
        };
        return response.status(200).send(successResponse);
    }

    // Get User Profile API
    /**
     * @api {get} /api/auth/get-profile Get User Profile API
     * @apiGroup Authentication
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Get the Profile..!",
     *      "status": "1"
     *     "data": {
     *     "userId": "",
     *     "username": "",
     *     "email": "",
     *     "avatar": "",
     *     "avatarPath": "",
     *     "address": "",
     *     "createdDate": "",
     *     "firstName": "",
     *     "lastName": "",
     *     "deleteFlag": "",
     *     "phoneNumber": "",
     *     "isActive": "",
     *     "code": "",
     *   }
     * }
     * @apiSampleRequest /api/auth/get-profile
     * @apiErrorExample {json} Get Profile error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/get-profile')
    @Authorized(['vendor', 'list-user'])
    public async getProfile(@Req() request: any, @Res() response: any): Promise<any> {
        const vendorUser = await this.vendorUsersService.findOne({ select: ['id', 'userGroupId', 'username', 'firstName', 'lastName', 'email', 'avatar', 'avatarPath', 'address', 'phoneNumber', 'isActive'], where: { id: request.user.id } });
        const vendor = await this.vendorService.findOne({ select: ['vendorPrefixId', 'appId'], where: { vendorId: request.user.tenantId } });
        const successResponse: any = {
            status: 1,
            message: 'Profile fetched successfully.',
            data: { ...vendorUser, ...vendor },
        };
        return response.status(200).send(successResponse);
    }
}
