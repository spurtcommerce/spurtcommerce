"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const typedi_1 = require("typedi");
const logger_1 = require("../lib/logger");
function Logger(scope) {
    return (object, propertyKey, index) => {
        const logger = new logger_1.Logger(scope);
        const propertyName = propertyKey ? propertyKey.toString() : '';
        typedi_1.Container.registerHandler({ object, propertyName, index, value: () => logger });
    };
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map