/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Post, Body, JsonController, Res, Get, Authorized, QueryParam, Put, Param, Delete, Req, UseBefore } from 'routing-controllers';
import { EmailTemplateService } from '../../core/services/EmailTemplateService';
import { MAILService } from '../../../auth/mail.services';
import { Not } from 'typeorm';
import { VendorUsersService } from '../../core/services/VendorUsersService';
import { VendorUserGroupService } from '../../core/services/VendorUserGroupService';
import { VendorUsersRequest } from './requests/CreateVendorUsersRequest';
import { VendorUsers } from '../../core/models/VendorUsers';
import { UpdateVendorUsersRequest } from './requests/UpdateVendorUsersRequest';
import { VendorSettingsService } from '../../core/services/VendorSettingsService';
import { VendorService } from '../../core/services/VendorService';
import { VendorUserEditProfileRequest } from './requests/VendorUserEditProfileRequest';
import { env } from '../../../env';
import { S3Service } from '../../core/services/S3Service';
import { ImageService } from '../../core/services/ImageService';
import { CustomerService } from '../../core/services/CustomerService';
import { VendorPwdChangeRequest } from './requests/VendorPwdChangeRequest';
import { Service } from 'typedi';
import { VendorSettingsDomainService } from '../../core/services/VendorSettingsDomainService';
import { CheckAddonMiddleware } from '../../core/middlewares/AddonValidationMiddleware';

@Service()
@UseBefore(CheckAddonMiddleware)
@JsonController('/vendor-user')
export class VendorUserController {

    constructor(
        private vendorUsersService: VendorUsersService,
        private vendorUserGroupService: VendorUserGroupService,
        private emailTemplateService: EmailTemplateService,
        private vendorService: VendorService,
        private vendorSettingsService: VendorSettingsService,
        private s3Service: S3Service,
        private imageService: ImageService,
        private customerService: CustomerService,
        private vendorSettingsDomainService: VendorSettingsDomainService
    ) {
        // --
    }

    // User List API
    /**
     * @api {get} /api/vendor-user User List API
     * @apiGroup Authentication
     * @apiHeader {String} Authorization
     * @apiParam (Query Parameters) {Number} [limit]
     * @apiParam (Query Parameters) {Number} [offset]
     * @apiParam (Query Parameters) {String} [keyword]
     * @apiParam (Query Parameters) {Number|Boolean} [count]
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": "1",
     *   "message": "Successfully get user list",
     *   "data": {
     *     "username": "",
     *     "password": "",
     *     "firstName": "",
     *     "lastName": "",
     *     "email": "",
     *     "deleteFlag": "",
     *     "isActive": "",
     *     "createdDate": "",
     *     "userId": "",
     *     "userGroup": {
     *       "createdBy": "",
     *       "createdDate": "",
     *       "modifiedBy": "",
     *       "modifiedDate": "",
     *       "groupId": "",
     *       "name": "",
     *       "slug": "",
     *       "permission": "",
     *       "isActive": ""
     *     }
     *   }
     * }
     * @apiSampleRequest /api/vendor-user
     * @apiErrorExample {json} User Profile error
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "message": "Internal Server Error"
     * }
     */
    @Get()
    @Authorized(['vendor', 'list-user'])
    public async findAll(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const relation = ['vendorUserGroup'];
        const whereConditions = [
            {
                name: 'tenantId',
                value: request.user.tenantId,
            },
            {
                name: 'deleteFlag',
                value: 0,
            },
        ];
        const user = await this.vendorUsersService.list(limit, offset, ['id', 'username', 'firstName', 'lastName', 'email', 'address', 'phoneNumber', 'avatar', 'avatarPath', 'password', 'createdDate', 'modifiedDate', 'tenantId', 'isSuperVendor'], relation, whereConditions, keyword, count);
        const successResponse: any = {
            status: 1,
            data: user,
            message: 'Successfully got all user list',
        };
        return response.status(200).send(successResponse);
    }

