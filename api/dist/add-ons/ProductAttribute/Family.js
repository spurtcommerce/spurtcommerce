"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = findOne;
exports.save = save;
const tslib_1 = require("tslib");
const typeormLoader_1 = require("../../src/loaders/typeormLoader");
const Family_1 = require("./models/Family");
const familyService = (0, typeormLoader_1.getDataSource)().getRepository(Family_1.Family);
function findOne(obj) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield familyService.findOne(obj);
    });
}
function save(obj) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield familyService.save(obj);
    });
}
//# sourceMappingURL=Family.js.map