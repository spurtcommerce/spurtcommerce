/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Post, Body, JsonController, Res, Get, Authorized, QueryParam, Put, Param, Delete, Req, BodyParam
} from 'routing-controllers';
import { instanceToPlain } from 'class-transformer';
import jwt from 'jsonwebtoken';
import { env } from '../../../env';
import { ForgotPassword as ForgotPassword } from './requests/ForgotPasswordRequest';
import { UserLogin as LoginRequest } from './requests/UserLoginRequest';
import { CreateUser as CreateRequest } from './requests/CreateUserRequest';
import { UpdateUserRequest as updateUserRequest } from './requests/UpdateUserRequest';
import { User } from '../../core/models/User';
import { AccessToken } from '../../core/models/AccessTokenModel';
import { UserService } from '../../core/services/UserService';
import { UserGroupService } from '../../core/services/UserGroupService';
import { ChangePassword } from './requests/ChangePasswordRequest';
import { EditProfileRequest } from './requests/EditProfileRequest';
import { AccessTokenService } from '../../core/services/AccessTokenService';
import { EmailTemplateService } from '../../core/services/EmailTemplateService';
import { MAILService } from '../../../auth/mail.services';
import { ImageService } from '../../core/services/ImageService';
import { S3Service } from '../../core/services/S3Service';
import { SettingService } from '../../core/services/SettingService';
import { Not, Raw } from 'typeorm';
import moment from 'moment';
@JsonController('/auth')
export class UserController {

