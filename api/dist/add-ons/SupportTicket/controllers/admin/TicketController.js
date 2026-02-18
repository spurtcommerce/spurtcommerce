"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const TicketCategoriesService_1 = require("../../services/TicketCategoriesService");
const CreateCategoryRequest_1 = require("./requests/CreateCategoryRequest");
const TicketCategories_1 = require("../../models/TicketCategories");
const TicketsService_1 = require("../../services/TicketsService");
const TicketMessagesService_1 = require("../../services/TicketMessagesService");
const TicketMessages_1 = require("../../models/TicketMessages");
const TicketMessageRequest_1 = require("./requests/TicketMessageRequest");
const TicketAttachments_1 = require("../../models/TicketAttachments");
const moment_1 = tslib_1.__importDefault(require("moment"));
const Tickets_1 = require("../../models/Tickets");
const TicketAttachmentsService_1 = require("../../services/TicketAttachmentsService");
const SupportTicketLogs_1 = require("../../models/SupportTicketLogs");
const SupportTicketLogService_1 = require("../../services/SupportTicketLogService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const VendorService_1 = require("../../../../src/api/core/services/VendorService");
const CustomerService_1 = require("../../../../src/api/core/services/CustomerService");
const UserService_1 = require("../../../../src/api/core/services/UserService");
const EmailTemplateService_1 = require("../../../../src/api/core/services/EmailTemplateService");
const SettingService_1 = require("../../../../src/api/core/services/SettingService");
const mail_services_1 = require("../../../../src/auth/mail.services");
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
let TicketController = class TicketController {
    constructor(ticketCategoriesService, ticketsService, ticketMessagesService, ticketAttachmentsService, supportTicketLogsService, vendorService, customerService, userService, emailTemplateService, settingService) {
        this.ticketCategoriesService = ticketCategoriesService;
        this.ticketsService = ticketsService;
        this.ticketMessagesService = ticketMessagesService;
        this.ticketAttachmentsService = ticketAttachmentsService;
        this.supportTicketLogsService = supportTicketLogsService;
        this.vendorService = vendorService;
        this.customerService = customerService;
        this.userService = userService;
        this.emailTemplateService = emailTemplateService;
        this.settingService = settingService;
    }
    // create ticket category
    /**
     * @api {post} /api/support-ticket/ticket-category Add Ticket Category API
     * @apiGroup Support Ticket
     * @apiDescription This API allows users to add a new support ticket category.
     *
     * @apiParam (Request body) {String} categoryName "".
     * @apiParam (Request body) {Number} status "".
     * @apiParam (Request body) {Number} parentCategoryId "".
     * @apiParam (Request body) {String} categoryType "".
     *
     * @apiHeader {String} Authorization Bearer token is required.
     *
     * @apiParamExample {json} Request Example
     * {
     *   "categoryName": "",
     *   "status": "",
     *   "parentCategoryId": "",
     *   "categoryType":""
     * }
     *
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "message": "Ticket category created successfully",
     *   "status": "1",
     *   "data": {
     *     "categoryId": "",
     *     "categoryName": "",
     *     "status": "",
     *     "parentCategoryId": "",
     *     "createdBy": "",
     *     "createdDate": "",
     *     "modifiedBy": "",
     *     "modifiedDate": "",
     *     "categoryType":""
     *   }
     * }
     *
     * @apiSampleRequest /api/support-ticket/ticket-category
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "message": "Failed to create ticket category",
     *   "status": "0"
     * }
     */
    creatCategory(categoryRequest, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const newTicketCategory = new TicketCategories_1.TicketCategories();
            newTicketCategory.categoryName = categoryRequest.categoryName;
            newTicketCategory.isActive = (_a = categoryRequest.status) !== null && _a !== void 0 ? _a : 0;
            newTicketCategory.parentCategoryId = (_b = categoryRequest.parentCategoryId) !== null && _b !== void 0 ? _b : 0;
            if (newTicketCategory.parentCategoryId === 0) {
                newTicketCategory.categoryType = categoryRequest.categoryType;
            }
            yield this.ticketCategoriesService.create(newTicketCategory);
            return response.status(200).send({
                status: 1,
                message: 'New ticket category created successfully.',
                data: newTicketCategory,
            });
        });
    }
    // retrive ticket category list
    /**
     * @api {get} /api/support-ticket/ticket-category Get Ticket Categories API
     * @apiGroup Support Ticket
     * @apiDescription This API retrieves a list of support ticket categories based on the query parameters.
     *
     * @apiParam (Query parameters) {Number} limit limit.
     * @apiParam (Query parameters) {Number} offset offset.
     * @apiParam (Query parameters) {String} keyword keyword.
     * @apiParam (Query parameters) {String} parentCategoryId parentCategoryId.
     * @apiParam (Query parameters) {String} status status.
     *
     * @apiHeader {String} Authorization Bearer token is required.
     *
     * @apiParamExample {json} Request Example
     * /api/support-ticket/ticket-category
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
     *       "isDelete": "",
     *       "categoryParentName":"",
     *       "categoryType":""
     *     }
     *   ]
     * }
     *
     * @apiSampleRequest /api/support-ticket/ticket-category
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "message": "Failed to got ticket category",
     *   "status": "0"
     * }
     */
    getParentCategory(limit, offset, keyword, parentCategoryId, categoryType, status, categoryName, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'TicketCategories.id as id',
                'TicketCategories.categoryName as categoryName',
                'TicketCategories.parentCategoryId as parentCategoryId',
                'TicketCategories.isActive as isActive',
                'TicketCategories.isDelete as isDelete',
                'TicketCategories.categoryType as categoryType',
                'TicketCategories.createdDate as createdDate',
                'TicketCategories.modifiedDate as modifiedDate',
                'ticketParentCategory.categoryName as categoryParentName',
            ];
            const whereConditions = [];
            const searchConditions = [];
            const relations = [];
            relations.push({
                tableName: 'ticket_categories',
                op: 'left-cond',
                cond: 'TicketCategories.parent_category_id = ticketParentCategory.id',
                aliasName: 'ticketParentCategory',
            });
            if (status && status !== '') {
                whereConditions.push({
                    name: 'TicketCategories.isActive',
                    op: 'where',
                    value: status,
                });
            }
            if (keyword) {
                searchConditions.push({
                    name: ['TicketCategories.categoryName'],
                    value: keyword,
                });
            }
            if (categoryName && categoryName !== '') {
                whereConditions.push({
                    name: 'TicketCategories.categoryName',
                    op: 'and',
                    value: `'${categoryName}'`,
                });
            }
            if (parentCategoryId && parentCategoryId !== '') {
                whereConditions.push({
                    name: 'TicketCategories.parentCategoryId',
                    op: 'and',
                    value: parentCategoryId,
                });
            }
            else {
                whereConditions.push({
                    name: 'TicketCategories.parentCategoryId',
                    op: 'not',
                    value: 0,
                });
            }
            if (categoryType && categoryType !== '') {
                whereConditions.push({
                    name: 'TicketCategories.categoryType',
                    op: 'and',
                    value: categoryType,
                });
            }
            whereConditions.push({
                name: 'TicketCategories.isDelete',
                op: 'and',
                value: 0,
            });
            const sort = [{
                    name: 'TicketCategories.createdDate',
                    order: 'DESC',
                }];
            const category = yield this.ticketCategoriesService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], sort, count, true);
            return response.status(200).send({
                status: 1,
                message: count ? 'Successfully retrieved category count.' : 'Category list retrieved successfully.',
                data: category,
            });
        });
    }
    // retrive ticket cteagory
    /**
     * @api {get} /api/support-ticket/ticket-category/:id Get Ticket Category by ID API
     * @apiGroup Support Ticket
     * @apiDescription This API retrieves a specific support ticket category based on the provided category ID.
     *
     * @apiParam (Path parameters) {Number} id The unique ID of the ticket category.
     *
     * @apiHeader {String} Authorization Bearer token is required.
     *
     * @apiParamExample {json} Request Example
     * /api/support-ticket/ticket-category/123
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
     *     "categoryName": "",
     *     "parentCategoryId": "",
     *     "isActive": "",
     *     "isDelete": ""
     *   }
     * }
     *
     * @apiSampleRequest /api/support-ticket/ticket-category/:id
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "message": "Failed to retrieve ticket category",
     *   "status": "0"
     * }
     */
    getCategoryDetail(id, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ticketCategory = yield this.ticketCategoriesService.findOne({ where: { id } });
            if (!ticketCategory) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid ticket category id.',
                };
                return response.status(400).send(errorResponse);
            }
            return response.status(200).send({
                status: 1,
                message: 'Successfully got category.',
                data: ticketCategory,
            });
        });
    }
    // update category
    /**
     * @api {put} /api/support-ticket/ticket-category/:id Update Ticket Category API
     * @apiGroup Support Ticket
     * @apiDescription This API allows users to update a specific support ticket category based on the provided category ID.
     *
     * @apiParam (Path parameters) {Number} id The unique ID of the ticket category to be updated.
     *
     * @apiParam (Request body) {String} categoryName categoryName.
     * @apiParam (Request body) {Number} status status.
     * @apiParam (Request body) {Number} parentCategoryId parentCategoryId.
     *
     * @apiHeader {String} Authorization Bearer token is required.
     *
     * @apiParamExample {json} Request Example
     * {
     *   "categoryName": "",
     *   "status": "",
     *   "parentCategoryId": ""
     * }
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
     *     "categoryName": "",
     *     "parentCategoryId": "",
     *     "isActive": "",
     *     "isDelete": "",
     *     "categoryType":""
     *   }
     * }
     *
     * @apiSampleRequest /api/support-ticket/ticket-category/:id
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "message": "Failed to update ticket category",
     *   "status": "0"
     * }
     */
    updateCategoryStatus(id, updateCategoryRequest, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ticketCategory = yield this.ticketCategoriesService.findOne({ where: { id } });
            if (!ticketCategory) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid ticket category id.',
                };
                return response.status(400).send(errorResponse);
            }
            ticketCategory.categoryName = updateCategoryRequest.categoryName;
            ticketCategory.isActive = updateCategoryRequest.status;
            const categoryType = updateCategoryRequest.categoryType;
            if (ticketCategory.parentCategoryId === 0) {
                if (categoryType === 0 || categoryType === 1) {
                    const isMappedTicket = yield this.ticketsService.findOne({ where: { categoryId: ticketCategory.id } });
                    if (isMappedTicket) {
                        const errorResponse = {
                            status: 0,
                            message: 'This category is mapped to a ticket, so it cannot be change.',
                        };
                        return response.status(400).send(errorResponse);
                    }
                    ticketCategory.categoryType = categoryType;
                }
            }
            else {
                const checkTicket = yield this.ticketsService.findOne({ where: { subCategoryId: ticketCategory.id } });
                if (updateCategoryRequest.parentCategoryId && checkTicket) {
                    const errorResponse = {
                        status: 0,
                        message: 'This category is mapped to a ticket, so it cannot be change.',
                    };
                    return response.status(400).send(errorResponse);
                }
                ticketCategory.parentCategoryId = updateCategoryRequest.parentCategoryId;
            }
            yield this.ticketCategoriesService.create(ticketCategory);
            return response.status(200).send({
                status: 1,
                message: 'Successfully updated the category.',
                data: ticketCategory,
            });
        });
    }
    // delete category
    /**
     * @api {put} /api/support-ticket/ticket-category/:id Delete Ticket Category API
     * @apiGroup Support Ticket
     * @apiDescription This API allows users to delete a specific support ticket category based on the provided category ID.
     *
     * @apiParam (Path parameters) {Number} id The unique ID of the ticket category to be delete.
     *
     * @apiHeader {String} Authorization Bearer token is required.
     *
     * @apiParamExample {json} Request Example
     * /api/support-ticket/ticket-category/123
     *
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "status": "",
     *   "message": ""
     * }
     *
     * @apiSampleRequest /api/support-ticket/ticket-category/:id
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "message": "Failed to delete ticket category",
     *   "status": "0"
     * }
     */
    deleteCategories(id, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ticketCategory = yield this.ticketCategoriesService.findOne({ where: { id, isDelete: 0 } });
            if (!ticketCategory) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid ticket category id.',
                };
                return response.status(400).send(errorResponse);
            }
            const checkTicket = yield this.ticketsService.findOne({ where: { categoryId: ticketCategory.id } });
            if (checkTicket) {
                const errorResponse = {
                    status: 0,
                    message: 'This category is mapped to a ticket, so it cannot be delete.',
                };
                return response.status(400).send(errorResponse);
            }
            ticketCategory.isDelete = 1;
            yield this.ticketCategoriesService.create(ticketCategory);
            return response.status(200).send({
                status: 1,
                message: 'Successfully deleted the category.',
            });
        });
    }
    // retrive tikets
    /**
     * @api {get} /api/support-ticket Get Support Tickets API
     * @apiGroup Support Ticket
     * @apiDescription This API retrieves a list of support tickets based on the provided query parameters.
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
     *   "data": [
     *     {
     *       "createdBy": "",
     *       "createdDate": "",
     *       "modifiedBy": "",
     *       "modifiedDate": "",
     *       "id": "",
     *       "refId": "",
     *       "userId": "",
     *       "userType": "",
     *       "categoryId": "",
     *       "subCategoryId": "",
     *       "subject": "",
     *       "description": "",
     *       "isActive": "",
     *       "isDelete": "",
     *       "status": "",
     *       "ticketCategory": {
     *         "createdBy": "",
     *         "createdDate": "",
     *         "modifiedBy": "",
     *         "modifiedDate": "",
     *         "id": "",
     *         "categoryName": "",
     *         "parentCategoryId": "",
     *         "isActive": "",
     *         "isDelete": ""
     *       }
     *     }
     *   ]
     * }
     *
     * @apiSampleRequest /api/support-ticket
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "message": "Failed to retrieve support tickets",
     *   "status": "0"
     * }
     */
    getTicketlist(limit, offset, keyword, status, userType, createdDate, count, request, response) {
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
            if (userType && userType !== '') {
                whereConditions.push({
                    name: 'Tickets.userType',
                    op: 'and',
                    value: userType,
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
    // retrive ticket logs
    /**
     * @api {get} /api/support-ticket/ticket-logs Get Ticket Logs API
     * @apiGroup Support Ticket
     * @apiDescription This API retrieves a list of ticket logs based on the provided query parameters.
     *
     * @apiParam (Query parameters) {Number} limit limit.
     * @apiParam (Query parameters) {Number} offset offset.
     * @apiParam (Query parameters) {Number} count count.
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
     *       "ticketId": "",
     *       "actionTaken": "",
     *       "actionBy": "",
     *       "actionByType": "",
     *       "actionAt": "",
     *       "isActive": "",
     *       "isDelete": "",
     *       "createdByType": "",
     *       "modifiedByType": ""
     *     }
     *   ]
     * }
     *
     * @apiSampleRequest /api/support-ticket/ticket-logs
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "message": "Failed to retrieve ticket logs",
     *   "status": "0"
     * }
     */
    ticketLogs(limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const ticketLogs = yield this.supportTicketLogsService.list(limit, offset, select, [], [], [], count);
            return response.status(200).send({
                status: 1,
                message: count ? 'Successfully got ticket logs count.' : 'Successfully got ticket logs.',
                data: ticketLogs,
            });
        });
    }
    // retrive ticket details
    /**
     * @api {get} /api/support-ticket/:id Get Ticket Details API
     * @apiGroup Support Ticket
     * @apiDescription This API retrieves details of a specific support ticket based on the provided ticket ID.
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
     * @apiSampleRequest /api/support-ticket/:id
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "message": "Failed to retrieve ticket details",
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
                message: 'Successfully got ticket.',
                data: ticket,
            });
        });
    }
    // response to ticket message
    /**
     * @api {post} /api/support-ticket/:id Add Message and Attachments to Ticket API
     * @apiGroup Support Ticket
     * @apiDescription This API allows users to add a new message and attachments to an existing support ticket based on the provided ticket ID.
     *
     * @apiParam (URL parameters) {Number} id Ticket ID.
     *
     * @apiParam (Request body) {String} message Message content for the ticket.
     * @apiParam (Request body) {Object[]} attachments List of document attachments.
     * @apiParam (Request body) {String} [attachments.fileName] File name of the attachment.
     * @apiParam (Request body) {String} [attachments.filePath] File path of the attachment.
     *
     * @apiHeader {String} Authorization Bearer token is required.
     *
     * @apiParamExample {json} Request Example
     * {
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
     *   "message": "",
     *   "data": {
     *     "ticketId": "",
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
     * @apiSampleRequest /api/support-ticket/:id
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "message": "Failed to add message and attachments to ticket",
     *   "status": "0"
     * }
     */
    replyMessage(id, ticketMessage, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ticket = yield this.ticketsService.findOne({ where: { id } });
            if (!ticket) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid ticket id.',
                };
                return response.status(400).send(errorResponse);
            }
            const checkTicket = yield this.ticketsService.findOne({ where: { id, status: 'resolved' } });
            if (checkTicket) {
                const errorResponse = {
                    status: 0,
                    message: 'This ticket has been resolved. You cannot reply to this ticket.',
                };
                return response.status(400).send(errorResponse);
            }
            const replyMessage = new TicketMessages_1.TicketMessages();
            replyMessage.message = ticketMessage.message;
            replyMessage.ticketId = ticket.id;
            replyMessage.senderId = request.user.userId;
            replyMessage.senderType = Tickets_1.UserType.ADMIN;
            replyMessage.sentAt = (0, moment_1.default)().format();
            const savedMessage = yield this.ticketMessagesService.create(replyMessage);
            const messageAttachments = [];
            if (ticketMessage.attachments) {
                for (const attachments of ticketMessage.attachments) {
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
            // change ticket status to pending
            ticket.status = 2;
            yield this.ticketsService.update(ticket);
            // Support ticket log
            const newTicketLog = new SupportTicketLogs_1.SupportTicketLogs();
            newTicketLog.ticketId = ticket.id;
            newTicketLog.actionTaken = SupportTicketLogs_1.ActionTaken.RESPONDED;
            newTicketLog.actionBy = request.user.userId;
            newTicketLog.actionByType = Tickets_1.UserType.ADMIN;
            newTicketLog.actionAt = (0, moment_1.default)().format();
            yield this.supportTicketLogsService.create(newTicketLog);
            return response.status(200).send({
                status: 1,
                message: 'Successfully replied to the ticket message.',
                data: ticket,
            });
        });
    }
    // update ticket status
    /**
     * @api {put} /api/support-ticket/:id Update Ticket Status API
     * @apiGroup Support Ticket
     * @apiDescription This API allows users to update the status of an existing support ticket based on the provided ticket ID.
     *
     * @apiParam (URL parameters) {Number} id Ticket ID.
     *
     * @apiParam (Request body) {Number} status The new status of the ticket.
     *
     * @apiHeader {String} Authorization Bearer token is required.
     *
     * @apiParamExample {json} Request Example
     * {
     *   "status": ""
     * }
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
     *
     * @apiSampleRequest /api/support-ticket/:id
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "message": "Failed to update ticket status",
     *   "status": "0"
     * }
     */
    updateTicketStatus(id, status, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
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
            newTicketLog.actionBy = request.user.userId;
            newTicketLog.actionByType = Tickets_1.UserType.ADMIN;
            newTicketLog.actionAt = (0, moment_1.default)().format();
            yield this.supportTicketLogsService.create(newTicketLog);
            if (updateTicket.status === 3) {
                const settings = yield this.settingService.findOne({ where: {} });
                // sent mail to admin
                const emailContent = yield this.emailTemplateService.findOne({ where: { emailTemplateId: 59 } });
                // email sent to vendor or buyer
                const senderDetails = updateTicket.userType === 1 ? yield this.customerService.findOne({ where: { id: updateTicket.userId } }) : yield this.vendorService.findOne({ where: { vendorId: updateTicket.userId }, relations: ['customer'] });
                const message = emailContent.content.replace('{name}', updateTicket.userType === 1 ? senderDetails.firstName : senderDetails.customer.firstName).replace('{subject}', updateTicket.subject);
                const mailContents = {};
                mailContents.logo = settings;
                mailContents.emailContent = message;
                mailContents.redirectUrl = '';
                mailContents.productDetailData = '';
                mailContents.ccEmail = [];
                mail_services_1.MAILService.sendMail(mailContents, updateTicket.userType === 1 ? senderDetails.username : (_a = senderDetails.customer) === null || _a === void 0 ? void 0 : _a.username, emailContent.subject, false, false, '');
            }
            return response.status(200).send({
                status: 1,
                message: 'Successfully changed ticket status.',
                data: ticket,
            });
        });
    }
};
exports.TicketController = TicketController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/ticket-category'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateCategoryRequest_1.CreateCategoryRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketController.prototype, "creatCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/ticket-category'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('parentCategoryId')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('categoryType')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('categoryName')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(8, (0, routing_controllers_1.Req)()),
    tslib_1.__param(9, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketController.prototype, "getParentCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/ticket-category/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketController.prototype, "getCategoryDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/ticket-category/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: false })),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateCategoryRequest_1.CreateCategoryRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketController.prototype, "updateCategoryStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/ticket-category/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketController.prototype, "deleteCategories", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('userType')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('createdDate')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(7, (0, routing_controllers_1.Req)()),
    tslib_1.__param(8, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketController.prototype, "getTicketlist", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/ticket-logs'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketController.prototype, "ticketLogs", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketController.prototype, "getTicket", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, TicketMessageRequest_1.TicketMessageRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketController.prototype, "replyMessage", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('status')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketController.prototype, "updateTicketStatus", null);
exports.TicketController = TicketController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/support-ticket'),
    tslib_1.__metadata("design:paramtypes", [TicketCategoriesService_1.TicketCategoriesService,
        TicketsService_1.TicketsService,
        TicketMessagesService_1.TicketMessageService,
        TicketAttachmentsService_1.TicketAttachmentsService,
        SupportTicketLogService_1.SupportTicketLogsService,
        VendorService_1.VendorService,
        CustomerService_1.CustomerService,
        UserService_1.UserService,
        EmailTemplateService_1.EmailTemplateService,
        SettingService_1.SettingService])
], TicketController);
//# sourceMappingURL=TicketController.js.map