    // Create User API
    /**
     * @api {post} /api/vendor-user Create User API
     * @apiGroup Authentication
     * @apiParam (Request body) {String{..96}} username userName
     * @apiParam (Request body) {String{8..128}} password password
     * @apiParam (Request body) {String{..32}} firstName User First Name
     * @apiParam (Request body) {String{..32}} lastName User Last Name
     * @apiParam (Request body) {String{..96}} email User Email-Id
     * @apiParam (Request body) {Number} userGroupId User GroupId
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "username" : "",
     *      "password" : "",
     *      "firstName" : "",
     *      "lastName" : "",
     *      "email" : "",
     *      "userGroupId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "User created successfully.",
     *      "status": "1",
     *      "data": {
     *              "username": "",
     *              "password": "",
     *              "firstName": "",
     *              "lastName": "",
     *              "email": "",
     *              "deleteFlag": "",
     *              "userGroupId": "",
     *              "isActive": "",
     *              "createdDate": "",
     *              "userId": ""
     *      }
     * }
     * @apiSampleRequest /api/auth/create-user
     * @apiErrorExample {json} createUser error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized(['vendor', 'create-user'])
    public async createUser(@Body({ validate: true }) createParam: VendorUsersRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const whereConditions = [
            {
                name: 'id',
                op: 'where',
                value: createParam.userGroupId,
            },
        ];
        const userGroupExistRecord = await this.vendorUserGroupService.list(0, 0, [], whereConditions, 0);

        if (userGroupExistRecord.length === 0) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid user Group Id',
            };
            return response.status(400).send(errorResponse);
        }
        const user = await this.vendorUsersService.findOne({
            where: {
                username: createParam.username,
                tenantId: request.user.tenantId,
                deleteFlag: 0,
            },
        });
        if (user) {
            const errorResponse: any = {
                status: 0,
                message: 'This user already exists',
            };
            return response.status(400).send(errorResponse);
        }
        const newUserPassword = await VendorUsers.hashPassword(createParam.password);
        const newUserParams = new VendorUsers();
        newUserParams.username = createParam.username;
        newUserParams.password = newUserPassword;
        newUserParams.firstName = createParam.firstName;
        newUserParams.lastName = createParam.lastName;
        newUserParams.email = createParam.email;
        newUserParams.deleteFlag = 0;
        newUserParams.userGroupId = createParam.userGroupId;
        newUserParams.isActive = 1;
        newUserParams.isSuperVendor = 0;
        newUserParams.tenantId = request.user.tenantId;
        const userSaveResponse = await this.vendorUsersService.create(newUserParams);
        // sending login Credential email to new user
        if (userSaveResponse) {
            // const logo = await this.settingService.findOne();
            const vendorSetting = await this.vendorSettingsService.findOne({ where: { vendorId: request.user.tenantId } });
            const vendor = await this.vendorService.findOne({ where: { vendorId: request.user.tenantId } });
            const emailContent = await this.emailTemplateService.findOne({ where: { emailTemplateId: 7 } });
            const message = emailContent.content.replace('{name}', createParam.firstName + ' ' + createParam.lastName ? createParam.lastName : '').replace('{username}', createParam.email).replace('{password}', createParam.password).replace('{storeName}', vendorSetting?.siteName ?? '').replace('{storeName}', vendorSetting?.siteName ?? '');
            // const redirectUrl = env.adminRedirectUrl;
            const mailContents: any = {};
            mailContents.setting = { ...vendorSetting, ...vendor };
            mailContents.emailContent = message;
            const vendorDomain = await this.vendorSettingsDomainService.findOne({ where: { vendorId: request.user.tenantId, isActive: 1, isDelete: 0 } });
            let redirectUrl = vendorSetting.storeUrl;
            if (vendorDomain?.name) {
                redirectUrl = await this.vendorSettingsService.getVendorDomainOrDefault(request.user.tenantId, vendorDomain.name);
            }
            mailContents.redirectUrl = redirectUrl;
            mailContents.productDetailData = '';
            MAILService.sendMail(mailContents, createParam.email, emailContent.subject, false, false, '');
            const successResponse: any = {
                status: 1,
                message: 'User created successfully.',
                data: userSaveResponse,
            };
            return response.status(200).send(successResponse);
        }
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

    // update User API
    /**
     * @api {put} /api/auth/update-user/:id Update User API
     * @apiGroup Authentication
     * @apiParam (Request body) {String} username userName
     * @apiParam (Request body) {String} [password] password
     * @apiParam (Request body) {String{..32}} firstName User First Name
     * @apiParam (Request body) {String{..32}} lastName User Last Name
     * @apiParam (Request body) {String} email User Email-Id
     * @apiParam (Request body) {Number} userGroupId User GroupId
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "username" : "",
     *      "password" : "",
     *      "firstName" : "",
     *      "lastName" : "",
     *      "email" : "",
     *      "userGroupId" : "",
     *      "personalizedSetting":{
     *              "defaultLanguage": "",
     *              "dateFormat": "",
     *              "timeFormat": "",
     *              "timeZone": ""
     *          }
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "User is updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/update-user/:id
     * @apiErrorExample {json} updateUser error
     * HTTP/1.1 500 Internal Server Error
     */

