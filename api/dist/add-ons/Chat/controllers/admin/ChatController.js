"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const UserService_1 = require("../../../../src/api/core/services/UserService");
const VendorService_1 = require("../../../../src/api/core/services/VendorService");
const ChatServer_1 = require("../../ChatServer");
const ChatService_1 = require("../../services/ChatService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const SettingService_1 = require("../../../../src/api/core/services/SettingService");
const typedi_1 = require("typedi");
// start chat server...!
(0, ChatServer_1.socketIO)();
// -- Api's Starts Here
let ChatController = class ChatController {
    constructor(userService, vendorService, chatService, settingsService) {
        this.userService = userService;
        this.vendorService = vendorService;
        this.chatService = chatService;
        this.settingsService = settingsService;
        // --
    }
    // User-Details API
    /**
     * @api {get} /api/chat-admin/ User-Details API
     * @apiGroup Chat Admin
     * @apiHeader {string} Authorized
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully Got User Details",
     *    "status" : "1",
     *    "data": {
     *    "userId": 1,
     *    "userName": "",
     *    "firstName": "",
     *    "avatar": "",
     *    "avatarPath": ""
     * }
     * }
     * @apiSampleRequest /api/chat-admin/
     * @apiErrorExample {json} Send UserDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    sendUserDetail(res, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne({
                select: ['userId', 'username', 'firstName', 'avatar', 'avatarPath'],
                where: {
                    userId: req.user.userId,
                },
            });
            return res.status(user ? 200 : 400).send({
                status: user ? 1 : 0,
                message: user ? 'Successfully Got User Details' : 'Unable to Get User Detail',
                data: user ? user : [],
            });
        });
    }
    // Vendor list API
    /**
     * @api {get} /api/chat-admin/vendor-list Vendor list API
     * @apiGroup Chat Admin
     * @apiHeader {string} Authorized
     * @apiParam  (requestBody) {string} keyword keyword
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *     "status": 1,
     *     "message": "Successfully Got Vendor Details",
     *     "data": {
     *           "vendorId" : 1,
     *           "userName": "",
     *           "firstName": "",
     *           "companyName": "",
     *           "lastMessageDate": "",
     *           "messageCount": "",
     *           "image": "",
     *           "imagePath": "",
     *           "vendorPrefixId": "",
     *              }
     * }
     * @apiSampleRequest /api/chat-admin/vendor-list
     * @apiErrorExample {json} Vendor List error
     * HTTP/1.1 500 Internal Server Error
     */
    sendVendorDetailList(res, keyword, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorData = [];
            const select = ['vendor.vendorId', 'vendor.customerId', 'vendor.companyName', 'vendor.vendorPrefixId', 'vendor.createdDate', 'vendor.modifiedDate'];
            const whereConditions = [
                {
                    name: 'vendor.isDelete',
                    op: 'where',
                    value: 0,
                },
            ];
            const searchConditions = [];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                searchConditions.push({
                    name: ['vendor.companyAddress1', 'vendor.companyAddress2', 'vendor.companyCity', 'vendor.companyName', 'vendorGroup.name', 'customer.firstName', 'customer.username'],
                    value: keyword,
                });
            }
            const relations = [
                {
                    tableName: 'vendor.customer',
                    aliasName: 'customer',
                },
                {
                    tableName: 'vendor.vendorGroup',
                    aliasName: 'vendorGroup',
                }
            ];
            const vendorList = yield this.vendorService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, [], [], false, false);
            yield Promise.all(vendorList.map((vendor) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const unreadMessageCount = yield this.chatService.find({
                    where: {
                        isRead: 0,
                        senderId: vendor.vendorId,
                    },
                });
                const lastMessageDate = yield this.chatService.getLastMessageDate(req.user.userId, vendor.vendorId);
                vendorData.push(Object.assign(Object.assign({}, vendor), { lastMessageDate: (_a = lastMessageDate === null || lastMessageDate === void 0 ? void 0 : lastMessageDate.maxDate) !== null && _a !== void 0 ? _a : '', messageCount: (_b = unreadMessageCount === null || unreadMessageCount === void 0 ? void 0 : unreadMessageCount.length) !== null && _b !== void 0 ? _b : 0 }));
            })));
            const vendorDataSorted = vendorData.sort((vendorA, vendorB) => vendorB.lastMessageDate - vendorA.lastMessageDate);
            return res.status(200).send({
                status: 1,
                message: 'Successfully Got Vendor Details',
                data: vendorDataSorted.map((vendor) => {
                    var _a, _b, _c, _d, _e, _f;
                    return ({
                        vendorId: vendor.vendorId,
                        userName: (_a = vendor === null || vendor === void 0 ? void 0 : vendor.customer) === null || _a === void 0 ? void 0 : _a.username,
                        firstName: (_b = vendor === null || vendor === void 0 ? void 0 : vendor.customer) === null || _b === void 0 ? void 0 : _b.firstName,
                        companyName: vendor.companyName,
                        lastMessageDate: vendor.lastMessageDate,
                        messageCount: vendor.messageCount,
                        image: (_c = vendor === null || vendor === void 0 ? void 0 : vendor.customer) === null || _c === void 0 ? void 0 : _c.avatar,
                        imagePath: (_d = vendor === null || vendor === void 0 ? void 0 : vendor.customer) === null || _d === void 0 ? void 0 : _d.avatarPath,
                        vendorPrefixId: vendor.vendorPrefixId,
                        createdDate: (_e = vendor === null || vendor === void 0 ? void 0 : vendor.customer) === null || _e === void 0 ? void 0 : _e.createdDate,
                        modifiedDate: (_f = vendor === null || vendor === void 0 ? void 0 : vendor.customer) === null || _f === void 0 ? void 0 : _f.modifiedDate,
                    });
                }),
            });
        });
    }
    // Vendor Details API
    /**
     * @api {get} /api/chat-admin/vendor/:vendorId Vendor Details API
     * @apiGroup Chat Admin
     * @apiHeader {string} Authorized
     * @apiParam {json} Input
     * {
     * "vendorId": 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *     "status": "1",
     *     "message": "Successfully Got Vendor Details",
     *     "data": {
     *     "createdBy": 1,
     *     "createdDate": "",
     *     "modifiedBy": 1,
     *     "modifiedDate": "",
     *     "vendorId": 1,
     *     "vendorPrefixId": "",
     *     "customerId": 1,
     *     "vendorGroupId": 1,
     *     "commission": "",
     *     "industryId": 1,
     *     "contactPersonName": "",
     *     "vendorSlugName": "",
     *     "designation": "",
     *     "companyName": "",
     *     "companyLocation": "",
     *     "companyAddress1": "",
     *     "companyAddress2": "",
     *     "companyCity": "",
     *     "companyState": "",
     *     "zoneId": 1,
     *     "companyCountryId": 1,
     *     "pincode": "",
     *     "companyDescription": "",
     *     "companyMobileNumber": "",
     *     "companyEmailId": "",
     *     "companyWebsite": "",
     *     "companyTaxNumber": "",
     *     "companyPanNumber": ,""
     *     "companyLogo": "",
     *     "companyLogoPath": "",
     *     "paymentInformation": "",
     *     "verification": {
     *       "email": "",
     *       "policy": "",
     *       "category": "",
     *       "decision": "",
     *       "document": "",
     *       "storeFront": "",
     *       "bankAccount": "",
     *       "paymentInfo": "",
     *       "companyDetail": "",
     *       "deliveryMethod": "",
     *       "subscriptionPlan": "",
     *       "distributionPoint": "",
     *   },
     *   "verificationComment": [],
     *   "verificationDetailComment": [],
     *   "bankAccount": {
     *       "bic": "",
     *       "ifsc": "",
     *       "branch": "",
     *       "bankName": "",
     *       "accountNumber": "",
     *       "accountCreatedOn": ""
     *   },
     *   "approvalFlag": "",
     *   "approvedBy": "",
     *   "approvalDate": "",
     *   "companyCoverImage": "",
     *   "companyCoverImagePath": "",
     *   "displayNameUrl": "",
     *   "instagram": "",
     *   "twitter": "",
     *   "youtube": "",
     *   "facebook": "",
     *   "whatsapp": "",
     *   "bankName": "",
     *   "bankAccountNumber": "",
     *   "accountHolderName": "",
     *   "ifscCode": "",
     *   "businessSegment": "",
     *   "businessType": "",
     *   "mailOtp": "",
     *   "loginOtpExpireTime": "",
     *   "businessNumber": "",
     *   "preferredShippingMethod": "",
     *   "capabilities": [
     *       {
     *           "data": "",
     *           "status": "",
     *           "modelStatus": ""
     *       },
     *       {
     *           "data": "",
     *           "status": "",
     *           "modelStatus": ""
     *       }
     *   ],
     *   "vendorDescription": "",
     *   "isEmailVerify": "",
     *   "customer": {
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
     *       "customerGroupId": ,
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
     *       "mailOtpExpireTime": "",
     *   },
     *   "vendorGroup": {
     *       "createdBy": 1,
     *       "createdDate": "",
     *       "modifiedBy": 1,
     *       "modifiedDate": "",
     *       "groupId": "1",
     *       "name": "",
     *       "description": "",
     *       "commission": "",
     *       "isActive":"1"
     *   },
     *   "vendorProducts": "",
     *   "storeUrl": ""
     *  }
     * }
     * @apiSampleRequest /api/chat-admin/vendor/:vendorId
     * @apiErrorExample {json} Vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    sendVendorDetail(vendorId, res, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorService.findOne({
                where: {
                    vendorId,
                },
                relations: ['customer', 'vendorGroup', 'vendorProducts'],
                loadRelationIds: {
                    relations: ['vendorProducts'],
                },
            });
            if (!vendor) {
                return res.status(400).send({
                    status: 1,
                    message: 'Invalid VendorId..!',
                });
            }
            const setting = yield this.settingsService.findOne({ where: {} });
            vendor.vendorProducts = vendor.vendorProducts.length;
            vendor.storeUrl = setting.siteUrl + '/shop/' + vendor.displayNameUrl;
            return res.status(200).send({
                status: 1,
                message: 'Successfully Got Vendor Details',
                data: vendor,
            });
        });
    }
    // Chat History API
    /**
     * @api {get} /api/chat-admin/chat-history
     * @apiGroup Chat Admin
     * @apiHeader {String} Authorization
     * @apiParam (requestBody) {Number} vendorId vendorId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 Ok
     * {
     *     "status": "1",
     *     "message": "Successfully Got Chat History..!",
     *     "data": {
     *       "id": "1",
     *       "senderId": "1",
     *       "receiverId": "1",
     *       "message": {},
     *       "messageId": "1",
     *       "isRead": "",
     *       "createdDate": ""
     *   }
     * }
     * @apiSampleRequest /api/chat-admin/chat-history
     * @apiErrorExample {json} Chat History error
     * HTTP/1.1 500 Internal Server Error
     */
    getChatHistory(vendorId, res, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const chatHistory = [];
            if (!(yield this.vendorService.findOne({ where: { vendorId } }))) {
                return res.status(400).send({
                    status: 0,
                    message: `Invalid VendorId..!`,
                });
            }
            yield this.chatService.find({
                where: [
                    {
                        senderId: vendorId,
                        receiverId: req.user.userId,
                    },
                    {
                        receiverId: vendorId,
                        senderId: req.user.userId,
                    },
                ],
            }).then((chatLog) => {
                chatLog.map((chat) => {
                    chatHistory.push(chat);
                });
            });
            return res.status(200).send({
                status: 1,
                message: `Successfully Got Chat History..!`,
                data: chatHistory,
            });
        });
    }
    // Chat seen Status Updated API
    /**
     * @api {put} /api/chat-admin/chat-seen Status Updated API
     * @apiGroup Chat Admin
     * @apiHeader {String} Authorization
     * @apiParam (requestBody) {Number} vendorId vendorId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 Ok
     * {
     *     "status": "1",
     *     "message": "Successfully Chat seen Status Updated."
     * }
     * @apiSampleRequest /api/chat-admin/chat-seen
     * @apiErrorExample {json} Chat seen error
     * HTTP/1.1 500 Internal Server Error
     */
    updateChatSeen(vendorId, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorService.findOne({
                where: {
                    vendorId,
                },
            });
            if (!vendor) {
                return res.status(400).send({
                    status: 1,
                    message: 'Invalid VendorId..!',
                });
            }
            yield this.chatService.update({
                isRead: 1,
            }, {
                senderId: vendor.vendorId,
            });
            return res.status(200).send({
                status: 1,
                message: 'Chat seen Status Updated..!',
            });
        });
    }
    // Chat Delete API
    /**
     * @api {put} /api/chat-admin/delete Delete API
     * @apiGroup Chat Admin
     * @apiHeader {string} Authorized
     * @apiParam (requestBody) {number} fromId fromId
     * @apiParam (requestBody) {number} toId toId
     * @apiParam (requestBody) {number} id id
     * @apiParam (requestBody) {number} messageId messageId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status" : "1"
     *    "message": "Message Deleted Successfully..!"
     * }
     * @apiSampleRequest /api/chat-admin/delete
     * @apiErrorExample {json} Chat Delete error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteChat(chatBody, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const condition = {};
            if (chatBody.id) {
                condition.id = chatBody.id;
            }
            else {
                condition.senderId = (_a = chatBody.fromId) !== null && _a !== void 0 ? _a : 0;
                condition.receiverId = (_b = chatBody.toId) !== null && _b !== void 0 ? _b : 0;
                condition.messageId = chatBody.messageId;
            }
            const deleteResult = yield this.chatService.delete(condition);
            return res.status(200).send({
                status: 1,
                message: `Message Deleted Successfully..!`,
                data: deleteResult,
            });
        });
    }
};
exports.ChatController = ChatController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatController.prototype, "sendUserDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-list'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatController.prototype, "sendVendorDetailList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor/:vendorId'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('vendorId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatController.prototype, "sendVendorDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/chat-history'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('vendorId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatController.prototype, "getChatHistory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/chat-seen'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('vendorId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatController.prototype, "updateChatSeen", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/delete'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatController.prototype, "deleteChat", null);
exports.ChatController = ChatController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/chat-admin'),
    tslib_1.__metadata("design:paramtypes", [UserService_1.UserService,
        VendorService_1.VendorService,
        ChatService_1.ChatService,
        SettingService_1.SettingService])
], ChatController);
//# sourceMappingURL=ChatController.js.map