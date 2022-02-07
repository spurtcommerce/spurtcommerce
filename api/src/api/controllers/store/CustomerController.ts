/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {Post, Body, JsonController, Res, Authorized, Req, Get, QueryParam} from 'routing-controllers';
import {classToPlain} from 'class-transformer';
import jwt from 'jsonwebtoken';
import {MAILService} from '../../../auth/mail.services';
import {CustomerRegisterRequest} from './requests/CustomerRegisterRequest';
import {CustomerLogin} from './requests/CustomerLoginRequest';
import {ChangePassword} from './requests/changePasswordRequest';
import {Customer} from '../../models/Customer';
import {CustomerService} from '../../services/CustomerService';
import {LoginLogService} from '../../services/LoginLogService';
import {CustomerEditProfileRequest} from './requests/CustomerEditProfileRequest';
import {env} from '../../../env';
import {LoginLog} from '../../models/LoginLog';
import {EmailTemplateService} from '../../services/EmailTemplateService';
import {ImageService} from '../../services/ImageService';
import {S3Service} from '../../services/S3Service';

@JsonController('/customer')
export class CustomerController {
    constructor(private customerService: CustomerService, private s3Service: S3Service,
                private imageService: ImageService, private loginLogService: LoginLogService, private emailTemplateService: EmailTemplateService ) {
    }

