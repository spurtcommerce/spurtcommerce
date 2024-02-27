"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookNoAuthRoute = exports.FacebookRoute = void 0;
const tslib_1 = require("tslib");
const express = tslib_1.__importStar(require("express"));
const FacebookController_1 = require("../controller/FacebookController");
const facebookController = new FacebookController_1.FacebookController();
exports.FacebookRoute = express.Router()
    .get('/', facebookController.index)
    .post('/', facebookController.updateSettings);
exports.FacebookNoAuthRoute = express.Router()
    .post('/', facebookController.login);
//# sourceMappingURL=FacebookRouter.js.map