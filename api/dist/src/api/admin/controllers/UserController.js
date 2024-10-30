"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const class_transformer_1 = require("class-transformer");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const env_1 = require("../../../env");
const ForgotPasswordRequest_1 = require("./requests/ForgotPasswordRequest");
const UserLoginRequest_1 = require("./requests/UserLoginRequest");
const CreateUserRequest_1 = require("./requests/CreateUserRequest");
const UpdateUserRequest_1 = require("./requests/UpdateUserRequest");
const User_1 = require("../../core/models/User");
const AccessTokenModel_1 = require("../../core/models/AccessTokenModel");
const UserService_1 = require("../../core/services/UserService");
const UserGroupService_1 = require("../../core/services/UserGroupService");
const ChangePasswordRequest_1 = require("./requests/ChangePasswordRequest");
const EditProfileRequest_1 = require("./requests/EditProfileRequest");
const AccessTokenService_1 = require("../../core/services/AccessTokenService");
const EmailTemplateService_1 = require("../../core/services/EmailTemplateService");
const mail_services_1 = require("../../../auth/mail.services");
const ImageService_1 = require("../../core/services/ImageService");
const S3Service_1 = require("../../core/services/S3Service");
const SettingService_1 = require("../../core/services/SettingService");
const typeorm_1 = require("typeorm");
const moment_1 = tslib_1.__importDefault(require("moment"));
let UserController = class UserController {
    constructor(userService, userGroupService, accessTokenService, emailTemplateService, s3Service, settingService, imageService) {
        this.userService = userService;
        this.userGroupService = userGroupService;
        this.accessTokenService = accessTokenService;
        this.emailTemplateService = emailTemplateService;
        this.s3Service = s3Service;
        this.settingService = settingService;
        this.imageService = imageService;
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
    login(loginParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne({
                where: {
                    username: (0, typeorm_1.Raw)(alias => `LOWER(${alias}) = '${loginParam.username.toLowerCase()}'`),
                    isActive: 1,
                    deleteFlag: 0,
                },
                relations: ['usergroup'],
            });
            if (user) {
                if (yield User_1.User.comparePassword(user, loginParam.password)) {
                    // create a token
                    const token = jsonwebtoken_1.default.sign({ id: user.userId, role: 'admin' }, env_1.env.jwtSecret, {
                        expiresIn: env_1.env.jwtExpiryTime.toString(),
                    });
                    if (user.usergroup.isActive === 0) {
                        const errorResponse = {
                            status: 0,
                            message: 'Role is InActive',
                        };
                        return response.status(400).send(errorResponse);
                    }
                    let permission = {};
                    if (user.userGroupId !== 1) {
                        const userDetail = yield this.userService.findOne({ where: { userId: user.userId } });
                        if (userDetail.permission) {
                            permission = JSON.parse(userDetail.permission);
                        }
                        else {
                            const roleDetail = yield this.userGroupService.findOne({ where: { groupId: user.userGroupId } });
                            permission = roleDetail.permission ? JSON.parse(roleDetail.permission) : {};
                        }
                    }
                    if (token) {
                        const newToken = new AccessTokenModel_1.AccessToken();
                        newToken.userId = user.userId;
                        newToken.token = token;
                        newToken.userType = 'admin';
                        yield this.accessTokenService.create(newToken);
                        const Crypto = require('crypto-js');
                        const ciphertextToken = Crypto.AES.encrypt(token, env_1.env.cryptoSecret).toString();
                        const successResponse = {
                            status: 1,
                            message: 'Logged in successfully',
                            data: {
                                token: ciphertextToken,
                                user: (0, class_transformer_1.instanceToPlain)(user),
                                permission,
                            },
                        };
                        return response.status(200).send(successResponse);
                    }
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'Login Information provided is invalid',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Login Information provided is invalid',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    findAll(limit, offset, keyword, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const relation = ['usergroup'];
            const WhereConditions = [{
                    name: 'deleteFlag',
                    value: 0,
                }];
            const user = yield this.userService.list(limit, offset, ['userId', 'username', 'firstName', 'lastName', 'email', 'address', 'phoneNumber', 'avatar', 'avatarPath', 'password', 'createdDate', 'modifiedDate'], relation, WhereConditions, keyword, count);
            const successResponse = {
                status: 1,
                data: user,
                message: 'Successfully got all user list',
            };
            return response.status(200).send(successResponse);
        });
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
    createUser(createParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userGroupExistWhereCondition = [
                {
                    name: 'id',
                    value: createParam.userGroupId,
                },
            ];
            const userGroupExistRecord = yield this.userGroupService.list(0, 0, [], userGroupExistWhereCondition, 0);
            if (userGroupExistRecord.length === 0) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid user Group Id',
                };
                return response.status(400).send(errorResponse);
            }
            const user = yield this.userService.findOne({
                where: {
                    username: createParam.username,
                    deleteFlag: 0,
                },
            });
            if (user) {
                const errorResponse = {
                    status: 0,
                    message: 'This user already exists',
                };
                return response.status(400).send(errorResponse);
            }
            const newUserPassword = yield User_1.User.hashPassword(createParam.password);
            const newUserParams = new User_1.User();
            newUserParams.username = createParam.username;
            newUserParams.password = newUserPassword;
            newUserParams.firstName = createParam.firstName;
            newUserParams.lastName = createParam.lastName;
            newUserParams.email = createParam.email;
            newUserParams.deleteFlag = 0;
            newUserParams.userGroupId = createParam.userGroupId;
            newUserParams.isActive = 1;
            const userSaveResponse = yield this.userService.create(newUserParams);
            // sending login Credential email to new user
            if (userSaveResponse) {
                const logo = yield this.settingService.findOne();
                const emailContent = yield this.emailTemplateService.findOne(7);
                const message = emailContent.content.replace('{name}', createParam.firstName + ' ' + createParam.lastName ? createParam.lastName : '').replace('{username}', createParam.email).replace('{password}', createParam.password).replace('{storeName}', logo.siteName).replace('{storeName}', logo.siteName);
                const redirectUrl = env_1.env.adminRedirectUrl;
                const mailContents = {};
                mailContents.logo = logo;
                mailContents.emailContent = message;
                mailContents.redirectUrl = redirectUrl;
                mailContents.productDetailData = '';
                mail_services_1.MAILService.sendMail(mailContents, createParam.email, emailContent.subject, false, false, '');
                const successResponse = {
                    status: 1,
                    message: 'User created successfully',
                    data: userSaveResponse,
                };
                return response.status(200).send(successResponse);
            }
        });
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
    updateUser(id, createParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (request.user.userId === id) {
                const errorResponse = {
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
            const userGroupExistRecord = yield this.userGroupService.list(0, 0, [], userGroupExistWhereCondition, 0);
            if (userGroupExistRecord.length === 0) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid user group id',
                };
                return response.status(400).send(errorResponse);
            }
            const user = yield this.userService.findOne({
                where: {
                    username: createParam.username,
                    deleteFlag: 0,
                    userId: (0, typeorm_1.Not)(id),
                },
            });
            if (user) {
                const errorResponse = {
                    status: 0,
                    message: 'This user already exists',
                };
                return response.status(400).send(errorResponse);
            }
            const newUserPassword = yield User_1.User.hashPassword(createParam.password);
            const newUserParams = new User_1.User();
            newUserParams.username = createParam.username;
            if (createParam.password) {
                const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/;
                if (!createParam.password.match(pattern)) {
                    const passwordValidatingMessage = [];
                    passwordValidatingMessage.push('Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters');
                    const errResponse = {
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
            const userSaveResponse = yield this.userService.update(id, newUserParams);
            if (userSaveResponse) {
                const successResponse = {
                    status: 1,
                    message: 'User updated successfully',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the user',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    remove(id, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (request.user.userId === id) {
                const errorResponse = {
                    status: 0,
                    message: 'You cannot delete this user as this user is logged in at the moment',
                };
                return response.status(400).send(errorResponse);
            }
            const user = yield this.userService.findOne({
                where: {
                    userId: id,
                },
            });
            if (!user) {
                const errResponse = {
                    status: 1,
                    message: 'Invalid user id',
                };
                return response.status(400).send(errResponse);
            }
            user.deleteFlag = 1;
            const deleteUser = yield this.userService.create(user);
            if (deleteUser) {
                const successResponse = {
                    status: 1,
                    message: 'User deleted successfully',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the user',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    forgotPassword(forgotPassword, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne({
                where: {
                    email: forgotPassword.email,
                },
            });
            if (!user) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid email Id',
                };
                return response.status(400).send(errorResponse);
            }
            const tempPassword = Math.random().toString().substr(2, 5);
            const password = yield User_1.User.hashPassword(tempPassword);
            user.password = password;
            yield this.userService.create(user);
            const emailContent = yield this.emailTemplateService.findOne(2);
            const logo = yield this.settingService.findOne();
            const message = emailContent.content.replace('{name}', user.firstName).replace('{xxxxxx}', tempPassword);
            const redirectUrl = env_1.env.adminRedirectUrl;
            const mailContents = {};
            mailContents.logo = logo;
            mailContents.emailContent = message;
            mailContents.redirectUrl = redirectUrl;
            mailContents.productDetailData = '';
            const sendMailRes = mail_services_1.MAILService.sendMail(mailContents, user.email, emailContent.subject, false, false, '');
            if (sendMailRes) {
                const successResponse = {
                    status: 1,
                    message: 'Your password has been sent to your email inbox',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Error in sending email',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    changePassword(changePasswordParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne({
                where: {
                    userId: request.user.userId,
                },
            });
            if (!user) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid user Id',
                };
                return response.status(400).send(errResponse);
            }
            if (yield User_1.User.comparePassword(user, changePasswordParam.oldPassword)) {
                const val = yield User_1.User.comparePassword(user, changePasswordParam.newPassword);
                if (val) {
                    const errResponse = {
                        status: 0,
                        message: 'Existing password and new password should not match',
                    };
                    return response.status(400).send(errResponse);
                }
                const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/;
                if (!changePasswordParam.newPassword.match(pattern)) {
                    const passwordValidatingMessage = [];
                    passwordValidatingMessage.push('Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters');
                    const errResponse = {
                        status: 0,
                        message: "You have an error in your request's body. Check 'errors' field for more details",
                        data: { message: passwordValidatingMessage },
                    };
                    return response.status(422).send(errResponse);
                }
                user.password = yield User_1.User.hashPassword(changePasswordParam.newPassword);
                const updateUser = yield this.userService.update(user.userId, user);
                if (updateUser) {
                    const successResponse = {
                        status: 1,
                        message: 'Your password changed successfully',
                    };
                    return response.status(200).send(successResponse);
                }
            }
            const errorResponse = {
                status: 0,
                message: 'Your old password is wrong',
            };
            return response.status(400).send(errorResponse);
        });
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
    editProfile(editProfileParam, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne({
                where: {
                    userId: request.user.userId,
                },
            });
            if (!user) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid User Id',
                };
                return response.status(400).send(errorResponse);
            }
            const avatar = editProfileParam.avatar;
            if (avatar) {
                const type = avatar.split(';')[0].split('/')[1];
                const availableTypes = env_1.env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse = {
                        status: 0,
                        message: 'Only ' + env_1.env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const name = 'Img_' + Date.now() + '.' + type;
                const path = 'user/';
                const base64Data = Buffer.from(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((path + name), base64Data, type);
                }
                else {
                    yield this.imageService.imageUpload((path + name), base64Data);
                }
                user.avatar = name;
                user.avatarPath = path;
            }
            user.username = editProfileParam.username;
            user.email = editProfileParam.email;
            user.phoneNumber = editProfileParam.phoneNumber;
            user.address = editProfileParam.address;
            const userSave = yield this.userService.create(user);
            userSave.usergroup = yield this.userGroupService.findOne({ where: { groupId: userSave.userGroupId } });
            if (userSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated the profile',
                    data: userSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to edit the profile',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    logout(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = request.headers.authorization.split(' ')[0] === 'Bearer' ? request.headers.authorization.split(' ')[1] : '';
            if (!token) {
                const successResponseBeforeToken = {
                    status: 1,
                    message: 'Successfully logout',
                };
                return response.status(200).send(successResponseBeforeToken);
            }
            const Crypto = require('crypto-js');
            const bytes = Crypto.AES.decrypt(token, env_1.env.cryptoSecret);
            const originalEncryptedString = bytes.toString(Crypto.enc.Utf8);
            const user = yield this.accessTokenService.findOne({
                where: {
                    token: originalEncryptedString,
                },
            });
            if (!user) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid token',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteToken = yield this.accessTokenService.delete(user);
            if (!deleteToken) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully logout',
                };
                return response.status(200).send(successResponse);
            }
        });
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
    forgetPasswordLink(emailId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = yield this.userService.findOne({
                where: { email: emailId, deleteFlag: 0 },
            });
            if (!customer) {
                const errResponse = {
                    status: 1,
                    message: 'If the user is registered, a link to reset the password will be sent to the user’s email address',
                };
                return response.status(200).send(errResponse);
            }
            const Crypto = require('crypto-js');
            const val = Crypto.AES.encrypt(customer.email, env_1.env.cryptoSecret).toString();
            const encryptedKey = Buffer.from(val).toString('base64');
            console.log(encryptedKey + 'enc');
            customer.forgetPasswordKey = encryptedKey;
            customer.linkExpires = (0, moment_1.default)().add(20, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            yield this.userService.update(customer.userId, customer);
            const emailContent = yield this.emailTemplateService.findOne(23);
            const logo = yield this.settingService.findOne();
            const redirectUrl = env_1.env.adminForgetPasswordLink + '?token=' + encryptedKey;
            console.log(redirectUrl + 'redirectUrl');
            const message = emailContent.content.replace('{name}', customer.firstName).replace('{link}', redirectUrl);
            const mailContents = {};
            mailContents.logo = logo;
            mailContents.emailContent = message;
            mailContents.redirectUrl = env_1.env.adminRedirectUrl;
            mailContents.productDetailData = '';
            const sendMailRes = mail_services_1.MAILService.sendMail(mailContents, customer.email, emailContent.subject, false, false, '');
            if (sendMailRes) {
                const successResponse = {
                    status: 1,
                    message: 'If the user is registered a , to reset the password will be sent to the user’s email address',
                };
                return response.status(200).send(successResponse);
            }
        });
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
    keyCheck(encryptedKey, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(encryptedKey + 'enkKey');
            const Crypto = require('crypto-js');
            const bytes = Crypto.AES.decrypt(Buffer.from(encryptedKey, 'base64').toString('ascii'), env_1.env.cryptoSecret);
            const decodedTokenKey = bytes.toString(Crypto.enc.Utf8);
            console.log(decodedTokenKey + 'key');
            const customer = yield this.userService.findOne({
                where: { email: decodedTokenKey, deleteFlag: 0 },
            });
            if (!customer) {
                const errResponse = {
                    status: 3,
                    message: 'Invalid key. please try again',
                };
                return response.status(200).send(errResponse);
            }
            if ((0, moment_1.default)(customer.linkExpires).format('YYYY-MM-DD HH:mm:ss') < (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')) {
                const expirationError = {
                    status: 2,
                    message: 'Your forgot password link got expired, try again',
                };
                return response.status(200).send(expirationError);
            }
            if (customer.forgetPasswordKey !== '') {
                const successResponse = {
                    status: 1,
                    message: 'Valid key',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const successResponse = {
                    status: 3,
                    message: 'This link has been used already. please try a different one',
                };
                return response.status(200).send(successResponse);
            }
        });
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
    resetPassword(newPassword, key, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tokenKey = key;
            if (!tokenKey) {
                const keyError = {
                    status: 0,
                    message: 'Key is missing',
                };
                return response.status(400).send(keyError);
            }
            const Crypto = require('crypto-js');
            console.log(tokenKey + 'tokenKey');
            const bytes = Crypto.AES.decrypt(Buffer.from(tokenKey, 'base64').toString('ascii'), env_1.env.cryptoSecret);
            const decodedTokenKey = bytes.toString(Crypto.enc.Utf8);
            console.log(decodedTokenKey + 'key');
            const resultData = yield this.userService.findOne({
                select: ['userId', 'firstName', 'email', 'phoneNumber', 'password', 'avatar', 'avatarPath', 'isActive', 'forgetPasswordKey'],
                where: { email: decodedTokenKey, deleteFlag: 0 },
            });
            const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])(?=.*?[#?!@$%^&*-])).{8,128}$/;
            if (!newPassword.match(pattern)) {
                const passwordValidatingMessage = [];
                passwordValidatingMessage.push('Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters');
                const errResponse = {
                    status: 0,
                    message: "You have an error in your request's body. Check 'errors' field for more details",
                    data: { message: passwordValidatingMessage },
                };
                return response.status(422).send(errResponse);
            }
            const partsOfThreeLetters = resultData.email.match(/.{3}/g).concat(resultData.email.substr(1).match(/.{3}/g), resultData.email.substr(2).match(/.{3}/g));
            const matchEmail = new RegExp(partsOfThreeLetters.join('|'), 'i').test(newPassword);
            if (matchEmail === true) {
                const validationMessage = [];
                validationMessage.push('Password must not contain any part of the email address');
                const passwordDuplicateErrorResponse = {
                    status: 0,
                    message: "You have an error in your request's body. Check 'errors' field for more details",
                    data: { message: validationMessage },
                };
                return response.status(422).send(passwordDuplicateErrorResponse);
            }
            resultData.password = yield User_1.User.hashPassword(newPassword);
            resultData.forgetPasswordKey = '';
            const updateUserData = yield this.userService.update(resultData.userId, resultData);
            if (updateUserData) {
                const successResponse = {
                    status: 1,
                    message: 'Your password has been changed successfully',
                    data: resultData.email,
                };
                return response.status(200).send(successResponse);
            }
        });
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
    getProfile(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resultData = yield this.userService.findOne({ select: ['username', 'userId', 'email', 'address', 'avatar', 'avatarPath', 'createdDate', 'modifiedDate', 'deleteFlag', 'firstName', 'lastName', 'phoneNumber', 'isActive', 'code'], where: { userId: request.user.userId } });
            const successResponse = {
                status: 1,
                message: 'Successfully got the profile',
                data: resultData,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/login'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UserLoginRequest_1.UserLogin, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/userlist'),
    (0, routing_controllers_1.Authorized)(['admin', 'list-user']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/create-user'),
    (0, routing_controllers_1.Authorized)(['admin', 'create-user']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateUserRequest_1.CreateUser, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-user/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-user']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, UpdateUserRequest_1.UpdateUserRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete-user/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-user']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/forgot-password'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ForgotPasswordRequest_1.ForgotPassword, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "forgotPassword", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/change-password'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ChangePasswordRequest_1.ChangePassword, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/edit-profile'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [EditProfileRequest_1.EditProfileRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "editProfile", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/logout'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/forgot-password-link'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('email')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "forgetPasswordLink", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/forgot-password-key-check'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('key')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "keyCheck", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/reset-password'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('newPassword')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('key')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/get-profile'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
UserController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/auth'),
    tslib_1.__metadata("design:paramtypes", [UserService_1.UserService,
        UserGroupService_1.UserGroupService,
        AccessTokenService_1.AccessTokenService,
        EmailTemplateService_1.EmailTemplateService, S3Service_1.S3Service, SettingService_1.SettingService,
        ImageService_1.ImageService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map