"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserChecker = void 0;
const tslib_1 = require("tslib");
function currentUserChecker(connection) {
    return function innerCurrentUserChecker(action) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return action.request.user;
        });
    };
}
exports.currentUserChecker = currentUserChecker;
//# sourceMappingURL=currentUserChecker.js.map