"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmailNoAuthRoute = exports.GmailRoute = void 0;
const tslib_1 = require("tslib");
const express = tslib_1.__importStar(require("express"));
const GmailController_1 = require("../controller/GmailController");
const gmailController = new GmailController_1.GmailController();
exports.GmailRoute = express.Router()
    .get('/', gmailController.index)
    .post('/', gmailController.updateSettings);
exports.GmailNoAuthRoute = express.Router()
    .post('/', gmailController.login);
//# sourceMappingURL=GmailRouter.js.map