    constructor(
        private userService: UserService,
        private userGroupService: UserGroupService,
        private accessTokenService: AccessTokenService,
        private emailTemplateService: EmailTemplateService, private s3Service: S3Service, private settingService: SettingService,
        private imageService: ImageService) {
    }
    // Login API
    /**
     * @api {post} /api/auth/login Login
     * @apiGroup Authentication
     * @apiParam (Request body) {String} username User Username
     * @apiParam (Request body) {String} password User Password
     * @apiParamExample {json} Input
     * {
     *      "username" : "",
     *      "password" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully login",
     *      "status": "1"
     *      "data": "{
     *              "token": "",
     *              "user": {
     *                 "createdDate": "",
     *                 "userId": "",
     *                 "avatar": "",
     *                 "avatarPath": "",
     *                 "isActive": "",
     *                 "code": "",
     *                 "address": "",
     *                 "deleteFlag": "",
     *                 "linkExpires": "",
     *                 "userGroup": {
     *                    "createdDate": "",
     *                    "groupId": "",
     *                    "name": ""
     *                       }
     *            }",
     * }
     * @apiSampleRequest /api/auth/login
     * @apiErrorExample {json} Login error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/login')
    public async login(@Body({ validate: true }) loginParam: LoginRequest, @Res() response: any): Promise<any> {
        const user = await this.userService.findOne({
            where: {
                username: Raw(alias => `LOWER(${alias}) = '${loginParam.username.toLowerCase()}'`),
                isActive: 1,
                deleteFlag: 0,
            },
            relations: ['usergroup'],
        });
        if (user) {
            if (await User.comparePassword(user, loginParam.password)) {
                // create a token
                const token = jwt.sign({ id: user.userId, role: 'admin' }, env.jwtSecret, {
                    expiresIn: env.jwtExpiryTime.toString(),
                });
                if (user.usergroup.isActive === 0) {
                    const errorResponse: any = {
                        status: 0,
                        message: 'Role is InActive',
                    };
                    return response.status(400).send(errorResponse);
                }
                let permission: any = {};
                if (user.userGroupId !== 1) {
                    const userDetail = await this.userService.findOne({ where: { userId: user.userId } });
                    if (userDetail.permission) {
                        permission = JSON.parse(userDetail.permission);
                    } else {
                        const roleDetail = await this.userGroupService.findOne({ where: { groupId: user.userGroupId } });
                        permission = roleDetail.permission ? JSON.parse(roleDetail.permission) : {};
                    }
                }
                if (token) {
                    const newToken = new AccessToken();
                    newToken.userId = user.userId;
                    newToken.token = token;
                    newToken.userType = 'admin';
                    await this.accessTokenService.create(newToken);
                    const Crypto = require('crypto-js');
                    const ciphertextToken = Crypto.AES.encrypt(token, env.cryptoSecret).toString();
                    const successResponse: any = {
                        status: 1,
                        message: 'Logged in successfully',
                        data: {
                            token: ciphertextToken,
                            user: instanceToPlain(user),
                            permission,
                        },
                    };
                    return response.status(200).send(successResponse);
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Login Information provided is invalid',
                };
                return response.status(400).send(errorResponse);
            }
        } else {

            const errorResponse: any = {
                status: 0,
                message: 'Login Information provided is invalid',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // User List API
    /**
     * @api {get} /api/auth/userlist User List API
     * @apiGroup Authentication
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get user list",
     *      "data": {
     *              "username": "",
     *              "password": "",
     *              "firstName": "",
     *              "lastName": "",
     *              "email": "",
     *              "deleteFlag": "",
     *              "isActive": "",
     *              "createdDate": "",
     *              "userId": ""
     *              "userGroup": {
     *                     "createdBy": "",
     *                     "createdDate": "",
     *                     "modifiedBy": "",
     *                     "modifiedDate": "",
     *                     "groupId": "",
     *                     "name": "",
     *                     "slug": "",
     *                     "permission": "",
     *                     "isActive": ""
     *      }
     *   }
     * }
     * @apiSampleRequest /api/auth/userlist
     * @apiErrorExample {json} User Profile error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/userlist')
    @Authorized(['admin', 'list-user'])
    public async findAll(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const relation = ['usergroup'];
        const WhereConditions = [{
            name: 'deleteFlag',
            value: 0,
        }];
        const user = await this.userService.list(limit, offset, ['userId', 'username', 'firstName', 'lastName', 'email', 'address', 'phoneNumber', 'avatar', 'avatarPath', 'password', 'createdDate', 'modifiedDate'], relation, WhereConditions, keyword, count);
        const successResponse: any = {
            status: 1,
            data: user,
            message: 'Successfully got all user list',
        };
        return response.status(200).send(successResponse);
    }

    // Create User API
    /**
     * @api {post} /api/auth/create-user Create User API
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
     *      "message": "New User is created successfully",
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
     *              }
     * }
     * @apiSampleRequest /api/auth/create-user
     * @apiErrorExample {json} createUser error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/create-user')
    @Authorized(['admin', 'create-user'])
    public async createUser(@Body({ validate: true }) createParam: CreateRequest, @Res() response: any): Promise<any> {
        const userGroupExistWhereCondition = [
            {
                name: 'id',
                value: createParam.userGroupId,
            },
        ];
        const userGroupExistRecord = await this.userGroupService.list(0, 0, [], userGroupExistWhereCondition, 0);
        if (userGroupExistRecord.length === 0) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid user Group Id',
            };
            return response.status(400).send(errorResponse);
        }
        const user = await this.userService.findOne({
            where: {
                username: createParam.username,
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
        const newUserPassword = await User.hashPassword(createParam.password);
        const newUserParams = new User();
        newUserParams.username = createParam.username;
        newUserParams.password = newUserPassword;
        newUserParams.firstName = createParam.firstName;
        newUserParams.lastName = createParam.lastName;
        newUserParams.email = createParam.email;
        newUserParams.deleteFlag = 0;
        newUserParams.userGroupId = createParam.userGroupId;
        newUserParams.isActive = 1;
        const userSaveResponse = await this.userService.create(newUserParams);
        // sending login Credential email to new user
        if (userSaveResponse) {
            const logo = await this.settingService.findOne();
            const emailContent = await this.emailTemplateService.findOne(7);
            const message = emailContent.content.replace('{name}', createParam.firstName + ' ' + createParam.lastName ? createParam.lastName : '').replace('{username}', createParam.email).replace('{password}', createParam.password).replace('{storeName}', logo.siteName).replace('{storeName}', logo.siteName);
            const redirectUrl = env.adminRedirectUrl;
            const mailContents: any = {};
            mailContents.logo = logo;
            mailContents.emailContent = message;
            mailContents.redirectUrl = redirectUrl;
            mailContents.productDetailData = '';
            MAILService.sendMail(mailContents, createParam.email, emailContent.subject, false, false, '');
            const successResponse: any = {
                status: 1,
                message: 'User created successfully',
                data: userSaveResponse,
            };
            return response.status(200).send(successResponse);
        }
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
    @Put('/update-user/:id')
    @Authorized(['admin', 'edit-user'])
    public async updateUser(@Param('id') id: number, @Body({ validate: true }) createParam: updateUserRequest, @Req() request: any, @Res() response: any): Promise<any> {
        if (request.user.userId === id) {
            const errorResponse: any = {
                status: 0,
                message: 'You cannot edit logged in user',
            };
            return response.status(400).send(errorResponse);
        }
        const userGroupExistWhereCondition = [
            {
                name: 'id',
                value: createParam.userGroupId,
            },
        ];
        const userGroupExistRecord = await this.userGroupService.list(0, 0, [], userGroupExistWhereCondition, 0);
        if (userGroupExistRecord.length === 0) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid user group id',
            };
            return response.status(400).send(errorResponse);
        }
        const user = await this.userService.findOne({
            where: {
                username: createParam.username,
                deleteFlag: 0,
                userId: Not(id),
            },
        });
        if (user) {
            const errorResponse: any = {
                status: 0,
                message: 'This user already exists',
            };
            return response.status(400).send(errorResponse);
        }
        const newUserPassword = await User.hashPassword(createParam.password);
        const newUserParams = new User();
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
        const userSaveResponse = await this.userService.update(id, newUserParams);
        if (userSaveResponse) {
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
    @Delete('/delete-user/:id')
    @Authorized(['admin', 'delete-user'])
    public async remove(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {
        if (request.user.userId === id) {
            const errorResponse: any = {
                status: 0,
                message: 'You cannot delete this user as this user is logged in at the moment',
            };
            return response.status(400).send(errorResponse);
        }
        const user = await this.userService.findOne({
            where: {
                userId: id,
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
        const deleteUser = await this.userService.create(user);
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
    // forgot Password API
    /**
     * @api {post} /api/auth/forgot-password Forgot Password API
     * @apiGroup Authentication
     * @apiParam (Request body) {String} email User email
     * @apiParamExample {json} Input
     * {
     *      "email" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you. Your password send to your email",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/forgot-password
     * @apiErrorExample {json} User error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/forgot-password')
    public async forgotPassword(@Body({ validate: true }) forgotPassword: ForgotPassword, @Res() response: any): Promise<any> {
        const user = await this.userService.findOne({
            where: {
                email: forgotPassword.email,
            },
        });
        if (!user) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid email Id',
            };
            return response.status(400).send(errorResponse);
        }
        const tempPassword: any = Math.random().toString().substr(2, 5);
        const password = await User.hashPassword(tempPassword);
        user.password = password;
        await this.userService.create(user);
        const emailContent = await this.emailTemplateService.findOne(2);
        const logo = await this.settingService.findOne();
        const message = emailContent.content.replace('{name}', user.firstName).replace('{xxxxxx}', tempPassword);
        const redirectUrl = env.adminRedirectUrl;
        const mailContents: any = {};
        mailContents.logo = logo;
        mailContents.emailContent = message;
        mailContents.redirectUrl = redirectUrl;
        mailContents.productDetailData = '';
        const sendMailRes = MAILService.sendMail(mailContents, user.email, emailContent.subject, false, false, '');
        if (sendMailRes) {
            const successResponse: any = {
                status: 1,
                message: 'Your password has been sent to your email inbox',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Error in sending email',
            };
            return response.status(400).send(errorResponse);
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
    @Authorized()
    public async changePassword(@Body({ validate: true }) changePasswordParam: ChangePassword, @Req() request: any, @Res() response: any): Promise<any> {
        const user = await this.userService.findOne({
            where: {
                userId: request.user.userId,
            },
        });
        if (!user) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid user Id',
            };
            return response.status(400).send(errResponse);
        }
        if (await User.comparePassword(user, changePasswordParam.oldPassword)) {
            const val = await User.comparePassword(user, changePasswordParam.newPassword);
            if (val) {
                const errResponse: any = {
                    status: 0,
                    message: 'Existing password and new password should not match',
                };
                return response.status(400).send(errResponse);
            }
            const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/;
            if (!changePasswordParam.newPassword.match(pattern)) {
                const passwordValidatingMessage = [];
                passwordValidatingMessage.push('Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters');
                const errResponse: any = {
                    status: 0,
                    message: "You have an error in your request's body. Check 'errors' field for more details",
                    data: { message: passwordValidatingMessage },
                };
                return response.status(422).send(errResponse);
            }
            user.password = await User.hashPassword(changePasswordParam.newPassword);
            const updateUser = await this.userService.update(user.userId, user);
            if (updateUser) {
                const successResponse: any = {
                    status: 1,
                    message: 'Your password changed successfully',
                };
                return response.status(200).send(successResponse);
            }
        }
        const errorResponse: any = {
            status: 0,
            message: 'Your old password is wrong',
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
    @Authorized()
    public async editProfile(@Body({ validate: true }) editProfileParam: EditProfileRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const user = await this.userService.findOne({
            where: {
                userId: request.user.userId,
            },
        });
        if (!user) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid User Id',
            };
            return response.status(400).send(errorResponse);
        }
        const avatar = editProfileParam.avatar;
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

            user.avatar = name;
            user.avatarPath = path;
        }
        user.username = editProfileParam.username;
        user.email = editProfileParam.email;
        user.phoneNumber = editProfileParam.phoneNumber;
        user.address = editProfileParam.address;
        const userSave: any = await this.userService.create(user);
        userSave.usergroup = await this.userGroupService.findOne({ where: { groupId: userSave.userGroupId } });
        if (userSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the profile',
                data: userSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to edit the profile',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Logout API
    /**
     * @api {post} /api/auth/logout Log Out API
     * @apiGroup Authentication
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully logout",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/logout
     * @apiErrorExample {json} Logout error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/logout')
    @Authorized()
    public async logout(@Req() request: any, @Res() response: any): Promise<any> {
        const token = request.headers.authorization.split(' ')[0] === 'Bearer' ? request.headers.authorization.split(' ')[1] : '';
        if (!token) {
            const successResponseBeforeToken: any = {
                status: 1,
                message: 'Successfully logout',
            };
            return response.status(200).send(successResponseBeforeToken);

        }
        const Crypto = require('crypto-js');
        const bytes = Crypto.AES.decrypt(token, env.cryptoSecret);
        const originalEncryptedString = bytes.toString(Crypto.enc.Utf8);
        const user = await this.accessTokenService.findOne({
            where: {
                token: originalEncryptedString,
            },
        });
        if (!user) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid token',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteToken = await this.accessTokenService.delete(user);
        if (!deleteToken) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully logout',
            };
            return response.status(200).send(successResponse);
        }
    }
    // forgot password link
    /**
     * @api {post} /api/auth/forgot-password-link Forgot Password Link API
     * @apiGroup  Authentication
     * @apiParam (Request body) {String} email User email
     * @apiParamExample {json} Input
     * {
     *      "email" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/forgot-password-link
     * @apiErrorExample {json} admin forgot password error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/forgot-password-link')
    public async forgetPasswordLink(@BodyParam('email') emailId: string, @Res() response: any, @Req() request: any): Promise<any> {
        const customer = await this.userService.findOne({
            where: { email: emailId, deleteFlag: 0 },
        });
        if (!customer) {
            const errResponse: any = {
                status: 1,
                message: 'If the user is registered, a link to reset the password will be sent to the user’s email address',
            };
            return response.status(200).send(errResponse);
        }
        const Crypto = require('crypto-js');
        const val = Crypto.AES.encrypt(customer.email, env.cryptoSecret).toString();
        const encryptedKey = Buffer.from(val).toString('base64');
        console.log(encryptedKey + 'enc');
        customer.forgetPasswordKey = encryptedKey;
        customer.linkExpires = moment().add(20, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        await this.userService.update(customer.userId, customer);
        const emailContent = await this.emailTemplateService.findOne(23);
        const logo = await this.settingService.findOne();
        const redirectUrl = env.adminForgetPasswordLink + '?token=' + encryptedKey;
        console.log(redirectUrl + 'redirectUrl');
        const message = emailContent.content.replace('{name}', customer.firstName).replace('{link}', redirectUrl);
        const mailContents: any = {};
        mailContents.logo = logo;
        mailContents.emailContent = message;
        mailContents.redirectUrl = env.adminRedirectUrl;
        mailContents.productDetailData = '';
        const sendMailRes = MAILService.sendMail(mailContents, customer.email, emailContent.subject, false, false, '');
        if (sendMailRes) {
            const successResponse: any = {
                status: 1,
                message: 'If the user is registered a , to reset the password will be sent to the user’s email address',
            };
            return response.status(200).send(successResponse);
        }
    }
    // forget password key check
    /**
     * @api {get} /api/auth/forgot-password-key-check Forgot Password Key check API
     * @apiGroup   Authentication
     * @apiParam (Request body) {String} key key
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/forgot-password-key-check
     * @apiErrorExample {json} admin forget password error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/forgot-password-key-check')
    public async keyCheck(@QueryParam('key') encryptedKey: string, @Res() response: any): Promise<any> {
        console.log(encryptedKey + 'enkKey');
        const Crypto = require('crypto-js');
        const bytes = Crypto.AES.decrypt(Buffer.from(encryptedKey, 'base64').toString('ascii'), env.cryptoSecret);
        const decodedTokenKey = bytes.toString(Crypto.enc.Utf8);
        console.log(decodedTokenKey + 'key');
        const customer = await this.userService.findOne({
            where: { email: decodedTokenKey, deleteFlag: 0 },
        });
        if (!customer) {
            const errResponse: any = {
                status: 3,
                message: 'Invalid key. please try again',
            };
            return response.status(200).send(errResponse);
        }
        if (moment(customer.linkExpires).format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')) {
            const expirationError: any = {
                status: 2,
                message: 'Your forgot password link got expired, try again',
            };
            return response.status(200).send(expirationError);
        }
        if (customer.forgetPasswordKey !== '') {
            const successResponse: any = {
                status: 1,
                message: 'Valid key',
            };
            return response.status(200).send(successResponse);
        } else {
            const successResponse: any = {
                status: 3,
                message: 'This link has been used already. please try a different one',
            };
            return response.status(200).send(successResponse);
        }
    }
    // reset password
    /**
     * @api {put} /api/auth/reset-password  Reset Password API
     * @apiGroup  Authentication
     * @apiParam (Request body) {String} newPassword  newPassword
     * @apiParam (Request body) {String} key  key
     * @apiParamExample {json} Input
     * {
     *      "key": "",
     *      "newPassword" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Password changed",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/reset-password
     * @apiErrorExample {json} admin resetpassword error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/reset-password')
    public async resetPassword(@BodyParam('newPassword') newPassword: string, @BodyParam('key') key: string, @Req() request: any, @Res() response: any): Promise<any> {
        const tokenKey = key;
        if (!tokenKey) {

            const keyError: any = {
                status: 0,
                message: 'Key is missing',
            };
            return response.status(400).send(keyError);

        }
        const Crypto = require('crypto-js');
        console.log(tokenKey + 'tokenKey');
        const bytes = Crypto.AES.decrypt(Buffer.from(tokenKey, 'base64').toString('ascii'), env.cryptoSecret);
        const decodedTokenKey = bytes.toString(Crypto.enc.Utf8);
        console.log(decodedTokenKey + 'key');
        const resultData = await this.userService.findOne({
            select: ['userId', 'firstName', 'email', 'phoneNumber', 'password', 'avatar', 'avatarPath', 'isActive', 'forgetPasswordKey'],
            where: { email: decodedTokenKey, deleteFlag: 0 },
        });
        const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])(?=.*?[#?!@$%^&*-])).{8,128}$/;
        if (!newPassword.match(pattern)) {
            const passwordValidatingMessage = [];
            passwordValidatingMessage.push('Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters');
            const errResponse: any = {
                status: 0,
                message: "You have an error in your request's body. Check 'errors' field for more details",
                data: { message: passwordValidatingMessage },
            };
            return response.status(422).send(errResponse);
        }
        const partsOfThreeLetters = resultData.email.match(/.{3}/g).concat(
            resultData.email.substr(1).match(/.{3}/g),
            resultData.email.substr(2).match(/.{3}/g));
        const matchEmail = new RegExp(partsOfThreeLetters.join('|'), 'i').test(newPassword);
        if (matchEmail === true) {
            const validationMessage = [];
            validationMessage.push('Password must not contain any part of the email address');
            const passwordDuplicateErrorResponse: any = {
                status: 0,
                message: "You have an error in your request's body. Check 'errors' field for more details",
                data: { message: validationMessage },
            };
            return response.status(422).send(passwordDuplicateErrorResponse);
        }
        resultData.password = await User.hashPassword(newPassword);
        resultData.forgetPasswordKey = '';
        const updateUserData = await this.userService.update(resultData.userId, resultData);
        if (updateUserData) {
            const successResponse: any = {
                status: 1,
                message: 'Your password has been changed successfully',
                data: resultData.email,
            };
            return response.status(200).send(successResponse);
        }
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
    // Get Profile Function
    @Get('/get-profile')
    @Authorized()
    public async getProfile(@Req() request: any, @Res() response: any): Promise<any> {
        const resultData = await this.userService.findOne({ select: ['username', 'userId', 'email', 'address', 'avatar', 'avatarPath', 'createdDate', 'modifiedDate', 'deleteFlag', 'firstName', 'lastName', 'phoneNumber', 'isActive', 'code'], where: { userId: request.user.userId } });
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the profile',
            data: resultData,
        };
        return response.status(200).send(successResponse);
    }
}