    @Put('/:id')
    @Authorized(['vendor', 'edit-user'])
    public async updateUser(@Param('id') id: number, @Body({ validate: true }) createParam: UpdateVendorUsersRequest, @Req() request: any, @Res() response: any): Promise<any> {

        if (request.user.id === id) {
            const errorResponse: any = {
                status: 0,
                message: 'You cannot edit logged in user',
            };
            return response.status(400).send(errorResponse);
        }
        const vendor = await this.vendorUsersService.findOne({
            where: {
                tenantId: request.user.tenantId,
            },
        });
        const whereConditions = [
            {
                name: 'id',
                op: 'where',
                value: createParam.userGroupId,
            },
        ];
        const userGroupExistRecord = await this.vendorUserGroupService.list(0, 0, [], whereConditions, 0);
        if (userGroupExistRecord.length === 0) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid user group id',
            };
            return response.status(400).send(errorResponse);
        }

        const user = await this.vendorUsersService.findOne({
            where: {
                username: createParam.username,
                isSuperVendor: 0,
                deleteFlag: 0,
                id: Not(id),
            },
        });
        if (user) {
            const errorResponse: any = {
                status: 0,
                message: 'This user already exists',
            };
            return response.status(400).send(errorResponse);
        }
        const newUserPassword = await VendorUsers.hashPassword(createParam.password);
        const newUserParams = new VendorUsers();
        newUserParams.username = createParam.username;
        if (createParam.password) {
            const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/;
            if (!createParam.password.match(pattern)) {
                const passwordValidatingMessage = [];
                passwordValidatingMessage.push('Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters');
                const errResponse: any = {
                    status: 0,
                    message: "You have an error in your request's body. Check 'errors' field for more details",
                    data: { message: passwordValidatingMessage },
                };
                return response.status(422).send(errResponse);
            }
            newUserParams.password = newUserPassword;
        }
        newUserParams.firstName = createParam.firstName;
        newUserParams.lastName = createParam.lastName;
        newUserParams.email = createParam.email;
        newUserParams.userGroupId = createParam.userGroupId;
        newUserParams.isActive = 1;
        // newUserParams.personalizedSettings = {
        //     defaultLanguage: createParam.personalizedSetting.defaultLanguage || 0,
        //     timeFormat: createParam.personalizedSetting.timeFormat,
        //     timeZone: createParam.personalizedSetting.timeZone,
        //     dateFormat: createParam.personalizedSetting.dateFormat,
        // };

        await this.vendorUsersService.create(vendor);

        const vendorUserSave = await this.vendorUsersService.update(id, newUserParams);
        if (vendorUserSave) {
            const successResponse: any = {
                status: 1,
                message: 'User updated successfully',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the user',
            };
            return response.status(400).send(errorResponse);
        }

    }

    // Delete User API
    /**
     * @api {delete} /api/auth/delete-user/:id Delete User
     * @apiGroup Authentication
     * @apiParam (Request body) {Number} id UserId
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "User is deleted successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/delete-user/:id
     * @apiErrorExample {json} updateUser error
     * HTTP/1.1 500 Internal Server Error
     */

    @Delete('/:id')
    @Authorized(['vendor', 'delete-user'])
    public async remove(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {
        if (request.user.id === id) {
            const errorResponse: any = {
                status: 0,
                message: 'You cannot delete this user as this user is logged in at the moment',
            };
            return response.status(400).send(errorResponse);
        }
        const user = await this.vendorUsersService.findOne({
            where: {
                id: `${id}`,
                deleteFlag: 0,
            },
        });
        if (!user) {
            const errResponse: any = {
                status: 1,
                message: 'Invalid user id',
            };
            return response.status(400).send(errResponse);
        }
        user.deleteFlag = 1;
        const deleteUser = await this.vendorUsersService.create(user);
        if (deleteUser) {
            const successResponse: any = {
                status: 1,
                message: 'User deleted successfully',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the user',
            };
            return response.status(400).send(errorResponse);
        }
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
