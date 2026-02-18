"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerDeleteAccountRepository = void 0;
const tslib_1 = require("tslib");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const CustomerDeleteAccount_1 = require("../models/CustomerDeleteAccount");
const typedi_1 = require("typedi");
let CustomerDeleteAccountRepository = class CustomerDeleteAccountRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(CustomerDeleteAccount_1.CustomerDeleteAccount);
    }
};
exports.CustomerDeleteAccountRepository = CustomerDeleteAccountRepository;
exports.CustomerDeleteAccountRepository = CustomerDeleteAccountRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], CustomerDeleteAccountRepository);
//# sourceMappingURL=CustomerDeleteAccountRepository.js.map