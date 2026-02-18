"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorTicketController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const TicketsService_1 = require("../../services/TicketsService");
const CreateTicketRequest_1 = require("./requests/CreateTicketRequest");
const Tickets_1 = require("../../models/Tickets");
const TicketMessages_1 = require("../../models/TicketMessages");
const moment_1 = tslib_1.__importDefault(require("moment"));
const TicketMessagesService_1 = require("../../services/TicketMessagesService");
const TicketAttachmentsService_1 = require("../../services/TicketAttachmentsService");
const TicketAttachments_1 = require("../../models/TicketAttachments");
const TicketCategoriesService_1 = require("../../services/TicketCategoriesService");
const SupportTicketLogs_1 = require("../../models/SupportTicketLogs");
const SupportTicketLogService_1 = require("../../services/SupportTicketLogService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const VendorService_1 = require("../../../../src/api/core/services/VendorService");
const CustomerService_1 = require("../../../../src/api/core/services/CustomerService");
const UserService_1 = require("../../../../src/api/core/services/UserService");
const typeorm_1 = require("typeorm");
const EmailTemplateService_1 = require("../../../../src/api/core/services/EmailTemplateService");
const SettingService_1 = require("../../../../src/api/core/services/SettingService");
const mail_services_1 = require("../../../../src/auth/mail.services");
const typedi_1 = require("typedi");
let VendorTicketController = class VendorTicketController {
    constructor(ticketsService, ticketMessagesService, ticketAttachmentsService, ticketCategoriesService, supportTicketLogsService, vendorService, customerService, userService, emailTemplateService, settingService) {
        this.ticketsService = ticketsService;
        this.ticketMessagesService = ticketMessagesService;
        this.ticketAttachmentsService = ticketAttachmentsService;
        this.ticketCategoriesService = ticketCategoriesService;
        this.supportTicketLogsService = supportTicketLogsService;
        this.vendorService = vendorService;
        this.customerService = customerService;
        this.userService = userService;
        this.emailTemplateService = emailTemplateService;
        this.settingService = settingService;
    }
    // retrive ticket category
    /**
     * @api {get} /api/vendor-support-ticket/ticket-category Get Vendor Support Ticket Categories API
     * @apiGroup Vendor Support Ticket Category
     * @apiDescription This API retrieves a list of vendor support ticket categories based on the provided query parameters.
     *
     * @apiParam (Query parameters) {Number} limit limit.
     * @apiParam (Query parameters) {Number} offset offset.
     * @apiParam (Query parameters) {String} keyword keyword.
     * @apiParam (Query parameters) {String} parentCategoryId parentCategoryId.
     * @apiParam (Query parameters) {String} status status.
     *
     * @apiHeader {String} Authorization Bearer token is required.
     *
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "status": "",
     *   "message": "",
     *   "data": [
     *     {
     *       "createdBy": "",
     *       "createdDate": "",
     *       "modifiedBy": "",
     *       "modifiedDate": "",
     *       "id": "",
     *       "categoryName": "",
     *       "parentCategoryId": "",
     *       "isActive": "",
     *       "isDelete": ""
     *     }
     *   ]
     * }
     *
     * @apiSampleRequest /api/vendor-support-ticket/ticket-category
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "message": "Failed to retrieve vendor support ticket categories",
     *   "status": "0"
     * }
     */
    getParentCategory(limit, offset, keyword, parentCategoryId, categoryType, status, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'DISTINCT TicketCategories.id as id',
                'TicketCategories.createdDate as createdDate',
                'TicketCategories.categoryName as categoryName',
                'TicketCategories.parentCategoryId as parentCategoryId',
                'TicketCategories.categoryType as categoryType',
            ];
            const whereConditions = [];
            const relations = [];
            if (parentCategoryId === '0') {
                relations.push({
                    tableName: 'ticket_categories',
                    op: 'inner-cond',
                    cond: 'TicketCategories.id = ticketCategory.parentCategoryId',
                    aliasName: 'ticketCategory',
                });
            }
            const searchConditions = [];
            whereConditions.push({
                name: 'TicketCategories.isDelete',
                op: 'where',
                value: 0,
            });
            if (status && status !== '') {
                whereConditions.push({
                    name: 'TicketCategories.isActive',
                    op: 'and',
                    value: status,
                });
            }
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: 'TicketCategories.categoryName',
                    value: keyword,
                });
            }
            if (parentCategoryId && parentCategoryId !== '') {
                whereConditions.push({
                    name: 'TicketCategories.parentCategoryId',
                    op: 'and',
                    value: parentCategoryId,
                });
            }
            if (categoryType && categoryType !== '') {
                whereConditions.push({
                    name: 'TicketCategories.categoryType',
                    op: 'and',
                    value: categoryType,
                });
            }
            const sort = [{
                    name: 'TicketCategories.createdDate',
                    order: 'DESC',
                }];
            const category = yield this.ticketCategoriesService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], sort, count, true);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got category list.',
                data: category,
            });
        });
    }
    // post ticket
    /**
     * @api {post} /api/vendor-support-ticket Create Vendor Support Ticket API
     * @apiGroup Vendor Support Ticket
     * @apiDescription This API allows vendors to create a support ticket by submitting a category, sub-category, ticket details, message, and optional attachments.
     *
     * @apiParam (Request body) {Number} categoryId Category ID.
     * @apiParam (Request body) {Number} subCategoryId Sub Category ID.
     * @apiParam (Request body) {Number} ticketId Ticket ID (optional).
     * @apiParam (Request body) {String} subject Subject of the ticket.
     * @apiParam (Request body) {String} description Description of the issue.
     * @apiParam (Request body) {String} message Message body for the ticket.
     * @apiParam (Request body) {Object[]} attachments List of file attachments (optional).
     * @apiParam (Request body) {String} attachments.fileName Name of the attachment file.
     * @apiParam (Request body) {String} attachments.filePath Path to the attachment file.
     *
     * @apiHeader {String} Authorization Bearer token is required.
     *
     * @apiParamExample {json} Request Example
     * {
     *   "categoryId": "",
     *   "subCategoryId": "",
     *   "ticketId": "",
     *   "subject": "",
     *   "description": "",
     *   "message": "",
     *   "attachments": [
     *     {
     *       "fileName": "",
     *       "filePath": ""
     *     }
     *   ]
     * }
     *
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "status": "",
     *   "message": "Vendor support ticket created successfully.",
     *   "data": {
     *     "ticketId": "",
     *     "categoryId": "",
     *     "subCategoryId": "",
     *     "subject": "",
     *     "description": "",
     *     "message": "",
     *     "attachments": [
     *       {
     *         "fileName": "",
     *         "filePath": ""
     *       }
     *     ]
     *   }
     * }
     *
     * @apiSampleRequest /api/vendor-support-ticket
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "message": "Failed to create vendor support ticket",
     *   "status": "0"
     * }
     */
    createTicket(createTicketRequest, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            const ticket = yield this.ticketsService.findOne({
                where: {
                    id: createTicketRequest.ticketId,
                    userType: 2,
                    userId: request.user.vendorId,
                },
            });
            if (ticket) {
                const checkTicket = yield this.ticketsService.findOne({ where: { id: ticket.id, status: 'resolved' } });
                if (checkTicket) {
                    const errorResponse = {
                        status: 0,
                        message: 'You cannot reply to this ticket as it has been resolved.',
                    };
                    return response.status(400).send(errorResponse);
                }
                const replyMessage = new TicketMessages_1.TicketMessages();
                replyMessage.message = createTicketRequest.message;
                replyMessage.ticketId = ticket.id;
                replyMessage.senderId = request.user.vendorId;
                replyMessage.senderType = Tickets_1.UserType.SELLER;
                replyMessage.sentAt = (0, moment_1.default)().format();
                const ticketMessage = yield this.ticketMessagesService.create(replyMessage);
                const messageAttachments = [];
                if (createTicketRequest.attachments) {
                    for (const attachments of createTicketRequest.attachments) {
                        const newTicketAttachment = new TicketAttachments_1.TicketAttachments();
                        newTicketAttachment.fileName = attachments.fileName;
                        newTicketAttachment.filePath = attachments.filePath;
                        newTicketAttachment.fileType = attachments.fileType;
                        newTicketAttachment.uploadedAt = (0, moment_1.default)().format();
                        newTicketAttachment.createdByType = Tickets_1.UserType.SELLER;
                        newTicketAttachment.ticketMessageId = ticketMessage.id;
                        messageAttachments.push(newTicketAttachment);
                    }
                    yield this.ticketAttachmentsService.create(messageAttachments);
                }
                // change ticket status to pending
                ticket.status = 2;
                yield this.ticketsService.update(ticket);
                // Support ticket log
                const ticketLog = new SupportTicketLogs_1.SupportTicketLogs();
                ticketLog.ticketId = ticket.id;
                ticketLog.actionTaken = SupportTicketLogs_1.ActionTaken.RESPONDED;
                ticketLog.actionBy = request.user.vendorId;
                ticketLog.actionByType = Tickets_1.UserType.SELLER;
                ticketLog.actionAt = (0, moment_1.default)().format();
                yield this.supportTicketLogsService.create(ticketLog);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully replied to the ticket.',
                    data: ticket,
                });
            }
            const newTickets = new Tickets_1.Tickets();
            newTickets.categoryId = createTicketRequest.categoryId;
            newTickets.subCategoryId = createTicketRequest.subCategoryId;
            newTickets.refId = `TKT#${Date.now()}`;
            newTickets.subject = createTicketRequest.subject;
            newTickets.description = createTicketRequest.description;
            newTickets.status = Tickets_1.Status.OPEN;
            newTickets.userId = request.user.vendorId;
            newTickets.userType = Tickets_1.UserType.SELLER;
            const savedTiket = yield this.ticketsService.create(newTickets);
            const newTicketMessage = new TicketMessages_1.TicketMessages();
            newTicketMessage.message = createTicketRequest.message;
            newTicketMessage.senderId = request.user.vendorId;
            newTicketMessage.senderType = Tickets_1.UserType.SELLER;
            newTicketMessage.ticketId = savedTiket.id;
            newTicketMessage.sentAt = (0, moment_1.default)().format();
            newTicketMessage.createdByType = Tickets_1.UserType.SELLER;
            const savedMessage = yield this.ticketMessagesService.create(newTicketMessage);
            if (createTicketRequest.attachments.length !== 0) {
                const messageAttachments = [];
                for (const attachments of createTicketRequest.attachments) {
                    const newTicketAttachment = new TicketAttachments_1.TicketAttachments();
                    newTicketAttachment.fileName = attachments.fileName;
                    newTicketAttachment.filePath = attachments.filePath;
                    newTicketAttachment.fileType = attachments.fileType;
                    newTicketAttachment.uploadedAt = (0, moment_1.default)().format();
                    newTicketAttachment.createdByType = Tickets_1.UserType.SELLER;
                    newTicketAttachment.ticketMessageId = savedMessage.id;
                    messageAttachments.push(newTicketAttachment);
                }
                yield this.ticketAttachmentsService.create(messageAttachments);
            }
            // Support ticket log
            const settings = yield this.settingService.findOne({ where: {} });
            const newTicketLog = new SupportTicketLogs_1.SupportTicketLogs();
            newTicketLog.ticketId = savedTiket.id;
            newTicketLog.actionTaken = SupportTicketLogs_1.ActionTaken.CREATED;
            newTicketLog.actionBy = request.user.vendorId;
            newTicketLog.actionByType = Tickets_1.UserType.SELLER;
            newTicketLog.actionAt = (0, moment_1.default)().format();
            yield this.supportTicketLogsService.create(newTicketLog);
            const emailContent = yield this.emailTemplateService.findOne({ where: { emailTemplateId: 58 } });
            const adminUserNames = [];
            const adminUserDetails = yield this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
            for (const user of adminUserDetails) {
                const value = user.username;
                adminUserNames.push(value);
            }
            const vendor = yield this.vendorService.findOne({ where: { vendorId: request.user.vendorId }, relations: ['customer'] });
            const message = emailContent.content.replace('{name}', (_a = vendor === null || vendor === void 0 ? void 0 : vendor.customer) === null || _a === void 0 ? void 0 : _a.firstName).replace('{subject}', savedTiket.subject);
            const mailContents = {};
            mailContents.logo = settings;
            mailContents.emailContent = message;
            mailContents.redirectUrl = '';
            mailContents.productDetailData = '';
            mailContents.ccEmail = adminUserNames;
            mail_services_1.MAILService.sendMail(mailContents, adminUserNames[0], emailContent.subject, false, false, '');
            return response.status(200).send({
                status: 1,
                message: 'New ticket has been created successfully.',
                data: savedTiket,
            });
        });
    }
    // retrive tickets
    /**
     * @api {get} /api/vendor-support-ticket Get Vendor Support Ticket API
     * @apiGroup Vendor Support Ticket
     * @apiDescription This API retrieves a list of vendor support tickets based on the provided query parameters.
     *
     * @apiParam (Query parameters) {Number} limit limit.
     * @apiParam (Query parameters) {Number} offset offset.
     * @apiParam (Query parameters) {String} keyword keyword.
     * @apiParam (Query parameters) {Number} count count.
     *
     * @apiHeader {String} Authorization Bearer token is required.
     *
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "status": "",
     *   "message": "",
     *   "data": {
     *     "categoryId": "",
     *     "subCategoryId": "",
     *     "refId": "",
     *     "subject": "",
     *     "description": "",
     *     "status": "",
     *     "userId": "",
     *     "userType": "",
     *     "createdDate": "",
     *     "id": ""
     *   }
     * }
     *
     * @apiSampleRequest /api/vendor-support-ticket
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "message": "Failed to retrieve vendor support ticket",
     *   "status": "0"
     * }
     */
    getTicketlist(limit, offset, keyword, status, createdDate, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'Tickets.id as id',
                'Tickets.refId as refId',
                'Tickets.userId as userId',
                'Tickets.userType as userType',
                'Tickets.createdDate as createdDate',
                'Tickets.modifiedDate as modifiedDate',
                'Tickets.subject as subject',
                'Tickets.description as description',
                'Tickets.isActive as isActive',
                'Tickets.isDelete as isDelete',
                'Tickets.status as status',
                'ticketCategory.categoryName as categoryName',
                'ticketSubCategory.categoryName as subCategoryName',
            ];
            const whereConditions = [];
            const searchCondition = [];
            const relations = [];
            relations.push({
                tableName: 'Tickets.ticketCategory',
                op: 'left',
                aliasName: 'ticketCategory',
            });
            relations.push({
                tableName: 'ticket_categories',
                op: 'left-cond',
                cond: 'Tickets.subCategoryId = ticketSubCategory.id',
                aliasName: 'ticketSubCategory',
            });
            whereConditions.push({
                name: 'Tickets.userType',
                op: 'where',
                value: 2,
            }, {
                name: 'Tickets.userId',
                op: 'and',
                value: request.user.vendorId,
            });
            if (keyword) {
                searchCondition.push({
                    name: ['Tickets.refId', 'ticketCategory.categoryName'],
                    value: keyword,
                });
            }
            if (status && status !== '') {
                whereConditions.push({
                    name: 'Tickets.status',
                    op: 'and',
                    value: status,
                });
            }
            if (createdDate && createdDate !== '') {
                searchCondition.push({
                    name: ['Tickets.createdDate'],
                    value: createdDate,
                });
            }
            const sort = [{
                    name: 'Tickets.createdDate',
                    order: 'DESC',
                }];
            const ticketList = yield this.ticketsService.listByQueryBuilder(limit, offset, select, whereConditions, searchCondition, relations, [], sort, count, true);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got ticket list.',
                data: ticketList,
            });
        });
    }
    // retrive ticket details
    /**
     * @api {get} /api/vendor-support-ticket/:id Get Vendor Support Ticket Details API
     * @apiGroup Vendor Support Ticket
     * @apiDescription This API retrieves the details of a specific vendor support ticket based on the provided ticket ID.
     *
     * @apiParam (URL parameters) {Number} id Ticket ID.
     *
     * @apiHeader {String} Authorization Bearer token is required.
     *
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "status": "",
     *   "message": "",
     *   "data": {
     *     "createdBy": "",
     *     "createdDate": "",
     *     "modifiedBy": "",
     *     "modifiedDate": "",
     *     "id": "",
     *     "refId": "",
     *     "userId": "",
     *     "userType": "",
     *     "categoryId": "",
     *     "subCategoryId": "",
     *     "subject": "",
     *     "description": "",
     *     "isActive": "",
     *     "isDelete": "",
     *     "status": "",
     *     "ticketMessage": [
     *       {
     *         "createdBy": "",
     *         "createdDate": "",
     *         "modifiedBy": "",
     *         "modifiedDate": "",
     *         "id": "",
     *         "ticketId": "",
     *         "senderId": "",
     *         "senderType": "",
     *         "message": "",
     *         "sentAt": "",
     *         "isActive": "",
     *         "isDelete": "",
     *         "createdByType": "",
     *         "modifiedByType": "",
     *         "ticketAttachments": []
     *       }
     *     ]
     *   }
     * }
     *
     * @apiSampleRequest /api/vendor-support-ticket/:id
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "message": "Failed to retrieve vendor support ticket",
     *   "status": "0"
     * }
     */
    getTicket(id, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ticket = yield this.ticketsService.findOne({ where: { id } });
            if (!ticket) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid ticket id.',
                };
                return response.status(400).send(errorResponse);
            }
            const ticketMessages = yield this.ticketMessagesService.find({ where: { ticketId: ticket.id }, relations: ['ticketAttachments'], order: { sentAt: 'DESC' } });
            const { sellerIds, buyerIds, adminIds } = ticketMessages.reduce((ids, message) => {
                if (message.senderType === 'seller') {
                    ids.sellerIds.push(message.senderId);
                }
                else if (message.senderType === 'buyer') {
                    ids.buyerIds.push(message.senderId);
                }
                else if (message.senderType === 'admin') {
                    ids.adminIds.push(message.senderId);
                }
                return ids;
            }, { sellerIds: [], buyerIds: [], adminIds: [] });
            const vendors = yield this.vendorService.find({ where: { vendorId: (0, typeorm_1.In)(sellerIds) } });
            const vendorIds = vendors.map(vendor => vendor.customerId);
            const customers = yield this.customerService.find({
                select: ['id', 'firstName', 'lastName', 'avatar', 'avatarPath', 'username', 'createdDate'],
                where: { id: (0, typeorm_1.In)([...buyerIds, ...vendorIds]) },
            });
            const adminUsers = yield this.userService.findAll({
                select: ['userId', 'firstName', 'lastName', 'avatar', 'avatarPath', 'username', 'createdDate'],
                where: { userId: (0, typeorm_1.In)(adminIds) },
            });
            const ticketMessageDetails = ticketMessages.map(message => {
                if (message.senderType === 'seller') {
                    const vendor = vendors.find(vendorDetail => vendorDetail.vendorId === message.senderId);
                    if (vendor) {
                        message.postedBy = customers.find(customer => customer.id === vendor.customerId);
                    }
                }
                else if (message.senderType === 'buyer') {
                    message.postedBy = customers.find(customer => customer.id === message.senderId);
                }
                else {
                    message.postedBy = adminUsers.find(admin => admin.userId === message.senderId);
                }
                return message;
            });
            const ticketCategory = yield this.ticketCategoriesService.findOne({ select: ['categoryName'], where: { id: ticket.categoryId } });
            ticket.categoryName = ticketCategory.categoryName;
            const ticketSubCategory = yield this.ticketCategoriesService.findOne({ select: ['categoryName'], where: { id: ticket.subCategoryId } });
            ticket.subCategoryName = ticketSubCategory.categoryName;
            ticket.ticketMessage = ticketMessageDetails;
            return response.status(200).send({
                status: 1,
                message: 'Successfully got ticket details.',
                data: ticket,
            });
        });
    }
    //  update ticket status
    /**
     * @api {put} /api/vendor-support-ticket/:id Update Vendor Support Ticket Status API
     * @apiGroup Vendor Support Ticket
     * @apiDescription This API updates the status of a specific vendor support ticket based on the provided ticket ID.
     *
     * @apiParam (URL parameters) {Number} id Ticket ID.
     * @apiParam (Request body) {Number} status Status of the ticket (e.g., open, closed, resolved, etc.).
     *
     * @apiHeader {String} Authorization Bearer token is required.
     *
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "status": "",
     *   "message": "",
     *   "data": {
     *     "createdBy": "",
     *     "createdDate": "",
     *     "modifiedBy": "",
     *     "modifiedDate": "",
     *     "id": "",
     *     "refId": "",
     *     "userId": "",
     *     "userType": "",
     *     "categoryId": "",
     *     "subCategoryId": "",
     *     "subject": "",
     *     "description": "",
     *     "isActive": "",
     *     "isDelete": "",
     *     "status": ""
     *   }
     * }
     *
     * @apiSampleRequest /api/vendor-support-ticket/:id
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "message": "Failed to update vendor support ticket status",
     *   "status": "0"
     * }
     */
    updateTicketStatus(id, status, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const ticket = yield this.ticketsService.findOne({ where: { id } });
            if (!ticket) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid ticket id.',
                };
                return response.status(400).send(errorResponse);
            }
            ticket.status = status;
            const updateTicket = yield this.ticketsService.update(ticket);
            // Support ticket log
            const newTicketLog = new SupportTicketLogs_1.SupportTicketLogs();
            newTicketLog.ticketId = ticket.id;
            newTicketLog.actionTaken = (updateTicket.status === 3) ? SupportTicketLogs_1.ActionTaken.CLOSED : SupportTicketLogs_1.ActionTaken.UPDATED;
            newTicketLog.actionBy = request.user.vendorId;
            newTicketLog.actionByType = Tickets_1.UserType.SELLER;
            newTicketLog.actionAt = (0, moment_1.default)().format();
            yield this.supportTicketLogsService.create(newTicketLog);
            if (updateTicket.status === 3) {
                const settings = yield this.settingService.findOne({ where: {} });
                // sent mail to admin
                const emailContent = yield this.emailTemplateService.findOne({ where: { emailTemplateId: 58 } });
                const adminUserNames = [];
                const adminUserDetails = yield this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
                for (const user of adminUserDetails) {
                    const value = user.username;
                    adminUserNames.push(value);
                }
                const vendor = yield this.vendorService.findOne({ where: { vendorId: request.user.vendorId }, relations: ['customer'] });
                const message = emailContent.content.replace('{name}', (_a = vendor === null || vendor === void 0 ? void 0 : vendor.customer) === null || _a === void 0 ? void 0 : _a.firstName).replace('{subject}', updateTicket.subject);
                const mailContents = {};
                mailContents.logo = settings;
                mailContents.emailContent = message;
                mailContents.redirectUrl = '';
                mailContents.productDetailData = '';
                mailContents.ccEmail = adminUserNames;
                mail_services_1.MAILService.sendMail(mailContents, (_b = vendor === null || vendor === void 0 ? void 0 : vendor.customer) === null || _b === void 0 ? void 0 : _b.username, emailContent.subject, false, false, '');
            }
            return response.status(200).send({
                status: 1,
                message: 'Successfully changed ticket status.',
                data: ticket,
            });
        });
    }
};
exports.VendorTicketController = VendorTicketController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/ticket-category'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('parentCategoryId')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('categoryType')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(7, (0, routing_controllers_1.Req)()),
    tslib_1.__param(8, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorTicketController.prototype, "getParentCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateTicketRequest_1.CreateTicketRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorTicketController.prototype, "createTicket", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('createdDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Req)()),
    tslib_1.__param(7, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorTicketController.prototype, "getTicketlist", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorTicketController.prototype, "getTicket", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('status')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorTicketController.prototype, "updateTicketStatus", null);
exports.VendorTicketController = VendorTicketController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/vendor-support-ticket'),
    tslib_1.__metadata("design:paramtypes", [TicketsService_1.TicketsService,
        TicketMessagesService_1.TicketMessageService,
        TicketAttachmentsService_1.TicketAttachmentsService,
        TicketCategoriesService_1.TicketCategoriesService,
        SupportTicketLogService_1.SupportTicketLogsService,
        VendorService_1.VendorService,
        CustomerService_1.CustomerService,
        UserService_1.UserService,
        EmailTemplateService_1.EmailTemplateService,
        SettingService_1.SettingService])
], VendorTicketController);
//# sourceMappingURL=VendorTicketController.js.map