    // Customer Register API
    /**
     * @api {post} /api/customer/register register API
     * @apiGroup Store
     * @apiParam (Request body) {String} name Name
     * @apiParam (Request body) {String} password User Password
     * @apiParam (Request body) {String} confirmPassword Confirm Password
     * @apiParam (Request body) {String} emailId User Email Id
     * @apiParam (Request body) {Number} phoneNumber User Phone Number (Optional)
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "password" : "",
     *      "confirmPassword" : "",
     *      "emailId" : "",
     *      "phoneNumber" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you for registering with us and please check your email",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/register
     * @apiErrorExample {json} Register error
     * HTTP/1.1 500 Internal Server Error
     */
    // Customer Register Function
    @Post('/register')
    public async register(@Body({validate: true})registerParam: CustomerRegisterRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const newUser = new Customer();
        newUser.firstName = registerParam.name;
        newUser.password = await Customer.hashPassword(registerParam.password);
        newUser.email = registerParam.emailId;
        newUser.username = registerParam.emailId;
        newUser.mobileNumber = registerParam.phoneNumber;
        newUser.isActive = 1;
        newUser.ip = (request.headers['x-forwarded-for'] ||
            request.connection.remoteAddress ||
            request.socket.remoteAddress ||
            request.connection.socket.remoteAddress).split(',')[0];
        const resultUser = await this.customerService.findOne({where: {email: registerParam.emailId, deleteFlag: 0}});
        if (resultUser) {
            const successResponse: any = {
                status: 1,
                message: 'You already registered please login.',
            };
            return response.status(400).send(successResponse);
        }
        if (registerParam.password === registerParam.confirmPassword) {
            const resultData = await this.customerService.create(newUser);
            const emailContent = await this.emailTemplateService.findOne(1);
            const message = emailContent.content.replace('{name}', resultData.firstName);
            const sendMailRes = MAILService.registerMail(message, resultData.email, emailContent.subject);
            if (sendMailRes) {
                const successResponse: any = {
                    status: 1,
                    message: 'Thank you for registering with us. Kindly check your email inbox for further details. ',
                    data: classToPlain(resultData),
                };
                return response.status(200).send(successResponse);
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Registration successful, but unable to send email. ',
                };
                return response.status(400).send(errorResponse);
            }
        }
        const errorPasswordResponse: any = {
            status: 0,
            message: 'A mismatch between password and confirm password. ',
        };
        return response.status(400).send(errorPasswordResponse);
    }

    // Forgot Password API
    /**
     * @api {post} /api/customer/forgot-password Forgot Password API
     * @apiGroup Store
     * @apiParam (Request body) {String} emailId User Email Id
     * @apiParamExample {json} Input
     * {
     *      "emailId" : ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you,Your password send to your mail id please check your email.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/forgot-password
     * @apiErrorExample {json} Forgot Password error
     * HTTP/1.1 500 Internal Server Error
     */
    // Forgot Password Function
    @Post('/forgot-password')
    public async forgotPassword(@Body({validate: true}) forgotparam: any, @Res() response: any): Promise<any> {
        const resultData = await this.customerService.findOne({where: {email: forgotparam.emailId, deleteFlag: 0}});
        if (!resultData) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Email Id',
            };
            return response.status(400).send(errorResponse);
        }
        const tempPassword: any = Math.random().toString().substr(2, 5);
        resultData.password = await Customer.hashPassword(tempPassword);
        const updateUserData = await this.customerService.update(resultData.id, resultData);
        const emailContent = await this.emailTemplateService.findOne(2);
        const message = emailContent.content.replace('{name}', updateUserData.username).replace('{xxxxxx}', tempPassword);
        emailContent.content = message;
        const sendMailRes = MAILService.passwordForgotMail(message, updateUserData.email, emailContent.subject);
        if (sendMailRes) {
            const successResponse: any = {
                status: 1,
                message: 'Your password has been sent to your email inbox.',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Error in sending email, Invalid email.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Login API
    /**
     * @api {post} /api/customer/login login API
     * @apiGroup Store
     * @apiParam (Request body) {String} emailId User Email Id
     * @apiParam (Request body) {String} password User Password
     * @apiParamExample {json} Input
     * {
     *      "emailId" : "",
     *      "password" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "data": "{
     *         "token":''
     *      }",
     *      "message": "Successfully login",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/login
     * @apiErrorExample {json} Login error
     * HTTP/1.1 500 Internal Server Error
     */
    // Login Function
    @Post('/login')
    public async login(@Body({validate: true}) loginParam: CustomerLogin, @Req() request: any, @Res() response: any): Promise<any> {
       const resultData = await this.customerService.findOne({
                select: ['id', 'firstName', 'email', 'mobileNumber', 'password', 'avatar', 'avatarPath', 'isActive'],
                where: {email: loginParam.emailId, deleteFlag: 0},
            });
            if (!resultData) {
                const errorUserNameResponse: any = {
                    status: 0,
                    message: 'Invalid EmailId',
                };
                return response.status(400).send(errorUserNameResponse);
            }
            if (resultData.isActive === 0) {
                const errorUserInActiveResponse: any = {
                    status: 0,
                    message: 'InActive Customer.',
                };
                return response.status(400).send(errorUserInActiveResponse);
            }
            if (await Customer.comparePassword(resultData, loginParam.password)) {
                // create a token
                const token = jwt.sign({id: resultData.id}, '123##$$)(***&');

                const loginLog = new LoginLog();
                loginLog.customerId = resultData.id;
                loginLog.emailId = resultData.email;
                loginLog.firstName = resultData.firstName;
                loginLog.ipAddress = (request.headers['x-forwarded-for'] ||
                    request.connection.remoteAddress ||
                    request.socket.remoteAddress ||
                    request.connection.socket.remoteAddress).split(',')[0];
                const savedloginLog = await this.loginLogService.create(loginLog);
                const customer = await this.customerService.findOne({where: {email: loginParam.emailId, deleteFlag: 0}});
                customer.lastLogin = savedloginLog.createdDate;
                await this.customerService.create(customer);
                   const successResponse: any = {
                        status: 1,
                        message: 'Loggedin successfully',
                        data: {
                            token,
                            user: classToPlain(resultData),
                        },
                    };
                    return response.status(200).send(successResponse);
            }
            const errorResponse: any = {
                status: 0,
                message: 'Invalid password',
            };
            return response.status(400).send(errorResponse);
    }
    // Change Password API
    /**
     * @api {post} /api/customer/change-password Change Password API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} oldPassword Old Password
     * @apiParam (Request body) {String} newPassword New Password
     * @apiParamExample {json} Input
     *      "oldPassword" : "",
     *      "newPassword" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Your password changed successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/change-password
     * @apiErrorExample {json} Change Password error
     * HTTP/1.1 500 Internal Server Error
     */
    // Change Password Function
    @Post('/change-password')
    @Authorized('customer')
    public async changePassword(@Body({validate: true}) changePasswordParam: ChangePassword, @Req() request: any, @Res() response: any): Promise<any> {

        const resultData = await this.customerService.findOne({where: {id: request.user.id}});
        if (await Customer.comparePassword(resultData, changePasswordParam.oldPassword)) {
            const val = await Customer.comparePassword(resultData, changePasswordParam.newPassword);
            if (val) {
                const errResponse: any = {
                    status: 0,
                    message: 'you are given a same password, please try different one',
                };
                return response.status(400).send(errResponse);
            }
            resultData.password = await Customer.hashPassword(changePasswordParam.newPassword);
            const updateUserData = await this.customerService.update(resultData.id, resultData);
            if (updateUserData) {
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

    // Get Customer Profile API
    /**
     * @api {get} /api/customer/get-profile Get Profile API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Get the Profile..!",
     *      "status": "1"
     *       "data":{}
     * }
     * @apiSampleRequest /api/customer/get-profile
     * @apiErrorExample {json} Get Profile error
     * HTTP/1.1 500 Internal Server Error
     */
    // Get Profile Function
    @Get('/get-profile')
    @Authorized('customer')
    public async getProfile(@Req() request: any, @Res() response: any): Promise<any> {
        const resultData = await this.customerService.findOne({where: {id: request.user.id}});
        const successResponse: any = {
            status: 1,
            message: 'Successfully Get the Profile.',
            data: resultData,
        };
        return response.status(200).send(successResponse);
    }

    // Customer Edit Profile API
    /**
     * @api {post} /api/customer/edit-profile Edit Profile API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} firstName First Name
     * @apiParam (Request body) {String} lastName Last Name
     * @apiParam (Request body) {String} password password
     * @apiParam (Request body) {String} emailId User Email Id
     * @apiParam (Request body) {Number} phoneNumber User Phone Number (Optional)
     * @apiParam (Request body) {String} image Customer Image
     * @apiParamExample {json} Input
     * {
     *      "firstName" : "",
     *      "lastName" : "",
     *      "password" "",
     *      "emailId" : "",
     *      "phoneNumber" : "",
     *      "image": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated your profile.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/edit-profile
     * @apiErrorExample {json} Register error
     * HTTP/1.1 500 Internal Server Error
     */
    // Customer Profile Edit Function
    @Post('/edit-profile')
    @Authorized('customer')
    public async editProfile(@Body({validate: true}) customerEditProfileRequest: CustomerEditProfileRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const image = customerEditProfileRequest.image;
        let name;

        const resultData = await this.customerService.findOne({
            select: ['id', 'firstName', 'lastName', 'email', 'mobileNumber', 'address', 'zoneId', 'countryId', 'pincode', 'avatar', 'avatarPath', 'password'],
            where: {id: request.user.id},
        });
        if (image) {
            const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const type = image.split(';')[0].split('/')[1];
            name = 'Img_' + Date.now() + '.' + type; // path.extname(file.originalname);
            const path = 'customer/';
            let val: any;
            if (env.imageserver === 's3') {
                val = await this.s3Service.imageUpload((path + name), base64Data, type);
            } else {
                val = await this.imageService.imageUpload((path + name), base64Data);
            }
            console.log(val);
            resultData.avatar = name;
            resultData.avatarPath = path;
        }
        resultData.firstName = customerEditProfileRequest.firstName;
        resultData.lastName = customerEditProfileRequest.lastName;
        resultData.email = customerEditProfileRequest.emailId;
        resultData.mobileNumber = customerEditProfileRequest.phoneNumber;
        resultData.username = customerEditProfileRequest.emailId;
        if (customerEditProfileRequest.password) {
            // if (await Customer.comparePassword(resultData, customerEditProfileRequest.oldPassword)) {
            resultData.password = await Customer.hashPassword(customerEditProfileRequest.password);
            const updateUserData = await this.customerService.update(resultData.id, resultData);
            if (updateUserData) {
                const successResponseResult: any = {
                    status: 1,
                    message: 'Your profile Update Successfully.',
                    data: classToPlain(updateUserData),
                };
                return response.status(200).send(successResponseResult);
            }

        }
        const updateuserData = await this.customerService.update(resultData.id, resultData);
        const successResponse: any = {
            status: 1,
            message: 'Your profile Update Successfully.',
            data: classToPlain(updateuserData),
        };
        return response.status(200).send(successResponse);
    }

    // logList API
    /**
     * @api {get} /api/customer/login-log-list Login Log list API
     * @apiGroup Store
     * @apiParam (Request body) {Number} limit limit
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get login log list",
     *      "data":{
     *      "id"
     *      "customerId"
     *      "emailId"
     *      "firstName"
     *      "ipAddress"
     *      "createdDate"
     *      }
     * }
     * @apiSampleRequest /api/customer/login-log-list
     * @apiErrorExample {json} Front error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/login-log-list')
    public async LogList(@QueryParam('limit') limit: number, @Res() response: any): Promise<any> {
        const loginLogList = await this.loginLogService.logList(limit);
        const promise = loginLogList.map(async (result: any) => {
            const moment = require('moment');
            const createdDate = moment.utc(result.createdDate).local().format('YYYY-MM-DD');
            const temp: any = result;
            temp.createdDate = createdDate;
            return temp;
        });
        const finalResult = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get login Log list',
            data: finalResult,
        };
        return response.status(200).send(successResponse);

    }
}
