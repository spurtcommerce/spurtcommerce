"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketIO = socketIO;
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const ChatLog_1 = require("./models/ChatLog");
const env_1 = require("../../src/env");
const typeormLoader_1 = require("../../src/loaders/typeormLoader");
function socketIO() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const server = require('http').createServer();
        const SocIo = require('socket.io');
        const io = SocIo(server, {
            cors: true,
        });
        const userList = [];
        io.on('connection', (socket) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('User Connected', socket.handshake.query);
            userList.push({
                userId: +socket.handshake.query.userId,
                name: socket.handshake.query.name,
                type: socket.handshake.query.type,
                socketId: socket.id,
            });
            console.log(userList);
            socket.on('disconnect', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                console.log('User Disconnected', socket.handshake.query);
                lodash_1.default.remove(userList, (user) => {
                    return user.socketId === socket.id;
                });
                console.log(userList);
            }));
            socket.on('message', (data) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                console.log(data);
                if (data.toId) {
                    const toUser = userList.find((user) => { var _a; return user.userId === data.toId && user.type === ((_a = data.type) === null || _a === void 0 ? void 0 : _a.trim()); });
                    console.log(toUser);
                    if (toUser) {
                        socket.to(toUser.socketId).emit('server_message', data);
                    }
                    else {
                        socket.emit('user_offline', data);
                    }
                    const chatLogService = (0, typeormLoader_1.getDataSource)().getRepository(ChatLog_1.ChatLog);
                    const chatLog = new ChatLog_1.ChatLog();
                    chatLog.senderId = data.fromId;
                    chatLog.receiverId = data.toId;
                    chatLog.messageId = data.messageId;
                    chatLog.isRead = 0;
                    chatLog.message = JSON.stringify(data);
                    yield chatLogService.save(chatLog);
                }
            }));
            socket.on('user-action', (payload) => {
                const toUser = userList.find((user) => { var _a; return user.userId === payload.toId && user.type === ((_a = payload.type) === null || _a === void 0 ? void 0 : _a.trim()); });
                if (toUser) {
                    socket.to(toUser.socketId).emit('user-action-status', { isTyping: payload.status === 'TYPING' ? true : false, userId: payload.fromId });
                }
            });
            socket.on('delete-message', (payload) => {
                const toUser = userList.find((user) => { var _a; return user.userId === payload.toId && user.type === ((_a = payload.type) === null || _a === void 0 ? void 0 : _a.trim()); });
                if (toUser) {
                    socket.to(toUser.socketId).emit('message-deleted', { payload });
                }
            });
            socket.on('get-user-list', (payload) => {
                const userType = payload.type;
                const activeList = userList.map((user) => {
                    return user.type === userType;
                });
                socket.emit('user-list', { activeList });
            });
        }));
        server.listen(env_1.env.app.socketPort, () => {
            console.log(`Chat Socket Connected to Port ${env_1.env.app.socketPort}`);
        });
    });
}
//# sourceMappingURL=ChatServer.js.map