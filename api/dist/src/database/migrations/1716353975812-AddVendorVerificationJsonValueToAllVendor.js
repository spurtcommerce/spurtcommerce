"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddVendorVerificationJsonValueToAllVendor1716353975812 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddVendorVerificationJsonValueToAllVendor1716353975812 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorRepo = yield (0, typeorm_1.getRepository)('Vendor');
            yield vendorRepo.update({}, {
                verification: {
                    policy: 0,
                    email: 0,
                    decision: 0,
                    category: 0,
                    document: 0,
                    storeFront: 0,
                    bankAccount: 0,
                    paymentInfo: 0,
                    companyDetail: 0,
                    deliveryMethod: 0,
                    subscriptionPlan: 0,
                    distributionPoint: 0,
                },
                verificationDetailComment: [],
                verificationComment: [],
            });
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddVendorVerificationJsonValueToAllVendor1716353975812 = AddVendorVerificationJsonValueToAllVendor1716353975812;
//# sourceMappingURL=1716353975812-AddVendorVerificationJsonValueToAllVendor.js.map