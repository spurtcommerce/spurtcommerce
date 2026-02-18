"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorChat = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const CustomerService_1 = require("../../../../src/api/core/services/CustomerService");
const UserService_1 = require("../../../../src/api/core/services/UserService");
const VendorService_1 = require("../../../../src/api/core/services/VendorService");
const ChatService_1 = require("../../services/ChatService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const typedi_1 = require("typedi");
let VendorChat = class VendorChat {
    constructor(userService, vendorService, chatService, customerService) {
        this.userService = userService;
        this.vendorService = vendorService;
        this.chatService = chatService;
        this.customerService = customerService;
        // --
    }
    // vendor-Details API
    /**
     * @api {get} /api/chat-vendor/ vendor-Details API
     * @apiGroup Chat Vendor
     * @apiHeader {string} Authorized
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully Got Vendor Details",
     *    "status" : "1",
     *    "data": {
     *    "vendorId": 1,
     *    "customerId": 1,
     *    "companyName": "",
     *    "firstName": "",
     *    "lastName": "",
     *    "avatar": "",
     *    "avatarPath": ""
     * }
     * }
     * @apiSampleRequest /api/chat-vendor/
     * @apiErrorExample {json} SendVendorDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    sendVendorDetail(res, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorService.findOne({
                select: ['vendorId', 'customerId', 'companyName'],
                where: {
                    vendorId: req.user.vendorId,
                },
            });
            const customer = yield this.customerService.findOne({
                select: ['firstName', 'lastName', 'username', 'avatar', 'avatarPath'],
                where: {
                    id: vendor.customerId,
                },
            });
            const vendorView = Object.assign(Object.assign({}, customer), vendor);
            return res.status(200).send({
                status: 1,
                message: 'Successfully Got Vendor Details',
                data: vendorView,
            });
        });
    }
    // User-list API
    /**
     * @api {get} /api/chat-vendor/admin-list  admin List API
     * @apiGroup Chat Vendor
     * @apiHeader {string} Authorized
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully Got User List",
     *    "status" : "1",
     *    "data": {
     *    "userId": 1,
     *    "userName": "",
     *    "firstName": "",
     *   }
     * }
     * @apiSampleRequest /api/chat-vendor/admin-list
     * @apiErrorExample {json} Chat Vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    sendUserDetail(res, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findAll({
                select: ['userId', 'username', 'firstName'],
            });
            return res.status(200).send({
                status: 1,
                message: 'Successfully Got User List',
                data: user,
            });
        });
    }
    // Chat-list API
    /**
     * @api {get} /api/chat-vendor/chat-history  chat List API
     * @apiGroup Chat Vendor
     * @apiHeader {string} Authorized\
     * @apiParam (requestBody) {number} userId userId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully Got Chat History..!",
     *    "status" : "1",
     *    "data": {
     *    "id": "",
     *    "senderId": 1,
     *    "receiverId": 1,
     *    "message": {},
     *    "messageId": 1,
     *    "isRead": "",
     *    "createdDate": ""
     *   }
     * }
     * @apiSampleRequest /api/chat-vendor/chat-history
     * @apiErrorExample {json} Chat History error
     * HTTP/1.1 500 Internal Server Error
     */
    getChatHistory(userId, res, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const chatHistory = [];
            if (!(yield this.userService.findOne({ where: { userId } }))) {
                return res.status(400).send({
                    status: 0,
                    message: `Invalid UserId..!`,
                });
            }
            yield this.chatService.find({
                where: [
                    {
                        senderId: userId,
                        receiverId: req.user.vendorId,
                    },
                    {
                        receiverId: userId,
                        senderId: req.user.vendorId,
                    },
                ],
            }).then((chatLog) => {
                chatLog.map((chat) => {
                    chatHistory.push(chat);
                });
            });
            Promise.all(chatHistory);
            return res.status(200).send({
                status: 1,
                message: `Successfully Got Chat History..!`,
                data: chatHistory,
            });
        });
    }
    // Chat Delete API
    /**
     * @api {put} /api/chat-vendor/delete Delete API
     * @apiGroup Chat Admin
     * @apiHeader {string} Authorized
     * @apiParam (requestBody) {number} fromId fromId
     * @apiParam (requestBody) {number} toId toId
     * @apiParam (requestBody) {number} id id
     * @apiParam (requestBody) {number} messageId messageId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status" : 1
     *    "message": "Message Deleted Successfully..!"
     * }
     * @apiSampleRequest /api/chat-vendor/delete
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
exports.VendorChat = VendorChat;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorChat.prototype, "sendVendorDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/admin-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorChat.prototype, "sendUserDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/chat-history'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('userId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorChat.prototype, "getChatHistory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/delete'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorChat.prototype, "deleteChat", null);
exports.VendorChat = VendorChat = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/chat-vendor'),
    tslib_1.__metadata("design:paramtypes", [UserService_1.UserService,
        VendorService_1.VendorService,
        ChatService_1.ChatService,
        CustomerService_1.CustomerService])
], VendorChat);
//# sourceMappingURL=VendorChatController.js.map